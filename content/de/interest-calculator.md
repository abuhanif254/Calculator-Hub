---
title: "Zinsrechner"
metaTitle: "Zinsrechner | Zinseszins, Endkapital & Rendite berechnen"
description: "Berechnen Sie einfache Zinsen, Zinseszinsen, monatliche Sparpläne und Ihr Endkapital inklusive Steuerabzug und Inflationsbereinigung."
metaDescription: "Kostenloser Zinsrechner: Berechnen Sie einfache Zinsen, Zinseszins, Endkapital und Sparplan-Renditen bei jährlicher oder monatlicher Zinsgutschrift."
metaKeywords: "zinsrechner, zinseszinsrechner, zinsen berechnen, endkapital berechnen, einfache zinsen formel, sparplan zinseszins, effektivzins berechnen"
faqs:
  - question: "Worin besteht der genaue Unterschied zwischen einfachen Zinsen und Zinseszinsen?"
    answer: "Bei einfachen Zinsen (linearer Verzinsung) werden die Zinsen in jeder Periode ausschließlich auf das ursprünglich eingezahlte Anfangskapital berechnet und separat ausgeschüttet. Beim Zinseszins (exponentieller Verzinsung) werden die erwirtschafteten Zinsen dem Anlagekapital am Ende jeder Zinsperiode gutgeschrieben (kapitalisiert) und in den Folgeperioden selbst mitverzinst."
  - question: "Wie wirkt sich eine monatliche statt einer jährlichen Zinsgutschrift auf die Rendite aus?"
    answer: "Je häufiger Zinsen unterjährig gutgeschrieben werden, desto früher beginnen diese Erträge selbst Zinseszinsen zu erwirtschaften. Bei einem Nominalzinssatz von 5,00 % p. a. ergibt eine jährliche Zinsgutschrift einen Effektivzins von genau 5,00 %, während eine monatliche Zinsgutschrift (je 0,4167 % pro Monat) zu einer effektiven Jahresrendite von 5,116 % führt."
  - question: "Was bedeutet die deutsche Zinsmethode 30/360 bei der unterjährigen Zinsberechnung?"
    answer: "Nach der im deutschsprachigen Bankwesen verbreiteten deutschen kaufmännischen Zinsmethode (30/360) wird jeder Kalendermonat unabhängig von seiner tatsächlichen Tagesanzahl pauschal mit 30 Zinstagen und das Zinsjahr mit 360 Zinstagen angesetzt. Im Gegensatz dazu rechnen viele Tagesgeldkonten und Anleihen nach der taggenauen Methode act/act (365 bzw. 366 Tage im Schaltjahr)."
  - question: "Wie berechnet man mit der 72er-Regel die Verdopplungszeit eines Kapitals?"
    answer: "Teilen Sie die Zahl 72 durch den jährlichen Zinssatz in Prozent, um die ungefähre Anzahl der Jahre bis zur Kapitalverdopplung durch den Zinseszinseffekt zu erhalten. Bei einem Zinssatz von 4,50 % p. a. verdoppelt sich Ihr angelegtes Kapital beispielsweise nach rund 72 / 4,5 = 16 Jahren (exakt nach 15,75 Jahren)."
  - question: "Wie beeinflussen Abgeltungsteuer und KESt den Zinseszinseffekt im DACH-Raum?"
    answer: "Wird die Kapitalertragsteuer (in Deutschland 25 % Abgeltungsteuer plus 5,5 % Solidaritätszuschlag = 26,375 % oberhalb des Sparer-Pauschbetrags von 1.000 €; in Österreich 25 % auf Sparzinsen bzw. 27,5 % auf Wertpapiere) bei jeder Zinsgutschrift direkt abgezogen, wächst das Kapital nur mit dem Nettozinssatz weiter. Dadurch fällt das Endkapital nach vielen Jahren spürbar geringer aus als bei steuerstundenden thesaurierenden Anlageformen."
---

Ob beim Tagesgeld- und Festgeldsparen, bei verzinsten Anleihen, beim langfristigen Vermögensaufbau über Sparpläne oder bei der Kalkulation von Darlehenskosten: Die **Zins- und Zinseszinsrechnung** bildet das mathematische Fundament jeder Finanzplanung. Während über kurze Zeiträume von wenigen Monaten der Unterschied zwischen einfacher Verzinsung und unterjähriger Kapitalisierung gering bleibt, entfaltet der **Zinseszinseffekt** über mehrjährige Anlagehorizonte ein exponentielles Wachstum, bei dem die Zinserträge nach einiger Zeit das ursprünglich eingesetzte Startkapital übersteigen.

Unser Zinsrechner unterstützt sowohl die lineare Verzinsung ohne Wiederanlage als auch die Zinseszinsberechnung mit frei wählbaren Verzinsungsintervallen (jährlich, quartalsweise, monatlich oder täglich) sowie regelmäßigen Sparplanraten.

