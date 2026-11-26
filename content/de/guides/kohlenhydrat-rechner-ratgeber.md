---
title: "Kohlenhydrat-Rechner: Makros richtig managen"
description: "Berechnen Sie Ihren täglichen Kohlenhydratbedarf wissenschaftlich fundiert – mit Mifflin-St-Jeor-Formel, PAL-Faktoren, Netto-Kohlenhydraten und Praxistabellen für Diät, Alltag und Muskelaufbau."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "carbohydrate-calculator"
relatedType: "calculator"
faqs:
  - question: "Wie unterscheiden sich Gesamt- und Netto-Kohlenhydrate auf EU-Nährwerttabellen?"
    answer: "In den USA und Kanada umfasst die Angabe ‚Total Carbohydrates‘ auch unverdauliche Ballaststoffe, die für Netto-Kohlenhydrate abgezogen werden müssen. In Deutschland, Österreich und der Schweiz gilt die EU-Lebensmittelinformationsverordnung (LMIV): Ballaststoffe sind auf der Nährwerttabelle bereits separat ausgewiesen und nicht in den ‚Kohlenhydraten‘ enthalten. Der abgedruckte Kohlenhydratwert entspricht im DACH-Raum daher schon den verwertbaren Netto-Kohlenhydraten, sofern keine Zuckeralkohole (Polyole) enthalten sind."
  - question: "Wie viel Gramm Kohlenhydrate pro Tag empfiehlt die DGE im Vergleich zu Low-Carb?"
    answer: "Die Deutsche Gesellschaft für Ernährung (DGE) empfiehlt gesunden Erwachsenen als Richtwert, mindestens 50 % der täglichen Gesamtenergie über Kohlenhydrate zu decken – das entspricht bei 2.200 kcal etwa 275 g pro Tag, bevorzugt aus Vollkornprodukten, Hülsenfrüchten und Gemüse. Bei einer moderaten Low-Carb-Ernährung liegt der Anteil bei 20 bis 35 % (ca. 100 bis 180 g), während eine strikte ketogene Diät die Zufuhr auf 20 bis 50 g täglich begrenzt."
  - question: "Warum sinkt das Körpergewicht bei einer Kohlenhydratreduktion in der ersten Woche so schnell?"
    answer: "Jedes Gramm in Leber und Muskulatur gespeichertes Glykogen bindet physiologisch rund 3 g Wasser. Reduzieren Sie die Kohlenhydratzufuhr stark, entleeren sich die Glykogenspeicher innerhalb von 48 bis 72 Stunden und scheiden das gebundene Wasser über die Nieren aus. Ein Gewichtsverlust von 1,5 bis 2,5 kg in den ersten Tagen besteht daher überwiegend aus Wasser und Glykogen, noch nicht aus abgebautem Körperfett."
  - question: "Welche Rolle spielen glykämischer Index (GI) und glykämische Last (GL)?"
    answer: "Der glykämische Index misst auf einer Skala bis 100, wie schnell 50 g verwertbare Kohlenhydrate eines Lebensmittels den Blutzucker ansteigen lassen. Die glykämische Last berücksichtigt zusätzlich die reale Portionsgröße nach der Formel GL = (GI × verwertbare Kohlenhydrate in g) / 100. Dadurch lässt sich alltagsnah beurteilen, ob eine Mahlzeit zu starken Insulinspitzen führt oder eine gleichmäßige Energieversorgung liefert."
  - question: "Wann sollte die Kohlenhydratzufuhr rund um das Training geplant werden?"
    answer: "Für intensive Kraft- oder Ausdauereinheiten über 60 Minuten empfiehlt sich eine leicht verdauliche, fettarme Kohlenhydratmahlzeit 2 bis 3 Stunden vor Beginn (etwa 1 bis 2 g pro Kilogramm Körpergewicht). Nach dem Training unterstützt die Kombination aus Kohlenhydraten und hochwertigem Protein (Verhältnis rund 3:1) die rasche Wiederauffüllung der Muskelglykogenspeicher, besonders wenn am selben oder nächsten Tag erneut trainiert wird."
---

Eine bedarfsgerechte Steuerung der Kohlenhydratzufuhr entscheidet darüber, ob Sie Körperfett abbauen, Ausdauerleistung steigern oder Muskelmasse aufbauen. Da Kohlenhydrate abhängig von Grundumsatz, Alltagsbewegung und Trainingsintensität verstoffwechselt werden, führt eine pauschal geschätzte Reduktion oft zu Leistungseinbrüchen. Mit dem [Kohlenhydrat-Rechner](/de/rechner/kohlenhydrat-rechner) ermitteln Sie Ihren exakten Tagesbedarf in Gramm – abgestimmt auf Körperdaten und Stoffwechselziel.

