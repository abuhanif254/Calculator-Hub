---
title: "Binary Calculator"
metaTitle: "Binary Calculator | Base-2 Arithmetic & Bitwise Logic Solver"
metaDescription: "Free online Binary Calculator. Perform binary addition, subtraction, multiplication, division, bitwise logical operations (AND, OR, XOR, NOT), and character conversions with step-by-step math."
metaKeywords: "binary calculator, binary converter, bitwise operations, two's complement, signed binary numbers, binary math solver, hex to binary, base 2 calculator"
faqs:
  - question: "What is the binary number system?"
    answer: "The binary number system (base-2) is a mathematical representation that uses only two digits: 0 and 1. It is the fundamental language of computers because it corresponds directly to the on/off states of electrical circuits (transistors) in CPU registers."
  - question: "How does binary addition work?"
    answer: "Binary addition follows similar rules to decimal addition, but with base 2: 0+0=0, 0+1=1, 1+0=1, and 1+1=0 (with 1 carried to the next column). When there is a carry-in and 1+1+1, the result is 1 with a carry-out of 1."
  - question: "What are signed and unsigned integers in binary?"
    answer: "Unsigned integers represent only positive numbers and use all bits to express value. Signed integers represent both positive and negative values. Modern computer hardware almost universally uses Two's Complement representation to store negative binary numbers, where the most significant bit (MSB) acts as a sign bit."
  - question: "What is Two's Complement and how is it calculated?"
    answer: "Two's Complement is a mathematical scheme to store negative integers in binary. To find the two's complement representation of a negative number: 1) write the positive number in binary, 2) invert all the bits (one's complement), and 3) add 1 to the least significant bit (LSB)."
  - question: "What are bitwise logical operations?"
    answer: "Bitwise operations perform logical actions on individual bits of binary numbers. Standard operations include AND (returns 1 if both bits are 1), OR (returns 1 if at least one bit is 1), XOR (returns 1 if bits are different), and NOT (inverts all bits)."
  - question: "How does binary shift work (left vs right shift)?"
    answer: "A left shift (<<) moves bits to the left, filling empty spaces with 0, which mathematically multiplies the integer by 2 for each shifted position. A right shift (>>) moves bits to the right. In unsigned numbers, it fills empty spaces with 0 (logical shift). In signed numbers, it can preserve the sign bit (arithmetic shift). This divides the integer by 2."
  - question: "How do you convert binary to decimal?"
    answer: "To convert a binary number to decimal, sum the products of each digit and its positional base-2 value (weights). Starting from the right (LSB) at weight 2^0, then 2^1, 2^2, and so on. For example, 1010 equals (1*8) + (0*4) + (1*2) + (0*1) = 10."
  - question: "How do you convert a fraction or decimal decimal point to binary?"
    answer: "For the fractional part of a decimal number, multiply the fraction by 2. The integer part of the result (0 or 1) becomes the next binary digit after the decimal point. Repeat the process with the remaining fraction until it reaches 0 or begins repeating."
  - question: "Why do computers use Hexadecimal and Octal alongside Binary?"
    answer: "Hexadecimal (base-16) and Octal (base-8) are used because they are clean shorthand forms of binary. One hex digit represents exactly 4 bits (a nibble), and one octal digit represents 3 bits. This makes reading and writing long bit strings much easier for human developers."
  - question: "How is floating-point binary represented (IEEE 754)?"
    answer: "Under the IEEE 754 standard, floating-point numbers are divided into three components: a Sign bit (determining positive or negative), Exponent bits (representing scale), and Fraction/Mantissa bits (representing precision). For example, single-precision floats use 32 bits (1 sign, 8 exponent, 23 mantissa)."
---

## Introduction to the Binary Number System

At the heart of every modern computing device sits a simple, elegant system of zeros and ones: the **binary number system** (or base-2). While humans have historically preferred decimal notation (base-10)—likely due to having ten fingers—computers are built on physical electrical pathways that can either be "on" or "off."

In this guide, we will break down binary arithmetic, look at bitwise logical gates, explore computer architecture and data representation, and see how to convert between base systems (decimal, binary, hexadecimal, and octal). Whether you are an undergraduate computer science student, a developer writing low-level firmware, a networking engineer configuring subnets, or a cybersecurity researcher analyzing buffer overflows, a deep understanding of binary numbers is essential.

