---
metaTitle: "Base64 Decoder Online — UTF-8, URL-Safe & Image Preview"
metaDescription: "Decode Base64 and Base64url strings into UTF-8 text, JSON, or previewable images instantly in your browser with magic-byte detection and zero uploads."
metaKeywords: "base64 decode, base64 decoder, base64 to text, base64 to image, decode base64, base64 string decoder, base64 data uri decoder, url safe base64 decoder, online base64 decoder, utf-8 base64 decode, base64 security, base64 to json"
title: "Base64 Decode Tool"
shortDescription: "Decode standard RFC 4648 and URL-safe Base64 strings into readable UTF-8 text, formatted JSON, or downloadable images with automatic magic-byte sniffing directly inside your browser."
faqs:
  - question: "Why does JavaScript window.atob() corrupt emojis and non-ASCII text when decoding Base64?"
    answer: "The legacy window.atob() function maps each decoded byte directly onto an ISO-8859-1 (Latin-1) UTF-16 code unit rather than interpreting multi-byte UTF-8 sequences. A four-byte emoji or three-byte CJK character turns into garbled Latin-1 mojibake unless the raw Uint8Array is passed through TextDecoder('utf-8')."
  - question: "How does this decoder preview images when a Base64 string has no Data URI prefix?"
    answer: "After converting the Base64 alphabet back into raw bytes, the decoder inspects the opening magic-byte signature — such as 89 50 4E 47 for PNG, FF D8 FF for JPEG, 47 49 46 38 for GIF, RIFF/WEBP for WebP, or an XML/SVG header — to infer the MIME type and render an inline preview automatically."
  - question: "Why is a Base64 string whose unpadded length leaves a remainder of 1 modulo 4 always invalid?"
    answer: "Every Base64 character carries 6 bits of payload. A single trailing character yields only 6 bits, which is two bits short of forming a complete 8-bit byte; valid unpadded Base64 lengths therefore have modulo-4 remainders of 0, 2 (1 byte), or 3 (2 bytes), never 1."
  - question: "When should I enable URL-safe Base64 decoding instead of standard Base64?"
    answer: "Enable URL-safe (Base64url, RFC 4648 Section 5) decoding whenever a string originates from JWT segments, OAuth 2.0 PKCE challenges, signed cookies, or query parameters, because those systems substitute '-' for '+' and '_' for '/' and typically strip trailing '=' padding."
  - question: "Can Base64 decoding recover a truncated or partially corrupted payload?"
    answer: "If only trailing '=' padding or MIME line breaks (CRLF every 76 characters) are missing or inserted, automatic whitespace stripping and re-padding restore the exact original bytes. If payload characters were dropped mid-stream, bit alignment shifts for every subsequent 4-character quantum and the original bytes past the break cannot be reconstructed."
features:
  - "Dual RFC 4648 Section 4 (Standard) and Section 5 (URL-Safe Base64url) decoding with automatic padding restoration"
  - "Strict multi-byte UTF-8 reconstruction via TextDecoder to preserve emojis, accented scripts, and CJK characters"
  - "Automatic RFC 2397 Data URI unwrapping and magic-byte sniffing for PNG, JPEG, GIF, WebP, and SVG previews"
  - "One-click raw binary image export and plain-text file download for decoded outputs"
  - "Drag-and-drop file ingestion and automatic whitespace/CRLF sanitization for multi-line MIME or PEM blocks"
  - "Zero-upload in-browser execution with optional local browser persistence for active debugging sessions"
useCases:
  - "Inspecting binary thumbnails, icons, and inline SVG sprites embedded as Data URIs inside compiled CSS or HTML bundles"
  - "Unpacking Base64-wrapped JSON responses, SAML assertions, and webhook payloads during backend API integration"
  - "Auditing Kubernetes Secret YAML manifests where configuration files and credentials are stored in Base64 fields"
  - "Extracting raw MIME body parts and attachments from SMTP server logs or .eml diagnostic captures"
  - "Decoding URL-safe OAuth state parameters and individual JSON Web Token segments without hitting remote endpoints"
  - "Safely defanging and inspecting Base64-obfuscated command strings or scripts encountered during incident response"