Kohlenhydrate liefern als primärer Energieträger für Gehirn, Erythrozyten und Muskulatur rund `4 kcal` pro Gramm (exakt `4,1 kcal` nach Atwater). Während beim Fettabbau eine moderate Begrenzung den Fettstoffwechsel entlastet, erfordern intensive Kraft- und Ausdauerbelastungen gefüllte Glykogenspeicher. Entscheidend ist die Verknüpfung aus Energieumsatz, Makroverteilung und Lebensmittelqualität.

## Methodik, Formeln und Berechnungsgrundlagen

Ein Makronährstoff-Rechner arbeitet in drei Schritten. Zuerst bestimmt er den Grundumsatz (**BMR**) nach der klinisch validierten **Mifflin-St-Jeor-Gleichung**:

```text
Männer: BMR = (10 × Gewicht_kg) + (6,25 × Größe_cm) − (5 × Alter_Jahre) + 5
Frauen: BMR = (10 × Gewicht_kg) + (6,25 × Größe_cm) − (5 × Alter_Jahre) − 161
```

Anschließend wird der BMR mit dem Aktivitätsfaktor (**PAL**) multipliziert: `1,2` bei sitzender Tätigkeit ohne Sport, `1,375` bei ein bis zwei leichten Einheiten pro Woche, `1,55` bei moderatem Sport an drei bis fünf Tagen und `1,725` bei täglichem intensivem Training. Auf diesen Gesamtumsatz (TDEE) folgt die Zielanpassung (`Δkcal`), etwa `−300` bis `−500 kcal` zum Abnehmen oder `+250` bis `+400 kcal` für den Aufbau:

```text
Zielkalorien = (BMR × PAL) + Zielanpassung_kcal
Kohlenhydrate (g) = (Zielkalorien × KH_Anteil) / 4
```

### Verwertbare Kohlenhydrate vs. Ballaststoffe

Englischsprachige Apps verwenden häufig die Formel `Netto-Kohlenhydrate = Gesamtkohlenhydrate − Ballaststoffe`. Im DACH-Raum gilt jedoch die EU-Lebensmittelinformationsverordnung (LMIV): Ballaststoffe stehen auf der Nährwerttabelle separat und sind **nicht** in den „Kohlenhydraten“ enthalten. Ein erneuter Abzug würde Ihre Bilanz verfälschen. Lediglich unverdauliche Anteile von Zuckeralkoholen (Polyolen wie Erythrit mit bis zu `100 %` oder Maltit mit rund `40 %`) lassen sich bei Bedarf herausrechnen.

### Kohlenhydratqualität: Glykämischer Index und Ballaststoffdichte

Entscheidend für Sättigung und Blutzuckerstabilität ist neben der reinen Grammzahl die Molekülstruktur. Vollkorngetreide, Hülsenfrüchte, Haferflocken und stärkeärmeres Gemüse besitzen einen niedrigen bis mittleren glykämischen Index (GI unter `55`) und geben Glukose langsam in den Blutkreislauf ab. Isolierte Zucker, Weißmehlprodukte und gesüßte Snacks treiben den Blutzuckerspiegel dagegen steil nach oben, provozieren eine überschießende Insulinausschüttung und begünstigen Heißhungerattacken zwei bis drei Stunden nach der Mahlzeit. Als praxistaugliche Faustregel sollten mindestens `80 %` Ihrer täglichen Kohlenhydrate aus unverarbeiteten, ballaststoffreichen Quellen stammen; rund um intensive Belastungen dürfen leicht verdauliche Kohlenhydrate gezielt als schneller Energieträger eingesetzt werden.

## Schritt-für-Schritt-Rechenbeispiel aus der Praxis

Ein `34-jähriger` Mann (`82 kg`, `180 cm`) trainiert dreimal pro Woche und geht 7.000 Schritte täglich (PAL `1,55`). Er strebt ein Kaloriendefizit von `400 kcal` bei `40 %` Kohlenhydraten, `30 %` Protein und `30 %` Fett an.

