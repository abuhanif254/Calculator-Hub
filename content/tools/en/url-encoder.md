---
metaTitle: "URL Encoder & Percent-Encoding Tool — RFC 3986 & UTF-8"
metaDescription: "Encode URLs and query strings with encodeURIComponent or encodeURI, edit key-value parameters visually, and process UTF-8 locally in your browser."
metaKeywords: "url encoder, url decoder, percent encoding, encodeURIComponent, encodeURI, url encode online, url safe encoding, decode url string, url query parser, query string encoder, utf8 url encode, unicode url encoder"
title: "URL Encoder & Decoder Tool"
shortDescription: "Percent-encode full URIs, individual query parameters, and multi-byte UTF-8 text using RFC 3986 and JavaScript encodeURI/encodeURIComponent rules with an interactive query string builder."
faqs:
  - question: "When should I pick encodeURIComponent instead of encodeURI?"
    answer: "Use encodeURIComponent when encoding a single query parameter value, form field, or dynamic path segment so reserved delimiters like '&', '=', '/', and '?' are escaped as data. Use encodeURI only when cleaning spaces or Unicode characters inside an already assembled full URL whose scheme and slashes must stay intact."
  - question: "Why does JavaScript encodeURIComponent leave !, ', (, ), and * unencoded?"
    answer: "ECMAScript specifies encodeURIComponent based on older RFC 2396 unescaped rules rather than RFC 3986 Section 2.3. APIs requiring strict RFC 3986 percent-encoding — notably AWS Signature Version 4 and OAuth 1.0a — require an extra replace pass to escape those five sub-delimiters into %21, %27, %28, %29, and %2A."
  - question: "Why do spaces become %20 in URL paths but + in HTML form query strings?"
    answer: "RFC 3986 encodes every ASCII space (0x20) as %20 across all URI components. The '+' convention comes specifically from the application/x-www-form-urlencoded media type used by HTML GET/POST forms and JavaScript URLSearchParams, which applies only to query bodies and never to URL path segments."
  - question: "How are emojis and non-Latin alphabets percent-encoded in modern URLs?"
    answer: "Each Unicode scalar value is first converted into its UTF-8 byte sequence (between 2 and 4 bytes), and then each byte is written as a '%' prefix followed by two uppercase hexadecimal digits. A four-byte emoji such as U+1F455 expands into twelve ASCII characters: %F0%9F%91%95."
  - question: "Should I percent-encode an internationalized domain name containing accented or CJK characters?"
    answer: "No. Hostnames use IDNA Punycode (ASCII Compatible Encoding prefixed with 'xn--') rather than percent-encoding. Percent-encoding applies to the path, query string, and fragment components after the authority section."
features:
  - "Switchable Component (encodeURIComponent) and Full URL (encodeURI) percent-encoding modes"
  - "Bidirectional Encode/Decode workflow with one-click input/output swap and automatic encoded-string paste detection"
  - "Live Query Parameter Inspector to add, modify, or delete '?key=value' pairs while preserving hash fragments"
  - "Line-by-line bulk encoding with full multi-byte UTF-8 and emoji byte expansion"
  - "Real-time reserved RFC 3986 delimiter counter and length comparison analytics"
  - "Local browser execution with clipboard copy and plain-text file export for safe API debugging"
useCases:
  - "Safely escaping user-supplied search queries, email addresses, and callback URLs before inserting them into REST query strings"
  - "Constructing nested OAuth 2.0 redirect_uri parameters without breaking outer query delimiters"
  - "Building and visually editing multi-parameter UTM tracking links and marketing campaign URLs"
  - "Encoding dynamic path parameters that contain forward slashes, hashes, or spaces for Express, FastAPI, or Go routers"
  - "Preparing pre-filled mailto: links with multi-line body text and Unicode punctuation in subject headers"
  - "Converting non-ASCII filenames and internationalized path segments into deterministic ASCII request targets for cURL scripts"
