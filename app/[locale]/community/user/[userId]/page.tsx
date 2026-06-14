"use client";

import React, { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { User as UserIcon, Star, Clock, MessageCircle, FileText, CalendarDays, Bookmark, Pencil, Globe, Twitter, Github } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { OnlineStatus } from "@/app/components/OnlineStatus";
import { useAuth } from '@/app/components/AuthProvider';
import { MessageUserButton } from './MessageUserButton';
import { BadgesShowcase } from './BadgesShowcase';
import { FollowButton } from './FollowButton';

interface UserProfile {
  id: string;
  displayName: string;
  photoURL?: string;
  role?: string;
  badges?: string[];
  reputation: number;
  followersCount: number;
  followingCount: number;
  createdAt: number;
  joinedAt?: number;
  bio?: string;
  website?: string;
  twitter?: string;
  github?: string;
  lastActive?: any;
}

export default function UserProfilePage({ params }: { params: Promise<{ userId: string }> }) {
  const unwrappedParams = use(params);
  const userId = unwrappedParams.userId;
  
  const { appUser } = useAuth();
  const isOwner = appUser?.uid === userId;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'discussions' | 'replies' | 'saved'>('discussions');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch User
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser({
            id: userSnap.id,
            displayName: userSnap.data().displayName,
            photoURL: userSnap.data().photoURL,
            role: userSnap.data().role,
            badges: userSnap.data().badges || [],
            reputation: userSnap.data().reputation || 0,
            followersCount: userSnap.data().followersCount || 0,
            followingCount: userSnap.data().followingCount || 0,
            createdAt: userSnap.data().createdAt?.toMillis() || Date.now(),
            joinedAt: userSnap.data().joinedAt?.toMillis() || userSnap.data().createdAt?.toMillis() || Date.now(),
            bio: userSnap.data().bio || '',
            website: userSnap.data().website || '',
            twitter: userSnap.data().twitter || '',
            github: userSnap.data().github || '',
            lastActive: userSnap.data().lastActive,
          });
        } else {
          setUser(null);
        }

        // Fetch user's posts
        const postsQ = query(
          collection(db, 'posts'), 
          where('authorId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const postsSnap = await getDocs(postsQ);
        setPosts(postsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Fetch user's comments
        const commentsQ = query(
          collection(db, 'comments'), 
          where('authorId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const commentsSnap = await getDocs(commentsQ);
        
        // Resolve post slugs for comments so we can link to them
        const commentsData = commentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const postIds = [...new Set(commentsData.map(c => (c as any).postId))];
        
        // Fetch post titles/slugs for these comments
        const postsMeta: Record<string, { slug: string, title: string }> = {};
        for (const pid of postIds) {
           const pSnap = await getDoc(doc(db, 'posts', pid as string));
           if (pSnap.exists()) {
              postsMeta[pid as string] = { slug: pSnap.data().slug, title: pSnap.data().title };
           }
        }
        
        setComments(commentsData.map(c => ({
           ...c,
           postSlug: postsMeta[(c as any).postId as string]?.slug,
           postTitle: postsMeta[(c as any).postId as string]?.title,
        })));

        // Fetch saved posts if owner
        if (isOwner) {
          const bookmarksQ = query(collection(db, `users/${userId}/bookmarks`), orderBy('savedAt', 'desc'));
          const bookmarksSnap = await getDocs(bookmarksQ);
          const bookmarkedPostIds = bookmarksSnap.docs.map(d => d.data().postId);
          
          const fetchedSavedPosts = [];
          for (const pid of bookmarkedPostIds) {
             const pSnap = await getDoc(doc(db, 'posts', pid));
             if (pSnap.exists()) {
                fetchedSavedPosts.push({ id: pSnap.id, ...pSnap.data() });
             }
          }
          setSavedPosts(fetchedSavedPosts);
        }

      } catch (err) {
        console.error("Failed to fetch user profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, isOwner]);

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#518231]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <UserIcon size={40} className="text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">User Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">The user you are looking for does not exist or has been removed.</p>
        <Link href="/community" className="mt-8 px-6 py-2.5 bg-[#518231] text-white rounded-lg font-medium hover:bg-[#436a28] transition-colors">
          Return to Community
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 mb-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-[#518231]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md" />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md">
                  <UserIcon size={48} className="text-slate-400" />
                </div>
              )}
              {user.role === 'admin' && (
                <div className="absolute -bottom-2 -right-2 bg-[#518231] text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                  ADMIN
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {user.displayName}
                </h1>
                <OnlineStatus lastActive={(user as any).lastActive} showText />
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-slate-400" />
                  Member since {new Date(user.joinedAt || user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                {user.role === 'pro' && (
                  <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2.5 py-0.5 rounded flex items-center gap-1">
                    <Star size={12} className="fill-current" /> Pro Member
                  </span>
                )}
                {user.badges?.includes('verified') && (
                  <span className="text-blue-500 flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 5.8-5.8 1.4 1.4-7.2 7.2z"/></svg>
                    Verified
                  </span>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#518231] flex items-center gap-1.5">
                    <Star size={24} className="fill-current" />
                    {user.reputation.toLocaleString()}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Reputation</span>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{posts.length}</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Discussions</span>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{comments.length}</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Replies</span>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{user.followersCount.toLocaleString()}</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Followers</span>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{user.followingCount.toLocaleString()}</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Following</span>
                </div>
              </div>

              {/* Badges Showcase */}
              <BadgesShowcase badges={user.badges || []} />

              {/* Bio */}
              {user.bio && (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">{user.bio}</p>
              )}

              {/* Social Links */}
              {(user.website || user.twitter || user.github) && (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {user.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#518231] dark:hover:text-[#6aa340] transition-colors">
                      <Globe size={14} />
                      {user.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  )}
                  {user.twitter && (
                    <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors">
                      <Twitter size={14} />
                      @{user.twitter}
                    </a>
                  )}
                  {user.github && (
                    <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <Github size={14} />
                      {user.github}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            {!isOwner && (
              <div className="absolute top-8 right-8 hidden md:flex items-center gap-3">
                <FollowButton targetUserId={user.id} />
                <MessageUserButton targetUserId={user.id} targetUserName={user.displayName} targetUserPhoto={user.photoURL || null} />
              </div>
            )}
            {isOwner && (
              <div className="absolute top-8 right-8 hidden md:block">
                <Link
                  href="/community/settings" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Pencil size={15} /> Edit Profile
                </Link>
              </div>
            )}
            
            {!isOwner && (
              <div className="mt-4 flex md:hidden items-center gap-3">
                <FollowButton targetUserId={user.id} />
                <MessageUserButton targetUserId={user.id} targetUserName={user.displayName} targetUserPhoto={user.photoURL || null} />
              </div>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold text-sm transition-colors border-b-2 ${activeTab === 'discussions' ? 'text-[#518231] border-[#518231] bg-[#518231]/5' : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <FileText size={18} />
              Discussions ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('replies')}
              className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold text-sm transition-colors border-b-2 ${activeTab === 'replies' ? 'text-[#518231] border-[#518231] bg-[#518231]/5' : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <MessageCircle size={18} />
              Replies ({comments.length})
            </button>
            {isOwner && (
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold text-sm transition-colors border-b-2 ${activeTab === 'saved' ? 'text-[#518231] border-[#518231] bg-[#518231]/5' : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <Bookmark size={18} />
                Saved ({savedPosts.length})
              </button>
            )}
          </div>

          <div className="p-0">
            {activeTab === 'discussions' && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {posts.length === 0 ? (
                  <div className="py-16 text-center text-slate-500 dark:text-slate-400">
                    This user hasn't started any discussions yet.
                  </div>
                ) : (
                  posts.map(post => (
                    <Link key={post.id} href={`/community/${post.slug}` as any} className="block p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>{post.replyCount || 0} replies</span>
                        <span>{post.likesCount || 0} upvotes</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            {activeTab === 'replies' && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {comments.length === 0 ? (
                  <div className="py-16 text-center text-slate-500 dark:text-slate-400">
                    This user hasn't posted any replies yet.
                  </div>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="text-sm text-slate-500 mb-3 flex items-center gap-2">
                        Replied to:
                        {comment.postSlug ? (
                          <Link href={`/community/${comment.postSlug}#comment-${comment.id}` as any} className="font-bold text-[#518231] hover:underline truncate">
                            {comment.postTitle || 'Discussion'}
                          </Link>
                        ) : (
                          <span className="text-slate-400">Deleted Discussion</span>
                        )}
                        {comment.isAccepted && (
                          <span className="ml-auto flex items-center gap-1 text-xs font-bold text-[#518231] bg-[#518231]/10 px-2 py-1 rounded">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            Accepted Answer
                          </span>
                        )}
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed text-sm">
                        {comment.content.replace(/<[^>]+>/g, '')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {isOwner && activeTab === 'saved' && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {savedPosts.length === 0 ? (
                  <div className="py-16 text-center text-slate-500 dark:text-slate-400">
                    You haven't saved any discussions yet.
                  </div>
                ) : (
                  savedPosts.map(post => (
                    <Link key={post.id} href={`/community/${post.slug}` as any} className="block p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>{post.replyCount || 0} replies</span>
                        <span>{post.likesCount || 0} upvotes</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
