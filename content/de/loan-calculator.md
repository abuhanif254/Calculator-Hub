---
title: "Kreditrechner"
metaTitle: "Kreditrechner: Annuität, Endfälliger Kredit & Anleihe"
description: "Berechnen Sie Annuitätendarlehen, endfällige Kredite und abgezinste Anleihen präzise – inklusive Monatsrate, Zinsaufwand, Barwert und Zinseszins."
metaDescription: "Kreditrechner für Annuitätendarlehen, endfällige Kredite und Nullkuponanleihen – mit exakten Formeln, Zinsvergleich und DACH-Kreditregeln."
metaKeywords: "kreditrechner, annuitätendarlehen berechnen, endfälliges darlehen, nullkuponanleihe barwert, kreditrate, effektivzins, tilgungsplan, zinseszins"
faqs:
  - question: "Worin unterscheiden sich Annuitätendarlehen, endfälliger Kredit und abgezinste Anleihe?"
    answer: "Beim Annuitätendarlehen zahlen Sie über die gesamte Laufzeit eine gleichbleibende monatliche Rate aus Zins und Tilgung, bis die Restschuld null beträgt. Beim endfälligen Kredit mit Zinsansammlung fließen während der Laufzeit keine Raten; Kapital und aufgelaufene Zinseszinsen werden am Laufzeitende in einer Summe fällig. Bei einer abgezinsten Anleihe (Nullkuponanleihe) steht hingegen der Rückzahlungsbetrag bei Fälligkeit fest, und der Rechner ermittelt den heute ausgezahlten Barwert."
  - question: "Wie wirkt sich die Zinskapitalisierungsperiode auf meine Kreditkosten aus?"
    answer: "Je häufiger Zinsen innerhalb eines Jahres kapitalisiert werden – also monatlich statt jährlich –, desto stärker greift der unterjährige Zinseszinseffekt. Bei einem Nominalzins von 5,40 % p. a. auf 50.000,00 € über acht Jahre verursacht eine monatliche Verzinsung beim Annuitätendarlehen rund 297,54 € höhere Gesamtzinsen als eine jährliche Zinsverrechnung."
  - question: "Was ist der Unterschied zwischen gebundenem Sollzins und effektivem Jahreszins?"
    answer: "Der gebundene Sollzins bezeichnet den reinen Nominalzinssatz, mit dem das Darlehen laufend verzinst wird. Der effektive Jahreszins bezieht zusätzlich die unterjährige Zinsverrechnung sowie zwingende kreditbezogene Kosten ein und bildet nach der deutschen Preisangabenverordnung (PAngV), dem österreichischen Verbraucherkreditgesetz (VKrG) und dem Schweizer Konsumkreditgesetz (KKG) die verbindliche Vergleichsgröße."
  - question: "Wann ist ein endfälliges Darlehen in der Praxis sinnvoll?"
    answer: "Endfällige Kredite werden im deutschsprachigen Raum vor allem als Zwischenfinanzierung beim Immobilienverkauf, zur Betriebsmittelbrücke im Unternehmen oder in Kombination mit einem angesparten Tilgungsträger genutzt. Da die Restschuld während der gesamten Laufzeit nicht sinkt, fällt die Zinslast deutlich höher aus als bei einem regulären Tilgungs- oder Annuitätendarlehen."
  - question: "Welche Regeln gelten im DACH-Raum bei einer vorzeitigen Kreditablösung?"
    answer: "Bei Verbraucherdarlehen begrenzen § 502 BGB in Deutschland und § 16 VKrG in Österreich eine mögliche Vorfälligkeitsentschädigung auf höchstens 1,0 % des vorzeitig zurückgezahlten Betrags (bei unter zwölf Monaten Restlaufzeit höchstens 0,5 %). In der Schweiz können Konsumkredite nach Art. 17 KKG jederzeit ohne Entschädigung vorzeitig abgelöst werden; für grundpfandrechtlich gesicherte Immobilienkredite gelten abweichende Regeln."
---

## Drei grundlegende Kreditstrukturen präzise kalkulieren

Wer im deutschsprachigen Raum einen Kredit aufnimmt oder eine Kapitalanlage mit festem Fälligkeitstermin bewertet, begegnet weit mehr als nur dem klassischen Ratenkredit. Neben dem weit verbreiteten **Annuitätendarlehen** spielen in der Unternehmensfinanzierung, bei Zwischenfinanzierungen und am Kapitalmarkt auch **endfällige Darlehen mit Zinsansammlung** sowie **abgezinste Anleihen** (Nullkuponanleihen) eine wichtige Rolle. Auf den ersten Blick ähneln sich Zinssatz und Laufzeit, doch die tatsächlichen Gesamtkosten unterscheiden sich je nach Tilgungs- und Zinsstruktur erheblich.

