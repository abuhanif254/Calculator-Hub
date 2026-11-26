---
title: "pOH-Rechner: Das Gegenteil vom pH-Wert"
description: "Berechnen Sie den pOH-Wert aus der Hydroxidionen-Konzentration, nutzen Sie pH + pOH = 14 bei 25 °C korrekt und vermeiden Sie Fehler bei mehrwertigen Basen."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "poh-calculator"
relatedType: "calculator"
faqs:
  - question: "Was ist der Unterschied zwischen dem pH-Wert und dem pOH-Wert?"
    answer: "Der pH-Wert misst die Konzentration der Wasserstoff- bzw. Hydroniumionen ([H₃O⁺]) und steigt mit zunehmender Basizität. Der pOH-Wert misst spiegelbildlich die Konzentration der Hydroxidionen ([OH⁻]): Je basischer eine Lösung ist, desto niedriger fällt ihr pOH-Wert aus."
  - question: "Gilt die Gleichung pH + pOH = 14 bei jeder Temperatur?"
    answer: "Nein, der Wert 14,00 gilt exakt nur bei 25 °C, weil dort pKw = 14,00 beträgt. Bei 0 °C lautet die Summe pH + pOH = 14,94, bei Körpertemperatur (37 °C) sinkt sie auf 13,62 und bei 60 °C auf 13,02. In Berechnungen muss daher immer das temperaturabhängige pKw verwendet werden."
  - question: "Wie berechne ich den pOH-Wert von Calciumhydroxid oder Bariumhydroxid?"
    answer: "Zweiwertige Erdalkalihydroxide wie Ba(OH)₂ setzen pro Formeleinheit zwei Hydroxidionen frei. Die effektive Hydroxid-Konzentration beträgt daher [OH⁻] = 2 × c₀. Eine 0,01 mol/L Bariumhydroxid-Lösung besitzt somit [OH⁻] = 0,02 mol/L und einen pOH-Wert von 1,70 statt 2,00."
  - question: "Wie bestimmt man den pOH-Wert einer schwachen Base wie Ammoniak?"
    answer: "Schwache Basen protolysieren in Wasser nur teilweise. Mithilfe der Basenkonstante Kb beziehungsweise des pKb-Werts berechnet sich der pOH-Wert näherungsweise über pOH ≈ 0,5 × (pKb − log₁₀(c₀)), sofern der Dissoziationsgrad unter etwa 5 % bleibt und c₀ deutlich oberhalb von 10⁻⁶ mol/L liegt."
  - question: "Kann der pOH-Wert in der Praxis direkt mit einer Elektrode gemessen werden?"
    answer: "Standard-Glaselektroden erfassen direkt die Protonenaktivität und geben somit den pH-Wert aus. Der pOH-Wert wird in der Labor- und Prozessmesstechnik anschließend rechnerisch über pOH = pKw(T) − pH ermittelt, wobei moderne Messgeräte die Temperaturkompensation automatisch durchführen."
---

Während der pH-Wert den Säuregrad einer Lösung über die Hydroniumionen quantifiziert, beschreibt der **pOH-Wert** spiegelbildlich die Alkalität anhand der Konzentration an **Hydroxidionen (`[OH⁻]`)**. Er ist definiert als der negative dekadische Logarithmus der molaren Hydroxidionen-Konzentration. Je höher der Gehalt an Hydroxidionen ist, desto kleiner wird der pOH-Wert — eine stark alkalische Lauge weist somit einen sehr niedrigen pOH-Wert (unter 2) auf, während saure Lösungen hohe pOH-Werte (über 7) besitzen.

In reinem Wasser und allen verdünnten wässrigen Lösungen sind Hydronium- und Hydroxidionen über die Autoprotolyse des Wassers untrennbar gekoppelt. Bei einer Standardtemperatur von 25 °C gilt die exakte Summenbeziehung **`pH + pOH = 14,00`**. Mit unserem [pOH-Rechner](/de/rechner/poh-wert-rechner) bestimmen Sie aus der Hydroxid- oder Hydroniumkonzentration sowie aus einem bekannten pH-Wert im Handumdrehen alle korrespondierenden Größen.

## Mathematische Grundlagen und Ionenprodukt des Wassers

