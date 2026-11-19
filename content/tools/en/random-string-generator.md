---
metaTitle: "Random String Generator | API Keys, Patterns & Tokens"
metaDescription: "Generate up to 5,000 CSPRNG random strings, API keys, JWT secrets, and pattern-masked coupon codes offline with custom alphabets and JSON export."
metaKeywords: "random string generator, secure token generator, api key generator, alphanumeric string maker, cryptographic string creator, session id generator, coupon code generator, hexadecimal string generator, base64 string generator, pattern string generator"
title: "Random String Generator"
shortDescription: "Generate cryptographically secure API keys, session tokens, JWT signing secrets, compact database IDs, and pattern-masked coupon codes in bulk up to 5,000 deduplicated strings offline."
faqs:
  - question: "How does Pattern Mode syntax work for structured coupon and license codes?"
    answer: "In Pattern Mode, literal characters stay fixed while placeholders draw securely from dedicated pools: X or U inserts an uppercase letter, x or L inserts a lowercase letter, 9 or # or N inserts a digit, S inserts a symbol, and * draws an alphanumeric character. For example, DEV-XXXX-####-**** produces structured license or promo keys."
  - question: "How many characters does a secure API key or session token need?"
    answer: "OWASP recommends at least 128 bits of CSPRNG entropy for session IDs and API keys, and 256 bits for HMAC-SHA256 JWT signing secrets. In a 62-character alphanumeric pool (5.95 bits/char), 22 characters exceed 128 bits and 44 characters exceed 256 bits; in hexadecimal (4 bits/char), use 32 or 64 characters respectively."
  - question: "Why should backend code validate generated API tokens with constant-time comparison?"
    answer: "Standard equality operators (=== or ==) short-circuit on the first mismatched byte, creating microsecond timing differences that attackers can statistically measure over a network to guess a token byte by byte. Always compare secret tokens using constant-time primitives such as Node.js crypto.timingSafeEqual() or Python hmac.compare_digest()."
  - question: "Can I guarantee zero duplicates when generating 5,000 promo codes?"
    answer: "Yes. Bulk generation stores candidate outputs in an in-memory Set so every exported string in the batch is unique. Make sure your pattern contains enough variable slots—for instance, PROMO-XXXX with ambiguity exclusion yields 24^4 = 331,776 unique codes, comfortably covering 5,000 rows while remaining hard to guess only if redemption endpoints are rate-limited."
  - question: "What is the advantage of adding a static prefix to generated API keys?"
    answer: "Adding a deterministic vendor prefix such as sk_live_ or api_prod_ before a 32-character CSPRNG body lets secret-scanning tools (like GitHub Secret Scanning or TruffleHog) immediately identify accidental repository leaks and distinguishes staging keys from production keys without reducing the body's cryptographic entropy."
features:
  - "Web Crypto API CSPRNG string generation supporting bulk deduplicated batches of up to 5,000 strings locally"
  - "Dual Character Pool and Pattern Mask engines (X/U, x/L, 9/#/N, S, * placeholders plus verbatim literals)"
  - "Eight developer presets: API Token, JWT Secret (64-char), DB ID, Password, Invite Code, Coupon Code, Session Token (hex), and Gaming Code"
  - "Custom character-alphabet injection, explicit Remove Characters exclusions, ambiguity stripping (O, 0, I, l, 1, 8), and no-repeat constraints"
  - "Live per-string entropy scoring (bits, pool size, Low/Medium/High/Cryptographic badge) with instant search and sort controls"
  - "Bulk copy and file download in TXT, CSV (with entropy columns), and JSON formats alongside local favorites and configuration history"
useCases:
  - "Minting 256-bit HS256/HS512 JWT signing secrets, webhook verification keys, and OAuth client secrets offline"
  - "Generating thousands of human-readable, ambiguity-free coupon or beta-invite codes matching patterns like PROMO-XXXX-2026"
  - "Creating compact URL-safe database identifiers (NanoID or Base62 style) shorter than 36-character UUIDs"
  - "Provisioning 48-character hexadecimal session tokens, CSRF nonces, and password-reset verification tokens"
  - "Building custom-alphabet test strings (Base32, Base58, or Unicode edge strings) to stress-test API validators and regex parsers"
  - "Exporting deduplicated JSON or CSV secret lists directly into staging seeders and automated QA suites"
