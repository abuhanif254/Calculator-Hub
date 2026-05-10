import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Use long polling to prevent Next.js build (SSR/SSG) from hanging due to gRPC connection issues
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
