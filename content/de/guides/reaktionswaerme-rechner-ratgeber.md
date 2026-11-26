---
title: "Reaktionswärme-Rechner: Thermodynamik"
description: "Erfahren Sie, wie Sie die Standard-Reaktionsenthalpie aus Standardbildungsenthalpien exakt berechnen, welche Standardbedingungen gelten, und nutzen Sie unseren Rechner."
category: "Math & Science"
relatedCalculator: "heat-of-reaction-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen Reaktionswärme Q und Standardreaktionsenthalpie ΔrH°?"
    answer: "Die Reaktionswärme Q bezeichnet die in einem konkreten Versuch bei gegebenem Stoffumsatz n gemessene Wärmeenergie in Joule oder Kilojoule. Die Standardreaktionsenthalpie ΔrH° normiert diesen Wert bei konstantem Druck auf genau einen Formelumsatz (Einheit kJ/mol) unter definierten Standardbedingungen von 1 bar und üblicherweise 298,15 K."
  - question: "Welche Standardbedingungen gelten aktuell nach IUPAC für thermodynamische Tabellen?"
    answer: "Seit 1982 legt die IUPAC den Standarddruck p° auf exakt 1 bar (100 kPa) fest; für wässrige Lösungen gilt eine ideale Standardkonzentration von 1 mol/L (bzw. Molalität 1 mol/kg). Die Temperatur ist kein fester Bestandteil der Standarddruck-Definition, wird in Tabellenwerken jedoch fast durchgehend auf 298,15 K (25 °C) bezogen."
  - question: "Worauf bezieht sich das „pro Mol“ bei der Angabe kJ/mol einer Reaktionsenthalpie?"
    answer: "Bei einer Reaktionsenthalpie ΔrH° bezieht sich „pro Mol“ stets auf ein Mol Formelumsatz der exakt so geschriebenen Reaktionsgleichung. Verdoppelt man sämtliche stöchiometrischen Koeffizienten einer Gleichung, verdoppelt sich folglich auch der Zahlenwert von ΔrH° in kJ/mol."
  - question: "Wie lässt sich die Reaktionswärme experimentell im Labor bestimmen?"
    answer: "Im offenen oder druckkonstanten Flüssigkeitskalorimeter misst man die Temperaturänderung ΔT und berechnet Q = −(m · c + C_Kal) · ΔT, wobei m · c die Wärmekapazität der Lösung und C_Kal die Eigenwärmekapazität des Kalorimeters darstellt. Anschließend dividiert man Q durch die umgesetzte Stoffmenge gemäß der Formelgleichung."
  - question: "Bleibt die Reaktionswärme bei sehr hohen oder tiefen Prozesstemperaturen konstant?"
    answer: "Nein. Unterscheiden sich die molaren Wärmekapazitäten Cp der Produkte von denen der Edukte, verändert sich die Reaktionsenthalpie mit der Temperatur. Das Kirchhoffsche Gesetz beschreibt diese Verschiebung über das Integral von ΔrCp dT zwischen der Referenztemperatur (298,15 K) und der gewünschten Reaktionstemperatur."
---

Jede stoffliche Umwandlung in Labor, Biologie oder chemischer Großindustrie setzt thermische Energie frei oder bindet sie aus der Umgebung. Um Reaktoren sicher auszulegen, Wärmebilanzen zu schließen und Wirkungsgrade zu vergleichen, berechnen Chemiker und Ingenieure die **Reaktionswärme** – exakt definiert als **Standardreaktionsenthalpie (`ΔrH°`)** bei konstantem Druck. Sie gibt an, wie viel Wärme bei einem vollständigen Formelumsatz unter standardisierten Referenzbedingungen umgesetzt wird.

Da Literaturwerte von der Stöchiometrie, dem Aggregatzustand und dem Bezugsdruck abhängen, führt bereits ein übersehener Koeffizient schnell zu erheblichen Abweichungen. Mit unserem [Reaktionswärme-Rechner](/de/rechner/reaktionswaerme-rechner) multiplizieren Sie Standardbildungsenthalpien automatisch mit den korrekten Reaktionskoeffizienten, berechnen exakte Produkt-Edukt-Differenzen und vermeiden manuelle Vorzeichenfehler.

## Methodik: Standardzustände, Formel und Temperaturkorrektur

