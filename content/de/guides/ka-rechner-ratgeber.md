---
title: "Ka-Rechner: Die Säuredissoziationskonstante"
description: "Verstehen Sie die Säuredissoziationskonstante Ka und den pKa-Wert, berechnen Sie Gleichgewichtskonzentrationen sowie den pH-Wert schwacher Säuren und nutzen Sie unseren Ka-Rechner."
category: "Math & Science"
relatedCalculator: "ka-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen dem Ka-Wert und dem pKa-Wert?"
    answer: "Beide Größen messen exakt dieselbe Eigenschaft — die Dissoziationsneigung einer Säure — auf zwei verschiedenen Skalen. Während Ka eine direkte Gleichgewichtskonstante ist (oft mit sehr kleinen Zehnerpotenzen wie 1,8 × 10⁻⁵), überführt pKa = −log₁₀(Ka) diese Zahlen in eine handliche logarithmische Skala. Je größer Ka ist, desto kleiner ist pKa und desto stärker ist die Säure."
  - question: "Warum taucht die Konzentration des Wassers [H₂O] nicht in der Ka-Formel auf?"
    answer: "In verdünnten wässrigen Lösungen beträgt die Konzentration des Lösungsmittels Wasser rund 55,5 mol/L und verändert sich durch die Protolyse von z. B. 0,1 mol/L Säure praktisch nicht. Daher wird der konstante Faktor [H₂O] in die eigentliche thermodynamische Gleichgewichtskonstante Kc einbezogen und als Ka = Kc · [H₂O] zusammengefasst."
  - question: "Wie verändert sich der Dissoziationsgrad α beim Verdünnen einer schwachen Säure?"
    answer: "Nach dem Ostwaldschen Verdünnungsgesetz gilt Ka = c₀ · α² / (1 − α). Sinkt die Ausgangskonzentration c₀ durch Zugabe von Wasser, muss der Dissoziationsgrad α steigen, damit das Gleichgewichtsverhältnis Ka konstant bleibt. Sehr stark verdünnte schwache Säuren dissoziieren daher prozentual weitaus stärker als konzentrierte Lösungen."
  - question: "Wann darf die vereinfachte Formel [H₃O⁺] ≈ √(Ka · c₀) verwendet werden?"
    answer: "Diese Näherung setzt voraus, dass der dissoziierte Anteil gegenüber der Ausgangskonzentration vernachlässigbar bleibt ([HA] ≈ c₀). Chemische Fachstandards akzeptieren die Näherung bis zu einem Dissoziationsgrad von maximal 5 % (α ≤ 0,05), was in der Regel ab einem Verhältnis c₀ / Ka ≥ 400 erfüllt ist. Bei geringeren Verhältnissen müssen Sie die vollständige quadratische Gleichung lösen."
  - question: "Welche praktische Rolle spielt der Ka-Wert in der Pharmakologie?"
    answer: "Viele Arzneistoffe sind schwache organische Säuren oder Basen. Das Verhältnis aus pKa und lokalem Umgebungs-pH (etwa pH 1,5 im Magen vs. pH 7,4 im Blutplasma) bestimmt, welcher Anteil des Wirkstoffs ungeladen vorliegt. Nur ungeladene Moleküle passieren Lipiddoppelschichten passiv schnell genug, während ionisierte Formen besser wasserlöslich sind."
---

Die **Säuredissoziationskonstante `Ka`** (auch Säurekonstante) ist das zentrale quantitative Maß für die Stärke einer Brønsted-Säure in wässriger Lösung. Sie gibt an, welcher Anteil der Säuremoleküle im chemischen Gleichgewicht Protonen (`H⁺`) an Wassermoleküle überträgt und dabei Oxoniumionen (`H₃O⁺`) sowie die korrespondierende Base (`A⁻`) bildet. Starke Mineralsäuren wie Salzsäure dissoziieren nahezu vollständig (`Ka >> 1`), während schwache Säuren wie Essigsäure oder Kohlensäure zum überwiegenden Teil als intakte Moleküle vorliegen (`Ka << 1`).

Da experimentelle `Ka`-Werte in der Regel zwischen `10⁶` und `10⁻¹⁵` variieren, wird im Labor- und Fachalltag parallel der logarithmische **`pKa`-Wert** verwendet. Um aus gemessenen Gleichgewichtskonzentrationen oder pH-Messungen ohne umständliches Potenzrechnen sofort die exakte Konstante zu bestimmen, nutzen Sie unseren [Ka-Rechner](/de/rechner/ka-wert-rechner).

## Thermodynamisches Gleichgewicht, Ka-Formel und pKa-Skala

