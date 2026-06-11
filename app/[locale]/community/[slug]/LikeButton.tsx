"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc, increment, updateDoc } from 'firebase/firestore';

export function LikeButton({ postId, initialCount }: { postId: string, initialCount: number }) {
  const { appUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialCount);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) {
      setLoading(false);
      return;
    }

    const checkLike = async () => {
      try {
        const likeRef = doc(db, 'likes', `${postId}_${appUser.uid}`);
        const snap = await getDoc(likeRef);
        if (snap.exists()) {
          setLiked(true);
        }
      } catch (err) {
        console.error("Error checking like status", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Also fetch current count from post doc to be accurate
    const fetchCount = async () => {
      const postRef = doc(db, 'posts', postId);
      const snap = await getDoc(postRef);
      if (snap.exists() && typeof snap.data().likesCount === 'number') {
        setLikesCount(snap.data().likesCount);
      }
    };

    checkLike();
    fetchCount();
  }, [postId, appUser]);

  const toggleLike = async () => {
    if (!appUser || loading) return;

    const likeRef = doc(db, 'likes', `${postId}_${appUser.uid}`);
    const postRef = doc(db, 'posts', postId);

    setLoading(true);

    try {
      if (liked) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likesCount: increment(-1) });
        setLiked(false);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        await setDoc(likeRef, {
          userId: appUser.uid,
          postId: postId,
          createdAt: new Date()
        });
        await updateDoc(postRef, { likesCount: increment(1) });
        setLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (err) {
      console.error("Error toggling like", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleLike}
      disabled={!appUser || loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
        liked 
          ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
      } disabled:opacity-60`}
      title={!appUser ? "Sign in to like" : "Like this discussion"}
    >
      <Heart size={18} className={liked ? 'fill-current' : ''} />
      <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
    </button>
  );
}
