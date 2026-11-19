---
title: "Hypotheken-Tilgungsrechner"
metaTitle: "Hypotheken-Tilgungsrechner: Sondertilgung & Zinsersparnis"
description: "Berechnen Sie Restschuld, verkürzte Kreditlaufzeit und Zinsersparnis durch monatliche Mehrleistungen, jährliche Sondertilgungen, Einmalzahlungen oder Zwei-Wochen-Rhythmus."
metaDescription: "Berechnen Sie Restschuld, verkürzte Laufzeit und Zinsersparnis Ihrer Baufinanzierung durch Sondertilgungen, höhere Raten oder Zwei-Wochen-Rhythmus."
metaKeywords: "hypotheken tilgungsrechner, sondertilgung rechner, restschuld berechnen, baufinanzierung schneller abbezahlen, zinsersparnis tilgung, tilgungsplan hypothek, umschuldung rechner"
faqs:
  - question: "Warum spart eine frühe Sondertilgung so viel mehr Zinsen als derselbe Betrag in späteren Jahren?"
    answer: "Bei einem Annuitätendarlehen wird jeder getilgte Euro dauerhaft aus der Zinsberechnung genommen. Die dadurch eingesparten Monatszinsen erhöhen im Folgemonat automatisch den regulären Tilgungsanteil, sodass ein Schneeballeffekt entsteht. Eine Sondertilgung im ersten Jahr wirkt über die gesamte Restlaufzeit – derselbe Betrag kurz vor Laufzeitende spart nur noch wenige Monate Zinsen."
  - question: "Wie funktioniert die zweiwöchentliche Rückzahlung – und bieten Banken im DACH-Raum das an?"
    answer: "Bei der im nordamerikanischen Raum verbreiteten Zwei-Wochen-Zahlung (Biweekly) überweisen Sie alle 14 Tage genau die Hälfte Ihrer Monatsrate. Da ein Jahr 52 Wochen hat, leisten Sie 26 halbe Raten – also exakt 13 statt 12 volle Monatsraten pro Jahr. Deutsche Banken buchen standardmäßig monatlich ab, doch erzielen Sie exakt denselben Effekt, indem Sie Ihre Monatsrate um ein Zwölftel erhöhen oder jährlich eine 13. Rate als Sondertilgung überweisen."
  - question: "Wie viel Sondertilgung darf ich bei einer deutschen oder österreichischen Baufinanzierung kostenfrei leisten?"
    answer: "In Deutschland gewähren die meisten Baufinanzierungsverträge eine kostenfreie Sondertilgungsoption von 5 % der ursprünglichen Darlehenssumme pro Kalenderjahr; höhere Quoten kosten meist einen kleinen Zinsaufschlag. Zusätzlich erlaubt § 489 Abs. 1 Nr. 2 BGB nach zehn Jahren Zinsbindung eine komplett kostenfreie Teil- oder Vollablösung. In Österreich sind bei Fixzinskrediten nach § 20 HIKrG in der Regel 10.000 € pro Jahr pönalefrei."
  - question: "Wann ist Sondertilgen finanziell sinnvoller als Geld am Kapitalmarkt anzulegen?"
    answer: "Jede Sondertilgung bringt eine risikofreie, steuerfreie Rendite exakt in Höhe Ihres Darlehenszinssatzes. Bei 4,25 % Sollzins müsste eine sichere Geldanlage in Deutschland vor Abgeltungsteuer und Solidaritätszuschlag (26,375 %) mindestens 5,77 % p. a. erzielen, um netto gleichzuziehen. Nur wenn Ihr Altvertrag noch zu 1 % bis 2 % verzinst ist, sind sichere Festgelder oder Anleihen oft lukrativer."
  - question: "Welche Besonderheit gilt für Sondertilgungen bei einer vermieteten Immobilie?"
    answer: "Bei vermieteten Objekten mindern Schuldzinsen als Werbungskosten Ihre steuerpflichtigen Mieteinkünfte. Wer ein Vermietungsdarlehen mit 4,25 % Zins vorzeitig tilgt, spart bei einem persönlichen Grenzsteuersatz von 42 % effektiv nur rund 2,47 % nach Steuern. Darum sollten freie Mittel steuerlich fast immer zuerst in die Entschuldung des selbstgenutzten Eigenheims fließen."
---

## Restschuld gezielt abbauen: Wie Sondertilgungen die Kreditlaufzeit verkürzen