Unser **Kreditrechner** deckt alle drei Finanzierungsmodelle in einem Werkzeug ab. Sie geben Kreditbetrag beziehungsweise Nennwert, Laufzeit in Jahren und Monaten, jährlichen Zinssatz sowie das Zinskapitalisierungsintervall ein und erhalten sofort die monatliche Rate, den gesamten Zinsaufwand, den fälligen Endbetrag oder den anfänglichen Auszahlungsbetrag (Barwert) einschließlich der prozentualen Aufteilung von Kapital und Zinsen.

## Die finanzmathematischen Formeln im Überblick

Da Kredite in der Praxis unterschiedliche Zinsverrechnungsintervalle aufweisen – etwa jährlich, halbjährlich, vierteljährlich oder monatlich –, rechnet der Rechner zunächst den angegebenen Jahreszins über die Anzahl der Zinsperioden pro Jahr (`m`) exakt auf die jeweilige Zahlungs- oder Laufzeitstruktur um.

```text
1. Annuitätendarlehen (monatliche Rückzahlung, n = 12 * Jahre + Monate):
   i_eff = (1 + r / m)^(m / 12) - 1
   R     = K_0 * [ i_eff * (1 + i_eff)^n ] / [ (1 + i_eff)^n - 1 ]
   G     = R * n
   Z_ges = G - K_0

2. Endfälliges Darlehen mit Zinsansammlung (Laufzeit t in Jahren):
   K_n   = K_0 * (1 + r / m)^(m * t)
   Z_ges = K_n - K_0

3. Abgezinste Anleihe / Nullkuponanleihe (fester Nennwert N bei Fälligkeit):
   K_0   = N / (1 + r / m)^(m * t)
   Z_ges = N - K_0
```

**Bedeutung der Variablen:**
- **`K_0`** ist der anfängliche Darlehensbetrag beziehungsweise der abgezinste Auszahlungsbetrag (Barwert) in Euro (`€`).
- **`N`** bezeichnet den im Voraus festgelegten Nennwert (Rückzahlungsbetrag) einer Anleihe am Laufzeitende in Euro (`€`).
- **`K_n`** gibt die gesamte Rückzahlungssumme eines endfälligen Darlehens bei Fälligkeit in Euro (`€`) an.
- **`r`** ist der jährliche Nominalzinssatz als Dezimalzahl (etwa `0,054` für `5,40 %` pro Jahr).
- **`m`** steht für die Anzahl der Zinskapitalisierungen pro Jahr (`1` jährlich, `2` halbjährlich, `4` vierteljährlich, `12` monatlich).
- **`n`** und **`t`** bezeichnen die Laufzeit in Monaten (`n`) beziehungsweise in Jahren (`t = Jahre + Monate / 12`).
- **`i_eff`** ist der äquivalente monatliche Effektivzinssatz, **`R`** die konstante Monatsrate, **`G`** die Summe aller Raten und **`Z_ges`** der gesamte Zinsaufwand beziehungsweise Zinsabschlag.

Bei einem Zinssatz von `0,00 %` entfällt die Zinskomponente vollständig: Die monatliche Annuität vereinfacht sich dann zu `R = K_0 / n`, während Endbetrag und Barwert exakt dem Ausgangskapital entsprechen.

## Rechenbeispiel: 50.000,00 € zu 5,40 % p. a. über 8 Jahre

Ein Beispiel mit identischen Eckdaten – **50.000,00 €**, **5,40 % Jahreszins** und **8 Jahre Laufzeit** (`96 Monate`) – macht den massiven Unterschied zwischen den drei Kreditformen greifbar:

1. **Annuitätendarlehen (monatliche Verzinsung, `m = 12`):**
   Der monatliche Zinssatz beträgt `i_eff = 0,054 / 12 = 0,0045`. Über 96 Monate wächst der Aufzinsungsfaktor auf `(1 + 0,0045)^96 = 1,538843`. Eingesetzt in die Annuitätenformel ergibt sich eine konstante Monatsrate von **`642,56 €`**. Im ersten Monat entfallen `225,00 €` auf Zinsen und `417,56 €` auf die Tilgung (Restschuld danach: `49.582,44 €`). Nach genau vier Jahren (Monat 48) liegt der Zinsanteil nur noch bei `126,90 €`, während bereits `515,66 €` die Restschuld auf `27.683,56 €` abbauen. Im 96. Monat betragen die Zinsen bloß `2,88 €`, und `639,68 €` führen zur vollständigen Entschuldung. Die Gesamtrückzahlung beläuft sich auf **`61.685,88 €`**, die Gesamtzinsen auf **`11.685,88 €`** (`23,37 %` des Darlehens).
