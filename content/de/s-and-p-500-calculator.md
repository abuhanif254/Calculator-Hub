---
title: "S&P 500 Rendite-Rechner"
metaTitle: "S&P 500 Rendite-Rechner: ETF-Sparplan & Zinseszins 2026"
description: "Simulieren Sie langfristigen Vermögensaufbau mit S&P-500-ETFs – inklusive Zinseszinseffekt, Inflationsbereinigung und DACH-Steuerhinweisen."
metaDescription: "Berechnen Sie langfristige Renditen für S&P-500-ETFs mit Einmalanlage und Sparplan. Inklusive Zinseszins, Inflation und Steuertipps für Anleger."
metaKeywords: "sp 500 rendite rechner, s&p 500 etf sparplan rechner, s&p 500 historische rendite, zinseszins rechner etf, us aktien vermögensaufbau, s&p 500 rechner"
faqs:
  - question: "Sind 10 % Jahresrendite beim S&P 500 auch für europäische Anleger realistisch?"
    answer: "Die oft zitierten rund 10 % p. a. beziehen sich auf die historische nominale Gesamtrendite in US-Dollar inklusive reinvestierter Dividenden vor Inflation und Steuern. Für eine seriöse Finanzplanung im Euro- oder Frankenraum sollten Sie nach Abzug von ETF-Kosten und Inflation eher mit 6 % bis 8 % nominal oder rund 5 % bis 6,5 % real kalkulieren."
  - question: "Sollte ich einen thesaurierenden oder ausschüttenden S&P-500-ETF wählen?"
    answer: "Für den langfristigen Vermögensaufbau bietet ein thesaurierender ETF meist Vorteile, weil Dividenden automatisch, gebührenfrei und ohne Zeitverzug wiederangelegt werden. Steuerlich sind beide Varianten in Deutschland durch die Vorabpauschale und die 30-prozentige Teilfreistellung weitgehend angeglichen; ein Ausschütter kann jedoch helfen, den jährlichen Sparer-Pauschbetrag gezielt auszunutzen."
  - question: "Warum bevorzugen Anleger aus DACH S&P-500-ETFs mit Fondsdomizil Irland?"
    answer: "Aufgrund des Doppelbesteuerungsabkommens zwischen Irland und den USA zahlen physisch replizierende irische UCITS-ETFs nur 15 % US-Quellensteuer auf Dividenden statt 30 % wie bei Fondsdomizil Luxemburg. Synthetische Swap-ETFs auf den S&P 500 profitieren sogar von einer vollständigen Quellensteuerbefreiung auf Indexdividenden."
  - question: "Lohnt sich ein währungsgesicherter (EUR-Hedged) S&P-500-ETF?"
    answer: "Auf lange Sicht von 15 oder mehr Jahren schmälert eine permanente Währungsabsicherung häufig die Rendite. Die Absicherungskosten entsprechen im Kern der Zinsdifferenz zwischen US-Dollar und Euro zuzüglich höherer laufender Fondskosten. Über kurze Zeiträume glättet Hedging zwar Wechselkursschwankungen, für langfristige Aktienanleger ist die ungesicherte Variante jedoch meist effizienter."
  - question: "Wie stark kann ein S&P-500-Portfolio in Börsenkrisen zwischenzeitlich fallen?"
    answer: "Trotz starker Langfristrendite kam es historisch wiederholt zu Rückschlägen von 30 % bis über 50 %, etwa nach dem Platzen der Dotcom-Blase (2000–2002) oder während der Finanzkrise 2008. Wer einen Anlagehorizont von mindestens 15 Jahren einhält und Sparpläne gerade in Krisenphasen fortführt, hat historisch jedoch in jedem gleitenden 20-Jahres-Zeitraum positive Renditen erzielt."
---

## Historische Rendite des S&P 500 richtig einordnen

Der **S&P 500** bündelt die 500 größten börsennotierten US-Unternehmen und repräsentiert rund 80 % der gesamten US-Marktkapitalisierung. Seit seiner Einführung in der heutigen Form im Jahr 1957 erwirtschaftete der Index inklusive wiederangelegter Dividenden eine durchschnittliche **nominale Gesamtrendite von knapp 10 % pro Jahr** in US-Dollar. Nach Abzug der historischen US-Inflation verblieb eine **reale Kaufkraftrendite von rund 6,5 % bis 7,0 % p. a.**

