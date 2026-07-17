'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Database, FolderTree, ScanSearch, Shield, Briefcase,
  CalendarClock, FileOutput, FileInput, ScrollText, BookCheck, FileBarChart2,
  Key, Webhook, Users, Monitor, Cpu, ListOrdered, Settings, ChevronDown,
  ChevronRight, Zap, ShieldAlert, AlertTriangle, GitBranch, Package, Store,
  PanelLeftClose, PanelLeft, Eye, BarChart3, Lock
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: NavItem[];
  badge?: string;
}

const navGroups: NavItem[] = [
  { label: 'Dashboard', href: '/database-privacy/dashboard', icon: LayoutDashboard },
  {
    label: 'Workspace', icon: Briefcase,
    children: [
      { label: 'Projects', href: '/database-privacy/projects', icon: GitBranch },
      { label: 'Organizations', href: '/database-privacy/organizations', icon: Users },
    ]
  },
  {
    label: 'Connections', icon: Database,
    children: [
      { label: 'Databases', href: '/database-privacy/connections', icon: Database },
      { label: 'Secrets Manager', href: '/database-privacy/secrets', icon: Lock },
    ]
  },
  {
    label: 'Scanner', icon: ScanSearch,
    children: [
      { label: 'Scan Jobs', href: '/database-privacy/scanner', icon: ScanSearch },
      { label: 'Findings', href: '/database-privacy/scanner/findings', icon: ShieldAlert },
    ]
  },
  {
    label: 'Masking', icon: Shield,
    children: [
      { label: 'Rule Builder', href: '/database-privacy/masking/rules', icon: Shield },
      { label: 'Templates', href: '/database-privacy/masking/templates', icon: Package },
      { label: 'Marketplace', href: '/database-privacy/masking/marketplace', icon: Store },
      { label: 'Preview', href: '/database-privacy/masking/preview', icon: Eye },
    ]
  },
  {
    label: 'Anonymize', icon: Zap,
    children: [
      { label: 'Upload & Mask', href: '/database-privacy/anonymize', icon: Zap },
      { label: 'Explorer', href: '/database-privacy/explorer', icon: FolderTree },
    ]
  },
  {
    label: 'Jobs', icon: Cpu,
    children: [
      { label: 'Active Jobs', href: '/database-privacy/jobs', icon: Cpu },
      { label: 'Job History', href: '/database-privacy/jobs/history', icon: ScrollText },
      { label: 'Scheduler', href: '/database-privacy/jobs/scheduler', icon: CalendarClock },
    ]
  },
  { label: 'Export', href: '/database-privacy/export', icon: FileOutput },
  { label: 'Import', href: '/database-privacy/import', icon: FileInput },
  { label: 'Reports', href: '/database-privacy/reports', icon: FileBarChart2 },
  { label: 'Compliance', href: '/database-privacy/compliance', icon: BookCheck },
  { label: 'Audit Logs', href: '/database-privacy/audit', icon: ScrollText },
  {
    label: 'API & Integrations', icon: Key,
    children: [
      { label: 'API Keys', href: '/database-privacy/api-keys', icon: Key },
      { label: 'Webhooks', href: '/database-privacy/webhooks', icon: Webhook },
    ]
  },
  {
    label: 'Users & Teams', icon: Users,
    children: [
      { label: 'Users', href: '/database-privacy/users', icon: Users },
      { label: 'Roles', href: '/database-privacy/users/roles', icon: Shield },
    ]
  },
  {
    label: 'Monitoring', icon: Monitor,
    children: [
      { label: 'Performance', href: '/database-privacy/monitoring', icon: BarChart3 },
      { label: 'Workers', href: '/database-privacy/monitoring/workers', icon: Cpu },
      { label: 'Queue', href: '/database-privacy/monitoring/queue', icon: ListOrdered },
    ]
  },
  { label: 'Settings', href: '/database-privacy/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    // Auto-open the group containing the current path
    const initial = new Set<string>();
    navGroups.forEach(g => {
      if (g.children?.some(c => pathname?.includes(c.href || ''))) {
        initial.add(g.label);
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const isActive = (href?: string) => href && pathname?.includes(href.split('/').pop() || '');

  return (
    <aside
      className={`relative flex flex-col h-full bg-[#0A0F1A] border-r border-white/5 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5 min-h-[64px]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight">DataPrivacy</p>
            <p className="text-white/40 text-xs">Enterprise Platform</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 scrollbar-thin">
        {navGroups.map((item) => {
          if (item.children) {
            const isOpen = openGroups.has(item.label);
            const isGroupActive = item.children.some(c => isActive(c.href));
            return (
              <div key={item.label}>
                <button
                  onClick={() => !collapsed && toggleGroup(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all group ${isGroupActive ? 'text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
                >
                  <item.icon className={`w-4 h-4 shrink-0 ${isGroupActive ? 'text-violet-400' : ''}`} />
                  {!collapsed && (
                    <>
                      <span className="text-sm font-medium flex-1">{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''} text-white/30`} />
                    </>
                  )}
                </button>
                {!collapsed && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-3 pl-3 border-l border-white/10 mt-1 space-y-0.5 overflow-hidden"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href as any}
                        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-all ${isActive(child.href) ? 'bg-violet-500/15 text-violet-300 font-medium' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}
                      >
                        <child.icon className="w-3.5 h-3.5 shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={(item.href as any) || '#'}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${isActive(item.href) ? 'bg-violet-500/15 text-violet-300 font-medium' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${isActive(item.href) ? 'text-violet-400' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-white/5 p-2">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
