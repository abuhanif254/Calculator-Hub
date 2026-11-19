---
title: "Volume Calculator"
metaTitle: "Free Volume Calculator | Calculate Volume of 3D Shapes"
description: "Calculate the exact three-dimensional volume and liquid capacity of cylinders, spheres, cubes, cones, pyramids, and rectangular prisms using geometric formulas."
metaDescription: "Easily calculate the volume of a cylinder, sphere, cube, cone, or rectangular prism. Free online volume calculator with exact geometric formulas."
metaKeywords: "volume calculator, calculate volume, volume of a cylinder, volume of a sphere, cube volume, cone volume, rectangular prism volume, geometry calculator"
category: "Math"
faqs:
  - question: "How do you calculate the volume of a cylinder from its diameter and height?"
    answer: "First divide the diameter by 2 to find the radius (r = d / 2). Then square the radius, multiply by pi (approximately 3.14159265), and multiply by the cylinder height: V = pi * r^2 * h. Equivalently, using diameter directly, V = (pi / 4) * d^2 * h."
  - question: "Why is a cone's volume exactly one-third the volume of a cylinder with the same base and height?"
    answer: "By integral calculus, slicing a cone parallel to its base at distance x from the apex creates circular cross-sections whose radii scale linearly as (r/h)*x and whose areas scale quadratically as pi*(r/h)^2 * x^2. Integrating x^2 from 0 to h produces (1/3)*h^3, resulting in V = (1/3) * pi * r^2 * h."
  - question: "How do I convert cubic feet or cubic meters into liquid gallons or liters?"
    answer: "One cubic meter (1 m^3) equals exactly 1,000 liters or approximately 264.172 US liquid gallons. One cubic foot (1 ft^3) equals 1,728 cubic inches, 28.3168 liters, or approximately 7.48052 US liquid gallons."
  - question: "Why are there 27 cubic feet in 1 cubic yard instead of 3?"
    answer: "Linear conversions must be cubed when converting three-dimensional volume units. Because 1 linear yard equals 3 linear feet along the length, width, and height axes simultaneously, 1 cubic yard equals 3 ft * 3 ft * 3 ft = 27 cubic feet."
  - question: "Does tilting a prism or cylinder (an oblique solid) change its volume?"
    answer: "No. According to Cavalieri's Principle, if two three-dimensional solids share the exact same perpendicular height and identical cross-sectional areas at every horizontal plane parallel to their bases, their total volumes are identical regardless of tilt angle."
---

In three-dimensional Euclidean geometry, **volume** quantifies the total physical space enclosed within the boundary surfaces of a solid object. Whereas length is measured in one dimension ($\text{m}$, $\text{ft}$) and surface area is measured in two perpendicular dimensions ($\text{m}^2$, $\text{ft}^2$), volume integrates across three orthogonal axes—length, width, and altitude—and is always expressed in **cubic units** ($\text{m}^3$, $\text{cm}^3$, $\text{in}^3$, $\text{ft}^3$, $\text{yd}^3$) or equivalent fluid capacity measures ($\text{Liters}$, $\text{US Gallons}$). Whether you are ordering ready-mix concrete for a foundation slab, sizing a cylindrical chemical storage vessel, or calculating freight container displacement, our Volume Calculator solves the exact geometric equations for standard and composite 3D solids.

## Exact Geometric Volume Formulas for 3D Solids

Before entering measurements into the calculator, ensure all dimensions (radius, length, width, and height) are converted into the **same base linear unit**.

### 1. Cube and Rectangular Prism (Cuboid)

For any right prism with a rectangular cross-section, volume is the product of the base area ($A_{\text{base}} = l \times w$) and the perpendicular altitude ($h$):

$$V_{\text{prism}} = l \times w \times h \qquad \text{and} \qquad V_{\text{cube}} = a^3$$

Where:
* **$l, w, h$** = Length, width, and perpendicular height of the rectangular box
* **$a$** = Edge length of a regular cube where $l = w = h = a$

### 2. Right Circular Cylinder and Hollow Pipe (Annulus)

A cylinder extrudes a circular base of area $A = \pi r^2$ along a vertical axis $h$. For a hollow cylindrical pipe or tube wall, subtract the inner core cylinder from the outer cylinder:

