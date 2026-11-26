---
title: "The Complete Guide to Fractions: Adding, Subtracting, Multiplying & Dividing"
description: "Master the rules of fractions. Learn how to find common denominators, simplify fractions, and use our Fraction Calculator to solve complex math problems."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "fraction-calculator"
relatedType: "calculator"
faqs:
  - question: "Why do you need a common denominator to add or subtract fractions, but not to multiply them?"
    answer: "Addition and subtraction combine quantities of the same unit size—for instance, eighths can only be added directly to eighths—just as adding feet and meters requires converting to a shared unit first. Multiplication scales one ratio by another directly across numerators and denominators, automatically producing the new unit size b × d."
  - question: "How do I convert a repeating decimal like 0.3636... into an exact fraction?"
    answer: "Let x = 0.3636... and multiply by 10^k where k is the number of repeating digits (here k = 2, so 100x = 36.3636...). Subtracting the original equation cancels the infinite tail: 99x = 36, giving x = 36/99. Dividing numerator and denominator by gcd(36, 99) = 9 yields the exact reduced fraction 4/11."
  - question: "What is the fastest way to simplify a fraction with large numbers?"
    answer: "Compute the Greatest Common Divisor (GCD) of the numerator and denominator using the Euclidean algorithm—repeatedly replacing the larger number with the remainder of dividing the larger by the smaller until the remainder reaches zero—and divide both parts by that final GCD in one step."
  - question: "Why can't you multiply mixed numbers by multiplying whole parts and fraction parts separately?"
    answer: "A mixed number such as 2 1/2 represents a sum (2 + 1/2), not a product. Multiplying (2 + 1/2) × (3 + 1/4) requires all four distributive cross-terms, not just 2 × 3 plus 1/2 × 1/4. Converting mixed numbers into improper fractions (5/2 × 13/4 = 65/8 = 8 1/8) accounts for every cross-term automatically."
  - question: "Why does dividing by a proper fraction produce a larger result than the starting number?"
    answer: "Division measures how many copies of the divisor fit inside the dividend. Because a positive proper fraction like 1/4 is smaller than 1, four copies fit inside every single whole unit—so dividing 3 by 1/4 equals 3 × 4 = 12."
---

A rational **fraction** `a/b` (`b ≠ 0`) expresses an exact ratio between a numerator `a` (the number of counted parts) and a denominator `b` (the number of equal parts forming one unit). Unlike finite decimal approximations—where `1/3` truncates to `0.333` and accumulates rounding drift across chained steps—exact fraction arithmetic preserves full precision throughout engineering tolerances, carpentry dimensions, recipe scaling, and algebraic proofs.

The rules governing fractions depend strictly on the operation: addition and subtraction require aligning denominators to a common unit size via the Least Common Multiple (`LCM`), whereas multiplication operates directly across numerators and denominators, and division multiplies by the divisor's reciprocal. Perform exact arithmetic, mixed-number conversions, and Greatest Common Divisor (`GCD`) reduction automatically with our [Fraction Calculator](/en/calculators/fraction-calculator).

## Exact Fraction Arithmetic Laws and Reduction Rules

Fractions appear in three equivalent forms: **proper fractions** (`|a| < |b|`, such as `5/8`), **improper fractions** (`|a| ≥ |b|`, such as `17/8`), and **mixed numbers** (`W r/b`, equivalent to `(W × b + r) / b` for positive values, such as `2 1/8`). Always convert mixed numbers to improper fractions before multiplying or dividing.

```text
Addition:         (a / b) + (c / d) = (a × d + c × b) / (b × d)
Subtraction:      (a / b) − (c / d) = (a × d − c × b) / (b × d)
Multiplication:   (a / b) × (c / d) = (a × c) / (b × d)
Division:         (a / b) ÷ (c / d) = (a / b) × (d / c) = (a × d) / (b × c)   [c ≠ 0]
Least Common Den: LCD(b, d) = |b × d| / gcd(b, d)
Simplification:   (a / b)_reduced = [a ÷ gcd(|a|, |b|)] / [b ÷ gcd(|a|, |b|)]
```

Where:
- `b ≠ 0` and `d ≠ 0` are non-zero integer denominators.
- `gcd(x, y)` is the Greatest Common Divisor computed via the Euclidean algorithm.
- `LCD(b, d)` is the smallest positive integer divisible by both `b` and `d`, preventing oversized intermediate numerators.

### Cross-Cancellation and Euclidean Reduction

Before multiplying `(a/b) × (c/d)`, divide any shared factor between `a` and `d` or between `c` and `b`. Cross-canceling keeps products compact and avoids factoring huge composite numbers at the end. When reducing any final result `p/q`, use the Euclidean algorithm: `gcd(84, 36) → gcd(36, 12) → gcd(12, 0) = 12`, immediately reducing `84/36` to `7/3` (`2 1/3`).

