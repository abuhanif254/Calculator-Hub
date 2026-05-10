'use client';

import React from 'react';
import { useToolHistory } from '@/lib/hooks/useRetention';
import { Link, resolveIntlHref } from '@/i18n/routing';
import { Clock, ArrowRight, Calculator, Code2 } from 'lucide-react';

// ═══════════════════════════════════════════════════════
// "Continue Where You Left Off" — Homepage Retention Widget
// ═══════════════════════════════════════════════════════
// Shows the user's 4 most recently visited tools on the
// homepage. This creates a "return path" that dramatically
// increases day-2 and day-7 retention.
//
// Only renders client-side to avoid hydration mismatch
// (localStorage is not available during SSR).
// ═══════════════════════════════════════════════════════

export function ContinueWhereYouLeftOff() {
  const { history, mounted } = useToolHistory();

  // Don't render anything until mounted (prevents hydration mismatch)
  // or if user has no history
  if (!mounted || history.length === 0) return null;

  const recent = history.slice(0, 4);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock size={20} className="text-blue-500" />
          Continue Where You Left Off
        </h2>
        <Link
          href="/dashboard"
          className="text-sm text-[#518231] hover:text-[#436a28] font-medium flex items-center gap-1 transition-colors"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recent.map((entry) => (
          <Link
            key={entry.slug}
            href={resolveIntlHref(entry.href)}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#518231]/30 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#518231]/10 transition-colors">
                {entry.type === 'developer-tool' ? (
                  <Code2 size={16} className="text-purple-500 group-hover:text-[#518231]" />
                ) : (
                  <Calculator size={16} className="text-blue-500 group-hover:text-[#518231]" />
                )}
              </div>
              <ArrowRight size={14} className="ml-auto text-slate-200 dark:text-slate-700 group-hover:text-[#518231] transition-colors" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors truncate">
              {entry.title}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {formatRelativeTime(entry.timestamp)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(ts).toLocaleDateString();
}