howToSteps:
  - "Confirm that Encode mode is active in the workspace toolbar (or switch to Decode for reverse inspection)."
  - "Choose Component (encodeURIComponent) for individual query values and path segments, or Full URL (encodeURI) for complete links."
  - "Type or paste your raw text, Unicode string, or full URL into the input editor; multi-line inputs are processed line by line."
  - "If your input includes query parameters, edit, append, or remove individual keys and values in the Query Parameter Inspector below."
  - "Verify the reserved-character metrics and encoded result in the output pane, then copy it to your clipboard or download it as a text file."
---

Every HTTP request line transmits a Uniform Resource Identifier over a strict US-ASCII grammar defined by **RFC 3986** and refined by the **WHATWG URL Standard**. Because structural delimiters (`?`, `&`, `/`, `#`, `=`) share the same string as user data, passing unescaped values into a URL causes routers, proxies, and query parsers to split parameters in the wrong places or drop everything after a stray `#` fragment marker. This utility performs RFC-compliant percent-encoding and visual query parameter assembly right inside your browser tab, so API keys, callback targets, and staging endpoints stay strictly on your local machine.

## RFC 3986 Character Taxonomy: Unreserved vs. Reserved Delimiters

RFC 3986 divides URI syntax into two fundamental character groups that dictate when a byte must be rewritten as `%HH` (a percent sign followed by two hexadecimal digits):

- **Unreserved characters** (`ALPHA / DIGIT / "-" / "." / "_" / "~"`): These 66 characters carry no structural role anywhere in a URI and should never be percent-encoded. Normalizing `%7E` back to `~`, for example, yields a semantically identical URI.
- **Reserved characters**: Split into **general delimiters** (`gen-delims`: `: / ? # [ ] @`) that separate major URI components (`scheme://authority/path?query#fragment`), and **sub-delimiters** (`sub-delims`: `! $ & ' ( ) * + , ; =`) used inside individual components such as query pairs or matrix parameters.

Any character outside the unreserved set — including ASCII spaces (`0x20`), control characters (`0x00–0x1F`), quotation marks, angle brackets, the literal percent sign (`%` -> `%25`), and every non-ASCII Unicode code point — must be percent-encoded whenever it represents data rather than syntax. Crucially, encoding must happen **before** components are concatenated. Once `https://api.example.com/search?q=R&D&page=2` is assembled as a flat string, no automated encoder can distinguish whether the first `&` is part of the search term `R&D` or the separator before a parameter named `D`.

## Comparing encodeURI, encodeURIComponent, Strict RFC 3986, and URLSearchParams

One of the most persistent sources of integration bugs is selecting the wrong encoding primitive for a given context. The table below maps exact output differences across the four standard web encoding mechanisms.

| Mechanism | Preserves `:/?#[]@` | Preserves `!$'()*+,;=` | Space Output | Best-Fit Use Case |
| :--- | :---: | :---: | :---: | :--- |
| **`encodeURI()`** | Yes (`;` `,` `/` `?` `:` `@` `&` `=` `+` `$` `#`) | Yes (all sub-delims) | `%20` | Cleaning raw spaces and UTF-8 in a pre-built full URL |
| **`encodeURIComponent()`** | No (encodes all gen-delims) | Only `! ' ( ) *` | `%20` | Query parameter values, OAuth `redirect_uri`, path segments |
| **Strict RFC 3986** | No | No (encodes `! ' ( ) *` too) | `%20` | AWS SigV4 canonical requests, OAuth 1.0a signature base strings |
| **`URLSearchParams`** | No | Only `*` (encodes `! ' ( )`) | `+` | `application/x-www-form-urlencoded` query strings & POST bodies |

Notice the subtle gap between JavaScript's `encodeURIComponent()` and strict RFC 3986. If you sign canonical HTTP requests for AWS S3, CloudFront, or OAuth 1.0a endpoints, wrap `encodeURIComponent()` with a five-character follow-up substitution so cryptographic signatures match server-side verification byte for byte:

```javascript
function encodeRFC3986(value) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

// Example: building a nested callback query cleanly
const callback = 'https://app.example.com/auth?next=/billing&plan=pro(v2)';
const loginUrl = `https://idp.example.com/authorize?redirect_uri=${encodeRFC3986(callback)}`;
```

## Multi-Byte UTF-8 Serialization and IDNA Hostname Distinction

Under RFC 3986 and the WHATWG URL specification, percent-encoding operates on **UTF-8 octets**, not UTF-16 code units or legacy ISO-8859-1 pages. Before emitting `%HH` triplets, the encoder serializes each Unicode scalar value into 1 to 4 UTF-8 bytes:

1. **1-byte ASCII (`U+0000–U+007F`)**: `?` (`0x3F`) becomes `%3F`; space (`0x20`) becomes `%20`.
2. **2-byte Latin/Cyrillic/Greek (`U+0080–U+07FF`)**: `é` (`U+00E9`, UTF-8 `C3 A9`) becomes `%C3%A9`.
3. **3-byte BMP scripts (`U+0800–U+FFFF`)**: `€` (`U+20AC`, UTF-8 `E2 82 AC`) becomes `%E2%82%AC`; `本` (`U+672C`) becomes `%E6%9C%AC`.
4. **4-byte supplementary plane (`U+10000–U+10FFFF`)**: `👕` (`U+1F455`, UTF-8 `F0 9F 91 95`) becomes `%F0%9F%91%95`.

Note that internationalized **domain names** follow a completely separate standard (**IDNA2008 / Punycode**). A host like `bücher.example` translates to `xn--bcher-kva.example` for DNS resolution rather than `b%C3%BCcher.example`. Only the path, query, and fragment after the hostname use percent-encoding. If you want clean, readable, ASCII-only path segments for SEO rather than verbose `%C3%A9` sequences, normalize titles upfront with the [SEO Slug Generator](/en/tools/slug-generator).

## Engineering Patterns and Pitfalls When Building URLs

### Double Encoding and Proxy Rewriting

Double encoding occurs when an already percent-encoded string passes through a second encoder — turning `%20` into `%2520` because `%` itself encodes to `%25`. This frequently appears when frontend code calls `encodeURIComponent()` on a value and then hands that string to Axios, `fetch` with `URLSearchParams`, or an HTTP client that encodes parameters a second time automatically. If you need to diagnose multi-layer encoding or inspect opaque redirect targets, jump to the dedicated [URL Decoder Tool](/en/tools/url-decoder).

### Binary Data vs. Text in Query Strings

Percent-encoding arbitrary binary bytes inflates payload size by **300%** (each non-unreserved byte expands from 1 octet to 3 ASCII characters). When embedding cryptographic tokens, compressed state blobs, or binary identifiers inside a URL, encode the binary payload using URL-safe Base64url (`-` and `_`, unpadded) via the [Base64 Encode Tool](/en/tools/base64-encode) first — expanding size by only ~33% while staying 100% inside RFC 3986's unreserved character set with zero percent-escaping needed.

### Safe Query Construction with the Built-In Inspector and CLI Equivalents

For URLs carrying ten or more tracking, filter, or pagination parameters, editing raw `&`-delimited strings by hand invites stray ampersands and missed encodings. Pasting the URL into this workspace populates the interactive Query Parameter Inspector automatically: every key and value is decoded for human editing and re-serialized with `encodeURIComponent()` on each keystroke while keeping the base path and `#fragment` anchor untouched.

When testing encoded endpoints from the command line, avoid hand-assembling percent-encoded query strings in shell variables. Use `curl -G --data-urlencode "q=R&D + pricing (2026)" https://api.example.com/search` so cURL applies RFC-compliant percent-encoding to each parameter value automatically without mangling shell-quoted symbols or exposing unescaped ampersands to the shell interpreter. Note also that RFC 3986 considers `%2f` and `%2F` equivalent, though uppercase hexadecimal digits are preferred for canonical cache keys and request signatures.
