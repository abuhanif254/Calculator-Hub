---
title: "Battery Runtime Calculator | Backup Time & Energy Storage Solver"
description: "Free online Battery Runtime Calculator. Instantly calculate battery backup runtime (hours/minutes), stored energy (Wh & kWh), depth of discharge (DoD), inverter efficiency, Peukert's Law, series-parallel battery banks, and charging time."
metaTitle: "Battery Runtime Calculator | Backup Time & Energy Storage Solver"
metaDescription: "Free online Battery Runtime Calculator. Instantly calculate battery backup runtime (hours/minutes), stored energy (Wh & kWh), depth of discharge (DoD), inverter efficiency, Peukert's Law, series-parallel battery banks, and charging time."
metaKeywords: "battery runtime calculator, battery life calculator, battery backup time calculator, battery capacity calculator, ups battery runtime calculator, inverter battery runtime calculator, peukert law calculator"
features:
  - "Interactive Cockpit featuring Simple and Advanced Mode toggle"
  - "5 Feature Category Tabs: Basic Battery & Inverter Runtime, Series/Parallel Battery Bank Sizing, Multi-Load Duty Cycle Builder, Battery Chemistry & Peukert's Law, and Charging Time & UPS Backup"
  - "🔋 Interactive Dynamic SVG Battery Discharge Diagram displaying Battery Bank (V, Ah), Inverter Efficiency (η), Power Pipeline, and SoC discharge curve over time"
  - "🪜 Derating Waterfall Breakdown comparing Ideal Runtime → Inverter Loss → DoD Limit → SOH Health → Temperature → Final Realistic Runtime"
  - "🏢 Multi-Device Load Builder with Duty Cycles (Routers, Laptops, LED Lights, Refrigerators, TV, CPAP machines)"
  - "🧪 Battery Chemistry Presets (LiFePO4, Lithium-Ion, AGM, Gel, Flooded Lead-Acid) with custom Peukert exponent toggle"
  - "🔌 Charger Current & Charging Time Estimator with C-Rate analysis"
  - "Practice Quiz Generator with random battery engineering problems and step-by-step mathematical derivations"
useCases:
  - "Solar energy users sizing off-grid lithium and lead-acid battery storage banks"
  - "UPS and inverter users calculating battery backup duration during power outages"
  - "RV, camping, marine, and off-grid system builders planning daily energy storage"
  - "Electronics engineers and IoT developers powering Raspberry Pi, Arduino, and CCTV systems"
howToSteps:
  - "Select Battery Nominal Voltage (V) and Battery Capacity (Ah)."
  - "Enter connected Load Power in Watts (W) or build a custom multi-device load profile."
  - "Choose Battery Chemistry (e.g. LiFePO4 90% DoD or AGM 50% DoD) and Inverter Efficiency (%)."
  - "Inspect the Derating Waterfall Breakdown to see theoretical vs real-world runtime."
  - "Configure Series (Ns) and Parallel (Np) battery bank strings if using multiple battery packs."
  - "Click 'Copy Summary' or 'Print PDF' to save your battery system analysis report."
