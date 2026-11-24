---
title: "Notenrechner"
metaTitle: "Notenrechner | Gewichtete Note & Abschlussprüfung berechnen"
description: "Berechnen Sie Ihre gewichtete Fachnote aus beliebig vielen Teilleistungen und ermitteln Sie exakt, welches Ergebnis Sie in der Abschlussprüfung für Ihre Wunschnote brauchen."
metaDescription: "Kostenloser Notenrechner für Schule und Studium: Gewichtete Gesamtnote berechnen und exakt ermitteln, welche Note Sie in der Abschlussprüfung brauchen."
metaKeywords: "notenrechner, schulnote berechnen, gewichtete note, abschlussprüfung note berechnen, wunschnote rechner, notendurchschnitt, gewichtetes mittel, klausur gewichtung"
faqs:
  - question: "Wie berechnet der Notenrechner meinen aktuellen Stand, wenn die Gewichtungen noch nicht 100 % ergeben?"
    answer: "Der Rechner dividiert die gewichtete Punktsumme nicht pauschal durch 100 %, sondern durch die Summe aller bisher eingetragenen Gewichtungen. Dadurch spiegelt das Ergebnis jederzeit Ihren realen Leistungsstand aus den bereits bewerteten Arbeiten wider – auch mitten im Schulhalbjahr oder Semester."
  - question: "Funktioniert der Rechner sowohl mit Prozentwerten als auch mit dem deutschen, österreichischen und Schweizer Notensystem?"
    answer: "Ja, die mathematische Formel des gewichteten Mittels gilt für jede numerische Skala – also für Prozentwerte von 0 bis 100 %, Oberstufenpunkte von 0 bis 15, das deutsche 1-bis-6-System, das österreichische 1-bis-5-System und die Schweizer 6-bis-1-Skala. Entscheidend ist lediglich, alle Teilleistungen innerhalb einer Rechnung einheitlich in derselben Skala einzugeben."
  - question: "Was bedeutet es, wenn der Abschlussprüfungs-Rechner mehr als 100 % anzeigt?"
    answer: "Liegt die berechnete Zielpunktzahl oberhalb von 100 % (beziehungsweise im deutschen Schulnotensystem unter 1,0), lässt sich die gewünschte Gesamtnote allein durch die reguläre Abschlussprüfung rechnerisch nicht mehr erreichen. Nur zusätzliche Bonuspunkte, mündliche Ausgleichsprüfungen oder eine realistische Anpassung des Zielwerts können diese Lücke schließen."
  - question: "Warum weicht der gewichtete Durchschnitt häufig deutlich vom einfachen Mittelwert ab?"
    answer: "Beim einfachen arithmetischen Mittel zählt eine kleine Hausaufgabe oder ein unangekündigter Kurztest exakt genauso stark wie eine zweistündige Klassenarbeit. Erst das gewichtete Mittel bildet die tatsächliche Prüfungsordnung korrekt ab, in der schriftliche Klausuren oft 50 bis 70 % der Endnote ausmachen."
  - question: "Werden Teilnoten vor der Gesamtberechnung gerundet oder erst beim Endergebnis?"
    answer: "In den meisten Schul- und Hochschulordnungen im DACH-Raum fließen alle Einzelnoten ungerundet in das gewichtete Mittel ein. Erst der fertige Endwert wird gemäß der jeweiligen Prüfungsordnung auf eine ganze Note, halbe Note oder eine Dezimalstelle gerundet – an vielen Universitäten wird nach der ersten Nachkommastelle sogar ohne Aufrundung abgeschnitten."
---

## Warum gewichtete Notenberechnung in Schule und Studium entscheidend ist

In kaum einem Schulfach oder Hochschulmodul zählen alle Prüfungsleistungen gleich viel. Mündliche Mitarbeit, Referate, Übungsblätter, Kurztests und schriftliche Klausuren fließen nach festgelegten Prozentanteilen oder nach ECTS-Leistungspunkten in die Zeugnisnote ein. Im Bachelor- und Masterstudium in Deutschland, Österreich und der Schweiz dienen die ECTS-Punkte direkt als Gewichtungsfaktoren für die Abschlussnote – eine mit zwölf ECTS-Punkten bewertete Bachelorarbeit zählt dort doppelt so stark wie ein Pflichtmodul mit sechs Leistungspunkten.

