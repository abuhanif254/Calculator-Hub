---
title: "Electrochemical Cell Calculator: Batteries Explained"
description: "Learn how galvanic and electrolytic cells convert chemical and electrical energy, calculate standard and Nernst cell potentials, and interpret cell notation."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electrochemical-cell-calculator"
relatedType: "calculator"
faqs:
  - question: "How do I know which electrode is the anode and which is the cathode?"
    answer: "In any spontaneous galvanic (voltaic) cell, the half-reaction with the more positive standard reduction potential (E°) acts as the cathode (reduction), while the half-reaction with the more negative E° acts as the anode (oxidation). In an electrolytic cell driven by an external power supply, polarity is forced so that the non-spontaneous reduction occurs at the cathode and oxidation occurs at the anode."
  - question: "Should I flip the sign of E°_anode before calculating E°_cell?"
    answer: "Only if you add the oxidation and reduction potentials together. To prevent sign errors, use the universal subtraction formula E°_cell = E°_cathode − E°_anode with both values entered directly as tabulated standard reduction potentials. Reversing the sign and also subtracting will double-negate the anode potential and yield an incorrect voltage."
  - question: "What is the role of the salt bridge in a galvanic cell?"
    answer: "A salt bridge completes the electrical circuit without allowing the two half-cell solutions to mix rapidly. As oxidation produces positive cations at the anode and reduction consumes cations at the cathode, inert ions (such as K⁺ and NO₃⁻) migrate out of the salt bridge to maintain electrical neutrality in each beaker; without it, charge buildup stops electron flow almost instantly."
  - question: "Why does an electrolytic cell require more voltage than its calculated |E°_cell|?"
    answer: "Thermodynamic |E°_cell| represents only the theoretical minimum reversible voltage (for example, 1.23 V to split water at 25 °C). Real electrolyzers must also overcome activation overpotential at electrode surfaces (especially for gas evolution like O₂ and H₂) plus ohmic resistance through the electrolyte and membrane, typically pushing practical water electrolysis to 1.7–2.1 V per cell."
  - question: "What does the double vertical bar || mean in standard cell notation?"
    answer: "In IUPAC line notation—written as Anode | Anode Ion (M) || Cathode Ion (M) | Cathode—a single vertical bar (|) marks a phase boundary between solid electrode and aqueous solution, whereas the double vertical bar (||) represents the salt bridge or porous membrane separating the anodic and cathodic compartments."
---

An **electrochemical cell** converts between chemical energy and electrical energy by physically separating oxidation and reduction half-reactions across two electrodes joined by an external wire and an internal ionic conductor. When the net redox reaction is spontaneous (`E_cell > 0`, `ΔG < 0`), the device operates as a **galvanic (voltaic) cell**—a battery—driving electrons from anode to cathode through a load. When an external DC power supply forces a non-spontaneous reaction (`E_cell < 0`, `ΔG > 0`), the system acts as an **electrolytic cell** for hydrogen production, electroplating, or battery recharging.

Calculating exact cell voltage requires pairing standard reduction potentials (`E°_cathode` and `E°_anode`) with non-standard ion concentrations (`Q`) and temperature (`T`) via the Nernst equation. Model galvanic, electrolytic, and concentration cells with IUPAC line notation and free-energy output in our [Electrochemical Cell Calculator](/en/calculators/electrochemical-cell-calculator).

## Core Principles, Sign Conventions, and Governing Formulas

Every functioning electrochemical cell integrates four coupled components:

1. **Anode (Oxidation):** Electrons are released into the circuit (`M(s) → M^(n+)(aq) + ne⁻`).
2. **Cathode (Reduction):** Electrons enter from the wire to reduce ions (`X^(m+)(aq) + me⁻ → X(s)`).
3. **External Conductor:** Metallic wiring carries electrons from anode to cathode.
4. **Salt Bridge or Membrane:** Inert ions (`K⁺`, `NO₃⁻`, or `H⁺`) migrate internally to preserve charge neutrality.

To avoid sign errors, keep all tabulated potentials as **standard reduction potentials (`E°_red`)** and apply:

```text
Standard Cell Potential:   E°_cell = E°_cathode − E°_anode
Reaction Quotient (1:1):   Q       = [Anode Ion] / [Cathode Ion]
Operating Cell Potential:  E_cell  = E°_cell − [ (R × T) / (n × F) ] × ln(Q)
Thermodynamic Free Energy: ΔG      = −n × F × E_cell
```

Parameter definitions:

- **`E°_cathode` and `E°_anode` (V):** Standard reduction potentials referenced to the Standard Hydrogen Electrode (`SHE = 0.000 V` at `25 °C`, `1.0 M`, `1.0 bar`).
- **`n` (Electrons Transferred):** Balanced electron count shared between oxidation and reduction half-reactions.
- **`R` and `F`:** Universal gas constant `8.31446 J/(mol·K)` and Faraday constant `96,485.33 C/mol`.
- **Spontaneity Rule:** `E_cell > 0` gives `ΔG < 0` (spontaneous galvanic battery); `E_cell < 0` gives `ΔG > 0` (non-spontaneous electrolytic cell requiring external voltage exceeding `|E_cell|`).

## Step-by-Step Worked Example: Iron–Copper Galvanic Cell

