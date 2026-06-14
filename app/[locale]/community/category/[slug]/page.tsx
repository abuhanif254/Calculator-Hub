import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft, MessageSquarePlus } from 'lucide-react';
import { queryPostsRest } from '@/lib/firebase-rest';
import { COMMUNITY_CATEGORIES, getCategoryMeta } from '@/lib/categories';
import CommunityFeed, { Post } from '../../CommunityFeed';

export const revalidate = 120;

// Generate static params for all known categories
export async function generateStaticParams() {
  return COMMUNITY_CATEGORIES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCategoryMeta(slug);
  if (!meta) return { title: 'Not Found' };
  return {
    title: `${meta.emoji} ${meta.label} — Community | NexusCalculator`,
    description: `Browse all ${meta.label} discussions on NexusCalculator. Ask questions, share tips, and connect with the community.`,
  };
}

async function fetchCategoryPosts(category: string): Promise<Post[]> {
  const restPosts = await queryPostsRest({ category, limitCount: 40 });
  return restPosts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    content: p.content,
    authorId: p.authorId,
    authorName: p.authorName,
    authorRole: p.authorRole,
    authorBadges: p.authorBadges,
    createdAt: p.createdAt,
    upvotes: p.upvotes,
    replyCount: p.replyCount,
    tags: p.tags,
    category: (p as any).category,
    isPinned: p.isPinned || false,
    isLocked: p.isLocked || false,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const meta = getCategoryMeta(slug);
  if (!meta) notFound();

  const posts = await fetchCategoryPosts(slug);

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back + Header */}
        <div className="mb-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={15} /> All Channels
          </Link>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${meta.color}`}>
                {meta.emoji}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{meta.label}</h1>
                <p className="text-slate-500 text-sm mt-0.5">
                  {posts.length} discussion{posts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <Link
              href="/community/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageSquarePlus size={16} />
              New Discussion
            </Link>
          </div>
        </div>

        {/* All channels quick-nav strip */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COMMUNITY_CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/community/category/${cat.slug}` as any}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                cat.slug === slug
                  ? `${cat.color} ring-2 ring-offset-1 ring-current`
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>

        {/* Feed */}
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-16 text-center">
            <div className="text-6xl mb-4">{meta.emoji}</div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No discussions yet</h2>
            <p className="text-slate-500 mb-6">Be the first to start a conversation in {meta.label}!</p>
            <Link
              href="/community/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-semibold transition-colors"
            >
              <MessageSquarePlus size={18} /> Start a Discussion
            </Link>
          </div>
        ) : (
          <CommunityFeed initialPosts={posts} />
        )}

      </div>
    </div>
  );
}
