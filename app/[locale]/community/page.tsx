import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import { MessageSquarePlus, Users, TrendingUp, Trophy } from 'lucide-react';
import { fetchPostsRest } from '../../../lib/firebase-rest';
import CommunityFeed, { Post } from './CommunityFeed';
import { Flame } from 'lucide-react';
import { COMMUNITY_CATEGORIES } from '../../../lib/categories';

// ═══════════════════════════════════════════════════════
// COMMUNITY INDEX PAGE — SERVER COMPONENT
// ═══════════════════════════════════════════════════════

export const revalidate = 3600; // ISR: revalidate every 1 hour (was 5 mins) to save Vercel free tier limits

// The Post interface is now exported from CommunityFeed.tsx

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  return {
    title: 'Community Discussions | NexusCalculator',
    description: 'Join the NexusCalculator community. Ask questions, share tips, and discuss developer tools, PDF utilities, image editing, and calculators with fellow professionals.',
    alternates: getCanonicalAndAlternates('/community', locale),
  };
}

async function fetchPosts(): Promise<Post[]> {
  const restPosts = await fetchPostsRest();
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
    viewCount: (p as any).viewCount || 0,
    isPinned: p.isPinned || false,
    isLocked: p.isLocked || false
  }));
}



export default async function CommunityIndex({ 
  params,
  searchParams
}: { 
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialQuery = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

  const posts = await fetchPosts();
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Community' });

  // Fetch trending sidebar data in parallel
  const { fetchTrendingPosts } = await import('../../actions/community');
  const trendingPosts = await fetchTrendingPosts(5).catch(() => []);

  const forumSchema = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: 'NexusCalculator Community Discussions',
    url: (await import('@/lib/utils/seoUtils')).getCanonicalUrl('/community', resolvedParams.locale),
    description: 'Global community forum for developers, designers, financial planners, and everyday users. Discuss web tools, image processing, PDF utilities, and high-precision calculators.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(forumSchema) }}
      />

      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('title')}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href="/community/new"
              className="inline-flex items-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-[#518231]/20 hover:shadow-[#518231]/40 transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquarePlus size={20} />
              {t('startDiscussion')}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Feed Column (Client Component) */}
            <CommunityFeed initialPosts={posts} initialSearchQuery={initialQuery} />

            {/* Right Sidebar */}
            <div className="space-y-6">
              
              <div className="bg-gradient-to-br from-[#518231] to-[#3a5e23] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('welcomeTitle')}</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  {t('welcomeText')}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users size={18} />
                  <span>{t('joinConversation')}</span>
                </div>
              </div>

              {/* Channels Widget */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#518231]" />
                  Channels
                </h3>
                <div className="space-y-1">
                  {COMMUNITY_CATEGORIES.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/community/category/${cat.slug}` as any}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">{cat.emoji}</span>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">{t('guidelinesTitle')}</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    {t('guideline1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    {t('guideline2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    {t('guideline3')}
                  </li>
                </ul>
              </div>

              {/* 🔥 Trending Now Widget */}
              {trendingPosts.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Flame size={18} className="text-orange-500" />
                    Trending Now
                  </h3>
                  <ol className="space-y-3">
                    {trendingPosts.map((post, i) => (
                      <li key={post.id}>
                        <Link 
                          href={`/community/${post.slug}` as any}
                          className="flex items-start gap-3 group"
                        >
                          <span className={`flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center rounded-full text-[10px] font-black ${
                            i === 0 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                            i === 1 ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' :
                            'bg-slate-50 text-slate-400 dark:bg-slate-800/50 dark:text-slate-500'
                          }`}>{i + 1}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight line-clamp-2">
                              {post.title}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              ❤️ {post.upvotes} &nbsp;·&nbsp; 💬 {post.replyCount}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Hall of Fame link */}
              <Link
                href="/community/hall-of-fame" 
                className="block bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/50 p-6 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                    <Trophy size={20} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">Hall of Fame</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  Discover our top contributors and all-time best discussions.
                </p>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-500 flex items-center gap-1">
                  View Leaderboard →
                </span>
              </Link>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
