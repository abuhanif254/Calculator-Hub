---
metaTitle: "URL Decoder Online — Parse Percent-Encoded Query Strings"
metaDescription: "Decode percent-encoded URLs, unwrap double-encoded strings, and inspect query parameters in real time with full UTF-8 support and private local parsing."
metaKeywords: "url decoder, url decode online, decode url string, percent decoding, decodeURIComponent, decodeURI, url query parser, query string decoder, utf8 url decode, unicode url decoder, decode percent encoded, url structure analyzer"
title: "URL Decoder Tool"
shortDescription: "Unescape percent-encoded URLs and query strings back into readable UTF-8 text, inspect and edit key-value parameters visually, and diagnose malformed or double-encoded sequences locally in your browser."
faqs:
  - question: "Why does decodeURI leave %2F, %3F, %26, and %3D still encoded?"
    answer: "By ECMAScript specification, decodeURI intentionally skips percent-encoded RFC 3986 reserved delimiters (; / ? : @ & = + $ , #) so unescaping a full URL does not turn encoded data into new path separators or query boundaries. Switch to Component mode (decodeURIComponent) to decode every valid percent sequence."
  - question: "What triggers a 'URI Error: malformed URI sequence' during decoding?"
    answer: "Two conditions cause URIError: a stray '%' sign not followed by two hexadecimal digits (such as 'discount=50%'), or a decoded byte sequence that violates UTF-8 encoding rules (such as a truncated emoji like '%F0%9F' or a legacy Latin-1 byte like '%E9' instead of '%C3%A9')."
  - question: "How can I tell if a URL has been double-encoded?"
    answer: "Look for '%25' followed immediately by two hexadecimal characters — such as '%2520' (a double-encoded space), '%252F' (a double-encoded slash), or '%253D' (a double-encoded equals sign). Decoding once converts '%2520' to '%20'; applying Swap & Decode a second time restores the original space."
  - question: "Why did a plus sign (+) inside my decoded string turn into a space?"
    answer: "In HTML form submissions (application/x-www-form-urlencoded), spaces inside query strings are serialized as '+' while literal plus signs are encoded as '%2B'. Component mode translates '+' into a space to match standard query parsers; switch to Full URL mode when decoding paths where '+' is a literal character."
  - question: "Is decoding an unknown affiliate, email, or OAuth callback link safe here?"
    answer: "Yes. Decoding translates text locally inside your browser without issuing any HTTP request or following redirects, allowing you to inspect destination hostnames, nested redirect_uri values, and embedded tokens safely before ever visiting the URL."
features:
  - "Instant percent-decoding with toggleable decodeURIComponent (Component) and decodeURI (Full URL) algorithms"
  - "Automatic query-string '+' to space normalization in Component mode alongside strict path preservation in Full URL mode"
  - "Interactive Query Parameter Inspector displaying parsed '?key=value' pairs with live editing and hash preservation"
  - "Multi-pass unwrapping via one-click mode/output swapping to peel back double- and triple-encoded URLs"
  - "Graceful URIError detection for stray '%' symbols, truncated UTF-8 octets, and legacy single-byte encodings"
  - "Client-side parsing with line-by-line batch decoding, clipboard copy, and plain-text download"
useCases:
  - "Unwrapping serialized JSON filter objects sent inside REST API GET query parameters for readable inspection"
  - "Auditing multi-hop marketing, email-click, and affiliate tracking links to expose the real destination URL"
  - "Diagnosing reverse-proxy and CDN double-encoding regressions where spaces render as '%2520' in application logs"
  - "Inspecting OAuth 2.0, SAML, and OpenID Connect authorization callbacks containing nested redirect_uri parameters"
  - "Restoring percent-encoded internationalized paths (Arabic, CJK, Cyrillic, accented European routes) from server access logs"
  - "Examining suspicious percent-encoded payloads from Web Application Firewall alerts during security triage"
