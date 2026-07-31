/**
 * AES-256-GCM encryption utility for storing sensitive DB credentials.
 * Key is loaded from DATA_PRIVACY_ENCRYPTION_KEY environment variable.
 * Never expose the key client-side — this file is server-only.
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;   // 128-bit IV
const TAG_LENGTH = 16;  // 128-bit auth tag

function getKey(): Buffer {
  const hex = process.env.DATA_PRIVACY_ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    throw new Error(
      'DATA_PRIVACY_ENCRYPTION_KEY must be a 64-char hex string (32 bytes). ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    );
  }
  return Buffer.from(hex, 'hex');
}

/**
 * Encrypts a plaintext string.
 * Returns: "iv_hex:authTag_hex:ciphertext_hex"
 */
export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString('hex'),
    authTag.toString('hex'),
    encrypted.toString('hex'),
  ].join(':');
}

/**
 * Decrypts a string produced by encrypt().
 */
export function decrypt(encoded: string): string {
  const key = getKey();
  const parts = encoded.split(':');
  if (parts.length !== 3) throw new Error('Invalid encrypted format');

  const [ivHex, authTagHex, ciphertextHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const ciphertext = Buffer.from(ciphertextHex, 'hex');

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]).toString('utf8');
}
