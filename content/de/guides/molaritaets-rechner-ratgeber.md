---
title: "Molaritäts-Rechner: Chemische Konzentration messen"
description: "Berechnen Sie die Stoffmengenkonzentration (mol/L) sicher aus Masse, Volumen und Molmasse, beherrschen Sie Verdünnungen mit c₁·V₁ = c₂·V₂ und nutzen Sie unseren Molaritäts-Rechner."
category: "Math & Science"
relatedCalculator: "molarity-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen den Symbolen c und M bei der Molarität?"
    answer: "Nach DIN 1310 und den IUPAC-Empfehlungen lautet das offizielle Formelzeichen für die Stoffmengenkonzentration c (z. B. c(NaCl) = 1,5 mol/L). Der Großbuchstabe M wird in der Laborpraxis weiterhin verbreitet als Kurzschreibweise für die Einheit mol/L verwendet – eine 2-M-Lösung enthält also 2 Mol pro Liter."
  - question: "Warum muss beim Ansetzen einer 1-molaren Lösung auf 1 Liter aufgefüllt werden statt 1 Liter Wasser zuzugeben?"
    answer: "Die Molarität bezieht sich immer auf das Gesamtvolumen der fertigen Lösung, nicht auf das Volumen des reinen Lösungsmittels. Da gelöste Salze oder Flüssigkeiten ein eigenes partielles Molvolumen besitzen, ergäbe das Hinzufügen von 1,00 L Wasser zu einem Feststoff ein Gesamtvolumen von über oder unter 1,00 L und somit eine fehlerhafte Konzentration."
  - question: "Wie berechne ich die Molarität, wenn ich nur die Masse in Gramm kenne?"
    answer: "Teilen Sie zunächst die eingewogene Masse m (in g) durch die molare Masse M_Stoff (in g/mol), um die Stoffmenge n = m / M_Stoff in Mol zu erhalten. Anschließend dividieren Sie n durch das Gesamtvolumen V in Litern: c = m / (M_Stoff × V)."
  - question: "Warum verändert sich die Molarität einer wässrigen Lösung mit der Temperatur?"
    answer: "Das Volumen V im Nenner der Formel c = n / V ist temperaturabhängig, da sich Flüssigkeiten beim Erwärmen ausdehnen. Erwärmt man Wasser von 20 °C auf 50 °C, nimmt sein Volumen um rund 1,0 % zu – die Molarität sinkt entsprechend um etwa 1,0 %, obwohl die Stoffmenge konstant bleibt."
  - question: "Was ist bei Hydraten wie CuSO₄ · 5 H₂O bei der Molaritätsberechnung zu beachten?"
    answer: "Kristallwasserhaltige Salze tragen gebundene Wassermoleküle mit in die Waage ein. Sie müssen daher zwingend die molare Masse des gesamten Hydrats (bei Kupfer(II)-sulfat-Pentahydrat 249,68 g/mol statt 159,61 g/mol für die wasserfreie Substanz) ansetzen, da Ihre Lösung sonst deutlich zu schwach konzentriert wird."
---

Die **Molarität** – fachsprachlich präziser als **Stoffmengenkonzentration `c`** bezeichnet – ist das zentrale Konzentrationsmaß der analytischen und präparativen Chemie. Sie gibt an, wie viele Mol eines gelösten Stoffes in einem Liter der fertigen Gesamtlösung vorliegen (`mol/L`, in der Laborpraxis oft mit `M` abgekürzt). Da chemische Reaktionen stets im Verhältnis einzelner Teilchenzahlen (Mol) und nicht nach Massen ablaufen, erlaubt die Molarität das direkte stöchiometrische Abmessen von Reagenzien über einfache Volumenmessungen.

Eine Flasche mit der Aufschrift `c(HCl) = 1,0 mol/L` (`1,0 M`) enthält exakt ein Mol Chlorwasserstoff pro Liter Lösung, unabhängig davon, welches Stoffvolumen sich im einzelnen Becherglas befindet. Für schnelle Umrechnungen zwischen Einwaage, molarer Masse, Zielvolumen und Verdünnungsstufen nutzen Sie unseren [Molaritäts-Rechner](/de/rechner/molaritaets-rechner).

