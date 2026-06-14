"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import { useAuth } from '@/app/components/AuthProvider';
import { MarkdownEditor } from '@/app/components/MarkdownEditor';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc, setDoc, deleteDoc, serverTimestamp, writeBatch, getDocs } from 'firebase/firestore';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { COMMUNITY_CATEGORIES } from '@/lib/categories';

export default function NewPostPage() {
  const { appUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

  // Drafts State
  const [hasDraft, setHasDraft] = useState(false);
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);
  const isFirstRender = React.useRef(true);

  // Initial Load - Check for Draft
  React.useEffect(() => {
    if (!appUser) return;
    const fetchDraft = async () => {
      try {
        const draftRef = doc(db, `users/${appUser.uid}/drafts`, 'new_post');
        const snap = await getDoc(draftRef);
        if (snap.exists() && (snap.data().title || snap.data().content)) {
          setHasDraft(true);
          setShowDraftPrompt(true);
        }
      } catch (err) {
        console.error("Failed to check for draft", err);
      }
    };
    fetchDraft();
  }, [appUser]);

  // Auto-save Effect
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!appUser || showDraftPrompt) return; // don't auto-save while prompt is showing

    const saveDraft = async () => {
      try {
        const draftRef = doc(db, `users/${appUser.uid}/drafts`, 'new_post');
        await setDoc(draftRef, {
          title, content, category, tags, showPoll, pollQuestion, pollOptions, updatedAt: serverTimestamp()
        });
      } catch (err) {
        console.error("Failed to save draft", err);
      }
    };

    const timeoutId = setTimeout(saveDraft, 2000); // 2 second debounce
    return () => clearTimeout(timeoutId);
  }, [title, content, tags, showPoll, pollQuestion, pollOptions, appUser, showDraftPrompt]);

  const restoreDraft = async () => {
    if (!appUser) return;
    try {
      const draftRef = doc(db, `users/${appUser.uid}/drafts`, 'new_post');
      const snap = await getDoc(draftRef);
      if (snap.exists()) {
        const d = snap.data();
        setTitle(d.title || '');
        setContent(d.content || '');
        setCategory(d.category || 'general');
        setTags(d.tags || []);
        setShowPoll(d.showPoll || false);
        setPollQuestion(d.pollQuestion || '');
        setPollOptions(d.pollOptions || ['', '']);
      }
    } catch(err) {
      console.error(err);
    }
    setShowDraftPrompt(false);
  };

  const discardDraft = async () => {
    if (!appUser) return;
    try {
      const draftRef = doc(db, `users/${appUser.uid}/drafts`, 'new_post');
      await deleteDoc(draftRef);
    } catch(err) {
      console.error(err);
    }
    setShowDraftPrompt(false);
    setHasDraft(false);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (newTag && !tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const addPollOption = () => {
    if (pollOptions.length < 5) setPollOptions([...pollOptions, '']);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appUser) return;
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    if (!category) {
      setError('Please select a category.');
      return;
    }

    if (showPoll) {
      if (!pollQuestion.trim()) {
        setError('Poll question is required if poll is enabled.');
        return;
      }
      const validOptions = pollOptions.filter(o => o.trim() !== '');
      if (validOptions.length < 2) {
        setError('Poll must have at least 2 valid options.');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const baseSlug = slugify(title, { lower: true, strict: true });
      const uniqueSlug = `${baseSlug}-${uuidv4().split('-')[0]}`; // append short unique ID to avoid collisions

      const postData: any = {
        title: title.trim(),
        slug: uniqueSlug,
        content: content,
        category: category,
        authorId: appUser.uid,
        authorName: appUser.displayName || 'Anonymous',
        authorRole: appUser.role || 'user',
        authorBadges: appUser.badges || [],
        tags: tags,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likesCount: 0,
        commentsCount: 0,
      };

      if (showPoll) {
        postData.poll = {
          question: pollQuestion.trim(),
          options: pollOptions.filter(o => o.trim() !== '').map(text => ({
            id: uuidv4(),
            text: text.trim(),
            votes: 0,
            voterIds: []
          })),
          totalVotes: 0
        };
      }

      const docRef = await addDoc(collection(db, 'posts'), postData);

      // Clear the draft on success
      const draftRef = doc(db, `users/${appUser.uid}/drafts`, 'new_post');
      await deleteDoc(draftRef);

      // Notify Followers
      try {
        const followersSnap = await getDocs(collection(db, `users/${appUser.uid}/followers`));
        if (!followersSnap.empty) {
          const batch = writeBatch(db);
          let opCount = 0;
          
          followersSnap.docs.forEach((followerDoc) => {
            const notifRef = doc(collection(db, `users/${followerDoc.id}/notifications`));
            batch.set(notifRef, {
              type: 'new_post',
              title: 'New Post from ' + appUser.displayName,
              message: `${appUser.displayName} published a new discussion: ${title.trim()}`,
              link: `/${locale}/community/${uniqueSlug}`,
              createdAt: serverTimestamp(),
              read: false,
              senderId: appUser.uid,
              senderName: appUser.displayName || 'Anonymous',
              senderPhoto: appUser.photoURL || null,
            });
            opCount++;
          });
          
          if (opCount > 0) {
            await batch.commit();
          }
        }
      } catch (notifErr) {
        console.error('Failed to notify followers', notifErr);
      }

      router.push(`/${locale}/community/${uniqueSlug}`);
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Create a New Discussion
          </h1>

          {showDraftPrompt && (
            <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-amber-800 dark:text-amber-400 font-bold mb-1">Unsaved Draft Found</h3>
                <p className="text-sm text-amber-700 dark:text-amber-500">You have an unpublished discussion draft. Would you like to restore it?</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={discardDraft} className="text-sm font-medium text-amber-700 dark:text-amber-500 hover:text-amber-900 dark:hover:text-amber-300">
                  Discard
                </button>
                <button onClick={restoreDraft} className="text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm">
                  Restore Draft
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COMMUNITY_CATEGORIES.map(cat => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setCategory(cat.slug)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      category === cat.slug
                        ? `${cat.color} ring-2 ring-offset-1 ring-[#518231] dark:ring-offset-slate-900`
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.emoji}</span> {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Discussion Title
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="What's on your mind?"
                className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-[#518231] focus:ring-[#518231] text-lg px-4 py-3 border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tags (Up to 5)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500 font-bold ml-1 focus:outline-none">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                id="tags"
                type="text"
                placeholder="Press Enter or comma to add a tag (e.g. react, bug)"
                className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-[#518231] focus:ring-[#518231] px-4 py-3 border text-sm"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={tags.length >= 5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Body Content
              </label>
              <MarkdownEditor content={content} onChange={setContent} />
            </div>

            {/* Poll Section */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/50">
              <label className="flex items-center gap-3 cursor-pointer select-none mb-4">
                <input 
                  type="checkbox" 
                  checked={showPoll} 
                  onChange={(e) => setShowPoll(e.target.checked)} 
                  className="w-5 h-5 text-[#518231] rounded focus:ring-[#518231]"
                />
                <span className="font-bold text-slate-900 dark:text-white">Attach a Poll</span>
              </label>
              
              {showPoll && (
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800" style={{ animation: "fadeIn 0.2s ease-out" }}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Poll Question</label>
                    <input
                      type="text"
                      placeholder="e.g. What is the best feature?"
                      className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm px-4 py-2 text-sm border focus:ring-[#518231] focus:border-[#518231]"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Options (Max 5)</label>
                    {pollOptions.map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Option ${i + 1}`}
                          className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm px-4 py-2 text-sm border focus:ring-[#518231] focus:border-[#518231]"
                          value={opt}
                          onChange={(e) => updatePollOption(i, e.target.value)}
                        />
                        {pollOptions.length > 2 && (
                          <button type="button" onClick={() => removePollOption(i)} className="px-3 text-slate-400 hover:text-red-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length < 5 && (
                      <button type="button" onClick={addPollOption} className="text-sm text-[#518231] font-medium hover:underline">
                        + Add another option
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Discussion'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
