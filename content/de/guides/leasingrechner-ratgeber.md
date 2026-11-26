---
title: "Auto-Leasing erklärt: So berechnen Sie Ihre wahre monatliche Rate"
description: "Verstehen Sie Leasingformeln, Restwert und Geldfaktor und berechnen Sie mit unserem Leasingrechner präzise Ihre tatsächliche monatliche Rate."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "lease-calculator"
relatedType: "calculator"
faqs:
  - question: "Was ist der Unterschied zwischen Kilometerleasing und Restwertleasing?"
    answer: "Beim im DACH-Raum dominierenden Kilometerleasing vereinbaren Sie eine feste jährliche Fahrleistung und tragen kein Vermarktungsrisiko für den Gebrauchtwagenwert; abgerechnet werden lediglich Mehr- oder Minderkilometer sowie übermäßige Schäden. Beim Restwertleasing hingegen haften Sie am Laufzeitende für eine eventuelle Differenz, falls der tatsächliche Marktwert unter dem vertraglich kalkulierten Restwert liegt."
  - question: "Wie rechne ich den Geldfaktor (Money Factor) in einen effektiven Jahreszins um?"
    answer: "Multiplizieren Sie den Geldfaktor mit 2.400, um den ungefähren jährlichen Zinssatz in Prozent zu erhalten. Ein Geldfaktor von 0,0020 entspricht beispielsweise einem Zinssatz von rund 4,8 % pro Jahr. Umgekehrt dividieren Sie einen bekannten Jahreszins in Prozent durch 2.400 (oder als Dezimalzahl durch 24), um den Geldfaktor für internationale Leasingrechner zu bestimmen."
  - question: "Lohnt sich eine hohe Leasingsonderzahlung zu Vertragsbeginn?"
    answer: "Eine Sonderzahlung reduziert die monatliche Rate, senkt die gesamten Finanzierungskosten aber meist nur geringfügig über die eingesparten Zinsen auf den niedrigeren Durchschnittssaldo. Zudem birgt eine hohe Anzahlung ein finanzielles Risiko: Bei Diebstahl oder Totalschaden verfällt die vorausgezahlte Sonderzahlung oft anteilig oder vollständig, sofern keine explizite GAP-Deckung mit Erstattung vereinbart wurde."
  - question: "Was sagt der Leasingfaktor aus und ab welchem Wert gilt ein Angebot als günstig?"
    answer: "Der Leasingfaktor setzt die monatliche Rate ins Verhältnis zum Brutto-Listenpreis (UVP): (Monatliche Rate / Brutto-Listenpreis) × 100. Ein Faktor unter 0,80 gilt im Privat- und Gewerbeleasing als sehr attraktiv, Werte zwischen 0,80 und 1,00 als solide. Für einen fairen Vergleich müssen jedoch eventuelle Sonderzahlungen und Überführungskosten anteilig auf die Monatsrate umgelegt werden."
  - question: "Gelten Leasingraten in Deutschland, Österreich und der Schweiz inklusive oder exklusive Umsatzsteuer?"
    answer: "Angebote für Privatkunden müssen nach der Preisangabenverordnung stets brutto inklusive der jeweiligen Umsatzsteuer (z. B. 19 % in Deutschland, 20 % in Österreich, 8,1 % in der Schweiz) ausgewiesen werden. Gewerbeleasing-Offerten nennen meist Nettoraten zuzüglich Umsatzsteuer, da vorsteuerabzugsberechtigte Unternehmen die Steuer direkt mit dem Finanzamt verrechnen."
---

Beim Auto-Leasing erwerben Sie kein Eigentum am Fahrzeug, sondern zahlen für dessen zeitlich begrenzte Nutzung — im Kern also für den **Wertverlust** während der Vertragsdauer zuzüglich einer **Finanzierungsgebühr** auf das gebundene Kapital. Da Händler im Verkaufsgespräch häufig ausschließlich mit niedrigen Monatsraten werben und Rabatte, Sonderzahlungen oder Restwertannahmen im Hintergrund verrechnen, bleibt die tatsächliche Kostenstruktur ohne eigene Nachrechnung oft intransparent.

