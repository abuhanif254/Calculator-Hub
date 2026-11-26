---
title: "Hess'scher Wärmesatz-Rechner: Enthalpie addieren"
description: "Verstehen Sie den Satz von Hess, warum Enthalpie eine Zustandsfunktion ist, wie Sie Reaktionsgleichungen kombinieren, und nutzen Sie unseren Rechner."
category: "Math & Science"
relatedCalculator: "hess-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum darf man Reaktionsenthalpien nach dem Hess'schen Wärmesatz einfach addieren?"
    answer: "Die Enthalpie H ist eine thermodynamische Zustandsfunktion. Ihre Änderung hängt ausschließlich vom Anfangszustand (Edukte) und vom Endzustand (Produkte) ab, nicht aber vom konkreten Reaktionsweg oder eventuellen Zwischenprodukten. Daher liefert jede Kombination von Teilschritten, deren Summe die Zielgleichung ergibt, exakt dieselbe Gesamtenthalpie."
  - question: "Was passiert mit ΔH, wenn ich eine Teilgleichung umkehre oder multipliziere?"
    answer: "Kehrt man eine Reaktionsgleichung um – tauscht also Edukte und Produkte –, ändert sich exakt das Vorzeichen von ΔH (aus −283,0 kJ wird +283,0 kJ). Multipliziert oder dividiert man alle stöchiometrischen Koeffizienten einer Gleichung mit einem Faktor k, muss auch ΔH mit genau demselben Faktor k multipliziert werden."
  - question: "Wann ist der Satz von Hess in der Praxis unverzichtbar?"
    answer: "Immer dann, wenn sich eine Reaktion im Kalorimeter nicht sauber isoliert messen lässt – etwa weil sie zu langsam abläuft, explosiv reagiert oder unerwünschte Nebenprodukte bildet. Typische Beispiele sind die direkte Bildung von Kohlenstoffmonoxid ohne CO2-Beimischung, die Umwandlung von Graphit in Diamant oder Gitterenergien im Born-Haber-Kreisprozess."
  - question: "Gilt der Hess'sche Wärmesatz auch bei unterschiedlichen Temperaturen und Drücken?"
    answer: "Der direkte Additionsansatz gilt exakt nur dann, wenn sämtliche Teilreaktionen auf denselben Druck und dieselbe Temperatur (standardmäßig 1 bar und 298,15 K) bezogen sind. Liegen Teilschritte bei abweichenden Temperaturen vor, müssen sie vor der Addition über das Kirchhoffsche Gesetz auf eine gemeinsame Referenztemperatur umgerechnet werden."
  - question: "Kann man beim Kürzen von Zwischenstoffen unterschiedliche Aggregatzustände verrechnen?"
    answer: "Nein. Flüssiges Wasser H2O(l) und Wasserdampf H2O(g) besitzen unterschiedliche Enthalpien (Differenz rund 44,0 kJ/mol bei 25 °C). Sie dürfen zwei Stoffe auf gegenüberliegenden Seiten der Additionsgleichung nur dann kürzen, wenn sowohl Formel als auch Aggregatzustand exakt übereinstimmen; andernfalls ist die Umwandlungsenthalpie als eigener Schritt einzufügen."
---

Manche chemischen Reaktionen lassen sich im Kalorimeter nicht unmittelbar messen: Verbrennt man reinen Kohlenstoff mit wenig Sauerstoff, entsteht unvermeidlich ein Gemisch aus Kohlenstoffmonoxid (`CO`) und Kohlenstoffdioxid (`CO2`); andere Reaktionen verlaufen über Jahrhunderte unmessbar langsam oder führen zu explosionsartigen Nebenreaktionen. Trotzdem lässt sich ihre exakte Reaktionswärme auf das Zehntel Kilojoule genau berechnen – mithilfe des **Hess'schen Wärmesatzes** (Satz von Hess), den der schweizerisch-russische Chemiker Germain Henri Hess bereits 1840 formulierte.