howToSteps:
  - "Select Character Mode for arbitrary-length tokens or Pattern Mode for structured masks, or click one of the eight developer presets."
  - "Configure string length or enter a pattern mask (such as DEV-XXXX-####-****) alongside your uppercase, lowercase, numeric, symbol, or Custom Characters pools."
  - "Apply optional filters—Exclude Ambiguous, Exclude Repeated, or Remove Characters—to enforce readability or parser safety."
  - "Set the batch count (up to 5,000 deduplicated outputs) and click Generate to compute strings and live bit-entropy scores client-side."
  - "Filter or sort the result table by length, entropy, or alphabetical order, star favorites, and copy or export the batch as TXT, CSV, or JSON."
---

Software backends consume random strings at nearly every architectural boundary: bearer API keys, session cookies, CSRF tokens, JWT HMAC secrets, compact database slugs, and promotional voucher codes. Unlike human-memorized login passwords, machine-to-machine strings must optimize for **encoding density, URL/header safety, exact structural masks, and bulk collision-free uniqueness**. **Random String Generator** synthesizes up to 5,000 deduplicated strings directly inside your browser via Web Crypto randomness (`window.crypto.getRandomValues`), offering custom alphabets, explicit character blocklists, pattern-mask templates, and real-time entropy telemetry with zero network transmission.

## Alphabet Encoding Density and Entropy Targets

Every symbol drawn uniformly from a deduplicated character set of size $R$ contributes $\log_2(R)$ bits of cryptographic entropy. Choosing the right alphabet balances token compactness against transport safety (avoiding URL percent-encoding or human transcription errors):

| Alphabet Standard | Pool Size ($R$) | Bits per Char ($\log_2 R$) | Min Length for 128 Bits | Min Length for 256 Bits | Canonical Engineering Use |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Decimal (`0-9`)** | 10 | 3.32 | 39 chars | 78 chars | Numeric order refs, rate-limited verification codes |
| **Hexadecimal / Base16 (`0-9a-f`)** | 16 | 4.00 | 32 chars | 64 chars | Cryptographic salts, session IDs, SHA-compatible keys |
| **Crockford Base32 (No `I,L,O,U`)** | 32 | 5.00 | 26 chars | 52 chars | Case-insensitive human-entered vouchers and recovery codes |
| **Base58 (No `0,O,I,l`)** | 58 | 5.86 | 22 chars | 44 chars | Ambiguity-free invite links, wallet/key identifiers |
| **Alphanumeric / Base62 (`A-Za-z0-9`)** | 62 | 5.95 | 22 chars | 44 chars | Compact API bearer tokens, NanoID-like database keys |
| **Base64url (`A-Za-z0-9-_`)** | 64 | 6.00 | 22 chars | 43 chars | OAuth PKCE verifiers, URL query parameters, JWT segments |
| **Printable ASCII-94** | 94 | 6.55 | 20 chars | 40 chars | High-density internal secrets stored strictly in env vaults |

As a rule of thumb aligned with OWASP session management guidance, allocate at least **128 bits of entropy** for bearer API tokens and session identifiers (preventing exhaustive guessing across the public internet) and **256 bits** for symmetric signing keys such as HMAC-SHA256 JWT secrets.

## Pattern-Mask Syntax for Vouchers, Keys, and Prefixed Tokens

When marketing campaigns, game-key distributors, or enterprise SaaS APIs require predictable formatting—such as fixed vendor prefixes, hyphenated readability groups, or strict digit slots—switch from Character Mode to **Pattern Mode**. Each placeholder token expands dynamically from a CSPRNG pool while every other character passes through literally:

