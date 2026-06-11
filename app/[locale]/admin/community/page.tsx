"use client";

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { AdminRoute } from '@/app/components/AdminRoute';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import { Trash2, UserX, Shield, ShieldAlert } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  slug: string;
  createdAt: number;
}

interface UserProfile {
  id: string;
  email: string | null;
  displayName: string | null;
  role: string;
  banned?: boolean;
}

export default function AdminCommunityDashboard() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts');
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsSnap, usersSnap] = await Promise.all([
        getDocs(collection(db, 'posts')), // In a real app with large data, we'd paginate this
        getDocs(collection(db, 'users'))
      ]);

      setPosts(postsSnap.docs.map(d => ({
        id: d.id,
        title: d.data().title,
        authorName: d.data().authorName || 'Unknown',
        authorId: d.data().authorId,
        slug: d.data().slug,
        createdAt: d.data().createdAt?.toMillis() || Date.now()
      })).sort((a, b) => b.createdAt - a.createdAt));

      setUsers(usersSnap.docs.map(d => ({
        id: d.id,
        email: d.data().email,
        displayName: d.data().displayName,
        role: d.data().role,
        banned: d.data().banned || false
      })));
    } catch (err) {
      console.error("Error fetching admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error("Error deleting post", err);
      alert("Failed to delete post.");
    }
  };

  const handleToggleBan = async (userId: string, currentlyBanned: boolean) => {
    try {
      await updateDoc(doc(db, 'users', userId), { banned: !currentlyBanned });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, banned: !currentlyBanned } : u));
    } catch (err) {
      console.error("Error updating user ban status", err);
      alert("Failed to update user status.");
    }
  };

  const handleToggleAdmin = async (userId: string, currentRole: string) => {
    if (!confirm('Are you sure you want to change this user\'s role?')) return;
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error("Error updating user role", err);
      alert("Failed to update user role.");
    }
  };

  return (
    <AdminRoute>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Community Moderation Dashboard
        </h1>

        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8">
          <button
            className={`pb-4 px-2 font-medium text-sm transition-colors ${activeTab === 'posts' ? 'border-b-2 border-[#518231] text-[#518231]' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            onClick={() => setActiveTab('posts')}
          >
            Manage Discussions
          </button>
          <button
            className={`pb-4 px-2 font-medium text-sm transition-colors ${activeTab === 'users' ? 'border-b-2 border-[#518231] text-[#518231]' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#518231] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : activeTab === 'posts' ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Author</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/community/${post.slug}` as any} className="font-medium text-[#518231] hover:underline" target="_blank">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{post.authorName}</td>
                    <td className="px-6 py-4">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No discussions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{user.displayName || 'Unknown'}</td>
                    <td className="px-6 py-4">{user.email || 'No email'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${user.banned ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                        {user.banned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => handleToggleAdmin(user.id, user.role)}
                        className={`${user.role === 'admin' ? 'text-purple-500' : 'text-slate-400 hover:text-purple-500'} transition-colors`}
                        title={user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                      >
                        <Shield size={18} />
                      </button>
                      <button 
                        onClick={() => handleToggleBan(user.id, !!user.banned)}
                        className={`${user.banned ? 'text-red-600' : 'text-slate-400 hover:text-red-600'} transition-colors`}
                        title={user.banned ? 'Unban User' : 'Ban User'}
                      >
                        <UserX size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminRoute>
  );
}
