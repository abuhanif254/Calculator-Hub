---
metaTitle: "Base64 Encode & Decode | RFC 4648, Base64url & Data URI"
metaDescription: "Encode and decode UTF-8 text, JSON, images, and binary files in RFC 4648 standard or URL-safe Base64url with live Data URIs and byte metrics."
metaKeywords: "base64 encode, base64 encoder, base64 decode, base64url encoder, rfc 4648 base64, utf-8 base64, image to base64 data uri, online base64 tool, jwt base64url"
title: "Base64 Encoder — Text, File & Data URI Encoding Tool"
shortDescription: "Encode and decode UTF-8 text, JSON payloads, images, and binary files using RFC 4648 standard or URL-safe Base64url with instant Data URI output and live byte-expansion metrics, 100% client-side."
faqs:
  - question: "Why does Base64 encoding expand payload size by roughly 33.3%?"
    answer: "Base64 converts every 3 input bytes (24 bits) into 4 US-ASCII output characters (6 bits per character). Representing 3 raw octets with 4 ASCII bytes creates a fixed 4:3 expansion ratio of 33.33%, plus 1 or 2 '=' padding characters whenever the input byte length is not divisible by 3."
  - question: "What changes when you switch from Standard Base64 (RFC 4648 Section 4) to URL-Safe Base64url (Section 5)?"
    answer: "Standard Base64 assigns '+' to sextet 62 and '/' to sextet 63, which collide with URL query space encoding and path delimiters. URL-Safe Base64url replaces '+' with '-', substitutes '/' with '_', and strips trailing '=' padding characters so tokens pass safely through URLs, filenames, and JWT segments."
  - question: "Why does native JavaScript btoa() fail on emojis and non-ASCII text, and how does this tool prevent that?"
    answer: "Browser window.btoa() only accepts Latin-1 code points (U+0000 to U+00FF) and throws a DOMException InvalidCharacterError on multi-byte Unicode scripts or emojis. This encoder first serializes text into raw UTF-8 bytes with TextEncoder before running the 6-bit conversion, and validates decoded bytes with fatal UTF-8 TextDecoder."
  - question: "Is Base64 encoding a form of encryption or a safe way to hide API keys and passwords?"
    answer: "No. Base64 is a completely reversible public encoding format with zero cryptographic keys or secrecy. Anyone can decode a Base64 string in milliseconds; never treat Base64-encoded Kubernetes Secrets or HTTP Basic Auth headers as encrypted unless protected by TLS in transit and real encryption at rest."
  - question: "When should you inline an image as an RFC 2397 Data URI instead of serving an external file?"
    answer: "Data URIs (data:image/png;base64,...) work well for tiny UI icons, single-pixel spacers, or critical SVGs under roughly 4 KB where avoiding an extra HTTP request matters. Larger photos and fonts should stay external so browsers can cache them independently across pages without inflating CSS or HTML payloads by 33%."
features:
  - "Bidirectional RFC 4648 Section 4 (Standard) and Section 5 (URL-Safe Base64url without '=' padding) encoding and decoding with one-click mode swap"
  - "Strict UTF-8 byte serialization via TextEncoder and fatal UTF-8 decoding via TextDecoder, preventing btoa() errors on CJK characters, accents, and emojis"
  - "Drag-and-drop image and binary file encoding that automatically emits RFC 2397 Data URIs with MIME type detection and instant image previews"
  - "Smart clipboard paste detection that recognizes valid Base64 payloads and switches directly into Decode mode"
  - "Live input and output statistics tracking character count, line count, and exact UTF-8 byte delta to quantify 4:3 encoding overhead"
  - "Monaco editor with automatic dark/light theme support, local draft persistence, file download, and 100% offline client-side execution"
