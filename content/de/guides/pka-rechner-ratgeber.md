---
title: "pKa-Rechner: Säurestärke berechnen"
description: "Verstehen Sie Säurekonstante Ka (Ks) und pKa-Wert, berechnen Sie Dissoziationsgrade und nutzen Sie die Henderson-Hasselbalch-Gleichung für Puffersysteme."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "pka-calculator"
relatedType: "calculator"
faqs:
  - question: "Was ist der Unterschied zwischen pH-Wert und pKa-Wert?"
    answer: "Der pKa-Wert ist eine stoffspezifische Konstante (bei gegebener Temperatur), die angibt, wie bereitwillig eine Säure ein Proton abgibt. Der pH-Wert hingegen ist eine Eigenschaft der jeweiligen Lösung und hängt sowohl von der Säurestärke als auch von der Verdünnung und weiteren gelösten Stoffen ab."
  - question: "Warum bedeutet ein niedriger oder negativer pKa-Wert eine besonders starke Säure?"
    answer: "Da der pKa-Wert als negativer dekadischer Logarithmus von Ka definiert ist (pKa = −log₁₀(Ka)), kehrt das Minuszeichen die Größenordnung um. Eine sehr große Dissoziationskonstante Ka (fast vollständige Protolyse) ergibt somit einen sehr kleinen oder negativen pKa-Wert."
  - question: "Was ist der Unterschied zwischen pKa und pKs im deutschsprachigen Raum?"
    answer: "Beide Bezeichnungen beschreiben exakt dieselbe physikalisch-chemische Größe. Im Deutschen steht das tiefgestellte ‚s‘ für Säurekonstante (Ks / pKs), während in der internationalen Literatur, Pharmazie und Biochemie überwiegend das ‚a‘ für acid (Ka / pKa) verwendet wird."
  - question: "Welche praktische Bedeutung hat der Punkt pH = pKa in einer Pufferlösung?"
    answer: "Gilt pH = pKa, liegen die protonierte Säure (HA) und ihre konjugierte Base (A⁻) gemäß Henderson-Hasselbalch-Gleichung exakt im Verhältnis 1:1 vor. Genau an diesem Halbäquivalenzpunkt erreicht ein Puffersystem seine maximale Pufferkapazität gegen zugesetzte Säuren und Basen."
  - question: "Was versteht man unter dem nivellierenden Effekt des Wassers bei starken Säuren?"
    answer: "Alle Säuren, die stärker sind als das Hydroniumion (pKa < −1,74), übertragen in wässriger Lösung ihre Protonen nahezu vollständig auf Wassermoleküle. Dadurch zeigen etwa Salzsäure (pKa −6,3) und Perchlorsäure (pKa −10) in Wasser dieselbe effektive Säurestärke — ihre Unterschiede lassen sich erst in nicht-wässrigen Lösungsmitteln wie Eisessig messen."
---

Während der pH-Wert angibt, wie sauer eine konkrete Lösung ist, misst der **pKa-Wert** (im Deutschen auch **pKs-Wert**, Säureexponent) die intrinsische Stärke eines Säuremoleküls selbst. Er leitet sich über den negativen dekadischen Logarithmus aus der thermodynamischen Säuredissoziationskonstante **`Ka`** (`Ks`) ab. Je kleiner — oder sogar negativ — der pKa-Wert ausfällt, desto leichter spaltet die Säure ein Proton (`H⁺`) ab und desto stärker ist sie.

Da `Ka`-Werte in der Chemie über mehr als zwanzig Zehnerpotenzen variieren, macht die logarithmische pKa-Skala den Vergleich von Mineralsäuren, organischen Carbonsäuren und biochemischen Puffern übersichtlich. Mit unserem [pKa-Rechner](/de/rechner/pka-wert-rechner) wandeln Sie `Ka`-Konstanten nahtlos in pKa-Werte um, bestimmen korrespondierende `pKb`-Werte und vergleichen Säurestärken direkt miteinander.

## Gleichgewichtsmodell: Von der Säurekonstante Ka zum pKa-Wert