## Grundlagen, Normgerechte Formeln und Verdünnungsgesetz

### Grundgleichung der Stoffmengenkonzentration

Nach DIN 1310 und IUPAC definiert sich die Stoffmengenkonzentration `c` als Quotient aus der Stoffmenge `n` des gelösten Stoffes (in Mol) und dem Gesamtvolumen `V` der Lösung (in Litern, `L` beziehungsweise `dm³`):

```text
c = n / V
```

Da Laborwaagen Massen `m` in Gramm messen und keine Molzahlen anzeigen, wird `n` fast immer über die molare Masse `M_Stoff` (in `g/mol`, aus dem Periodensystem addiert) berechnet:

```text
n = m / M_Stoff
c = m / (M_Stoff × V)
m = c × M_Stoff × V
```

Achten Sie konsequent auf einheitliche Einheiten: Wird das Volumen in Millilitern (`mL`) gemessen, muss es vor dem Einsetzen durch `1.000` geteilt werden (`1 mL = 0,001 L`). Wird mit Mikromol (`µmol`) oder Millimol (`mmol`) gearbeitet, gelten praktische Laborkürzel wie `1 mmol/mL = 1 mol/L` oder `1 µmol/L = 1 µM`.

### Verdünnen von Stammlösungen (Verdünnungsgleichung)

Beim Verdünnen einer konzentrierten Stammlösung mit reinem Lösungsmittel bleibt die absolute Stoffmenge `n` des gelösten Stoffes unverändert (`n₁ = n₂`). Daraus folgt unmittelbar die universelle Verdünnungsformel:

```text
c₁ × V₁ = c₂ × V₂
V₁ = (c₂ × V₂) / c₁
```

Hierbei bezeichnen `c₁` und `V₁` Konzentration und zu entnehmendes Volumen der Stammlösung, während `c₂` und `V₂` Zielkonzentration und Endvolumen der verdünnten Arbeitslösung darstellen. Solange `c₁` und `c₂` dieselbe Einheit tragen, liefert die Gleichung `V₁` direkt in derselben Volumeneinheit wie `V₂`.

## Schritt-für-Schritt-Rechenbeispiel: Stammlösung ansetzen und verdünnen

Im Labor soll zunächst eine `250-mL`-Stammlösung von Natriumchlorid (`NaCl`, molare Masse `M = 58,44 g/mol`) durch Einwiegen von `m = 29,22 g` hergestellt werden. Im zweiten Schritt soll daraus eine `500-mL`-Arbeitslösung mit physiologischer Konzentration (`c₂ = 0,154 mol/L`) verdünnt werden.

1. **Einwaage in Stoffmenge umrechnen:** Teilen Sie die Masse des trockenen Salzes durch seine molare Masse: `n = 29,22 g / 58,44 g/mol = 0,500 mol`.
2. **Volumen in Liter umrechnen:** Das Nennvolumen des verwendeten Messkolbens beträgt `V = 250 mL = 0,250 L`.
3. **Molarität der Stammlösung berechnen:** Dividieren Sie `n` durch `V`: `c₁ = 0,500 mol / 0,250 L = 2,00 mol/L` (`2,00 M`). In der Praxis wird das Salz in etwa `150 mL` deionisiertem Wasser gelöst und erst nach vollständiger Auflösung bei `20 °C` genau bis zur Ringmarke auf `250 mL` aufgefüllt.
4. **Erforderliches Stammlösungsvolumen für die Verdünnung ermitteln:** Gesucht ist `V₁` für `c₂ = 0,154 mol/L` und `V₂ = 500 mL`: `V₁ = (0,154 mol/L × 500 mL) / 2,00 mol/L = 77,0 / 2,00 = 38,5 mL`.
5. **Arbeitslösung herstellen:** Pipettieren Sie exakt `38,5 mL` der `2,00-M`-Stammlösung in einen sauberen `500-mL`-Messkolben und füllen Sie bis zur Eichmarke mit Wasser auf. Zur Kontrolle: In `38,5 mL` (`0,0385 L`) befinden sich `0,0385 L × 2,00 mol/L = 0,0770 mol` `NaCl`; verteilt auf `0,500 L` ergibt das `0,0770 / 0,500 = 0,154 mol/L`.

