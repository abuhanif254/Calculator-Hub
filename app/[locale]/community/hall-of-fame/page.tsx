import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { fetchTopUsersRest, queryPostsRest } from '@/lib/firebase-rest';
import { Link } from '@/i18n/routing';
import { Trophy, Star, Crown, MessageSquare, ArrowRight, ChevronRight, User as UserIcon } from 'lucide-react';
import { BADGES } from '@/lib/badges';

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  return {
    title: 'Community Hall of Fame | NexusCalculator',
    description: 'Discover the top contributors and highest value discussions in the Nexus Community.',
    alternates: getCanonicalAndAlternates('/community/hall-of-fame', locale),
  };
}

export default async function HallOfFamePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  // Fetch top 10 users by reputation
  const topUsers = await fetchTopUsersRest(10);
  
  // Fetch top 5 posts of all time by upvotes
  const goldenPosts = await queryPostsRest({ sortMethod: 'top', limitCount: 5 });

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
            <Trophy size={200} className="text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-6 shadow-sm">
              <Crown size={32} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Fame</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Celebrating our most helpful community members and the legendary discussions that shaped Nexus.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Top Contributors Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <Star className="text-amber-500" size={28} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Top Contributors</h2>
            </div>
            
            <div className="space-y-4">
              {topUsers.map((user, index) => {
                const isTop3 = index < 3;
                const rankColors = [
                  'bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-amber-500/30', // 1st
                  'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800 shadow-slate-400/30', // 2nd
                  'bg-gradient-to-br from-amber-700 to-amber-800 text-white shadow-amber-800/30'  // 3rd
                ];
                
                return (
                  <Link 
                    key={user.id} 
                    href={`/community/user/${user.id}` as any}
                    className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full font-black text-xl md:text-2xl shadow-lg ${isTop3 ? rankColors[index] : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                      #{index + 1}
                    </div>
                    
                    <div className="relative">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm" />
                      ) : (
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm">
                          <UserIcon size={24} className="text-slate-400" />
                        </div>
                      )}
                      {isTop3 && (
                        <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-900 rounded-full p-0.5">
                          <Crown size={16} className="text-amber-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                        {user.displayName}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 capitalize flex items-center gap-2">
                        {user.role === 'admin' ? 'Nexus Team' : user.role === 'pro' ? 'Pro Member' : 'Community Member'}
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        <span className="font-semibold text-amber-600 dark:text-amber-500">{user.reputation} Rep</span>
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5">
                      {user.badges?.slice(0, 3).map((badgeId: string) => {
                        const badgeDef = BADGES[badgeId];
                        if (!badgeDef) return null;
                        const BadgeIcon = badgeDef.icon;
                        return (
                          <div 
                            key={badgeId} 
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${badgeDef.bgClass} shadow-sm border border-white/20`}
                            title={badgeDef.name}
                          >
                            <BadgeIcon size={14} className={badgeDef.colorClass} />
                          </div>
                        );
                      })}
                      {(user.badges?.length || 0) > 3 && (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                          +{user.badges.length - 3}
                        </div>
                      )}
                    </div>
                    
                    <ChevronRight className="text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-colors ml-2 flex-shrink-0" size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Golden Posts Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <MessageSquare className="text-amber-500" size={28} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Golden Threads</h2>
            </div>
            
            <div className="space-y-4">
              {goldenPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/community/${post.slug}` as any}
                  className="block bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-900/10 dark:to-slate-900 p-6 rounded-2xl border border-amber-200/50 dark:border-amber-800/50 shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 dark:bg-amber-500/5 rounded-bl-full pointer-events-none -mr-4 -mt-4"></div>
                  
                  <div className="flex items-start justify-between gap-4 mb-3 relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex flex-col items-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800/50">
                      <span className="text-xs uppercase tracking-wider font-extrabold mb-0.5">Top</span>
                      <span className="font-black text-lg leading-none">+{post.upvotes}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 relative z-10">
                    {post.content.replace(/<[^>]+>/g, '')}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-500 relative z-10">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                      <UserIcon size={12} />
                      {post.authorName}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-500 group-hover:underline">
                      Read Discussion <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 bg-[#518231] rounded-2xl p-8 text-white shadow-lg text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none -mr-4 -mt-4"></div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Want to join the elite?</h3>
              <p className="text-white/90 text-sm mb-6 relative z-10 max-w-sm mx-auto">
                Help others by answering questions, posting high-quality guides, and actively participating in the community to earn reputation points.
              </p>
              <Link 
                href="/community" 
                className="inline-block bg-white text-[#518231] hover:bg-slate-50 font-bold px-6 py-2.5 rounded-xl shadow-sm transition-colors relative z-10"
              >
                Go to Community
              </Link>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
