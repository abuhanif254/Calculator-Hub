import React from 'react';
import { Link } from '@/i18n/routing';
import { queryPostsRest } from '@/lib/firebase-rest';
import { MessageCircle, Heart, Layers } from 'lucide-react';
import { getCategoryMeta } from '@/lib/categories';

interface RelatedPostsProps {
  currentPostId: string;
  tags?: string[];
  category?: string;
}

function timeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + 'd ago';
  const hrs = seconds / 3600;
  if (hrs > 1) return Math.floor(hrs) + 'h ago';
  return Math.floor(seconds / 60) + 'm ago';
}

export async function RelatedPosts({ currentPostId, tags = [], category }: RelatedPostsProps) {
  // Strategy: first try tag match, fall back to category match
  let candidates: Awaited<ReturnType<typeof queryPostsRest>> = [];

  if (tags.length > 0) {
    // Fetch by first tag (Firestore ARRAY_CONTAINS only allows one value at a time)
    const byTag = await queryPostsRest({
      tag: tags[0],
      sortMethod: 'top',
      limitCount: 8,
    }).catch(() => []);
    candidates = byTag.filter(p => p.id !== currentPostId);
  }

  // If we don't have enough from tags, supplement with category
  if (candidates.length < 4 && category) {
    const byCat = await queryPostsRest({
      category,
      sortMethod: 'top',
      limitCount: 8,
    }).catch(() => []);
    const tagIds = new Set(candidates.map(p => p.id));
    const catCandidates = byCat.filter(p => p.id !== currentPostId && !tagIds.has(p.id));
    candidates = [...candidates, ...catCandidates];
  }

  const related = candidates.slice(0, 4);
  if (related.length === 0) return null;

  return (
    <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <Layers size={18} className="text-[#518231]" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Related Discussions</h3>
      </div>

      {/* Post list */}
      <div className="divide-y divide-slate-50 dark:divide-slate-800">
        {related.map((post) => {
          const catMeta = (post as any).category ? getCategoryMeta((post as any).category) : null;
          return (
            <Link
              key={post.id}
              href={`/community/${post.slug}` as any}
              className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
            >
              {/* Vote accent */}
              <div className="flex-shrink-0 flex flex-col items-center gap-0.5 min-w-[2.5rem] mt-1">
                <span className="text-lg font-extrabold text-slate-400 dark:text-slate-500 group-hover:text-[#518231] transition-colors leading-none">
                  {post.upvotes || 0}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">votes</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {catMeta && (
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border mb-1 ${catMeta.color}`}>
                    {catMeta.emoji} {catMeta.label}
                  </span>
                )}
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#518231] transition-colors leading-snug line-clamp-2">
                  {post.title}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MessageCircle size={11} />
                    {post.replyCount || 0}
                  </span>
                  <span>·</span>
                  <span>{timeAgo(post.createdAt)}</span>
                  {post.authorName && (
                    <>
                      <span>·</span>
                      <span className="truncate">{post.authorName}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-3 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
        <Link
          href="/community"
          className="text-xs font-semibold text-[#518231] hover:text-[#436a28] transition-colors"
        >
          Browse all discussions →
        </Link>
      </div>
    </div>
  );
}
