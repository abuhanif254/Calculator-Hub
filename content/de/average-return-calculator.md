---
title: "Durchschnittliche Rendite Rechner"
metaTitle: "Durchschnittliche Rendite Rechner: CAGR exakt berechnen"
description: "Berechnen Sie die echte geometrische Jahresrendite (CAGR) und das arithmetische Mittel Ihrer Geldanlagen – sowohl aus einzelnen Periodenrenditen als auch aus Anfangs- und Endwert."
metaDescription: "Berechnen Sie geometrische Rendite (CAGR) und arithmetisches Mittel aus Renditefolgen oder Anfangs- und Endwert – inklusive Volatilitäts-Check."
metaKeywords: "durchschnittliche rendite rechner, cagr berechnen, geometrische rendite, arithmetisches mittel rendite, jährliche wachstumsrate, volatilitätsbremse, reale rendite"
faqs:
  - question: "Welche Formel unterscheidet die geometrische Rendite (CAGR) vom arithmetischen Durchschnitt?"
    answer: "Das arithmetische Mittel addiert alle Periodenrenditen und teilt durch deren Anzahl: (r_1 + r_2 + … + r_n) ÷ n. Die geometrische Durchschnittsrendite (CAGR) verknüpft hingegen die Wachstumsfaktoren multiplikativ: [(1 + r_1) × … × (1 + r_n)]^(1 ÷ n) − 1 beziehungsweise (Endwert ÷ Anfangswert)^(1 ÷ n) − 1. Nur sie bildet den realen Vermögenszuwachs mit Zinseszins ab."
  - question: "Warum liegt die geometrische Rendite bei schwankenden Kursen immer unter der arithmetischen?"
    answer: "Wegen der sogenannten Volatilitätsbremse: Prozentuale Verluste wirken auf ein höheres Kapital stärker als prozentual gleich hohe Gewinne auf ein geschrumpftes Kapital. Mathematisch gilt näherungsweise r_geom ≈ r_arith − σ² ÷ 2. Je größer die Schwankungsbreite (Standardabweichung σ), desto stärker bleibt die echte Wachstumsrate hinter dem simplen Durchschnitt zurück."
  - question: "Wie berechne ich die inflationsbereinigte Realrendite exakt nach der Fisher-Gleichung?"
    answer: "Statt die Inflation einfach abzuziehen, lautet die exakte Fisher-Formel r_real = (1 + r_nom) ÷ (1 + π) − 1. Bei einer nominalen CAGR von 3,50 % und 2,50 % jährlicher Inflation ergibt das exakt (1,0350 ÷ 1,0250) − 1 = 0,98 % p. a. real (gegenüber der groben Näherung von 1,00 %)."
  - question: "Kann ich die CAGR-Formel direkt für einen monatlichen ETF-Sparplan verwenden?"
    answer: "Nein. Die einfache Formel (Endwert ÷ Anfangswert)^(1 ÷ n) − 1 setzt voraus, dass zwischendurch kein Kapital eingezahlt oder entnommen wurde. Bei regelmäßigen Sparplanraten würden neue Einzahlungen fälschlich als Kursgewinn erscheinen; für Sparpläne benötigen Sie den internen Zinsfuß (IZF / XINTZINSFUSS) oder die zeitgewichtete Rendite (TTWROR)."
  - question: "Warum erfordert ein Kursverlust von 50 % einen anschließenden Gewinn von 100 %?"
    answer: "Fällt ein Depot von 10.000,00 € um 50 %, verbleibt ein Wert von 5.000,00 €. Um diese 5.000,00 € wieder um 5.000,00 € auf 10.000,00 € zu steigern, muss sich das Restkapital verdoppeln – das entspricht einer Steigerung um exakt 100 %."
---

## Arithmetische Durchschnittsrendite versus geometrische Wachstumsrate (CAGR)

Wer die historische Wertentwicklung eines Aktiendepots, eines globalen ETFs oder einer Einzelaktie prüft, begegnet in Fondsprospekten und Broker-Übersichten häufig widersprüchlichen Prozentangaben. Die Hauptursache ist der fundamentale Unterschied zwischen dem **arithmetischen Mittel** und dem **geometrischen Mittel** – in der internationalen Finanzpraxis als **CAGR** (jährliche Wachstumsrate mit Zinseszinseffekt) etabliert. Während der einfache Durchschnitt lediglich Einzelprozente addiert und den Zinseszinseffekt ignoriert, bildet allein die geometrische Wachstumsrate die tatsächliche Vermögensveränderung über mehrere Jahre hinweg korrekt ab.

