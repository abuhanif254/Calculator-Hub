'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number; // percentage, positive = up, negative = down
  icon: React.ElementType;
  iconColor?: string;
  iconBg?: string;
  delay?: number;
}

export function MetricCard({ title, value, subtitle, trend, icon: Icon, iconColor = 'text-violet-400', iconBg = 'bg-violet-500/10', delay = 0 }: MetricCardProps) {
  const TrendIcon = trend === undefined ? null : trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendColor = trend === undefined ? '' : trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-red-400' : 'text-white/40';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 rounded-2xl p-5 transition-all group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {TrendIcon && trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-sm font-medium text-white/60 mt-1">{title}</p>
      {subtitle && <p className="text-xs text-white/30 mt-0.5">{subtitle}</p>}
    </motion.div>
  );
}

interface StatusBadgeProps {
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';
  size?: 'sm' | 'md';
}

const statusConfig: Record<StatusBadgeProps['status'], { label: string; dot: string; bg: string; text: string }> = {
  pending:   { label: 'Pending',   dot: 'bg-amber-400',   bg: 'bg-amber-400/10',   text: 'text-amber-400' },
  running:   { label: 'Running',   dot: 'bg-blue-400 animate-pulse', bg: 'bg-blue-400/10', text: 'text-blue-400' },
  completed: { label: 'Completed', dot: 'bg-emerald-400', bg: 'bg-emerald-400/10', text: 'text-emerald-400' },
  failed:    { label: 'Failed',    dot: 'bg-red-400',     bg: 'bg-red-400/10',     text: 'text-red-400' },
  cancelled: { label: 'Cancelled', dot: 'bg-white/30',    bg: 'bg-white/5',        text: 'text-white/40' },
  paused:    { label: 'Paused',    dot: 'bg-orange-400',  bg: 'bg-orange-400/10',  text: 'text-orange-400' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${cfg.bg} ${cfg.text} ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

interface RiskBadgeProps {
  risk: 'critical' | 'high' | 'medium' | 'low';
}

const riskConfig: Record<RiskBadgeProps['risk'], { label: string; bg: string; text: string; border: string }> = {
  critical: { label: 'Critical', bg: 'bg-red-500/10',    text: 'text-red-400',    border: 'border-red-500/20' },
  high:     { label: 'High',     bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  medium:   { label: 'Medium',   bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  low:      { label: 'Low',      bg: 'bg-emerald-500/10',text: 'text-emerald-400',border: 'border-emerald-500/20' },
};

export function RiskBadge({ risk }: RiskBadgeProps) {
  const cfg = riskConfig[risk];
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {cfg.label}
    </span>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-white/40 mt-1">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-white/20" />
      </div>
      <h3 className="text-lg font-semibold text-white/60 mb-2">{title}</h3>
      <p className="text-sm text-white/30 max-w-xs mb-6">{description}</p>
      {action}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/10" />
      </div>
      <div className="h-8 bg-white/10 rounded-lg w-20 mb-2" />
      <div className="h-4 bg-white/5 rounded w-32" />
    </div>
  );
}

export function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center mx-auto">
            <span className="text-4xl">🚧</span>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{feature}</h2>
          <p className="text-white/40 max-w-sm">This module is coming soon. The platform is being built incrementally — check back soon!</p>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </motion.div>
    </div>
  );
}
