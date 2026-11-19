---
title: "Binary Calculator"
metaTitle: "Binary Calculator — Base-2 Arithmetic & Bitwise Logic"
description: "Compute base-2 addition, subtraction, multiplication, division, bitwise logic gates, bit shifts, and two's complement signed integers across 8-, 16-, 32-, and 64-bit widths."
metaDescription: "Solve base-2 addition, subtraction, multiplication, division, bitwise AND/OR/XOR, shifts, and two's complement with instant decimal and hex results."
metaKeywords: "binary calculator, base-2 arithmetic, bitwise operations calculator, two's complement calculator, binary to hex converter, bit shift calculator, signed unsigned binary"
faqs:
  - question: "How do you convert a negative decimal integer into 8-bit two's complement binary?"
    answer: "Start with the positive magnitude in 8 bits, invert every bit (0 becomes 1 and 1 becomes 0) to form the one's complement, and then add 1 to the least significant bit. For -19, begin with 00010011, invert to 11101100, and add 1 to obtain 11101101."
  - question: "Why do systems programmers prefer hexadecimal over decimal as shorthand for binary?"
    answer: "Because 16 equals 2 to the 4th power, every group of four binary bits (a nibble) maps directly onto a single hexadecimal character (0-9 and A-F). That clean 4-to-1 alignment lets engineers read bytes, memory addresses, and bitmasks instantly without performing base-10 division."
  - question: "What is the difference between a logical right shift and an arithmetic right shift?"
    answer: "A logical right shift moves all bits rightward and pads the vacated leftmost positions with 0s, which divides unsigned integers by powers of two. An arithmetic right shift copies the existing sign bit into the leftmost positions so negative two's complement values keep their negative sign during division."
  - question: "Why does 0.1 + 0.2 produce tiny rounding discrepancies in binary floating-point math?"
    answer: "In base-2, only fractions whose reduced denominator is a pure power of two (such as 1/2, 1/4, or 3/8) terminate cleanly. Because 1/10 includes a prime factor of 5, 0.1 repeats infinitely in binary (0.0001100110011...) and must be truncated to fit fixed memory bits, which is why financial systems store currency as integer cents."
  - question: "How can you tell whether 8-bit binary addition caused signed or unsigned overflow?"
    answer: "Unsigned overflow occurs whenever a carry spills out of the leftmost (8th) bit, exceeding 255. Signed two's complement overflow happens when adding two numbers of the same sign flips the sign bit of the sum—for instance, adding +100 (01100100) and +50 (00110010) produces 10010110, wrapping around to -106."
---

## How Base-2 Arithmetic Powers Hardware, Firmware, and Networking

Every microprocessor register, IPv4 routing table, RGB pixel channel, ASCII text stream, and cryptographic cipher operates on **base-2 (binary)** states—sequences of `0` and `1` bits switched by billions of transistors. While decimal notation groups quantities by powers of `10`, binary assigns each column a power of `2`. Understanding both raw base-2 arithmetic and fixed-width register behavior (`8`, `16`, `32`, and `64` bits) lets developers, computer science students, and network engineers debug bitmasks, inspect hexadecimal memory dumps, verify CIDR subnet boundaries, and catch integer wraparound bugs before they reach production.

## Positional Weights, Two's Complement, and Base Conversions

For an unsigned `n`-bit binary integer written from Most Significant Bit (`b_(n-1)`) down to Least Significant Bit (`b_0`), the decimal value equals the sum of active powers of two:

```
Unsigned Value = b_(n-1)×2^(n-1) + ... + b_2×2^2 + b_1×2^1 + b_0×2^0
```

Modern CPUs avoid building separate hardware subtractors by encoding negative integers in **two's complement**. In an `n`-bit signed register, the leftmost bit carries a *negative* positional weight (`−2^(n-1)`), while every remaining bit keeps its standard positive weight:

```
Signed Two's Complement Value = −b_(n-1)×2^(n-1) + b_(n-2)×2^(n-2) + ... + b_1×2^1 + b_0×2^0
```

That single sign-weight rule guarantees two crucial properties: zero has only one representation (`00000000₂`), and adding any integer to its negation rolls cleanly back to zero. To negate any value in two's complement, invert all bits (`NOT`) and add `1`.

For fractional binary values such as `10.101₂`, columns to the right of the radix point carry negative powers of two (`2^-1 = 0.5`, `2^-2 = 0.25`, `2^-3 = 0.125`), so `10.101₂ = 2 + 0.5 + 0.125 = 2.625₁₀`. Converting binary to **hexadecimal** (base-16) requires grouping bits into 4-bit nibbles (`1101 0111₂ = 0xD7`), while **octal** (base-8) groups bits in threes (`111 101 101₂ = 0755`, standard Unix file permissions). Likewise, **ASCII text** encodes each character as an 8-bit byte—for example, uppercase `B` maps to decimal `66`, or `01000010₂` (`0x42`).

