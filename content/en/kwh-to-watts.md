---
title: "kWh to Watts Converter: Convert Energy Usage to Average Power"
description: "Convert kilowatt-hours (kWh) to average watts over runtime hours. Includes exact energy-to-power formulas, worked utility audit examples, and solar sizing."
faqs:
  - question: "Can you convert kWh directly to watts without knowing hours?"
    answer: "No. Kilowatt-hours (kWh) measure total electrical energy, whereas watts (W) measure instantaneous power—the rate at which energy is consumed. You must divide by a time duration in hours: Watts = (kWh × 1,000) ÷ Hours."
  - question: "What is the exact formula to convert kWh to watts?"
    answer: "Multiply the energy in kilowatt-hours by 1,000 to convert to watt-hours (Wh), then divide by the elapsed time in hours: P (W) = [E (kWh) × 1,000] ÷ Hours."
  - question: "How many watts is 1 kWh over 24 hours?"
    answer: "Consuming 1 kWh steadily over 24 hours equals an average power draw of (1 × 1,000) ÷ 24 = 41.67 watts. That is roughly equivalent to a modern energy-efficient refrigerator or an always-on home router and NAS setup."
  - question: "How many joules are in 1 kilowatt-hour?"
    answer: "Under the SI standard, 1 watt equals 1 joule per second. Therefore, 1 kWh equals 1,000 watts multiplied by 3,600 seconds, which is exactly 3,600,000 joules (3.6 megajoules)."
  - question: "How do I estimate wattage from my monthly electric bill?"
    answer: "Divide your monthly kWh total by the number of hours in the billing period (720 hours for a 30-day month) and multiply by 1,000. For example, 600 kWh over 30 days equals an average continuous household load of 833.3 watts."
---

To convert kilowatt-hours (`kWh`) into average power in watts (`W`), multiply the energy value by `1,000` and divide by the elapsed runtime in hours: **`P (W) = [E (kWh) × 1,000] ÷ Hours`**. Because `1 kWh` equals `1,000 watt-hours (Wh)`, consuming `1 kWh` over `1 hour` requires an average power of `1,000 W`, whereas consuming that same `1 kWh` across `24 hours` corresponds to an average continuous load of `41.67 W`.

You cannot convert `kWh` to `W` without a time interval because the two units measure different physical quantities: `kWh` measures cumulative **energy** (what your utility meter bills), while `W` measures **power** (the rate of energy flow at a given moment). Specifying the runtime translates billing data and battery capacities directly into actionable equipment wattage.

## Exact Conversion Formula & International Standards

Under the International System of Units (**NIST Special Publication 330** and **ISO 80000-2 / IEC 80000-6**), power `P` is the time rate of energy transfer `E ÷ t`. The coherent SI unit of energy is the **joule** (`J`), and the coherent unit of power is the **watt** (`1 W = 1 J/s`). While utilities bill in kilowatt-hours (`kWh`) rather than megajoules (`MJ`) for convenience, the two units remain strictly linked:

`1 kWh = 1,000 W × 3,600 s = 3,600,000 J = 3.6 MJ`

Because `t` is measured in hours (`h`) and the prefix *kilo* (`k`) equals `10³` (`1,000`), converting energy in `kWh` to average power in `W` follows one exact equation:

`P (W) = [E (kWh) × 1,000] ÷ t (hours)`

Rearranging the equation yields the inverse formula for estimating utility consumption from an appliance nameplate:

`E (kWh) = [P (W) × t (hours)] ÷ 1,000`

Note that when power fluctuates over time—such as a refrigerator compressor cycling on and off—the formula yields the **mean power** over the measured window rather than peak startup wattage.

## Step-by-Step Worked Practical Examples

### 1. Appliance Energy Audit via Smart Plug (Short Cycle)
A smart plug reports that a dehumidifier consumed `1.8 kWh` during a `3-hour` drying session.
1. Convert kilowatt-hours to watt-hours: `1.8 × 1,000 = 1,800 Wh`.
2. Divide by runtime hours: `1,800 ÷ 3 = 600 W` average draw.
3. Calculate cycle cost at `16 cents per kWh`: `1.8 × 0.16 = 28.8 cents`.

