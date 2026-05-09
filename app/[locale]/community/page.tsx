"use client";

import React, { useEffect, useState } from "react";
import { Link } from "../../../i18n/routing";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { handleFirestoreError, OperationType } from "../../../lib/firestoreUtils";
import { useAuth } from "../../components/AuthProvider";
import { MessageSquarePlus } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  createdAt: number;
}

export default function CommunityIndex() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        const fetchedPosts: Post[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedPosts.push({
            id: doc.id,
            title: data.title,
            slug: data.slug,
            content: data.content,
            authorId: data.authorId,
            createdAt: data.createdAt?.toMillis() || Date.now(),
          });
        });
        setPosts(fetchedPosts);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, "posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">Community Discussions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Ask questions, share tips, and discuss calculators.</p>
        </div>
        {user ? (
          <Link href="/community/new" className="inline-flex items-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <MessageSquarePlus size={18} />
            New Post
          </Link>
        ) : (
          <p className="text-sm text-slate-500">Sign in to post</p>
        )}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
               <div key={i} className="h-24 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400">No posts yet. Be the first to start a discussion!</p>
          </div>
        ) : (
          posts.map(post => (
            <Link key={post.id} href={`/community/${post.slug} ` as any} className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-shadow group">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {post.content}
              </p>
              <div className="flex items-center text-xs text-slate-500 space-x-4">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
