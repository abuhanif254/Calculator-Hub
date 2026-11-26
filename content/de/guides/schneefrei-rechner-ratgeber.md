---
title: "Schneefrei-Rechner: Fällt die Schule aus?"
description: "Erfahren Sie, welche meteorologischen und infrastrukturellen Kriterien zu witterungsbedingtem Schulausfall führen und wie der Schneefrei-Rechner Wahrscheinlichkeiten bewertet."
category: "Productivity & Utilities"
relatedCalculator: "snow-day-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Ab wie viel Zentimetern Neuschnee fällt in Deutschland, Österreich oder der Schweiz die Schule aus?"
    answer: "Es gibt im DACH-Raum keinen einheitlichen gesetzlichen Schwellenwert in Zentimetern. Entscheidend ist nicht die absolute Schneehöhe allein, sondern ob der Schülertransport und ein gefahrloser Schulweg gewährleistet sind. In alpinen Regionen läuft der Unterricht bei 30 cm Neuschnee oft regulär weiter, während im norddeutschen Flachland schon 10 cm starker Nassschnee zur Schulschließung führen können."
  - question: "Warum führt Blitzeis häufiger zu Schulausfall als starker Schneefall?"
    answer: "Gefrierender Regen überzieht Fahrbahnen und Gehwege binnen Minuten mit einer geschlossenen Eisdecke, auf der selbst Winterreifen und schwere Schulbusse kaum Haftung finden. Anders als bei trockenem Pulverschnee versagen mechanische Schneepflüge bei Glatteis, und Streusalz wirkt bei starkem Regen oder extremer Kälte nur verzögert."
  - question: "Wie wirkt sich der Zeitpunkt des Schneefalls auf die Entscheidung der Schulbehörden aus?"
    answer: "Fällt der Hauptniederschlag vor Mitternacht, haben kommunale Winterdienste bis zum Morgen ausreichend Zeit, Hauptstraßen und Bushaltestellen zu räumen. Setzt starker Schneefall jedoch erst zwischen 04:30 Uhr und 07:30 Uhr ein, fallen die kritischsten Straßenverhältnisse exakt in das Zeitfenster der morgendlichen Schulbusfahrten."
  - question: "Wer entscheidet rechtlich über den witterungsbedingten Schulausfall und was gilt für die Notbetreuung?"
    answer: "In Deutschland liegt die Zuständigkeit je nach Bundesland bei den Landkreisen, kreisfreien Städten (als Träger der Schülerbeförderung) oder den Schulleitungen vor Ort; in Österreich und der Schweiz entscheiden ebenfalls Bezirks-, Kantons- oder Schulbehörden. Fällt der Präsenzunterricht aus, müssen Grundschulen und Unterstufen in der Regel eine Notbetreuung für Kinder anbieten, deren Eltern nicht kurzfristig zu Hause bleiben können."
  - question: "Wie zuverlässig ist ein Schneefrei-Rechner im Vergleich zu offiziellen Wetterwarnungen?"
    answer: "Ein Schneefrei-Rechner bündelt lokale Wetterparameter und regionale Infrastrukturdaten zu einer statistischen Wahrscheinlichkeitsprognose und hilft bei der frühzeitigen Vorbereitung. Verbindlich sind jedoch ausschließlich die offiziellen Bekanntgaben der Schulträger, Landratsämter oder Kultusministerien über Schulportale, Lokalradio und Warn-Apps wie NINA oder KATWARN."
---

Ob ein Wintereinbruch zum witterungsbedingten Schulausfall führt, hängt selten von einer einzelnen Zentimeterzahl auf dem Lineal ab. Maßgeblich ist das Zusammenspiel aus Niederschlagszeitpunkt, Eisbildung, gefühlter Temperatur (Windchill) sowie der Leistungsfähigkeit des örtlichen Winterdienstes und der Schülerbeförderung. Besonders zwischen 05:00 Uhr und 07:30 Uhr morgens entscheidet oft ein enges Zeitfenster darüber, ob Schulbusse Haupt- und Nebenstrecken sicher befahren können.

