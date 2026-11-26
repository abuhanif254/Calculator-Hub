---
title: "Schneeball- vs. Lawinen-Methode: Die ultimative Schuldenstrategie"
description: "Vergleichen Sie die psychologische Schneeball-Methode mit der zinsoptimalen Lawinen-Methode anhand exakter Berechnungen und nutzen Sie unseren Schuldenabbau-Rechner für Ihren Tilgungsplan."
category: "Finance"
relatedCalculator: "debt-payoff-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen der Schneeball- und der Lawinen-Methode?"
    answer: "Beide Methoden bündeln jede frei werdende Mindestrate als Schneeballeffekt auf die nächste Schuld. Die Schneeball-Methode priorisiert jedoch nach der kleinsten Restschuld für schnelle Erfolgserlebnisse, während die Lawinen-Methode immer zuerst den Kredit mit dem höchsten Zinssatz angreift und so die geringsten Gesamtzinsen verursacht."
  - question: "Welche Methode spart am Ende mehr Geld und Zeit?"
    answer: "Mathematisch ist ausnahmslos die Lawinen-Methode überlegen oder mindestens gleichwertig. Da immer zuerst das teuerste Kapital getilgt wird, zahlen Sie die niedrigsten Gesamtzinsen und erreichen Ihre Schuldenfreiheit im Vergleich zur Schneeball-Methode je nach Zinsgefälle oft mehrere Monate früher."
  - question: "Wann ist die Schneeball-Methode trotz höherer Zinskosten die bessere Wahl?"
    answer: "Die Schneeball-Methode ist überlegen, wenn Ihnen die Motivation zu drohen bricht oder Sie viele kleine Restschulden haben, die Ihre monatliche Haushaltsführung unübersichtlich machen. Ein schnell abbezahlter Kleinkredit schafft psychologischen Schwung und erhöht die Wahrscheinlichkeit, den Tilgungsplan dauerhaft durchzuhalten."
  - question: "Wie viel zusätzliches Budget benötige ich, damit die Strategien funktionieren?"
    answer: "Selbst eine feste monatliche Sondertilgung von 50 € bis 100 € reicht bereits für einen spürbaren Effekt. Entscheidend ist der sogenannte Rollover-Mechanismus: Sobald die erste Schuld getilgt ist, wird deren bisherige Mindestrate dauerhaft auf die nächste Position übertragen, ohne das Gesamtbudget zu kürzen."
  - question: "Sollte ich zuerst einen Notgroschen aufbauen oder alle freien Mittel in die Tilgung stecken?"
    answer: "Bevor Sie aggressive Sondertilgungen starten, empfiehlt sich ein kleiner Puffer von etwa 1.000 € bis 1.500 € auf einem Tagesgeldkonto. Ohne diesen Notgroschen zwingt Sie bereits eine unerwartete Autoreparatur zurück in den teuren Dispokredit und unterbricht Ihren Tilgungsplan."
---

Wer mehrere Konsumkredite, Kreditkartensalden oder einen Dispositionskredit parallel bedient, scheitert selten an fehlendem Einkommen, sondern an fehlender Priorisierung: Überschüssige Beträge werden wahllos verteilt, während hohe Zinsen die Rückzahlung Monat für Monat ausbremsen. Zwei systematische Tilgungsstrategien lösen dieses Problem mit entgegengesetzten Schwerpunkten – die verhaltensorientierte **Schneeball-Methode** und die rein mathematische **Lawinen-Methode**.

Mit unserem [Schuldenabbau-Rechner](/de/rechner/schulden-tilgungs-rechner) simulieren Sie beide Verfahren für Ihre persönlichen Salden, Zinssätze und monatlichen Zusatzraten auf den Monat genau. Im Folgenden erklären wir den exakten Berechnungsalgorithmus, führen ein vollständiges Rechenbeispiel mit verifizierten Tilgungszeiten durch und zeigen, wann welche Methode im Alltag wirklich gewinnt.

## Methodik und Algorithmus beider Tilgungsstrategien

