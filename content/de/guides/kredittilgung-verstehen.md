---
title: "Kredittilgung Verstehen: Eine Schritt-für-Schritt-Anleitung"
description: "Fundierte Anleitung zur Kredittilgung: Annuitätenformel, Verschiebung von Zins- und Tilgungsanteil im Tilgungsplan, Sondertilgungen und ein vollständiges 240.000-€-Beispiel."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "amortization-calculator"
faqs:
  - question: "Warum sinkt die Restschuld in den ersten Kreditjahren nur so langsam?"
    answer: "Die monatlichen Zinsen werden stets auf die aktuelle Restschuld berechnet. Da diese zu Laufzeitbeginn am höchsten ist, beansprucht der Zinsanteil den größten Teil der konstanten Monatsrate. Erst mit sinkender Restschuld reduziert sich der Zinsbetrag Monat für Monat, wodurch innerhalb derselben Rate automatisch mehr Geld in die Tilgung fließt."
  - question: "Worin unterscheidet sich ein Annuitätendarlehen von einem Tilgungsdarlehen?"
    answer: "Beim Annuitätendarlehen bleibt die gesamte monatliche Rate über die Zinsbindung hinweg konstant, während sich das Verhältnis aus Zins und Tilgung kontinuierlich zugunsten der Tilgung verschiebt. Beim selteneren Tilgungsdarlehen (Abzahlungsdarlehen) bleibt dagegen der monatliche Tilgungsbetrag konstant, weshalb die Gesamtrate zu Beginn sehr hoch ist und über die Laufzeit linear fällt."
  - question: "Wie wirken sich Sondertilgungen im Tilgungsplan konkret aus?"
    answer: "Eine Sondertilgung reduziert ohne Abzug die verbleibende Restschuld. Dadurch sinkt ab dem Folgemonat die Zinsbasis, während die vertragliche Monatsrate unverändert bleibt. Der frei werdende Betrag erhöht die laufende Tilgung und löst einen Zinseszinseffekt zugunsten des Kreditnehmers aus, der die Gesamtlaufzeit deutlich verkürzt."
  - question: "Was passiert mit der Tilgung nach Ablauf einer 10- oder 15-jährigen Zinsbindung?"
    answer: "In Deutschland und Österreich deckt die erste Zinsbindungsfrist bei Immobilienkrediten meist nicht die gesamte Laufzeit bis zur Volltilgung ab. Die am Ende der Zinsbindung verbleibende Restschuld muss über eine Anschlussfinanzierung (Prolongation oder Umschuldung) zu dann aktuellen Marktzinsen weitergetilgt werden."
  - question: "Bringt eine zweiwöchentliche Teilzahlung statt monatlicher Abbuchung in Europa Vorteile?"
    answer: "Das Prinzip der 26 halben Zahlungen pro Jahr (entspricht 13 vollen Monatsraten) stammt aus dem nordamerikanischen Raum. Im DACH-Raum verarbeiten Banken reguläre Kreditraten fast ausschließlich monatlich; den gleichen Effekt erreichen Sie hierzulande vertragskonform über eine jährliche Sondertilgung in Höhe einer Monatsrate."
---

Kredittilgung (Amortisation) bezeichnet die planmäßige Rückführung eines Darlehens durch regelmäßige Ratenzahlungen über eine festgelegte Laufzeit. Bei dem im Privat- und Immobilienbereich dominierenden Annuitätendarlehen bleibt die monatliche Gesamtrate konstant, setzt sich jedoch jeden Monat aus einem sinkenden Zinsanteil und einem spiegelbildlich steigenden Tilgungsanteil zusammen.

Ein Tilgungsrechner macht diese innere Verschiebung von Rate eins bis zur letzten Zahlung transparent. Sie erkennen sofort, wie hoch Ihre monatliche Belastung ausfällt, welche Gesamtzinskosten entstehen, welche Restschuld zu einem bestimmten Stichtag verbleibt und wie stark Laufzeitverkürzungen oder Sondertilgungen die Zinslast senken.

