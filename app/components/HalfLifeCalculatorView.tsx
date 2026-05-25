"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  ReferenceDot 
} from 'recharts';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { 
  Atom, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Sliders, 
  HelpCircle, 
  Info, 
  Clock, 
  Zap, 
  TrendingDown, 
  Database 
} from 'lucide-react';

interface HalfLifeCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

// Pseudo-random deterministic grid shuffle to make decay look scattered and natural
const SHUFFLED_GRID_INDICES = [
  49, 13, 85, 23, 76, 38, 92, 5, 61, 19, 44, 9, 81, 31, 56, 70, 2, 67, 12, 89,
  27, 73, 50, 8, 95, 34, 63, 17, 79, 41, 52, 1, 98, 22, 69, 58, 86, 11, 47, 91,
  6, 75, 30, 83, 15, 62, 51, 94, 25, 66, 40, 88, 3, 72, 57, 14, 99, 36, 82, 45,
  20, 68, 93, 54, 7, 78, 33, 59, 16, 87, 29, 64, 48, 84, 10, 53, 90, 24, 71, 39,
  80, 18, 60, 4, 96, 35, 77, 43, 55, 0, 97, 26, 65, 32, 14, 74, 46, 28, 83, 100
];

const ISOTOPE_PRESETS = [
  { name: "Carbon-14 (C-14)", symbol: "¹⁴C", halfLife: 5730, unit: "years", description: "Used in radiocarbon dating of organic archaeological artifacts." },
  { name: "Uranium-238 (U-238)", symbol: "²³⁸U", halfLife: 4.468e9, unit: "years", description: "Ultra-long decay; used to date Earth's oldest geological layers." },
  { name: "Uranium-235 (U-235)", symbol: "²³⁵U", halfLife: 7.038e8, unit: "years", description: "Fissile isotope essential for nuclear reactors and weapons." },
  { name: "Radon-222 (Rn-222)", symbol: "²²²Rn", halfLife: 3.8235, unit: "days", description: "Naturally occurring radioactive gas accumulating in basements." },
  { name: "Iodine-131 (I-131)", symbol: "¹³¹I", halfLife: 8.02, unit: "days", description: "Widely used in medical radiology for thyroid cancer therapies." },
  { name: "Cesium-137 (Cs-137)", symbol: "¹³⁷Cs", halfLife: 30.17, unit: "years", description: "High-yield nuclear fission byproduct found in waste." },
  { name: "Plutonium-239 (Pu-239)", symbol: "²³⁹Pu", halfLife: 24110, unit: "years", description: "Man-made fissile element used in energy grids and warheads." },
  { name: "Thorium-232 (Th-232)", symbol: "²³²Th", halfLife: 1.405e10, unit: "years", description: "Fertile material proposed as safer fuel in Thorium reactors." }
];

const TIME_UNIT_FACTORS: Record<string, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2629800, // 30.4375 days
  years: 31557600 // 365.25 days
};