$$V_{\text{cylinder}} = \pi r^2 h = \frac{\pi d^2 h}{4} \qquad \text{and} \qquad V_{\text{pipe}} = \pi h \left(R_{\text{outer}}^2 - r_{\text{inner}}^2\right)$$

Where:
* **$r$** = Radius of the circular base ($r = \frac{d}{2}$, where $d$ is the diameter)
* **$h$** = Perpendicular height or length of the cylinder
* **$R_{\text{outer}}, r_{\text{inner}}$** = Outside radius and inside bore radius of a hollow tube

### 3. Sphere and Hemisphere

A sphere is the locus of all points in 3D space equidistant from a center at radius $r$:

$$V_{\text{sphere}} = \frac{4}{3} \pi r^3 = \frac{1}{6} \pi d^3 \qquad \text{and} \qquad V_{\text{hemisphere}} = \frac{2}{3} \pi r^3$$

### 4. Right Circular Cone and Conical Frustum

A cone tapers linearly from a circular base of radius $r$ to an apex at perpendicular height $h$. If only the diagonal **slant height ($s$)** is known, calculate vertical height via $h = \sqrt{s^2 - r^2}$:

$$V_{\text{cone}} = \frac{1}{3} \pi r^2 h \qquad \text{and} \qquad V_{\text{frustum}} = \frac{1}{3} \pi h \left(R^2 + Rr + r^2\right)$$

Where **$R$** and **$r$** in the frustum equation represent the bottom and top radii of a truncated cone.

### 5. Rectangular or Square Pyramid

Any pyramid tapering linearly from a polygonal base of area $A_{\text{base}}$ to an apex encloses one-third the volume of an enclosing prism:

$$V_{\text{pyramid}} = \frac{1}{3} A_{\text{base}} h = \frac{1}{3} l \times w \times h$$

---

## Cavalieri's Principle and Archimedes' 1 : 2 : 3 Volume Ratio

Two geometric theorems govern how 3D shapes relate to one another:

* **Cavalieri's Principle for Oblique Solids:** If a prism or cylinder is tilted sideways at angle $\theta$, its volume remains $V = A_{\text{base}} \times h$, provided $h$ is measured perpendicular to the base plane ($h = L_{\text{slant}} \sin\theta$).
* **Archimedes' Circumscribed Cylinder Theorem:** A cone, a sphere, and a cylinder sharing radius $r$ and total height $h = 2r$ maintain an exact volume ratio of **$1 : 2 : 3$**:
  $$V_{\text{cone}} = \frac{2}{3}\pi r^3 \quad : \quad V_{\text{sphere}} = \frac{4}{3}\pi r^3 \quad : \quad V_{\text{cylinder}} = 2\pi r^3$$

---

## Step-by-Step Worked Numerical Calculation: Composite Industrial Silo

Suppose an agricultural engineer needs to calculate the total storage volume and liquid capacity of a vertical steel grain silo with an internal radius of **$r = 1.50\text{ m}$** (diameter $d = 3.00\text{ m}$). The silo consists of three distinct geometric sections:
1. **Main Cylindrical Barrel:** Radius $r = 1.50\text{ m}$, vertical height $h_{\text{cyl}} = 4.00\text{ m}$
2. **Top Hemispherical Dome:** Radius $r = 1.50\text{ m}$
3. **Bottom Conical Discharge Hopper:** Radius $r = 1.50\text{ m}$, vertical depth $h_{\text{cone}} = 1.20\text{ m}$

### Step 1: Calculate the Cylindrical Barrel Volume
$$V_{\text{cyl}} = \pi r^2 h_{\text{cyl}} = \pi \times (1.50)^2 \times 4.00 = 9.00\pi \approx 28.2743\text{ m}^3$$

### Step 2: Calculate the Hemispherical Top Dome Volume
$$V_{\text{hemi}} = \frac{2}{3} \pi r^3 = \frac{2}{3} \times \pi \times (1.50)^3 = \frac{2}{3} \times 3.375\pi = 2.25\pi \approx 7.0686\text{ m}^3$$

### Step 3: Calculate the Conical Bottom Hopper Volume
$$V_{\text{cone}} = \frac{1}{3} \pi r^2 h_{\text{cone}} = \frac{1}{3} \times \pi \times (1.50)^2 \times 1.20 = 0.90\pi \approx 2.8274\text{ m}^3$$

