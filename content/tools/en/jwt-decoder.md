---
metaTitle: "JWT Decoder & Inspector — Parse Claims, Headers & Expiry"
metaDescription: "Decode JSON Web Tokens locally in your browser. Inspect JWS headers, payload claims, exp/nbf timelines, and alg security warnings with zero server calls."
metaKeywords: "jwt decoder, decode jwt, json web token parser, jwt analyzer, jwt expiration checker, parse jwt online, jwt payload viewer, jwt signature algorithm, jwt debugger, jwt token reader, base64url decode jwt, jwt security analysis"
title: "JWT Decoder Tool"
shortDescription: "Inspect JSON Web Tokens locally in real time. Decode Base64url headers and payload claims, evaluate Unix exp/iat/nbf timelines, and flag risky signing algorithms without sending tokens over the network."
faqs:
  - question: "Why can this tool read my JWT header and payload without the signing secret or public key?"
    answer: "Standard JSON Web Tokens use JWS (JSON Web Signature, RFC 7515), where the header and payload are merely Base64url-encoded JSON, not encrypted. The signature proves integrity and issuer authenticity, but anyone who possesses a JWS string can decode its claims without a key."
  - question: "Does decoding a JWT here verify that its cryptographic signature is authentic?"
    answer: "No. This inspector validates structural grammar, decodes Base64url UTF-8 JSON, evaluates timestamp windows, and flags header risks such as 'alg: none', but true signature verification must happen against your trusted HMAC secret or JWKS public key on the verifying server."
  - question: "Why did a five-segment token fail to parse in this JWT decoder?"
    answer: "A five-part dot-separated token (header.encrypted_key.iv.ciphertext.tag) is a JWE (JSON Web Encryption, RFC 7516) token rather than a three-part signed JWS token. Because its payload is encrypted ciphertext, it cannot be decoded without the recipient's private decryption key."
  - question: "Why do my exp and iat timestamps show a date thousands of years in the future?"
    answer: "RFC 7519 defines NumericDate claims (exp, nbf, iat) in whole Unix seconds since 1970-01-01T00:00:00Z, not JavaScript milliseconds. Passing Date.now() instead of Math.floor(Date.now() / 1000) inflates timestamps by a factor of 1,000 and breaks expiration enforcement."
  - question: "Is it safe to paste a staging or production OAuth Bearer token into this page?"
    answer: "All Base64url decoding, JSON parsing, and timestamp evaluation execute exclusively inside your local browser JavaScript engine with zero outbound API calls. Still, treat live production tokens cautiously, clear the workspace after debugging, and prefer short-lived staging tokens whenever possible."
features:
  - "Instant three-segment JWS parsing into pretty-printed Header and Payload JSON panels"
  - "RFC 4648 Section 5 Base64url decoding with automatic padding restoration and full UTF-8 claim support"
  - "Automated timeline evaluation for exp, iat, and nbf Unix timestamps with relative countdowns and expiration badges"
  - "Cryptographic algorithm detection (HS256, RS256, ES256, PS256, EdDSA) and immediate warnings for unsafe 'alg: none' tokens"
  - "One-click copy and JSON file download for decoded header and payload objects"
  - "Zero-network in-browser inspection so authentication tokens and internal claims never touch remote servers"
useCases:
  - "Debugging 401 Unauthorized and 403 Forbidden responses in React, Next.js, Vue, or mobile API clients"
  - "Verifying OpenID Connect ID tokens and OAuth 2.0 access token scopes issued by Auth0, Okta, Cognito, or Keycloak"
  - "Confirming that microservice identity issuers emit accurate exp, nbf, aud, and tenant claims before rollout"
  - "Auditing JWT headers during security reviews to confirm proper kid rotation and rejection of 'alg: none'"
  - "Inspecting custom RBAC role arrays and feature-flag claims injected by API gateways and edge middleware"
  - "Diagnosing clock-skew rejections between distributed backend nodes by comparing iat and nbf epoch values"
