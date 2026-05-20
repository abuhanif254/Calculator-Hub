import { ToolConfig } from './types';

export const hmacGeneratorConfig: ToolConfig = {
  slug: "hmac-generator",
  title: "HMAC Generator & Verifier",
  shortDescription: "Generate and verify cryptographically secure Hash-based Message Authentication Codes (HMAC) client-side. Supports SHA256, SHA512, SHA1, and MD5 algorithms for API keys, webhook signatures, and data integrity verification.",
  category: "Encoding & Security",
  keywords: [
    "hmac generator", "hmac sha256 generator", "hash message authentication code", "api request signing",
    "webhook signature verifier", "hmac sha512", "hmac md5 signature", "hmac verification tool",
    "test webhook signature", "hmac online tool", "generate hmac key", "message authentication checksum"
  ],

  longDescription: `
## What is HMAC? (Hash-based Message Authentication Code)

An **HMAC** (Hash-based Message Authentication Code) is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It is used to simultaneously verify both the **data integrity** and the **authenticity** of a message.

Unlike standard cryptographic hashes (like SHA-256 or MD5) which only detect accidental data corruption or modifications by unauthorized third parties, an HMAC uses a symmetric pre-shared key. This key ensures that only individuals who possess the secret key can generate or verify the signature, protecting communication channels against malicious spoofing and tampering.

HMAC is defined in RFC 2104 and has been widely adopted as an internet standard (FIPS PUB 198). It forms the cryptographic foundation of secure communications, including SSL/TLS, IPsec, SSH, and API request signing protocols used by major platforms such as AWS, Stripe, GitHub, and major payment gateways.

---

## How HMAC Works: The Cryptographic Formula

Simply hashing a message concatenated with a key (e.g., $Hash(Key + Message)$) is vulnerable to a severe cryptographic vulnerability known as a **length extension attack**. In a length extension attack, an attacker who intercepts the hash and the length of the message can append extra data to the message and calculate a valid hash without ever knowing the secret key.

HMAC prevents this by hashing the key and the message in a nested, two-pass structure. 

### The HMAC Mathematical Formula:
$$\\text{HMAC}(K, m) = H((K^+ \\oplus \\text{opad}) \\parallel H((K^+ \\oplus \\text{ipad}) \\parallel m))$$

Where:
* **$H$** is a cryptographic hash function (e.g., SHA-256, SHA-512, MD5).
* **$K$** is the secret key.
* **$K^+$** is the key padded with zeros to match the block size of the hash function (or hashed first if it is longer than the block size).
* **$m$** is the message to be authenticated.
* **$\\parallel$** denotes string concatenation.
* **$\\oplus$** denotes bitwise exclusive-OR (XOR).
* **$\\text{ipad}$** is the inner padding constant (repeated byte \`0x36\` to fill the block size).
* **$\\text{opad}$** is the outer padding constant (repeated byte \`0x5c\` to fill the block size).

### Step-by-Step Breakdown of the Two-Pass Execution:
1. **Key Standardizing**: If the secret key $K$ is longer than the block size of the hash function (e.g., 64 bytes for SHA-256), it is first hashed to produce a shorter key. If it is shorter, it is padded with trailing zeros to match the block size.
2. **Inner Hashing**: The standardized key $K^+$ is XORed with the inner pad constant ($\\text{ipad}$). The resulting block is concatenated with the message $m$, and the chosen hash function hashes this combination: $H((K^+ \\oplus \\text{ipad}) \\parallel m)$.
3. **Outer Hashing**: The standardized key $K^+$ is XORed with the outer pad constant ($\\text{opad}$). The resulting block is concatenated with the inner hash output from Step 2, and hashed again: $H((K^+ \\oplus \\text{opad}) \\parallel \\text{Inner Hash})$.

This nested mechanism mathematically breaks the length extension property of Merkle-Damgård hash functions, making HMAC highly secure against truncation and extension attacks.

---

## HMAC vs. Standard Hashing

A common point of confusion is the difference between a standard cryptographic hash and an HMAC. The table below highlights their differences:

| Feature | Standard Hash (e.g., SHA-256) | HMAC (e.g., HMAC-SHA256) |
| :--- | :--- | :--- |
| **Inputs** | Message only ($m$) | Message ($m$) + Secret Key ($K$) |
| **Purpose** | Verification of data integrity (detects changes) | Verification of integrity AND authenticity (identity check) |
| **Vulnerabilities** | Vulnerable to Length Extension Attacks | Immune to Length Extension Attacks |
| **Key Exchange** | None required | Requires secure sharing of a symmetric secret key |
| **Primary Use Cases** | File integrity checksums, database password storage | API Request signing, webhooks, secure tokens (JWTs) |

---

## Supported Cryptographic Algorithms

This HMAC Generator supports four of the most widely used hashing algorithms, allowing you to select the appropriate balance of speed, performance, and security:

### 1. HMAC-SHA256
* **Hash Family**: SHA-2 (Secure Hash Algorithm 2)
* **Output Length**: 256 bits (32 bytes / 64 hex characters)
* **Block Size**: 64 bytes
* **Security Level**: Highly secure. It is the industry standard for API request signing, OAuth verification, and secure webhooks (used by Stripe, Slack, and GitHub).

### 2. HMAC-SHA512
* **Hash Family**: SHA-2
* **Output Length**: 512 bits (64 bytes / 128 hex characters)
* **Block Size**: 128 bytes
* **Security Level**: Extremely secure. Used for maximum data protection, high-security enterprise systems, and cryptocurrency transactions. It is also faster than SHA-256 on 64-bit hardware architectures.

### 3. HMAC-SHA1
* **Hash Family**: SHA-1
* **Output Length**: 160 bits (20 bytes / 40 hex characters)
* **Block Size**: 64 bytes
* **Security Level**: Legacy. While collision vulnerabilities make SHA-1 insecure for general certificates, HMAC-SHA1 remains secure because the secret key makes collision attacks impractical. It is still used in legacy APIs and systems like Git commit verification.

### 4. HMAC-MD5
* **Hash Family**: MD5 (Message Digest 5)
* **Output Length**: 128 bits (16 bytes / 32 hex characters)
* **Block Size**: 64 bytes
* **Security Level**: Deprecated / Weak. Although HMAC-MD5 is not directly vulnerable to the same collision attacks as pure MD5, it should only be used for compatibility with older legacy systems. Avoid it in new applications.

---

## Real-World Web Developer Applications

HMAC is a core component of modern web architecture. Below are the most common application patterns:

### 1. Webhook Signature Verification
When a third-party service (like Stripe, PayPal, or GitHub) sends a webhook payload to your server, your server needs to verify that the webhook actually came from that provider and wasn't spoofed by an attacker.
* The provider hashes the JSON request body using a secret key they shared with you.
* The resulting signature is sent in a custom header (e.g., \`Stripe-Signature\` or \`X-Hub-Signature\`).
* Upon receiving the webhook, your server calculates the HMAC of the raw request body using the same secret key and compares it to the header. If they match, the request is authentic.

### 2. API Request Signing (AWS-Style Signature V4)
To prevent API keys from being intercepted over the network, services like Amazon Web Services (AWS) use HMAC signatures instead of sending API keys in headers.
* The client builds a canonical string representing the request (HTTP method, URI, query parameters, headers, and body hash).
* The client generates an HMAC signature of this canonical string using their API secret key.
* The signature and request parameters are sent to the server.
* The server reconstructs the canonical string, hashes it, and verifies the signature. This ensures the request was not altered in transit (integrity) and comes from a valid user (authenticity).

### 3. JSON Web Token (JWT) Signatures
JWTs consist of a Header, a Payload, and a Signature separated by dots (e.g., \`header.payload.signature\`).
* When using the HS256 algorithm, the signature is computed as:
  $$\\text{Signature} = \\text{HMAC-SHA256}(\\text{Base64Url}(\\text{Header}) + \".\" + \\text{Base64Url}(\\text{Payload}), \\text{Secret})$$
* This prevents users from altering their JWT claims (like changing their role to "admin") because doing so would invalidate the signature, which can only be recomputed by the server holding the secret key.

---

## HMAC Best Practices for Developers

To maintain high cryptographic security, follow these best practices in your applications:

1. **Use Strong Symmetric Keys**: Generate keys using a cryptographically secure random number generator (CSPRNG). Ensure the key size matches or exceeds the output length of the hash function (e.g., at least 256 bits or 32 random bytes for HMAC-SHA256).
2. **Prevent Timing Attacks**: When verifying signatures on your server, do not use standard string comparison operators (e.g., \`if (signature == expectedSignature)\`). Normal comparisons exit early on the first mismatched character, allowing attackers to guess the signature byte-by-byte by measuring response times. Always use a constant-time comparison library (e.g., \`crypto.timingSafeEqual\` in Node.js).
3. **Include Timestamps**: Always sign a timestamp along with your message payload. This allows your server to reject signatures that are too old, preventing **replay attacks** where an attacker intercepts a valid signed request and resends it later.
4. **Use Raw Request Bodies**: When signing webhook or API requests, always use the raw request body string. Hashing parsed JSON objects can result in verification failures due to varying object key order, spacing, or newline normalization.
5. **Rotate Secrets Regularly**: Establish a policy to rotate secret signing keys periodically. In the event of a key leak, rotation limits the window of opportunity for an attacker.

---

## Common Mistakes Developers Make

* **Storing Keys in Code**: Hardcoding API secrets or HMAC signing keys directly into version-controlled repositories is a major security risk. Use environment variables and store keys in secure vaults (like AWS Secrets Manager, Vault, or GCP Secret Manager).
* **Using Fast Hashing for Passwords**: HMAC is designed for message verification, not database password storage. Storing user passwords hashed with HMAC makes them vulnerable to rapid offline dictionary attacks. Use slow, key-derivation algorithms like **Argon2id** or **bcrypt** for password storage.
* **Signing Unsanitized Inputs**: If you sign concatenated strings, ensure you use a safe delimiter (like a colon or null byte) to prevent **canonicalization attacks** (where two different parameter configurations result in the same concatenated signature string).
`,

  features: [
    "Secure client-side HMAC generation using browser-native Web Crypto API",
    "Support for multiple hashing algorithms: HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5",
    "Dual input modes: direct text message signing or local file signature generation",
    "Real-time HMAC generation with instant updates as you type or change configurations",
    "Integrated checksum verification engine to compare generated signature against expected values",
    "Automatic character counter and byte-size indicators for message payloads",
    "Visual loading indicators and chunked progressive CryptoJS hashing for large files",
    "One-click paste helper and instant clipboard auto-copy switches",
    "Interactive developer code demo center containing copyable code snippets for real-world scenarios",
    "Secure random secret key generator utility driven by browser CSPRNG values",
    "Secret key visibility controls to protect sensitive values from shoulder surfing",
    "Comprehensive session history logging stored locally in the browser with wiping controls",
    "Uppercase and lowercase output case toggles",
    "Fully accessible keyboard controls and clean dark mode styles"
  ],

  useCases: [
    "Generating authentic HMAC signatures for API request testing and debugging",
    "Simulating and verifying webhook signatures (Stripe, Slack, GitHub) during development",
    "Computing local file checksums with pre-shared keys to ensure download integrity",
    "Generating signatures for secure JWTs (HS256/HS512 tokens)",
    "Signing API requests using AWS v4 style, Git commit, or custom security schemas",
    "Testing constant-time verification logic with known-good and known-bad HMAC pairs",
    "Generating secure API communication secrets and authenticating messaging streams"
  ],

  howToSteps: [
    "Choose your input mode: select 'Text Input' or 'File Signer'.",
    "Select the cryptographic hash algorithm (e.g., SHA-256 or SHA-512) from the settings bar.",
    "Enter your message payload or drag & drop a local file into the upload box.",
    "Input your symmetric secret key, or click 'Generate Key' to create a random cryptographically secure key.",
    "Select whether you want the output signature in lowercase or uppercase hex format.",
    "The generated HMAC signature appears instantly in the output field. Click the copy icon or download it.",
    "Optional: Paste an expected signature into the 'Compare / Verify' field to check for a match in real-time."
  ],

  examples: [
    {
      title: "HMAC-SHA256 Text Signature",
      description: "Standard HMAC signature using SHA256 with a simple text payload and secret key.",
      input: "Message: \"Hello World\"\nSecret Key: \"my-secret-key\"\nAlgorithm: HMAC-SHA256",
      output: "d070b471207e997486f059bc422998a69e7f45b7410214a1a72097e3a1f8021d"
    },
    {
      title: "HMAC-SHA512 Secure Sign",
      description: "HMAC signature using SHA512 showing high output entropy for military-grade protection.",
      input: "Message: \"Secure Payload\"\nSecret Key: \"highly-secure-token\"\nAlgorithm: HMAC-SHA512",
      output: "eb71b10a2cd92d9d15c1e5ad7448e65839958cf0b784a929fa3a2be10d8fa0fb776cf5c6bf1bcfc23e85e50587de5b441f7b8893699c6934cfa7350f55cf55ce"
    },
    {
      title: "Webhook Signature Simulation",
      description: "Calculating the HMAC-SHA256 of a JSON payload representing a Stripe-style webhook.",
      input: "Message: \"{\"id\":\"evt_123\",\"type\":\"charge.succeeded\"}\"\nSecret Key: \"whsec_key\"\nAlgorithm: HMAC-SHA256",
      output: "49e5d4de768ccb130a08a28ccb673df64bdf9f52f7f98be1f60037a1c2cbdf48"
    }
  ],

  faq: [
    {
      question: "What is an HMAC?",
      answer: "HMAC stands for Hash-based Message Authentication Code. It is a cryptographic signature that combines a secret key and a hash function (like SHA-256) to verify both the integrity (the message wasn't changed) and the authenticity (the sender is genuine) of data."
    },
    {
      question: "Are my secret keys sent to your server?",
      answer: "No, absolutely not. All computations are performed entirely inside your browser's local sandbox using client-side JavaScript (the native Web Crypto API and CryptoJS). Your message payloads and secret keys never leave your device."
    },
    {
      question: "Why should I use HMAC instead of a normal hash like SHA-256?",
      answer: "Standard hashes are vulnerable to 'length extension attacks', where an attacker can append data to a message and generate a valid hash without knowing the secret. HMAC's nested two-pass design makes it immune to these attacks, providing security for authentication."
    },
    {
      question: "What is a timing attack in HMAC verification?",
      answer: "A timing attack occurs when a server compares signatures using standard comparison operators (like '=='). These operators compare strings character-by-character and stop at the first mismatch. An attacker can measure how long the server takes to respond to determine how many characters of their guessed signature are correct. Developers use constant-time comparisons to prevent this."
    },
    {
      question: "Which HMAC algorithm should I choose?",
      answer: "For most modern applications, HMAC-SHA256 is the standard recommendation. It offers an excellent balance of speed and cryptographic security. Use HMAC-SHA512 if you require maximum security margins, and reserve HMAC-SHA1 or HMAC-MD5 only for backward compatibility with legacy services."
    },
    {
      question: "Can I hash large files with this tool?",
      answer: "Yes. Small files (up to 20MB) are signed using the highly optimized native Web Crypto API. Larger files are processed progressively in chunks using CryptoJS, which prevents browser memory exhaustion and keeps the user interface responsive."
    },
    {
      question: "Is HMAC the same as encryption?",
      answer: "No. Encryption is a two-way function used to hide data (confidentiality) so that only authorized parties can decrypt it. HMAC is a one-way function used to verify that data has not been altered (integrity) and came from a trusted sender (authenticity). HMAC does not hide the message content."
    }
  ],

  relatedTools: [
    { name: "SHA256 Generator", slug: "sha256-generator" },
    { name: "MD5 Generator", slug: "md5-generator" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "Password Generator", slug: "password-generator" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "Base64 Encode", slug: "base64-encode" },
    { name: "Base64 Decode", slug: "base64-decode" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "URL Decoder", slug: "url-decoder" }
  ]
};