howToSteps:
  - "Paste a standard Base64 string, Base64url segment, or full Data URI into the input area, or drag and drop a text file containing encoded data."
  - "Toggle URL-Safe mode if the input uses '-' and '_' characters from a URL parameter, cookie, or token."
  - "Review the instant output: readable UTF-8 text and JSON appear in the text panel, while detected raster or SVG assets render in the live image preview."
  - "Check inline error messages if the payload contains illegal characters, broken 6-bit alignment, or truncated UTF-8 byte sequences."
  - "Copy the decoded text to your clipboard or download the raw decoded text or reconstructed image file directly to disk."
---

Every text-oriented transport layer on the modern web — JSON APIs, XML envelopes, HTTP authorization headers, Kubernetes Secret manifests, and MIME email bodies — rejects arbitrary raw bytes or mangles control octets. To survive those channels, binary assets and multi-byte strings are serialized with Base64 and later restored on the receiving end. This decoder reverses that RFC 4648 transformation entirely inside your browser's JavaScript runtime, translating ASCII sextets back into exact original octets without transmitting sensitive tokens, credentials, or internal payloads across any external network.

## Reversing the 24-Bit Packing Pipeline

Base64 decoding inverts the 3-to-4 expansion performed during encoding (if you need to go in the opposite direction, use the sibling [Base64 Encode Tool](/en/tools/base64-encode)). Each valid ASCII character in the encoded input maps to a 6-bit integer between `0` and `63` via a lookup table. The decoder reads four characters at a time — yielding a 24-bit register — and slices that register into three 8-bit octets:

- **Byte 1**: `(sextet0 << 2) | (sextet1 >> 4)`
- **Byte 2**: `((sextet1 & 0x0F) << 4) | (sextet2 >> 2)`
- **Byte 3**: `((sextet2 & 0x03) << 6) | sextet3`

When the original input length was not divisible by 3, the encoder appended one or two `=` padding characters so the final block stayed aligned on a 4-character boundary. A single trailing `=` signals that only 2 bytes (16 bits) reside in the final quantum and the lowest 2 zero-pad bits of `sextet2` must be discarded. Two trailing `==` characters indicate 1 valid byte (8 bits) with 4 discardable trailing bits.

In protocols such as RFC 4648 Section 5 (**Base64url**), padding is often omitted entirely to avoid percent-encoding `=` as `%3D` inside query strings. A compliant decoder computes `remainder = length % 4`, restores `4 - remainder` pad characters when `remainder` is `2` or `3`, and immediately rejects inputs where `remainder === 1` because 6 bits cannot hold a single complete octet.

## Recognizing Binary Formats from Leading Characters

Developers frequently encounter an unlabeled Base64 blob inside a database column, API payload, or log line without an accompanying `Content-Type` header. Because the first 3 to 9 bytes of most binary formats contain fixed **magic bytes**, their Base64 prefixes act as reliable visual fingerprints even before full decoding runs.

| Base64 Prefix | Leading Magic Bytes (Hex) | Detected Format / Payload | Typical Source |
| :--- | :--- | :--- | :--- |
| `iVBORw0KGgo` | `89 50 4E 47 0D 0A 1A 0A` | PNG raster image | Canvas exports, inline UI icons, API screenshots |
| `/9j/` | `FF D8 FF` | JPEG / JFIF image | Photo uploads, EXIF thumbnails, mobile APIs |
| `R0lGODlh` / `R0lGODdh` | `47 49 46 38 39 61` / `37 61` | GIF89a / GIF87a animation | Legacy tracking pixels, animated sprites |
| `UklGR` | `52 49 46 46 ... 57 45 42 50` | WebP image (RIFF container) | Modern CDN thumbnails, browser image capture |
| `PHN2Zy` / `PD94bW` | `3C 73 76 67` / `3C 3F 78 6D` | SVG vector (`<svg` or `<?xml`) | Inline icons, CSS background assets |
| `JVBERi0` | `25 50 44 46 2D` | PDF document (`%PDF-`) | Invoice APIs, e-signature webhooks |
| `UEsDB` | `50 4B 03 04` | ZIP / DOCX / XLSX / JAR | Document exports, compressed archives |
| `eyJ` | `7B 22` (`{"`) | UTF-8 JSON object | JWT headers/payloads, serialized event blobs |

