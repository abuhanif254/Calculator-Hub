"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, query, where, doc, getDoc, setDoc, deleteDoc, updateDoc, increment, serverTimestamp, onSnapshot, getDocs, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { User as UserIcon, Trash2, CheckCircle2, Lock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkRenderer } from '@/app/components/LinkRenderer';
import { ReportButton } from './ReportButton';
import { MentionInput } from './MentionInput';
import { ReactionBar, ReactionsMap } from './ReactionBar';

interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  parentId?: string | null;
  isAccepted?: boolean;
  createdAt: number;
  reactions?: ReactionsMap;
}

export function CommentsSection({ postId, postAuthorId, slug, isLocked = false }: { postId: string, postAuthorId: string, slug: string, isLocked?: boolean }) {
  const { appUser, isAdmin } = useAuth();
  const locale = useLocale();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mentionedUsers, setMentionedUsers] = useState<Array<{id: string; displayName: string}>>([]);
  const [replyMentionedUsers, setReplyMentionedUsers] = useState<Array<{id: string; displayName: string}>>([]);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'comments'), where('postId', '==', postId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis() || Date.now(),
          reactions: data.reactions || {},
        } as Comment;
      });

      fetchedComments.sort((a, b) => {
        if (a.isAccepted) return -1;
        if (b.isAccepted) return 1;
        return b.createdAt - a.createdAt;
      });
      setComments(fetchedComments);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching comments', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  const handlePostComment = async (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault();
    const text = parentId ? replyContent : newComment;
    if (!text.trim() || !appUser) return;

    setSubmitting(true);
    try {
      const commentId = uuidv4();
      const commentRef = doc(db, 'comments', commentId);
      const postRef = doc(db, 'posts', postId);

      await setDoc(commentRef, {
        postId,
        parentId,
        authorId: appUser.uid,
        authorName: appUser.displayName || 'Anonymous',
        authorPhoto: appUser.photoURL || null,
        content: text.trim(),
        createdAt: serverTimestamp()
      });

      const postSnap = await getDoc(postRef);
      const subscribers: string[] = postSnap.exists() ? (postSnap.data().subscribers || []) : [];

      await updateDoc(postRef, { commentsCount: increment(1), replyCount: increment(1) });
      
      // Notify post author if someone else replies
      if (postAuthorId && postAuthorId !== appUser.uid) {
         await addDoc(collection(db, `users/${postAuthorId}/notifications`), {
             type: 'reply',
             title: 'New Reply',
             body: `${appUser.displayName || 'Someone'} replied to your discussion.`,
             timestamp: new Date().toISOString(),
             href: `/community/${slug}`,
             read: false
         }).catch(()=>null);
      }

      // Notify subscribers
      for (const subId of subscribers) {
         if (subId !== appUser.uid && subId !== postAuthorId) {
            await addDoc(collection(db, `users/${subId}/notifications`), {
               type: 'reply',
               title: 'New Reply in Subscribed Thread',
               body: `${appUser.displayName || 'Someone'} replied to a discussion you follow.`,
               timestamp: new Date().toISOString(),
               href: `/community/${slug}`,
               read: false
            }).catch(()=>null);
         }
      }

      // Notify @mentioned users
      const mentioned = parentId ? replyMentionedUsers : mentionedUsers;
      const notifiedIds = new Set([appUser.uid, postAuthorId, ...subscribers]);
      for (const mentionedUser of mentioned) {
         if (!notifiedIds.has(mentionedUser.id)) {
            await addDoc(collection(db, `users/${mentionedUser.id}/notifications`), {
               type: 'mention',
               title: 'You were mentioned!',
               body: `${appUser.displayName || 'Someone'} mentioned you in a discussion.`,
               timestamp: new Date().toISOString(),
               href: `/community/${slug}`,
               read: false
            }).catch(()=>null);
         }
      }

      if (parentId) {
        setReplyContent('');
        setReplyingTo(null);
        setReplyMentionedUsers([]);
      } else {
        setNewComment('');
        setMentionedUsers([]);
      }
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

  const handleAcceptComment = async (commentId: string, currentStatus: boolean, commentAuthorId: string) => {
    try {
      // First, remove isAccepted from any other comment for this post
      const q = query(collection(db, 'comments'), where('postId', '==', postId), where('isAccepted', '==', true));
      const snap = await getDocs(q);
      snap.forEach(async (d) => {
         if (d.id !== commentId) {
            await updateDoc(doc(db, 'comments', d.id), { isAccepted: false });
            // Decrement reputation for the previous accepted answer author
            if (d.data().authorId) {
               await updateDoc(doc(db, 'users', d.data().authorId), { reputation: increment(-15) }).catch(()=>null);
            }
         }
      });
      
      // Toggle the selected comment
      await updateDoc(doc(db, 'comments', commentId), { isAccepted: !currentStatus });
      // Update reputation
      if (commentAuthorId) {
         const repChange = currentStatus ? -15 : 15; // if it was already true, we are un-accepting it
         await updateDoc(doc(db, 'users', commentAuthorId), { reputation: increment(repChange) }).catch(()=>null);
         
         // Notify the comment author if their comment is being accepted (and they are not the one accepting it)
         if (!currentStatus && commentAuthorId !== appUser?.uid) {
             await addDoc(collection(db, `users/${commentAuthorId}/notifications`), {
                 type: 'accepted',
                 title: 'Answer Accepted!',
                 body: `Your reply was marked as the accepted answer. You earned +15 reputation!`,
                 timestamp: new Date().toISOString(),
                 href: `/community/${slug}`,
                 read: false
             }).catch(()=>null);
         }
      }
    } catch (err) {
      console.error("Error accepting comment", err);
    }
  };

  // Render @mention text nodes as clickable profile links
  const MentionText = ({ children }: { children?: React.ReactNode }) => {
    if (typeof children !== 'string') return <>{children}</>;
    const parts = children.split(/(@\w+)/g);
    return (
      <>
        {parts.map((part, i) =>
          part.startsWith('@') ? (
            <a
              key={i}
              href={`/community/user/search?name=${encodeURIComponent(part.slice(1))}`}
              className="text-[#518231] font-semibold hover:underline"
            >
              {part}
            </a>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
      </>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Comments ({comments.length})
      </h3>

      {isLocked ? (
        <div className="mb-10 bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3">
            <Lock size={24} className="text-slate-500 dark:text-slate-400" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Thread Locked</h4>
          <p className="text-slate-500 dark:text-slate-400">This discussion has been locked by moderators. New replies cannot be posted.</p>
        </div>
      ) : appUser ? (
        <form onSubmit={handlePostComment} className="mb-10 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <label htmlFor="comment" className="sr-only">Add a comment</label>
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
            <span className="text-[#518231] font-bold">@mention</span> a user to notify them directly
          </div>
          <MentionInput
            id="comment"
            rows={3}
            value={newComment}
            onChange={setNewComment}
            onMentionedUsers={setMentionedUsers}
            placeholder="Share your thoughts... (use @ to mention someone)"
            className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-[#518231] focus:ring-[#518231] p-4 resize-none outline-none focus:ring-1"
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
        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-9 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
          {comments.filter(c => !c.parentId).map(comment => (
            <div key={comment.id}>
              <div className={`relative flex items-start gap-4 group py-6 ${comment.isAccepted ? 'bg-green-50/50 dark:bg-green-900/10 rounded-2xl px-2 md:px-4 -mx-2 md:-mx-4' : ''}`}>
                
                {(appUser?.uid === postAuthorId || isAdmin) && (
                  <button 
                    onClick={() => handleAcceptComment(comment.id, !!comment.isAccepted, comment.authorId)}
                    className={`absolute top-6 right-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm border ${comment.isAccepted ? 'text-[#518231] border-[#518231] opacity-100' : 'text-slate-400 border-slate-200 dark:border-slate-800 hover:text-[#518231]'} z-10`}
                    title={comment.isAccepted ? "Unmark as Accepted" : "Mark as Accepted Solution"}
                  >
                    <CheckCircle2 size={16} />
                  </button>
                )}

                {(appUser?.uid === comment.authorId || isAdmin) && (
                  <button 
                    onClick={() => handleDeleteComment(comment.id)}
                    className="absolute top-6 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm border border-slate-200 dark:border-slate-800 z-10"
                    title="Delete Comment"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                
                <div className="flex-shrink-0 relative z-10">
                  {comment.authorPhoto ? (
                    <img src={comment.authorPhoto} alt={comment.authorName} className="w-10 h-10 rounded-full object-cover border-4 border-white dark:border-[#0B1120] shadow-sm" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0B1120] border-4 border-white dark:border-[#0B1120] shadow-sm flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <UserIcon size={16} className="text-slate-400" />
                      </div>
                    </div>
                  )}
                </div>
                <div className={`flex-1 min-w-0 bg-white dark:bg-slate-900 p-5 rounded-2xl border ${comment.isAccepted ? 'border-[#518231]/50 shadow-md shadow-[#518231]/10' : 'border-slate-200 dark:border-slate-800 shadow-sm'} relative z-10 hover:shadow-md transition-shadow`}>
                  <div className="mb-2 flex items-center flex-wrap gap-2">
                    <Link href={`/community/user/${comment.authorId}` as any} className="font-bold text-slate-900 dark:text-white mr-2 hover:text-[#518231] transition-colors">
                      {comment.authorName}
                    </Link>
                    {comment.isAccepted && (
                      <span className="flex items-center gap-1 bg-[#518231]/10 text-[#518231] px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 size={12} /> Accepted Solution
                      </span>
                    )}
                    <span className="text-xs text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString(locale, { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                      })}
                    </span>
                  </div>
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base prose prose-slate dark:prose-invert max-w-none prose-p:my-1 prose-a:text-[#518231] hover:prose-a:text-[#436a28]">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => <LinkRenderer {...props} />,
                          // @ts-ignore
                          text: MentionText
                        }}
                      >
                        {comment.content}
                      </ReactMarkdown>
                    </div>

                  <ReactionBar commentId={comment.id} initialReactions={comment.reactions} />
                  
                  {appUser && !isLocked && (
                    <div className="mt-2 flex items-center justify-end gap-3">
                      <ReportButton targetType="comment" targetId={comment.id} iconSize={14} className="text-xs" />
                      <button 
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-xs font-medium text-slate-500 hover:text-[#518231] transition-colors"
                      >
                        {replyingTo === comment.id ? 'Cancel Reply' : 'Reply'}
                      </button>
                    </div>
                  )}

                  {replyingTo === comment.id && (
                    <form onSubmit={(e) => handlePostComment(e, comment.id)} className="mt-4">
                      <MentionInput
                        rows={2}
                        value={replyContent}
                        onChange={setReplyContent}
                        onMentionedUsers={setReplyMentionedUsers}
                        placeholder={`Reply to ${comment.authorName}... (@ to mention)`}
                        className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-[#518231] focus:ring-[#518231] p-3 text-sm resize-none outline-none focus:ring-1"
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          type="submit"
                          disabled={submitting || !replyContent.trim()}
                          className="px-4 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          {submitting ? 'Posting...' : 'Post Reply'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Render Nested Replies */}
              {comments.filter(c => c.parentId === comment.id).sort((a, b) => a.createdAt - b.createdAt).map(reply => (
                <div key={reply.id} className="relative flex items-start gap-3 group py-3 ml-12 md:ml-16 mt-1 before:absolute before:left-[-1.5rem] md:before:left-[-2rem] before:top-8 before:w-6 md:before:w-8 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                  {(appUser?.uid === reply.authorId || isAdmin) && (
                    <button 
                      onClick={() => handleDeleteComment(reply.id)}
                      className="absolute top-4 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm border border-slate-200 dark:border-slate-800 z-10"
                      title="Delete Reply"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  <div className="flex-shrink-0 relative z-10">
                    {reply.authorPhoto ? (
                      <img src={reply.authorPhoto} alt={reply.authorName} className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-[#0B1120] shadow-sm" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-[#0B1120] shadow-sm">
                        <UserIcon size={14} className="text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm relative z-10">
                    <div className="mb-1">
                      <Link href={`/community/user/${reply.authorId}` as any} className="font-bold text-slate-900 dark:text-white mr-2 text-sm hover:text-[#518231] transition-colors">
                        {reply.authorName}
                      </Link>
                      <span className="text-[10px] text-slate-500">
                        {new Date(reply.createdAt).toLocaleDateString(locale, { 
                          month: 'short', day: 'numeric', year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-sm prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:my-1 prose-a:text-[#518231] hover:prose-a:text-[#436a28]">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => <LinkRenderer {...props} />
                        }}
                      >
                        {reply.content}
                      </ReactMarkdown>
                    </div>
                    <ReactionBar commentId={reply.id} initialReactions={reply.reactions} />
                    {appUser && (
                      <div className="mt-2 flex items-center justify-end">
                        <ReportButton targetType="comment" targetId={reply.id} iconSize={12} className="text-[10px]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
