"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../components/AuthProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { handleFirestoreError, OperationType } from "../../../../lib/firestoreUtils";
import { Link } from "../../../../i18n/routing";
import { ArrowLeft } from "lucide-react";

export default function NewPost() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    let slug = generateSlug(title);
    
    // Fallback if slug is empty
    if (!slug) {
      slug = `post-${Date.now()}`;
    } else {
      // make slug uniqueish quickly for simplicity
      // a better way is checking for uniqueness, but appending short id is reliable
      slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        slug,
        content,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      router.push(`/community`); // Push to community overview or direct to slug
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "posts");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to post</h1>
        <p className="text-slate-500 mb-8">You need to be signed in to create a discussion.</p>
        <Link href="/community" className="text-[#518231] hover:underline">&larr; Back to Community</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/community" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Community
      </Link>
      
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Start a Discussion</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent transition-all"
            placeholder="What's your question or topic?"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Content
          </label>
          <textarea
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent transition-all resize-y"
            placeholder="Write your post here..."
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !content.trim()}
            className="px-6 py-3 bg-[#518231] text-white font-medium rounded-lg hover:bg-[#436a28] focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Discussion"}
          </button>
        </div>
      </form>
    </div>
  );
}
