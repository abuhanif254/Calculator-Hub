'use client';

import React from 'react';
import { DispersionStats } from '@/lib/calculators/standardDeviation';
import { Calculator, ChevronRight } from 'lucide-react';

interface SolverProps {
  data: number[];
  stats: DispersionStats | null;
}

export default function StepByStepSolver({ data, stats }: SolverProps) {
  if (!stats || data.length === 0) return null;

  const n = stats.sampleSize;
  const mean = stats.mean;
  const isSample = n > 1;

  // Let's only show the first 5 values in the steps to avoid massive lists
  const displayLimit = 5;
  const dataToShow = data.slice(0, displayLimit);
  const hasMore = data.length > displayLimit;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-emerald-500/10 shadow-lg overflow-hidden mt-8">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 sm:p-6 border-b border-emerald-100 dark:border-emerald-800/30 flex items-center gap-3">
        <div className="bg-emerald-100 dark:bg-emerald-800/50 p-2 rounded-lg">
          <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Step-by-Step Solution</h3>
      </div>
      
      <div className="p-4 sm:p-6 space-y-6">
        
        {/* Step 1: Mean */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
            Calculate the Mean (μ)
          </h4>
          <div className="pl-8 text-gray-600 dark:text-gray-400 space-y-2">
            <p>First, sum all the values and divide by the number of values (N = {n}).</p>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
              <p>Sum = {dataToShow.join(' + ')}{hasMore ? ' + ...' : ''} = {stats.sum}</p>
              <p>Mean = {stats.sum} / {n} = {mean.toFixed(4)}</p>
            </div>
          </div>
        </div>

        {/* Step 2: Deviations */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
            Find Deviations from the Mean
          </h4>
          <div className="pl-8 text-gray-600 dark:text-gray-400 space-y-2">
            <p>Subtract the mean from each value: (x - μ)</p>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
              {dataToShow.map((val, idx) => (
                <p key={idx}>{val} - {mean.toFixed(4)} = {(val - mean).toFixed(4)}</p>
              ))}
              {hasMore && <p>...</p>}
            </div>
          </div>
        </div>

        {/* Step 3: Squared Deviations */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
            Square Each Deviation
          </h4>
          <div className="pl-8 text-gray-600 dark:text-gray-400 space-y-2">
            <p>Square each result from the previous step to make all values positive: (x - μ)²</p>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg font-mono text-sm overflow-x-auto">
              {dataToShow.map((val, idx) => {
                const diff = val - mean;
                return (
                  <p key={idx}>({diff.toFixed(4)})² = {(diff * diff).toFixed(4)}</p>
                )
              })}
              {hasMore && <p>...</p>}
            </div>
            <p className="pt-2 font-medium">Sum of Squared Deviations (SS) = {stats.sumOfSquares.toFixed(4)}</p>
          </div>
        </div>

        {/* Step 4: Variance */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
            Calculate Variance
          </h4>
          <div className="pl-8 text-gray-600 dark:text-gray-400 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <p className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Population Variance (σ²)</p>
                <p className="text-sm">Divide SS by N ({n}).</p>
                <p className="font-mono mt-2">{stats.sumOfSquares.toFixed(4)} / {n} = {stats.populationVariance.toFixed(4)}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <p className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Sample Variance (s²)</p>
                <p className="text-sm">Divide SS by N-1 ({n-1}). <span className="text-xs opacity-75">(Bessel's correction)</span></p>
                <p className="font-mono mt-2">
                  {isSample ? `${stats.sumOfSquares.toFixed(4)} / ${n - 1} = ${stats.sampleVariance.toFixed(4)}` : 'N/A (N must be > 1)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Standard Deviation */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
            Calculate Standard Deviation
          </h4>
          <div className="pl-8 text-gray-600 dark:text-gray-400 space-y-2">
            <p>Take the square root of the Variance.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                <p className="font-medium text-gray-900 dark:text-white mb-2">Population SD (σ)</p>
                <p className="font-mono text-lg text-emerald-600 dark:text-emerald-400">
                  √{stats.populationVariance.toFixed(4)} = {stats.populationSD.toFixed(4)}
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                <p className="font-medium text-gray-900 dark:text-white mb-2">Sample SD (s)</p>
                <p className="font-mono text-lg text-emerald-600 dark:text-emerald-400">
                  {isSample ? `√${stats.sampleVariance.toFixed(4)} = ${stats.sampleSD.toFixed(4)}` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
