---
title: "Zukunftswert-Rechner"
metaTitle: "Zukunftswert-Rechner | Zinseszins & Rendite berechnen"
description: "Ermitteln Sie den exakten Zukunftswert (Endwert) von Einmalanlagen und laufenden Sparplänen unter Berücksichtigung von Zinseszins, Intervallen und Inflation."
metaDescription: "Berechnen Sie den Zukunftswert Ihrer Kapitalanlagen inklusive Zinseszins, Sparraten und Inflation. Planen Sie Vermögensaufbau und Altersvorsorge präzise."
metaKeywords: "zukunftswert rechner, endwert berechnen, zinseszinsrechner, kapitalendwert formel, rendite rechner, altersvorsorge planen, realwert inflation"
faqs:
  - question: "Was ist der Unterschied zwischen nachschüssiger und vorschüssiger Einzahlung?"
    answer: "Bei einer vorschüssigen Sparrate erfolgt die Einzahlung jeweils zu Beginn der Zinsperiode (z. B. am Monatsanfang), sodass jede Rate eine volle Periode länger verzinst wird als bei der nachschüssigen Zahlung am Periodenende. Mathematisch erhöht sich der Rentenendwert dadurch um den Faktor (1 + r/m)."
  - question: "Wie wirkt sich eine monatliche gegenüber einer jährlichen Verzinsung auf den Zukunftswert aus?"
    answer: "Je häufiger Zinsen dem Kapital gutgeschrieben werden (unterjährige Verzinsung), desto früher erwirtschaften diese Zinsen selbst neue Erträge. Ein nominaler Jahreszins von 6,00 % ergibt bei monatlicher Zinsgutschrift einen effektiven Jahreszins von rund 6,17 %, was über Jahrzehnte einen spürbaren Mehrwert erzeugt."
  - question: "Wie berücksichtige ich die Kapitalertragsteuer im DACH-Raum bei der Endwertberechnung?"
    answer: "Bei ausschüttenden Anlagen oder jährlicher Besteuerung (wie der Vorabpauschale in Deutschland mit 26,375 % inkl. Solidaritätszuschlag, der KESt von 27,5 % in Österreich oder der Verrechnungssteuer auf Dividenden in der Schweiz) reduziert der Steuerabzug den jährlichen Zinseszinseffekt. Für eine realistische Netto-Simulation sollten Sie entweder den Zinssatz nach Steuern ansetzen oder den Steuerabzug bei Endfälligkeit vom Gewinn abziehen."
  - question: "Warum weicht die reale Kaufkraft des Zukunftswerts vom nominalen Endbetrag ab?"
    answer: "Der nominale Zukunftswert zeigt den Kontostand in künftigen Euro oder Schweizer Franken. Da die Inflation das Preisniveau jährlich erhöht, sinkt die reale Kaufkraft. Bei 2,00 % Jahresinflation entspricht ein nominaler Endwert von 100.000,00 € in 20 Jahren einer heutigen Kaufkraft von rund 67.297,13 €."
  - question: "Ab welchem Anlagehorizont übersteigt der Zinseszinsertrag das eingezahlte Eigenkapital?"
    answer: "Nach der sogenannten 72er-Regel verdoppelt sich eine Einmalanlage nach etwa 72 geteilt durch den jährlichen Prozentsatz (bei 6,00 % Rendite also nach rund 12 Jahren). Ab diesem Zeitpunkt besteht mehr als die Hälfte des Zukunftswerts aus erwirtschafteten Zins- und Zinseszinserträgen."
---

## Funktionsweise und finanzmathematische Grundlagen des Zukunftswerts

Der **Zukunftswert** (in der Finanzmathematik als *Endwert* bezeichnet) beziffert den exakten Betrag, auf den ein heute verfügbares Startkapital und optionale laufende Sparraten bis zu einem definierten Stichtag in der Zukunft anwachsen. Grundlage dieser Projektion ist das Prinzip des **Zeitwerts des Geldes**: Ein Euro oder Schweizer Franken, der heute investiert wird, besitzt aufgrund seiner Ertragskraft ein höheres Wertpotenzial als derselbe nominale Betrag in der Zukunft.

Im Gegensatz zu einer linearen Verzinsung, bei der Zinserträge separat ausgezahlt werden, basiert der Zukunftswert beim langfristigen Vermögensaufbau auf dem **exponentiellen Zinseszinseffekt**. Jede gutgeschriebene Zinszahlung oder reinvestierte Dividende erhöht die Kapitalbasis der Folgeperiode. Dadurch wächst das Vermögen nicht entlang einer flachen Gerade, sondern in einer mit zunehmender Laufzeit immer steiler ansteigenden Kurve.