2. **Endfälliges Darlehen (jährliche Zinsansammlung, `m = 1`):**
   Ohne laufende Tilgung verzinst sich das Kapital Jahr für Jahr inklusive aufgelaufener Zinsen: `50.000,00 € × (1,054)^8 = 76.154,38 €`. Die reine Zinslast steigt auf **`26.154,38 €`** – mehr als doppelt so hoch wie beim Annuitätendarlehen.
3. **Abgezinste Anleihe (Nennwert 50.000,00 €, jährliche Verzinsung, `m = 1`):**
   Soll am Laufzeitende ein fester Betrag von `50.000,00 €` ausgezahlt werden, liegt der heutige Barwert bei `50.000,00 € / (1,054)^8 = 32.828,05 €`. Der implizite Zinsertrag beziehungsweise Emissionsabschlag (Disagio) beträgt **`17.171,95 €`**.

## Vergleichstabelle: Einfluss des Zinsintervalls auf alle drei Kreditarten

Die folgende Übersicht zeigt für denselben Betrag von **50.000,00 €** bei **5,40 % p. a.** über **8 Jahre**, wie sich die Zinskapitalisierungsperiode auf Rate, Endbetrag und Barwert auswirkt:

| Zinskapitalisierung (`m`) | Annuität: Monatsrate | Annuität: Gesamtzinsen | Endfälliger Kredit: Endbetrag | Endfälliger Kredit: Zinsen | Anleihe: Heutiger Barwert |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Jährlich (`m = 1`)** | 639,46 € | 11.388,34 € | 76.154,38 € | 26.154,38 € | 32.828,05 € |
| **Halbjährlich (`m = 2`)** | 641,13 € | 11.548,15 € | 76.576,78 € | 26.576,78 € | 32.646,97 € |
| **Vierteljährlich (`m = 4`)** | 641,98 € | 11.630,27 € | 76.794,50 € | 26.794,50 € | 32.554,42 € |
| **Monatlich (`m = 12`)** | 642,56 € | 11.685,88 € | 76.942,16 € | 26.942,16 € | 32.491,94 € |

Schon beim Übergang von jährlicher zu monatlicher Verzinsung steigen die Gesamtzinsen des endfälligen Kredits um `787,78 €`, während der heutige Barwert einer Nullkuponanleihe entsprechend um `336,11 €` sinkt.

## Praxistipps und typische Fehlerquellen bei der Kreditplanung

- **Sollzins nicht mit effektivem Jahreszins verwechseln:** Im deutschsprachigen Kreditvergleich ist der effektive Jahreszins entscheidend, weil er neben dem Nominalzins auch unterjährige Zinsverrechnungen und vertragliche Zusatzkosten erfasst. Achten Sie bei deutschen Bankangeboten zudem auf den repräsentativen Zweidrittelzins nach § 17 PAngV statt auf bonitätsabhängige Einstiegszinsen.
- **Laufende Zinszahlungen vs. Zinsansammlung unterscheiden:** Bei vielen endfälligen Immobilien- oder Förderdarlehen werden die Zinsen monatlich bezahlt, sodass kein Zinseszinseffekt entsteht. Das Modul für endfällige Darlehen berechnet dagegen den Fall mit vollständiger Zinsansammlung bis zur Fälligkeit – ein entscheidender Unterschied bei der Liquiditätsplanung.
- **Sondertilgungsrechte und Restschuld im Blick behalten:** Schon geringe jährliche Sondertilgungen senken die Restschuld eines Annuitätendarlehens überproportional stark, wenn sie früh in der Laufzeit erfolgen. Prüfen Sie vor Vertragsabschluss, ob kostenfreie Sondertilgungen vereinbart sind, und kalkulieren Sie bei Baufinanzierungen stets das Zinsänderungsrisiko für die Anschlussfinanzierung nach Ablauf der Sollzinsbindung ein.
- **Nebenkosten und Versicherungen getrennt bewerten:** Freiwillige Restschuldversicherungen, Kontoführungsentgelte oder bei Immobilienkäufen anfallende Kaufnebenkosten wie Grunderwerbsteuer, Notar- und Grundbuchgebühren sind im reinen Tilgungsmodell nicht automatisch enthalten und sollten immer in das Gesamtbudget einbezogen werden.