Da Druck, Temperatur und Konzentration die Enthalpie beeinflussen, definiert die IUPAC (International Union of Pure and Applied Chemistry) eindeutige **Standardzustände**, gekennzeichnet durch das hochgestellte Kreissymbol (`°`):

* **Standarddruck (`p°`)**: Exakt `1 bar` (`100 kPa`; ältere Lehrbücher vor 1982 verwenden teilweise `1 atm = 101,325 kPa`).
* **Referenztemperatur (`T`)**: Meist `298,15 K` (`25,00 °C`), grundsätzlich jedoch für beliebige Temperaturen definierbar.
* **Konzentration in Lösung**: Ideale `1 mol/L`-Lösung (genauer: Standardmolalität `1 mol/kg` bei unendlicher Verdünnung).
* **Reine Phasen**: Reinster stabilster Aggregatzustand des jeweiligen Stoffes bei `p°` und `T`.

Auf dieser Basis berechnet sich die Standardreaktionsenthalpie aus den tabellierten Standardbildungsenthalpien (`ΔfH°`) sowie bei abweichenden Temperaturen mithilfe des **Kirchhoffschen Gesetzes** und der **Kalorimetrie**:

```text
Standardreaktionsenthalpie: ΔrH° = Σ (ν_P · ΔfH°(Produkte)) − Σ (ν_E · ΔfH°(Edukte))
Kirchhoffsches Gesetz:      ΔrH°(T_2) = ΔrH°(T_1) + ∫[T_1→T_2] ΔrC_p° dT
                            ΔrC_p°    = Σ (ν_P · C_p°(Produkte)) − Σ (ν_E · C_p°(Edukte))
Kalorimetrie (isobar):      Q_R       = −(m · c + C_Kal) · ΔT
Molare Reaktionswärme:      ΔrH       = Q_R / ξ   (ξ = Reaktionslaufzahl in mol)
```

Hierbei stehen `ν_P` und `ν_E` für die dimensionslosen stöchiometrischen Koeffizienten der Produkte beziehungsweise Edukte, `C_p°` für die molare Wärmekapazität bei konstantem Druck in `J/(mol·K)`, `C_Kal` für die Wärmekapazität des Kalorimeters in `J/K` und `ξ` für die Reaktionslaufzahl (den tatsächlichen Formelumsatz in `mol`).

## Rechenbeispiel: Ammoniaksynthese bei 25 °C und bei Reaktortemperatur

Das Haber-Bosch-Verfahren zur Herstellung von Ammoniak gehört zu den wichtigsten großtechnischen Reaktionen weltweit:

```text
Reaktionsgleichung: N2(g) + 3 H2(g) ⇌ 2 NH3(g)
```

**Schritt 1: Standardreaktionsenthalpie bei `298,15 K` (`25 °C`)**
Aus der Standardtabelle (IUPAC/NIST, `1 bar`) entnehmen wir:
* `ΔfH°(N2, g) = 0,0 kJ/mol` und `ΔfH°(H2, g) = 0,0 kJ/mol` (Referenzelemente)
* `ΔfH°(NH3, g) = −45,9 kJ/mol`

Eingesetzt in die Summenformel ergibt sich für einen Formelumsatz (`2 mol NH3`):

```text
ΔrH°(298,15 K) = 2 × (−45,9 kJ/mol) − [1 × 0,0 + 3 × 0,0] = −91,8 kJ/mol
```

Pro Mol gebildetem Ammoniak werden unter Standardbedingungen somit `45,9 kJ` Wärme frei.

**Schritt 2: Temperaturkorrektur auf technische Synthesetemperatur (`723,15 K` / `450 °C`)**
In der industriellen Anlage arbeitet der Katalysator jedoch bei rund `450 °C` (`ΔT = 723,15 K − 298,15 K = 425,0 K`). Mit den Standardwärmekapazitäten `C_p°(N2) = 29,1 J/(mol·K)`, `C_p°(H2) = 28,8 J/(mol·K)` und `C_p°(NH3) = 35,1 J/(mol·K)` (in vereinfachter Näherung über das Intervall als konstant angesetzt) berechnen wir `ΔrC_p°`:

```text
ΔrC_p° = 2 × 35,1 J/(mol·K) − [1 × 29,1 + 3 × 28,8] J/(mol·K)
       = 70,2 J/(mol·K) − 115,5 J/(mol·K) = −45,3 J/(mol·K) = −0,0453 kJ/(mol·K)
```

