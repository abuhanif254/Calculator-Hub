---
title: "GPA-Rechner"
metaTitle: "GPA-Rechner: US-Notendurchschnitt (4,0-Skala) berechnen"
description: "Berechnen Sie Ihren ungewichteten und gewichteten GPA auf der US-amerikanischen 4,0-Skala – inklusive Leistungspunkten (Credits) sowie Kurszuschlägen für Honors-, AP- und IB-Kurse."
metaDescription: "GPA-Rechner für High School & College: Ungewichteten und gewichteten Notendurchschnitt berechnen – mit 4,0-Tabelle, Credits und DACH-Umrechnung."
metaKeywords: "gpa rechner, grade point average berechnen, us notendurchschnitt, 4.0 skala umrechnen, gewichteter gpa, bayerische formel gpa, high school college noten"
faqs:
  - question: "Worin liegt der Unterschied zwischen ungewichtetem und gewichtetem GPA?"
    answer: "Der ungewichtete GPA bildet alle Kurse unabhängig vom Schwierigkeitsgrad einheitlich auf der Skala von 0,0 bis 4,0 ab. Der gewichtete GPA berücksichtigt zusätzlich das Leistungsniveau und addiert für anspruchsvolle Vertiefungskurse (Honors) in der Regel +0,5 Punkte sowie für Hochschulvorbereitungskurse (AP oder IB) +1,0 Punkte, wodurch Werte bis 5,0 erreichbar sind."
  - question: "Warum ergibt die Bestnote A+ auf der 4,0-Skala trotzdem nur 4,0 Punkte?"
    answer: "Im standardisierten US-amerikanischen 4,0-System ist 4,0 als ungewichtete Obergrenze festgelegt, damit Bewerberinnen und Bewerber von Schulen mit A+-Vergabe keinen systematischen Vorteil gegenüber Schulen erhalten, deren Bestnote A lautet. Punktzahlen über 4,0 entstehen im Regelfall erst über den gewichteten GPA durch Honors-, AP- oder IB-Kurse."
  - question: "Wie rechne ich deutsche, österreichische oder Schweizer Noten in den US-GPA um?"
    answer: "Für eine erste Orientierung lässt sich die umgekehrte Bayerische Formel heranziehen, wobei das Ergebnis stark davon abhängt, ob 1,0 (Note D) oder 2,0 (Note C) als Bestehensgrenze angesetzt wird. Verbindliche US-Hochschulbewerbungen erfordern jedoch häufig eine fachweise Zeugnisbewertung über anerkannte Stellen wie WES oder ECE, die auch die Schweizer 6-bis-1-Skala und das österreichische 1-bis-5-System individuell umrechnen."
  - question: "Kann ich im GPA-Rechner statt US-Credits auch europäische ECTS-Punkte eingeben?"
    answer: "Ja, solange alle eingetragenen Module derselben Einheit folgen. Da der GPA ein gewichtetes arithmetisches Mittel bildet, kürzt sich ein konstanter Umrechnungsfaktor heraus. Ein US-Semester-Credit entspricht erfahrungsgemäß etwa 1,5 bis 2,0 ECTS-Punkten; für die reine Durchschnittsquote liefert die Eingabe der originalen ECTS-Werte somit exakt denselben GPA."
  - question: "Zählt der Gewichtungsbonus bei Honors- oder AP-Kursen auch bei einer nicht bestandenen Note F?"
    answer: "Rein additive Online-Formeln schlagen den Kursbonus pauschal auf die Basisnote auf. In der praktischen Zeugniserstellung der meisten US-amerikanischen High Schools und Colleges wird der Zuschlag (+0,5 beziehungsweise +1,0) jedoch ausschließlich für bestandene Leistungen – oft erst ab Note C- oder D – gewährt, sodass ein nicht bestandenes Modul (F) bei 0,0 Punkten verbleibt."
---

## Das US-amerikanische Notensystem (GPA) präzise berechnen

Der **Grade Point Average (GPA)** ist im nordamerikanischen und internationalen Hochschulraum die zentrale Kennzahl für schulische und akademische Leistungen. Anders als die im DACH-Raum vertrauten Skalen (`1` bis `5`/`6` in Deutschland, `1` bis `5` in Österreich sowie die umgekehrte `6`-bis-`1`-Skala in der Schweiz) übersetzt das US-System Buchstabennoten von `A+` bis `F` in Dezimalpunkte zwischen `4,0` und `0,0`, wobei höhere Werte bessere Leistungen anzeigen.

