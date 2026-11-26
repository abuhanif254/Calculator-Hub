---
title: "Durchschnittsrendite erklärt: So messen Sie Ihren Anlageerfolg"
description: "Verstehen Sie den Unterschied zwischen arithmetischer und geometrischer Durchschnittsrendite (CAGR) sowie zeit- und geldgewichteter Rendite für präzise Depotvergleiche."
category: "Finance"
relatedCalculator: "average-return-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wann ist das geometrische Mittel (CAGR) besser als das arithmetische Mittel?"
    answer: "Für die Auswertung vergangener Anlagezeiträume und die reale Vermögensentwicklung ist nahezu immer das geometrische Mittel (CAGR) maßgeblich. Nur die CAGR berücksichtigt den Zinseszinseffekt und spiegelt wider, mit welcher konstanten Jahresrate Ihr Startkapital tatsächlich auf das Endkapital gewachsen wäre. Das arithmetische Mittel überschätzt bei schwankenden Kursen systematisch das reale Ergebnis."
  - question: "Warum weicht meine persönliche Depotrendite oft von der offiziellen Fonds-Performance ab?"
    answer: "Fondsgesellschaften weisen die zeitgewichtete Rendite (TTWROR) aus, die Ein- und Auszahlungen ausblendet und ausschließlich die reine Strategiequalität misst. Ihre persönliche Depotrendite hängt jedoch stark davon ab, wann Sie wie viel Geld eingezahlt haben. Haben Sie kurz vor einem Kursrückgang größere Summen investiert, liegt Ihre geldgewichtete Rendite (Interner Zinsfuß) unter der offiziellen Fondsrendite."
  - question: "Wie berechne ich die reale Durchschnittsrendite nach Abzug der Inflation?"
    answer: "Ziehen Sie die Inflationsrate nicht einfach pauschal ab, sondern verwenden Sie die exakte Fisher-Gleichung: (1 + r_nominal) / (1 + i) − 1. Bei einer nominalen CAGR von 7,0 % und einer durchschnittlichen Inflation von 2,5 % beträgt die reale Kaufkraftrendite (1,07 / 1,025) − 1 = 4,39 % pro Jahr."
  - question: "Was bedeutet die sogenannte Verlust-Asymmetrie beim Investieren?"
    answer: "Prozentuale Verluste wiegen mathematisch schwerer als gleich große prozentuale Gewinne, weil nach einem Rückgang eine kleinere Kapitalbasis zur Verfügung steht. Ein Verlust von 20 % erfordert bereits +25 % Gewinn zur Erholung; ein Rückgang um 50 % verlangt +100 % Kursanstieg, um wieder den Ausgangswert zu erreichen."
  - question: "Kann der Durchschnittsrendite-Rechner auch Verlustjahre und negative Renditen verarbeiten?"
    answer: "Ja. Solange kein Totalverlust (−100 %) vorliegt, berechnet das geometrische Mittel jede Abfolge aus positiven und negativen Jahresrenditen präzise. Auch eine insgesamt negative jährliche Wachstumsrate wird korrekt als Minus-CAGR ausgewiesen."
---

Wenn ein Aktienportfolio im ersten Jahr um `+50 %` steigt und im zweiten Jahr um `−50 %` fällt, beträgt die durchschnittliche Jahresrendite rein rechnerisch `0 %`. Auf Ihrem Konto sieht die Realität jedoch völlig anders aus: Aus `10.000 €` werden zunächst `15.000 €`, im zweiten Jahr halbiert sich dieser Betrag auf **7.500 €** – Sie haben ein Viertel Ihres Vermögens verloren. Dieses klassische Beispiel verdeutlicht, warum das einfache arithmetische Mittel bei Kapitalanlagen systematisch in die Irre führt.

