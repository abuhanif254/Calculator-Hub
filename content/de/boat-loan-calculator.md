---
title: "Bootskredit-Rechner"
metaTitle: "Bootskredit-Rechner: Rate, Zinsen & Finanzierung planen"
description: "Berechnen Sie monatliche Kreditraten, Gesamtzinsen und Finanzierungskosten für Motorboote, Segelboote und Yachten inklusive Anzahlung, Laufzeit und Umsatzsteuer."
metaDescription: "Kostenloser Bootskredit-Rechner: Ermitteln Sie Monatsrate, Zinskosten und Gesamtaufwand für Boot oder Yacht nach Kaufpreis, Anzahlung und Laufzeit."
metaKeywords: "bootskredit rechner, bootsfinanzierung berechnen, yachtfinanzierung, bootskredit zinsen, ratenrechner boot, annuitätendarlehen boot, schiffshypothek"
faqs:
  - question: "Was unterscheidet eine klassische Bootsfinanzierung von einer Schiffshypothek?"
    answer: "Kleinere bis mittlere Motor- und Segelboote bis etwa 50.000 bis 100.000 € werden im DACH-Raum meist über einen unbesicherten Ratenkredit oder eine Sicherungsübereignung finanziert. Bei größeren Yachten fordern spezialisierte Yachtbanken häufig die Eintragung einer Schiffshypothek im deutschen Seeschiffs- oder Binnenschiffsregister (bzw. im österreichischen Seeschiffsregister oder Schweizer Schiffsregister), was zusätzliche Notar- und Registergebühren auslöst."
  - question: "Welchen Steuersatz muss ich im Feld für Kauf- bzw. Umsatzsteuer im DACH-Raum eintragen?"
    answer: "Wenn Ihnen ein Händler einen Bruttokaufpreis inklusive Mehrwertsteuer nennt oder Sie von privat kaufen, tragen Sie 0 % ein, damit die Steuer nicht doppelt aufgeschlagen wird. Liegt hingegen ein Nettopreis vor – etwa bei Neubooten ab Werft oder bei der Einfuhr aus einem Nicht-EU-Land –, setzen Sie den jeweiligen Regelsatz ein: 19 % in Deutschland, 20 % in Österreich oder 8,1 % in der Schweiz."
  - question: "Wie hoch sollte die Anzahlung bei einem Bootskredit idealerweise sein?"
    answer: "Spezialisierte Bootsfinanzierer verlangen in der Regel mindestens 10 bis 20 % Eigenkapital, für Top-Konditionen meist 20 bis 30 %. Eine solide Anzahlung senkt nicht nur die Zinskosten über die Laufzeit, sondern verhindert auch eine Unterdeckung, falls der Marktwert des Bootes in den ersten Jahren schneller sinkt als die Restschuld."
  - question: "Welche laufenden Nebenkosten für ein Boot deckt die Kreditrate nicht ab?"
    answer: "Die monatliche Annuität umfasst ausschließlich Zins und Tilgung. Hinzu kommen Sommerliegeplatz und Winterlager, Haftpflicht- und Kaskoversicherung, jährliche Wartung (Motorservice, Antifouling, Einwintern) sowie Kraftstoff. Als erfahrene Faustregel im Wassersport gelten jährliche Unterhaltskosten von rund 8 bis 12 % des Bootswerts."
  - question: "Warum sind die Zinsen für Bootskredite oft höher als bei Autokrediten?"
    answer: "Banken stufen Freizeitboote und Yachten als Luxusgüter mit geringerer Marktliquidität und schwerer kalkulierbarem Wiederverkaufswert ein. Zudem führen lange Laufzeiten von 10 bis 15 Jahren zu einem höheren Zinsänderungs- und Ausfallrisiko, weshalb die Sollzinssätze typischerweise 1 bis 2,5 Prozentpunkte über klassischen Kfz-Finanzierungen liegen."
---

## Boots- und Yachtfinanzierung realistisch durchkalkulieren

Ob wendiges Sportboot für den Bodensee, familientauglicher Daycruiser für die Ostsee oder hochseetaugliche Segelyacht im Mittelmeer: Die Anschaffung eines eigenen Wasserfahrzeugs bindet erhebliches Kapital. Anders als bei vielen Pkw-Finanzierungen erstrecken sich **Bootskredite** im DACH-Raum häufig über **5 bis 15 Jahre**, bei höherwertigen Yachten teilweise sogar bis zu **20 Jahre**. Durch diese langen Laufzeiten reagiert die gesamte Zinsbelastung äußerst empfindlich auf Sollzinssatz, Eigenkapitalquote und Tilgungsdauer.