Diese Langfristzahlen verleiten allerdings leicht zu linearem Wunschdenken. An der Börse gibt es keine gleichmäßigen Jahreszinsen wie auf einem Sparkonto: Auf Jahre mit +25 % folgen Korrekturen von −20 % oder längere Seitwärtsphasen. Der S&P 500 Rendite-Rechner übersetzt die geglättete Durchschnittsrendite (CAGR) in konkrete Endvermögens-Szenarien und macht sichtbar, welchen Unterschied Zeit, Sparrate und Renditeannahme über Jahrzehnte bewirken.

## Die Sparplan- und Zinseszinsformel für Index-Investments

Kombinieren Sie ein Startkapital (`K₀`) mit einem regelmäßigen monatlichen ETF-Sparplan (`S`), wirken zwei Zinseszins-Komponenten parallel. Bei monatlicher Verzinsung (`i = r / 12`) über `n = 12 · t` Monate ergibt sich das nominale Endkapital (`K_n`) nachschüssig aus:

```
K_n = K₀ · (1 + i)^n + S · [ ((1 + i)^n − 1) / i ]
```

Die Variablen im Überblick:

- **`K₀`**: Einmalige Anfangsinvestition zu Beginn des Anlagezeitraums.
- **`S`**: Monatliche Sparplanrate, die über `n` Monate hinweg investiert wird.
- **`r`**: Erwartete jährliche Durchschnittsrendite (nach laufenden ETF-Kosten/TER, vor Steuern).
- **`t`**: Anlagedauer in Jahren (`n = 12 · t`).

Um zu prüfen, welche **reale Kaufkraft (`K_real`)** Ihr künftiges Vermögen in heutigem Geld besitzt, diskontieren Sie das Endkapital mit der erwarteten jährlichen Inflationsrate (`π`):

```
K_real = K_n / (1 + π)^t
```

## Rechenbeispiel: 10.000 € Startkapital plus 300 € Sparplan über 20 Jahre

Eine Anlegerin investiert **10.000 € Startkapital** in einen kostengünstigen S&P-500-ETF (TER 0,07 % p. a.) und richtet einen monatlichen Sparplan über **300 €** ein. Statt mit optimistischen 10 % kalkuliert sie vorsichtiger mit **8,0 % nominaler Rendite p. a.** und einer durchschnittlichen Inflation von **2,2 % p. a.** über **20 Jahre (`n = 240 Monate`)**.

1. **Eigene Einzahlungen**: `10.000 € + (240 × 300 €) = 82.000 €`.
2. **Monatlicher Renditefaktor**: `i = 0,08 / 12 = 0,00666667`, daraus folgt `(1 + i)^240 = 4,926803`.
3. **Wachstum der Einmalanlage**: `10.000 € · 4,926803 = 49.268,03 €`.
4. **Wachstum des Sparplans**: `300 € · (4,926803 − 1) / 0,00666667 = 176.706,12 €`.
5. **Nominales Endkapital**: `49.268,03 € + 176.706,12 € = 225.974,15 €`. Der reine **Wertzuwachs von 143.974,15 €** macht über 63 % des Endvermögens aus.
6. **Kaufkraft in heutigen Euro**: Bei 2,2 % Inflation sinkt der reale Gegenwert auf `225.974,15 € / (1,022)^20 = 146.231,47 €` – immer noch ein substanzieller realer Vermögenszuwachs von fast 78 % gegenüber der nominalen Einzahlungssumme.

## Szenarienvergleich: Nominale und reale Entwicklung über 10 bis 30 Jahre

Wie stark Zeit und Renditeannahme das Ergebnis für exakt dasselbe Budget (10.000 € Start + 300 €/Monat) prägen, zeigt diese Gegenüberstellung (gerundet auf volle Euro, vor Steuern):

| Horizont | Einzahlung | 6 % p.a. | 8 % p.a. | 10 % p.a. | Kaufkraft bei 8 % (2 % Infl.) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **10 Jahre** | 46.000 € | 67.358 € | 77.080 € | 88.524 € | 63.233 € |
| **20 Jahre** | 82.000 € | 171.714 € | 225.974 € | 301.091 € | 152.074 € |
| **30 Jahre** | 118.000 € | 361.580 € | 556.465 € | 876.520 € | 307.208 € |

