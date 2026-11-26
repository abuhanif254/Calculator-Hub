---
title: "Celsius to Fahrenheit Converter (°C to °F) — Formula & Chart"
description: "Convert Celsius to Fahrenheit accurately with the exact formula °F = (°C × 9/5) + 32. Includes weather, baking, fever charts, and NIST temperature standards."
faqs:
  - question: "What is the exact formula to convert Celsius to Fahrenheit?"
    answer: "Multiply the Celsius temperature by 9/5 (or 1.8) and add 32: °F = (°C × 9/5) + 32. This relationship is exact by definition because both scales reference fixed physical points."
  - question: "How do I quickly estimate Celsius to Fahrenheit in my head?"
    answer: "Double the Celsius value, subtract 10 percent of that doubled number, and add 32. For exact mental math, doubling and adding 30 gets you within 2 °F for typical weather between 0 °C and 30 °C."
  - question: "What Celsius temperature counts as a fever in Fahrenheit?"
    answer: "A standard clinical fever threshold is 38.0 °C, which equals exactly 100.4 °F. Normal human core body temperature averages 37.0 °C, or 98.6 °F, though healthy readings vary by time of day."
  - question: "At what temperature are Celsius and Fahrenheit equal?"
    answer: "Celsius and Fahrenheit meet at exactly -40 degrees (-40 °C = -40 °F). Setting °C = (°C × 9/5) + 32 solves directly to -40, making it the only shared numerical point on both scales."
  - question: "How should I convert European baking Celsius temperatures for a US oven?"
    answer: "Apply °F = (°C × 9/5) + 32 and round to the nearest 5 °F or 25 °F dial increment—for example, 180 °C converts to 356 °F, or 350 °F in practice. If the recipe specifies a fan or convection oven, add 20 °C before converting for a conventional US oven."
---

To convert degrees Celsius (`°C`) to degrees Fahrenheit (`°F`), multiply the Celsius value by `9/5` (`1.8`) and add `32` using the exact formula `°F = (°C × 9/5) + 32`. Because each 1-degree step on the Celsius scale spans 1.8 degrees on the Fahrenheit scale, and the ice point sits at `0 °C` versus `32 °F`, both scaling and offset are required for every absolute temperature reading.

Whether you are checking a clinical thermometer during a fever, adapting a European baking recipe to a US oven, or reading an international weather forecast, exact conversion prevents costly errors. A single misapplied offset can turn a moderate `180 °C` bake (`356 °F`) into a burnt dish or misread a `38.5 °C` (`101.3 °F`) fever as a mild elevation.

## Exact Conversion Formula and International Standards

The exact conversion from Celsius to Fahrenheit is defined by `°F = (°C × 9/5) + 32`, or equivalently `°F = (°C × 1.8) + 32`. Because `9/5` terminates cleanly as `1.8` in decimal arithmetic, converting from Celsius to Fahrenheit introduces zero repeating-decimal rounding error when exact inputs are supplied.

Under the International System of Units (SI) maintained by the BIPM and adopted by the National Institute of Standards and Technology (NIST), Celsius temperature `t` is defined relative to thermodynamic temperature `T` in kelvins (`K`) via `t/°C = T/K − 273.15`. ISO 80000-2 specifies standard mathematical notation and unit symbols (`°C`, `°F`, `K`), while NIST Special Publication 811 documents the thermodynamic anchor points linking both scales. Pure water freezes at `0 °C` (`32 °F`) and boils at `100 °C` (`212 °F`) at `101.325 kPa`, giving `180` Fahrenheit divisions per `100` Celsius divisions (`9/5`) with a `+32` zero-point shift.

## Step-by-Step Worked Practical Examples

### Clinical Fever Assessment (38.5 °C to °F)

Suppose a digital thermometer imported from Europe reads `38.5 °C`, and you need the Fahrenheit equivalent for a US pediatric care chart:

1. Multiply the Celsius reading by `9`: `38.5 × 9 = 346.5`.
2. Divide by `5` (or multiply directly by `1.8`): `346.5 ÷ 5 = 69.3`.
3. Add the freezing-point offset of `32`: `69.3 + 32 = 101.3 °F`.