export function HalfLifeCalculatorView({ calcDef }: HalfLifeCalculatorViewProps) {
  // Modes: 
  // 'remaining' (Calculate remaining quantity Nt)
  // 'initial' (Calculate initial quantity N0)
  // 'halflife' (Calculate half-life t1/2)
  // 'time' (Calculate elapsed time t)
  // 'decay_constant' (Calculate decay constant lambda)
  const [mode, setMode] = useState<'remaining' | 'initial' | 'halflife' | 'time' | 'decay_constant'>('remaining');

  // Input states
  const [initialQuantity, setInitialQuantity] = useState<string>("100");
  const [initialQuantityUnit, setInitialQuantityUnit] = useState<string>("grams");
  const [remainingQuantity, setRemainingQuantity] = useState<string>("25");
  const [remainingQuantityUnit, setRemainingQuantityUnit] = useState<string>("grams");
  
  const [halfLife, setHalfLife] = useState<string>("8.02");
  const [halfLifeUnit, setHalfLifeUnit] = useState<string>("days");
  
  const [elapsedTime, setElapsedTime] = useState<string>("16.04");
  const [elapsedTimeUnit, setElapsedTimeUnit] = useState<string>("days");
  
  const [decayConstant, setDecayConstant] = useState<string>("");
  const [decayConstantUnit, setDecayConstantUnit] = useState<string>("per_second");

  // Visualizer interactive slider
  const [visualTimeRatio, setVisualTimeRatio] = useState<number>(1.0); // Ratio of visual elapsed time / actual calculated elapsed time
  
  // Status and Results
  const [result, setResult] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string>("");

  // Copy/Export status indicators
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [copiedData, setCopiedData] = useState(false);

  // History list
  const [history, setHistory] = useState<any[]>([]);

  // Safe scientific notation parser
  const parseValue = (str: string): number => {
    if (!str) return NaN;
    const clean = str.trim().toLowerCase();
    if (!clean) return NaN;
    
    // Support notation like "6.022 x 10^23" or "6.022*10^23" or "6.022e23"
    if (clean.includes('x10^')) {
      const parts = clean.split('x10^');
      return Number(parts[0]) * Math.pow(10, Number(parts[1]));
    }
    if (clean.includes('x 10^')) {
      const parts = clean.split('x 10^');
      return Number(parts[0]) * Math.pow(10, Number(parts[1]));
    }
    if (clean.includes('*10^')) {
      const parts = clean.split('*10^');
      return Number(parts[0]) * Math.pow(10, Number(parts[1]));
    }
    return Number(clean);
  };

  // Safe scientific notation formatting
  const formatValue = (num: number, precision = 4): string => {
    if (num === 0) return "0";
    if (isNaN(num) || !isFinite(num)) return "NaN";
    
    const abs = Math.abs(num);
    // Format normally for numbers in standard mid-range
    if (abs >= 0.0001 && abs < 1000000) {
      return num.toLocaleString(undefined, { 
        maximumFractionDigits: precision,
        minimumFractionDigits: 0
      });
    }
    
    // Exponent format: a × 10^b
    const expStr = num.toExponential(precision);
    const [coeff, exp] = expStr.split('e');
    const cleanExp = exp.replace('+', '');
    return `${coeff} × 10^${cleanExp}`;
  };

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("half-life-calculator-history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load calculation history", e);
    }
  }, []);

  // Isotope presets handler
  const handlePresetChange = (presetName: string) => {
    setActivePreset(presetName);
    if (!presetName) return;

    const preset = ISOTOPE_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setHalfLife(preset.halfLife.toString());
      setHalfLifeUnit(preset.unit);
      
      // Update units depending on preset
      if (mode === "remaining" || mode === "initial") {
        setElapsedTimeUnit(preset.unit);
        // Automatically default elapsed time to roughly 2 half-lives
        setElapsedTime(formatValue(preset.halfLife * 2, 2).replace(/,/g, ''));
      }
    }
  };

  // Math solvers & real-time updates
  const calculate = () => {
    setValidationError(null);
    
    try {
      const N0 = parseValue(initialQuantity);
      const Nt = parseValue(remainingQuantity);
      const thalf = parseValue(halfLife);
      const t = parseValue(elapsedTime);
      const lambda = parseValue(decayConstant);

      // Conversions to seconds for calculations
      const thalfSeconds = thalf * (TIME_UNIT_FACTORS[halfLifeUnit] || 1);
      const tSeconds = t * (TIME_UNIT_FACTORS[elapsedTimeUnit] || 1);

      let calculatedValue = 0;
      let steps: React.ReactNode[] = [];
      let summaryStr = "";

      // 1. Remaining Quantity mode
      if (mode === "remaining") {
        if (isNaN(N0) || N0 <= 0) {
          setValidationError("Initial quantity must be a positive number.");
          return;
        }
        if (isNaN(thalf) || thalf <= 0) {
          setValidationError("Half-life must be a positive duration.");
          return;
        }
        if (isNaN(t) || t < 0) {
          setValidationError("Elapsed time must be greater than or equal to zero.");
          return;
        }

        const halfLifeRatio = tSeconds / thalfSeconds;
        calculatedValue = N0 * Math.pow(0.5, halfLifeRatio);
        const percentRemaining = (calculatedValue / N0) * 100;
        const percentDecayed = 100 - percentRemaining;
        const calculatedLambda = Math.log(2) / thalfSeconds; // s^-1
        const displayLambda = calculatedLambda * (TIME_UNIT_FACTORS[halfLifeUnit] || 1);

        summaryStr = `Remaining: ${formatValue(calculatedValue)} ${initialQuantityUnit} (${percentRemaining.toFixed(2)}%)`;

        setResult({
          value: calculatedValue,
          unit: initialQuantityUnit,
          percentRemaining,
          percentDecayed,
          decayConstant: calculatedLambda, // in s^-1
          displayDecayConstant: displayLambda,
          halfLifeRatio,
          steps: [
            {
              desc: "Identify the general exponential decay formula:",
              latex: "N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{\\frac{t}{t_{1/2}}}"
            },
            {
              desc: "Convert elapsed time and half-life to matching units (seconds):",
              latex: `t = ${formatValue(t)}\\text{ ${halfLifeUnit}} = ${formatValue(tSeconds)}\\text{ s}`
            },
            {
              latex: `t_{1/2} = ${formatValue(thalf)}\\text{ ${halfLifeUnit}} = ${formatValue(thalfSeconds)}\\text{ s}`
            },
            {
              desc: "Calculate the decay constant (\\lambda):",
              latex: `\\lambda = \\frac{\\ln(2)}{t_{1/2}} = \\frac{0.69315}{${formatValue(thalfSeconds)}\\text{ s}} = ${formatValue(calculatedLambda)}\\text{ s}^{-1}`
            },
            {
              desc: "Substitute parameters into the decay equation:",
              latex: `N(t) = ${formatValue(N0)} \\cdot \\left(0.5\\right)^{\\frac{${formatValue(tSeconds)}}{${formatValue(thalfSeconds)}}}`
            },
            {
              desc: "Solve for the remaining quantity N(t):",
              latex: `N(t) = ${formatValue(N0)} \\cdot \\left(0.5\\right)^{${formatValue(halfLifeRatio, 4)}} = ${formatValue(calculatedValue)}\\text{ ${initialQuantityUnit}}`
            },
            {
              desc: "Calculate remaining and decayed percentages:",
              latex: `\\text{Percentage Remaining} = \\left(\\frac{${formatValue(calculatedValue)}}{${formatValue(N0)}}\\right) \\cdot 100\\% = ${percentRemaining.toFixed(2)}\\%`
            },
            {
              latex: `\\text{Percentage Decayed} = 100\\% - ${percentRemaining.toFixed(2)}\\% = ${percentDecayed.toFixed(2)}\\%`
            }
          ]
        });
      }

      // 2. Initial Quantity mode
      else if (mode === "initial") {
        if (isNaN(Nt) || Nt <= 0) {
          setValidationError("Remaining quantity must be a positive number.");
          return;
        }
        if (isNaN(thalf) || thalf <= 0) {
          setValidationError("Half-life must be a positive duration.");
          return;
        }
        if (isNaN(t) || t < 0) {
          setValidationError("Elapsed time must be greater than or equal to zero.");
          return;
        }

        const halfLifeRatio = tSeconds / thalfSeconds;
        calculatedValue = Nt / Math.pow(0.5, halfLifeRatio);
        const percentRemaining = (Nt / calculatedValue) * 100;
        const percentDecayed = 100 - percentRemaining;
        const calculatedLambda = Math.log(2) / thalfSeconds;

        summaryStr = `Initial quantity calculated as ${formatValue(calculatedValue)} ${remainingQuantityUnit}`;

        setResult({
          value: calculatedValue,
          unit: remainingQuantityUnit,
          percentRemaining,
          percentDecayed,
          decayConstant: calculatedLambda,
          halfLifeRatio,
          steps: [
            {
              desc: "Rearrange the decay formula to solve for initial quantity N₀:",
              latex: "N_0 = \\frac{N(t)}{\\left(\\frac{1}{2}\\right)^{\\frac{t}{t_{1/2}}}}"
            },
            {
              desc: "Calculate the exponential decay ratio:",
              latex: `\\text{Decay Ratio} = (0.5)^{\\frac{${formatValue(tSeconds)}}{${formatValue(thalfSeconds)}}} = (0.5)^{${formatValue(halfLifeRatio, 4)}} = ${formatValue(Math.pow(0.5, halfLifeRatio), 6)}`
            },
            {
              desc: "Substitute the remaining quantity and decay ratio:",
              latex: `N_0 = \\frac{${formatValue(Nt)}}{${formatValue(Math.pow(0.5, halfLifeRatio), 6)}} = ${formatValue(calculatedValue)}\\text{ ${remainingQuantityUnit}}`
            }
          ]
        });
      }

      // 3. Half-life duration mode
      else if (mode === "halflife") {
        if (isNaN(N0) || N0 <= 0) {
          setValidationError("Initial quantity must be a positive number.");
          return;
        }
        if (isNaN(Nt) || Nt <= 0) {
          setValidationError("Remaining quantity must be a positive number.");
          return;
        }
        if (Nt >= N0) {
          setValidationError("Remaining quantity must be strictly less than the initial quantity to calculate decay.");
          return;
        }
        if (isNaN(t) || t <= 0) {
          setValidationError("Elapsed time must be a positive duration.");
          return;
        }

        // t1/2 = t * ln(2) / ln(N0/Nt)
        const calculatedThalfSeconds = tSeconds * Math.log(2) / Math.log(N0 / Nt);
        calculatedValue = calculatedThalfSeconds / (TIME_UNIT_FACTORS[halfLifeUnit] || 1);
        const calculatedLambda = Math.log(2) / calculatedThalfSeconds;

        summaryStr = `Half-life: ${formatValue(calculatedValue)} ${halfLifeUnit}`;

        setResult({
          value: calculatedValue,
          unit: halfLifeUnit,
          decayConstant: calculatedLambda,
          steps: [
            {
              desc: "Rearrange the decay formula to isolate half-life t₁/₂:",
              latex: "t_{1/2} = \\frac{t \\cdot \\ln(2)}{\\ln\\left(\\frac{N_0}{N(t)}\\right)}"
            },
            {
              desc: "Substitute the initial mass, remaining mass, and elapsed time:",
              latex: `t_{1/2} = \\frac{${formatValue(tSeconds)}\\text{ s} \\cdot 0.69315}{\\ln\\left(\\frac{${formatValue(N0)}}{${formatValue(Nt)}}\\right)}`
            },
            {
              desc: "Solve for half-life in seconds:",
              latex: `t_{1/2} = \\frac{${formatValue(tSeconds * 0.69315)}}{\\ln(${formatValue(N0 / Nt, 4)})} = ${formatValue(calculatedThalfSeconds)}\\text{ s}`
            },
            {
              desc: "Convert back to user's desired time unit:",
              latex: `t_{1/2} = \\frac{${formatValue(calculatedThalfSeconds)}\\text{ s}}{${formatValue(TIME_UNIT_FACTORS[halfLifeUnit] || 1)}} = ${formatValue(calculatedValue)}\\text{ ${halfLifeUnit}}`
            }
          ]
        });
      }

      // 4. Elapsed time mode
      else if (mode === "time") {
        if (isNaN(N0) || N0 <= 0) {
          setValidationError("Initial quantity must be a positive number.");
          return;
        }
        if (isNaN(Nt) || Nt <= 0) {
          setValidationError("Remaining quantity must be a positive number.");
          return;
        }
        if (Nt > N0) {
          setValidationError("Remaining quantity cannot exceed the initial quantity.");
          return;
        }
        if (isNaN(thalf) || thalf <= 0) {
          setValidationError("Half-life must be a positive duration.");
          return;
        }

        // t = t1/2 * ln(N0/Nt) / ln(2)
        const calculatedTseconds = thalfSeconds * Math.log(N0 / Nt) / Math.log(2);
        calculatedValue = calculatedTseconds / (TIME_UNIT_FACTORS[elapsedTimeUnit] || 1);
        const calculatedLambda = Math.log(2) / thalfSeconds;

        summaryStr = `Elapsed time: ${formatValue(calculatedValue)} ${elapsedTimeUnit}`;

        setResult({
          value: calculatedValue,
          unit: elapsedTimeUnit,
          decayConstant: calculatedLambda,
          steps: [
            {
              desc: "Isolate elapsed time t from the decay formula:",
              latex: "t = t_{1/2} \\cdot \\frac{\\ln\\left(\\frac{N_0}{N(t)}\\right)}{\\ln(2)}"
            },
            {
              desc: "Substitute input values into the isolated formula:",
              latex: `t = ${formatValue(thalfSeconds)}\\text{ s} \\cdot \\frac{\\ln\\left(\\frac{${formatValue(N0)}}{${formatValue(Nt)}}\\right)}{0.69315}`
            },
            {
              desc: "Solve for elapsed decay time in seconds:",
              latex: `t = ${formatValue(thalfSeconds)}\\text{ s} \\cdot \\frac{${formatValue(Math.log(N0/Nt), 4)}}{0.69315} = ${formatValue(calculatedTseconds)}\\text{ s}`
            },
            {
              desc: "Convert elapsed time into user's desired time unit:",
              latex: `t = \\frac{${formatValue(calculatedTseconds)}\\text{ s}}{${formatValue(TIME_UNIT_FACTORS[elapsedTimeUnit] || 1)}} = ${formatValue(calculatedValue)}\\text{ ${elapsedTimeUnit}}`
            }
          ]
        });
      }

      // 5. Decay constant mode
      else if (mode === "decay_constant") {
        let calculatedLambda = 0;
        let calculatedThalfSeconds = 0;

        if (decayConstant) {
          calculatedLambda = parseValue(decayConstant);
          if (calculatedLambda <= 0) {
            setValidationError("Decay constant must be greater than zero.");
            return;
          }
          // Convert from specific unit to s^-1
          if (decayConstantUnit === "per_minute") calculatedLambda /= 60;
          else if (decayConstantUnit === "per_hour") calculatedLambda /= 3600;
          else if (decayConstantUnit === "per_day") calculatedLambda /= 86400;
          else if (decayConstantUnit === "per_year") calculatedLambda /= 31557600;

          calculatedThalfSeconds = Math.log(2) / calculatedLambda;
          calculatedValue = calculatedThalfSeconds / (TIME_UNIT_FACTORS[halfLifeUnit] || 1);

          summaryStr = `Decay Constant: ${decayConstant} ${decayConstantUnit.replace('_', ' ')} (Half-life: ${formatValue(calculatedValue)} ${halfLifeUnit})`;
        } else {
          if (isNaN(thalf) || thalf <= 0) {
            setValidationError("Provide either a decay constant directly or enter a valid half-life to calculate it.");
            return;
          }
          calculatedThalfSeconds = thalfSeconds;
          calculatedLambda = Math.log(2) / thalfSeconds;
          calculatedValue = calculatedLambda; // in s^-1
          
          let factor = 1;
          if (decayConstantUnit === "per_minute") factor = 60;
          else if (decayConstantUnit === "per_hour") factor = 3600;
          else if (decayConstantUnit === "per_day") factor = 86400;
          else if (decayConstantUnit === "per_year") factor = 31557600;

          calculatedValue = calculatedLambda * factor;

          summaryStr = `Decay Constant calculated as ${formatValue(calculatedValue)} ${decayConstantUnit.replace('_', ' ')}`;
        }

        setResult({
          value: calculatedValue,
          unit: decayConstantUnit.replace('_', ' '),
          decayConstant: calculatedLambda,
          halfLifeValue: calculatedThalfSeconds / (TIME_UNIT_FACTORS[halfLifeUnit] || 1),
          steps: [
            {
              desc: "Decay constant \\lambda and half-life t₁/₂ are fundamentally related by:",
              latex: "\\lambda = \\frac{\\ln(2)}{t_{1/2}} \\quad \\text{and} \\quad t_{1/2} = \\frac{\\ln(2)}{\\lambda}"
            },
            {
              desc: "Substituting the known parameters:",
              latex: `\\lambda = \\frac{0.69315}{${formatValue(calculatedThalfSeconds)}\\text{ s}} = ${formatValue(calculatedLambda)}\\text{ s}^{-1}`
            },
            {
              desc: "Convert decay constant to matching display unit:",
              latex: `\\lambda = ${formatValue(calculatedValue)}\\text{ ${decayConstantUnit.replace('_', ' ')}}`
            }
          ]
        });
      }

      // Add to localStorage history list
      if (calculatedValue) {
        const historyItem = {
          id: Date.now(),
          mode,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          preset: activePreset || "Custom Isotope",
          summary: summaryStr,
          details: {
            initialQuantity, initialQuantityUnit,
            remainingQuantity, remainingQuantityUnit,
            halfLife, halfLifeUnit,
            elapsedTime, elapsedTimeUnit,
            decayConstant
          }
        };

        const updatedHistory = [historyItem, ...history.slice(0, 19)];
        setHistory(updatedHistory);
        localStorage.setItem("half-life-calculator-history", JSON.stringify(updatedHistory));
      }

    } catch (err) {
      console.error(err);
      setValidationError("An error occurred during scientific calculation. Check scientific notation format (e.g. 1.23e4).");
    }
  };

  // Run calculation when tabs or main fields update
  useEffect(() => {
    calculate();
  }, [
    mode, 
    initialQuantity, 
    initialQuantityUnit, 
    remainingQuantity, 
    remainingQuantityUnit, 
    halfLife, 
    halfLifeUnit, 
    elapsedTime, 
    elapsedTimeUnit,
    decayConstant,
    decayConstantUnit
  ]);

  // Generate AreaChart data for smooth decay curve visualization
  const chartData = useMemo(() => {
    const thalf = parseValue(halfLife);
    const t = parseValue(elapsedTime);
    if (isNaN(thalf) || thalf <= 0) return [];

    const normalizedHalfLife = thalf * (TIME_UNIT_FACTORS[halfLifeUnit] || 1);
    const normalizedTime = isNaN(t) || t < 0 ? 0 : t * (TIME_UNIT_FACTORS[elapsedTimeUnit] || 1);
    
    // Chart limit: Plot up to the larger of 5 half-lives or 1.5x elapsed time
    const maxSeconds = Math.max(normalizedHalfLife * 5, normalizedTime * 1.5);
    const pointsCount = 60;
    const step = maxSeconds / pointsCount;

    const data = [];
    const N0 = parseValue(initialQuantity) || 100;

    for (let s = 0; s <= maxSeconds; s += step) {
      const tRatio = s / normalizedHalfLife;
      const amount = N0 * Math.pow(0.5, tRatio);
      
      // Convert s back to display unit (matching elapsed time unit)
      const displayTime = s / (TIME_UNIT_FACTORS[elapsedTimeUnit] || 1);

      data.push({
        time: displayTime,
        seconds: s,
        quantity: parseFloat(amount.toFixed(4)),
        percentage: parseFloat((Math.pow(0.5, tRatio) * 100).toFixed(2))
      });
    }

    return data.sort((a, b) => a.seconds - b.seconds);
  }, [halfLife, halfLifeUnit, elapsedTime, elapsedTimeUnit, initialQuantity]);

  // Highlight points for Recharts ReferenceDots
  const calculatedTimeX = useMemo(() => {
    const t = parseValue(elapsedTime);
    return isNaN(t) || t < 0 ? 0 : t;
  }, [elapsedTime]);

  const calculatedQuantityY = useMemo(() => {
    if (result && result.value && mode === "remaining") {
      return result.value;
    }
    const N0 = parseValue(initialQuantity) || 100;
    const thalf = parseValue(halfLife);
    const t = parseValue(elapsedTime);
    if (isNaN(N0) || isNaN(thalf) || isNaN(t)) return 0;
    
    const thalfSec = thalf * (TIME_UNIT_FACTORS[halfLifeUnit] || 1);
    const tSec = t * (TIME_UNIT_FACTORS[elapsedTimeUnit] || 1);
    return N0 * Math.pow(0.5, tSec / thalfSec);
  }, [result, initialQuantity, halfLife, halfLifeUnit, elapsedTime, elapsedTimeUnit, mode]);

  // Shuffled Atom list based on active ratio for organic decay grid simulator
  const activeDecayedCount = useMemo(() => {
    const thalf = parseValue(halfLife);
    const t = parseValue(elapsedTime);
    if (isNaN(thalf) || thalf <= 0 || isNaN(t) || t < 0) return 0;

    const thalfSec = thalf * (TIME_UNIT_FACTORS[halfLifeUnit] || 1);
    const tSec = t * (TIME_UNIT_FACTORS[elapsedTimeUnit] || 1) * visualTimeRatio;
    
    const fractionRemaining = Math.pow(0.5, tSec / thalfSec);
    const fractionDecayed = 1 - fractionRemaining;
    return Math.min(100, Math.max(0, Math.round(fractionDecayed * 100)));
  }, [halfLife, halfLifeUnit, elapsedTime, elapsedTimeUnit, visualTimeRatio]);

  // Export functions
  const downloadTXT = () => {
    if (!result) return;
    const divider = "====================================================\n";
    let output = divider;
    output += "          HALF-LIFE CALCULATION REPORT              \n";
    output += divider;
    output += `Mode: ${mode.toUpperCase().replace('_', ' ')}\n`;
    output += `Date: ${new Date().toLocaleString()}\n`;
    output += `Isotope Preset: ${activePreset || "Custom Isotope"}\n\n`;
    
    output += "INPUT DATA:\n";
    output += `- Initial Quantity: ${initialQuantity} ${initialQuantityUnit}\n`;
    if (mode !== "remaining") {
      output += `- Remaining Quantity: ${remainingQuantity} ${remainingQuantityUnit}\n`;
    }
    output += `- Half-life: ${halfLife} ${halfLifeUnit}\n`;
    if (mode !== "time" && mode !== "halflife") {
      output += `- Elapsed Time: ${elapsedTime} ${elapsedTimeUnit}\n`;
    }
    output += divider;
    output += "CALCULATED RESULTS:\n";
    output += `- Result: ${formatValue(result.value)} ${result.unit}\n`;
    if (result.percentRemaining) {
      output += `- Remaining Percentage: ${result.percentRemaining.toFixed(4)}%\n`;
      output += `- Decayed Percentage: ${result.percentDecayed.toFixed(4)}%\n`;
    }
    if (result.decayConstant) {
      output += `- Decay Constant (lambda): ${result.decayConstant.toExponential(6)} s^-1\n`;
    }
    output += divider;
    output += "STEP-BY-STEP CALCULATION STEPS:\n";
    result.steps.forEach((step: any, idx: number) => {
      if (step.desc) output += `\nStep ${idx + 1}: ${step.desc}\n`;
      output += `  Formula: ${step.latex}\n`;
    });
    output += divider;

    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `half-life-${mode}-results.txt`;
    link.click();
  };

  const downloadCSV = () => {
    if (chartData.length === 0) return;
    let csv = "Time,Quantity,Percentage Remaining\n";
    chartData.forEach(row => {
      csv += `${row.time},${row.quantity},${row.percentage}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `decay-progression-data.csv`;
    link.click();
  };

  const downloadJSON = () => {
    if (!result) return;
    const data = {
      calculator: "Half-Life Calculator",
      timestamp: new Date().toISOString(),
      mode,
      inputs: {
        initialQuantity, initialQuantityUnit,
        remainingQuantity, remainingQuantityUnit,
        halfLife, halfLifeUnit,
        elapsedTime, elapsedTimeUnit,
        decayConstant
      },
      results: {
        value: result.value,
        unit: result.unit,
        percentRemaining: result.percentRemaining,
        percentDecayed: result.percentDecayed,
        decayConstant: result.decayConstant
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `half-life-${mode}-calculation.json`;
    link.click();
  };

  const copyToClipboard = (text: string, type: 'result' | 'formula' | 'data') => {
    navigator.clipboard.writeText(text);
    if (type === 'result') {
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    } else if (type === 'formula') {
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    } else if (type === 'data') {
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    }
  };

  const restoreHistory = (item: any) => {
    setMode(item.mode);
    setInitialQuantity(item.details.initialQuantity);
    setInitialQuantityUnit(item.details.initialQuantityUnit);
    setRemainingQuantity(item.details.remainingQuantity);
    setRemainingQuantityUnit(item.details.remainingQuantityUnit);
    setHalfLife(item.details.halfLife);
    setHalfLifeUnit(item.details.halfLifeUnit);
    setElapsedTime(item.details.elapsedTime);
    setElapsedTimeUnit(item.details.elapsedTimeUnit);
    setDecayConstant(item.details.decayConstant);
    setActivePreset(item.preset === "Custom Isotope" ? "" : item.preset);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("half-life-calculator-history");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden font-sans">
      
      {/* Header Banner */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
            <Atom className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {calcDef.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Nuclear Decay, Radioactive Isotopes, and Exponential Decay Progression
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto scrollbar-thin bg-slate-50/50 dark:bg-slate-900">
        {[
          { key: 'remaining', label: 'Remaining Quantity (Nt)' },
          { key: 'initial', label: 'Initial Quantity (N₀)' },
          { key: 'halflife', label: 'Half-Life (t₁/₂)' },
          { key: 'time', label: 'Elapsed Time (t)' },
          { key: 'decay_constant', label: 'Decay Constant (λ)' }
        ].map((tab) => (
          <button 
            key={tab.key}
            onClick={() => {
              setMode(tab.key as any);
              setResult(null);
            }}
            className={`py-4 px-6 text-center font-bold text-sm border-b-2 transition-all whitespace-nowrap outline-none ${
              mode === tab.key 
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-white dark:bg-slate-800' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Body Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Preset Selector */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>Isotope Presets database</span>
            </label>
            <select
              value={activePreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none font-semibold text-sm transition-all shadow-sm"
            >
              <option value="">-- Custom (Enter values manually) --</option>
              {ISOTOPE_PRESETS.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name} (T₁/₂ = {formatValue(preset.halfLife)} {preset.unit})
                </option>
              ))}
            </select>
            {activePreset && (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                {ISOTOPE_PRESETS.find(p => p.name === activePreset)?.description}
              </p>
            )}
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-4 flex gap-2">
              <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-red-800 dark:text-red-300">{validationError}</span>
            </div>
          )}

          {/* Inputs Section */}
          <div className="space-y-4">
            
            {/* Initial Quantity Field */}
            {mode !== "initial" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Initial Quantity (N₀)
                  </label>
                  <select 
                    value={initialQuantityUnit}
                    onChange={(e) => {
                      setInitialQuantityUnit(e.target.value);
                      setRemainingQuantityUnit(e.target.value);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-transparent border-0 outline-none cursor-pointer"
                  >
                    <option value="grams">Grams (g)</option>
                    <option value="milligrams">Milligrams (mg)</option>
                    <option value="kilograms">Kilograms (kg)</option>
                    <option value="atoms">Atoms</option>
                    <option value="moles">Moles (mol)</option>
                    <option value="becquerels">Becquerels (Bq)</option>
                    <option value="curies">Curies (Ci)</option>
                    <option value="percent">Percentage (%)</option>
                  </select>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={initialQuantity}
                    onChange={(e) => setInitialQuantity(e.target.value)}
                    placeholder="e.g. 100 or 6.022e23"
                    className="w-full h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all shadow-sm text-lg font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Remaining Quantity Field */}
            {mode !== "remaining" && mode !== "decay_constant" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Remaining Quantity (Nt)
                  </label>
                  <span className="text-xs font-semibold text-slate-400 uppercase">
                    {remainingQuantityUnit}
                  </span>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={remainingQuantity}
                    onChange={(e) => setRemainingQuantity(e.target.value)}
                    placeholder="e.g. 25"
                    className="w-full h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all shadow-sm text-lg font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Half-Life Field */}
            {mode !== "halflife" && (mode !== "decay_constant" || !decayConstant) && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Half-Life duration (t₁/₂)
                  </label>
                  <select 
                    value={halfLifeUnit}
                    onChange={(e) => setHalfLifeUnit(e.target.value)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-transparent border-0 outline-none cursor-pointer"
                  >
                    <option value="seconds">Seconds (s)</option>
                    <option value="minutes">Minutes (m)</option>
                    <option value="hours">Hours (h)</option>
                    <option value="days">Days (d)</option>
                    <option value="weeks">Weeks (w)</option>
                    <option value="months">Months (mo)</option>
                    <option value="years">Years (y)</option>
                  </select>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={halfLife}
                    onChange={(e) => {
                      setHalfLife(e.target.value);
                      setActivePreset(""); // break preset link if manual change
                    }}
                    placeholder="e.g. 8.02"
                    className="w-full h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all shadow-sm text-lg font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Elapsed Time Field */}
            {mode !== "time" && mode !== "decay_constant" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Elapsed Decay Time (t)
                  </label>
                  <select 
                    value={elapsedTimeUnit}
                    onChange={(e) => setElapsedTimeUnit(e.target.value)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-transparent border-0 outline-none cursor-pointer"
                  >
                    <option value="seconds">Seconds (s)</option>
                    <option value="minutes">Minutes (m)</option>
                    <option value="hours">Hours (h)</option>
                    <option value="days">Days (d)</option>
                    <option value="weeks">Weeks (w)</option>
                    <option value="months">Months (mo)</option>
                    <option value="years">Years (y)</option>
                  </select>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={elapsedTime}
                    onChange={(e) => setElapsedTime(e.target.value)}
                    placeholder="e.g. 16.04"
                    className="w-full h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all shadow-sm text-lg font-semibold"
                  />
                </div>
              </div>
            )}

            {/* Decay Constant Field (lambda) */}
            {mode === "decay_constant" && (
              <div className="space-y-4 pt-2">
                <div className="bg-blue-50/40 dark:bg-slate-800 p-4 rounded-xl border border-blue-100/50 dark:border-slate-700 text-xs text-blue-800 dark:text-slate-300">
                  Provide either **Half-life** (above) or enter **Decay Constant** (below) to solve.
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Decay Constant (λ)
                    </label>
                    <select 
                      value={decayConstantUnit}
                      onChange={(e) => setDecayConstantUnit(e.target.value)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-transparent border-0 outline-none cursor-pointer"
                    >
                      <option value="per_second">s⁻¹ (per sec)</option>
                      <option value="per_minute">m⁻¹ (per min)</option>
                      <option value="per_hour">h⁻¹ (per hour)</option>
                      <option value="per_day">d⁻¹ (per day)</option>
                      <option value="per_year">y⁻¹ (per year)</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={decayConstant}
                      onChange={(e) => setDecayConstant(e.target.value)}
                      placeholder="e.g. 0.0864 or 1e-4"
                      className="w-full h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all shadow-sm text-lg font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Quick Actions Panel */}
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setInitialQuantity("100");
                setRemainingQuantity("25");
                setHalfLife("8.02");
                setElapsedTime("16.04");
                setDecayConstant("");
                setActivePreset("");
                setResult(null);
                setValidationError(null);
              }}
              className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset parameters</span>
            </button>
          </div>

          {/* Local Calculation History Log */}
          {history.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent calculations</span>
                <button 
                  onClick={clearHistory}
                  className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => restoreHistory(item)}
                    className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer shadow-xs transition-all text-xs flex justify-between items-start gap-2"
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {item.preset} <span className="font-normal text-slate-400">({item.timestamp})</span>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-0.5 font-medium line-clamp-1">{item.summary}</div>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      {item.mode.substring(0, 4)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Dashboard panel */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/20 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/60 min-h-[500px] flex flex-col">
          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 py-16">
              <Atom className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4 animate-spin-slow" />
              <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">Awaiting inputs</h4>
              <p className="text-sm max-w-xs">Fill out the physical constants on the left panel to trigger decay simulations.</p>
            </div>
          ) : (
            <div className="space-y-8 flex-1 flex flex-col">
              
              {/* Top Result Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                
                {/* Micro background particle grid */}
                <div className="absolute right-0 top-0 opacity-5 dark:opacity-10 pointer-events-none">
                  <Atom className="w-48 h-48 -mr-8 -mt-8 text-blue-600" />
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                      Calculated {mode.replace('_', ' ')}
                    </span>
                    <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight break-all">
                      {formatValue(result.value, 6)}
                      <span className="text-lg md:text-2xl font-bold text-slate-500 dark:text-slate-400 ml-2">
                        {result.unit}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result.value.toString(), 'result')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors shadow-xs"
                    title="Copy exact result value"
                  >
                    {copiedResult ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                {/* Additional metrics depending on mode */}
                {result.percentRemaining !== undefined && (
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Remaining Ratio</div>
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                        {result.percentRemaining.toFixed(3)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Decayed Ratio</div>
                      <div className="text-lg font-bold text-red-500">
                        {result.percentDecayed.toFixed(3)}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Decay visualization graph (Recharts) */}
              {chartData.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-slate-500" />
                    <span>Exponential Decay Curve</span>
                  </h3>
                  
                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="decayColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 11 }}
                          label={{ value: `Time (${elapsedTimeUnit})`, position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 11 }}
                          label={{ value: initialQuantityUnit, angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: 10 }}
                        />
                        <RechartsTooltip 
                          formatter={(value: any) => [`${value} ${initialQuantityUnit}`, 'Quantity']}
                          labelFormatter={(label) => `Time: ${label} ${elapsedTimeUnit}`}
                          contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', background: '#fff', color: '#000' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="quantity" 
                          stroke="#3b82f6" 
                          strokeWidth={2.5} 
                          fillOpacity={1} 
                          fill="url(#decayColor)" 
                        />
                        
                        {/* Dot highlighting computed remaining point */}
                        {calculatedTimeX !== null && calculatedQuantityY !== null && (
                          <ReferenceDot 
                            x={calculatedTimeX} 
                            y={calculatedQuantityY} 
                            r={6} 
                            fill="#ef4444" 
                            stroke="#ffffff" 
                            strokeWidth={2}
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Atom Decay Particle Visualizer Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-emerald-500" />
                      <span>Atom Decay grid simulator</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      100 atom model showing decay probability over elapsed time.
                    </p>
                  </div>
                  
                  {/* Slider to interactively change ratio */}
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-700/60 max-w-[240px] shrink-0">
                    <Sliders className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <input 
                      type="range" 
                      min="0" 
                      max="300" // ratio %
                      value={Math.round(visualTimeRatio * 100)}
                      onChange={(e) => setVisualTimeRatio(Number(e.target.value) / 100)}
                      className="w-24 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 w-12 text-right shrink-0">
                      {Math.round(visualTimeRatio * 100)}% Time
                    </span>
                  </div>
                </div>

                {/* Grid Visual representation */}
                <div className="flex flex-wrap gap-2 justify-center py-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  {Array.from({ length: 100 }).map((_, idx) => {
                    const shuffleOrder = SHUFFLED_GRID_INDICES[idx];
                    const isDecayed = shuffleOrder <= activeDecayedCount;
                    
                    return (
                      <div 
                        key={idx}
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-500 relative ${
                          isDecayed 
                            ? "bg-slate-300 dark:bg-slate-800 border border-slate-400/20 scale-90" 
                            : "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse"
                        }`}
                        title={isDecayed ? "Daughter Isotope (Stable/Decayed)" : "Parent Isotope (Unstable/Radioactive)"}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-between items-center mt-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    <span>Parent: {100 - activeDecayedCount} atoms</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span>Daughter: {activeDecayedCount} atoms</span>
                  </span>
                </div>
              </div>

              {/* Step-by-Step educational explanation */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  <span>Step-by-Step math solver</span>
                </h3>

                <div className="space-y-6">
                  {result.steps.map((step: any, index: number) => (
                    <div key={index} className="space-y-2 border-l-2 border-slate-100 dark:border-slate-800 pl-4 py-1">
                      {step.desc && (
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {step.desc}
                        </p>
                      )}
                      <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto text-slate-800 dark:text-slate-200 font-serif flex justify-start items-center">
                        <BlockMath math={step.latex} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Export / Save Center */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Export Results Data Table
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={downloadTXT}
                    className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>TXT Report</span>
                  </button>
                  <button 
                    onClick={downloadCSV}
                    className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV Table</span>
                  </button>
                  <button 
                    onClick={downloadJSON}
                    className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON Spec</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