Bei einer klassischen Immobilienfinanzierung fressen die Zinsen in den ersten Jahren den Großteil Ihrer monatlichen Belastung auf. Wer sich schlicht auf die vertragliche Pflichtrate verlässt, zahlt über 25 oder 30 Jahre häufig mehr als die Hälfte der ursprünglichen Kreditsumme allein an Zinsen. Der **Hypotheken-Tilgungsrechner** macht den stärksten Gegenhebel transparent: Mit überschaubaren **monatlichen Aufstockungen**, **jährlichen Sondertilgungen** aus Bonus oder Steuerrückerstattung, einer **Einmalzahlung** aus Erbschaft oder einem **13-Raten-Jahresrhythmus** schmilzt die Restschuld spürbar schneller – und Sie rücken das Datum der kompletten Schuldenfreiheit um Jahre nach vorn.

## Mathematik der beschleunigten Entschuldung

Solange Sie ausschließlich eine feste Monatsrate `R` zahlen, folgt der Tilgungsplan einem starren Rhythmus. Fließen dagegen zusätzliche Beträge direkt in die Kapitalrückführung, schrumpft die Restschuld `S_t` Monat für Monat schrittweise nach der rekursiven Tilgungsgleichung:

```text
Monatlicher Zinsanteil:  Z_t = S_(t−1) × i
Reguläre Tilgung:        T_t = R − Z_t
Neue Restschuld:         S_t = S_(t−1) − (T_t + E_t)

Restlaufzeit bei konstant erhöhter Monatsrate (R_gesamt = R + E):
n_neu = −ln(1 − (S_0 × i) / R_gesamt) / ln(1 + i)
```

Die Variablen bedeuten:
- **S_0**: aktuelle Restschuld zu Beginn Ihrer Simulation
- **i**: monatlicher Sollzins (`gebundener Jahreszins / 12`)
- **R**: bisherige vertragliche Monatsrate aus Zins und Tilgung
- **E_t**: freiwillige Extraleistung im Monat `t` (monatliche Aufstockung, anteilige 13. Rate, jährliche Sondertilgung oder Einmalbetrag)
- **n_neu**: neue Restlaufzeit in Monaten bis zur vollständigen Entschuldung

Die geschlossene Logarithmusformel zeigt eindrucksvoll, warum der Effekt überproportional ausfällt: Da `R_gesamt` im Nenner steht und jeder zusätzliche Euro die Zinsbasis aller künftigen Monate dauerhaft verkleinert, verkürzt schon eine moderate Ratensteigerung die Laufzeit dramatisch.

## Durchgerechnetes Beispiel: 280.000 € Restschuld gezielt entschlacken

Ausgangspunkt sei eine bestehende Baufinanzierung mit **280.000 € Restschuld**, einem Sollzins von **4,25 % p. a.** (`i = 0,0425 / 12 = 0,00354167`) und **25 Jahren Restlaufzeit** (`n = 300 Monate`).

1. **Basis-Szenario ohne Sondertilgung:** Die reguläre Monatsrate beträgt **1.516,87 €**. Über 300 Monate entstehen noch **175.060,00 €** an reinen Zinskosten (Gesamtzahlung **455.060,00 €**).
2. **Dauerhafte Aufstockung um 250 € pro Monat:** Erhöht der Kreditnehmer seine Leistung per Tilgungssatzwechsel oder Dauerauftrag auf **1.766,87 €**, verkürzt sich die Restlaufzeit gemäß Logarithmusformel auf **233,03 Monate** (233 volle Raten plus eine kleine Schlussrate im 234. Monat, also **19 Jahre und 6 Monate**).
3. **Konkrete Zins- und Zeitersparnis:** Das Darlehen ist **5 Jahre und 6 Monate (66 Monate)** früher vollständig abbezahlt. Die gesamten Restzinsen sinken von **175.060,00 €** auf **131.725,73 €** – eine garantierte, steuerfreie Ersparnis von **43.334,27 €**.

## Strategievergleich: Fünf Tilgungshebel auf 280.000 € im direkten Test

Welche Methode bringt pro eingesetztem Euro den größten Hebel? Die folgende Übersicht vergleicht fünf praxistaugliche Rückzahlungsstrategien für dasselbe Darlehen (**280.000 €**, **4,25 % Sollzins**, **25 Jahre Ausgangslaufzeit**):

