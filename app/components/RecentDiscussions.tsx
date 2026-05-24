'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

// ── Types ────────────────────────────────────────────────────────────────────
interface Discussion {
  id: string;
  topic: string;
  slug: string;
  category: string;
  replies: number;
}

// ── Static fallback — shown when Firestore is empty or unavailable ────────────
const FALLBACK: Discussion[] = [
  { id: 'f1', topic: 'Best JSON Formatter settings?',    slug: '', category: 'Developer Tools', replies: 12 },
  { id: 'f2', topic: 'How accurate is the BMI formula?', slug: '', category: 'Health',          replies: 34 },
  { id: 'f3', topic: 'Mortgage planning tips for 2025',  slug: '', category: 'Finance',         replies: 8  },
];

// ── Derive a display category from post title keywords ────────────────────────
function deriveCategory(title: string): string {
  const t = title.toLowerCase();
  if (/json|html|css|code|dev|api|sql|format|diff|script/.test(t)) return 'Developer Tools';
  if (/bmi|calorie|weight|fitness|health|body|diet|exercise/.test(t)) return 'Health';
  if (/mortgage|loan|tax|invest|retire|finance|money|budget|interest/.test(t)) return 'Finance';
  if (/math|fraction|percent|geometry|science|triangle|calcul/.test(t)) return 'Math & Science';
  return 'General';
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl animate-pulse">
      <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded-full mb-4" />
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full mb-2" />
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full mb-6" />
      <div className="border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-between">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}

// ── Discussion card ───────────────────────────────────────────────────────────
function DiscussionCard({ discussion }: { discussion: Discussion }) {
  const href = discussion.slug ? `/community/${discussion.slug}` : '/community';

  return (
    <Link
      href={href as Parameters<typeof Link>[0]['href']}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl hover:shadow-md hover:border-[#518231]/30 transition-all group block"
    >
      <div className="text-xs font-semibold text-[#518231] mb-3 uppercase tracking-wider">
        {discussion.category}
      </div>
      <h4 className="text-slate-900 dark:text-white font-bold mb-4 line-clamp-2 group-hover:text-[#518231] transition-colors">
        {discussion.topic}
      </h4>
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4">
        <span className="flex items-center gap-1.5">
          <MessageSquare size={14} />
          {discussion.replies} {discussion.replies === 1 ? 'reply' : 'replies'}
        </span>
        <span className="text-[#518231] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Read <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export function RecentDiscussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDiscussions() {
      try {
        const q = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const snap = await getDocs(q);

        if (cancelled) return;

        if (snap.empty) {
          setDiscussions(FALLBACK);
        } else {
          const items: Discussion[] = snap.docs.map((doc) => {
            const data = doc.data();
            return {
              id:       doc.id,
              topic:    data.title    ?? 'Untitled',
              slug:     data.slug     ?? doc.id,
              category: deriveCategory(data.title ?? ''),
              // posts collection doesn't have a replies count yet — default 0
              replies:  data.replyCount ?? 0,
            };
          });
          setDiscussions(items);
        }
      } catch {
        // Network error or permissions — degrade silently to fallback
        if (!cancelled) setDiscussions(FALLBACK);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDiscussions();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading
        ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
        : discussions.map((d) => <DiscussionCard key={d.id} discussion={d} />)
      }
    </div>
  );
}