howToSteps:
  - "Paste your percent-encoded URL, raw query string, or multi-line log excerpt into the input panel."
  - "Leave Component mode (decodeURIComponent) selected to unescape all percent sequences and '+' spaces, or switch to Full URL (decodeURI) to keep structural delimiters intact."
  - "Inspect the decoded UTF-8 text in the output pane and review the Query Parameter Inspector table for individual key-value pairs."
  - "If the output still contains '%20', '%2F', or '%3A' from double encoding, copy the output back into the input to unwrap the second layer."
  - "Copy the clean decoded string or download it as a text file for further formatting or debugging."
---

Server access logs, OAuth redirect callbacks, analytics beacons, and REST query parameters routinely arrive packed with dense strings of `%22`, `%7B`, `%252F`, and `%F0%9F%9A%80`. Reading or debugging those payloads by eye is error-prone, especially when multiple middleware layers have encoded the same parameter more than once. This decoder unwraps percent-encoded strings directly inside your browser, reconstructing UTF-8 text and splitting query parameters into an editable table without making outbound requests or exposing session links to external infrastructure.

## How Percent-Decoding Reconstructs UTF-8 Byte Streams

Percent-decoding is a two-stage pipeline rather than a naive character-by-character lookup:

1. **Hexadecimal Octet Extraction**: The parser scans sequentially for `%` markers followed by two case-insensitive hexadecimal nibbles (`[0-9A-Fa-f]{2}`). Each valid triplet converts to a single 8-bit byte (`0x00–0xFF`).
2. **UTF-8 Code Point Reassembly**: Adjacent decoded bytes are validated against RFC 3629 UTF-8 bit patterns (`0xxxxxxx` for 1-byte ASCII, `110xxxxx 10xxxxxx` for 2-byte characters, up to 4 bytes for supplementary Unicode planes). For instance, `%F0%9F%9A%80` yields bytes `F0 9F 9A 80`, which reassemble into `U+1F680` (`🚀`).

Choosing between **`decodeURIComponent()`** and **`decodeURI()`** changes which valid ASCII bytes are actually unescaped. `decodeURI()` deliberately refuses to decode the eleven RFC 3986 reserved characters (`%3B`, `%2F`, `%3F`, `%3A`, `%40`, `%26`, `%3D`, `%2B`, `%24`, `%2C`, `%23`) because unescaping `%26` inside a full URL would split one query value into two separate parameters. `decodeURIComponent()` unescapes every valid `%HH` sequence indiscriminately, making it the right default for isolated query values, embedded JSON strings, and callback targets. When you later need to re-escape edited parameters cleanly, switch over to the [URL Encoder Tool](/en/tools/url-encoder).

## Handling `+` Spaces vs. Literal Plus Signs Across URI Sections

One of the oldest incompatibilities on the web is how `+` behaves after decoding. Under **RFC 3986**, `+` is a valid sub-delimiter whose literal value is a plus sign, and spaces are always `%20`. Under the **HTML `application/x-www-form-urlencoded`** specification (used by HTML `<form method="get">` submissions and `URLSearchParams`), spaces inside query strings serialize as `+` while literal plus signs serialize as `%2B`.

Consider two real-world strings:

- **Path segment**: `/docs/C++_Memory_Model.pdf` — here `+` is literal. Replacing `+` with spaces would break the path into `/docs/C  _Memory_Model.pdf`.
- **Query string**: `?q=C%2B%2B+memory+model` — here `+` represents spaces and `%2B` represents literal pluses, decoding cleanly to `C++ memory model`.

In this tool, **Component mode** normalizes `+` into `%20` prior to calling `decodeURIComponent()` so standard query strings decode naturally, while **Full URL mode** leaves literal `+` characters untouched to preserve path integrity.

## Troubleshooting Malformed Sequences, Legacy Charsets, and Multi-Layer Encoding

When decoding real traffic captures, web logs, or legacy enterprise endpoints, strict UTF-8 decoders frequently throw exceptions or reveal surprising artifacts. Use the diagnostic matrix below to isolate the root cause quickly.

