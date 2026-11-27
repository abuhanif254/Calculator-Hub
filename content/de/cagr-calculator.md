---
title: "CAGR-Rechner: Jährliche Wachstumsrate präzise berechnen"
description: "Berechnen Sie den CAGR (durchschnittliche jährliche Wachstumsrate) für Aktiendepots, ETFs, Immobilien und SaaS-Umsätze – inklusive Volatilitätsvergleich."
faqs:
  - question: "Warum ist der CAGR aussagekräftiger als die durchschnittliche jährliche Rendite?"
    answer: "Das arithmetische Mittel addiert einzelne Jahresrenditen und teilt sie durch die Anzahl der Jahre, wodurch Kursverluste systematisch zu optimistisch bewertet werden. Der CAGR bildet als geometrisches Mittel den tatsächlichen Zinseszinseffekt ab und liefert exakt jene konstante Jahresrate, die vom Startwert zum realen Endwert führt."
  - question: "Kann man den CAGR auch bei monatlichen ETF-Sparplänen verwenden?"
    answer: "Für reine Einmalanlagen ist der CAGR exakt. Bei laufenden Einzahlungen oder Entnahmen – etwa einem monatlichen ETF-Sparplan – verfälscht die einfache Anfangs-Endwert-Formel das Ergebnis, da frisches Kapital unterschiedlich lange arbeitet. In diesem Fall sollten Sie auf den internen Zinsfuß (XIRR) zurückgreifen."
  - question: "Wie wird der CAGR bei SaaS-Unternehmen für den ARR angewendet?"
    answer: "Im SaaS-Controlling misst der CAGR das mehrjährige Wachstum des jährlich wiederkehrenden Umsatzes (ARR). Indem Sie den ARR des aktuellen Geschäftsjahres durch den ARR eines früheren Basisjahres teilen und mit dem Kehrwert der Jahresdifferenz potenzieren, glätten Sie saisonale Großaufträge und erkennen die strukturelle Wachstumsdynamik."
  - question: "Was passiert, wenn der Endwert niedriger ist als der Anfangswert?"
    answer: "Liegt der Endwert unter dem Ausgangswert, liefert die CAGR-Formel ein negatives Vorzeichen. Eine jährliche Schrumpfungsrate von beispielsweise minus 5,00 % p. a. bedeutet, dass das betrachtete Vermögen oder der Umsatz über den Gesamtzeitraum rechnerisch um durchschnittlich fünf Prozent pro Jahr abgenommen hat."
  - question: "Wie wirken sich Steuern und Vorabpauschale auf den Netto-CAGR eines Depots aus?"
    answer: "In Deutschland schmälern realisierte Gewinne über dem Sparer-Pauschbetrag (Abgeltungsteuer) sowie die jährliche Vorabpauschale bei thesaurierenden Fonds den verbleibenden Zinseszinseffekt. Für einen realistischen Netto-CAGR sollten Sie daher stets mit den Nachsteuer-Endwerten kalkulieren und bei Aktien-ETFs die Teilfreistellung von 30 % berücksichtigen."
---

Die **Compound Annual Growth Rate (CAGR)** – auf Deutsch **durchschnittliche jährliche Wachstumsrate** – gibt an, mit welchem konstanten Prozentsatz ein Kapitalbetrag, ein Wertpapierdepot oder ein Unternehmensumsatz pro Jahr gewachsen wäre, wenn der Wertzuwachs über die gesamte Laufzeit völlig gleichmäßig erfolgt wäre. Sie macht den Zinseszinseffekt über mehrjährige Zeiträume sichtbar und eliminiert kurzfristige Marktschwankungen aus der Betrachtung.

Im Gegensatz zu einfachen Durchschnittswerten zeigt der CAGR die **tatsächliche geometrische Wertentwicklung** zwischen Start- und Endpunkt. Dadurch lassen sich ein dreijähriges Wachstumsprojekt, ein achtjähriges ETF-Portfolio und die fünfjährige Umsatzentwicklung eines Softwareunternehmens direkt auf einer gemeinsamen Jahresbasis vergleichen.

## Formel, Variablen und Zinseszins-Methodik

Die mathematische Definition der durchschnittlichen jährlichen Wachstumsrate lautet:

`CAGR = (Endwert ÷ Anfangswert)^(1 ÷ n) − 1`

