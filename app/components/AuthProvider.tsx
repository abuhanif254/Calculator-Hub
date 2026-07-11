"use client";

/**
 * AuthProvider — Firebase is lazy-loaded after hydration.
 *
 * WHY: firebase/auth + firebase/firestore together are ~150 KB gzipped.
 * Loading them at the top level caused 1,000+ ms of script evaluation on
 * every single page load (even pages with zero auth interaction).
 *
 * FIX: All Firebase imports are now inside a useEffect() dynamic import.
 * On first paint: auth state is `loading: true`, user is null.
 * After ~100ms: Firebase resolves, onAuthStateChanged fires, UI updates.
 * This is identical to the previous behaviour since Firebase auth state
 * was always async — the Navbar already showed a loading state.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// Type-only imports are erased at compile time — zero runtime cost.
import type { User } from "firebase/auth";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "user" | "admin";
  badges?: string[];
  banned?: boolean;
  createdAt?: any;
  lastActive?: any;
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

const ADMIN_EMAIL = "mohammadbitullah@gmail.com";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser]       = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * firebaseRef holds all lazily-loaded Firebase module exports.
   * Using a ref (not state) means updating it never triggers a re-render.
   */
  const firebaseRef = useRef<{
    auth: any;
    db: any;
    signInWithPopup: any;
    GoogleAuthProvider: any;
    firebaseSignOut: any;
    signInWithEmailAndPassword: any;
    createUserWithEmailAndPassword: any;
    doc: any;
    getDoc: any;
    setDoc: any;
    serverTimestamp: any;
    handleFirestoreError: any;
    OperationType: any;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    async function initFirebase() {
      // ── Dynamic import: Firebase SDK only loads after first paint ─────────
      // Promise.all parallelises all four network fetches.
      const [
        authModule,
        firestoreModule,
        { auth, db },
        { handleFirestoreError, OperationType },
      ] = await Promise.all([
        import("firebase/auth"),
        import("firebase/firestore"),
        import("../../lib/firebase"),
        import("../../lib/firestoreUtils"),
      ]);

      if (cancelled) return;

      const {
        onAuthStateChanged,
        signInWithPopup,
        GoogleAuthProvider,
        signOut: firebaseSignOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
      } = authModule;

      const { doc, getDoc, setDoc, serverTimestamp } = firestoreModule;

      // Store all functions so signIn/signOut handlers can access them.
      firebaseRef.current = {
        auth,
        db,
        signInWithPopup,
        GoogleAuthProvider,
        firebaseSignOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        doc,
        getDoc,
        setDoc,
        serverTimestamp,
        handleFirestoreError,
        OperationType,
      };

      // ── Auth state observer ───────────────────────────────────────────────
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (cancelled) return;
        setUser(currentUser);

        if (currentUser) {
          try {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);

            let currentAppUser: AppUser;

            if (userSnap.exists()) {
              currentAppUser = userSnap.data() as AppUser;

              const updates: any = { lastActive: serverTimestamp() };
              if (
                currentUser.email === ADMIN_EMAIL &&
                currentAppUser.role !== "admin"
              ) {
                currentAppUser.role = "admin";
                updates.role = "admin";
              }
              await setDoc(userRef, updates, { merge: true });
            } else {
              currentAppUser = {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName:
                  currentUser.displayName ||
                  currentUser.email?.split("@")[0] ||
                  "User",
                photoURL: currentUser.photoURL,
                role: currentUser.email === ADMIN_EMAIL ? "admin" : "user",
                badges: [],
                banned: false,
              };
              await setDoc(userRef, {
                ...currentAppUser,
                createdAt: serverTimestamp(),
                joinedAt: serverTimestamp(),
                lastActive: serverTimestamp(),
              });
            }

            if (!cancelled) setAppUser(currentAppUser);
          } catch (error) {
            handleFirestoreError(
              error,
              OperationType.GET,
              `users/${currentUser.uid}`
            );
            if (!cancelled) setAppUser(null);
          }
        } else {
          if (!cancelled) setAppUser(null);
        }

        if (!cancelled) setLoading(false);
      });
    }

    initFirebase().catch((err) => {
      // Firebase failed to load (e.g., network error). Show unauthenticated state.
      console.error("[AuthProvider] Firebase failed to load:", err);
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // ── Auth actions — delegate to lazily-loaded Firebase functions ───────────

  const signIn = async () => {
    const fb = firebaseRef.current;
    if (!fb) return;
    const provider = new fb.GoogleAuthProvider();
    try {
      await fb.signInWithPopup(fb.auth, provider);
    } catch (error) {
      console.error("Google Sign in failed", error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const fb = firebaseRef.current;
    if (!fb) return;
    try {
      await fb.signInWithEmailAndPassword(fb.auth, email, pass);
    } catch (error) {
      console.error("Email Sign in failed", error);
      throw error;
    }
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    name: string
  ) => {
    const fb = firebaseRef.current;
    if (!fb) return;
    try {
      const cred = await fb.createUserWithEmailAndPassword(
        fb.auth,
        email,
        pass
      );
      const userRef = fb.doc(fb.db, "users", cred.user.uid);
      await fb.setDoc(
        userRef,
        {
          uid: cred.user.uid,
          email,
          displayName: name,
          photoURL: null,
          role: email === ADMIN_EMAIL ? "admin" : "user",
          badges: [],
          banned: false,
          createdAt: fb.serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Email Sign up failed", error);
      throw error;
    }
  };

  const signOut = async () => {
    const fb = firebaseRef.current;
    if (!fb) return;
    try {
      await fb.firebaseSignOut(fb.auth);
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  const isAdmin =
    appUser?.role === "admin" || user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider
      value={{
        user,
        appUser,
        isAdmin,
        loading,
        signIn,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
