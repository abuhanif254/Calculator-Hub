---
title: "MPH to KM/H Converter: Exact Formula, Speed Tables & Road Standards"
description: "Convert mph to km/h instantly using the exact NIST factor of 1.609344. Includes step-by-step road and wind speed examples, conversion tables, and pitfalls."
faqs:
  - question: "What is the exact formula to convert mph to km/h?"
    answer: "Multiply miles per hour by exactly 1.609344 to get kilometers per hour: km/h = mph × 1.609344. Because the international mile is legally defined as 1,609.344 meters, this conversion factor has no rounding error."
  - question: "How do I convert mph to km/h quickly in my head while driving?"
    answer: "For a fast mental estimate, multiply the mph value by 1.6 (add half of the speed plus one-tenth of the speed). For example, 50 mph becomes 50 + 25 + 5 = 80 km/h, which is within 0.5 km/h of the exact 80.47 km/h figure."
  - question: "Is 100 km/h faster or slower than 60 mph?"
    answer: "100 km/h is slightly faster than 60 mph. Converting 60 mph gives 60 × 1.609344 = 96.56 km/h, whereas 100 km/h equals approximately 62.14 mph."
  - question: "Why do wind speeds in mph and km/h matter for hurricane categories?"
    answer: "The US National Hurricane Center defines Saffir-Simpson categories in whole mph or knots, while international meteorological agencies publish advisories in km/h. A Category 1 hurricane starts at 74 mph (119.09 km/h), and a Category 5 begins at 157 mph (252.67 km/h)."
  - question: "Do US Survey Miles change highway speed conversions?"
    answer: "In practice, no, and NIST formally retired the US Survey Foot and Survey Mile for general use on January 1, 2023. Even before retirement, the 2 parts-per-million difference between a survey mile and an international mile changed 70 mph by less than 0.00025 km/h."
---

To convert miles per hour (`mph`) to kilometers per hour (`km/h`), multiply the speed in `mph` by the exact international constant `1.609344`. Using the formula `km/h = mph × 1.609344`, a standard US highway speed of `65 mph` equals `104.61 km/h`, and `1 mph` equals `1.609344 km/h` with zero rounding approximation.

This conversion bridges the US customary and imperial systems with the metric standard used across Europe, Canada, Australia, and global meteorology. Whether reading foreign speed signs, calibrating a bike computer, or interpreting storm advisories, the exact international factor keeps measurements consistent.

## Exact Conversion Formula & International Standard

Miles per hour and kilometers per hour convert exactly because both trace directly to the meter. Under the 1959 International Yard and Pound Agreement—adopted by the National Institute of Standards and Technology (NIST)—one international yard equals exactly `0.9144 meters`, making one international foot `0.3048 meters`.

Because one statute mile equals `5,280 feet` (`1,760 yards`), multiplying `5,280 × 0.3048` yields exactly `1,609.344 meters`, or `1.609344 kilometers`. Dividing both sides by one hour (`3,600 seconds`, per ISO 80000-2 and ISO 80000-3) preserves the exact factor:

- **MPH to KM/H:** `km/h = mph × 1.609344`
- **KM/H to MPH:** `mph = km/h ÷ 1.609344` (`≈ km/h × 0.621371192`)
- **MPH to m/s:** `m/s = mph × 0.44704` (exact, since `1,609.344 ÷ 3,600 = 0.44704`)

Under NIST Special Publication 811 and ISO 80000 conventions, formal technical writing uses `km/h` or `km·h⁻¹` rather than `kph`.

## Step-by-Step Worked Practical Examples

The following three scenarios demonstrate exact arithmetic using the `1.609344` constant before rounding to practical precision for signage, safety, or reporting.

### 1. US Interstate Highway Speed Limit (70 mph)

Suppose you are driving a metric-calibrated vehicle on an interstate highway posted at `70 mph` and need the exact limit in `km/h`.

