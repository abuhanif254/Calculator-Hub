---
title: "Understanding Binary: How Computers Think"
description: "Learn how Base-2 positional notation, logic gates, two's complement arithmetic, and bit widths work, and convert or compute binary numbers accurately."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "binary-calculator"
relatedType: "calculator"
faqs:
  - question: "Why do computers use binary instead of base-10 decimal?"
    answer: "Digital processors are built from billions of MOSFET transistors acting as microscopic voltage switches. Maintaining two distinct voltage states—LOW (0, near 0 V) and HIGH (1, typically 0.7 V to 1.2 V in modern CPUs)—provides wide noise margins and high switching speed. Distinguishing ten precise voltage levels per wire would multiply manufacturing cost and thermal noise errors."
  - question: "How do you quickly convert a binary number to decimal?"
    answer: "Write powers of two above each bit from right to left starting at 2⁰ = 1 (1, 2, 4, 8, 16, 32, 64, 128), then sum every power of two where the binary digit is 1. For example, 10101101₂ equals 128 + 32 + 8 + 4 + 1 = 173."
  - question: "How do computers represent negative numbers in binary?"
    answer: "Modern processors use two's complement notation. The leftmost bit (Most Significant Bit) acts as the sign bit—0 for non-negative, 1 for negative—with weight −2^(n−1). To negate any binary number, invert every bit (0 becomes 1, 1 becomes 0) and add 1."
  - question: "What is the relationship between binary and hexadecimal?"
    answer: "Because 16 equals 2⁴, every group of exactly four binary bits (one nibble) maps cleanly to a single hexadecimal digit from 0 to F. For instance, the 8-bit byte 11010110₂ splits into 1101 (D) and 0110 (6), yielding 0xD6—making hex a compact human shorthand for raw memory and MAC addresses."
  - question: "Why does binary arithmetic sometimes fail on decimals like 0.1 + 0.2?"
    answer: "In Base-2, only fractions whose denominators are pure powers of two (1/2, 1/4, 1/8) terminate cleanly. Tenths like 0.1 (1/10) become infinite repeating patterns in binary (0.0001100110011...₂), forcing IEEE 754 floating-point registers to round at 24 or 53 significand bits."
---

Every pixel, audio sample, and network packet inside a modern computing device is encoded as sequences of `0`s and `1`s in **binary (Base-2)** notation. Unlike the Base-10 decimal system humans use for everyday arithmetic, Base-2 operates with only two symbols (`0` and `1`), where each leftward digit position doubles in place value rather than multiplying by ten.

Hardware engineers standardized on Base-2 because physical silicon transistors operate most reliably as bistable switches—representing `0` with low voltage (near ground) and `1` with high supply voltage. Grouping binary switches into bytes, words, and floating-point registers enables Boolean logic, rapid arithmetic, and exact memory addressing without signal ambiguity. Whether you are debugging bitmasks, calculating IPv4 subnets, or verifying two's complement arithmetic, our [Binary Calculator](/en/calculators/binary-calculator) executes Base-2 conversions and bitwise math instantaneously.

## Core Binary Notation and Arithmetic Rules

Positional Base-2 values scale by powers of two, while fixed-width hardware imposes exact unsigned bounds and two's complement signed representations:

```text
Positional Value:       Value = Σ (b_i × 2^i)  for bit index i = 0 to n − 1
Unsigned n-bit Range:   0  to  2^n − 1
Signed (Two's Comp.):   −2^(n−1)  to  2^(n−1) − 1
Two's Complement Neg.:  −X = (~X) + 1   (bitwise NOT plus 1)
Binary Addition Rules:  0+0 = 0 | 0+1 = 1 | 1+0 = 1 | 1+1 = 10₂ (0, carry 1)
```

* **`b_i` (Bit, 0 or 1):** Single binary digit at index `i`, numbered from `0` at the Least Significant Bit (LSB, rightmost) to `n − 1` at the Most Significant Bit (MSB, leftmost).
* **`n` (Bit Width):** Fixed register size (`8`, `16`, `32`, or `64` bits) that determines numeric capacity and overflow wrap-around behavior.
* **Nibble & Byte:** Four bits form one nibble (`0–15`, matching one hexadecimal digit `0–F`); eight bits form one byte or octet (`0–255` unsigned).
* **Two's Complement:** Universal signed integer encoding that preserves identical hardware addition circuits for both positive and negative values without needing separate `−0` handling.

### Why Silicon Uses Two States Instead of Ten

A decimal processor wire would need to hold ten distinct, evenly spaced voltage levels—for instance, `0.1 V` increments between `0.0 V` and `0.9 V`. Thermal fluctuations, cross-talk, and power rail droop in dense nanometer chips would routinely blur adjacent levels, corrupting calculations. By restricting logic gates to two maximally separated rails (`0` and `1`), digital circuits tolerate substantial electrical noise while switching billions of times per second.

