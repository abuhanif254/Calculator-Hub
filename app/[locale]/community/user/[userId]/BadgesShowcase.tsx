import React from 'react';
import { getBadge } from '@/lib/badges';

interface BadgesShowcaseProps {
  badges: string[];
}

export function BadgesShowcase({ badges }: BadgesShowcaseProps) {
  if (!badges || badges.length === 0) return null;

  // Filter out any badges that don't exist in our dictionary (e.g., 'verified' which might be handled separately, or legacy badges)
  const validBadges = badges.map(b => getBadge(b)).filter(Boolean) as NonNullable<ReturnType<typeof getBadge>>[];

  if (validBadges.length === 0) return null;

  return (
    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Achievements & Badges</h3>
      <div className="flex flex-wrap gap-3">
        {validBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div 
              key={badge.id}
              className={`flex items-center gap-3 pr-4 pl-1.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm group hover:border-[#518231] transition-colors`}
              title={badge.description}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${badge.bgClass} ${badge.colorClass}`}>
                <Icon size={16} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {badge.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
                  {badge.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
