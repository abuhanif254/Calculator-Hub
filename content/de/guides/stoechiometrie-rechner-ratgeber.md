---
title: "Stöchiometrie: Die Mathematik chemischer Reaktionen"
description: "Meistern Sie das wichtigste Konzept der Chemie. Reaktionsgleichungen ausgleichen, den limitierenden Faktor finden und unseren Stöchiometrie-Rechner nutzen."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "stoichiometry-calculator"
relatedType: "calculator"
faqs:
  - question: "Warum muss ich Massen vor dem stöchiometrischen Vergleich immer in Mol umrechnen?"
    answer: "Chemische Reaktionsgleichungen geben das Verhältnis einzelner Teilchen (Atome, Moleküle oder Formeleinheiten) wieder, nicht deren Masse. Da verschiedene Stoffe unterschiedliche molare Massen besitzen – ein Mol Wasserstoff wiegt 2,016 g, ein Mol Sauerstoff 31,998 g –, liefert ein direkter Gramm-Vergleich falsche Stoffmengenverhältnisse."
  - question: "Wie erkenne ich bei zwei gegebenen Eduktmassen sofort den limitierenden Reaktanten?"
    answer: "Teilen Sie die vorhandene Stoffmenge n jedes Edukts durch seinen jeweiligen stöchiometrischen Koeffizienten aus der ausgeglichenen Gleichung. Der kleinste Quotient (n / Koeffizient) identifiziert die Mangelkomponente, die während der Reaktion zuerst vollständig verbraucht wird und somit die maximale theoretische Produktausbeute festlegt."
  - question: "Worin liegt der Unterschied zwischen theoretischer, praktischer und prozentualer Ausbeute?"
    answer: "Die theoretische Ausbeute ist die maximal mögliche Produktmasse bei vollständigem Umsatz des limitierenden Reaktanten ohne Verluste. Die praktische Ausbeute bezeichnet die nach Synthese, Aufreinigung und Trocknung tatsächlich gewogene Produktmenge. Ihr Verhältnis (m_praktisch / m_theoretisch × 100 %) ergibt die prozentuale Ausbeute."
  - question: "Darf ich beim Ausgleichen einer Reaktionsgleichung die tiefgestellten Indizes ändern?"
    answer: "Nein, tiefgestellte Indizes definieren die chemische Identität eines Stoffes und dürfen niemals verändert werden. Aus H₂O würde durch Ändern des Index zu H₂O₂ ein völlig anderer Stoff (Wasserstoffperoxid statt Wasser). Zum Ausgleichen werden ausschließlich die großen stöchiometrischen Koeffizienten vor den Formeln angepasst."
  - question: "Wie berücksichtige ich Kristallwasser oder technische Reinheiten bei Edukten?"
    answer: "Bei Hydraten wie Kupfersulfat-Pentahydrat (CuSO₄ · 5 H₂O) muss das gebundene Kristallwasser vollständig in die molare Masse einbezogen werden. Bei unreinen technischen Chemikalien (z. B. 85 % Reinheit) multiplizieren Sie die eingewogene Gesamtmasse vor der Stoffmengenberechnung mit dem Massenanteil w = 0,85."
---

Die Stöchiometrie verknüpft über das Stoffmengenverhältnis einer ausgeglichenen Reaktionsgleichung die eingesetzten Massen oder Volumina der Ausgangsstoffe (Edukte) mit den maximal entstehenden Produktmengen. Grundlage ist das Massenerhaltungsgesetz nach Lavoisier, wonach bei chemischen Reaktionen kein Atom verloren geht oder neu entsteht.

In Labor und Verfahrenstechnik beantwortet die stöchiometrische Bilanzierung drei Kernfragen: Welcher Reaktant begrenzt den Umsatz, wie viel Produkt entsteht theoretisch und welcher Überschuss bleibt zurück? Mit unserem [Stöchiometrie-Rechner](/de/rechner/stoechiometrie-rechner) prüfen Sie Reaktionsgleichungen, ermitteln den limitierenden Faktor und berechnen exakte Ausbeuten.

## Grundprinzipien, Formeln und Parameterdefinitionen