Nun wenden wir das Kirchhoffsche Gesetz an:

```text
ΔrH°(723,15 K) ≈ −91,8 kJ/mol + (−0,0453 kJ/(mol·K) × 425,0 K)
               = −91,8 kJ/mol − 19,25 kJ/mol = −111,05 kJ/mol
```

Bei `450 °C` ist die Ammoniaksynthese pro Formelumsatz um gut `21 %` stärker exotherm als bei Raumtemperatur – ein zentraler Wert für die Auslegung der Abhitzedampferzeuger im Reaktor.

## Benchmarking: Standardreaktionswärmen wichtiger Prozesse

Die Tabelle stellt sechs technisch und didaktisch zentrale Reaktionen bei `298,15 K` (`1 bar`) samt ihrem Wärmeeffekt gegenüber:

| Prozess | Ausgeglichene Reaktionsgleichung | `ΔrH°` (kJ/mol Umsatz) | Charakteristik und Anwendung |
| :--- | :--- | :--- | :--- |
| Knallgasreaktion (flüssig) | `2 H2(g) + O2(g) → 2 H2O(l)` | `−571,6` | Brennstoffzelle & Wasserstoff-Brennwert |
| Knallgasreaktion (dampfförmig) | `2 H2(g) + O2(g) → 2 H2O(g)` | `−483,6` | Raketenantrieb & Hochtemperatur-Verbrennung |
| Methan-Verbrennung | `CH4(g) + 2 O2(g) → CO2(g) + 2 H2O(l)` | `−890,3` | Erdgasheizung und Gaskraftwerke |
| Haber-Bosch-Synthese | `N2(g) + 3 H2(g) → 2 NH3(g)` | `−91,8` | Düngemittelproduktion; Wärmerückgewinnung |
| Thermit-Reaktion | `Fe2O3(s) + 2 Al(s) → 2 Fe(l) + Al2O3(s)` | `−851,5` | Aluminothermisches Schweißen von Eisenbahnschienen |
| Kalkbrennen | `CaCO3(s) → CaO(s) + CO2(g)` | `+178,3` | Endotherme Zementklinker-Produktion im Drehrohrofen |

## Praxisrelevanz, Fehlerquellen und sicherheitstechnische Hinweise

In der **chemischen Sicherheitstechnik** (etwa bei der Gefahrenbeurteilung nach Störfall-Verordnung und TRAS-Regelwerken) bestimmt die Reaktionswärme direkt den **adiabatischen Temperaturanstieg (`ΔT_ad = −ΔrH / (m · c_p)`)**: Er gibt an, um wie viele Kelvin sich ein Reaktorinhalt im Extremfall eines vollständigen Kühlungsausfalls erhitzt. Bereits Werte ab `ΔT_ad > 50 K` erfordern in der Industrie detaillierte Notkühl- und Druckentlastungskonzepte.

Bei thermodynamischen Berechnungen und Vergleichen sollten Sie vier häufige Fehlerquellen ausschließen:

1. **Unabgeglichene Reaktionsgleichungen**: Vergessen Sie einen stöchiometrischen Faktor oder gleichen Sie Sauerstoff- beziehungsweise Wasserstoffatome nicht vollständig ab, verfälscht sich das Ergebnis um ganze Vielfache.
2. **Vermischung von `1 bar`- und `1 atm`-Tabellenwerken**: Ältere deutschsprachige Formelsammlungen verwenden vereinzelt `101,325 kPa` (`1 atm`) als Standarddruck, was besonders bei Gasen und Entropien zu leichten Abweichungen führt. Bleiben Sie innerhalb einer Rechnung konsequent bei einer Datenquelle.
3. **Vernachlässigte Verdünnungs- und Mischungswärmen**: Tabellierte `ΔfH°(aq)`-Werte gelten für unendlich verdünnte Lösungen. Wer konzentrierte Schwefelsäure oder Natronlauge mischt, setzt erhebliche zusätzliche Lösungs- und Verdünnungsenthalpien frei.
4. **Verwechslung von Reaktionsumsatz und Stoffmengenbezug**: Prüfen Sie bei Ergebnisvergleichen immer, ob ein Literaturwert auf `1 mol` Edukt (z. B. `−45,9 kJ/mol NH3`) oder auf den vollständigen Formelumsatz der Gleichung (`−91,8 kJ/mol` für `2 NH3`) normiert wurde.
