---
metaTitle: "Unix Timestamp & Epoch Converter | ISO 8601 & JWT Decoder"
metaDescription: "Convert 10-digit seconds and 13-digit millisecond Unix epochs to ISO 8601, UTC, and local timestamps. Inspect JWT exp/iat claims and Year 2038 limits."
metaKeywords: "unix timestamp converter, epoch converter, ISO 8601 converter, milliseconds to UTC, JWT exp iat decoder, Year 2038 problem, 32-bit epoch overflow, RFC 3339 timestamp"
title: "Unix Timestamp & Epoch Converter"
shortDescription: "Convert between 10-digit seconds, 13-digit millisecond, microsecond, and nanosecond Unix epochs and ISO 8601 dates, inspect JWT exp/iat timestamps, and test Year 2038 boundaries."
faqs:
  - question: "What is the difference between a 10-digit and 13-digit Unix timestamp?"
    answer: "A 10-digit timestamp counts whole seconds since 1970-01-01T00:00:00Z, which is standard in POSIX systems, JWT claims, and Linux logs. A 13-digit timestamp counts milliseconds—used by JavaScript Date.now() and Java System.currentTimeMillis()—making it 1,000 times larger."
  - question: "How does Unix time handle leap seconds?"
    answer: "Under POSIX.1, Unix time assumes every day contains exactly 86,400 seconds and ignores leap seconds. When an official UTC leap second occurs, operating systems either step the clock back one second or apply NTP leap smearing over 12 to 24 hours."
  - question: "Why do I need BigInt for 19-digit nanosecond timestamps in JavaScript?"
    answer: "JavaScript numbers are 64-bit IEEE-754 floats with a safe integer ceiling of 9,007,199,254,740,991. Current nanosecond timestamps sit near 1.79e18, which exceeds MAX_SAFE_INTEGER by three orders of magnitude and silently rounds the lowest digits unless parsed with BigInt."
  - question: "What is the Year 2038 problem and does it affect modern web apps today?"
    answer: "Signed 32-bit integers overflow at 2,147,483,647 seconds (2038-01-19T03:14:07Z), wrapping negative into December 1901. It already impacts modern applications that store 15-to-30-year mortgage dates, long-lived certificates, or multi-decade subscription expirations in legacy 32-bit TIMESTAMP columns."
  - question: "What timestamp unit do JWT exp, iat, and nbf claims use?"
    answer: "Per RFC 7519 Section 2 (NumericDate), JWT exp, iat, and nbf claims must always be encoded as integer seconds since the Unix epoch—never milliseconds. Passing Date.now() directly without dividing by 1000 produces tokens expiring thousands of years in the future."
features:
  - "Automatic unit detection for 10-digit seconds, 13-digit ms, microseconds, and nanoseconds"
  - "Bidirectional conversion between Unix epochs, RFC 3339 / ISO 8601, and local timezones"
  - "Dedicated relative delta calculator for auditing JWT exp, iat, and nbf TTLs"
  - "BigInt-safe handling for 19-digit Go, Kubernetes, and OpenTelemetry nanosecond logs"
  - "100% client-side conversion keeping production tokens and audit timestamps private"
useCases:
  - "Debugging JWT expiration mismatches between auth servers and browser clients"
  - "Correlating 19-digit OpenTelemetry traces with 13-digit frontend telemetry events"
  - "Auditing database schemas for legacy signed 32-bit Year 2038 overflow risks"
  - "Converting webhook event timestamps into sortable ISO 8601 UTC strings"
  - "Calculating exact epoch offsets for API cache-control and presigned URL TTLs"
howToSteps:
  - "Paste a numeric Unix timestamp (seconds, ms, us, or ns) or an ISO 8601 date string."
  - "Confirm the auto-detected precision scale or switch units manually if testing boundary epochs."
  - "Read the normalized UTC ISO 8601 output, local timezone rendering, and relative time offset."
  - "Inspect edge-case flags for Year 2038 32-bit limits or IEEE-754 precision boundaries."
---

Every distributed system stitches together timestamps from incompatible scales: JWT payloads carry 10-digit seconds, browser telemetry emits 13-digit milliseconds, PostgreSQL stores microsecond offsets, and Go or Kubernetes logs write 19-digit nanoseconds. Mixing up even a single factor of 1,000 silently places an event in January 1970 or 50,000 years in the future.

This Unix Timestamp & Epoch Converter executes 100% client-side in your browser. Production JWT `exp` values, webhook signatures, and internal audit log timestamps stay entirely on your local machine with zero server requests.

## Unix Epoch Specification, Precision Scales, and ISO 8601

POSIX.1 defines Unix time as the count of non-leap seconds elapsed since the Unix epoch: `1970-01-01T00:00:00Z`. Negative integers represent instants prior to 1970 (for example, `-86400` corresponds to `1969-12-31T00:00:00Z`). Because POSIX mandates exactly 86,400 seconds per calendar day, leap seconds are never represented natively in `time_t`; instead, NTP daemons either step the system clock or smear the extra second gradually across hours. Note also the difference between wall-clock time (`CLOCK_REALTIME`), which can jump backward during NTP adjustments, and monotonic clocks (`CLOCK_MONOTONIC`), which measure elapsed durations safely but cannot be converted into calendar dates.