Der Zinseszinseffekt entfaltet seine volle Wucht erst im dritten Jahrzehnt: Zwischen Jahr 20 und Jahr 30 zahlt die Anlegerin nur noch 36.000 € zusätzlich ein, doch im 8-%-Szenario wächst das Depot in diesem letzten Jahrzehnt um über **330.000 €**. Genau dieser exponentielle Knick erklärt, warum ein früher Sparbeginn mit moderaten Beträgen langfristig meist deutlich mehr Vermögen aufbaut als hohe Nachzahlungen wenige Jahre vor dem Ruhestand.

## Worauf Anleger im DACH-Raum bei S&P-500-ETFs achten müssen

### Steuerliche Behandlung in Deutschland, Österreich und der Schweiz

Die Nettorendite hängt maßgeblich vom Wohnsitzstaat ab:

- **Deutschland**: Aktien-ETFs mit mindestens 51 % Aktienquote erhalten gemäß Investmentsteuergesetz eine **30-%-Teilfreistellung**. Auf die verbleibenden 70 % der Erträge fallen 25 % Abgeltungsteuer plus 5,5 % Solidaritätszuschlag an – effektiv also rund **18,46 %** (ohne Kirchensteuer), wobei der jährliche **Sparer-Pauschbetrag** (1.000 € für Ledige, 2.000 € für Verheiratete) vorab greift. Bei thesaurierenden Fonds erhebt die Bank zu Jahresbeginn die sogenannte **Vorabpauschale**, die beim späteren Verkauf angerechnet wird.
- **Österreich**: Kursgewinne und Ausschüttungen unterliegen **27,5 % Kapitalertragsteuer (KESt)**. Wählen Sie unbedingt einen bei der OeKB registrierten **Meldefonds**, um pauschale Strafbesteuerungen bei Nichtmeldefonds zu vermeiden.
- **Schweiz**: Private Kapitalgewinne (Kurssteigerungen) sind für Privatanleger **steuerfrei**, während Dividenden – auch bei thesaurierenden ETFs – regulär als Einkommen versteuert werden und das Depot der kantonalen Vermögenssteuer unterliegt.

### Währungsrisiko, Quellensteuer und Entnahmephase steuern

Obwohl Ihr ETF an Xetra oder SIX in Euro bzw. Franken gehandelt wird, tragen Sie wirtschaftlich das **US-Dollar-Wechselkursrisiko**. Wertet der Dollar langfristig gegenüber dem Euro ab, schmälert das Ihre Euro-Rendite; wertet er auf, erhalten Sie zusätzlichen Rückenwind. Achten Sie bei der Produktauswahl auf ein **irisch domiziliertes UCITS-Produkt** (nur 15 % US-Quellensteuer auf Dividenden bei physischer Replikation; 0 % bei Swap-ETFs) und vergleichen Sie neben der laufenden Gesamtkostenquote (TER) unbedingt die historische **Tracking Difference**: Viele große synthetische S&P-500-ETFs schneiden durch die eingesparte Quellensteuer nach Kosten sogar leicht besser ab als der offizielle Netto-Referenzindex. Behalten Sie zugleich die hohe Konzentration im Blick, denn die zehn größten US-Technologie- und Wachstumskonzerne machen regelmäßig über 30 % des gesamten Indexgewichts aus.

Unterschätzen Sie schließlich nicht das **Rendite-Reihenfolge-Risiko (Sequence-of-Returns-Risiko)** gegen Ende Ihres Sparziels. Während ein Börseneinbruch in den ersten Sparjahren sogar günstigere Kaufkurse über den Sparplan ermöglicht, kann ein Kurssturz von 30 % kurz vor Rentenbeginn das Depot empfindlich treffen. Bauen Sie daher fünf Jahre vor geplanten größeren Entnahmen schrittweise einen risikoarmen Puffer aus Tagesgeld oder gestaffeltem Festgeld für zwei bis drei Jahresausgaben auf, statt im Krisentief Aktienanteile verkaufen zu müssen.
