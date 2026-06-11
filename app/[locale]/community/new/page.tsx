"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/components/AuthProvider';
import { RichTextEditor } from '@/app/components/RichTextEditor';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export default function NewPostPage() {
  const { appUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || content === '<p></p>') {
      setError('Title and content are required.');
      return;
    }

    if (!appUser) return;

    setLoading(true);
    setError('');

    try {
      const baseSlug = slugify(title, { lower: true, strict: true });
      const uniqueSlug = `${baseSlug}-${uuidv4().split('-')[0]}`; // append short unique ID to avoid collisions

      const docRef = await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        slug: uniqueSlug,
        content: content,
        authorId: appUser.uid,
        authorName: appUser.displayName || 'Anonymous',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likesCount: 0,
        commentsCount: 0,
      });

      router.push(`/${locale}/community/${uniqueSlug}`);
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Create a New Discussion
          </h1>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Discussion Title
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="What's on your mind?"
                className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-[#518231] focus:ring-[#518231] text-lg px-4 py-3 border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Body Content
              </label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>

            <div className="flex justify-end gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Discussion'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