Die rechnerische Herleitung des pOH-Werts folgt exakt derselben logarithmischen Logik wie die pH-Definition, bezieht sich jedoch auf `OH⁻`-Ionen:

```text
pOH = −log₁₀([OH⁻])
[OH⁻] = 10^(−pOH)   [Einheit: mol/L]
Kw = [H₃O⁺] × [OH⁻] = 1,0 × 10⁻¹⁴ mol²/L²   (bei 25 °C)
pH + pOH = pKw = 14,00   (bei 25 °C)
```

Für präzise Berechnungen im Labor müssen die beteiligten Parameter sauber unterschieden werden:

- **`[OH⁻]` (Molare Hydroxidionen-Konzentration):** Konzentration der freien Hydroxidionen in `mol/L`.
- **`pKw` (Negativer Logarithmus des Ionenprodukts):** Bei 25 °C exakt `14,00`; bei anderen Temperaturen steigt oder sinkt dieser Wert entsprechend der Gleichgewichtskonstante `Kw(T)`.
- **`z_B` (Stöchiometrische Wertigkeit einer starken Base):** Einwertige Alkalihydroxide (`NaOH`, `KOH`) liefern `1 mol OH⁻` pro Mol Substanz (`[OH⁻] = c₀`). Zweiwertige Hydroxide wie `Ba(OH)₂` setzen bei vollständiger Lösung `2 mol OH⁻` frei (`[OH⁻] = 2 · c₀`).
- **`pKb` (Basenexponent):** Charakterisiert die Stärke schwacher Basen (`B + H₂O ⇌ BH⁺ + OH⁻`). Solange weniger als 5 % der Base reagieren, gilt die Näherung `pOH ≈ 0,5 × (pKb − log₁₀(c₀))`.

### Wechselwirkung mit Säuren und pH-pOH-Spiegelung

Erhöht sich in einer Lösung die Hydroxidionen-Konzentration um den Faktor 100 (z. B. durch Zugabe von Natronlauge), sinkt der pOH-Wert um exakt **2,00 Einheiten** und der pH-Wert steigt gleichzeitig um **2,00 Einheiten**. Das Produkt `[H₃O⁺] · [OH⁻]` bleibt bei konstanter Temperatur stets invariant.

## Rechenbeispiele: Starke, mehrwertige und schwache Basen

Anhand dreier typischer Laborszenarien bei 25 °C zeigt sich der korrekte Rechenweg vom Stoffansatz bis zum pH- und pOH-Wert.

### Beispiel 1: Zweiwertige starke Base (`Ba(OH)₂`)

Gegeben ist eine Bariumhydroxid-Lösung mit `c₀ = 0,0050 mol/L` (`5,0 × 10⁻³ mol/L`).

1. **Stöchiometrie berücksichtigen:** Da pro Mol `Ba(OH)₂` zwei Mol Hydroxidionen entstehen, verdoppelt sich die Ionenkonzentration: `[OH⁻] = 2 × 0,0050 mol/L = 0,010 mol/L = 1,0 × 10⁻² mol/L`.
2. **pOH-Wert berechnen:** `pOH = −log₁₀(1,0 × 10⁻²) = 2,00`.
3. **pH-Wert ableiten:** `pH = 14,00 − 2,00 = 12,00`.

### Beispiel 2: Schwache Base (Ammoniaklösung, `NH₃`)

Gegeben ist eine wässrige Ammoniaklösung mit `c₀ = 0,10 mol/L` und `pKb = 4,75` bei 25 °C.

1. **Näherungsformel anwenden:** `pOH ≈ 0,5 × (4,75 − log₁₀(0,10)) = 0,5 × (4,75 − (−1,00)) = 0,5 × 5,75 = 2,875 ≈ 2,88`.
2. **Gültigkeit prüfen:** Die zugehörige Konzentration beträgt `[OH⁻] = 10^(−2,875) = 1,33 × 10⁻³ mol/L`. Das entspricht `1,33 %` der Ausgangskonzentration und liegt sicher unter der 5-%-Grenze.
3. **Korrespondierenden pH bestimmen:** `pH = 14,00 − 2,88 = 11,12`.

### Beispiel 3: Umrechnung aus einem gemessenen sauren pH-Wert

