"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../../lib/firestoreUtils";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
  banned?: boolean;
  createdAt?: any;
}

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: () => Promise<void>;
  signInWithEmail: (e: string, p: string) => Promise<void>;
  signUpWithEmail: (e: string, p: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  appUser: null,
  isAdmin: false,
  loading: true,
  signIn: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = 'mohammadbitullah@gmail.com';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          let currentAppUser: AppUser;

          if (userSnap.exists()) {
            currentAppUser = userSnap.data() as AppUser;
            
            // Ensure hardcoded admin email always gets admin role
            if (currentUser.email === ADMIN_EMAIL && currentAppUser.role !== 'admin') {
              currentAppUser.role = 'admin';
              await setDoc(userRef, { role: 'admin' }, { merge: true });
            }
          } else {
            currentAppUser = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
              photoURL: currentUser.photoURL,
              role: currentUser.email === ADMIN_EMAIL ? 'admin' : 'user',
              banned: false,
            };
            await setDoc(userRef, {
              ...currentAppUser,
              createdAt: serverTimestamp()
            });
          }
          
          setAppUser(currentAppUser);
        } catch (error) {
           handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
           setAppUser(null);
        }
      } else {
        setAppUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign in failed", error);
      throw error;
    }
  };
  
  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Email Sign in failed", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      // Wait for auth state observer to create the doc, or just update the profile
      const userRef = doc(db, "users", cred.user.uid);
      await setDoc(userRef, {
        uid: cred.user.uid,
        email: email,
        displayName: name,
        photoURL: null,
        role: email === ADMIN_EMAIL ? 'admin' : 'user',
        banned: false,
        createdAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error("Email Sign up failed", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  const isAdmin = appUser?.role === 'admin' || user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, appUser, isAdmin, loading, signIn, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
