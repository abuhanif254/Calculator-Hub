---
title: "Anleihenrechner"
metaTitle: "Anleihenrechner: Kurs, laufende Rendite & YTM berechnen"
description: "Ermitteln Sie fairen Anleihekurs, laufende Verzinsung und Rendite bis zur Fälligkeit (YTM) für Staatsanleihen, Unternehmensanleihen und internationale Bonds."
metaDescription: "Berechnen Sie fairen Anleihekurs, laufende Verzinsung und Rendite bis zur Fälligkeit (YTM) für Bundesanleihen, Corporate Bonds und US-Treasuries."
metaKeywords: "anleihenrechner, anleihekurs berechnen, rendite bis zur fälligkeit, ytm rechner, laufende rendite anleihe, bundesanleihe rendite, kupon und kurs, stückzinsen"
faqs:
  - question: "Warum fallen Anleihekurse, wenn die Marktzinsen steigen?"
    answer: "Eine bestehende Anleihe zahlt einen fest vereinbarten Kupon. Bieten neu ausgegebene Anleihen gleicher Bonität plötzlich höhere Zinsen, wirkt der niedrigere Altkupon unattraktiv. Damit Anleger das ältere Wertpapier überhaupt kaufen, muss dessen Börsenkurs so weit unter den Nennwert fallen, bis der spätere Rückzahlungsgewinn den Zinsnachteil exakt ausgleicht."
  - question: "Worin liegt der Unterschied zwischen laufender Rendite und Rendite bis zur Fälligkeit (YTM)?"
    answer: "Die laufende Rendite (Current Yield) teilt lediglich den jährlichen Zinskupon durch den aktuellen Kaufkurs und blendet den Rückzahlungsgewinn oder -verlust bei Fälligkeit komplett aus. Die Rendite bis zur Fälligkeit (Yield to Maturity) berücksichtigt zusätzlich die Restlaufzeit, den Abzinsungseffekt und die Differenz zwischen Kaufkurs und Nennwert."
  - question: "Was sind Stückzinsen, und warum weicht der Kaufbetrag vom Börsenkurs ab?"
    answer: "Anleihen werden an Börsen im DACH-Raum fast immer als reiner Kurswert ohne aufgelaufene Zinsen (Clean Price) notiert. Kaufen Sie eine Anleihe zwischen zwei Zinsterminen, erstatten Sie dem Verkäufer die seit dem letzten Kupontermin anteilig angefallenen Stückzinsen (Dirty Price). Am nächsten Zinstermin erhalten Sie dafür den vollen Jahreskupon gutgeschrieben."
  - question: "Zahlen europäische und US-amerikanische Anleihen ihre Kupons unterschiedlich oft aus?"
    answer: "Ja. Deutsche Bundesanleihen, österreichische Staatsanleihen, Schweizer Obligationen und die meisten Euro-Unternehmensanleihen schütten ihre Zinsen standardmäßig einmal jährlich aus. US-Staatsanleihen (Treasuries) und US-Dollar-Unternehmensanleihen zahlen dagegen fast durchgängig halbjährlich, weshalb die Kuponfrequenz im Rechner korrekt gewählt werden muss."
  - question: "Welche Besonderheit gilt bei kündbaren Anleihen (Callable Bonds)?"
    answer: "Bei kündbaren Anleihen besitzt der Emittent das Recht, das Papier vor dem regulären Fälligkeitstermin zu einem festgelegten Kurs zurückzukaufen – meist genau dann, wenn die Marktzinsen gefallen sind. Prüfen Sie bei solchen Titeln neben der regulären YTM unbedingt die Rendite bis zum frühesten Kündigungstermin (Yield to Call), um keine böse Überraschung zu erleben."
---

Wer eine **Anleihe** (*Obligation* oder *Bond*) an der Börse erwirbt, sollte sich nie allein vom aufgedruckten **Kupon** leiten lassen. Im Sekundärhandel notieren Staats- und Unternehmensanleihen selten exakt bei 100 % ihres Nennwerts. Verändert sich das allgemeine Zinsniveau nach der Emission, passt sich der Börsenkurs laufend an – und genau das Zusammenspiel aus Kaufpreis, Kuponzahlungen und garantierter Rückzahlung zum Nennwert bestimmt Ihre reale Gesamtrendite. Mit dem **Anleihenrechner** bestimmen Sie in beide Richtungen sowohl den **fairen Barwert (Kurs)** bei vorgegebener Zielrendite als auch die exakte **Endfälligkeitsrendite (Yield to Maturity, YTM)** aus einem beobachteten Marktpreis.

