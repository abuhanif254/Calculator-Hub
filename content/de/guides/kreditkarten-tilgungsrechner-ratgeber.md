---
title: "Schneeball- vs. Lawinenmethode: So zahlen Sie Kreditkarten ab"
description: "Detaillierter Leitfaden zum Vergleich von Schneeball- und Lawinenmethode bei Kreditkartenschulden mit Zinsformeln, Tilgungsrechnung und konkretem Mehrkarten-Beispiel."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "credit-cards-payoff"
faqs:
  - question: "Welche Methode spart objektiv mehr Geld: Schneeball oder Lawine?"
    answer: "Die Lawinenmethode (Avalanche) ist mathematisch immer die günstigste und schnellste Tilgungsstrategie, da jeder verfügbare Zusatzeuro gezielt den höchsten effektiven Jahreszins tilgt. Die Schneeballmethode verursacht durch das vorrangige Tilgen kleiner, oft niedriger verzinster Salden leicht höhere Gesamtzinsen, punktet jedoch mit früheren psychologischen Erfolgserlebnissen."
  - question: "Warum führen reine Mindestzahlungen bei Kreditkarten in eine jahrzehntelange Schuldenfalle?"
    answer: "Revolving-Kreditkarten verlangen meist nur 2 % bis 3 % des aktuellen Saldos oder einen geringen Mindestbetrag (z. B. 25 €) pro Monat. Bei Zinssätzen zwischen 15 % und 22 % p. a. fressen die monatlichen Sollzinsen fast die gesamte Mindestrate auf, sodass der Schuldenberg zu Beginn kaum sinkt und eine vollständige Tilgung über Jahrzehnte dauert."
  - question: "Darf ich eine Kreditkarte während des Tilgungsplans weiter für Einkäufe nutzen?"
    answer: "Nein, davon ist dringend abzuraten. Sobald Sie auf einer Kreditkarte einen Teilbetrag in den Folgemonat übertragen (Revolving), entfällt in der Regel das zinsfreie Zahlungsziel (Grace Period). Jeder neue Einkauf wird dann sofort ab dem Buchungstag verzinst, was Ihre Tilgungsrechnung aushebelt."
  - question: "Wann ist eine Umschuldung auf einen Ratenkredit sinnvoller als Schneeball oder Lawine?"
    answer: "Wenn Ihre Kreditkartenzinsen über 12 % bis 15 % p. a. liegen und Ihre Bonität einen klassischen Ratenkredit zu deutlich günstigeren Konditionen (etwa 6 % bis 8 % p. a.) erlaubt, senkt eine Umschuldung die Zinslast oft um mehr als die Hälfte. Voraussetzung ist, dass die abgelösten Kreditkartenlinien anschließend konsequent reduziert oder gekündigt werden."
  - question: "Wie wirkt sich eine hohe Kreditkartenauslastung auf die Bonität und den Schufa-Score aus?"
    answer: "Dauerhaft nahezu ausgeschöpfte Kreditrahmen signalisieren Auskunfteien ein erhöhtes Liquiditätsrisiko und verschlechtern den Score. Als Richtwert gilt eine Auslastung unter 30 % des verfügbaren Limits; besonders positiv wirkt das systematische Abschmelzen einzelner Karten auf null Euro."
---

Revolving-Kreditkarten mit Teilzahlungsfunktion gehören zu den teuersten Finanzierungsformen für Privathaushalte. Während klassische Ratenkredite feste Laufzeiten und sinkende Restschulden erzwingen, schrumpfen prozentuale Mindestzahlungen bei Kreditkarten zusammen mit dem Saldo — wodurch sich offene Beträge bei Zinssätzen von `15 %` bis `22 %` p. a. über Jahrzehnte hinziehen können.

Um aus dieser Zinsfalle auszubrechen, benötigen Sie ein fixes monatliches Tilgungsbudget und eine klare Priorisierungsregel für mehrere Karten. In der Praxis konkurrieren zwei bewährte Strategien: die **Schneeballmethode** (Fokus auf den kleinsten Saldo) und die **Lawinenmethode** (Fokus auf den höchsten Zinssatz). Mit unserem [Kreditkarten-Tilgungsrechner](/de/rechner/kreditkarten-abbezahlen) können Sie beide Pfade exakt auf Ihre persönlichen Kartenstände anwenden.