Unser **Bootskredit-Rechner** bildet ein klassisches **Annuitätendarlehen** mit gleichbleibenden monatlichen Raten ab. Anhand von **Kaufpreis**, **Anzahlung**, optionaler **Umsatz- bzw. Kaufsteuer**, **jährlichem Sollzinssatz** und **Laufzeit in Monaten** ermittelt das Werkzeug sofort die monatliche Rate, die Summe aller anfallenden Zinsen sowie den gesamten Kauf- und Finanzierungsaufwand. Da die zugrunde liegende Finanzmathematik währungsunabhängig arbeitet, gelten alle Ergebnisse gleichermaßen für Beträge in Euro (`€`), Schweizer Franken (`CHF`) oder US-Dollar (`USD`) – selbst wenn die Eingabemaske ein neutrales Währungssymbol anzeigt.

## Die exakte Annuitätenformel für den Bootskredit

Zunächst wird der tatsächlich aufzunehmende **Nettodarlehensbetrag** bestimmt, indem ein eventueller Steuerzuschlag addiert und die eigene Anzahlung abgezogen wird. Anschließend folgt die Berechnung der konstanten Monatsrate nach der standardisierten Bankformel:

```text
1. Steuerbetrag und Finanzierungssumme (Nettodarlehensbetrag K):
   Steuer = P × (s / 100)
   K      = P + Steuer − A

2. Monatlicher Zinssatz:
   i = (r / 100) / 12

3. Monatliche Kreditrate (Annuität R bei r > 0 %):
   R = K × [ i × (1 + i)^n ] / [ (1 + i)^n − 1 ]
   (Sonderfall zinsfreie Finanzierung r = 0 %: R = K / n)

4. Gesamtzinsen (Z) und Gesamtaufwand inklusive Anzahlung (G):
   Z = (R × n) − K
   G = K + Z + A = (R × n) + A
```

**Bedeutung der Variablen:**
- **`P`** ist der verhandelte Bootskaufpreis in Euro (einschließlich Trailer, Außenborder oder Elektronikpaket, sofern mitfinanziert).
- **`s`** bezeichnet den zusätzlich aufzuschlagenden Steuersatz in Prozent (bei bereits enthaltenen Bruttopreisen oder Privatkäufen einfach `0 %` eingeben; bei Nettopreisen `19 %` in Deutschland, `20 %` in Österreich oder `8,1 %` in der Schweiz).
- **`A`** steht für die geleistete Anzahlung (Eigenkapital) in Euro; **`K`** ist der zu finanzierende Nettodarlehensbetrag.
- **`r`** ist der gebundene nominale Jahreszinssatz (Sollzins p. a.) in Prozent, **`i`** der entsprechende Monatszins als Dezimalzahl.
- **`n`** gibt die Kreditlaufzeit in Monaten an (beispielsweise `120` Monate für 10 Jahre).

## Schritt-für-Schritt-Rechenbeispiel

Angenommen, Sie erwerben ein gebrauchtes Kajütboot vom Fachhändler am Bodensee zu einem **Bruttokaufpreis** von **65.000,00 €** (EU-Mehrwertsteuer bereits bezahlt und belegt, daher Steuerzuschlag `s = 0 %`). Sie bringen **15.000,00 €** Eigenkapital (rund 23,1 %) ein und finanzieren den Restbetrag über **10 Jahre (120 Monate)** zu einem gebundenen Sollzinssatz von **5,40 % p. a.**

1. **Nettodarlehensbetrag ermitteln:** Subtrahiert man die Anzahlung vom Bruttopreis, ergibt sich ein Darlehensbetrag von **50.000,00 €** (`65.000,00 € − 15.000,00 €`).
2. **Monatszins berechnen:** Geteilt durch zwölf Monate entspricht der Jahreszins einem Monatszins von `i = 0,0045` (0,45 % pro Monat).
3. **Aufzinsungsfaktor bestimmen:** Über 120 Monate wächst der Zinsfaktor auf `(1 + 0,0045)^120 = 1,713929`.
4. **Monatliche Annuitätsrate berechnen:** Der Zähler `i × (1 + i)^120` beträgt `0,007713`, der Nenner `(1 + i)^120 − 1` genau `0,713929`. Ihr Quotient ergibt den Annuitätenfaktor `0,010803`. Multipliziert mit 50.000,00 € folgt eine exakte Rate von `540,1572 €`, gerundet **540,16 €** pro Monat.
5. **Gesamtrückzahlung, Zinskosten und Gesamtaufwand prüfen:** Über 120 Monate zahlen Sie insgesamt **64.818,87 €** an die Bank zurück (davon **14.818,87 €** reine Zinsen). Zusammen mit der Anzahlung von 15.000,00 € beläuft sich der gesamte Anschaffungs- und Finanzierungsaufwand auf **79.818,87 €**.

