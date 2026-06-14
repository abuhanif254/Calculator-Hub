"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  DollarSign, Percent, Calendar, Calculator, Download, Printer, Share2, Info, 
  HelpCircle, ChevronDown, ChevronUp, ChevronRight, TrendingDown, Clock, Scale,
  User, Users, Award, ShieldAlert, FileSpreadsheet, RefreshCw, CheckCircle2, AlertCircle
} from "lucide-react";
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement 
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

// Register Chart.js elements
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement
);

interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  overpayment: number;
  balance: number;
}

export function MortgageCalculatorUkTool() {
  // Core Inputs
  const [propertyValue, setPropertyValue] = useState<number>(300000);
  const [deposit, setDeposit] = useState<number>(30000);
  const [depositPercent, setDepositPercent] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(4.8);
  const [termYears, setTermYears] = useState<number>(25);
  const [repaymentType, setRepaymentType] = useState<'repayment' | 'interest-only'>('repayment');
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'fortnightly' | 'weekly'>('monthly');

  // Advanced Options Accordion State
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Advanced Inputs: Fees
  const [productFee, setProductFee] = useState<number>(999);
  const [brokerFee, setBrokerFee] = useState<number>(495);
  const [legalFee, setLegalFee] = useState<number>(1200);
  const [capitalizeFees, setCapitalizeFees] = useState<boolean>(false);

  // Advanced Inputs: Overpayments
  const [monthlyOverpayment, setMonthlyOverpayment] = useState<number>(0);
  const [annualOverpayment, setAnnualOverpayment] = useState<number>(0);
  const [oneOffOverpayment, setOneOffOverpayment] = useState<number>(0);
  const [oneOffMonth, setOneOffMonth] = useState<number>(12); // after 1 year

  // Advanced Inputs: Affordability Check
  const [incomeSingle, setIncomeSingle] = useState<number>(45000);
  const [incomeJoint, setIncomeJoint] = useState<number>(0);

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Setup isClient check to handle Chart hydration correctly
  useEffect(() => {
    setIsClient(true);
    // Parse URL search parameters on mount if they exist
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('pv')) setPropertyValue(Number(params.get('pv')));
      if (params.get('dp')) {
        const dpVal = Number(params.get('dp'));
        setDeposit(dpVal);
      }
      if (params.get('ir')) setInterestRate(Number(params.get('ir')));
      if (params.get('term')) setTermYears(Number(params.get('term')));
      if (params.get('type')) setRepaymentType(params.get('type') as any);
      if (params.get('freq')) setPaymentFrequency(params.get('freq') as any);
    }
  }, []);

  // Sync Deposit Amount & Deposit Percent
  const handleDepositChange = (value: number) => {
    setDeposit(value);
    if (propertyValue > 0) {
      const pct = (value / propertyValue) * 100;
      setDepositPercent(Number(pct.toFixed(2)));
    }
  };

  const handleDepositPercentChange = (pct: number) => {
    setDepositPercent(pct);
    if (propertyValue > 0) {
      const amt = (pct / 100) * propertyValue;
      setDeposit(Math.round(amt));
    }
  };

  // Sync Property Value updates with Deposit %
  const handlePropertyValueChange = (value: number) => {
    setPropertyValue(value);
    const amt = (depositPercent / 100) * value;
    setDeposit(Math.round(amt));
  };

  // Helper formatting functions
  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);
  };
  const formatGBPDec = (val: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 }).format(val);
  };

  const triggerNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // ─── MORTGAGE CALCULATIONS ───
  const calculations = useMemo(() => {
    const propertyVal = propertyValue;
    const depositAmt = deposit;
    const ltv = propertyVal > 0 ? ((propertyVal - depositAmt) / propertyVal) * 100 : 0;
    
    // Total Fees upfront or capitalized
    const totalFees = productFee + brokerFee + legalFee;
    
    // Principal Loan Amount
    let principal = Math.max(propertyVal - depositAmt, 0);
    if (capitalizeFees) {
      principal += totalFees;
    }

    // Payments per year configuration
    let paymentsPerYear = 12;
    if (paymentFrequency === 'fortnightly') paymentsPerYear = 26;
    if (paymentFrequency === 'weekly') paymentsPerYear = 52;

    const totalPeriods = termYears * paymentsPerYear;
    const periodicRate = (interestRate / 100) / paymentsPerYear;

    // Standard baseline payment (without overpayments)
    let standardPeriodicPayment = 0;
    if (repaymentType === 'interest-only') {
      standardPeriodicPayment = principal * periodicRate;
    } else {
      if (periodicRate === 0) {
        standardPeriodicPayment = principal / totalPeriods;
      } else {
        standardPeriodicPayment = principal * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / (Math.pow(1 + periodicRate, totalPeriods) - 1);
      }
    }

    // 1. Generate Baseline Amortization Schedule (Without Overpayments)
    const baselineSchedule: AmortizationRow[] = [];
    let baselineBalance = principal;
    let baselineTotalInterest = 0;
    
    for (let period = 1; period <= totalPeriods; period++) {
      const interestPaid = baselineBalance * periodicRate;
      let principalPaid = 0;
      let paymentAmount = standardPeriodicPayment;

      if (repaymentType === 'interest-only') {
        principalPaid = 0;
        paymentAmount = interestPaid;
        if (period === totalPeriods) {
          principalPaid = baselineBalance; // paid at end
          paymentAmount += baselineBalance;
        }
      } else {
        principalPaid = paymentAmount - interestPaid;
        if (baselineBalance < principalPaid) {
          principalPaid = baselineBalance;
          paymentAmount = principalPaid + interestPaid;
        }
      }

      baselineBalance = Math.max(baselineBalance - principalPaid, 0);
      baselineTotalInterest += interestPaid;

      baselineSchedule.push({
        period,
        payment: paymentAmount,
        principal: principalPaid,
        interest: interestPaid,
        overpayment: 0,
        balance: baselineBalance
      });

      if (baselineBalance <= 0) break;
    }

    // 2. Generate Actual Amortization Schedule (With Overpayments)
    const actualSchedule: AmortizationRow[] = [];
    let actualBalance = principal;
    let actualTotalInterest = 0;
    let actualTotalPaid = 0;
    let monthsToPayoff = 0;

    for (let period = 1; period <= totalPeriods * 2; period++) {
      if (actualBalance <= 0) break;
      
      const interestPaid = actualBalance * periodicRate;
      let principalPaid = 0;
      let paymentAmount = standardPeriodicPayment;

      if (repaymentType === 'interest-only') {
        principalPaid = 0;
        paymentAmount = interestPaid;
      } else {
        principalPaid = paymentAmount - interestPaid;
      }

      // Calculate Overpayment for this period
      let overpaymentAmt = monthlyOverpayment;
      
      // Annual overpayment (applied every 12 months, or equivalent weeks)
      if (period % paymentsPerYear === 0) {
        overpaymentAmt += annualOverpayment;
      }
      
      // One-off lump sum
      if (period === oneOffMonth) {
        overpaymentAmt += oneOffOverpayment;
      }

      // Limit overpayment to remaining balance
      let totalPrincipalPaid = principalPaid + overpaymentAmt;
      if (actualBalance < totalPrincipalPaid) {
        totalPrincipalPaid = actualBalance;
        overpaymentAmt = Math.max(actualBalance - principalPaid, 0);
      }

      actualBalance = Math.max(actualBalance - totalPrincipalPaid, 0);
      actualTotalInterest += interestPaid;
      actualTotalPaid += paymentAmount + overpaymentAmt;
      monthsToPayoff = period;

      actualSchedule.push({
        period,
        payment: paymentAmount + overpaymentAmt,
        principal: totalPrincipalPaid - overpaymentAmt,
        interest: interestPaid,
        overpayment: overpaymentAmt,
        balance: actualBalance
      });
    }

    // Savings statistics
    const interestSaved = Math.max(baselineTotalInterest - actualTotalInterest, 0);
    const baselineMonths = baselineSchedule.length;
    const monthsSaved = Math.max(baselineMonths - monthsToPayoff, 0);
    
    let yearsSaved = 0;
    let remainingMonthsSaved = 0;
    if (paymentFrequency === 'monthly') {
      yearsSaved = Math.floor(monthsSaved / 12);
      remainingMonthsSaved = monthsSaved % 12;
    } else if (paymentFrequency === 'fortnightly') {
      const weeksSaved = monthsSaved * 2;
      yearsSaved = Math.floor(weeksSaved / 52);
    } else {
      yearsSaved = Math.floor(monthsSaved / 52);
    }

    // Affordability metrics
    const totalIncome = incomeSingle + incomeJoint;
    const loanToIncomeRatio = totalIncome > 0 ? principal / totalIncome : 0;
    let affordabilityStatus: 'low' | 'moderate' | 'high' = 'low';
    let affordabilityMsg = '';
    
    if (loanToIncomeRatio === 0) {
      affordabilityStatus = 'low';
      affordabilityMsg = 'Enter income below to check borrowing capacity.';
    } else if (loanToIncomeRatio <= 4.0) {
      affordabilityStatus = 'low';
      affordabilityMsg = `Comfortable. Borrowing is ${loanToIncomeRatio.toFixed(1)}x income, which is well within the typical UK 4.5x lending threshold.`;
    } else if (loanToIncomeRatio <= 4.5) {
      affordabilityStatus = 'moderate';
      affordabilityMsg = `Moderate. Borrowing is ${loanToIncomeRatio.toFixed(1)}x income. Most UK banks will lend up to this ratio subject to credit checks.`;
    } else {
      affordabilityStatus = 'high';
      affordabilityMsg = `High Risk. Borrowing is ${loanToIncomeRatio.toFixed(1)}x income, exceeding standard UK mortgage multiples (4.5x). Approval may be difficult.`;
    }

    // LTV tier advice
    let nextLtvTier = 60;
    let nextLtvAdvice = '';
    const currentLtv = ltv;
    
    if (currentLtv > 95) {
      nextLtvAdvice = "Warning: Most UK lenders require a minimum 5% deposit (95% LTV) for standard residential loans.";
    } else if (currentLtv > 90) {
      nextLtvTier = 90;
      const targetDeposit = propertyVal * 0.10;
      const extraNeeded = targetDeposit - depositAmt;
      nextLtvAdvice = `Put down an extra ${formatGBP(extraNeeded)} to reach a 10% deposit (90% LTV). This unlocks better interest rates.`;
    } else if (currentLtv > 85) {
      nextLtvTier = 85;
      const targetDeposit = propertyVal * 0.15;
      const extraNeeded = targetDeposit - depositAmt;
      nextLtvAdvice = `Put down an extra ${formatGBP(extraNeeded)} to reach a 15% deposit (85% LTV) and access cheaper deals.`;
    } else if (currentLtv > 80) {
      nextLtvTier = 80;
      const targetDeposit = propertyVal * 0.20;
      const extraNeeded = targetDeposit - depositAmt;
      nextLtvAdvice = `Put down an extra ${formatGBP(extraNeeded)} to reach a 20% deposit (80% LTV) to save on rates.`;
    } else if (currentLtv > 75) {
      nextLtvTier = 75;
      const targetDeposit = propertyVal * 0.25;
      const extraNeeded = targetDeposit - depositAmt;
      nextLtvAdvice = `Put down an extra ${formatGBP(extraNeeded)} to reach a 25% deposit (75% LTV). This is a major pricing bracket for UK lenders.`;
    } else if (currentLtv > 60) {
      nextLtvTier = 60;
      const targetDeposit = propertyVal * 0.40;
      const extraNeeded = targetDeposit - depositAmt;
      nextLtvAdvice = `Put down an extra ${formatGBP(extraNeeded)} to reach a 40% deposit (60% LTV). This unlocks the absolute lowest rates in the UK market.`;
    } else {
      nextLtvAdvice = "Excellent! You are in the lowest LTV pricing bracket (<60% LTV), unlocking premium rates.";
    }

    return {
      loanAmount: principal,
      ltv: currentLtv,
      periodicPayment: standardPeriodicPayment,
      totalInterest: actualTotalInterest,
      totalPayments: actualTotalPaid,
      totalFees,
      interestSaved,
      monthsSaved,
      yearsSaved,
      remainingMonthsSaved,
      schedule: actualSchedule,
      baselineSchedule,
      loanToIncomeRatio,
      affordabilityStatus,
      affordabilityMsg,
      nextLtvAdvice
    };
  }, [
    propertyValue, deposit, interestRate, termYears, repaymentType, 
    paymentFrequency, productFee, brokerFee, legalFee, capitalizeFees, 
    monthlyOverpayment, annualOverpayment, oneOffOverpayment, oneOffMonth,
    incomeSingle, incomeJoint
  ]);

  // Page index calculations
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(calculations.schedule.length / ITEMS_PER_PAGE);
  const paginatedSchedule = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return calculations.schedule.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [calculations.schedule, currentPage]);

  // Share Scenario URL generator
  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin + window.location.pathname;
      const query = `?pv=${propertyValue}&dp=${deposit}&ir=${interestRate}&term=${termYears}&type=${repaymentType}&freq=${paymentFrequency}`;
      navigator.clipboard.writeText(baseUrl + query);
      setCopied(true);
      triggerNotification('success', 'Scenario share link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Export Amortization Schedule to CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Payment Period,Payment Amount (GBP),Principal Paid (GBP),Interest Paid (GBP),Overpayments (GBP),Remaining Balance (GBP)\n";
    
    calculations.schedule.forEach(row => {
      csvContent += `${row.period},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.overpayment.toFixed(2)},${row.balance.toFixed(2)}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexus_uk_mortgage_amortization.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification('success', 'CSV spreadsheet exported successfully.');
  };

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  // Chart 1: Mortgage Composition (Pie)
  const pieChartData = useMemo(() => {
    return {
      labels: ["Principal Loan", "Total Interest", "Mortgage Fees"],
      datasets: [
        {
          data: [
            calculations.loanAmount,
            calculations.totalInterest,
            calculations.totalFees
          ],
          backgroundColor: ["#518231", "#3b82f6", "#f59e0b"],
          borderWidth: 1,
        }
      ]
    };
  }, [calculations]);

  // Chart 2: Amortization Balance Line Chart
  const lineChartData = useMemo(() => {
    // Sub-sample data to prevent chart lag (max 30 points)
    const pointsLimit = 30;
    const scheduleLength = calculations.schedule.length;
    const step = Math.max(Math.floor(scheduleLength / pointsLimit), 1);
    
    const labels: string[] = [];
    const overpaymentDataPoints: number[] = [];
    const baselineDataPoints: number[] = [];

    // Add point 0
    labels.push("Start");
    overpaymentDataPoints.push(calculations.loanAmount);
    baselineDataPoints.push(calculations.loanAmount);

    for (let i = step - 1; i < scheduleLength; i += step) {
      const periodLabel = paymentFrequency === 'monthly' 
        ? `Yr ${Math.round((i + 1) / 12)}` 
        : `P ${i + 1}`;
      labels.push(periodLabel);
      overpaymentDataPoints.push(calculations.schedule[i].balance);
      
      const baselineRow = calculations.baselineSchedule[i] || calculations.baselineSchedule[calculations.baselineSchedule.length - 1];
      baselineDataPoints.push(baselineRow ? baselineRow.balance : 0);
    }

    // Ensure final point is 0
    if (calculations.schedule[scheduleLength - 1].balance === 0) {
      labels.push("Paid");
      overpaymentDataPoints.push(0);
      
      const lastBaseline = calculations.baselineSchedule[calculations.baselineSchedule.length - 1];
      baselineDataPoints.push(lastBaseline ? lastBaseline.balance : 0);
    }

    return {
      labels,
      datasets: [
        {
          label: "With Overpayments",
          data: overpaymentDataPoints,
          borderColor: "#518231",
          backgroundColor: "rgba(81, 130, 49, 0.1)",
          tension: 0.2,
          fill: true
        },
        {
          label: "Standard Mortgage",
          data: baselineDataPoints,
          borderColor: "#cbd5e1",
          borderDash: [5, 5],
          tension: 0.2,
          fill: false
        }
      ]
    };
  }, [calculations, paymentFrequency]);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-white animate-fade-in transition-all ${
          notification.type === 'success' ? 'bg-[#518231]' : 'bg-red-600'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Main Grid: Inputs vs Sticky Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Calculator className="text-[#518231]" size={20} />
              Mortgage Parameters
            </h3>

            {/* Input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Value */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Property Value</span>
                  <span className="text-[#518231] font-bold">{formatGBP(propertyValue)}</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => handlePropertyValueChange(Number(e.target.value))}
                    className="block w-full pl-8 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
                    aria-label="Property Value"
                  />
                </div>
                <input
                  type="range"
                  min={50000}
                  max={2000000}
                  step={5000}
                  value={propertyValue}
                  onChange={(e) => handlePropertyValueChange(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Deposit */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Deposit ({depositPercent}%)</span>
                  <span className="text-[#518231] font-bold">{formatGBP(deposit)}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                    <input
                      type="number"
                      value={deposit}
                      onChange={(e) => handleDepositChange(Number(e.target.value))}
                      className="block w-full pl-8 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
                      aria-label="Deposit Amount"
                    />
                  </div>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={depositPercent}
                      step={0.5}
                      onChange={(e) => handleDepositPercentChange(Number(e.target.value))}
                      className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm text-center"
                      aria-label="Deposit Percent"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">%</div>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={propertyValue}
                  step={1000}
                  value={deposit}
                  onChange={(e) => handleDepositChange(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Interest Rate</span>
                  <span className="text-[#518231] font-bold">{interestRate}%</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    type="number"
                    step={0.05}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
                    aria-label="Interest Rate"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">%</div>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={15}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Mortgage Term */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Mortgage Term</span>
                  <span className="text-[#518231] font-bold">{termYears} Years</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    type="number"
                    value={termYears}
                    onChange={(e) => setTermYears(Number(e.target.value))}
                    className="block w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-sm"
                    aria-label="Mortgage Term"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">Years</div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Repayment Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Repayment Type</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                  <button
                    onClick={() => setRepaymentType('repayment')}
                    className={`py-2 text-xs font-semibold rounded-md transition-all ${
                      repaymentType === 'repayment' 
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                  >
                    Repayment
                  </button>
                  <button
                    onClick={() => setRepaymentType('interest-only')}
                    className={`py-2 text-xs font-semibold rounded-md transition-all ${
                      repaymentType === 'interest-only' 
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                    }`}
                  >
                    Interest Only
                  </button>
                </div>
              </div>

              {/* Payment Frequency */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Payment Frequency</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                  {['monthly', 'fortnightly', 'weekly'].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setPaymentFrequency(freq as any)}
                      className={`py-2 text-[10px] font-semibold rounded-md transition-all uppercase ${
                        paymentFrequency === freq 
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Options Accordion */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-6 py-4 flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Award className="text-[#518231]" size={18} />
                <span>Advanced Options (Overpayments & Fees)</span>
              </div>
              {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showAdvanced && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                
                {/* 1. Overpayment Strategy */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overpayment Strategy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">Monthly Overpayment</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                        <input
                          type="number"
                          value={monthlyOverpayment}
                          onChange={(e) => setMonthlyOverpayment(Number(e.target.value))}
                          className="block w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                          placeholder="e.g. 100"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">Annual Overpayment</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                        <input
                          type="number"
                          value={annualOverpayment}
                          onChange={(e) => setAnnualOverpayment(Number(e.target.value))}
                          className="block w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                          placeholder="e.g. 1000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">One-off Lump Sum</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative rounded-lg shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                          <input
                            type="number"
                            value={oneOffOverpayment}
                            onChange={(e) => setOneOffOverpayment(Number(e.target.value))}
                            className="block w-full pl-8 pr-2 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                            placeholder="Amount"
                          />
                        </div>
                        <input
                          type="number"
                          value={oneOffMonth}
                          onChange={(e) => setOneOffMonth(Number(e.target.value))}
                          className="block w-full px-2 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs text-center"
                          placeholder="Month No."
                          title="Month number when the lump sum is applied"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Fees */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lender & Admin Fees</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">Product Fee</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                        <input
                          type="number"
                          value={productFee}
                          onChange={(e) => setProductFee(Number(e.target.value))}
                          className="block w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">Broker Fee</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                        <input
                          type="number"
                          value={brokerFee}
                          onChange={(e) => setBrokerFee(Number(e.target.value))}
                          className="block w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500">Legal & Survey Fee</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                        <input
                          type="number"
                          value={legalFee}
                          onChange={(e) => setLegalFee(Number(e.target.value))}
                          className="block w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mt-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={capitalizeFees}
                      onChange={(e) => setCapitalizeFees(e.target.checked)}
                      className="accent-[#518231]"
                    />
                    <span>Add product/broker fees to the mortgage loan balance (capitalise fees)</span>
                  </label>
                </div>

                {/* 3. Affordability Check */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Salary Affordability check</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 flex items-center gap-1">
                        <User size={12} />
                        Annual Salary (Single)
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                        <input
                          type="number"
                          value={incomeSingle}
                          onChange={(e) => setIncomeSingle(Number(e.target.value))}
                          className="block w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                          placeholder="e.g. 45000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 flex items-center gap-1">
                        <Users size={12} />
                        Joint Salary (Partner)
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">£</div>
                        <input
                          type="number"
                          value={incomeJoint}
                          onChange={(e) => setIncomeJoint(Number(e.target.value))}
                          className="block w-full pl-8 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs"
                          placeholder="e.g. 35000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Results Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Result</span>
              <h3 className="text-4xl font-black text-white mt-1">
                {formatGBPDec(calculations.periodicPayment)}
                <span className="text-xs font-normal text-slate-400 ml-1">/ {paymentFrequency}</span>
              </h3>
            </div>

            {/* Microstats */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-800 py-4 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px] uppercase">Loan-to-Value (LTV)</span>
                <span className="text-white font-bold">{calculations.ltv.toFixed(1)}%</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px] uppercase">Loan Amount</span>
                <span className="text-white font-bold">{formatGBP(calculations.loanAmount)}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px] uppercase">Total Cost</span>
                <span className="text-white font-bold">{formatGBP(calculations.totalPayments)}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px] uppercase">Total Interest</span>
                <span className="text-white font-bold">{formatGBP(calculations.totalInterest)}</span>
              </div>
            </div>

            {/* Overpayment Savings Panel */}
            {calculations.interestSaved > 0 && (
              <div className="bg-[#518231]/10 border border-[#518231]/30 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#78b34f]">
                  <TrendingDown size={16} />
                  <span>Overpayment Impact Summary</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Interest Saved:</span>
                    <span className="font-bold text-white text-sm">{formatGBP(calculations.interestSaved)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Time Saved:</span>
                    <span className="font-bold text-white text-sm">
                      {calculations.yearsSaved} yrs {calculations.remainingMonthsSaved > 0 && `${calculations.remainingMonthsSaved} mos`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* LTV & Affordability Advice Boxes */}
            <div className="space-y-3 text-xs">
              {/* LTV advice */}
              <div className="flex gap-2 p-3 bg-slate-800/40 rounded-lg border border-slate-800">
                <Info className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-300">LTV Tier Analysis</p>
                  <p className="text-slate-400 leading-normal">{calculations.nextLtvAdvice}</p>
                </div>
              </div>

              {/* Affordability check */}
              {(incomeSingle > 0 || incomeJoint > 0) && (
                <div className={`flex gap-2 p-3 rounded-lg border ${
                  calculations.affordabilityStatus === 'high' 
                    ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                    : calculations.affordabilityStatus === 'moderate'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}>
                  <ShieldAlert className="shrink-0 mt-0.5" size={14} />
                  <div className="space-y-0.5">
                    <p className="font-bold">Affordability Stress Check</p>
                    <p className="opacity-80 leading-normal">{calculations.affordabilityMsg}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Share, Print & Export buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button 
                onClick={handleShareLink}
                className="flex flex-col items-center justify-center py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700 gap-1"
                aria-label="Share Scenario"
              >
                <Share2 size={16} />
                <span className="text-[10px] font-semibold">Share link</span>
              </button>
              <button 
                onClick={handlePrint}
                className="flex flex-col items-center justify-center py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700 gap-1"
                aria-label="Print Report"
              >
                <Printer size={16} />
                <span className="text-[10px] font-semibold">Print PDF</span>
              </button>
              <button 
                onClick={handleExportCSV}
                className="flex flex-col items-center justify-center py-2.5 bg-[#518231] hover:bg-[#436a28] rounded-xl transition-all gap-1"
                aria-label="Export Spreadsheet"
              >
                <FileSpreadsheet size={16} />
                <span className="text-[10px] font-bold">Export CSV</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Charts section */}
      {isClient && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart 1: Composition (Pie) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-[320px]">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
              Mortgage Composition Breakdown
            </h4>
            <div className="flex-1 relative flex items-center justify-center min-h-0">
              <Pie 
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: typeof window !== 'undefined' && window.document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#334155',
                        font: { size: 10 }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Chart 2: Amortization Curve (Line) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-[320px]">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
              Remaining Mortgage Balance Over Time
            </h4>
            <div className="flex-1 relative min-h-0">
              <Line 
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      grid: {
                        color: 'rgba(128,128,128,0.1)'
                      },
                      ticks: {
                        color: '#64748b',
                        font: { size: 9 },
                        callback: (value) => formatGBP(Number(value))
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        color: '#64748b',
                        font: { size: 8 }
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        color: typeof window !== 'undefined' && window.document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#334155',
                        font: { size: 10 }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Amortization Schedule Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-3">
          <div>
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">Amortization Schedule</h3>
            <p className="text-xs text-slate-400 mt-0.5">Month-by-month repayment breakdown incorporating extra overpayments.</p>
          </div>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-all self-start"
          >
            <Download size={14} />
            CSV Export
          </button>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400 border-collapse min-w-[600px]">
            <thead className="text-[10px] text-slate-400 uppercase bg-slate-50 dark:bg-slate-950">
              <tr>
                <th scope="col" className="px-4 py-3">Period</th>
                <th scope="col" className="px-4 py-3">Total Payment</th>
                <th scope="col" className="px-4 py-3">Principal Portion</th>
                <th scope="col" className="px-4 py-3">Interest Portion</th>
                <th scope="col" className="px-4 py-3">Overpayments</th>
                <th scope="col" className="px-4 py-3 text-right">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedSchedule.map((row) => (
                <tr key={row.period} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 font-mono">
                  <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                    {paymentFrequency === 'monthly' ? `Month ${row.period}` : `Period ${row.period}`}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{formatGBPDec(row.payment)}</td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">{formatGBPDec(row.principal)}</td>
                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">{formatGBPDec(row.interest)}</td>
                  <td className={`px-4 py-3.5 font-bold ${row.overpayment > 0 ? 'text-[#518231]' : 'text-slate-400'}`}>
                    {row.overpayment > 0 ? `+${formatGBPDec(row.overpayment)}` : '£0.00'}
                  </td>
                  <td className="px-4 py-3.5 text-right font-bold text-slate-900 dark:text-white">{formatGBPDec(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded hover:bg-slate-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-xs text-slate-500 font-mono">
              Page <span className="font-bold text-slate-800 dark:text-white">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded hover:bg-slate-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