Unser [Schneefrei-Rechner](/de/rechner/schneefreier-tag-rechner) gewichtet genau diese meteorologischen und geografischen Einflussgrößen zu einer realistischen Ausfallwahrscheinlichkeit in Prozent. Im Folgenden lernen Sie die mathematischen Schwellenwerte hinter der Prognose kennen, vergleichen Stadt- und Landkreise anhand eines durchgerechneten Wintersturmszenarios und erfahren, welche rechtlichen Vorgaben im DACH-Raum greifen.

## Entscheidungsfaktoren und Bewertungsmodell für Schulausfall

Behörden und Prognosemodelle bewerten nicht die Schneemenge isoliert, sondern die kombinierte Gefährdung des Schulwegs. Ein typisches Gewichtungsmodell kombiniert fünf Kernvariablen:

```text
Ausfall-Index = f(Neuschnee S, Zeitfenster T_f, Glättefaktor E, Windchill T_wc, Region R)

Windchill (für T ≤ 10 °C und Wind v > 4,8 km/h):
T_wc = 13,12 + 0,6215 × T − 11,37 × v^0,16 + 0,3965 × T × v^0,16
```

Die Parameter bedeuten im Einzelnen:

* **Neuschneemenge (`S` in `cm`):** Trockener Pulverschnee bei starkem Frost lässt sich leicht beiseiteräumen; schwerer, pappiger Nassschnee um `0 °C` verursacht dagegen Schneebruch an Bäumen, blockierte Weichen und feststeckende Busse.
* **Niederschlagszeitfenster (`T_f`):** Entscheidend ist die Überlappung mit der morgendlichen Räum- und Pendlerphase zwischen `05:00` und `08:00 Uhr`. Fällt derselbe Niederschlag am späten Abend, sinkt das Ausfallrisiko massiv.
* **Eisregen- und Blitzeisrisiko (`E`):** Gefrierender Regen auf tiefgefrorenem Boden führt oft schon ohne nennenswerte Schneedecke zur sofortigen Einstellung des Busverkehrs.
* **Windchill (`T_wc` in `°C`):** Starke Böen entziehen dem Körper deutlich schneller Wärme als Windstille. Zudem treibt Wind bei Temperaturen unter `−2 °C` trockenen Schnee zu hohen Verwehungen auf freie Landstraßen zusammen.
* **Regionale Infrastruktur (`R`):** Dichte Stadtgebiete verfügen über priorisierte Räumrouten und schienengebundene Alternativen (S-Bahn, Straßenbahn). Flächenlandkreise sind dagegen auf kurvige Kreisstraßen und regionale Buslinien angewiesen.

## Schritt-für-Schritt-Beispiel: Stadt vs. ländlicher Landkreis bei Wintersturm

Betrachten wir ein konkretes Szenario an einem Werktagmorgen: Der Wetterdienst prognostiziert zwischen `04:30` und `07:30 Uhr` rund `14 cm` Nassschnee, vereinzelt durchsetzt mit gefrierendem Regen. Die Lufttemperatur beträgt `T = −4,0 °C`, der Ostwind weht mit `v = 35 km/h`.

1. **Windchill-Temperatur exakt berechnen:**  
   Zunächst wird der Potenzterm der Windgeschwindigkeit ermittelt: `35^0,16 ≈ 1,767`.  
   Eingesetzt in die Formel:  
   `T_wc = 13,12 + 0,6215 × (−4,0) − 11,37 × 1,767 + 0,3965 × (−4,0) × 1,767`  
   `T_wc = 13,12 − 2,49 − 20,09 − 2,80 = −12,26 °C`.  
   Wartende Kinder an ungeschützten Bushaltestellen sind damit einer gefühlten Temperatur von rund `−12,3 °C` ausgesetzt, während die Böen den Neuschnee verwehen.
2. **Fall A — Großstadt mit S-Bahn- und Straßenbahnnetz:**  
   Die `14 cm` fallen zwar ungünstig in den Berufsverkehr, doch Hauptverkehrsachsen werden im Schichtbetrieb geräumt und gesalzen. Selbst wenn Buslinien verspätet fahren, erreichen Schüler die Schule vielfach per U- oder S-Bahn. Die statistische Ausfallwahrscheinlichkeit liegt hier typischerweise bei lediglich `25 bis 40 %`.