Mit unserem [Leasingrechner](/de/rechner/leasingrechner) zerlegen Sie jedes Angebot in seine mathematischen Bestandteile und prüfen sofort, ob ein niedriger Monatspreis auf einem hohen Herstellerrabatt, einem optimistischen Restwert, einer versteckten Sonderzahlung oder einem günstigen Zinssatz beruht. So vergleichen Sie verschiedene Laufzeiten, Anzahlungen und Fahrzeugmodelle objektiv auf Basis der wahren Gesamtkosten.

## Die mathematischen Komponenten einer Leasingrate

Jede klassische Leasingrate setzt sich aus zwei Teilen zusammen: dem **monatlichen Wertverlust (Abschreibungsanteil)** und der **monatlichen Zinsgebühr (Finanzierungskosten)**. Während in Deutschland, Österreich und der Schweiz meist direkt mit dem effektiven Jahreszins gerechnet wird, verwenden nordamerikanische und viele internationale Kalkulationstools den sogenannten **Geldfaktor (Money Factor)** als kompakte Zinskennzahl.

```text
Netto-Finanzierungsbetrag = Verhandelter Kaufpreis + Nebenkosten − Sonderzahlung − Inzahlungnahme
Monatlicher Wertverlust   = (Netto-Finanzierungsbetrag − Restwert) / Laufzeit (n)
Geldfaktor                = Effektiver Jahreszins (%) / 2.400
Monatliche Zinsgebühr     = (Netto-Finanzierungsbetrag + Restwert) × Geldfaktor
Monatliche Leasingrate    = Monatlicher Wertverlust + Monatliche Zinsgebühr
```

Warum werden bei der Zinsgebühr der Finanzierungsbetrag und der Restwert **addiert**? Die Bank bindet zu Beginn des Leasings den vollen Netto-Finanzierungsbetrag und am Ende des Leasings noch den Restwert. Der durchschnittlich gebundene Kapitalbetrag entspricht folglich `(Finanzierungsbetrag + Restwert) / 2`. Multipliziert man diesen Durchschnitt mit dem Monatszinssatz (`Jahreszins / 12`), ergibt sich genau `(Finanzierungsbetrag + Restwert) × (Jahreszins / 24)` — und exakt `Jahreszins / 24` (als Dezimalzahl) ist der Geldfaktor.

Die wichtigsten Einflussgrößen im Überblick:
* **Unverbindliche Preisempfehlung (UVP / Listenpreis):** Dient als Referenzbasis, auf der Hersteller und Leasinggesellschaften den prozentualen Restwert und den Leasingfaktor berechnen.
* **Verhandelter Kaufpreis (Kapitalisierte Kosten):** Der tatsächlich vereinbarte Fahrzeugpreis nach Abzug von Händlerrabatten, abzüglich einer eventuellen Leasingsonderzahlung oder Inzahlungnahme.
* **Restwert:** Der prognostizierte Fahrzeugwert am Vertragsende. Ein höherer Restwert verringert den zu bezahlenden Wertverlust und senkt die monatliche Rate spürbar.
* **Laufzeit (n):** Übliche Vertragsdauern betragen 24, 36 oder 48 Monate.

## Schritt-für-Schritt-Beispielrechnung über 36 Monate

Betrachten wir ein konkretes Fahrzeugangebot mit einem **Listenpreis (UVP) von 48.000 €** (brutto). Nach Verhandlung gewährt der Händler 10 % Nachlass, sodass der **verhandelte Kaufpreis 43.200 €** beträgt. Sie leisten eine **Leasingsonderzahlung von 3.200 €**. Die Vertragslaufzeit beträgt **36 Monate**, der kalkulierte **Restwert liegt bei 55 % des UVP (26.400 €)** und der Zinssatz bei **4,8 % p. a.**

**1. Netto-Finanzierungsbetrag bestimmen:**
`43.200 € − 3.200 € = 40.000 €`.

**2. Monatlichen Wertverlust berechnen:**
Der Wertverlust über 36 Monate entspricht der Differenz aus Finanzierungsbetrag und Restwert:
`(40.000 € − 26.400 €) / 36 Monate = 13.600 € / 36 = 377,78 €` pro Monat.

**3. Geldfaktor und monatliche Zinsgebühr ermitteln:**
Der Jahreszins von 4,8 % entspricht einem Geldfaktor von:
`4,8 / 2.400 = 0,0020`.
Damit beträgt die monatliche Finanzierungsgebühr:
`(40.000 € + 26.400 €) × 0,0020 = 66.400 € × 0,0020 = 132,80 €` pro Monat.

