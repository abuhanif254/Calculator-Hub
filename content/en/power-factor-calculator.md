---
title: "Power Factor Calculator | Correction & Capacitor Sizing Solver"
description: "Free online Power Factor Calculator. Instantly calculate power factor (PF), real power (kW), apparent power (kVA), reactive power (kVAR), phase angle, 1-phase and 3-phase AC current, power factor correction, and capacitor bank sizing."
metaTitle: "Power Factor Calculator | Correction & Capacitor Sizing Solver"
metaDescription: "Free online Power Factor Calculator. Instantly calculate power factor (PF), real power (kW), apparent power (kVA), reactive power (kVAR), phase angle, 1-phase and 3-phase AC current, power factor correction, and capacitor bank sizing."
metaKeywords: "power factor calculator, pf calculator, power factor correction calculator, reactive power calculator, apparent power calculator, capacitor bank sizing, 3 phase power factor calculator"
features:
  - "Interactive Cockpit featuring Simple and Advanced Mode toggle"
  - "5 Feature Category Tabs: Basic AC PF Solver, PF Correction & Capacitor Sizing, Before/After Comparison Dashboard, Multi-Load Vector Aggregation, and Motor/Transformer Utilization"
  - "📐 Interactive Dynamic SVG Power Triangle Diagram displaying Real Power (P), Reactive Power (Q), Apparent Power (S), and Phase Angle (φ)"
  - "🔄 Interactive Phasor Vector Diagram illustrating Voltage (V) vs Current (I) for Leading, Lagging, or Unity alignment"
  - "🏢 Multi-Load Vector Aggregation Builder (ΣP + jΣQ) avoiding incorrect arithmetic averaging"
  - "🔋 Capacitor Bank Sizing in Microfarads (μF) for 50Hz and 60Hz Systems in Delta (Δ) or Wye (Y) Topologies"
  - "📊 Before vs After Correction Analysis showing line current reduction % and released kVA transformer capacity"
  - "Practice Quiz Generator with random power factor engineering problems and step-by-step mathematical derivations"
useCases:
  - "Electrical engineers designing power factor correction capacitor banks for industrial manufacturing facilities"
  - "Facility managers reducing utility reactive power penalty surcharges and releasing transformer capacity"
  - "Electricians and power system technicians sizing 3-phase 480V and 400V capacitor steps"
  - "Engineering students visualizing real, reactive, and apparent power triangles and phase angles"
howToSteps:
  - "Select your AC System Type (1-Phase or 3-Phase Line-to-Line) and enter System Voltage (V)."
  - "Enter Real Power (P in kW) and initial Power Factor (PF)."
  - "Specify your Target Power Factor (e.g. 0.95 or 0.98) and Frequency (50Hz or 60Hz)."
  - "Observe the Interactive Power Triangle, Required Compensation (Qc in kVAR), and Microfarads (μF) per phase."
  - "Use the Before/After Dashboard to inspect line current reduction % and transformer capacity release."
  - "Click 'Copy Summary' or 'Print PDF' to save your electrical engineering analysis report."
