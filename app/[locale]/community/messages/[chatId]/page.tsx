"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Send, User as UserIcon, MessageSquare } from 'lucide-react';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';

export default function ChatViewPage({ params }: { params: Promise<{ chatId: string }> }) {
  const unwrappedParams = use(params);
  const chatId = unwrappedParams.chatId;
  const { appUser } = useAuth();
  
  const [chatData, setChatData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appUser) return;

    // Fetch Chat Meta Data
    const fetchChat = async () => {
      const chatRef = doc(db, 'chats', chatId);
      const snap = await getDoc(chatRef);
      if (snap.exists() && snap.data().participants.includes(appUser.uid)) {
        setChatData(snap.data());
        
        // Mark as read
        if (snap.data().unreadCount?.[appUser.uid] > 0) {
          await updateDoc(chatRef, {
            [`unreadCount.${appUser.uid}`]: 0
          });
        }
      }
    };
    fetchChat();

    // Listen to messages
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setLoading(false);
      // Auto-scroll
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      
      // Clear unread if we are actively viewing and get a new message
      if (msgs.length > 0) {
         updateDoc(doc(db, 'chats', chatId), { [`unreadCount.${appUser.uid}`]: 0 }).catch(e => console.error(e));
      }
    });

    return () => unsubscribe();
  }, [chatId, appUser]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !appUser || !chatData) return;

    const textToSend = inputText.trim();
    setInputText('');

    try {
      const otherUserId = chatData.participants.find((id: string) => id !== appUser.uid);
      const currentUnread = chatData.unreadCount?.[otherUserId] || 0;

      // 1. Add message
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: textToSend,
        senderId: appUser.uid,
        createdAt: serverTimestamp()
      });

      // 2. Update chat metadata
      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: textToSend,
        lastMessageTime: serverTimestamp(),
        lastMessageSender: appUser.uid,
        [`unreadCount.${otherUserId}`]: currentUnread + 1
      });
      
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#518231]"></div>
      </div>
    );
  }

  if (!chatData) {
    return (
      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12 flex justify-center text-slate-500">
        Chat not found or access denied.
      </div>
    );
  }

  const otherUserId = chatData.participants.find((id: string) => id !== appUser?.uid);
  const otherUser = chatData.participantDetails[otherUserId] || { displayName: 'Unknown User', photoURL: null };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 h-[calc(100vh-80px)] flex flex-col">
        
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl p-4 flex items-center gap-4 shrink-0 shadow-sm z-10">
          <Link href="/community/messages" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
          </Link>
          
          <Link href={`/community/user/${otherUserId}` as any} className="flex items-center gap-3 group">
            {otherUser.photoURL ? (
              <img src={otherUser.photoURL} alt={otherUser.displayName} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <UserIcon size={18} className="text-slate-400" />
              </div>
            )}
            <h2 className="font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">
              {otherUser.displayName}
            </h2>
          </Link>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0B1120]/50 border-x border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <MessageSquare size={48} className="mb-4 opacity-50" />
              <p>Say hi to {otherUser.displayName}!</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isMe = msg.senderId === appUser?.uid;
              const showAvatar = !isMe && (i === 0 || messages[i-1].senderId !== msg.senderId);
              
              return (
                <div key={msg.id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <div className="w-8 shrink-0">
                      {showAvatar && (
                         otherUser.photoURL ? 
                          <img src={otherUser.photoURL} className="w-8 h-8 rounded-full" /> :
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center"><UserIcon size={14} className="text-slate-400" /></div>
                      )}
                    </div>
                  )}
                  <div className={`max-w-[75%] sm:max-w-[60%] px-4 py-2.5 rounded-2xl ${isMe ? 'bg-[#518231] text-white rounded-tr-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm'}`}>
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-b-3xl p-4 shrink-0 shadow-sm">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-[#518231] focus:ring-[#518231] rounded-xl px-4 py-3 outline-none transition-colors"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
