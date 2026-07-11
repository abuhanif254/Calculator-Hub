"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Bell, X, Zap, Star, Info, CheckCheck, Package, MessageCircle, Heart, CheckCircle } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot, updateDoc, doc } from "firebase/firestore";

// ── Notification data ─────────────────────────────────────────────────────────
export type NotificationType = "new_tool" | "update" | "tip" | "announcement" | "reply" | "upvote" | "accepted";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;  // ISO date string
  href?: string;
  read?: boolean;
  isUserSpecific?: boolean;
}

const SYSTEM_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-001",
    type: "new_tool",
    title: "New: Roth IRA Calculator",
    body: "Plan your retirement contributions with our new Roth IRA calculator with full tax bracket support.",
    timestamp: "2026-05-30T10:00:00Z",
    href: "/calculators/roth-ira-calculator",
  },
  {
    id: "notif-002",
    type: "new_tool",
    title: "New: Cashback & Low-Interest Card Comparator",
    body: "Find whether a cashback card or a low-interest card saves you more money on your spending habits.",
    timestamp: "2026-05-28T09:00:00Z",
    href: "/calculators/cashback-low-interest-calculator",
  },
  {
    id: "notif-003",
    type: "update",
    title: "Savings Calculator Upgraded",
    body: "The Savings Calculator now supports inflation-adjusted projections and multiple contribution schedules.",
    timestamp: "2026-05-25T08:00:00Z",
    href: "/calculators/savings-calculator",
  },
  {
    id: "notif-004",
    type: "tip",
    title: "Pro Tip: Use Ctrl+K to Search",
    body: "Press Ctrl K anywhere on the site to instantly search all 250+ tools and calculators.",
    timestamp: "2026-05-22T07:00:00Z",
  },
  {
    id: "notif-005",
    type: "announcement",
    title: "22 New Languages Added",
    body: "Nexus Calculator now supports 22 languages including Arabic, Chinese, Japanese, Korean, and more.",
    timestamp: "2026-05-20T06:00:00Z",
  },
  {
    id: "notif-006",
    type: "new_tool",
    title: "New: Binary Calculator",
    body: "Convert between binary, octal, decimal, and hexadecimal with step-by-step explanations.",
    timestamp: "2026-05-18T09:00:00Z",
    href: "/calculators/binary-calculator",
  },
  {
    id: "notif-007",
    type: "tip",
    title: "Export Results to PDF",
    body: "Most calculators now support exporting your results and charts directly to PDF. Look for the Export button.",
    timestamp: "2026-05-15T08:00:00Z",
  },
];

const STORAGE_KEY = "nexus_read_notifications";

