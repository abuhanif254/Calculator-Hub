'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { allTools } from '../../lib/registry';
import { Link } from '../../i18n/routing';
import { TrendingUp, Clock, History } from 'lucide-react';

interface TrendingData {
  trending: { name: string; href: string }[];
  updated: { name: string; href: string }[];
}

export function DynamicTrending() {
  const [data, setData] = useState<TrendingData | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      // 1. Get Recently Updated from local registry
      const recentlyUpdated = [...allTools]
        .filter(t => t.lastUpdated)
        .sort((a, b) => new Date(b.lastUpdated!).getTime() - new Date(a.lastUpdated!).getTime())
        .slice(0, 5)
        .map(t => ({
          name: t.title,
          href: t.href
        }));

      // 2. Fetch Trending from Firestore
      let trendingList = [
        { name: "JSON Formatter", href: "/tools/json-formatter" },
        { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
        { name: "BMI Calculator", href: "/calculators/bmi-calculator" },
        { name: "HTML Formatter", href: "/tools/html-formatter" },
        { name: "Diff Checker", href: "/tools/diff-checker" }
      ];

      try {
        if (db) {
          const q = query(collection(db, 'toolVisits'), orderBy('visits', 'desc'), limit(5));
          const snapshot = await getDocs(q);
          
          if (!snapshot.empty) {
            const fetched = snapshot.docs.map(doc => {
              const toolId = doc.id; // Assuming doc id is slug
              const tool = allTools.find(t => t.slug === toolId);
              return tool ? { name: tool.title, href: tool.href } : null;
            }).filter(Boolean) as { name: string; href: string }[];
            
            if (fetched.length > 0) {
              trendingList = fetched;
            }
          }
        }
      } catch (err) {
        // Silently use fallback if firestore permissions fail or network errors occur
      }

      if (!cancelled) {
        setData({
          trending: trendingList,
          updated: recentlyUpdated.length > 0 ? recentlyUpdated : [
            { name: "Income Tax Calculator 2024", href: "/calculators/income-tax-calculator" },
            { name: "Compound Interest", href: "/calculators/compound-interest-calculator" },
            { name: "HTML Formatter", href: "/tools/html-formatter" },
            { name: "Credit Card Payoff", href: "/calculators/credit-cards-payoff" },
            { name: "Diff Checker", href: "/tools/diff-checker" }
          ]
        });
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const trending = data?.trending || [
    { name: "JSON Formatter", href: "/tools/json-formatter" },
    { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
    { name: "BMI Calculator", href: "/calculators/bmi-calculator" },
    { name: "HTML Formatter", href: "/tools/html-formatter" },
    { name: "Diff Checker", href: "/tools/diff-checker" }
  ];

  const updated = data?.updated || [
    { name: "Income Tax Calculator 2024", href: "/calculators/income-tax-calculator" },
    { name: "Compound Interest", href: "/calculators/compound-interest-calculator" },
    { name: "HTML Formatter", href: "/tools/html-formatter" },
    { name: "Credit Card Payoff", href: "/calculators/credit-cards-payoff" },
    { name: "Diff Checker", href: "/tools/diff-checker" }
  ];

  const popularSearches = [
    { name: "BMI", href: "/calculators/bmi-calculator" },
    { name: "Mortgage", href: "/calculators/mortgage-calculator" },
    { name: "JSON", href: "/tools/json-formatter" },
    { name: "Loan", href: "/calculators/loan-calculator" },
    { name: "Retirement", href: "/calculators/retirement-calculator" },
    { name: "Age calc", href: "/calculators/age-calculator" },
    { name: "GPA", href: "/calculators/gpa-calculator" },
    { name: "Diff Checker", href: "/tools/diff-checker" },
    { name: "HTML Format", href: "/tools/html-formatter" },
    { name: "Calorie", href: "/calculators/calorie-calculator" }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <TrendingUp className="text-blue-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Trending Today</h2>
          </div>
          <ul className="space-y-4">
            {trending.map((tool, i) => (
              <li key={i}>
                <Link href={tool.href as any} className="flex items-center justify-between group">
                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#518231] transition-colors">{tool.name}</span>
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded">Popular</span>
                </Link>
              </li>
            ))}
          </ul>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <Clock className="text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recently Updated</h2>
          </div>
          <ul className="space-y-4">
            {updated.map((tool, i) => (
              <li key={i}>
                <Link href={tool.href as any} className="flex items-center justify-between group">
                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-[#518231] transition-colors">{tool.name}</span>
                    <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">Updated</span>
                </Link>
              </li>
            ))}
          </ul>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <History className="text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Popular Searches</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((tag, i) => (
              <Link key={i} href={tag.href as any} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                {tag.name}
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
}
