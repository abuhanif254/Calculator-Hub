---
title: "Enthalpie-Rechner: Wärme in chemischen Reaktionen"
description: "Verstehen Sie Enthalpie, den Unterschied zwischen exothermen und endothermen Reaktionen sowie die Berechnung mit Standardbildungsenthalpien und unserem Rechner."
category: "Math & Science"
relatedCalculator: "enthalpy-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was genau beschreibt die Enthalpie H in der Thermodynamik?"
    answer: "Die Enthalpie H = U + p · V fasst die innere Energie U eines Systems und die zu dessen Ausdehnung gegen den Umgebungsdruck p notwendige Volumenarbeit p · V zusammen. Da chemische Reaktionen im Labor und in der Technik meist bei konstantem Druck ablaufen, entspricht die Enthalpieänderung ΔH exakt der ausgetauschten Wärmemenge Qp."
  - question: "Woran erkenne ich den Unterschied zwischen einer exothermen und einer endothermen Reaktion?"
    answer: "Bei einer exothermen Reaktion ist ΔH negativ (ΔH < 0): Die Produkte liegen energetisch tiefer als die Edukte, sodass Wärme an die Umgebung abgegeben wird. Bei einer endothermen Reaktion ist ΔH positiv (ΔH > 0): Das System nimmt Wärme aus der Umgebung auf, wodurch sich ein Reaktionsgefäß abkühlt."
  - question: "Warum beträgt die Standardbildungsenthalpie reiner Elemente immer null?"
    answer: "Per IUPAC-Konvention wird die Standardbildungsenthalpie ΔfH° eines jeden chemischen Elements in seiner thermodynamisch stabilsten Modifikation bei 298,15 K und 1 bar als Referenzpunkt exakt auf 0 kJ/mol festgelegt – etwa für O2(g), N2(g) oder Kohlenstoff als Graphit. Für weniger stabile Modifikationen wie Ozon (O3) oder Diamant ist ΔfH° hingegen ungleich null."
  - question: "Warum liefern Berechnungen über Bindungsenthalpien oft andere Werte als über Bildungsenthalpien?"
    answer: "Standardbildungsenthalpien gelten für exakt definierte Stoffe einschließlich ihres konkreten Aggregatzustands und zwischenmolekularer Wechselwirkungen. Tabellenwerte für Bindungsenthalpien sind dagegen gemittelte Durchschnittswerte für isolierte Moleküle in der Gasphase und berücksichtigen keine Kondensations-, Kristall- oder Lösungsenergien."
  - question: "Wie hängen Enthalpieänderung ΔH und innere Energie ΔU bei Gasreaktionen zusammen?"
    answer: "Bei idealen Gasen lässt sich der Druck-Volumen-Term über das ideale Gasgesetz ausdrücken: ΔH = ΔU + Δn_gas · R · T. Ändert sich die Stoffmenge der gasförmigen Teilchen während der Reaktion nicht (Δn_gas = 0), sind ΔH und ΔU zahlenmäßig gleich."
---

Verbrennt Erdgas in einem Heizkessel, wird innerhalb von Sekunden Wärme an den Wasserkreislauf abgegeben; löst sich dagegen Ammoniumnitrat in einem medizinischen Sofort-Kältepack auf, sinkt die Temperatur schlagartig unter den Gefrierpunkt. In beiden Fällen findet ein Energieaustausch mit der Umgebung statt, den die Thermodynamik bei konstantem Druck über die **Enthalpie (`H`)** beschreibt. Eine negative Enthalpieänderung (`ΔH < 0`) kennzeichnet **exotherme** Prozesse, die Wärme freisetzen, während eine positive Änderung (`ΔH > 0`) **endotherme** Prozesse beschreibt, die Wärme aufnehmen.

Weil sich absolute Enthalpiewerte einzelner Stoffe nicht direkt messen lassen, arbeiten Chemiker und Verfahrensingenieure stets mit Enthalpiedifferenzen (`ΔH`) relativ zu definierten Referenzzuständen. Unser [Enthalpie-Rechner](/de/rechner/enthalpie-rechner) unterstützt Sie dabei, die molare Reaktionsenthalpie direkt aus den Bildungsenthalpien der beteiligten Edukte und Produkte zu bestimmen und eindeutig als exotherm oder endotherm einzuordnen.

## Methodik: Definition, Vorzeichen und Berechnungswege

