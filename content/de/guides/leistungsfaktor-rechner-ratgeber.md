---
title: "Leistungsfaktor: Die Bierglas-Analogie"
description: "Verstehen Sie den Leistungsfaktor (cos φ) mit der Bierglas-Analogie: Wirkleistung, Blindleistung, Scheinleistung und Blindstromkompensation exakt berechnen."
category: "Math & Science"
relatedCalculator: "power-factor-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen cos φ und dem gesamten Leistungsfaktor?"
    answer: "Der Verschiebungsfaktor cos φ beschreibt ausschließlich die Phasenverschiebung zwischen Spannung und Grundschwingungsstrom bei rein sinusförmigen Signalen. Der gesamte Leistungsfaktor λ = P / S berücksichtigt zusätzlich Verzerrungsblindleistung durch Oberschwingungen, wie sie Schaltnetzteile oder Frequenzumrichter erzeugen. Bei reinen Linearlasten sind beide Werte identisch; bei nichtlinearen Lasten ist λ stets kleiner als cos φ."
  - question: "Warum verlangen Netzbetreiber einen Leistungsfaktor von mindestens 0,90 oder 0,95?"
    answer: "Ein niedriger Leistungsfaktor bedeutet einen hohen Blindstromanteil im Netz. Dieser Blindstrom verrichtet keine mechanische oder thermische Nutzarbeit, belastet aber Transformatoren, Schaltanlagen und Kabel mit zusätzlichen ohmschen Verlusten (I² × R). Um das Verteilnetz zu entlasten, legen Netzbetreiber in ihren Technischen Anschlussbedingungen (TAB) meist einen Zielbereich zwischen cos φ = 0,90 und 0,95 fest."
  - question: "Wie lässt sich ein schlechter Leistungsfaktor in der Praxis verbessern?"
    answer: "Induktive Blindleistung von Motoren, Transformatoren und Drosseln wird durch parallel geschaltete Kondensatorbänke (Blindleistungskompensationsanlagen) ausgeglichen. Bei Anlagen mit hohem Oberschwingungsanteil kommen verdrosselte Kompensationsanlagen oder aktive Oberschwingungsfilter zum Einsatz, um schädliche Resonanzen im Stromnetz zu verhindern."
  - question: "Schadet eine Überkompensation des Leistungsfaktors dem Stromnetz?"
    answer: "Ja. Wird mehr kapazitive Blindleistung eingespeist, als die Verbraucher induktiv benötigen, kippt der Leistungsfaktor in den kapazitiven Bereich (vorauseilender Strom). Das kann insbesondere bei Schwachlast am Wochenende zu unzulässigen Spannungsanhebungen im Betriebsnetz führen, Schutzeinrichtungen auslösen und Kondensatoren thermisch überlasten."
  - question: "Zahlen Privathaushalte in Deutschland für Blindleistung auf ihrer Stromrechnung?"
    answer: "Nein, herkömmliche Haushaltszähler erfassen ausschließlich die bezogene Wirkarbeit in Kilowattstunden (kWh). Eine separate Abrechnung von Blindmehrarbeit (kvarh) erfolgt üblicherweise erst bei Gewerbe- und Industriekunden mit registrierender Leistungsmessung (RLM), sobald der vereinbarte Schwellenwert (oft tan φ > 0,48 bzw. cos φ < 0,90) überschritten wird."
---

Bei Wechselstrom (AC) wird nicht die gesamte vom Netz bereitgestellte elektrische Leistung in nutzbare mechanische Arbeit, Wärme oder Licht umgesetzt. Ein Teil der Energie pendelt lediglich zwischen Stromnetz und den Magnetfeldern induktiver Verbraucher wie Elektromotoren oder Transformatoren hin und her. Der Leistungsfaktor beschreibt das Verhältnis zwischen dieser tatsächlich genutzten Wirkleistung und der gesamten bereitgestellten Scheinleistung — anschaulich erklärt durch die klassische Bierglas-Analogie.

Mit dem [Leistungsfaktor-Rechner](/de/rechner/leistungsfaktor-rechner) ermitteln Sie aus Wirkleistung, Scheinleistung, Spannung und Stromstärke unmittelbar den Leistungsfaktor, den Phasenwinkel sowie die erforderliche Kompensationsblindleistung. Während ein idealer Wert von `1,0` maximale Netzeffizienz bedeutet, führen Werte unter `0,90` in Gewerbebetrieben häufig zu höheren Leitungsverlusten, überlasteten Transformatoren und spürbaren Blindstromzuschlägen auf der Stromrechnung.

## Die Bierglas-Analogie und die drei Leistungsarten