Jede stöchiometrische Berechnung basiert auf der Umrechnung messbarer Größen (Masse `m`, Lösungsvolumen `V` oder Gasvolumen) in die SI-Basisgröße Stoffmenge `n` (Einheit: `mol`, definiert über die Avogadro-Konstante `6,022 × 10²³ mol⁻¹`). Für eine allgemeine Reaktion `a A + b B → c C + d D` gelten folgende Beziehungen:

```text
Stoffmenge aus Masse:     n = m / M
Stoffmenge in Lösung:     n = c × V
Stoffmenge ideales Gas:   n = (p × V) / (R × T)
Normvolumen (0 °C, 101,3 kPa): n = V / 22,414 L/mol
Reaktionslaufzahl (Umsatz): ξ = min(n(A) / a, n(B) / b)
Theoretische Produktmasse:  m_theo(C) = c × ξ × M(C)
Prozentuale Ausbeute:       Ausbeute (%) = (m_praktisch / m_theoretisch) × 100 %
```

Die Parameter besitzen folgende exakte Bedeutung:

- **Masse (`m`) und molare Masse (`M`):** `m` wird in Gramm (`g`) eingesetzt, `M` in `g/mol` aus den Standardatomgewichten des Periodensystems summiert.
- **Stöchiometrische Koeffizienten (`a, b, c, d`):** Ganzzahlige Faktoren vor den Summenformeln, die auf beiden Seiten der Gleichung für jedes Element und für die Gesamtladung dieselbe Bilanz herstellen.
- **Limitierender Reaktant:** Das Edukt mit dem kleinsten Quotienten `n_Start / Koeffizient`. Sobald es aufgebraucht ist, kommt die Reaktion zum Stillstand.
- **Überschussreaktant:** Jedes weitere Edukt, von dem nach vollständigem Verbrauch der Mangelkomponente eine Reststoffmenge `n_Rest = n_Start − (Koeffizient × ξ)` verbleibt.

### Gleichung korrekt ausgleichen

Bevor Sie rechnen, muss die Atombilanz stimmen. Bei der Knallgasreaktion `H₂ + O₂ → H₂O` stehen links zwei Sauerstoffatome, rechts aber nur eines. Durch Setzen der Koeffizienten entsteht `2 H₂ + O₂ → 2 H₂O`: Auf beiden Seiten finden sich nun exakt 4 Wasserstoff- und 2 Sauerstoffatome im Molverhältnis `2 : 1 : 2`.

## Schritt-für-Schritt-Rechenbeispiel: Reduktion von Eisen(III)-oxid

Betrachtet wird die Reduktion von `50,0 g` Eisen(III)-oxid (`Fe₂O₃`, `M = 159,69 g/mol`) mit `30,0 g` Kohlenmonoxid (`CO`, `M = 28,01 g/mol`) zu elementarem Eisen (`Fe`, `M = 55,845 g/mol`) und Kohlendioxid (`CO₂`, `M = 44,01 g/mol`):

`Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂`

### Schritt 1: Startstoffmengen berechnen

- `n(Fe₂O₃) = 50,0 g / 159,69 g/mol = 0,3131 mol`
- `n(CO) = 30,0 g / 28,01 g/mol = 1,0710 mol`

### Schritt 2: Limitierenden Reaktanten bestimmen

Vergleichen Sie die auf den jeweiligen Koeffizienten normierten Stoffmengen:

- Für `Fe₂O₃` (Koeffizient 1): `0,3131 mol / 1 = 0,3131 mol`
- Für `CO` (Koeffizient 3): `1,0710 mol / 3 = 0,3570 mol`

Da `0,3131 mol < 0,3570 mol` ist, begrenzt **`Fe₂O₃`** die Reaktion (`ξ = 0,3131 mol`). Für den vollständigen Umsatz werden `3 × 0,3131 mol = 0,9393 mol` (`26,31 g`) CO benötigt. Somit bleiben `1,0710 − 0,9393 = 0,1317 mol` (`3,69 g`) CO unverbraucht im Überschuss.

### Schritt 3: Theoretische und prozentuale Ausbeute ermitteln