## Step-by-Step Worked Examples: Conversion and Signed Subtraction

Converting between decimal and binary or performing signed subtraction in hardware follows deterministic steps.

**Example 1 — Decimal to 8-Bit Binary (`173₁₀`):** Divide repeatedly by `2` and read the remainders from bottom (MSB) to top (LSB):

1. `173 ÷ 2 = 86` remainder `1` (LSB, `2⁰`)
2. `86 ÷ 2 = 43` remainder `0` (`2¹`)
3. `43 ÷ 2 = 21` remainder `1` (`2²`)
4. `21 ÷ 2 = 10` remainder `1` (`2³`)
5. `10 ÷ 2 = 5` remainder `0` (`2⁴`)
6. `5 ÷ 2 = 2` remainder `1` (`2⁵`)
7. `2 ÷ 2 = 1` remainder `0` (`2⁶`)
8. `1 ÷ 2 = 0` remainder `1` (MSB, `2⁷`)

Reading upward gives `10101101₂`. Checking positional weights confirms: `128 + 0 + 32 + 0 + 8 + 4 + 0 + 1 = 173`. Splitting into nibbles (`1010` and `1101`) maps directly to hexadecimal `0xAD`.

**Example 2 — 8-Bit Two's Complement Subtraction (`45 − 27`):** Represent `45` as `00101101₂` (`32 + 8 + 4 + 1`) and `27` as `00011011₂` (`16 + 8 + 2 + 1`).

1. **Invert all 8 bits of `27`:** `~00011011₂ = 11100100₂`.
2. **Add `1` to form `−27`:** `11100100₂ + 1 = 11100101₂`.
3. **Add `45 + (−27)` bit by bit:** `00101101₂ + 11100101₂ = 100010010₂` (9 bits).
4. **Discard the 9th carry-out bit in 8-bit arithmetic:** The remaining 8 bits equal `00010010₂ = 16 + 2 = 18`, matching `45 − 27 = 18` cleanly.

## Standard Binary Bit Widths and Numeric Limits

Understanding register limits prevents integer truncation and overflow bugs across systems programming, networking, and embedded firmware.

| Bit Width | Standard Name | Total States (`2^n`) | Max Unsigned Value | Signed Two's Complement Range | Common Computing Applications |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 bit | Bit | 2 | 1 | N/A | Boolean flags, hardware pin states |
| 4 bits | Nibble | 16 | 15 | −8 to 7 | Single hex digit (`0–F`), BCD encoding |
| 8 bits | Byte / Octet | 256 | 255 | −128 to 127 | ASCII text, RGB color channels, IPv4 octets |
| 16 bits | Word / uint16 | 65,536 | 65,535 | −32,768 to 32,767 | TCP/UDP ports, PCM audio, UTF-16 code units |
| 32 bits | Doubleword / uint32 | 4,294,967,296 | 4,294,967,295 | −2,147,483,648 to 2,147,483,647 | IPv4 addresses, RGBA pixels, legacy Unix time |
| 64 bits | Quadword / uint64 | ~1.84 × 10¹⁹ | 18,446,744,073,709,551,615 | −9.22 × 10¹⁸ to 9.22 × 10¹⁸ − 1 | 64-bit CPU pointers, nanoseconds, IEEE 754 doubles |

## Practical Applications, Common Errors, and Precision Caveats

Low-level binary manipulation powers network routing, Unix permission masks, error-correcting memory (ECC), and hardware register control. An IPv4 subnet mask such as `255.255.255.0` (`/24`) is simply `24` consecutive `1` bits followed by `8` zero bits, isolating network prefixes from host IDs via a single bitwise `AND` instruction. Similarly, Linux `chmod 755` expands octal digits into three 3-bit read/write/execute triplets (`111 101 101`).

Watch closely for four recurring binary engineering pitfalls:

* **Integer overflow and wrap-around:** Adding `1` to an unsigned 8-bit `255` (`11111111₂`) wraps to `0` (`00000000₂`), while adding `1` to signed 32-bit `2,147,483,647` wraps to `−2,147,483,648`—the root cause of the upcoming Year 2038 32-bit Unix timestamp rollover.
* **Endianness byte-order mismatches:** Multi-byte numbers stored in memory can place the least significant byte first (little-endian, used by x86-64 and most ARM systems) or most significant byte first (big-endian network byte order). Reading raw network packets without byte-swapping scrambles multi-byte integers.
* **Signed vs. unsigned bit-shift errors:** Logical right shifts (`>>>`) insert `0`s on the left, whereas arithmetic right shifts (`>>`) preserve the MSB sign bit (`1` for negative numbers) to maintain division by two.
* **Floating-point rounding in decimal finance:** Never store currency in binary IEEE 754 `float` or `double` types; represent money in integer cents or fixed-point `Decimal` types so base-2 repeating fractions never introduce penny drift.
