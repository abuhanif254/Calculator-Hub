"use client";

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ModeAnalysisMetrics } from '@/lib/math/modeUtils';

interface StepByStepSolverProps {
  data: number[];
  metrics: ModeAnalysisMetrics;
}

export default function StepByStepSolver({ data, metrics }: StepByStepSolverProps) {
  const t = useTranslations('calculators.mode.steps');
  const [openStep, setOpenStep] = useState<string | null>('step-1');

  const toggleStep = (step: string) => {
    setOpenStep(openStep === step ? null : step);
  };

  const sorted = useMemo(() => [...data].sort((a,b) => a-b), [data]);
  
  const displayData = useMemo(() => {
    if (sorted.length <= 15) return sorted;
    return [...sorted.slice(0, 5), '...', ...sorted.slice(sorted.length - 3)];
  }, [sorted]);

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
              <span>1. Sort the dataset</span>
              {openStep === 'step-1' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openStep === 'step-1' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>Sorting the dataset makes it much easier to count how many times each value appears.</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md overflow-x-auto text-center border border-gray-100 dark:border-gray-800">
                  <div className="text-sm font-mono break-all text-black dark:text-white">
                    Sorted: [{displayData.join(', ')}]
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Build Frequency Table */}
          <div className="py-4">
            <button onClick={() => toggleStep('step-2')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <span>2. Count occurrences and build a frequency table</span>
              {openStep === 'step-2' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openStep === 'step-2' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>Count the exact number of times every unique value appears in the dataset.</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800 overflow-x-auto">
                  <div className="inline-block text-left text-sm font-mono text-black dark:text-white">
                    {metrics.frequencyTable.slice(0, 8).map((row, i) => (
                      <div key={i}>Value {row.value} → appears {row.frequency} time(s)</div>
                    ))}
                    {metrics.frequencyTable.length > 8 && <div>...and {metrics.frequencyTable.length - 8} more unique values.</div>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Identify Max */}
          <div className="py-4">
            <button onClick={() => toggleStep('step-3')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <span>3. Identify the highest frequency</span>
              {openStep === 'step-3' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openStep === 'step-3' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                <p>Scan the frequency table to find the maximum count.</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    Highest Frequency = {metrics.highestFrequency}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Determine Modality */}
          <div className="py-4">
            <button onClick={() => toggleStep('step-4')} className="flex items-center justify-between w-full text-left font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <span>4. Determine modality and finalize mode(s)</span>
              {openStep === 'step-4' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openStep === 'step-4' && (
              <div className="space-y-4 pt-4 text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-top-2">
                {metrics.modalityType === 'no-mode' ? (
                  <>
                    <p>Since all values in the dataset appear the exact same number of times (or every value appears only once), there is no single distinct peak.</p>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                      <div className="font-bold text-xl text-gray-600 dark:text-gray-400">
                        Result: No Mode
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Identify which value(s) correspond to the highest frequency of {metrics.highestFrequency}.</p>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center border border-gray-100 dark:border-gray-800">
                      <div className="text-sm font-mono text-black dark:text-white mb-2">
                        Values with frequency {metrics.highestFrequency}: [{metrics.modes.join(', ')}]
                      </div>
                      <div className="font-bold text-xl mt-4 text-indigo-600 dark:text-indigo-400">
                        Modality: {metrics.modalityType === 'uni-modal' ? 'Uni-Modal' : metrics.modalityType === 'bi-modal' ? 'Bi-Modal' : 'Multi-Modal'}
                      </div>
                      <div className="font-bold text-xl mt-1 text-indigo-800 dark:text-indigo-300">
                        Mode(s) = {metrics.modes.join(', ')}
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
