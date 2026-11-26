---
title: "So berechnen Sie den Mittelwert: Arithmetisch, Geometrisch und Harmonisch"
description: "Wann nutzen Sie arithmetisches, geometrisches oder harmonisches Mittel? Formeln, Ungleichung der Mittelwerte, schrittweises Rechenbeispiel und typische Anwendungsfehler."
category: "Math & Science"
relatedCalculator: "mean-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Welcher Mittelwert ist bei Aktienrenditen und Zinssätzen richtig?"
    answer: "Für zeitlich aufeinanderfolgende Renditen oder Wachstumsraten ist ausschließlich das geometrische Mittel korrekt, angewandt auf die Wachstumsfaktoren (1 + Rendite). Das arithmetische Mittel überschätzt die tatsächliche Wertentwicklung systematisch, weil Verluste prozentual schwerer wiegen als gleich hohe prozentuale Gewinne. Nur bei der Bewertung mehrerer unabhängiger Anlagen im selben Zeitraum wird arithmetisch oder nach Kapitaleinsatz gewichtet gemittelt."
  - question: "Warum muss ich bei Geschwindigkeiten über dieselbe Strecke das harmonische Mittel wählen?"
    answer: "Weil die Geschwindigkeit als Strecke pro Zeit definiert ist und die benötigte Fahrzeit im langsameren Abschnitt überproportional hoch ausfällt. Fahren Sie 100 km mit 60 km/h und 100 km zurück mit 120 km/h, verbringen Sie 1,667 Stunden auf dem Hinweg und nur 0,833 Stunden auf dem Rückweg. Die tatsächliche Durchschnittsgeschwindigkeit von 80 km/h ergibt sich exakt aus dem harmonischen Mittel, während das arithmetische Mittel fälschlich 90 km/h liefert."
  - question: "Was besagt die Ungleichung der Mittelwerte?"
    answer: "Für jede Menge positiver reeller Zahlen gilt stets: Harmonisches Mittel ≤ Geometrisches Mittel ≤ Arithmetisches Mittel. Gleichheit zwischen allen drei Kennzahlen tritt genau dann ein, wenn sämtliche Einzelwerte im Datensatz identisch sind. Je stärker die Zahlen streuen, desto weiter klaffen die drei Mittelwerte auseinander."
  - question: "Können das geometrische und harmonische Mittel auch bei Null oder negativen Zahlen berechnet werden?"
    answer: "Das klassische geometrische und harmonische Mittel setzen strikt positive Werte (x_i > 0) voraus. Enthält ein Datensatz eine Null, wird das Produkt beim geometrischen Mittel sofort null und beim harmonischen Mittel entsteht eine unzulässige Division durch null. Bei negativen prozentualen Veränderungen wie −12 % rechnet man daher zunächst in positive Wachstumsfaktoren (1 − 0,12 = 0,88) um."
  - question: "Wann sollte ich statt eines Mittelwerts besser den Median verwenden?"
    answer: "Der Median (Zentralwert) ist die bessere Wahl bei stark rechtsschiefen oder linksschiefen Verteilungen sowie bei Datensätzen mit extremen Ausreißern – etwa bei Haushaltseinkommen, Immobilienpreisen oder Server-Antwortzeiten. Während ein einzelner Spitzenwert das arithmetische Mittel stark nach oben zieht, bleibt der Median davon unberührt und beschreibt den typischen mittleren Fall realistischer."
---

Wenn im Alltag vom „Durchschnitt“ gesprochen wird, ist fast immer das **arithmetische Mittel** gemeint. In der Finanzmathematik, der Physik und der Statistik führt dieses jedoch bei multiplikativen Wachstumsprozessen oder Verhältniszahlen (wie Renditen, Geschwindigkeiten oder Stückpreisen) zu gravierenden Fehlschlüssen: In solchen Fällen sind das **geometrische** oder das **harmonische Mittel** mathematisch zwingend erforderlich.