Für Anleger in Deutschland, Österreich und der Schweiz bildet die Endwertberechnung das Rückgrat der privaten Finanzplanung. Ob Sie die Wertentwicklung eines thesaurierenden Welt-ETF-Depots simulieren, ein Festgeldkonto kalkulieren, das Vorsorgekapital der Schweizer Säule 3a hochrechnen oder ein Sparziel für die Immobilienfinanzierung prüfen: Erst die Kombination aus Anfangskapital, Sparrhythmus, Zinsintervall und Inflationsbereinigung liefert eine verlässliche Entscheidungsgrundlage.

---

## Mathematische Formeln zur Berechnung des Zukunftswerts

In der Praxis setzt sich ein Vermögensplan meist aus zwei Komponenten zusammen: einem vorhandenen **Anfangskapital** (Einmalanlage) und einer **regelmäßigen Sparrate** (Rentenendwert). Unser Rechner verknüpft beide Zahlungsströme unter Berücksichtigung unterjähriger Zinsperioden.

### 1. Zukunftswert einer Einmalanlage mit unterjähriger Verzinsung

Wird ein Startbetrag über mehrere Jahre angelegt und erfolgt die Zinsgutschrift $m$-mal pro Jahr, gilt:

$$EW_{\text{Einmal}} = K_0 \cdot \left(1 + \frac{r}{m}\right)^{m \cdot n}$$

### 2. Zukunftswert regelmäßiger Sparraten (Rentenendwertformel)

Fließen zusätzlich in jeder Zinsperiode konstante Sparbeiträge $R$ in die Anlage, hängt die Formel vom Zahlungszeitpunkt innerhalb der Periode ab:

* **Nachschüssige Sparrate (Einzahlung am Periodenende):**
  $$EW_{\text{Rente, nach}} = R \cdot \frac{\left(1 + \frac{r}{m}\right)^{m \cdot n} - 1}{\frac{r}{m}}$$

* **Vorschüssige Sparrate (Einzahlung zu Periodenbeginn):**
  $$EW_{\text{Rente, vor}} = EW_{\text{Rente, nach}} \cdot \left(1 + \frac{r}{m}\right)$$

### 3. Inflationsbereinigter Realwert (Kaufkraftformel)

Um den nominalen Gesamtwert $EW_{\text{gesamt}} = EW_{\text{Einmal}} + EW_{\text{Rente}}$ in heutiger Kaufkraft auszudrücken, wird er über die jährliche Inflationsrate $i$ abgezinst:

$$EW_{\text{real}} = \frac{EW_{\text{gesamt}}}{(1 + i)^n}$$

### Definition der Variablen und Einheiten

* $EW$ (**Endwert / Zukunftswert**): Das Gesamtkapital am Laufzeitende in Euro (`€`) oder Schweizer Franken (`CHF`).
* $K_0$ (**Anfangskapital / Barwert**): Der zu Beginn ($t = 0$) einmalig investierte Betrag in `€` bzw. `CHF`.
* $R$ (**Periodische Sparrate**): Der regelmäßig je Zinsperiode eingezahlte Betrag in `€` bzw. `CHF`.
* $r$ (**Nominaler Jahreszinssatz**): Die erwartete jährliche Rendite als Dezimalwert (z. B. `6,50 %` $= 0,065$).
* $m$ (**Verzinsungsfrequenz pro Jahr**): Anzahl der Zinsperioden pro Jahr ($m = 1$ jährlich, $m = 4$ quartalsweise, $m = 12$ monatlich).
* $n$ (**Anlagedauer**): Der gesamte Betrachtungszeitraum in Jahren (`Jahre`).
* $i$ (**Jährliche Inflationsrate**): Die durchschnittliche Geldentwertung pro Jahr als Dezimalwert (z. B. `2,00 %` $= 0,02$).

---

## Schritt-für-Schritt-Rechenbeispiel aus der Praxis

Ein Anleger möchte über **15 Jahre** Kapital für den Ruhestand aufbauen. Er verfügt über ein Startkapital von **20.000,00 €** und investiert zusätzlich am Ende jedes Jahres eine Sparrate von **3.600,00 €** (`300,00 €` monatlich). Für das Aktien-ETF-Portfolio wird eine nominale Jahresrendite von **6,50 %** bei jährlicher Verzinsung ($m = 1$) sowie eine Inflationsrate von **2,00 %** angesetzt.

1. **Aufzinsungsfaktor über 15 Jahre ermitteln:**
   $$\left(1 + 0,065\right)^{15} = 1,065^{15} \approx 2,571841$$

