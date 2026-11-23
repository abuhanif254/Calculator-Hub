---
title: "Finanzrechner"
metaTitle: "Finanzrechner: Zeitwert des Geldes & Endkapital berechnen"
description: "Berechnen Sie Endkapital, Zinseszins und regelmäßige Sparraten aus Barwert, Zinssatz, Zinsintervall und Anlagehorizont."
metaDescription: "Berechnen Sie Endkapital, Zinseszins und regelmäßige Sparraten mit unserem Finanzrechner – inklusive Barwertformel, Praxisbeispiel und DACH-Steuerinfos."
metaKeywords: "finanzrechner, zeitwert des geldes, endkapital berechnen, barwert formel, zinseszins sparplan, vermögensaufbau rechner, realrendite"
faqs:
  - question: "Was bedeutet der Zeitwert des Geldes in der Praxis?"
    answer: "Der Zeitwert des Geldes besagt, dass ein heute verfügbarer Euro mehr wert ist als derselbe Euro in der Zukunft. Wer Kapital sofort anlegt, erzielt Zinsen oder Renditen – und verliert bei aufgeschobenen Zahlungen sowohl diesen Zinseszins als auch reale Kaufkraft durch Inflation."
  - question: "Wie wirkt sich die Verzinsungshäufigkeit auf mein Endkapital aus?"
    answer: "Je häufiger Zinsen gutgeschrieben und wiederverzinst werden, desto höher fällt der effektive Jahreszins aus. Bei 6,00 % Nominalzins liegt die Effektivverzinsung bei jährlicher Gutschrift bei exakt 6,00 %, bei quartalsweiser Gutschrift bei 6,14 % und bei monatlicher Verzinsung bei 6,17 %."
  - question: "Rechnet der Finanzrechner mit vorschüssigen oder nachschüssigen Einzahlungen?"
    answer: "Der Rechner arbeitet mit nachschüssigen Einzahlungen am Ende jeder Zinsperiode und teilt die jährliche Zuzahlung gleichmäßig auf das gewählte Intervall auf. Bei vorschüssigen Sparplänen zum Monatsanfang fällt das Endkapital leicht höher aus – um genau eine zusätzliche Zinsperiode pro Rate."
  - question: "Berücksichtigt der Rechner Abgeltungsteuer, KESt oder Inflation?"
    answer: "Nein, ausgewiesen werden nominale Bruttobeträge vor Steuern, Fondsgebühren und Inflation. Um die reale Kaufkraft nach Preissteigerung abzuschätzen, ziehen Sie von Ihrer erwarteten Nominalrendite die voraussichtliche Inflationsrate sowie anfallende Kapitalertragsteuern ab."
  - question: "Kann ich den Finanzrechner auch in Euro oder Schweizer Franken verwenden?"
    answer: "Ja, die Zinseszins- und Rentenformel ist vollständig währungsunabhängig. Solange Startkapital und jährliche Zuzahlung in derselben Währung eingegeben werden – etwa in Euro (€) oder Schweizer Franken (CHF) –, gilt das berechnete Endkapital eins zu eins in genau dieser Währung."
---

Ein Euro heute ist mehr wert als ein Euro in zehn Jahren – diese Grundregel bildet das Fundament jeder seriösen Vermögensplanung. Wer für die Altersvorsorge spart, eine Immobilienanzahlung aufbaut, ein Ausbildungskonto für Kinder anlegt oder eine Abfindung investiert, muss das Zusammenspiel aus Startkapital, laufenden Einzahlungen, Zinssatz, Verzinsungsintervall und Anlagehorizont präzise beziffern können. Genau dieses Prinzip des **Zeitwerts des Geldes** macht unser **Finanzrechner** greifbar: Er projiziert das Endkapital (Zukunftswert), trennt eigene Einzahlungen sauber vom erzielten Zinseszins und visualisiert den exponentiellen Vermögensverlauf Jahr für Jahr.

## Die maßgeblichen Formeln: Endkapital, Barwert und Effektivzins

