'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  HelpCircle,
  Send,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Flame,
  Clock,
  ExternalLink,
  MessageCircleQuestion,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '@/app/components/AuthProvider';
import { ToolDiscussionItem } from '@/app/actions/community';
import {
  getContextualQuestionPrompts,
  mapCalculatorCategoryToCommunity,
  ContextualPrompt,
} from '@/lib/utils/communityCategoryMap';
import { CategoryPill } from '@/lib/categories';

interface EmbeddedToolDiscussionsProps {
  calcSlug: string;
  calcTitle: string;
  calcCategory?: string;
  locale: string;
  initialDiscussions?: ToolDiscussionItem[];
}

export function EmbeddedToolDiscussions({
  calcSlug,
  calcTitle,
  calcCategory,
  locale,
  initialDiscussions = [],
}: EmbeddedToolDiscussionsProps) {
  const { appUser, signIn } = useAuth();
  const [discussions, setDiscussions] = useState<ToolDiscussionItem[]>(initialDiscussions);
  const [activeFilter, setActiveFilter] = useState<'top' | 'latest' | 'unanswered'>('top');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Optimistic upvote tracker
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const d of initialDiscussions) {
      map[d.id] = d.upvotes;
    }
    return map;
  });

  // Client hydration check and data load
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    // If initial discussions are empty (e.g. during SSG build to preserve build speed),
    // fetch live discussions for this tool asynchronously on client mount.
    if (initialDiscussions.length === 0) {
      let isSubscribed = true;
      import('@/app/actions/community').then(({ getDiscussionsForTool }) => {
        getDiscussionsForTool(calcSlug, calcCategory, 6)
          .then((items) => {
            if (isSubscribed && items && items.length > 0) {
              setDiscussions(items);
              setLikesMap((prev) => {
                const updated = { ...prev };
                for (const item of items) {
                  if (updated[item.id] === undefined) {
                    updated[item.id] = item.upvotes;
                  }
                }
                return updated;
              });
            }
          })
          .catch(() => {});
      });

      return () => {
        isSubscribed = false;
      };
    }
  }, [calcSlug, calcCategory, initialDiscussions.length]);

  const prompts = useMemo(
    () => getContextualQuestionPrompts(calcSlug, calcTitle, calcCategory),
    [calcSlug, calcTitle, calcCategory]
  );

  const communityCategory = useMemo(
    () => mapCalculatorCategoryToCommunity(calcCategory),
    [calcCategory]
  );

  // Filtered discussions
  const filteredDiscussions = useMemo(() => {
    const list = [...discussions];
    if (activeFilter === 'top') {
      return list.sort((a, b) => (likesMap[b.id] ?? b.upvotes) - (likesMap[a.id] ?? a.upvotes));
    }
    if (activeFilter === 'latest') {
      return list.sort((a, b) => b.createdAt - a.createdAt);
    }
    if (activeFilter === 'unanswered') {
      return list.filter((d) => d.replyCount === 0).sort((a, b) => b.createdAt - a.createdAt);
    }
    return list;
  }, [discussions, activeFilter, likesMap]);

  // Handle prompt chip click
  const handlePromptClick = (prompt: ContextualPrompt) => {
    setQuestionTitle(prompt.title);
    setQuestionBody(prompt.placeholderBody);
    setIsComposerOpen(true);
  };

  // Upvoting handler
  const handleUpvote = async (e: React.MouseEvent, item: ToolDiscussionItem) => {
    e.preventDefault();
    e.stopPropagation();

    if (upvotedIds.has(item.id)) return;

    if (!appUser) {
      if (confirm('Sign in with Google to upvote this discussion?')) {
        await signIn();
      }
      return;
    }

    // Optimistic update
    setUpvotedIds((prev) => new Set(prev).add(item.id));
    setLikesMap((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] ?? item.upvotes) + 1,
    }));

    try {
      const { db } = await import('@/lib/firebase');
      const { doc, setDoc, updateDoc, increment } = await import('firebase/firestore');

      const likeRef = doc(db, 'likes', `${item.id}_${appUser.uid}`);
      const postRef = doc(db, 'posts', item.id);

      await setDoc(likeRef, {
        userId: appUser.uid,
        postId: item.id,
        createdAt: new Date(),
      });
      await updateDoc(postRef, { likesCount: increment(1) });
    } catch (err) {
      console.error('Error recording upvote:', err);
    }
  };

  // Post Submission handler
  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appUser) {
      await signIn();
      return;
    }

    if (!questionTitle.trim()) {
      setFeedback({ type: 'error', message: 'Please provide a question title.' });
      return;
    }
    if (!questionBody.trim()) {
      setFeedback({ type: 'error', message: 'Please provide question details or scenario context.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const { db } = await import('@/lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const slugify = (await import('slugify')).default;
      const { v4: uuidv4 } = await import('uuid');

      const cleanTitle = questionTitle.trim();
      const baseSlug = slugify(cleanTitle, { lower: true, strict: true }) || 'discussion';
      const uniqueSlug = `${baseSlug}-${uuidv4().slice(0, 8)}`;

      const postData = {
        title: cleanTitle,
        slug: uniqueSlug,
        content: questionBody.trim(),
        category: communityCategory,
        tags: [calcSlug, communityCategory],
        authorId: appUser.uid,
        authorName: appUser.displayName || 'Community Member',
        authorRole: appUser.role || 'user',
        authorBadges: appUser.badges || [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likesCount: 0,
        replyCount: 0,
        commentsCount: 0,
      };

      const docRef = await addDoc(collection(db, 'posts'), postData);

      const optimisticItem: ToolDiscussionItem = {
        id: docRef.id,
        title: cleanTitle,
        slug: uniqueSlug,
        contentSnippet: questionBody.trim().replace(/<[^>]+>/g, '').slice(0, 160),
        authorId: appUser.uid,
        authorName: appUser.displayName || 'You',
        authorRole: appUser.role || 'user',
        authorBadges: appUser.badges || [],
        createdAt: Date.now(),
        upvotes: 0,
        replyCount: 0,
        tags: [calcSlug, communityCategory],
        isToolSpecific: true,
        category: communityCategory,
      };

      setDiscussions((prev) => [optimisticItem, ...prev]);
      setLikesMap((prev) => ({ ...prev, [docRef.id]: 0 }));
      setQuestionTitle('');
      setQuestionBody('');
      setIsComposerOpen(false);
      setFeedback({
        type: 'success',
        message: 'Your question has been published to the Nexus Community!',
      });
      setTimeout(() => setFeedback(null), 8000);
    } catch (err) {
      console.error('Failed to post question:', err);
      setFeedback({
        type: 'error',
        message: 'Failed to post question. Please try again or open the full editor.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Human-readable relative time helper
  function formatTimeAgo(timestamp: number): string {
    if (!mounted) return 'recently';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  }

  // Schema.org DiscussionForumPosting structured data
  const jsonLdData = useMemo(() => {
    if (discussions.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Community Discussions for ${calcTitle}`,
      numberOfItems: discussions.length,
      itemListElement: discussions.slice(0, 6).map((d, index) => ({
        '@type': 'DiscussionForumPosting',
        position: index + 1,
        headline: d.title,
        url: `https://www.nexuscalculator.net/${locale}/community/${d.slug}`,
        datePublished: new Date(d.createdAt).toISOString(),
        author: {
          '@type': 'Person',
          name: d.authorName,
        },
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/CommentAction',
            userInteractionCount: d.replyCount,
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/LikeAction',
            userInteractionCount: likesMap[d.id] ?? d.upvotes,
          },
        ],
      })),
    };
  }, [discussions, calcTitle, locale, likesMap]);

  return (
    <section
      id="community-discussions"
      className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10 transition-colors"
      aria-label={`Community Q&A and Discussions for ${calcTitle}`}
    >
      {/* Schema.org Structured Data */}
      {jsonLdData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20 dark:text-[#6fa844]">
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              Community Q&A & Advice
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {discussions.length} {discussions.length === 1 ? 'thread' : 'threads'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Community Discussions & Real Scenarios
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Ask specific questions, compare edge cases, and get advice from people calculating the same scenario.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsComposerOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white text-sm font-semibold rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Ask a Question</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`mt-4 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <X className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Contextual Question Starters (The UGC Trigger Engine) */}
      <div className="mt-6 p-4 md:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-[#518231] dark:text-[#6fa844]" />
          <span>Popular Discussion Topics for this Calculator</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {prompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePromptClick(prompt)}
              className="text-start p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70 hover:border-[#518231] dark:hover:border-[#6fa844] hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] line-clamp-2 leading-snug">
                  {prompt.title}
                </p>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#518231] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-0.5" />
              </div>
              <span className="text-[11px] text-[#518231] dark:text-[#6fa844] font-medium mt-1 inline-block">
                Ask this question →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      {discussions.length > 0 && (
        <div className="flex items-center justify-between mt-8 mb-4">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveFilter('top')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'top'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Top Questions
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('latest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'latest'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Latest
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('unanswered')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'unanswered'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
              Unanswered
            </button>
          </div>

          <a
            href={`/${locale}/community/category/${communityCategory}`}
            className="text-xs font-bold text-[#518231] hover:text-[#436a28] dark:text-[#6fa844] dark:hover:text-[#518231] hover:underline inline-flex items-center gap-1"
          >
            <span>All Discussions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Discussion List */}
      {filteredDiscussions.length > 0 ? (
        <div className="space-y-3 mt-4">
          {filteredDiscussions.map((post) => {
            const currentLikes = likesMap[post.id] ?? post.upvotes;
            const hasLiked = upvotedIds.has(post.id);

            return (
              <div
                key={post.id}
                className="group flex flex-col sm:flex-row items-start gap-4 p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-[#518231]/40 dark:hover:border-[#518231]/50 hover:shadow-sm transition-all"
              >
                {/* Upvote Widget */}
                <button
                  type="button"
                  onClick={(e) => handleUpvote(e, post)}
                  title={hasLiked ? 'Upvoted' : 'Upvote this discussion'}
                  className={`shrink-0 flex sm:flex-col items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2.5 rounded-xl border transition-all ${
                    hasLiked
                      ? 'bg-[#518231]/15 text-[#518231] border-[#518231]/30 dark:bg-[#518231]/25 dark:text-[#6fa844] dark:border-[#518231]/40 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-[#518231] hover:text-[#518231]'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs font-bold">{currentLikes}</span>
                </button>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {post.isToolSpecific ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20 dark:text-[#6fa844]">
                        #{calcSlug}
                      </span>
                    ) : post.category ? (
                      <CategoryPill slug={post.category} />
                    ) : null}

                    {post.replyCount > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                        {post.replyCount} {post.replyCount === 1 ? 'answer' : 'answers'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                        Awaiting answer
                      </span>
                    )}
                  </div>

                  <a
                    href={`/${locale}/community/${post.slug}`}
                    className="block group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors"
                  >
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {post.title}
                    </h3>
                  </a>

                  {post.contentSnippet && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {post.contentSnippet}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}
                      </div>
                      {post.authorName}
                    </span>

                    <span>•</span>

                    <span>{formatTimeAgo(post.createdAt)}</span>

                    <span>•</span>

                    <a
                      href={`/${locale}/community/${post.slug}#comments`}
                      className="inline-flex items-center gap-1 hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors ml-auto font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.replyCount} replies</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State: High-Converting Invitation */
        <div className="text-center py-10 px-4 mt-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-12 h-12 rounded-full bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20 dark:text-[#6fa844] flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Be the First to Ask a Question About {calcTitle}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-5">
            Do you have an edge case, custom scenario, or want feedback on your calculation numbers?
            Ask the Nexus community and get real user advice.
          </p>
          <button
            type="button"
            onClick={() => setIsComposerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Ask a Question Now</span>
          </button>
        </div>
      )}

      {/* Quick-Ask Modal / Drawer */}
      {isComposerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20 dark:text-[#6fa844] flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Ask About {calcTitle}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tagged as <span className="font-semibold text-[#518231]">#{calcSlug}</span> in Nexus Community
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmitQuestion} className="p-6 space-y-4">
              {!appUser && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between gap-3">
                  <span>Sign in with Google to post your question and receive reply notifications.</span>
                  <button
                    type="button"
                    onClick={() => signIn()}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold shrink-0 shadow-sm"
                  >
                    Sign In
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Question Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How does this calculation compare to 2026 market averages?"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Scenario Details & Context <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide any inputs you used, numbers you are evaluating, or specific advice you are seeking..."
                  value={questionBody}
                  onChange={(e) => setQuestionBody(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent transition-all placeholder:text-slate-400 resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`/${locale}/community/new?tag=${calcSlug}&category=${communityCategory}&title=${encodeURIComponent(questionTitle || '')}`}
                  className="text-xs font-medium text-slate-500 hover:text-[#518231] dark:hover:text-[#6fa844] inline-flex items-center gap-1 hover:underline"
                >
                  <span>Advanced Markdown & Polls Editor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Publishing...' : 'Post Question'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
