"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, updateDoc, increment, serverTimestamp, orderBy } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { User as UserIcon, Trash2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  createdAt: number;
}

export function CommentsSection({ postId }: { postId: string }) {
  const { appUser, isAdmin } = useAuth();
  const locale = useLocale();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const q = query(collection(db, 'comments'), where('postId', '==', postId));
      const snapshot = await getDocs(q);
      
      const fetchedComments = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis() || Date.now()
        } as Comment;
      });

      // Sort client-side since we didn't add a composite index for where(postId) + orderBy(createdAt)
      fetchedComments.sort((a, b) => b.createdAt - a.createdAt);
      
      setComments(fetchedComments);
    } catch (err) {
      console.error('Error fetching comments', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !appUser) return;

    setSubmitting(true);
    try {
      const commentId = uuidv4();
      const commentRef = doc(db, 'comments', commentId);
      const postRef = doc(db, 'posts', postId);

      await setDoc(commentRef, {
        postId,
        authorId: appUser.uid,
        authorName: appUser.displayName || 'Anonymous',
        authorPhoto: appUser.photoURL || null,
        content: newComment.trim(),
        createdAt: serverTimestamp()
      });

      await updateDoc(postRef, { commentsCount: increment(1) });
      
      setNewComment('');
      fetchComments(); // Refresh comments list
    } catch (err) {
      console.error('Error posting comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      await updateDoc(doc(db, 'posts', postId), { commentsCount: increment(-1) });
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment', err);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>

      {appUser ? (
        <form onSubmit={handlePostComment} className="mb-10 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <label htmlFor="comment" className="sr-only">Add a comment</label>
          <textarea
            id="comment"
            rows={3}
            required
            className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-[#518231] focus:ring-[#518231] p-4 resize-none"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-6 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">You must be signed in to join the discussion.</p>
          <div className="flex justify-center gap-4">
            <Link href="/login" className="px-6 py-2 bg-[#518231] text-white rounded-lg font-medium hover:bg-[#436a28]">Log In</Link>
            <Link href="/signup" className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-700">Sign Up</Link>
          </div>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative group">
              {(appUser?.uid === comment.authorId || isAdmin) && (
                <button 
                  onClick={() => handleDeleteComment(comment.id)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Comment"
                >
                  <Trash2 size={16} />
                </button>
              )}
              
              <div className="flex-shrink-0 mt-1">
                {comment.authorPhoto ? (
                  <img src={comment.authorPhoto} alt={comment.authorName} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <UserIcon size={18} className="text-slate-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <div className="mb-2">
                  <span className="font-semibold text-slate-900 dark:text-white mr-2">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(comment.createdAt).toLocaleDateString(locale, { 
                      month: 'short', day: 'numeric', year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}
