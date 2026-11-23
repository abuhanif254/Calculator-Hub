---
title: "Tilgungsrechner"
metaTitle: "Tilgungsrechner: Monatsrate, Zinsen & Restschuld berechnen"
description: "Berechnen Sie Ihre monatliche Kreditrate, den vollständigen Tilgungsplan und die verbleibende Restschuld inklusive Zinsbindung und Sondertilgungen."
metaDescription: "Erstellen Sie Ihren exakten Tilgungsplan für Baufinanzierung oder Ratenkredit: Berechnen Sie Monatsrate, Zinsanteil, Restschuld und Sondertilgung."
metaKeywords: "tilgungsrechner, tilgungsplan berechnen, annuitätendarlehen rechner, restschuld berechnen, zinsbindung tilgung, sondertilgung rechner, darlehensrechner"
faqs:
  - question: "Was ist der Unterschied zwischen anfänglicher Tilgung und einem Volltilgerdarlehen?"
    answer: "Bei einer klassischen Baufinanzierung vereinbaren Kreditnehmer meist einen anfänglichen Tilgungssatz von 2 % bis 3 % pro Jahr bei zehn- oder fünfzehnjähriger Zinsbindung, sodass am Ende eine Restschuld für die Anschlussfinanzierung verbleibt. Bei einem Volltilgerdarlehen wird die Monatsrate dagegen von vornherein so hoch angesetzt, dass die Restschuld exakt mit Ablauf der Zinsbindung auf 0,00 € sinkt."
  - question: "Warum sinkt der Zinsanteil in einem Annuitätendarlehen von Monat zu Monat?"
    answer: "Die Bank berechnet den monatlichen Zins stets nur auf die aktuell verbleibende Restschuld. Weil jede gezahlte Rate einen Teil des Darlehens tilgt, fällt im nächsten Monat etwas weniger Zins an. Da die monatliche Gesamtrate (Annuität) konstant bleibt, erhöht sich der Tilgungsanteil automatisch um genau den eingesparten Zinsbetrag – man spricht vom Zinseszinseffekt der Tilgung."
  - question: "Wie stark verkürzen jährliche Sondertilgungen die Kreditlaufzeit?"
    answer: "Sondertilgungen reduzieren die Restschuld zu 100 % unmittelbar und senken damit dauerhaft die Zinsbasis aller folgenden Jahre. Bei einem 300.000-€-Darlehen mit 3,75 % Sollzins und 2,25 % Tilgung verkürzt eine jährliche Sondertilgung von 3.000 € die Gesamtlaufzeit um mehr als fünfeinhalb Jahre und spart fast 40.000 € Zinskosten. Entscheidend ist, Sondertilgungen möglichst früh in der Laufzeit zu leisten."
  - question: "Wird der Tilgungsplan mit dem Sollzins oder dem effektiven Jahreszins berechnet?"
    answer: "Ein Tilgungsplan rechnet grundsätzlich mit dem gebundenen Sollzins (Nominalzins), weil dieser den tatsächlichen monatlichen Zinsabfluss auf die Restschuld bestimmt. Der effektive Jahreszins nach § 16 PAngV berücksichtigt zusätzlich die unterjährige monatliche Verrechnung sowie zwingende Kreditnebenkosten und dient vor allem dem objektiven Preisvergleich verschiedener Bankangebote."
  - question: "Welche gesetzlichen Kündigungsrechte gelten bei langfristigen Zinsbindungen im DACH-Raum?"
    answer: "In Deutschland gewährt § 489 Abs. 1 Nr. 2 BGB jedem Kreditnehmer nach Ablauf von zehn Jahren ab Vollauszahlung ein ordentliches Sonderkündigungsrecht mit sechs Monaten Frist – komplett ohne Vorfälligkeitsentschädigung. In Österreich regelt § 20 HIKrG bei Immobilienkrediten das Recht auf vorzeitige Rückzahlung mit einem gebührenfreien Freibetrag von 10.000 € innerhalb von zwölf Monaten und gedeckelter Entschädigung. In der Schweiz sind Festhypotheken vorzeitig meist nur gegen eine marktabhängige Vorfälligkeitsprämie kündbar."
---