## Step-by-Step Worked Examples

### Example 1: Mixed-Number Addition and Subtraction (`2 3/4 + 1 5/6 − 7/8`)

Suppose a cabinetmaker joins trim pieces measuring `2 3/4 in` and `1 5/6 in`, then trims a `7/8 in` rabbet cut.

1. **Convert Mixed Numbers to Improper Fractions:** `2 3/4 = (2 × 4 + 3)/4 = 11/4`, and `1 5/6 = (1 × 6 + 5)/6 = 11/6`. The expression becomes `11/4 + 11/6 − 7/8`.
2. **Find the Least Common Denominator (`LCD`):** The prime factorizations are `4 = 2²`, `6 = 2 × 3`, and `8 = 2³`. Taking the highest power of each prime gives `LCD(4, 6, 8) = 2³ × 3 = 24`.
3. **Scale Each Fraction to Denominator `24`:** Multiply `11/4 × 6/6 = 66/24`, `11/6 × 4/4 = 44/24`, and `7/8 × 3/3 = 21/24`.
4. **Combine Numerators and Reduce:** `(66 + 44 − 21) / 24 = 89/24`. Because `89` is prime and `gcd(89, 24) = 1`, `89/24` is irreducible; dividing `89 ÷ 24 = 3` with remainder `17` yields **`3 17/24 in`** (`3.7083 in`).

### Example 2: Division with Cross-Cancellation (`(14/15) ÷ (21/25)`)

1. **Keep, Change, Flip:** Keep `14/15`, change `÷` to `×`, and invert `21/25` to its reciprocal `25/21`, giving `(14/15) × (25/21)`.
2. **Cross-Cancel Common Factors:** Divide `14` and `21` by `gcd(14, 21) = 7` (leaving `2` and `3`), and divide `25` and `15` by `gcd(25, 15) = 5` (leaving `5` and `3`).
3. **Multiply Straight Across:** `(2/3) × (5/3) = (2 × 5) / (3 × 3) = 10/9`, or **`1 1/9`** (`1.1111...`).

## Operation Rules and Reference Comparison

| Operation / Form | Core Rule | Common Denominator? | Worked Example | Reduced Result | Decimal Value |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Addition** | Scale to `LCD`, add tops | Yes | `3/8 + 5/12 = 9/24 + 10/24` | `19/24` | `0.7917` |
| **Subtraction** | Scale to `LCD`, subtract tops | Yes | `5/6 − 1/4 = 10/12 − 3/12` | `7/12` | `0.5833` |
| **Multiplication** | Multiply tops & bottoms | No | `(3/4) × (8/9) = 24/36` | `2/3` | `0.6667` |
| **Division** | Multiply by reciprocal | No | `(2/5) ÷ (4/15) = (2/5) × (15/4)` | `3/2` (`1 1/2`) | `1.5000` |
| **Mixed to Improper** | `(W × b + r) / b` | Not applicable | `4 3/5 = (4 × 5 + 3) / 5` | `23/5` | `4.6000` |
| **Repeating Decimal** | `(10^k × x − x) / (10^k − 1)` | Not applicable | `0.2727... = 27/99` | `3/11` | `0.2727...` |

## Practical Applications, Common Errors, and Precision Caveats

Exact fractional arithmetic remains indispensable across US customary woodworking and CNC machining (working in `1/16`, `1/32`, and `1/64` inch increments), culinary batch scaling, chemical stoichiometry ratios, probability odds, and financial stock-split adjustments. Maintaining symbolic `a/b` form avoids cumulative truncation drift that occurs when rounding `1/3` to `0.33` or `1/6` to `0.17` mid-calculation (`0.33 + 0.33 + 0.33 = 0.99 ≠ 1`).

Watch for four common errors when performing manual fraction math:

- **Adding Denominators Directly:** Computing `1/2 + 1/3 = 2/5` treats unlike piece sizes as identical; the true sum is `5/6`.
- **Cross-Multiplying During Multiplication:** Cross-multiplying `(a×d)/(b×c)` belongs to division (`Keep, Change, Flip`) or solving proportions `a/b = c/d`, never straight multiplication.
- **Sign Mistakes on Negative Mixed Numbers:** `-2 1/4` equals `-(2 + 1/4) = -9/4`, NOT `(-2 × 4 + 1)/4 = -7/4`. Always apply the negative sign after converting the positive magnitude.
- **Zero-Divisor Traps:** A denominator of `0` is mathematically undefined, and dividing by `0/d` triggers a division-by-zero error because `0` has no multiplicative reciprocal.
