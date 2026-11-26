---
title: "Henderson-Hasselbalch-Gleichung: Pufferlösungen berechnen"
description: "Erfahren Sie, wie Sie mit der Henderson-Hasselbalch-Gleichung den pH-Wert von Pufferlösungen, das Konzentrationsverhältnis von Base zu Säure und die Grenzen des Modells exakt berechnen."
category: "Math & Science"
relatedCalculator: "henderson-hasselbalch-equation-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wann entspricht der pH-Wert einer Pufferlösung genau dem pKa-Wert?"
    answer: "Sobald die molare Konzentration der schwachen Säure [HA] und die ihrer korrespondierenden Base [A⁻] exakt gleich groß sind, beträgt der Quotient [A⁻] / [HA] genau 1. Da der dekadische Logarithmus von 1 null ergibt, verkürzt sich die Henderson-Hasselbalch-Gleichung zu pH = pKa. In diesem Punkt besitzt das Puffersystem zugleich seine maximale Pufferkapazität gegenüber Zugaben sowohl von Säuren als auch von Basen."
  - question: "In welchem pH-Bereich ist die Henderson-Hasselbalch-Gleichung zuverlässig anwendbar?"
    answer: "In der Praxis liefert die Gleichung innerhalb eines Bereichs von pKa − 1 bis pKa + 1 verlässliche Ergebnisse, was einem Konzentrationsverhältnis zwischen 1 : 10 und 10 : 1 entspricht. Voraussetzung ist zudem, dass die Gesamtpufferkonzentration deutlich größer ist als die Konzentration der freien H₃O⁺- oder OH⁻-Ionen (in der Regel mindestens 0,01 mol/L bei einem pH-Wert zwischen 4 und 10)."
  - question: "Wie wirkt sich das Verdünnen einer Pufferlösung auf den pH-Wert aus?"
    answer: "In der idealisierten Näherung verändert reines Verdünnen mit entionisiertem Wasser das Verhältnis [A⁻] / [HA] nicht, sodass der pH-Wert theoretisch konstant bleibt. Real verschieben sich durch die sinkende Ionenstärke jedoch die Aktivitätskoeffizienten gemäß der Debye-Hückel-Theorie leicht, was zu geringfügigen pH-Abweichungen führt. Gleichzeitig sinkt die Pufferkapazität proportional zur Verdünnung."
  - question: "Warum weicht der gemessene pH-Wert manchmal vom berechneten Wert ab?"
    answer: "Die Standardform der Gleichung rechnet mit molaren Konzentrationen statt mit thermodynamischen Aktivitäten. Bei höheren Salzkonzentrationen verringern interionische Wechselwirkungen die effektive Aktivität der Ionen. Darüber hinaus ist der pKa-Wert temperaturabhängig: Bei Puffern wie Tris ändert sich der pKa-Wert pro Kelvin um rund −0,028 Einheiten."
  - question: "Lässt sich die Henderson-Hasselbalch-Gleichung auch für Basenpuffer mit pKb nutzen?"
    answer: "Ja. Entweder rechnen Sie direkt über den pOH-Wert mit der Formel pOH = pKb + log₁₀([BH⁺] / [B]) und bestimmen anschließend den pH-Wert über pH = pKw − pOH (bei 25 °C gilt pKw = 14,00). Alternativ wandeln Sie den pKb-Wert in den pKa-Wert der korrespondierenden Säure BH⁺ um (pKa = 14,00 − pKb) und verwenden die gewohnte pH-Gleichung mit dem Verhältnis [B] / [BH⁺]."
---

Die **Henderson-Hasselbalch-Gleichung** beschreibt den mathematischen Zusammenhang zwischen dem **pH-Wert** einer Pufferlösung, dem **pKa-Wert** der eingesetzten schwachen Säure und dem Konzentrationsverhältnis aus korrespondierender Base und schwacher Säure. Sie bildet das Fundament der quantitativen Säure-Base-Analytik: Änderungen des Mischungsverhältnisses lassen sich über eine einfache logarithmische Beziehung unmittelbar in pH-Verschiebungen übersetzen, und umgekehrt lässt sich für jeden Ziel-pH-Wert das exakte Mischungsverhältnis berechnen.

Während bereits ein Tropfen Salzsäure den pH-Wert von reinem Wasser stark absenkt, halten Puffersysteme wie der Hydrogencarbonat-Puffer im Blut (pH 7,35 bis 7,45) oder Laborpuffer das Milieu stabil. Für fehlerfreie Berechnungen von Ziel-pH-Werten, pKa-Eingaben und Konzentrationsverhältnissen nutzen Sie unseren [Henderson-Hasselbalch-Rechner](/de/rechner/henderson-hasselbalch-gleichung-rechner).

