---
title: "Effektivzins-Rechner (APR)"
metaTitle: "Effektivzins-Rechner (APR): Echte Kreditkosten berechnen"
description: "Ermitteln Sie den effektiven Jahreszins (APR) unter Einbeziehung von Sollzins, Disagio und einmaligen Abschlussgebühren für objektive Kreditvergleiche."
metaDescription: "Berechnen Sie den effektiven Jahreszins (APR) inklusive Disagio und Abschlussgebühren und vergleichen Sie reale Kreditkosten nach PAngV präzise."
metaKeywords: "effektivzins rechner, apr rechner, effektiver jahreszins berechnen, sollzins vs effektivzins, kreditkosten vergleich, disagio effektivzins, pangv rechner"
faqs:
  - question: "Warum weicht der effektive Jahreszins vom gebundenen Sollzins ab?"
    answer: "Der gebundene Sollzins bildet ausschließlich die reine Verzinsung der nominalen Darlehenssumme ab. Der effektive Jahreszins berücksichtigt zusätzlich die unterjährige Verrechnung monatlicher Raten sowie sämtliche verpflichtenden Nebenkosten wie Disagio, Vermittlungsprovisionen oder Kontogebühren und macht verschiedene Kreditangebote erst vergleichbar."
  - question: "Was unterscheidet den deutschen Effektivzins nach PAngV vom US-amerikanischen APR?"
    answer: "Beide Kennzahlen suchen über die Barwertmethode denselben internen Monatszins auf Basis des tatsächlich ausgezahlten Nettobetrags. Während der US-amerikanische APR diesen Monatszins einfach mit zwölf multipliziert, rechnet der europäische Effektivzins nach § 16 PAngV mit Zinseszins hoch. Deshalb liegt der PAngV-Effektivzins selbst ohne jede Gebühr leicht über dem nominalen Sollzins."
  - question: "Sind Bearbeitungsgebühren bei Privatkrediten in Deutschland überhaupt zulässig?"
    answer: "Nein. Der Bundesgerichtshof hat laufzeitunabhängige Bearbeitungsentgelte in vorformulierten Kreditverträgen sowohl für Verbraucher als auch für Unternehmer als unwirksam eingestuft. Dennoch treten weiterhin zulässige Vorabkosten auf – etwa ein vereinbartes Disagio bei Immobilienkrediten, Bauspar-Abschlussgebühren, Schätzkosten oder internationale Kreditabschlussgebühren bei US-Finanzierungen."
  - question: "Warum schlagen Abschlussgebühren bei kurzer Laufzeit so viel stärker auf den Effektivzins durch?"
    answer: "Einmalige Vorabkosten wirken wie eine sofortige Verringerung des ausgezahlten Kapitals, während die volle Darlehenssumme zurückgezahlt werden muss. Verteilt sich eine Gebühr von 2.500 € auf 30 Jahre, fällt der jährliche Aufschlag moderat aus. Muss derselbe Betrag hingegen innerhalb von 36 Monaten verdient werden, springt der Effektivzins um weit über einen Prozentpunkt nach oben."
  - question: "Welche Kosten bleiben selbst im effektiven Jahreszins oft unberücksichtigt?"
    answer: "Freiwillig vermittelte Restschuldversicherungen, Bereitstellungszinsen bei Neubauten, optionale Sondertilgungsaufschläge sowie Notar- und Grundbuchkosten für die Kaufabwicklung fließen häufig nicht in den ausgewiesenen Effektivzins ein. Prüfen Sie bei jedem Kreditvertrag zusätzlich den im Europäischen Standardisierten Merkblatt (ESIS) ausgewiesenen Gesamtbetrag."
---

