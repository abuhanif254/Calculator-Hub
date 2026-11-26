---
title: "Elektrolyse Rechner: Chemie mit Strom antreiben"
description: "Verstehen Sie die Thermodynamik, Zersetzungsspannung und Faraday-Stöchiometrie der Elektrolyse – inklusive Wasserstoff-Rechenbeispiel und Vergleich industrieller Elektrolyseverfahren."
category: "Math & Science"
relatedCalculator: "electrolysis-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was unterscheidet eine Elektrolysezelle grundsätzlich von einer galvanischen Zelle?"
    answer: "In einer galvanischen Zelle (etwa einer Batterie) läuft eine freiwillige Redoxreaktion mit negativer freier Reaktionsenthalpie (ΔG < 0) ab und liefert elektrische Energie; die Anode bildet den Minuspol. In einer Elektrolysezelle erzwingt eine externe Gleichspannungsquelle eine nicht-spontane Reaktion (ΔG > 0); hier ist die Anode (Oxidation) der Pluspol und die Kathode (Reduktion) der Minuspol."
  - question: "Warum liegt die reale Betriebsspannung einer Elektrolyse höher als das Standardpotenzial?"
    answer: "Zur thermodynamischen Zersetzungsspannung addieren sich Aktivierungs- und Diffusionsüberspannungen an Anode und Kathode (η_A, η_K) sowie der ohmsche Spannungsabfall (I × R) in Elektrolyt, Membran und Zuleitungen. Bei der Wasserelektrolyse steigt die benötigte Zellspannung dadurch von theoretisch 1,23 V (bei 25 °C) auf real 1,75 V bis 2,10 V."
  - question: "Wie berechne ich den spezifischen Strombedarf in kWh pro Kilogramm Produkt?"
    answer: "Multiplizieren Sie die reale Zellspannung U_Betrieb mit der für 1 kg Produkt erforderlichen Ladung in Amperestunden (Q_Ah = 1.000 × n × 26,801 / M) und teilen Sie durch 1.000 sowie die Stromausbeute η_Strom: E_spez = (U_Betrieb × Q_Ah) / (1.000 × η_Strom). Je geringer die Zellspannung und die Molmasse bei hoher Wertigkeit sind, desto günstiger arbeitet das Verfahren."
  - question: "Welche Reaktionen laufen bei wässrigen Salzlösungen als Konkurrenz ab?"
    answer: "In wässrigen Elektrolyten konkurrieren gelöste Kationen mit der Reduktion von Wasser zu Wasserstoff (H₂), während Anionen mit der Oxidation von Wasser zu Sauerstoff (O₂) konkurrieren. Deshalb lassen sich unedle Metalle wie Aluminium, Natrium oder Magnesium nicht aus wässrigen Lösungen abscheiden – sie erfordern eine wasserfreie Schmelzflusselektrolyse."
  - question: "Warum ist die Stromstärke und nicht die Spannung direkt für die abgeschiedene Stoffmenge verantwortlich?"
    answer: "Die Spannung entscheidet darüber, ob eine Reaktion energetisch überhaupt möglich ist und welche Nebenreaktionen einsetzen. Die umgesetzte Stoffmenge pro Zeit folgt jedoch ausschließlich dem Elektronenfluss pro Sekunde, also der elektrischen Stromstärke I in Ampere (Q = I × t)."
---

Die **Elektrolyse** nutzt gezielt zugeführte elektrische Gleichstromenergie, um chemisch stabile Verbindungen zu spalten oder thermodynamisch ungünstige Redoxreaktionen (`ΔG > 0`) zu erzwingen. Während spontane chemische Prozesse in Batterien elektrischen Strom freisetzen, kehrt eine Elektrolysezelle dieses Prinzip um: Elektronen werden über eine externe Spannungsquelle in das System gepumpt, sodass an der Kathode (Minuspol) eine Reduktion und an der Anode (Pluspol) eine Oxidation stattfindet.

Auf diesem Verfahren ruhen zentrale Zweige der Grundstoff- und Energiewirtschaft – von der Gewinnung von Primäraluminium über die Chlor-Alkali-Chemie bis hin zur Erzeugung von grünem Wasserstoff durch Wasserspaltung. Die quantitative Stoffbilanz gehorcht dabei der Gleichung `m = (I × t × M) / (n × F)`, während die reale Zellspannung den elektrischen Energiebedarf in Kilowattstunden (`kWh`) bestimmt. Mit unserem [Elektrolyse Rechner](/de/rechner/elektrolyse-rechner) lösen Sie diese Zusammenhänge flexibel nach Masse, Stromstärke, Zeit oder Molmasse auf.