## Methodik: Die Annuitätenformel und Parameter im Detail

Die Berechnung einer konstanten Monatsrate folgt der klassischen finanzmathematischen Annuitätenformel:

```text
M = P × [r × (1 + r)^n] / [(1 + r)^n − 1]
```

Für jede einzelne Periode `k` im Tilgungsplan gelten anschließend drei fortlaufende Rechenschritte:

```text
Zinsanteil_k = Restschuld_(k−1) × r
Tilgungsanteil_k = M − Zinsanteil_k
Restschuld_k = Restschuld_(k−1) − Tilgungsanteil_k
```

Die Parameter definieren sich wie folgt:

- **Darlehensbetrag (`P`):** Der tatsächlich ausgezahlte Nettokreditbetrag nach Abzug von Eigenkapital (nicht der Kaufpreis einer Immobilie oder eines Fahrzeugs).
- **Periodenzinssatz (`r`):** Der jährliche Sollzinssatz geteilt durch 12 (`r = Jahreszins / 12`).
- **Gesamtanzahl der Raten (`n`):** Die Laufzeit in Jahren multipliziert mit 12 Monaten (z. B. `300` Raten bei 25 Jahren).
- **Monatsrate (`M`):** Die konstante Annuität aus Zins und Tilgung.

### Aufbau eines vollständigen Tilgungsplans

Ein professioneller Tilgungsplan dokumentiert jede Periode tabellarisch mit Zahlungsnummer, Monatsrate, Zinsanteil, Tilgungsanteil, optionaler Sondertilgung und neuer Restschuld. So erkennen Sie auf einen Blick, wann die Hälfte der Kreditsumme getilgt ist und welcher Restbetrag zum Ablauf Ihrer Zinsbindung noch offen steht. In der Bankenpraxis im DACH-Raum wird alternativ häufig nicht über eine feste Endlaufzeit, sondern über einen **anfänglichen Tilgungssatz** (z. B. 2,0 % oder 3,0 % p. a.) gerechnet. Aus `Sollzins + anfängliche Tilgung` ergibt sich ebenfalls eine konstante Monatsrate, die bei gleichbleibendem Zinssatz zu einer präzise berechenbaren Gesamtlaufzeit führt. Gerade bei niedrigen Zinsen entscheidet ein um einen Prozentpunkt höherer anfänglicher Tilgungssatz darüber, ob ein Darlehen in 22 statt erst in 38 Jahren schuldenfrei ist.

## Schritt-für-Schritt-Rechenbeispiel: 240.000 € zu 4,20 % Sollzins

Betrachten wir ein klassisches Annuitätendarlehen über **240.000,00 €** bei einem gebundenen Sollzinssatz von **4,20 % p. a.** und einer Gesamtlaufzeit von **25 Jahren** (`n = 300` Monate).

1. **Monatszinssatz bestimmen:** `r = 0,042 / 12 = 0,0035` (0,35 % pro Monat).
2. **Konstante Monatsrate berechnen:** `M = 240.000 × [0,0035 × (1,0035)^300] / [(1,0035)^300 − 1]`. Mit `(1,0035)^300 = 2,85241` ergibt sich `M = 1.293,46 €`.
3. **Erste Rate (Monat 1) aufschlüsseln:** Die Zinsen auf 240.000 € betragen `240.000 × 0,0035 = 840,00 €`. Für die Tilgung verbleiben `1.293,46 € − 840,00 € = 453,46 €`. Neue Restschuld: `239.546,54 €`.
4. **Verlauf bis Monat 150 (Halbzeit nach 12,5 Jahren) prüfen:** Die Restschuld ist auf `150.744,50 €` gesunken (Restschuld nach dieser Zahlung). In Rate 150 entfallen nur noch `530,28 €` auf Zinsen, während `763,18 €` direkt tilgen.
5. **Schlussrate (Monat 300) und Gesamtkosten ablesen:** In der letzten Rate fallen lediglich `4,51 €` Zinsen und `1.288,95 €` Tilgung an. Über 300 Monate zahlen Sie insgesamt `388.038,47 €`, davon **148.038,47 €** reine Zinskosten.

