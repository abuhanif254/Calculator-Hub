'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc, writeBatch, increment, serverTimestamp } from 'firebase/firestore';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FollowButtonProps {
  targetUserId: string;
}

export function FollowButton({ targetUserId }: FollowButtonProps) {
  const { appUser } = useAuth();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!appUser || appUser.uid === targetUserId) {
      setLoading(false);
      return;
    }

    const checkFollowing = async () => {
      try {
        const docRef = doc(db, `users/${appUser.uid}/following`, targetUserId);
        const snap = await getDoc(docRef);
        setIsFollowing(snap.exists());
      } catch (err) {
        console.error('Error checking follow status', err);
      } finally {
        setLoading(false);
      }
    };

    checkFollowing();
  }, [appUser, targetUserId]);

  const toggleFollow = async () => {
    if (!appUser) {
      router.push('/login');
      return;
    }
    if (appUser.uid === targetUserId) return;

    setProcessing(true);
    try {
      const batch = writeBatch(db);
      
      const myFollowingRef = doc(db, `users/${appUser.uid}/following`, targetUserId);
      const theirFollowerRef = doc(db, `users/${targetUserId}/followers`, appUser.uid);
      const myUserRef = doc(db, 'users', appUser.uid);
      const theirUserRef = doc(db, 'users', targetUserId);

      if (isFollowing) {
        // Unfollow
        batch.delete(myFollowingRef);
        batch.delete(theirFollowerRef);
        batch.update(myUserRef, { followingCount: increment(-1) });
        batch.update(theirUserRef, { followersCount: increment(-1) });
        await batch.commit();
        setIsFollowing(false);
      } else {
        // Follow
        batch.set(myFollowingRef, { createdAt: serverTimestamp() });
        batch.set(theirFollowerRef, { createdAt: serverTimestamp() });
        batch.update(myUserRef, { followingCount: increment(1) });
        batch.update(theirUserRef, { followersCount: increment(1) });
        await batch.commit();
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Error toggling follow', err);
    } finally {
      setProcessing(false);
    }
  };

  if (!appUser || appUser.uid === targetUserId) return null;

  return (
    <button
      onClick={toggleFollow}
      disabled={loading || processing}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm
        ${isFollowing 
          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700' 
          : 'bg-[#518231] text-white hover:bg-[#436a28] border border-transparent'
        }
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
    >
      {processing ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isFollowing ? (
        <UserMinus size={16} />
      ) : (
        <UserPlus size={16} />
      )}
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
