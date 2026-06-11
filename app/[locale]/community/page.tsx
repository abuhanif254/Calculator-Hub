import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import { MessageSquarePlus, MessageCircle, Clock, Search, Users, TrendingUp, ChevronRight, User as UserIcon } from 'lucide-react';
import { fetchPostsRest } from '../../../lib/firebase-rest';

// ═══════════════════════════════════════════════════════
// COMMUNITY INDEX PAGE — SERVER COMPONENT
// ═══════════════════════════════════════════════════════

export const revalidate = 300; // ISR: revalidate every 5 minutes

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  authorName?: string;
  createdAt: number;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  return {
    title: 'Community Discussions | NexusCalculator',
    description: 'Join the NexusCalculator community. Ask questions, share tips, and discuss calculators with fellow users.',
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
    createdAt: p.createdAt
  }));
}

function timeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

export default async function CommunityIndex({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const posts = await fetchPosts();

  const forumSchema = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: 'NexusCalculator Community Discussions',
    url: (await import('@/lib/utils/seoUtils')).getCanonicalUrl('/community', resolvedParams.locale),
    description: 'Community forum for calculator and developer tool discussions.',
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
                Nexus Community
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
                The international hub for calculator enthusiasts, developers, and financial planners. Ask, learn, and share.
              </p>
            </div>
            <Link
              href="/community/new"
              className="inline-flex items-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-[#518231]/20 hover:shadow-[#518231]/40 transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquarePlus size={20} />
              Start Discussion
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Feed Column */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Search & Filters Bar */}
              <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search discussions..." 
                    className="w-full pl-11 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400"
                  />
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="flex w-full sm:w-auto gap-1 px-2">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition-colors">Latest</button>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Top</button>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Unanswered</button>
                </div>
              </div>

              {/* Post List */}
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle size={32} className="text-slate-400 dark:text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Discussions Yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                      Be the pioneer! Start the very first discussion in the Nexus community.
                    </p>
                    <Link
                      href="/community/new"
                      className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-lg font-medium transition-colors"
                    >
                      Create First Post
                    </Link>
                  </div>
                ) : (
                  posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/community/${post.slug}` as any}
                      className="block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:flex flex-shrink-0 mt-1">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                            <UserIcon size={20} className="text-slate-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-slate-500">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {post.authorName || 'Community Member'}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {timeAgo(post.createdAt)}
                            </span>
                          </div>
                          
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-3 leading-tight">
                            {post.title}
                          </h2>
                          
                          <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm md:text-base leading-relaxed mb-4">
                            {post.content.replace(/<[^>]+>/g, '')}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                              <MessageCircle size={16} />
                              <span>Discuss</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#518231] font-medium opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                              Read more <ChevronRight size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              
              <div className="bg-gradient-to-br from-[#518231] to-[#3a5e23] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2">Welcome!</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  You've reached the global Nexus community. Share your financial strategies, report bugs, or request new calculators.
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users size={18} />
                  <span>Join the conversation</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#518231]" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Finance', 'Mortgage', 'Feature Request', 'Bug Report', 'Health', 'Development'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Guidelines</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    Be respectful and constructive.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    Search before asking a question.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    Keep discussions relevant to the calculators or logic.
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
