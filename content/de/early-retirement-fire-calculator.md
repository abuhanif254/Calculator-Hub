---
title: "FIRE-Rechner (Finanzielle Unabhängigkeit und Frührente)"
metaTitle: "FIRE-Rechner: Finanzielle Freiheit & Frührente berechnen"
description: "Ermitteln Sie Ihr benötigtes FIRE-Vermögen und berechnen Sie, wie Sparquote, reale Rendite und Entnahmerate die Jahre bis zur Frührente verkürzen."
metaDescription: "Berechnen Sie Ihre FIRE-Zielsumme mit der 3,5-%- und 4-%-Regel. Vergleichen Sie Sparquote, reale Rendite, Steuern und Jahre bis zur Frührente."
metaKeywords: "FIRE Rechner, finanzielle Unabhängigkeit berechnen, Frührente Rechner, 4 Prozent Regel, 3,5 Prozent Entnahmerate, Sparquote FIRE, Barista FIRE Deutschland, Coast FIRE"
faqs:
  - question: "Reicht die klassische 4-%-Regel auch für eine 45-jährige Frührente im DACH-Raum?"
    answer: "Die 4-%-Regel aus der Trinity-Studie wurde für 30 Jahre Ruhestand auf Basis US-amerikanischer Bruttorenditen ohne Abgeltungsteuer entwickelt. Wer bereits mit 45 in Rente geht und 40 bis 50 Jahre vom Depot leben will, kalkuliert im DACH-Raum mit einer konservativeren Entnahmerate von 3,25 % bis 3,5 % (Faktor 28,6 bis 30,8), um Inflation, Renditereihenfolge-Risiko und Kapitalertragsteuern zuverlässig abzupuffern."
  - question: "Wie wirken sich Abgeltungsteuer, Vorabpauschale und Grundfreibetrag im Privatier-Status aus?"
    answer: "In Deutschland unterliegen realisierte Gewinne aus Aktien-ETFs dank 30 % Teilfreistellung effektiv 18,46 % Abgeltungsteuer (inkl. Solidaritätszuschlag, ohne Kirchensteuer), wobei stets nur der Gewinnanteil verkaufter Anteile besteuert wird. Ohne weiteres Arbeitseinkommen greift zudem die Günstigerprüfung: Bis zum Grundfreibetrag von 12.348 € (2026 für Alleinstehende) plus 1.000 € Sparer-Pauschbetrag fallen oft kaum Steuern an. Bei thesaurierenden ETFs ist jedoch die jährliche Vorabpauschale (Basiszins 2026: 3,20 %) als Liquiditätsabfluss einzuplanen."
  - question: "Warum ist Barista FIRE mit einem Midijob in Deutschland besonders attraktiv?"
    answer: "Als freiwillig gesetzlich versicherter Privatier ohne Erwerbseinkommen bemisst die Krankenkasse die Beiträge nach sämtlichen Kapitalerträgen bis zur Beitragsbemessungsgrenze. Ein sozialversicherungspflichtiger Teilzeitjob knapp oberhalb der 2026er Minijob-Grenze von 603 € monatlich (Übergangsbereich/Midijob) senkt die Kranken- und Pflegeversicherungsbeiträge erheblich, entlastet das Depot und lässt Kapitalerträge beitragsfrei."
  - question: "Sollte die selbstgenutzte Immobilie in das FIRE-Zielkapital eingerechnet werden?"
    answer: "Nein. Eine abbezahlte Eigentumswohnung oder ein Eigenheim erzeugt keinen freien Cashflow, aus dem laufende Lebenshaltungskosten bezahlt werden können. Sie wirkt jedoch indirekt als starker Hebel: Da die Kaltmiete entfällt, sinken Ihre jährlichen Fixkosten im Ruhestand – und damit schrumpft die erforderliche FIRE-Zielsumme um das 25- bis 28,6-Fache der eingesparten Jahresmiete."
  - question: "Welche steuerlichen Unterschiede bestehen bei FIRE zwischen Deutschland, Österreich und der Schweiz?"
    answer: "Während Deutschland Aktien-ETFs mit 30 % Teilfreistellung und rund 18,46 % effektiver Abgeltungsteuer (bzw. Günstigerprüfung) belastet, erhebt Österreich pauschal 27,5 % Kapitalertragsteuer (KESt) ohne Teilfreistellung. In der Schweiz sind private Kursgewinne grundsätzlich steuerfrei, dafür werden Dividenden regulär als Einkommen besteuert und das gesamte Depot unterliegt der jährlichen kantonalen Vermögenssteuer."
---