## Vergleichstabelle: Konzentrationsmaße in der Chemie im Überblick

| Konzentrationsmaß | Formelzeichen | Definition & Formel | SI-/Labor-Einheit | Temperaturabhängig? | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Stoffmengenkonzentration (Molarität) | `c` (Laborkürzel `M`) | `n_Gelöst / V_Lösung` | `mol/L` (`M`) | Ja (über `V`) | Titration, Pufferherstellung, Stöchiometrie |
| Molalität | `b` (international `m`) | `n_Gelöst / m_Lösungsmittel` | `mol/kg` | Nein | Thermodynamik, Gefrierpunktserniedrigung |
| Massenkonzentration | `β` (oder `ρ_i`) | `m_Gelöst / V_Lösung` | `g/L`, `mg/L` | Ja (über `V`) | Umweltanalytik, Trinkwasser-Grenzwerte |
| Massenanteil | `w` | `m_Gelöst / m_Lösung` | `%` (`g / 100 g`) | Nein | Handelschemikalien (z. B. `37-%-HCl`) |
| Stoffmengenanteil (Molenbruch) | `x` | `n_Gelöst / n_Gesamt` | Dimensionslos (`1`) | Nein | Phasengleichgewichte, Dampfdruck (Raoult) |
| Äquivalentkonzentration (Normalität) | `c_eq` (`N`) | `z × c` (Wertigkeit `z`) | `mol/L` (`N`) | Ja (über `V`) | Historische Säure-Base- und Redoxtitrationen |

## Laborpraxis, Fehlerquellen und Sicherheitsaspekte

Obwohl die Formel `c = n / V` einfach erscheint, entstehen im Laboralltag zahlreiche systematische Abweichungen durch Messgeräte, Stoffeigenschaften und Temperatureinflüsse. Beachten Sie daher vier zentrale Praxispunkte:

- **Volumenkontraktion beim Mischen:** Mischt man `500 mL` Ethanol und `500 mL` Wasser, erhält man kein Gesamtvolumen von `1.000 mL`, sondern lediglich rund `963 mL`. Deshalb dürfen Lösungen mit definierter Molarität niemals durch bloßes Addieren zweier Teilvolumina angesetzt werden – maßgeblich ist immer das Auffüllen bis zur Kalibriermarke des Messkolbens nach Temperaturausgleich.
- **Kristallwasser und Reinheitsgrade:** Viele Laborchemikalien sind hygroskopisch oder als definierte Hydrate im Handel. Zudem liegen flüssige Säuren wie Salzsäure (`37 %`, Dichte `1,19 g/cm³`) oder Schwefelsäure (`96 %`, Dichte `1,84 g/cm³`) als Massenanteile vor. Für die Molarität einer Handelssäure müssen Sie zuerst die Dichte und den Massenanteil berücksichtigen: `c = (w × ρ × 1.000) / M_Stoff` (mit `ρ` in `g/cm³` und `w` als Dezimalzahl).
- **Kalibriertemperatur der Glasgeräte:** Klasse-A-Messkolben und Vollpipetten sind in Europa standardmäßig auf eine Bezugstemperatur von `20 °C` justiert. Weicht die Lösungstemperatur stark ab – etwa nach einer exothermen Lösungsreaktion von Natriumhydroxid (`NaOH`) –, muss der Kolben vor dem endgültigen Auffüllen zwingend auf Raumtemperatur abkühlen.
- **Arbeitssicherheit beim Verdünnen starker Säuren:** Konzentrierte Säuren wie `H₂SO₄` setzen beim Kontakt mit Wasser erhebliche Hydratationswärme frei. Geben Sie daher immer zuerst einen Großteil des Wassers vor und lassen Sie die Säure langsam unter Rühren einlaufen („Erst das Wasser, dann die Säure“), niemals umgekehrt, da sonst siedende Spritzer austreten können.