| Raw Pattern / Symptom | Technical Root Cause | Behavior in Strict Decoders | Remediation |
| :--- | :--- | :--- | :--- |
| `%2520`, `%252F`, `%253D` | Double encoding (`%` escaped to `%25` on a second pass) | Decodes once to `%20`, `%2F`, `%3D` | Run a second decode pass; remove duplicate encoder call in client or proxy |
| `50%20off%` or `width=100%` | Unescaped literal `%` not followed by two hex digits | Throws `URIError: malformed URI sequence` | Escape literal percent signs as `%25` before decoding |
| `%E9` (expects `é`) | Legacy ISO-8859-1 / Windows-1252 single-byte encoding | Throws `URIError` (invalid UTF-8 lead byte) | Decode raw bytes using Windows-1252/Latin-1, or re-encode upstream as UTF-8 (`%C3%A9`) |
| `%F0%9F%98` (3 bytes only) | Truncated 4-byte UTF-8 sequence (e.g., DB column cutoff) | Throws `URIError` (incomplete continuation) | Increase URL/column byte limit; never slice percent-encoded strings mid-triplet |
| `%C0%AF` (overlong `/`) | Non-shortest-form UTF-8 byte sequence (often an attack probe) | Rejected by RFC 3629 strict UTF-8 decoders | Block at WAF/router; never normalize overlong sequences into ASCII `/` |
| `%2F` remains `%2F` | Decoded using `decodeURI()` instead of `decodeURIComponent()` | Preserves encoded reserved delimiters | Switch to Component mode (`decodeURIComponent`) |

## Forensic Debugging, Safe Decoding Code, and Security Traps

When inspecting REST `GET` requests that serialize entire filter objects into query parameters (such as `?filter=%7B%22status%22%3A%22open%22%2C%22limit%22%3A25%7D`), decode the parameter value here and pass the resulting JSON string directly into the [JSON Formatter](/en/tools/json-formatter) to syntax-highlight and validate nested keys. For multi-hop marketing or tracking chains where decoded parameters reveal additional redirect hops, trace the actual HTTP `301`/`302` chain using the [Redirect Checker](/en/tools/redirect-checker).

### Resilient Multi-Layer Unwrapping in JavaScript and Python

When parsing unpredictable server access logs where some lines contain stray `%` signs or double-encoded parameters, catch `URIError` defensively and detect redundant layers with `/%25[0-9A-Fa-f]{2}/`:

```javascript
function safeUnwrapQueryValue(raw, maxPasses = 3) {
  let current = raw.replace(/\+/g, ' ');
  for (let i = 0; i < maxPasses; i++) {
    try {
      const next = decodeURIComponent(current);
      if (next === current) break;
      current = next;
    } catch {
      break; // Stop cleanly on stray '%' or non-UTF-8 octets
    }
  }
  return current;
}
```

In Python log-analysis pipelines, `urllib.parse.unquote_plus(value, errors='replace')` decodes form query values without crashing on malformed bytes, whereas `urllib.parse.unquote(path)` preserves literal `+` characters in filesystem-like paths.

### Security Traps After Decoding

Never treat a decoded URL parameter as trusted input. Security vulnerabilities routinely arise at the boundary between decoding and downstream consumption:

- **Path Traversal via Double Encoding**: If a reverse proxy checks for `../` once, an attacker sending `%252e%252e%252f` can bypass the first filter and trigger directory traversal if the backend framework decodes the path a second time.
- **Reflected DOM XSS**: Extracting a parameter via `URLSearchParams` or `decodeURIComponent()` and injecting it into `innerHTML` turns `%3Cimg%20src%3Dx%20onerror%3D...%3E` into executable markup. Always bind decoded strings to `textContent` or template-escaped nodes.
- **Open Redirects**: Validate decoded `next` or `returnUrl` parameters against an explicit allowlist of relative paths or trusted origins after canonicalization, never before decoding.