- **`X` or `U`**: Random uppercase ASCII letter (`A–Z`, or 24 letters when `O` and `I` are excluded via **Exclude Ambiguous**).
- **`x` or `L`**: Random lowercase ASCII letter (`a–z`, omitting `l` under ambiguity filtering).
- **`9`, `#`, or `N`**: Random decimal digit (`0–9`, omitting `0`, `1`, and `8` when ambiguity filtering is active).
- **`S`**: Random special punctuation symbol.
- **`*`**: Random alphanumeric character (`A–Z`, `a–z`, `0–9`).

### Calculating Coupon Code Enumeration Risk
Pattern readability introduces a hidden security trap if variable slots are too sparse. Take the built-in **Coupon Code** template `PROMO-XXXX-2026` with **Exclude Ambiguous** enabled: 4 uppercase slots across 24 non-ambiguous letters create $24^4 = 331{,}776$ total codes ($\approx 18.3$ bits). If you issue 5,000 active codes from that space, roughly 1 in every 66 random guesses hits a valid discount! For single-use monetary vouchers without aggressive rate limiting, expand the mask to at least 8–10 ambiguity-free alphanumeric slots (such as `PROMO-XXXX-XXXX-XXXX`, $\approx 55$ bits), keeping guessing probability negligibly low even with tens of thousands of active coupons.

## Designing Leak-Detectable API Keys and Safe Verification

Modern developer platforms (Stripe `sk_live_...`, GitHub `ghp_...`, Slack `xoxb-...`) prepend short, deterministic prefixes to 32-character or 48-character random bodies. Static prefixes let automated scanners detect leaked credentials in pull requests, CI logs, and client bundles within seconds—while preserving full body entropy. You can also append a short 6-character Base62 CRC32 checksum to catch accidental copy-paste truncation before an API request even reaches your authentication database.

### Deduplication Guarantees and Custom Alphabet Tuning
When bulk-generating up to 5,000 strings—whether seeding synthetic primary keys, invite tokens, or QA fuzz inputs—this workspace tracks outputs in a JavaScript `Set` so duplicate entries are discarded before rendering or exporting. Combine the **Custom Characters** and **Remove Characters** fields whenever a downstream protocol enforces strict lexical constraints: for example, enter `0123456789ABCDEFGHJKMNPQRSTVWXYZ` to produce Crockford Base32 vouchers that remain unambiguous under OCR scanning and case-insensitive phone support, or exclude `-` and `_` when legacy DNS labels and Kubernetes resource names restrict identifiers to lowercase alphanumeric tokens.

Once generated, handle backend API keys with two non-negotiable defensive practices:

1. **Hash API keys at rest**: Store only a cryptographic digest (such as SHA-256) of high-entropy API keys in your database, showing the plaintext secret to the user exactly once upon creation. Unlike short human passwords, a 256-bit CSPRNG API key cannot be dictionary-cracked from a fast hash.
2. **Compare tokens in constant time**: Never validate raw secrets or HMAC signatures with `===`, which leaks prefix match length through microsecond execution timing. Use constant-time comparison primitives in production code:

```javascript
import crypto from "node:crypto";

// Generate equivalent 256-bit URL-safe token via CLI: openssl rand -base64 32 | tr '+/' '-_' | tr -d '='
export function verifyBearerToken(providedToken, storedSha256Hex) {
  const providedDigest = crypto.createHash("sha256").update(providedToken, "utf8").digest();
  const expectedDigest = Buffer.from(storedSha256Hex, "hex");
  if (providedDigest.length !== expectedDigest.length) return false;
  return crypto.timingSafeEqual(providedDigest, expectedDigest);
}
```

## Connecting Generated Strings to Adjacent Developer Utilities

Once you mint a 64-character signing secret, put it straight to work generating and validating API webhook signatures in our [HMAC Generator](/en/tools/hmac-generator). Need to pack prefixed `client_id:client_secret` credentials into HTTP `Authorization: Basic` headers or URL-safe Base64url segments? Pass them through the [Base64 Encoder](/en/tools/base64-encode). And if your database schema specifically requires standard 128-bit or chronologically indexed B-Tree primary keys rather than custom-length strings, switch over to the [UUID Generator](/en/tools/uuid-generator) for native RFC 9562 `v4` and `v7` identifiers.
