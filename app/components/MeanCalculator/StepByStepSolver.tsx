"use client";

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MeanAnalysisMetrics } from '@/lib/math/meanUtils';

interface StepByStepSolverProps {
  data: number[];
  metrics: MeanAnalysisMetrics;
  solverType: string;
  setSolverType: (type: string) => void;
}

export default function StepByStepSolver({ data, metrics, solverType, setSolverType }: StepByStepSolverProps) {
  const t = useTranslations('calculators.mean.steps');
  const [openStep, setOpenStep] = useState<string | null>('step-1');

  const toggleStep = (step: string) => {
    setOpenStep(openStep === step ? null : step);
  };

  const displayData = useMemo(() => {
    if (data.length <= 8) return data;
    return [...data.slice(0, 4), null, ...data.slice(data.length - 3)];
  }, [data]);

  const sum = useMemo(() => data.reduce((a,b) => a+b, 0), [data]);
  const product = useMemo(() => data.reduce((a,b) => a*b, 1), [data]);
  const sumReciprocals = useMemo(() => data.reduce((a,b) => a + (1/b), 0), [data]);

  if (data.length === 0) return null;

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-semibold text-lg">{t('title', { fallback: 'Step-by-Step Solver' })}</h3>
        <select 
          value={solverType}
          onChange={(e) => setSolverType(e.target.value)}
          className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="arithmetic">Arithmetic Mean</option>
          <option value="geometric">Geometric Mean</option>
          <option value="harmonic">Harmonic Mean</option>
        </select>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
          
          {solverType === 'arithmetic' && (
            <>
              {/* Step 1: Count Observations */}
              <div className="py-4">
                <button onClick={() => toggleStep('step-1')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <span>1. Count the observations (N)</span>
                  {openStep === 'step-1' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openStep === 'step-1' && (
                  <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                    <p>Count the total number of data points in your dataset.</p>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto text-center border border-gray-100 dark:border-gray-800">
                      <div className="text-sm font-mono break-all text-black dark:text-white">
                        Dataset: [{displayData.map(d => d === null ? '...' : d).join(', ')}]
                      </div>
                      <div className="font-bold text-lg mt-2 text-indigo-600 dark:text-indigo-400">
                        N = {data.length}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Sum the values */}
              <div className="py-4">
                <button onClick={() => toggleStep('step-2')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <span>2. Calculate the total sum (&Sigma;x)</span>
                  {openStep === 'step-2' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openStep === 'step-2' && (
                  <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                    <p>Add all the values together to find the total sum.</p>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto text-center border border-gray-100 dark:border-gray-800">
                      <div className="text-sm font-mono break-all text-black dark:text-white">
                        &Sigma;x = {displayData.map(d => d === null ? '...' : d).join(' + ')}
                      </div>
                      <div className="font-bold text-lg mt-2 text-indigo-600 dark:text-indigo-400">
                        &Sigma;x = {sum.toFixed(4)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Divide */}
              <div className="py-4">
                <button onClick={() => toggleStep('step-3')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <span>3. Divide sum by the number of observations</span>
                  {openStep === 'step-3' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openStep === 'step-3' && (
                  <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                    <p>The arithmetic mean is the total sum divided by the number of observations.</p>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                      <div className="text-lg font-serif italic mb-2 text-black dark:text-white">
                         &mu; = &Sigma;x / N
                      </div>
                      <div className="text-sm mt-4 font-mono text-black dark:text-white">
                        &mu; = {sum.toFixed(4)} / {data.length}
                      </div>
                      <div className="font-bold text-xl mt-2 text-indigo-600 dark:text-indigo-400">
                        &mu; = {metrics.arithmeticMean.toFixed(4)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {solverType === 'geometric' && (
            <>
              {metrics.geometricMean === null ? (
                <div className="py-8 text-center text-red-500">
                  Geometric mean cannot be calculated for this dataset (all values must be strictly positive).
                </div>
              ) : (
                <>
                  <div className="py-4">
                    <button onClick={() => toggleStep('step-1')} className="flex items-center justify-between w-full text-left font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <span>1. Multiply all values together</span>
                      {openStep === 'step-1' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    {openStep === 'step-1' && (
                      <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                        <p>Find the product of all observations.</p>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto text-center border border-gray-100 dark:border-gray-800">
                          <div className="text-sm font-mono break-all text-black dark:text-white">
                            Product = {displayData.map(d => d === null ? '...' : d).join(' × ')}
                          </div>
                          <div className="font-bold text-lg mt-2 text-emerald-600 dark:text-emerald-400">
                            Product = {product.toExponential(4)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-4">
                    <button onClick={() => toggleStep('step-2')} className="flex items-center justify-between w-full text-left font-semibold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <span>2. Take the nth root</span>
                      {openStep === 'step-2' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    {openStep === 'step-2' && (
                      <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                        <p>Take the nth root of the product, where n is the number of observations ({data.length}).</p>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                          <div className="text-lg font-serif italic mb-2 text-black dark:text-white">
                             GM = <sup>n</sup>&radic;Product = Product<sup>(1/n)</sup>
                          </div>
                          <div className="text-sm mt-4 font-mono text-black dark:text-white">
                            GM = {product.toExponential(2)}<sup>(1/{data.length})</sup>
                          </div>
                          <div className="font-bold text-xl mt-2 text-emerald-600 dark:text-emerald-400">
                            GM = {metrics.geometricMean.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {solverType === 'harmonic' && (
            <>
              {metrics.harmonicMean === null ? (
                <div className="py-8 text-center text-red-500">
                  Harmonic mean cannot be calculated for this dataset (values should be positive).
                </div>
              ) : (
                <>
                  <div className="py-4">
                    <button onClick={() => toggleStep('step-1')} className="flex items-center justify-between w-full text-left font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      <span>1. Sum the reciprocals</span>
                      {openStep === 'step-1' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    {openStep === 'step-1' && (
                      <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                        <p>Calculate 1/x for each value and sum them up.</p>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto text-center border border-gray-100 dark:border-gray-800">
                          <div className="text-sm font-mono break-all text-black dark:text-white">
                            &Sigma;(1/x) = {displayData.map(d => d === null ? '...' : `(1/${d})`).join(' + ')}
                          </div>
                          <div className="font-bold text-lg mt-2 text-purple-600 dark:text-purple-400">
                            &Sigma;(1/x) = {sumReciprocals.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-4">
                    <button onClick={() => toggleStep('step-2')} className="flex items-center justify-between w-full text-left font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      <span>2. Divide N by the sum of reciprocals</span>
                      {openStep === 'step-2' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                    {openStep === 'step-2' && (
                      <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                        <p>The harmonic mean is N divided by the sum of reciprocals.</p>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                          <div className="text-lg font-serif italic mb-2 text-black dark:text-white">
                             HM = N / &Sigma;(1/x)
                          </div>
                          <div className="text-sm mt-4 font-mono text-black dark:text-white">
                            HM = {data.length} / {sumReciprocals.toFixed(4)}
                          </div>
                          <div className="font-bold text-xl mt-2 text-purple-600 dark:text-purple-400">
                            HM = {metrics.harmonicMean.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