## Bit-Width Capacity: Unsigned vs. Signed Integer Reference Table

Choosing the wrong bit width or signedness is a leading cause of silent wraparound defects. Reference these exact hardware limits across standard register sizes:

| Register Width | Hex Digits | Unsigned Range (`0` to `2^n − 1`) | Signed Two's Complement (`−2^(n-1)` to `2^(n-1) − 1`) | Typical Engineering Use |
| :--- | :--- | :--- | :--- | :--- |
| `4-bit` (Nibble) | `1` | `0` to `15` | `−8` to `+7` | Single hex character, BCD digits |
| `8-bit` (Byte) | `2` | `0` to `255` | `−128` to `+127` | ASCII text, RGB channels, IPv4 octets |
| `16-bit` (Word) | `4` | `0` to `65,535` | `−32,768` to `+32,767` | TCP/UDP port numbers, 16-bit PCM audio |
| `32-bit` (Dword) | `8` | `0` to `4,294,967,295` | `−2,147,483,648` to `+2,147,483,647` | IPv4 addresses, legacy 32-bit Unix timestamps |
| `64-bit` (Qword) | `16` | `0` to `18,446,744,073,709,551,615` | `−9,223,372,036,854,775,808` to `+9,223,372,036,854,775,807` | Modern CPU registers, 64-bit memory pointers |

## Worked Examples: Two's Complement Subtraction and IPv4 Masking

### Example 1: Evaluating `45 − 19` Inside an 8-Bit ALU

Instead of borrowing column by column, an 8-bit processor computes `45 + (−19)`:

1. **Encode `+45`**: `32 + 8 + 4 + 1 = 00101101₂` (`0x2D`)
2. **Encode `+19`**: `16 + 2 + 1 = 00010011₂` (`0x13`)
3. **Convert `+19` to `−19` (two's complement)**: Invert every bit to `11101100₂`, then add `1` to get `11101101₂` (`0xED`, verifying `−128 + 64 + 32 + 8 + 4 + 1 = −19`).
4. **Add column by column from right to left**:

```
  Carry:  111011010
           00101101  (+45)
        +  11101101  (-19)
        -----------
          100011010  (drop 9th carry bit -> 00011010 = +26)
```

Discarding the 9th carry-out bit leaves `00011010₂` = `16 + 8 + 2 = 26₁₀` (`0x1A`), matching `45 − 19 = 26` exactly.

### Example 2: Isolating an IPv4 Network ID With Bitwise `AND`

Bitwise gates and shifts evaluate every bit position in parallel inside a single CPU clock cycle:

- **`AND`**: Outputs `1` only when both bits are `1` (used to mask or clear specific bits).
- **`OR`**: Outputs `1` if either bit is `1` (used to turn on hardware configuration flags).
- **`XOR`**: Outputs `1` only when bits differ (used to toggle flags, compute parity checksums, and mix keystreams in ciphers such as ChaCha20).
- **`NOT` & Bit Shifts (`<<`, `>>`)**: `NOT` flips every bit (`0 ↔ 1`); shifting left by `k` multiplies by `2^k` (`00000101₂ << 2 = 00010100₂`, or `5 × 4 = 20`), while shifting right divides by `2^k`.

Suppose a router inspects host `192.168.10.214` under a `/26` subnet mask (`255.255.255.192`). Focusing on the fourth octet:

1. **Host octet `214`**: `128 + 64 + 16 + 4 + 2 = 11010110₂`
2. **Mask octet `192`**: `128 + 64 = 11000000₂`
3. **Bitwise `AND`**: `11010110 AND 11000000 = 11000000₂ = 192₁₀`

The operation strips the lower six host bits (`010110₂ = 22`) and identifies the network address as `192.168.10.192/26`.

## Practical Pitfalls in Low-Level Binary Math

- **Signed overflow wraparound**: Incrementing the maximum 8-bit signed integer `+127` (`01111111₂`) by `1` flips the register to `10000000₂`, which evaluates to `−128` rather than `+128`. On 32-bit systems, that exact same sign-bit rollover causes the Year 2038 timestamp failure once Unix seconds exceed `2,147,483,647`.
- **Confusing arithmetic and logical right shifts**: Shifting `−8` (`11111000₂`) right by 1 position preserves the sign bit under an arithmetic shift (`11111100₂ = −4`), whereas a logical shift pads a leading zero and turns the value into `+124` (`01111100₂`).
- **Sign-extension bugs when widening variables**: Promoting the 8-bit byte `11111111₂` to 16 bits yields `0x00FF` (`+255`) when zero-extended as unsigned, but `0xFFFF` (`−1`) when sign-extended as signed. Always verify signedness before casting between register widths.
- **Storing decimal money in binary fractions**: Because `0.10₁₀` repeats forever in base-2, fixed-size binary floating-point registers introduce tiny drift across repeated additions. Ledger and checkout systems avoid this by counting exact integer cents in base-2.