### 2. Monthly Household Baseload Audit (720-Hour Window)
A residential utility statement lists `432 kWh` consumed across a `30-day` billing cycle (`30 × 24 = 720 hours`).
1. Convert monthly energy to watt-hours: `432 × 1,000 = 432,000 Wh`.
2. Divide by billing hours: `432,000 ÷ 720 = 600 W` average continuous power draw.
3. Cross-check daily consumption: `432 ÷ 30 = 14.4 kWh/day`, and `(14.4 × 1,000) ÷ 24 = 600 W`.

### 3. Rooftop Solar Generation vs. Peak Sun Hours
A solar array logs `22.5 kWh` of AC production on a clear day with `5 peak sun hours` (PSH).
1. Effective average output during peak sun hours: `(22.5 × 1,000) ÷ 5 = 4,500 W` (`4.5 kW`).
2. Equivalent 24-hour continuous off-grid power budget: `(22.5 × 1,000) ÷ 24 = 937.5 W` across day and night.

## Quick Reference Conversion Table

The table below lists average watts across `1-hour`, `4-hour`, `8-hour`, and `24-hour` durations for common energy values.

| Energy | `1 Hour` | `4 Hours` | `8 Hours` | `24 Hours` | Common Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0.5 kWh | 500 W | 125 W | 62.5 W | 20.8 W | LED lighting / laptop day |
| 1 kWh | 1,000 W | 250 W | 125 W | 41.7 W | Efficient fridge daily draw |
| 2 kWh | 2,000 W | 500 W | 250 W | 83.3 W | Dishwasher or dryer cycle |
| 5 kWh | 5,000 W | 1,250 W | 625 W | 208.3 W | Portable battery / PHEV charge |
| 10 kWh | 10,000 W | 2,500 W | 1,250 W | 416.7 W | Home battery / heat pump |
| 15 kWh | 15,000 W | 3,750 W | 1,875 W | 625 W | Half-day apartment load |
| 24 kWh | 24,000 W | 6,000 W | 3,000 W | 1,000 W | Continuous 1 kW daily load |
| 30 kWh | 30,000 W | 7,500 W | 3,750 W | 1,250 W | Typical daily US home total |
| 60 kWh | 60,000 W | 15,000 W | 7,500 W | 2,500 W | Mid-range EV battery charge |

## Industry Use Cases, Regional Pitfalls & Common Mistakes

Energy auditors, solar engineers, and homeowners frequently make predictable errors when interpreting `kWh` meters and battery specs.

- **Confusing Average Watts with Peak Surge Watts:** Dividing `24 kWh` by `24 hours` yields `1,000 W` average load—yet a well pump (`1,500 W` running, `4,000 W` startup) and microwave (`1,200 W`) running together still demand `5,000+ W` of inverter capacity. Size breakers and inverters for **peak simultaneous wattage**, not 24-hour averages.
- **Misreading Duty Cycles on Thermostatic Appliances:** A `1,500 W` water heater or `800 W` refrigerator cycles on for only `20%–35%` of the day. Dividing `24-hour kWh` by `24` captures true average draw, whereas dividing by active compressor runtime yields nameplate watts.
- **Ignoring Depth-of-Discharge & Inverter Losses:** A `10 kWh` LiFePO₄ battery reserves `80%–90%` depth of discharge (`8–9 kWh` usable) and loses `8%–15%` through DC-to-AC conversion, delivering roughly `7.65 kWh` (`9 × 0.85`) of AC energy (`956 W` over `8 hours`) instead of `1,250 W`.
- **Mixing `kW` and `kWh` on Time-of-Use Tariffs:** Commercial and time-of-use utility plans often bill both energy (`per kWh`) and peak demand (`per kW` over a `15-minute` window). Brief wattage spikes can trigger steep demand charges despite modest monthly `kWh`.