// ── Helpers ───────────────────────────────────────────────────────────────────
function getReadIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveReadIds(ids: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const TYPE_META: Record<
  NotificationType,
  { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; bg: string; text: string }
> = {
  new_tool:     { icon: Package,  label: "New Tool",     bg: "bg-emerald-500/10", text: "text-emerald-500" },
  update:       { icon: Zap,      label: "Update",       bg: "bg-blue-500/10",    text: "text-blue-500"    },
  tip:          { icon: Star,     label: "Tip",          bg: "bg-amber-500/10",   text: "text-amber-500"   },
  announcement: { icon: Info,     label: "Announcement", bg: "bg-purple-500/10",  text: "text-purple-500"  },
  reply:        { icon: MessageCircle, label: "New Reply", bg: "bg-indigo-500/10", text: "text-indigo-500" },
  upvote:       { icon: Heart,         label: "Upvote",    bg: "bg-rose-500/10",   text: "text-rose-500" },
  accepted:     { icon: CheckCircle,   label: "Accepted",  bg: "bg-[#518231]/10",  text: "text-[#518231]" },
};

// ── Main Component ────────────────────────────────────────────────────────────
export function NotificationsPanel() {
  const { appUser }             = useAuth();
  const [open, setOpen]         = useState(false);
  const [readIds, setReadIds]   = useState<Set<string>>(new Set());
  const [userNotifications, setUserNotifications] = useState<AppNotification[]>([]);
  const [mounted, setMounted]   = useState(false);
  const panelRef                = useRef<HTMLDivElement>(null);
  const buttonRef               = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    setReadIds(getReadIds());
  }, []);

  useEffect(() => {
    if (!appUser) {
      setUserNotifications([]);
      return;
    }
    const q = query(collection(db, `users/${appUser.uid}/notifications`), orderBy('timestamp', 'desc'), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      const notifs = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        isUserSpecific: true,
        read: d.data().read || false
      })) as AppNotification[];
      setUserNotifications(notifs);
    });
    return () => unsub();
  }, [appUser]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current  && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const allNotifications = useMemo(() => {
    return [...userNotifications, ...SYSTEM_NOTIFICATIONS].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [userNotifications]);

  const unreadCount = mounted
    ? allNotifications.filter((n) => n.isUserSpecific ? !n.read : !readIds.has(n.id)).length
    : 0;

  const markAllRead = useCallback(() => {
    const allSystem = new Set(SYSTEM_NOTIFICATIONS.map((n) => n.id));
    setReadIds(allSystem);
    saveReadIds(allSystem);
    
    // Mark user notifications read in firestore
    if (appUser) {
       userNotifications.filter(n => !n.read).forEach(n => {
          updateDoc(doc(db, `users/${appUser.uid}/notifications`, n.id), { read: true }).catch(()=>null);
       });
    }
  }, [userNotifications, appUser]);

  const markRead = useCallback((id: string, isUserSpecific?: boolean) => {
    if (isUserSpecific && appUser) {
       updateDoc(doc(db, `users/${appUser.uid}/notifications`, id), { read: true }).catch(()=>null);
    } else {
       setReadIds((prev) => {
         const next = new Set(prev);
         next.add(id);
         saveReadIds(next);
         return next;
       });
    }
  }, [appUser]);

  const handleOpen = () => {
    setOpen((v) => !v);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        ref={buttonRef}
        onClick={handleOpen}
        aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        className="relative p-2 text-slate-400 hover:text-[#518231] transition-colors dark:text-slate-500 dark:hover:text-[#518231]"
        title="Notifications"
      >
        <Bell size={20} />
        {/* Unread badge */}
        {mounted && unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 min-w-[16px] h-[16px] bg-red-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-bold text-white leading-none px-0.5"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel — bottom sheet on mobile, absolute dropdown on sm+ */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-label="Notifications"
            className={[
              // Mobile: full-width bottom sheet
              "fixed inset-x-0 bottom-0 z-50 rounded-t-2xl w-full",
              // sm+: absolute dropdown pinned right
              "sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-full sm:mt-3 sm:w-[360px] sm:max-w-[100vw] sm:rounded-2xl",
              // Shared
              "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden",
            ].join(" ")}
            style={{ animation: "fadeInUp 0.18s ease-out" }}
          >
            {/* Mobile drag indicator */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-[#518231]" />
              <span className="font-bold text-slate-900 dark:text-white text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full leading-none">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#518231] hover:text-[#436a28] transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck size={12} />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close notifications"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <ul className="max-h-[60dvh] sm:max-h-[420px] overflow-y-auto overscroll-contain divide-y divide-slate-100 dark:divide-slate-800">
            {allNotifications.map((notif) => {
              const isRead = notif.isUserSpecific ? notif.read : readIds.has(notif.id);
              const meta   = TYPE_META[notif.type] || TYPE_META.announcement;
              const Icon   = meta.icon;
              const inner  = (
                <li
                  key={notif.id}
                  className={`flex gap-3 px-4 py-3.5 transition-colors cursor-pointer
                    ${isRead
                      ? "bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      : "bg-[#518231]/5 hover:bg-[#518231]/10 dark:bg-[#518231]/10 dark:hover:bg-[#518231]/15"
                    }`}
                  onClick={() => markRead(notif.id, notif.isUserSpecific)}
                >
                  {/* Icon */}
                  <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${meta.bg}`}>
                    <Icon size={15} className={meta.text} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm leading-snug ${isRead ? "font-medium text-slate-700 dark:text-slate-300" : "font-semibold text-slate-900 dark:text-white"}`}>
                        {notif.title}
                      </p>
                      {!isRead && (
                        <span className="shrink-0 mt-1 w-2 h-2 bg-[#518231] rounded-full" aria-label="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
                      {notif.body}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[10px] font-semibold uppercase tracking-wide ${meta.text}`}>
                        {meta.label}
                      </span>
                      <span className="text-[10px] text-slate-400">·</span>
                      <span className="text-[10px] text-slate-400">{relativeTime(notif.timestamp)}</span>
                    </div>
                  </div>
                </li>
              );

              if (notif.href) {
                return (
                  <a key={notif.id} href={notif.href} onClick={() => { markRead(notif.id, notif.isUserSpecific); setOpen(false); }} className="block no-underline">
                    {inner}
                  </a>
                );
              }
              return inner;
            })}
          </ul>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              System notifications · Updated regularly
            </span>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
