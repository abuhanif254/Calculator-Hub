---
title: "HELOC erklärt: Sollten Sie Ihr Haus als Geldautomat nutzen?"
description: "Fundierter Leitfaden zur Home Equity Line of Credit (HELOC): Beleihungsquote (CLTV), Zins- und Tilgungsphase, variable Zinsrisiken und Vergleich mit DACH-Finanzierungen."
category: "Finance"
relatedCalculator: "heloc-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Wie unterscheidet sich eine HELOC von einer klassischen Immobilienfinanzierung?"
    answer: "Eine klassische Hypothek oder ein Annuitätendarlehen wird einmalig in voller Höhe ausgezahlt und ab dem ersten Monat getilgt. Eine Home Equity Line of Credit (HELOC) funktioniert dagegen als revolvierender Kreditrahmen auf Ihr Eigenkapital im Haus: Sie rufen in der Abrufphase nur den tatsächlich benötigten Betrag ab, zahlen Zinsen ausschließlich auf die abgerufene Summe und können getilgte Beträge erneut nutzen."
  - question: "Was bedeutet der Zahlungsschock beim Übergang in die Rückzahlungsphase?"
    answer: "Während der meist zehnjährigen Abrufphase verlangen viele Banken lediglich reine Zinszahlungen (Interest-Only). Sobald die Rückzahlungsphase beginnt, ist kein weiterer Abruf mehr möglich und das gesamte abgerufene Kapital muss zuzüglich Zinsen innerhalb von meist 15 bis 20 Jahren annuitätisch getilgt werden. Dadurch steigt die monatliche Belastung oft schlagartig um 30 % bis über 80 % an."
  - question: "Gibt es ein vergleichbares Produkt zur HELOC auch in Deutschland, Österreich und der Schweiz?"
    answer: "In den USA ist die HELOC ein eigenständiges Standardprodukt. Im DACH-Raum existiert die Bezeichnung als solche kaum, doch erfüllen flexible Grundschuld-Rahmenkredite, revalutierende Hypotheken oder ein Abrufdarlehen mit eingetragener Grundschuld eine ähnliche Funktion. Für Sanierungen unter 50.000 € nutzen Eigentümer hierzulande jedoch meist unbesicherte Modernisierungskredite ohne Notar- und Grundbuchkosten."
  - question: "Wie hoch darf die maximale Beleihung bei einer HELOC sein?"
    answer: "Banken begrenzen die kombinierte Beleihungsquote (Combined Loan-to-Value, CLTV) aus bestehender Hypothek und HELOC-Limit üblicherweise auf 80 % bis 85 % des aktuellen Marktwerts der Immobilie. Bei einem Verkehrswert von 450.000 € und einer Restschuld von 270.000 € liegt der maximale zusätzliche Kreditrahmen bei 80 % Beleihungsgrenze somit bei 90.000 €."
  - question: "Wann ist der Einsatz einer HELOC finanziell sinnvoll und wann riskant?"
    answer: "Sinnvoll ist eine besicherte Kreditlinie vor allem für zeitlich gestaffelte, wertsteigernde Investitionen in die Immobilie — etwa eine energetische Dachsanierung oder einen Anbau — sowie als Überbrückung mit klarer Tilgungsstrategie. Hochriskant ist die Nutzung für laufenden Konsum, Urlaube oder Wertverlustkäufe wie Fahrzeuge, da Sie im Zahlungsverzug die Zwangsversteigerung Ihres Eigenheims riskieren."
---

Eine **Home Equity Line of Credit (HELOC)** — wörtlich eine Kreditlinie auf das Eigenkapital Ihrer Immobilie — ermöglicht es Eigentümern, den unbelasteten Wertanteil ihres Hauses flexibel zu beleihen. Im Gegensatz zu einem einmalig ausgezahlten Ratenkredit funktioniert eine HELOC wie ein grundpfandrechtlich besicherter Dispositionsrahmen: Sie rufen Kapital bei Bedarf tranchenweise ab, zahlen Zinsen nur auf den genutzten Betrag und stellen Ihr Haus als Sicherheit.