**Hinweis zu Nettopreisen:** Würde ein Neuboot ab Werft stattdessen zu 50.000,00 € netto zuzüglich 19 % deutscher Umsatzsteuer (9.500,00 €) gekauft, stiege der Bruttokaufpreis auf 59.500,00 € und der Kreditbedarf nach 15.000,00 € Anzahlung auf 44.500,00 €.

## Laufzeitenvergleich für einen Bootskredit über 50.000,00 €

Die folgende Übersicht zeigt für ein Nettodarlehen von **50.000,00 €** bei konstant **5,40 % Sollzins p. a.** (zuzüglich 15.000,00 € Eigenkapital), wie stark längere Laufzeiten zwar die Monatsrate entlasten, die Zinskosten aber vervielfachen:

|Laufzeit|Monatsrate|Gesamtrückzahlung Kredit|Gesamtzinsen|Zinslast am Kredit|Risiko der Unterdeckung|
|:---|:---|:---|:---|:---|:---|
|**60 Monate (5 Jahre)**|952,75 €|57.165,12 €|7.165,12 €|14,3 %|Sehr gering|
|**96 Monate (8 Jahre)**|642,56 €|61.685,88 €|11.685,88 €|23,4 %|Gering bis moderat|
|**120 Monate (10 Jahre)**|540,16 €|64.818,87 €|14.818,87 €|29,6 %|Moderat|
|**180 Monate (15 Jahre)**|405,89 €|73.060,79 €|23.060,79 €|46,1 %|Erhöht bei Neubooten|
|**240 Monate (20 Jahre)**|341,13 €|81.870,19 €|31.870,19 €|63,7 %|Hoch (langsamer Tilgungsstart)|

Der Vergleich verdeutlicht die enorme Zinswirkung langer Laufzeiten: Eine Streckung von 10 auf 20 Jahre senkt die monatliche Belastung zwar um 199,03 €, treibt die Zinskosten jedoch um gewaltige **17.051,32 €** nach oben. Zudem bleibt bei sehr langen Laufzeiten die Restschuld in den ersten drei bis fünf Jahren hoch, weil anfangs ein Großteil der Rate allein für Zinsen aufgewendet wird.

## Praxis-Checkliste und typische Fehler bei der Bootsfinanzierung

- **EU-Mehrwertsteuernachweis bei Gebrauchtbooten prüfen:** Beim Kauf gebrauchter Wasserfahrzeuge innerhalb der Europäischen Union muss der Verkäufer lückenlos belegen, dass die Mehrwertsteuer einmal in einem EU-Staat bezahlt und nicht erstattet wurde (Originalrechnung oder zollamtlicher Nachweis). Fehlt dieser Nachweis oder erfolgt ein Import aus der Schweiz bzw. Großbritannien, droht eine teure Nachversteuerung von 19 % in Deutschland oder 20 % in Österreich.
- **Laufende Unterhaltskosten realistisch einplanen:** Kalkulieren Sie neben der Kreditrate ein festes Jahresbudget für Liegeplatz (1.500 bis 6.000 €), Winterlager, Kasko- und Haftpflichtversicherung (häufig Pflichtauflage der finanzierenden Bank), Motorservice sowie Antifouling ein. Wer seine gesamte freie Liquidität in die Monatsrate steckt, gerät bei unvorhergesehenen Reparaturen rasch in finanzielle Engpässe.
- **Sachverständigengutachten und Beleihungsgrenze beachten:** Bei gebrauchten Yachten verlangen Kreditinstitute regelmäßig ein unabhängiges Bootsgutachten. Liegt der geschätzte Marktwert unter dem Kaufpreis, begrenzt die Bank das Darlehen am Gutachtenwert; die Lücke muss vollständig aus Eigenkapital geschlossen werden.
- **Effektivzins, Zinsbindung und Sondertilgung vergleichen:** Vergleichen Sie Finanzierungsangebote immer anhand des **effektiven Jahreszinses** nach Preisangabenverordnung (PAngV) und achten Sie auf eine durchgehende Zinsbindung ohne versteckte Bearbeitungsgebühren. Vereinbarte kostenlose Sondertilgungen oder eine gesetzlich begrenzte Vorfälligkeitsentschädigung von maximal 1 % der Restschuld (bei deutschen Verbraucherdarlehen über zwölf Monate Restlaufzeit) verschaffen wertvolle Flexibilität bei einem vorzeitigen Bootsverkauf.
