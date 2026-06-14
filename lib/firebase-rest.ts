import appletConfig from "../firebase-applet-config.json";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || appletConfig.projectId;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || appletConfig.apiKey;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

export interface RestPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  authorName?: string;
  authorRole?: string;
  authorBadges?: string[];
  tags?: string[];
  createdAt: number;
  upvotes?: number;
  replyCount?: number;
  isPinned?: boolean;
  isLocked?: boolean;
  category?: string;
  viewCount?: number;
  poll?: {
    question: string;
    options: {
      id: string;
      text: string;
      votes: number;
      voterIds: string[];
    }[];
    totalVotes: number;
  };
}

// Helper to parse Firestore REST response values
function parseFirestoreValue(value: any): any {
  if (!value) return null;
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue, 10);
  if (value.doubleValue !== undefined) return parseFloat(value.doubleValue);
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return new Date(value.timestampValue).getTime();
  if (value.arrayValue !== undefined) {
    return (value.arrayValue.values || []).map((v: any) => parseFirestoreValue(v));
  }
  if (value.mapValue !== undefined) {
    const res: any = {};
    for (const [k, v] of Object.entries(value.mapValue.fields || {})) {
      res[k] = parseFirestoreValue(v);
    }
    return res;
  }
  return null;
}

export async function fetchPostsRest(startAfterTimestamp?: number, limitCount: number = 20): Promise<RestPost[]> {
  try {
    const structuredQuery: any = {
      from: [{ collectionId: 'posts' }],
      orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
      limit: limitCount
    };

    if (startAfterTimestamp) {
      structuredQuery.startAt = {
        values: [{ integerValue: startAfterTimestamp }],
        before: false
      };
    }

    const response = await fetch(`${BASE_URL}:runQuery?key=${API_KEY}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': 'https://nexuscalculator.net',
        'Referer': 'https://nexuscalculator.net/'
      },
      body: JSON.stringify({ structuredQuery }),
      // Revalidate based on Next.js ISR cache settings from the caller, but we can set default revalidate
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      console.error("REST fetchPosts error:", await response.text());
      return [];
    }

    const data = await response.json();
    
    // runQuery returns an array of [{ document: { name, fields, createTime, updateTime } }]
    const posts: RestPost[] = [];
    for (const item of data) {
      if (!item.document) continue; // Skip empty results
      
      const doc = item.document;
      const id = doc.name.split('/').pop() as string;
      const fields = doc.fields || {};
      
      posts.push({
        id,
        title: parseFirestoreValue(fields.title) || '',
        slug: parseFirestoreValue(fields.slug) || '',
        content: parseFirestoreValue(fields.content) || '',
        authorId: parseFirestoreValue(fields.authorId) || '',
        authorName: parseFirestoreValue(fields.authorName) || 'Unknown',
        authorRole: parseFirestoreValue(fields.authorRole) || 'user',
        authorBadges: parseFirestoreValue(fields.authorBadges) || [],
        tags: parseFirestoreValue(fields.tags) || [],
        createdAt: parseFirestoreValue(fields.createdAt) || Date.now(),
        upvotes: parseFirestoreValue(fields.likesCount) || 0,
        replyCount: parseFirestoreValue(fields.replyCount) || 0,
        isPinned: parseFirestoreValue(fields.isPinned) || false,
        isLocked: parseFirestoreValue(fields.isLocked) || false,
        category: parseFirestoreValue(fields.category) || 'general',
        viewCount: parseFirestoreValue(fields.viewCount) || 0,
      });
    }
    
    return posts;
  } catch (err) {
    console.error("fetchPostsRest exception:", err);
    return [];
  }
}

export async function fetchTopUsersRest(limitCount: number = 10): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}:runQuery?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'users' }],
          orderBy: [{ field: { fieldPath: 'reputation' }, direction: 'DESCENDING' }],
          limit: limitCount
        }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) return [];

    const data = await response.json();
    const users: any[] = [];
    for (const item of data) {
      if (!item.document) continue;
      const doc = item.document;
      const id = doc.name.split('/').pop() as string;
      const fields = doc.fields || {};
      
      users.push({
        id,
        displayName: parseFirestoreValue(fields.displayName) || 'Unknown User',
        photoURL: parseFirestoreValue(fields.photoURL) || null,
        reputation: parseFirestoreValue(fields.reputation) || 0,
        badges: parseFirestoreValue(fields.badges) || [],
        role: parseFirestoreValue(fields.role) || 'user',
      });
    }
    
    return users;
  } catch (err) {
    console.error("fetchTopUsersRest exception:", err);
    return [];
  }
}

export async function queryPostsRest(options: { 
  tag?: string;
  category?: string;
  sortMethod?: 'latest' | 'top' | 'unanswered' | 'trending';
  limitCount?: number;
}): Promise<RestPost[]> {
  try {
    const limitCount = options.limitCount || 50;
    
    const structuredQuery: any = {
      from: [{ collectionId: 'posts' }],
      limit: limitCount
    };

    const filters: any[] = [];

    // Tag filtering
    if (options.tag) {
      filters.push({
        fieldFilter: {
          field: { fieldPath: 'tags' },
          op: 'ARRAY_CONTAINS',
          value: { stringValue: options.tag }
        }
      });
    }

    // Category filtering
    if (options.category) {
      filters.push({
        fieldFilter: {
          field: { fieldPath: 'category' },
          op: 'EQUAL',
          value: { stringValue: options.category }
        }
      });
    }

    // Unanswered filtering
    if (options.sortMethod === 'unanswered') {
      filters.push({
        fieldFilter: {
          field: { fieldPath: 'replyCount' },
          op: 'EQUAL',
          value: { integerValue: 0 }
        }
      });
    }

    if (filters.length === 1) {
      structuredQuery.where = filters[0];
    } else if (filters.length > 1) {
      structuredQuery.where = {
        compositeFilter: {
          op: 'AND',
          filters: filters
        }
      };
    }

    // Sorting
    // Note: If we have an inequality filter or array_contains, Firestore requires the first order by field to match.
    // So if sortMethod is 'top' (orderBy likesCount DESC), we can only do it if there are no complex filters,
    // otherwise we might need a composite index. We'll fallback to client-side sorting for complex cases,
    // but we can request basic sorting here.
    if (options.sortMethod === 'top') {
      structuredQuery.orderBy = [{ field: { fieldPath: 'likesCount' }, direction: 'DESCENDING' }];
    } else if (options.sortMethod === 'trending') {
      structuredQuery.orderBy = [{ field: { fieldPath: 'trendingScore' }, direction: 'DESCENDING' }];
    } else {
      structuredQuery.orderBy = [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }];
    }

    const response = await fetch(`${BASE_URL}:runQuery?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ structuredQuery }),
      next: { revalidate: 60 } // Shorter cache for dynamic queries
    });

    if (!response.ok) {
      console.error("REST queryPosts error:", await response.text());
      return [];
    }

    const data = await response.json();
    const posts: RestPost[] = [];
    for (const item of data) {
      if (!item.document) continue;
      const doc = item.document;
      const id = doc.name.split('/').pop() as string;
      const fields = doc.fields || {};
      
      posts.push({
        id,
        title: parseFirestoreValue(fields.title) || '',
        slug: parseFirestoreValue(fields.slug) || '',
        content: parseFirestoreValue(fields.content) || '',
        authorId: parseFirestoreValue(fields.authorId) || '',
        authorName: parseFirestoreValue(fields.authorName) || 'Unknown',
        authorRole: parseFirestoreValue(fields.authorRole) || 'user',
        authorBadges: parseFirestoreValue(fields.authorBadges) || [],
        tags: parseFirestoreValue(fields.tags) || [],
        createdAt: parseFirestoreValue(fields.createdAt) || Date.now(),
        upvotes: parseFirestoreValue(fields.likesCount) || 0,
        replyCount: parseFirestoreValue(fields.replyCount) || 0,
        isPinned: parseFirestoreValue(fields.isPinned) || false,
        isLocked: parseFirestoreValue(fields.isLocked) || false,
        category: parseFirestoreValue(fields.category) || 'general',
        viewCount: parseFirestoreValue(fields.viewCount) || 0,
      });
    }
    
    return posts;
  } catch (err) {
    console.error("queryPostsRest exception:", err);
    return [];
  }
}

