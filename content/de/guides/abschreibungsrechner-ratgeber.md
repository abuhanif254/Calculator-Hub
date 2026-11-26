---
title: "Abschreibung verstehen: Wie Vermögenswerte an Wert verlieren"
description: "Lernen Sie lineare, degressive und Leistungsabschreibung (AfA) mit exakten Formeln, Beispielen und unserem Abschreibungsrechner."
category: "Finance"
relatedCalculator: "depreciation-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen linearer und degressiver Abschreibung?"
    answer: "Bei der linearen Abschreibung wird über die gesamte Nutzungsdauer jedes Jahr exakt derselbe Betrag abgeschrieben. Bei der geometrisch-degressiven Abschreibung wird ein fester Prozentsatz auf den jeweiligen Restbuchwert angewandt, sodass in den ersten Jahren deutlich höhere Abschreibungen und damit frühere Steuerentlastungen entstehen."
  - question: "Wie wird die Nutzungsdauer eines Wirtschaftsguts in Deutschland festgelegt?"
    answer: "Für die steuerliche Gewinnermittlung geben die amtlichen AfA-Tabellen des Bundesministeriums der Finanzen (BMF) die betriebsgewöhnliche Nutzungsdauer vor – etwa sechs Jahre für Personenkraftwagen, drei Jahre (bzw. ein Jahr bei digitaler Hardware unter bestimmten BMF-Schreiben) für Computer oder acht bis zwölf Jahre für Produktionsmaschinen. In der Handelsbilanz gilt die wirtschaftlich erwartete Nutzungsdauer."
  - question: "Was besagt die Pro-rata-temporis-Regelung im Anschaffungsjahr?"
    answer: "Gemäß § 7 Abs. 1 Satz 4 EStG darf im Jahr der Anschaffung oder Herstellung nicht sofort der volle Jahresbetrag abgeschrieben werden. Stattdessen erfolgt die Abschreibung zeitanteilig auf den Monat genau – ab dem Monat der Lieferung oder Fertigstellung (inklusive des Anschaffungsmonats)."
  - question: "Wann lohnt sich der Wechsel von der degressiven zur linearen Abschreibung?"
    answer: "Da der degressive Abschreibungsbetrag bei abnehmendem Restbuchwert theoretisch nie exakt auf null sinkt, ist ein Wechsel zur linearen Methode auf die verbleibende Restnutzungsdauer üblich und sinnvoll. Der optimale Wechselzeitpunkt ist exakt das Jahr, in dem der lineare Restbetrag (Restbuchwert geteilt durch Restjahre) größer oder gleich dem degressiven Betrag wird."
  - question: "Bis zu welcher Grenze gelten Güter als geringwertige Wirtschaftsgüter (GWG)?"
    answer: "Selbstständig nutzbare, abnutzbare bewegliche Wirtschaftsgüter bis zu einem Netto-Anschaffungspreis von 800 € (ohne Umsatzsteuer) können im Jahr der Anschaffung sofort zu 100 % als Betriebsausgabe abgeschrieben werden (§ 6 Abs. 2 EStG). Alternativ besteht zwischen 250 € und 1.000 € die Option zur Bildung eines fünfjährigen Sammelpostens."
---

Anlagegüter wie Maschinen, Fahrzeuge, Server oder Büroausstattung verlieren durch Abnutzung, technischen Fortschritt und Alterung fortlaufend an Wert. In der Buchhaltung und im Steuerrecht wird dieser planmäßige Wertverzehr als **Abschreibung** – im deutschen Steuerrecht präziser als **Absetzung für Abnutzung (AfA)** – erfasst. Anstatt die gesamten Anschaffungskosten im Kaufjahr sofort als Aufwand zu verbuchen, verteilt die Abschreibung die Investition periodengerecht auf die Jahre der tatsächlichen Nutzung.

Für Unternehmen, Selbstständige und Vermieter ist die Wahl der richtigen Abschreibungsmethode ein zentraler Liquiditäts- und Steuerhebel: Höhere Abschreibungsbeträge in den Anfangsjahren senken den steuerpflichtigen Gewinn sofort und verbessern die Innenfinanzierung. Mit unserem [Abschreibungsrechner](/de/rechner/abschreibungsrechner) erstellen Sie für jede Anlage einen lückenlosen jährlichen Abschreibungsplan.