| Tilgungsstrategie | Zusätzlicher Aufwand | Neue Restlaufzeit | Verkürzung | Gesamtzinsen | Zinsersparnis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Regulärer Tilgungsplan** | 0 € | 25 J. 0 M. (300 M.) | 0 M. | 175.060,00 € | 0,00 € |
| **Zweiwöchentlich (13. Rate/Jahr)** | +126,41 €/Monat | 21 J. 10 M. (262 M.) | **3 J. 2 M.** | 149.946,78 € | **25.113,23 €** |
| **Einmal-Sondertilgung (Monat 12)** | 15.000 € einmalig | 22 J. 10 M. (274 M.) | **2 J. 2 M.** | 150.358,74 € | **24.701,27 €** |
| **Jährliche Sondertilgung** | 3.000 € pro Jahr | 19 J. 8 M. (236 M.) | **5 J. 4 M.** | 133.471,44 € | **41.588,57 €** |
| **Monatliche Mehrtilgung** | +250 €/Monat | 19 J. 6 M. (234 M.) | **5 J. 6 M.** | 131.725,73 € | **43.334,27 €** |
| **Kombination (+250 €/M. + 3.000 €/J.)** | 6.000 €/Jahr gesamt | 16 J. 1 M. (193 M.) | **8 J. 11 M.** | 107.343,69 € | **67.716,31 €** |

Bemerkenswert ist der Vergleich zwischen **250 € pro Monat** und **3.000 € am Jahresende**: Obwohl beide Varianten exakt **3.000 € pro Jahr** erfordern, spart die monatliche Variante **1.745,70 € mehr Zinsen** und zwei zusätzliche Monate, weil das Geld unterjährig sofort zinsmindernd wirkt. Noch deutlicher beeindruckt die **frühe Einmalzahlung**: 15.000 € im ersten Jahr vernichten durch den Zinseszinseffekt **24.701,27 €** künftige Zinsen – jeder eingesetzte Euro spart **1,65 €** Zinskosten.

## Tilgen, Umschulden oder Anlegen? Entscheidungskriterien im DACH-Raum

- **Vorsteuer-Hürde richtig berechnen:** Bei einem Eigenheimkredit wirkt jeder ersparte Zinseuro steuerfrei. Um 4,25 % Sollzins mit einer zinspflichtigen Geldanlage in Deutschland (26,375 % Abgeltungsteuer inkl. Soli) zu schlagen, benötigt die Anlage mindestens **5,77 % Vorsteuerrendite** – in Österreich bei 27,5 % KESt sogar **5,86 %**. Bei alten Niedrigzinsdarlehen (etwa 1,20 % aus 2021) dreht sich die Logik um: Hier lohnt es sich oft mehr, Überschüsse sicher auf Tages- oder Festgeld bis zum Ablauf der Zinsbindung anzusparen und die Restschuld erst bei der Anschlussfinanzierung auf einen Schlag zu drücken.
- **Tilgungssatzwechsel statt starrer Überweisung nutzen:** Viele deutsche Banken erlauben während der Zinsbindung zwei bis drei kostenfreie Anpassungen des laufenden Tilgungssatzes (meist zwischen 1 % und 5 %). Ein höherer Tilgungssatz automatisiert die schnellere Entschuldung ohne jährliche Stichtagsfrist, während die jährliche Sondertilgung bei Einkommensschwankungen maximale Freiheit bewahrt.
- **Länderregeln in AT und CH beachten:** In Österreich dürfen Fixzinskredite nach § 20 HIKrG in der Regel bis **10.000 € innerhalb von zwölf Monaten** pönalefrei vorzeitig getilgt werden; darüber hinaus ist die Vorfälligkeitsentschädigung auf maximal 1 % begrenzt. In der Schweiz vergleichen Eigentümer die direkte Tilgung häufig mit der **indirekten Amortisation** über die steuerbegünstigte Säule 3a, weil Hypothekarzinsen dort weiterhin vom steuerbaren Einkommen abziehbar bleiben.
- **Amortisationsdauer einer Umschuldung und Liquidität prüfen:** Eine Umschuldung nach Zinsbindungsablauf oder gemäß § 489 BGB nach zehn Jahren rechnet sich nur, wenn die monatliche Zinsersparnis die Notar- und Grundbuchkosten für die Grundschuldabtretung (ca. **0,2 % bis 0,5 %**) deutlich vor einem möglichen Verkauf einspielt. Bewahren Sie zudem vor jeder Sondertilgung mindestens drei bis sechs Nettomonatsgehälter plus Instandhaltungsrücklage liquide auf.
