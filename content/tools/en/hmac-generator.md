---
metaTitle: "HMAC Generator & Verifier — SHA-256, SHA-512, SHA-1 & MD5"
metaDescription: "Create and verify RFC 2104 HMAC signatures for webhooks and APIs using SHA-256, SHA-512, SHA-1, or MD5 locally in your browser via Web Crypto APIs."
metaKeywords: "hmac generator, hmac sha256 generator, hash message authentication code, api request signing, webhook signature verifier, hmac sha512, hmac md5 signature, hmac verification tool, test webhook signature, hmac online tool, generate hmac key, message authentication checksum"
title: "HMAC Generator & Verifier"
shortDescription: "Generate and validate RFC 2104 Hash-based Message Authentication Codes (HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5) locally for text payloads and files using Web Crypto APIs."
faqs:
  - question: "Why is HMAC safer than hashing a concatenated secret and message like SHA256(secret + payload)?"
    answer: "Naive prefix concatenation with Merkle–Damgård hashes (MD5, SHA-1, SHA-256, SHA-512) allows length-extension attacks: an adversary who knows the digest and message length can append arbitrary bytes and forge a valid hash without knowing the secret. RFC 2104 HMAC applies two nested hash passes with XORed inner and outer key pads, completely eliminating length extension."
  - question: "Does this HMAC generator send my secret keys or webhook payloads to a server?"
    answer: "No. Secret keys and messages stay strictly inside your browser memory. HMAC-SHA256, HMAC-SHA512, and HMAC-SHA1 execute via native window.crypto.subtle.sign(), while HMAC-MD5 and files larger than 20 MB stream locally in 2 MB chunks with zero outbound requests."
  - question: "How long should my HMAC secret key be?"
    answer: "NIST SP 800-107 recommends a cryptographically random key at least as long as the underlying hash output: at least 32 bytes (256 bits) for HMAC-SHA256 and 64 bytes (512 bits) for HMAC-SHA512. Keys longer than the algorithm's block size (64 or 128 bytes) are automatically pre-hashed by RFC 2104 and add no extra entropy."
  - question: "Why did my webhook HMAC verification fail in Express, Next.js, or Fastify?"
    answer: "The most common cause is signing a re-serialized JSON object (JSON.stringify(req.body)) instead of the exact raw HTTP request bytes received over the wire. Even one changed space, escaped slash, or reordered JSON key invalidates the HMAC signature."
  - question: "Why must server-side HMAC verification use constant-time comparison?"
    answer: "Standard string equality operators (=== or ==) exit on the first mismatched byte, creating measurable microsecond timing differences that let attackers forge a valid HMAC one byte at a time. Production backends must always compare digests with crypto.timingSafeEqual() in Node.js or hmac.compare_digest() in Python."
features:
  - "RFC 2104 signing and verification across HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5"
  - "Native Web Crypto API (SubtleCrypto) execution with automatic 2 MB chunked streaming for files over 20 MB"
  - "Built-in CSPRNG secret key generator powered by window.crypto.getRandomValues() for 256-bit keys"
  - "Instant signature comparison box to validate incoming webhook headers and API authentication tokens"
  - "Masked secret-key visibility toggle, uppercase/lowercase hex switch, auto-copy mode, and shareable test links"
  - "Built-in developer code snippets for webhook handlers, AWS signing, JWT HS256, and Express verification"
useCases:
  - "Debugging and verifying incoming webhook signatures from Stripe, GitHub, Shopify, Slack, and Twilio"
  - "Signing canonical REST API requests, query strings, and AWS Signature Version 4 authorization headers"
  - "Validating symmetric JSON Web Token (JWT) HS256 and HS512 signatures during authentication troubleshooting"
  - "Generating authenticated tamper-evident tags for local archive files and cross-service message queues"
  - "Creating high-entropy 256-bit symmetric signing secrets locally with the browser's CSPRNG"
  - "Testing edge cases in legacy HMAC-SHA1 (OAuth 1.0a / TOTP RFC 6238) or HMAC-MD5 integrations"
howToSteps:
  - "Select your target algorithm (HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, or HMAC-MD5) from the algorithm bar."
  - "Enter your shared secret key, or click the CSPRNG generator button to produce a random 32-byte hex key."
  - "Paste the raw message payload under 'Text Input' or switch to 'File Hash' to sign a local binary file."
  - "Inspect the generated hexadecimal authentication tag and toggle uppercase formatting or auto-copy as needed."
  - "Paste an expected webhook or API header digest into the verification field to confirm cryptographic validity."
---

Unkeyed checksums such as raw [SHA-256](/en/tools/sha256-generator) catch accidental bit corruption, yet anyone who intercepts a message can alter the payload and recompute a fresh digest to match. **HMAC (Hash-based Message Authentication Code)**, standardized in **RFC 2104** and **FIPS 198-1**, solves both data integrity and origin authentication simultaneously by binding the digest calculation to a shared cryptographic secret key. Without that secret, an attacker cannot forge a valid authentication tag for a modified HTTP webhook, API request, or signed cookie—making HMAC the backbone of Stripe, GitHub, Shopify, Slack, AWS Signature Version 4, and symmetric JWT (`HS256`/`HS512`) authentication.

## RFC 2104 Nested Hashing and Length-Extension Defense

Developers occasionally attempt to roll a lightweight signature scheme using `SHA-256(secret || message)`. On Merkle–Damgård hash functions (MD5, SHA-1, SHA-256, SHA-512), that naive pattern is fatally vulnerable to **length-extension attacks**: because the final digest directly exposes the hash function's internal chaining state, an adversary can resume compression from that digest, append forged parameters (such as `&role=admin`), and generate a valid hash without ever learning `secret`.

