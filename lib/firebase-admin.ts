import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        // Handle newlines in private key securely
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('[Firebase Admin] Initialized successfully');
  } catch (error: any) {
    console.error('[Firebase Admin] Initialization error:', error.stack);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
