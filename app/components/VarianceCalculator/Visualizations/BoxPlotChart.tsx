"use client";

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';

interface BoxPlotChartProps {
  data: number[];
  q1: number;
  median: number;
  q3: number;
  min: number;
  max: number;
  outliers: number[];
}

export default function BoxPlotChart({ data, q1, median, q3, min, max, outliers }: BoxPlotChartProps) {
  const t = useTranslations('calculators.variance');

  const { chartMin, chartMax, range } = useMemo(() => {
    if (data.length === 0) return { chartMin: 0, chartMax: 10, range: 10 };
    
    // Add 10% padding to both sides
    const actualMin = Math.min(min, ...outliers);
    const actualMax = Math.max(max, ...outliers);
    const padding = (actualMax - actualMin) * 0.1 || 1;
    
    return {
      chartMin: actualMin - padding,
      chartMax: actualMax + padding,
      range: (actualMax + padding) - (actualMin - padding)
    };
  }, [data, min, max, outliers]);

  if (data.length === 0 || range === 0) return null;

  // Helper to convert data value to percentage position (0-100%)
  const toPercent = (val: number) => {
    return ((val - chartMin) / range) * 100;
  };

  // The whiskers should go to the lowest/highest data point *that is not an outlier*
  // But min/max from analyzeDataset are the absolute min/max. 
  // Let's filter out outliers to get the whisker min/max.
  const nonOutliers = data.filter(d => !outliers.includes(d));
  const whiskerMin = nonOutliers.length > 0 ? Math.min(...nonOutliers) : min;
  const whiskerMax = nonOutliers.length > 0 ? Math.max(...nonOutliers) : max;

  return (
    <div className="w-full h-[300px] flex flex-col justify-center px-8 relative mt-8">
      
      {/* X-Axis Labels */}
      <div className="absolute bottom-0 left-8 right-8 h-8 flex justify-between text-xs text-muted-foreground border-t border-border pt-1">
        <span>{chartMin.toFixed(1)}</span>
        <span>{chartMax.toFixed(1)}</span>
      </div>

      <div className="relative h-24 w-full group">
        
        {/* Main Axis Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2"></div>
        
        {/* Whiskers (Lines from Box to Whisker Min/Max) */}
        <div 
          className="absolute top-1/2 h-[2px] bg-primary -translate-y-1/2 transition-all duration-500"
          style={{ left: `${toPercent(whiskerMin)}%`, width: `${toPercent(q1) - toPercent(whiskerMin)}%` }}
        ></div>
        <div 
          className="absolute top-1/2 h-[2px] bg-primary -translate-y-1/2 transition-all duration-500"
          style={{ left: `${toPercent(q3)}%`, width: `${toPercent(whiskerMax) - toPercent(q3)}%` }}
        ></div>

        {/* Whisker Ends (Vertical lines) */}
        <div 
          className="absolute top-1/2 h-8 w-[2px] bg-primary -translate-y-1/2 -translate-x-[1px] transition-all duration-500"
          style={{ left: `${toPercent(whiskerMin)}%` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-background px-1 border rounded">{whiskerMin.toFixed(1)}</div>
        </div>
        <div 
          className="absolute top-1/2 h-8 w-[2px] bg-primary -translate-y-1/2 -translate-x-[1px] transition-all duration-500"
          style={{ left: `${toPercent(whiskerMax)}%` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-background px-1 border rounded">{whiskerMax.toFixed(1)}</div>
        </div>

        {/* The Box (Q1 to Q3) */}
        <div 
          className="absolute top-1/2 h-16 bg-primary/20 border-2 border-primary -translate-y-1/2 rounded-sm transition-all duration-500"
          style={{ left: `${toPercent(q1)}%`, width: `${toPercent(q3) - toPercent(q1)}%` }}
        >
          <div className="absolute -bottom-8 left-0 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Q1: {q1.toFixed(1)}</div>
          <div className="absolute -bottom-8 right-0 translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Q3: {q3.toFixed(1)}</div>
        </div>

        {/* Median Line */}
        <div 
          className="absolute top-1/2 h-16 w-[2px] bg-primary -translate-y-1/2 -translate-x-[1px] transition-all duration-500"
          style={{ left: `${toPercent(median)}%` }}
        >
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-primary bg-background px-1 border rounded opacity-0 group-hover:opacity-100 transition-opacity">Med: {median.toFixed(1)}</div>
        </div>

        {/* Outliers */}
        {outliers.map((outlier, idx) => (
          <div 
            key={idx}
            className="absolute top-1/2 h-3 w-3 rounded-full border-2 border-destructive bg-destructive/50 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 hover:scale-150 cursor-crosshair z-10"
            style={{ left: `${toPercent(outlier)}%` }}
            title={`Outlier: ${outlier}`}
          ></div>
        ))}
      </div>
      
      <div className="text-center mt-8 text-sm text-muted-foreground italic">
        {t('boxPlotDesc')}
      </div>
    </div>
  );
}