## Herleitung, Formel und exakte Parameterdefinitionen

Ausgangspunkt der Henderson-Hasselbalch-Gleichung ist das Massenwirkungsgesetz für die Protolyse einer schwachen einprotonigen Säure `HA` in Wasser (`HA + H₂O ⇌ H₃O⁺ + A⁻`). Die zugehörige Säuredissoziationskonstante `Ka` lautet `Ka = ([H₃O⁺] · [A⁻]) / [HA]`. Löst man diese Gleichung nach der Oxoniumionen-Konzentration `[H₃O⁺]` auf und wendet auf beiden Seiten den negativen dekadischen Logarithmus (`−log₁₀`) an, erhält man die klassische Arbeitsform der Gleichung:

```text
pH  = pKa + log₁₀([A⁻] / [HA])

Für Basenpuffer (System B / BH⁺) analog:
pOH = pKb + log₁₀([BH⁺] / [B])
pH  = pKw − pOH   (bei 25 °C gilt pKw = 14,00)
```

In diesen Ausdrücken stehen sämtliche eckigen Klammern für **Gleichgewichtskonzentrationen in mol/L** (Molarität):

- **pH:** Negativer dekadischer Logarithmus der Wasserstoff- bzw. Oxoniumionen-Aktivität (`pH = −log₁₀(a(H₃O⁺))`, in verdünnten Lösungen näherungsweise `−log₁₀([H₃O⁺])`).
- **pKa:** Negativer dekadischer Logarithmus der Säuredissoziationskonstante `Ka` (`pKa = −log₁₀(Ka)`). Er ist eine temperaturabhängige Stoffkonstante der schwachen Säure.
- **[A⁻]:** Molare Gleichgewichtskonzentration der korrespondierenden (konjugierten) Base in `mol/L`, meist in Form eines gut löslichen Salzes wie Natriumacetat eingebracht.
- **[HA]:** Molare Gleichgewichtskonzentration der undissoziierten schwachen Säure in `mol/L`. Bei moderaten Pufferkonzentrationen (`≥ 0,05 mol/L`) entspricht sie in guter Näherung der eingewogenen Anfangskonzentration.

Ein zentrales Merkmal der Gleichung ist ihre Unabhängigkeit vom absoluten Gesamtvolumen, solange das Verhältnis `[A⁻] / [HA]` gewahrt bleibt. Besteht eine Lösung beispielsweise aus gleichen molaren Teilen Säure und konjugierter Base, ergibt sich `log₁₀(1) = 0` und somit `pH = pKa`.

## Schritt-für-Schritt-Rechenbeispiel: Acetatpuffer unter Säurebelastung

Um die Rechenlogik und die reale Schutzwirkung eines Puffers nachzuvollziehen, betrachten wir die Herstellung und Belastung von **1,00 Liter** eines Acetatpuffers bei **25 °C**. Ausgangsstoffe sind **0,25 mol/L Essigsäure** (`CH₃COOH`, `pKa = 4,76`) und **0,40 mol/L Natriumacetat** (`CH₃COONa`, vollständige Dissoziation liefert `[A⁻] = 0,40 mol/L`).

1. **Konzentrationsverhältnis bestimmen:** Teilen Sie die Basenkonzentration durch die Säurekonzentration: `[A⁻] / [HA] = 0,40 mol/L / 0,25 mol/L = 1,60`.
2. **Logarithmus berechnen:** Der dekadische Logarithmus des Verhältnisses beträgt `log₁₀(1,60) ≈ +0,2041`. Da mehr Base als Säure vorliegt, ist der Term positiv und der pH-Wert liegt über dem `pKa`-Wert.
3. **Ausgangs-pH ermitteln:** Addieren Sie den Logarithmus zum `pKa`: `pH = 4,76 + 0,2041 = 4,9641`, gerundet **4,96**.
4. **Säurezugabe simulieren:** Nun werden diesem Puffer **0,05 mol** starke Salzsäure (`HCl`) ohne wesentliche Volumenänderung zugesetzt. Die `0,05 mol` Oxoniumionen reagieren nahezu vollständig mit den Acetat-Ionen zu Essigsäure (`A⁻ + H₃O⁺ → HA + H₂O`). Dadurch sinkt `[A⁻]` auf `0,40 − 0,05 = 0,35 mol/L`, während `[HA]` auf `0,25 + 0,05 = 0,30 mol/L` steigt.
5. **Neuen pH-Wert berechnen:** Das neue Verhältnis lautet `0,35 / 0,30 ≈ 1,1667`, dessen Logarithmus `log₁₀(1,1667) ≈ +0,0669` beträgt. Der resultierende pH-Wert sinkt lediglich auf `4,76 + 0,0669 = 4,8269`, also **4,83** (ein Rückgang um nur 0,13 pH-Einheiten).