Um den tatsächlichen Anlageerfolg über mehrere Perioden hinweg seriös zu beziffern, benötigen Sie die **geometrische Durchschnittsrendite**, im Finanzwesen meist als **CAGR** (Compound Annual Growth Rate) bezeichnet. Sie zeigt jene geglättete jährliche Wachstumsrate an, die ohne Zwischenschwankungen exakt vom Startwert zum Endwert geführt hätte. Mit unserem [Durchschnittsrendite-Rechner](/de/rechner/durchschnittliche-rendite-rechner) berechnen Sie sowohl die echte CAGR als auch den Unterschied zur irreführenden Durchschnittsbetrachtung.

## Arithmetische Rendite, CAGR und das Gesetz der Varianzbremse

In der Finanzmathematik konkurrieren zwei Mittelwerte zur Auswertung von Zeitreihen aus periodischen Renditen `r_1, r_2, …, r_n` über `n` Jahre:

```text
R_arith = (r_1 + r_2 + … + r_n) / n
CAGR    = [(1 + r_1) × (1 + r_2) × … × (1 + r_n)]^(1 / n) − 1
        = (Endwert / Startwert)^(1 / n) − 1
```

Während das **arithmetische Mittel (`R_arith`)** die Renditen schlicht addiert und den Zinseszinseffekt ignoriert, multipliziert die **CAGR** die Wachstumsfaktoren miteinander. Mathematisch gilt stets die Ungleichung: Sobald auch nur die geringste Kursschwankung zwischen den Jahren auftritt, liegt das geometrische Mittel unter dem arithmetischen Mittel. Diese Differenz nennt man **Volatilitätsverlust** oder **Varianzbremse** (Volatility Drag). Sie lässt sich über die Varianz `σ²` der Jahresrenditen näherungsweise bestimmen:

```text
CAGR ≈ R_arith − (σ² / 2)
```

Je höher die Schwankungsbreite (Standardabweichung `σ`) eines Portfolios ist, desto stärker frisst die Varianz die reale Wachstumsrate auf – selbst bei identischer arithmetischer Durchschnittsrendite. Zusätzlich unterscheidet die Praxis bei Portfolios mit laufenden Sparraten zwischen der **zeitgewichteten Rendite (TTWROR)**, die Einzahlungen herausrechnet und die reine Fondsleistung misst, und der **geldgewichteten Rendite (MWROR / Interner Zinsfuß)**, die Ihr persönliches Einzahlungs-Timing bewertet.

## Rechenbeispiel: Warum 7,5 % Durchschnitt nicht zu 7,5 % Wachstum führen

Betrachten wir ein Startkapital von `10.000 €` über einen Zeitraum von `n = 4 Jahren` mit wechselhaften Börsenphasen:
* **Jahr 1 (`+25,0 %`):** `10.000,00 € × 1,25 = 12.500,00 €`
* **Jahr 2 (`−20,0 %`):** `12.500,00 € × 0,80 = 10.000,00 €`
* **Jahr 3 (`+30,0 %`):** `10.000,00 € × 1,30 = 13.000,00 €`
* **Jahr 4 (`−5,0 %`):** `13.000,00 € × 0,95 = 12.350,00 €`

Berechnet man nun das naive **arithmetische Mittel**, erhält man `(25 % − 20 % + 30 % − 5 %) / 4 =` **+7,50 % p. a.** Wer fälschlicherweise mit `7,50 %` jährlichem Wachstum kalkuliert, erwartet nach vier Jahren ein Endkapital von `10.000 € × (1,075)^4 = 13.354,69 €`. Tatsächlich liegen jedoch nur **12.350,00 €** im Depot – eine Abweichung von über `1.004 €`.

Die korrekte **geometrische Rendite (CAGR)** lautet dagegen: `(12.350,00 € / 10.000,00 €)^(1 / 4) − 1 = (1,235)^0,25 − 1 =` **5,42 % p. a.** Die Differenz von `2,08 Prozentpunkten` zwischen arithmetischer (`7,50 %`) und geometrischer Rendite (`5,42 %`) ist der direkte Preis der Schwankungen (die Näherung über `σ² / 2` ergibt `7,50 % − 2,16 % = 5,34 %`).