Recognizing an epoch's magnitude by digit count prevents unit confusion during debugging. Around late 2026, current wall-clock epochs span roughly `1.79e9` (10 digits) in seconds, `1.79e12` (13 digits) in milliseconds, `1.79e15` (16 digits) in microseconds, and `1.79e18` (19 digits) in nanoseconds. When serializing timestamps over JSON APIs or logs, RFC 3339 / ISO 8601 strings such as `2026-11-27T04:06:49.000Z` (using `Z` or `+00:00` for explicit UTC offset) eliminate unit ambiguity while preserving lexicographical sort order across databases and object stores.

In JavaScript, `Date` operates internally at millisecond precision, and regular `Number` values follow IEEE-754 double precision with `Number.MAX_SAFE_INTEGER` equal to `9,007,199,254,740,991`. Because 19-digit nanosecond epochs (`1.79e18`) exceed that threshold, parsing them as ordinary JavaScript numbers loses the bottom 8 to 9 bits of precision—requiring `BigInt` arithmetic before dividing down to milliseconds.

## Step-by-Step Walkthrough: Auditing JWT Claims and API Logs

Consider debugging an authentication failure where a service rejects a bearer token with `401 TokenExpired`. Decoding the JWT payload reveals RFC 7519 `NumericDate` claims in seconds alongside an API gateway log emitted in milliseconds:

```json
{
  "sub": "usr_9481a",
  "iat": 1795752000,
  "nbf": 1795752000,
  "exp": 1795755600
}
```

Converting `1795752000` (10 digits) yields `2026-11-27T04:00:00Z`, and `1795755600` yields `2026-11-27T05:00:00Z`—confirming a 3,600-second (1-hour) token lifetime. If the client clock or gateway timestamp shows `1795755645120` (13 digits, `2026-11-27T05:00:45.120Z`), the request arrived 45.12 seconds after `exp`. In SQL investigations, PostgreSQL bridges this directly with `TO_TIMESTAMP(1795755600) AT TIME ZONE 'UTC'`, while browser scripts use `Intl.DateTimeFormat` with an explicit IANA zone to render operator-friendly local times without altering the underlying UTC instant.

When writing utility code that ingests mixed epochs from webhooks or telemetry pipelines, normalize with `BigInt` thresholds rather than naive `Number` multiplication:

```javascript
function epochToIsoUtc(rawEpoch) {
  const value = BigInt(String(rawEpoch).trim());
  const abs = value < 0n ? -value : value;

  let ms;
  if (abs < 10_000_000_000n) {
    ms = value * 1000n; // 10-digit seconds
  } else if (abs < 10_000_000_000_000n) {
    ms = value; // 13-digit milliseconds
  } else if (abs < 10_000_000_000_000_000n) {
    ms = value / 1000n; // 16-digit microseconds
  } else {
    ms = value / 1_000_000n; // 19-digit nanoseconds
  }

  return new Date(Number(ms)).toISOString();
}
```

## Epoch Precision and Overflow Reference Table

Use this matrix to match numeric magnitudes, ecosystem conventions, and safe JavaScript representation types:

| Precision / Boundary | Example Epoch | Equivalent UTC / Range | Primary Ecosystem | Safe JS Type |
| :--- | :--- | :--- | :--- | :--- |
| Seconds (10 digits) | `1795752409` | `2026-11-27T04:06:49Z` | POSIX, JWT `exp`/`iat`, Linux `cron` | `Number` |
| Milliseconds (13 digits) | `1795752409123` | `2026-11-27T04:06:49.123Z` | JS `Date.now()`, Java, Stripe/REST | `Number` |
| Microseconds (16 digits) | `1795752409123456` | Sub-ms precision (2026) | PostgreSQL, Python `time_ns() // 1e3` | `Number` / `BigInt` |
| Nanoseconds (19 digits) | `1795752409123456789` | Nanosecond traces (2026) | Go `UnixNano()`, OTel, Kubernetes | `BigInt` required |
| Signed 32-bit Max (Y2038) | `2147483647` | `2038-01-19T03:14:07Z` | Legacy `int32_t`, old MySQL `TIMESTAMP` | `Number` |
| IEEE-754 Safe Int Max | `9007199254740991` | ~285,420 years (in ms) | JavaScript `Number` precision limit | `BigInt` above |

## The Year 2038 Problem, Clock Skew, and Production Pitfalls

Signed 32-bit integers cap out at `2,147,483,647` seconds—`2038-01-19T03:14:07Z`. One second later, `int32_t` overflows to `-2,147,483,648` (`1901-12-13T20:45:52Z`). While 2038 sounds distant, production systems already hit this boundary whenever calculating 15-to-30-year mortgage amortizations, long-term archival retention dates, or multi-decade device certificates stored in legacy 32-bit columns or C extensions. Audit database schemas to ensure `BIGINT` (64-bit) or native 64-bit `TIMESTAMP`/`TIMESTAMPTZ` types are used everywhere.

A second frequent bug is passing seconds straight into `new Date(jwt.exp)` in frontend JavaScript: `new Date(1795755600)` interprets the value as milliseconds and renders `1970-01-21` instead of `2026-11-27`. Always multiply RFC 7519 `NumericDate` values by `1000` in JavaScript.

Finally, distributed hosts always experience minor NTP drift, and governments occasionally revise Daylight Saving Time rules on short notice. Configure JWT verifiers with an explicit `clockTolerance` (typically 30 to 60 seconds) so tokens issued by one microservice are not falsely rejected by another node whose system clock trails by 800 milliseconds. Conversely, when persisting future user-facing calendar events (such as a recurring 09:00 alarm in `America/Sao_Paulo`), store the wall-clock date/time paired with its IANA timezone identifier rather than pre-computing a fixed Unix epoch years ahead, because a legislative DST change would otherwise shift the event by an hour.