Ein saurer Reiniger weist bei 25 °C einen gemessenen pH-Wert von `4,35` auf. Daraus folgt unmittelbar `pOH = 14,00 − 4,35 = 9,65`. Die extrem geringe Hydroxidionen-Konzentration beträgt `[OH⁻] = 10^(−9,65) = 2,24 × 10⁻¹⁰ mol/L`.

## Vergleichstabelle: Zusammenhang zwischen pOH, pH und Ionenkonzentrationen (25 °C)

Die Tabelle illustriert die exakte gegenläufige Skalierung von `pOH` und `pH` über das gesamte wässrige Spektrum:

| pOH-Wert | pH-Wert | `[OH⁻]` (mol/L) | `[H₃O⁺]` (mol/L) | Milieu | Typisches Praxisbeispiel |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0,0 | 14,0 | 1,0 × 10⁰ | 1,0 × 10⁻¹⁴ | Stark alkalisch | 1 mol/L Natronlauge (Entfettungsbad) |
| 2,0 | 12,0 | 1,0 × 10⁻² | 1,0 × 10⁻¹² | Alkalisch | 0,01 mol/L Kalilauge / Bleichlauge |
| 4,5 | 9,5 | 3,2 × 10⁻⁵ | 3,2 × 10⁻¹⁰ | Schwach alkalisch | Gesättigte Seifen- oder Sodalösung |
| 7,0 | 7,0 | 1,0 × 10⁻⁷ | 1,0 × 10⁻⁷ | Neutral | Reinstwasser bei exakt 25 °C |
| 9,0 | 5,0 | 1,0 × 10⁻⁹ | 1,0 × 10⁻⁵ | Schwach sauer | Ungestörtes Regenwasser / Kaffee |
| 11,6 | 2,4 | 2,5 × 10⁻¹² | 4,0 × 10⁻³ | Sauer | Haushaltsessig (ca. 5 % Essigsäure) |
| 13,0 | 1,0 | 1,0 × 10⁻¹³ | 1,0 × 10⁻¹ | Stark sauer | 0,1 mol/L Salzsäure zur Titration |

## Anwendungsbereiche, Temperaturkorrektur und häufige Fehler

In der **industriellen Wasseraufbereitung und Galvanik** dient die Kontrolle des pOH- beziehungsweise pH-Werts zur Ausfällung von Schwermetallen als schwerlösliche Hydroxide (Hydroxidfällung). In der **Kesselwasserchemie** von Kraftwerken wird gezielt ein schwach alkalisches Milieu (`pH 9,2–9,8`, also `pOH 4,2–4,8` bei 25 °C) eingestellt, um Stahlleitungen durch eine stabile Magnetit-Schutzschicht vor Sauerstoffkorrosion zu bewahren. Auch in der **Textil-, Papier- und Reinigungsmittelindustrie** bestimmen Hydroxidkonzentrationen die Verseifungsrate von Fetten und Ölen.

Achten Sie in der Praxis besonders auf diese vier Fehlerquellen:

1. **Starre Anwendung von „14“ abseits von 25 °C:** In warmen Prozesswässern (z. B. 60 °C) sinkt `pKw` auf `13,02`. Wer dort mit `14 − pH` rechnet, überschätzt den pOH-Wert um fast eine volle Einheit und liegt bei der Hydroxidkonzentration um nahezu Faktor 10 daneben.
2. **Übersehen der Basenwertigkeit:** Bei `Ca(OH)₂` (Kalkwasser) oder `Ba(OH)₂` muss die Molarität vor dem Logarithmieren mit 2 multipliziert werden; bei `Ca(OH)₂` begrenzt allerdings die geringe Wasserlöslichkeit (ca. `0,02 mol/L` bei 20 °C) die maximale Konzentration.
3. **Vernachlässigung der Wasser-Autoprotolyse:** Bei stark verdünnten Laugen unter `10⁻⁶ mol/L` (z. B. `10⁻⁸ mol/L NaOH`) darf nicht einfach `pOH = 8` gesetzt werden; die Lösung bleibt mit `pOH ≈ 6,98` (`pH ≈ 7,02`) leicht alkalisch.
4. **Anwendung auf nicht-wässrige Lösungsmittel:** Die Beziehung `pH + pOH = 14` gilt ausschließlich für Wasser als Lösungsmittel. In Alkoholen, Acetonitril oder DMSO existieren eigene Autoprotolysekonstanten und abweichende Skalen.
