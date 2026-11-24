---
title: "Rentenrechner (Social Security)"
metaTitle: "Rentenrechner (Social Security): Altersrente berechnen"
description: "Schätzen Sie Ihre monatliche Altersrente nach der US-Sozialversicherungsformel samt Knickpunkten, Frührenten-Abschlägen und Aufschub-Zuschlägen bis 70."
metaDescription: "Berechnen Sie Ihre geschätzte US-Altersrente (Social Security) für Alter 62 bis 70. Mit Rentenformel, Amortisationsalter und DACH-Rentenvergleich."
metaKeywords: "rentenrechner, social security rechner, altersrente berechnen, renteneintrittsalter 62 67 70, rentenabschlag, rentenaufschub, altersvorsorge"
faqs:
  - question: "Wie berechnet der Rentenrechner die monatliche Basisrente bei Alter 67?"
    answer: "Der Rechner bildet die gestaffelte US-Rentenformel (Social Security) ab. Zunächst kappt er das Bruttojahresgehalt an der Beitragsbemessungsgrenze von 168.600 USD und ermittelt das monatliche Referenzeinkommen (AIME). Darauf wendet er drei progressive Ersatzsätze an: 90 % bis 1.174 USD, 32 % zwischen 1.174 USD und 7.078 USD sowie 15 % für den Einkommensteil darüber."
  - question: "Wie hoch sind die Abschläge bei vorzeitigem Rentenbeginn ab 62 Jahren?"
    answer: "Gegenüber der Regelaltersgrenze von 67 Jahren wird die Monatsrente für die ersten 36 Monate vorzeitigen Bezugs um 5/9 % pro Monat gekürzt (zusammen 20 %) und für jeden weiteren Monat bis zu 60 Monaten um 5/12 % pro Monat (weitere 10 %). Wer exakt mit 62 in Rente geht, erhält dauerhaft 70 % der regulären Altersrente."
  - question: "Lohnt sich der Rentenaufschub bis zum 70. Lebensjahr rechnerisch?"
    answer: "Für jedes Jahr Aufschub nach Alter 67 wächst die monatliche US-Altersrente lebenslang um 8 % (2/3 % pro Monat), bis zum Maximum von +24 % mit 70 Jahren. Ohne Berücksichtigung von Kapitalzinsen überholt die kumulierte Gesamtauszahlung ab Alter 70 den regulären Beginn mit 67 ab einem Lebensalter von 82 Jahren und 6 Monaten."
  - question: "Warum sinkt die prozentuale Lohnersatzquote bei höheren Gehältern so deutlich?"
    answer: "Die US-Sozialversicherung enthält eine starke soziale Umverteilung über ihre beiden Knickpunkte. Während Einkommensanteile bis 1.174 USD monatlich zu 90 % ersetzt werden, fließen Gehaltsteile oberhalb von 7.078 USD nur noch mit 15 % und Einkommen über 168.600 USD pro Jahr gar nicht mehr in den Rentenanspruch ein."
  - question: "Wie unterscheidet sich das US-Modell von den Rentensystemen in Deutschland, Österreich und der Schweiz?"
    answer: "Die deutsche gesetzliche Rentenversicherung teilt zwar die Regelaltersgrenze 67, berechnet Ansprüche aber proportional über Entgeltpunkte mit moderateren Abschlägen (0,3 % pro Monat) und Zuschlägen (0,5 % pro Monat). Das österreichische Pensionskonto arbeitet mit 5,1 % Abschlag oder Bonus pro Jahr, während die Schweizer AHV wie das US-System stark solidarisch umverteilt und eine klare Maximalrente vorsieht."
---

Kaum eine Entscheidung prägt das Einkommen im Ruhestand so stark wie der Zeitpunkt des Renteneintritts. Unser **Rentenrechner (Social Security)** schätzt Ihre künftige monatliche Altersrente nach der gesetzlichen Formel der US-Sozialversicherung anhand Ihres Alters, Ihres Bruttojahresgehalts und Ihres geplanten Rentenalters zwischen **62 und 70 Jahren**. Das Modell hilft Berufstätigen, Entsandten und Rückkehrern im DACH-Raum mit US-Versicherungszeiten bei einer schnellen Erstorientierung und zeigt zugleich glasklar, wie Beitragsbemessungsgrenzen, Frührentenabschläge und Aufschubzuschläge wirken.

## Die gestaffelte Rentenformel: Knickpunkte, Abschläge und Zuschläge