## Szenariovergleich: Laufzeitwahl und monatliche Sondertilgung

Die Tabelle vergleicht sechs Tilgungsstrategien für denselben Kredit von **240.000,00 €** zu unverändert **4,20 % Sollzins p. a.**:

| Strategie / Laufzeit | Monatliche Gesamtzahlung | Tatsächliche Laufzeit | Restschuld nach 10 Jahren | Gesamte Zinskosten | Zinsersparnis vs. 25 J. Basis |
|---|---|---|---|---|---|
| 30 Jahre (Standard) | 1.173,64 € | 360 Monate (30,0 J.) | 189.131,80 € | 182.510,84 € | −34.472,37 € (teurer) |
| 25 Jahre (Basis) | 1.293,46 € | 300 Monate (25,0 J.) | 171.224,97 € | 148.038,47 € | 0,00 € (Referenz) |
| 20 Jahre (kompakt) | 1.479,77 € | 240 Monate (20,0 J.) | 143.470,69 € | 115.144,74 € | +32.893,73 € |
| 15 Jahre (schnell) | 1.799,40 € | 180 Monate (15,0 J.) | 94.337,79 € | 83.892,15 € | +64.146,32 € |
| 25 Jahre + 150 €/Mo. extra | 1.443,46 € | 250 Monate (20,8 J.) | 149.035,61 € | 120.306,07 € | +27.732,40 € |
| 25 Jahre + 300 €/Mo. extra | 1.593,46 € | 215 Monate (17,9 J.) | 126.846,24 € | 101.591,45 € | +46.447,02 € |

Bereits eine freiwillige monatliche Mehrzahlung von **150 €** verkürzt die 25-jährige Laufzeit um über vier Jahre und spart **27.732,40 €** an Zinsen — bei gleichzeitig voller vertraglicher Flexibilität, falls Sie die Sonderzahlung in finanziell engeren Monaten aussetzen müssen.

## Anwendungsfälle, typische Fallstricke und vertragliche Hinweise

Nutzen Sie den Tilgungsrechner vor jeder Umschuldung, bei der Wahl zwischen langer Liquiditätsschonung und schneller Entschuldung sowie zur Planung des Eigenkapitalaufbaus bis zum Ende der ersten Zinsbindung. Insbesondere beim Vergleich zweier Kreditangebote mit identischer Monatsrate deckt der Tilgungsplan sofort auf, welches Modell eine niedrigere Restschuld nach zehn Jahren erreicht.

Achten Sie in der Praxis auf vier zentrale Fallstricke:

- **Sondertilgungsbeschränkungen und Vorfälligkeitsentschädigung:** Immobilienkredite in Deutschland gewähren meist ein jährliches Sondertilgungsrecht von 5 % der ursprünglichen Darlehenssumme ohne Zusatzkosten. Darüber hinausgehende vorzeitige Rückzahlungen während einer Sollzinsbindung berechtigen Banken gemäß § 502 BGB häufig zu einer Vorfälligkeitsentschädigung. Bei Ratenkrediten ist die Entschädigung gesetzlich auf maximal 1,0 % (bzw. 0,5 % bei unter einem Jahr Restlaufzeit) gedeckelt.
- **Rechnen mit dem Nominal- statt Effektivzins:** Für den exakten Verlauf der Restschuld im Tilgungsplan ist der vertragliche Sollzins maßgeblich, für den Gesamtkostenvergleich verschiedener Banken hingegen der effektive Jahreszins nach PAngV.
- **Zu niedrige Anfangstilgung in Hochzinsphasen:** Bei 1 % Anfangstilgung und 4 % Zins dauert die vollständige Rückzahlung über 40 Jahre; eine Anfangstilgung von mindestens 2 % bis 3 % gilt als solider Richtwert.
- **Abweichende Zinsusancen bei unterjährigen Tagen:** Einige Banken rechnen kalendergenau (365/365 oder act/360) statt pauschal 30/360, wodurch einzelne Monatszinsen um wenige Euro variieren können.