## Methodik: Lineare, degressive und Leistungsabschreibung

Je nach Bilanzierungsziel (Handelsbilanz nach HGB, Steuerbilanz nach EStG oder internationale Standards wie IFRS/US-GAAP) kommen vor allem drei Abschreibungsverfahren zum Einsatz:

```text
Linear:     AfA_Jahr = (Anschaffungskosten − Restwert) / Nutzungsdauer
Degressiv:  AfA_t    = Restbuchwert_(t−1) × Abschreibungssatz_deg
Leistung:   AfA_t    = (AK − Restwert) × (Leistung_t / Gesamtleistung)
```

Die Parameter müssen vorab sauber aus Eingangsrechnungen und Anlagenverzeichnis bestimmt werden:
* **Anschaffungs- oder Herstellungskosten (`AK`):** Kaufpreis (bei Vorsteuerabzug netto ohne Umsatzsteuer) zuzüglich direkt zurechenbarer Nebenkosten wie Transport, Montage, Fundamentbau oder Zoll, abzüglich erhaltener Rabatte und Skonti.
* **Restwert (`RW`):** Der erwartete Veräußerungs- oder Schrottwert am Ende der Nutzungsdauer. In der deutschen Steuerbilanz wird in der Regel mit `0 €` (bzw. `1 €` Erinnerungswert bei fortgeführter Nutzung) kalkuliert; in der internen Kostenrechnung oder beim Fuhrpark-Leasing wird oft ein realer Restwert angesetzt.
* **Nutzungsdauer (`n`):** Die voraussichtliche wirtschaftliche bzw. steuerlich nach amtlichen BMF-AfA-Tabellen normierte Einsatzdauer in Jahren.

Bei der **linearen Methode** bleibt die Jahresbelastung über die gesamte Laufzeit konstant. Die **geometrisch-degressive Methode** wendet dagegen einen festen Prozentsatz auf den jährlich sinkenden Restbuchwert an, wodurch sich der Aufwand stark in die Anfangszeit verlagert. Die **Leistungsabschreibung** koppelt den Wertverlust schließlich direkt an messbare Nutzungseinheiten wie Betriebsstunden, gefahrene Kilometer oder produzierte Stückzahlen.

## Rechenbeispiel: CNC-Fräsmaschine für 48.000 € über 6 Jahre

Ein mittelständischer Handwerksbetrieb erwirbt zum 1. Januar eine Produktionsmaschine für **48.000 € netto** inklusive Lieferung und Montage. Die betriebsgewöhnliche Nutzungsdauer beträgt **6 Jahre**, der geplante Restwert am Ende liegt bei **0 €**.

1. **Lineare Abschreibung:** Der jährliche Abschreibungssatz beträgt `100 % / 6 = 16,67 %`. Damit werden jedes Jahr exakt `48.000 € / 6 = 8.000,00 €` als Betriebsausgabe angesetzt (`Restbuchwert Jahr 1: 40.000 €`, `Jahr 2: 32.000 €`, ..., `Jahr 6: 0 €`).
2. **Geometrisch-degressive Abschreibung (25 % p. a.) mit optimalem Wechsel zu linear:**
   * **Jahr 1:** `48.000,00 € × 25 % = 12.000,00 €` → Restbuchwert `36.000,00 €` (linear auf 6 Restjahre wären nur `8.000 €`).
   * **Jahr 2:** `36.000,00 € × 25 % = 9.000,00 €` → Restbuchwert `27.000,00 €` (linear auf 5 Restjahre wären `7.200 €`).
   * **Jahr 3:** Degressiv ergäbe `27.000,00 € × 25 % = 6.750,00 €`. Eine lineare Aufteilung des Restbuchwerts auf die verbleibenden 4 Jahre ergibt ebenfalls `27.000,00 € / 4 = 6.750,00 €`.
   * **Jahre 4 bis 6:** Spätestens im vierten Jahr würde die degressive Rate auf `5.062,50 €` sinken, während die lineare Restabschreibung konstant `6.750,00 €` pro Jahr liefert. Durch den **Methodenwechsel in Jahr 3 oder 4** ist die Maschine zum Ende des sechsten Jahres exakt auf `0,00 €` abgeschrieben.

