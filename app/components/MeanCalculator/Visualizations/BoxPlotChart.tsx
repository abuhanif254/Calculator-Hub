"use client";

import React from 'react';

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
  if (data.length === 0) return null;

  // Filter outliers to calculate whiskers
  const nonOutliers = data.filter(v => !outliers.includes(v));
  const whiskerMin = nonOutliers.length > 0 ? Math.min(...nonOutliers) : min;
  const whiskerMax = nonOutliers.length > 0 ? Math.max(...nonOutliers) : max;

  // Scale calculations
  const absoluteMin = Math.min(min, ...outliers);
  const absoluteMax = Math.max(max, ...outliers);
  const range = absoluteMax - absoluteMin;
  
  // Padding to prevent edges from clipping
  const padding = range === 0 ? 10 : range * 0.1; 
  const scaleMin = absoluteMin - padding;
  const scaleMax = absoluteMax + padding;
  const scaleRange = scaleMax - scaleMin;

  const toPercentage = (val: number) => {
    if (scaleRange === 0) return 50;
    return ((val - scaleMin) / scaleRange) * 100;
  };

  const pQ1 = toPercentage(q1);
  const pQ3 = toPercentage(q3);
  const pMedian = toPercentage(median);
  const pWhiskerMin = toPercentage(whiskerMin);
  const pWhiskerMax = toPercentage(whiskerMax);

  return (
    <div className="w-full py-10 px-4">
      <div className="relative h-32 w-full max-w-4xl mx-auto flex items-center">
        
        {/* Scale Axis Line */}
        <div className="absolute top-[80%] left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600"></div>

        {/* Min Label */}
        <div className="absolute top-[85%] text-xs font-mono text-gray-500 transform -translate-x-1/2" style={{ left: `${toPercentage(absoluteMin)}%` }}>
          {absoluteMin.toFixed(1)}
        </div>

        {/* Max Label */}
        <div className="absolute top-[85%] text-xs font-mono text-gray-500 transform -translate-x-1/2" style={{ left: `${toPercentage(absoluteMax)}%` }}>
          {absoluteMax.toFixed(1)}
        </div>

        {/* Left Whisker Line */}
        <div 
          className="absolute h-0.5 bg-indigo-500 transition-all duration-700"
          style={{ left: `${pWhiskerMin}%`, right: `${100 - pQ1}%` }}
        ></div>

        {/* Right Whisker Line */}
        <div 
          className="absolute h-0.5 bg-indigo-500 transition-all duration-700"
          style={{ left: `${pQ3}%`, right: `${100 - pWhiskerMax}%` }}
        ></div>

        {/* Left Whisker End */}
        <div 
          className="absolute h-6 w-0.5 bg-indigo-500 transition-all duration-700 transform -translate-x-1/2"
          style={{ left: `${pWhiskerMin}%` }}
        ></div>

        {/* Right Whisker End */}
        <div 
          className="absolute h-6 w-0.5 bg-indigo-500 transition-all duration-700 transform -translate-x-1/2"
          style={{ left: `${pWhiskerMax}%` }}
        ></div>

        {/* The Box (IQR) */}
        <div 
          className="absolute h-12 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-500 rounded-sm transition-all duration-700 group hover:bg-indigo-200 dark:hover:bg-indigo-800/50 cursor-pointer"
          style={{ left: `${pQ1}%`, right: `${100 - pQ3}%` }}
        >
          {/* Tooltip for Box */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap z-10">
            Q1: {q1}<br/>
            Median: {median}<br/>
            Q3: {q3}
          </div>
        </div>

        {/* Median Line inside the Box */}
        <div 
          className="absolute h-12 w-1 bg-red-500 transition-all duration-700 transform -translate-x-1/2 z-10"
          style={{ left: `${pMedian}%` }}
        ></div>

        {/* Outliers */}
        {outliers.map((outlier, i) => (
          <div 
            key={i}
            className="absolute h-3 w-3 rounded-full bg-transparent border-2 border-red-500 transition-all duration-700 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer hover:bg-red-500"
            style={{ left: `${toPercentage(outlier)}%`, top: '50%' }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap z-10">
              Outlier: {outlier}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-6 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-100 border border-indigo-500"></div> Interquartile Range (IQR)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3 bg-red-500"></div> Median
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full border border-red-500"></div> Outlier
        </div>
      </div>
    </div>
  );
}
