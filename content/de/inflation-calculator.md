---
title: "Inflationsrechner"
metaTitle: "Inflationsrechner: Kaufkraftverlust & Preisentwicklung"
description: "Berechnen Sie den realen Kaufkraftverlust Ihrer Ersparnisse, zukünftige Lebenshaltungskosten und die kumulierte Teuerung über beliebige Zeiträume."
metaDescription: "Inflationsrechner für Kaufkraftverlust, zukünftige Kosten und kumulierte Teuerung – mit Formel, Rechenbeispiel, Realzins und VPI-Werten im DACH-Raum."
metaKeywords: "inflationsrechner, kaufkraftverlust berechnen, geldentwertung, zukünftige kosten, verbraucherpreisindex, realzins fisher gleichung, inflationsrate"
faqs:
  - question: "Wie berechnet der Inflationsrechner die zukünftige Kaufkraft meines Geldes?"
    answer: "Die künftige Kaufkraft ergibt sich durch Abzinsung des heutigen Geldbetrags mit dem jährlichen Teuerungsfaktor: K_real = K_0 ÷ (1 + r)^t. Steigen die Preise im Durchschnitt um 2,50 % pro Jahr, entsprechen 25.000,00 € auf einem unverzinsten Konto nach 15 Jahren real nur noch einer heutigen Kaufkraft von 17.261,64 €."
  - question: "Worin liegt der Unterschied zwischen Kaufkraftverlust und zukünftigen Kosten?"
    answer: "Beide Kennzahlen beschreiben denselben exponentiellen Zinseszinseffekt aus entgegengesetzten Blickwinkeln. Zukünftige Kosten zeigen, wie viel Euro Sie in einigen Jahren für denselben Warenkorb zahlen müssen (aufsteigende Kurve). Die Kaufkraft zeigt umgekehrt, wie viel von einem statischen Geldbetrag real übrig bleibt (abfallende Kurve)."
  - question: "Welche offizielle Inflationsrate gilt in Deutschland, Österreich und der Schweiz?"
    answer: "In Deutschland misst das Statistische Bundesamt (Destatis) die Teuerung über den Verbraucherpreisindex (VPI), in Österreich veröffentlicht Statistik Austria den österreichischen VPI, und in der Schweiz ermittelt das Bundesamt für Statistik (BFS) den Landesindex der Konsumentenpreise (LIK). Für den Euroraum insgesamt strebt die Europäische Zentralbank (EZB) mittelfristig eine Zielinflation von 2,0 % gemäß Harmonisiertem Verbraucherpreisindex (HVPI) an."
  - question: "Wie berechne ich meinen tatsächlichen Realzins nach Inflation?"
    answer: "Für eine genaue Berechnung nutzen Ökonomen die Fisher-Gleichung: r_real = (1 + i_nom) ÷ (1 + r_inf) − 1. Erwirtschaftet ein Festgeld 3,50 % Nominalzins bei 2,50 % Inflation, beträgt der reale Wertzuwachs vor Steuern nicht genau 1,00 %, sondern exakt 0,98 % pro Jahr – nach Abgeltungsteuer oder KESt schrumpft der Realgewinn nochmals spürbar."
  - question: "Was besagt die 72er-Regel bei der Geldentwertung?"
    answer: "Die 72er-Regel liefert eine schnelle Überschlagsrechnung, nach wie vielen Jahren sich die Kaufkraft Ihres Geldes halbiert. Teilen Sie einfach 72 durch die jährliche Inflationsrate in Prozent: Bei 2,0 % Inflation halbiert sich die Kaufkraft nach rund 36 Jahren, bei 3,0 % nach etwa 24 Jahren und bei 6,0 % bereits nach 12 Jahren."
---

## Die stille Entwertung des Geldes messbar machen

Inflation wirkt im Alltag unspektakulär, entfaltet aber über Jahrzehnte eine gewaltige mathematische Hebelwirkung. Während ein Preisanstieg von `2,5 %` innerhalb eines einzelnen Jahres kaum ins Gewicht fällt, schmilzt dieselbe Teuerungsrate ein unverzinstes Guthaben über zwei oder drei Jahrzehnte um ein Drittel bis mehr als die Hälfte seines realen Werts ab. Wer langfristig für die Altersvorsorge plant, Gehaltsverhandlungen vorbereitet oder Rücklagen auf Giro- und Tagesgeldkonten hält, muss daher stets zwischen **Nominalbeträgen** auf dem Kontoauszug und der tatsächlichen **Kaufkraft** unterscheiden.