useCases:
  - "Building HTTP Basic Authentication headers (Authorization: Basic base64(username:password)) from UTF-8 credentials without shell newline bugs"
  - "Generating unpadded Base64url segments for JSON Web Token (JWT) headers, OAuth 2.0 PKCE code challenges, and URL-safe state parameters"
  - "Inlining small PNG, WebP, or SVG icons as RFC 2397 Data URIs inside CSS stylesheets, standalone HTML emails, or component bundles"
  - "Encoding PEM TLS certificates, service-account JSON credentials, and configuration blobs for Kubernetes Secret YAML manifests"
  - "Embedding binary signatures, PDF buffers, or encrypted ciphertexts safely inside JSON REST APIs and GraphQL string fields"
  - "Performing round-trip verification on webhook payloads and log tokens by toggling between Encode and Decode modes in one click"
howToSteps:
  - "Select Encode or Decode in the top toolbar, or click Paste to let the tool detect an existing Base64 string and switch modes automatically."
  - "Enter UTF-8 text, JSON, or credentials into the left Monaco editor, or drag and drop an image or binary file onto the upload zone."
  - "Enable the URL-Safe switch whenever the encoded string will be embedded inside a URL query parameter, route segment, filename, or JWT."
  - "Check the live character and UTF-8 byte counters to verify exact expansion overhead, and preview generated Data URIs for uploaded images."
  - "Click Copy or Download to export the encoded string, or press Swap to feed the output back into the input pane for round-trip verification."
---

**Base64** is a binary-to-text encoding scheme standardized in **RFC 4648** that maps arbitrary 8-bit binary octets onto a safe 64-character subset of US-ASCII. Whenever raw bytes—images, cryptographic digests, TLS certificates, or multi-byte UTF-8 strings—must pass through text-only transport layers such as JSON strings, XML elements, HTTP headers, YAML manifests, or SMTP MIME messages, Base64 guarantees that non-printable control bytes (`0x00–0x1F`) and high-bit octets (`0x80–0xFF`) survive without truncation or character-set corruption. Running this encoder directly in your browser ensures credentials, private keys, and internal payloads never leave local memory.

## Bitwise Mechanics: The 24-Bit Quantum and Modulo-3 Padding

Computers store raw data in 8-bit octets (256 possible byte values), whereas Base64 encodes 6 bits per printable symbol (64 possible values: `A–Z` for `0–25`, `a–z` for `26–51`, `0–9` for `52–61`, plus two dialect-dependent symbols for `62` and `63`). Because the least common multiple of 8 and 6 is **24**, the encoder reads the input stream in contiguous **3-byte (24-bit) quanta** and splits each quantum into **four 6-bit sextets**.

Encoding the 3-byte ASCII string `"Man"` demonstrates exact alignment with zero padding:

| Pipeline Stage | Byte / Sextet Breakdown | Resulting Values |
| :--- | :--- | :--- |
| **1. Input Characters** | `M`, `a`, `n` | Decimal `77`, `97`, `110` (`0x4D 0x61 0x6E`) |
| **2. 8-Bit Octet Stream** | `01001101` `01100001` `01101110` | 24 contiguous bits |
| **3. Regroup Into 6-Bit Sextets** | `010011` `010110` `000101` `101110` | 4 six-bit groups |
| **4. Sextet Decimal Indices** | `19`, `22`, `5`, `46` | Lookup range `0–63` |
| **5. RFC 4648 Alphabet Output** | `T`, `W`, `F`, `u` | Encoded string: `TWFu` |

When the input byte length `n` is not divisible by 3, the final 24-bit quantum is incomplete. The encoder appends zero bits on the right to finish the final active 6-bit group, then appends `=` pad characters in Standard Base64 so the total output length remains a multiple of 4:

- **`n mod 3 == 0`**: Complete 24-bit block produces 4 Base64 characters and **no** `=` padding.
- **`n mod 3 == 1`**: 1 trailing byte (8 bits) receives 4 trailing zero bits to form 2 sextets (2 characters), followed by **`==`**.
- **`n mod 3 == 2`**: 2 trailing bytes (16 bits) receive 2 trailing zero bits to form 3 sextets (3 characters), followed by **`=`**.

