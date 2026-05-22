"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { handleFirestoreError, OperationType } from "../../../../lib/firestoreUtils";
import { Link } from "../../../../i18n/routing";
import { ArrowLeft, User as UserIcon } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  createdAt: number;
}

interface UserProfile {
  displayName: string | null;
  photoURL: string | null;
}

export default function PostPage() {
  const params = useParams();
  const slug = (params?.slug || "") as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError("Post not found");
          setLoading(false);
          return;
        }
        
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        const postData = {
          id: docSnap.id,
          title: data.title,
          slug: data.slug,
          content: data.content,
          authorId: data.authorId,
          createdAt: data.createdAt?.toMillis() || Date.now()
        };
        
        setPost(postData);
        
        // Fetch author
        if (postData.authorId) {
          try {
            const userRef = doc(db, "users", postData.authorId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setAuthor(userSnap.data() as UserProfile);
            }
          } catch(err) {
             console.error("Failed to fetch author", err);
             // handleFirestoreError is not strictly required here if we want to swallow author fetch
          }
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, "posts");
        setError("Error loading post");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded mt-8"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/community" className="text-[#518231] hover:underline">Back to Community</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/community" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-1" />
        Back to Community
      </Link>
      
      <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <header className="px-6 py-8 md:px-10 border-b border-slate-100 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-3">
             {author?.photoURL ? (
                <img src={author.photoURL} alt="Author" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
             ) : (
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <UserIcon size={18} className="text-slate-400" />
                </div>
             )}
             <div>
               <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                 {author?.displayName || "Community Member"}
               </p>
               <p className="text-xs text-slate-500">
                 {new Date(post.createdAt).toLocaleDateString(undefined, { 
                   year: 'numeric', month: 'long', day: 'numeric' 
                 })}
               </p>
             </div>
          </div>
        </header>
        
        <div className="px-6 py-8 md:px-10 text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-lg">
          {post.content}
        </div>
      </article>
    </div>
  );
}
