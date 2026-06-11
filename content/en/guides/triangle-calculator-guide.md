---
title: "Triangle Calculator Guide: Sides, Angles & Area"
description: "A thorough reference for solving any triangle using trigonometric laws (Law of Sines, Law of Cosines), the Pythagorean theorem, and Heron's formula for area."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "triangle-calculator"
---

## What Is a Triangle?

A triangle is a polygon with three sides and three angles. The sum of all interior angles is always exactly **180°**. This fundamental constraint — combined with the relationships between sides and angles — allows us to fully determine any triangle if we know enough information about it.

Triangles are classified in two ways:
- **By angles:** Acute (all angles < 90°), Right (one angle = 90°), Obtuse (one angle > 90°)
- **By sides:** Equilateral (all sides equal), Isosceles (two sides equal), Scalene (all sides different)

---

## The Pythagorean Theorem (Right Triangles)

For any right triangle with legs **a** and **b** and hypotenuse **c** (the side opposite the right angle):

$$
a^2 + b^2 = c^2
$$

**Example:** A right triangle has legs of 6 and 8. Find the hypotenuse.

$$
c = \sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10
$$

### Trigonometric Ratios (SOH-CAH-TOA)

For a right triangle with an angle θ, opposite side O, adjacent side A, and hypotenuse H:

$$
\sin\theta = \frac{O}{H}, \quad \cos\theta = \frac{A}{H}, \quad \tan\theta = \frac{O}{A}
$$

---

## Law of Sines

The Law of Sines applies to **any** triangle (right or oblique) and relates sides to their opposite angles:

$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$

**Best used when:** You know two angles and one side (AAS or ASA), or two sides and an angle opposite one of them (SSA — but watch for the ambiguous case).

**Example:** In triangle ABC, A = 45°, B = 70°, and side a = 12. Find side b.

First find C: C = 180° − 45° − 70° = 65°

$$
\frac{12}{\sin 45°} = \frac{b}{\sin 70°} \implies b = \frac{12 \times \sin 70°}{\sin 45°} = \frac{12 \times 0.9397}{0.7071} \approx 15.95
$$

---

## Law of Cosines

The Law of Cosines generalises the Pythagorean theorem to all triangles:

$$
c^2 = a^2 + b^2 - 2ab \cdot \cos C
$$

(And equivalently for sides a and b by cycling the labels.)

**Best used when:** You know three sides (SSS) or two sides and the included angle (SAS).

**Example:** A triangle has sides a = 7, b = 10, and included angle C = 50°. Find side c.

$$
c^2 = 7^2 + 10^2 - 2(7)(10)\cos(50°) = 49 + 100 - 140 \times 0.6428 = 149 - 89.99 = 59.01
$$
$$
c = \sqrt{59.01} \approx 7.68
$$

---

## Heron's Formula for Area

When you know all three side lengths (SSS), Heron's formula gives the area without needing an angle:

**Step 1** — Calculate the semi-perimeter:

$$
s = \frac{a + b + c}{2}
$$

**Step 2** — Apply Heron's formula:

$$
A = \sqrt{s(s-a)(s-b)(s-c)}
$$

**Example:** Triangle with sides 9, 12, and 15.

$$
s = \frac{9 + 12 + 15}{2} = 18
$$
$$
A = \sqrt{18(18-9)(18-12)(18-15)} = \sqrt{18 \times 9 \times 6 \times 3} = \sqrt{2916} = 54 \text{ square units}
$$

*(Note: this is also a right triangle since 9² + 12² = 225 = 15², confirming the area using ½ × 9 × 12 = 54.)*

---

## Decision Table — Which Method to Use?

| Given Information | Configuration | Method to Use |
|---|---|---|
| Three sides | SSS | Law of Cosines → Heron's formula for area |
| Two sides + included angle | SAS | Law of Cosines → Law of Sines for remaining |
| Two angles + one side | AAS or ASA | Law of Sines (find third angle first: 180° − A − B) |
| Two sides + non-included angle | SSA | Law of Sines (check for ambiguous case) |
| Hypotenuse + one leg (right Δ) | Right triangle | Pythagorean theorem + SOH-CAH-TOA |
| All three angles only | AAA | Shape determined but NOT size (infinite solutions) |

---

## Full Example — Solving an Oblique Triangle (SAS)

**Problem:** A surveyor measures two sides of a triangular plot of land as **120 m** and **85 m**, with an included angle of **67°**. Find the third side, the other two angles, and the area.

**Step 1 — Find the third side using Law of Cosines (c² = a² + b² − 2ab·cosC):**

$$
c^2 = 120^2 + 85^2 - 2(120)(85)\cos(67°)
$$
$$
= 14{,}400 + 7{,}225 - 20{,}400 \times 0.3907 = 21{,}625 - 7{,}970 = 13{,}655
$$
$$
c \approx 116.9 \text{ m}
$$

**Step 2 — Find angle A using Law of Sines:**

$$
\frac{\sin A}{120} = \frac{\sin 67°}{116.9} \implies \sin A = \frac{120 \times 0.9205}{116.9} \approx 0.9449 \implies A \approx 70.8°
$$

**Step 3 — Find angle B:**

$$
B = 180° - 67° - 70.8° = 42.2°
$$

**Step 4 — Calculate area:**

$$
\text{Area} = \frac{1}{2} \times 120 \times 85 \times \sin(67°) = 0.5 \times 120 \times 85 \times 0.9205 \approx 4{,}698 \text{ m}^2
$$

---

## Frequently Asked Questions

**Q: What is the ambiguous case (SSA)?**
A: When given two sides and a non-included angle (SSA), the Law of Sines may produce 0, 1, or 2 valid triangles. Given sides a, b and angle A: if a < b·sinA, no triangle exists; if a = b·sinA, exactly one right triangle exists; if b·sinA < a < b, two triangles are possible (you must solve for both and check which is valid in context); if a ≥ b, exactly one triangle exists.

**Q: Can I use the Law of Cosines for right triangles?**
A: Yes. When C = 90°, cos(90°) = 0, so the term 2ab·cosC vanishes and the formula reduces exactly to the Pythagorean theorem: c² = a² + b².

**Q: What if I only have three angles (AAA)?**
A: Three angles determine the *shape* of a triangle (all such triangles are similar) but not its *size*. An infinite number of triangles satisfy AAA, scaled differently. You need at least one side length to determine a unique triangle.

**Q: Are there other area formulas besides Heron's and ½·base·height?**
A: Yes. When two sides and an included angle are known: Area = ½·a·b·sinC. This is often the quickest method for SAS configurations and avoids needing the third side first.

**Q: What is the exterior angle theorem?**
A: An exterior angle of a triangle equals the sum of the two non-adjacent interior angles. This is a handy shortcut: if two angles are 45° and 70°, the exterior angle at the third vertex is 115°.