## Die drei Renditekennzahlen jeder Anleihe sauber trennen

In Kursblättern und Broker-Depots stehen regelmäßig drei Prozentwerte nebeneinander, die völlig unterschiedliche Sachverhalte abbilden:

- **Kuponzins (Nominalzins):** Der vertraglich fixierte Jahreszins bezogen auf den Nennwert (z. B. 3,50 % auf 1.000 € = 35 € pro Jahr). Er bleibt bei festverzinslichen Papieren unveränderlich.
- **Laufende Rendite (*Current Yield*):** Das Verhältnis aus jährlichem Kupon und aktuellem Kaufpreis (`Jahreskupon / Kurs`). Sie misst den laufenden Zinsertrag, blendet jedoch Kursgewinne oder -verluste bis zur Endfälligkeit vollständig aus.
- **Rendite bis zur Fälligkeit (*Yield to Maturity / YTM*):** Die vollständige Effektivrendite p. a. unter der Annahme, dass alle Kupons pünktlich fließen, zum selben Zinssatz wiederangelegt werden und das Papier bis zur Rückzahlung im Depot bleibt.

Daraus ergibt sich eine verlässliche Kontrollregel: Notiert eine Anleihe **unter pari** (unter 100 %), gilt stets `Kupon < laufende Rendite < YTM`. Notiert sie **über pari** (über 100 %), kehrt sich die Reihenfolge exakt um (`Kupon > laufende Rendite > YTM`).

## Barwertformel für den Anleihekurs und Ermittlung der YTM

Der theoretisch faire Preis einer Anleihe (ohne Stückzinsen) entspricht dem Barwert aller zukünftigen Kupons zuzüglich der abgezinsten Nennwertrückzahlung:

```text
Fairer Anleihekurs:  P = C × [1 − (1 + r)^(−n)] / r + N / (1 + r)^n
Laufende Rendite:    Current Yield = (N × k) / P × 100 %
```

Dabei stehen **N** für den Nennwert (meist **1.000 €**), **k** für den jährlichen Kuponzins, **m** für die jährliche Zahlungsfrequenz (`1` = jährlich bei Euro- und DACH-Anleihen, `2` = halbjährlich bei US-Anleihen, `4` = vierteljährlich), **C** für den periodischen Kupon (`N × k / m`), **r** für die Marktrendite je Periode (`YTM / m`) und **n** für die verbleibenden Zahlungstermine (`Restlaufzeit × m`). Soll umgekehrt aus einem Börsenkurs `P` die **YTM** berechnet werden, existiert ab drei Perioden keine geschlossene algebraische Lösung – der Rechner ermittelt sie daher iterativ über das Bisektionsverfahren.

## Durchgerechnetes Praxisbeispiel: Euro-Anleihe unter pari

Betrachten wir eine Euro-Unternehmensanleihe mit **1.000 € Nennwert**, **3,50 % jährlichem Kupon** (`C = 35 €`, `m = 1`) und **5 Jahren Restlaufzeit** (`n = 5`). Vergleichbare Neuemissionen rentieren derzeit bei **4,50 % p. a.** (`r = 0,045`).

1. **Zahlungsströme einzeln abzinsen:** Die vier ersten Jahreskupons ergeben abgezinst **33,49 €** (Jahr 1), **32,05 €** (Jahr 2), **30,67 €** (Jahr 3) und **29,35 €** (Jahr 4). Die Schlusszahlung von **1.035 €** in Jahr 5 besitzt heute den Barwert `1.035 € / 1,045^5 = 830,54 €`.
2. **Fairen Anleihekurs summieren:** Alle fünf Barwerte addieren sich exakt auf **956,10 €** (Börsennotiz **95,61 %**).
3. **Laufende Rendite prüfen:** `35 € / 956,10 € = 3,66 %`. Die fehlenden 0,84 Prozentpunkte bis zur **4,50 % YTM** stammen aus dem garantierten Rückzahlungsgewinn von **43,90 €** über fünf Jahre.