Sowohl die Schneeball- als auch die Lawinen-Methode folgen demselben Grundprinzip: Sie legen ein festes **monatliches Gesamtbudget** `B` fest, das über der Summe aller vertraglichen Mindestraten `M_i` liegt (`B = Summe(M_i) + E`, wobei `E` Ihre monatliche Sondertilgung darstellt). In jedem Monat bedienen Sie zunächst pünktlich sämtliche Mindestraten, um Mahngebühren und Strafzinsen zu vermeiden.

Der entscheidende Unterschied liegt ausschließlich in der Sortierregel für die verfügbare Überzahlung `U_t` im Monat `t`:

* **Schneeball-Methode (Sortierung nach Restsaldo aufsteigend):** Die gesamte Zusatzrate `U_t` fließt in die Schuld mit dem **kleinsten aktuellen Restbetrag** `min(S_i)`. Zinssätze werden bei der Reihenfolge vollständig ignoriert. Sobald dieser kleinste Posten bei null steht, wird dessen bisherige Mindestrate dauerhaft dem Angriff auf den nächstgrößeren Saldo zugeschlagen.
* **Lawinen-Methode (Sortierung nach Effektivzins absteigend):** Die gesamte Zusatzrate `U_t` fließt in die Verbindlichkeit mit dem **höchsten Zinssatz** `max(i_i)`. Dadurch reduzieren Sie jeden Monat das teuerste Fremdkapital und minimieren die nach der Monatsformel `Zins_t = S_t × (i / 12)` anfallenden Kosten.

Beide Strategien nutzen also denselben **Rollover-Hebel**: Ihr monatlicher Gesamtaufwand `B` bleibt bis zur vollständigen Schuldenfreiheit konstant, wodurch die Tilgungskraft auf die verbleibenden Schulden exponentiell wächst.

## Schritt-für-Schritt-Rechenbeispiel: Drei Verbindlichkeiten über 20.000 €

Betrachten wir einen typischen Haushalt mit **20.000 €** Gesamtschulden und monatlichen Mindestraten von zusammen **450 €**:

1. **Dispositionskredit:** `2.000 €` Restsaldo zu `8,4 %` Effektivzins, Mindestrate `80 €`
2. **Kreditkarte:** `7.200 €` Restsaldo zu `21,6 %` Effektivzins, Mindestrate `160 €`
3. **Autokredit:** `10.800 €` Restsaldo zu `4,8 %` Effektivzins, Mindestrate `210 €`

Zahlen Sie dauerhaft nur die Mindestraten ohne Umschichtung aus, zieht sich die Rückzahlung allein wegen der `21,6 %` teuren Kreditkarte über **94 Monate** (fast acht Jahre) und verursacht horrende **9.216,56 €** an Zinsen. Nun erhöhen Sie Ihr Gesamtbudget um lediglich **100 €** pro Monat auf **550 €**:

* **Ablauf nach der Schneeball-Methode:** Die `100 €` Zusatzrate gehen zunächst komplett auf den `2.000 €`-Dispo (Gesamtrate `180 €`). Bereits nach **12 Monaten** ist der Dispo getilgt – Ihr erster psychologisch motivierender Meilenstein. Ab Monat 13 fließen `180 € + 160 € = 340 €` auf die Kreditkarte, die in **Monat 37** auf null sinkt. Danach wandern die vollen `550 €` in den Autokredit, bis Sie nach **45 Monaten** schuldenfrei sind. Gesamte Zinskosten: **4.472,38 €**.
* **Ablauf nach der Lawinen-Methode:** Die `100 €` fließen vom ersten Tag an in die `21,6 %` teure Kreditkarte (Rate `260 €`). Der Dispo läuft nebenbei über seine Mindestrate von `80 €` weiter und verschwindet automatisch in **Monat 28**, woraufhin seine `80 €` ebenfalls auf die Kreditkarte umgeleitet werden. Diese ist bereits in **Monat 36** abbezahlt, der Autokredit endet in **Monat 44**. Gesamte Zinskosten: **4.186,95 €**.

Durch die Lawinen-Methode sparen Sie gegenüber dem Schneeball weitere **285,43 €** und gewinnen einen Monat Zeit; gegenüber bloßen Mindestraten sinkt Ihre Zinslast bei beiden Strategien um rund **5.000 €**.