Der Rechner kombiniert zwei klassische Bausteine der Finanzmathematik: die Aufzinsung eines einmaligen Startkapitals und den Endwert einer nachschüssigen, gleichmäßigen Zahlungsreihe. Die angegebene jährliche Zuzahlung wird dazu gleichmäßig auf die gewählten Zinsperioden pro Jahr aufgeteilt (`m = 1` für jährlich, `m = 4` für vierteljährlich, `m = 12` für monatlich):

```text
Periodenzinssatz:      i = r / m        und   Gesamtperioden: n = m × t
Periodische Rate:      R = Z_jahr / m
Endkapital (i > 0):    EW = BW × (1 + i)^n + R × [((1 + i)^n − 1) / i]
Endkapital (i = 0):    EW = BW + Z_jahr × t
Zinsertrag gesamt:     Z_ges = EW − (BW + Z_jahr × t)
Barwert (Abzinsung):   BW = EW / (1 + i)^n
Effektiver Jahreszins: i_eff = (1 + r / m)^m − 1
Realrendite (Fisher):  r_real = (1 + r_nom) / (1 + π) − 1
```

Dabei stehen **BW** für den Barwert beziehungsweise das Startkapital in Euro (`€`, international oft `PV`), **Z_jahr** für die jährliche Zuzahlung (`PMT`), **r** für den nominalen Jahreszinssatz als Dezimalzahl (etwa `0,06` für `6,0 %`), **m** für die Anzahl der Zinsgutschriften pro Jahr, **t** für den Anlagehorizont in Jahren, **EW** für den Zukunftswert (`FV`) und **π** für die jährliche Inflationsrate.

Mit der umgekehrten **Barwertformel** lässt sich zudem prüfen, welchen heutigen Gegenwert eine künftige Auszahlung besitzt: Benötigen Sie in **10 Jahren** exakt **50.000,00 €** und kalkulieren mit **6,00 %** jährlicher Rendite (`m = 1`), müssen Sie heute `50.000 / 1,06^10 = 27.919,74 €` anlegen. Zur raschen Überschlagsrechnung im Kopf hilft außerdem die bewährte **72er-Regel**: Teilen Sie die Zahl 72 durch den jährlichen Zinssatz in Prozent, erhalten Sie die ungefähre Verdopplungszeit einer Einmalanlage – bei **6,0 %** also rund **12 Jahre** (exakt `11,90 Jahre`).

## Rechenbeispiel: 10.000 € Startkapital plus 200 € Sparplan über 15 Jahre

Angenommen, Sie investieren **10.000,00 €** als Einmalanlage und sparen zusätzlich **2.400,00 € pro Jahr** (entspricht **200,00 € monatlich**) in ein breit gestreutes Depot mit einer angenommenen nominalen Rendite von **6,00 % p. a.** bei **monatlicher Verzinsung** (`m = 12`) über **15 Jahre** (`t = 15`).

1. **Periodenwerte bestimmen:** Der monatliche Zinssatz beträgt `i = 0,06 / 12 = 0,005` (`0,5 %`), die Laufzeit umfasst `n = 12 × 15 = 180` Zinsperioden, und die Monatsrate liegt bei `R = 2.400 / 12 = 200,00 €`.
2. **Aufzinsungsfaktor berechnen:** `(1 + 0,005)^180 = 2,454094`. Durch die monatliche Wiederanlage steigt der effektive Jahreszins von 6,00 % nominal auf `1,005^12 − 1 = 6,17 %`.
3. **Wachstum des Startkapitals:** `10.000,00 € × 2,454094 = 24.540,94 €`.
4. **Wachstum der laufenden Einzahlungen:** `200,00 € × [(2,454094 − 1) / 0,005] = 200,00 € × 290,818712 = 58.163,74 €`.
5. **Gesamtergebnis zusammenführen:** Das Endkapital erreicht **82.704,68 €** (auf volle Euro gerundet `82.705 €`). Davon stammen **46.000,00 €** aus eigenen Einzahlungen (`10.000 € + 15 × 2.400 €`) und **36.704,68 €** aus reinem Zinseszins – das entspricht bereits **44,4 %** des gesamten Endvermögens.