## Thermodynamische Spannung, Überspannung und Stoffumsatz

Damit eine Elektrolyse einsetzt, muss die angelegte Gleichspannung zwei Hürden überwinden: den thermodynamischen Energiebedarf der Reaktion sowie sämtliche kinetischen und ohmschen Verluste der Zelle.

### Zersetzungsspannung und reale Zellspannung

Die reversible Mindestspannung `U_rev` ergibt sich aus der Differenz der Elektrodenpotenziale oder direkt aus der molaren freien Reaktionsenthalpie `ΔG`:

```text
U_rev = E_Kathode − E_Anode = −ΔG / (n × F)
U_Betrieb = U_rev + |η_Anode| + |η_Kathode| + (I × R_Zelle)
```

- **`U_rev` (Reversible Zersetzungsspannung in `V`):** Thermodynamische Mindestspannung im Gleichgewicht (bei der Wasserelektrolyse unter Standardbedingungen `25 °C`, `101,3 kPa` exakt `1,229 V`; bezogen auf den oberen Heizwert `ΔH` entspricht die thermoneutrale Spannung `1,481 V`).
- **`η_Anode`, `η_Kathode` (Überspannungen in `V`):** Zusätzliche Spannung zur Überwindung der Aktivierungsenergie des Ladungsdurchtritts und von Konzentrationsgradienten; stark abhängig von Elektrodenmaterial (z. B. Platin vs. Graphit) und Stromdichte.
- **`I × R_Zelle` (Ohmscher Spannungsabfall in `V`):** Wärmeverlust durch den elektrischen Widerstand von Elektrolyt, Diaphragma bzw. Polymermembran und Stromschienen.

### Stöchiometrie und spezifischer Energiebedarf

Für die Stoffmenge und den Energieaufwand pro Kilogramm Zielprodukt gelten folgende Gleichungen:

```text
m_real = η_Strom × (I × t × M) / (n × F)
E_el = (U_Betrieb × I × t) / 3.600.000   [in kWh]
w_spez = E_el / (m_real / 1.000)         [in kWh/kg]
```

Hier stehen `I` für die Stromstärke (`A`), `t` für die Zeit (`s`), `M` für die Molmasse (`g/mol`), `n` für die Anzahl der Elektronen pro Formeleinheit, `F = 96.485 C/mol` für die Faraday-Konstante und `η_Strom` für die Stromausbeute (`0 < η_Strom ≤ 1`).

## Rechenbeispiel: Grüne Wasserstofferzeugung per PEM-Elektrolyse

Eine PEM-Elektrolysezelle (Protonenaustauschmembran) spaltet demineralisiertes Wasser nach der Gesamtreaktion `2 H₂O → 2 H₂ + O₂`. Die Zelle arbeitet über `t = 4,0 h` (`14.400 s`) mit einem konstanten Gleichstrom von `I = 500 A` bei einer Betriebsspannung von `U_Betrieb = 1,90 V` und einer Stromausbeute von `η_Strom = 98 %` (`0,98`). Gesucht sind die erzeugte Wasserstoffmasse (`M(H₂) = 2,016 g/mol`, `n = 2`), das Normvolumen sowie der spezifische Strombedarf.

1. **Elektrische Gesamtladung berechnen:**
   `Q = I × t = 500 A × 14.400 s = 7.200.000 C` (`2.000 Ah`)
2. **Theoretische Wasserstoffmasse ermitteln:**
   `m_theo = (7.200.000 C × 2,016 g/mol) / (2 × 96.485 C/mol) = 14.515.200 / 192.970 = 75,220 g`
3. **Reale Ausbeute bei `98 %` Stromausbeute:**
   `m_real = 75,220 g × 0,98 = 73,716 g ≈ 73,72 g` (`0,07372 kg`)
4. **Normvolumen bei `0 °C` und `1.013,25 hPa` (`V_m = 22,414 L/mol`):**
   `n(H₂) = 73,716 g / 2,016 g/mol = 36,565 mol`
   `V_N = 36,565 mol × 22,414 L/mol = 819,6 L ≈ 0,820 Nm³`
5. **Elektrische Energie und spezifischer Energieverbrauch:**
   `E_el = (1,90 V × 500 A × 4,0 h) / 1.000 = 3,80 kWh`
   `w_spez = 3,80 kWh / 0,073716 kg = 51,55 kWh/kg H₂`

