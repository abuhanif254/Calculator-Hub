'use server';

import { fetchPostsRest, queryPostsRest } from '@/lib/firebase-rest';

export async function loadMorePosts(lastTimestamp: number) {
  const restPosts = await fetchPostsRest(lastTimestamp);
  return restPosts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    content: p.content,
    authorId: p.authorId,
    authorName: p.authorName,
    authorRole: p.authorRole,
    authorBadges: p.authorBadges,
    tags: p.tags,
    createdAt: p.createdAt,
    upvotes: p.upvotes,
    replyCount: p.replyCount
  }));
}

export async function searchCommunityPosts(options: { 
  query?: string;
  tag?: string; 
  sortMethod?: 'latest' | 'top' | 'unanswered' | 'trending';
}) {
  const restPosts = await queryPostsRest({
    tag: options.tag,
    sortMethod: options.sortMethod,
    limitCount: 100 // Fetch up to 100 posts to allow for client-side text filtering
  });

  let filtered = restPosts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    content: p.content,
    authorId: p.authorId,
    authorName: p.authorName,
    authorRole: p.authorRole,
    authorBadges: p.authorBadges,
    tags: p.tags,
    createdAt: p.createdAt,
    upvotes: p.upvotes,
    replyCount: p.replyCount,
    isPinned: p.isPinned || false,
    isLocked: p.isLocked || false
  }));

  // Perform text search on the server if query is provided
  if (options.query && options.query.trim() !== '') {
    const q = options.query.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.content.toLowerCase().includes(q)
    );
  }

  // Ensure pinned posts float to top if sorting was modified by the search
  filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Maintain secondary sort
    if (options.sortMethod === 'top') {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    return b.createdAt - a.createdAt;
  });

  return filtered;
}

export async function fetchTrendingPosts(limitCount: number = 5) {
  const posts = await queryPostsRest({ sortMethod: 'trending', limitCount });
  return posts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    upvotes: p.upvotes || 0,
    replyCount: p.replyCount || 0,
    authorName: p.authorName,
    trendingScore: (p as any).trendingScore || 0,
  }));
}

export interface ToolDiscussionItem {
  id: string;
  title: string;
  slug: string;
  contentSnippet: string;
  authorId: string;
  authorName: string;
  authorRole?: string;
  authorBadges?: string[];
  createdAt: number;
  upvotes: number;
  replyCount: number;
  tags: string[];
  isToolSpecific: boolean;
  category?: string;
}

export async function getDiscussionsForTool(
  calcSlug: string,
  calcCategory?: string,
  limitCount: number = 6
): Promise<ToolDiscussionItem[]> {
  try {
    const { mapCalculatorCategoryToCommunity } = await import('@/lib/utils/communityCategoryMap');
    const communityCat = mapCalculatorCategoryToCommunity(calcCategory);

    // 1. First priority: Fetch posts specifically tagged with this calculator slug
    const taggedPosts = await queryPostsRest({
      tag: calcSlug,
      sortMethod: 'top',
      limitCount,
    }).catch(() => []);

    const results: ToolDiscussionItem[] = taggedPosts.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      contentSnippet: (p.content || '').replace(/<[^>]+>/g, '').replace(/[#*`_~]/g, '').trim().slice(0, 160),
      authorId: p.authorId,
      authorName: p.authorName || 'Community Member',
      authorRole: p.authorRole || 'user',
      authorBadges: p.authorBadges || [],
      createdAt: p.createdAt || Date.now(),
      upvotes: p.upvotes || 0,
      replyCount: p.replyCount || 0,
      tags: p.tags || [],
      isToolSpecific: true,
      category: p.category || communityCat,
    }));

    // 2. If fewer than 3 posts exist, supplement with high-quality posts from this category
    if (results.length < 3 && communityCat) {
      const needed = limitCount - results.length;
      const categoryPosts = await queryPostsRest({
        category: communityCat,
        sortMethod: 'top',
        limitCount: needed + 3,
      }).catch(() => []);

      const existingIds = new Set(results.map(r => r.id));
      for (const p of categoryPosts) {
        if (!existingIds.has(p.id) && results.length < limitCount) {
          results.push({
            id: p.id,
            title: p.title,
            slug: p.slug,
            contentSnippet: (p.content || '').replace(/<[^>]+>/g, '').replace(/[#*`_~]/g, '').trim().slice(0, 160),
            authorId: p.authorId,
            authorName: p.authorName || 'Community Member',
            authorRole: p.authorRole || 'user',
            authorBadges: p.authorBadges || [],
            createdAt: p.createdAt || Date.now(),
            upvotes: p.upvotes || 0,
            replyCount: p.replyCount || 0,
            tags: p.tags || [],
            isToolSpecific: false,
            category: p.category || communityCat,
          });
        }
      }
    }

    return results;
  } catch (err) {
    console.error('getDiscussionsForTool error:', err);
    return [];
  }
}

