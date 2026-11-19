---
metaTitle: "MIME Type Checker, Magic Bytes & Content-Type Inspector"
metaDescription: "Look up IANA MIME types, inspect HTTP Content-Type and nosniff headers, and validate local file uploads by hex magic bytes to catch spoofing."
metaKeywords: "mime type checker, content-type lookup, detect mime type, file extension check, http headers lookup, magic bytes validator, mime sniffing test, nosniff header check, validate file upload, media type database, mime comparison, file format verification"
title: "MIME Type Checker & Content-Type Inspector"
shortDescription: "Look up IANA media types, verify file uploads locally using binary magic bytes, compare extension-to-header mappings, and audit remote HTTP Content-Type and X-Content-Type-Options security headers."
faqs:
  - question: "Are files uploaded to your server when I run the Magic Bytes Upload Validator?"
    answer: "No. The file validator runs strictly inside your browser using File.slice(0, 16) and FileReader.readAsArrayBuffer() to read only the first 16 bytes of the selected file locally, so your full file payload is never transmitted over the network."
  - question: "Why does checking magic bytes catch spoofed uploads that filename validation misses?"
    answer: "Renaming a Windows executable from payload.exe to avatar.png fools extension checks and often tricks the browser's reported File.type. Inspecting the leading binary signature reveals the MZ executable header (4D 5A) instead of the PNG signature (89 50 4E 47 0D 0A 1A 0A)."
  - question: "What does the X-Content-Type-Options: nosniff header actually prevent?"
    answer: "Without nosniff, browsers may ignore an ambiguous Content-Type such as text/plain and sniff the response body under WHATWG rules, promoting an uploaded file into text/html or text/javascript and enabling stored cross-site scripting (XSS)."
  - question: "Why should JavaScript files use text/javascript instead of application/javascript?"
    answer: "RFC 9239 formally obsoleted application/javascript and standardized text/javascript as the canonical media type for JavaScript and ES modules (.js and .mjs), matching long-standing HTML specification behavior."
  - question: "How does the Remote URL Header Inspector work without failing on browser CORS limits?"
    answer: "To inspect public URLs across origins, the URL Inspector sends a lightweight server-side HEAD request (falling back to GET if HEAD is rejected) while enforcing DNS-level SSRF checks that block private RFC 1918, loopback, and link-local IP ranges."
features:
  - "Instant extension-to-MIME and MIME-to-extension lookup with official media types, legacy aliases, browser rendering behavior, and risk profiles"
  - "Client-side binary Magic Bytes Upload Validator reading the first 16 bytes in hex and ASCII to detect extension spoofing and corrupted headers"
  - "Offset-aware container signature matching for RIFF formats (WebP, WAV, AVI) at bytes 8-11 and ISO Base Media MP4 ftyp boxes at bytes 4-7"
  - "Remote URL Content-Type auditor inspecting HTTP status, charset, Content-Disposition, Content-Encoding, Cache-Control, and X-Content-Type-Options"
  - "Interactive Extension vs. Content-Type comparator diagnosing browser breakage under strict nosniff enforcement"
  - "Searchable, category-filtered media type database with one-click JSON and plain-text diagnostic report exports"
useCases:
  - "Auditing production CDN assets and S3 buckets to confirm missing X-Content-Type-Options: nosniff headers or wrong Content-Type responses"
  - "Verifying suspicious user-submitted files locally by checking raw hex magic bytes before opening them or tuning backend upload allowlists"
  - "Debugging why a browser downloads a PDF, SVG, or WebAssembly module instead of rendering or executing it inline"
  - "Checking whether a legacy alias such as application/x-javascript or image/jpg conflicts with strict browser module loading"
  - "Documenting HTTP header misconfigurations as downloadable JSON or TXT diagnostic reports for DevOps and security tickets"
  - "Confirming exact IANA media type strings before configuring NGINX mime.types, Apache AddType rules, or REST API Accept headers"
howToSteps:
  - "Use the Lookup tab to search by file extension (such as .wasm or .svg), MIME string, or description to view canonical headers, aliases, and security guidance."
  - "Switch to the URL Inspector tab and enter any public HTTPS asset URL to audit live Content-Type, charset, Content-Disposition, and nosniff headers."
  - "Open the Upload Validator tab and drop a local file to inspect its first 16 bytes in hex and ASCII and detect extension spoofing without uploading the file."
  - "Use the Compare tab to test any extension against a candidate Content-Type header and check compatibility under strict nosniff enforcement."
  - "Browse the full Database tab filtered by category (Text, Image, Audio, Video, Font, Archive, Application, Binary) and export any diagnostic audit as JSON or TXT."
---

Web browsers do not decide how to process an HTTP response by looking at the `.png`, `.js`, or `.pdf` suffix in a URL. Rendering engines, JavaScript runtimes, and download managers rely on the server's `Content-Type` header — and when that header is missing, misconfigured, or overly generic, fallback MIME sniffing can silently break stylesheets or turn an innocent user upload into an executable Cross-Site Scripting (XSS) payload. The **MIME Type Checker & Content-Type Inspector** combines an IANA media type reference, an extension-to-header comparator, a local binary magic-byte validator, and a remote HTTP header auditor in one diagnostic workspace.

## Media Type Grammar and HTTP Header Semantics

Defined by RFC 6838 and carried over HTTP per RFC 9110, a media type follows the structure `type/subtype` followed by optional semicolon-delimited parameters such as character encoding:

```http
Content-Type: text/html; charset=utf-8
Content-Disposition: inline
X-Content-Type-Options: nosniff
```

Every media type belongs to a top-level discrete registry (`text`, `image`, `audio`, `video`, `font`, `application`) or composite tree (`multipart`, `message`). Subtypes often carry structural signals:

- **Registration trees:** Vendor-specific formats use the `vnd.` prefix (for example, `application/vnd.android.package-archive` for `.apk`), while legacy unregistered types historically used `x-` (`application/x-msdownload`).
- **Structured syntax suffixes:** Suffixes like `+xml` (`image/svg+xml`) and `+json` (`application/ld+json`) declare the underlying parser grammar. Notably, because SVG is XML, serving untrusted `.svg` uploads inline permits embedded `<script>` execution under your site's origin.
- **Standardized updates and extension collisions:** RFC 9239 formally retired `application/javascript` in favor of `text/javascript` for both classic scripts and `.mjs` ES modules — a critical distinction when browsers enforce strict MIME checks on `<script type="module">`. Extension collisions also trip up static file servers: `.ts`, for instance, maps officially to MPEG-2 Transport Streams (`video/mp2t`, starting with sync byte `0x47`) even though developers commonly associate it with TypeScript source files, while unknown binaries fall back to `application/octet-stream` to trigger safe downloads.

`Content-Disposition` pairs directly with `Content-Type`: `inline` instructs the browser to render supported media inside the viewport, whereas `attachment; filename="report.pdf"` forces a file download even for normally renderable assets.

## Binary File Signatures (Magic Bytes) Reference

Validating uploads exclusively by filename extension or the browser's `File.type` property is insecure because both values come from untrusted client metadata. True format verification inspects the binary signature (**magic bytes**) embedded in the file header.

When you drop a file into the **Upload Validator** tab, the browser never transmits the file across the network. Instead, `File.slice(0, 16)` extracts only the leading 16 bytes into a local `ArrayBuffer`, renders the hexadecimal and printable ASCII view, and checks both offset-0 signatures and container-specific interior offsets (bytes `8–11` for RIFF sub-formats and bytes `4–7` for ISO Base Media `ftyp` atoms).

| Extension | Official MIME Type | Hex Magic Bytes | Offset | Security & Parsing Profile |
| :--- | :--- | :--- | :---: | :--- |
| `.png` | `image/png` | `89 50 4E 47 0D 0A 1A 0A` | `0` | Safe raster image; check EXIF/tEXt chunks if stripping metadata |
| `.jpg` | `image/jpeg` | `FF D8 FF` | `0` | Safe raster image; `image/jpg` is a non-standard alias |
| `.webp` | `image/webp` | `52 49 46 46` ... `57 45 42 50` | `0` & `8` | RIFF container (`RIFF` + FourCC `WEBP` at byte 8) |
| `.mp4` | `video/mp4` | `66 74 79 70` (`ftyp`) | `4` | ISO Base Media container preceded by 4-byte box size |
| `.pdf` | `application/pdf` | `25 50 44 46` (`%PDF`) | `0` | Inline viewer; can embed JavaScript actions in PDF engines |
| `.zip` / `.apk` | `application/zip` | `50 4B 03 04` (`PK..`) | `0` | Shared container for ZIP, DOCX, XLSX, JAR, and Android APK |
| `.wasm` | `application/wasm` | `00 61 73 6D` (`\0asm`) | `0` | Requires exact `application/wasm` for `instantiateStreaming()` |
| `.exe` | `application/x-msdownload` | `4D 5A` (`MZ`) | `0` | High-risk native executable; flag immediately if spoofed as image |
| `.svg` | `image/svg+xml` | `3C 73 76 67` (`<svg`) | `0` | XML vector graphic; high XSS hazard if user-uploaded inline |

## Stopping MIME Sniffing and Hardening Server Headers

Under the WHATWG MIME Sniffing Standard, if an origin returns `text/plain` or omits `Content-Type` without setting `X-Content-Type-Options: nosniff`, browsers inspect the first bytes of the response to guess its real format. Attackers exploit this by crafting polyglot files (such as valid GIF headers followed by HTML/JavaScript) to achieve stored XSS when hosted on your primary domain.

Enforce strict MIME matching on every web server and verify responses from the command line:

```nginx
# Nginx: enforce strict MIME adherence and force download on untrusted uploads
add_header X-Content-Type-Options "nosniff" always;

location /user-uploads/ {
    add_header Content-Disposition "attachment" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

```bash
# Quick CLI verification of live Content-Type and nosniff headers
curl -sI https://example.com/assets/app.wasm | grep -iE 'content-type|x-content-type-options|content-disposition'
```

If you host on Apache, generate properly scoped `AddType` and `Header always set X-Content-Type-Options "nosniff"` directives with the [`.htaccess` Generator](/en/tools/htaccess-generator). To audit surrounding transport and framing policies such as HSTS, CSP, and CORS alongside media types, run the full endpoint through the [HTTP Header Checker](/en/tools/http-header-checker). And when inlining icons or binary assets into CSS or HTML as `data:<mime>;base64,...` URIs, pair verified media types with the [Base64 Encoder](/en/tools/base64-encode) so browsers decode the embedded payload accurately.

## Execution Boundaries and URL Inspection Safeguards

This inspector separates local analysis from live network auditing cleanly. Extension lookups, magic-byte file verification, extension-vs-MIME comparisons, and full database browsing execute exclusively inside your browser with zero file uploads. When you audit an external link on the **URL Inspector** tab, a lightweight backend endpoint issues a `HEAD` request (automatically falling back to `GET` if the remote server blocks `HEAD`) so browser CORS policies do not conceal response headers. Before connecting, the endpoint resolves target DNS records and blocks RFC 1918 private networks, loopback addresses (`127.0.0.0/8`, `::1`), and link-local ranges (`169.254.0.0/16`, `fe80::/10`) to prevent SSRF exposure, while exporting any lookup, file signature check, or live header audit to JSON or plain text for engineering tickets.
