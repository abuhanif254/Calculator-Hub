"use client";

import React, { useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface SubscribeButtonProps {
  postId: string;
  initialSubscribers: string[];
}

export function SubscribeButton({ postId, initialSubscribers }: SubscribeButtonProps) {
  const { appUser } = useAuth();
  const [subscribers, setSubscribers] = useState<string[]>(initialSubscribers || []);
  const [loading, setLoading] = useState(false);

  if (!appUser) return null;

  const isSubscribed = subscribers.includes(appUser.uid);

  const toggleSubscription = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const postRef = doc(db, 'posts', postId);
      if (isSubscribed) {
        await updateDoc(postRef, { subscribers: arrayRemove(appUser.uid) });
        setSubscribers(prev => prev.filter(id => id !== appUser.uid));
      } else {
        await updateDoc(postRef, { subscribers: arrayUnion(appUser.uid) });
        setSubscribers(prev => [...prev, appUser.uid]);
      }
    } catch (err) {
      console.error("Failed to toggle subscription", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleSubscription}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
        isSubscribed 
          ? 'bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
      } disabled:opacity-50`}
      title={isSubscribed ? "Unsubscribe from notifications" : "Subscribe to notifications"}
    >
      {isSubscribed ? <BellRing size={18} className="fill-current" /> : <Bell size={18} />}
      <span className="hidden sm:inline">
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </span>
    </button>
  );
}
