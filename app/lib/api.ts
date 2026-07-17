/**
 * Centralized API configuration.
 * Set NEXT_PUBLIC_WORKER_URL in your .env.local to point to your deployed worker.
 * Falls back to localhost:8787 for local development.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_WORKER_URL || 'http://localhost:8787';

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