Unser **Durchschnittliche Rendite Rechner** deckt beide Analysewege in zwei umschaltbaren Modi ab: Im Modus **Periodische Renditen** erfassen Sie beliebig viele aufeinanderfolgende Jahres- oder Periodenrenditen und erkennen sofort die Abweichung zwischen arithmetischem und geometrischem Mittel. Im Modus **Anfangs- und Endwert** berechnen Sie aus Startkapital, Endkapital und Haltedauer in Jahren direkt Ihre jährliche CAGR sowie die kumulierte Gesamtrendite.

## Mathematische Formeln für Renditefolgen, CAGR und reale Kaufkraft

Für eine Folge von `n` aufeinanderfolgenden Periodenrenditen `r_1, r_2, …, r_n` (als Dezimalzahlen, etwa `0,10` für zehn Prozent Gewinn und `−0,05` für fünf Prozent Verlust) gelten folgende mathematische Gleichungen:

```text
Arithmetisches Mittel:
  r_arith = (r_1 + r_2 + … + r_n) / n

Geometrisches Mittel (aus Periodenrenditen):
  r_geom  = [(1 + r_1) * (1 + r_2) * … * (1 + r_n)]^(1/n) - 1

CAGR (aus Anfangswert V_0, Endwert V_n und Laufzeit n in Jahren):
  CAGR    = (V_n / V_0)^(1/n) - 1
  R_ges   = (V_n - V_0) / |V_0|
```

Dass die geometrische Durchschnittsrendite bei schwankenden Kursen systematisch unter dem arithmetischen Mittel liegt, beruht auf der sogenannten **Volatilitätsbremse**. Bei annähernd normalverteilten Renditen mit Standardabweichung `σ` beschreibt diese Näherungsformel den Effekt sehr präzise:

```text
r_geom ≈ r_arith - (σ² / 2)
```

Je heftiger eine Geldanlage von Jahr zu Jahr schwankt, desto stärker bremst die Volatilität den langfristigen Zinseszinseffekt aus. Nur bei vollkommen konstanten Jahresrenditen (`σ = 0`) fallen arithmetisches und geometrisches Mittel exakt zusammen.

Um aus der nominalen Wachstumsrate `r_nom` den tatsächlichen Kaufkraftzuwachs bei einer jährlichen Inflationsrate `π` zu ermitteln, verwendet die Finanzmathematik die exakte **Fisher-Gleichung** anstelle einer groben Subtraktion:

```text
r_real = (1 + r_nom) / (1 + π) - 1
```

## Durchgerechnetes Beispiel: Vier-Jahres-Renditefolge im Vergleich

Angenommen, Sie investieren **10.000,00 €** als Einmalanlage in ein Aktienportfolio mit vier aufeinanderfolgenden Jahresrenditen: **Jahr 1: +20 %**, **Jahr 2: −15 %**, **Jahr 3: +25 %** und **Jahr 4: −10 %**.

1. **Arithmetisches Mittel (beschönigender Durchschnitt):** Die Summe der vier Einzelrenditen beträgt `20 − 15 + 25 − 10 = 20 Prozentpunkte`. Geteilt durch vier Jahre ergibt sich ein scheinbarer Schnitt von **`+5,00 %` pro Jahr**.
2. **Tatsächlicher Kapitalverlauf Schritt für Schritt:** Nach Jahr eins wächst das Depot auf `12.000,00 €` (`10.000 × 1,20`), fällt im zweiten Jahr um fünfzehn Prozent auf `10.200,00 €`, steigt im dritten Jahr um fünfundzwanzig Prozent auf `12.750,00 €` und schließt nach minus zehn Prozent im vierten Jahr bei exakt **`11.475,00 €`**.
3. **Kumulierte Gesamtrendite (`R_ges`):** Der absolute Gewinn beträgt `1.475,00 €`, entsprechend einer Gesamtrendite von **`+14,75 %`** und einem Gesamtwachstumsfaktor von `1,1475`.
4. **Echte geometrische Jahresrendite (CAGR):** Sie ziehen die vierte Wurzel aus dem Gesamtfaktor (`1,1475^0,25 = 1,034997`) und ziehen eins ab. Die tatsächliche Jahresrendite liegt bei **`+3,50 %` pro Jahr**.
5. **Kaufkraftbereinigte Realrendite (bei `2,50 %` Inflation):** Nach der Fisher-Gleichung ergibt `(1,0350 / 1,0250) − 1` exakt **`+0,98 %` pro Jahr** real.