## Szenario-Vergleich: Wie Volatilität die echte Rendite drückt

Die folgende Übersicht demonstriert anhand eines Startkapitals von `10.000 €` über vier Jahre, wie stark verschiedene Schwankungsmuster bei oft ähnlichem arithmetischem Schnitt das Endvermögen beeinflussen:

| Szenario (4 Jahresrenditen) | Arithmetisches Mittel | Geometrisches Mittel (CAGR) | Endwert (Start: 10.000 €) | Renditeverlust durch Volatilität |
| :--- | :---: | :---: | :---: | :---: |
| Stetig (`+7 % / +7 % / +7 % / +7 %`) | 7,00 % | 7,00 % | 13.107,96 € | 0,00 Prozentpunkte |
| Moderat (`+15 % / −1 % / +14 % / 0 %`) | 7,00 % | 6,74 % | 12.978,90 € | 0,26 Prozentpunkte |
| Volatil (`+35 % / −21 % / +30 % / −16 %`) | 7,00 % | 3,88 % | 11.646,18 € | 3,12 Prozentpunkte |
| Extrem (`+50 % / −50 % / +50 % / −50 %`) | 0,00 % | −13,40 % | 5.625,00 € | 13,40 Prozentpunkte |
| Erholung (`−40 % / +40 % / +20 % / +20 %`) | 10,00 % | 4,87 % | 12.096,00 € | 5,13 Prozentpunkte |
| Später Einbruch (`+20 % / +20 % / +20 % / −40 %`) | 5,00 % | 0,91 % | 10.368,00 € | 4,09 Prozentpunkte |

Bemerkenswert ist die fünfte Zeile: Selbst bei einem beeindruckenden arithmetischen Durchschnitt von `10,00 %` pro Jahr verbleibt aufgrund des anfänglichen 40-%-Einbruchs real nur eine CAGR von `4,87 %` p. a.

## Typische Messfehler, Berichtsstandards und Kaufkraftbereinigung

In Depotauswertungen und Fondsprospekten schleichen sich bei Vergleichen häufig methodische Fehler ein. Ein verbreiteter Trugschluss ist der **Vergleich von Kursindizes mit Performance-Indizes**: Während der deutsche DAX als Performance-Index ausgeschüttete Dividenden automatisch reinvestiert einrechnet, bildet etwa der Euro STOXX 50 oder der S&P 500 in Standardgrafiken meist nur den reinen Kursverlauf ohne Dividenden ab. Prüfen Sie bei Benchmarks stets, ob Sie eine **Net-Total-Return-Variante** vergleichen.

Zweitens verwechseln Anleger bei **Sparplänen** häufig den einfachen prozentualen Gesamtgewinn (`Endwert / Einzahlungen − 1`) mit einer annualisierten Rendite. Da die letzte Sparrate erst kurz vor dem Stichtag investiert wurde, liegt die wahre jährliche Verzinsung meist deutlich höher als der Quotient vermuten lässt – hierfür liefert nur der interne Zinsfuß (`MWROR`) korrekte Werte. Nach der deutschen **BVI-Methode** sowie den internationalen **GIPS-Standards** (Global Investment Performance Standards) sind Fondsgesellschaften verpflichtet, historische Wertentwicklungen zeitgewichtet und geometrisch (CAGR) auszuweisen.

Vergessen Sie schließlich nicht die **Inflationsbereinigung**: Nominale Durchschnittsrenditen verzerren in Phasen erhöhter Geldentwertung Ihren realen Vermögenszuwachs. Bereinigen Sie Ihre ermittelte CAGR nach der **Fisher-Gleichung** `r_real = (1 + CAGR) / (1 + Inflationsrate) − 1`, um verlässlich abzuschätzen, wie stark Ihre tatsächliche Kaufkraft pro Jahr gewachsen ist.