Ein Darlehensangebot mit **4,65 % Sollzins** klingt auf den ersten Blick günstiger als ein Konkurrenzangebot mit **4,95 %**. Sobald beim vermeintlichen Schnäppchen jedoch ein Disagio, eine Vermittlungsgebühr oder verpflichtende Abschlusskosten hinzukommen, kippt die Rechnung schnell. Genau hier setzt der **effektive Jahreszins** – international als **APR** (*Annual Percentage Rate*) bezeichnet – an: Er verdichtet Sollzins, Laufzeit, Zahlungsrhythmus und einmalige Kreditnebenkosten in eine einzige jährliche Prozentzahl. Im DACH-Raum verpflichtet § 16 der deutschen Preisangabenverordnung (PAngV) ebenso wie das österreichische Verbraucherkreditgesetz (VKrG) und das Schweizer Konsumkreditgesetz (KKG) Kreditinstitute zur transparenten Ausweisung dieser Kennzahl.

## Sollzins, Disagio und Effektivzins: Zwei Rechenkonventionen

Finanzmathematisch stellt der effektive Jahreszins den **internen Zinsfuß** (*Internal Rate of Return*) eines Kredits dar. Entscheidend ist, dass nicht der vertragliche Nennbetrag, sondern der **tatsächlich verfügbare Auszahlungsbetrag** nach Abzug aller sofort fälligen Kreditkosten als Ausgangsbasis dient. Bei einer Baufinanzierung mit 2,5 % Disagio oder einem US-Kredit mit Abschlussgebühren (*Origination Fees* und *Discount Points*) erhalten Sie weniger Geld ausgezahlt, müssen aber Raten auf den vollen Nennbetrag leisten.

In der Praxis existieren zwei eng verwandte Berechnungskonventionen:

1. **Nominaler APR (US-Konvention):** Der gesuchte periodische Effektivzins `r_m` wird linear aufs Jahr hochgerechnet (`APR = 12 × r_m`). Ohne Zusatzgebühren entspricht dieser APR exakt dem Sollzins.
2. **Effektivzins nach PAngV (DACH- und EU-Standard):** Der interne Monatszins wird mit monatlichem Zinseszins annualisiert (`i_eff = (1 + r_m)^12 − 1`). Selbst bei null Euro Gebühren liegt der PAngV-Effektivzins daher über dem Sollzins – bei 5,00 % Sollzins bei exakt **5,12 %**.

## Die Barwertgleichung hinter dem Effektivzins

Zuerst bestimmt der Rechner aus Nennbetrag, Sollzins und Laufzeit die vertragliche Monatsrate `R`. Danach ermittelt er jenen monatlichen Diskontierungszins `r_m`, bei dem der Barwert aller Monatsraten genau dem Nettoauszahlungsbetrag entspricht:

```text
Monatsrate:      R = K × [i × (1 + i)^n] / [(1 + i)^n − 1]
Barwertgleichung: K − G = R × [1 − (1 + r_m)^(−n)] / r_m
APR (nominal):   r_m × 12 × 100 %
PAngV-Effektiv:  [(1 + r_m)^12 − 1] × 100 %
```

Dabei stehen **K** für den Darlehensnennbetrag, **G** für einmalige Vorabkosten (Disagio oder Abschlussgebühren), **i** für den monatlichen Sollzins (`Sollzins p. a. / 12`), **n** für die Anzahl der Monatsraten (`Laufzeit in Jahren × 12`) und **r_m** für den gesuchten effektiven Monatszins. Weil sich `r_m` bei mehrjährigen Krediten nicht direkt isolieren lässt, löst der Rechner die Barwertgleichung numerisch über das Newton-Raphson-Verfahren.

## Rechenbeispiel: 100.000 € Darlehen mit 2.500 € Vorabgebühren

Angenommen, Sie prüfen ein Darlehen über **100.000 €** mit einem gebundenen **Sollzins von 5,00 % p. a.** über **10 Jahre** (`n = 120 Monate`). Durch einmalige Abschluss- und Vermittlungskosten bzw. ein Disagio von **2.500 €** stehen Ihnen netto lediglich **97.500 €** zur Verfügung.

