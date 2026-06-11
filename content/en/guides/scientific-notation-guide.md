---
title: "Scientific Notation Made Simple: Format, Convert & Calculate"
description: "Learn how to read and write numbers in scientific notation, perform arithmetic operations, convert between standard and scientific form, and avoid common mistakes."
category: "Math & Science"
readingTime: 5
lastUpdated: "2026-06-11"
relatedCalculator: "scientific-notation-calculator"
---

## What Is Scientific Notation?

**Scientific notation** is a compact way of expressing very large or very small numbers — numbers that would be inconveniently long to write in standard decimal form. It is the universal language of science and engineering, used by physicists describing subatomic particles, astronomers measuring galactic distances, and chemists counting molecules.

A number in scientific notation takes the form:

$$
a \times 10^n
$$

Where:
- **a** is the **coefficient** (also called the mantissa or significand), and must satisfy **1 ≤ |a| < 10**
- **n** is an **integer exponent** (positive for large numbers, negative for small numbers)

---

## The Formula for Conversion

### Converting Large Numbers (Standard → Scientific)

Move the decimal point **left** until one non-zero digit remains to its left. Count the number of places moved — that becomes the positive exponent.

**Example:** 4,700,000

- Move decimal left 6 places: 4.7
- Exponent = +6

$$
4{,}700{,}000 = 4.7 \times 10^6
$$

### Converting Small Numbers (Standard → Scientific)

Move the decimal point **right** until one non-zero digit sits to its left. Count the places — that is the negative exponent.

**Example:** 0.000047

- Move decimal right 5 places: 4.7
- Exponent = −5

$$
0.000047 = 4.7 \times 10^{-5}
$$

---

## Step-by-Step Guide

### Step 1 — Identify the Leading Non-Zero Digit

Locate the first significant (non-zero) digit in the number. This will be the first digit of your coefficient.

### Step 2 — Place the Decimal After the Leading Digit

Write the coefficient with the decimal point immediately after the first significant digit. Include all remaining significant figures.

### Step 3 — Count the Decimal Movement

Count how many places you moved the decimal from its original position:
- Moved **left** → positive exponent
- Moved **right** → negative exponent

### Step 4 — Write the Full Expression

Combine the coefficient and power of 10: **a × 10ⁿ**

---

## Arithmetic Operations

### Multiplication

Multiply the coefficients, then **add** the exponents.

$$
(a \times 10^m) \times (b \times 10^n) = (a \times b) \times 10^{m+n}
$$

**Example:** $(3.0 \times 10^4) \times (2.5 \times 10^3)$

$$
= (3.0 \times 2.5) \times 10^{4+3} = 7.5 \times 10^7
$$

### Division

Divide the coefficients, then **subtract** the exponents.

$$
\frac{a \times 10^m}{b \times 10^n} = \frac{a}{b} \times 10^{m-n}
$$

**Example:** $\frac{9.6 \times 10^8}{3.2 \times 10^3}$

$$
= 3.0 \times 10^{8-3} = 3.0 \times 10^5
$$

### Addition and Subtraction

Before adding or subtracting, **both numbers must have the same exponent**. Adjust the smaller-exponent number before performing the operation.

**Example:** $(5.4 \times 10^6) + (2.0 \times 10^5)$

- Rewrite second term: $2.0 \times 10^5 = 0.20 \times 10^6$
- Add: $(5.4 + 0.20) \times 10^6 = 5.6 \times 10^6$

---

## Real-World Uses

Scientific notation appears across virtually every scientific discipline:

- **Astronomy:** The distance from Earth to the nearest star, Proxima Centauri, is approximately $4.0 \times 10^{16}$ metres (40 quadrillion metres).
- **Chemistry:** One mole of substance contains $6.022 \times 10^{23}$ particles (Avogadro's number).
- **Physics:** The charge of a proton is $1.602 \times 10^{-19}$ coulombs.
- **Biology:** A human red blood cell is approximately $8 \times 10^{-6}$ metres (8 micrometres) in diameter.
- **Computer Science:** A modern CPU transistor is roughly $5 \times 10^{-9}$ metres (5 nanometres) wide.

---

## Common Errors Reference Table

| Error | Incorrect | Correct | Explanation |
|---|---|---|---|
| Coefficient ≥ 10 | $47 \times 10^4$ | $4.7 \times 10^5$ | Coefficient must be in [1, 10) |
| Coefficient < 1 | $0.47 \times 10^6$ | $4.7 \times 10^5$ | Adjust decimal and exponent |
| Wrong sign on exponent | $0.000047 = 4.7 \times 10^5$ | $4.7 \times 10^{-5}$ | Small numbers have negative exponents |
| Adding without matching exponents | $(3.0 + 2.0) \times 10^{4+3}$ | Align to same power first | Exponents are not summed in addition |
| Forgetting to re-normalize after multiplication | $12.0 \times 10^5$ | $1.2 \times 10^6$ | Result must still satisfy 1 ≤ |a| < 10 |

---

## Frequently Asked Questions

**Q: What is E-notation and how does it relate to scientific notation?**
A: E-notation (used by calculators and programming languages) replaces "× 10^" with the letter E. For example, $4.7 \times 10^{-5}$ becomes `4.7E-5`. They are mathematically identical.

**Q: Can the coefficient be negative?**
A: Yes. For negative numbers, the coefficient is negative: $-6.022 \times 10^{23}$ is valid. The rule |a| < 10 applies to the absolute value of the coefficient.

**Q: How many significant figures should I use?**
A: Match the number of significant figures to the precision of your measurement. In scientific work, do not round prematurely. If your input has 3 significant figures, keep 3 in the result.

**Q: What is the difference between scientific notation and engineering notation?**
A: Engineering notation restricts the exponent to multiples of 3 (…, −6, −3, 0, 3, 6, …), aligning with SI prefixes like micro (10⁻⁶), milli (10⁻³), kilo (10³). This means the coefficient can range from 1 to 999. Scientific notation is more general.
