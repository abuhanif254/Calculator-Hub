// ═══════════════════════════════════════════════════════
// URL Encoding Utilities
// ═══════════════════════════════════════════════════════

export type EncodingMode = 'component' | 'uri';

export function encodeUrlString(text: string, mode: EncodingMode = 'component'): string {
  try {
    return text.split('\n').map(line => {
      if (mode === 'component') {
        return encodeURIComponent(line);
      } else {
        return encodeURI(line);
      }
    }).join('\n');
  } catch (e) {
    return text;
  }
}

export function decodeUrlString(text: string, mode: EncodingMode = 'component'): { text: string; error?: string } {
  try {
    const lines = text.split('\n');
    const result = lines.map(line => {
      // Browsers often encode spaces as `+` in query strings. 
      // We should safely handle `+` if we're in component mode.
      let processText = line;
      if (mode === 'component') {
        processText = line.replace(/\+/g, '%20');
      }
      
      if (mode === 'component') {
        return decodeURIComponent(processText);
      } else {
        return decodeURI(processText);
      }
    }).join('\n');
    
    return { text: result };
  } catch (e: any) {
    return { text: '', error: 'URI Error: The string contains malformed percent-encoded sequences.' };
  }
}

export function parseQueryParams(urlOrQuery: string): { key: string; value: string }[] {
  let queryString = urlOrQuery;
  
  // Extract just the query string if a full URL is passed
  const qIndex = urlOrQuery.indexOf('?');
  if (qIndex !== -1) {
    queryString = urlOrQuery.substring(qIndex + 1);
  }
  
  // Remove hash fragment if present
  const hIndex = queryString.indexOf('#');
  if (hIndex !== -1) {
    queryString = queryString.substring(0, hIndex);
  }

  if (!queryString.trim()) return [];

  const pairs = queryString.split('&');
  const params: { key: string; value: string }[] = [];

  for (const pair of pairs) {
    if (!pair) continue;
    const [rawKey, rawValue] = pair.split('=');
    const key = rawKey ? decodeURIComponent(rawKey.replace(/\+/g, '%20')) : '';
    const value = rawValue !== undefined ? decodeURIComponent(rawValue.replace(/\+/g, '%20')) : '';
    params.push({ key, value });
  }

  return params;
}

export function buildQueryString(params: { key: string; value: string }[]): string {
  if (params.length === 0) return '';
  return params
    .filter(p => p.key.trim() !== '')
    .map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
    .join('&');
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

export function countReservedChars(text: string): number {
  const reservedRegex = /[:\/?#\[\]@!$&'()*+,;=]/g;
  const matches = text.match(reservedRegex);
  return matches ? matches.length : 0;
}
