---
title: "Understanding JWT (JSON Web Tokens): A Complete Guide"
description: "Learn how JWTs are structured, how to decode them safely, and why you should never store sensitive data in the payload."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "jwt-decoder"
relatedType: "tool"
faqs:
  - question: "What is the difference between a signed JWT (JWS) and an encrypted JWT (JWE)?"
    answer: "A standard signed JWT (JSON Web Signature, RFC 7515) encodes its header and payload in readable Base64Url text and appends a cryptographic signature so recipients can verify integrity and sender authenticity. Anyone who intercepts a JWS can decode and read its claims. A JSON Web Encryption token (JWE, RFC 7516) encrypts the payload with symmetric content encryption and key wrapping so unauthorized parties cannot inspect the underlying data."
  - question: "How do exp, nbf, and iat timestamps work inside a JWT payload?"
    answer: "The registered claims exp (expiration time), nbf (not before), and iat (issued at) store integer Unix timestamps measured in seconds since January 1, 1970 UTC—not milliseconds. Verifiers reject any token where current UTC time is greater than or equal to exp, or earlier than nbf, typically allowing 30 to 60 seconds of clock-skew leeway across distributed servers."
  - question: "Why is pasting a production JWT into a server-logged online decoder dangerous?"
    answer: "Most JWTs act as bearer credentials: any party holding a valid, unexpired token can replay it in an Authorization header to impersonate the user or service account. Submitting a live token to a third-party server exposes that credential in HTTP access logs, analytics pipelines, or proxy caches. A client-side browser decoder executes Base64Url parsing locally in memory without transmitting the token."
  - question: "What causes alg: none and RS256-to-HS256 key-confusion vulnerabilities?"
    answer: "Both flaws occur when a verification library blindly trusts the alg field inside an unverified JWT header. In an alg: none attack, an attacker strips the signature and sets alg to none so naive libraries skip verification. In a key-confusion attack, an attacker switches RS256 to HS256 and signs the token using the server's public RSA key as an HMAC shared secret. Always enforce an explicit server-side algorithm allowlist."
  - question: "Should web applications store JWTs in HttpOnly cookies or localStorage?"
    answer: "For browser-based web applications, storing session JWTs in HttpOnly, Secure, SameSite cookies is safer than storing them in localStorage or sessionStorage. Any Cross-Site Scripting (XSS) vulnerability can read localStorage directly via JavaScript and exfiltrate the token, whereas HttpOnly prevents script access entirely while SameSite=Lax or Strict mitigates Cross-Site Request Forgery (CSRF)."
---

A **JSON Web Token (JWT)**, defined in RFC 7519, is a compact, URL-safe credential format used to exchange verifiable claims between services as three dot-delimited Base64Url segments: `Header.Payload.Signature`. Instead of querying a central session database on every API call, resource servers validate the signature mathematically using a shared secret or public key.

One security boundary prevents most production flaws: **standard JWTs (JWS) are signed for integrity, not encrypted for confidentiality**. Any party intercepting the token can Base64Url-decode the header and payload without a key. To inspect claims and audit expiration timestamps without exposing live bearer credentials to server logs, use our zero-cloud [JWT Decoder Tool](/en/tools/jwt-decoder), which runs entirely in local browser memory.

## JWT Anatomy, Base64Url Encoding, and Claims

Every signed JWT joins three Base64Url strings with ASCII periods (`0x2E`):

```text
jwt = base64url(header_json) + "." + base64url(payload_json) + "." + base64url(signature_bytes)
signing_input = base64url(header_json) + "." + base64url(payload_json)
```

Unlike standard Base64 (RFC 4648 Section 4), **Base64Url** replaces `+` with `-`, replaces `/` with `_`, and omits trailing `=` padding so tokens travel cleanly inside HTTP `Authorization: Bearer` headers and URLs without percent-encoding. Because every 3 input bytes map to 4 Base64 characters, unpadded output length equals `chars = ceil(4 × bytes / 3)`.

### Header (`JOSE Header`)

The header specifies token metadata and cryptographic parameters:

- **`alg`**: Signing algorithm from RFC 7518, such as `HS256`, `RS256`, `ES256`, or `EdDSA`.
- **`typ`**: Media type hint, conventionally `"JWT"`.
- **`kid`**: Key ID identifying which rotating secret or public key in a JWKS (`/.well-known/jwks.json`) endpoint signed the token.

### Payload (`Claims Set`)

The payload holds **claims** about the subject and token lifecycle:

- **Registered claims**: Standardized keys in RFC 7519—`iss` (issuer), `sub` (subject), `aud` (audience), `exp` (expiration Unix seconds), `nbf` (not-before timestamp), `iat` (issued-at timestamp), and `jti` (unique token ID).
- **Public and private claims**: Custom fields like `scope`, `roles`, or `tenant_id`. Keep payloads lean since every byte travels on every HTTP request.

### Signature

The verifier hashes the ASCII `signing_input` (`Header.Payload`) with the configured algorithm and key. Symmetric `HS256` computes `HMAC-SHA256(signing_input, secret_key)`, whereas asymmetric `RS256`, `ES256`, and `EdDSA` sign with a private key and verify against a public key.

## Worked Decoding and Expiration Verification Example

Suppose an API gateway rejects an access token issued at `2026-11-26 20:00:00 UTC` (Unix timestamp `1795723200`).

1. **Calculate Base64Url segment lengths**: Take a `27-byte` UTF-8 header `{"alg":"HS256","typ":"JWT"}` and a `72-byte` payload `{"sub":"usr_4829","aud":"api.example.com","iat":1795723200,"exp":1795724100}`:
   - Header: `ceil(4 × 27 / 3) = 36` chars.
   - Payload: `ceil(4 × 72 / 3) = 96` chars.
   - `HS256` (`256-bit` = `32-byte` digest): `ceil(4 × 32 / 3) = 43` chars.
   - Compact token length: `36 + 1 + 96 + 1 + 43 = 177` chars (`184` bytes with `"Bearer "`).
2. **Compute token lifetime (`TTL`)**: `1795724100 − 1795723200 = 900 seconds` (`15 minutes`).
3. **Verify at `1795723650` (`20:07:30 UTC`)**: Remaining TTL is `1795724100 − 1795723650 = 450 seconds` (`7.5 minutes`). Valid.
4. **Verify at `1795724115` (`20:15:15 UTC`) with `30 s` clock-skew leeway**: Strict comparison fails (`15 s` past `exp`), but leeway extends acceptance to `1795724130`, tolerating brief NTP drift before returning `HTTP 401`.

A common validator bug passes JavaScript `Date.now()` (`1795723650000` ms) without dividing by `1000`, making valid tokens appear expired by millennia.

## Signing Algorithms and Performance Benchmarks

Algorithm choice governs key distribution, token footprint, and verification throughput:

| Algorithm | Cryptography | Key Model | Signature Bytes | Base64Url Chars | Verify Speed | Best Production Use |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `HS256` | Symmetric HMAC-SHA256 | Shared secret (`≥ 256-bit`) | 32 | 43 | Fastest | Single-service or tightly coupled APIs |
| `HS512` | Symmetric HMAC-SHA512 | Shared secret (`≥ 512-bit`) | 64 | 86 | Very fast | High-margin internal MACs |
| `RS256` | Asymmetric RSA + SHA-256 | Private sign / JWKS verify | 256 (2048-bit) | 342 | Moderate | Legacy enterprise OIDC interoperability |
| `ES256` | Asymmetric ECDSA P-256 | Private sign / JWKS verify | 64 | 86 | Fast | Modern OAuth 2.0 / OIDC microservices |
| `EdDSA` | Asymmetric Ed25519 | Private sign / JWKS verify | 64 | 86 | Fast | High-throughput APIs avoiding nonce bugs |
| `none` | Unsecured (`RFC 7519 §6`) | None | 0 | 0 | N/A | Strictly forbidden in authentication |

## Security Pitfalls, Revocation, and Client-Side Inspection

Most JWT breaches result from misconfiguration rather than broken cryptography:

- **Confidentiality leaks in JWS payloads**: Never store passwords, API secrets, SSNs, or regulated PII inside a standard JWS payload. When confidentiality is required, use **JWE (RFC 7516)** encryption or opaque server-side reference tokens.
- **Unrestricted `alg` header trust**: Always enforce an explicit algorithm allowlist (e.g., `algorithms: ["ES256"]`) on the server. Reject `"none"` tokens and never pass an RSA public key into an `HS256` verifier.
- **Stateless revocation limits**: Because valid JWTs authenticate without database lookups until `exp`, keep access-token TTLs short (`5–15 minutes`), pair them with rotating `HttpOnly` refresh tokens, and use a compact Redis `jti` denylist bounded by the access-token TTL for immediate logouts.
- **Safe debugging**: Pasting live tokens into server-backed decoders leaks active credentials into remote access logs. Use our client-side [JWT Decoder Tool](/en/tools/jwt-decoder) to parse headers, claims, and UTC timestamps offline—and supply your signing key separately whenever cryptographic signature verification is needed.
