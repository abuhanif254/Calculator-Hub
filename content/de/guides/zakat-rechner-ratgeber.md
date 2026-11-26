---
title: "Zakat-Rechner: Nisab und Vermögen verstehen"
description: "Erfahren Sie, wie der Nisab auf Basis von Gold und Silber bestimmt wird, welche Vermögenswerte dem Satz von 2,5 % unterliegen und wie Sie Ihre Zakat rechtssicher berechnen."
category: "Finance"
relatedCalculator: "zakat-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Welcher Nisab-Standard sollte gewählt werden – Gold oder Silber?"
    answer: "Klassische Rechtsschulen nennen sowohl 87,48 Gramm Feingold als auch 612,36 Gramm Feinsilber als Schwellenwert. Da der Silberpreis deutlich niedriger liegt als der Goldpreis, führt der Silber-Nisab zu einer niedrigeren Schwelle. Viele Gelehrte – insbesondere in der hanafitischen Tradition – empfehlen bei reinem Geldvermögen den Silberstandard, da so mehr Bedürftige unterstützt werden."
  - question: "Zählt eine selbstgenutzte Immobilie oder ein privates Fahrzeug zum Zakat-Vermögen?"
    answer: "Nein. Vermögenswerte des persönlichen Grundbedarfs wie das selbstbewohnte Eigenheim, Hausrat, Kleidung und ein privat genutztes Auto sind vollständig von der Zakat befreit. Nur vermietete Anlageimmobilien (über ihre Netto-Mietüberschüsse) oder zum Weiterverkauf gehaltene Immobilien unterliegen der Abgabe."
  - question: "Wie werden Aktien, ETFs und Kryptowährungen bei der Zakat behandelt?"
    answer: "Kryptowährungen werden wie flüssige Geldmittel mit ihrem vollen Marktwert am Stichtag angesetzt. Bei Aktien und ETFs unterscheiden Gelehrte zwischen aktivem Handel (voller Marktwert wird mit 2,5 % verzakatet) und langfristiger Buy-and-Hold-Anlage (entweder 2,5 % auf den Gesamtwert als Vereinfachung oder anteilig auf die liquiden Unternehmensaktiva laut Bilanz)."
  - question: "Welche Schulden dürfen vom Zakat-pflichtigen Vermögen abgezogen werden?"
    answer: "Abzugsfähig sind in der Regel kurzfristig fällige Verbindlichkeiten, die bis zum nächsten Abrechnungszeitraum oder unmittelbar beglichen werden müssen – etwa offene Rechnungen, fällige Steuerschulden oder die nächste Jahresrate eines Darlehens. Langfristige Immobilienhypotheken werden nach herrschender Ansicht nicht in voller Gesamthöhe vom Barvermögen abgezogen."
  - question: "Was gilt, wenn das Vermögen während des Jahres unter den Nisab fällt?"
    answer: "Entscheidend ist vor allem, dass der Nisab zu Beginn und am Ende eines vollen Hidschri-Mondjahres (Haul) erreicht oder überschritten wird. Sinkt das Vermögen vorübergehend unter den Nisab und übersteigt ihn am Jahresende wieder, gilt der Haul nach hanafitischer Auffassung weiterhin als erfüllt; nach anderen Rechtsschulen beginnt bei Unterschreitung ein neues Jahr."
---

Die **Zakat** bildet als dritte Säule des Islam eine fest verankerte soziale Vermögensabgabe. Sie verpflichtet erwachsene, geistig zurechnungsfähige Muslime, deren produktives Nettovermögen über ein volles islamisches Mondjahr (**Haul**) hinweg einen definierten Mindestschwellenwert (**Nisab**) erreicht oder überschreitet, exakt **2,5 %** dieses Vermögens an berechtigte Bedürftige abzuführen.

Da modernes Vermögen selten nur aus Münzen oder Handelswaren besteht, sondern sich auf Bankkonten, Wertpapierdepots, Edelmetalle und digitale Anlagen verteilt, erfordert die korrekte Ermittlung eine klare Trennung zwischen steuerpflichtigen Aktivposten, abzugsfähigen Verbindlichkeiten und steuerfreiem Grundbedarf. Unser [Zakat-Rechner](/de/rechner/zakat-rechner) prüft anhand aktueller Marktwerte die Nisab-Schwelle und ermittelt Ihre exakte Abgabepflicht.