1. **Grundumsatz (BMR):** `(10 × 82) + (6,25 × 180) − (5 × 34) + 5 = 820 + 1.125 − 170 + 5 = 1.780 kcal`.
2. **Gesamtumsatz (TDEE) und Zielkalorien:** `1.780 × 1,55 = 2.759 kcal`; abzüglich `400 kcal` ergibt `2.359 kcal`.
3. **Kohlenhydratmenge:** `(2.359 × 0,40) / 4 = 943,6 / 4 = 235,9 g` (gerundet **236 g pro Tag**).
4. **Protein und Fett gegenprüfen:** Protein `(2.359 × 0,30) / 4 = 176,9 g` (`177 g`, rund `2,16 g/kg`); Fett `(2.359 × 0,30) / 9 = 78,6 g` (`79 g`).

Die Gegenprobe `(236 × 4) + (177 × 4) + (79 × 9) = 2.363 kcal` bestätigt die Rechnung bis auf geringe Rundungseffekte.

## Richtwerte nach Ernährungsform und Trainingsziel

Die Tabelle vergleicht sechs Strategien auf Basis von `2.400 kcal` Tagesbedarf bei `75 kg` Körpergewicht:

| Strategie | Energieanteil | Menge bei 2.400 kcal | Je kg Körpergewicht | Stoffwechseleffekt | Einsatzgebiet |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Ketogen | `< 5 %` | `< 30 g` (max. `50 g`) | `< 0,5 g/kg` | Hepatische Ketogenese | Therapeutik, kurze Diätphasen |
| Striktes Low-Carb | `10–20 %` | `60–120 g` | `0,8–1,6 g/kg` | Niedrige Insulinantwort | Geringe Alltagsbewegung |
| Moderates Low-Carb | `25–35 %` | `150–210 g` | `2,0–2,8 g/kg` | Kalorienkontrolle mit Power | Fettabbau plus Kraftsport |
| Mischkost (DGE) | `45–55 %` | `270–330 g` | `3,6–4,4 g/kg` | Stabile Glykogenspeicher | Gewichtserhalt, Breitensport |
| Hypertrophie | `50–55 %` | `300–330 g` | `4,0–5,5 g/kg` | Hohe ATP-Resynthese | Muskelaufbau im Überschuss |
| Ausdauersport | `60–70 %` | `360–420 g` | `6,0–10,0 g/kg` | Maximale Glykogensättigung | Marathon, Triathlon, Radsport |

Bei hohen Trainingsumfängen steigt der Gesamtumsatz deutlich über `2.400 kcal`, sodass Ausdauerathleten `450` bis `700 g` täglich benötigen können.

## Anwendungsfälle, typische Fehlerquellen und medizinische Hinweise

Typische Einsatzfelder sind kalorienkontrollierte Diäten ohne Kraftverlust, gezieltes **Carb-Cycling** (mehr Kohlenhydrate an Trainingstagen, weniger an Ruhetagen) sowie die Gewichtsstabilisierung nach erfolgreicher Abnahme.

Vermeiden Sie vier häufige Fehler:
- **Doppelter Ballaststoffabzug:** Ziehen Sie bei EU-Nährwerttabellen keine Ballaststoffe erneut von den Kohlenhydraten ab.
- **Flüssigkalorien übersehen:** Säfte, gezuckerte Kaffeespezialitäten und Softdrinks liefern rasch `30` bis `60 g` Zucker ohne Sättigung.
- **Keine Neuberechnung:** Nach `5` bis `8 kg` Gewichtsverlust sinkt der BMR; passen Sie Ihre Makros alle sechs bis acht Wochen an.
- **Ballaststoffmangel bei Low-Carb:** Decken Sie täglich `25` bis `30 g` Ballaststoffe aus stärkearmem Gemüse, Leinsamen oder Nüssen für Darmgesundheit und Sättigung.

### Klinische und regulatorische Grenzen

Die berechneten Makroziele gelten für gesunde Erwachsene und ersetzen keine ärztliche Beratung. Bei Typ-1-Diabetes, insulinpflichtigem Typ-2-Diabetes (insbesondere unter SGLT2-Hemmern wegen Ketoazidoserisiko), Niereninsuffizienz sowie in Schwangerschaft und Stillzeit dürfen strenge Restriktionen nur unter ärztlicher Aufsicht erfolgen. Treten anhaltende Müdigkeit, Schwindel oder Zyklusstörungen auf, erhöhen Sie die Kalorien- und Kohlenhydratzufuhr umgehend.