Unser **GPA-Rechner** unterstützt Schülerinnen, Schüler und Studierende bei Auslandsjahren an einer US-High-School, Auslandssemestern, internationalen Hochschulbewerbungen oder Stipendienanträgen (etwa Fulbright oder DAAD). Aus Kursnoten, Leistungspunkten (*Credits*) und Kurstyp berechnet das Werkzeug sofort den **ungewichteten GPA**, den **gewichteten GPA** sowie die **Gesamt-Credits**.

## Die mathematischen Formeln für ungewichteten und gewichteten GPA

Mathematisch bildet der GPA ein **mit den Leistungspunkten gewichtetes Mittel**: Ein Hauptfach mit `4` Credits zählt doppelt so stark wie ein Seminar mit `2` Credits.

```text
1. Ungewichteter GPA (Standard-4,0-Skala):
   GPA_ungewichtet = Summe(N_k * C_k) / Summe(C_k)

2. Gewichteter GPA (mit Leistungszuschlag bis 5,0):
   GPA_gewichtet   = Summe((N_k + W_k) * C_k) / Summe(C_k)

3. Orientierende Rückrechnung aus deutschen Noten (Bayerische Formel):
   Bestehensgrenze N_min = 1,0 (Einzelkurs D):  GPA ≈ 5,0 - N_DE
   Bestehensgrenze N_min = 2,0 (Abschluss C):   GPA ≈ 4,0 - (2 / 3) * (N_DE - 1,0)
```

**Bedeutung der Variablen:**
- **`N_k`** ist der Basis-Notenpunkt des `k`-ten Kurses auf der `4,0`-Skala (`4,0` für `A+`/`A` bis `0,0` für `F`).
- **`C_k`** bezeichnet die Leistungspunkte (*Credits* oder ersatzweise einheitliche ECTS-Punkte) des Moduls; auch halbe Schritte wie `1,5` sind zulässig.
- **`W_k`** steht für den Niveauzuschlag: **`0,0`** für Regelkurse, **`+0,5`** für Vertiefungskurse (*Honors*) und **`+1,0`** für Hochschulvorbereitungskurse (*Advanced Placement / AP* sowie *IB Higher Level*).
- **`N_k × C_k`** liefert die **Qualitätspunkte** (*Quality Points*) eines einzelnen Kurses.

## Schritt-für-Schritt-Rechenbeispiel aus dem Semesteralltag

Angenommen, eine Studentin absolviert ein Semester mit fünf Modulen und insgesamt **16,0 Credits**, darunter ein Honors- und ein AP-Kurs:

1. **Analysis (Regelkurs, `4,0` Credits, Note `A` = `4,0`, Zuschlag `0,0`):**
   ungewichtet `4,0 × 4,0 = 16,00` | gewichtet `16,00`
2. **Mikroökonomie (Regelkurs, `3,0` Credits, Note `B+` = `3,3`, Zuschlag `0,0`):**
   ungewichtet `3,3 × 3,0 = 9,90` | gewichtet `9,90`
3. **Englische Literatur (Honors, `3,0` Credits, Note `A-` = `3,7`, Zuschlag `+0,5`):**
   ungewichtet `3,7 × 3,0 = 11,10` | gewichtet `4,2 × 3,0 = 12,60`
4. **Informatik (AP-Kurs, `4,0` Credits, Note `B` = `3,0`, Zuschlag `+1,0`):**
   ungewichtet `3,0 × 4,0 = 12,00` | gewichtet `4,0 × 4,0 = 16,00`
5. **Statistik-Übung (Regelkurs, `2,0` Credits, Note `C+` = `2,3`, Zuschlag `0,0`):**
   ungewichtet `2,3 × 2,0 = 4,60` | gewichtet `4,60`

