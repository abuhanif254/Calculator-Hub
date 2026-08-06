"use client";

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StepByStepSolverProps {
  data: number[];
  median: number;
}

export default function StepByStepSolver({ data, median }: StepByStepSolverProps) {
  const t = useTranslations('calculators.median.steps');
  const [openStep, setOpenStep] = useState<string | null>('step-1');

  const toggleStep = (step: string) => {
    setOpenStep(openStep === step ? null : step);
  };

  const n = data.length;
  const isEven = n % 2 === 0;
  
  const sorted = useMemo(() => [...data].sort((a,b) => a-b), [data]);
  
  const displayData = useMemo(() => {
    if (sorted.length <= 10) return sorted;
    return [...sorted.slice(0, 4), null, ...sorted.slice(sorted.length - 3)];
  }, [sorted]);

  const middlePosText = isEven 
    ? `Positions ${n/2} and ${(n/2) + 1}` 
    : `Position ${Math.ceil(n/2)}`;

  if (data.length === 0) return null;

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-semibold text-lg">{t('title', { fallback: 'Step-by-Step Solver' })}</h3>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="w-full divide-y divide-gray-200 dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
          
          {/* Step 1: Sort */}
          <div className="py-4">
            <button onClick={() => toggleStep('step-1')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <span>1. Sort the dataset in ascending order</span>
              {openStep === 'step-1' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openStep === 'step-1' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>The median is the middle value, so the data must be sorted first.</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto text-center border border-gray-100 dark:border-gray-800">
                  <div className="text-sm font-mono break-all text-black dark:text-white">
                    Sorted: [{displayData.map(d => d === null ? '...' : d).join(', ')}]
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Count */}
          <div className="py-4">
            <button onClick={() => toggleStep('step-2')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <span>2. Count the observations (N)</span>
              {openStep === 'step-2' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openStep === 'step-2' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>Count how many numbers are in your dataset to determine if it is odd or even.</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                  <div className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                    N = {n} ({isEven ? 'Even' : 'Odd'})
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3 & 4: Locate Middle & Calc */}
          <div className="py-4">
            <button onClick={() => toggleStep('step-3')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <span>3. Locate and calculate the middle value</span>
              {openStep === 'step-3' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openStep === 'step-3' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                {isEven ? (
                  <>
                    <p>Since N is even, the median is the average of the two middle values at positions {n/2} and {(n/2)+1}.</p>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                      <div className="text-sm font-mono text-black dark:text-white mb-2">
                        Middle Values: {sorted[(n/2)-1]} and {sorted[n/2]}
                      </div>
                      <div className="text-sm font-mono text-black dark:text-white">
                        Median = ({sorted[(n/2)-1]} + {sorted[n/2]}) / 2
                      </div>
                      <div className="font-bold text-xl mt-4 text-indigo-600 dark:text-indigo-400">
                        Median = {median}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Since N is odd, the median is exactly the middle value at position {Math.ceil(n/2)}.</p>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                      <div className="text-sm font-mono text-black dark:text-white mb-2">
                        Middle Position: {Math.ceil(n/2)}
                      </div>
                      <div className="font-bold text-xl mt-4 text-indigo-600 dark:text-indigo-400">
                        Median = {median}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
