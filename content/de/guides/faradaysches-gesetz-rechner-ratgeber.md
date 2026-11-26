---
title: "Faradaysches Gesetz Rechner: Elektrolyse"
description: "Berechnen Sie abgeschiedene Stoffmassen, Ladungsmengen und Schichtdicken nach den Faradayschen Gesetzen der Elektrolyse – inklusive Formeln, Kupfer-Rechenbeispiel und Metall-Vergleichstabelle."
category: "Math & Science"
relatedCalculator: "faradays-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was besagen das erste und das zweite Faradaysche Gesetz der Elektrolyse?"
    answer: "Das erste Faradaysche Gesetz besagt, dass die an einer Elektrode abgeschiedene oder umgesetzte Stoffmasse direkt proportional zur geflossenen elektrischen Ladung Q ist. Das zweite Gesetz ergänzt, dass dieselbe Ladungsmenge bei verschiedenen Stoffen Massen abscheidet, die im Verhältnis ihrer chemischen Äquivalentmassen (M / n) stehen."
  - question: "Welchen Wert hat die Faraday-Konstante F und wie entsteht er?"
    answer: "Die Faraday-Konstante F entspricht der elektrischen Ladung von einem Mol einfach geladener Elektronen. Sie ergibt sich aus dem Produkt der Avogadro-Konstante N_A und der Elementarladung e und beträgt exakt 96.485,33212 C/mol (gerundet meist 96.485 C/mol oder 26,801 Ah/mol)."
  - question: "Warum weicht die reale Metallmasse in der Galvanotechnik oft vom theoretischen Wert ab?"
    answer: "Nebenreaktionen an den Elektroden – vor allem die gleichzeitige Entwicklung von Wasserstoff an der Kathode oder parasitäre Oxidationsprozesse – verbrauchen einen Teil des Stroms. Das Verhältnis zwischen tatsächlich abgeschiedener und theoretisch nach Faraday berechneter Masse heißt Stromausbeute (η) und liegt je nach Elektrolyt zwischen 15 % (Chrom(VI)-Bäder) und über 98 % (saure Kupferbäder)."
  - question: "Wie bestimmt man die Elektronenzahl n in der Faraday-Gleichung?"
    answer: "Die Zahl n (in der DIN-Norm häufig auch mit z bezeichnet) gibt an, wie viele Elektronen pro abgeschiedenem Atom, Ion oder Molekül übertragen werden. Bei Silber aus Ag⁺-Lösung gilt n = 1, bei Kupfer aus Cu²⁺-Sulfatbädern n = 2 und bei dreiwertigem Chrom (Cr³⁺) n = 3."
  - question: "Wie lässt sich aus der abgeschiedenen Masse die Schichtdicke beim Galvanisieren berechnen?"
    answer: "Teilen Sie die reale abgeschiedene Masse m_real durch die Dichte ρ des Metalls und die beschichtete Oberfläche A: d = m_real / (ρ × A). Für Kupfer (ρ = 8,96 g/cm³) entspricht 1 g Metall auf 100 cm² Fläche einer mittleren Schichtdicke von rund 1,12 µm."
---

Die **Faradayschen Gesetze der Elektrolyse** verknüpfen elektrische Ladung direkt mit chemischem Stoffumsatz. Fließt ein Gleichstrom durch eine Elektrolytlösung oder Salzschmelze, scheiden sich an den Elektroden exakt vorhersagbare Stoffmengen ab – unabhängig von Temperatur oder Elektrodenabstand, solange keine Nebenreaktionen ablaufen. Auf dieser Gesetzmäßigkeit basieren Galvanotechnik, Metallraffination, Coulometrie sowie moderne Batterie- und Brennstoffzellenberechnungen.

Jedes Mol übertragener Elektronen transportiert die Faraday-Konstante `F = 96.485 C/mol`. Daraus folgt die Grundgleichung `m = (I × t × M) / (n × F)`, mit der Sie aus Stromstärke, Zeit, Molmasse und Ladungszahl sofort die theoretische Masse in Gramm bestimmen. Für präzise Berechnungen im Labor oder Galvanikbad nutzen Sie unseren [Faradaysches Gesetz Rechner](/de/rechner/faradaysches-gesetz-rechner).

## Physikalische Grundlagen und Parameterdefinition