Stellen Sie sich ein frisch gezapftes Glas Bier vor: Nur die Flüssigkeit löscht Ihren Durst, doch der Schaum gehört physikalisch dazu und füllt das Glas bis zum Rand. In der Elektrotechnik entspricht dieses Bild exakt dem Zusammenhang zwischen Wirk-, Blind- und Scheinleistung:

* **Wirkleistung P (das flüssige Bier, Einheit kW):** Das ist die tatsächlich nutzbare Leistung, die in Maschinen Antriebsarbeit leistet, Heizstäbe erwärmt oder Räume beleuchtet. Sie wird am Stromzähler als Energieverbrauch in Kilowattstunden (kWh) erfasst.
* **Blindleistung Q (der Bierschaum, Einheit kvar):** Sie baut magnetische Wechselfelder in Motoren, Drosseln und Transformatoren auf (induktive Blindleistung) oder lädt elektrische Felder in Kondensatoren und langen Kabeln (kapazitive Blindleistung). Die Energie wird jede Halbwelle kurzzeitig geborgt und ungenutzt ins Netz zurückgespeist.
* **Scheinleistung S (das gesamte Glasvolumen, Einheit kVA):** Sie bildet die geometrische Summe aus Wirk- und Blindleistung. Generatoren, Transformatoren, Sicherungen und Leitungen müssen stets für diese Gesamtleistung dimensioniert werden — selbst dann, wenn der „Schaumanteil“ hoch ist.

## Mathematische Grundlagen und Formeln

Bei rein sinusförmigen Spannungen und Strömen bilden die drei Leistungsarten ein rechtwinkliges Dreieck, das sogenannte Leistungsdreieck. Der Winkel `φ` (Phi) entspricht der Phasenverschiebung zwischen Strom- und Spannungsverlauf.

```text
Scheinleistung (einphasig):     S = U × I
Scheinleistung (Drehstrom):     S = √3 × U × I
Leistungsdreieck (Pythagoras):  S = √(P² + Q²)
Blindleistung:                  Q = √(S² − P²) = P × tan(φ)
Leistungsfaktor:                PF = cos(φ) = P / S
```

Dabei stehen folgende Größen für die physikalischen Parameter:

* `P` = Wirkleistung in Watt (`W`) oder Kilowatt (`kW`)
* `Q` = Blindleistung in Voltampere reaktiv (`var`) oder Kilovoltampere reaktiv (`kvar`)
* `S` = Scheinleistung in Voltampere (`VA`) oder Kilovoltampere (`kVA`)
* `U` = Außenleiterspannung im Drehstromnetz (in Deutschland und der EU standardmäßig `400 V`) bzw. Strangspannung (`230 V`)
* `I` = Leiterstrom in Ampere (`A`)

Soll eine Anlage von einem Ist-Leistungsfaktor `cos(φ₁)` auf einen Zielwert `cos(φ₂)` kompensiert werden, berechnet sich die erforderliche kapazitive Kompensationsleistung `Q_C` über die Differenz der Tangenswerte:

```text
Q_C = P × [tan(arccos(cos φ₁)) − tan(arccos(cos φ₂))]
```

## Schritt-für-Schritt-Rechenbeispiel aus der Praxis

Ein mittelständischer Metallverarbeitungsbetrieb betreibt mehrere Drehstrom-Asynchronmotoren an einem `400-V`-Drehstromnetz. Am Hauptverteiler werden eine Wirkleistung von `P = 48 kW` und ein Außenleiterstrom von `I = 92,38 A` gemessen. Gesucht sind der aktuelle Leistungsfaktor, die Blindleistung sowie die notwendige Kompensationsanlage für den Zielwert `cos(φ₂) = 0,95`.

1. **Scheinleistung S berechnen:**  
   `S = √3 × 400 V × 92,38 A ≈ 1,73205 × 400 × 92,38 = 64.003 VA ≈ 64,0 kVA`.  
   Obwohl nur `48 kW` genutzt werden, belasten die Leitungen das Netz mit `64,0 kVA`.
2. **Leistungsfaktor cos(φ₁) bestimmen:**  
   `cos(φ₁) = 48 kW / 64,0 kVA = 0,75`.  
   Dieser Wert liegt deutlich unter der typischen Netzbetreiber-Vorgabe von `0,90`.
3. **Aktuelle Blindleistung Q₁ ermitteln:**  
   `Q₁ = √(64,0² − 48,0²) = √(4.096 − 2.304) = √1.792 ≈ 42,33 kvar`.