Physikalisch setzt sich die Enthalpie `H` aus der inneren Energie `U` (kinetische und potenzielle Energie aller Teilchen) sowie dem Verdrängungsprodukt aus Druck `p` und Volumen `V` zusammen. Da bei konstantem Außendruck (`dp = 0`) die gesamte Volumenarbeit `−p · ΔV` bereits im Term `p · V` berücksichtigt ist, gilt für die messbare Enthalpieänderung:

```text
Definition:            H   = U + p · V
Konstanter Druck:      ΔH  = ΔU + p · ΔV = Q_p
Über Bildungsenthalpie: ΔrH° = Σ (ν_P · ΔfH°(Produkte)) − Σ (ν_E · ΔfH°(Edukte))
Über Bindungsenergie:   ΔrH  ≈ Σ BE(gebrochene Bindungen) − Σ BE(gebildete Bindungen)
Gasphasen-Bezug zu ΔU: ΔH  = ΔU + Δn_gas · R · T
```

Die Parameter besitzen folgende exakte Bedeutungen:

* **Standardbildungsenthalpie (`ΔfH°`, in `kJ/mol`)**: Die Enthalpieänderung, wenn genau `1 mol` einer Verbindung unter Standardbedingungen (`p° = 1 bar`, meist `T = 298,15 K`) aus ihren reinen Elementen im stabilsten Zustand entsteht.
* **Stöchiometrische Koeffizienten (`ν_P`, `ν_E`)**: Die Vorzahlen aus der ausgeglichenen Reaktionsgleichung. Sie gewichten jede Stoffkomponente im Produkt- und Eduktterm exakt entsprechend ihrem Stoffmengenverhältnis.
* **Bindungsenthalpie (`BE`, in `kJ/mol`)**: Die durchschnittliche Energie, die zum homolytischen Spalten von `1 mol` einer bestimmten kovalenten Bindung in der Gasphase benötigt wird.
* **Gasstoffmengenänderung (`Δn_gas`, in `mol`)**: Die Differenz zwischen den stöchiometrischen Koeffizienten gasförmiger Produkte und gasförmiger Edukte (`Σ ν_gas,P − Σ ν_gas,E`).

Auf molekularer Ebene entscheidet stets die Bilanz aus Bindungsbruch und Bindungsbildung: Das Aufbrechen bestehender Bindungen in den Edukten erfordert Energie (endothermer Aufwand), während das Knüpfen stabilerer Bindungen in den Produkten Energie freisetzt (exothermer Ertrag). Überwiegt die freiwerdende Bindungsenergie, wird `ΔH` negativ.

## Rechenbeispiel: Verbrennung von Bioethanol unter Standardbedingungen

Betrachten wir die vollständige Oxidation von flüssigem Ethanol (`C2H5OH`) mit Luftsauerstoff bei `298,15 K` (`25 °C`) und `1 bar`:

```text
Ausgeglichene Gleichung: C2H5OH(l) + 3 O2(g) → 2 CO2(g) + 3 H2O(l)
```

Zunächst schlagen wir die Standardbildungsenthalpien (`ΔfH°`) für alle Reaktanden im jeweils korrekten Aggregatzustand nach:
* `C2H5OH(l)`: `−277,7 kJ/mol`
* `O2(g)`: `0,0 kJ/mol` (stabiles Referenzelement)
* `CO2(g)`: `−393,5 kJ/mol`
* `H2O(l)`: `−285,8 kJ/mol`

**Schritt 1: Gesamte Bildungsenthalpie der Produkte summieren**
```text
Σ (ν_P · ΔfH°(Produkte)) = 2 × (−393,5 kJ/mol) + 3 × (−285,8 kJ/mol)
                         = −787,0 kJ/mol + (−857,4 kJ/mol)
                         = −1.644,4 kJ/mol
```

**Schritt 2: Gesamte Bildungsenthalpie der Edukte summieren**
```text
Σ (ν_E · ΔfH°(Edukte)) = 1 × (−277,7 kJ/mol) + 3 × 0,0 kJ/mol
                        = −277,7 kJ/mol
```

**Schritt 3: Differenz bilden und spezifischen Brennwert ableiten**
```text
ΔrH° = −1.644,4 kJ/mol − (−277,7 kJ/mol) = −1.366,7 kJ/mol
```

Das negative Vorzeichen belegt eine stark exotherme Reaktion. Mit der molaren Masse von Ethanol (`46,07 g/mol`) entspricht dies einem spezifischen oberen Heizwert (Brennwert) von `1.366,7 kJ / 46,07 g = 29,67 kJ/g` beziehungsweise `29,67 MJ/kg` (`8,24 kWh/kg`). Entstünde statt flüssigem Wasser Wasserdampf (`H2O(g)` mit `ΔfH° = −241,8 kJ/mol`), betrüge die Produkt-Summe lediglich `−1.512,4 kJ/mol` und die Reaktionsenthalpie damit `−1.234,7 kJ/mol` – genau jene Differenz von `3 × 44,0 kJ/mol = 132,0 kJ/mol`, die als Kondensationswärme ungenutzt bliebe.

