---
title: "PX to REM Converter: Exact CSS Formula & Root Typography Guide"
description: "Convert CSS pixels (px) to rem units using the 16px root default or custom scales. Includes exact formulas, responsive typography tables, and WCAG zoom tips."
faqs:
  - question: "How do you convert px to rem in CSS?"
    answer: "Divide the target pixel value by the root html element font size in pixels: rem = px ÷ root font size. With the universal browser default of 16px, 24px converts to 24 ÷ 16 = 1.5rem."
  - question: "Why is 1rem equal to 16px by default?"
    answer: "Every major browser (Chrome, Firefox, Safari, and Edge) ships with a default user-agent stylesheet setting the root html font size to 16px. Because 1rem equals 100% of the root element computed font size, 1rem resolves to 16px unless overridden."
  - question: "What is the difference between rem and em in CSS?"
    answer: "The rem unit (root em) always calculates relative to the root html element font size, preventing nested compounding. The em unit calculates relative to the current or parent element font size, which causes exponential scaling inside nested components."
  - question: "Is the 62.5% html font-size trick safe for accessibility?"
    answer: "Setting html { font-size: 62.5%; } changes 1rem to 10px (62.5% of 16px) while still honoring browser user font-size overrides, provided you immediately reset body { font-size: 1.6rem; }. Never use html { font-size: 10px; }, as a fixed pixel root blocks user zoom preferences."
  - question: "Should CSS media queries use rem or px?"
    answer: "Using rem (or em) in media queries ensures layout breakpoints adapt when users increase their browser default font size, preventing cramped columns at 200% text zoom under WCAG 2.1/2.2 guidelines."
---

To convert CSS pixels (`px`) to root em (`rem`) units, divide the pixel value by the computed font size of the root `<html>` element: **`rem = px ÷ Root Font Size`**. Because all modern desktop and mobile browsers default to a `16px` root font size, the standard conversion formula is **`rem = px ÷ 16`** (making `1px = 0.0625rem` and `16px = 1rem`).

Unlike fixed `px` values, `rem` units scale proportionally when a visitor adjusts their browser's default text size for readability. Converting typography, padding, and layout spacing from pixels to `rem` preserves visual hierarchy across devices while maintaining compliance with international web accessibility standards.

## Exact Conversion Formula & W3C CSS Standards

The `rem` unit is standardized in the **W3C CSS Values and Units Module** (Levels 3 and 4), where it is defined as equal to the computed value of `font-size` on the root element (`<html>`). Using formal mathematical ratio notation aligned with **ISO 80000-2**, the conversion between CSS pixels and `rem` is a linear scale factor determined by the root base `r`:

`rem = px ÷ r`  and inversely  `px = rem × r`

Under the W3C CSS specification, `1px` is not strictly a physical device pixel; it is a reference pixel defined as `1/96` of `1 CSS inch` (approximately `0.2646 mm` at normal viewing distance, scaled automatically by device pixel ratio on Retina/HiDPI displays). Meanwhile, **W3C WCAG 2.1 and 2.2 Success Criterion 1.4.4 (Resize Text)** requires that text can be resized up to `200%` without assistive technology and without loss of content or functionality.

If a stylesheet sets `font-size: 16px` directly on paragraphs, changing the browser's base font setting has no effect on that text. By contrast, defining `font-size: 1rem` allows the browser's root value (`16px` default, or `20px` / `24px` when enlarged by the user) to flow cleanly through every typographic and spacing token in the design system.

## Step-by-Step Worked Practical Examples

### 1. Standard 16px Root Design Token Conversion
A Figma handoff specifies a modal dialog with a `28px` title, `18px` body text, and `24px` internal padding. Your CSS leaves the browser's default `16px` root font size untouched.
1. Modal title: `28 ÷ 16 = 1.75rem`.
2. Body copy: `18 ÷ 16 = 1.125rem`.
3. Card padding: `24 ÷ 16 = 1.5rem`.

