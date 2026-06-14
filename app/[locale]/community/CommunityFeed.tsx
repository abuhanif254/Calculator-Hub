'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MessageCircle, Clock, Search, ChevronRight, User as UserIcon } from 'lucide-react';
import { Link } from '../../../i18n/routing';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/components/AuthProvider';
import { CategoryPill } from '@/lib/categories';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit as firestoreLimit } from 'firebase/firestore';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  authorName?: string;
  authorRole?: string;
  authorBadges?: string[];
  createdAt: number;
  upvotes?: number;
  replyCount?: number;
  tags?: string[];
  isPinned?: boolean;
  isLocked?: boolean;
  category?: string;
  viewCount?: number;
}

export default function CommunityFeed({ initialPosts, initialSearchQuery = '' }: { initialPosts: Post[], initialSearchQuery?: string }) {
  const t = useTranslations('Community');
  const { appUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortMethod, setSortMethod] = useState<'latest' | 'top' | 'unanswered' | 'trending' | 'following'>('latest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length === 20);

  const handleLoadMore = async () => {
    if (posts.length === 0) return;
    setIsLoadingMore(true);
    try {
      const oldestPost = [...posts].sort((a, b) => a.createdAt - b.createdAt)[0];
      const { loadMorePosts } = await import('../../actions/community');
      const newPosts = await loadMorePosts(oldestPost.createdAt);
      
      if (newPosts.length < 20) {
        setHasMore(false);
      }
      
      if (newPosts.length > 0) {
        const existingIds = new Set(posts.map(p => p.id));
        const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id));
        setPosts(prev => [...prev, ...uniqueNewPosts]);
      }
    } catch (error) {
      console.error("Failed to load more posts", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleUpvote = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    if (!appUser) {
      alert("You must be logged in to upvote discussions.");
      return;
    }
    setPosts(currentPosts => currentPosts.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: (p.upvotes || 0) + 1 };
      }
      return p;
    }));
    // In a real app, you'd trigger a fetch request to Firestore here.
  };

  function timeAgo(timestamp: number) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " " + t('yearsAgo');
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " " + t('monthsAgo');
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " " + t('daysAgo');
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " " + t('hoursAgo');
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " " + t('minutesAgo');
    return Math.floor(seconds) + " " + t('secondsAgo');
  }

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Trigger search when trending is selected regardless of other filters
    if (searchQuery === initialSearchQuery && !selectedTag && sortMethod === 'latest') {
      setPosts(initialPosts);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        if (sortMethod === 'following') {
          if (!appUser) {
            setPosts([]);
            setHasMore(false);
            return;
          }
          // Fetch following feed client-side
          const followsSnap = await getDocs(collection(db, `users/${appUser.uid}/following`));
          const followingIds = followsSnap.docs.map(d => d.id);
          
          if (followingIds.length === 0) {
            setPosts([]);
            setHasMore(false);
            return;
          }

          // Chunk into arrays of 10 for Firestore 'in' queries
          const chunks = [];
          for (let i = 0; i < followingIds.length; i += 10) {
            chunks.push(followingIds.slice(i, i + 10));
          }

          const postPromises = chunks.map(chunk => 
            getDocs(query(collection(db, 'posts'), where('authorId', 'in', chunk), firestoreLimit(50)))
          );
          
          const snaps = await Promise.all(postPromises);
          const allPosts: Post[] = [];
          snaps.forEach(snap => {
            snap.forEach(doc => {
              const p = doc.data();
              allPosts.push({
                id: doc.id,
                title: p.title,
                slug: p.slug,
                content: p.content,
                authorId: p.authorId,
                authorName: p.authorName,
                authorRole: p.authorRole,
                authorBadges: p.authorBadges,
                createdAt: p.createdAt,
                upvotes: p.upvotes || p.likesCount || 0,
                replyCount: p.replyCount || 0,
                tags: p.tags,
                isPinned: p.isPinned,
                isLocked: p.isLocked,
                category: p.category,
                viewCount: p.viewCount
              });
            });
          });

          // Sort merged results
          allPosts.sort((a, b) => b.createdAt - a.createdAt);
          setPosts(allPosts);
          setHasMore(false); // Disable pagination for following feed for now
        } else {
          // Standard server-side REST fetch
          const { searchCommunityPosts } = await import('../../actions/community');
          const results = await searchCommunityPosts({
            query: searchQuery,
            tag: selectedTag || undefined,
            sortMethod
          });
          setPosts(results);
          setHasMore(results.length >= 100);
        }
      } catch (err) {
        console.error("Failed to search posts", err);
      } finally {
        setIsSearching(false);
      }
    }, sortMethod === 'trending' ? 0 : 400); // No debounce for trending tab

    return () => clearTimeout(timer);
  }, [searchQuery, selectedTag, sortMethod, initialPosts, initialSearchQuery, appUser]);

  return (
    <div className="lg:col-span-3 space-y-6">
      
      {/* Search & Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input 
            id="community-search-input"
            type="text" 
            placeholder={t('searchPlaceholder')} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 outline-none"
          />
        </div>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
        <div className="flex w-full sm:w-auto gap-1 px-2 items-center">
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 transition-colors flex items-center gap-1"
            >
              #{selectedTag} <span className="text-base leading-none">&times;</span>
            </button>
          )}
          <button 
            onClick={() => setSortMethod('latest')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortMethod === 'latest' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            {t('latest')}
          </button>
          <button 
            onClick={() => setSortMethod('top')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortMethod === 'top' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            {t('top')}
          </button>
          <button 
            onClick={() => setSortMethod('unanswered')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortMethod === 'unanswered' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            {t('unanswered')}
          </button>
          <button 
            onClick={() => setSortMethod('trending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              sortMethod === 'trending' 
                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            🔥 Trending
          </button>
          {appUser && (
            <button 
              onClick={() => setSortMethod('following')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortMethod === 'following' ? 'bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Following
            </button>
          )}
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {isSearching ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Search size={32} className="text-[#518231]" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Searching...</h3>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t('noDiscussionsFound')}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              {searchQuery ? t('noSearchMatch') : t('bePioneer')}
            </p>
            <Link
              href="/community/new"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              {t('createFirstPost')}
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/community/${post.slug}` as any}
              className="block group"
            >
              <article className={`bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md ${post.isPinned ? 'border-amber-400 dark:border-amber-500/50 hover:border-amber-500 bg-amber-50/10 dark:bg-amber-900/10' : 'border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231]'}`}>
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex flex-col items-center gap-1 min-w-[3rem] mt-1">
                    <button 
                      onClick={(e) => handleUpvote(e, post.id)}
                      className="p-1.5 text-slate-400 hover:text-[#518231] hover:bg-[#518231]/10 rounded-lg transition-colors group-hover:text-slate-500"
                      aria-label="Upvote"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-y-0.5 transition-transform"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <span className="font-extrabold text-lg text-slate-700 dark:text-slate-300">{post.upvotes || 0}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-slate-500">
                      <div className="hidden sm:flex flex-shrink-0">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                          <UserIcon size={12} className="text-slate-400" />
                        </div>
                      </div>
                      <span 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          window.location.href = `/community/user/${post.authorId}`; 
                        }} 
                        className="font-semibold text-slate-700 dark:text-slate-300 hover:text-[#518231] hover:underline cursor-pointer relative z-10"
                      >
                        {post.authorName || t('communityMember')}
                      </span>
                      {post.authorRole === 'admin' && (
                        <span className="bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Admin</span>
                      )}
                      {post.authorRole === 'pro' && (
                        <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Pro</span>
                      )}
                      {post.authorBadges?.includes('verified') && (
                        <span className="text-blue-500" title="Verified">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 5.8-5.8 1.4 1.4-7.2 7.2z"/></svg>
                        </span>
                      )}
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {timeAgo(post.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {post.category && (
                        <Link
                          href={`/community/category/${post.category}` as any}
                          onClick={e => e.stopPropagation()}
                          className="relative z-10"
                        >
                          <CategoryPill slug={post.category} />
                        </Link>
                      )}
                      {post.isPinned && (
                        <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                          📌 Pinned
                        </span>
                      )}
                      {post.isLocked && (
                        <span className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
                          🔒 Locked
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2 leading-tight">
                      {post.title}
                    </h2>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedTag(selectedTag === tag ? null : tag);
                            }}
                            className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 relative ${selectedTag === tag ? 'bg-[#518231] text-white border-[#518231]' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm md:text-base leading-relaxed mb-4">
                      {post.content.replace(/<[^>]+>/g, '')}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                        <MessageCircle size={16} />
                        <span>{post.replyCount || 0} {t('replies')}</span>
                      </div>
                      {(post.viewCount || 0) > 0 && (
                        <div className="hidden sm:flex items-center gap-1 text-slate-400">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          <span>{(post.viewCount || 0).toLocaleString()}</span>
                        </div>
                      )}
                      <button 
                        onClick={(e) => handleUpvote(e, post.id)}
                        className="flex sm:hidden items-center gap-1.5 hover:text-[#518231] transition-colors cursor-pointer"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                        <span>{post.upvotes || 0}</span>
                      </button>
                      <div className="flex items-center gap-1.5 text-[#518231] font-medium opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                        {t('readMore')} <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {hasMore && posts.length > 0 && searchQuery.trim() === '' && !isSearching && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