**Vergleich zu US-Bonds:** Bei einer US-Anleihe über **1.000 $** mit **5,00 % Kupon**, **10 Jahren Laufzeit** und **halbjährlicher Auszahlung** (`m = 2`, `C = 25 $`, `n = 20`) liefert eine Marktrendite von **6,00 %** (`r = 3,00 %` pro Halbjahr) einen fairen Kurs von **925,61 $** und eine laufende Rendite von **5,40 %**.

## Zinsänderungsrisiko in Zahlen: Wie Laufzeit und Konvexität wirken

Je länger die Restlaufzeit ausfällt, desto stärker reagiert der Kurs auf Zinsbewegungen (*Duration-Effekt*). Die Tabelle vergleicht zwei Anleihen mit identischem **3,50-%-Jahreskupon** (1.000 € Nennwert) über **3 Jahre** und **10 Jahre Restlaufzeit**:

| Marktrendite (YTM) | Kurs (3 J.) | Abweichung (3 J.) | Kurs (10 J.) | Abweichung (10 J.) | Laufende Rendite (10 J.) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2,00 %** | 1.043,26 € | +4,33 % | 1.134,74 € | +13,47 % | 3,08 % |
| **2,50 %** | 1.028,56 € | +2,86 % | 1.087,52 € | +8,75 % | 3,22 % |
| **3,50 % (pari)** | 1.000,00 € | 0,00 % | 1.000,00 € | 0,00 % | 3,50 % |
| **4,50 %** | 972,51 € | −2,75 % | 920,87 € | −7,91 % | 3,80 % |
| **5,00 %** | 959,15 € | −4,08 % | 884,17 € | −11,58 % | 3,96 % |

Steigt der Marktzins um 1,50 Prozentpunkte von 3,50 % auf 5,00 %, verliert der Kurzläufer lediglich **4,08 %**, während die Zehnjahres-Anleihe um **11,58 %** nachgibt. Gleichzeitig tritt die positive **Konvexität** deutlich hervor: Ein gleich großer Zinsrückgang um 1,50 Prozentpunkte auf 2,00 % beschert beim Langläufer einen Kursgewinn von **+13,47 %** – fast zwei Prozentpunkte mehr Gewinn als der symmetrische Zinsanstieg an Verlust auslöst.

## Stückzinsen, Steuern und Ausfallrisiko im DACH-Depot

- **Clean Price vs. Dirty Price einplanen:** Beim Kauf berechnet Ihr Broker zusätzlich zum Börsenkurs die seit dem letzten Zinstermin aufgelaufenen **Stückzinsen**. Sie erhalten diese zwar mit dem nächsten vollen Kupon zurück, müssen den höheren Gesamtbetrag am Kauftag jedoch auf dem Verrechnungskonto bereithalten.
- **Steuerliche Unterschiede zwischen DE, AT und CH:** In Deutschland unterliegen Kupons wie auch Kursgewinne bis zur Fälligkeit oberhalb des Sparer-Pauschbetrags (1.000 € / 2.000 €) der **Abgeltungsteuer von 26,375 %** (inkl. Soli, ggf. zzgl. Kirchensteuer); in Österreich fallen einheitlich **27,5 % KESt** an. Für Privatanleger in der **Schweiz** entsteht dagegen ein markanter Vorteil: Zinskupons werden voll als Einkommen besteuert, während Kursgewinne bei regulär verzinsten Obligationen (außerhalb überwiegend einmalverzinslicher Papiere) steuerfrei bleiben – niedrig verzinste Anleihen unter pari liefern dort nach Steuern oft die höhere Nettorendite.
- **Bonität und Stückelung prüfen:** Eine auffällig hohe YTM ist kein Geschenk, sondern spiegelt erhöhtes Ausfallrisiko im Hochzinssegment (unterhalb von BBB−) wider. Achten Sie bei Privatanleger-Stückelungen (1.000 € statt 100.000 € Mindeststückelung) zudem auf enge Geld-Brief-Spannen an liquiden Handelsplätzen wie Frankfurt, Stuttgart oder SIX.