---

## The Mathematics of Base-2

A positional number system represents numbers by placing digits in sequential columns. Each column corresponds to a multiplier base raised to an exponent.

In the **decimal system (base-10)**, the columns from right to left represent units ($10^0 = 1$), tens ($10^1 = 10$), hundreds ($10^2 = 100$), and so forth.

In the **binary system (base-2)**, the columns represent powers of two:
*   **$2^0$** = 1 (Least Significant Bit - LSB)
*   **$2^1$** = 2
*   **$2^2$** = 4
*   **$2^3$** = 8
*   **$2^4$** = 16
*   **$2^5$** = 32
*   **$2^6$** = 64
*   **$2^7$** = 128 (Most Significant Bit - MSB in a single byte)

To represent the decimal value `13` in binary, we decompose it into powers of two:
$$13 = 8 + 4 + 1 = (1 \times 2^3) + (1 \times 2^2) + (0 \times 2^1) + (1 \times 2^0)$$
Written sequentially, this gives us `1101` in binary.

---

## Binary Arithmetic Operations

Performing arithmetic in binary follows the exact same logic as decimal math, but your carry and borrow thresholds are triggered at 2 instead of 10.

### 1. Binary Addition
The four fundamental rules of binary addition are:
*   $0 + 0 = 0$
*   $0 + 1 = 1$
*   $1 + 0 = 1$
*   $1 + 1 = 10$ (write `0`, carry `1`)
*   $1 + 1 + 1$ (with carry-in) $= 11$ (write `1`, carry `1`)

**Example:** Adding $1101_2$ (13) and $0110_2$ (6):
```
  Carry: 1100
         1101  (13)
       + 0110  (6)
       ------
        10011  (19)
```

### 2. Binary Subtraction
Binary subtraction relies on "borrowing" from the next column. When borrowing, you borrow a value of $2$ ($10_2$):
*   $0 - 0 = 0$
*   $1 - 0 = 1$
*   $1 - 1 = 0$
*   $0 - 1 = 1$ (borrow $1$ from the next active column, turning the $0$ into $2$)

In modern CPUs, subtraction is actually performed using **addition**. The minuend is added to the two's complement representation of the subtrahend. This eliminates the need for separate subtraction circuits in hardware.

### 3. Binary Multiplication
Binary multiplication is simpler than decimal multiplication because you only multiply by 0 or 1.
*   $0 \times 0 = 0$
*   $0 \times 1 = 0$
*   $1 \times 0 = 0$
*   $1 \times 1 = 1$

You perform standard partial products and shift them, then add the columns.
**Example:** $101_2 \times 011_2$ (5 $\times$ 3):
```
         101
       × 011
       -----
         101   (101 × 1)
        1010   (101 × 1, shifted left)
      + 00000  (101 × 0, shifted left twice)
      -------
        1111   (15 in decimal)
```

### 4. Binary Division
Binary division uses long division rules. You check if the divisor fits into the current portion of the dividend. If yes, write `1` in the quotient, subtract, pull down the next digit, and repeat. If no, write `0`, pull down the next digit, and repeat.

---

## Data Representation: Signed vs. Unsigned

How a CPU interprets a sequence of bits depends on the data type definition.

### Unsigned Integers
In unsigned mode, every bit is used to store positive numerical magnitude. In an 8-bit byte, the values range from $00000000_2$ (0) to $11111111_2$ ($128+64+32+16+8+4+2+1 = 255$). The formula for the maximum range is $2^n - 1$, where $n$ is the word size in bits.

### Signed Integers (Two's Complement)
To represent negative numbers, computer science uses **Two's Complement**. In this scheme, the most significant bit (MSB) acts as the sign bit. If MSB is `0`, the number is positive. If MSB is `1`, the number is negative.