Unser **Notenrechner** vereint zwei getrennte Rechenmodi für die präzise Leistungsplanung:

1. **Unterrichtsnote (Gewichtet):** Sie tragen beliebig viele bisherige Teilleistungen mit ihrer prozentualen Gewichtung ein und erhalten sofort Ihren normierten aktuellen Gesamtstand sowie die bisherige Gesamtgewichtung.
2. **Abschlussprüfungs-Rechner:** Aus aktueller Vornote, angestrebter Wunschnote und Prüfungsanteil berechnet das Werkzeug rückwärts, welches Ergebnis Sie in der Abschlussprüfung zwingend benötigen.

## Mathematische Formeln für Fachnote und Abschlussprüfung

Beide Modi beruhen auf transparenten linearen Gleichungen, die sich sowohl auf Prozentwerte (0 bis 100 %) als auch auf klassische Ziffernnoten anwenden lassen.

### 1. Gewichtetes arithmetisches Mittel (Modus Unterrichtsnote)

Bei $n$ Einzelleistungen mit den Notenwerten $g_1, \dots, g_n$ und positiven Gewichtungen $w_1, \dots, w_n$ lautet der gewichtete Durchschnitt $\bar{G}$:

$$\bar{G} = \frac{\sum_{i=1}^{n} g_i \cdot w_i}{\sum_{i=1}^{n} w_i} = \frac{g_1 w_1 + g_2 w_2 + \dots + g_n w_n}{w_1 + w_2 + \dots + w_n}$$

* **$g_i$:** Erzielte Prozentzahl, Punktzahl oder Ziffernnote der $i$-ten Leistung.
* **$w_i$:** Gewichtungsfaktor der $i$-ten Leistung (Prozentanteile, doppelte Klausurwertung oder ECTS-Punkte).
* **$W = \sum w_i$:** Bisher abgedeckte Gesamtgewichtung. Durch die Division durch $W$ statt starr durch $100$ bleibt der Zwischenstand auch vor Semesterende exakt normiert.

### 2. Rückwärtsrechnung für die Abschlussprüfung

Setzt sich die Endnote aus der Vornote $G_{\text{aktuell}}$ und der Abschlussprüfung $G_{\text{Prüfung}}$ mit Prüfungsanteil $w_P$ ($0 < w_P < 100$, Dezimalanteil $p = \frac{w_P}{100}$) zusammen, gilt $G_{\text{Ziel}} = G_{\text{aktuell}} \cdot (1 - p) + G_{\text{Prüfung}} \cdot p$. Aufgelöst nach dem benötigten Prüfungsergebnis ergibt sich:

$$G_{\text{Prüfung}} = \frac{G_{\text{Ziel}} - G_{\text{aktuell}} \cdot (1 - p)}{p}$$

Je höher der Prüfungsanteil $w_P$ ausfällt, desto stärker lässt sich eine schwächere Vornote durch eine starke Abschlussleistung ausgleichen – gleichzeitig steigt jedoch der Einfluss eines einzelnen Prüfungstages. Liegt das Ergebnis bei oder unter $0\text{ \%}$, ist die Wunschnote rechnerisch bereits sicher; übersteigt es $100\text{ \%}$, reicht die reguläre Abschlussprüfung allein nicht mehr aus.

## Umrechnungstabelle: Notensysteme im DACH-Raum im Überblick

Da Schulen und Hochschulen im deutschsprachigen Raum unterschiedliche Skalen verwenden und der Rechner im Prozentmodus ergänzend Buchstabennoten ausgibt, dient diese Tabelle als Orientierung (exakte Schwellen können je nach Bundesland, Kanton oder Hochschule leicht abweichen):

