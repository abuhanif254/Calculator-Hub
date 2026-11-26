---
title: "Electricity Cost: How Much Do Appliances Cost to Run?"
description: "Learn how utility bills measure kilowatt-hours (kWh), calculate exact appliance operating costs, account for duty cycles and standby draw, and audit home energy usage."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electricity-cost-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the difference between watts (W) and kilowatt-hours (kWh)?"
    answer: "Watts measure instantaneous power demand—how fast an appliance draws electricity at a single moment—whereas kilowatt-hours measure cumulative energy consumed over time. One kilowatt-hour equals 1,000 watts sustained continuously for one hour. Electric utilities charge you for total kWh consumed, not the instantaneous wattage rating printed on an appliance nameplate."
  - question: "How do I calculate wattage if a label only lists volts and amps?"
    answer: "Multiply voltage (V) by current in amperes (A) to estimate apparent power in volt-amperes (VA), and multiply by the device power factor (PF) if known: Watts = V × A × PF. For purely resistive loads like heaters, toasters, and incandescent bulbs, PF is 1.0, so a 120 V, 12.5 A space heater draws 1,500 W. For motor-driven or electronic devices, PF typically falls between 0.65 and 0.95."
  - question: "Why does my refrigerator cost less to run than its nameplate wattage suggests?"
    answer: "Appliances with thermostats—including refrigerators, air conditioners, and electric water heaters—do not draw peak wattage continuously. Their compressors or heating elements cycle on and off depending on ambient temperature and insulation. A refrigerator rated at 400 W during compressor start or defrost may average only 150 W while running on a 35% duty cycle, consuming roughly 1.2 kWh per day."
  - question: "How much do standby or phantom loads add to an annual electric bill?"
    answer: "Standby power from televisions, game consoles, microwave clocks, network routers, and idle chargers typically ranges from 1 W to 15 W per device. Across a household with 15 to 20 plugged-in electronics, continuous standby draw often totals 40 W to 80 W—adding 350 to 700 kWh per year, or roughly $60 to $120 annually at $0.17/kWh."
  - question: "What is the fastest way to lower a high monthly electricity bill?"
    answer: "Focus on high-wattage thermal loads with long daily runtimes rather than small LED lights or phone chargers. Heating and cooling equipment, electric dryers, water heaters, and portable space heaters commonly represent over 60% of residential kWh usage. Shifting heavy loads to off-peak Time-of-Use hours, upgrading to heat-pump appliances, and eliminating 1,500 W resistive space heaters yield the largest immediate savings."
---

Electric utilities bill residential and commercial customers for total energy consumed in kilowatt-hours (kWh), not for the instantaneous power rating printed on an appliance's specification plate. To calculate an appliance's operating cost, multiply its average power draw in kilowatts by its active runtime in hours, then multiply that energy total by your marginal electricity rate in dollars per kWh.

For example, running a 1,500 W resistive space heater for 8 hours overnight consumes 12.0 kWh and costs $2.04 per night at a typical US residential rate of $0.17/kWh—or $61.20 across a 30-day winter billing cycle. By contrast, a 9 W LED bulb running 6 hours daily uses just 0.054 kWh per day and costs $0.28 per month. Use our [Electricity Cost Calculator](/en/calculators/electricity-cost-calculator) to convert wattage, daily runtime, and local utility rates into exact daily, monthly, and annual expense projections.

## Core Electricity Cost Formulas and Parameter Definitions

Determining true operating expense requires translating instantaneous electrical power into billed energy over a defined billing window:

```text
Energy Consumed (kWh) = [Power (W) × Runtime (hours)] / 1,000
AC Power from Nameplate: P (W) = Voltage (V) × Current (A) × Power Factor (PF)
Duty-Cycle Adjusted Energy: E_daily (kWh) = [P_running (W) × Hours_plugged_in × Duty Cycle] / 1,000
Daily Cost ($) = E_daily (kWh) × Utility Rate ($/kWh)
Monthly Cost (30-day) = Daily Cost ($) × 30
Annual Cost (365-day) = Daily Cost ($) × 365
```

Three parameters govern estimate accuracy:

- **Actual Power Draw (`P`):** Measured in watts (W). Nameplate ratings list maximum safe circuit demand—such as startup surge or highest heat setting—rather than steady-state draw. A PC with a 750 W power supply might pull 90 W at idle and 420 W while gaming.
- **Effective Runtime (`t`):** Measured in hours per day. Resistive heaters operate at a 100% duty cycle while switched on, whereas thermostatic equipment (refrigerators, freezers, air conditioners) cycles on and off, making effective runtime a fraction of plugged-in hours.
- **Marginal Tariff (`$/kWh`):** Divide variable energy charges (generation plus per-kWh delivery) by total kWh billed. Exclude fixed monthly customer fees that do not vary with usage.

## Step-by-Step Worked Example: Space Heater vs. Gaming Workstation

Compare two winter loads at a marginal US residential rate of **$0.17/kWh**: a 1,500 W space heater running overnight and a gaming desktop used each evening.

### Load 1: 1,500 W Space Heater (8 Hours/Night)

1. **Daily energy:** `(1,500 W × 8 hours) / 1,000 = 12.00 kWh/day`.
2. **Daily cost:** `12.00 kWh × $0.17/kWh = $2.04/day`.
3. **30-day monthly cost:** `$2.04 × 30 = $61.20/month` (360.0 kWh).
4. **4-month winter season (120 days):** `12.00 kWh × 120 × $0.17 = $244.80`.

### Load 2: Gaming PC + Monitor (4 Hours Active, 20 Hours Sleep)

Suppose a desktop PC and monitor draw **560 W** from the wall during 4 hours of gaming and drop to **3 W** combined standby draw for the remaining 20 hours.

1. **Active daily energy:** `(560 W × 4 hours) / 1,000 = 2.24 kWh/day`.
2. **Standby daily energy:** `(3 W × 20 hours) / 1,000 = 0.06 kWh/day`.
3. **Total daily energy:** `2.24 + 0.06 = 2.30 kWh/day`.
4. **Daily, monthly, and annual costs:** `$0.391/day` (`2.30 × $0.17`), `$11.73/month` (69.0 kWh over 30 days), and `$142.72/year` (839.5 kWh over 365 days).

The space heater uses over five times as much daily energy because resistive heating runs continuously at full rated wattage.

## Common Household Appliance Energy and Cost Benchmarks

The table below compares typical US appliances evaluated at **$0.17/kWh**. Cycling loads reflect effective active compressor or element hours per day.

| Appliance | Typical Draw (W) | Effective Daily Use | Daily Energy (kWh) | 30-Day Cost | 365-Day Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| LED Lightbulb (800 lm) | 9 W | 6.0 hr/day | 0.054 kWh | $0.28 | $3.35 |
| 55-Inch 4K Television | 120 W | 4.0 hr/day | 0.480 kWh | $2.45 | $29.78 |
| Refrigerator (18–22 cu ft) | 150 W | 8.0 hr/day (33% duty) | 1.200 kWh | $6.12 | $74.46 |
| Electric Clothes Dryer | 5,000 W | 1.0 hr/day | 5.000 kWh | $25.50 | $310.25 |
| Window AC Unit (12,000 BTU) | 1,200 W | 6.0 hr/day (75% duty) | 7.200 kWh | $36.72 | $446.76 |
| Portable Space Heater | 1,500 W | 8.0 hr/day | 12.000 kWh | $61.20 | $744.60 |
| Level 2 EV Charger (30 A) | 7,200 W | 2.0 hr/day | 14.400 kWh | $73.44 | $893.52 |

## Real-World Metering Pitfalls and Tariff Caveats

Hand calculations from labels often diverge from utility meter readings for four reasons:

1. **Nameplate Overstatement vs. Plug-In Metering:** Safety agencies require labels to state peak current draw under worst-case conditions. An inline watt-hour meter captures cumulative kWh over a 24-hour or 7-day sample, integrating variable loads and compressor duty cycles automatically.
2. **Time-of-Use (TOU) and Tiered Tariffs:** Under TOU plans, peak late-afternoon kWh can cost 2× to 3× overnight rates, while tiered plans raise prices above a monthly baseline. Match heavy loads like EV chargers and dryers to the active rate window.
3. **Fixed Charges vs. Marginal Savings:** If your bill totals $170 for 800 kWh including a $26 fixed customer fee, your marginal rate is `($170 − $26) / 800 = $0.18/kWh`, not $0.2125/kWh.
4. **Resistive Heat vs. Heat Pumps:** A 1,500 W space heater delivers 5,118 BTU/hr (COP 1.0), whereas a cold-climate mini-split drawing 1,500 W moves 15,000+ BTU/hr (COP ~3.0), cutting heating electricity cost by roughly two-thirds.