Zum Vergleich: Dieselbe Menge von `0,05 mol` Salzsäure in 1,00 Liter reinem Wasser (pH 7,00) führt zu `[H₃O⁺] = 0,05 mol/L` und einem pH-Absturz auf **1,30** — eine Veränderung um 5,70 pH-Einheiten.

## Vergleichstabelle: Konzentrationsverhältnis und Pufferwirkung

Die folgende Übersicht zeigt anhand des Essigsäure-Acetat-Systems (`pKa = 4,76` bei 25 °C), wie das Verhältnis `[A⁻] / [HA]` den pH-Wert verschiebt und wann die Grenze der praktischen Pufferwirkung erreicht ist.

| Verhältnis [A⁻] : [HA] | Quotient [A⁻] / [HA] | log₁₀([A⁻] / [HA]) | Resultierender pH (pKa = 4,76) | Einordnung der Pufferwirkung |
| :--- | :--- | :--- | :--- | :--- |
| 1 : 10 | 0,10 | −1,00 | 3,76 | Untere Puffergrenze; geringe Reserve gegen weitere Säure |
| 1 : 3 | 0,33 | −0,48 | 4,28 | Saurer Pufferbereich; noch belastbar gegen Basen |
| 1 : 1 | 1,00 | 0,00 | 4,76 | Maximale Pufferkapazität (`pH = pKa`); symmetrischer Schutz |
| 2 : 1 | 2,00 | +0,30 | 5,06 | Guter Arbeitsbereich mit höherer Säure-Pufferreserve |
| 5 : 1 | 5,00 | +0,70 | 5,46 | Asymmetrischer Puffer; Basen-Reserve deutlich reduziert |
| 10 : 1 | 10,00 | +1,00 | 5,76 | Obere Puffergrenze; geringe Reserve gegen weitere Base |

## Anwendungsgebiete, typische Fehlerquellen und Gültigkeitsgrenzen

In der **klinischen Medizin und Physiologie** dient die Henderson-Hasselbalch-Gleichung der Auswertung von Blutgasanalysen. Das zentrale Puffersystem des Blutes ist das Kohlensäure-Hydrogencarbonat-System (`H₂CO₃ / HCO₃⁻`). Bei 37 °C beträgt der effektive `pKa`-Wert inklusive des physikalisch gelösten `CO₂` rund **6,10**. Lunge (`pCO₂`) und Nieren (`[HCO₃⁻]`) halten das Verhältnis bei etwa 20 : 1, woraus ein stabiler arterieller pH-Wert von `6,10 + log₁₀(20) ≈ 7,40` resultiert. Weitere Einsatzfelder sind die Einstellung mobiler Phasen in der HPLC-Chromatographie, Enzymassays sowie die pharmazeutische Formulierungsentwicklung zur Sicherung der Wirkstoffstabilität.

Vermeiden Sie in der Praxis vier typische Fehlerquellen:

1. **Vertauschen von Zähler und Nenner:** Wird fälschlicherweise `[HA] / [A⁻]` statt `[A⁻] / [HA]` eingesetzt, kehrt sich das Vorzeichen des Logarithmus um.
2. **Vernachlässigung der Temperaturabhängigkeit:** Tabellierte `pKa`-Werte gelten fast immer für **25 °C**. Bei **Tris** (`ΔpKa / ΔT ≈ −0,028 °C⁻¹`) sinkt ein bei 20 °C auf pH 7,40 eingestellter Puffer bei 37 °C auf rund pH 6,92 ab.
3. **Verwechslung von Konzentration und Aktivität:** Bei hohen Salzkonzentrationen (`> 0,2 mol/L`) sinken die Aktivitätskoeffizienten. Da ein pH-Meter Aktivitäten misst, weicht der Messwert oft um 0,05 bis 0,20 pH-Einheiten ab.
4. **Anwendung außerhalb der Verdünnungsgrenzen:** Bei starker Verdünnung (`c < 10⁻⁴ mol/L`) oder extremen `pKa`-Werten (`< 2` oder `> 12`) darf die Autoprotolyse des Wassers (`10⁻⁷ mol/L`) nicht vernachlässigt werden.
