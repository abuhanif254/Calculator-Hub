---
title: "Nutzung des Investmentrechners für die Altersvorsorge"
description: "Praxisleitfaden zur Projektion des langfristigen Portfoliowachstums unter Berücksichtigung von Sparraten, Renditeerwartungen, Inflation und Entnahmestrategien."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "investment-calculator"
faqs:
  - question: "Welche reale Rendite sollte ich für eine konservative Altersvorsorgeplanung ansetzen?"
    answer: "Für ein weltweit gestreutes Aktien-ETF-Portfolio (z. B. MSCI World oder FTSE All-World) liegt die historische nominale Jahresrendite bei rund 7 % bis 8,5 %. Nach Abzug einer durchschnittlichen Inflation von 2 % bis 2,5 % sowie laufender Fondskosten empfiehlt sich für eine konservative Langfristplanung eine reale Rendite von 4,5 % bis 5,5 % pro Jahr."
  - question: "Wie stark beeinflusst ein späterer Sparbeginn das Endvermögen?"
    answer: "Aufgrund des exponentiellen Zinseszinseffekts wiegt Zeit oft schwerer als die Sparhöhe. Bei 7 % jährlicher Rendite und 500 € Monatsrate wächst das Kapital in 35 Jahren auf rund 1.015.589 € (bei 10.000 € Startkapital), während bei identischer Rate über 25 Jahre nur 462.290 € entstehen — ein Unterschied von über 553.000 € trotz lediglich 60.000 € weniger Eigenleistung."
  - question: "Was besagt die 4-%-Entnahmeregel und gilt sie auch in Deutschland?"
    answer: "Die aus der Trinity-Studie abgeleitete 4-%-Regel besagt, dass Sie im ersten Ruhestandsjahr 4 % Ihres Startportfolios entnehmen und diesen Betrag jährlich an die Inflation anpassen können, ohne dass das Kapital über 30 Jahre erschöpft wird. Im DACH-Raum sollten jedoch Abgeltungsteuer, eventuelle Vorabpauschalen und das eigene Langlebigkeitsrisiko einkalkuliert werden, weshalb viele Planer mit 3,2 % bis 3,5 % kalkulieren."
  - question: "Wie wirken sich Steuern und der Sparerpauschbetrag auf das Ergebnis aus?"
    answer: "Der Investmentrechner berechnet zunächst das Bruttowachstum vor Steuern. In Deutschland unterliegen realisierte Kursgewinne, Dividenden und die jährliche Vorabpauschale der Abgeltungsteuer von 25 % zuzüglich Solidaritätszuschlag (26,375 % ohne Kirchensteuer), sofern der Sparerpauschbetrag von 1.000 € pro Person (2.000 € bei Zusammenveranlagung) ausgeschöpft ist."
  - question: "Wie unterscheiden sich deutsche Vorsorgekonten von US-Modellen wie 401(k) oder IRA?"
    answer: "Während Anleger im DACH-Raum meist über steuerpflichtige Wertpapierdepots, Riester-, Rürup- oder betriebliche Altersvorsorge investieren, nutzen US-Haushalte steuerbegünstigte Konten wie 401(k) (gesetzliches Jahreslimit 2026: 24.500 $) oder IRA (7.500 $). Ein direkter Vergleich erfordert daher stets die Berücksichtigung der jeweiligen nachgelagerten oder laufenden Besteuerung."
---

Eine tragfähige Altersvorsorgeplanung beantwortet eine zentrale finanzmathematische Frage: Wie viel Kapital muss heute regelmäßig investiert werden, um im Ruhestand eine definierte Kaufkraft dauerhaft zu sichern? Das Ergebnis hängt maßgeblich von drei Stellschrauben ab — Ihrem verfügbaren Anlagehorizont, Ihrer monatlichen Sparrate sowie der erzielten Nettorendite nach Kosten und Inflation. Ein Investmentrechner übersetzt diese Variablen mithilfe der Zinseszinsrechnung in belastbare Zukunftswerte.

Entscheidend für den langfristigen Vermögensaufbau ist das exponentielle Wachstum durch **Zinseszins**: Erträge aus Dividenden, Zinsen und Kursgewinnen verbleiben im Portfolio und erwirtschaften in den Folgejahren wiederum eigene Erträge. Über Zeiträume von 25 bis 40 Jahren übersteigt der Zinseszinsertrag die Summe der eigenen Einzahlungen um ein Vielfaches, wodurch ein früher Start oft wirkungsvoller ist als eine spätere Verdoppelung der Sparrate.