1. **Vertragliche Monatsrate berechnen:** Mit `i = 0,05 / 12 = 0,00416667` liefert die Annuitätenformel eine konstante Monatsrate von **1.060,66 €**.
2. **Gesamtzahlung und Kosten bestimmen:** Über 120 Monate fließen **127.278,62 €** zurück. Die regulären Sollzinsen betragen **27.278,62 €**; inklusive der Vorabgebühr von **2.500 €** belaufen sich die realen Kreditkosten auf **29.778,62 €**.
3. **Internen Monatszins ermitteln:** Gesucht ist `r_m`, sodass 120 Raten à 1.060,66 € exakt den Barwert **97.500 €** ergeben. Die numerische Iteration liefert `r_m = 0,00462684` (0,4627 % monatlich).
4. **Jahreswerte ableiten:** Als nominaler **APR** resultieren **5,55 %** (`0,00462684 × 12`). Nach der verbindlichen **PAngV-Methode** beträgt der effektive Jahreszins sogar **5,70 %** (`(1 + 0,00462684)^12 − 1`).

Ein gebührenfreier Konkurrenzkredit mit **5,40 % Sollzins** (5,54 % PAngV-Effektivzins) wäre über die gesamte Laufzeit spürbar günstiger – obwohl sein beworbener Schaufensterzins 0,40 Prozentpunkte höher wirkt.

## Vergleichstabelle: Wie Laufzeit und Gebühren den Effektivzins spreizen

Die Übersicht zeigt für ein Darlehen über **100.000 €** bei **5,00 % Sollzins**, wie stark dieselbe Einmalgebühr den Effektivzins je nach Laufzeit nach oben treibt:

| Laufzeit (Monatsrate) | 0 € Gebühr (APR / PAngV) | 1.500 € (APR / PAngV) | 2.500 € (APR / PAngV) | 4.000 € (APR / PAngV) |
| :--- | :--- | :--- | :--- | :--- |
| **3 Jahre (2.997,09 €)** | 5,00 % / 5,12 % | 6,01 % / 6,18 % | 6,70 % / 6,91 % | 7,75 % / 8,03 % |
| **10 Jahre (1.060,66 €)** | 5,00 % / 5,12 % | 5,33 % / 5,46 % | 5,55 % / 5,70 % | 5,89 % / 6,06 % |
| **30 Jahre (536,82 €)** | 5,00 % / 5,12 % | 5,13 % / 5,26 % | 5,22 % / 5,35 % | 5,36 % / 5,50 % |

Während 4.000 € Abschlusskosten einen 30-jährigen Immobilienkredit um gerade einmal **0,36 Prozentpunkte** (APR) verteuern, heben sie den Effektivzins bei 3 Jahren Laufzeit um volle **2,75 Prozentpunkte** an. Besonders bei geplanter vorzeitiger Ablösung rächt sich ein hohes Disagio: Wer ein 10-Jahres-Darlehen mit 2.500 € Vorabkosten nach drei Jahren umschuldet, zahlt wirtschaftlich fast **7 % effektiv**.

## Praxistipps beim Kreditvergleich im DACH-Raum

- **Zweidrittelzins beachten (§ 17 PAngV):** Werbliche „Ab-Zinssätze“ erhalten nur Spitzenbonitäten. Maßgeblich ist das gesetzliche repräsentative Beispiel, das den Effektivzins nennt, den mindestens zwei Drittel aller Kunden tatsächlich erhalten.
- **Restschuldversicherung separat einrechnen:** Banken deklarieren Ratenschutzpolicen häufig als „freiwillig“, sodass die hohe Einmalprämie nicht im Effektivzins erscheint. Geben Sie eine mitfinanzierte Versicherungsprämie probeweise als Vorabgebühr ein, um die echte Belastung offenzulegen.
- **Identische Zinsbindung vergleichen:** Bei Baufinanzierungen mit Restschuld nach zehn Jahren unterstellt die PAngV für die Restlaufzeit den aktuellen variablen Referenzzins. Vergleichen Sie Angebote daher immer bei gleicher Sollzinsbindung und prüfen Sie zusätzlich die exakte Restschuld am Laufzeitende.
- **Disagio steuerlich abwägen:** Bei vermieteten Kapitalanlageimmobilien kann ein marktübliches Disagio im Zahlungsjahr als sofort abzugsfähige Werbungskosten attraktiv sein; beim selbstgenutzten Eigenheim lohnt es sich rechnerisch meist nur, wenn die gesamte Zinsbindungsfrist bis zum Schluss durchgehalten wird.