**4. Monatliche Rate und effektive Gesamtkosten prüfen:**
* **Monatliche Leasingrate:** `377,78 € + 132,80 € = 510,58 €`
* **Summe aller Monatsraten (36 Monate):** `36 × 510,58 € = 18.380,88 €`
* **Gesamtausgaben inkl. Sonderzahlung:** `3.200 € + 18.380,88 € = 21.580,88 €`
* **Effektive Monatsbelastung:** `21.580,88 € / 36 = 599,47 €` pro Monat
* **Effektiver Leasingfaktor (inkl. Sonderzahlung):** `(599,47 € / 48.000 €) × 100 = 1,25`

## Szenariovergleich: Einfluss von Laufzeit, Zins und Sonderzahlung

Die Tabelle zeigt für dasselbe Fahrzeug (**48.000 € UVP**, **43.200 € Kaufpreis**), wie stark Vertragsparameter die Monatsrate und Gesamtkosten beeinflussen:

| Szenario | Laufzeit | Sonderzahlung | Restwert | Zinssatz (Geldfaktor) | Monatsrate | Gesamtkosten |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Kurzfristig (24 Mon., ohne SZ)** | 24 Mon. | 0 € | 29.760 € (62 %) | 4,8 % (0,0020) | 705,92 € | 16.942,08 € |
| **Standard (36 Mon., ohne SZ)** | 36 Mon. | 0 € | 26.400 € (55 %) | 4,8 % (0,0020) | 605,87 € | 21.811,32 € |
| **Mit Anzahlung (36 Mon., 3.200 € SZ)** | 36 Mon. | 3.200 € | 26.400 € (55 %) | 4,8 % (0,0020) | 510,58 € | 21.580,88 € |
| **Niedrigzins-Aktion (36 Mon., ohne SZ)** | 36 Mon. | 0 € | 26.400 € (55 %) | 2,4 % (0,0010) | 536,27 € | 19.305,72 € |
| **Hochzins-Umfeld (36 Mon., ohne SZ)** | 36 Mon. | 0 € | 26.400 € (55 %) | 7,2 % (0,0030) | 675,47 € | 24.316,92 € |
| **Langlaufzeit (48 Mon., ohne SZ)** | 48 Mon. | 0 € | 22.080 € (46 %) | 4,8 % (0,0020) | 570,56 € | 27.386,88 € |

Der Vergleich zeigt zwei Effekte: Erstens spart die **Sonderzahlung von 3.200 €** im 36-Monats-Vertrag über die gesamte Laufzeit nur **230,44 €** an Zinsen (`21.811,32 € − 21.580,88 €`), bindet Ihr Kapital jedoch sofort. Zweitens senkt eine **Zinsaktion auf 2,4 %** die Gesamtkosten um **2.505,60 €**, ohne dass eine Anzahlung nötig ist.

## Praxis-Fallstricke und rechtliche Hinweise im DACH-Raum

Prüfen Sie vor Vertragsabschluss neben der Monatsrate vier zentrale Vertragsdetails:

1. **Kilometerleasing vs. Restwertleasing:** Wählen Sie nach Möglichkeit ein **Kilometerleasing**, bei dem die Leasinggesellschaft das Restwertrisiko trägt; abgerechnet werden lediglich Mehr- oder Minderkilometer (oft 8 bis 20 Cent/km). Beim Restwertleasing haften Sie bei Marktrückgängen für die Restwertdifferenz.
2. **Überführungs- und Bereitstellungskosten:** Einmalige Nebenkosten von 800 € bis 1.500 € werden häufig separat berechnet. Teilen Sie diese durch die Laufzeit und addieren Sie den Betrag zur Monatsrate.
3. **GAP-Deckung bei Totalschaden oder Diebstahl:** Eine GAP-Versicherung schließt die Lücke zwischen Wiederbeschaffungswert der Kaskoversicherung und Leasing-Restbetrag. Beachten Sie, dass vorab geleistete Sonderzahlungen im Totalschadenfall oft verfallen.
4. **Rückgabestandards und Minderwertausgleich:** Normale Gebrauchsspuren (feine Waschanlagenkratzer, üblicher Steinschlag) dürfen bei der Rückgabe durch einen unabhängigen Gutachter (DEKRA oder TÜV) nicht als kostenpflichtiger Minderwert berechnet werden.