Ob Immobilienkauf, Modernisierung oder Ratenkredit: Erst ein vollständiger Tilgungsplan macht sichtbar, welcher Anteil jeder Monatsrate tatsächlich Schulden abbaut und welcher an die Bank fließt. Gerade bei Baufinanzierungen im DACH-Raum entscheidet die anfängliche Tilgung über die Höhe Ihrer Restschuld nach der Zinsbindung und damit über Ihr Anschlusszins-Risiko. Mit dem **Tilgungsrechner** ermitteln Sie Ihre monatliche Annuität, die monatliche Aufteilung in Zins und Tilgung, die exakte Restschuld sowie den Spareffekt von Sondertilgungen.

## Mathematische Grundlagen des Annuitätendarlehens

Im deutschsprachigen Raum ist das **Annuitätendarlehen** der Standard: Die Monatsrate `R` bleibt über die gesamte Zinsbindung konstant, während sich ihr inneres Verhältnis Monat für Monat zugunsten der Tilgung verschiebt. Je nach Vorgabe (Gesamtlaufzeit oder anfängliche Tilgung) greifen folgende Formeln:

```text
Rate bei fester Laufzeit n:      R = K_0 × [i × (1 + i)^n] / [(1 + i)^n − 1]
Rate bei anfänglicher Tilgung:   R = K_0 × (p + t_0) / 12

Monatliche Zerlegung (Monat k):  Z_k = RS_(k−1) × i
                                 T_k = R − Z_k
                                 RS_k = RS_(k−1) − T_k − S_k

Restschuld nach m Monaten:       RS_m = K_0 × (1 + i)^m − R × [(1 + i)^m − 1] / i
Gesamtlaufzeit (ohne ST):        n = −ln(1 − K_0 × i / R) / ln(1 + i)
```

Dabei stehen **K_0** für den Nettodarlehensbetrag in Euro (`€`) oder Schweizer Franken (`CHF`), **p** für den jährlichen Sollzins, **i = p / 12** für den Monatszins, **t_0** für den anfänglichen Tilgungssatz p. a., **Z_k** für den Zinsanteil, **T_k** für den Tilgungsanteil, **S_k** für eine Sondertilgung und **RS_k** für die Restschuld am Monatsende.

Daneben existieren zwei weitere Formen: Beim **Ratentilgungsdarlehen** (in der Schweiz oft bei der direkten Amortisation der zweiten Hypothek üblich) bleibt der monatliche Tilgungsbetrag `T = K_0 / n` konstant und die Rate sinkt fortlaufend. Beim **endfälligen Darlehen** (etwa indirekte Amortisation über die Schweizer Säule 3a oder Bauspar-Vorausdarlehen) zahlen Sie laufend nur Zinsen und tilgen das Kapital am Ende über einen separaten Sparvertrag.

## Schritt-für-Schritt-Rechenbeispiel: 300.000 € Baufinanzierung über 10 Jahre

Betrachten wir eine Baufinanzierung über **K_0 = 300.000,00 €** zu **3,75 % Sollzins p. a.** (`effektiver Jahreszins 3,82 %` nach § 16 PAngV) mit **2,25 % anfänglicher Tilgung** und **10 Jahren Zinsbindung** (`m = 120 Monate`).

1. **Monatsrate berechnen:** Der Monatszins beträgt `i = 0,0375 / 12 = 0,003125` (0,3125 %). Die konstante Rate lautet `R = 300.000 € × (0,0375 + 0,0225) / 12 = 1.500,00 €`.
2. **Erster Monat:** Auf die Startschuld fallen `300.000,00 € × 0,003125 = 937,50 €` Zinsen an. Die übrigen **562,50 €** tilgen das Darlehen; die Restschuld sinkt auf **299.437,50 €**.
3. **Tilgungseffekt ab Monat 2:** Der Zins fällt sofort auf `299.437,50 € × 0,003125 = 935,74 €`, während die Tilgung auf **564,26 €** wächst.
4. **Meilensteine nach 5 und 10 Jahren:** Im **60. Monat** betragen die Zinsen noch **823,81 €** und die Tilgung **676,19 €** (Restschuld **262.942,02 €**). Im **120. Monat** überwiegt die Tilgung mit **815,41 €** deutlich die Zinsen von **684,59 €**.
5. **Bilanz nach 10 Jahren:** Aus exakt **180.000,00 €** Gesamtzahlungen flossen **98.254,64 €** in Zinsen und **81.745,36 €** in die Tilgung. Die **Restschuld beträgt 218.254,64 €**. Bei unverändertem Zins von 3,75 % dauert die Volltilgung **315 Monate (26 Jahre und 3 Monate)** bei **171.533,82 €** Gesamtzinsen.