Löst man eine schwache einprotonige Säure `HA` in Wasser, stellt sich ein dynamisches Protolyse-Gleichgewicht ein: `HA + H₂O ⇌ H₃O⁺ + A⁻`. Im Gleichgewicht laufen Hin- und Rückreaktion mit identischer Geschwindigkeit ab. Wendet man das Massenwirkungsgesetz an und bezieht die nahezu konstante Wasserkonzentration (`~55,5 mol/L`) in die Konstante ein, ergeben sich die grundlegenden Bestimmungsgleichungen:

```text
Säuredissoziationskonstante:
Ka  = ([H₃O⁺] · [A⁻]) / [HA]

Logarithmische Skala (pKa):
pKa = −log₁₀(Ka)     bzw.     Ka = 10^(−pKa)

Ostwaldsches Verdünnungsgesetz (mit Ausgangskonzentration c₀ und Dissoziationsgrad α):
Ka  = (c₀ · α²) / (1 − α)     wobei α = [A⁻] / c₀
```

Die Parameter besitzen im Einzelnen folgende Bedeutung:

- **[H₃O⁺]:** Molare Gleichgewichtskonzentration der Oxoniumionen (vereinfacht oft als `[H⁺]` notiert) in `mol/L`, direkt messbar über den pH-Wert (`[H₃O⁺] = 10^(−pH)`).
- **[A⁻]:** Molare Gleichgewichtskonzentration der deprotonierten, korrespondierenden Base in `mol/L`. In einer reinen wässrigen Lösung von `HA` entsteht für jedes `H₃O⁺` genau ein `A⁻` (`[H₃O⁺] ≈ [A⁻]`).
- **[HA]:** Molare Gleichgewichtskonzentration der noch undissoziierten Säure in `mol/L`. Sie ergibt sich exakt aus der eingewogenen Gesamtkonzentration `c₀` abzüglich des dissoziierten Anteils: `[HA] = c₀ − [A⁻]`.

Bei **mehrprotonigen Säuren** wie Phosphorsäure (`H₃PO₄`) oder Oxalsäure verläuft die Abgabe jedes weiteren Protons deutlich schwerer, weil das nächste Proton gegen eine bereits negativ geladene Ionenhülle abgespalten werden muss. Daher gilt immer `Ka₁ > Ka₂ > Ka₃` beziehungsweise umgekehrt `pKa₁ < pKa₂ < pKa₃`.

## Schritt-für-Schritt-Rechenbeispiel: Ka-Bestimmung einer schwachen Säure

In der Qualitätskontrolle wird eine wässrige Lösung von **Ameisensäure** (`HCOOH`) mit einer bekannten Ausgangskonzentration von **`c₀ = 0,100 mol/L`** angesetzt. Bei exakt **25 °C** misst ein kalibriertes pH-Meter einen Wert von **`pH = 2,38`**. Gesucht sind die Dissoziationskonstante `Ka`, der `pKa`-Wert und der prozentuale Dissoziationsgrad `α`.

1. **Oxoniumionen-Konzentration aus dem pH berechnen:** Rechnen Sie den gemessenen pH-Wert zurück: `[H₃O⁺] = 10^(−2,38) ≈ 4,169 × 10⁻³ mol/L` (`0,004169 mol/L`).
2. **Basenkonzentration ableiten:** Da die Eigendissoziation des Wassers (`10⁻⁷ mol/L`) gegenüber `4,169 × 10⁻³ mol/L` vernachlässigbar klein ist, stammen praktisch alle Oxoniumionen aus der Ameisensäure. Somit gilt `[HCOO⁻] = [H₃O⁺] = 4,169 × 10⁻³ mol/L`.
3. **Gleichgewichtskonzentration der intakten Säure ermitteln:** Ziehen Sie den dissoziierten Anteil von der Einwaagekonzentration ab: `[HCOOH] = 0,100 − 0,004169 = 0,09583 mol/L`.
4. **Ka-Wert berechnen:** Setzen Sie die drei Gleichgewichtswerte in das Massenwirkungsgesetz ein:
   `Ka = (4,169 × 10⁻³ × 4,169 × 10⁻³) / 0,09583 = (1,738 × 10⁻⁵) / 0,09583 ≈ 1,81 × 10⁻⁴`.
5. **pKa und Dissoziationsgrad auswerten:** Für den `pKa`-Wert folgt `pKa = −log₁₀(1,81 × 10⁻⁴) ≈ 3,74`. Der Dissoziationsgrad beträgt `α = 0,004169 / 0,100 = 0,0417` oder **4,17 %** (im Einklang mit der 5-%-Schwelle für Näherungen).

