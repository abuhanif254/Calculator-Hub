---
title: "How to Calculate Running Pace: The Math Behind Your Marathon"
description: "Learn the formula for calculating running pace, how to convert between miles and kilometers, and how to use our Pace Calculator to crush your next race."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "pace-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the exact difference between running pace and running speed?"
    answer: "Running pace measures elapsed time per unit of distance—such as 8:00 minutes per mile or 4:58 minutes per kilometer—so lower numbers mean faster running. Running speed measures distance covered per unit of time—such as 7.50 miles per hour (mph) or 12.07 kilometers per hour (km/h)—so higher numbers mean faster running."
  - question: "Why can't I divide minutes directly on a standard calculator to get pace?"
    answer: "Time uses base-60 sexagesimal units (60 seconds per minute) rather than base-10 decimals. Dividing 30 minutes by 3.1069 miles yields 9.656 decimal minutes, which equals 9 minutes and 39 seconds (0.656 × 60), not 9 minutes and 66 seconds. Always multiply the decimal remainder by 60 to get true seconds."
  - question: "How do I convert minutes per mile into minutes per kilometer?"
    answer: "Because 1 international mile equals exactly 1.609344 kilometers, divide your pace per mile (converted into total seconds) by 1.609344 to obtain seconds per kilometer. For example, an 8:00/mi pace (480 seconds) divided by 1.609344 equals 298.26 seconds/km, or 4:58/km."
  - question: "Why should I use 26.21875 miles instead of 26.2 miles for marathon math?"
    answer: "A certified World Athletics marathon is exactly 42.195 kilometers, which equals 26.21875 miles (about 33 yards longer than 26.2 miles). At an 8:00/mi pace, those extra 0.01875 miles add 9 seconds to your finish time—enough to matter when chasing a strict Boston Marathon qualifying cutoff."
  - question: "Why does my GPS watch show a faster average pace than my official marathon time?"
    answer: "GPS watches measure slightly longer distances on certified road courses—commonly 0.5% to 1.5% extra—because runners weave around aid stations, miss shortest-possible corner tangents, and experience tall-building signal drift. Running 26.5 watch miles at 8:00/mi produces an official chip time of 3:32:00 rather than 3:29:45."
---

Running pace equals total elapsed time divided by distance covered (`Time ÷ Distance`), expressed in minutes and seconds per mile or per kilometer. Unlike running speed (`Distance ÷ Time`, measured in mph or km/h on treadmills), pace tells you the exact split required at every mile or kilometer marker to hit a target finish time.

Because clock time operates in base-60 (60 seconds per minute) rather than base-10 decimals, reliable pace math requires converting `HH:MM:SS` into total seconds first, performing the division or multiplication, and converting the remainder back into minutes and seconds. Compute splits, finish projections, and mile-to-kilometer conversions instantaneously in our [Pace Calculator](/en/calculators/pace-calculator).

## Pace, Speed, and Base-60 Time Conversion Formulas

Every race calculation links three variables—elapsed time (`T`), course distance (`D`), and unit pace (`P`)—through sexagesimal time conversion:

```text
Total Seconds (T_sec) = (Hours × 3600) + (Minutes × 60) + Seconds
Pace (sec per unit)   = T_sec / Distance
Pace (MM:SS)          = floor(Pace_sec / 60) : round(Pace_sec mod 60)
Finish Time (T_sec)   = Pace_sec × Race Distance
Speed (mph or km/h)   = 3600 / Pace_sec
Pace per Kilometer    = Pace_per_Mile / 1.609344
```

### Exact Official Race Distances and Parameters

Using exact World Athletics and USATF course distances prevents small rounding errors from accumulating over long races:

- **5K:** `5.000 km` (`3.1069 mi`)
- **10K:** `10.000 km` (`6.2137 mi`)
- **Half Marathon:** `21.0975 km` (`13.1094 mi`)
- **Marathon:** `42.195 km` (`26.21875 mi`)
- **International Mile Conversion:** `1 mile = 1.609344 km` (`1,609.344 meters`)

## Worked Marathon and Endurance-Prediction Examples

### Example 1: Target Pace and Treadmill Speed for a 3:30:00 Marathon

Suppose your goal is breaking **3 hours and 30 minutes (`3:30:00`)** at a certified marathon:

1. **Convert Target Time to Total Seconds:** `(3 × 3600) + (30 × 60) = 10,800 + 1,800 = 12,600 seconds`.
2. **Divide by Exact Marathon Mileage:** `12,600 ÷ 26.21875 mi = 480.57 seconds/mile`.
3. **Convert Decimal Seconds to `MM:SS`:** `480.57 ÷ 60 = 8 minutes` with `0.57 seconds` remaining (`0.0095 min × 60 = 0.57 sec`) -> **8:00.6/mi** (holding **8:00/mi** flat yields `26.21875 × 480 = 12,585 seconds = 3:29:45`, giving a 15-second buffer).
4. **Convert to Metric Pace and Treadmill Speed:**
   - **Metric Pace:** `12,600 ÷ 42.195 km = 298.61 seconds/km` -> **4:58.6/km** (`4:59/km`).
   - **Treadmill Speed:** `3600 ÷ 480.57 = 7.49 mph` (`3600 ÷ 298.61 = 12.06 km/h`).

### Example 2: Projecting a Half Marathon from a 5K Time Trial

Suppose you run a **5K (`5.0 km` / `3.1069 mi`)** in **25:00** (`1,500 seconds`), which equals `8:03/mi` (`5:00/km`). Multiplying `482.8 seconds/mi × 13.1094 mi` linearly predicts `1:45:29`—an unrealistic projection for most recreational runners because aerobic fatigue slows sustainable pace as race distance quadruples.

Applying Pete Riegel's endurance decay formula (`T2 = T1 × (D2 / D1)^1.06`) models that physiological slowdown:

- `T2 = 1,500 × (21.0975 / 5.0)^1.06 = 1,500 × (4.2195)^1.06`
- `T2 = 1,500 × 4.6002 = 6,900 seconds` = **1:55:00**
- **Realistic Target Half-Marathon Pace:** `6,900 ÷ 13.1094 = 526 seconds/mi` (**8:46/mi** or **5:27/km**).

## Marathon and Half-Marathon Pace Conversion Benchmarks

All finish times below are calculated against exact certified distances (`13.109375 mi` and `26.21875 mi`) rounded to the nearest second:

| Pace (/mi) | Pace (/km) | Speed (mph) | Speed (km/h) | Half Marathon (`13.11 mi`) | Full Marathon (`26.22 mi`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `6:00/mi` | `3:44/km` | `10.00 mph` | `16.09 km/h` | `1:18:39` | `2:37:19` |
| `7:00/mi` | `4:21/km` | `8.57 mph` | `13.79 km/h` | `1:31:46` | `3:03:32` |
| `7:30/mi` | `4:40/km` | `8.00 mph` | `12.87 km/h` | `1:38:19` | `3:16:38` |
| `8:00/mi` | `4:58/km` | `7.50 mph` | `12.07 km/h` | `1:44:52` | `3:29:45` |
| `8:30/mi` | `5:17/km` | `7.06 mph` | `11.36 km/h` | `1:51:26` | `3:42:52` |
| `9:00/mi` | `5:36/km` | `6.67 mph` | `10.73 km/h` | `1:57:59` | `3:55:58` |
| `10:00/mi` | `6:13/km` | `6.00 mph` | `9.66 km/h` | `2:11:06` | `4:22:11` |

## Real-World Pacing Pitfalls: GPS Drift, Elevation, and Splits

Even perfect pace arithmetic fails on race morning without accounting for course measurement geometry and environmental load:

- **GPS Tangents and Urban Drift:** Certified road races are measured along the shortest possible path inside turns (the tangent). Weaving around crowds, swinging wide at water stations, and GPS multipath errors near skyscrapers typically make a GPS watch record **26.4 to 26.6 miles** on a 26.22-mile course. To hit a `3:30:00` chip time (`8:01/mi` official pace), target **7:54–7:56/mi** on your wrist GPS—or manually hit the lap button at official course mile markers instead of relying on auto-lap.
- **Elevation and Grade-Adjusted Pace (GAP):** Sustained climbs increase metabolic cost by roughly **12 to 15 seconds per mile per 1% uphill grade**, whereas downhills return only **6 to 8 seconds per mile per 1% grade** due to eccentric braking forces. Rolling courses always run slower than flat courses at equal physiological effort.
- **Training-Zone Calibration:** Use recent 5K or 10K race pace rather than aspirational marathon goal pace to set easy aerobic runs (typically `60 to 90 seconds/mi` slower than marathon pace) and lactate-threshold tempo runs (`15 to 25 seconds/mi` faster than half-marathon pace).
- **Heat, Humidity, and Even Splitting:** Above 60°F (15.5°C) or high dew points, thermoregulatory blood flow raises heart rate at the same speed (cardiac drift), requiring a 1% to 3% pace slowdown per 10°F rise. Banking aggressive early miles (`positive splitting`) accelerates glycogen depletion; running **even or slight negative splits** (second half 1%–2% faster than the first) consistently produces faster net marathon times and lower late-race fade.