Michael Faraday formulierte 1834 zwei Zusammenhänge, die sich seit der SI-Neudefinition von 2019 auf exakt festgelegte Naturkonstanten stützen:

1. **Erstes Gesetz:** Die umgesetzte Stoffmasse `m` ist direkt proportional zur geflossenen elektrischen Ladung `Q` (`m ∝ Q`, bei konstantem Gleichstrom `Q = I × t`).
2. **Zweites Gesetz:** Dieselbe Ladungsmenge `Q` scheidet bei verschiedenen Stoffen Massen ab, die sich wie ihre chemischen Äquivalentmassen `M / n` verhalten.

### Die vollständige Faraday-Gleichung

Unter Berücksichtigung der praktischen Stromausbeute `η` (Eta) lautet die vollständige Arbeitsformel:

```text
Q = I × t
m_theo = (Q × M) / (n × F) = (I × t × M) / (n × F)
m_real = η × m_theo
```

- **`m_theo` / `m_real` (Masse in `g`):** Theoretisch bzw. praktisch abgeschiedene Stoffmasse in Gramm.
- **`Q` (Elektrische Ladung in `C` oder `A·s`):** Geflossene Ladung in Coulomb (`1 Ah = 3.600 C`).
- **`I` (Stromstärke in `A`):** Effektiver Gleichstrom durch die Elektrolysezelle.
- **`t` (Zeit in `s`):** Dauer des Stromflusses in Sekunden.
- **`M` (Molmasse in `g/mol`):** Atom- oder Molekülmasse des abgeschiedenen Stoffes.
- **`n` (Elektronenzahl):** Übertragene Elektronen pro Ion oder Formeleinheit (z. B. `n = 1` für `Ag⁺`, `n = 2` für `Cu²⁺`, `n = 3` für `Cr³⁺`).
- **`F` (Faraday-Konstante):** Exakt `96.485,33212 C/mol` (Rechenwert: `96.485 C/mol` bzw. `26,801 Ah/mol`).
- **`η` (Stromausbeute, `0 < η ≤ 1`):** Anteil des Stroms, der tatsächlich in die gewünschte Hauptreaktion fließt.

Für Schichtdickenberechnungen auf Werkstücken mit Fläche `A` (`cm²`) und Metalldichte `ρ` (`g/cm³`) gilt anschließend `d = m_real / (ρ × A)` in Zentimetern (`1 cm = 10.000 µm`). Der Quotient `Ä_e = M / (n × F)` heißt **elektrochemisches Äquivalent** und beschreibt die abgeschiedene Masse pro Coulomb Ladung.

## Rechenbeispiel: Galvanische Verkupferung eines Stahlbauteils

Ein Stahlbauteil mit `A = 250 cm²` Oberfläche wird in einem sauren Kupfersulfat-Elektrolyten (`Cu²⁺ + 2 e⁻ → Cu`) bei konstantem Strom `I = 12,0 A` über `t = 45 min` beschichtet. Die Stromausbeute beträgt `η = 96 %` (`0,96`), die Kupferdichte `ρ = 8,96 g/cm³` und die Molmasse `M = 63,546 g/mol`.

1. **Ladung berechnen:**
   `t = 45 min × 60 s/min = 2.700 s`
   `Q = 12,0 A × 2.700 s = 32.400 C` (`9,00 Ah`)
2. **Stoffmenge übertragener Elektronen bestimmen:**
   `n(e⁻) = 32.400 C / 96.485 C/mol = 0,33580 mol`
3. **Theoretische Kupfermasse ermitteln (`n = 2`):**
   `m_theo = (32.400 × 63,546) / (2 × 96.485) = 2.058.890,4 / 192.970 = 10,6695 g ≈ 10,67 g`
4. **Reale Masse mit Stromausbeute (`η = 0,96`):**
   `m_real = 10,6695 g × 0,96 = 10,2427 g ≈ 10,24 g`
5. **Mittlere Schichtdicke berechnen:**
   `V = 10,2427 g / 8,96 g/cm³ = 1,14316 cm³`
   `d = 1,14316 cm³ / 250 cm² = 0,004573 cm = 45,7 µm`