3. **Fall B — Ländlicher Flächenlandkreis mit Buspflicht:**  
   Schulbusse müssen enge Verbindungsstraßen zwischen Dörfern befahren, die im Winterdienst erst nach Autobahnen und Bundesstraßen geräumt werden. Durch die Kombination aus `14 cm` Nassschnee im Morgenfenster, lokalem Eisregen und Schneeverwehungen bei `35 km/h` Wind steigt die Wahrscheinlichkeit einer kreisweiten Einstellung des Schülerverkehrs und des Präsenzunterrichts auf `75 bis 85 %`.

## Szenario-Matrix: Witterungsschwellen nach Regionstyp

Die folgende Übersicht zeigt typische Schwellenwerte und die jeweiligen Hauptengpässe, anhand derer sich das Risiko je nach Wohnort einordnen lässt.

| Wetterszenario | Schnee / Eis | Zeitfenster | Risiko (Stadt) | Risiko (Land) | Maßgeblicher Engpass |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mäßiger Nachtschnee | `8–12 cm` trocken | `21:00–02:00 Uhr` | `5–10 %` | `15–25 %` | Räumdienst schafft Hauptrouten vor `06:00 Uhr` |
| Starker Berufsverkehr-Schnee | `15–20 cm` nass | `04:30–08:00 Uhr` | `40–55 %` | `75–90 %` | Überlastete Räumfahrzeuge und Staus |
| Gefrierender Regen (Blitzeis) | `0–2 cm` Eispanzer | `03:00–07:30 Uhr` | `65–80 %` | `85–95 %` | Unkontrollierbare Bremswege für Schulbusse |
| Extremfrost mit Sturm | `−15 °C`, `50 km/h` | Ganztags | `15–25 %` | `45–65 %` | Ausfall von Diesel-Bussen, Schneeverwehungen |
| Schneeverwehungen | `5–10 cm`, `60 km/h` | `02:00–07:00 Uhr` | `10–20 %` | `60–80 %` | Zugewehte freie Landstraßen trotz Räumung |
| Wochenende / Ferienbeginn | `25 cm` | Samstag / Sonntag | `0 %` | `0 %` | Kein regulärer Unterrichtsbetrieb |

## Rechtliche Rahmenbedingungen im DACH-Raum und Grenzen von Prognosen

Im Gegensatz zu einigen US-Bundesstaaten kennt der deutschsprachige Raum keine landesweit starren Auslösewerte. In Deutschland greifen föderale Zuständigkeiten: In Flächenländern wie Niedersachsen, Bayern oder Schleswig-Holstein ordnen meist die Landkreise oder kreisfreien Städte den Unterrichtsausfall an, sobald die sichere Schülerbeförderung nicht mehr gewährleistet ist. In anderen Bundesländern entscheiden die Schulleitungen vor Ort nach Rücksprache mit den Verkehrsbetrieben. Ähnlich flexibel handeln Bezirks- und Kantonsbehörden in Österreich und der Schweiz, wo alpine Gemeinden an deutlich größere Schneemengen angepasst sind als Tieflandregionen.

Zwei wichtige Praxisregeln sollten Eltern und Lehrkräfte beachten:

* **Zumutbarkeit und elterliche Entscheidung:** Selbst wenn offiziell kein landkreisweiter Schulausfall ausgerufen wird, können Erziehungsberechtigte in den meisten Bundesländern ihre Kinder zu Hause behalten, sofern sie den konkreten Schulweg wegen extremer lokaler Glätte für unzumutbar halten; eine unverzügliche Abmeldung bei der Schule ist dabei Pflicht.
* **Notbetreuung und Distanzunterricht:** Fällt der reguläre Präsenzunterricht aus, gewährleisten Grundschulen und oft auch die Klassenstufen 5 und 6 eine verlässliche Notbetreuung im Schulgebäude, während ältere Jahrgänge teilweise auf digitale Aufgaben im Distanzunterricht umgestellt werden.

Beachten Sie abschließend die Grenzen jeder rechnerischen Vorhersage: Kurzfristige Temperaturumschwünge von nur `1 °C` rund um den Gefrierpunkt entscheiden oft darüber, ob Regen harmlos abfließt oder spiegelglatt gefriert. Verlassen Sie sich für die endgültige Entscheidung am Morgen deshalb immer auf die amtlichen Unwetterwarnungen (DWD, GeoSphere Austria, MeteoSchweiz) und die offiziellen Meldungen Ihres Schulträgers.