Bei einem Industriestrompreis von `0,12 €/kWh` betragen die reinen Stromkosten für `1 kg` Wasserstoff in diesem Betriebspunkt `51,55 × 0,12 € = 6,19 €/kg`.

## Vergleich industrieller Elektrolyseverfahren

Die Spannweite zwischen wässriger Elektrolyse, Hochtemperaturverfahren und Schmelzflusselektrolyse zeigt sich deutlich an den typischen Betriebskennzahlen:

| Verfahren | Nettoreaktion / Zielprodukt | Typische Zellspannung | Typische Strombelastung | Spezifischer Energiebedarf | Prozesstemperatur |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Alkalische Wasserelektrolyse (AEL)** | `2 H₂O → 2 H₂ + O₂` | `1,8–2,2 V` | `0,2–0,6 A/cm²` | `48–55 kWh/kg H₂` | `60–90 °C` |
| **PEM-Wasserelektrolyse** | `2 H₂O → 2 H₂ + O₂` | `1,7–2,1 V` | `1,0–2,5 A/cm²` | `50–58 kWh/kg H₂` | `50–80 °C` |
| **Hochtemperatur-Elektrolyse (SOEC)** | `H₂O (Dampf) → H₂ + ½ O₂` | `1,25–1,45 V` | `0,5–1,5 A/cm²` | `36–42 kWh/kg H₂` | `700–850 °C` |
| **Chlor-Alkali-Membranverfahren** | `2 NaCl + 2 H₂O → Cl₂ + H₂ + 2 NaOH` | `2,9–3,3 V` | `0,4–0,6 A/cm²` | `2,2–2,6 kWh/kg Cl₂` | `85–90 °C` |
| **Hall-Héroult-Aluminiumgewinnung** | `2 Al₂O₃ + 3 C → 4 Al + 3 CO₂` | `4,0–4,5 V` | `150–400 kA` (Zellstrom) | `13,0–15,0 kWh/kg Al` | `950–970 °C` |
| **Kupfer-Raffinationselektrolyse** | `Cu(unrein) → Cu(99,99 %)` | `0,25–0,40 V` | `0,02–0,035 A/cm²` | `0,3–0,4 kWh/kg Cu` | `55–65 °C` |

Während bei der Kupferraffination Anodenauflösung und Kathodenabscheidung chemisch entgegengesetzt ablaufen und sich die Standardpotenziale nahezu aufheben (`U_rev ≈ 0 V`), muss beim Hall-Héroult-Verfahren eine extrem stabile Aluminium-Sauerstoff-Bindung in Kryolith-Schmelze bei knapp `960 °C` aufgebrochen werden.

## Praxisgrenzen, Sicherheitsaspekte und typische Berechnungsfehler

Bei der Planung elektrochemischer Anlagen oder Laborversuche führen vereinfachte Annahmen rasch zu Fehlkalibrierungen:

- **Konkurrierende Elektrodenreaktionen:** Wird in wässriger Natriumchlorid-Lösung statt an einer Titan-DSA-Anode an einer ungeeigneten Elektrode gearbeitet oder bei zu hoher Spannung gefahren, verschiebt sich das Verhältnis von Chlor- zu Sauerstoffentwicklung drastisch. Auch die Konzentration der Lösung beeinflusst über die **Nernst-Gleichung** das tatsächliche Elektrodenpotenzial.
- **Verpolungs- und Explosionsrisiko:** Anodische und kathodische Gasräume müssen bei der Wasser- und Chlor-Alkali-Elektrolyse gasdicht durch Diaphragmen oder Membranen getrennt sein. Bereits geringe Gasdurchbrüche („Cross-over“) bilden hochexplosive Knallgas- oder Chlorknallgasgemische.
- **Reale Effizienz vs. Idealgas:** Die Faraday-Formel berechnet zunächst ausschließlich die chemische Stoffmenge. Für den Anlagenwirkungsgrad auf Systemebene (Balance of Plant) müssen zusätzlich Gleichrichterverluste (`2–5 %`), Pumpenleistung, Temperierung und Gasaufbereitung (Trocknung, Kompression) berücksichtigt werden.

Verwechseln Sie in Berechnungen außerdem nicht die **Molmasse pro Formeleinheit** mit der Atommasse: Bei zweiatomigen Gasen wie `H₂` (`2,016 g/mol`, `n = 2`) oder `Cl₂` (`70,906 g/mol`, `n = 2`) entspricht die Elektronenzahl `n` stets dem gesamten abgeschiedenen Molekül, nicht einem einzelnen Atom.