Summieren und Teilen durch die Gesamt-Credits ergibt:
- **Gesamt-Credits:** `4,0 + 3,0 + 3,0 + 4,0 + 2,0 = 16,0 Credits`
- **Ungewichteter GPA:** `(16,00 + 9,90 + 11,10 + 12,00 + 4,60) / 16,0 = 53,60 / 16,0 = 3,35`
- **Gewichteter GPA:** `(16,00 + 9,90 + 12,60 + 16,00 + 4,60) / 16,0 = 59,10 / 16,0 = 3,69375`, gerundet **`3,69`**

Die anspruchsvollen Kurse heben den gewichteten GPA um **`+0,34` Punkte** an; zugleich zeigt sich das starke Gewicht des vierstündigen Informatikmoduls.

## Referenztabelle: US-Noten, 4,0-Skala und DACH-Richtwerte

Alle im Rechner verfügbaren Buchstabennoten samt Gewichtungsstufen, üblichen US-Prozentgrenzen und grober Orientierung für Deutschland (DE), Österreich (AT) und die Schweiz (CH):

| US-Note | Basis (4,0) | Honors (+0,5) | AP/IB (+1,0) | US-Prozent | Richtwert DE / AT / CH |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A+** | 4,0 | 4,5 | 5,0 | 97–100 % | 1,0 / 1 / 6,0 |
| **A** | 4,0 | 4,5 | 5,0 | 93–96 % | 1,0–1,3 / 1 / 5,75–6,0 |
| **A-** | 3,7 | 4,2 | 4,7 | 90–92 % | 1,3–1,5 / 1–2 / 5,5 |
| **B+** | 3,3 | 3,8 | 4,3 | 87–89 % | 1,7 / 2 / 5,25 |
| **B** | 3,0 | 3,5 | 4,0 | 83–86 % | 2,0 / 2 / 5,0 |
| **B-** | 2,7 | 3,2 | 3,7 | 80–82 % | 2,3 / 2–3 / 4,75 |
| **C+** | 2,3 | 2,8 | 3,3 | 77–79 % | 2,7 / 3 / 4,5 |
| **C** | 2,0 | 2,5 | 3,0 | 73–76 % | 3,0 / 3 / 4,25 |
| **C-** | 1,7 | 2,2 | 2,7 | 70–72 % | 3,3 / 3–4 / 4,0–4,25 |
| **D+** | 1,3 | 1,8 | 2,3 | 67–69 % | 3,7 / 4 / 4,0 |
| **D** | 1,0 | 1,5 | 2,0 | 60–66 % | 4,0 / 4 / 4,0 |
| **F** | 0,0 | 0,0* | 0,0* | < 60 % | 5,0 / 5 / < 4,0 |

*\*Bei nicht bestandener Note `F` verfällt der Gewichtungsbonus in der schulischen Praxis; erfassen Sie solche Kurse im Rechner daher als Regelkurs.*

## Typische Fallstricke und Praxistipps für Bewerbungen

- **Semester-GPAs niemals ungewichtet mitteln:** Für den kumulativen Gesamt-GPA über mehrere Semester dürfen einzelne Semesterwerte bei schwankenden Credit-Zahlen (etwa `12` statt `18` Credits) nicht einfach gemittelt werden. Teilen Sie stets die kumulierte Summe aller Qualitätspunkte durch alle bisher belegten Credits.
- **Sondervermerke richtig ausklammern:** Kurse mit *Pass/Fail (P/NP)*, *Audit (AU)* oder fristgerechtem Rücktritt (*Withdraw / W*) zählen regulär nicht zum GPA und bleiben im Rechner außen vor. Ein verspäteter Abbruch mit *WF (Withdraw Failing)* wird dagegen oft wie `0,0` (`F`) gewertet.
- **Gesamt-GPA und Fach-GPA getrennt prüfen:** Viele Master- und MBA-Programme in den USA bewerten zusätzlich den fachbezogenen *Major GPA* sowie die letzten `60` Semester-Credits (die letzten zwei Studienjahre). Dokumentieren Sie beide Kennzahlen separat.
- **Offizielle Anerkennung frühzeitig klären:** Eigene Umrechnungen ersetzen kein Gutachten. Prüfen Sie bei US-Bewerbungen, ob eine Zeugnisbewertung über WES oder ECE gefordert ist, und beachten Sie bei der Rückkehr nach Deutschland, Österreich oder in die Schweiz die Vorgaben von KMK-Anabin beziehungsweise Ihres Prüfungsamts.
