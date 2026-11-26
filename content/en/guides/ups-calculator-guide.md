---
title: "UPS Calculator: Sizing Your Backup Battery"
description: "Learn what an Uninterruptible Power Supply (UPS) is, how to calculate your VA and Wattage needs, and use our free UPS Calculator."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ups-calculator"
relatedType: "calculator"
faqs:
  - question: "Why are UPS units rated in both Volt-Amps (VA) and Watts (W), and which limit applies first?"
    answer: "Watts measure real power consumed to run circuits and generate heat, whereas Volt-Amps measure apparent power (voltage multiplied by RMS current) drawn from the AC line. Because power supplies have a Power Factor below 1.0, apparent VA always equals or exceeds real Watts. Your connected equipment must stay below both the Watt ceiling and the VA ceiling—whichever limit is reached first trips the UPS overload alarm."
  - question: "What is the difference between Standby, Line-Interactive, and Double-Conversion Online UPS topologies?"
    answer: "Standby (offline) units pass wall power straight through and switch to battery in 6–12 ms during an outage. Line-interactive units add Automatic Voltage Regulation (AVR) to boost brownouts and trim surges without draining the battery, transferring in 4–8 ms. Double-conversion online units continuously convert AC to DC and back to AC for zero transfer time (0 ms) and complete grid isolation."
  - question: "Why do modern Active PFC computer power supplies require a pure sine wave UPS?"
    answer: "Power supplies with Active Power Factor Correction (PFC) expect a smooth sinusoidal AC waveform. When budget UPS units switch to battery, they output a stepped or simulated sine wave containing sharp voltage gaps. During the transfer window, an Active PFC circuit may interpret those zero-voltage plateaus as a power loss and shut down the PC abruptly."
  - question: "How do you estimate battery runtime in minutes from battery capacity?"
    answer: "Compute stored battery energy in Watt-hours (Battery Voltage × Amp-Hours × Number of Batteries), multiply by inverter efficiency (typically 0.80–0.88), divide by total AC load in Watts, and multiply by 60. For AGM lead-acid batteries under heavy discharge (under 20 minutes), Peukert's law reduces effective capacity by 25% to 45%, so always verify against the manufacturer's load-runtime curve."
  - question: "Can you plug a laser printer, space heater, or surge-protected power strip into a UPS battery outlet?"
    answer: "No. Laser printers trigger 1,000–1,500 W fuser heating spikes that instantly trip residential UPS overload protection, and space heaters drain batteries within seconds. Furthermore, plugging a surge-protected power strip with Metal Oxide Varistors (MOVs) into a UPS battery outlet can distort waveform sensing and void the equipment warranty; use a plain, non-surge PDU instead."
---

An **Uninterruptible Power Supply (UPS)** protects workstations, network gear, and servers from blackouts, voltage sags, and frequency spikes by switching seamlessly to an internal battery when utility power fails. Sizing a UPS correctly requires checking two independent electrical ceilings—**real power in Watts (W)** and **apparent power in Volt-Amps (VA)**—while adding a **20% to 25% safety margin** above your measured peak load.

Buying strictly by the advertised VA number is the most common sizing mistake. A consumer `1500 VA` unit rated at a `0.60` power factor caps real output at `900 W`, whereas a commercial `1500 VA` unit with a `0.90` power factor delivers `1,350 W`. Use our [UPS Calculator](/en/calculators/ups-calculator) to sum your device wattages, factor in power factor and headroom, and determine exact minimum Watt and VA specifications.

## Real Power (Watts), Apparent Power (VA), and Runtime Formulas

Alternating current (AC) power supplies draw reactive and harmonic current alongside useful work current. **Watts** quantify true energy converted into computation, light, and heat, while **Volt-Amps** measure the total current (`I_rms`) multiplied by line voltage (`V_rms`) that wiring and inverter transistors must carry. The ratio between the two is the **Power Factor (`PF`)**.

```text
Power Factor Relationship:
PF = W / VA   (where 0 < PF ≤ 1.0)

Required UPS Ratings with Safety Margin:
W_req  = Σ(W_device) × (1 + Margin)
VA_req = Σ(W_device / PF_device) × (1 + Margin)

Stored Battery Energy & Ideal Runtime Estimate:
E_batt (Wh) = V_batt × Ah × N_batt
t_ideal (min) = (E_batt × η_inv / W_load) × 60
```

Here, `Margin` is typically `0.20` to `0.25` (20%–25% headroom), `PF_device` ranges from `0.95–0.99` for Active PFC desktop PSUs down to `0.65–0.80` for small wall-wart adapters, `V_batt` and `Ah` are the nominal battery voltage (commonly `12 V`) and Amp-hour rating (commonly `7 Ah` or `9 Ah`), `N_batt` is the number of internal battery blocks, and `η_inv` is the DC-to-AC inverter efficiency (`0.80–0.88`).