2. **Zukunftswert des Anfangskapitals berechnen:**
   $$EW_{\text{Einmal}} = 20.000,00\text{ €} \cdot 2,571841 = 51.436,82\text{ €}$$

3. **Zukunftswert der laufenden Sparraten berechnen:**
   $$EW_{\text{Rente, nach}} = 3.600,00\text{ €} \cdot \frac{2,571841 - 1}{0,065} = 3.600,00\text{ €} \cdot 24,182169 = 87.055,81\text{ €}$$

4. **Nominalen Gesamtwert und Ertragsanteil bestimmen:**
   $$EW_{\text{gesamt}} = 51.436,82\text{ €} + 87.055,81\text{ €} = 138.492,63\text{ €}$$
   * **Eigene Einzahlungen:** $20.000,00\text{ €} + (15 \cdot 3.600,00\text{ €}) = 74.000,00\text{ €}$
   * **Zins- und Zinseszinsertrag:** $138.492,63\text{ €} - 74.000,00\text{ €} = 64.492,63\text{ €}$ (`46,57 %` Ertragsanteil).

5. **Reale Kaufkraft nach Inflation prüfen:**
   Bei `2,00 %` Teuerung beträgt der Preisniveaufaktor nach 15 Jahren $1,02^{15} \approx 1,345868$:
   $$EW_{\text{real}} = \frac{138.492,63\text{ €}}{1,345868} = 102.902,06\text{ €}$$
   Das nominale Vermögen von `138.492,63 €` besitzt in 15 Jahren somit die reale Kaufkraft von heute **102.902,06 €**.

---

## Referenztabelle: Wachstum einer Einmalanlage von 10.000,00 €

| Anlagedauer ($n$) | Rendite 3,00 % p. a. (Festgeld) | Rendite 5,00 % p. a. (Mischportfolio) | Rendite 7,00 % p. a. (Welt-Aktien-ETF) | Rendite 9,00 % p. a. (Wachstumsaktien) |
| :--- | :--- | :--- | :--- | :--- |
| **5 Jahre** | 11.592,74 € | 12.762,82 € | 14.025,52 € | 15.386,24 € |
| **10 Jahre** | 13.439,16 € | 16.288,95 € | 19.671,51 € | 23.673,64 € |
| **15 Jahre** | 15.579,67 € | 20.789,28 € | 27.590,32 € | 36.424,82 € |
| **20 Jahre** | 18.061,11 € | 26.532,98 € | 38.696,84 € | 56.044,11 € |
| **25 Jahre** | 20.937,78 € | 33.863,55 € | 54.274,33 € | 86.230,81 € |
| **30 Jahre** | 24.272,62 € | 43.219,42 € | 76.122,55 € | 132.676,78 € |

Während der Unterschied zwischen `3,00 %` und `7,00 %` Rendite nach einem Jahr nur `400,00 €` ausmacht, wächst der Vorsprung über **30 Jahre** durch den Zinseszins auf **51.849,93 €**.

---

## Praxis-Tipps und häufige Kalkulationsfehler im DACH-Raum

1. **Laufende Produktkosten (TER) vorab vom Zinssatz abziehen:** Wenn Sie am Aktienmarkt `7,00 %` Bruttorendite erwarten, Ihr aktiv gemanagter Fonds jedoch `1,50 %` jährliche Verwaltungsgebühren einbehält, dürfen Sie nur mit **5,50 %** Nettorendite vor Steuern kalkulieren. Über 30 Jahre reduziert eine Kostendifferenz von `1,50 %` das Endvermögen um rund ein Drittel.
2. **Steuerstundungseffekt gezielt nutzen:** In Deutschland unterliegen Kapitalerträge oberhalb des Sparer-Pauschbetrags (`1.000,00 €` pro Person) der Abgeltungsteuer inklusive Solidaritätszuschlag (`26,375 %`), wobei Aktien-ETFs von `30 %` Teilfreistellung profitieren (`18,4625 %` effektive Steuer). In Österreich fällt `27,50 %` KESt an, während in der Schweiz private Kursgewinne steuerfrei bleiben und nur Zinsen sowie Dividenden als Einkommen versteuert werden. Thesaurierende ETFs verschieben den Hauptteil der Steuerlast auf den Verkaufszeitpunkt, sodass mehr Kapital im Zinseszinsprozess verbleibt.
3. **Dynamisierung der Sparrate einplanen:** Wer über 25 Jahre eine konstante nominale Monatsrate einzahlt, spart kaufkraftbereinigt jedes Jahr weniger. Erhöhen Sie Ihre Sparrate jährlich um `2,00 %` bis `3,00 %`, um den realen Vermögensaufbau gegen die Inflation zu schützen.
