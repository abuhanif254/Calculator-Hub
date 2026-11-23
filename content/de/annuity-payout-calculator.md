---
title: "Rentenauszahlungsrechner: Maximieren Sie Ihr Renteneinkommen"
metaTitle: "Rentenauszahlungsrechner | Entnahmeplan & Laufzeit planen"
description: "Planen Sie Ihre Rentenentnahmen mit unserem Rentenauszahlungsrechner: Berechnen Sie regelmäßige Auszahlungen aus einem Startkapital oder die exakte Laufzeit Ihres Entnahmeplans."
metaDescription: "Berechnen Sie Ihre monatliche Rentenauszahlung oder wie lange Ihr Startkapital reicht – mit exakten Formeln, Rechenbeispiel und DACH-Steuertipps."
metaKeywords: "rentenauszahlungsrechner, entnahmeplan rechner, kapitalverzehr berechnen, auszahlplan altersvorsorge, rentenauszahlung formel, laufzeit startkapital"
faqs:
  - question: "Wann reicht mein Startkapital rechnerisch unendlich lange (ewige Rente)?"
    answer: "Sobald Ihre periodische Entnahme kleiner oder gleich dem laufenden Zinsertrag der ersten Periode ist (R <= K_0 mal r), greifen Sie den Kapitalstock nicht an. Bei 250.000 € Startkapital und 4,5 % Jahresrendite (0,375 % pro Monat) liegt diese Kapitalerhaltsgrenze exakt bei 937,50 € pro Monat – das Ursprungskapital bleibt nominal dauerhaft erhalten."
  - question: "Wie stark beeinflusst das Auszahlungsintervall die gesamte Zinsgutschrift?"
    answer: "Bei gleicher Nominalrendite und Laufzeit bleibt das Restkapital bei vierteljährlicher oder jährlicher nachschüssiger Auszahlung jeweils länger vollständig investiert als bei monatlicher Entnahme. Bei 250.000 € zu 4,5 % über 20 Jahre steigt die Gesamtauszahlung von 379.589,63 € (monatlich) auf 380.464,58 € (vierteljährlich) und 384.380,72 € (jährlich)."
  - question: "Wie berücksichtige ich die Inflation im Rentenauszahlungsrechner realistisch?"
    answer: "Um eine kaufkraftstabile Monatsrente statt einer nominal festen Summe zu modellieren, tragen Sie anstelle der Nominalrendite Ihre erwartete Realrendite nach Inflation ein (näherungsweise Nominalrendite minus Inflationsrate). Bei 4,5 % Nominalrendite und 2,0 % Inflation rechnen Sie mit rund 2,5 % p. a., sodass die berechnete Startrate heutiger Kaufkraft entspricht."
  - question: "Was ist das Rendite-Reihenfolgerisiko bei einem Depot-Entnahmeplan?"
    answer: "Wenn Aktienmärkte in den ersten drei bis fünf Jahren nach Rentenbeginn stark einbrechen und Sie dennoch feste Beträge entnehmen, müssen Sie unverhältnismäßig viele Fondsanteile zu Tiefstkursen verkaufen. Das Kapital schrumpft dauerhaft schneller als bei konstanter Durchschnittsrendite. Ein Tages- oder Festgeldpuffer für zwei bis drei Jahresausgaben dämpft dieses Risiko deutlich."
  - question: "Wie werden private Rentenauszahlungen in Deutschland, Österreich und der Schweiz besteuert?"
    answer: "In Deutschland unterliegen lebenslange private Leibrenten der günstigen Ertragsanteilsbesteuerung nach § 22 EStG (17 % Ertragsanteil bei Rentenbeginn mit 67), während eigene ETF-Entnahmepläne auf den Gewinnanteil der Abgeltungsteuer (26,375 % inkl. SolZ, abzüglich 30 % Teilfreistellung bei Aktienfonds) unterliegen. In Österreich gilt für Wertpapiererträge die KESt von 27,5 %, in der Schweiz werden lebenslange Renten voll als Einkommen besteuert, während ein Kapitalbezug einer reduzierten einmaligen Kapitalauszahlungssteuer und anschließend der Vermögenssteuer unterliegt."
---

In der Ansparphase zählt ein möglichst stetiger Vermögensaufbau – mit dem Eintritt in den Ruhestand wechselt jedoch die entscheidende finanzielle Aufgabe. Aus einem angesparten Vermögen, einer Abfindung, einer Erbschaft oder einem Pensionskassen-Kapitalbezug soll ein verlässlicher, planbarer Zahlungsstrom entstehen. Der **Rentenauszahlungsrechner** modelliert genau diesen geordneten **Kapitalverzehr**: Während Sie regelmäßig Geld für Ihre Lebenshaltungskosten entnehmen, arbeitet das jeweils verbleibende Restkapital verzinst weiter und verlängert die Reichweite Ihrer Rücklagen spürbar.

