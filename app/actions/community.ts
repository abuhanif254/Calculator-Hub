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