faqs:
  - question: "What is Power Factor (PF)?"
    answer: "Power Factor is the ratio of Real Power (kW) actually consumed to perform work to Apparent Power (kVA) supplied to the circuit (PF = P / S = cos φ). It measures AC electrical energy efficiency."
  - question: "What is the formula for Power Factor?"
    answer: "Power Factor PF = Real Power P (kW) / Apparent Power S (kVA). Alternatively, PF = cos(φ), where φ is the phase shift angle between AC voltage and current."
  - question: "What is the difference between Real Power, Reactive Power, and Apparent Power?"
    answer: "Real Power P (kW) does actual work (heat, light, motion). Reactive Power Q (kVAR) sustains electromagnetic fields in motors and transformers. Apparent Power S (kVA) is the total vector combination of both (S = √(P² + Q²))."
  - question: "What is lagging power factor?"
    answer: "A lagging power factor occurs in inductive loads (motors, transformers, inductors) where the current waveform lags behind the voltage waveform (phase angle φ > 0)."
  - question: "What is leading power factor?"
    answer: "A leading power factor occurs in capacitive loads (capacitor banks, long transmission cables) where the current waveform leads the voltage waveform (phase angle φ < 0)."
  - question: "What is unity power factor?"
    answer: "Unity power factor (PF = 1.0) occurs when voltage and current waveforms are perfectly in phase (φ = 0°), meaning 100% of supplied energy is converted into real work (0 kVAR reactive power)."
  - question: "Why do electric utilities charge power factor penalty fees?"
    answer: "Low power factor forces utilities to supply higher line current and larger kVA transformer capacity to deliver the same real power (kW), causing higher transmission losses (I²R) across power grids."
  - question: "How does power factor correction (PFC) work?"
    answer: "Power factor correction adds parallel capacitor banks that generate leading reactive power (-kVAR), neutralizing the lagging reactive power (+kVAR) drawn by inductive motors."
  - question: "What is the formula for required capacitive compensation (Qc)?"
    answer: "Qc = P × (tan φ1 - tan φ2), where P is Real Power in kW, φ1 is initial phase angle (arccos PF1), and φ2 is target phase angle (arccos PF2)."
  - question: "How do you calculate capacitor bank size in Microfarads (μF)?"
    answer: "For single-phase: C = (Qc × 1000) / (2π f V²). For 3-phase Delta: C_delta = (Qc × 1000) / (3 × 2π f V_L²). For 3-phase Wye: C_wye = (Qc × 1000) / (2π f V_L²)."
  - question: "How to calculate line current in a 3-phase AC system?"
    answer: "Line Current I_L = (P × 1000) / (√3 × V_L × PF), where P is kW, V_L is Line-to-Line Voltage, and PF is Power Factor."
  - question: "How to calculate line current in a single-phase AC system?"
    answer: "Line Current I = (P × 1000) / (V × PF), where P is kW, V is Voltage, and PF is Power Factor."
  - question: "How much can power factor correction reduce line current?"
    answer: "Improving PF from 0.75 to 0.95 reduces line current by approximately 21%, reducing cable heating losses (I²R) by nearly 37%."
  - question: "Why can't you simply average power factors when combining multiple loads?"
    answer: "Power factor is a non-linear trigonometric ratio (cos φ). Multiple loads must be aggregated by summing total Real Power (ΣP) and total Reactive Power (ΣQ), then calculating PF_total = ΣP / √( (ΣP)² + (ΣQ)² )."
  - question: "What is the Power Triangle?"
    answer: "The Power Triangle is a right-angled triangle representing the vector relationship between Real Power P (horizontal base), Reactive Power Q (vertical perpendicular), and Apparent Power S (hypotenuse)."
  - question: "What is the difference between Displacement Power Factor and True Power Factor?"
    answer: "Displacement PF is based solely on fundamental 50Hz/60Hz phase displacement (cos φ1). True PF accounts for total harmonic distortion (THD) caused by non-linear electronics (True PF = Displacement PF × Harmonic Factor)."
  - question: "What is a harmonic distortion warning for capacitor banks?"
    answer: "Non-linear loads (VFDs, switching power supplies) generate harmonic currents. Standard capacitor banks can resonate with system inductance at harmonic frequencies, causing overvoltage destruction."
  - question: "What is detuned capacitor bank filtering?"
    answer: "Detuned capacitor banks connect series reactors (inductors) with capacitors to shift the resonant frequency below the lowest harmonic (e.g. 5th harmonic 300Hz), preventing harmonic amplification."
  - question: "What is target power factor for industrial facilities?"
    answer: "Industrial facilities typically target a power factor between 0.95 and 0.98 lagging to avoid utility penalty surcharges without risking leading PF overcorrection."
  - question: "What happens if a system is overcorrected to a leading power factor?"
    answer: "Overcorrecting to a leading PF (PF < 1.0 leading) can cause generator voltage instability, unwanted high voltage rise during light load conditions, and tripping of protective relays."
  - question: "How does improving power factor release transformer kVA capacity?"
    answer: "Transformer capacity is rated in kVA (S = P / PF). Raising PF from 0.75 to 0.95 for a 100 kW load reduces kVA demand from 133.3 kVA to 105.3 kVA, releasing 28 kVA of spare transformer headroom."
  - question: "What is automatic power factor correction (APFC)?"
    answer: "An APFC panel uses a microprocessor controller to automatically switch steps of capacitor banks in response to changing inductive motor loads, maintaining a steady target PF."
  - question: "What is the phase angle for a 0.80 power factor?"
    answer: "φ = arccos(0.80) = 36.87 degrees (0.6435 radians)."
  - question: "What is the power factor of pure resistive loads (heaters, incandescent lamps)?"
    answer: "Pure resistive loads have a power factor of 1.0 (unity PF, 0 kVAR reactive power, phase angle 0°)."
  - question: "What is the typical power factor of an uncorrected induction motor?"
    answer: "An uncorrected 3-phase induction motor operates at 0.80 to 0.88 PF at full load, and as low as 0.20 to 0.50 PF when idling or lightly loaded."
  - question: "What is the power factor of modern switching computer power supplies?"
    answer: "Modern computer PSUs with Active Power Factor Correction (Active PFC) operate at a power factor of 0.95 to 0.99."
  - question: "Does power factor correction reduce residential electric bills?"
    answer: "Usually no. Residential electric meters bill only for Real Power energy (kWh), not kVA demand or kVAR. PFC benefits commercial and industrial facilities subject to kVA/kVAR billing tariffs."
  - question: "What is kVARh (Kilovar-hour)?"
    answer: "kVARh measures cumulative reactive energy consumed over time, used by industrial utility meters to calculate power factor penalty fees."
  - question: "What voltage rating capacitors should be used for 480V 3-phase correction?"
    answer: "For 480V systems, capacitors rated at 525V or 600V are recommended to provide safety margin against harmonic overvoltage spikes."
  - question: "What is the relationship between kVA, kW, and kVAR?"
    answer: "(kVA)² = (kW)² + (kVAR)². Therefore kVA = √( kW² + kVAR² )."
