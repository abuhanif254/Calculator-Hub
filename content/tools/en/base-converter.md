---
metaTitle: "Number Base Converter: Binary, Octal, Decimal & Hex Tool"
metaDescription: "Convert arbitrary-precision integers between binary, octal, decimal, hex, and Base 36 using JavaScript BigInt. Ideal for bitmasks, memory addresses, and CSS."
metaKeywords: "number base converter, binary to hex, decimal to binary, octal converter, base 36, javascript bigint, radix conversion, bitmask hex"
title: "Number Base Converter (Binary, Octal, Decimal, Hex)"
shortDescription: "Translate arbitrary-precision integers across Binary, Octal, Decimal, Hexadecimal, and Base 36 with exact BigInt arithmetic."
faqs:
  - question: "Why do standard web calculators lose precision on 64-bit hex or binary integers?"
    answer: "Standard JavaScript Number values use IEEE-754 double-precision floats, which only represent integers accurately up to 2^53 - 1. Any 64-bit pointer, hash, or snowflake ID above that threshold suffers silent rounding unless BigInt is used."
  - question: "How does positional notation convert between Base 2, Base 8, Base 16, and Base 36?"
    answer: "Each digit represents a coefficient multiplied by the radix raised to its zero-based position index from right to left. Base 36 extends digits 0-9 with letters A-Z to encode compact alphanumeric identifiers."
  - question: "Why are hexadecimal and binary so closely aligned in systems programming?"
    answer: "Because 16 equals 2^4, every single hexadecimal digit maps cleanly to exactly 4 binary bits (one nibble). Two hex digits represent one 8-bit byte, making memory dumps and bitmasks straightforward to read."
  - question: "How does this tool handle signed negative integers versus unsigned bit patterns?"
    answer: "Exact radix parsing preserves a leading minus sign for mathematical integer values across bases. When inspecting raw hardware registers or network headers, treat unsigned bit sequences as non-negative magnitudes."
  - question: "Is my hexadecimal payload or 128-bit UUID integer sent to a backend server?"
    answer: "No. Every radix conversion, input validation, and BigInt formatting step runs exclusively inside your browser runtime with zero network calls."
features:
  - "Arbitrary-precision BigInt engine supporting 64-bit, 128-bit, and 256-bit integers without rounding"
  - "Simultaneous output across Binary (2), Octal (8), Decimal (10), Hexadecimal (16), and Base 36"
  - "Automatic recognition of standard prefixes including 0b, 0o, and 0x"
  - "Strict per-radix character validation to catch invalid digits immediately"
  - "100% client-side browser execution protecting proprietary keys, memory dumps, and IDs"
useCases:
  - "Decoding 64-bit Twitter/Discord Snowflake IDs and database bigints without float truncation"
  - "Inspecting bitmasks, CPU status flags, and hardware register fields in binary and hex"
  - "Converting 24-bit RGB and 32-bit RGBA CSS color channels between hex and decimal"
  - "Translating Unix file mode octals into binary permission triads"
  - "Generating compact Base 36 short-URL slugs or timestamp tokens from numeric IDs"
howToSteps:
  - "Select the input radix (Binary, Octal, Decimal, Hexadecimal, or Base 36) or paste a prefixed literal."
  - "Type or paste your integer value; the engine validates digits against the selected radix character set."
  - "Read the synchronized conversions across all supported bases simultaneously with exact BigInt accuracy."
  - "Copy the formatted target representation—such as padded hex or grouped binary—into your code or debugger."
---

Software engineers switch constantly between numeral systems when debugging low-level protocols, inspecting memory dumps, configuring bitmasks, or styling UI color channels. Converting large values mentally or with a standard floating-point calculator quickly breaks down once integers exceed 53 bits, silently corrupting the least significant digits of 64-bit pointers, cryptographic nonces, and distributed database IDs. This converter translates integers cleanly across Binary, Octal, Decimal, Hexadecimal, and Base 36 in one pass.

All parsing and radix formatting execute locally inside your browser using native JavaScript `BigInt` arithmetic. Because zero data leaves your tab, you can safely inspect proprietary memory offsets, raw authorization bitmasks, and internal customer record IDs without network exposure.

## Positional Numeral Systems and BigInt Precision

Every positional numeral system represents an integer as a polynomial of a fixed base (radix) `b`, where each digit `d_i` (with `0 <= d_i < b`) sits at position `i` counting rightward-to-leftward from `0`. The integer's value equals the sum of `d_i * b^i` across all positions. Binary (`b = 2`) uses `{0, 1}`; Octal (`b = 8`) uses `{0–7}`; Decimal (`b = 10`) uses `{0–9}`; Hexadecimal (`b = 16`) adds `{A–F}` for values `10–15`; and Base 36 (`b = 36`) maps `{0–9, A–Z}` to values `0–35`.

Because `8 = 2^3` and `16 = 2^4`, Octal and Hexadecimal act as human-friendly shorthand for raw binary streams. One octal digit encodes exactly 3 bits, and one hex digit encodes exactly 4 bits (one nibble), so two hex digits always represent a single 8-bit byte (`0x00` to `0xFF`).

