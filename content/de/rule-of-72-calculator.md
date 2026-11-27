---
title: "72er-Regel-Rechner: Verdopplungszeit & Zinseszins berechnen"
description: "Berechnen Sie mit der 72er-Regel die Verdopplungszeit Ihres Kapitals: mit Exakt-Formel, Kaufkraftverlust durch Inflation sowie 70er- und 69,3er-Vergleich."
faqs:
  - question: "Wann liefert die 72er-Regel die genauesten Ergebnisse?"
    answer: "Die 72er-Regel ist im Renditebereich zwischen 6 % und 10 % pro Jahr am präzisesten, weil sie bei jährlicher Verzinsung genau bei rund 7,85 % exakt mit dem logarithmischen Ergebnis übereinstimmt. Bei 8 % Rendite liegt die Abweichung bei lediglich 0,01 Jahren."
  - question: "Warum nimmt man die Zahl 72 statt 69,3 oder 70?"
    answer: "Mathematisch entspricht ln(2) etwa 0,693, was bei kontinuierlicher Verzinsung zur 69,3er-Regel führt. Für jährliche Zinsgutschriften kompensiert der Aufschlag auf 72 den Zinsverlust bis zum Jahresende und bietet zudem mit 2, 3, 4, 6, 8, 9 und 12 besonders viele ganzzahlige Teiler für das Kopfrechnen."
  - question: "Wie lässt sich die 72er-Regel auf die Inflation anwenden?"
    answer: "Teilen Sie 72 durch die jährliche Inflationsrate, um die Halbierungszeit Ihrer Kaufkraft zu ermitteln. Bei einer Teuerungsrate von 3,0 % pro Jahr verliert ein unverzinster Geldbetrag nach rund 24 Jahren die Hälfte seiner realen Kaufkraft."
  - question: "Berücksichtigt die 72er-Regel Steuern wie die Abgeltungsteuer oder Sparpläne?"
    answer: "Nein, die Grundformel setzt eine konstante jährliche Nettorendite ohne laufende Ein- oder Auszahlungen voraus. In Deutschland sollten Sie daher zunächst die Abgeltungsteuer von 26,375 % (zuzüglich möglicher Kirchensteuer, nach Ausschöpfung des Sparer-Pauschbetrags von 1.000 €) und die Inflation abziehen, bevor Sie mit dem realen Nettozins rechnen."
  - question: "Funktioniert die 72er-Regel auch bei hohen Kreditzinsen?"
    answer: "Ja, die Mechanik gilt spiegelbildlich auch für Schulden, etwa bei Dispositionskrediten oder gestundeten Darlehen. Bei 12 % Sollzins ohne Tilgung verdoppelt sich eine Verbindlichkeit bereits nach gut sechs Jahren."
---

Mit der **72er-Regel** ermitteln Sie in wenigen Sekunden im Kopf, nach wie vielen Jahren sich ein angelegter Geldbetrag bei konstantem jährlichem Zinssatz verdoppelt. Dazu teilen Sie lediglich die Zahl 72 durch die erwartete Jahresrendite in Prozent (`Verdopplungsjahre ≈ 72 ÷ r`). Bei einer realistischen Nettorendite von 6 % pro Jahr wächst Ihr Kapital demnach in rund zwölf Jahren auf das Doppelte an.

Für präzise Finanzplanungen in der DACH-Region reicht die Daumenregel allein jedoch oft nicht aus, weil weder extreme Zinssätze noch Steuerabzüge oder der schleichende Kaufkraftverlust abgebildet werden. Wer die logarithmische Exakt-Formel neben der 72er-, 70er- und 69,3er-Regel kennt, kann Depotrenditen, Immobilien-Eigenkapitalrenditen und Inflationsrisiken sofort realistisch einordnen.

## Mathematische Formel, Variablen und Methodik im Vergleich

Die klassische Näherung für jährliche Zinsgutschriften lautet:

`Verdopplungsjahre ≈ 72 ÷ r (%)`

Dabei steht `r` für den prozentualen Jahreszinssatz als Zahl (zum Beispiel `8` für `8 %`). Die exakte mathematische Lösung leitet sich aus der Zinseszinsgleichung `Kₙ = K₀ × (1 + r)ⁿ` ab, indem `Kₙ = 2 × K₀` gesetzt und nach der Laufzeit `n` aufgelöst wird:

`Exakt = ln(2) ÷ ln(1 + r)`

In der exakten Formel wird der Zinssatz `r` als Dezimalzahl eingesetzt (also `0,08` für `8 %`), wobei `ln` den natürlichen Logarithmus bezeichnet und `ln(2) ≈ 0,69315` beträgt. Daraus erklärt sich auch die **69,3er-Regel** (`69,3 ÷ r`), die bei stetiger (sekündlicher) Verzinsung exakt gilt. Da Bankkonten, Anleihen und thesaurierende ETF-Portfolios im Alltag jedoch meist jährlich abgerechnet beziehungsweise bewertet werden, liegt der exakte Zähler für kleine Zinssätze nahe bei 70 (**70er-Regel**) und verschiebt sich im Bereich typischer Aktienmarktrenditen von 6 % bis 10 % in Richtung 72. Neben dieser mathematischen Korrektur besitzt 72 mit 2, 3, 4, 6, 8, 9, 12, 18, 24 und 36 außergewöhnlich viele ganzzahlige Teiler, was schnelle Überschlagsrechnungen im Beratungsgespräch oder bei der Depotprüfung erheblich erleichtert.

## Schritt-für-Schritt-Beispiel aus der Praxis

Angenommen, eine Anlegerin in Deutschland investiert `25.000 €` Einmalanlage in ein weltweit gestreutes Aktien-ETF-Portfolio und kalkuliert langfristig mit einer nominalen Bruttorendite von `7,2 %` pro Jahr.

