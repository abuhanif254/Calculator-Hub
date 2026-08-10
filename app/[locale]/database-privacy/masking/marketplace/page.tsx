"use client";
import React from "react";

const ruleSets = [
  {
    id: 1,
    name: "AWS Redshift PII Scanner",
    author: "JD",
    authorName: "John Doe",
    desc: "Optimized regex patterns for Amazon Redshift schema analysis.",
    stars: 124,
    dl: "1.2k",
    tags: ["AWS", "Enterprise"],
  },
  {
    id: 2,
    name: "Stripe Webhook Masker",
    author: "SW",
    authorName: "Sarah Wong",
    desc: "Masks sensitive customer payloads from Stripe API webhooks.",
    stars: 89,
    dl: "850",
    tags: ["E-commerce", "Financial"],
  },
  {
    id: 3,
    name: "UK Gov Data Standard",
    author: "GO",
    authorName: "GovOps",
    desc: "Official patterns for UK Government data classification.",
    stars: 256,
    dl: "3.4k",
    tags: ["Government"],
  },
  {
    id: 4,
    name: "MongoDB Object Id Mask",
    author: "AL",
    authorName: "Alex Lee",
    desc: "Format-preserving encryption for MongoDB OIDs.",
    stars: 45,
    dl: "320",
    tags: ["Database"],
  },
  {
    id: 5,
    name: "FHIR Medical Records",
    author: "HC",
    authorName: "HealthCorp",
    desc: "Comprehensive masking for FHIR JSON payloads.",
    stars: 198,
    dl: "2.1k",
    tags: ["Healthcare"],
  },
  {
    id: 6,
    name: "Shopify Export Sanitize",
    author: "MM",
    authorName: "Mike Miller",
    desc: "Prepares Shopify customer exports for third-party analytics.",
    stars: 76,
    dl: "640",
    tags: ["E-commerce"],
  },
];

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Rules Marketplace
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Discover and share community-driven masking rules.
          </p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
          Submit Your Rules
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="glass-panel rounded-xl p-4 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 text-center">
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            1,402
          </div>
          <div className="text-sm text-slate-500">Total Rule Sets</div>
        </div>
        <div className="glass-panel rounded-xl p-4 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 text-center">
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            85.2k
          </div>
          <div className="text-sm text-slate-500">Downloads this month</div>
        </div>
        <div className="glass-panel rounded-xl p-4 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 text-center">
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            340
          </div>
          <div className="text-sm text-slate-500">Active Contributors</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ruleSets.map((set) => (
          <div
            key={set.id}
            className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
                {set.author}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                  {set.name}
                </h3>
                <p className="text-xs text-slate-500">by {set.authorName}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 flex-1 mb-4">
              {set.desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {set.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {set.stars}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {set.dl}
                </span>
              </div>
              <button className="text-sm px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                Install
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
