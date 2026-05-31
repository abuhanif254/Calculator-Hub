import { db, auth } from './firebase';
import { collection, doc, setDoc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface PlaygroundPen {
  title: string;
  html: string;
  css: string;
  js: string;
  htmlMode: 'html' | 'markdown';
  cssMode: 'css' | 'scss';
  jsMode: 'javascript' | 'babel';
  useTailwind: boolean;
  useBootstrap: boolean;
  externalStylesheets?: string[];
  externalScripts?: string[];
  createdAt?: any;
  updatedAt?: any;
  userId: string | null;
}

export const generateShortId = () => {
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
};

export const savePlaygroundPen = async (penData: Omit<PlaygroundPen, 'userId'>, penId?: string): Promise<string> => {
  const id = penId || generateShortId();
  const penRef = doc(db, 'playground_pens', id);
  
  const currentUser = auth.currentUser;
  
  const existingDoc = await getDoc(penRef);
  
  const payload = {
    ...penData,
    userId: currentUser ? currentUser.uid : null,
    updatedAt: serverTimestamp(),
  };

  if (!existingDoc.exists()) {
    (payload as any).createdAt = serverTimestamp();
  }

  // Use setDoc with merge: true to avoid overwriting createdAt if updating
  await setDoc(penRef, payload, { merge: true });
  
  return id;
};

export const getPlaygroundPen = async (penId: string): Promise<PlaygroundPen | null> => {
  const penRef = doc(db, 'playground_pens', penId);
  const penSnap = await getDoc(penRef);
  
  if (penSnap.exists()) {
    return penSnap.data() as PlaygroundPen;
  }
  
  return null;
};
