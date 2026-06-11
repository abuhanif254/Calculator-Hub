import React from "react";
import { fetchPostBySlugRest, fetchUserRest, RestPost } from "../../../../lib/firebase-rest";
import { Link } from "../../../../i18n/routing";
import { ArrowLeft, User as UserIcon, Home, ChevronRight, Clock, Share2, MoreHorizontal } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Interactive client components
import { LikeButton } from "./LikeButton";
import { CommentsSection } from "./CommentsSection";
import { EditButton } from "./EditButton";

interface UserProfile {
  displayName: string | null;
  photoURL: string | null;
}

async function getPost(slug: string): Promise<{ post: RestPost; author: UserProfile | null } | null> {
  const post = await fetchPostBySlugRest(slug);
  if (!post) return null;
  
  let author: UserProfile | null = null;
  if (post.authorId) {
    author = await fetchUserRest(post.authorId);
  }
  
  return { post, author };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPost(slug);
  
  if (!data) return { title: "Post Not Found | Nexus Community" };
  
  const plainTextDescription = data.post.content.replace(/<[^>]+>/g, '').substring(0, 160) + '...';

  return {
    title: `${data.post.title} | Nexus Community`,
    description: plainTextDescription,
    openGraph: {
      title: data.post.title,
      description: plainTextDescription,
      type: "article",
      authors: [data.author?.displayName || data.post.authorName || "Nexus Community Member"]
    }
  };
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

export default async function PostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const data = await getPost(slug);

  if (!data) {
    notFound();
  }

  const { post, author } = data;
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';
  const authorName = author?.displayName || post.authorName || "Community Member";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": post.title,
    "datePublished": new Date(post.createdAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "text": post.content.replace(/<[^>]+>/g, ''),
    "url": `${baseUrl}/${locale}/community/${post.slug}`
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#518231] transition-colors flex items-center gap-1.5">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <Link href="/community" className="hover:text-[#518231] transition-colors">
            Community
          </Link>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <span className="text-slate-900 dark:text-slate-200 truncate max-w-xs">{post.title}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              
              <header className="px-6 py-8 md:px-10 border-b border-slate-100 dark:border-slate-800 relative">
                <div className="absolute top-6 right-6">
                  <EditButton postAuthorId={post.authorId} slug={post.slug} />
                </div>

                <div className="flex items-center gap-2 text-sm text-[#518231] font-semibold mb-3">
                  Discussion
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight pr-8">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    {author?.photoURL ? (
                      <img src={author.photoURL} alt={authorName} className="w-11 h-11 rounded-full object-cover shadow-sm" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-sm">
                        <UserIcon size={20} className="text-slate-500 dark:text-slate-300" />
                      </div>
                    )}
                    <div>
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        {authorName}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={12} />
                        {timeAgo(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </header>
              
              <div 
                className="px-6 py-8 md:px-10 prose prose-slate dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-a:text-[#518231] hover:prose-a:text-[#436a28] 
                  prose-p:leading-relaxed prose-pre:bg-slate-50 dark:prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 prose-pre:text-slate-800 dark:prose-pre:text-slate-200
                  prose-blockquote:border-l-[#518231] prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="px-6 py-4 md:px-10 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                <LikeButton postId={post.id} initialCount={0} />
                
                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg shadow-sm hover:shadow">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </article>

            {/* Threaded Comments Section */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Discussion Thread</h3>
              <CommentsSection postId={post.id} />
            </div>
          </div>

          {/* Right Sidebar (Author Info & Stats) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">About the Author</h3>
              <div className="flex flex-col items-center text-center">
                {author?.photoURL ? (
                  <img src={author.photoURL} alt={authorName} className="w-20 h-20 rounded-full object-cover mb-3 shadow-md" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 shadow-md">
                    <UserIcon size={32} className="text-slate-400" />
                  </div>
                )}
                <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">{authorName}</p>
                <p className="text-sm text-slate-500 mb-4">Community Member</p>
                <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium py-2 rounded-xl transition-colors">
                  View Profile
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Want to contribute?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Have a similar issue or a great tip to share? Start your own discussion.
              </p>
              <Link
                href="/community/new"
                className="block w-full text-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-[#518231] dark:hover:border-[#518231] text-slate-900 dark:text-white hover:text-[#518231] font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Create Post
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