Klassische Ruhestandsplanung rechnet rückwärts ab dem Rentenalter von 65 oder 67 Jahren. Das **FIRE-Konzept** (finanzielle Unabhängigkeit und früher Ruhestand) dreht diese Perspektive um: Freiheit ist kein Kalenderdatum, sondern eine berechenbare Vermögensschwelle, ab der Ihr investiertes Depot dauerhaft Ihre laufenden Lebenshaltungskosten deckt.

Zwei Stellschrauben dominieren diesen Zeitplan weit stärker als die Suche nach Einzelaktien: Ihre **Sparquote** (der investierte Anteil Ihres Nettoeinkommens) und Ihre **sichere Entnahmerate** (`w`). Jeder dauerhaft eingesparte Betrag von `400 €` monatlich (`4.800 €/Jahr`) wirkt doppelt – er fließt zusätzlich ins Depot und senkt zugleich das benötigte Zielkapital um **`120.000 €` bis `137.140 €`**.

## Von der Sparquote zur Zielsumme: Die Mathematik hinter FIRE

Die Berechnung der finanziellen Freiheit verbindet eine **Vermögenszielgleichung** mit der **monatlichen Zinseszinsformel**. Zuerst bestimmen Sie das Zieldepot aus Ihren jährlichen Ausgaben im Ruhestand (`A`) und der gewählten Entnahmerate (`w`):

```text
FIRE-Zielkapital = Jährliche Ausgaben (A) / Sichere Entnahmerate (w)
  Bei 4,0 % Entnahmerate (30-Jahre-Horizont):      A × 25,00
  Bei 3,5 % Entnahmerate (40–50 Jahre Horizont):   A × 28,57
  Bei 3,0 % Entnahmerate (sehr konservativ):       A × 33,33
```

Anschließend projiziert der Rechner, wie Ihr Startkapital (`K₀`) samt monatlicher Sparrate (`R`) über `t` Ansparjahre (`N = 12 × t` Monate) bei monatlichem Renditefaktor `i = r / 12` wächst:

```text
K_n = K₀ × (1 + i)^N + R × [ ((1 + i)^N - 1) / i ]
```

- **`K₀` (Startkapital):** Liquide angelegtes Vermögen in Aktien-ETFs, Anleihen und Rücklagen – ohne den Wert selbstgenutzter Immobilien.
- **`R` (Monatliche Sparrate):** Laufend investiertes Kapital inklusive frei verfügbarer Arbeitgeberzuschüsse.
- **`r` (Jährliche Rendite):** Wahlweise **nominal** (`7,0 % bis 8,0 % p. a.` für Welt-Aktien-ETFs) oder **real nach Inflation** (`4,5 % bis 5,5 % p. a.`), damit Ihr Endkapital direkt in heutiger Kaufkraft lesbar bleibt.
- **`t` (Anspardauer):** Jahre bis zum angestrebten Ausstieg.

Bei `0 €` Startkapital bestimmt allein die Sparquote `s` die Zeit bis FIRE: `t = ln(1 + (r / w) × (1 - s) / s) / ln(1 + r)`. Bei `5,0 %` realer Rendite und `3,5 %` Entnahmerate dauert es mit `15 %` Sparquote **45,2 Jahre**, mit `30 %` **30,1 Jahre**, mit `50 %` **18,2 Jahre** und mit `65 %` nur noch **11,7 Jahre**.

## Rechenbeispiel: Mit 32 Jahren starten und mit 48 finanziell frei sein

Eine 32-jährige Angestellte beginnt mit **`80.000 €`** im Welt-Aktien-ETF und investiert **`2.000 €` pro Monat** (`24.000 €/Jahr`) über **`16 Jahre`** (`192 Monate`) bis zum 48. Lebensjahr. Insgesamt fließen `464.000 €` eigenes Geld ins Depot (`80.000 € + 192 × 2.000 €`).

**1. Nominale Rechnung (`r = 7,5 % p. a.`, `i = 0,075 / 12 = 0,00625`):**

1. Wachstum Startkapital: `80.000 € × (1,00625)^192 = 264.619,30 €`
2. Wachstum Sparraten: `2.000 € × [((1,00625)^192 - 1) / 0,00625] = 738.477,20 €`
3. **Nominales Endkapital mit 48:** **`1.003.096,50 €`** (davon `539.096,50 €` Wertzuwachs)
4. **Bruttoentnahme Jahr 1:** **`40.123,86 €/Jahr`** (`3.343,66 €/Monat`) bei `4,0 %` oder **`35.108,38 €/Jahr`** (`2.925,70 €/Monat`) bei `3,5 %`.

**2. Realer Kaufkraft-Check (`r_real = 5,0 % p. a.` bei 2,5 % Inflation, `i = 0,0041667`):**