## Methodenvergleich: Jährliche Abschreibungspläne im Überblick

Die Tabelle zeigt den Verlauf der Abschreibungsbeträge und Restbuchwerte für das Beispiel der **48.000 €**-Maschine über sechs volle Geschäftsjahre sowie typische Anwendungsfälle:

| Jahr / Kennzahl | Linear (`16,67 %`) | Degressiv (`25 %` + Wechsel Jahr 4) | Leistungs-AfA (z. B. `24.000` Std.) | Restbuchwert (Linear) | Restbuchwert (Degressiv-Kombi) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Jahr 1** | 8.000,00 € | **12.000,00 €** | je nach Auslastung (z. B. `2,00 €/Std.`) | 40.000,00 € | 36.000,00 € |
| **Jahr 2** | 8.000,00 € | **9.000,00 €** | variabel nach Betriebsstunden | 32.000,00 € | 27.000,00 € |
| **Jahr 3** | 8.000,00 € | **6.750,00 €** | variabel nach Betriebsstunden | 24.000,00 € | 20.250,00 € |
| **Jahr 4 (Wechsel)** | 8.000,00 € | **6.750,00 €** | variabel nach Betriebsstunden | 16.000,00 € | 13.500,00 € |
| **Jahr 5** | 8.000,00 € | **6.750,00 €** | variabel nach Betriebsstunden | 8.000,00 € | 6.750,00 € |
| **Jahr 6** | 8.000,00 € | **6.750,00 €** | verbleibende Stunden bis `0 €` | **0,00 €** | **0,00 €** |
| **Idealer Einsatz** | Immobilien, Möbel, ruhige GuV | IT, Fuhrpark, Wachstumsinvestitionen | Baufahrzeuge, Druckmaschinen, Lkw | Gleichmäßiger Aufwand | Früher Steuerstundungseffekt |

## Praxis-Tipps, Sonderregeln und typische Bilanzierungsfehler

Neben den regulären Planmethoden eröffnet das Steuerrecht gezielte Gestaltungsmöglichkeiten für kleine und mittlere Unternehmen, birgt aber auch klassische Stolpersteine:

* **Unterjährige Anschaffung (Pro rata temporis):** Kaufen Sie die `48.000 €`-Maschine erst am 15. September, stehen Ihnen im Anschaffungsjahr bei linearer AfA nicht volle `8.000 €`, sondern lediglich vier Zwölftel (September bis Dezember) zu: `8.000 € × 4 / 12 = 2.666,67 €`. Die fehlenden acht Monate hängen Sie am Ende im siebten Kalenderjahr an.
* **Geringwertige Wirtschaftsgüter (GWG) prüfen:** Bewegliche, selbstständig nutzbare Arbeitsmittel bis **800 € netto** (z. B. ein Bürostuhl oder Monitor) müssen nicht über Jahre verteilt werden, sondern lassen sich sofort vollständig absetzen. Vorsicht bei nicht selbstständig nutzbaren Komponenten wie einem reinen Drucker ohne Netzwerkanschluss oder bestimmten Ersatzteilen: Diese teilen oft das Schicksal des Hauptgeräts.
* **Grundstück und Gebäude trennen:** Grundstücke nutzen sich nicht ab und sind daher **niemals abschreibungsfähig**. Bei einem Immobilienkauf für `500.000 €` muss der Kaufpreis mittels Kaufpreisaufteilung sauber auf den Bodenwert (nicht abschreibbar) und den Gebäudewert (linear mit meist `2 %` bis `3 %` p. a. abschreibbar) aufgeteilt werden.
* **Steuerliche Zulässigkeit der degressiven AfA beachten:** Während die lineare Abschreibung dauerhaft zulässig ist, wird die steuerliche degressive AfA für bewegliche Wirtschaftsgüter durch Gesetzgebung (wie etwa zeitlich befristete Wachstumschancengesetze) immer wieder für bestimmte Anschaffungszeiträume aktiviert oder ausgesetzt. Prüfen Sie vor dem Jahresabschluss stets die für Ihr Anschaffungsdatum geltenden Höchstsätze und planen Sie sämtliche Varianten vorab im [Abschreibungsrechner](/de/rechner/abschreibungsrechner) durch.