howToSteps:
  - "Copy the raw JWT string (strip any leading 'Bearer ' prefix if copied from an Authorization header)."
  - "Paste the three-part dot-separated token into the Encoded JWT input editor."
  - "Inspect the Token Analysis panel for structural validity, detected signing algorithm, and active or expired status."
  - "Review the formatted Header JSON for alg, typ, and kid metadata, then inspect Payload claims and human-readable exp/iat/nbf timestamps."
  - "Copy individual JSON sections or download them as .json files, then click the clear button when finished with sensitive tokens."
---

Stateless authentication across modern single-page applications, microservices, and OpenID Connect identity providers relies heavily on **JSON Web Tokens (RFC 7519)**. When an API gateway returns `401 Unauthorized` or a user unexpectedly lacks an admin permission, the fastest way to isolate the bug is to inspect the raw token's claims, issuer metadata, and expiration window. Because pasting live credentials into remote web decoders leaks active session tokens to third-party logs, this inspector runs every Base64url decode, JSON parse, and timestamp calculation locally inside your browser tab.

## Anatomy of JWS Compact Serialization vs. JWE

Most tokens encountered in `Authorization: Bearer <token>` headers use **JWS (JSON Web Signature, RFC 7515)** Compact Serialization — three Base64url-encoded segments joined by literal dots (`.`):

```text
BASE64URL(UTF8(JWS Protected Header)) || '.' || BASE64URL(JWS Payload) || '.' || BASE64URL(JWS Signature)
```