export async function fetchPostBySlugRest(slug: string): Promise<RestPost | null> {
  try {
    const response = await fetch(`${BASE_URL}:runQuery?key=${API_KEY}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': 'https://nexuscalculator.net',
        'Referer': 'https://nexuscalculator.net/'
      },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'posts' }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'slug' },
              op: 'EQUAL',
              value: { stringValue: slug }
            }
          },
          limit: 1
        }
      }),
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      console.error("REST fetchPostBySlug error:", await response.text());
      return null;
    }

    const data = await response.json();
    if (!data || data.length === 0 || !data[0].document) return null;

    const doc = data[0].document;
    const id = doc.name.split('/').pop() as string;
    const fields = doc.fields || {};

    const pollField = fields.poll?.mapValue?.fields;
    let poll = undefined;
    if (pollField) {
      poll = {
        question: parseFirestoreValue(pollField.question),
        totalVotes: parseFirestoreValue(pollField.totalVotes) || 0,
        options: (pollField.options?.arrayValue?.values || []).map((o: any) => {
          const optFields = o.mapValue?.fields || {};
          return {
            id: parseFirestoreValue(optFields.id),
            text: parseFirestoreValue(optFields.text),
            votes: parseFirestoreValue(optFields.votes) || 0,
            voterIds: parseFirestoreValue(optFields.voterIds) || []
          };
        })
      };
    }

    return {
      id,
      title: parseFirestoreValue(fields.title) || '',
      slug: parseFirestoreValue(fields.slug) || '',
      content: parseFirestoreValue(fields.content) || '',
      authorId: parseFirestoreValue(fields.authorId) || '',
      authorName: parseFirestoreValue(fields.authorName) || 'Unknown',
      authorRole: parseFirestoreValue(fields.authorRole) || 'user',
      authorBadges: parseFirestoreValue(fields.authorBadges) || [],
      tags: parseFirestoreValue(fields.tags) || [],
      createdAt: parseFirestoreValue(fields.createdAt) || Date.now(),
      upvotes: parseFirestoreValue(fields.likesCount) || 0,
      replyCount: parseFirestoreValue(fields.replyCount) || 0,
      poll,
      isPinned: parseFirestoreValue(fields.isPinned) || false,
      isLocked: parseFirestoreValue(fields.isLocked) || false,
      category: parseFirestoreValue(fields.category) || 'general',
      viewCount: parseFirestoreValue(fields.viewCount) || 0,
    };
  } catch (err) {
    console.error("Failed to fetch post by slug via REST", err);
    return null;
  }
}

export async function fetchUserRest(userId: string): Promise<{ displayName: string | null; photoURL: string | null; role: string; badges: string[] } | null> {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}?key=${API_KEY}`, {
      method: 'GET',
      headers: {
        'Origin': 'https://nexuscalculator.net',
        'Referer': 'https://nexuscalculator.net/'
      },
      next: { revalidate: 3600 } // cache users for an hour
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const fields = data.fields || {};
    
    return {
      displayName: parseFirestoreValue(fields.displayName) || null,
      photoURL: parseFirestoreValue(fields.photoURL) || null,
      role: parseFirestoreValue(fields.role) || 'user',
      badges: parseFirestoreValue(fields.badges) || []
    };
  } catch (err) {
    return null;
  }
}