1. **Nominale Verdopplungszeit per 72er-Regel:** `72 ÷ 7,2 = 10,0 Jahre`. Nach zehn Jahren stehen nominal rund `50.000 €` im Depot, nach 20 Jahren (zwei Verdopplungen) etwa `100.000 €`.
2. **Abgleich mit der Exakt-Formel:** `ln(2) ÷ ln(1,072) = 0,69315 ÷ 0,06953 = 9,97 Jahre`. Die Abweichung zur Kopfrechenregel beträgt lediglich rund elf Tage. Nach genau 20 Jahren liegt der exakte Endwert bei `25.000 € × 1,072²⁰ = 100.423,58 €`.
3. **Berücksichtigung von Inflation und Steuerlast:** Rechnen wir konservativ mit `2,4 %` jährlicher Teuerung, sinkt die reale Kaufkraftrendite vor Steuern auf `(1,072 ÷ 1,024) − 1 = 4,69 %` pro Jahr. Die reale Verdopplung der Kaufkraft dauert nach der 72er-Regel `72 ÷ 4,69 = 15,35 Jahre` (exakt: `15,13 Jahre`). Fallen bei einer Veräußerung nach Ausschöpfung des Sparer-Pauschbetrags (`1.000 €` pro Person) zusätzlich effektiv `18,46 %` Abgeltungsteuer an (26,375 % inklusive Solidaritätszuschlag abzüglich 30 % Teilfreistellung bei Aktienfonds), verlängert sich die reale Verdopplungszeit nach Steuern spürbar.

Umgekehrt zeigt die 72er-Regel die Erosion durch Kaufkraftverlust auf dem unverzinsten Girokonto: Bei `3,0 %` Jahresinflation halbiert sich die Kaufkraft von `25.000 €` nach `72 ÷ 3,0 = 24,0 Jahren` (exakt `23,45 Jahre`) auf reale `12.500 €`.

## Vergleichstabelle: Exakt-Formel vs. 72er-, 70er- und 69,3er-Regel

Die folgende Übersicht zeigt für jährliche Verzinsung von `2 %` bis `12 %`, welche Näherungsformel dem exakten logarithmischen Wert am nächsten kommt:

| Jahresrendite (r) | Exakt (Jahre) | 72er-Regel | 70er-Regel | 69,3er-Regel | Abweichung (72er-Regel) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2,0 % | 35,00 | 36,00 | 35,00 | 34,65 | +1,00 Jahre |
| 4,0 % | 17,67 | 18,00 | 17,50 | 17,33 | +0,33 Jahre |
| 6,0 % | 11,90 | 12,00 | 11,67 | 11,55 | +0,10 Jahre |
| 8,0 % | 9,01 | 9,00 | 8,75 | 8,66 | −0,01 Jahre |
| 10,0 % | 7,27 | 7,20 | 7,00 | 6,93 | −0,07 Jahre |
| 12,0 % | 6,12 | 6,00 | 5,83 | 5,78 | −0,12 Jahre |

Für niedrige Zinssätze zwischen `1 %` und `4 %` (etwa Tagesgeld, Festgeld oder Inflationsraten) arbeitet die **70er-Regel** sichtbar präziser als die 72er-Regel. Zwischen `5 %` und `12 %` – dem typischen Renditekorridor langfristiger Aktien- und Immobilieninvestments – überzeugt hingegen die **72er-Regel** mit minimalen Abweichungen von meist unter zwei Monaten. Erst bei sehr hohen Renditen ab `15 %` unterschätzt die 72er-Regel die reale Dauer zunehmend, weil `ln(1 + r)` deutlich langsamer wächst als `r`.

## Strategische Erkenntnisse, typische Fehler und Risikohinweise

Ein häufiger Denkfehler in der privaten Vermögensplanung besteht darin, die 72er-Regel auf **Bruttorenditen** anzuwenden, ohne laufende Fondsgebühren (Gesamtkostenquote TER), Depotkosten, Kapitalertragsteuer und Inflation abzuziehen. Bereits `1,5 %` Produktkosten bei aktiv gemanagten Fondspolicen reduzieren eine Bruttorendite von `7,5 %` auf `6,0 %` netto und schieben die Kapitalverdopplung von `9,6 Jahren` auf `12,0 Jahre` hinaus. Über drei Jahrzehnte kostet diese scheinbar kleine Differenz einen gesamten Verdopplungszyklus und schmälert das Endvermögen massiv.

Ebenso ungeeignet ist die Formel für **Sparpläne mit monatlichen Raten** oder stark schwankende Börsenrenditen. Bei volatilen Anlagen zählt nicht das arithmetische Mittel der Jahresrenditen, sondern die geometrische Durchschnittsrendite: Verliert ein Depot im ersten Jahr `50 %` und gewinnt im Folgejahr `50 %`, liegt der arithmetische Schnitt bei `0 %`, das Kapital jedoch bei `75 %` des Ausgangswerts. Zudem lässt die Regel Umschuldungseffekte außen vor: Wer einen Konsumentenkredit oder Dispokredit zu `9 %` Sollzins tilgt, erzielt eine risikofreie Nachsteuerrendite von `9 %` und vermeidet eine Schuldenverdopplung binnen acht Jahren. Für den Vermögensvergleich zwischen Immobilien (Netto-Mietrendite nach Instandhaltung und nicht umlagefähigen Nebenkosten) und Wertpapieren empfiehlt es sich daher stets, erst nach Steuern und Kosten zu rechnen.

*Hinweis: Dieser Beitrag dient ausschließlich der allgemeinen Finanzbildung und mathematischen Veranschaulichung. Er stellt weder eine individuelle Anlage-, Steuer- noch Rechtsberatung dar.*
