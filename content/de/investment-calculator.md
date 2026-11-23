---
title: "Investmentrechner"
metaTitle: "Investmentrechner: Zinseszins & Endvermögen berechnen"
description: "Berechnen Sie das zukünftige Endvermögen Ihrer Geldanlage inklusive Startkapital, laufender Sparraten, Zinseszinseffekt und realer Kaufkraft nach Inflation."
metaDescription: "Berechnen Sie Ihr zukünftiges Vermögen mit Startkapital, Sparrate, Zinseszins und Inflation. Inklusive Formeln, DACH-Steuerhinweisen und Beispielrechnung."
metaKeywords: "investmentrechner, anlagerechner, zinseszinsrechner, sparplan rechner, endvermögen berechnen, rendite nach inflation, etf sparplan rechner, kapitalwachstum"
faqs:
  - question: "Wie wirkt sich das Verzinsungsintervall auf das Endvermögen aus?"
    answer: "Je häufiger Zinsen oder Erträge dem Kapital zugeschlagen werden, desto schneller greift der Zinseszinseffekt. Bei einem Nominalzins von 7,00 % p. a. wächst ein Startkapital von 10.000 € über 20 Jahre bei jährlicher Verzinsung auf 38.696,84 €, bei monatlicher Verzinsung hingegen auf 40.387,39 € – allein durch die unterjährige Wiederanlage entstehen 1.690,55 € Mehrertrag."
  - question: "Warum weicht das nominale Endvermögen so deutlich von der realen Kaufkraft ab?"
    answer: "Die Inflation verringert Jahr für Jahr den realen Wert jedes Euros. Selbst eine moderate Teuerungsrate von 2,00 % pro Jahr lässt die Kaufkraft über 20 Jahre um fast ein Drittel schrumpfen. Deshalb zeigt der inflationsbereinigte Endwert an, welchem heutigen Warenkorb Ihr künftiges Depot tatsächlich entspricht."
  - question: "Was unterscheidet vorschüssige von nachschüssigen Sparraten beim Vermögensaufbau?"
    answer: "Bei nachschüssiger Einzahlung fließt die Sparrate jeweils am Periodenende ins Depot und verzinst sich erst ab dem Folgemonat. Bei vorschüssiger Einzahlung am Monatsersten arbeitet jeder Betrag eine volle Periode länger. Über 20 Jahre bringt vorschüssiges Sparen genau den Faktor (1 + r/m) mehr auf den Sparplananteil."
  - question: "Welche realistische Jahresrendite eignet sich für einen ETF-Sparplan?"
    answer: "Breit gestreute globale Aktienindizes erzielten historisch über lange Zeiträume rund 7 % bis 9 % nominale Rendite vor Steuern und Kosten. Für eine vorsichtige Langfristplanung im DACH-Raum empfiehlt es sich, nach laufenden Fondskosten (TER) konservativ mit 5 % bis 7 % nominal zu kalkulieren."
  - question: "Wie mindern Steuern in Deutschland, Österreich und der Schweiz den Zinseszins?"
    answer: "Laufende Steuerabzüge verringern das wiederangelegte Kapital und bremsen das exponentielle Wachstum. In Deutschland greifen die Abgeltungsteuer (26,375 % inkl. Soli) und die jährliche Vorabpauschale unter Berücksichtigung der 30-%-Teilfreistellung bei Aktienfonds; in Österreich fallen 27,5 % KESt an. Privatanleger in der Schweiz versteuern Dividenden als Einkommen, profitieren aber von steuerfreien privaten Kursgewinnen."
---

Langfristiger Vermögensaufbau folgt weniger dem perfekten Einstiegszeitpunkt an der Börse als einer unbestechlichen finanzmathematischen Gesetzmäßigkeit: dem **Zinseszinseffekt**. Sobald erwirtschaftete Zinsen, Dividenden oder Kursgewinne im Depot verbleiben, generieren sie in den Folgejahren selbst neue Erträge. Der **Investmentrechner** verbindet einmaliges Startkapital, regelmäßige Sparraten, erwartete Jahresrendite, Anlagedauer und Teuerungsrate zu einer belastbaren Prognose, sowohl als nominales Endvermögen in Euro als auch inflationsbereinigt in heutiger Kaufkraft.

## Die Zinseszinsformel für Einmalanlage und Sparplan

