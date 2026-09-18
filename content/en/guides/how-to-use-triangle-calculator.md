---
title: "How to Use the Triangle Calculator for Geometry & Trigonometry"
description: "Master solving any triangle: Right triangles, Pythagorean theorem, Law of Sines, Law of Cosines, Heron's formula, and circumradius with our free Triangle Calculator."
category: "Math & Science"
readingTime: 9
lastUpdated: "2026-09-19"
relatedCalculator: "triangle-calculator"
---

# How to Use the Triangle Calculator for Geometry & Trigonometry

Triangles are the foundational polygon of Euclidean geometry, architectural engineering, computer graphics rendering, navigation, and celestial mechanics. Because any polygon with $n$ sides can be decomposed into $n - 2$ interconnected triangles, mastering the mathematical principles governing triangles is essential across STEM disciplines and skilled construction trades.

However, solving an arbitrary triangle—determining all three side lengths ($a, b, c$), all three interior angles ($\alpha, \beta, \gamma$), the enclosed surface area, perimeter, inradius, and circumradius—requires different mathematical theorems depending on which initial properties are known.

This definitive reference guide breaks down every geometric theorem used to solve triangles, explores right-angled and oblique geometries, explains how to navigate the ambiguous SSA case, and demonstrates how to use the [Triangle Calculator](/en/calculators/triangle-calculator) to solve any triangle in seconds.

---

## Universal Geometric Laws Governing All Planar Triangles

Before applying trigonometric laws, every two-dimensional triangle in Euclidean space must satisfy two fundamental mathematical axioms:

### 1. The Interior Angle Sum Theorem
The sum of the three interior angles in any planar triangle always equals exactly **180 degrees** ($\pi$ radians):

$$
\alpha + \beta + \gamma = 180^\circ \quad (\pi \text{ radians})
$$

If two interior angles are known, the third angle is immediately determined without trigonometric ratios:

$$
\gamma = 180^\circ - (\alpha + \beta)
$$

### 2. The Triangle Inequality Theorem
The sum of the lengths of any two sides of a triangle must strictly exceed the length of the remaining third side. If this condition is violated, the three line segments cannot physically connect to enclose a two-dimensional area:

$$
a + b > c, \quad a + c > b, \quad b + c > a
$$

For example, segments of lengths $4\text{ cm}$, $5\text{ cm}$, and $10\text{ cm}$ cannot form a triangle because $4 + 5 = 9 \le 10$.

---

## Master Classification: Triangle Solving Strategies by Input Case

Depending on the three parameters you know, use this reference table to identify the required mathematical theorem:

| Given Knowns | Case Name | Primary Theorem Used | Number of Possible Solutions |
| :--- | :--- | :--- | :--- |
| **3 Sides** | **SSS (Side-Side-Side)** | Law of Cosines $\rightarrow$ Law of Sines | Exactly 1 valid triangle (if inequality holds) |
| **2 Sides + Included Angle** | **SAS (Side-Angle-Side)** | Law of Cosines $\rightarrow$ Law of Sines | Exactly 1 unique triangle |
| **2 Angles + Included Side** | **ASA (Angle-Side-Angle)** | Angle Sum Theorem $\rightarrow$ Law of Sines | Exactly 1 unique triangle |
| **2 Angles + Non-Included Side** | **AAS (Angle-Angle-Side)** | Angle Sum Theorem $\rightarrow$ Law of Sines | Exactly 1 unique triangle |
| **2 Sides + Non-Included Angle** | **SSA (Side-Side-Angle)** | Law of Sines (Ambiguous Case) | **0, 1, or 2 valid triangles** |
| **3 Angles** | **AAA (Angle-Angle-Angle)** | Similar triangles | Infinitely many (shape known, scale undefined) |

---

## 1. Right-Angled Triangles (Pythagorean Theorem & SOH-CAH-TOA)

When one of the interior angles is exactly $90^\circ$ ($\pi/2$ radians), the triangle is a **Right Triangle**. Solving right triangles does not require the generalized Law of Cosines because the cosine of $90^\circ$ is zero.

### The Pythagorean Theorem
For a right triangle with perpendicular legs $a$ and $b$ and hypotenuse $c$ (the longest side, opposite the right angle):

$$
a^2 + b^2 = c^2 \implies c = \sqrt{a^2 + b^2}
$$

$$
a = \sqrt{c^2 - b^2}, \quad b = \sqrt{c^2 - a^2}
$$

### Fundamental Trigonometric Ratios (SOH-CAH-TOA)
For an acute angle $\theta$ in a right triangle:
* **Sine ($\sin$):** $\sin\theta = \frac{\text{Opposite}}{\text{Hypotenuse}}$
* **Cosine ($\cos$):** $\cos\theta = \frac{\text{Adjacent}}{\text{Hypotenuse}}$
* **Tangent ($\tan$):** $\tan\theta = \frac{\text{Opposite}}{\text{Adjacent}}$

---

## 2. Oblique Triangles: The Law of Sines

The **Law of Sines** establishes that the ratio of each side length to the sine of its opposite angle is invariant across all three vertices:

$$
\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R
$$

Where $R$ is the radius of the triangle's **circumscribed circle (circumradius)**.

