import { getFirebaseAuth } from 'next-firebase-auth-edge';

export const adminAuth = getFirebaseAuth({
  serviceAccount: {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || '',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
    // Handle newlines in private key securely
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  },
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
});