1. **Protected Header**: A JSON object declaring `alg` (signing algorithm), `typ` (typically `"JWT"` or `"at+jwt"` for RFC 9068 OAuth access tokens), and often `kid` (Key ID pointing to the signing key in the issuer's `/.well-known/jwks.json` endpoint).
2. **Payload (Claims Set)**: A JSON object carrying registered, public, and custom application claims. Because Base64url uses `-` and `_` instead of `+` and `/` and strips trailing `=` padding, the entire token remains safe inside HTTP headers and query parameters. (If you ever need to unpack standalone Base64url blobs outside a JWT, use the [Base64 Decode Tool](/en/tools/base64-decode).)
3. **Signature**: Raw cryptographic output computed over the exact ASCII string `<encodedHeader>.<encodedPayload>`. Modifying even a single character in the header or payload changes the digest and invalidates verification.

Do not confuse JWS with **JWE (JSON Web Encryption, RFC 7516)**. A JWE token has **five** dot-separated segments (`header.encrypted_key.iv.ciphertext.authentication_tag`) and conceals its payload with authenticated encryption (such as `A256GCM`), meaning it cannot be read without the matching private or symmetric decryption key.

## JWA Signing Algorithms and Key Models (RFC 7518)

The `alg` header selects the cryptographic specification from JSON Web Algorithms (RFC 7518). Choosing between symmetric and asymmetric families directly shapes your key-distribution risk profile:

| `alg` Value | Cryptographic Family | Key Model | Signature Size | Typical Architecture Fit |
| :--- | :--- | :--- | :--- | :--- |
| **`HS256` / `HS384` / `HS512`** | HMAC over SHA-2 | Symmetric shared secret | 32 / 48 / 64 bytes | Monoliths or tightly trusted internal services |
| **`RS256` / `RS384` / `RS512`** | RSASSA-PKCS1-v1_5 + SHA-2 | Asymmetric (2048–4096-bit RSA) | 256–512 bytes | Enterprise OIDC/OAuth 2.0 providers & legacy gateways |
| **`PS256` / `PS384` / `PS512`** | RSASSA-PSS + SHA-2 | Asymmetric (probabilistic RSA) | 256–512 bytes | High-assurance financial APIs (FAPI / Open Banking) |
| **`ES256` / `ES384` / `ES512`** | ECDSA (`P-256` / `P-384` / `P-521`) | Asymmetric elliptic curve | 64 / 96 / 132 bytes | Compact mobile, IoT, and high-throughput API gateways |
| **`EdDSA`** | Edwards-curve (`Ed25519`) | Asymmetric deterministic curve | 64 bytes | Modern zero-trust services prioritizing speed & tiny keys |
| **`none`** | Unsecured JWT (no signature) | None | 0 bytes | **Must be rejected** by every production verifier |

For symmetric `HS256` tokens, any service that can verify tokens holds the same shared secret needed to forge them (you can independently test raw HMAC-SHA256 digests with the [HMAC Generator](/en/tools/hmac-generator)). Asymmetric algorithms (`RS256`, `ES256`, `EdDSA`) isolate the private signing key inside the identity provider while every downstream API verifies tokens using only published public keys.

## Temporal Claims, NumericDate Precision, and Registered Metadata

RFC 7519 standardizes seven core registered claims that interoperable identity libraries enforce automatically:

- **`exp` (Expiration Time)**: Unix epoch **seconds** after which the token must be rejected.
- **`nbf` (Not Before)**: Unix epoch **seconds** before which the token is not yet valid.
- **`iat` (Issued At)**: Creation timestamp used for token age checks and forced re-authentication policies.
- **`iss` (Issuer)** & **`aud` (Audience)**: Strictly identify who minted the token and which exact API or client may accept it (preventing cross-service token replay).
- **`sub` (Subject)** & **`jti` (JWT ID)**: Identify the principal (typically an immutable user UUID rather than a mutable email) and assign a unique identifier for one-time-use revocation lists.

A frequent debugging surprise is **clock skew**: if an identity server's NTP clock sits 5 seconds ahead of an API node, a freshly issued token with `nbf == iat` will fail verification unless the verifier configures a small tolerance window (commonly 30–60 seconds). Equally common is mistakenly encoding millisecond timestamps (`Date.now()`) instead of whole seconds (`Math.floor(Date.now() / 1000)`). After copying complex nested payloads from this inspector, you can run deep formatting or schema inspection in the [JSON Formatter](/en/tools/json-formatter).

## Critical JWT Verification Pitfalls and Server-Side Hardening

Decoding a token reveals what the token *claims*; only server-side cryptographic verification proves those claims are trustworthy. Production middleware should enforce four non-negotiable defenses:

1. **Pin Expected Algorithms Explicitly**: Never derive the verification algorithm blindly from the untrusted `header.alg` field. Attackers exploit naive libraries via `"alg": "none"` downgrades or **RS256-to-HS256 algorithm confusion** (tricking a server into treating its own public RSA PEM certificate as an HMAC shared secret).
2. **Validate `iss`, `aud`, and `exp` Together**: Signature validity alone does not stop a valid token issued for `billing-staging` from being replayed against `billing-prod` if `aud` and `iss` are unchecked.
3. **Never Dereference Untrusted `jku` / `x5u` URLs or Raw `kid` Paths**: Resolve `kid` strictly via an exact in-memory lookup against your pre-configured JWKS cache — never interpolate `kid` into SQL queries, file paths, or SSRF-prone HTTP fetches.
4. **Keep Payloads Lean and Non-Confidential**: Never embed passwords, government IDs, or payment tokens inside a JWS payload, and keep claim sets small because every HTTP request repeats the full token inside its `Authorization` header.

```javascript
import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS = createRemoteJWKSet(new URL('https://auth.example.com/.well-known/jwks.json'));

const { payload } = await jwtVerify(token, JWKS, {
  algorithms: ['ES256', 'RS256'], // Reject 'none' and symmetric confusion
  issuer: 'https://auth.example.com/',
  audience: 'https://api.example.com',
  clockTolerance: '30s',
});
```

On the command line, engineers can also inspect an unverified JWS payload rapidly without extra packages using shell piping: `cut -d. -f2 <<< "$JWT" | tr '_-' '/+' | base64 -d 2>/dev/null | jq .`.