Soll eine exakte Zielschichtdicke von `50,0 µm` erreicht werden, muss die Prozessdauer linear auf `45 min × (50,0 / 45,73) ≈ 49,2 min` verlängert werden.

## Vergleichstabelle: Elektrochemische Äquivalente ausgewählter Metalle

Die Übersicht zeigt die theoretische Abscheidung bei `I = 10,0 A` über `1,0 h` (`Q = 36.000 C = 10,0 Ah`) und `100 %` Stromausbeute:

| Metall & Ion | Elektronen `n` | Molmasse `M` | Äquivalent `Ä_e` | Masse pro `10 Ah` | Dichte `ρ` | Praxis-Stromausbeute |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Silber (`Ag⁺`)** | `1` | `107,868 g/mol` | `1,1180 mg/C` | `40,25 g` | `10,49 g/cm³` | `98–100 %` |
| **Gold (`Au⁺`, cyanidisch)** | `1` | `196,967 g/mol` | `2,0414 mg/C` | `73,49 g` | `19,32 g/cm³` | `90–99 %` |
| **Kupfer (`Cu²⁺`, sauer)** | `2` | `63,546 g/mol` | `0,3293 mg/C` | `11,86 g` | `8,96 g/cm³` | `95–99 %` |
| **Zink (`Zn²⁺`, schwach sauer)** | `2` | `65,380 g/mol` | `0,3388 mg/C` | `12,20 g` | `7,14 g/cm³` | `92–98 %` |
| **Nickel (`Ni²⁺`, Watts-Bad)** | `2` | `58,693 g/mol` | `0,3042 mg/C` | `10,95 g` | `8,91 g/cm³` | `94–97 %` |
| **Chrom (`Cr³⁺`, dreiwertig)** | `3` | `51,996 g/mol` | `0,1796 mg/C` | `6,47 g` | `7,19 g/cm³` | `20–35 %` |

Die Wertigkeitsstufe wirkt unmittelbar: Ein einwertiges cyanidisches Kupferbad (`Cu⁺`, `Ä_e = 0,6586 mg/C`) scheidet je Amperestunde exakt doppelt so viel Kupfer ab wie ein zweiwertiges `Cu²⁺`-Sulfatbad. Bei sechswertigem Chrom (`Cr(VI)`, `n = 6`) sinkt die reale Abscheidung wegen starker Wasserstoffentwicklung und nur `12–20 %` Stromausbeute noch deutlich weiter ab.

## Typische Fehlerquellen, Anwendungen und Grenzen

Über die Galvanotechnik hinaus steuern die Faradayschen Gesetze auch die **Coulometrie** in der analytischen Chemie, die **Eloxal-Schichtdickensteuerung** bei Aluminium sowie die Berechnung der theoretischen spezifischen Kapazität von Akkumulator-Aktivmaterialien (beispielsweise `3.861 mAh/g` für metallisches Lithium bei `M = 6,941 g/mol` und `n = 1`). In Labor und Fertigung resultieren Abweichungen von der Idealberechnung fast immer aus drei Ursachen:

- **Falsche Zeiteinheiten:** Minuten oder Stunden ohne Umrechnung in Sekunden in `F = 96.485 C/mol` einzusetzen erzeugt Faktorenfehler von `60` oder `3.600`. Prüfen Sie stets die Einheit `A × s = C` oder rechnen Sie direkt mit `26,801 Ah/mol`.
- **Überschreiten der Grenzstromdichte:** Bei zu hoher Stromdichte verarmt die kathodische Grenzschicht an Metallionen; es entsteht zunehmend Wasserstoff (`2 H⁺ + 2 e⁻ → H₂`), die Stromausbeute fällt ab und die Schicht wird porös.
- **Inhomogene Stromdichteverteilung:** Die Gleichung bestimmt die mittlere Masse über die gesamte Oberfläche. An Kanten scheidet sich lokal mehr, in Bohrungen weniger Metall ab.

Zudem macht das Faradaysche Gesetz keine Aussage über die erforderliche Zellspannung oder den Stromverbrauch in `kWh/kg` – diese energetischen Größen behandelt unser Ratgeber zur Elektrolyse. Bei sicherheitsrelevanten Schichten nach DIN EN ISO sollten berechnete Schichtdicken stets durch Röntgenfluoreszenz- oder Wirbelstrommessung überprüft werden.