faqs:
  - question: "How do you calculate battery runtime?"
    answer: "Ideal Runtime (Hours) = Total Battery Energy (Wh) / Load Power (W). Total Energy = Battery Voltage (V) × Capacity (Ah)."
  - question: "Why is real-world battery runtime shorter than theoretical runtime?"
    answer: "Theoretical runtime ignores inverter efficiency losses (10-20%), allowable Depth of Discharge (DoD), State of Health (SOH) aging, low temperature capacity derating, and Peukert's Law current discharge losses."
  - question: "What is the difference between Ah and Wh?"
    answer: "Amp-hours (Ah) measure electric charge capacity at a specific voltage. Watt-hours (Wh) measure total stored electrical energy regardless of voltage (Wh = V × Ah)."
  - question: "How long will a 12V 100Ah battery run a 100W load?"
    answer: "A 12V 100Ah battery holds 1200Wh. Ideally, it runs 100W for 12 hours. At 90% inverter efficiency and 80% usable DoD, real-world runtime is approx 8.6 hours."
  - question: "What is Depth of Discharge (DoD)?"
    answer: "Depth of Discharge (DoD) is the percentage of total battery capacity that can be safely discharged. Lead-acid batteries allow 50% DoD, while LiFePO4 batteries allow 80-90% DoD without damaging cycle life."
  - question: "What is Peukert's Law?"
    answer: "Peukert's Law states that a battery's effective capacity decreases when discharged at higher rates. It applies primarily to lead-acid batteries (Peukert exponent n = 1.15 to 1.30)."
  - question: "Does Peukert's Law apply to Lithium-Ion or LiFePO4 batteries?"
    answer: "Lithium-Ion and LiFePO4 batteries have a Peukert exponent of approx 1.0 to 1.05, meaning their capacity remains nearly constant across low and high discharge currents."
  - question: "How does series battery connection affect voltage and capacity?"
    answer: "Connecting batteries in series increases total voltage (V_total = V1 + V2), while capacity (Ah) remains equal to a single battery."
  - question: "How does parallel battery connection affect voltage and capacity?"
    answer: "Connecting batteries in parallel increases total capacity (Ah_total = Ah1 + Ah2), while total voltage remains equal to a single battery."
  - question: "How to calculate series-parallel battery bank energy?"
    answer: "Total Stored Energy (Wh) = (Series Count × Battery Voltage) × (Parallel Count × Battery Capacity Ah)."
  - question: "What is battery inverter efficiency?"
    answer: "Inverters convert battery DC power into AC power for household appliances. Typical inverter efficiency ranges from 85% to 95%, consuming extra battery current as conversion heat loss."
  - question: "How do you calculate battery-side current draw?"
    answer: "Battery Current Draw (Amps) = Load Power (Watts) / (Battery Voltage (V) × Inverter Efficiency decimal)."
  - question: "What is State of Health (SOH)?"
    answer: "State of Health (SOH) represents a battery's remaining capacity compared to its original factory rating as it ages (e.g. 80% SOH after 1,500 cycles)."
  - question: "How does cold temperature affect battery runtime?"
    answer: "Cold temperatures increase electrolyte internal resistance and slow chemical reactions, temporarily reducing usable battery capacity by 10% to 30% below 0°C."
  - question: "How do you calculate battery charging time?"
    answer: "Charging Time (Hours) = (Discharged Ah Capacity × 1.15 Efficiency Factor) / Charger Output Current (Amps)."
  - question: "What is C-Rate in battery discharge?"
    answer: "C-Rate measures discharge current relative to total capacity. 1C means discharging the full capacity in 1 hour (e.g. 100A from a 100Ah battery)."
  - question: "How long will a 12V 200Ah battery power a 500W load via a 90% efficient inverter?"
    answer: "Total Energy = 2400Wh. Battery-side power = 500W / 0.90 = 555.5W. At 80% DoD (1920Wh usable), runtime is approx 3.45 hours (3 hours 27 minutes)."
  - question: "Can you mix different battery chemistries or ages in a battery bank?"
    answer: "No. Mixing different chemistries, ages, or capacities in series or parallel causes severe cell imbalance, uneven current sharing, overcharging, and premature battery failure."
  - question: "What is the typical lifespan of LiFePO4 vs Lead-Acid batteries?"
    answer: "LiFePO4 batteries typically last 3,000 to 5,000 cycles at 80% DoD. Lead-acid batteries last 300 to 500 cycles at 50% DoD."
  - question: "What is duty cycle in load calculations?"
    answer: "Duty cycle is the percentage of time a device actively draws power during an operating period (e.g. a refrigerator compressor running 50% of each hour)."
  - question: "How do you convert Wh to Ah?"
    answer: "Ah = Wh / Battery Voltage (V)."
  - question: "How do you convert Ah to Wh?"
    answer: "Wh = Ah × Battery Voltage (V)."
  - question: "What size battery is needed to run a 300W load for 8 hours?"
    answer: "Required Energy = 300W × 8h = 2400Wh. Accounting for 90% inverter efficiency and 80% DoD, required battery energy is 2400 / (0.9 × 0.8) = 3333Wh (e.g. a 12V 280Ah or 24V 140Ah bank)."
  - question: "What is UPS battery runtime?"
    answer: "UPS runtime is the backup duration provided by internal lead-acid or lithium batteries during AC utility power outages."
  - question: "What is the difference between peak power and continuous power?"
    answer: "Continuous power is steady energy drawn during normal operation. Peak power (surge) is brief initial power drawn by motors when starting up (2x to 5x continuous rating)."
  - question: "How does wire resistance affect battery runtime?"
    answer: "Undersized DC battery cables cause voltage drop (I²R loss), causing the inverter to reach low-voltage disconnect prematurely."
  - question: "What is low voltage disconnect (LVD)?"
    answer: "LVD is a protective circuit inside inverters and charge controllers that disconnects the load when battery voltage drops below a safe threshold to prevent destructive deep discharge."
  - question: "What is round-trip battery efficiency?"
    answer: "Round-trip efficiency is the ratio of energy retrieved during discharge to energy required during charging (typically 95% for LiFePO4 and 80% for lead-acid)."
  - question: "How to size a solar battery backup system?"
    answer: "Sum daily Wh load consumption, divide by inverter efficiency and DoD, then select a battery bank Wh rating exceeding 1 to 2 days of autonomy."
  - question: "What safety precautions are needed for high-current DC battery wiring?"
    answer: "Always install an appropriately rated fuse or circuit breaker near the positive battery terminal to prevent electrical fires during short circuits."
---

