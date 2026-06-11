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
  createdAt: number;
}

// Helper to parse Firestore REST response values
function parseFirestoreValue(value: any): any {
  if (!value) return null;
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue, 10);
  if (value.doubleValue !== undefined) return parseFloat(value.doubleValue);
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return new Date(value.timestampValue).getTime();
  if (value.mapValue !== undefined) {
    const res: any = {};
    for (const [k, v] of Object.entries(value.mapValue.fields || {})) {
      res[k] = parseFirestoreValue(v);
    }
    return res;
  }
  return null;
}

export async function fetchPostsRest(): Promise<RestPost[]> {
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
          orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
          limit: 20
        }
      }),
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
        createdAt: parseFirestoreValue(fields.createdAt) || Date.now(),
      });
    }
    
    return posts;
  } catch (err) {
    console.error("Failed to fetch posts via REST", err);
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

    return {
      id,
      title: parseFirestoreValue(fields.title) || '',
      slug: parseFirestoreValue(fields.slug) || '',
      content: parseFirestoreValue(fields.content) || '',
      authorId: parseFirestoreValue(fields.authorId) || '',
      authorName: parseFirestoreValue(fields.authorName) || 'Unknown',
      createdAt: parseFirestoreValue(fields.createdAt) || Date.now(),
    };
  } catch (err) {
    console.error("Failed to fetch post by slug via REST", err);
    return null;
  }
}

export async function fetchUserRest(userId: string): Promise<{ displayName: string | null; photoURL: string | null } | null> {
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
      photoURL: parseFirestoreValue(fields.photoURL) || null
    };
  } catch (err) {
    return null;
  }
}
