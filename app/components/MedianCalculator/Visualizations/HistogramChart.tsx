"use client";

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface HistogramChartProps {
  data: number[];
  median: number;
  mean: number;
}

export default function HistogramChart({ data, median, mean }: HistogramChartProps) {
  // Binning logic using Sturges' formula
  const binsData = useMemo(() => {
    if (data.length === 0) return [];

    const min = Math.min(...data);
    const max = Math.max(...data);
    
    // If all numbers are the same
    if (min === max) {
      return [{
        binStart: min - 0.5,
        binEnd: min + 0.5,
        count: data.length,
        label: `${min}`,
      }];
    }

    const n = data.length;
    let k = Math.ceil(1 + 3.322 * Math.log10(n)); // Sturges' formula
    if (k < 5) k = 5; // Minimum 5 bins for a good look
    if (k > 20) k = 20;

    const binWidth = (max - min) / k;
    const bins = Array.from({ length: k }, (_, i) => ({
      binStart: min + i * binWidth,
      binEnd: min + (i + 1) * binWidth,
      count: 0,
      label: `${(min + i * binWidth).toFixed(1)} - ${(min + (i + 1) * binWidth).toFixed(1)}`,
      mid: min + (i + 0.5) * binWidth,
    }));

    // Distribute data into bins
    data.forEach((val) => {
      let placed = false;
      for (let i = 0; i < k; i++) {
        if (
          val >= bins[i].binStart &&
          (val < bins[i].binEnd || (i === k - 1 && val <= bins[i].binEnd))
        ) {
          bins[i].count++;
          placed = true;
          break;
        }
      }
      if (!placed && val >= max) {
        bins[k - 1].count++;
      }
    });

    return bins;
  }, [data]);

  if (binsData.length === 0) return null;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={binsData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
            tickMargin={10}
            minTickGap={20}
          />
          <YAxis 
            allowDecimals={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: '#6366f1', opacity: 0.1 }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
          />
          
          <ReferenceLine 
            x={binsData.find(b => median >= b.binStart && median <= b.binEnd)?.label || ''} 
            stroke="#ef4444" 
            strokeWidth={3}
            label={{ value: 'Median', position: 'top', fill: '#ef4444', fontSize: 12, fontWeight: 'bold' }} 
          />
          <ReferenceLine 
            x={binsData.find(b => mean >= b.binStart && mean <= b.binEnd)?.label || ''} 
            stroke="#10b981" 
            strokeDasharray="4 4"
            strokeWidth={2}
            label={{ value: 'Mean', position: 'insideTopLeft', fill: '#10b981', fontSize: 12, fontWeight: 'bold' }} 
          />
          
          <Bar 
            dataKey="count" 
            name="Frequency" 
            fill="#6366f1" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