Anders als rein beitragsproportionale Systeme berechnet die US-Sozialversicherung die monatliche Basisrente bei Regelaltersgrenze (**PIA**) über drei degressive Ersatzstufen. Der Rechner verwendet die gesetzlichen Schwellenwerte (**Knickpunkte**) von **1.174 USD** und **7.078 USD** sowie die Beitragsbemessungsgrenze von **168.600 USD** pro Jahr:

```text
Gedeckeltes Gehalt: E_cap = min(E_Jahr, 168.600)
Monatsbasis (AIME): AIME  = E_cap / 12
Basisrente mit 67:  PIA   = 0,90 × min(AIME, 1.174)
                          + 0,32 × max(0, min(AIME, 7.078) − 1.174)
                          + 0,15 × max(0, AIME − 7.078)
Monatsrente:        R_Mon = PIA × F_Alter
```

Dabei stehen **E_Jahr** für das jährliche Bruttoeinkommen, **E_cap** für das beitragspflichtige Höchsteinkommen, **AIME** für das monatliche Referenzeinkommen, **PIA** für die ungekürzte Monatsrente mit 67, **F_Alter** für den Altersfaktor und **R_Mon** für Ihre voraussichtliche Bruttorente.

Für alle ab 1960 Geborenen liegt die **Regelaltersgrenze bei 67 Jahren** (`F_Alter = 1,00`). Abweichungen wirken lebenslang:

- **Vorzeitiger Rentenbeginn (62 bis 66 Jahre):** Die ersten 36 vorgezogenen Monate kosten jeweils **5/9 %** (`0,5556 %`, zusammen 20,0 %), jeder weitere Monat bis zum 60. Monat **5/12 %** (`0,4167 %`, weitere 10,0 %). Mit 62 verbleiben dauerhaft **70,0 %** (`F_Alter = 0,70`).
- **Aufgeschobener Rentenbeginn (68 bis 70 Jahre):** Jeder Monat nach Alter 67 erhöht die Rente um **2/3 %** – exakt **8,0 % pro Jahr**, gedeckelt bei Alter 70 auf **124,0 %** (`F_Alter = 1,24`).

## Durchgerechnetes Rechenbeispiel: 75.000 USD Gehalt und Amortisationsalter

Rechnen wir die Standardvorgabe des Rechners Schritt für Schritt durch: **75.000 USD Bruttojahresgehalt** bei Renteneintritt mit 62, 67 oder 70 Jahren.

1. **Monatsbasis ermitteln:** Da `75.000 USD` unter `168.600 USD` liegt, gilt `AIME = 75.000 / 12 = 6.250,00 USD`.
2. **Basisrente (PIA) mit 67 berechnen:**
   - Erste Stufe (90 % bis 1.174 USD): `1.174 × 0,90 = 1.056,60 USD`.
   - Zweite Stufe (32 % auf `6.250 − 1.174 = 5.076 USD`): `5.076 × 0,32 = 1.624,32 USD`.
   - Dritte Stufe (15 % über 7.078 USD): `0,00 USD`.
   - **Ergebnis mit 67:** **2.680,92 USD/Monat** (gerundet **2.681 USD**, Brutto-Ersatzquote **42,89 %**).
3. **Vergleich Alter 62 versus 70:**
   - Mit **62 Jahren** (`−30 %`): `2.680,92 × 0,70 = 1.876,64 USD/Monat` (**1.877 USD**).
   - Mit **70 Jahren** (`+24 %`): `2.680,92 × 1,24 = 3.324,34 USD/Monat` (**3.324 USD**) – **77,14 %** mehr Monatsrente als mit 62.
4. **Amortisationsalter (ohne Verzinsung):** Wer statt mit 62 erst mit 67 startet, verzichtet auf 60 Zahlungen à `1.876,64 USD` (`112.598,64 USD`), erhält danach aber **804,28 USD** monatlich mehr. Nach exakt **140 Monaten** (11 Jahre und 8 Monate) ist der Rückstand aufgeholt – ab **Alter 78 Jahre und 8 Monate** führt der Start mit 67. Zwischen 67 und 70 beträgt die Aufholzeit **150 Monate** (12 Jahre und 6 Monate), sodass sich der Aufschub ab **Alter 82 Jahre und 6 Monate** auszahlt.

## Vergleichstabelle: Rentenhöhe nach Eintrittsalter und Gehalt

Die Übersicht vergleicht monatliche Bruttorenten und Ersatzquoten bei **75.000 USD** und **120.000 USD** Jahresgehalt:

| Rentenalter | Faktor ggü. 67 | Rente (75.000 USD/J.) | Ersatzquote | Rente (120.000 USD/J.) | Ersatzquote |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **62 Jahre** | 70,00 % | 1.876,64 USD | 30,03 % | 2.368,93 USD | 23,69 % |
| **64 Jahre** | 80,00 % | 2.144,74 USD | 34,32 % | 2.707,34 USD | 27,07 % |
| **65 Jahre** | 86,67 % | 2.323,46 USD | 37,18 % | 2.932,96 USD | 29,33 % |
| **67 Jahre** | 100,00 % | **2.680,92 USD** | **42,89 %** | **3.384,18 USD** | **33,84 %** |
| **68 Jahre** | 108,00 % | 2.895,39 USD | 46,33 % | 3.654,91 USD | 36,55 % |
| **70 Jahre** | 124,00 % | **3.324,34 USD** | **53,19 %** | **4.196,38 USD** | **41,96 %** |

Obwohl **120.000 USD** exakt 60 % mehr Bruttogehalt bedeuten als **75.000 USD**, steigt die Basisrente nur um **26,23 %** (`3.384,18 USD` statt `2.680,92 USD`), weil Gehaltsteile oberhalb von 7.078 USD monatlich bloß mit 15 % zählen.

### Entscheidungsfaktoren jenseits des Amortisationsalters

Das reine Amortisationsalter bildet nur einen Teil der Entscheidung ab. Wer gesund ist, weiter arbeitet oder eine hohe Lebenserwartung erwartet, profitiert vom Aufschub bis 70 doppelt: Zum einen greifen vor Alter 67 bei parallelem Erwerbseinkommen zeitweilige Hinzuverdienstkürzungen, zum anderen steigert eine aufgeschobene Rente bei Verheirateten dauerhaft die mögliche Hinterbliebenenrente für den länger lebenden Partner. Bei gravierenden gesundheitlichen Einschränkungen oder akutem Liquiditätsbedarf kann dagegen ein früherer Rentenbeginn wirtschaftlich sinnvoller sein.

## Einordnung im DACH-Raum und häufige Planungsfehler

Im deutschsprachigen Vergleich teilt die **deutsche gesetzliche Rentenversicherung (GRV)** zwar die Regelaltersgrenze von **67 Jahren** (ab Jahrgang 1964), rechnet aber proportional über Entgeltpunkte mit geringeren Abschlägen (**0,3 % pro Monat**, max. 14,4 %) und Zuschlägen (**0,5 % pro Monat**, 6,0 %/Jahr). Das **österreichische Pensionskonto** setzt Abschläge und Boni von **5,1 % pro Jahr** an, während die **Schweizer AHV (1. Säule)** eine ähnlich starke soziale Umverteilung mit gedeckelter Maximalrente sowie Vorbezugsabschlägen (6,8 % bzw. 13,6 %) und Aufschubzuschlägen (5,2 % bis 31,5 %) kombiniert.

Beachten Sie bei der Bewertung Ihrer Schätzung vier zentrale Fallstricke:

- **35 Beitragsjahre und Nulljahre einrechnen:** Die reale US-Rente basiert auf den 35 inflationsindexierten stärksten Erwerbsjahren. Wer nur 15 Jahre in den USA eingezahlt hat, füllt 20 Jahre mit Nullen, wodurch die echte Teilrente spürbar niedriger ausfällt.
- **Sozialversicherungsabkommen nutzen:** Deutschland, Österreich und die Schweiz haben bilaterale Abkommen mit den USA. Versicherungszeiten beider Länder lassen sich zusammenrechnen, um Mindestwartezeiten (wie 40 US-Quartale oder 5 Jahre in der GRV) zu erfüllen.
- **Steuern, Krankenversicherung und Wechselkurs beachten:** Bruttorenten unterliegen je nach Wohnsitz und Doppelbesteuerungsabkommen der Einkommensteuer sowie Sozialabgaben; bei Auszahlung in Euro (€) oder Schweizer Franken (CHF) schwankt die Kaufkraft zudem mit dem Wechselkurs.
- **Private Versorgungslücke schließen:** Eine gesetzliche Ersatzquote von 34 % bis 43 % reicht selten für den gewohnten Lebensstandard und sollte über betriebliche Vorsorge (bAV, Pensionskasse, BVG) und privates Sparen ergänzt werden.