4. **Kompensationsleistung Q_C für cos(φ₂) = 0,95 berechnen:**  
   Für `cos(φ₁) = 0,75` gilt `φ₁ ≈ 41,41°` (`tan φ₁ ≈ 0,8819`).  
   Für `cos(φ₂) = 0,95` gilt `φ₂ ≈ 18,19°` (`tan φ₂ ≈ 0,3287`).  
   Daraus folgt: `Q_C = 48 kW × (0,8819 − 0,3287) = 48 × 0,5532 ≈ 26,55 kvar`.
5. **Einsparung beim Leiterstrom prüfen:**  
   Nach Installation einer geregelten `27,5-kvar`-Kondensatorbank sinkt die neue Scheinleistung auf `S₂ = 48 kW / 0,95 ≈ 50,53 kVA`. Der Leiterstrom fällt auf `I₂ = 50.526 VA / (√3 × 400 V) ≈ 72,93 A` — eine Entlastung um `21 %`. Da Leitungsverluste quadratisch mit dem Strom steigen (`P_v = I² × R`), sinken die thermischen Verluste in den Zuleitungen um rund `37,7 %`.

## Benchmark-Tabelle: Typische Verbraucher im Vergleich

Je nach Schaltungsprinzip und Auslastung unterscheiden sich elektrische Betriebsmittel erheblich in ihrem Leistungsfaktor und der Art der Blindleistung.

| Verbrauchertyp | Typischer Leistungsfaktor | Blindleistungsart | Belastung im Netz | Praxisempfehlung |
| :--- | :--- | :--- | :--- | :--- |
| Ohmsche Heizung / Backofen | `1,00` | Keine (`Q = 0`) | Rein wirkleistungsbezogen | Keine Kompensation nötig |
| Moderne Schaltnetzteile mit PFC | `0,95–0,99` | Gering kapazitiv / verzerrt | Minimal, normkonform | Aktive PFC bereits integriert |
| Drehstrom-Asynchronmotor (Volllast) | `0,85–0,90` | Induktiv (nacheilend) | Moderat | Einzelkompensation ab ca. `15 kW` prüfen |
| Drehstrom-Asynchronmotor (Teillast) | `0,50–0,70` | Stark induktiv | Hoch, schlechter Wirkungsgrad | Überdimensionierung vermeiden, Sanftanlauf |
| Schweißtransformator (konventionell) | `0,50–0,65` | Stark induktiv | Sehr hohe Stromspitzen | Festkompensation direkt am Gerät |
| Einfache LED-Treiber / Netzteile ohne PFC | `0,55–0,65` | Verzerrungsblindleistung | Oberschwingungsströme | Verdrosselte Kompensation oder Filter |

## Typische Fehler, Oberschwingungen und regulatorische Vorgaben

In der industriellen und gewerblichen Praxis führt das Gleichsetzen von `cos(φ)` und Gesamt-Leistungsfaktor `λ` häufig zu Fehlplanungen. Während klassische Motoren eine reine Grundschwingungs-Phasenverschiebung verursachen, ziehen Frequenzumrichter, Gleichrichter und unterbrechungsfreie Stromversorgungen (USV) nicht-sinusförmige, impulsförmige Ströme. Diese Oberschwingungen erzeugen sogenannte Verzerrungsblindleistung, die sich mit normalen Kondensatoren nicht kompensieren lässt — unverdrosselte Kondensatoren können im Gegenteil mit der Netzinduktivität in Resonanz geraten und durchbrennen.

Ein zweiter verbreiteter Irrtum betrifft die Blindstromabrechnung im DACH-Raum. In Deutschland berechnen Verteilnetzbetreiber Gewerbekunden mit registrierender Leistungsmessung (üblicherweise ab `100.000 kWh` Jahresverbrauch) Blindmehrarbeit oft mit `1,0 bis 2,0 Cent pro kvarh`, sobald mehr als `50 %` der Wirkarbeit als Blindarbeit anfallen (`tan φ > 0,5` bzw. `cos φ < 0,894`). Zudem verpflichten die Technischen Anschlussregeln (VDE-AR-N 4105 für Niederspannung und VDE-AR-N 4110 für Mittelspannung) Photovoltaik-Wechselrichter und Erzeugungsanlagen dazu, je nach Netzspannung gezielt induktive oder kapazitive Blindleistung zur Spannungshaltung bereitzustellen. Achten Sie bei Bestandsmessungen daher stets darauf, nicht nur den Verschiebungsfaktor `cos(φ)`, sondern auch den Total Harmonic Distortion (`THD_I`) sowie den Gesamtleistungsfaktor mit einem Netzanalysator zu erfassen.