| Prozent | Deutschland (1–6) | Oberstufe DE (0–15) | Österreich (1–5) | Schweiz (6–1) | Buchstabe (Rechner) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **95–100 %** | 1,0 (Sehr gut) | 15 Punkte | 1 (Sehr gut) | 6,0 (Sehr gut) | A+ / A |
| **90–94 %** | 1,3 (Sehr gut) | 14 Punkte | 1 (Sehr gut) | 5,5 (Gut–Sehr gut) | A / A- |
| **85–89 %** | 1,7 (Gut) | 13 Punkte | 2 (Gut) | 5,0 (Gut) | B+ / B |
| **80–84 %** | 2,0 (Gut) | 11–12 Punkte | 2 (Gut) | 5,0 (Gut) | B / B- |
| **70–79 %** | 2,3–2,7 (Befriedigend) | 9–10 Punkte | 3 (Befriedigend) | 4,5 (Genügend–Gut) | C+ bis C- |
| **65–69 %** | 3,0–3,3 (Befriedigend) | 7–8 Punkte | 3–4 | 4,0 (Genügend) | D+ / D |
| **50–64 %** | 3,7–4,0 (Ausreichend) | 5–6 Punkte | 4 (Genügend) | 4,0 (Bestehungsgrenze) | F |
| **unter 50 %** | 4,3–6,0 (Nicht ausr.) | 0–4 Punkte | 5 (Nicht genügend) | 1,0–3,5 (Ungenügend) | F |

## Schritt-für-Schritt-Rechenbeispiel

Eine Studentin strebt in einem Modul eine Endleistung von **87,0 %** an. Bisher liegen drei Teilleistungen mit zusammen **70 %** Gewichtung vor:

* Übungsaufgaben ($w_1 = 15\text{ \%}$): $g_1 = 92\text{ \%}$
* Kurztest ($w_2 = 25\text{ \%}$): $g_2 = 84\text{ \%}$
* Zwischenklausur ($w_3 = 30\text{ \%}$): $g_3 = 80\text{ \%}$

**Schritt 1 – Aktuelle Unterrichtsnote ermitteln:**

1. Gewichtete Teilsummen: $92 \times 15 = 1.380$, $84 \times 25 = 2.100$ und $80 \times 30 = 2.400$.
2. Gesamtsumme und Gesamtgewichtung: $1.380 + 2.100 + 2.400 = 5.880$ bei $W = 15 + 25 + 30 = 70$.
3. Aktueller Stand: $\bar{G} = \frac{5.880}{70} = \mathbf{84{,}0\text{ \%}}$ (Buchstabennote **B**).

**Schritt 2 – Benötigtes Ergebnis in der Abschlussklausur ($w_P = 30\text{ \%}$, $p = 0{,}30$):**

$$G_{\text{Prüfung}} = \frac{87{,}0 - 84{,}0 \times (1 - 0{,}30)}{0{,}30} = \frac{87{,}0 - 58{,}8}{0{,}30} = \frac{28{,}2}{0{,}30} = \mathbf{94{,}0\text{ \%}}$$

Für den Gesamtdurchschnitt von 87,0 % sind in der Abschlussklausur also exakt **94,0 %** nötig.

**Übertragung auf deutsche Ziffernnoten:** Bei einer Vornote von **2,3** ($70\text{ \%}$ Anteil) und der Zielnote **2,0** liefert dieselbe Formel bei $p = 0{,}30$:

$$G_{\text{Prüfung}} = \frac{2{,}0 - 2{,}3 \times 0{,}70}{0{,}30} = \frac{0{,}39}{0{,}30} = \mathbf{1{,}3}$$

## Häufige Fehlerquellen bei der Notenberechnung

* **Verwechselte Skalenrichtung zwischen DACH-Systemen:** In Deutschland und Österreich steht 1,0 für die Bestleistung; in der Schweiz (6,0), bei Oberstufenpunkten (15) und im Prozentsystem (100 %) ist der höchste Wert am besten. Mischen Sie niemals Skalen, und beachten Sie im deutschen System die umgekehrte Deutung: Ein Zielwert von 0,7 bedeutet nicht leichte Erreichbarkeit, sondern rechnerische Unmöglichkeit.
* **Division durch 100 % bei unvollständigen Gewichtungen:** Wer mitten im Halbjahr Teilleistungen mit zusammen 70 % Gewicht irrtümlich durch 100 teilt, berechnet einen künstlich um 30 % zu niedrigen Zwischenstand.
* **Abweichende Rundungsregeln der Prüfungsordnung:** Viele Hochschulen schneiden Modulnoten nach der ersten Nachkommastelle ab (aus 2,59 wird 2,5 statt 2,6), während Schweizer Schulen oft auf halbe oder Viertelnoten runden.
* **Übersehene Sperrklauseln in der Abschlussprüfung:** Selbst bei ausreichendem Gesamtdurchschnitt fordern viele Prüfungsordnungen zwingend ein eigenständiges Bestehen der Abschlussklausur (meist mindestens 50 % oder Note 4,0).