Die Entwicklung eines Anlageportfolios setzt sich aus zwei mathematisch getrennten Bausteinen zusammen: dem exponentiellen Wachstum des **Startkapitals** und dem **Rentenendwert** aller periodischen Zuzahlungen. Bei regelmäßigen monatlichen, nachschüssigen Sparraten und unterjähriger Verzinsung gilt folgende Formel:

```text
Endkapital (nominal):    K_n = K_0 × (1 + r / m)^n + R × [((1 + r / m)^n − 1) / (r / m)]
Kaufkraft (real):        K_real = K_n / (1 + π)^t
Gesamteinzahlungen:      E_ges = K_0 + R × n
Erwirtschafteter Ertrag: Z_ges = K_n − E_ges
```

Dabei stehen **K_0** für das Startkapital in Euro (`€`), **R** für die regelmäßige Sparrate pro Periode (`€`), **r** für die erwartete nominale Jahresrendite als Dezimalzahl (z. B. `0,07` für 7,00 % p. a.), **m** für die Anzahl der Zahlungs- und Zinsperioden pro Jahr (`12` bei monatlicher, `1` bei jährlicher Einzahlung), **t** für die Anlagedauer in Jahren, **n = m × t** für die Gesamtzahl der Perioden und **π** für die angenommene jährliche Inflationsrate.

Zahlen Sie Ihre Sparrate **vorschüssig** zu Monatsbeginn statt am Monatsende ein, multipliziert sich der zweite Summand einfach mit dem Faktor `(1 + r / m)`. Bei rein jährlicher Verzinsung und jährlichen Sparraten vereinfacht sich `r / m` zu `r` und `n` entspricht unmittelbar den Anlagejahren `t`.

## Durchgerechnetes Beispiel: 10.000 € Startkapital und 300 € Sparrate

Angenommen, eine Anlegerin legt **10.000,00 €** als Einmalbetrag in einen weltweit gestreuten Aktien-ETF an und bespart das Depot zusätzlich mit **300,00 € pro Monat** (nachschüssig). Sie kalkuliert über einen Anlagehorizont von **20 Jahren** (`n = 240 Monate`) mit einer durchschnittlichen nominalen Rendite von **7,00 % p. a.** (`r / 12 = 0,07 / 12 ≈ 0,0058333`) sowie einer jährlichen Inflation von **2,00 %** (`π = 0,02`).

1. **Wachstum des Startkapitals berechnen:** Der Zinsfaktor über 240 Monate beträgt `(1 + 0,07 / 12)^240 ≈ 4,038739`. Aus den ursprünglichen 10.000,00 € werden allein durch Wiederanlage **40.387,39 €**.
2. **Endwert der monatlichen Sparraten ermitteln:** Der Rentenendwertfaktor ergibt `(4,038739 − 1) / (0,07 / 12) ≈ 520,92666`. Multipliziert mit der Monatsrate von 300,00 € wächst der Sparplananteil auf **156.278,00 €**.
3. **Nominales Endvermögen und Zinsanteil summieren:** Beide Komponenten zusammen ergeben exakt **196.665,39 €**. Dem stehen eigene Einzahlungen von **82.000,00 €** (`10.000 € + 240 × 300 €`) gegenüber. Der reine Kapitalertrag beläuft sich auf **114.665,39 €**, also **58,3 %** des gesamten Endvermögens.
4. **Reale Kaufkraft nach Inflation bestimmen:** Um die Teuerung über zwei Jahrzehnte herauszurechnen, wird der Endbetrag durch `1,02^20 ≈ 1,485947` geteilt: `196.665,39 € / 1,485947 = 132.350,17 €`. Das künftige Depot entspricht somit einer heutigen Kaufkraft von gut **132.350 €**.

## Zeithorizont im Vergleich: Wann der Zinseszins die Sparrate überholt

Die exponentielle Beschleunigung zeigt sich eindrucksvoll, wenn dasselbe Szenario (**10.000 €** Startkapital, **300 €** Monatsrate, **7,00 % p. a.** nominal, **2,00 %** Inflation) über unterschiedliche Laufzeiten verglichen wird:

| Anlagedauer | Eigene Einzahlungen | Erwirtschafteter Ertrag | Nominales Endvermögen | Reale Kaufkraft (2 % Infl.) | Ertragsanteil |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **5 Jahre** | 28.000,00 € | 7.654,12 € | 35.654,12 € | 32.293,04 € | 21,5 % |
| **10 Jahre** | 46.000,00 € | 26.022,06 € | 72.022,06 € | 59.083,17 € | 36,1 % |
| **15 Jahre** | 64.000,00 € | 59.578,16 € | 123.578,16 € | 91.820,39 € | 48,2 % |
| **20 Jahre** | 82.000,00 € | 114.665,39 € | 196.665,39 € | 132.350,17 € | 58,3 % |
| **30 Jahre** | 118.000,00 € | 329.156,27 € | 447.156,27 € | 246.861,96 € | 73,6 % |

In den ersten fünf Jahren stammt noch über drei Viertel des Depotwerts aus eigener Sparleistung. Zwischen dem 15. und 16. Anlagejahr überschreitet der kumulierte Ertrag erstmals die Summe aller eigenen Einzahlungen. Nach 30 Jahren machen die Zinseszinsen fast drei Viertel (**73,6 %**) des Endvermögens aus. Eine bewährte Überschlagsformel für die Verdopplungszeit einer Einmalanlage ist die **72er-Regel**: `72 / Rendite in %`, sodass sich Kapital bei 7 % ungefähr alle **10,3 Jahre** verdoppelt.

Für die spätere **Ruhestandsplanung** gilt im DACH-Raum zudem eine vorsichtige Orientierung an der Entnahmephase: Während US-Studien häufig 4,0 % jährliche Anfangsentnahme ansetzen, rechnen europäische Finanzplaner nach Kapitalertragsteuer und Inflation eher mit **3,0 % bis 3,5 %** nachhaltiger Entnahmerate. Für eine dauerhafte Zusatzrente von 1.000 € monatlich (12.000 € jährlich) entspricht dies einem Zielvermögen von rund 340.000 € bis 400.000 € in heutiger Kaufkraft. Wer frühzeitig beginnt, erreicht dieses Ziel bereits mit moderaten Monatsraten.

## Typische Rechenfehler und DACH-Steuerbesonderheiten

- **Produktkosten direkt von der Zielrendite abziehen:** Ein aktiv gemanagter Fonds mit 1,60 % laufenden Kosten (TER) benötigt gegenüber einem kostengünstigen Index-ETF mit 0,20 % TER genau 1,40 Prozentpunkte mehr Bruttorendite, um dasselbe Ergebnis zu erreichen. Geben Sie im Rechner stets die erwartete **Nettorendite nach Fondskosten** ein und prüfen Sie, ob Ausschüttungen automatisch wiederangelegt werden (thesaurierende Anteilsklasse).
- **Steuerlast länderspezifisch berücksichtigen:** In **Deutschland** fallen oberhalb des Sparer-Pauschbetrags (1.000 € bzw. 2.000 € bei Zusammenveranlagung) **26,375 % Abgeltungsteuer** inkl. Solidaritätszuschlag an (zzgl. ggf. Kirchensteuer); Aktienfonds mit über 50 % Aktienquote erhalten jedoch nach § 20 InvStG eine **30-%-Teilfreistellung**, sodass effektiv nur rund 18,46 % auf Gewinne und die jährliche Vorabpauschale anfallen. In **Österreich** werden Dividenden, realisierte Kursgewinne und ausschüttungsgleiche Erträge thesaurierender Fonds einheitlich mit **27,5 % KESt** besteuert. In der **Schweiz** unterliegen laufende Dividenden und Zinsen dem persönlichen Einkommensteuersatz, während Kursgewinne im Privatvermögen steuerfrei bleiben.
- **Fisher-Gleichung statt einfacher Subtraktion:** Die exakte reale Jahresrendite beträgt nicht pauschal `r − π`, sondern `(1 + r) / (1 + π) − 1`. Bei 7,00 % Nominalrendite und 2,00 % Inflation liegt die echte Realrendite bei **4,90 %** statt 5,00 %.
- **Renditereihenfolgerisiko bei der Entnahme bedenken:** Jeder Investmentrechner unterstellt eine geglättete Jahresrendite. An den Kapitalmärkten wechseln jedoch starke Börsenjahre mit zweistelligen Rückgängen. Planen Sie das Geld für ein festes Zieldatum wie den Immobilienkauf oder Renteneintritt, sollten Sie die Schwankungsanfälligkeit Ihres Depots mehrere Jahre vorher schrittweise reduzieren.
