---
title: "Rentenrechner"
metaTitle: "Rentenrechner & Annuitäten: Barwert & Endwert berechnen"
description: "Berechnen Sie den Barwert, den zukünftigen Endwert und die regelmäßigen Zahlungen nachschüssiger oder vorschüssiger Renten und Annuitäten."
metaDescription: "Berechnen Sie Barwert, Endwert und monatliche Auszahlungen für nachschüssige oder vorschüssige Renten – mit Formeln, Kapitalverzehr & Steuertipps."
metaKeywords: "rentenrechner, annuitätenrechner, barwert rente berechnen, rentenendwert formel, nachschüssig vorschüssig rente, entnahmeplan rechner, kapitalverzehr"
faqs:
  - question: "Was ist der Unterschied zwischen Barwert und Endwert einer Rente?"
    answer: "Der Endwert zeigt, auf welches Gesamtkapital regelmäßige Einzahlungen inklusive Zinseszins bis zu einem künftigen Stichtag anwachsen – klassisch für die Ansparphase. Der Barwert beantwortet die umgekehrte Frage: Welcher Einmalbetrag muss heute verzinst angelegt werden, um daraus über eine feste Laufzeit regelmäßige Auszahlungen in gewünschter Höhe zu finanzieren?"
  - question: "Wann wähle ich eine vorschüssige und wann eine nachschüssige Rente?"
    answer: "Bei einer vorschüssigen Rente fließt die Zahlung jeweils am Periodenanfang (z. B. am Ersten des Monats für Miete oder monatliche Ruhestandsausgaben). Bei einer nachschüssigen Rente erfolgt die Zahlung am Periodenende (typisch für Kreditraten oder viele Sparpläne). Vorschüssige Zahlungsreihen weisen exakt den Faktor (1 + i) als höheren Bar- und Endwert auf, weil jede Rate eine Periode länger verzinst wird."
  - question: "Warum ermöglicht ein Entnahmeplan höhere Auszahlungen als reine Zinserträge?"
    answer: "Bei einer ewigen Rente entnehmen Sie ausschließlich die laufenden Zinsen, sodass das Startkapital vollständig erhalten bleibt. Eine zeitlich befristete Annuität bzw. Zeitrente verzehrt hingegen planmäßig sowohl die laufenden Zinsen als auch das ursprüngliche Kapital, bis am Laufzeitende exakt 0 € übrig sind – dadurch fällt die monatliche Auszahlung deutlich höher aus."
  - question: "Wie wirkt sich die Inflation auf den realen Wert einer festen Annuität aus?"
    answer: "Eine nominal konstante Monatsrente von 1.500 € verliert bei 2,5 % jährlicher Inflation nach 20 Jahren über 38 % ihrer ursprünglichen Kaufkraft und entspricht real nur noch rund 915 €. Um kaufkraftstabile Entnahmen zu planen, sollten Sie im Rechner mit der erwarteten Realrendite (Nominalzins abzüglich Inflation) statt mit dem reinen Nominalzins kalkulieren."
  - question: "Wie werden private Zeit- und Leibrenten in Deutschland steuerlich behandelt?"
    answer: "Lebenslange private Leibrenten aus ungeförderten Versicherungen unterliegen in Deutschland der günstigen Ertragsanteilsbesteuerung nach § 22 EStG – bei Rentenbeginn mit 67 Jahren werden nur 17 % der Rente mit dem persönlichen Steuersatz besteuert. Ein eigener ETF- oder Bank-Entnahmeplan unterliegt dagegen der Abgeltungsteuer (26,375 % inkl. SolZ auf den Gewinnanteil, abzüglich 30 % Teilfreistellung bei Aktienfonds)."
---

Wer regelmäßig spart, einen privaten Auszahlplan für den Ruhestand entwirft oder den heutigen Wert künftiger Miet- und Rentenzahlungen beurteilen will, arbeitet in der Finanzmathematik mit **Renten** (im internationalen Sprachgebrauch *Annuities*). Gemeint ist nicht zwingend eine staatliche Altersrente, sondern jede Reihe gleich hoher, periodischer Zahlungen über einen festgelegten Zeitraum bei konstantem Zinssatz. Der **Rentenrechner** verknüpft Zahlungshöhe, Laufzeit, Verzinsung und Zahlungszeitpunkt präzise – sowohl für den Vermögensaufbau als auch für den gezielten Kapitalverzehr.