## Mathematische Formeln für einfache Zinsen, Zinseszins und Sparpläne

In der Finanzmathematik hängt die Wahl der Berechnungsformel davon ab, ob erwirtschaftete Zinsen am Periodenende ausgezahlt oder dem Kapitalkonto wieder gutgeschrieben (thesauriert) werden.

### 1. Lineare Verzinsung (Einfache Zinsen ohne Wiederanlage)

Werden die Zinsen am Ende jedes Jahres auf ein separates Konto überwiesen, bleibt die Verzinsungsbasis über die gesamte Laufzeit konstant beim Anfangskapital $K_0$. Nach $n$ Jahren beträgt das Gesamtkapital $K_n$:

$$K_n = K_0 \cdot \left(1 + n \cdot r_{\text{nom}}\right)$$

Für unterjährige Zeiträume von $t$ Zinstagen berechnet sich der Zinsertrag $Z$ nach der im DACH-Bankwesen üblichen kaufmännischen Zinsformel (`30/360`):

$$Z = \frac{K_0 \cdot p \cdot t}{100 \cdot 360}$$

Hierbei steht $p$ für den Jahreszinsfuß in Prozent (z. B. $4{,}5$ für `4,50 %`) und $t$ für die Anzahl der Zinstage.

### 2. Exponentielle Verzinsung (Zinseszins mit unterjähriger Gutschrift)

Fließen die Zinsen $m$-mal pro Jahr in das Anlagekapital zurück, wird in jeder Teilperiode ein anteiliger Periodenzins von $\frac{r_{\text{nom}}}{m}$ auf das bereits angewachsene Kapital gezahlt. Für das Endkapital $K_n$ nach $n$ Jahren gilt:

$$K_n = K_0 \cdot \left(1 + \frac{r_{\text{nom}}}{m}\right)^{m \cdot n}$$

Die Variablen sind wie folgt definiert:
*   $K_0$: Angelegtes Startkapital in Euro (`€`) oder Schweizer Franken (`CHF`)
*   $r_{\text{nom}}$: Jährlicher Nominalzinssatz als Dezimalwert (z. B. $0{,}045$ für `4,50 %` p. a.)
*   $m$: Anzahl der Zinsgutschriften pro Jahr ($m = 1$ jährlich, $m = 4$ vierteljährlich, $m = 12$ monatlich, $m = 365$ täglich)
*   $n$: Gesamte Anlagedauer in Jahren

Aus der unterjährigen Zinseszinsformel leitet sich der **effektive Jahreszins ($r_{\text{eff}}$)** ab, der Zinsangebote mit unterschiedlichen Ausschüttungsintervallen vergleichbar macht:

$$r_{\text{eff}} = \left(1 + \frac{r_{\text{nom}}}{m}\right)^m - 1$$

### 3. Kombination aus Startkapital und monatlichem Sparplan

Wird zusätzlich zum Anfangskapital $K_0$ am Monatsende (nachschüssig) eine konstante Sparrate $R$ eingezahlt, setzt sich das Gesamtkapital nach $N = 12 \cdot n$ Monaten bei monatlicher Verzinsung ($i_m = \frac{r_{\text{nom}}}{12}$) aus dem aufgezinsten Startkapital und dem Rentenendwert zusammen:

$$K_{\text{gesamt}} = K_0 \cdot \left(1 + i_m\right)^N + R \cdot \frac{\left(1 + i_m\right)^N - 1}{i_m}$$

## Praxisbeispiel: Schritt-für-Schritt-Rechnung über 15 Jahre

Ein Sparer legt ein Startkapital von **$K_0 = 20.000{,}00\text{ €}$** für **$n = 15\text{ Jahre}$** zu einem festen Nominalzinssatz von **$r_{\text{nom}} = 4{,}50\text{ \%}$ p. a.** ($0{,}045$) an. Wir vergleichen vier Szenarien:

1.  **Szenario A – Einfache Zinsen (jährliche Auszahlung):**
    Pro Jahr entstehen $20.000{,}00\text{ €} \cdot 0{,}045 = 900{,}00\text{ €}$ Zinsen. Nach 15 Jahren beträgt die Zinssumme $15 \cdot 900{,}00\text{ €} = 13.500{,}00\text{ €}$.
    $$K_{15,\text{einfach}} = 20.000{,}00\text{ €} + 13.500{,}00\text{ €} = 33.500{,}00\text{ €}$$
2.  **Szenario B – Jährlicher Zinseszins ($m = 1$):**
    $$K_{15,\text{jährlich}} = 20.000{,}00\text{ €} \cdot (1 + 0{,}045)^{15} = 20.000{,}00\text{ €} \cdot 1{,}935282 = 38.705{,}65\text{ €}$$
    Durch die Wiederanlage der Zinsen entsteht ein Mehrertrag von **5.205,65 €** gegenüber der einfachen Verzinsung.