Mit unserem [Mittelwertrechner](/de/rechner/mittelwertrechner) berechnen Sie alle drei pythagoreischen Mittelwerte parallel aus demselben Datensatz und erkennen sofort, wie stark sich die Kennzahlen unterscheiden. Dieser Leitfaden stellt die exakten Formeln vor, beweist die Unterschiede anhand konkreter Rechenbeispiele aus Praxis und Finanzen und liefert eine klare Entscheidungshilfe für Ihre Auswertungen.

## Die drei klassischen Mittelwerte im mathematischen Detail

Für einen Datensatz mit `n` Einzelwerten `x_1, x_2, …, x_n` gelten drei klar abgegrenzte Definitionen:

### 1. Das arithmetische Mittel (`x̄`)

Das arithmetische Mittel bildet den Schwerpunkt aller Datenpunkte durch Addition und anschließende Teilung durch die Anzahl `n`:

```text
x̄ = (x_1 + x_2 + … + x_n) / n = (1 / n) × Σ x_i
```

Es eignet sich immer dann, wenn sich Einzelwerte **additiv** zusammensetzen – etwa bei Körpergrößen, Klausurpunkten, monatlichen Stromverbräuchen in kWh oder Temperaturmessungen.

### 2. Das geometrische Mittel (`x̄_geom`)

Das geometrische Mittel multipliziert alle `n` positiven Einzelwerte (`x_i > 0`) und zieht anschließend die `n`-te Wurzel:

```text
x̄_geom = (x_1 × x_2 × … × x_n)^(1 / n)
```

Es ist das Standardmaß für **multiplikative Prozesse** – insbesondere jährliche Wachstumsfaktoren, Inflation, Bevölkerungswachstum oder Kapitalrenditen über aufeinanderfolgende Perioden.

### 3. Das harmonische Mittel (`x̄_harm`)

Das harmonische Mittel bildet den Kehrwert des arithmetischen Mittels der Kehrwerte (ebenfalls für `x_i > 0`):

```text
x̄_harm = n / (1/x_1 + 1/x_2 + … + 1/x_n)
```

Es greift bei **Raten und Quotienten**, wenn der Zähler konstant bleibt (etwa identische Teilstrecken bei variabler Geschwindigkeit oder gleichbleibende Euro-Sparraten bei schwankenden Anteilspreisen, bekannt als Durchschnittskosteneffekt).

### Die Mittelwert-Ungleichung

Für beliebige positive Zahlen gilt stets die fundamentale Ordnung:

```text
x̄_harm ≤ x̄_geom ≤ x̄
```

Gleichheit herrscht ausschließlich dann, wenn alle Zahlen im Datensatz exakt übereinstimmen.

## Schritt-für-Schritt-Vergleich an einem konkreten Beispiel

Betrachten wir zunächst die drei positiven Zahlen `4`, `16` und `64` (`n = 3`), um die unterschiedliche Gewichtung großer und kleiner Werte sichtbar zu machen:

1. **Arithmetisches Mittel (`x̄`):**
   `x̄ = (4 + 16 + 64) / 3 = 84 / 3 = 28,00`
2. **Geometrisches Mittel (`x̄_geom`):**
   `x̄_geom = (4 × 16 × 64)^(1 / 3) = 4.096^(1 / 3) = 16,00`
3. **Harmonisches Mittel (`x̄_harm`):**
   `x̄_harm = 3 / (1/4 + 1/16 + 1/64) = 3 / (16/64 + 4/64 + 1/64) = 3 / (21/64) = 192 / 21 ≈ 9,143`

Wie die Ungleichung vorhersagt, liegt `9,143 ≤ 16,00 ≤ 28,00`: Das harmonische Mittel gewichtet kleine Werte am stärksten, während das arithmetische Mittel vom großen Wert `64` nach oben gezogen wird.

**Praxis-Gegenprobe mit zwei Alltagssituationen:**