Gerade wegen dieser Flexibilität und der im Vergleich zu unbesicherten Konsumentenkrediten oft niedrigeren Einstiegszinsen wird die Kreditlinie häufig mit einem Geldautomaten verwechselt. Mit unserem [HELOC-Rechner](/de/rechner/heloc-rechner) prüfen Sie vorab präzise, wie sich variable Zinssätze und der Übergang von der zinsdominierten Abrufphase in die volle Tilgungsphase auf Ihre monatliche Liquidität auswirken.

## Funktionsweise, Beleihungsgrenze und Berechnungsformeln

Eine HELOC gliedert sich technisch in zwei zeitlich getrennte Vertragsabschnitte: die **Abrufphase** (englisch *Draw Period*, üblich sind 5 bis 10 Jahre) und die anschließende **Rückzahlungsphase** (englisch *Repayment Period*, meist 10 bis 20 Jahre).

Bevor ein Kreditinstitut einen Kreditrahmen gewährt, ermittelt es die kombinierte Beleihungsquote (**CLTV**, *Combined Loan-to-Value*). Diese setzt sämtliche eingetragenen Immobilienkredite ins Verhältnis zum aktuellen Schätzwert der Immobilie:

```text
CLTV = (Bestehende Restschuld + HELOC-Limit) ÷ Marktwert der Immobilie
Max. Kreditlinie = (Marktwert × Max. CLTV-Quote) − Bestehende Restschuld
```

Übliche Beleihungsobergrenzen liegen bei `80 %` bis `85 %`. Während der Abrufphase erhebt die Bank meist nur eine monatliche Mindestzahlung auf Basis der reinen Zinsen (**Interest-Only**):

```text
Monatsrate Phase 1 = Beanspruchtes Kapital × (Sollzins p. a. ÷ 12)
```

Sobald die Abrufphase endet, schließt sich die Kreditlinie. Die bis dahin aufgelaufene Kapitalschuld `P` wird über die Restlaufzeit `n` in Monaten zum monatlichen Zinssatz `r = Sollzins p. a. ÷ 12` in ein reguläres Annuitätendarlehen umgewandelt:

```text
Monatsrate Phase 2 = P × [r × (1 + r)^n] / [(1 + r)^n − 1]
```

Die Parameter im Überblick:
- **`P` (Beanspruchtes Kapital):** Aktuell abgerufener Saldo am Ende der Abrufphase, sofern während Phase 1 keine freiwillige Tilgung erfolgte.
- **`r` (Monatszins):** Variabler Referenzzinssatz zuzüglich Bankmarge, geteilt durch 12.
- **`n` (Tilgungsmonate):** Anzahl der Monate in der Rückzahlungsphase, häufig `180` (15 Jahre) oder `240` (20 Jahre).

## Durchgerechnetes Praxisbeispiel: Abrufphase vs. Tilgungssprung

Angenommen, Ihre Immobilie besitzt einen aktuellen Marktwert von `450.000 €` und ist noch mit einer erstrangigen Baufinanzierung über `270.000 €` belastet. Bei einer maximalen Beleihungsgrenze von `80 %` (`360.000 €`) stünde Ihnen rechnerisch eine HELOC-Kreditlinie von bis zu `90.000 €` zu.

Für eine schrittweise Dach- und Heizungssanierung rufen Sie jedoch nur `60.000 €` vollständig ab. Der vereinbarte variable Sollzinssatz betrage `7,50 % p. a.` (`r = 0,075 ÷ 12 = 0,00625`), die Abrufphase laufe `10 Jahre` und die Rückzahlungsphase `20 Jahre` (`n = 240`).

1. **Belastung in Phase 1 (10 Jahre, nur Zinsen):**
   `60.000 € × 0,00625 = 375,00 €` pro Monat. Nach zehn Jahren haben Sie insgesamt `45.000,00 €` an reinen Zinsen gezahlt — Ihre Restschuld beträgt aber weiterhin exakt `60.000,00 €`.
2. **Belastung in Phase 2 (20 Jahre, volle Annuität):**
   Mit dem Übergang in Jahr 11 greift die Annuitätenformel auf `P = 60.000 €`:
   `Monatsrate = 60.000 € × [0,00625 × 1,00625^240] / [1,00625^240 − 1] = 483,36 €` pro Monat.
   Das entspricht einem sofortigen Ratensprung von `+28,9 %`. In den folgenden 20 Jahren fallen weitere `56.005,42 €` an Zinsen an — die gesamten Zinskosten summieren sich damit auf `101.005,42 €`.