## Methodik: Revolving-Zinsberechnung, Schneeball- und Lawinenprinzip

Bei Teilzahlung berechnet die kartenausgebende Bank monatlich Zinsen auf den offenen Saldo (`B`). Aus dem effektiven Jahreszins (`APR`) ergibt sich näherungsweise der monatliche Zinssatz `r = APR ÷ 12`. Bleibt die monatliche Gesamtrate (`M`) konstant, lässt sich die benötigte Laufzeit in Monaten (`n`) für eine einzelne Karte analytisch über die logarithmierte Annuitätenformel bestimmen:

```text
Monatszins:        r   = APR ÷ 12
Monatszinsen:      I_t = B_{t−1} × r
Tilgungsdauer:     n   = −ln(1 − P × r ÷ M) ÷ ln(1 + r)
```

Die Parameter bedeuten dabei:
- **`P` (Ausgangssaldo):** Der aktuell offene Kreditkartenbetrag in Euro.
- **`M` (Monatliche Rate):** Ihr fester monatlicher Zahlbetrag (muss zwingend größer als die Anfangszinsen `P × r` sein, sonst wächst die Schuld unbegrenzt).
- **`I_t` (Zinsanteil im Monat t):** Der Teil Ihrer Zahlung, der lediglich laufende Zinsen deckt und die Hauptschuld nicht reduziert.

### Das Rollover-Prinzip bei mehreren Karten

Sowohl bei der Schneeball- als auch bei der Lawinenmethode legen Sie ein konstantes monatliches Gesamtbudget fest, das über der Summe aller Mindestzahlungen liegt. Auf jede Karte zahlen Sie zunächst den vertraglichen Mindestbetrag. Der gesamte Überschuss fließt gezielt in eine einzige **Prioritätskarte**. Sobald diese vollständig getilgt ist, wird ihre bisherige Rate nicht wieder ausgegeben, sondern nach dem **Rollover-Prinzip** vollständig auf die nächste Karte übertragen.

- **Schneeballmethode:** Sie sortieren alle Karten aufsteigend nach dem aktuellen Saldo (`P_1 ≤ P_2 ≤ P_3`). Jeder zusätzliche Euro fließt in die kleinste Restschuld, unabhängig vom Zinssatz. Das maximiert schnelle Teilerfolge und stärkt die Durchhaltedisziplin.
- **Lawinenmethode:** Sie sortieren alle Karten absteigend nach dem effektiven Jahreszins (`APR_1 ≥ APR_2 ≥ APR_3`). Jeder zusätzliche Euro attackiert die teuerste Schuld. Das minimiert die gesamten Zinskosten mathematisch auf das absolute Minimum.

## Durchgerechnetes Beispiel: Drei Kreditkarten mit 420 € Monatsbudget

Betrachten wir einen Haushalt mit insgesamt **`11.000 €` Kreditkartenschulden**, verteilt auf drei Revolving-Karten mit realistischen Konditionen:
- **Karte A:** `1.200 €` Saldo, `11,90 %` effektiver Jahreszins, `30 €` Mindestrate
- **Karte B:** `3.500 €` Saldo, `16,90 %` effektiver Jahreszins, `85 €` Mindestrate
- **Karte C:** `6.300 €` Saldo, `21,90 %` effektiver Jahreszins, `155 €` Mindestrate

Die Summe aller Mindestzahlungen beträgt `270 €`. Der Haushalt mobilisiert zusätzlich `150 €` pro Monat und setzt ein festes Tilgungsbudget von **`420 €` monatlich** fest.

**Ablauf nach der Schneeballmethode (Reihenfolge A → B → C):**
Im ersten Monat fließen `85 €` an Karte B, `155 €` an Karte C und `180 €` (`30 € + 150 €`) an Karte A. Bereits nach **`7 Monaten`** ist Karte A vollständig auf null Euro getilgt. Ab Monat `8` wandern die freigewordenen `180 €` auf Karte B (`85 € + 180 € = 265 €`), die nach **`21 Monaten`** bezahlt ist. Schließlich fließen volle `420 €` in Karte C, bis nach exakt **`35 Monaten`** Schuldenfreiheit erreicht wird. Die gesamten Zinskosten betragen **`3.692,64 €`**.