## Zwei Blickrichtungen der Rentenrechnung: Ansparen und Auszahlen

In der Praxis beantwortet die Rentenrechnung zwei spiegelbildliche Fragestellungen, die im Lebenszyklus direkt aufeinander aufbauen:

1. **Rentenendwert (Ansparphase)**: Sie legen jeden Monat oder jedes Jahr einen festen Betrag zurück und möchten wissen, welches Kapital einschließlich Zinseszins am Ende der Laufzeit zur Verfügung steht.
2. **Rentenbarwert (Entnahmephase & Bewertung)**: Sie benötigen über 15, 25 oder 30 Jahre eine planbare Zusatzrente und möchten berechnen, wie viel Startkapital heute erforderlich ist – oder umgekehrt, welche monatliche **Annuitätenrate** sich aus einem vorhandenen Vermögen finanzieren lässt.

Entscheidend für die Genauigkeit ist zudem der **Zahlungszeitpunkt innerhalb jeder Periode**: Fließt das Geld jeweils am Ende des Monats (**nachschüssig**), bleibt die letzte Einzahlung unverzinst bzw. startet die erste Auszahlung erst einen Monat nach Anlagebeginn. Fließt es am Monatsanfang (**vorschüssig**), arbeitet jede einzelne Rate genau eine Zinsperiode länger.

## Exakte Formeln für Rentenendwert, Barwert und Annuitätenrate

Bezeichnet **`R`** die periodische Zahlungsrate, **`i = r / m`** den Periodenzinssatz (bei jährlichem Nominalzins `r` und `m = 12` monatlichen Perioden pro Jahr) und **`n = m · t`** die Gesamtzahl der Zahlungen über `t` Jahre, ergeben sich die geschlossenen Standardformeln für nachschüssige Zahlungen wie folgt:

```
Rentenendwert (nachschüssig):   E_nach = R · [ ((1 + i)^n − 1) / i ]
Rentenbarwert (nachschüssig):   B_nach = R · [ (1 − (1 + i)^(−n)) / i ]
Periodische Rate aus Barwert:   R      = B_nach · [ i / (1 − (1 + i)^(−n)) ]
```

Für **vorschüssige Renten** (Zahlung stets am Periodenanfang) multiplizieren Sie das nachschüssige Ergebnis einfach mit dem Aufzinsungsfaktor einer einzelnen Periode:

```
E_vor = E_nach · (1 + i)       und       B_vor = B_nach · (1 + i)
```

Die Umkehrformel zur Bestimmung der periodischen Rate `R` aus dem Barwert ist mathematisch identisch mit der **Annuitätenformel eines Hypothekendarlehens**: Beim Kredit tilgen Sie eine fremde Schuld inklusive Zinsen auf null; beim privaten Auszahlplan zahlt Ihr eigenes Vermögen sich selbst inklusive laufender Erträge planmäßig bis auf null an Sie aus.

## Durchgerechnete Praxisfälle aus Anspar- und Ruhestandsphase

### Fall A: Kapitalaufbau mit 500 € monatlich über 20 Jahre (Endwert)
Eine Sparerin investiert **20 Jahre lang (`n = 240 Monate`)** jeden Monat **500 €** bei einer erwarteten Durchschnittsrendite von **5,0 % p. a.** (`i = 0,05 / 12 = 0,00416667`).

1. **Eigene Einzahlungen**: `240 × 500 € = 120.000,00 €`.
2. **Zinseszinsfaktor**: `(1 + 0,00416667)^240 = 2,712640`.
3. **Endwert nachschüssig**: `500 € · (2,712640 − 1) / 0,00416667 = 205.516,83 €`.
4. **Endwert vorschüssig**: `205.516,83 € · 1,00416667 = 206.373,15 €`.

Allein durch den Zinseszinseffekt entstehen **85.516,83 €** (bzw. **86.373,15 €** vorschüssig) an reinen Erträgen; die frühere monatliche Überweisung bringt über zwei Jahrzehnte ein Plus von **856,32 €**.

