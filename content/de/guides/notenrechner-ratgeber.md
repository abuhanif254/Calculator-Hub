---
title: "So berechnen Sie Ihre Endnote: Gewichtete Durchschnitte erklärt"
description: "Erfahren Sie, wie Notensysteme funktionieren, die Mathematik hinter dem Notendurchschnitt und nutzen Sie unseren Notenrechner."
category: "Math & Science"
relatedCalculator: "grade-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen einem einfachen und einem gewichteten Notendurchschnitt?"
    answer: "Beim einfachen arithmetischen Mittel zählt jede Teilleistung exakt gleich stark, unabhängig von ihrem Umfang. Beim gewichteten Durchschnitt fließt jede Note multipliziert mit ihrem Prozentanteil oder ihren ECTS-Leistungspunkten in die Gesamtbewertung ein, sodass eine 40-%-Abschlussprüfung oder ein 10-ECTS-Modul entsprechend stärker wirkt als ein kleines Referat."
  - question: "Wie berechne ich die benötigte Punktzahl in der Abschlussprüfung für meine Zielnote?"
    answer: "Multiplizieren Sie alle bisherigen Teilleistungen mit ihren jeweiligen Gewichtungen und addieren Sie diese zur bisherigen gewichteten Summe. Ziehen Sie diese Summe von Ihrer angestrebten Gesamtnote ab und teilen Sie die Differenz durch das Gewicht der Abschlussprüfung: Benötigte Prüfungspunktzahl = (Zielnote − Bisherige Summe) / Prüfungsgewicht."
  - question: "Wie berechnet sich der gewichtete Notenschnitt im deutschen oder österreichischen ECTS-System?"
    answer: "Im Studium mit Leistungspunkten nach dem European Credit Transfer and Accumulation System (ECTS) wird jede benotete Modulnote mit der zugehörigen Anzahl an ECTS-Credits multipliziert. Die Summe dieser Produkte teilt man anschließend durch die Gesamtzahl aller benoteten ECTS-Credits (unbenotete Module mit dem Vermerk ‚bestanden‘ bleiben unberücksichtigt)."
  - question: "Was bedeutet es, wenn der Rechner eine benötigte Punktzahl von über 100 % ausgibt?"
    answer: "Ein Ergebnis über 100 % bedeutet, dass die gewünschte Zielnote allein mit der regulären Abschlussprüfung rechnerisch nicht mehr erreichbar ist – selbst bei voller Punktzahl. In diesem Fall lohnt sich der Blick in die Modul- oder Prüfungsordnung, ob optionale Bonuspunkte aus Übungen angerechnet werden oder welche nächsttiefere Notenstufe realistisch bleibt."
  - question: "Werden Gesamtnote und Modulnoten im Zeugnis kaufmännisch gerundet?"
    answer: "Nein, viele deutsche und österreichische Prüfungsordnungen schneiden den Gesamtdurchschnitt nach der ersten Dezimalstelle ohne Aufrundung ab (Trunkierung): Aus einem rechnerischen Schnitt von 1,59 wird beispielsweise die Gesamtnote 1,5 und nicht 1,6. Prüfen Sie stets die für Ihren Studiengang oder Ihr Bundesland gültige Rundungsregelung."
---

Eine Endnote entsteht in Schule, Ausbildung und Hochschule selten aus einem einfachen Mittelwert aller Einzelleistungen, sondern fast immer als **gewichteter Durchschnitt**. Dabei erhält jede Prüfungsform – etwa Übungsaufgaben, Laborpraktika, Zwischenklausuren oder die Abschlussprüfung – ein festgelegtes Prozentgewicht (`g_i`) oder eine bestimmte Anzahl an Leistungspunkten (`ECTS`). Für die laufende Planung gilt: Multiplizieren Sie jede erbrachte Leistung mit ihrem Gewicht, summieren Sie die Teilprodukte und teilen Sie durch die Summe der bisher vergebenen Gewichte.

Besonders wertvoll wird diese Rechnung vor der letzten großen Prüfung: Mithilfe einer einfachen Zielwert-Gleichung ermitteln Sie exakt, welche Punktzahl Sie noch erreichen müssen, um ein bestimmtes Gesamtergebnis zu sichern. Unser [Notenrechner](/de/rechner/notenrechner) berechnet sowohl Ihren aktuellen Leistungsstand als auch das erforderliche Prüfungsergebnis auf einen Blick.

