"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { MessageSquare, Clock, User as UserIcon, ChevronRight } from 'lucide-react';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';

export default function MessagesInboxPage() {
  const { appUser } = useAuth();
  const locale = useLocale();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) return;

    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', appUser.uid),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(chatsData);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch chats", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [appUser]);

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#518231]/10 flex items-center justify-center text-[#518231]">
              <MessageSquare size={24} />
            </div>
            Messages
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#518231]"></div>
            </div>
          ) : chats.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Messages Yet</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                Start a conversation by visiting someone's profile and clicking the Message button.
              </p>
              <Link href="/community" className="inline-block px-6 py-3 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-xl transition-colors">
                Browse Community
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {chats.map(chat => {
                const otherUserId = chat.participants.find((id: string) => id !== appUser?.uid);
                const otherUser = chat.participantDetails[otherUserId] || { displayName: 'Unknown User', photoURL: null };
                const unreadCount = chat.unreadCount?.[appUser!.uid] || 0;
                
                const lastTime = chat.lastMessageTime?.toMillis ? new Date(chat.lastMessageTime.toMillis()) : new Date();

                return (
                  <Link 
                    key={chat.id} 
                    href={`/community/messages/${chat.id}` as any}
                    className={`block p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group ${unreadCount > 0 ? 'bg-[#518231]/5 dark:bg-[#518231]/10' : ''}`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        {otherUser.photoURL ? (
                          <img src={otherUser.photoURL} alt={otherUser.displayName} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm" />
                        ) : (
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm">
                            <UserIcon size={24} className="text-slate-400" />
                          </div>
                        )}
                        {unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                            {unreadCount}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className={`text-base sm:text-lg font-bold truncate ${unreadCount > 0 ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                            {otherUser.displayName}
                          </h3>
                          <span className="text-xs font-medium text-slate-400 shrink-0 ml-2 flex items-center gap-1">
                            {chat.lastMessage && <Clock size={12} />}
                            {chat.lastMessage ? lastTime.toLocaleDateString() : 'New'}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${unreadCount > 0 ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                          {chat.lastMessageSender === appUser?.uid ? 'You: ' : ''}{chat.lastMessage || 'Start the conversation'}
                        </p>
                      </div>

                      <div className="shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-[#518231] transition-colors hidden sm:block">
                        <ChevronRight size={24} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
