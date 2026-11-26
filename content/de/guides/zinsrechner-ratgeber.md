---
title: "Einfache vs. Zinseszinsen: Ein vollständiger Wachstumsleitfaden"
description: "Lernen Sie den mathematischen Unterschied zwischen linearer und exponentieller Verzinsung, die Wirkung regelmäßiger Sparraten, die 72er-Regel sowie den Einfluss von Steuern und Fondskosten."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "interest-calculator"
faqs:
  - question: "Wann werden in Deutschland und Europa einfache Zinsen statt Zinseszinsen verwendet?"
    answer: "Einfache (lineare) Zinsen kommen typischerweise innerhalb einer einzelnen laufenden Zinsperiode zum Einsatz — etwa bei unterjährigen Tagesgeld-Abrechnungen bis zum Jahresende, bei Stückzinsen von Anleihen sowie bei gesetzlichen Verzugszinsen nach § 288 BGB, da § 289 BGB für Verzugszinsen ausdrücklich ein Zinseszinsverbot vorschreibt."
  - question: "Wie funktioniert die 72er-Regel und wann ist sie ungenau?"
    answer: "Die 72er-Regel schätzt die Verdopplungszeit eines Kapitals durch die Division 72 ÷ (Zinssatz in Prozent). Bei 6 % verdoppelt sich ein Betrag in rund 12 Jahren (exakt: 11,90 Jahre). Im Bereich von 4 % bis 10 % liegt die Abweichung unter zwei Monaten; bei extrem hohen Zinssätzen über 20 % unterschätzt sie die Geschwindigkeit jedoch zunehmend, sodass die exakte Formel ln(2) ÷ ln(1 + r) verwendet werden sollte."
  - question: "Wie wirkt sich eine monatliche statt jährlicher Zinsgutschrift langfristig aus?"
    answer: "Je häufiger Zinsen dem Kapital zugeschlagen werden, desto früher arbeiten diese Erträge selbst weiter. Bei 10.000 € zu 6,0 % über 30 Jahre steigt das Endkapital von 57.434,91 € (jährliche Gutschrift) auf 60.225,75 € (monatliche Gutschrift) — ein Plus von 2.790,84 € bei exakt demselben Nominalzinssatz."
  - question: "Wie bremst die Abgeltungsteuer den Zinseszinseffekt bei Sparanlagen?"
    answer: "Wenn Zinserträge oberhalb des Sparer-Pauschbetrags (1.000 € pro Person bzw. 2.000 € bei Zusammenveranlagung in Deutschland) jährlich automatisch der Abgeltungsteuer von 26,375 % unterliegen, steht in den Folgejahren jeweils nur der Nettoertrag zur Weiterverzinsung bereit. Anlagen mit weitgehender Steuerstundung bis zum Verkauf — etwa thesaurierende Aktien-ETFs jenseits der geringeren Vorabpauschale — erhalten einen deutlich größeren Teil der Zinseszinsbasis."
  - question: "Warum fressen hohe laufende Fondskosten (TER) langfristig einen Großteil der Rendite auf?"
    answer: "Verwaltungsgebühren wirken jedes Jahr wie ein negativer Zinseszins auf das gesamte Depotvermögen, nicht nur auf die Erträge. Ein Kostenunterschied von 1,60 Prozentpunkten pro Jahr (z. B. 1,80 % bei einem aktiven Fonds gegenüber 0,20 % bei einem Index-ETF) reduziert das Endvermögen über 30 Jahre bei gleicher Bruttorendite um mehr als ein Drittel."
---

Zinsen sind der Preis für überlassenes Kapital — für Sparer stellen sie Ertrag dar, für Kreditnehmer Kosten. Doch zwei identische Zinssätze können über mehrere Jahrzehnte zu völlig unterschiedlichen Ergebnissen führen, je nachdem, ob die Verzinsung **einfach (linear)** oder mit **Zinseszins (exponentiell)** erfolgt. Während einfache Zinsen ausschließlich auf das ursprüngliche Anfangskapital berechnet werden, schlägt der Zinseszins bereits verdiente Erträge dem Kapital zu, sodass in jeder Folgeperiode auch Zinsen auf frühere Zinsen anfallen.