## Mathematisches Prinzip des gewichteten Notendurchschnitts

Liegen alle Teilleistungen `L_1, L_2, …, L_n` als Prozentwerte, Punkte oder numerische Noten zusammen mit ihren Gewichtungen `g_1, g_2, …, g_n` vor, lautet die allgemeine Formel für den gewichteten Durchschnitt:

```text
Gewichteter Durchschnitt = (L₁ × g₁ + L₂ × g₂ + … + Lₙ × gₙ) / (g₁ + g₂ + … + gₙ)
```

Sobald die Gewichtungen als Dezimalanteile vorliegen, die sich exakt zu `1,00` (`100 %`) ergänzen, vereinfacht sich die Rechnung zur direkten gewichteten Summe ohne anschließende Division:

```text
Endnote (bei Σ gᵢ = 1,00) = (L₁ × g₁) + (L₂ × g₂) + … + (Lₙ × gₙ)
```

### Besonderheiten der Notenskalen im DACH-Raum

Während viele Online-Kurse und internationale Programme direkt mit `0–100 %` arbeiten, gelten im deutschsprachigen Raum je nach Bildungsstufe unterschiedliche Skalen:

- **Deutschland (Hochschule & Sekundarstufe I):** `1,0` (sehr gut) bis `4,0` (ausreichend, bestanden) und `5,0` (nicht ausreichend). Im Studium gewichtet man jede Modulnote mit ihren **ECTS-Credits** (z. B. `5`, `6` oder `10` Credits).
- **Deutschland (Gymnasiale Oberstufe):** `15` Punkte (`1+`) bis `0` Punkte (`6`), wobei ab `5` Punkten (`4`) eine Leistung als regulär bestanden gilt.
- **Österreich:** Fünfstufige Skala von `1` (Sehr gut) bis `5` (Nicht genügend); an Hochschulen ebenfalls ECTS-gewichtet.
- **Schweiz:** Aufsteigende Skala von `1,0` bis `6,0`, wobei `6,0` die Bestnote und `4,0` die Bestehensgrenze darstellt.

Unabhängig von der Skala bleibt die zugrunde liegende Gewichtungsmathematik identisch – entscheidend ist lediglich, dass alle Teilleistungen in derselben Einheit eingegeben werden.

## Schritt-für-Schritt-Beispiel: Zwischenstand und Zielnote berechnen

Angenommen, die Gesamtbewertung eines Moduls setzt sich wie folgt zusammen: Übungsblätter `15 %` (`0,15`), Laborpraktikum `25 %` (`0,25`), Zwischenklausur `20 %` (`0,20`) und Abschlussprüfung `40 %` (`0,40`). Vor der Abschlussprüfung haben Sie folgende Ergebnisse erzielt:

1. **Übungsblätter (`15 %`):** `88 %` erreicht → `88 × 0,15 = 13,20` gewichtete Punkte.
2. **Laborpraktikum (`25 %`):** `80 %` erreicht → `80 × 0,25 = 20,00` gewichtete Punkte.
3. **Zwischenklausur (`20 %`):** `74 %` erreicht → `74 × 0,20 = 14,80` gewichtete Punkte.

### Aktuellen Zwischenstand ermitteln

Die bisherige gewichtete Summe beträgt `13,20 + 20,00 + 14,80 = 48,00` Prozentpunkte. Da diese Leistungen zusammen `15 % + 25 % + 20 % = 60 %` (`0,60`) der Gesamtnote ausmachen, liegt Ihr aktueller Leistungsdurchschnitt nicht bei `48 %`, sondern bei:

`Aktueller Schnitt = 48,00 / 0,60 = 80,00 %`

### Zielwert für die Abschlussprüfung berechnen

Um die erforderliche Punktzahl `P_Prüfung` für eine gewünschte Endnote `Z` zu bestimmen, wird die Gesamtformel nach der offenen Prüfungsleistung umgestellt:

```text
Benötigte Punktzahl = (Zielnote − Bisherige gewichtete Summe) / Prüfungsgewicht
```

