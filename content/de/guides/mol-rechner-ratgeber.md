---
title: "Das Mol: Das Dutzend der Chemie"
description: "Verstehen Sie die Avogadro-Konstante, die SI-Definition der Stoffmenge, die Umrechnung zwischen Gramm und Mol sowie unseren Mol-Rechner."
category: "Math & Science"
relatedCalculator: "mole-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wie ist das Mol seit der SI-Neudefinition von 2019 exakt festgelegt?"
    answer: "Seit dem 20. Mai 2019 definiert das Internationale Einheitensystem (SI) das Mol über einen exakt festgelegten Zahlenwert der Avogadro-Konstante: N_A = 6,02214076 × 10²³ mol⁻¹. Damit ist die Stoffmenge eine reine Zähleinheit für elementare Teilchen und hängt nicht mehr von der Masse eines Kohlenstoff-12-Atoms ab."
  - question: "Wie rechnet man eine gegebene Masse in Gramm in die Stoffmenge (Mol) um?"
    answer: "Sie teilen die gewogene Masse m in Gramm durch die molare Masse M der Substanz in Gramm pro Mol: n = m / M. Bei 36,03 g Wasser (M = 18,015 g/mol) ergibt sich beispielsweise eine Stoffmenge von exakt 2,00 mol."
  - question: "Worin unterscheiden sich Stoffmenge, Masse und Teilchenzahl?"
    answer: "Die Masse (in g oder kg) beschreibt die Trägheit bzw. das Gewicht einer Stoffportion, während die Teilchenzahl N die absolute Anzahl einzelner Atome, Moleküle oder Ionen angibt. Die Stoffmenge n (in mol) fungiert als makroskopische Zählgröße dazwischen, indem sie 6,02214076 × 10²³ Teilchen zu einer handhabbaren Einheit bündelt."
  - question: "Welches Volumen nimmt ein Mol eines idealen Gases ein?"
    answer: "Unter physikalischen Normbedingungen nach DIN 1343 (Temperatur T₀ = 273,15 K bzw. 0 °C und Druck p₀ = 101,325 kPa) beträgt das molare Normvolumen eines idealen Gases 22,414 L/mol. Bei der IUPAC-Standardbedingung (0 °C und 100 kPa) liegt es bei 22,711 L/mol, bei Raumtemperatur (25 °C und 101,325 kPa) bei 24,465 L/mol."
  - question: "Gilt die Einheit Mol ausschließlich für Atome und Moleküle?"
    answer: "Nein. Das Mol lässt sich auf jede eindeutig spezifizierte Art elementarer Entitäten anwenden – dazu gehören Atome, Moleküle, Ionen, Elektronen, Photonen oder ganze Formelumsätze in einer Reaktionsgleichung. Entscheidend ist lediglich, dass die Bezugseinheit eindeutig benannt wird, etwa ein Mol Sauerstoffatome (O) im Unterschied zu einem Mol Sauerstoffmoleküle (O₂)."
---

In der Chemie und Verfahrenstechnik ist die **Stoffmenge** mit der SI-Basiseinheit **Mol** (`mol`) die zentrale Brückengröße zwischen der submikroskopischen Welt einzelner Atome und der makroskopischen Laborwaage. Ein einzelnes Mol enthält definitionsgemäß exakt **6,02214076 × 10²³** festgelegte Einzelteilchen – eine Zahl, die als **Avogadro-Konstante** (`N_A`) bezeichnet wird. Da chemische Reaktionen stets in ganzzahligen Teilchenverhältnissen ablaufen, ermöglicht das Mol die direkte Übersetzung von Reaktionsgleichungen in abwiegbare Gramm- oder Kilogrammmengen.

Für eine schnelle und fehlerfreie Umrechnung im Laboralltag, im Studium oder in der Qualitätskontrolle genügt die Kombination aus gewogener Masse und der jeweiligen molaren Masse des Stoffes. Mit unserem [Mol-Rechner](/de/rechner/mol-rechner) wandeln Sie Massen, Stoffmengen und Teilchenzahlen unmittelbar und rundungsgenau ineinander um.

