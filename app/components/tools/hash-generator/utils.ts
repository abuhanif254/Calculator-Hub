import CryptoJS from 'crypto-js';

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-224' | 'SHA-256' | 'SHA-384' | 'SHA-512' | 'SHA3-256' | 'SHA3-512';

export interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
  security: 'Weak' | 'Deprecated' | 'Strong' | 'Very Strong';
  length: number;
}

const getSecurityLevel = (algo: HashAlgorithm) => {
  if (algo === 'MD5') return 'Weak';
  if (algo === 'SHA-1') return 'Deprecated';
  if (algo.startsWith('SHA3')) return 'Very Strong';
  return 'Strong'; // SHA-2 family
};

export const ALGORITHMS: HashAlgorithm[] = [
  'MD5', 'SHA-1', 'SHA-224', 'SHA-256', 'SHA-384', 'SHA-512', 'SHA3-256', 'SHA3-512'
];

export const generateHash = (input: CryptoJS.lib.WordArray | string, algo: HashAlgorithm): HashResult => {
  let hashObject;
  switch (algo) {
    case 'MD5':
      hashObject = CryptoJS.MD5(input);
      break;
    case 'SHA-1':
      hashObject = CryptoJS.SHA1(input);
      break;
    case 'SHA-224':
      hashObject = CryptoJS.SHA224(input);
      break;
    case 'SHA-256':
      hashObject = CryptoJS.SHA256(input);
      break;
    case 'SHA-384':
      hashObject = CryptoJS.SHA384(input);
      break;
    case 'SHA-512':
      hashObject = CryptoJS.SHA512(input);
      break;
    case 'SHA3-256':
      hashObject = CryptoJS.SHA3(input, { outputLength: 256 });
      break;
    case 'SHA3-512':
      hashObject = CryptoJS.SHA3(input, { outputLength: 512 });
      break;
    default:
      hashObject = CryptoJS.SHA256(input);
  }

  const hashString = hashObject.toString(CryptoJS.enc.Hex);
  
  return {
    algorithm: algo,
    hash: hashString,
    security: getSecurityLevel(algo),
    length: hashString.length * 4 // hex length * 4 bits
  };
};

export const generateAllHashes = (input: CryptoJS.lib.WordArray | string): HashResult[] => {
  return ALGORITHMS.map(algo => generateHash(input, algo));
};

export const arrayBufferToWordArray = (arrayBuffer: ArrayBuffer) => {
  const words: number[] = [];
  const u8arr = new Uint8Array(arrayBuffer);
  const len = u8arr.length;
  for (let i = 0; i < len; i++) {
    words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
  }
  return CryptoJS.lib.WordArray.create(words, len);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

export const downloadFile = (content: string, filename: string, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