## Mathematische Grundlagen: Zinseszins und reale Kaufkraft

Für ein Portfolio mit vorhandenem Startkapital und gleichbleibenden periodischen Sparraten berechnet der Investmentrechner den zukünftigen Endwert (`FV`, Future Value) über die kombinierte Barwert- und Rentenendwertformel:

```text
FV = PV × (1 + r)^t + PMT × [((1 + r)^t − 1) / r]
```

Die Parameter sind dabei exakt definiert:
- **`FV` (Endwert):** Projiziertes Gesamtvermögen am Ende des Anlagezeitraums.
- **`PV` (Barwert):** Bereits vorhandenes Startguthaben zu Beginn der Ansparphase.
- **`r` (Periodenzinssatz):** Erwartete Jahresrendite geteilt durch die jährlichen Zins- bzw. Einzahlungsperioden (bei monatlicher Sparrate `Jahresrendite ÷ 12`).
- **`t` (Gesamtperioden):** Gesamtzahl der Zinsperioden (`Anlagejahre × 12` bei monatlichem Intervall).
- **`PMT` (Sparrate):** Konstante regelmäßige Einzahlung pro Periode.

Da eine Summe in 30 Jahren durch Preissteigerungen deutlich weniger Kaufkraft besitzt als heute, empfiehlt sich zusätzlich die Umrechnung auf die **reale Rendite** nach der exakten Fisher-Gleichung:

```text
r_real = [(1 + r_nominal) / (1 + Inflationsrate)] − 1
```

Bei einer erwarteten Nominalrendite von `7,0 %` und einer angenommenen Teuerungsrate von `2,0 %` ergibt sich keine einfache Differenz von `5,0 %`, sondern exakt `4,902 %` reale Jahresrendite. Diese präzise Abzinsung verhindert, dass das spätere Einkommenspotenzial im Ruhestand überschätzt wird.

## Schritt-für-Schritt-Beispiel: Vom Startkapital zur Rentenlücke

Angenommen, eine 35-jährige Anlegerin möchte bis zum 65. Lebensjahr (Anlagehorizont: `30 Jahre`, also `t = 360` Monate) Vermögen aufbauen. Sie startet mit einem ETF-Depot von `PV = 15.000 €` und spart monatlich `PMT = 500 €`. Als langfristige nominale Marktrendite nach Fondskosten werden `7,0 %` pro Jahr angesetzt (`r = 0,07 ÷ 12 = 0,0058333` pro Monat).

### 1. Berechnung des nominalen Endvermögens

Setzt man die Werte in die Endwertformel ein, wächst das Startkapital auf `15.000 € × (1,0058333)^360 = 121.747,46 €`. Die monatlichen Sparraten summieren sich verzinst auf `500 € × [((1,0058333)^360 − 1) / 0,0058333] = 609.985,50 €`. Zusammen ergibt dies ein nominales Endvermögen von **`731.732,96 €`**. Davon stammen lediglich `195.000,00 €` aus eigenen Einzahlungen (`15.000 € + 360 × 500 €`), während **`536.732,96 €`** reiner Zinseszinsertrag sind.

### 2. Kaufkraftbereinigung und Entnahmepotenzial

Bei einer durchschnittlichen Inflation von `2,0 %` pro Jahr sinkt die reale jährliche Wachstumsrate gemäß Fisher-Formel auf `4,902 %` (`r_real ÷ 12 = 0,004085` pro Monat). Mit diesem realen Zinssatz berechnet sich das Vermögen in heutiger Kaufkraft auf **`473.748,09 €`**. Wendet man darauf eine sichere Entnahmerate von `4,0 %` an (entsprechend der 25×-Regel für die Rentenphase), liefert das Portfolio ein nachhaltiges reales Zusatzeinkommen von **`18.949,92 €` pro Jahr** beziehungsweise **`1.579,16 €` pro Monat** vor Steuern.

## Szenariovergleich: Laufzeit und Rendite bei 500 € Monatsrate

Die folgende Übersicht verdeutlicht den Hebel von Anlagehorizont und Renditeannahme bei einem Startkapital von `10.000 €` und durchgehenden Sparraten von `500 €` pro Monat (monatliche Verzinsung, Werte vor Steuern):