3. **Zinsanstiegs-Szenario (`9,50 % p. a.`):**
   Steigt das allgemeine Zinsniveau bis zum Beginn von Phase 2 um 2 Prozentpunkte auf `9,50 % p. a.`, klettert die Monatsrate sogar auf `559,28 €` — eine Mehrbelastung von fast `50 %` gegenüber den anfänglichen `375,00 €`.

## Szenariovergleich: Zinsniveau und Rückzahlungsdauer

Die folgende Übersicht zeigt für einen abgerufenen Betrag von `60.000 €` nach zehnjähriger reiner Zinsphase, wie stark Zinssatz und Tilgungsdauer die Monatsrate sowie die Gesamtzinsen über die gesamte Laufzeit verändern:

| Zinssatz p. a. | Phase 2 Laufzeit | Rate Phase 1 (Nur Zins) | Rate Phase 2 (Tilgung) | Ratensprung | Gesamtzinsen (Phase 1 + 2) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 5,50 % | 15 Jahre | 275,00 € | 490,25 € | +78,3 % | 61.245,01 € |
| 5,50 % | 20 Jahre | 275,00 € | 412,73 € | +50,1 % | 72.055,77 € |
| 7,50 % | 15 Jahre | 375,00 € | 556,21 € | +48,3 % | 85.117,33 € |
| 7,50 % | 20 Jahre | 375,00 € | 483,36 € | +28,9 % | 101.005,42 € |
| 9,50 % | 15 Jahre | 475,00 € | 626,53 € | +31,9 % | 109.776,27 € |
| 9,50 % | 20 Jahre | 475,00 € | 559,28 € | +17,7 % | 131.226,89 € |

Bemerkenswert ist der scheinbare Widerspruch bei kürzerer Tilgungsphase: Bei `5,50 %` Zins fällt der prozentuale Ratensprung in einer 15-jährigen Rückzahlungsphase mit `+78,3 %` besonders drastisch aus, spart über die gesamte Vertragslaufzeit gegenüber 20 Jahren jedoch rund `10.811 €` an Zinskosten.

## Typische Einsatzfelder, Fallstricke und DACH-Einordnung

Eine Immobilien-Kreditlinie eignet sich primär dort, wo Ausgaben in mehreren Etappen anfallen und die genaue Endsumme noch nicht feststeht — etwa bei gestaffelten Kernsanierungen, barrierefreien Umbauten oder als kurzfristiger Liquiditätspuffer zwischen Immobilienverkauf und Neukauf.

In der Praxis scheitern Kreditnehmer jedoch regelmäßig an vier strukturellen Risiken:

1. **Konsumfalle:** Wer das Eigenkapital seines Hauses für Urlaubsreisen, Pkw-Käufe oder laufenden Konsum nutzt, wandelt langfristiges Immobilienvermögen in Schulden um. Bei Zahlungsunfähigkeit droht die Zwangsversteigerung.
2. **Variable Zinsanpassung ohne Zinsobergrenze:** Anders als langfristig gebundene DACH-Hypotheken folgen HELOCs kurzfristigen Geldmarktsätzen. Prüfen Sie vertragliche Zinsobergrenzen (**Lifetime Cap** und **Periodic Cap**) vor Vertragsabschluss.
3. **Sinkende Immobilienpreise:** Verliert das Haus deutlich an Wert, darf die Bank den noch nicht abgerufenen Kreditrahmen einfrieren oder kürzen, um die Beleihungsquote zu schützen.
4. **DACH-Alternativen:** Im DACH-Raum sind reine HELOC-Verträge selten. Eigentümer vergleichen meist eine Grundschulderhöhung (mit Notar- und Grundbuchkosten von `1 %` bis `1,5 %`) mit einem **Modernisierungskredit** ohne Grundbucheintrag, der feste Monatsraten ohne Tilgungssprung bietet.

Behandeln Sie eine reine Zinsphase niemals als Dauerzustand, sondern tilgen Sie abgerufene Beträge freiwillig bereits ab dem ersten Monat.