**Ablauf nach der Lawinenmethode (Reihenfolge C → B → A):**
Hier fließen von Monat 1 an `305 €` (`155 € + 150 €`) in die hochverzinste Karte C (`21,90 %`), während Karte A (`30 €`) und Karte B (`85 €`) nur das Minimum erhalten. Da Karte C mit `6.300 €` groß ist, fällt der erste Kartenerfolg erst nach **`27 Monaten`**. Danach werden jedoch Karte B in Monat **`33`** und Karte A in Monat **`34`** extrem rasch abgebaut. Die Gesamtzinsen sinken auf **`3.200,67 €`** — eine reine Zinsersparnis von **`491,97 €`** gegenüber dem Schneeball.

## Strategischer Vergleich: Mindestzahlung, Schneeball, Lawine und Umschuldung

Die nachstehende Tabelle stellt für exakt dieses `11.000-€`-Schuldenportfolio fünf Handlungsalternativen gegenüber:

| Strategie | Monatliches Budget | Tilgungsreihenfolge | Erster Kartenabschluss | Dauer bis schuldenfrei | Gesamte Zinskosten |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Nur Mindestzahlung (2 % / mind. 25 €)** | Variabel (sinkt mit Saldo) | Keine Priorisierung | Nach über 30 Jahren | `898` Monate (`74,8` Jahre) | `52.148,10 €` |
| **Schneeballmethode** | `420 €` konstant | Karte A → B → C | Monat `7` | `35` Monate | `3.692,64 €` |
| **Lawinenmethode** | `420 €` konstant | Karte C → B → A | Monat `27` | `34` Monate | `3.200,67 €` |
| **Lawine mit +100 € Nebenbudget** | `520 €` konstant | Karte C → B → A | Monat `20` | `26` Monate | `2.379,31 €` |
| **Umschuldung (Ratenkredit 7,50 % p. a.)** | `420 €` konstant | Konsolidiertes Einzeldarlehen | Sofortige Ablösung | `29` Monate | `1.050,23 €` |

Der Kontrast zur reinen Mindestzahlung (`2 %` vom Restsaldo, mindestens `25 €`) verdeutlicht die Mechanik von Revolving-Krediten: Da bei `21,90 %` Jahreszins allein `1,825 %` monatlich an Zinsen anfallen, tilgt eine `2-%`-Rate die Hauptschuld im ersten Jahr praktisch gar nicht. Erst eine feste, vom Restsaldo entkoppelte Monatsrate durchbricht die Exponentialkurve.

## Typische Fallstricke, Schufa-Auswirkungen und rechtliche Regeln

In der Praxis scheitern Tilgungspläne selten an der Formel, sondern an vier vermeidbaren Fehlern:
1. **Weiterverwendung der Karte:** Bei aktiver Teilzahlung entfällt meist das zinsfreie Zahlungsziel; jeder neue Einkauf wird sofort ab Buchungstag verzinst. Nutzen Sie konsequent eine Debitkarte.
2. **Versteckte Zusatzgebühren:** Viele Verträge buchen monatliche Restschuldversicherungen (`0,5 %–1,0 %` vom Saldo) ab. Kündigen Sie überteuerte Ausfallpolicen.
3. **Umschuldung ohne Kartenkündigung:** Eine Konsolidierung auf einen `7,50-%`-Ratenkredit spart gegenüber der Lawine über `2.150 €` Zinsen — sofern die abgelösten Kreditlinien anschließend gekündigt werden.
4. **Sondertilgungsrechte:** Nach **§ 500 BGB** sind Ratenkredite jederzeit vorzeitig tilgbar (Vorfälligkeitsentschädigung nach **§ 502 BGB** maximal `1,0 %` bzw. `0,5 %` unter zwölf Monaten Restlaufzeit); Revolving-Karten lassen sich jederzeit entgeltfrei sondertilgen.

Wählen Sie die **Lawinenmethode** bei Zinsabständen ab `3` Prozentpunkten zur maximalen Ersparnis — und die **Schneeballmethode**, wenn ein schneller erster Abschluss unter `1.500 €` Ihre Disziplin sichert.