| Anlagehorizont | Eigene Einzahlungen | Endwert bei 5,0 % p. a. | Endwert bei 7,0 % p. a. | Endwert bei 9,0 % p. a. | Zinsanteil bei 7,0 % |
|---|---|---|---|---|---|
| 15 Jahre (180 Mon.) | 100.000 € | 154.782 € | 186.971 € | 227.583 € | 46,5 % |
| 20 Jahre (240 Mon.) | 130.000 € | 232.643 € | 300.851 € | 394.035 € | 56,8 % |
| 25 Jahre (300 Mon.) | 160.000 € | 332.568 € | 462.290 € | 654.645 € | 65,4 % |
| 30 Jahre (360 Mon.) | 190.000 € | 460.807 € | 691.150 € | 1.062.678 € | 72,5 % |
| 35 Jahre (420 Mon.) | 220.000 € | 625.383 € | 1.015.589 € | 1.701.526 € | 78,3 % |
| 40 Jahre (480 Mon.) | 250.000 € | 836.594 € | 1.475.521 € | 2.701.759 € | 83,1 % |

Ab dem 25. Anlagejahr übersteigt der kumulierte Zinseszins bei `7,0 %` die Summe aller eigenen Beiträge deutlich; nach 35 Jahren wird die Millionenmarke trotz überschaubarer `220.000 €` Eigenkapital überschritten.

## Typische Planungsfehler, Steuern und regulatorische Hinweise

Eine deterministische Berechnung mit konstanter Rendite bildet die Realität nur näherungsweise ab. In der Praxis treten vier wesentliche Stolpersteine auf, die Sie bei der Interpretation der Ergebnisse berücksichtigen sollten:

- **Reihenfolge-der-Renditen-Risiko (Sequence-of-Returns-Risk):** Historische Durchschnittswerte verbergen starke Marktschwankungen. Ein Kurseinbruch von 30 % kurz vor oder unmittelbar nach Rentenbeginn schadet dem Kapitalstock deutlich stärker als ein Rückschlag in den ersten Sparjahren, weil laufende Entnahmen auf niedrige Kurse treffen. Eine schrittweise Umschichtung eines Sicherheitsanteils fünf bis sieben Jahre vor Renteneintritt reduziert dieses Risiko.
- **Steuerliche Abzüge und Vorabpauschale:** In Deutschland mindert die Abgeltungsteuer (`25 %` plus `5,5 %` Solidaritätszuschlag, effektiv `26,375 %` zuzüglich etwaiger Kirchensteuer) den Nettoertrag oberhalb des Sparerpauschbetrags (`1.000 €` für Alleinstehende, `2.000 €` für Zusammenveranlagte). Bei thesaurierenden Aktien-ETFs greift zwar eine Teilfreistellung von `30 %` der Erträge, dennoch fällt jährlich die Vorabpauschale an und reduziert den Zinseszinseffekt leicht.
- **Gebühren und Produktkosten (TER):** Jährliche Verwaltungskosten von `1,5 %` bei aktiv gemanagten Fonds oder teuren Versicherungsmänteln statt `0,2 %` bei Index-ETFs drücken die Nettorendite im 30-Jahres-Beispiel von `7,0 %` auf `5,7 %` und kosten leicht mehr als `150.000 €` Endvermögen.
- **Internationale Vorsorgekonten im Vergleich:** Wer die Ergebnisse mit US-amerikanischen Vorsorgeplänen abgleicht, muss unterschiedliche steuerliche Fördergrenzen beachten. Für das Steuerjahr 2026 liegen die gesetzlichen IRS-Höchstgrenzen beispielsweise bei `24.500 $` für `401(k)`-Pläne, `7.500 $` für `IRA`-Konten sowie `4.400 $` (Einzelperson) bzw. `8.750 $` (Familie) für `HSA`-Konten.

Prüfen Sie Ihre Eingaben deshalb mindestens jährlich im Investmentrechner: Passen Sie die Sparrate an Gehaltssteigerungen an, kalkulieren Sie konservative Nettorenditen nach Gebühren und überprüfen Sie, ob die projizierte Entnahmesumme gemeinsam mit der gesetzlichen oder betrieblichen Rente Ihre realistischen Lebenshaltungskosten deckt.