Das Prinzip basiert auf dem Energieerhaltungssatz: Da die Enthalpie eine reine **Zustandsfunktion** ist, spielt der Reaktionsweg keine Rolle. Entscheidend sind allein Ausgangszustand und Endzustand. Konstruieren Sie aus bekannten, gut messbaren Teilreaktionen einen geschlossenen gedanklichen Umweg von den Edukten zu den Produkten, entspricht die Summe der angepassten Teilenthalpien exakt der gesuchten Gesamtenthalpie. Unser [Hess'scher Wärmesatz-Rechner](/de/rechner/hess-gesetz-rechner) übernimmt die fehlerfreie Addition Ihrer skalierten und vorzeichenbereinigten Teilenthalpien.

## Methodik: Zustandsfunktion und die drei Rechenregeln nach Hess

Wie die Höhenmeterdifferenz bei einer Bergwanderung unabhängig davon bleibt, ob Sie die steile Direttissima oder lange Serpentinen wählen, hängt die Enthalpieänderung `ΔrH` nicht vom Mechanismus oder der Zahl der Zwischenstufen ab. Für die algebraische Kombination bekannter Reaktionsgleichungen gelten drei verbindliche Regeln:

```text
Gesamtgleichung:   ΔrH_ges = Σ (k_i · ΔrH_i)
Regel 1 (Umkehr):  Reaktion umkehren (Edukte ↔ Produkte)  ⇒  k_i = −1 (Vorzeichen umkehren)
Regel 2 (Faktor):  Gleichung mit Faktor f multiplizieren  ⇒  k_i = f  (ΔrH_i × f)
Regel 3 (Summe):   Identische Stoffe links & rechts kürzen und skalierte ΔrH_i addieren
```

Dabei bezeichnet `ΔrH_i` die Reaktionsenthalpie der jeweiligen Ausgangsgleichung (in `kJ/mol` bezogen auf deren geschriebene Stöchiometrie) und `k_i` den kombinierten Skalierungs- und Richtungsfaktor. Positive `k_i` belassen die Reaktionsrichtung, negative `k_i` drehen die Gleichung um. Ein Stoff darf über die Gleichungsgrenzen hinweg nur dann gekürzt werden, wenn chemische Formel, Ladung **und** Aggregatzustand (`(s)`, `(l)`, `(g)`, `(aq)`) auf Edukt- und Produktseite vollständig übereinstimmen.

## Rechenbeispiel: Standardbildungsenthalpie von Methan über Verbrennungsdaten

Methan (`CH4`) lässt sich im Labor nicht sauber direkt aus Graphit und Wasserstoff bei Raumtemperatur zu reinem Methan umsetzen. Mit drei einfach im Bombenkalorimeter bestimmbaren Verbrennungsenthalpien (alle bei `298,15 K`, `1 bar`) liefert der Satz von Hess den exakten Wert für die Zielgleichung:

```text
Zielgleichung: C(Graphit) + 2 H2(g) → CH4(g)     ΔrH_ges = ?
```

Gegeben sind folgende drei Teilreaktionen:
* **(1)** `C(Graphit) + O2(g) → CO2(g)` mit `ΔrH_1 = −393,5 kJ/mol`
* **(2)** `H2(g) + 1/2 O2(g) → H2O(l)` mit `ΔrH_2 = −285,8 kJ/mol`
* **(3)** `CH4(g) + 2 O2(g) → CO2(g) + 2 H2O(l)` mit `ΔrH_3 = −890,3 kJ/mol`

**Schritt 1: Teilgleichungen auf die Zielgleichung ausrichten**
* Gleichung (1) liefert `1 mol C(Graphit)` auf der Eduktseite. Sie bleibt unverändert (`k_1 = +1`):
  `C(Graphit) + O2(g) → CO2(g)` | `ΔrH_1' = −393,5 kJ/mol`
* Gleichung (2) muss `2 mol H2(g)` auf der Eduktseite bereitstellen. Wir multiplizieren sie mit `2` (`k_2 = +2`):
  `2 H2(g) + O2(g) → 2 H2O(l)` | `ΔrH_2' = 2 × (−285,8 kJ/mol) = −571,6 kJ/mol`
* Gleichung (3) enthält `CH4(g)` auf der falschen Seite. Wir kehren sie um (`k_3 = −1`):
  `CO2(g) + 2 H2O(l) → CH4(g) + 2 O2(g)` | `ΔrH_3' = +890,3 kJ/mol`

**Schritt 2: Gleichungen addieren und Zwischenstoffe kürzen**
```text
Edukte gesamt:   C(Graphit) + 2 H2(g) + 2 O2(g) + CO2(g) + 2 H2O(l)
Produkte gesamt: CO2(g) + 2 H2O(l) + CH4(g) + 2 O2(g)
```

Sowohl `2 O2(g)` als auch `CO2(g)` und `2 H2O(l)` erscheinen auf beiden Seiten in identischem Aggregatzustand und kürzen sich restlos weg. Es verbleibt exakt die Zielgleichung `C(Graphit) + 2 H2(g) → CH4(g)`.

**Schritt 3: Skalierte Enthalpien summieren**
```text
ΔrH_ges = −393,5 kJ/mol + (−571,6 kJ/mol) + 890,3 kJ/mol
        = −965,1 kJ/mol + 890,3 kJ/mol
        = −74,8 kJ/mol
```

Die Standardbildungsenthalpie von gasförmigem Methan beträgt somit exakt `−74,8 kJ/mol` – ohne jemals Graphit direkt mit Wasserstoff umgesetzt zu haben.

## Anwendungsmatrix: Typische Kreisprozesse des Hess'schen Wärmesatzes

Der Satz von Hess bildet die mathematische Grundlage zahlreicher thermodynamischer Zyklen in Forschung und Analytik:

| Verfahren / Kreisprozess | Gesuchte Zielgröße | Verknüpfte Teilenthalpien | Typischer Anwendungsbereich |
| :--- | :--- | :--- | :--- |
| Verbrennungszyklus | Bildungsenthalpie `ΔfH°` organischer Stoffe | Verbrennungsenthalpien von Verbindung, C und `H2` | Brennwert- und Stabilitätsbestimmung von Kohlenwasserstoffen |
| Born-Haber-Kreisprozess | Gitterenthalpie von Ionenkristallen (`NaCl`, `MgO`) | Sublimation, Dissoziation, Ionisierung, Elektronenaffinität | Festkörperchemie und Werkstoffdesign |
| Hydrierungszyklus | Resonanz- bzw. Delokalisierungsenergie | Hydrierungsenthalpien von Cyclohexen vs. Benzol | Nachweis aromatischer Stabilität (`~150 kJ/mol` bei Benzol) |
| Phasenübergangs-Korrektur | Reaktionsenthalpie im Gas- statt Flüssigzustand | Reaktionsenthalpie plus Verdampfungsenthalpie | Übertragung von Laborwerten auf Gasphasenreaktoren |
| Dissoziations-Zyklus | Mittlere Bindungsenthalpien | Atomisierungs- und Bildungsenthalpien | Abschätzung neuer Molekülstrukturen in der Syntheseplanung |
| Teiloxidations-Kombination | Enthalpie unvollständiger Oxidation (`C → CO`) | Vollständige Verbrennung `C → CO2` minus `CO → CO2` | Metallurgie, Hochofenprozesse und Synthesegaserzeugung |

## Praxisnutzen, Fallstricke und Gültigkeitsgrenzen

Der Hess'sche Wärmesatz spart aufwendige Spezialkalorimetrie und erlaubt die Überprüfung experimenteller Datensätze auf innere Konsistenz: Führen zwei unabhängige Reaktionswege zu abweichenden Summen, liegt mindestens ein Mess- oder Tabellenfehler vor. Das Prinzip gilt analog übrigens auch für die Entropie (`ΔS`) und die Gibbs-Energie (`ΔG`), da beides ebenfalls Zustandsfunktionen sind.

Achten Sie in der Praxis auf vier klassische Stolpersteine:

1. **Verwechslung allotroper Modifikationen**: Kohlenstoff als Graphit (`ΔfH° = 0,0 kJ/mol`) und als Diamant (`ΔfH° = +1,9 kJ/mol`) oder weißer versus roter Phosphor haben unterschiedliche Energieinhalte und dürfen nicht stillschweigend gleichgesetzt werden.
2. **Unsaubere Kürzung bei Phasenunterschieden**: Fällt in einer Teilreaktion flüssiges Wasser an, in einer anderen aber Wasserdampf, bleibt beim Kürzen ein Fehler von `44,0 kJ/mol` je Mol Wasser bestehen. Fügen Sie ggf. die Verdampfungs- oder Kondensationsgleichung als zusätzlichen Hilfsschritt ein.
3. **Abweichende Bezugstemperaturen**: Reaktionen aus unterschiedlichen Temperaturbereichen (etwa `298 K` und `500 K`) dürfen nicht unkorrigiert addiert werden – sie müssen zuvor per Kirchhoffschem Gesetz auf dieselbe Temperatur transformiert werden.
4. **Vorzeichenfehler bei mehrfachem Umstellen**: Schreiben Sie hinter jede angepasste Gleichung stets explizit den Faktor `k_i` und das neue Vorzeichen von `ΔrH_i'`, bevor Sie die Zahlenwerte addieren.
