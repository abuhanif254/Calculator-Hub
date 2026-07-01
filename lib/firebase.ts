import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import appletConfig from "../firebase-applet-config.json";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || appletConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || appletConfig.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || appletConfig.measurementId
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Use long polling to prevent Next.js build (SSR/SSG) from hanging due to gRPC connection issues
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
}, (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? undefined : appletConfig.firestoreDatabaseId));

export const auth = getAuth(app);
export const storage = getStorage(app);