# Comprehensive Engineering Guide to Battery Runtime, Energy Storage, and Battery Bank Sizing

Evaluating **battery backup runtime** requires moving beyond simplistic theoretical formulas ($\text{Time} = \frac{\text{Capacity}}{\text{Load}}$) to account for conversion losses, chemistry limits, and environmental conditions.

Governed by electrochemistry and DC circuit theory, real-world battery performance relies on **Depth of Discharge ($\text{DoD}$)**, **Inverter Efficiency ($\eta$)**, **State of Health ($\text{SOH}$)**, **Peukert's Law**, and **Series-Parallel Bank Geometry**.

---

## 1. Core Battery Equations

```
   Total Energy (Wh) = Voltage (V) × Capacity (Ah)
   
   Usable Energy (Wh) = Energy (Wh) × DoD × SOH × η_temp
   
   Battery-Side Power (W) = Load Power (W) / η_inverter
   
   Ideal Runtime (Hours) = Total Energy (Wh) / Load Power (W)
   
   Real-World Runtime (Hours) = Usable Energy (Wh) / Battery-Side Power (W)
```

1. **Ah to Wh Conversion:**
   $$\text{Energy (Wh)} = V_{\text{battery}} \times C_{\text{Ah}}$$
2. **Battery Discharge Current Draw:**
   $$I_{\text{discharge}} = \frac{P_{\text{load}}}{V_{\text{battery}} \cdot \eta_{\text{inverter}}}$$
3. **Peukert's Law for Lead-Acid Batteries:**
   $$T = H \cdot \left( \frac{C_{\text{rated}}}{I \cdot H} \right)^n$$
   *(where $H = 20\text{ hours}$, $n = 1.15 - 1.30$ Peukert Exponent)*
4. **Series-Parallel Battery Bank Sizing:**
   $$V_{\text{total}} = N_s \times V_{\text{cell}}, \quad C_{\text{total}} = N_p \times C_{\text{cell}}, \quad E_{\text{total}} = V_{\text{total}} \times C_{\text{total}}$$

---

## 2. Battery Chemistry Comparison Matrix

| Chemistry | Nominal Cell V | Usable DoD | Round-Trip Efficiency | Peukert Exponent ($n$) | Cycle Life (80% DoD) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LiFePO4 (Lithium Iron Phosphate)** | $3.2\text{V}$ ($12.8\text{V}$) | $80\% - 90\%$ | $95\% - 98\%$ | $1.00 - 1.05$ (Negligible) | $3,000 - 5,000$ |
| **Lithium-Ion (NMC)** | $3.7\text{V}$ ($11.1\text{V}$) | $80\%$ | $92\% - 95\%$ | $1.00 - 1.05$ (Negligible) | $1,000 - 2,000$ |
| **AGM (Sealed Lead-Acid)** | $2.0\text{V}$ ($12.0\text{V}$) | $50\%$ | $85\%$ | $1.15 - 1.20$ | $400 - 600$ |
| **Gel Lead-Acid** | $2.0\text{V}$ ($12.0\text{V}$) | $50\%$ | $85\%$ | $1.20$ | $500 - 800$ |
| **Flooded Lead-Acid** | $2.0\text{V}$ ($12.0\text{V}$) | $50\%$ | $75\% - 80\%$ | $1.25 - 1.35$ | $300 - 500$ |

---

## 3. Derating Waterfall Example (12V 100Ah Battery @ 200W Load)

| Derating Stage | Value / Efficiency | Energy Available | Calculated Runtime | Cumulative Loss |
| :--- | :--- | :--- | :--- | :--- |
| **1. Ideal Theoretical** | $100\%$ | $1200\text{ Wh}$ | **$6.00\text{ Hours}$** | $0\%$ |
| **2. Inverter Loss** | $90\%$ Efficiency | $1200\text{ Wh}$ ($222.2\text{W}$ Draw) | **$5.40\text{ Hours}$** | $-10.0\%$ |
| **3. Depth of Discharge (DoD)** | $80\%$ DoD | $960\text{ Wh}$ Usable | **$4.32\text{ Hours}$** | $-28.0\%$ |
| **4. State of Health (SOH)** | $90\%$ SOH (Aged) | $864\text{ Wh}$ Usable | **$3.89\text{ Hours}$** | $-35.2\%$ |
| **5. Final Real-World Estimate** | Combined Factors | **$864\text{ Wh}$** | **$3\text{h } 53\text{m}$** | **$-35.2\%$ Real Loss** |

---

## 4. Important Safety & Engineering Disclaimer
*This battery runtime calculator provides preliminary estimates for educational and system design feasibility. Real-world battery performance depends on specific manufacturer discharge curves, battery management systems (BMS), ambient temperature, wiring gauge, and inverter surge capacity. Always consult manufacturer datasheets and follow local electrical codes (e.g. NEC) when installing high-power battery storage systems.*
