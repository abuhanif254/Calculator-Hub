import React from "react";
import { fetchPostBySlugRest, fetchUserRest, RestPost } from "../../../../lib/firebase-rest";
import { Link } from "../../../../i18n/routing";
import { ArrowLeft, User as UserIcon } from "lucide-react";
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
  
  // Create a plain text snippet for description from HTML
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

export default async function PostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const data = await getPost(slug);

  if (!data) {
    notFound();
  }

  const { post, author } = data;
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  // Article JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "headline": post.title,
    "datePublished": new Date(post.createdAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": author?.displayName || post.authorName || "Community Member"
    },
    "text": post.content.replace(/<[^>]+>/g, ''), // Strip HTML for schema
    "url": `${baseUrl}/${locale}/community/${post.slug}`
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/community" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#518231] dark:hover:text-[#65a33d] mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-1" />
        Back to Community
      </Link>
      
      <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
        <header className="px-6 py-8 md:px-10 border-b border-slate-100 dark:border-slate-800 relative">
          <div className="absolute top-8 right-8">
            <EditButton postAuthorId={post.authorId} slug={post.slug} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight pr-12">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-3">
             {author?.photoURL ? (
                <img src={author.photoURL} alt="Author" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
             ) : (
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <UserIcon size={18} className="text-slate-400" />
                </div>
             )}
             <div>
               <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                 {author?.displayName || post.authorName || "Community Member"}
               </p>
               <p className="text-xs text-slate-500">
                 {new Date(post.createdAt).toLocaleDateString(locale, { 
                   year: 'numeric', month: 'long', day: 'numeric' 
                 })}
               </p>
             </div>
          </div>
        </header>
        
        {/* Render HTML from TipTap/Quill */}
        <div 
          className="px-6 py-8 md:px-10 prose prose-slate dark:prose-invert max-w-none prose-a:text-[#518231] hover:prose-a:text-[#436a28]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="px-6 py-4 md:px-10 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <LikeButton postId={post.id} initialCount={0} />
          <div className="text-sm text-slate-500">
            Share this discussion
          </div>
        </div>
      </article>

      <CommentsSection postId={post.id} />
    </div>
  );
}