Unser **Inflationsrechner** berechnet aus Ihrem Startbetrag, einer erwarteten durchschnittlichen jährlichen Inflationsrate und dem gewünschten Anlage- oder Planungszeitraum sofort drei zentrale Größen: die **zukünftigen Kosten** eines heutigen Warenkorbs, die **verbleibende reale Kaufkraft** eines statischen Geldbetrags sowie die **kumulierte Gesamtinflation** in Prozent – ergänzt durch den jährlichen Kurvenverlauf beider Größen.

## Formeln für Preissteigerung, Kaufkraft und Realzins

Da sich die jährliche Teuerung immer auf das bereits erhöhte Preisniveau des Vorjahres bezieht, folgt die Inflation keiner linearen Addition, sondern einem exponentiellen **Zinseszinseffekt** (dem sogenannten Kaufkraft-Verzinsungsgesetz).

```text
1. Zukünftige Kosten (Preissteigerung eines heutigen Warenkorbs):
   K_zukunft = K_0 * (1 + r)^t

2. Verbleibende reale Kaufkraft (heutiger Geldwert eines zukünftigen Betrags):
   K_real    = K_0 / (1 + r)^t

3. Kumulierte Inflation über den gesamten Zeitraum:
   I_kum (%) = [ (1 + r)^t - 1 ] * 100

4. Exakter Realzins nach der Fisher-Gleichung:
   r_real    = [ (1 + i_nom) / (1 + r) ] - 1
```

**Bedeutung der Variablen:**
- **`K_0`** ist der heutige Ausgangsbetrag beziehungsweise aktuelle Preis in Euro (`€`) oder Schweizer Franken (`CHF`).
- **`r`** steht für die durchschnittliche jährliche Inflationsrate als Dezimalzahl (etwa `0,025` für `2,50 %` pro Jahr).
- **`t`** bezeichnet den Betrachtungszeitraum in Jahren.
- **`K_zukunft`** gibt an, wie viel Euro nach `t` Jahren nötig sind, um denselben Lebensstandard wie heute mit `K_0` zu finanzieren.
- **`K_real`** misst die verbleibende Kaufkraft von unverändert `K_0` nach `t` Jahren in heutiger Währung.
- **`I_kum`** beziffert den gesamten prozentualen Preisanstieg über alle Jahre hinweg, und **`i_nom`** ist ein nominaler Anlagezinssatz für den Realzinsvergleich.

## Schritt-für-Schritt-Rechenbeispiel: 25.000,00 € über 15 Jahre

Angenommen, Sie legen **25.000,00 €** unverzinst als Bargeld oder auf einem zinslosen Girokonto zurück und kalkulieren für die kommenden **15 Jahre** mit einer moderaten durchschnittlichen Inflationsrate von **2,50 % pro Jahr** (`r = 0,025`):

1. **Aufzinsungsfaktor berechnen:** Über fünfzehn Jahre kumuliert sich der Preisfaktor auf `(1 + 0,025)^15 = 1,448298`.
2. **Kumulierte Inflation bestimmen:** `(1,448298 − 1) × 100 = 44,83 %`. Ein naives Multiplizieren von `15 × 2,5 % = 37,5 %` würde die tatsächliche Teuerung um über sieben Prozentpunkte unterschätzen.
3. **Zukünftige Kosten kalkulieren:** Um in 15 Jahren Waren und Dienstleistungen im heutigen Wert von `25.000,00 €` zu bezahlen, benötigen Sie `25.000,00 € × 1,448298 = 36.207,45 €`.
4. **Reale Kaufkraft ermitteln:** Die unveränderten `25.000,00 €` entsprechen nach 15 Jahren real nur noch `25.000,00 € / 1,448298 = 17.261,64 €` heutiger Kaufkraft.
5. **Kaufkraftverlust beziffern:** Der stille Verlust beträgt **`7.738,36 €`** – das entspricht einem realen Wertverlust von **`30,95 %`**.