Under RFC 4648 Section 3.5 (Canonical Encoding), those trailing pad bits must always remain zero so two distinct Base64 strings can never silently decode to identical bytes—an important security check in signed tokens and deduplicated hashes. For any input of `n` bytes, standard padded output length is `4 * ceil(n / 3)` bytes, whereas unpadded Base64url length is `ceil(4 * n / 3)` bytes—converging to a **33.33% size overhead** before gzip or Brotli transport compression.

## RFC 4648 Variants and Protocol Specifications

Although developers frequently refer to "Base64" as a single format, four active RFC profiles differ in alphabet characters, padding rules, and line wrapping:

| Variant | Standard | Index 62 | Index 63 | Padding (`=`) | Line Wrapping | Primary Protocol Uses |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Standard Base64** | RFC 4648 §4 | `+` | `/` | Required | None | Data URIs, HTTP Basic Auth, Kubernetes Secrets, JSON binary fields |
| **URL-Safe Base64url** | RFC 4648 §5 | `-` | `_` | Optional / Omitted | None | JWT segments, OAuth 2.0 PKCE `code_challenge`, URL query tokens |
| **MIME Base64** | RFC 2045 | `+` | `/` | Required | CRLF every 76 chars | SMTP email attachments and `Content-Transfer-Encoding: base64` |
| **PEM Base64** | RFC 7468 | `+` | `/` | Required | LF every 64 chars | X.509 TLS certificates, PKCS#8 keys, SSH key blocks |

When decoding, this tool automatically normalizes `-` back to `+`, `_` back to `/`, strips embedded whitespace/line breaks from MIME or PEM blocks, and restores omitted `=` padding before converting octets back into UTF-8 text.

## Avoiding UTF-8 `btoa()` Errors and Shell Newline Traps

Two classic implementation bugs cause hours of authentication and signature debugging in production codebases:

1. **JavaScript `window.btoa()` Unicode Failure**: Native `btoa()` maps each UTF-16 code unit directly to a single byte and throws `InvalidCharacterError` on any character above `U+00FF` (such as `"café ☕"` or CJK text). Always serialize strings to UTF-8 bytes with `TextEncoder` first:

```javascript
function toBase64Url(input) {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
```

2. **Trailing Newlines in CLI and Kubernetes Workflows**: Running `echo "admin:secret" | base64` appends a hidden `\n` (`0x0A`) byte before encoding, silently invalidating HTTP Basic Auth headers and Kubernetes `Secret` `data:` fields in GitOps manifests. Always use `printf` without a trailing newline—and pass `-w 0` on GNU coreutils to suppress 76-character line wraps, emitting the exact token `YWRtaW46c2VjcmV0`:

```bash
printf '%s' 'admin:secret' | base64 -w 0
```

## Data URI Thresholds and Security Boundaries

Dropping an image onto the upload panel generates an **RFC 2397 Data URI** (`data:image/png;base64,...`) ready for `<img src="...">` tags or CSS `url(...)` rules. Inlining eliminates a network round-trip for critical icons under **4 KB**, but larger assets pay a triple penalty: 33% raw payload inflation, lost independent HTTP caching across routes, and slower CSSOM parsing when embedded inside render-blocking stylesheets. Always benchmark bundled stylesheet weights before inlining vector sprites or raster thumbnails across multi-page web applications. For specialized image conversion and reverse extraction, use our [Image to Base64](/en/tools/image-to-base64) and [Base64 to Image](/en/tools/base64-to-image) utilities.

Finally, remember that **Base64 is encoding, never encryption**. Any encoded payload can be inspected instantaneously with our [Base64 Decoder](/en/tools/base64-decode). To inspect signed Base64url claims, open our [JWT Decoder](/en/tools/jwt-decoder); to escape special URI characters without 33% bloat, switch to our [URL Encoder](/en/tools/url-encoder); and when you need genuine cryptographic integrity or one-way digests, pair your workflow with our [HMAC Generator](/en/tools/hmac-generator) or [Hash Generator](/en/tools/hash-generator).