1. Identify the base speed: `70 mph`.
2. Multiply by the exact NIST constant: `70 × 1.609344 = 112.65408 km/h`.
3. Round to the nearest whole kilometer per hour for dashboard compliance: `113 km/h` (or `112.65 km/h` for telemetry logs).

### 2. Urban School Zone Limit (25 mph)

Many North American municipal codes set school or residential zones at `25 mph` in the United States or `40 km/h` in Canada. Let us verify how closely those standards align.

1. Identify the base speed: `25 mph`.
2. Multiply by the exact conversion factor: `25 × 1.609344 = 40.2336 km/h`.
3. Result: `25 mph` is `40.23 km/h`, differing from a `40 km/h` zone by less than a quarter of a kilometer per hour.

### 3. Category 3 Hurricane Sustained Winds (115 mph)

A meteorological bulletin reports one-minute maximum sustained winds of `115 mph`, placing a storm squarely in Category 3 on the Saffir-Simpson Hurricane Wind Scale (`111–129 mph`).

1. Identify the wind speed: `115 mph`.
2. Multiply by the exact factor: `115 × 1.609344 = 185.07456 km/h`.
3. Result: `185.07 km/h` (often reported in public advisories as `185 km/h`).

## Quick Reference Conversion Table

The table below lists high-frequency road, aviation, athletic, and severe-weather speeds converted with the exact `1.609344` factor and rounded to two decimal places where appropriate.

| Speed (mph) | Speed (km/h) | Practical Context |
| :--- | :--- | :--- |
| `1 mph` | `1.61 km/h` | Exact base factor (`1.609344 km/h`) |
| `15 mph` | `24.14 km/h` | Parking garages, alleys, and shared zones |
| `25 mph` | `40.23 km/h` | US residential and school zone limit |
| `35 mph` | `56.33 km/h` | Urban arterial road speed limit |
| `45 mph` | `72.42 km/h` | Suburban highway and work-zone limit |
| `55 mph` | `88.51 km/h` | Rural two-lane highway (`~90 km/h`) |
| `65 mph` | `104.61 km/h` | Divided expressway (`~100–110 km/h`) |
| `70 mph` | `112.65 km/h` | UK motorway and US interstate standard |
| `100 mph` | `160.93 km/h` | Track benchmark and fast-ball telemetry |
| `157 mph` | `252.67 km/h` | Category 5 hurricane minimum threshold |

## Industry Use Cases, Regional Pitfalls & Common Conversion Mistakes

While the conversion formula is simple, transport, maritime, and meteorological workflows introduce subtle traps that lead to misread instruments or non-compliant specs.

- **Statute Miles vs. Knots:** Aviation and marine forecasts measure speed in **knots** (`kn`), meaning **nautical miles per hour**, not statute `mph`. One international nautical mile is `1,852 meters`, so `1 knot = 1.852 km/h` (`≈ 1.15078 mph`). Treating knots as statute `mph` underestimates true velocity by roughly `15%`.
- **Speedometer Tolerance & Rounding Up:** Under UNECE Regulation No. 39, EU and UK speedometers cannot read below true speed, so a `113 km/h` readout may reflect an actual GPS speed near `109 km/h`. Conversely, rounding `70 mph` (`112.65 km/h`) up to `115 km/h` exceeds the legal limit—always round conservatively near enforced zones.
- **US Survey Mile Retirement:** Before January 1, 2023, US geodesy occasionally used the US Survey Mile (`1,609.3472 m`) rather than the International Mile (`1,609.344 m`). NIST retired the survey mile to unify measurements; never apply survey-mile constants to speed.
- **Wind Averaging Periods:** Converting `mph` to `km/h` changes the unit, not the sampling window. The US National Hurricane Center reports **1-minute** sustained winds, whereas the World Meteorological Organization (WMO) uses a **10-minute** average. Direct unit conversion does not adjust for differing averaging intervals.
- **Mental `× 0.6` Shortcut Error:** Multiplying `km/h` by `0.6` instead of `0.621371` introduces a `3.4%` error. At `130 km/h`, `× 0.6` yields `78 mph` instead of the true `80.78 mph`.