When an input begins with an RFC 2397 Data URI header (`data:image/png;base64,...`), this tool strips the metadata prefix automatically. Even without a prefix, the built-in sniffer checks decoded leading bytes against PNG, JPEG, GIF, WebP, and SVG headers and switches directly into visual preview mode with a binary download button. For dedicated image extraction and dimensional inspection workflows, pair this page with the [Base64 to Image Converter](/en/tools/base64-to-image).

## Avoiding UTF-8 Mojibake in Browser and CLI Workflows

A classic engineering bug occurs when developers call `window.atob()` directly on Base64 strings containing non-ASCII text. Because `atob()` produces a binary string where every character code lies in `0x00–0xFF`, multi-byte UTF-8 sequences like `€` (`E2 82 AC`) decode into three separate Latin-1 glyphs (`â‚¬`). The reliable Web API pattern converts the decoded binary string into a `Uint8Array` and hands it to `TextDecoder`:

```javascript
function decodeBase64Utf8(input, urlSafe = false) {
  let normalized = input.replace(/\s+/g, '');
  if (urlSafe) {
    normalized = normalized.replace(/-/g, '+').replace(/_/g, '/');
  }
  const pad = normalized.length % 4;
  if (pad === 1) throw new Error('Invalid Base64 length (mod 4 === 1)');
  if (pad > 1) normalized += '='.repeat(4 - pad);

  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}
```

Passing `{ fatal: true }` ensures that arbitrary binary files (such as gzipped blobs or JPEG buffers) fail cleanly with a `TypeError` instead of silently emitting U+FFFD replacement characters (``). On Unix terminals and CI runners, `base64 --decode` (GNU coreutils) or `base64 -D` (macOS BSD) performs the same stream decoding; in Node.js 16+, `Buffer.from(str, 'base64url').toString('utf8')` handles unpadded URL-safe tokens natively.

## Diagnostics for Broken Payloads and Security Hygiene

### Common Failure Modes During Decoding

1. **MIME Line Wrapping (RFC 2045)**: Email gateways and PEM certificate exporters insert `\r\n` every 64 or 76 characters; strict parsers reject line breaks unless whitespace is stripped first.
2. **Alphabet Mismatch (`+`/`/` vs `-`/`_`)**: Feeding a JWT or OAuth Base64url token into a standard RFC 4648 Section 4 decoder fails at the first hyphen or underscore. For full three-segment token claims and expiration timelines, switch to the dedicated [JWT Decoder Tool](/en/tools/jwt-decoder).
3. **Plus-to-Space Corruption**: Passing unescaped standard Base64 inside an `application/x-www-form-urlencoded` query parameter turns `+` into a space (`0x20`), corrupting sextet `62` unless `+` was percent-encoded as `%2B` or replaced with Base64url.
4. **Non-Canonical Trailing Bits**: RFC 4648 Section 3.5 strict validators reject non-zero low-order padding bits before `=` or `==`, which can signal tampering or covert steganography.

### Base64 Is Transport Encoding, Not Confidentiality

Base64 adds zero entropy, key material, or confidentiality. Treating Base64-encoded API keys, HTTP Basic Auth headers (`Authorization: Basic dXNlcjpwYXNz`), or Kubernetes Secrets as encrypted data exposes credentials to anyone who inspects the wire capture or manifest. During incident triage or WAF log review, decoding suspicious strings locally lets analysts read obfuscated shell commands or PowerShell `-EncodedCommand` (UTF-16LE Base64) payloads without executing them or sending internal artifacts to external servers.
