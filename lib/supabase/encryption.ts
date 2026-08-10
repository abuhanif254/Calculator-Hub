// @ts-nocheck
/**
 * AES-256-GCM encryption utility for storing sensitive DB credentials.
 * Key is loaded from DATA_PRIVACY_ENCRYPTION_KEY environment variable.
 * Never expose the key client-side â€“ this file is server-only.
 */

const ALGORITHM = 'AES-GCM';

function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    arr[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return arr;
}

function uint8ArrayToHex(arr: Uint8Array): string {
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getKey(): Promise<CryptoKey> {
  const hex = process.env.DATA_PRIVACY_ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    throw new Error(
      'DATA_PRIVACY_ENCRYPTION_KEY must be a 64-char hex string (32 bytes). '
    );
  }
  const rawKey = hexToUint8Array(hex);
  return await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: ALGORITHM },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts a plaintext string.
 * Returns: "iv_hex:authTag_hex:ciphertext_hex"
 */
export async function encrypt(plaintext: string): Promise<string> {
  const key = await getKey();
  const iv = new Uint8Array(16); // 128-bit IV
  crypto.getRandomValues(iv);
  
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv, tagLength: 128 },
    key,
    data
  );
  
  const encryptedBytes = new Uint8Array(encryptedBuffer);
  // WebCrypto AES-GCM appends the 16-byte auth tag at the end of the ciphertext
  const ciphertextBytes = encryptedBytes.slice(0, encryptedBytes.length - 16);
  const authTagBytes = encryptedBytes.slice(encryptedBytes.length - 16);
  
  return [
    uint8ArrayToHex(iv),
    uint8ArrayToHex(authTagBytes),
    uint8ArrayToHex(ciphertextBytes),
  ].join(':');
}

/**
 * Decrypts a string produced by encrypt().
 */
export async function decrypt(encoded: string): Promise<string> {
  const key = await getKey();
  const parts = encoded.split(':');
  if (parts.length !== 3) throw new Error('Invalid encrypted format');

  const [ivHex, authTagHex, ciphertextHex] = parts;
  const iv = hexToUint8Array(ivHex);
  const authTag = hexToUint8Array(authTagHex);
  const ciphertext = hexToUint8Array(ciphertextHex);
  
  // WebCrypto expects the ciphertext and auth tag to be concatenated
  const combined = new Uint8Array(ciphertext.length + authTag.length);
  combined.set(ciphertext, 0);
  combined.set(authTag, ciphertext.length);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv, tagLength: 128 },
    key,
    combined
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}