### The Ambiguous SSA Case (0, 1, or 2 Solutions)
When given two sides and a non-included acute angle (SSA, where you know $a, b$, and angle $\alpha < 90^\circ$), the altitude from vertex $C$ to side $c$ is $h = b\sin\alpha$. Three distinct geometric outcomes can occur:
1. **$a < h$**: Side $a$ is too short to reach the baseline. **Zero triangles exist**.
2. **$a = h$**: Side $a$ reaches the baseline perpendicularly. **Exactly one right triangle exists**.
3. **$h < a < b$**: Side $a$ can swing in two directions, intersecting the baseline at two distinct points. **Two valid triangles exist** (one acute, one obtuse).
4. **$a \ge b$**: Side $a$ can only swing outward. **Exactly one unique triangle exists**.

---

## 3. Oblique Triangles: The Law of Cosines

The **Law of Cosines** is the universal generalization of the Pythagorean theorem for any planar triangle:

$$
c^2 = a^2 + b^2 - 2ab\cos\gamma
$$

$$
b^2 = a^2 + c^2 - 2ac\cos\beta
$$

$$
a^2 = b^2 + c^2 - 2bc\cos\alpha
$$

### Solving for Angles When All Three Sides Are Known (SSS)
Rearranging the Law of Cosines allows you to calculate angles directly from side lengths:

$$
\cos\gamma = \frac{a^2 + b^2 - c^2}{2ab} \implies \gamma = \arccos\left(\frac{a^2 + b^2 - c^2}{2ab}\right)
$$

> **Pro Tip:** When solving an SSS triangle, always use the Law of Cosines to solve for the **largest angle first** (the angle opposite the longest side). Because the inverse cosine function ($\arccos$) returns values from $0^\circ$ to $180^\circ$, it unambiguously identifies whether the triangle has an obtuse angle ($> 90^\circ$).

---

## 4. Calculating the Area of a Triangle

Depending on your known inputs, choose the most direct area formula:

### Standard Base-Height Formula
When a base $b$ and its perpendicular altitude $h$ are known:

$$
\text{Area} = \frac{1}{2} \times b \times h
$$

### Trigonometric (SAS) Area Formula
When two sides and the included angle between them are known:

$$
\text{Area} = \frac{1}{2}ab\sin\gamma = \frac{1}{2}bc\sin\alpha = \frac{1}{2}ac\sin\beta
$$

### Heron's Formula (SSS Area)
When all three side lengths ($a, b, c$) are known without any angles or heights. First calculate the **semi-perimeter** ($s$):

$$
s = \frac{a + b + c}{2}
$$

Then compute the enclosed area:

$$
\text{Area} = \sqrt{s(s - a)(s - b)(s - c)}
$$

---

## Advanced Geometric Properties: Inradius & Circumradius

In engineering, mechanical gearing, and computer graphics, calculating the circles inscribed within and circumscribed around a triangle is a routine requirement:

### Inradius ($r$)
The radius of the largest circle that fits completely inside the triangle, tangent to all three sides:

$$
r = \frac{\text{Area}}{s} = \frac{\text{Area}}{\frac{a + b + c}{2}}
$$

### Circumradius ($R$)
The radius of the circle that passes through all three vertices of the triangle:

$$
R = \frac{a \times b \times c}{4 \times \text{Area}} = \frac{a}{2\sin\alpha}
$$

---

## Step-by-Step Worked Examples

### Worked Example: Solving an SAS Triangle
**Given:** Side $a = 7.0\text{ cm}$, Side $b = 10.0\text{ cm}$, Included Angle $\gamma = 48.0^\circ$. Find side $c$, angles $\alpha$ and $\beta$, and the area.

**Step 1: Find side $c$ using Law of Cosines:**
$$
c^2 = 7^2 + 10^2 - 2(7)(10)\cos(48^\circ) = 49 + 100 - 140(0.66913) = 149 - 93.678 = 55.322
$$
$$
c = \sqrt{55.322} \approx 7.438\text{ cm}
$$

**Step 2: Find angle $\alpha$ using Law of Sines:**
$$
\frac{7.0}{\sin\alpha} = \frac{7.438}{\sin 48^\circ} \implies \sin\alpha = \frac{7.0 \times \sin 48^\circ}{7.438} = \frac{7.0 \times 0.74314}{7.438} \approx 0.69938
$$
$$
\alpha = \arcsin(0.69938) \approx 44.38^\circ
$$

**Step 3: Find angle $\beta$ using the Angle Sum Theorem:**
$$
\beta = 180^\circ - (44.38^\circ + 48.0^\circ) = 180^\circ - 92.38^\circ = 87.62^\circ
$$

**Step 4: Calculate the Area:**
$$
\text{Area} = \frac{1}{2}ab\sin\gamma = 0.5 \times 7 \times 10 \times \sin(48^\circ) = 35 \times 0.74314 \approx 26.01\text{ cm}^2
$$

---

## How to Use the Triangle Calculator

Our free [Triangle Calculator](/en/calculators/triangle-calculator) eliminates manual trigonometric errors:

1. **Select Your Known Inputs**: Choose your input combination from the dropdown: **SSS**, **SAS**, **ASA**, **AAS**, or **SSA**.
2. **Enter Values**: Input your side lengths and angles (choose between Degrees and Radians).
3. **Instant Geometry Engine**: The calculator validates the Triangle Inequality Theorem, checks for the ambiguous SSA case, and computes:
   - All three sides ($a, b, c$) and all three interior angles ($\alpha, \beta, \gamma$)
   - Total Perimeter and Semi-Perimeter ($s$)
   - Enclosed Surface Area
   - Triangle Classification (Acute, Right, or Obtuse; Scalene, Isosceles, or Equilateral)
   - Inradius ($r$), Circumradius ($R$), and all three Altitudes ($h_a, h_b, h_c$)