## Grundprinzipien, Nisab-Schwellen und Berechnungsformel

Damit eine Zakat-Pflicht entsteht, müssen zwei zeitlich-wertmäßige Kriterien kumulativ erfüllt sein: das Überschreiten des **Nisab** und der Besitz dieses Nettovermögens über die Dauer eines **Haul** (ein Mondjahr von etwa 354 Tagen).

### Goldstandard vs. Silberstandard

Historisch orientiert sich der Nisab am Wert von 20 Golddinar beziehungsweise 200 Silberdirham. In modernen metrischen Einheiten werden dafür üblicherweise folgende Feingewichte herangezogen:

* **Gold-Nisab**: `87,48 g` reines 24-Karat-Gold (nach einigen Lehrmeinungen auf Basis des 4,25-g-Dinars auch `85,00 g`).
* **Silber-Nisab**: `612,36 g` reines Silber (alternativ `595,00 g` je nach historischer Gewichtsnorm).

Durch die historische Entkopplung der Gold- und Silberpreise klaffen beide Schwellenwerte heute weit auseinander. Der Gold-Nisab schützt tendenziell Haushalte mit mittleren Rücklagen vor einer Abgabepflicht, während der niedrigere Silber-Nisab das Spendenaufkommen zugunsten Bedürftiger maximiert.

### Mathematische Formel und Parameter

Das Zakat-pflichtige Nettovermögen (`V_netto`) berechnet sich am jährlichen Stichtag wie folgt:

```text
V_brutto = V_bar + V_edelmetall + V_anlage + V_handel + F_sicher
V_netto  = V_brutto − S_kurzfristig
```

Dabei bedeuten:

* **`V_bar`**: Bargeld, Girokonten, Tagesgeld und Festgeld.
* **`V_edelmetall`**: Marktwert von Anlagegold, Anlagesilber sowie (je nach Rechtsschule) nicht regelmäßig getragenem oder rein zur Wertanlage gehaltenem Schmuck.
* **`V_anlage`**: Aktien, Fonds, ETFs und Kryptowährungen zum Stichtagskurs.
* **`V_handel`**: Einkaufswert beziehungsweise Verkaufswert von Warenlagern im eigenen Handelsbetrieb.
* **`F_sicher`**: Offene Forderungen, mit deren Rückzahlung zuverlässig gerechnet wird.
* **`S_kurzfristig`**: Kurzfristig fällige Verbindlichkeiten (z. B. offene Rechnungen, Kreditkartenabrechnungen, unmittelbar fällige Tilgungsraten).

Ist die Bedingung `V_netto ≥ Nisab` erfüllt, gilt für das Mondjahr (354 Tage):

```text
Zakat = V_netto × 0,025 = V_netto / 40
```

Wer seinen persönlichen Stichtag nach dem gregorianischen Sonnenjahr (365 Tage) festlegt, verwendet gelegentlich den proportional angepassten Faktor `2,577 %`, um die rund elf zusätzlichen Tage auszugleichen.

## Schritt-für-Schritt-Rechenbeispiel

Angenommen, an Ihrem jährlichen Zakat-Stichtag liegen folgende Marktpreise und Vermögenswerte vor:

* **Aktueller Goldpreis**: `80,00 €` pro Gramm Feingold
* **Aktueller Silberpreis**: `0,95 €` pro Gramm Feinsilber

Daraus ergeben sich zunächst die beiden Schwellenwerte:

1. **Gold-Nisab berechnen**: `87,48 g × 80,00 €/g = 6.998,40 €`
2. **Silber-Nisab berechnen**: `612,36 g × 0,95 €/g = 581,74 €`

Nun wird das individuelle Vermögen erfasst:

* **Giro- und Tagesgeldkonto**: `14.500,00 €`
* **Anlagegold (50 g Feingold à 80,00 €)**: `4.000,00 €`
* **Aktien- und ETF-Depot (Stichtagswert)**: `12.000,00 €`
* **Brutto-Zakat-Vermögen**: `14.500,00 € + 4.000,00 € + 12.000,00 € = 30.500,00 €`