## Budget- und Strategievergleich im Überblick

Wie stark sich zusätzliches Tilgungsbudget und Methodenwahl auswirken, zeigt die Simulation der obigen Ausgangssituation (`20.000 €` Schulden) über drei monatliche Budgets:

| Strategie & Monatsbudget | Zusätzliche Rate | Erster Teilerfolg | Gesamtlaufzeit | Gesamtzinsen | Zinsersparnis vs. Mindestrate |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Nur Mindestraten (450 €)** | 0 € | Monat 28 (Dispo) | 94 Monate | 9.216,56 € | — |
| **Schneeball (550 € Budget)** | +100 € | Monat 12 (Dispo) | 45 Monate | 4.472,38 € | 4.744,18 € |
| **Lawine (550 € Budget)** | +100 € | Monat 28 (Dispo) | 44 Monate | 4.186,95 € | 5.029,61 € |
| **Schneeball (650 € Budget)** | +200 € | Monat 8 (Dispo) | 36 Monate | 3.342,13 € | 5.874,43 € |
| **Lawine (650 € Budget)** | +200 € | Monat 26 (Kreditkarte) | 36 Monate | 3.036,76 € | 6.179,80 € |
| **Schneeball (750 € Budget)** | +300 € | Monat 6 (Dispo) | 31 Monate | 2.692,30 € | 6.524,26 € |
| **Lawine (750 € Budget)** | +300 € | Monat 19 (Kreditkarte) | 30 Monate | 2.413,95 € | 6.802,61 € |

Beachten Sie den Budgethebel: Eine Erhöhung um `200 €` (von `450 €` auf `650 €`) verkürzt die Gesamtdauer von knapp acht Jahren auf exakt **drei Jahre** und drückt die Zinsen um über **6.000 €** – weit mehr als der reine Unterschied zwischen Schneeball (`3.342,13 €`) und Lawine (`3.036,76 €`).

## Entscheidungshilfe, Praxisfehler und rechtliche Rahmenbedingungen

Welche Strategie für Sie die richtige ist, entscheidet weniger die reine Mathematik als Ihre Durchhaltefähigkeit. Psychologische Studien zur Schuldenrückzahlung belegen, dass Menschen mit mehreren kleinen Verbindlichkeiten häufiger abbrechen, wenn der erste sichtbare Teilerfolg – wie im `650 €`-Lawinen-Szenario – erst nach 26 Monaten eintritt. Wählen Sie die **Schneeball-Methode**, wenn Sie unter vielen unübersichtlichen Kleinkrediten leiden und rasche Meilensteine benötigen. Wählen Sie die **Lawinen-Methode**, sobald Ihre teuerste Schuld gleichzeitig überschaubar ist oder Sie konsequent nach Kennzahlen handeln.

Achten Sie bei der Umsetzung im DACH-Raum auf drei praktische Stolpersteine:

* **Sondertilgungsrechte bei Ratenkrediten prüfen:** Bei Dispokrediten und Kreditkarten sind Überzahlungen jederzeit kostenfrei. Klassische Ratenkredite erlauben Sondertilgungen ebenfalls, doch für vorzeitige Rückzahlungen außerhalb kostenloser Kontingente fällt nach § 502 BGB in Deutschland gegebenenfalls eine Vorfälligkeitsentschädigung von bis zu `1,0 %` an (in Österreich und der Schweiz gelten eigene Konsumkreditregeln). Prüfen Sie diese Gebühr vor dem Einsatz der Überzahlung.
* **Notgroschen vor Volltilgung aufbauen:** Halten Sie vor aggressiven Sondertilgungen mindestens `1.000 €` bis `1.500 €` flüssig, damit unerwartete Rechnungen Sie nicht zurück in den Dispo zwingen.
* **Kombination mit einer Umschuldung:** Laufen teure Kreditkarten über `15 %` Zins, sollten Sie im ersten Schritt prüfen, ob ein günstigerer Ratenkredit die Zinslast sofort senkt, und den neuen Plan anschließend exakt mit unserem [Schuldenabbau-Rechner](/de/rechner/schulden-tilgungs-rechner) durchrechnen.