---

# Comprehensive Engineering Guide to Power Factor, Reactive Compensation, and Capacitor Sizing

**Power factor ($\text{PF}$)** is a fundamental engineering metric defining how efficiently AC electrical power is transmitted and converted into useful work.

Governed by AC vector trigonometry ($\text{PF} = \frac{P}{S} = \cos \phi$) and the Power Triangle ($S^2 = P^2 + Q^2$), optimizing power factor via capacitive compensation ($Q_c$) reduces line current, slashes transmission thermal losses ($I^2 R$), releases transformer kVA capacity, and eliminates utility penalty surcharges.

---

## 1. Fundamental AC Power Equations

```
   P = S × PF  =  S × cos(φ)
   
   S = √( P² + Q² )  =  P / PF
   
   Q = √( S² - P² )  =  P × tan(φ)
   
   Qc = P × [ tan(φ1) - tan(φ2) ]
```

1. **Single-Phase Real Power & Current:**
   $$P = V \cdot I \cdot \text{PF} \quad \implies \quad I = \frac{P \cdot 1000}{V \cdot \text{PF}}$$
2. **Three-Phase Line-to-Line Power & Current:**
   $$P = \sqrt{3} \cdot V_L \cdot I_L \cdot \text{PF} \quad \implies \quad I_L = \frac{P \cdot 1000}{\sqrt{3} \cdot V_L \cdot \text{PF}}$$
3. **Required Capacitive Compensation ($Q_c$ in kVAR):**
   $$Q_c = P \cdot \left[ \tan(\arccos \text{PF}_1) - \tan(\arccos \text{PF}_2) \right]$$
4. **Capacitor Bank Sizing in Microfarads ($\mu\text{F}$) for 3-Phase Delta ($\Delta$):**
   $$C_{\Delta} = \frac{Q_c \cdot 1000}{3 \cdot 2\pi f \cdot V_L^2} \times 10^6 \quad [\mu\text{F} / \text{phase}]$$

---

## 2. Typical Power Factor Reference Values

| Load / Equipment Type | Typical Uncorrected PF | Phase Shift Angle $\phi$ | Nature | Typical Corrected Target PF |
| :--- | :--- | :--- | :--- | :--- |
| **Incandescent Lighting / Heaters** | $1.00$ | $0.0^\circ$ | Unity | $1.00$ |
| **Active PFC Switching PSU** | $0.98 - 0.99$ | $8.1^\circ - 11.5^\circ$ | Lagging | $0.99$ |
| **Large 3-Phase Motor (Full Load)** | $0.85 - 0.88$ | $28.4^\circ - 31.8^\circ$ | Lagging | $0.95 - 0.98$ |
| **Small 3-Phase Motor (Partial Load)**| $0.70 - 0.75$ | $41.4^\circ - 45.6^\circ$ | Lagging | $0.95$ |
| **HVAC Reciprocating Compressor** | $0.75 - 0.82$ | $34.9^\circ - 41.4^\circ$ | Lagging | $0.95$ |
| **Uncorrected Arc Welder / Transformer**| $0.50 - 0.65$ | $49.5^\circ - 60.0^\circ$ | Lagging | $0.92 - 0.95$ |

---

## 3. Power Factor Correction Before/After Impact (100 kW Load @ 480V 3-Phase)

| Parameter | Before Correction ($\text{PF}_1 = 0.75$) | After Correction ($\text{PF}_2 = 0.95$) | Impact / Reduction |
| :--- | :--- | :--- | :--- |
| **Real Power ($P$)** | $100.0\text{ kW}$ | $100.0\text{ kW}$ | Same Work Performed |
| **Apparent Power ($S$)** | $133.3\text{ kVA}$ | $105.3\text{ kVA}$ | **$28.0\text{ kVA}$ Released ($21\%$ Less)** |
| **Reactive Power ($Q$)** | $88.2\text{ kVAR}$ | $32.9\text{ kVAR}$ | **$55.3\text{ kVAR}$ Neutralized ($62.7\%$ Less)** |
| **Line Current ($I_L$)** | $160.4\text{ A}$ | $126.6\text{ A}$ | **$33.8\text{ A}$ Saved ($21.1\%$ Reduction)** |
| **Cable $I^2 R$ Heat Loss** | $100\%$ Base | $62.2\%$ Base | **$37.8\%$ Cable Thermal Reduction** |

---

## 4. Important Safety & Engineering Disclaimer
*This power factor calculator provides preliminary capacity estimates for educational and engineering feasibility analysis. Final capacitor bank selection, harmonic resonance analysis, and switchgear installation must comply with local electrical codes and be performed by qualified electrical engineers.*