Auf kurze Sicht wirkt dieser Unterschied unscheinbar; über `20` bis `40` Jahre wird die Zeit jedoch zum dominierenden Hebel der Vermögensbildung. Mit unserem [Zinsrechner](/de/rechner/zinsrechner) stellen Sie lineare Entwicklung, reinen Zinseszins und regelmäßige Sparpläne direkt gegenüber.

## Formeln und Parameter: Lineare vs. exponentielle Verzinsung

Für die Berechnung von Kapitalwachstum und Verdopplungszeit gelten in der Finanzmathematik vier zentrale Gleichungen:

```text
Einfache Zinsen (linear):        K_t = K_0 × (1 + r × t)
Zinseszins (Einmalanlage):       K_t = K_0 × (1 + r / m)^(m × t)
Zinseszins mit Sparrate R:       K_t = K_0 × (1 + r / m)^(m × t) + R × [((1 + r / m)^(m × t) − 1) / (r / m)]
72er-Regel (Verdopplungszeit):   t_2 ≈ 72 / (r × 100)     [exakt: t_2 = ln(2) / ln(1 + r)]
```

Dabei stehen die Variablen für folgende Größen:
- **`K_0` (Anfangskapital):** Der zu Beginn angelegte oder geliehene Betrag in Euro.
- **`K_t` (Endkapital):** Der Gesamtwert nach Ablauf von `t` Jahren.
- **`r` (jährlicher Nominalzinssatz):** Der Zinssatz als Dezimalwert (z. B. `0,06` für `6,0 %` p. a.).
- **`m` (Zinsperioden pro Jahr):** Anzahl der jährlichen Zinsgutschriften (`m = 1` jährlich, `m = 4` quartalsweise, `m = 12` monatlich).
- **`t` (Anlagedauer in Jahren):** Gesamtlaufzeit der Anlage.
- **`R` (regelmäßige Einzahlung):** Nachschüssige Sparrate pro Zinsperiode (z. B. monatlicher Sparbetrag bei `m = 12`).

## Durchgerechnetes Beispiel: 10.000 € über 30 Jahre in drei Varianten

Sie legen heute **`10.000 €`** (`K_0 = 10.000 €`) zu einem konstanten jährlichen Zinssatz von **`6,0 %`** (`r = 0,06`) über einen Zeitraum von **`30` Jahren** (`t = 30`) an.

### Variante A: Einfache Zinsen (keine Wiederanlage)

Die jährlichen Zinsen werden stets auf `10.000 €` berechnet und jedes Jahr ausgeschüttet, sodass sie sich nicht mitverzinsen:

```text
Jährlicher Zins = 10.000 € × 0,06 = 600,00 €
K_30            = 10.000 € × (1 + 0,06 × 30) = 28.000,00 €
```

Nach `30` Jahren stehen **`10.000,00 €`** Startkapital exakt **`18.000,00 €`** kumulierten Zinsen gegenüber.

### Variante B: Jährlicher Zinseszins (`m = 1`, keine Sparrate)

Die Zinsen verbleiben im Depot und wachsen exponentiell mit:

```text
K_30 = 10.000 € × (1 + 0,06)^30 = 10.000 € × 5,743491 = 57.434,91 €
```

Das Endkapital ist mit **`57.434,91 €`** mehr als doppelt so hoch wie bei einfacher Verzinsung (`+29.434,91 €` Zinseszinseffekt). Allein im `30.` Jahr erwirtschaftet das angesammelte Kapital `3.251,03 €` Zinsen — mehr als das Fünffache des ersten Jahres (`600 €`).

### Variante C: Monatlicher Zinseszins (`m = 12`) plus 150 € Monatsrate

Kombinieren Sie die `10.000 €` Startkapital mit einer monatlichen Sparrate von **`150 €`** (`R = 150 €`) bei monatlicher Verzinsung (`0,06 ÷ 12 = 0,005` über `360` Monate), verstärken sich Einzahlungen und Exponent gegenseitig:

```text
(1,005)^360  = 6,02257521
Endkapital   = 10.000 € × 6,02257521 + 150 € × [(6,02257521 − 1) / 0,005]
             = 60.225,75 € + 150.677,26 € = 210.903,01 €
```

Ihre eigenen Einzahlungen betragen insgesamt `10.000 € + (360 × 150 €) = 64.000,00 €`. Die restlichen **`146.903,01 €`** — knapp `70 %` Ihres Endvermögens — stammen aus Zins- und Zinseszinserträgen.