Nach 16 Jahren Inflation zählt die reale Kaufkraft in **heutigen Euro (2026)**:

- Reales Startkapital: `177.747,60 €` | Reale Sparraten: `586.485,62 €`
- **Reales Endkapital mit 48:** **`764.233,22 €`** – trägt **`30.569,33 €/Jahr`** (`2.547,44 €/Monat`) bei `4,0 %` bzw. **`26.748,16 €/Jahr`** (`2.229,01 €/Monat`) bei `3,5 %`.

Dieser Parallelvergleich verhindert den häufigsten Denkfehler, künftige Nominalbeträge gegen heutige Mieten und Lebenshaltungskosten zu rechnen.

## Die fünf FIRE-Modelle im DACH-Vergleich

Die Übersicht vergleicht die fünf gängigen Ausprägungen in heutiger Kaufkraft (2026):

| FIRE-Variante | Jährliches Ausgabenbudget | Ziel bei 4,0 % (25×) | Ziel bei 3,5 % (28,6×) | Typische Umsetzung im DACH-Raum |
| :--- | :--- | :--- | :--- | :--- |
| **Lean FIRE** | 24.000 € – 30.000 € | 600.000 € – 750.000 € | 685.700 € – 857.100 € | Sparsamer Lebensstil, abbezahlte Wohnung oder günstige Region |
| **Regular FIRE** | 36.000 € – 48.000 € | 900.000 € – 1.200.000 € | 1.028.600 € – 1.371.400 € | Mittelschicht-Standard, komplett aus Welt-ETFs finanziert |
| **Barista FIRE** | 36.000 € (12.000 € Teilzeit) | 600.000 € (24.000 € Lücke) | 685.700 € (24.000 € Lücke) | Midijob deckt GKV-Beiträge und schont das Entnahmedepot |
| **Coast FIRE** | Variabel (Ziel ab 65) | Früher Grundstock | Früher Grundstock | Z. B. 208.240 € mit 35 wachsen bei 5 % real bis 65 ohne Sparrate auf 900.000 € |
| **Fat FIRE** | 72.000 € – 120.000 €+ | 1.800.000 € – 3.000.000 €+ | 2.057.100 € – 3.428.600 €+ | Hohes Doppel- oder Unternehmereinkommen, volle PKV- & Reise-Puffer |

## Vier DACH-Stolpersteine, die US-FIRE-Modelle ausblenden

### Krankenversicherung als Privatier einplanen
Wer in Deutschland ohne Erwerbseinkommen freiwillig gesetzlich versichert bleibt, zahlt Krankenkassen- und Pflegebeiträge auf Zinsen, Dividenden und realisierte Kursgewinne bis zur Beitragsbemessungsgrenze. Ein Teilzeit- oder Midijob ab **`603,01 €`** monatlich (2026) stellt die Pflichtversicherung her, senkt die GKV-Last durch den Arbeitgeberanteil drastisch und lässt Kapitalerträge beitragsfrei. Privat Versicherte müssen den steigenden Volltarif fest ins Jahresbudget aufnehmen.

### Abgeltungsteuer, Günstigerprüfung und Länderunterschiede
Beim ETF-Verkauf in Deutschland wird ausschließlich der enthaltene Gewinnanteil besteuert (dank `30 %` Teilfreistellung effektiv `18,46 %` inkl. Soli). Ohne Lohneinkommen drückt die **Günstigerprüfung** samt Grundfreibetrag (`12.348 €` Ledige / `24.696 €` Ehepaare 2026) die Steuerlast oft unter 10 %; einzuplanen bleibt die Vorabpauschale (Basiszins 2026: `3,20 %`). Österreich erhebt pauschal `27,5 %` KESt, während die Schweiz private Kursgewinne steuerfrei stellt, aber kantonale Vermögenssteuer verlangt.

### Renditereihenfolge-Risiko über 40+ Jahre abfedern
Ein Börseneinbruch von `35 %` in den ersten Ruhestandsjahren zerstört starre Entnahmepläne, weil Anteile zu Tiefstkursen verkauft werden müssen. Ein **Cash- und Anleihenpuffer über zwei bis drei Jahresausgaben** sowie flexible Entnahmekorridore (Verzicht auf Inflationsausgleich nach Verlustjahren) sichern das Depot.

### Gesetzliche Rente (GRV, Pensionskonto, AHV) als Sicherheitsnetz nutzen
Rechnen Sie spätere Rentenansprüche nicht ins Startdepot mit 45 ein, sondern behandeln Sie GRV, österreichisches Pensionskonto oder Schweizer AHV als wertvolle Entlastung für die zweite Ruhestandsphase ab 65 bis 67 Jahren.