Evaluate an iron–copper cell at `25 °C` (`298.15 K`) with `[Fe²⁺] = 0.050 M` and `[Cu²⁺] = 1.00 M`:

```text
IUPAC Cell Notation: Fe(s) | Fe²⁺(aq, 0.050 M) || Cu²⁺(aq, 1.00 M) | Cu(s)
```

### 1. Assign Anode and Cathode From Reduction Tables

- `Cu²⁺(aq) + 2e⁻ ⇌ Cu(s)` has `E° = +0.337 V` (more positive → **Cathode**, reduction).
- `Fe²⁺(aq) + 2e⁻ ⇌ Fe(s)` has `E° = −0.440 V` (more negative → **Anode**, oxidation).

### 2. Compute Standard Cell Potential (`E°_cell`)

```text
E°_cell = (+0.337 V) − (−0.440 V) = +0.777 V
Balanced reaction (n = 2): Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s)
```

### 3. Apply Non-Standard Concentrations via the Nernst Equation

```text
Q = [Fe²⁺] / [Cu²⁺] = 0.050 M / 1.00 M = 0.050
(R × T) / (n × F) = (8.31446 × 298.15) / (2 × 96,485.33) = 0.012847 V

E_cell = 0.777 V − (0.012847 V × ln(0.050))
       = 0.777 V − (0.012847 V × (−2.9957))
       = 0.777 V + 0.0385 V = +0.8155 V
```

### 4. Convert Potential to Gibbs Free Energy (`ΔG`)

```text
ΔG = −2 × 96,485.33 C/mol × 0.8155 V = −157,368 J/mol = −157.4 kJ/mol
```

Because `E_cell = +0.8155 V` and `ΔG = −157.4 kJ/mol`, the cell delivers spontaneous electrical work until `Cu²⁺` is exhausted.

## Benchmark Comparison of Electrochemical Cell Systems

Cell chemistries span from millivolt concentration gradients to `3.7 V` non-aqueous lithium cells depending on electrode couples and electrolyte windows.

| Cell System | Anode Reaction | Cathode Reaction | `n` | `E°_cell` (`V`) | Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Silver Concentration | `Ag → Ag⁺ (0.01 M)` | `Ag⁺ (1.0 M) → Ag` | `1` | `0.000` (`E = +0.118`) | Galvanic (entropy-driven) |
| Iron–Copper Cell | `Fe → Fe²⁺` | `Cu²⁺ → Cu` | `2` | `+0.777` | Galvanic reference cell |
| Daniell Cell | `Zn → Zn²⁺` | `Cu²⁺ → Cu` | `2` | `+1.100` | Classic galvanic cell |
| Alkaline Dry Cell | `Zn + 2OH⁻ → ZnO + H₂O` | `2MnO₂ + H₂O → Mn₂O₃ + 2OH⁻` | `2` | `+1.50` (approx.) | Primary galvanic battery |
| Lead–Acid Cell | `Pb + SO₄²⁻ → PbSO₄` | `PbO₂ + 4H⁺ + SO₄²⁻ → PbSO₄` | `2` | `+2.05` | Rechargeable (`6 cells = 12.3 V`) |
| Lithium-Ion (`LCO`) | `LiC₆ → C₆ + Li⁺` | `Li₁₋ₓCoO₂ + xLi⁺ → LiCoO₂` | `1` | `+3.70` (nominal) | Secondary high-energy cell |
| Water Electrolysis | `2H₂O → O₂ + 4H⁺` | `4H₂O + 4e⁻ → 2H₂ + 4OH⁻` | `4` | `−1.229` | Electrolytic (`ΔG° = +474.1 kJ/mol`) |

## Engineering Applications, Common Errors, and Real-World Caveats

Cell potential analysis governs practical battery and corrosion engineering:

- **Series Battery Pack Design:** Because aqueous cells split water above `1.23 V` (plus kinetic overpotential), 12 V automotive lead-acid packs wire **six `2.05 V` cells in series**, whereas 400 V EV packs stack 96–108 aprotic lithium-ion cells (`3.7 V` nominal).
- **Galvanic Corrosion Mitigation:** Bolting steel (`−0.44 V`) to copper (`+0.34 V`) in moisture creates a `+0.78 V` short-circuited cell that corrodes the steel; engineers isolate metals with dielectric unions or attach sacrificial zinc (`−0.76 V`) anodes.
- **Electrorefining and Cathodic Protection:** External DC bias reverses natural metal oxidation on pipelines or refines `99.99%` pure copper.

Avoid four common errors when using the [Electrochemical Cell Calculator](/en/calculators/electrochemical-cell-calculator):

1. **Double-Negating `E°_anode`:** Flipping `E°_anode`'s sign and still subtracting `E°_cathode − E°_anode` produces an inverted or inflated voltage.
2. **Scaling `E°` by Stoichiometry:** Even when doubling a half-reaction (`2 Ag⁺ + 2e⁻ → 2 Ag`), `E°` (`+0.800 V`) stays constant because voltage (`J/C`) is intensive.
3. **Ignoring Overpotential and `I × R` Losses:** Practical electrolyzers require `1.7–2.1 V` (not `1.23 V`) to split water due to gas-evolution activation barriers and membrane resistance.
4. **Assuming Aqueous Stability at High Voltage:** Lithium-ion cells achieve `3.7–4.2 V` only in water-free organic carbonate electrolytes.
