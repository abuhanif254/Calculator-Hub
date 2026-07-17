'use client';

import React from 'react';
import { motion } from 'motion/react';

// ── Base shimmer skeleton ─────────────────────────────────────────────────────
function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white/[0.05] ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
        animate={{ translateX: ['−100%', '200%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

// ── Metric card skeleton ──────────────────────────────────────────────────────
export function MetricCardSkeleton() {
  return (
    <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Shimmer className="w-8 h-8 rounded-xl" />
        <Shimmer className="w-14 h-5 rounded-full" />
      </div>
      <Shimmer className="w-20 h-8 rounded-lg" />
      <Shimmer className="w-28 h-4 rounded-md" />
    </div>
  );
}

// ── Table row skeleton ────────────────────────────────────────────────────────
export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-white/[0.04]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-4">
          <Shimmer className={`h-4 rounded-md ${i === 0 ? 'w-32' : i === cols - 1 ? 'w-16' : 'w-24'}`} />
        </td>
      ))}
    </tr>
  );
}

// ── Table skeleton ────────────────────────────────────────────────────────────
export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <Shimmer className="w-40 h-5 rounded-md" />
        <Shimmer className="ml-auto w-20 h-8 rounded-xl" />
      </div>
      <table className="w-full">
        <thead className="bg-[#080D18]">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-5 py-3.5">
                <Shimmer className="h-3.5 w-16 rounded-md" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} cols={cols} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Card grid skeleton ────────────────────────────────────────────────────────
export function CardGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MetricCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ── Page skeleton (full page loading) ────────────────────────────────────────
export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse-slow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Shimmer className="w-56 h-8 rounded-xl" />
          <Shimmer className="w-80 h-5 rounded-md" />
        </div>
        <Shimmer className="w-32 h-10 rounded-xl" />
      </div>
      {/* Metric cards */}
      <CardGridSkeleton count={4} />
      {/* Main table */}
      <TableSkeleton rows={5} cols={5} />
    </div>
  );
}

// ── Connection card skeleton ──────────────────────────────────────────────────
export function ConnectionCardSkeleton() {
  return (
    <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-xl" />
        <div className="space-y-1.5 flex-1">
          <Shimmer className="w-32 h-5 rounded-md" />
          <Shimmer className="w-48 h-3.5 rounded-md" />
        </div>
        <Shimmer className="w-16 h-6 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Shimmer className="h-12 rounded-xl" />
        <Shimmer className="h-12 rounded-xl" />
        <Shimmer className="h-12 rounded-xl" />
      </div>
      <div className="flex gap-2">
        <Shimmer className="flex-1 h-9 rounded-xl" />
        <Shimmer className="w-9 h-9 rounded-xl" />
        <Shimmer className="w-9 h-9 rounded-xl" />
      </div>
    </div>
  );
}

// ── Empty state component ─────────────────────────────────────────────────────
interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  accentColor?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  accentColor = 'violet'
}: EmptyStateProps) {
  const colorMap: Record<string, string> = {
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  };
  const btnMap: Record<string, string> = {
    violet: 'bg-violet-600 hover:bg-violet-500',
    blue: 'bg-blue-600 hover:bg-blue-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-500',
    amber: 'bg-amber-600 hover:bg-amber-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      {/* Animated icon ring */}
      <div className="relative mb-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className={`absolute inset-0 rounded-full border-2 ${colorMap[accentColor]?.split(' ')[1]} scale-125`}
        />
        <div className={`relative w-20 h-20 rounded-2xl border ${colorMap[accentColor]} flex items-center justify-center`}>
          <Icon className="w-10 h-10" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50 max-w-xs leading-relaxed mb-6">{description}</p>

      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
          className={`${btnMap[accentColor]} text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors`}
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
}

// ── Loading spinner ───────────────────────────────────────────────────────────
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3' }[size];
  return (
    <div className={`${s} border-white/20 border-t-violet-500 rounded-full animate-spin`} />
  );
}

// ── Page loading overlay ──────────────────────────────────────────────────────
export function PageLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-64 gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-sm text-white/40 animate-pulse">Loading...</p>
    </div>
  );
}
