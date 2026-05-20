export interface JwtData {
  header: any;
  payload: any;
  signature: string;
  error: string | null;
  isValid: boolean;
  algorithm: string;
}

export const decodeBase64Url = (str: string): string => {
  try {
    // Replace non-url compatible chars with base64 standard chars
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    
    // Pad out with standard base64 required padding characters
    const pad = str.length % 4;
    if (pad) {
      if (pad === 1) {
        throw new Error('InvalidBase64UrlLength');
      }
      str += new Array(5 - pad).join('=');
    }

    // Decode base64 to string handling unicode
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (err) {
    throw new Error('Base64 decode failed');
  }
};

export const parseJwt = (token: string): JwtData => {
  const result: JwtData = {
    header: null,
    payload: null,
    signature: '',
    error: null,
    isValid: false,
    algorithm: 'unknown',
  };

  if (!token || typeof token !== 'string') {
    return result;
  }

  const parts = token.trim().split('.');

  if (parts.length !== 3) {
    result.error = 'Invalid JWT format. A valid JWT must have 3 parts separated by dots.';
    return result;
  }

  try {
    const decodedHeader = decodeBase64Url(parts[0]);
    result.header = JSON.parse(decodedHeader);
    if (result.header && result.header.alg) {
      result.algorithm = result.header.alg;
    }
  } catch (err) {
    result.error = 'Failed to decode JWT header. Ensure it is valid Base64Url JSON.';
    return result;
  }

  try {
    const decodedPayload = decodeBase64Url(parts[1]);
    result.payload = JSON.parse(decodedPayload);
  } catch (err) {
    result.error = 'Failed to decode JWT payload. Ensure it is valid Base64Url JSON.';
    return result;
  }

  result.signature = parts[2];
  
  // If we reach here without errors, format is technically correct.
  result.isValid = true;
  return result;
};

export const formatUnixTime = (timestamp: number | undefined): { date: string; relative: string; isExpired: boolean; isFuture: boolean } | null => {
  if (typeof timestamp !== 'number') return null;

  // JWT timestamps are usually in seconds. If it's ridiculously large, might be ms, but standard is seconds.
  // Assuming seconds.
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  
  let relative = '';
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const absDiff = Math.abs(diffSeconds);
  if (absDiff < 60) relative = rtf.format(Math.sign(diffSeconds) * absDiff, 'second');
  else if (absDiff < 3600) relative = rtf.format(Math.sign(diffSeconds) * Math.floor(absDiff / 60), 'minute');
  else if (absDiff < 86400) relative = rtf.format(Math.sign(diffSeconds) * Math.floor(absDiff / 3600), 'hour');
  else if (absDiff < 2592000) relative = rtf.format(Math.sign(diffSeconds) * Math.floor(absDiff / 86400), 'day');
  else if (absDiff < 31536000) relative = rtf.format(Math.sign(diffSeconds) * Math.floor(absDiff / 2592000), 'month');
  else relative = rtf.format(Math.sign(diffSeconds) * Math.floor(absDiff / 31536000), 'year');

  return {
    date: date.toLocaleString(),
    relative,
    isExpired: diffSeconds < 0,
    isFuture: diffSeconds > 0
  };
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};