Reagiert eine schwache Säure `HA` in Wasser gemäß dem Protolysegleichgewicht `HA + H₂O ⇌ H₃O⁺ + A⁻`, beschreibt das Massenwirkungsgesetz die zugehörige Gleichgewichtskonstante `Ka` und den daraus abgeleiteten pKa-Wert:

```text
Ka = ([H₃O⁺] × [A⁻]) / [HA]   [Einheit: mol/L]
pKa = −log₁₀(Ka)
Ka = 10^(−pKa)
pKa + pKb = pKw = 14,00   (für konjugierte Paare bei 25 °C)
```

Die zentralen Größen dieser Beziehungen bedeuten:

- **`[HA]` (Konzentration der undissoziierten Säure):** Gleichgewichtskonzentration der noch protonierten Säuremoleküle in `mol/L`.
- **`[A⁻]` (Konzentration der konjugierten Base):** Gleichgewichtskonzentration des entstandenen Säurerest-Anions in `mol/L`.
- **`Ka` (Säuredissoziationskonstante):** Maß für die Lage des Gleichgewichts; Werte deutlich über `1` kennzeichnen starke Säuren, kleine Werte (`10⁻⁴` bis `10⁻¹⁰`) schwache bis sehr schwache Säuren.
- **`pKb` (Basenexponent des Partners):** Da `pKa + pKb = 14,00` gilt, bildet eine starke Säure stets eine extrem schwache konjugierte Base — und umgekehrt.

### Die Henderson-Hasselbalch-Gleichung für Puffersysteme

Logarithmiert man das Massenwirkungsgesetz und löst nach dem pH-Wert auf, erhält man die fundamentale **Henderson-Hasselbalch-Gleichung**:

```text
pH = pKa + log₁₀([A⁻] / [HA])
```

Diese Gleichung ist das wichtigste Werkzeug für die Herstellung von Pufferlösungen. Liegen Säure und konjugierte Base im Molverhältnis `1 : 1` vor, wird `log₁₀(1) = 0` und es gilt exakt **`pH = pKa`**. Eine wirksame Pufferwirkung besteht typischerweise im Bereich **`pKa ± 1`** (Mischungsverhältnis `1 : 10` bis `10 : 1`).

## Durchgerechnetes Beispiel: Essigsäure, Dissoziationsgrad und Puffer

Am Beispiel von Essigsäure (`CH₃COOH`) bei 25 °C lässt sich zeigen, wie `Ka`, `pKa`, Dissoziationsgrad und Puffer-pH zusammenhängen.

**Schritt 1 — Berechnung des pKa-Werts:** Für Essigsäure beträgt `Ka = 1,75 × 10⁻⁵ mol/L`.

```text
pKa = −log₁₀(1,75 × 10⁻⁵) = 5 − log₁₀(1,75) = 5 − 0,2430 = 4,757 ≈ 4,76
```

**Schritt 2 — Dissoziationsgrad `α` einer `0,10 mol/L` Essigsäure:** Nach dem Ostwald’schen Verdünnungsgesetz gilt für schwache Säuren mit geringer Dissoziation (`α ≪ 1`) näherungsweise:

```text
α ≈ √(Ka / c₀) = √(1,75 × 10⁻⁵ / 0,10) = √(1,75 × 10⁻⁴) = 0,01323 (entspricht 1,32 %)
```

Nur rund **1,32 %** der Essigsäuremoleküle geben tatsächlich ein Proton ab. Daraus folgt `[H₃O⁺] = c₀ · α = 0,10 × 0,01323 = 1,323 × 10⁻³ mol/L` und somit `pH = −log₁₀(1,323 × 10⁻³) = 2,88` (zum Vergleich: `0,10 mol/L` Salzsäure hätte `pH 1,00`).

**Schritt 3 — Acetatpuffer berechnen:** Mischt man eine Pufferlösung mit `0,15 mol/L` Essigsäure (`[HA]`) und `0,30 mol/L` Natriumacetat (`[A⁻]`), ergibt die Henderson-Hasselbalch-Gleichung:

```text
pH = 4,76 + log₁₀(0,30 / 0,15) = 4,76 + log₁₀(2,0) = 4,76 + 0,301 = 5,06
```

## pKa-Referenzwerte wichtiger Säuren und mehrprotoniger Systeme

