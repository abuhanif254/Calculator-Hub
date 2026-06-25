---
title: "How to Use the Triangle Calculator for Geometry & Trigonometry"
description: "A guide on calculating sides, angles, and area of triangles using the Pythagorean theorem, the Law of Sines, and the Law of Cosines."
---

# How to Use the Triangle Calculator for Geometry & Trigonometry

Triangles are the foundational shape of geometry, engineering, architecture, and trigonometry. Understanding how to calculate the unknown properties of a triangle based on a few known inputs is a critical skill for students, carpenters, and structural engineers alike.

Depending on what information you have, solving a triangle requires different mathematical laws. This guide explains the core principles of trigonometry and how a [Triangle Calculator](/en/calculators/triangle-calculator) utilizes these laws to instantly solve any triangle.

## The Basic Rules of Triangles

Before diving into complex formulas, every triangle must adhere to a few strict rules:
1.  **The Angle Sum Theorem:** The sum of all three interior angles in any planar triangle always equals exactly **180 degrees** (or π radians).
2.  **The Triangle Inequality Theorem:** The sum of the lengths of any two sides of a triangle must always be strictly greater than the length of the remaining third side. If this rule is broken, the triangle cannot physically exist.

## 1. Right-Angled Triangles (The Pythagorean Theorem)

If you know that one of the angles in your triangle is exactly 90 degrees (a Right Triangle), the calculations are incredibly straightforward thanks to the Pythagorean theorem.

**The Formula:**
**a² + b² = c²**

Where:
*   **a** and **b** are the legs of the triangle (the sides forming the 90-degree angle).
*   **c** is the hypotenuse (the longest side, opposite the right angle).

If you know any two sides of a right triangle, you can easily find the third. Furthermore, you can use basic SOH CAH TOA trigonometric ratios (Sine, Cosine, Tangent) to find the remaining angles.

## 2. Solving Non-Right Triangles (Oblique Triangles)

When a triangle does not have a 90-degree angle, you cannot use the Pythagorean theorem. Instead, you must rely on two powerful trigonometric rules: the **Law of Sines** and the **Law of Cosines**.

To solve an oblique triangle, you need to know at least three parameters (sides and/or angles), and at least one of those parameters must be a side length.

### The Law of Sines
The Law of Sines states that the ratio of the length of a side to the sine of its opposite angle is constant for all three sides of the triangle.

**The Formula:**
**a / sin(A) = b / sin(B) = c / sin(C)**

The Law of Sines is perfect for solving triangles when you know:
*   **AAS (Angle-Angle-Side):** Two angles and a non-included side.
*   **ASA (Angle-Side-Angle):** Two angles and the included side.
*   **SSA (Side-Side-Angle):** Two sides and a non-included angle (Note: This is known as the "Ambiguous Case" because it can sometimes result in two valid triangles, one valid triangle, or zero valid triangles).

### The Law of Cosines
The Law of Cosines is a generalized version of the Pythagorean theorem that works for any triangle. It relates all three sides of a triangle to the cosine of one of its angles.

**The Formula:**
**c² = a² + b² - 2ab × cos(C)**

The Law of Cosines is required when you know:
*   **SAS (Side-Angle-Side):** Two sides and the angle between them.
*   **SSS (Side-Side-Side):** All three side lengths, and you need to find the angles.

## Calculating the Area of a Triangle

There are multiple ways to find the area of a triangle depending on what inputs you have.

**1. Base and Height Method:**
If you know the base ($b$) and the vertical height ($h$), the formula is simple:
**Area = (1/2) × b × h**

**2. Heron's Formula (When only sides are known):**
If you know all three side lengths ($a$, $b$, $c$) but not the height, you can use Heron's formula.
First, calculate the semi-perimeter ($s$):
$s = (a + b + c) / 2$
Then calculate the area:
**Area = √[ s(s-a)(s-b)(s-c) ]**

**3. Trigonometric Method (SAS):**
If you know two sides and the included angle, the area is:
**Area = (1/2) × a × b × sin(C)**

## Using the Triangle Calculator

Attempting to solve the Law of Cosines or Heron's Formula by hand is prone to arithmetic errors, especially when dealing with decimal degrees or radians. 

By inputting your known variables (AAS, SAS, SSS, etc.) into a [Triangle Calculator](/en/calculators/triangle-calculator), the tool automatically determines whether to use the Law of Sines or the Law of Cosines, validates that the triangle is physically possible via the Triangle Inequality Theorem, and instantly outputs the remaining sides, angles, area, and perimeter.