Um das Ergebnis als Prozentwert darzustellen, wird das Resultat mit `100` multipliziert. Die Formel basiert auf drei eindeutig definierten Eingangsgrößen:

- **Anfangswert:** Der Vermögensstand, Depotwert oder Jahresumsatz zu Beginn des Betrachtungszeitraums (`t = 0`), stets in einheitlicher Währung (z. B. Euro).
- **Endwert:** Der Wert derselben Position am Ende des Beobachtungszeitraums (`t = n`), idealerweise bereits um Transaktionskosten oder Entnahmen bereinigt.
- **Laufzeit (`n`):** Die Anzahl der Jahre zwischen Anfangs- und Endzeitpunkt. Bei unterjährigen oder krummen Zeiträumen – etwa 42 Monaten – wird `n` als Dezimalzahl eingesetzt (`42 ÷ 12 = 3,5` Jahre).

Methodisch entspricht der CAGR dem **geometrischen Mittel** der periodischen Wachstumsfaktoren. Während die einfache Gesamtrendite nur den prozentualen Abstand zwischen Start und Ziel angibt, berücksichtigt der CAGR die laufende Wiederanlage erzielter Erträge. Genau darin liegt sein Wert für die Kapitalmarkt- und Unternehmensanalyse: Er übersetzt schwankende Jahresergebnisse in eine glatte, vergleichbare Wachstumsrate.

## Schritt-für-Schritt-Berechnung: Depot- und SaaS-ARR-Beispiel

Betrachten wir zunächst ein mehrjähriges Wertpapierdepot ohne zwischenzeitliche Ein- oder Auszahlungen. Sie investieren am 1. Januar eines Basisjahres `40.000,00 €` in ein global diversifiziertes Aktien-ETF-Portfolio. Nach genau `n = 6` Jahren beträgt der Depotwert `68.500,00 €`.

1. **Wachstumsfaktor berechnen:** `68.500,00 € ÷ 40.000,00 € = 1,7125` (ein Gesamtzuwachs von `+71,25 %`).
2. **Jahresexponent bilden:** `1 ÷ 6 ≈ 0,166667`
3. **Potenzieren:** `1,7125^(1 ÷ 6) ≈ 1,09380`
4. **Eins abziehen und in Prozent umrechnen:** `1,09380 − 1 = 0,09380`, entsprechend einem **CAGR von 9,38 % p. a.**

Die Gegenprobe bestätigt die Rechnung: `40.000,00 € × 1,09380^6 ≈ 68.499,52 €` (Rundungsdifferenz durch Nachkommastellen).

Dasselbe Prinzip nutzt das Management eines B2B-SaaS-Anbieters zur Bewertung seines wiederkehrenden Jahresumsatzes (Annual Recurring Revenue, kurz ARR): Steigt der ARR innerhalb von `4` Geschäftsjahren von `1.200.000,00 €` auf `3.450.000,00 €`, ergibt sich ein Faktor von `2,875`. Die vierte Wurzel (`2,875^0,25 − 1`) liefert einen **Umsatz-CAGR von 30,21 % p. a.**

Noch deutlicher wird die Stärke des CAGR beim Blick auf die sogenannte **Volatilitätsbremse**. Steigt ein Depot im ersten Jahr um `+50,00 %` (von `10.000 €` auf `15.000 €`) und fällt im zweiten Jahr um `−30,00 %` (von `15.000 €` auf `10.500 €`), beträgt die arithmetische Durchschnittsrendite irreführende `+10,00 %` (`(+50 % − 30 %) ÷ 2`). Der reale CAGR liegt dagegen bei `(10.500 ÷ 10.000)^(1 ÷ 2) − 1 = 1,05^0,5 − 1 ≈ 2,47 % p. a.`

## Szenario- und Benchmark-Tabelle: Langfristiges Wachstum im Vergleich

Wie stark bereits geringe Unterschiede beim CAGR über den Zinseszinseffekt auf das Endvermögen durchschlagen, zeigt ein Vergleich bei einem Startkapital von `50.000,00 €` über `10` Jahre sowie typische Branchenkorridore:

| Anlageform / Geschäftsmodell | Typischer CAGR-Korridor | Endwert aus 50.000 € (10 J., Mittelwert) | Gesamtwachstum (10 J.) | Charakteristische Treiber & Schwankung |
| --- | --- | --- | --- | --- |
| Konservatives Zins- und Anleiheportfolio | 2,5 % – 4,0 % p. a. | 68.845 € (bei 3,25 %) | +37,7 % | Niedrige Volatilität, hohe Zinssensitivität |
| Mischportfolio (60 % Aktien / 40 % Renten) | 4,5 % – 6,5 % p. a. | 85.407 € (bei 5,50 %) | +70,8 % | Ausbalanciertes Rendite-Risiko-Profil |
| Globales Aktien-ETF-Portfolio (nominal) | 6,5 % – 9,0 % p. a. | 105.473 € (bei 7,75 %) | +110,9 % | Breite Diversifikation, zwischenzeitliche Rückschläge |
| Qualitätsaktien / Nebenwerte-Fokus | 8,0 % – 11,0 % p. a. | 123.911 € (bei 9,50 %) | +147,8 % | Höheres Konjunktur- und Selektionsrisiko |
| Etablierter Mittelstand (Umsatzwachstum) | 4,0 % – 8,0 % p. a. | 89.542 € (bei 6,00 %) | +79,1 % | Organisches Wachstum, Preisdurchsetzung |
| Wachstumsstarkes SaaS-Unternehmen (ARR) | 20,0 % – 40,0 % p. a. | 689.292 € (bei 30,00 %) | +1.278,6 % | Hohe Bruttomargen, Abwanderungsrate (Churn) kritisch |

Bei `3,25 %` wächst ein Vermögen von `50.000 €` in zehn Jahren auf gut `68.800 €`; bei `7,75 %` verdoppelt es sich auf knapp `105.500 €`. Gleichzeitig belegt die Tabelle, weshalb hochprozentige SaaS-Wachstumsraten über ein ganzes Jahrzehnt nur selten gehalten werden können: Mit steigender Umsatzbasis sinkt der prozentuale CAGR naturgemäß ab.

## Strategische Praxis-Tipps, Fehlerquellen und steuerliche Aspekte

In der Finanz- und Unternehmenspraxis führt die blinde Anwendung des CAGR gelegentlich zu Fehlinterpretationen. Achten Sie bei der Auswertung auf vier zentrale Punkte:

- **Endpunkt-Sensitivität („Cherry-Picking“):** Weil ausschließlich der Start- und Endwert in die Gleichung eingehen, lässt sich der CAGR durch geschickte Wahl des Stichtags optisch aufwerten. Prüfen Sie bei Fondsvergleichen oder Unternehmenspräsentationen stets rollierende Zeiträume (z. B. über 5 und 10 Jahre), um Ausreißer am Periodenbeginn oder -ende zu erkennen.
- **Ausblendung von Zwischenschwankungen:** Zwei Portfolios können denselben CAGR von `7,00 %` erreichen, während eines ruhig wächst und das andere zwischenzeitlich um `45 %` einbricht. Ergänzen Sie den CAGR daher immer um den maximalen Wertverlust (Maximum Drawdown) oder die jährliche Volatilität.
- **Unberücksichtigte Cashflows und Inflation:** Bei regelmäßigen Sparraten aus dem laufenden Nettoeinkommen – etwa abhängig von Steuerklasse I oder III und nach Abzug der Sozialversicherung – bildet der CAGR keine korrekte interne Verzinsung ab. Zudem sollten Sie langfristige Vermögensziele stets real, also abzüglich der erwarteten Inflation, bewerten.
- **Steuerliche Einflüsse im DACH-Raum:** In Deutschland unterliegen Kapitalerträge grundsätzlich der Abgeltungsteuer (25 % plus Solidaritätszuschlag, ggf. Kirchensteuer), wobei qualifizierte Aktienfonds von einer 30-prozentigen Teilfreistellung profitieren; bei thesaurierenden ETFs reduziert die jährliche Vorabpauschale zudem den unversteuerten Zinseszinshebel geringfügig. In Österreich greift die KESt in Höhe von 27,5 %, in der Schweiz bleiben private Kursgewinne im Regelfall steuerfrei, während Dividenden der Einkommensteuer unterliegen.

**Hinweis:** Die dargestellten Berechnungen, Beispiele und Benchmark-Korridore dienen ausschließlich der Information und Finanzbildung und stellen keine Anlage-, Steuer- oder Unternehmensberatung dar.