RFC 2104 defeats length extension through a two-pass nested construction using fixed padding constants `ipad` (`0x36` repeated `B` times) and `opad` (`0x5c` repeated `B` times), where `B` is the underlying hash function's internal block size in bytes:

```text
HMAC(K, m) = H( (K' XOR opad) || H( (K' XOR ipad) || m ) )
```

Before XORing, RFC 2104 normalizes the secret key `K` to exact length `B` bytes to derive `K'`:

- If `len(K) > B`, the key is first compressed via `K' = H(K)` and then right-padded with `0x00` bytes to length `B`.
- If `len(K) < B`, the key is right-padded directly with `0x00` bytes to length `B`.
- If `len(K) == B`, `K' = K` directly.

Because the inner hash output is immediately wrapped inside a second keyed outer hash pass, an attacker never observes the internal state corresponding to the message boundary. Even more remarkably, HMAC's security proof relies on the **pseudorandomness (PRF)** of the underlying compression function rather than strict collision resistance—which is why `HMAC-SHA1` and even `HMAC-MD5` have not suffered practical key-recovery breaks despite raw MD5 and SHA-1 collisions, though new systems should still standardize exclusively on `HMAC-SHA256` or `HMAC-SHA512`.

## HMAC Variant Specifications and Key Entropy Guidelines

Selecting the right HMAC algorithm depends on protocol interoperability, compliance requirements, and CPU architecture. Notice how `HMAC-SHA512` doubles the internal block size to 128 bytes, which affects both key normalization boundaries and throughput on 64-bit servers.

| Algorithm | Tag Size | Hex Chars | Block Size (`B`) | Min Recommended Key (NIST SP 800-107) | Security Status | Common Real-World Deployments |
| :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **HMAC-SHA256** | 256 bits | 64 | 64 bytes | 32 bytes (256 bits) | Recommended Default | GitHub `X-Hub-Signature-256`, Stripe, Shopify, AWS SigV4, JWT `HS256` |
| **HMAC-SHA512** | 512 bits | 128 | 128 bytes | 64 bytes (512 bits) | High Assurance | JWT `HS512`, Kraken/exchange API signing, high-security internal RPCs |
| **HMAC-SHA1** | 160 bits | 40 | 64 bytes | 20 bytes (160 bits) | Legacy Compatibility | OAuth 1.0a, RFC 6238 TOTP / RFC 4226 HOTP, older webhook providers |
| **HMAC-MD5** | 128 bits | 32 | 64 bytes | 16 bytes (128 bits) | Deprecated / Legacy | Legacy CRAM-MD5 mail auth and retired enterprise SOAP endpoints |

For new webhook secrets and API signing keys, generate at least 32 random bytes from a CSPRNG—either via this tool's built-in `window.crypto.getRandomValues()` key generator or a dedicated [Random String Generator](/en/tools/random-string-generator).

## Production Webhook and API Request Verification Patterns

This tool signs text payloads and files up to 20 MB with the browser's native `window.crypto.subtle.importKey` and `crypto.subtle.sign` APIs (falling back to 2 MB chunked streaming for larger files and `HMAC-MD5`), keeping sensitive signing keys strictly off remote servers. When moving from local debugging into backend production code, enforce two non-negotiable rules: **sign the raw unparsed request buffer** and **compare signatures in constant time** to prevent timing side-channel attacks.

```javascript
// Node.js (Express / Next.js Route Handler) constant-time webhook check
import crypto from 'node:crypto';

export function verifyWebhookSignature(rawBodyBuffer, secret, headerHex) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBodyBuffer)
    .digest();

  const received = Buffer.from(headerHex.replace(/^sha256=/i, '').trim(), 'hex');

  if (expected.length !== received.length) return false;
  return crypto.timingSafeEqual(expected, received);
}
```

```python
# Python standard library constant-time HMAC-SHA256 verification
import hashlib, hmac

def verify_signature(raw_body: bytes, secret: str, header_hex: str) -> bool:
    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    cleaned = header_hex.removeprefix("sha256=").strip().lower()
    return hmac.compare_digest(expected, cleaned)
```

## Debugging Signature Mismatches in Real-World Integrations

When a webhook verification fails despite matching algorithms and keys, inspect these four high-frequency integration bugs:

1. **JSON Body Re-Serialization**: Middleware like `express.json()` parses and discards whitespace. Passing `JSON.stringify(req.body)` into HMAC alters key ordering, whitespace, or Unicode escapes (`\/` vs `/`), breaking the signature. Always capture the raw `Buffer` before JSON parsing.
2. **Header Format & Base64 vs. Hex Encoding**: GitHub prepends `sha256=` to a lowercase hex tag, Stripe packs a timestamp and signature into `t=1700000000,v1=<hex>` (signing `${timestamp}.${rawBody}` to stop replay attacks), while Shopify transmits a **Base64-encoded** binary HMAC digest rather than hex. When debugging signed JSON Web Tokens (`HS256` / `HS512`) alongside HMAC signatures, inspect the decoded Base64url header and claims with our [JWT Decoder](/en/tools/jwt-decoder).
3. **Hex-String vs. Raw-Byte Secret Keys**: Confirm whether the provider treats a 64-character hex secret as 64 UTF-8 ASCII bytes (standard for most webhook dashboards) or decodes it into 32 raw binary bytes before passing it into HMAC.
4. **Canonical Header & Query Ordering**: Protocol schemes such as AWS Signature Version 4 require strict alphabetical query sorting, lowercase header trimming, and specific `\n` line feeds in the canonical request string before applying chained HMAC-SHA256 derivation keys.