## Zwei Rechenmodi: Feste Laufzeit oder fester Auszahlungsbetrag

Je nach persönlicher Lebensplanung beantwortet der Rentenauszahlungsrechner zwei spiegelbildliche Kernfragen der Ruhestandsfinanzierung, die sich ideal für die Gegenüberstellung von privatem Depot-Entnahmeplan und befristeter Sofortrente eignen:

- **Modus „Feste Laufzeit“:** Sie legen Ihr verfügbares Startkapital, die erwartete jährliche Nettorendite, das gewünschte Auszahlungsintervall (monatlich, vierteljährlich oder jährlich) sowie die geplante Entnahmedauer in Jahren fest. Der Rechner ermittelt die exakte gleichbleibende Rate, bei der Ihr Kapital inklusive laufender Erträge am Ende der Laufzeit planmäßig auf genau `0,00 €` abgeschmolzen ist.
- **Modus „Fester Betrag“:** Sie geben vor, wie viel Zusatzrente Sie pro Auszahlungsperiode benötigen, um Ihre persönliche Versorgungslücke verlässlich zu schließen. Der Rechner bestimmt daraufhin auf den Monat genau, wie lange Ihr Kapital ausreicht – oder zeigt an, dass Sie sich im Bereich des dauerhaften **Kapitalerhalts** bewegen.

## Exakte Formeln für Rentenauszahlung und Kapitalreichweite

Der Rechner basiert auf der finanzmathematischen Formel der nachschüssigen Zeitrente. Dabei bezeichnet `K_0` das Startkapital in Euro (`€`), `i` die jährliche Verzinsung als Dezimalzahl (etwa `0,045` für `4,5 % p. a.`), `m` die Anzahl der Auszahlungen pro Jahr (`12` monatlich, `4` vierteljährlich, `1` jährlich) und `T` die Entnahmedauer in Jahren.

Daraus ergeben sich der Periodenzinssatz `r = i / m` und die gesamte Periodenzahl `n = T × m`:

```text
Feste Laufzeit (gesucht: periodische Auszahlung R):
R = K_0 × [ r / (1 − (1 + r)^(−n)) ]        (Sonderfall r = 0: R = K_0 / n)

Fester Betrag (gesucht: Anzahl der Auszahlungsperioden n):
n = −ln(1 − (K_0 × r) / R) / ln(1 + r)      (für R > K_0 × r; bei r = 0: n = K_0 / R)

Gesamtauszahlung und Zinsertrag:
G = R × n        und        Z = G − K_0
```

Ein entscheidender mathematischer Grenzfall tritt im Modus „Fester Betrag“ auf, sobald `R ≤ K_0 × r` gilt: Dann ist der Ausdruck `1 − (K_0 × r) / R` kleiner oder gleich null, der Logarithmus ist nicht mehr reell definiert und das Kapital wird rechnerisch **nie aufgebraucht**. Sie entnehmen höchstens die laufend erwirtschafteten Zinsen (**ewige Rente**), sodass der volle Kapitalstock für spätere Lebensphasen oder Erben erhalten bleibt.

## Durchgerechnete Beispiele: Auszahlungshöhe und Kapitalreichweite

Betrachten wir ein praxisnahes Ruhestandsvermögen von **`K_0 = 250.000,00 €`** bei einer durchschnittlichen Jahresrendite von **`i = 4,5 % p. a.`** und monatlicher Auszahlung (`m = 12`, also Periodenzinssatz `r = 0,045 / 12 = 0,00375`).

### Fall 1: Feste Laufzeit von 20 Jahren (`n = 240 Monate`)

1. **Abzinsungsfaktor bestimmen:** `(1 + 0,00375)^(−240) = 0,407255`.
2. **Nenner bilden:** `1 − 0,407255 = 0,592745`.
3. **Monatliche Auszahlung berechnen:** `R = 250.000,00 € × (0,00375 / 0,592745) = 1.581,62 €` (ungerundet `1.581,6234 €`).
4. **Gesamtauszahlung und Zinsanteil:** Über 20 Jahre fließen insgesamt **`379.589,63 €`** an Sie zurück. Obwohl Sie nur `250.000,00 €` eingebracht haben, erwirtschaftet das weiterarbeitende Restkapital zusätzliche **`129.589,63 €`** an Zinsen.

