/**
 * privacyFetch — Drop-in replacement for fetch() for all /api/privacy/* calls.
 *
 * Automatically retrieves the Firebase ID token from the current user
 * and injects it as an Authorization: Bearer <token> header.
 *
 * Usage (in a React component or page):
 *   import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
 *
 *   const res = await privacyFetch('/api/privacy/connections');
 *   const res = await privacyFetch('/api/privacy/jobs', {
 *     method: 'POST',
 *     body: JSON.stringify({ ... }),
 *   });
 */

import { getAuth } from 'firebase/auth';

/**
 * Gets the current Firebase ID token, or null if not signed in.
 */
async function getFirebaseToken(): Promise<string | null> {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
  } catch {
    // Firebase not initialized or user not signed in
  }
  return null;
}

/**
 * Fetches a URL with the Firebase ID token automatically injected.
 * Falls back to a plain fetch if the user is not signed in.
 */
export async function privacyFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getFirebaseToken();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // Always set Content-Type for non-GET requests if not already set
  if (options.method && options.method !== 'GET' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
}