Critically, standard browser calculators built on JavaScript `Number` fail on 64-bit systems data. `Number` implements IEEE-754 binary64 floating-point arithmetic, allocating 53 bits to the significand. Its `Number.MAX_SAFE_INTEGER` limit is `2^53 - 1` (`9,007,199,254,740,991` or `0x1FFFFFFFFFFFFF`). Beyond that ceiling, consecutive odd and even integers collapse to the same float representation. By parsing input with `BigInt` and iterative Horner's method evaluation—multiplying an accumulator by the radix BigInt and adding each digit—this tool preserves bit-exact fidelity across 64-bit, 128-bit, and arbitrary-length integers.

## Practical Walkthrough: Bitmasks, Memory Offsets, and Colors

Consider three everyday engineering tasks where cross-radix conversion prevents off-by-one and truncation bugs:

```javascript
// 1. IEEE-754 Number truncation vs. exact BigInt conversion
const snowflakeStr = "18446744073709551615"; // 2^64 - 1 (uint64 max)
console.log(Number(snowflakeStr).toString(16)); // "10000000000000000" (ROUNDED UP!)
console.log(BigInt(snowflakeStr).toString(16)); // "ffffffffffffffff"  (EXACT)

// 2. Decoding a 16-bit TCP-style flags bitmask (0x012A)
const flags = 0x012An;
console.log(flags.toString(2).padStart(16, "0")); // "0000000100101010"

// 3. Extracting RGB channels from CSS hex #3B82F6
const rgbHex = 0x3B82F6;
const r = (rgbHex >> 16) & 0xFF; // 0x3B -> 59
const g = (rgbHex >> 8)  & 0xFF; // 0x82 -> 130
const b = rgbHex & 0xFF;         // 0xF6 -> 246
```

In the first snippet, passing `uint64` max into `Number` rounds up to `2^64`, turning 16 `f` nibbles into `1` followed by 16 zeros—a catastrophic bug when generating database keys or verifying signatures. Using `BigInt` retains all 64 `1` bits (`0xFFFFFFFFFFFFFFFF`).

In the second example, inspecting `0x012A` in binary reveals which individual capability bits are set (`bit 1`, `bit 3`, `bit 5`, and `bit 8`). In the third example, shifting a 24-bit CSS color literal right by 16 and 8 bits cleanly isolates the red (`59`), green (`130`), and blue (`246`) decimal intensities.

## Radix Comparison and Bit-Density Reference

| Base | Name | Digit Alphabet | Bits per Digit | Standard Prefix | Example (`255` dec) | Primary Engineering Domain |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `2` | Binary | `0–1` | `1` bit | `0b` | `11111111` | Hardware registers, bitwise flags, subnet masks |
| `8` | Octal | `0–7` | `3` bits | `0o` | `377` | POSIX `chmod` modes, legacy C escape sequences |
| `10` | Decimal | `0–9` | `~3.32` bits | None | `255` | Counters, timestamps, JSON API numbers |
| `16` | Hexadecimal | `0–9, A–F` | `4` bits | `0x` / `#` | `FF` | Memory addresses, SHA digests, CSS colors, UTF-8 bytes |
| `36` | Base 36 | `0–9, A–Z` | `~5.17` bits | None | `73` | Compact URL slugs, case-insensitive short IDs |

## Production Pitfalls and Performance Edge Cases

When integrating multi-base data into production codebases, watch closely for **implicit octal parsing** and **signedness mismatches**. Legacy C, Python 2, and non-strict JavaScript environments interpret a leading zero (`0755`) as octal rather than decimal, whereas modern ES6+ strict mode throws a `SyntaxError` unless the explicit `0o` prefix is used. Always strip decorative leading zeros from user-supplied decimal strings before calling `parseInt(str, 10)` or `BigInt(str)`—and never omit the second radix parameter in `parseInt()`.

Signed versus unsigned representation is a second frequent source of bugs. JavaScript `BigInt` stores numbers with arbitrary-width two's complement behavior internally when shifted, yet `BigInt.prototype.toString(16)` formats negative values with a literal `-` sign (`(-1n).toString(16)` yields `"-1"`, not `"ffffffff"`). If you are debugging a 32-bit or 64-bit two's complement register dump, wrap the value with `BigInt.asUintN(64, val)` before formatting to hex or binary so sign-extension bits appear accurately.

Finally, treat `BigInt` conversions cautiously inside tight serialization loops and cross-service API contracts. Unlike `Number`, `BigInt` cannot be serialized directly by `JSON.stringify()`, which throws a `TypeError` unless a custom `toJSON` replacer is supplied. Convert 64-bit and 128-bit identifiers—such as distributed Snowflakes, trace IDs, or database sequence keys—to canonical decimal or prefixed `0x` hex strings at API boundaries so downstream clients never lose precision during JSON decoding. For multi-megabyte binary payloads such as SHA-256 digests or raw network packets, iterate over `Uint8Array` bytes with lookup tables rather than performing multi-thousand-bit `BigInt` division, keeping conversion latency predictable in O(n) linear time.
