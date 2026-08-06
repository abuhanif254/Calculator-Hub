"use client";

import React from 'react';

interface DotPlotProps {
  data: number[];
  mean: number;
  median: number;
}

export default function DotPlot({ data, mean, median }: DotPlotProps) {
  if (data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Padding
  const padding = range === 0 ? 10 : range * 0.1;
  const scaleMin = min - padding;
  const scaleMax = max + padding;
  const scaleRange = scaleMax - scaleMin;

  const toPercentage = (val: number) => {
    if (scaleRange === 0) return 50;
    return ((val - scaleMin) / scaleRange) * 100;
  };

  // Group data to stack dots
  const dotGroups = new Map<number, number>();
  // Use a small epsilon to group very close dots (0.5% of range)
  const epsilon = scaleRange === 0 ? 0 : scaleRange * 0.005;

  const groupedDots: { x: number; yIndex: number; val: number }[] = [];
  const sortedData = [...data].sort((a,b) => a-b);

  sortedData.forEach(val => {
    // Find if there's an existing group within epsilon
    let foundKey: number | null = null;
    for (const key of Array.from(dotGroups.keys())) {
      if (Math.abs(key - val) < epsilon) {
        foundKey = key;
        break;
      }
    }
    
    if (foundKey !== null) {
      const count = dotGroups.get(foundKey)!;
      dotGroups.set(foundKey, count + 1);
      groupedDots.push({ x: foundKey, yIndex: count, val });
    } else {
      dotGroups.set(val, 1);
      groupedDots.push({ x: val, yIndex: 0, val });
    }
  });

  return (
    <div className="w-full py-10 px-4">
      <div className="relative h-48 w-full max-w-4xl mx-auto flex items-end pb-8">
        
        {/* Scale Axis Line */}
        <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600"></div>

        {/* Min Label */}
        <div className="absolute bottom-0 text-xs font-mono text-gray-500 transform -translate-x-1/2" style={{ left: `${toPercentage(min)}%` }}>
          {min.toFixed(1)}
        </div>

        {/* Max Label */}
        <div className="absolute bottom-0 text-xs font-mono text-gray-500 transform -translate-x-1/2" style={{ left: `${toPercentage(max)}%` }}>
          {max.toFixed(1)}
        </div>

        {/* Mean Indicator */}
        <div 
          className="absolute h-[110%] w-0.5 bg-indigo-500 z-0 opacity-50"
          style={{ left: `${toPercentage(mean)}%`, bottom: '24px' }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
            Mean: {mean.toFixed(2)}
          </div>
        </div>

        {/* Median Indicator */}
        <div 
          className="absolute h-[110%] w-0.5 bg-emerald-500 z-0 opacity-50"
          style={{ left: `${toPercentage(median)}%`, bottom: '24px' }}
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
            Median: {median.toFixed(2)}
          </div>
        </div>

        {/* Dots */}
        {groupedDots.map((dot, i) => (
          <div 
            key={i}
            className="absolute h-3 w-3 rounded-full bg-blue-500 dark:bg-blue-400 opacity-80 transform -translate-x-1/2 transition-all duration-500 hover:bg-blue-600 hover:scale-125 z-10 cursor-pointer group"
            style={{ 
              left: `${toPercentage(dot.x)}%`, 
              bottom: `${24 + (dot.yIndex * 14)}px` // Stack vertically
            }}
          >
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap z-20">
              {dot.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