### Step 4: Sum the Sections and Convert to Practical Capacity Units
* **Total Exact Cubic Volume:**
  $$V_{\text{total}} = (9.00 + 2.25 + 0.90)\pi = 12.15\pi \approx 38.1704\text{ m}^3$$
* **Capacity in Liters ($1\text{ m}^3 = 1,000\text{ L}$):**
  $$38.1704\text{ m}^3 \times 1,000\text{ L/m}^3 = 38,170.4\text{ Liters}$$
* **Capacity in US Liquid Gallons ($1\text{ m}^3 \approx 264.17205\text{ gal}$):**
  $$38.1704\text{ m}^3 \times 264.17205\text{ gal/m}^3 = 10,083.6\text{ US Gallons}$$
* **Volume in Cubic Yards ($1\text{ m}^3 \approx 1.30795\text{ yd}^3$):**
  $$38.1704\text{ m}^3 \times 1.30795\text{ yd}^3/\text{m}^3 = 49.93\text{ yd}^3$$

---

## 3D Geometric Formulas & Unit Conversion Benchmark Table

Use the reference table below to compare standard geometric equations, sample volume outputs, and cubic unit conversions:

| 3D Geometric Solid | Volume Equation ($V$) | Total Surface Area ($A_s$) | Benchmark Dimensions | Volume in $\text{m}^3$ | Capacity in Liters ($\text{L}$) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cube** | $a^3$ | $6a^2$ | $a = 2.00\text{ m}$ | $8.0000\text{ m}^3$ | $8,000.0\text{ L}$ |
| **Rectangular Prism** | $l \times w \times h$ | $2(lw + lh + wh)$ | $4.0\text{ m} \times 2.5\text{ m} \times 1.5\text{ m}$ | $15.0000\text{ m}^3$ | $15,000.0\text{ L}$ |
| **Right Cylinder** | $\pi r^2 h$ | $2\pi r(r + h)$ | $r = 1.20\text{ m},\; h = 3.00\text{ m}$ | $13.5717\text{ m}^3$ | $13,571.7\text{ L}$ |
| **Full Sphere** | $\frac{4}{3}\pi r^3$ | $4\pi r^2$ | $r = 1.50\text{ m}$ | $14.1372\text{ m}^3$ | $14,137.2\text{ L}$ |
| **Right Circular Cone** | $\frac{1}{3}\pi r^2 h$ | $\pi r(r + \sqrt{r^2 + h^2})$ | $r = 1.20\text{ m},\; h = 3.00\text{ m}$ | $4.5239\text{ m}^3$ | $4,523.9\text{ L}$ |
| **Square Pyramid** | $\frac{1}{3} a^2 h$ | $a^2 + 2a\sqrt{(a/2)^2 + h^2}$ | $a = 2.00\text{ m},\; h = 3.00\text{ m}$ | $4.0000\text{ m}^3$ | $4,000.0\text{ L}$ |
| **Conical Frustum** | $\frac{1}{3}\pi h(R^2 + Rr + r^2)$ | $\pi [R^2 + r^2 + s(R+r)]$ | $R = 1.5\text{ m},\; r = 0.8\text{ m},\; h = 2.0\text{ m}$ | $8.5661\text{ m}^3$ | $8,566.1\text{ L}$ |

### Cubic Scaling Conversion Rules to Remember
When converting between linear measurements and cubic volumes, always **cube the linear scale factor ($k^3$)**:
* **$1\text{ m} = 100\text{ cm}$** $\implies 1\text{ m}^3 = (100)^3\text{ cm}^3 = 1,000,000\text{ cm}^3\text{ (mL)} = 1,000\text{ Liters}$
* **$1\text{ ft} = 12\text{ in}$** $\implies 1\text{ ft}^3 = (12)^3\text{ in}^3 = 1,728\text{ in}^3 \approx 7.48052\text{ US Liquid Gallons}$
* **$1\text{ yd} = 3\text{ ft}$** $\implies 1\text{ yd}^3 = (3)^3\text{ ft}^3 = 27\text{ ft}^3 \approx 201.974\text{ US Liquid Gallons}$
* **$1\text{ US Liquid Gallon}$** $= 231\text{ in}^3 \approx 3.78541\text{ Liters}$