Wählen Sie statt monatlicher Auszahlung ein längeres Intervall, verzinst sich der Bestand jeweils länger: Bei vierteljährlicher Entnahme erhalten Sie **`4.755,81 €`** je Quartal (`380.464,58 €` gesamt), bei jährlicher Auszahlung **`19.219,04 €`** pro Jahr (`384.380,72 €` gesamt).

### Fall 2: Fester Auszahlungsbetrag von 1.800,00 € pro Monat

Zunächst prüfen wir die Kapitalerhaltsgrenze: `K_0 × r = 250.000,00 € × 0,00375 = 937,50 €`. Da die gewünschte Monatsrate von **`1.800,00 €`** deutlich darüber liegt, findet ein echter Kapitalverzehr statt:

1. **Verhältnis aus Zinsgrenze und Rate:** `937,50 € / 1.800,00 € = 0,520833`.
2. **Laufzeit in Monaten:** `n = −ln(1 − 0,520833) / ln(1,00375) = 0,735707 / 0,003743 = 196,56 Monate`.
3. **Kapitalreichweite:** Das Vermögen trägt die Wunschrente exakt **16 Jahre und 5 Monate** lang. Insgesamt werden **`353.800,98 €`** ausgezahlt, wovon **`103.800,98 €`** aus laufenden Zinserträgen stammen.

## Vergleichstabelle: Monatliche Auszahlung aus 250.000 € Startkapital

Wie stark Rendite und gewählte Entnahmedauer das monatliche Rentenbudget verändern, zeigt die folgende Übersicht für eine monatliche nachschüssige Auszahlung (alle Beträge in Euro):

| Entnahmedauer | Rate bei 2,0 % (€) | Rate bei 4,0 % (€) | Rate bei 5,5 % (€) | Zinsertrag bei 4,0 % (€) |
| :--- | :---: | :---: | :---: | :---: |
| **15 Jahre (180 Monate)** | 1.608,77 | 1.849,22 | 2.042,71 | 82.860 |
| **20 Jahre (240 Monate)** | 1.264,71 | 1.514,95 | 1.719,72 | 113.588 |
| **25 Jahre (300 Monate)** | 1.059,64 | 1.319,59 | 1.535,22 | 145.878 |
| **30 Jahre (360 Monate)** | 924,05 | 1.193,54 | 1.419,47 | 179.674 |
| **Ewige Rente (Kapitalerhalt)** | 416,67 | 833,33 | 1.145,83 | unbegrenzt |

Die Tabelle macht zwei zentrale Hebel sichtbar: Schon zwei Prozentpunkte mehr Nettorendite (`4,0 %` statt `2,0 %`) erhöhen die 25-Jahres-Rente um knapp **260 Euro monatlich**. Gleichzeitig schmilzt der monatliche Spielraum spürbar, sobald das Kapital für 30 statt 15 Jahre reichen oder vollständig für Hinterbliebene erhalten bleiben soll.

## Praxistipps und häufige Fehler bei der Entnahmeplanung

- **Mit Realrendite statt Nominalrendite planen:** Eine starre Auszahlung von `1.500 €` verliert bei `2,0 %` jährlicher Teuerung binnen 20 Jahren rund ein Drittel ihrer Kaufkraft. Rechnen Sie für konstante Kaufkraft konservativ mit Ihrer erwarteten Nettorendite abzüglich Inflation.
- **Langlebigkeitsrisiko realistisch abdecken:** Wer mit 65 in den Ruhestand geht, sollte eine befristete Entnahme selten auf nur 15 oder 20 Jahre auslegen. Ein Planungshorizont bis mindestens zum 90. oder 95. Lebensjahr schützt davor, im hohen Alter bei steigenden Pflege- oder Gesundheitskosten auf das Ersparte verzichten zu müssen.
- **Rendite-Reihenfolgerisiko abfedern:** Bei Wertpapierdepots schwanken Jahresrenditen stark. Halten Sie zwei bis drei Jahresausgaben in sicheren Tages- oder Festgeldern vor, um Börsenrückgänge ohne schmerzhafte Notverkäufe zu überbrücken.
- **Steuern im DACH-Raum vorab einpreisen:** Bruttoauszahlungen entsprechen nicht dem Netto auf dem Girokonto. Kalkulieren Sie in Deutschland je nach Anlageform Abgeltungsteuer (mit Teilfreistellung bei Aktien-ETFs) oder Ertragsanteilsbesteuerung (§ 22 EStG), in Österreich die `27,5 %` Kapitalertragsteuer und in der Schweiz kantonale Einkommens- sowie Vermögenssteuern realistisch über eine entsprechend reduzierte Nettorendite ein.