3.  **Szenario C – Monatlicher Zinseszins ($m = 12$, Monatszins $i_m = 0{,}375\text{ \%} = 0{,}00375$, $N = 180$ Monate):**
    $$K_{15,\text{monatlich}} = 20.000{,}00\text{ €} \cdot (1{,}00375)^{180} = 20.000{,}00\text{ €} \cdot 1{,}961543 = 39.230{,}85\text{ €}$$
    Die monatliche Kapitalisierung hebt den Effektivzins auf `4,594 %` p. a. und bringt weitere **525,20 €** Zinsvorteil.
4.  **Szenario D – Monatlicher Zinseszins plus 250,00 € monatliche Sparrate ($R = 250{,}00\text{ €}$):**
    Der Sparplananteil wächst über 180 Monate auf:
    $$K_{\text{Sparplan}} = 250{,}00\text{ €} \cdot \frac{1{,}961543 - 1}{0{,}00375} = 250{,}00\text{ €} \cdot 256{,}4114 = 64.102{,}85\text{ €}$$
    Zusammen mit dem aufgezinsten Startkapital aus Szenario C ergibt sich ein Endvermögen von **$39.230{,}85\text{ €} + 64.102{,}85\text{ €} = 103.333{,}70\text{ €}$** (bei `65.000,00 €` Gesamteinzahlungen und `38.333,70 €` Zinserträgen).

## Referenzmatrix: Entwicklung von 10.000,00 € bei 5,00 % Nominalzins p. a.

Die Tabelle zeigt, wie stark das Verzinsungsintervall und die Haltedauer das Endkapital einer Einmalanlage von **10.000,00 €** bei **5,00 % p. a.** beeinflussen:

| Verzinsungsmodell | Effektivzins ($r_{\text{eff}}$) | Nach 5 Jahren | Nach 10 Jahren | Nach 20 Jahren | Nach 30 Jahren |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Einfache Zinsen (linear)** | `5,000 %` (ohne Wiederanlage) | `12.500,00 €` | `15.000,00 €` | `20.000,00 €` | `25.000,00 €` |
| **Jährlicher Zinseszins ($m = 1$)** | **5,000 % p. a.** | `12.762,82 €` | `16.288,95 €` | `26.532,98 €` | `43.219,42 €` |
| **Quartalszinseszins ($m = 4$)** | **5,095 % p. a.** | `12.820,37 €` | `16.436,19 €` | `27.014,85 €` | `44.402,13 €` |
| **Monatszinseszins ($m = 12$)** | **5,116 % p. a.** | `12.833,59 €` | `16.470,09 €` | `27.126,40 €` | `44.677,44 €` |
| **Tageszinseszins ($m = 365$)** | **5,127 % p. a.** | `12.840,03 €` | `16.486,65 €` | `27.180,96 €` | `44.812,29 €` |

## Wichtige Praxisfaktoren: Steuern und Realverzinsung im DACH-Raum

*   **Kapitalertragsteuer direkt in den Nettozins einrechnen:** In Deutschland unterliegen Zinserträge oberhalb des Sparer-Pauschbetrags (`1.000,00 €` für Ledige, `2.000,00 €` für Zusammenveranlagte) der Abgeltungsteuer von `25,00 %` zuzüglich `5,50 %` Solidaritätszuschlag (insgesamt **26,375 %** ohne Kirchensteuer). In Österreich fällt auf Bankzinsen eine Kapitalertragsteuer (KESt) von **25,00 %** (bei Wertpapieren **27,50 %**) an. Um das Endkapital nach Steuern im Zinsrechner abzubilden, multiplizieren Sie Ihren Bruttozinssatz bei ausgeschöpftem Freibetrag mit $0{,}73625$ (Deutschland) bzw. $0{,}75$ (Österreich): Aus `4,00 %` Bruttozins werden so rund `2,95 %` bzw. `3,00 %` Nettozins.
*   **Exakte Kaufkraftberechnung über die Fisher-Gleichung:** Um zu prüfen, ob Ihr Erspartes nach Abzug der Inflation ($\pi$) real an Kaufkraft gewinnt, berechnet sich der reale Kaufkraftzuwachs exakt nach:
    $$r_{\text{real}} = \frac{1 + r_{\text{netto}}}{1 + \pi} - 1$$
    Liegt Ihr Nettozins nach Steuern bei `3,00 %` und die Inflationsrate bei `2,40 %`, beträgt Ihre reale Kaufkraftrendite $\frac{1{,}03}{1{,}024} - 1 = 0{,}586\text{ \%}$ p. a.
*   **Vorschüssige vs. nachschüssige Sparplanraten:** Wird ein Dauerauftrag am Monatsanfang (vorschüssig) ausgeführt, wird jede Rate einen Monat länger verzinst als am Monatsende (nachschüssig). Dazu wird der nachschüssige Sparplan-Endwert mit $(1 + i_m)$ multipliziert.