## Vergleich der Tilgungssätze und Wirkung einer Sondertilgung

Die Tabelle zeigt für dasselbe **300.000-€-Darlehen** bei **3,75 % Sollzins**, wie stark höhere Tilgung oder eine jährliche Sondertilgung (jeweils am Jahresende) Restschuld und Zinslast drücken:

| Anfängliche Tilgung | Monatsrate | Restschuld nach 10 J. | Zinsen in 10 J. | Gesamtlaufzeit | Gesamtzinsen (bis 0 €) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1,50 %** | 1.312,50 € | 245.503,09 € | 103.003,09 € | 33 J. 6 Mon. | 226.982,66 € |
| **2,00 %** | 1.437,50 € | 227.337,46 € | 99.837,46 € | 28 J. 3 Mon. | 186.543,43 € |
| **2,25 % (Basisfall)** | 1.500,00 € | 218.254,64 € | 98.254,64 € | 26 J. 3 Mon. | 171.533,82 € |
| **3,00 %** | 1.687,50 € | 191.006,18 € | 93.506,18 € | 21 J. 8 Mon. | 138.586,41 € |
| **4,00 %** | 1.937,50 € | 154.674,91 € | 87.174,91 € | 17 J. 8 Mon. | 110.707,52 € |
| **2,25 % + 3.000 € ST/J.** | 1.500,00 € | 182.543,59 € | 92.543,59 € | 20 J. 8 Mon. | 131.910,21 € |

Eine Erhöhung der Tilgung von **1,50 %** auf **3,00 %** (`+375,00 €` monatlich) verkürzt die Laufzeit um **elf Jahre und zehn Monate** und spart **88.396,25 €** Zinsen. Jährliche Sondertilgungen von **3.000 €** reduzieren die Restschuld nach zehn Jahren um **35.711,05 €** (Zinsersparnis in zehn Jahren: **5.711,05 €**, insgesamt **39.623,61 €**).

## Praxistipps und häufige Fehler bei der Tilgungsplanung

- **Anschlusszins-Risiko früh testen:** Unter 2 % Tilgung bleiben nach zehn Jahren über vier Fünftel des Darlehens offen. Kalkulieren Sie die Anschlussfinanzierung unbedingt mit einem Puffer von plus zwei Prozentpunkten durch.
- **Monatliche Tilgungsverrechnung prüfen:** Achten Sie darauf, dass jede Rate sofort monatlich mit der Restschuld verrechnet wird. Eine vierteljährliche oder jährliche Verrechnung verzinst bereits getilgtes Kapital weiter und verteuert den Kredit versteckt.
- **Zinsmethode bei Teilmonaten beachten:** Im DACH-Raum gilt meist die kaufmännische Zinsmethode (`30/360`), bei der jeder Monat 30 Tage zählt. Bei krummen Auszahlungsterminen oder Bereitstellungszinsen nutzen Banken teils taggenaue Methoden (`kalendertagsgenau/360` oder `/365`), was kleine Abweichungen in der ersten Rate erklärt.
- **Optionen ohne teuren Zinsaufschlag vereinbaren:** Standardmäßig sind **5 % jährliche Sondertilgung** und zwei Tilgungssatzwechsel oft kostenfrei enthalten. Zinsaufschläge für 10-%-Optionen lohnen nur bei sicher planbaren Zusatzzahlungen.
- **Sonderkündigungsrecht nach zehn Jahren kennen:** Nach § 489 BGB können Kreditnehmer in Deutschland jede lange Zinsbindung zehn Jahre nach Vollauszahlung mit sechs Monaten Frist kostenfrei kündigen und bei fallenden Zinsen risikolos umschulden.