### 2. Using the 62.5% Root Percentage Scale (10px Base)
Many engineering teams set `html { font-size: 62.5%; }` alongside `body { font-size: 1.6rem; }` so that `1rem` equals `10px` (`16 × 0.625 = 10px`), allowing instant mental division by `10`. Suppose you implement a `14px` metadata badge and `36px` hero subtitle:
1. Metadata badge: `14 ÷ 10 = 1.4rem`.
2. Hero subtitle: `36 ÷ 10 = 3.6rem`.
3. Base body copy remains `1.6rem` (`16px` at default zoom).

### 3. Accessibility Browser Font Override (20px User Preference)
Suppose a low-vision reader increases their Chrome default font size from `16px` to `20px` (`125%` scale).
1. A section heading authored as `2.25rem` (originally `36px` at `16px` root) recalculates to `2.25 × 20 = 45px`.
2. Body text authored as `1.125rem` (originally `18px`) scales to `1.125 × 20 = 22.5px`.
3. A hardcoded `18px` element would remain trapped at `18px`, breaking proportional visual hierarchy.

## Quick Reference Conversion Table

The table below lists high-frequency UI pixel values converted for both the standard `16px` browser default and the `10px` (`62.5%`) root configuration.

| Pixels (`px`) | `REM` (`16px` Default) | `REM` (`10px` / `62.5%` Root) | Typical UI Role |
| :--- | :--- | :--- | :--- |
| 4px | 0.25rem | 0.4rem | Micro spacing / focus ring offset |
| 8px | 0.5rem | 0.8rem | Compact inline gap / chip padding |
| 12px | 0.75rem | 1.2rem | Small helper caption / badge text |
| 14px | 0.875rem | 1.4rem | Secondary UI label / table cell text |
| 16px | 1rem | 1.6rem | Browser default body paragraph |
| 18px | 1.125rem | 1.8rem | Long-form editorial body text |
| 20px | 1.25rem | 2rem | Lead paragraph / card heading |
| 24px | 1.5rem | 2.4rem | Subsection heading (`h3`) / gutter |
| 32px | 2rem | 3.2rem | Major section heading (`h2`) |
| 48px | 3rem | 4.8rem | Hero display title (`h1`) |

## Industry Use Cases, Regional Pitfalls & Common Mistakes

Frontend engineers and UI designers frequently encounter subtle CSS rendering bugs when migrating pixel-based design specs into scalable stylesheets.

- **Hardcoding `html { font-size: 10px; }`:** Some developers override the root with a fixed `10px` instead of `62.5%` to achieve base-10 math. Setting `html` in `px` overrides the user's browser font-size preference completely, breaking accessibility compliance. Always express any custom root scale as a percentage (`62.5%`) or keep `100%` (`16px`).
- **Confusing `rem` with `em` Compounding:** Using `em` for nested lists or reusable card components causes multiplication compounding: if a parent card sets `font-size: 1.2em` and a child badge inside it sets `font-size: 0.85em`, the child evaluates to `1.2 × 0.85 = 1.02` of the base rather than `0.85`. Use `rem` for global font sizes, layout gutters, and breakpoints, and reserve `em` for properties tied to a single element's own text size (such as button padding or `margin-bottom` on headings).
- **Converting `1px` Hairline Borders to `rem`:** Converting `1px` or `2px` borders to `0.0625rem` often triggers subpixel rounding inconsistencies (`0.875px` or `1.25px`) when users zoom, causing borders to disappear or look blurry on non-HiDPI displays. Keep thin borders (`1px`, `2px`) and box-shadow blurs in `px`, while converting typography, component dimensions, and margins to `rem`.
- **Mixing `px` Breakpoints with `rem` Content:** If a sidebar uses `rem` widths (`18rem`) while media queries use `px` (`@media (min-width: 768px)`), enlarging the browser font size to `24px` expands the sidebar to `432px` without shifting the breakpoint, squeezing main content. Authoring media queries in `rem` (`48rem`) keeps layout shifts synchronized with text scaling.