### Fall B: Zusatzrente von 1.500 € pro Monat über 25 Jahre (Barwert)
Ein künftiger Ruheständler möchte seine gesetzliche Rente **25 Jahre lang (`n = 300 Monate`)** um **1.500 € monatlich nachschüssig** aufstocken – insgesamt fließen also **450.000 €** an Auszahlungen. Sein verbleibendes Kapital erwirtschaftet während der Entnahme im Schnitt **4,0 % p. a.** (`i = 0,04 / 12 = 0,00333333`).

1. **Abzinsungsfaktor**: `(1 + 0,00333333)^(−300) = 0,368645`.
2. **Benötigter Barwert (nachschüssig)**: `1.500 € · (1 − 0,368645) / 0,00333333 = 284.178,72 €` (bei vorschüssiger Auszahlung zum Monatsersten: `285.125,99 €`).
3. **Zinshebel in der Entnahmephase**: Obwohl 450.000 € ausgezahlt werden, reichen **284.178,72 €** Startkapital – die restlichen **165.821,28 € (36,8 %)** trägt das weiterarbeitende Restkapital bei.

## Kapitalbedarfstabelle für eine monatliche Zusatzrente von 1.500 €

Wie empfindlich der erforderliche Barwert (nachschüssig, auf volle Euro gerundet) auf Laufzeit und Rendite reagiert, veranschaulicht dieser Vergleich:

| Entnahmedauer | Gesamtauszahlung | Barwert bei 2 % p. a. | Barwert bei 4 % p. a. | Barwert bei 6 % p. a. | Zinsanteil bei 4 % |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **15 Jahre** | 270.000 € | 233.097 € | 202.788 € | 177.755 € | 24,9 % |
| **20 Jahre** | 360.000 € | 296.511 € | 247.533 € | 209.371 € | 31,2 % |
| **25 Jahre** | 450.000 € | 353.895 € | 284.179 € | 232.810 € | 36,8 % |
| **30 Jahre** | 540.000 € | 405.823 € | 314.192 € | 250.187 € | 41,8 % |

Der Vergleich offenbart einen zentralen Effekt der Ruhestandsplanung: Bei einer 30-jährigen Entnahme senkt eine um vier Prozentpunkte höhere Verzinsung (6 % statt 2 %) den Kapitalbedarf um über **155.000 €** – von 405.823 € auf 250.187 €. Gleichzeitig steigt mit höheren Renditeerwartungen das Schwankungsrisiko am Kapitalmarkt.

## Zeitrente gegen Leibrente: Worauf Anleger im DACH-Raum achten sollten

Eine mathematisch berechnete **Zeitrente** (z. B. ein eigener ETF- oder Bank-Entnahmeplan) bietet volle Flexibilität, geringe Kosten und Vererbbarkeit des Restvermögens. Ihr zentrales Risiko ist das **Langlebigkeitsrisiko**: Überleben Sie den kalkulierten 25-Jahres-Horizont, ist das Kapital aufgebraucht. Eine private **Leibrente** (Sofortrente einer Versicherung) sichert genau dieses Risiko lebenslang ab, verlangt dafür jedoch Abschluss- und Verwaltungskosten sowie konservative Sterbetafeln – häufig amortisiert sich das eingezahlte Kapital erst ab einem Lebensalter von **88 bis 93 Jahren**.

In der Praxis bewährt sich für viele Haushalte ein **zweistufiges Modell**: Deckung der fixen Grundkosten (Wohnen, Energie, Krankenversicherung) über lebenslange Quellen wie gesetzliche Rente, Pension, Pensionskasse (Schweiz) oder eine kostengünstige Basis-Leibrente, während das übrige Kapital flexibel über einen eigenen Entnahmeplan genutzt wird. Rechnen Sie dabei stets **inflationsbereinigt** – also mit einem vorsichtigen Realzins von etwa `2 % bis 3,5 % p. a.` statt nominaler Bruttorenditen – und prüfen Sie bei deutschen Versicherungspolicen genau, ob die günstige **Ertragsanteilsbesteuerung** (17 % bei Rentenbeginn mit 67) die höheren Vertragskosten gegenüber einem günstigen Depot-Auszahlplan tatsächlich aufwiegt.
