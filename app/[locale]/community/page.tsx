import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { MessageSquarePlus, MessageCircle, Clock } from 'lucide-react';

// ═══════════════════════════════════════════════════════
// COMMUNITY INDEX PAGE — SERVER COMPONENT
// ═══════════════════════════════════════════════════════
// Converted from "use client" to Server Component with ISR.
// Google now sees fully-rendered HTML for community posts,
// enabling UGC content to be indexed and ranked.
//
// Revalidation: Every 5 minutes (300 seconds) so new posts
// appear in search results within a reasonable timeframe.
// ═══════════════════════════════════════════════════════

export const revalidate = 300; // ISR: revalidate every 5 minutes

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  createdAt: number;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Community Discussions | NexusCalculator',
    description: 'Join the NexusCalculator community. Ask questions, share tips, and discuss calculators with fellow users.',
    alternates: {
      canonical: `/${locale}/community`,
    },
  };
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        authorId: data.authorId,
        createdAt: data.createdAt?.toMillis() || Date.now(),
      });
    });
    return posts;
  } catch (error) {
    console.error('Failed to fetch community posts:', error);
    return [];
  }
}

export default async function CommunityIndex({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const posts = await fetchPosts();

  // JSON-LD: DiscussionForumPosting for SEO
  const forumSchema = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: 'NexusCalculator Community Discussions',
    url: `https://nexuscalculator.net/${resolvedParams.locale}/community`,
    description: 'Community forum for calculator and developer tool discussions.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(forumSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
              Community Discussions
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Ask questions, share tips, and discuss calculators.
            </p>
          </div>
          <Link
            href="/community/new"
            className="inline-flex items-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <MessageSquarePlus size={18} />
            New Post
          </Link>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <MessageCircle size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                No posts yet. Be the first to start a discussion!
              </p>
              <Link
                href="/community/new"
                className="inline-flex items-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <MessageSquarePlus size={16} />
                Create First Post
              </Link>
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/community/${post.slug}` as any}
                className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-shadow group"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center text-xs text-slate-500 space-x-4">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
