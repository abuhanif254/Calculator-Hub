// ═══════════════════════════════════════════════════════
// Base64 Utilities — Unicode-safe Encoding & Decoding
// ═══════════════════════════════════════════════════════

export function bytesToBase64(bytes: Uint8Array, urlSafe: boolean = false): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  let b64 = window.btoa(binary);
  if (urlSafe) {
    b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  return b64;
}

export function base64ToBytes(base64: string): Uint8Array {
  // Normalize URL-safe back to standard
  let normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding if missing
  while (normalized.length % 4 !== 0) {
    normalized += '=';
  }
  
  // Remove whitespace
  normalized = normalized.replace(/\s+/g, '');

  const binary = window.atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function encodeTextToBase64(text: string, urlSafe: boolean = false): string {
  const bytes = new TextEncoder().encode(text);
  return bytesToBase64(bytes, urlSafe);
}

export function decodeBase64ToText(base64: string): { text: string; error?: string } {
  try {
    const bytes = base64ToBytes(base64);
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return { text };
  } catch (e: any) {
    return { text: '', error: e.message || 'Invalid Base64 or UTF-8 sequence' };
  }
}

export function isValidBase64(str: string): boolean {
  if (str.trim() === '') return false;
  // Check for valid base64 pattern (including url-safe and whitespace)
  const cleanStr = str.replace(/\s+/g, '');
  const pattern = /^[A-Za-z0-9+/=_-]+$/;
  if (!pattern.test(cleanStr)) return false;
  
  try {
    let normalized = cleanStr.replace(/-/g, '+').replace(/_/g, '/');
    while (normalized.length % 4 !== 0) normalized += '=';
    window.atob(normalized);
    return true;
  } catch {
    return false;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