Obwohl das arithmetische Mittel optimistische fünf Prozent pro Jahr verspricht, ist das Vermögen real vor Inflation tatsächlich nur um **3,50 %** pro Jahr gewachsen – ein Renditeunterschied von **1,50 Prozentpunkten** pro Jahr allein durch Kursschwankungen.

## Referenztabelle: Verlust-Asymmetrie und erforderlicher Aufholgewinn

Die folgende Übersicht verdeutlicht die mathematische Asymmetrie von Kursverlusten und zeigt, wie stark das arithmetische Mittel bei heftigen Schwankungen täuscht:

| Kursverlust | Restwert je 10.000 € | Nötiger Aufholgewinn | Arithmetisch (2 Jahre) | Echte CAGR (2 Jahre) |
| :--- | :--- | :--- | :--- | :--- |
| **−10 %** | 9.000,00 € | +11,11 % | +0,56 % p. a. | 0,00 % p. a. |
| **−20 %** | 8.000,00 € | +25,00 % | +2,50 % p. a. | 0,00 % p. a. |
| **−30 %** | 7.000,00 € | +42,86 % | +6,43 % p. a. | 0,00 % p. a. |
| **−40 %** | 6.000,00 € | +66,67 % | +13,33 % p. a. | 0,00 % p. a. |
| **−50 %** | 5.000,00 € | +100,00 % | +25,00 % p. a. | 0,00 % p. a. |
| **−75 %** | 2.500,00 € | +300,00 % | +112,50 % p. a. | 0,00 % p. a. |

Selbst bei einem Depot, das nach einem Einbruch um fünfzig Prozent im Folgejahr um einhundert Prozent steigt und damit exakt am Ausgangspunkt steht, meldet das arithmetische Mittel irreführende `+25,00 %` pro Jahr, während die CAGR unbestechlich `0,00 %` anzeigt.

## Praxistipps und häufige Fehler bei der Renditebewertung im DACH-Raum

- **Kursindex nicht mit Performanceindex verwechseln:** Beim Depotvergleich entscheidet die Dividendenbehandlung maßgeblich über die Aussagekraft. Der deutsche **DAX** ist als Performanceindex konstruiert und rechnet ausgeschüttete Dividenden automatisch wieder ein. Der schweizerische **SMI** und der österreichische **ATX** werden hingegen klassisch als Preisindizes ohne Dividenden publiziert – für einen fairen Vergleich mit thesaurierenden ETFs sollten Sie daher die Gesamtertrags-Varianten **SMIC** beziehungsweise **ATX TR** heranziehen.
- **Ein- und Auszahlungen sauber trennen (TTWROR vs. IZF):** Die klassische CAGR aus Anfangs- und Endwert setzt voraus, dass zwischendurch kein Geld zu- oder abfließt. Wer monatlich einen ETF-Sparplan bespart oder Teilverkäufe tätigt, sollte zur Bewertung der Anlagestrategie die **zeitgewichtete Rendite (TTWROR)** und zur Messung des eigenen Euro-Erfolgs den **internen Zinsfuß (IZF)** verwenden.
- **Laufende Gebühren und nationale Steuern berücksichtigen:** Produktkosten (TER), Ordergebühren sowie die Kapitalbesteuerung – in Deutschland die Abgeltungsteuer (`26,375 %` inklusive Solidaritätszuschlag abzüglich Sparer-Pauschbetrag und eventueller Teilfreistellung), in Österreich `27,5 %` Kapitalertragsteuer und in der Schweiz Einkommenssteuern auf Dividenden sowie kantonale Vermögenssteuern – schmälern die echte Nettorendite.
- **Totalverlust und kurze Messzeiträume vermeiden:** Fällt eine Einzelposition in einer Periode auf minus einhundert Prozent, wird der Produktfaktor null und die geometrische Rendite kollabiert vollständig. Außerdem verzerrt das Hochrechnen unterjähriger Zeiträume das Ergebnis massiv; belastbar wird die CAGR erst über rollierende fünf, zehn oder fünfzehn Jahre. Erst auf solchen langen Zeithorizonten glätten sich konjunkturelle Zyklen so weit, dass Sie Ihre tatsächliche Anlagestrategie objektiv bewerten und fundierte Anpassungen vornehmen können.