## Vergleichstabelle: Typische exotherme und endotherme Enthalpien

Die folgende Übersicht zeigt die Bandbreite realer Enthalpieänderungen von physikalischen Phasenübergängen bis hin zu energiereichen chemischen Synthesen (Richtwerte bei `298,15 K`, sofern nicht anders vermerkt):

| Vorgang / Reaktionsgleichung | Typ | Enthalpieänderung `ΔH°` | Besonderheit / Praxisbezug |
| :--- | :--- | :--- | :--- |
| `C2H5OH(l) + 3 O2(g) → 2 CO2(g) + 3 H2O(l)` | Exotherm | `−1.366,7 kJ/mol` | Kraftstoffverbrennung (Brennwert mit flüssigem Wasser) |
| `CH4(g) + 2 O2(g) → CO2(g) + 2 H2O(l)` | Exotherm | `−890,3 kJ/mol` | Erdgasverbrennung; Basis moderner Brennwertthermen |
| `H+(aq) + OH−(aq) → H2O(l)` | Exotherm | `−57,3 kJ/mol` | Starke Säure-Base-Neutralisation in verdünnter Lösung |
| `H2O(s) → H2O(l)` (bei `0 °C`) | Endotherm | `+6,01 kJ/mol` | Schmelzenthalpie von Eis; kühlt Getränke durch Wärmezufuhr |
| `H2O(l) → H2O(g)` (bei `100 °C`) | Endotherm | `+40,66 kJ/mol` | Verdampfungsenthalpie; Grundlage der Dampfturbinentechnik |
| `NH4NO3(s) → NH4+(aq) + NO3−(aq)` | Endotherm | `+25,7 kJ/mol` | Lösungsenthalpie in medizinischen Sofort-Kältekompressen |
| `6 CO2(g) + 6 H2O(l) → C6H12O6(s) + 6 O2(g)` | Endotherm | `+2.803,0 kJ/mol` | Fotosynthese; Speicherung von Sonnenlicht als Biomasse |

## Einsatzbereiche, Fehlerquellen und experimentelle Grenzen

In der **Heizungs- und Kraftwerkstechnik** entscheidet die präzise Enthalpiebilanz über den Unterschied zwischen Heizwert (`H_i`, Wasser dampfförmig) und Brennwert (`H_s`, Wasser flüssig). In der **chemischen Industrie** bestimmen Reaktionsenthalpien die Auslegung von Kühlregistern, Wärmetauschern und Notentlastungssystemen: Wird Wärme schneller frei, als der Reaktor sie abführen kann, droht ein thermisches Durchgehen (*Thermal Runaway*).

Vermeiden Sie bei Berechnungen und Bewertungen diese vier häufigen Fallstricke:

1. **Aggregatzustände ignorieren**: Die Verwechslung von `H2O(l)` (`−285,8 kJ/mol`) und `H2O(g)` (`−241,8 kJ/mol`) führt pro Mol Wasser zu einem Fehler von `44,0 kJ/mol`. Prüfen Sie stets die Zustandsindizes `(s)`, `(l)`, `(g)` und `(aq)`.
2. **Vorzeichenregel bei Bindungsenthalpien verwechseln**: Während bei Bildungsenthalpien `Produkte − Edukte` gerechnet wird, gilt bei Bindungsenthalpien umgekehrt `gebrochene Eduktbindungen − gebildete Produktbindungen`. Beide Verfahren zu vertauschen kehrt das Vorzeichen um.
3. **Bombenkalorimeter direkt als `ΔH` ablesen**: Ein geschlossenes Bombenkalorimeter arbeitet bei konstantem *Volumen* und misst daher `ΔU`, nicht `ΔH`. Bei Reaktionen mit großer Gasvolumenänderung muss der Term `Δn_gas · R · T` korrigiert werden.
4. **Enthalpie als alleiniges Spontanitätskriterium nutzen**: Auch wenn viele exotherme Reaktionen spontan ablaufen, bestimmt letztlich die Gibbs-Energie (`ΔG = ΔH − T · ΔS`) über die Freiwilligkeit – endotherme Kältepacks funktionieren gerade deshalb spontan, weil die Entropiezunahme beim Auflösen des Salzkristalls den positiven `ΔH`-Beitrag überkompensiert.
