---
metaTitle: "Base64 Encoder Online | Text, Binary & Data URI to Base64 (RFC 4648)"
metaDescription: "Encode UTF-8 text, JSON payloads, images, and binary files into standard or URL-safe Base64 strings. Features live Data URI generation and byte-expansion metrics."
metaKeywords: "base64 encode, base64 encoder, encode text to base64, image to base64 data uri, url safe base64 encoder, rfc 4648 base64, utf-8 base64 encoding"
title: "Base64 Encoder — Text, File & Data URI Encoding Tool"
shortDescription: "Encode UTF-8 strings, JSON payloads, images, and binary files into RFC 4648 standard or URL-safe Base64 format with instant Data URI generation and 100% client-side execution."
faqs:
  - question: "What is Base64 encoding used for?"
    answer: "Base64 encoding converts raw binary streams, images, cryptographic keys, and multi-byte UTF-8 text into a 64-character ASCII alphabet so they can travel across 7-bit text protocols (HTTP headers, JSON bodies, XML nodes, and SMTP MIME attachments) without control-character corruption."
  - question: "Why does Base64 encoding increase payload size by 33%?"
    answer: "Base64 maps every 3 bytes of input (24 bits) into 4 ASCII characters (6 bits per character). Because 4 bytes of ASCII output represent 3 bytes of binary input, the encoded size increases by a 4:3 ratio (33.3%), plus up to 2 '=' padding characters when input length is not a multiple of 3."
  - question: "How do I generate an HTML or CSS Data URI with Base64?"
    answer: "Upload any PNG, JPEG, WebP, or SVG file into the encoder. The tool automatically prepends the RFC 2397 header (e.g., data:image/png;base64,) to the encoded payload so you can embed it directly into an HTML <img> tag or CSS background-image rule."
  - question: "What is the difference between Standard Base64 and URL-Safe Base64 (Base64url)?"
    answer: "Standard Base64 (RFC 4648 §4) uses '+' for index 62 and '/' for index 63, which conflict with URL query space encoding and path separators. URL-Safe Base64 (RFC 4648 §5) substitutes '-' for '+' and '_' for '/', making the output safe for URLs, filenames, and JWT headers/payloads."
  - question: "How does this encoder avoid JavaScript btoa() Unicode errors?"
    answer: "Browser-native window.btoa() only accepts Latin1 (ISO-8859-1) code points and throws an InvalidCharacterError on UTF-8 emojis or non-ASCII scripts. Our encoder serializes strings into a UTF-8 Uint8Array via TextEncoder before applying the 6-bit Base64 transformation."
features:
  - "Real-time RFC 4648 §4 (Standard) and §5 (URL-Safe Base64url) encoding"
  - "Full multi-byte UTF-8, Unicode, and Emoji byte-stream serialization via TextEncoder"
  - "Drag-and-drop binary and text file encoder (TXT, JSON, XML, SVG, PNG, JPG, WebP)"
  - "Automatic RFC 2397 Data URI generator with MIME-type detection and image preview"
  - "Live byte-size expansion analyzer comparing raw input bytes vs encoded ASCII length"
  - "100% client-side in-browser execution — zero network transmission or server logging"
useCases:
  - "Generating inline CSS and HTML Data URIs for small icons and critical UI assets"
  - "Encoding binary documents and cryptographic signatures for JSON REST and GraphQL APIs"
  - "Constructing HTTP Basic Authentication headers (Authorization: Basic base64(user:pass))"
  - "Producing URL-safe Base64url tokens for OAuth state parameters and JWT segments"
  - "Encoding multi-line configuration files and TLS certificates for Kubernetes Secrets"
howToSteps:
  - "Ensure the 'Encode' mode is active in the workspace toolbar."
  - "Type or paste your UTF-8 text, JSON payload, or upload a binary/image file into the input panel."
  - "Toggle 'URL-Safe' if the encoded string will be embedded inside a URL path, query string, or JWT."
  - "Inspect the input-to-output byte size delta and copy or download the generated Base64 string or Data URI."
---

## Technical Reference: RFC 4648 Base64 Encoding Architecture

