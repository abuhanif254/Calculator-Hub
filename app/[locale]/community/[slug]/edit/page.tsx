"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/components/AuthProvider';
import { RichTextEditor } from '@/app/components/RichTextEditor';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function EditPostPage() {
  const { appUser, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const slug = params?.slug as string;

  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (authLoading) return;
      if (!appUser) return;

      try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Discussion not found.');
          setLoading(false);
          return;
        }

        const docSnapshot = querySnapshot.docs[0];
        const postData = docSnapshot.data();

        if (postData.authorId !== appUser.uid && !isAdmin) {
          setError('You do not have permission to edit this discussion.');
          setLoading(false);
          return;
        }

        setPostId(docSnapshot.id);
        setTitle(postData.title);
        setContent(postData.content);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load discussion.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, appUser, isAdmin, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || content === '<p></p>') {
      setError('Title and content are required.');
      return;
    }

    if (!postId) return;

    setSaving(true);
    setError('');

    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        title: title.trim(),
        content: content,
        updatedAt: serverTimestamp(),
      });

      router.push(`/${locale}/community/${slug}`);
    } catch (err: any) {
      console.error('Error updating post:', err);
      setError('Failed to update discussion. Please try again.');
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Edit Discussion
          </h1>

          {error ? (
            <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
              {error}
              <div className="mt-4">
                <button
                  onClick={() => router.push(`/${locale}/community`)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-red-200 dark:border-red-800"
                >
                  Return to Community
                </button>
              </div>
            </div>
          ) : loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#518231] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Discussion Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
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
                  disabled={saving}
                  className="px-6 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
