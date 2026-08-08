"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Shield,
  LayoutDashboard,
  ScanSearch,
  Eye,
  Wand2,
  Database,
  Workflow,
  ShieldCheck,
  BarChart3,
  ScrollText,
  Upload,
  Download,
  Key,
  Lock,
  Webhook,
  Users,
  Activity,
  Settings,
  Menu,
  X,
  ArrowRight,
  LogOut,
  UserCircle,
} from "lucide-react";
import { ToastProvider } from "../../components/platform/ui/Toast";
import PlatformAuthGuard from "../../../components/platform/auth/PlatformAuthGuard";
import { useAuth } from '@/app/components/AuthProvider';

type NavItem = {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isDot?: boolean;
};

type NavSection = {
  title?: string;
  items: NavItem[];
};

export default function DatabasePrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { appUser, user, signOut } = useAuth();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut();
    router.push(`/${locale}/database-privacy/login`);
  };

  // Safely handle pathname (usePathname can return null with next-intl)
  const path = pathname ?? '';

  // Auth pages render without sidebar or auth guard
  const isAuthPage =
    path.includes("/database-privacy/login") ||
    path.includes("/database-privacy/signup") ||
    path.includes("/database-privacy/auth/");

  // Landing page is public (no auth guard, but keep sidebar)
  const isLandingPage = path.endsWith("/database-privacy") || path.endsWith("/database-privacy/");

  const navSections: NavSection[] = [
    {
      items: [
        {
          name: "Dashboard",
          icon: LayoutDashboard,
          href: `/${locale}/database-privacy/dashboard`,
        },
      ],
    },
    {
      title: "Discovery",
      items: [
        {
          name: "PII Scanner",
          icon: ScanSearch,
          href: `/${locale}/database-privacy/scanner`,
        },
        {
          name: "Scan Findings",
          isDot: true,
          href: `/${locale}/database-privacy/scanner/findings`,
        },
      ],
    },
    {
      title: "Anonymization",
      items: [
        {
          name: "Masking Rules",
          icon: Eye,
          href: `/${locale}/database-privacy/masking/rules`,
        },
        {
          name: "Template Library",
          isDot: true,
          href: `/${locale}/database-privacy/masking/templates`,
        },
        {
          name: "Rule Marketplace",
          isDot: true,
          href: `/${locale}/database-privacy/masking/marketplace`,
        },
        {
          name: "Preview & Test",
          isDot: true,
          href: `/${locale}/database-privacy/masking/preview`,
        },
        {
          name: "Anonymize",
          icon: Wand2,
          href: `/${locale}/database-privacy/anonymize`,
        },
      ],
    },
    {
      title: "Infrastructure",
      items: [
        {
          name: "Connections",
          icon: Database,
          href: `/${locale}/database-privacy/connections`,
        },
        {
          name: "Schema Explorer",
          isDot: true,
          href: `/${locale}/database-privacy/explorer`,
        },
        {
          name: "Projects",
          isDot: true,
          href: `/${locale}/database-privacy/projects`,
        },
        {
          name: "Organizations",
          isDot: true,
          href: `/${locale}/database-privacy/organizations`,
        },
        {
          name: "Jobs",
          icon: Workflow,
          href: `/${locale}/database-privacy/jobs`,
        },
        {
          name: "Job History",
          isDot: true,
          href: `/${locale}/database-privacy/jobs/history`,
        },
        {
          name: "Scheduler",
          isDot: true,
          href: `/${locale}/database-privacy/jobs/scheduler`,
        },
      ],
    },
    {
      title: "Compliance",
      items: [
        {
          name: "Compliance",
          icon: ShieldCheck,
          href: `/${locale}/database-privacy/compliance`,
        },
        {
          name: "Reports",
          icon: BarChart3,
          href: `/${locale}/database-privacy/reports`,
        },
        {
          name: "Audit Logs",
          icon: ScrollText,
          href: `/${locale}/database-privacy/audit`,
        },
      ],
    },
    {
      title: "Data",
      items: [
        {
          name: "Import",
          icon: Upload,
          href: `/${locale}/database-privacy/import`,
        },
        {
          name: "Export",
          icon: Download,
          href: `/${locale}/database-privacy/export`,
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          name: "API Keys",
          icon: Key,
          href: `/${locale}/database-privacy/api-keys`,
        },
        {
          name: "Secrets",
          icon: Lock,
          href: `/${locale}/database-privacy/secrets`,
        },
        {
          name: "Webhooks",
          icon: Webhook,
          href: `/${locale}/database-privacy/webhooks`,
        },
        {
          name: "Team",
          icon: Users,
          href: `/${locale}/database-privacy/users`,
        },
        {
          name: "Roles",
          isDot: true,
          href: `/${locale}/database-privacy/users/roles`,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          name: "Monitoring",
          icon: Activity,
          href: `/${locale}/database-privacy/monitoring`,
        },
        {
          name: "Worker Nodes",
          isDot: true,
          href: `/${locale}/database-privacy/monitoring/workers`,
        },
        {
          name: "Queue Manager",
          isDot: true,
          href: `/${locale}/database-privacy/monitoring/queue`,
        },
        {
          name: "Settings",
          icon: Settings,
          href: `/${locale}/database-privacy/settings`,
        },
      ],
    },
  ];

  const renderSidebarContent = () => (
    <div className="py-4">
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">
            DataPrivacy
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Platform by Nexus</span>
          <Link
            href={`/${locale}`}
            className="hover:text-violet-600 transition-colors flex items-center gap-1"
          >
            Home <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="h-px bg-slate-200 dark:bg-slate-800 mx-4 mb-2" />

      <nav className="space-y-6 pb-8">
        {navSections.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 pt-4 pb-1">
                {section.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((item: NavItem) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2.5 py-2 text-sm font-medium rounded-lg mx-2 transition-all duration-150
                      ${
                        isActive
                          ? "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border-l-2 border-violet-500 px-[14px]"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-violet-600 px-4"
                      }
                      ${item.isDot ? "pl-8" : ""}`}
                  >
                    {!item.isDot && Icon && (
                      <Icon className="w-4 h-4 shrink-0" />
                    )}
                    {item.isDot && (
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-violet-500" : "bg-slate-300 dark:bg-slate-600"}`}
                      />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User menu at bottom of sidebar */}
      {user && appUser && (
        <div className="border-t border-slate-200 dark:border-slate-800 p-3 mt-auto">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">
                {(appUser.displayName || user.email || "U")[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-900 dark:text-white truncate">
                {appUser.displayName || "User"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Auth pages (login/signup): render without sidebar
  if (isAuthPage) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  // Landing page: render without the app sidebar so public visitors see
  // a clean marketing page, not the authenticated dashboard shell.
  if (isLandingPage) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  return (
    <ToastProvider>
      {/* Prevent search engines from indexing authenticated dashboard routes */}
      <meta name="robots" content="noindex, nofollow" />
      <div className="w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-600" />
              DataPrivacy Platform
            </span>
          </div>
          <Link
            href={`/${locale}/database-privacy/dashboard`}
            className="text-xs font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1"
          >
            Dashboard <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 lg:hidden flex flex-col overflow-y-auto"
              >
                <div className="flex items-center justify-end p-4">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {renderSidebarContent()}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex gap-6 lg:gap-8 items-start">
            {/* Desktop sidebar - sticky */}
            <aside className="hidden lg:block w-60 shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm custom-scrollbar">
              {renderSidebarContent()}
            </aside>

            {/* Main content — auth guard skips login, signup, and landing page */}
            <main className="flex-1 min-w-0">
              {isAuthPage || isLandingPage ? (
                children
              ) : (
                <PlatformAuthGuard>{children}</PlatformAuthGuard>
              )}
            </main>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