Möchten Sie diesem Kaufkraftschwund entgegenwirken und legen das Kapital zu **3,50 % Nominalzins** an, liefert die Fisher-Gleichung einen realen Zuwachs vor Steuern von `(1,035 / 1,025) − 1 = 0,98 %` pro Jahr. Berücksichtigt man in Deutschland zusätzlich die Abgeltungsteuer (`26,375 %` inklusive Solidaritätszuschlag oberhalb des Sparer-Pauschbetrags), verbleiben netto lediglich `2,58 %` Nominalrendite und damit fast exakt eine reale Nullrendite (`+0,08 %`).

## Referenztabelle: Kaufkraft und zukünftige Kosten von 10.000,00 €

Die folgende Matrix zeigt für einen Basisbetrag von **10.000,00 €**, wie stark sich bereits kleine Unterschiede in der durchschnittlichen Inflationsrate über lange Laufzeiten auswirken:

| Zeitraum | 2,0 % p. a.: Kaufkraft / Kosten | 3,0 % p. a.: Kaufkraft / Kosten | 5,0 % p. a.: Kaufkraft / Kosten |
| :--- | :--- | :--- | :--- |
| **5 Jahre** | 9.057,31 € / 11.040,81 € | 8.626,09 € / 11.592,74 € | 7.835,26 € / 12.762,82 € |
| **10 Jahre** | 8.203,48 € / 12.189,94 € | 7.440,94 € / 13.439,16 € | 6.139,13 € / 16.288,95 € |
| **15 Jahre** | 7.430,15 € / 13.458,68 € | 6.418,62 € / 15.579,67 € | 4.810,17 € / 20.789,28 € |
| **20 Jahre** | 6.729,71 € / 14.859,47 € | 5.536,76 € / 18.061,11 € | 3.768,89 € / 26.532,98 € |
| **30 Jahre** | 5.520,71 € / 18.113,62 € | 4.119,87 € / 24.272,62 € | 2.313,77 € / 43.219,42 € |

Bei `3,0 %` durchschnittlicher Teuerung sinkt die reale Kaufkraft von `10.000,00 €` binnen dreißig Jahren auf `4.119,87 €`, während derselbe Lebensstandard dann bereits `24.272,62 €` erfordert.

## Praxistipps und häufige Denkfehler rund um Inflation

- **Persönliche Inflationsrate vom offiziellen Warenkorb abgrenzen:** Der amtliche Verbraucherpreisindex (VPI bei Destatis und Statistik Austria, LIK beim Schweizer BFS) bildet einen Durchschnittshaushalt ab. Wer einen hohen Anteil seines Einkommens für Miete, Energie, Kinderbetreuung oder Pflege ausgibt, erlebt häufig eine spürbar höhere persönliche Teuerung als im Gesamtindex ausgewiesen.
- **Steuerliche Belastung in die Realrendite einrechnen:** Kapitalerträge werden in Deutschland mit `25 %` Abgeltungsteuer plus Solidaritätszuschlag, in Österreich meist mit `25 %` (Sparbuch/Tagesgeld) beziehungsweise `27,5 %` Kapitalertragsteuer (KESt) und in der Schweiz über die Einkommenssteuer auf Zinsen und Dividenden besteuert. Da Steuern auf den Nominalertrag erhoben werden, muss die Bruttorendite deutlich oberhalb der Inflationsrate liegen, um die Kaufkraft real zu erhalten.
- **Rentenlücke niemals nominal planen:** Eine gesetzliche oder private Rente von `2.500,00 €` in zwanzig Jahren deckt bei `2,5 %` Inflation lediglich den Lebensstandard von rund `1.526 €` heutiger Kaufkraft. Rechnen Sie Vorsorgeziele deshalb konsequent mit inflationsbereinigten Zielbeträgen durch.
- **Unterschied zwischen Preisniveau und Inflationsrate beachten:** Sinkt die Inflationsrate von `6 %` auf `2 %`, werden Waren nicht wieder günstiger – sie verteuern sich lediglich langsamer (Disinflation). Tatsächlich fallende Preise treten erst bei einer negativen Rate (Deflation) auf.