To find the Two's Complement representation of $-5$ in an 8-bit space:
1.  Represent $+5$ in binary: `00000101`
2.  Invert all bits (One's Complement): `11111010`
3.  Add 1 to the LSB: `11111011`

Thus, `11111011` represents $-5$. When we add $+5$ (`00000101`) and $-5$ (`11111011`), the arithmetic naturally overflows back to `00000000` (ignoring the final carry-out bit), proving the mathematical consistency of this system.

---

## Bitwise Logical Operations

Bitwise operations perform boolean logic on a bit-by-bit basis between two binary inputs. These operations are executed in a single CPU clock cycle, making them fast and highly efficient.

| Gate | Name | Rule | Truth Table Example |
| :--- | :--- | :--- | :--- |
| **AND** | Conjunction | Output is 1 only if both inputs are 1. | `1 AND 1 = 1`, `1 AND 0 = 0` |
| **OR** | Disjunction | Output is 1 if at least one input is 1. | `1 OR 0 = 1`, `0 OR 0 = 0` |
| **XOR** | Exclusive OR | Output is 1 if inputs are different. | `1 XOR 0 = 1`, `1 XOR 1 = 0` |
| **NOT** | Inverter | Inverts the input bit. | `NOT 1 = 0`, `NOT 0 = 1` |
| **NAND** | Not AND | Output is 0 only if both inputs are 1. | `1 NAND 1 = 0`, `1 NAND 0 = 1` |
| **NOR** | Not OR | Output is 1 only if both inputs are 0. | `1 NOR 0 = 0`, `0 NOR 0 = 1` |
| **XNOR** | Equivalence | Output is 1 if inputs are identical. | `1 XNOR 1 = 1`, `1 XNOR 0 = 0` |

### Bitwise Shifting
*   **Left Shift (`<<`):** Moves all bits left by a specified number of positions, discarding the leftmost bits and padding the right with zeros. This acts as a rapid multiplication by powers of 2.
*   **Right Shift (`>>`):** Moves all bits right.
    *   *Logical Right Shift:* Pads the left side with zeros (used for unsigned numbers).
    *   *Arithmetic Right Shift:* Pads the left side with copies of the sign bit to preserve negative values (used for signed integers).

---

## Number System Conversions

Programmers often convert between binary, octal, decimal, and hexadecimal.

### Binary to Hexadecimal
Hexadecimal (base-16) uses numbers `0-9` and letters `A-F` to represent values $10$ to $15$. Since $16 = 2^4$, exactly 4 binary bits (a nibble) correspond to 1 hexadecimal character:
*   `0000` = 0
*   `1001` = 9
*   `1010` = A
*   `1111` = F

To convert `11010111` to hex, split it into two nibbles:
- `1101` = 13 (Hex `D`)
- `0111` = 7 (Hex `7`)
So `11010111` in binary is `D7` in hexadecimal.

### Binary to Octal
Octal (base-8) uses digits `0-7`. Since $8 = 2^3$, exactly 3 binary bits correspond to 1 octal character. Split the binary number into groups of 3 starting from the right.

---

## Floating Point Binary Numbers (IEEE 754)

Not all numbers are integers; real-world math requires decimals/fractions. In binary, fractional representation uses a decimal point (radix point) where columns to the right represent negative powers of two:
$$2^{-1} = 0.5$$
$$2^{-2} = 0.25$$
$$2^{-3} = 0.125$$

To represent very large or very small numbers, computers use the **IEEE 754 Floating-Point Standard**. In single-precision format (32-bit float):
1.  **Sign Bit (1 bit):** `0` for positive, `1` for negative.
2.  **Exponent (8 bits):** Biased by 127 to allow positive and negative exponents.
3.  **Mantissa / Fraction (23 bits):** Represents the precision bits of the normalized number.

This structured allocation allows computers to handle massive scientific ranges while maintaining uniform memory layouts.

---

## Practical Applications

### 1. Software Development
In systems programming (like C, C++, Rust), developers use bitwise operations for packing data, writing device drivers, parsing network headers, and implementing memory-mapped I/O.

### 2. Networking
IP addresses are processed by hardware as 32-bit binary strings. The Subnet Mask is used in a bitwise AND operation with the IP Address to isolate the Network Address from the Host Address.

### 3. Cybersecurity & Cryptography
Ciphers (like AES or ChaCha20) make heavy use of XOR operations because XORing a message with a key encrypts it, and XORing it again with the same key decrypts it. Security practitioners also inspect raw binary payloads (shellcode) to debug security exploits.