**Base64 encoding** is a binary-to-text serialization algorithm standardized in **RFC 4648**. Its primary engineering purpose is to transform arbitrary 8-bit octets (binary files, UTF-8 byte arrays, cryptographic hashes, or serialized structures) into a restricted 64-character subset of US-ASCII that survives transport through text-only parsers, SMTP gateways, HTTP headers, and JSON string properties without byte stripping or control-character misinterpretation.

---

## Bitwise Mechanics: The 24-Bit Quantum Transformation

Modern computing architectures store data in 8-bit bytes (octets, $2^8 = 256$ possible values), whereas Base64 represents data in **6-bit sextets** ($2^6 = 64$ possible values). The encoder processes the input byte stream in contiguous **24-bit groups (3 bytes)** and partitions each group into **four 6-bit indices**:

$$\text{3 Octets } (3 \times 8 = 24\text{ bits}) \longrightarrow \text{4 Sextets } (4 \times 6 = 24\text{ bits})$$

### Step-by-Step Bitwise Walkthrough (Encoding `"Man"`)

| Stage | Byte / Sextet Breakdown | Values |
|:---|:---|:---|
| **1. ASCII Characters** | `M` · `a` · `n` | Decimal `77` · `97` · `110` |
| **2. 8-Bit Binary Stream** | `01001101` `01100001` `01101110` | 24 contiguous bits |
| **3. Regroup into 6-Bit Sextets** | `010011` · `010110` · `000101` · `101110` | 4 groups of 6 bits |
| **4. 6-Bit Decimal Indices** | `19` · `22` · `5` · `46` | Range `0–63` |
| **5. RFC 4648 Alphabet Lookup** | `T` · `W` · `F` · `u` | Encoded output: `"TWFu"` |

---

## Padding Rules (`=`) and Modulo-3 Alignment

When the input byte length $L$ is not an exact multiple of 3 ($L \bmod 3 \neq 0$), the final 24-bit quantum is incomplete. The encoder zero-pads the remaining bits on the right to reach the nearest 6-bit boundary and appends `=` pad characters so the output length is always a multiple of 4:

1. **$L \bmod 3 = 0$ (3 bytes in final block)**: Produces 4 Base64 characters and **zero** `=` padding characters.
2. **$L \bmod 3 = 1$ (1 byte = 8 bits in final block)**: Padded with 4 zero bits to form 12 bits (2 sextets = 2 Base64 characters), followed by **two** pad characters (`==`).
3. **$L \bmod 3 = 2$ (2 bytes = 16 bits in final block)**: Padded with 2 zero bits to form 18 bits (3 sextets = 3 Base64 characters), followed by **one** pad character (`=`).

Overall encoded byte size $S_{\text{out}}$ for an input of $n$ bytes is governed by:

$$S_{\text{out}} = 4 \times \left\lceil \frac{n}{3} \right\rceil$$

---

## Standard Base64 (RFC 4648 §4) vs. Base64url (RFC 4648 §5)

| Specification | Index 62 | Index 63 | Padding (`=`) | Primary Protocol Applications |
|:---|:---:|:---:|:---:|:---|
| **Standard Base64 (RFC 4648 §4)** | `+` | `/` | Mandatory | Data URIs (`data:image/png;base64,...`), HTTP Basic Auth, Kubernetes Secrets, PEM certificates |
| **URL-Safe Base64url (RFC 4648 §5)** | `-` | `_` | Optional / Stripped | JSON Web Tokens (JWT), OAuth 2.0 PKCE `code_challenge`, URL query tokens, filesystem-safe IDs |
| **MIME Base64 (RFC 2045)** | `+` | `/` | Mandatory (CRLF at 76 chars) | SMTP email attachments and S/MIME payloads |

---

## Multi-Byte UTF-8 Encoding & Data URI Best Practices

- **UTF-8 Serialization before Encoding**: Never pass multi-byte Unicode strings directly into legacy `window.btoa()`. Always encode the string into UTF-8 bytes via `new TextEncoder().encode(str)` first so characters outside `U+0000..U+00FF` (such as accented characters, CJK ideographs, and emojis) are preserved without throwing `DOMException: InvalidCharacterError`.
- **Data URI Size Thresholds**: Embedding assets via `data:<mediatype>;base64,<data>` eliminates HTTP round-trips for icons under **4 KB – 8 KB**, but inflates payload size by ~33.3% before gzip/Brotli compression. Keep large photographs and fonts as external cacheable assets.