Mehrprotonige Säuren geben ihre Protonen stufenweise ab und besitzen für jeden Deprotonierungsschritt einen eigenen pKa-Wert (`pKa₁ < pKa₂ < pKa₃`):

| Säure (Formel) | pKa-Wert (25 °C) | Ka-Wert (mol/L) | Säurestärke | Konjugierte Base / Besonderheit |
| :--- | :--- | :--- | :--- | :--- |
| Salzsäure (`HCl`) | −6,3 | ~2,0 × 10⁶ | Sehr stark | `Cl⁻` (vollständige Protolyse in Wasser) |
| Schwefelsäure (`H₂SO₄`, 1. Stufe) | −3,0 | ~1,0 × 10³ | Sehr stark | `HSO₄⁻` (2. Stufe mittelstark mit `pKa₂ = 1,99`) |
| Phosphorsäure (`H₃PO₄`, 1. Stufe) | 2,16 | 6,9 × 10⁻³ | Mittelstark | `H₂PO₄⁻` (`pKa₂ = 7,21`, `pKa₃ = 12,32`) |
| Ameisensäure (`HCOOH`) | 3,75 | 1,78 × 10⁻⁴ | Schwach | `HCOO⁻` (elektronenziehendes H verstärkt Acidität) |
| Essigsäure (`CH₃COOH`) | 4,76 | 1,75 × 10⁻⁵ | Schwach | `CH₃COO⁻` (Standard für Acetatpuffer) |
| Kohlensäure (`H₂CO₃*`, 1. Stufe) | 6,35 | 4,47 × 10⁻⁷ | Sehr schwach | `HCO₃⁻` (Blutpuffer; `pKa₂ = 10,33`) |
| Ammoniumion (`NH₄⁺`) | 9,25 | 5,62 × 10⁻¹⁰ | Sehr schwach | `NH₃` (Ammoniak mit `pKb = 4,75`) |

## Bedeutung in Pharmazie, Biochemie und typische Fehlerquellen

In der **Pharmazie und Pharmakokinetik** entscheidet der pKa-Wert eines Arzneistoffs direkt über dessen Resorption im Körper. Schwach saure Wirkstoffe wie Acetylsalicylsäure (`pKa ≈ 3,5`) liegen im sauren Magen (`pH ~1,5`) überwiegend ungeladen (`HA`) vor und können Zellmembranen leicht passieren, während sie im schwach alkalischen Dünndarm (`pH ~6,8–7,4`) deprotoniert und damit besser wasserlöslich sind. In der **Biochemie** steuern die pKa-Werte von Aminosäure-Seitenketten (etwa Histidin mit `pKa ≈ 6,0`) die Enzymkatalyse und die Faltung von Proteinen. In der **HPLC-Analytik** bestimmt der Vergleich zwischen mobilem Phasen-pH und Analyt-pKa die Retentionszeit und Peakform.

Vermeiden Sie bei Berechnungen folgende vier Fallstricke:

1. **Verwechslung von pH und pKa:** Eine verdünnte Essigsäurelösung kann einen höheren pH-Wert aufweisen als eine stark konzentrierte, doch ihr `pKa` bleibt bei `4,76` konstant.
2. **Überdehnung der Henderson-Hasselbalch-Näherung:** Außerhalb des Bereichs `pKa ± 1,5` oder bei sehr stark verdünnten Puffern (`< 0,005 mol/L`) verliert die einfache Verhältnisformel an Genauigkeit; hier muss die vollständige Ladungsbilanz gelöst werden.
3. **Vernachlässigung des Lösungsmittels:** Literaturwerte für `pKa` beziehen sich meist auf reines Wasser bei 25 °C. In organischen Lösungsmitteln wie Ethanol oder DMSO verschieben sich pKa-Werte teils um mehrere Einheiten.
4. **Fehlinterpretation von Kohlensäure (`H₂CO₃*`):** Der gängige Literaturwert `pKa₁ = 6,35` ist ein scheinbarer Wert für gelöstes `CO₂(aq) + H₂CO₃` zusammen; echte molekuare Kohlensäure allein wäre mit `pKa ≈ 3,6` deutlich stärker.