- **Szenario A (Ziel `85 %`):** `(85,00 − 48,00) / 0,40 = 37,00 / 0,40 = 92,50 %`. Sie benötigen in der Abschlussprüfung mindestens `92,5 %`, was anspruchsvoll, aber regulär erreichbar ist.
- **Szenario B (Ziel `90 %`):** `(90,00 − 48,00) / 0,40 = 42,00 / 0,40 = 105,00 %`. Selbst mit einer fehlerfreien `100-%`-Klausur lassen sich ohne Bonuspunkte maximal `48,00 + 40,00 = 88,00 %` erzielen.

## Szenario-Tabelle: Einfluss der Abschlussprüfung auf die Gesamtnote

Ausgehend vom obigen Zwischenstand (`48,00` gewichtete Punkte aus `60 %` Vorleistung) zeigt die Tabelle, wie sich verschiedene Ergebnisse in der `40-%`-Abschlussprüfung auswirken:

| Ergebnis Abschlussprüfung (`40 %`) | Beitrag zur Gesamtnote | Gesamtpunktzahl | Typische DE-Notenstufe | Einordnung |
| :--- | :--- | :--- | :--- | :--- |
| `40,0 %` | `16,00 Punkte` | `64,00 %` | `3,3` (befriedigend) | Bestanden, sofern kein Prüfungsminimum greift |
| `55,0 %` | `22,00 Punkte` | `70,00 %` | `2,7–3,0` (befriedigend) | Solides Ergebnis im Mittelfeld |
| `70,0 %` | `28,00 Punkte` | `76,00 %` | `2,3` (gut) | Sicheres Erreichen einer guten Note |
| `80,0 %` | `32,00 Punkte` | `80,00 %` | `2,0` (gut) | Bisherigen Schnitt exakt gehalten |
| `92,5 %` | `37,00 Punkte` | `85,00 %` | `1,7` (gut) | Zielmarke `85 %` punktgenau erreicht |
| `100,0 %` | `40,00 Punkte` | `88,00 %` | `1,3` (sehr gut) | Rechnerisches Maximum des Moduls |

## Prüfungsordnungen, Bestehenshürden und typische Rechenfehler

Bei der Anwendung auf reale Zeugnisse und Modulhandbücher sollten Sie vier rechtliche und rechnerische Details im Blick behalten:

1. **Verbindliche Mindestpunktzahlen (Bestehensklauseln):** Viele Prüfungsordnungen schreiben vor, dass auch die Abschlussprüfung selbst mit mindestens `50 %` (bzw. Note `4,0`) bestanden werden muss. Im obigen Beispiel mit `40,0 %` Prüfungsergebnis läge der gewichtete Gesamtschnitt zwar rechnerisch bei `64,00 %`, das Modul gälte wegen der nicht erreichten Mindestleistung in der Klausur aber dennoch als nicht bestanden.
2. **Division durch `100 %` statt durch bisheriges Gewicht:** Ein verbreiteter Denkfehler während des laufenden Semesters besteht darin, die Zwischensumme (`48,00`) direkt als aktuelle Gesamtnote zu interpretieren. Teilen Sie laufende Zwischenstände immer durch die Summe der bereits abgeschlossenen Gewichte (`0,60`).
3. **Unbenotete Studienleistungen:** Lehrveranstaltungen oder Praktika mit der Bewertung „bestanden / nicht bestanden“ erhalten im [Notenrechner](/de/rechner/notenrechner) das Gewicht `0`, damit sie den gewichteten Gesamtschnitt nicht verzerren.
4. **Abweichende Gewichtung der Abschlussarbeit:** An zahlreichen Universitäten zählen Bachelor- oder Masterarbeiten sowie Abschlusskolloquien überproportional, häufig mit dem Faktor `1,5` oder `2,0` gegenüber ihren regulären ECTS-Credits. Zudem werden Gesamtnoten im Abschlusszeugnis vieler Hochschulen nach der ersten Nachkommastelle ohne Aufrunden abgeschnitten. Prüfen Sie daher die konkrete Berechnungsformel in Ihrer geltenden Prüfungsordnung, bevor Sie Ihren finalen Gesamtschnitt prognostizieren.