A reading of `38.5 °C` equals `101.3 °F`, confirming a moderate clinical fever above the standard `38.0 °C` (`100.4 °F`) threshold.

### High-Heat Roasting in a US Oven (220 °C to °F)

If a UK or Australian sourdough recipe instructs you to preheat a conventional oven to `220 °C`:

1. Multiply `220` by `9`: `220 × 9 = 1,980`.
2. Divide by `5`: `1,980 ÷ 5 = 396`.
3. Add `32`: `396 + 32 = 428 °F`.

Since most US kitchen ovens adjust in `5 °F` or `25 °F` increments, setting the dial to `425 °F` or `430 °F` matches the target thermal profile.

### Subzero Winter Forecast (-15 °C to °F)

When checking a Canadian winter weather report listing `-15 °C`, keep the negative sign through the multiplication step:

1. Multiply `-15` by `9`: `-15 × 9 = -135`.
2. Divide by `5`: `-135 ÷ 5 = -27`.
3. Add `32`: `-27 + 32 = 5 °F`.

Because `-27` is smaller in magnitude than `+32`, `-15 °C` remains above zero on the Fahrenheit scale at `5 °F`.

## Quick Reference Conversion Table

The table below lists high-frequency Celsius values alongside their exact Fahrenheit equivalents and practical context across weather, medicine, and cooking.

| Celsius (°C) | Fahrenheit (°F) | Practical Reference & Context |
| :--- | :--- | :--- |
| `-40 °C` | `-40 °F` | Unique crossover point where both scales match |
| `0 °C` | `32 °F` | Freezing point of pure water at 1 atm |
| `10 °C` | `50 °F` | Crisp autumn or early spring weather |
| `20 °C` | `68 °F` | Standard indoor room temperature (NIST reference) |
| `25 °C` | `77 °F` | Warm day; standard laboratory ambient temperature |
| `37 °C` | `98.6 °F` | Average healthy human core body temperature |
| `38 °C` | `100.4 °F` | Standard clinical threshold for a fever |
| `100 °C` | `212 °F` | Boiling point of water at sea level |
| `180 °C` | `356 °F` | Moderate baking oven (~350 °F US standard) |
| `200 °C` | `392 °F` | Hot roasting oven (~400 °F US standard) |

## Industry Use Cases, Regional Pitfalls, and Common Mistakes

### Absolute Temperatures vs. Temperature Intervals

The single most frequent engineering and scientific mistake occurs when converting a temperature difference (`ΔT`) rather than an absolute reading. Adding `+32` applies only to static temperature points. If a specification calls for raising a chemical bath or concrete cure by `10 °C`, you multiply strictly by `1.8` without adding `32`: a `10 °C` rise equals an `18 °F` rise, not `50 °F`.

### Fan-Assisted (Convection) vs. Conventional Ovens

European and UK recipes routinely list "fan" or "fan-assisted" oven temperatures (for example, `180 °C fan`). Convection fans circulate hot air continuously, browning food faster at lower nominal settings. When converting a `180 °C` fan temperature (`356 °F`) for a non-convection US oven, bakers typically add `15 °C` to `20 °C` first (`200 °C` -> `392 °F`, set to `400 °F`) or add `25 °F` after converting to avoid underbaking.

### Clinical Measurement Site Differences

Medical thermometers calibrated in either scale still vary by measurement site. While `37.0 °C` (`98.6 °F`) is the textbook oral average, tympanic (ear) and rectal readings typically run `0.5 °C` (`0.9 °F`) higher than axillary (underarm) readings. Always compare converted values against site-specific clinical thresholds.

### Shortcut Mental-Math Drift

The popular travel shortcut of doubling Celsius and adding `30` is exact only at `10 °C` (`50 °F`). At `30 °C` (`86 °F`) it reads `90 °F`, and by `100 °C` (`212 °F`) it drifts `18 °F` high. Use the exact `1.8` multiplier and `+32` offset for health, laboratory, or cooking accuracy.
