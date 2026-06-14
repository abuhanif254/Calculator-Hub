"use client";

import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

interface BookmarkButtonProps {
  postId: string;
  className?: string;
  iconSize?: number;
}

export function BookmarkButton({ postId, className = "", iconSize = 20 }: BookmarkButtonProps) {
  const { appUser } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const bookmarkRef = doc(db, `users/${appUser.uid}/bookmarks`, postId);
        const docSnap = await getDoc(bookmarkRef);
        setIsBookmarked(docSnap.exists());
      } catch (err) {
        console.error("Failed to check bookmark status", err);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [appUser, postId]);

  const toggleBookmark = async () => {
    if (!appUser || loading) return;
    setLoading(true);
    
    try {
      const bookmarkRef = doc(db, `users/${appUser.uid}/bookmarks`, postId);
      if (isBookmarked) {
        await deleteDoc(bookmarkRef);
        setIsBookmarked(false);
      } else {
        await setDoc(bookmarkRef, {
          postId,
          savedAt: serverTimestamp()
        });
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
    } finally {
      setLoading(false);
    }
  };

  if (!appUser) return null;

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`flex items-center gap-1.5 transition-colors disabled:opacity-50 ${
        isBookmarked 
          ? 'text-[#518231]' 
          : 'text-slate-400 hover:text-[#518231]'
      } ${className}`}
      title={isBookmarked ? "Remove Bookmark" : "Save for Later"}
    >
      {isBookmarked ? <BookmarkCheck size={iconSize} className="fill-[#518231]/20" /> : <Bookmark size={iconSize} />}
      <span className="sr-only sm:not-sr-only sm:text-sm font-medium">
        {isBookmarked ? 'Saved' : 'Save'}
      </span>
    </button>
  );
}