## Wachstumsvergleich über 1 bis 40 Jahre bei 6,0 % p. a.

Die Tabelle verdeutlicht anhand eines Startkapitals von `10.000 €` (ohne laufende Sparrate), wie langsam der Zinseszins in den ersten Jahren startet — und wie stark er nach zwei Jahrzehnten beschleunigt:

| Anlagedauer (`t`) | Einfache Zinsen | Zinseszins jährlich | Zinseszins monatlich | Vorteil monatlich vs. linear | Zinsanteil am Endkapital (jährl.) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`1` Jahr** | `10.600,00 €` | `10.600,00 €` | `10.616,78 €` | `+16,78 €` | `5,7 %` |
| **`5` Jahre** | `13.000,00 €` | `13.382,26 €` | `13.488,50 €` | `+488,50 €` | `25,3 %` |
| **`10` Jahre** | `16.000,00 €` | `17.908,48 €` | `18.193,97 €` | `+2.193,97 €` | `44,2 %` |
| **`20` Jahre** | `22.000,00 €` | `32.071,35 €` | `33.102,04 €` | `+11.102,04 €` | `68,8 %` |
| **`30` Jahre** | `28.000,00 €` | `57.434,91 €` | `60.225,75 €` | `+32.225,75 €` | `82,6 %` |
| **`40` Jahre** | `34.000,00 €` | `102.857,18 €` | `109.574,54 €` | `+75.574,54 €` | `90,3 %` |

Nach `40` Jahren bestehen über **`90 %`** des Vermögens (`92.857,18 €` bei jährlicher Verzinsung) nicht aus Ihrem ursprünglich eingezahlten Geld, sondern aus reinvestierten Erträgen.

## Praxisanwendungen, Steuerbremse und typische Fehler

Im deutschen und europäischen Rechts- und Bankensystem existieren klare Abgrenzungen: **Einfache Zinsen** gelten gesetzlich bei Verzugszinsen (§ 289 BGB verbietet hier Zinseszinsen ausdrücklich) sowie bei der tagesgenauen Abrechnung innerhalb eines laufenden Zinsjahres — häufig nach der deutschen kaufmännischen Zinsmethode (`30/360`, also `30` Zinstage pro Monat und `360` pro Jahr) oder der exakten Methode `act/act`. Auch Stückzinsen beim Anleihekauf werden linear berechnet. **Zinseszinsen** dominieren dagegen bei thesaurierenden Wertpapieren, Sparbriefen mit Zinsansammlung, Altersvorsorgeverträgen und leider auch auf der Schuldenseite bei nicht vollständig getilgten Kreditkarten- oder Dispokrediten.

In der langfristigen Vermögensplanung sollten Sie zwei häufig unterschätzte Bremsfaktoren einkalkulieren:
1. **Steuerabzug während der Ansparphase:** Werden Erträge jenseits des Sparer-Pauschbetrags (`1.000 €` je Person bzw. `2.000 €` für Verheiratete in Deutschland) jährlich mit `26,375 %` Abgeltungsteuer belastet, sinkt eine nominale `6,0-%`-Verzinsung auf `4,4175 %` nach Steuern. Über `30` Jahre schrumpft das jährliche Zinseszins-Endkapital von `10.000 €` dadurch von `57.434,91 €` auf `36.576,21 €`.
2. **Laufende Kostenquoten (TER) und Zinseszins in Gegenrichtung:** Laufende Fondsgebühren mindern Jahr für Jahr den kompletten Depotbestand. Bei `7,0 %` Bruttorendite und `0,20 %` ETF-Kosten (`6,80 %` netto) wachsen `10.000 €` in `30` Jahren auf `71.967,69 €`; bei `1,80 %` Gebühren (`5,20 %` netto) bleiben dagegen nur `45.758,54 €` übrig — ein gebührenbedingter Verlust von `26.209,15 €`.
3. **Verzögerter Sparbeginn:** Da das größte absolute Wachstum in den letzten Jahren einer Kurve stattfindet, kostet ein um zehn Jahre aufgeschobener Einstieg bei identischer Sparrate meist mehr als die Hälfte des potenziellen Endvermögens.