Keep in mind **Peukert's law** for Valve-Regulated Lead-Acid (VRLA/AGM) batteries: nominal `Ah` ratings are measured over a slow 20-hour discharge (`C/20`). Pulling `550 W` from a `216 Wh` battery pack represents a `2.5C` discharge rate, where internal resistance losses cut usable runtime roughly `35%–45%` below `t_ideal`.

## Step-by-Step Worked Workstation Sizing Example

Suppose you want to protect a workstation, two monitors, network gear, and a 4-bay NAS so everything rides through flickers and shuts down cleanly during blackouts.

1. **Inventory real load (`W`) and device Power Factor (`PF`):**
   - Workstation under sustained load: `380 W` (`PF = 0.95`) → `400.0 VA`
   - Two 27-inch monitors (`35 W` each, `PF = 0.85`): `70 W` → `82.4 VA`
   - Fiber ONT, router, and 8-port switch (`PF = 0.70`): `45 W` → `64.3 VA`
   - Four-bay NAS (`PF = 0.85`): `55 W` → `64.7 VA`
2. **Sum baseline load:** `550 W` real power and `611.4 VA` apparent power.
3. **Apply a 25% safety margin (`× 1.25`):**
   - `W_req = 550 × 1.25 = 687.5 W`
   - `VA_req = 611.4 × 1.25 = 764.3 VA`
4. **Select a model and verify runtime:** A `1000 VA / 600 W` consumer unit (`PF = 0.60`) passes `VA_req` (`1000 > 764.3`) yet **fails** `W_req` (`600 < 687.5`), running at `91.7%` capacity before any GPU spike. Moving to a `1500 VA / 900 W` **pure sine wave** line-interactive UPS keeps baseline load at `61%` (`550 / 900`). With two `12 V 9 Ah` batteries (`E_batt = 216 Wh`, `η_inv = 0.82`), ideal runtime is `(216 × 0.82 / 550) × 60 = 19.3 minutes`, which Peukert derating reduces to roughly `9–12 minutes` of real-world shutdown time.

## UPS Topology and Sizing Benchmarks

Different hardware profiles demand specific electrical topologies, output waveforms, and capacity tiers.

| Deployment Profile | Typical Load | Recommended UPS Rating | Recommended Topology | Required Waveform | Est. Runtime at Load |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Fiber ONT + Wi-Fi Router | `25–40 W` | `450–600 VA / 250–360 W` | Standby or DC Mini-UPS | Simulated or Pure Sine | `45–90 min` |
| Laptop Dock + Single Monitor | `90–140 W` | `650–850 VA / 390–510 W` | Line-Interactive | Simulated or Pure Sine | `20–35 min` |
| Homelab NAS + PoE Switch | `200–350 W` | `1000 VA / 600–800 W` | Line-Interactive (AVR) | Pure Sine Wave | `15–25 min` |
| Creator PC + Dual Displays | `450–580 W` | `1500 VA / 900–1000 W` | Line-Interactive (AVR) | Pure Sine Wave | `9–14 min` |
| High-End Gaming Rig + OLED | `650–850 W` | `1500 VA / 1000–1350 W` | High-PF Line-Interactive | Pure Sine Wave | `6–10 min` |
| Critical Server / Lab Rack | `1,100–1,600 W` | `2200–3000 VA / 1980–2700 W` | Online Double-Conversion | Pure Sine Wave (`0 ms`) | `8–15 min` (expandable) |

## Deployment Rules, Battery Chemistry, and Safety Caveats

### Topology and Waveform Selection

For home offices and homelabs, a **Line-Interactive UPS with Automatic Voltage Regulation (AVR)** balances cost and longevity because AVR corrects minor brownouts (`±10%–15%`) via transformer taps without cycling the battery. Reserve **Online Double-Conversion** units (`0 ms` transfer) for medical instruments, industrial controllers, or unstable generator-backed grids. Always specify **Pure Sine Wave** output for Active PFC computer power supplies (`80 PLUS` Bronze through Titanium), variable-speed fans, and audio interfaces.

### Common Errors and Maintenance Limits

Never plug high-inrush appliances—laser printers (`1,000+ W` fuser warm-up), space heaters, or shredders—into battery-backed outlets; connect printers only to surge-only ports. Avoid daisy-chaining surge-protected power strips behind a UPS, which violates UL 1778 guidelines and can trip overload protection during transfer.

Account for thermal aging and shutdown automation. Standard sealed VRLA/AGM batteries last `3 to 5 years` at `77 °F (25 °C)`, and every `15 °F (8.3 °C)` rise halves service life. Lithium Iron Phosphate (`LiFePO4`) UPS units cost more upfront but last `8 to 10 years` with flatter discharge curves. Connect the UPS USB or network port (`NUT` or vendor daemon) and trigger OS hibernation at `25%–30%` remaining charge instead of draining batteries to zero.