- **Eisen (`Fe`, Koeffizient 2):** `n_theo(Fe) = 2 × 0,3131 mol = 0,6262 mol` → `m_theo(Fe) = 0,6262 mol × 55,845 g/mol = 34,97 g`.
- **Kohlendioxid (`CO₂`, Koeffizient 3):** `n_theo(CO₂) = 3 × 0,3131 mol = 0,9393 mol` → `m_theo(CO₂) = 0,9393 mol × 44,01 g/mol = 41,34 g`.
- **Massenbilanz-Kontrolle:** Verbrauchte Edukte `50,00 g + 26,31 g = 76,31 g` entsprechen exakt den entstandenen Produkten `34,97 g + 41,34 g = 76,31 g`.

Werden im Experiment nach Aufarbeitung `31,47 g` reines Eisen isoliert, beträgt die prozentuale Ausbeute `(31,47 g / 34,97 g) × 100 % = 90,0 %`.

## Benchmark-Übersicht typischer Reaktionssysteme

Die Tabelle vergleicht sechs Standardreaktionen aus Analytik, Synthese und Industriechemie mit ihren stöchiometrischen Kenndaten:

| Gleichung | Verhältnis | Molare Massen (`g/mol`) | Ausbeute je `1 mol` limit. Edukt | Praxishinweis |
| :--- | :--- | :--- | :--- | :--- |
| `2 H₂ + O₂ → 2 H₂O` | `2 : 1 : 2` | `H₂: 2,016`, `H₂O: 18,015` | `18,015 g H₂O` (limit. `H₂`) | Exotherme Gasreaktion |
| `N₂ + 3 H₂ → 2 NH₃` | `1 : 3 : 2` | `N₂: 28,014`, `NH₃: 17,031` | `34,062 g NH₃` (limit. `N₂`) | Gleichgewicht (Umsatz < 100 %) |
| `Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂` | `1 : 3 : 2 : 3` | `Fe₂O₃: 159,69`, `Fe: 55,845` | `111,69 g Fe` (limit. `Fe₂O₃`) | Hochofenprozess mit CO-Überschuss |
| `CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂` | `1 : 2 : 1` | `CaCO₃: 100,09`, `CO₂: 44,01` | `44,01 g CO₂` (limit. `CaCO₃`) | `22,41 L` `CO₂` unter Normbedingungen |
| `CH₄ + 2 O₂ → CO₂ + 2 H₂O` | `1 : 2 : 1 : 2` | `CH₄: 16,043`, `CO₂: 44,01` | `44,01 g CO₂` (limit. `CH₄`) | Luftüberschuss vermeidet CO |
| `2 NaOH + H₂SO₄ → Na₂SO₄ + 2 H₂O` | `2 : 1 : 1` | `NaOH: 40,00`, `Na₂SO₄: 142,04` | `142,04 g Na₂SO₄` (limit. `H₂SO₄`) | Zweiprotonige Säure (Faktor 2) |

## Praxisanwendungen, Fallstricke und analytische Grenzen

Stöchiometrische Bilanzen steuern in der chemischen Industrie den Rohstoffeinkauf, begrenzen Abfallströme und sichern in der Pharmazie konstante Chargenqualitäten. In der Wassertechnik legen sie zudem die exakte Dosierung von Fällungsmitteln fest.

### Häufige Rechenfehler und verfahrenstechnische Einschränkungen

- **Gleichgewichtslimitierung:** Bei reversiblen Reaktionen wie Veresterungen oder der Ammoniaksynthese begrenzt das thermodynamische Gleichgewicht den maximalen Umsatz unter `100 %`, sofern kein Produkt entfernt wird.
- **Nebenreaktionen und Selektivität:** Konkurrierende Reaktionspfade senken die nutzbare Produktausbeute häufig stärker als mechanische Verluste bei Filtration oder Trocknung.
- **Protonenzahl bei Titrationen:** Bei mehrwertigen Säuren und Basen (`H₂SO₄`, `H₃PO₄`, `Ca(OH)₂`) weicht die Äquivalentstoffmenge von der Molekülstoffmenge um den Faktor 2 oder 3 ab.
- **Bezugstemperatur bei Gasen:** Das molare Normvolumen `22,414 L/mol` gilt streng nur bei `0 °C` und `101,325 kPa` (DIN 1343). Bei `25 °C` steigt es bereits auf `24,465 L/mol` (Abweichung rund `9,2 %`).