- **Kapitalanlage (`1.000 €` über zwei Jahre):** Im ersten Jahr steigt ein Depot um `+50 %` (Faktor `1,50`), im zweiten Jahr fällt es um `−50 %` (Faktor `0,50`). Ein arithmetisches Mittel gäbe `(50 % − 50 %) / 2 = 0 %` vor. Tatsächlich verbleiben `1.000 € × 1,50 × 0,50 = 750 €`, also ein Verlust von `25 %`. Das geometrische Mittel der Faktoren liefert `√(1,50 × 0,50) = √0,75 ≈ 0,8660`, was einer korrekten jährlichen Rendite von `−13,40 %` entspricht (`1.000 € × 0,8660² = 750 €`).
- **Autofahrt über identische Hin- und Rückstrecke:** Sie fahren `100 km` mit `60 km/h` (`1,667 Stunden`) und `100 km` zurück mit `120 km/h` (`0,833 Stunden`). Für insgesamt `200 km` benötigen Sie `2,5 Stunden`, also `200 / 2,5 = 80 km/h`. Genau das liefert das harmonische Mittel: `2 / (1/60 + 1/120) = 80 km/h`.

## Entscheidungstabelle: Welcher Mittelwert passt zu welchem Datentyp?

Die Tabelle fasst die Eigenschaften der drei Mittelwerte zusammen und ergänzt zwei verwandte Lagemaße zur Einordnung:

| Lagemaß | Formel / Prinzip | Zulässige Werte | Ausreißer-Empfindlichkeit | Typisches Praxisbeispiel |
| :--- | :--- | :--- | :--- | :--- |
| Arithmetisches Mittel | `(1 / n) × Σ x_i` | Alle reellen Zahlen | Hoch (reagiert linear) | Durchschnittstemperatur, Punktzahlen, Messreihen |
| Geometrisches Mittel | `(Π x_i)^(1 / n)` | Nur `x_i > 0` | Mittel (dämpft Ausreißer) | Mehrjährige Renditen, Inflations- und Wachstumsraten |
| Harmonisches Mittel | `n / Σ (1 / x_i)` | Nur `x_i > 0` | Sehr sensibel für kleine Werte | Durchschnittsgeschwindigkeit (gleiche Strecke), KGV |
| Gewichtetes Mittel | `Σ (w_i × x_i) / Σ w_i` | Alle reellen Zahlen | Abhängig von Gewichten `w_i` | Notendurchschnitt nach Credits, Depotrendite |
| Median (Vergleich) | Mittlerer Wert der sortierten Reihe | Alle reellen Zahlen | Sehr robust | Einkommensverteilung, Immobilienpreise |

## Ausreißer, Nullwerte und häufige Anwendungsfehler

Bei der Auswertung realer Datensätze führen vier typische Fehler zu falschen Kennzahlen:

1. **Prozentwerte direkt geometrisch mitteln:** Geben Sie niemals Prozentzahlen wie `+10 %` und `−5 %` direkt in die Wurzelformel ein. Wandeln Sie jede Veränderungsrate zuvor in ihren Wachstumsfaktor `1 + r` um (`1,10` und `0,95`), bilden das geometrische Mittel (`√1,045 ≈ 1,02225`) und ziehen erst am Schluss `1` ab (`+2,23 %` pro Periode). Bei einem Totalverlust (`−100 %`, Faktor `0`) bleibt auch die Gesamtrendite dauerhaft null.
2. **Strecken- und Zeitgewichtung verwechseln:** Fahren Sie nicht dieselbe Strecke, sondern jeweils exakt **eine Stunde** lang `60 km/h` und `120 km/h`, ist die Zeit im Zähler/Nenner gleich gewichtet – dann beträgt die Durchschnittsgeschwindigkeit `90 km/h` (arithmetisches Mittel). Prüfen Sie bei Raten stets, welche Größe konstant bleibt.
3. **Unkritischer Einsatz bei schiefen Verteilungen:** Bei Einkommen in Deutschland, Österreich oder der Schweiz liegt das arithmetische Mittel durch einzelne Spitzenverdiener deutlich über dem Medianeinkommen. Dokumentieren Sie bei stark schiefen Daten stets beide Werte.
4. **Numerischer Überlauf bei vielen Faktoren:** Das Produkt von `500` Wachstumsfaktoren kann je nach Größenordnung in Software zu Über- oder Unterläufen führen. Nutzen Sie für große `n` die logarithmische Umformung `x̄_geom = exp((1 / n) × Σ ln(x_i))`, die exakt dasselbe Ergebnis numerisch stabil liefert.
