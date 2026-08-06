"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { FrequencyTableRow } from '@/lib/math/modeUtils';

interface FrequencyBarChartProps {
  frequencyTable: FrequencyTableRow[];
  modes: number[];
}

export default function FrequencyBarChart({ frequencyTable, modes }: FrequencyBarChartProps) {
  if (frequencyTable.length === 0) return null;

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={frequencyTable}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
          <XAxis 
            dataKey="value" 
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
            formatter={(value: any) => [value, 'Frequency']}
            labelFormatter={(label) => `Value: ${label}`}
          />
          
          <Bar 
            dataKey="frequency" 
            name="Frequency" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1000}
          >
            {frequencyTable.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={modes.includes(entry.value) ? '#ef4444' : '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 gap-6 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#6366f1] rounded-sm"></div> Standard Frequency
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#ef4444] rounded-sm"></div> Mode (Highest Frequency)
        </div>
      </div>
    </div>
  );
}