## Grundlagen: Die Avogadro-Konstante und das SI-System

Historisch leitete sich das Mol über das Kohlenstoffisotop ¹²C ab: Zwölf Gramm reiner Kohlenstoff-12 entsprachen per Definition einem Mol Atome. Mit der grundlegenden Reform des Internationalen Einheitensystems (SI) am 20. Mai 2019 löste das Bureau International des Poids et Mesures (BIPM) diese Massenkopplung auf. Seither ist die Avogadro-Konstante eine exakt festgeschriebene Naturkonstante ohne Messunsicherheit:

```
N_A = 6,02214076 × 10²³ mol⁻¹
```

Daraus ergeben sich vier fundamentale Umrechnungsgleichungen, die den Kern jeder stöchiometrischen Berechnung bilden:

```
1. Stoffmenge aus Masse:         n = m / M
2. Teilchenzahl aus Stoffmenge:  N = n × N_A
3. Stoffmenge aus Gasvolumen:    n = V / V_m
4. Stoffmenge in Lösungen:       n = c × V_Lösung
```

Die einzelnen Formelzeichen sind im deutschen Sprachraum gemäß DIN 1310 und DIN 32625 genormt:

- **`n` (Stoffmenge in `mol`)**: Anzahl der Molpakete an Teilchen (kleinere Einheiten: `1 mmol = 10⁻³ mol`, `1 µmol = 10⁻⁶ mol`).
- **`m` (Masse in `g` oder `kg`)**: Auf der Analysenwaage bestimmte Masse der Reinsubstanz.
- **`M` (Molare Masse in `g/mol`)**: Masse von genau einem Mol eines Stoffs aus den Standardatomgewichten des Periodensystems.
- **`N` (Teilchenzahl, dimensionslos)**: Absolute Anzahl der gezählten Atome, Moleküle, Ionen oder Formeleinheiten.
- **`V_m` (Molares Volumen in `L/mol`)**: Bei idealen Gasen unter Normbedingungen nach DIN 1343 (`0 °C`, `101,325 kPa`) konstant `22,414 L/mol`.
- **`c` (Stoffmengenkonzentration / Molarität in `mol/L`)**: Gelöste Stoffmenge pro Liter Lösung.

## Schritt-für-Schritt-Beispiel: Von der Masse zur Teilchenzahl

Angenommen, Sie wiegen für eine biochemische Puffer- oder Nährlösung **50,00 g** wasserfreie **D-Glukose** (`C₆H₁₂O₆`) auf einer Laborwaage ab und möchten wissen, welche Stoffmenge und wie viele einzelne Glukosemoleküle sowie Kohlenstoffatome darin enthalten sind.

### Schritt 1: Molare Masse der Verbindung ermitteln

Addieren Sie die Standardatomgewichte aller beteiligten Elemente entsprechend der Summenformel:

```
M(C₆H₁₂O₆) = 6 × 12,011 g/mol + 12 × 1,008 g/mol + 6 × 15,999 g/mol
M(C₆H₁₂O₆) = 72,066 g/mol + 12,096 g/mol + 95,994 g/mol
M(C₆H₁₂O₆) = 180,156 g/mol
```

### Schritt 2: Stoffmenge `n` berechnen

Teilen Sie die eingewogene Masse `m = 50,00 g` durch die molare Masse `M = 180,156 g/mol`:

```
n = 50,00 g / 180,156 g/mol
n = 0,277537 mol ≈ 0,2775 mol (277,5 mmol)
```

Da die Einwaage auf vier signifikante Stellen genau bestimmt wurde, geben Sie das Endergebnis ebenfalls mit vier signifikanten Stellen an, rechnen für Zwischenschritte jedoch mit voller Genauigkeit weiter.

### Schritt 3: Teilchenzahl `N` bestimmen

Multiplizieren Sie die ungerundete Stoffmenge mit der Avogadro-Konstante:

```
N(C₆H₁₂O₆) = 0,277537 mol × 6,02214076 × 10²³ mol⁻¹
N(C₆H₁₂O₆) = 1,6714 × 10²³ Moleküle
```

Da jedes Glukosemolekül genau sechs Kohlenstoffatome trägt, enthält die Probe `6 × 0,277537 mol = 1,6652 mol` Kohlenstoffatome, was `1,0028 × 10²⁴` einzelnen C-Atomen entspricht.

## Vergleichstabelle: Stoffmengen und Massen typischer Laborstoffe

Die folgende Übersicht verdeutlicht, warum identische Stoffmengen völlig unterschiedliche Massen auf der Waage ergeben – und umgekehrt identische Einwaagen stark abweichende Teilchenzahlen liefern.

| Substanz | Summenformel | Molare Masse `M` (g/mol) | Masse für `1,00 mol` | Masse für `0,25 mol` | Teilchenzahl bei `0,25 mol` | Besonderheit in der Praxis |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Wasserstoff (Gas)** | `H₂` | `2,016` | `2,016 g` | `0,504 g` | `1,506 × 10²³` | Nimmt bei `0,25 mol` (DIN-Norm) `5,60 L` Volumen ein |
| **Wasser (flüssig)** | `H₂O` | `18,015` | `18,015 g` | `4,504 g` | `1,506 × 10²³` | Bei `4 °C` entspricht `18,015 g` exakt `18,015 mL` |
| **Kohlenstoffdioxid** | `CO₂` | `44,009` | `44,009 g` | `11,002 g` | `1,506 × 10²³` | Wichtiges Referenzgas in Umwelt- und Prozessanalytik |
| **Eisen (Element)** | `Fe` | `55,845` | `55,845 g` | `13,961 g` | `1,506 × 10²³` | Einatomiger Feststoff; Bezug auf einzelne Fe-Atome |
| **Natriumchlorid** | `NaCl` | `58,443` | `58,443 g` | `14,611 g` | `1,506 × 10²³` | Ionengitter: Bezug auf `NaCl`-Formeleinheiten |
| **D-Glukose** | `C₆H₁₂O₆` | `180,156` | `180,156 g` | `45,039 g` | `1,506 × 10²³` | Zentrale Bezugssubstanz in Biochemie und Klinischer Chemie |

## Praxis, typische Fehlerquellen und Laborstandards

In der industriellen Synthese, Analytik und Ausbildung entscheidet die korrekte Stoffmengenbilanz über Ausbeute, Reaktionssicherheit und Messrichtigkeit. Vier Fehlerquellen treten besonders häufig auf:

1. **Verwechslung von Atom- und Molekülspezies:** Bei zweiatomigen Elementgasen (`H₂`, `N₂`, `O₂`, `Cl₂`) ist die molare Masse des Moleküls doppelt so groß wie die des Einzelatoms. Eine unklare Bezugsspezies führt unmittelbar zu 50 % oder 100 % Einwaagefehler.
2. **Unbeachtetes Kristallwasser bei Hydraten:** Viele Salze enthalten gebundenes Kristallwasser, etwa `CuSO₄ · 5 H₂O` oder `CaCl₂ · 2 H₂O`. Dieses Wasser wiegt mit und muss zwingend in `M` einbezogen werden, bevor `n = m / M` berechnet wird.
3. **Abweichende Gasnormbedingungen:** Die DIN 1343 definiert den Normzustand bei `0 °C` und `101,325 kPa` (`V_m = 22,414 L/mol`), während die IUPAC seit 1982 für STP `100,000 kPa` (`22,711 L/mol`) nutzt. Prüfen Sie bei Gasberechnungen stets Bezugstemperatur und Druck.
4. **Bestimmung des limitierenden Reaktanden:** Bei Mehrkomponentenreaktionen begrenzt die kleinste normierte Stoffmenge (`n_i / |ν_i|`, Stoffmenge durch stöchiometrischen Koeffizienten) den Umsatz. Erst die Umrechnung aller Edukte in Mol zeigt, welcher Reaktionspartner zuerst verbraucht ist.
