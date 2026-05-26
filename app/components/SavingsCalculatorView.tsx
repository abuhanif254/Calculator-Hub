"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Info,
  Calendar,
  DollarSign,
  TrendingUp,
  Copy,
  Download,
  History,
  Plus,
  Trash2,
  Play,
  ArrowUpRight,
  BookOpen,
  Target,
  RefreshCw,
  Sparkles,
  Settings,
  HelpCircle,
  Check,
} from "lucide-react";

interface SavingsCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

interface OneTimeDeposit {
  id: string;
  year: number;
  amount: number;
}

interface SavedScenario {
  id: string;
  name: string;
  timestamp: number;
  initialDeposit: number;
  contributionAmount: number;
  contributionFrequency: string;
  interestRate: number;
  compoundFrequency: number;
  years: number;
  currency: string;
}

export function SavingsCalculatorView({ calcDef, locale }: SavingsCalculatorViewProps) {
  // Tabs: "calculator", "goalPlanner", "comparison", "history"
  const [activeTab, setActiveTab] = useState<string>("calculator");

  // Multi-Currency Mappings
  const currencies = [
    { label: "USD ($)", symbol: "$" },
    { label: "EUR (€)", symbol: "€" },
    { label: "GBP (£)", symbol: "£" },
    { label: "CAD (C$)", symbol: "C$" },
    { label: "AUD (A$)", symbol: "A$" },
    { label: "BDT (৳)", symbol: "৳" },
    { label: "Custom", symbol: "" },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState<string>("$");
  const [customCurrency, setCustomCurrency] = useState<string>("");
  const currencySymbol = selectedCurrency === "" ? customCurrency || "¤" : selectedCurrency;

  // Formatting utilities
  const formatCurrency = (val: number) => {
    return `${currencySymbol}${Math.round(val).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;
  };

  // --- CALC STATE (Scenario A) ---
  const [initialDeposit, setInitialDeposit] = useState<number>(5000);
  const [contributionAmount, setContributionAmount] = useState<number>(200);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // Monthly
  const [years, setYears] = useState<number>(15);
  const [contributionTiming, setContributionTiming] = useState<string>("end");
  const [inflationRate, setInflationRate] = useState<number>(2.5);

  // Advanced Options Toggle
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Advanced features state
  const [variableRateEnabled, setVariableRateEnabled] = useState<boolean>(false);
  const [variableRateAfterYears, setVariableRateAfterYears] = useState<number>(5);
  const [variableRateValue, setVariableRateValue] = useState<number>(7.0);

  const [annualIncreaseEnabled, setAnnualIncreaseEnabled] = useState<boolean>(false);
  const [annualIncreaseRate, setAnnualIncreaseRate] = useState<number>(3.0);

  const [oneTimeDeposits, setOneTimeDeposits] = useState<OneTimeDeposit[]>([]);
  const [otYear, setOtYear] = useState<number>(3);
  const [otAmount, setOtAmount] = useState<number>(1000);

  // --- SCENARIO B STATE (For Comparison Mode) ---
  const [compareInitialDeposit, setCompareInitialDeposit] = useState<number>(5000);
  const [compareContribution, setCompareContribution] = useState<number>(300);
  const [compareRate, setCompareRate] = useState<number>(6.5);
  const [compareYears, setCompareYears] = useState<number>(15);

  // --- GOAL PLANNER STATE ---
  // goalMode: "target" (Find required monthly savings) | "time" (Find time required)
  const [goalMode, setGoalMode] = useState<string>("target");
  const [targetGoalAmount, setTargetGoalAmount] = useState<number>(50000);
  const [goalTimeframeYears, setGoalTimeframeYears] = useState<number>(10);
  const [goalMonthlySavingsInput, setGoalMonthlySavingsInput] = useState<number>(300);

  // --- HISTORY SYSTEM STATE ---
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [newScenarioName, setNewScenarioName] = useState<string>("");
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Toast status notification
  const [toastMessage, setToastMessage] = useState<string>("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Load history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("nexus_savings_calc_history");
    if (history) {
      try {
        setSavedScenarios(JSON.parse(history));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveHistory = (updated: SavedScenario[]) => {
    setSavedScenarios(updated);
    localStorage.setItem("nexus_savings_calc_history", JSON.stringify(updated));
  };

  // Save current configuration to history
  const handleSaveScenario = () => {
    const name = newScenarioName.trim() || `Plan ${savedScenarios.length + 1}`;
    const newScenario: SavedScenario = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      timestamp: Date.now(),
      initialDeposit,
      contributionAmount,
      contributionFrequency,
      interestRate,
      compoundFrequency,
      years,
      currency: currencySymbol,
    };
    const updated = [newScenario, ...savedScenarios].slice(0, 10); // Limit to 10 entries
    saveHistory(updated);
    setNewScenarioName("");
    triggerToast("Scenario saved successfully!");
  };

  const handleRestoreScenario = (scen: SavedScenario) => {
    setInitialDeposit(scen.initialDeposit);
    setContributionAmount(scen.contributionAmount);
    setContributionFrequency(scen.contributionFrequency);
    setInterestRate(scen.interestRate);
    setCompoundFrequency(scen.compoundFrequency);
    setYears(scen.years);
    setSelectedCurrency(currencies.find((c) => c.symbol === scen.currency)?.symbol || "");
    if (!currencies.some((c) => c.symbol === scen.currency)) {
      setCustomCurrency(scen.currency);
    }
    triggerToast(`Restored "${scen.name}" values!`);
  };

  const handleDeleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    saveHistory(updated);
    triggerToast("Scenario removed.");
  };

  // Add a one-time deposit
  const addOneTimeDeposit = () => {
    if (otAmount <= 0 || otYear <= 0 || otYear > years) {
      triggerToast("Please enter a valid amount and year within the savings period.");
      return;
    }
    const newDep: OneTimeDeposit = {
      id: Math.random().toString(36).substring(2, 9),
      year: otYear,
      amount: otAmount,
    };
    setOneTimeDeposits([...oneTimeDeposits, newDep].sort((a, b) => a.year - b.year));
    setOtAmount(1000);
    triggerToast(`Added ${formatCurrency(otAmount)} deposit in Year ${otYear}`);
  };

  const removeOneTimeDeposit = (id: string) => {
    setOneTimeDeposits(oneTimeDeposits.filter((d) => d.id !== id));
  };

  // --- CALCULATION ENGINE ---
  const simulationResults = useMemo(() => {
    // 1. Core Variables
    const r = interestRate / 100;
    const infl = inflationRate / 100;
    
    // Compounding frequency variables
    const cf = compoundFrequency;
    // Derive effective monthly rate based on compound frequency cf
    // Ear (Effective Annual Rate) = (1 + r/cf)^cf - 1
    const ear = Math.pow(1 + r / cf, cf) - 1;
    const monthlyRate = Math.pow(1 + ear, 1 / 12) - 1;

    // Convert contribution frequency to monthly equivalent and check contribution counts
    let monthlyContrib = contributionAmount;
    let occurrencesPerYear = 12;
    if (contributionFrequency === "weekly") {
      monthlyContrib = (contributionAmount * 52) / 12;
      occurrencesPerYear = 52;
    } else if (contributionFrequency === "biweekly") {
      monthlyContrib = (contributionAmount * 26) / 12;
      occurrencesPerYear = 26;
    } else if (contributionFrequency === "semi-monthly") {
      monthlyContrib = (contributionAmount * 24) / 12;
      occurrencesPerYear = 24;
    } else if (contributionFrequency === "quarterly") {
      monthlyContrib = contributionAmount / 3;
      occurrencesPerYear = 4;
    } else if (contributionFrequency === "annually") {
      monthlyContrib = contributionAmount / 12;
      occurrencesPerYear = 1;
    }

    let chartData = [];
    let currentBalance = initialDeposit;
    let cumulativeDeposits = initialDeposit;
    let cumulativeExtraDeposits = 0;
    
    chartData.push({
      year: 0,
      principal: Math.round(initialDeposit),
      interest: 0,
      extra: 0,
      balance: Math.round(currentBalance),
      realBalance: Math.round(currentBalance),
    });

    const totalMonths = years * 12;

    for (let m = 1; m <= totalMonths; m++) {
      const currentYear = Math.ceil(m / 12);

      // Check if variable rate is active for this year
      let activeRate = monthlyRate;
      if (variableRateEnabled && currentYear > variableRateAfterYears) {
        const vRate = variableRateValue / 100;
        const vEar = Math.pow(1 + vRate / cf, cf) - 1;
        activeRate = Math.pow(1 + vEar, 1 / 12) - 1;
      }

      // Check annual contribution increase step
      let currentMonthlyContrib = monthlyContrib;
      if (annualIncreaseEnabled && currentYear > 1) {
        const multiplier = Math.pow(1 + annualIncreaseRate / 100, currentYear - 1);
        currentMonthlyContrib = monthlyContrib * multiplier;
      }

      // Add one-time deposits at the beginning of the year's first month
      let extraThisMonth = 0;
      if (m % 12 === 1) {
        const matchingExtra = oneTimeDeposits.filter((d) => d.year === currentYear);
        matchingExtra.forEach((d) => {
          extraThisMonth += d.amount;
        });
        currentBalance += extraThisMonth;
        cumulativeExtraDeposits += extraThisMonth;
      }

      // Calculate compound interest snapshot for the month
      if (contributionTiming === "beginning") {
        currentBalance += currentMonthlyContrib;
        cumulativeDeposits += currentMonthlyContrib;
        const interestEarned = currentBalance * activeRate;
        currentBalance += interestEarned;
      } else {
        const interestEarned = currentBalance * activeRate;
        currentBalance += interestEarned + currentMonthlyContrib;
        cumulativeDeposits += currentMonthlyContrib;
      }

      // Snapshot values at the end of each year
      if (m % 12 === 0) {
        const inflationFactor = Math.pow(1 + infl, currentYear);
        const realBalance = currentBalance / inflationFactor;

        chartData.push({
          year: currentYear,
          principal: Math.round(cumulativeDeposits),
          interest: Math.round(currentBalance - cumulativeDeposits - cumulativeExtraDeposits),
          extra: Math.round(cumulativeExtraDeposits),
          balance: Math.round(currentBalance),
          realBalance: Math.round(realBalance),
        });
      }
    }

    const totalInterest = currentBalance - cumulativeDeposits - cumulativeExtraDeposits;
    const finalRealBalance = currentBalance / Math.pow(1 + infl, years);

    return {
      finalBalance: currentBalance,
      finalRealBalance,
      totalDeposits: cumulativeDeposits,
      totalInterest,
      totalExtra: cumulativeExtraDeposits,
      chartData,
    };
  }, [
    initialDeposit,
    contributionAmount,
    contributionFrequency,
    interestRate,
    compoundFrequency,
    years,
    contributionTiming,
    inflationRate,
    variableRateEnabled,
    variableRateAfterYears,
    variableRateValue,
    annualIncreaseEnabled,
    annualIncreaseRate,
    oneTimeDeposits,
  ]);

  // --- GOAL PLANNER CALC ENGINE ---
  const goalResults = useMemo(() => {
    const r = interestRate / 100;
    const cf = compoundFrequency;
    const ear = Math.pow(1 + r / cf, cf) - 1;
    const monthlyRate = Math.pow(1 + ear, 1 / 12) - 1;

    if (goalMode === "target") {
      // Find required monthly/recurring savings to hit targetGoalAmount in goalTimeframeYears
      const totalMonths = goalTimeframeYears * 12;
      const principalFutureValue = initialDeposit * Math.pow(1 + monthlyRate, totalMonths);
      const remainingGoal = targetGoalAmount - principalFutureValue;

      if (remainingGoal <= 0) {
        return { requiredContribution: 0, timeNeeded: 0, progressPercent: 100 };
      }

      // Ordinary Annuity Formula solving for PMT:
      // PMT = FV * r / ((1 + r)^n - 1)
      let requiredMonthly =
        (remainingGoal * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

      // Adjust required amount if contribution timing is "beginning"
      if (contributionTiming === "beginning") {
        requiredMonthly = requiredMonthly / (1 + monthlyRate);
      }

      // Convert from monthly back to target frequency
      let requiredContribution = requiredMonthly;
      if (contributionFrequency === "weekly") {
        requiredContribution = (requiredMonthly * 12) / 52;
      } else if (contributionFrequency === "biweekly") {
        requiredContribution = (requiredMonthly * 12) / 26;
      } else if (contributionFrequency === "semi-monthly") {
        requiredContribution = (requiredMonthly * 12) / 24;
      } else if (contributionFrequency === "quarterly") {
        requiredContribution = requiredMonthly * 3;
      } else if (contributionFrequency === "annually") {
        requiredContribution = requiredMonthly * 12;
      }

      const progressPercent = Math.min((initialDeposit / targetGoalAmount) * 100, 100);

      return {
        requiredContribution,
        timeNeeded: goalTimeframeYears,
        progressPercent,
      };
    } else {
      // Find time required to reach targetGoalAmount with goalMonthlySavingsInput
      let currentBalance = initialDeposit;
      let months = 0;
      let reached = false;

      // Adjust frequency contribution
      let monthlyContrib = goalMonthlySavingsInput;
      if (contributionFrequency === "weekly") {
        monthlyContrib = (goalMonthlySavingsInput * 52) / 12;
      } else if (contributionFrequency === "biweekly") {
        monthlyContrib = (goalMonthlySavingsInput * 26) / 12;
      } else if (contributionFrequency === "semi-monthly") {
        monthlyContrib = (goalMonthlySavingsInput * 24) / 12;
      } else if (contributionFrequency === "quarterly") {
        monthlyContrib = goalMonthlySavingsInput / 3;
      } else if (contributionFrequency === "annually") {
        monthlyContrib = goalMonthlySavingsInput / 12;
      }

      // Protect against endless loops (e.g. rate is 0 and contribution is 0)
      if (monthlyContrib <= 0 && monthlyRate <= 0) {
        return { requiredContribution: 0, timeNeeded: 0, progressPercent: 0, isImpossible: true };
      }

      // Run simulation loop up to 100 years
      while (months < 1200) {
        if (currentBalance >= targetGoalAmount) {
          reached = true;
          break;
        }

        if (contributionTiming === "beginning") {
          currentBalance += monthlyContrib;
          const interestEarned = currentBalance * monthlyRate;
          currentBalance += interestEarned;
        } else {
          const interestEarned = currentBalance * monthlyRate;
          currentBalance += interestEarned + monthlyContrib;
        }
        months++;
      }

      const yearsNeeded = months / 12;
      const progressPercent = Math.min((initialDeposit / targetGoalAmount) * 100, 100);

      return {
        requiredContribution: monthlyContrib,
        timeNeeded: reached ? parseFloat(yearsNeeded.toFixed(1)) : 999,
        progressPercent,
        isImpossible: !reached,
      };
    }
  }, [
    goalMode,
    targetGoalAmount,
    goalTimeframeYears,
    goalMonthlySavingsInput,
    initialDeposit,
    interestRate,
    compoundFrequency,
    contributionFrequency,
    contributionTiming,
  ]);

  // --- SCENARIO COMPARISON CALC ENGINE ---
  const comparisonResults = useMemo(() => {
    // Generate simple timelines for both Scenario A and Scenario B
    // Scenario A: current inputs
    // Scenario B: compareInitialDeposit, compareContribution, compareRate, compareYears
    const maxYears = Math.max(years, compareYears);
    const timeline = [];

    // Calculations Scenario A
    const rA = interestRate / 100;
    const cfA = compoundFrequency;
    const earA = Math.pow(1 + rA / cfA, cfA) - 1;
    const monthlyRateA = Math.pow(1 + earA, 1 / 12) - 1;

    let monthlyContribA = contributionAmount;
    if (contributionFrequency === "weekly") monthlyContribA = (contributionAmount * 52) / 12;
    else if (contributionFrequency === "biweekly") monthlyContribA = (contributionAmount * 26) / 12;
    else if (contributionFrequency === "semi-monthly") monthlyContribA = (contributionAmount * 24) / 12;
    else if (contributionFrequency === "quarterly") monthlyContribA = contributionAmount / 3;
    else if (contributionFrequency === "annually") monthlyContribA = contributionAmount / 12;

    // Calculations Scenario B
    const rB = compareRate / 100;
    const cfB = compoundFrequency; // keep compound freq uniform for comparison
    const earB = Math.pow(1 + rB / cfB, cfB) - 1;
    const monthlyRateB = Math.pow(1 + earB, 1 / 12) - 1;

    let monthlyContribB = compareContribution;
    if (contributionFrequency === "weekly") monthlyContribB = (compareContribution * 52) / 12;
    else if (contributionFrequency === "biweekly") monthlyContribB = (compareContribution * 26) / 12;
    else if (contributionFrequency === "semi-monthly") monthlyContribB = (compareContribution * 24) / 12;
    else if (contributionFrequency === "quarterly") monthlyContribB = compareContribution / 3;
    else if (contributionFrequency === "annually") monthlyContribB = compareContribution / 12;

    let balA = initialDeposit;
    let balB = compareInitialDeposit;

    timeline.push({
      year: 0,
      ScenarioA: Math.round(balA),
      ScenarioB: Math.round(balB),
    });

    for (let yr = 1; yr <= maxYears; yr++) {
      // Run 12 months for Scenario A (if within limit)
      if (yr <= years) {
        for (let m = 1; m <= 12; m++) {
          if (contributionTiming === "beginning") {
            balA += monthlyContribA;
            balA += balA * monthlyRateA;
          } else {
            balA += balA * monthlyRateA + monthlyContribA;
          }
        }
      }

      // Run 12 months for Scenario B (if within limit)
      if (yr <= compareYears) {
        for (let m = 1; m <= 12; m++) {
          if (contributionTiming === "beginning") {
            balB += monthlyContribB;
            balB += balB * monthlyRateB;
          } else {
            balB += balB * monthlyRateB + monthlyContribB;
          }
        }
      }

      timeline.push({
        year: yr,
        ScenarioA: yr <= years ? Math.round(balA) : null,
        ScenarioB: yr <= compareYears ? Math.round(balB) : null,
      });
    }

    return {
      timeline,
      finalA: balA,
      finalB: balB,
    };
  }, [
    initialDeposit,
    contributionAmount,
    contributionFrequency,
    interestRate,
    compoundFrequency,
    years,
    contributionTiming,
    compareInitialDeposit,
    compareContribution,
    compareRate,
    compareYears,
  ]);

  // --- INVESTMENT GROWTH MODE SCENARIOS ---
  const stockMarketScenarios = useMemo(() => {
    // Projections at 4% (Conservative), 7% (Moderate), and 10% (Aggressive)
    const rates = [4, 7, 10];
    const scenarios = rates.map((r) => {
      const rateDec = r / 100;
      const ear = Math.pow(1 + rateDec / compoundFrequency, compoundFrequency) - 1;
      const mRate = Math.pow(1 + ear, 1 / 12) - 1;

      let monthlyContrib = contributionAmount;
      if (contributionFrequency === "weekly") monthlyContrib = (contributionAmount * 52) / 12;
      else if (contributionFrequency === "biweekly") monthlyContrib = (contributionAmount * 26) / 12;
      else if (contributionFrequency === "semi-monthly") monthlyContrib = (contributionAmount * 24) / 12;
      else if (contributionFrequency === "quarterly") monthlyContrib = contributionAmount / 3;
      else if (contributionFrequency === "annually") monthlyContrib = contributionAmount / 12;

      let bal = initialDeposit;
      for (let m = 1; m <= years * 12; m++) {
        if (contributionTiming === "beginning") {
          bal += monthlyContrib;
          bal += bal * mRate;
        } else {
          bal += bal * mRate + monthlyContrib;
        }
      }
      return { rate: r, balance: Math.round(bal) };
    });

    return scenarios;
  }, [initialDeposit, contributionAmount, contributionFrequency, compoundFrequency, years, contributionTiming]);

  // --- EXPORT FEATURES ---
  const exportCSV = () => {
    let csv = "Year,Beginning Balance,Cumulative Contributions,Interest Earned,One-Time Deposits,Ending Balance,Inflation Adjusted Balance\n";
    let startBal = initialDeposit;
    let cumContrib = initialDeposit;
    let cumExtra = 0;

    simulationResults.chartData.forEach((row, i) => {
      if (i === 0) return;
      const extraThisYear = oneTimeDeposits.filter((d) => d.year === row.year).reduce((sum, d) => sum + d.amount, 0);
      cumExtra += extraThisYear;

      const interestThisYear = row.interest - (simulationResults.chartData[i-1].interest || 0);
      const contribThisYear = row.principal - (simulationResults.chartData[i-1].principal || 0);

      csv += `${row.year},${Math.round(startBal)},${Math.round(row.principal)},${Math.round(interestThisYear)},${extraThisYear},${row.balance},${row.realBalance}\n`;
      startBal = row.balance;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `savings-projection-table.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("CSV file exported!");
  };

  const exportTXT = () => {
    let txt = `SAVINGS PROJECTION PLAN REPORT\n`;
    txt += `=====================================\n`;
    txt += `Currency Symbol: ${currencySymbol}\n`;
    txt += `Initial Deposit: ${formatCurrency(initialDeposit)}\n`;
    txt += `Recurring Contribution: ${formatCurrency(contributionAmount)} (${contributionFrequency})\n`;
    txt += `Interest Rate: ${interestRate}%\n`;
    txt += `Years to Grow: ${years} Years\n`;
    txt += `Compounding Frequency: ${compoundFrequency} times/year\n\n`;
    txt += `SUMMARY RESULTS:\n`;
    txt += `-------------------------------------\n`;
    txt += `Final Estimated Balance: ${formatCurrency(simulationResults.finalBalance)}\n`;
    txt += `Total Out-Of-Pocket Contributions: ${formatCurrency(simulationResults.totalDeposits)}\n`;
    txt += `Total Interest Growth: ${formatCurrency(simulationResults.totalInterest)}\n`;
    txt += `Total One-time Additions: ${formatCurrency(simulationResults.totalExtra)}\n`;
    txt += `Real Purchasing Power (Inflation Adjusted): ${formatCurrency(simulationResults.finalRealBalance)}\n\n`;
    txt += `DETAILED TIMELINE PROJECTION:\n`;
    txt += `-------------------------------------\n`;
    txt += `Year | Cumulative Contributions | Total Growth Earned | Ending Balance\n`;
    simulationResults.chartData.forEach((row) => {
      txt += `Yr ${row.year} | ${formatCurrency(row.principal)} | ${formatCurrency(row.interest)} | ${formatCurrency(row.balance)}\n`;
    });

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `savings-plan-report.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Report TXT file exported!");
  };

  const exportJSON = () => {
    const data = {
      calculator: "Savings Calculator Pro",
      timestamp: Date.now(),
      inputs: {
        initialDeposit,
        contributionAmount,
        contributionFrequency,
        interestRate,
        compoundFrequency,
        years,
        contributionTiming,
        inflationRate,
        advanced: {
          variableRateEnabled,
          variableRateAfterYears,
          variableRateValue,
          annualIncreaseEnabled,
          annualIncreaseRate,
          oneTimeDeposits,
        },
      },
      results: {
        finalBalance: simulationResults.finalBalance,
        finalRealBalance: simulationResults.finalRealBalance,
        totalDeposits: simulationResults.totalDeposits,
        totalInterest: simulationResults.totalInterest,
        totalExtra: simulationResults.totalExtra,
        chartData: simulationResults.chartData,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `savings-calculator-data.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("JSON data exported!");
  };

  // --- COPY FEATURES ---
  const handleCopySummary = () => {
    const summaryText = `Savings Projections Summary:\n` +
      `- Starting Amount: ${formatCurrency(initialDeposit)}\n` +
      `- Contributions: ${formatCurrency(contributionAmount)} (${contributionFrequency})\n` +
      `- Growth Interest Rate: ${interestRate}%\n` +
      `- Time Period: ${years} Years\n` +
      `- Final Projected Value: ${formatCurrency(simulationResults.finalBalance)}\n` +
      `- Total Out-Of-Pocket Deposits: ${formatCurrency(simulationResults.totalDeposits)}\n` +
      `- Total Growth Profits: ${formatCurrency(simulationResults.totalInterest)}\n` +
      `- Real Value (Adjusted for ${inflationRate}% Inflation): ${formatCurrency(simulationResults.finalRealBalance)}`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopiedText(true);
      triggerToast("Summary copied to clipboard!");
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce border border-slate-700">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 flex-wrap gap-1 p-1 bg-slate-100/60 dark:bg-slate-900/50 rounded-2xl">
        <button
          onClick={() => setActiveTab("calculator")}
          className={`flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "calculator"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Savings Growth
        </button>
        <button
          onClick={() => setActiveTab("goalPlanner")}
          className={`flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "goalPlanner"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <Target className="w-4 h-4" />
          Goal Planner
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          className={`flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "comparison"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Compare Plans
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "history"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <History className="w-4 h-4" />
          Saved & History
        </button>
      </div>

      {/* Main Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: PARAMETER INPUTS */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Configure Calculator
            </h2>
            {/* Currency Selector */}
            <div className="flex gap-2 items-center">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Currency</label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg p-1"
              >
                {currencies.map((curr) => (
                  <option key={curr.label} value={curr.symbol}>
                    {curr.label}
                  </option>
                ))}
              </select>
              {selectedCurrency === "" && (
                <input
                  type="text"
                  placeholder="Symbol"
                  value={customCurrency}
                  onChange={(e) => setCustomCurrency(e.target.value)}
                  className="w-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-center text-xs font-bold text-slate-700 dark:text-slate-300"
                />
              )}
            </div>
          </div>

          {/* TAB-SPECIFIC INPUT FORMS */}
          {activeTab === "calculator" && (
            <div className="space-y-6">
              {/* Initial Principal */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Initial Principal</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Starting balance</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Recurring Savings Contributions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Contribution</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Frequency</label>
                  <select
                    value={contributionFrequency}
                    onChange={(e) => setContributionFrequency(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-white font-bold"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="semi-monthly">Semi-monthly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>

              {/* Growth Interest Rate & Timeline Period */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    Interest Rate
                    <span className="group relative">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover:block bg-slate-800 text-white text-xs p-2 rounded shadow-lg text-center font-normal z-10">
                        Annual Percentage Yield (APY) expected return on your savings.
                      </span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="w-full pl-4 pr-8 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white font-bold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
                      %
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Savings Period</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                      className="w-full pl-4 pr-16 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white font-bold"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xs font-bold">
                      Years
                    </span>
                  </div>
                </div>
              </div>

              {/* Advanced Savings Features Accordion */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                >
                  <span>{showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}</span>
                  <span>{showAdvanced ? "−" : "+"}</span>
                </button>

                {showAdvanced && (
                  <div className="mt-4 space-y-6 border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-2xl animate-fadeIn">
                    {/* Compounding & Contribution Timing */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Compounding</label>
                        <select
                          value={compoundFrequency}
                          onChange={(e) => setCompoundFrequency(Number(e.target.value))}
                          className="w-full px-2 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300"
                        >
                          <option value={365}>Daily compounding</option>
                          <option value={12}>Monthly compounding</option>
                          <option value={4}>Quarterly compounding</option>
                          <option value={1}>Annually compounding</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Contribution timing</label>
                        <select
                          value={contributionTiming}
                          onChange={(e) => setContributionTiming(e.target.value)}
                          className="w-full px-2 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300"
                        >
                          <option value="beginning">Beginning of Period</option>
                          <option value="end">End of Period</option>
                        </select>
                      </div>
                    </div>

                    {/* Inflation Rate Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
                        <span>Expected Inflation Rate</span>
                        <span className="text-slate-400">{inflationRate}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>

                    {/* Annual Increase in contributions */}
                    <div className="space-y-3 border-t border-slate-200/50 dark:border-slate-800 pt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={annualIncreaseEnabled}
                          onChange={(e) => setAnnualIncreaseEnabled(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                        />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Step-up contributions annually
                        </span>
                      </label>

                      {annualIncreaseEnabled && (
                        <div className="grid grid-cols-2 gap-4 items-center animate-fadeIn">
                          <label className="text-xs text-slate-500">Increase rate (%):</label>
                          <input
                            type="number"
                            step="0.1"
                            value={annualIncreaseRate}
                            onChange={(e) => setAnnualIncreaseRate(Math.max(0, Number(e.target.value)))}
                            className="px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-center font-bold text-slate-800 dark:text-white"
                          />
                        </div>
                      )}
                    </div>

                    {/* Variable Interest Rate */}
                    <div className="space-y-3 border-t border-slate-200/50 dark:border-slate-800 pt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={variableRateEnabled}
                          onChange={(e) => setVariableRateEnabled(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                        />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Add Variable Interest Rate
                        </span>
                      </label>

                      {variableRateEnabled && (
                        <div className="grid grid-cols-2 gap-2 animate-fadeIn text-xs">
                          <div className="space-y-1">
                            <label className="text-slate-500">After Year:</label>
                            <input
                              type="number"
                              value={variableRateAfterYears}
                              onChange={(e) =>
                                setVariableRateAfterYears(Math.min(years, Math.max(1, Number(e.target.value))))
                              }
                              className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-bold text-slate-800 dark:text-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-500">Rate adjusts to (%):</label>
                            <input
                              type="number"
                              step="0.01"
                              value={variableRateValue}
                              onChange={(e) => setVariableRateValue(Math.max(0, Number(e.target.value)))}
                              className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-bold text-slate-800 dark:text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Extra One-time contributions list */}
                    <div className="space-y-3 border-t border-slate-200/50 dark:border-slate-800 pt-3">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Extra One-time Deposits
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Year</label>
                          <input
                            type="number"
                            value={otYear}
                            min={1}
                            max={years}
                            onChange={(e) => setOtYear(Math.min(years, Math.max(1, Number(e.target.value))))}
                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-white"
                          />
                        </div>
                        <div className="flex-2">
                          <label className="text-[10px] text-slate-500 font-bold block mb-0.5">Amount ({currencySymbol})</label>
                          <input
                            type="number"
                            value={otAmount}
                            onChange={(e) => setOtAmount(Math.max(0, Number(e.target.value)))}
                            className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-white"
                          />
                        </div>
                        <button
                          onClick={addOneTimeDeposit}
                          className="self-end px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </button>
                      </div>

                      {/* Display existing one-time deposits */}
                      {oneTimeDeposits.length > 0 && (
                        <div className="space-y-1 mt-2">
                          {oneTimeDeposits.map((dep) => (
                            <div
                              key={dep.id}
                              className="flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs"
                            >
                              <span className="text-slate-600 dark:text-slate-400">
                                Year {dep.year}: <strong className="text-slate-800 dark:text-white">{formatCurrency(dep.amount)}</strong>
                              </span>
                              <button
                                onClick={() => removeOneTimeDeposit(dep.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* History Name Saver */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Name this scenario..."
                  value={newScenarioName}
                  onChange={(e) => setNewScenarioName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300"
                />
                <button
                  onClick={handleSaveScenario}
                  className="px-4 py-2 bg-slate-850 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <History className="w-3.5 h-3.5" />
                  Save Plan
                </button>
              </div>
            </div>
          )}

          {activeTab === "goalPlanner" && (
            <div className="space-y-6">
              {/* Goal Planner sub-toggle */}
              <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => setGoalMode("target")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    goalMode === "target"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Find Required Savings
                </button>
                <button
                  onClick={() => setGoalMode("time")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    goalMode === "time"
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Find Time Required
                </button>
              </div>

              {/* Goal Target Balance */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Target Goal Balance</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    value={targetGoalAmount}
                    onChange={(e) => setTargetGoalAmount(Math.max(1, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Goal Target Timeframe (For finding required savings) */}
              {goalMode === "target" && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Goal Timeframe (Years)</label>
                  <input
                    type="number"
                    value={goalTimeframeYears}
                    onChange={(e) => setGoalTimeframeYears(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>
              )}

              {/* Goal Contribution Input (For finding time required) */}
              {goalMode === "time" && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Recurring Savings Amount ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={goalMonthlySavingsInput}
                    onChange={(e) => setGoalMonthlySavingsInput(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 p-4 rounded-2xl text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                <strong>Goal Planning Rules:</strong> Uses the active initial deposit of{" "}
                <strong>{formatCurrency(initialDeposit)}</strong> and growth interest rate of{" "}
                <strong>{interestRate}%</strong> as calculation baselines.
              </div>
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="space-y-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                Configure Scenario B
              </div>

              {/* Scenario B: Initial deposit */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Initial Principal</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    value={compareInitialDeposit}
                    onChange={(e) => setCompareInitialDeposit(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Scenario B: Contribution */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Recurring Contribution ({contributionFrequency})
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    value={compareContribution}
                    onChange={(e) => setCompareContribution(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Scenario B: Interest Rate & Years */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={compareRate}
                    onChange={(e) => setCompareRate(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Period (Years)</label>
                  <input
                    type="number"
                    value={compareYears}
                    onChange={(e) => setCompareYears(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-4 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300">
                <strong>Scenario A</strong> uses parameters from the main calculator tab. Compare their curves and ending balances on the right panel.
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                Calculation History
              </h3>

              {savedScenarios.length === 0 ? (
                <div className="text-slate-400 text-xs py-8 text-center">
                  No saved plans yet. Go back to main tab and enter a name to save.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedScenarios.map((scen) => (
                    <div
                      key={scen.id}
                      className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 p-3 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-800 dark:text-white truncate">{scen.name}</div>
                        <div className="text-[10px] text-slate-400">
                          Init: {scen.currency}{scen.initialDeposit.toLocaleString()} | Cont: {scen.currency}
                          {scen.contributionAmount.toLocaleString()} | Rate: {scen.interestRate}%
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleRestoreScenario(scen)}
                          className="bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 px-2 py-1 rounded font-bold"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeleteScenario(scen.id)}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-1 rounded"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: CALCULATION RESULTS & VISUALIZATIONS */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between min-h-[500px]">
          {/* TAB 1: SAVINGS PROJECTIONS DASHBOARD */}
          {activeTab === "calculator" && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Dashboard metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm md:col-span-3">
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                    <span>Projected Future Value</span>
                    {inflationRate > 0 && (
                      <span className="text-[10px] text-slate-400 capitalize tracking-normal font-medium">
                        Adjusted for {inflationRate}% inflation
                      </span>
                    )}
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white">
                    {formatCurrency(simulationResults.finalBalance)}
                  </div>
                  {inflationRate > 0 && (
                    <div className="text-xs text-slate-500 font-semibold mt-2 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
                      <span>Real Purchasing Power:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">
                        {formatCurrency(simulationResults.finalRealBalance)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Contributions</div>
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {formatCurrency(simulationResults.totalDeposits)}
                  </div>
                  {simulationResults.totalExtra > 0 && (
                    <div className="text-[10px] text-slate-400">
                      Incl. {formatCurrency(simulationResults.totalExtra)} extras
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">Interest Earned</div>
                  <div className="text-lg font-bold text-emerald-500 dark:text-emerald-400">
                    +{formatCurrency(simulationResults.totalInterest)}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Simple Yield Yield</div>
                  <div className="text-lg font-bold text-slate-850 dark:text-slate-300">
                    {Math.round((simulationResults.totalInterest / simulationResults.totalDeposits) * 100)}%
                  </div>
                </div>
              </div>

              {/* Chart visualization */}
              <div className="h-[280px] w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={simulationResults.chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorExtra" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      tickFormatter={(val) => `Yr ${val}`}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      tickFormatter={(val) =>
                        `${currencySymbol}${
                          val >= 1000000
                            ? (val / 1000000).toFixed(1) + "M"
                            : val >= 1000
                            ? (val / 1000).toFixed(0) + "k"
                            : val
                        }`
                      }
                      width={50}
                    />
                    <Tooltip
                      formatter={(value: any, name: any) => [
                        formatCurrency(Number(value)),
                        name === "interest"
                          ? "Interest Accrued"
                          : name === "extra"
                          ? "One-time Additions"
                          : "Contributions Principal",
                      ]}
                      labelFormatter={(label) => `Year: ${label}`}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
                        backgroundColor: "#fff",
                        color: "#000",
                      }}
                    />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10, marginTop: 10 }} />
                    <Area
                      type="monotone"
                      dataKey="principal"
                      stackId="1"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPrincipal)"
                      name="principal"
                    />
                    <Area
                      type="monotone"
                      dataKey="extra"
                      stackId="1"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorExtra)"
                      name="extra"
                    />
                    <Area
                      type="monotone"
                      dataKey="interest"
                      stackId="1"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorInterest)"
                      name="interest"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stock Market Investment comparisons (Optional Mode) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Alternative Market Projections (Disclaimer Appended)
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {stockMarketScenarios.map((scen) => (
                    <div key={scen.rate} className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="font-bold text-slate-400 dark:text-slate-500 mb-0.5">{scen.rate === 4 ? "Conservative" : scen.rate === 7 ? "Moderate" : "Aggressive"} ({scen.rate}%)</div>
                      <div className="font-extrabold text-slate-850 dark:text-white">{formatCurrency(scen.balance)}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal italic text-center">
                  * Market projections are illustrative approximations and do not guarantee actual portfolio returns.
                </div>
              </div>

              {/* Utility Export & Copy toolbar */}
              <div className="flex flex-wrap gap-2 justify-end border-t border-slate-200 dark:border-slate-800 pt-4">
                <button
                  onClick={handleCopySummary}
                  className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Plan Summary
                </button>
                <div className="relative group">
                  <button className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-all shadow-sm">
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                  <div className="absolute bottom-full right-0 mb-1 hidden group-hover:block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded-lg shadow-xl z-20 min-w-[120px]">
                    <button
                      onClick={exportCSV}
                      className="w-full text-left text-xs font-semibold px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                    >
                      Export CSV
                    </button>
                    <button
                      onClick={exportTXT}
                      className="w-full text-left text-xs font-semibold px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                    >
                      Export TXT
                    </button>
                    <button
                      onClick={exportJSON}
                      className="w-full text-left text-xs font-semibold px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                    >
                      Export JSON
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="w-full text-left text-xs font-semibold px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                    >
                      Print Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SAVINGS GOAL PLANNER */}
          {activeTab === "goalPlanner" && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-2 flex items-center gap-1.5">
                  <Target className="w-5 h-5 text-blue-500" />
                  Goal Planner Insights
                </h3>
                <p className="text-slate-500 text-xs">
                  See how close you are to reaching your target goal based on current parameters.
                </p>
              </div>

              {/* Progress Bar & Target Indicator */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-center space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  <span>Current Starting Principal</span>
                  <span>Target Goal Amount</span>
                </div>
                <div className="flex items-center justify-between font-extrabold text-slate-800 dark:text-white">
                  <span>{formatCurrency(initialDeposit)}</span>
                  <span className="text-blue-600 dark:text-blue-400">{formatCurrency(targetGoalAmount)}</span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 overflow-hidden relative">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${goalResults.progressPercent}%` }}
                  />
                </div>
                <div className="text-xs font-bold text-slate-500">
                  You have funded <span className="text-blue-600 dark:text-blue-400">{Math.round(goalResults.progressPercent)}%</span> of your target goal.
                </div>
              </div>

              {/* Result Statement Card */}
              <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                {goalMode === "target" ? (
                  <>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                      Required Recurring Savings
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                      {formatCurrency(goalResults.requiredContribution)}
                    </div>
                    <p className="text-slate-500 text-xs font-medium">
                      You must save this amount <strong>{contributionFrequency}</strong> for{" "}
                      <strong>{goalTimeframeYears} years</strong> at {interestRate}% interest to reach your goal.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                      Time Frame Estimate
                    </div>
                    {goalResults.isImpossible ? (
                      <div className="text-red-500 font-extrabold text-xl">Impossible with current contribution</div>
                    ) : (
                      <>
                        <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                          {goalResults.timeNeeded} Years
                        </div>
                        <p className="text-slate-500 text-xs font-medium">
                          It will take approximately <strong>{goalResults.timeNeeded} years</strong> to reach your{" "}
                          <strong>{formatCurrency(targetGoalAmount)}</strong> savings goal.
                        </p>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Predefined templates helper */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Select Goal Presets
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-[10px] font-bold">
                  <button
                    onClick={() => {
                      setTargetGoalAmount(15000);
                      setGoalTimeframeYears(3);
                      triggerToast("Goal template loaded: Emergency Fund");
                    }}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded-lg hover:border-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    🛡️ Emergency Fund
                  </button>
                  <button
                    onClick={() => {
                      setTargetGoalAmount(5000);
                      setGoalTimeframeYears(1);
                      triggerToast("Goal template loaded: Vacation Savings");
                    }}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded-lg hover:border-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    ✈️ Vacation Fund
                  </button>
                  <button
                    onClick={() => {
                      setTargetGoalAmount(60000);
                      setGoalTimeframeYears(5);
                      triggerToast("Goal template loaded: House Down Payment");
                    }}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded-lg hover:border-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    🏠 House Deposit
                  </button>
                  <button
                    onClick={() => {
                      setTargetGoalAmount(1000000);
                      setGoalTimeframeYears(30);
                      triggerToast("Goal template loaded: Retirement Goals");
                    }}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 rounded-lg hover:border-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    🧓 Retirement Nest
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCENARIO COMPARISON */}
          {activeTab === "comparison" && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-2">
                  Scenario Comparison Analysis
                </h3>
                <p className="text-slate-500 text-xs">
                  Model and compare two different plans to see which yields the highest wealth growth over time.
                </p>
              </div>

              {/* Comparison table */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">Scenario A Ending</div>
                  <div className="text-2xl font-black text-blue-700 dark:text-blue-400">
                    {formatCurrency(comparisonResults.finalA)}
                  </div>
                </div>

                <div className="bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">Scenario B Ending</div>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {formatCurrency(comparisonResults.finalB)}
                  </div>
                </div>
              </div>

              {/* Overlapping Line Chart */}
              <div className="h-[280px] w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparisonResults.timeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      tickFormatter={(val) => `Yr ${val}`}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      tickFormatter={(val) =>
                        `${currencySymbol}${
                          val >= 1000000
                            ? (val / 1000000).toFixed(1) + "M"
                            : val >= 1000
                            ? (val / 1000).toFixed(0) + "k"
                            : val
                        }`
                      }
                      width={50}
                    />
                    <Tooltip
                      formatter={(value: any) => formatCurrency(Number(value))}
                      labelFormatter={(label) => `Year: ${label}`}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
                        backgroundColor: "#fff",
                        color: "#000",
                      }}
                    />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="ScenarioA"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                      name="Scenario A Plan"
                    />
                    <Line
                      type="monotone"
                      dataKey="ScenarioB"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={false}
                      name="Scenario B Plan"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 4: HISTORY SYSTEM */}
          {activeTab === "history" && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-2">
                  Plan Comparison Dashboard
                </h3>
                <p className="text-slate-500 text-xs">
                  Restore previously saved settings or compare past runs against your current workspace configurations.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4 flex-1 flex flex-col justify-center">
                <div className="text-center space-y-2">
                  <div className="text-slate-350 dark:text-slate-650 flex justify-center">
                    <History className="w-12 h-12" />
                  </div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">Compare with History</h4>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                    By saving multiple runs as named plans, you can toggle between configurations to test growth rates, different contributions, and compounding periods instantly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DETAILED AMORTIZATION PROJECTION TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">
          Detailed Year-by-Year Savings Projection Table
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white text-center">
                <th className="py-3 px-4 text-left">Year</th>
                <th className="py-3 px-4">Contributions (Principal)</th>
                <th className="py-3 px-4">Extras (One-time)</th>
                <th className="py-3 px-4">Growth Interest Earned</th>
                <th className="py-3 px-4">Ending Balance (Nominal)</th>
                <th className="py-3 px-4">Purchasing Power (Inflation Adjusted)</th>
              </tr>
            </thead>
            <tbody>
              {simulationResults.chartData.map((row, i) => {
                const extraThisYear = oneTimeDeposits
                  .filter((d) => d.year === row.year)
                  .reduce((sum, d) => sum + d.amount, 0);

                const interestThisYear = row.interest - (simulationResults.chartData[i - 1]?.interest || 0);

                return (
                  <tr
                    key={row.year}
                    className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 text-center"
                  >
                    <td className="py-3 px-4 text-left text-slate-800 dark:text-slate-200 font-bold">
                      Year {row.year}
                    </td>
                    <td className="py-3 px-4">{formatCurrency(row.principal)}</td>
                    <td className="py-3 px-4 text-amber-600 dark:text-amber-400">
                      {extraThisYear > 0 ? `+${formatCurrency(extraThisYear)}` : "—"}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400">
                      {interestThisYear > 0 ? `+${formatCurrency(interestThisYear)}` : "—"}
                    </td>
                    <td className="py-3 px-4 text-slate-900 dark:text-white font-extrabold">
                      {formatCurrency(row.balance)}
                    </td>
                    <td className="py-3 px-4 text-slate-400 dark:text-slate-500">
                      {row.year === 0 ? "—" : formatCurrency(row.realBalance)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