Hätte man im dritten Schritt vereinfachend `[HCOOH] ≈ 0,100 mol/L` angesetzt, wäre das Ergebnis mit `1,74 × 10⁻⁴` bereits um rund 4 % zu niedrig ausgefallen — ein deutlicher Beleg dafür, warum die exakte Subtraktion `c₀ − [H₃O⁺]` bei mittelstarken schwachen Säuren entscheidend ist.

## Vergleichstabelle: Ka- und pKa-Werte ausgewählter Säuren bei 25 °C

Die Tabelle spannt den Bogen von sehr starken Mineralsäuren bis zu extrem schwachen organischen bzw. anorganischen Säuren und zeigt, wie stark sich die Dissoziationseigenschaften unterscheiden.

| Säure (Formel) | Dissoziationsstufe | Ka (25 °C) | pKa (25 °C) | Klassifizierung | Typische Bedeutung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Salzsäure (`HCl`) | 1. Stufe | `≈ 2 × 10⁶` | −6,30 | Sehr starke Säure | Magensäure, Labor-Titrationen |
| Oxalsäure (`H₂C₂O₄`) | 1. Stufe (`Ka₁`) | `5,6 × 10⁻²` | 1,25 | Mittelstarke Säure | Entkalkung, Urtitersubstanz |
| Phosphorsäure (`H₃PO₄`) | 1. Stufe (`Ka₁`) | `7,1 × 10⁻³` | 2,15 | Mittelstarke Säure | Rostumwandler, Säuerungsmittel |
| Ameisensäure (`HCOOH`) | 1. Stufe | `1,8 × 10⁻⁴` | 3,75 | Schwache Säure | Konservierung, Entkalker |
| Essigsäure (`CH₃COOH`) | 1. Stufe | `1,8 × 10⁻⁵` | 4,76 | Schwache Säure | Acetatpuffer, Lebensmitteltechnik |
| Borsäure (`H₃BO₃`) | 1. Stufe (`Ka₁`) | `5,8 × 10⁻¹⁰` | 9,24 | Sehr schwache Säure | Augenpuffer, pH-Regulierung |

## Anwendungsfelder, Näherungsgrenzen und Messgenauigkeit

In der **analytischen und präparativen Chemie** entscheidet der `Ka`-Wert darüber, wie vollständig eine Säure bei einer Neutralisationstitration umgesetzt wird, wo der Äquivalenzpunkt liegt und welcher Farbindikator einen scharfen Umschlag zeigt. In der **Umwelt- und Wasserchemie** steuern die beiden `Ka`-Werte der Kohlensäure (`pKa₁ ≈ 6,35`, `pKa₂ ≈ 10,33`) das Kalk-Kohlensäure-Gleichgewicht in Trinkwasserleitungen, Flüssen und Ozeanen sowie die Pufferkapazität von Böden gegenüber saurem Niederschlag. In der **pharmazeutischen Entwicklung** ist der `pKa` ein Schlüsselparameter für das Löslichkeits- und Permeabilitätsprofil (ADME-Profil) neuer Wirkstoffkandidaten.

Bei der Auswertung eigener Messreihen sollten Sie folgende Fehlerquellen ausschließen:

- **Vernachlässigte quadratische Korrektur:** Sobald der Dissoziationsgrad **5 % übersteigt** (`c₀ / Ka < 400`), führt die vereinfachte Formel `[H₃O⁺] ≈ √(Ka · c₀)` zu signifikanten Fehlern. Lösen Sie dann stets die exakte quadratische Gleichung `[H₃O⁺]² + Ka · [H₃O⁺] − Ka · c₀ = 0`.
- **Autoprotolyse des Wassers bei extremer Verdünnung:** Bei sehr schwachen Säuren oder äußerst niedrigen Konzentrationen (`c₀ < 10⁻⁵ mol/L`) trägt das Wasser selbst `10⁻⁷ mol/L` an `H₃O⁺`-Ionen bei, sodass ein rein rechnerischer pH-Wert über `7,0` physikalisch unmöglich ist.
- **Abweichende Messtemperatur:** Da Protolysereaktionen mit einer Reaktionsenthalpie verbunden sind, gelten Literaturwerte ausschließlich für die jeweils angegebene Bezugstemperatur (standardmäßig 25 °C bzw. 298,15 K).
- **Fehlende Ionenstärkekorrektur:** Bei Konzentrationen deutlich oberhalb von `0,1 mol/L` weichen gemessene Konzentrationen spürbar von thermodynamischen Aktivitäten ab; für hochpräzise `Ka`-Bestimmungen wird daher auf Ionenstärke null extrapoliert.
