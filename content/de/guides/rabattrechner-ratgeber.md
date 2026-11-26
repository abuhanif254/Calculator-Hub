---
title: "Rabattrechner: Prozentrechnung beim Einkaufen"
description: "Beherrschen Sie einfache und gestaffelte Rabatte, vermeiden Sie die Doppelrabatt-Falle, berechnen Sie Rückwärtsrabatte und vergleichen Sie reale Ersparnisse sicher."
category: "Finance"
relatedCalculator: "percent-off-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Warum sind „30 % Rabatt plus 20 % extra“ zusammen nicht 50 %?"
    answer: "Weil der zweite Rabatt nicht auf den ursprünglichen Listenpreis, sondern auf den bereits um 30 % reduzierten Zwischenpreis angewendet wird. Nach dem ersten Abzug zahlen Sie noch 70 %; davon werden 20 % abgezogen (14 Prozentpunkte), sodass der Endpreis bei 56 % liegt – der echte Gesamtrabatt beträgt 44 %."
  - question: "Wie berechne ich einen Rabatt schnell und zuverlässig im Kopf?"
    answer: "Ermitteln Sie zuerst 10 % des Ausgangspreises, indem Sie das Komma um eine Stelle nach links verschieben (10 % von 85,00 € sind 8,50 €). Multiplizieren Sie diesen Wert für 20 %, 30 % oder 40 % entsprechend mit 2, 3 oder 4. Für 5 %-Schritte halbieren Sie den 10-%-Betrag (4,25 €) und addieren oder subtrahieren ihn."
  - question: "Wie hoch ist der echte Rabatt bei „19 % Mehrwertsteuer geschenkt“-Aktionen?"
    answer: "Eine echte Steuerherausrechnung senkt den Bruttopreis nicht um 19 %, sondern um 19 / 119 = 15,97 %. Kostet ein Gerät regulär 119,00 € brutto, beträgt der Netto-Aktionspreis 100,00 € – Ihre tatsächliche Ersparnis liegt bei 19,00 € beziehungsweise knapp 16 % des Auszeichnungspreises."
  - question: "Wie ermittelt man den ursprünglichen Preis aus einem bereits reduzierten Endpreis?"
    answer: "Teilen Sie den reduzierten Preis durch (1 − Rabattsatz / 100). Wurde ein Mantel um 25 % reduziert und kostet jetzt 150,00 €, rechnen Sie 150,00 € / 0,75 = 200,00 € Originalpreis. Ein Aufschlag von 25 % auf 150,00 € würde fälschlich 187,50 € ergeben."
  - question: "Welche Schutzregeln gelten in Deutschland und Österreich bei Streichpreisen?"
    answer: "Nach § 11 der deutschen Preisangabenverordnung (PAngV) und den entsprechenden EU-Vorgaben in Österreich müssen Händler bei Preisermäßigungen grundsätzlich den niedrigsten Gesamtpreis angeben, den sie in den letzten 30 Tagen vor Beginn der Aktion verlangt haben. Künstliche Preisanhebungen kurz vor dem Sale sind unzulässig."
---

Ob Schlussverkauf, gestaffelte Gutscheinaktionen oder B2B-Preisstaffeln: Rabatte werden im Handel häufig so kombiniert, dass die tatsächliche prozentuale Ersparnis auf den ersten Blick größer wirkt, als sie rechnerisch ist. Wer die Grundgesetze der Prozentrechnung — insbesondere die **multiplikative Verkettung** von Teilrabatten — beherrscht, erkennt Scheinangebote sofort.

Unser [Rabattrechner](/de/rechner/prozentsatz-rabatt-rechner) berechnet sowohl einfache Preisnachlässe als auch kombinierte Doppelrabatte, den effektiven Gesamtrabatt in Prozent sowie die absolute Ersparnis in Euro bis auf den Cent genau.

## Mathematische Grundlagen: Einfacher vs. gestaffelter Rabatt

In der Prozentrechnung bildet stets der aktuelle Basiswert (`100 %`) den Bezugspunkt. Bei einem einfachen Preisnachlass bezieht sich der Rabatt auf den ursprünglichen Auszeichnungspreis; bei mehreren nacheinander gewährten Nachlässen ändert sich die Bezugsbasis mit jedem Schritt.

### Parameterdefinitionen

* **Originalpreis (`P_0`)**: Der Ausgangs- oder Listenpreis vor Anwendung von Preisnachlässen.
* **Einfacher Rabatt (`r_1`)**: Der erste prozentuale Preisnachlass (z. B. `30` für `30 %`).
* **Zusatzrabatt (`r_2`)**: Ein zweiter, auf den bereits reduzierten Preis angewendeter Rabatt (z. B. `15` für `15 %`).
* **Endpreis (`P_end`)**: Der tatsächlich zu zahlende Betrag nach allen Abzügen.
* **Effektiver Gesamtrabatt (`r_eff`)**: Die reale prozentuale Gesamtersparnis bezogen auf `P_0`.

### Formeln für Einzel-, Doppel- und Rückwärtsrabatte

Für einen einfachen Rabatt gilt:

```text
Ersparnis = P_0 × (r_1 / 100)
P_end     = P_0 × (1 − r_1 / 100)
```

Werden zwei Rabatte nacheinander gewährt, werden die verbleibenden Zahlungsfaktoren **multipliziert** und nicht die Rabattsätze addiert:

```text
P_end = P_0 × (1 − r_1 / 100) × (1 − r_2 / 100)
r_eff = [1 − (1 − r_1 / 100) × (1 − r_2 / 100)] × 100
```

Ausmultipliziert lässt sich der effektive Gesamtrabatt direkt über folgende Formel prüfen:

```text
r_eff = r_1 + r_2 − (r_1 × r_2 / 100)
```

Der Korrekturterm `(r_1 × r_2 / 100)` zeigt genau an, um wie viele Prozentpunkte das vermeintlich addierte Ergebnis zu hoch angesetzt wäre. Für die Rückwärtsrechnung vom bekannten Endpreis auf den Originalpreis gilt:

```text
P_0 = P_end / (1 − r_1 / 100)
```

## Schritt-für-Schritt-Rechenbeispiel

Ein Wintermantel ist regulär mit `240,00 €` ausgezeichnet. Während einer Saisonaktion gewährt der Händler `30 %` Rabatt (`r_1 = 30`). An der Kasse lösen Sie zusätzlich einen Treuegutschein über `15 %` auf bereits reduzierte Ware ein (`r_2 = 15`).

### Schritt 1: Ersten Rabatt anwenden

* **Erster Preisnachlass**: `240,00 € × 0,30 = 72,00 €`
* **Reduzierter Zwischenpreis**: `240,00 € − 72,00 € = 168,00 €` (entspricht `240,00 € × 0,70`)

### Schritt 2: Zweiten Rabatt auf den Zwischenpreis berechnen

Der Gutschein über `15 %` bezieht sich ausschließlich auf die verbliebenen `168,00 €`:

* **Zweiter Preisnachlass**: `168,00 € × 0,15 = 25,20 €`
* **Endpreis an der Kasse**: `168,00 € − 25,20 € = 142,80 €`

### Schritt 3: Reale Gesamtersparnis prüfen

* **Absolute Gesamtersparnis**: `72,00 € + 25,20 € = 97,20 €` (`240,00 € − 142,80 €`)
* **Effektiver Rabatt**: `30 + 15 − (30 × 15 / 100) = 45 − 4,5 = 40,5 %`
* **Gegenprobe**: `97,20 € / 240,00 € = 0,405 = 40,5 %`

Hätten Sie die beiden Werte naiv zu `45 %` addiert, läge Ihre Erwartung bei `132,00 €` — Sie würden an der Kasse genau `10,80 €` mehr zahlen als gedacht.

### Bonus-Check: Rückwärtsrechnung bei Preisschildern

Sehen Sie einen Artikel für `142,80 €` mit dem Hinweis „bereits um `30 %` gesenkt“, ergibt sich der frühere Ausgangspreis über `142,80 € / 0,70 = 204,00 €` — keinesfalls durch Aufschlag von `30 %` (`185,64 €`).

## Vergleichstabelle: Scheinrabatt vs. effektiver Gesamtrabatt

Die Tabelle zeigt für einen Originalpreis von `200,00 €`, wie stark addierte Werbeversprechen und reale Rabattstaffeln abweichen:

| Rabattkombination | Naive Summe | Effektiver Rabatt | Endpreis (bei 200,00 €) | Tatsächliche Ersparnis | Abweichung zur Erwartung |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 10 % + 10 % | 20,0 % | 19,0 % | 162,00 € | 38,00 € | 2,00 € teurer |
| 20 % + 10 % | 30,0 % | 28,0 % | 144,00 € | 56,00 € | 4,00 € teurer |
| 25 % + 20 % | 45,0 % | 40,0 % | 120,00 € | 80,00 € | 10,00 € teurer |
| 30 % + 20 % | 50,0 % | 44,0 % | 112,00 € | 88,00 € | 12,00 € teurer |
| 40 % + 25 % | 65,0 % | 55,0 % | 90,00 € | 110,00 € | 20,00 € teurer |
| 50 % + 50 % | 100,0 % | 75,0 % | 50,00 € | 150,00 € | 50,00 € teurer |

## Praxisnahe Anwendungsfälle, Kopfrechentricks und rechtliche Hinweise

Im Alltag sowie im Einkauf tauchen Preisnachlässe häufig in verkleideter Form auf:

* **Die „19 % MwSt geschenkt“-Aktion**: Im Einzelhandel entspricht der Erlass der deutschen Mehrwertsteuer von `19 %` einem realen Preisnachlass von `19 / 119 = 15,97 %` auf den Brutto-Auszeichnungspreis. Bei einem `1.190,00 €`-Fernseher sparen Sie exakt `190,00 €` und zahlen `1.000,00 €`.
* **Mengenrabatte wie „3 für 2“**: Drei identische Artikel zum Preis von zwei ergeben genau `33,33 %` Rabatt. Bei unterschiedlichen Einzelpreisen (z. B. `40 €`, `35 €` und `15 €`) wird meist der günstigste Artikel abgezogen — die reale Ersparnis sinkt auf `15 € / 90 € = 16,67 %`.
* **Skonto vs. Sofortrabatt**: Gewährt ein Lieferant `2 %` Skonto bei Zahlung binnen `10 Tagen` statt `30 Tagen` Nettoziel, entspricht diese Verkürzung um `20 Tage` einer effektiven Jahresrendite von über `36 %`.
* **Schnelle 10-%-Ankermethode**: Verschieben Sie das Komma um eine Stelle nach links für `10 %` und kombinieren Sie Vielfache oder Hälften. Bei `15 %` auf `80,00 €` addieren Sie `8,00 €` (`10 %`) und `4,00 €` (`5 %`) zu `12,00 €` Ersparnis (`68,00 €` Endpreis).
* **Schutz vor Mondpreisen**: Gemäß § 11 PAngV (Deutschland) und dem PrAG (Österreich) muss bei jeder beworbenen prozentualen Preisermäßigung der niedrigste Gesamtpreis der vergangenen 30 Tage als Referenz dienen; unverbindliche Herstellerpreisempfehlungen (UVP) unterliegen jedoch teils eigenen Maßstäben.
