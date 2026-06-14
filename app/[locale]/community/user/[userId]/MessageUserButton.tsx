"use client";

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '@/app/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

interface MessageUserButtonProps {
  targetUserId: string;
  targetUserName: string;
  targetUserPhoto: string | null;
}

export function MessageUserButton({ targetUserId, targetUserName, targetUserPhoto }: MessageUserButtonProps) {
  const { appUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  // If the user is viewing their own profile, or not logged in, don't show the message button
  if (!appUser || appUser.uid === targetUserId) return null;

  const handleMessageClick = async () => {
    setLoading(true);
    try {
      // Check if chat already exists
      const chatsRef = collection(db, 'chats');
      const q1 = query(chatsRef, where('participants', '==', [appUser.uid, targetUserId]));
      const q2 = query(chatsRef, where('participants', '==', [targetUserId, appUser.uid]));
      
      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      
      let chatId = null;
      if (!snap1.empty) {
        chatId = snap1.docs[0].id;
      } else if (!snap2.empty) {
        chatId = snap2.docs[0].id;
      }

      if (chatId) {
        // Chat exists, redirect
        router.push(`/${locale}/community/messages/${chatId}`);
      } else {
        // Create new chat
        const newChatData = {
          participants: [appUser.uid, targetUserId],
          participantDetails: {
            [appUser.uid]: {
              displayName: appUser.displayName || 'User',
              photoURL: appUser.photoURL || null
            },
            [targetUserId]: {
              displayName: targetUserName,
              photoURL: targetUserPhoto
            }
          },
          lastMessage: '',
          lastMessageTime: serverTimestamp(),
          lastMessageSender: '',
          unreadCount: {
            [appUser.uid]: 0,
            [targetUserId]: 0
          },
          createdAt: serverTimestamp()
        };

        const docRef = await addDoc(chatsRef, newChatData);
        router.push(`/${locale}/community/messages/${docRef.id}`);
      }
    } catch (err) {
      console.error("Failed to start chat", err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMessageClick}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white text-sm font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50"
    >
      {loading ? (
        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
      ) : (
        <MessageSquare size={18} />
      )}
      Message
    </button>
  );
}