Zum Vergleich: Bei rein **jährlicher** Verzinsung (`m = 1`, nachschüssige Jahresrate am Jahresende) kämen bei identischen Einzahlungen nur **79.827,91 €** zusammen – ein Unterschied von **2.876,77 €**, weil monatliche Raten im Durchschnitt rund ein halbes Jahr früher im Markt arbeiten. Bei quartalsweiser Verzinsung (`m = 4`) liegt das Ergebnis mit **82.160,99 €** knapp unter der monatlichen Variante.

## Vergleichstabelle: Zinseszinseffekt über verschiedene Laufzeiten und Renditen

Die folgende Übersicht zeigt für **10.000 € Startkapital** und **2.400 € jährliche Einzahlung** bei monatlicher Verzinsung, wie stark Anlagehorizont und Zinssatz das Endvermögen hebeln (alle Beträge in €):

| Laufzeit | Einzahlungen (in €) | 4,0 % p. a. (in €) | 6,0 % p. a. (in € / Zinsanteil) | 8,0 % p. a. (in €) |
| :--- | :--- | :--- | :--- | :--- |
| **5 Jahre** | 22.000,00 | 25.469,76 | 27.442,51 (19,8 %) | 29.593,83 |
| **10 Jahre** | 34.000,00 | 44.358,29 | 50.969,84 (33,3 %) | 58.785,61 |
| **15 Jahre** | 46.000,00 | 67.421,11 | 82.704,68 (44,4 %) | 102.276,86 |
| **20 Jahre** | 58.000,00 | 95.580,75 | 125.510,22 (53,8 %) | 167.072,11 |
| **30 Jahre** | 82.000,00 | 171.944,86 | 261.128,76 (68,6 %) | 407.429,19 |

Zwischen Jahr 20 und Jahr 30 mehr als verdoppelt sich das Endkapital bei 6,0 % p. a., obwohl lediglich weitere **24.000 €** eingezahlt werden: Über zwei Drittel des gesamten Vermögens (**68,6 %**) speisen sich dann allein aus dem Zinseszinseffekt. Ein früher Sparbeginn wiegt langfristig deutlich schwerer als eine spät erhöhte Sparrate, weil frühe Beiträge mehr Zinsperioden durchlaufen.

## Praxistipps und Steuerregeln für die Finanzplanung im DACH-Raum

- **Kapitalertragsteuern realistisch einkalkulieren:** In **Deutschland** unterliegen Zinsen, Dividenden und realisierte Kursgewinne oberhalb des Sparer-Pauschbetrags (**1.000 €** je Einzelperson, **2.000 €** bei Zusammenveranlagung) der Abgeltungsteuer von **26,375 %** inklusive Solidaritätszuschlag (zzgl. eventueller Kirchensteuer; bei Aktien-ETFs greifen 30 % Teilfreistellung sowie die jährliche Vorabpauschale). In **Österreich** werden **27,5 % KESt** einbehalten; in der **Schweiz** zählen Zinsen und Dividenden zum regulären Einkommen, während private Kapitalgewinne grundsätzlich steuerfrei bleiben.
- **Inflation nicht mit Nominalzinsen verwechseln:** Eine Anlage mit **6,0 %** Nominalrendite erzielt bei **2,5 %** Teuerung nach der Fisher-Gleichung nur eine reale Kaufkraftsteigerung von `(1,06 / 1,025) − 1 = 3,41 % p. a.`. Prüfen Sie langfristige Vorsorgeziele deshalb immer einmal nominal und einmal mit konservativer Realrendite.
- **Laufende Produktkosten direkt vom Zinssatz abziehen:** Eine jährliche Verwaltungsgebühr (TER) von **1,50 %** gegenüber einem günstigen Indexfonds mit **0,20 %** drückt Ihre Nettorendite dauerhaft um **1,30 Prozentpunkte** – über 25 Jahre schmälert allein diese Kostendifferenz das Endvermögen um zehntausende Euro.
- **Renditeschwankungen und Entnahmephase bedenken:** Der Finanzrechner unterstellt eine geglättete Durchschnittsrendite. An den Kapitalmärkten schwanken Jahreserträge erheblich; besonders kurz vor dem geplanten Auszahlungszeitpunkt entscheidet die zeitliche Reihenfolge guter und schwacher Börsenjahre (Renditereihenfolgerisiko) über das tatsächliche Endresultat.