Davon werden kurzfristige, unmittelbar fällige Verbindlichkeiten in Höhe von `2.500,00 €` (etwa eine offene Handwerkerrechnung und die laufende Monatsrate eines Kredits) abgezogen:

```text
V_netto = 30.500,00 € − 2.500,00 € = 28.000,00 €
```

Da `28.000,00 €` sowohl den Gold-Nisab (`6.998,40 €`) als auch den Silber-Nisab (`581,74 €`) deutlich übersteigen, ist die Zakat in voller Höhe fällig:

```text
Zakat = 28.000,00 € × 0,025 = 700,00 €
```

Die Gegenprobe durch Division durch 40 bestätigt das Ergebnis: `28.000,00 € / 40 = 700,00 €`.

## Vermögensarten und Zakat-Behandlung im Überblick

Die nachfolgende Übersicht fasst zusammen, wie klassische und moderne Vermögenswerte in der Zakat-Ermittlung bewertet werden:

| Vermögenskategorie | Zakat-pflichtig? | Bewertungsgrundlage am Stichtag | Besonderheiten & Ausnahmen |
| :--- | :---: | :--- | :--- |
| Bargeld, Giro- und Sparkonten | Ja (2,5 %) | Kontostand inklusive gutgeschriebener Erträge | Zinszahlungen sind nach islamischem Recht nicht behaltensfähig und getrennt abzuführen |
| Anlagegold und -silber | Ja (2,5 %) | Aktueller Grammpreis nach Feingehalt (Karat-Bereinigung) | Bei 585er-Gold (14 Karat) zählt nur der reine Goldanteil (`58,5 %`) |
| Persönlicher Goldschmuck | Lehrabhängig | Nach hanafitischer Schule voll pflichtig; andere Schulen befreien Alltagsschmuck | Im Zweifel empfiehlt sich eine einheitliche jährliche Handhabung |
| Aktien, ETFs & Kryptowährungen | Ja (2,5 %) | Marktwert bei Handel; bei Langfrist-Aktien ggf. anteilige Liquiditätsquote | Reine Geldanlagen wie Krypto-Assets werden stets zu 100 % des Marktwerts angesetzt |
| Betriebs- und Handelswaren | Ja (2,5 %) | Aktueller Verkaufswert (Groß-/Einzelhandel) zum Stichtag | Produktionsmaschinen und Büroausstattung bleiben als Anlagevermögen befreit |
| Selbstgenutztes Wohneigentum | Nein | Ausgenommen (Grundbedarf) | Auch Möbel, Kleidung und privat genutztes Fahrzeug bleiben unberücksichtigt |

## Praktische Hinweise, Fehlerquellen und rechtliche Aspekte

Bei der jährlichen Ermittlung unterlaufen selbst erfahrenen Anlegern wiederkehrende Systemfehler:

* **Verwechslung von Rohgewicht und Feingewicht**: Besitzen Sie `100 g` Schmuckgold mit `14 Karat` (`585/1000` Feingehalt), beträgt das relevante Feingoldgewicht lediglich `58,50 g`, nicht `100 g`. Nur das reine Edelmetallgewicht wird mit dem Tageskurs multipliziert.
* **Vollständiger Abzug langfristiger Hypotheken**: Würde man eine 25-jährige Baufinanzierung über `300.000,00 €` vollständig vom Kontoguthaben abziehen, blieben liquide Rücklagen dauerhaft Zakat-frei. Daher dürfen nach überwiegender Rechtsauffassung nur die kurzfristig fälligen Raten oder laufenden Rechnungen abgezogen werden.
* **Unberücksichtigte Altersvorsorge-Guthaben**: Auf betrieblichen oder staatlich geförderten Rentenkonten ohne freien Zugriff vor Renteneintritt entsteht nach vielerorts vertretener Ansicht erst bei Auszahlung eine Pflicht auf den dann verfügbaren Betrag — anders als bei frei kündbaren privaten Depots.
* **Steuerliche Absetzbarkeit in DACH**: Zakat-Zahlungen an Privatpersonen sind im deutschen, österreichischen und schweizerischen Einkommensteuerrecht grundsätzlich nicht als Sonderausgaben absetzbar. Eine steuerliche Spendenbescheinigung erhalten Sie ausschließlich bei Zuwendungen an im jeweiligen Staat anerkannte gemeinnützige Hilfsorganisationen.
