---
title: "Stundenrechner"
metaTitle: "Stundenrechner | Arbeitszeit & Industriezeit berechnen"
description: "Berechnen Sie Ihre Gesamtarbeitszeit anhand Ihrer Start-, Endzeit und Pausenzeiten. Direkte Umrechnung in Dezimalstunden für die Lohnabrechnung."
metaDescription: "Kostenloser Stundenrechner für Arbeitszeiten. Berechnen Sie Schichten, ziehen Sie Pausen ab und konvertieren Sie in Dezimalstunden (Industriestunden)."
metaKeywords: "stundenrechner, arbeitszeit berechnen, dezimalstunden rechner, industriestunden, arbeitszeit rechner, stundenzettel, industrieminuten umrechnen"
faqs:
  - question: "Was ist der Unterschied zwischen Normalzeit (Uhrzeit) und Industriestunden (Dezimalzeit)?"
    answer: "Die normale Uhrzeit basiert auf dem Sexagesimalsystem (Basis 60), bei dem eine Stunde genau 60 Minuten umfasst. Industriestunden (Dezimalstunden) teilen die Stunde hingegen in 100 sogenannte Industrieminuten (Basis 10). Dadurch entsprechen 15 Echtzeit-Minuten exakt 0,25 Industriestunden (25 Industrieminuten) und 30 Echtzeit-Minuten 0,50 Industriestunden. Lohnabrechnungssysteme wie DATEV oder SAP benötigen zwingend Dezimalstunden, um Arbeitszeiten direkt mit dem Stundenlohn multiplizieren zu können."
  - question: "Welche gesetzlichen Pausenzeiten schreiben die Arbeitszeitgesetze in Deutschland, Österreich und der Schweiz vor?"
    answer: "In Deutschland (§ 4 ArbZG) sind ab einer Arbeitszeit von mehr als 6 Stunden mindestens 30 Minuten Pause und bei mehr als 9 Stunden mindestens 45 Minuten Pause vorgeschrieben. In Österreich (§ 11 AZG) gilt bei mehr als 6 Stunden Tagesarbeitszeit eine Mindestpause von 30 Minuten. In der Schweiz (Art. 15 ArG) sind die Pausen feiner gestaffelt: mindestens 15 Minuten bei mehr als 5,5 Stunden, 30 Minuten bei mehr als 7 Stunden und 60 Minuten bei mehr als 9 Stunden Arbeitszeit."
  - question: "Wie werden Nachtschichten über Mitternacht hinweg korrekt berechnet?"
    answer: "Bei einer Schicht über die Mitternachtsgrenze (z. B. von 22:15 Uhr bis 06:30 Uhr) liegt der Endzeitpunkt numerisch vor dem Startzeitpunkt. Mathematisch wird zunächst die Restzeit des ersten Kalendertages bis 24:00 Uhr ermittelt (1 Stunde und 45 Minuten) und anschließend die Arbeitszeit des Folgetages ab 00:00 Uhr (6 Stunden und 30 Minuten) addiert, bevor die Pausenzeit abgezogen wird."
  - question: "Wie rechnet man Industrieminuten (Dezimalstunden) wieder in normale Minuten um?"
    answer: "Um die Nachkommastellen einer Dezimalstunde wieder in reguläre Uhrzeit-Minuten umzurechnen, multiplizieren Sie den Dezimalanteil mit 60. Bei einem Wert von 7,65 Industriestunden rechnen Sie 0,65 × 60 = 39 Echtzeit-Minuten. Das Ergebnis lautet somit 7 Stunden und 39 Minuten (07:39 h)."
  - question: "Wie wird das monatliche Durchschnittsgehalt aus Wochenstunden und Stundenlohn berechnet?"
    answer: "Da ein Kalendermonat außer im Februar nicht exakt vier Wochen hat, rechnen Lohnbüros im DACH-Raum mit dem Durchschnittsfaktor von 4,3333 Wochen pro Monat (52 Wochen geteilt durch 12 Monate) oder präziser mit 4,348 Wochen (365,25 Tage geteilt durch 7 Tage und 12 Monate). Bei einer 40-Stunden-Woche ergeben sich so durchschnittlich 173,33 Monatsstunden."
---

## Präzise Arbeitszeiterfassung und Umrechnung in Dezimalstunden (Industriezeit)

Eine fehlerfreie Arbeitszeiterfassung ist für Arbeitnehmer, Arbeitgeber, Freiberufler und Personalabteilungen gleichermaßen unverzichtbar. Spätestens seit dem Grundsatzbeschluss des Bundesarbeitsgerichts (BAG) zur verpflichtenden Arbeitszeiterfassung sowie den strengen gesetzlichen Vorgaben im gesamten DACH-Raum muss jede geleistete Arbeitsstunde samt Ruhepausen nachvollziehbar dokumentiert werden.

Die häufigste Fehlerquelle im Arbeitsalltag entsteht durch das Aufeinandertreffen zweier unterschiedlicher Zahlensysteme:
* **Das Sexagesimalsystem (Basis 60) der Uhrzeit:** Unsere Uhren teilen eine Stunde ($1\text{ h}$) in $60\text{ Minuten}$ ($\text{min}$) und $3.600\text{ Sekunden}$ ($\text{s}$).
* **Das Dezimalsystem (Basis 10) der Finanz- und Lohnbuchhaltung:** Währungen wie Euro ($\text{€}$) und Schweizer Franken ($\text{CHF}$) sowie Abrechnungssysteme (z. B. DATEV, SAP HCM, Lexware oder BMD) rechnen ausschließlich im Zehnersystem.

Wer eine Arbeitszeit von 7 Stunden und 45 Minuten (`07:45`) versehentlich als `7,45` in die Lohnabrechnung oder Kundenrechnung überträgt, verliert bei jedem Eintrag fast eine drittel Arbeitsstunde, da 45 Minuten einem Dreiviertel einer Stunde entsprechen und somit zwingend als **$7{,}75\text{ Dezimalstunden}$** (Industriestunden) angesetzt werden müssen.

## Die mathematischen Formeln zur Arbeitszeit- und Lohnberechnung

### 1. Nettoarbeitszeit aus Startzeit, Endzeit und Pause

Zunächst werden Startzeitpunkt $t_{\text{Start}}$ und Endzeitpunkt $t_{\text{Ende}}$ in Minuten seit Tagesbeginn (`00:00 Uhr`) umgewandelt. Für eine Tagschicht innerhalb desselben Kalendertages ($t_{\text{Ende}} \ge t_{\text{Start}}$) gilt:

$$T_{\text{netto, min}} = (t_{\text{Ende}} - t_{\text{Start}}) - P_{\text{min}}$$

Überschreitet eine Nachtschicht die Mitternachtsgrenze ($t_{\text{Ende}} < t_{\text{Start}}$), wird ein voller Kalendertag ($24\text{ h} = 1.440\text{ min}$) addiert:

$$T_{\text{netto, min}} = (1.440\text{ min} - t_{\text{Start}} + t_{\text{Ende}}) - P_{\text{min}}$$

### 2. Umrechnung von Stunden und Minuten in Dezimalstunden

Aus den ganzzahligen Arbeitsstunden $H$ und den verbleibenden Echtzeit-Minuten $M$ berechnet sich der Dezimalstundenwert $H_{\text{dez}}$ nach der Formel:

$$H_{\text{dez}} = H + \frac{M}{60} = \frac{T_{\text{netto, min}}}{60}$$

Die Nachkommastellen von $H_{\text{dez}}$ multipliziert mit $100$ ergeben die **Industrieminuten** ($M_{\text{ind}} = \frac{M}{60} \cdot 100$).

### 3. Ermittlung des Bruttoarbeitslohns

Sobald die Nettoarbeitszeit in Dezimalstunden vorliegt, ergibt sich der Bruttoverdienst $L_{\text{brutto}}$ durch direkte Multiplikation mit dem Bruttostundenlohn $s_{\text{brutto}}$ (in $\text{€/h}$ bzw. $\text{CHF/h}$):

$$L_{\text{brutto}} = H_{\text{dez}} \cdot s_{\text{brutto}}$$

## Umrechnungstabelle: Echtzeit-Minuten in Dezimalstunden (Industrieminuten)

In der betrieblichen Zeiterfassung wird häufig im 6-Minuten-Takt ($0{,}10\text{ h}$) oder im 15-Minuten-Takt ($0{,}25\text{ h}$) abgerechnet. Die folgende Referenztabelle zeigt die wichtigsten Umrechnungswerte:

| Echtzeit-Minuten ($M$) | Uhrzeit (`HH:MM`) | Dezimalstunden ($H_{\text{dez}}$) | Industrieminuten ($M_{\text{ind}}$) | Stundenbruchteil |
| :--- | :--- | :--- | :--- | :--- |
| **6 min** | `00:06` | $0{,}10\text{ h}$ | $10\text{ Ind.-Min.}$ | $1/10\text{ h}$ |
| **10 min** | `00:10` | $0{,}17\text{ h}$ | $16{,}67\text{ Ind.-Min.}$ | $1/6\text{ h}$ |
| **12 min** | `00:12` | $0{,}20\text{ h}$ | $20\text{ Ind.-Min.}$ | $1/5\text{ h}$ |
| **15 min** | `00:15` | $0{,}25\text{ h}$ | $25\text{ Ind.-Min.}$ | $1/4\text{ h}$ |
| **20 min** | `00:20` | $0{,}33\text{ h}$ | $33{,}33\text{ Ind.-Min.}$ | $1/3\text{ h}$ |
| **30 min** | `00:30` | $0{,}50\text{ h}$ | $50\text{ Ind.-Min.}$ | $1/2\text{ h}$ |
| **36 min** | `00:36` | $0{,}60\text{ h}$ | $60\text{ Ind.-Min.}$ | $3/5\text{ h}$ |
| **40 min** | `00:40` | $0{,}67\text{ h}$ | $66{,}67\text{ Ind.-Min.}$ | $2/3\text{ h}$ |
| **45 min** | `00:45` | $0{,}75\text{ h}$ | $75\text{ Ind.-Min.}$ | $3/4\text{ h}$ |
| **48 min** | `00:48` | $0{,}80\text{ h}$ | $80\text{ Ind.-Min.}$ | $4/5\text{ h}$ |
| **60 min** | `01:00` | $1{,}00\text{ h}$ | $100\text{ Ind.-Min.}$ | $1\text{ h}$ |

## Gesetzliche Ruhepausen im DACH-Raum im Überblick

Ruhepausen zählen arbeitsrechtlich grundsätzlich nicht zur vergütungspflichtigen Arbeitszeit und müssen von der Anwesenheitszeit abgezogen werden:

* **Deutschland (§ 4 Arbeitszeitgesetz – ArbZG):** Bei einer täglichen Arbeitszeit von **mehr als 6 bis zu 9 Stunden** müssen mindestens **30 Minuten** ($0{,}50\text{ h}$) Pause eingelegt werden. Bei **mehr als 9 Stunden** erhöht sich die Pflichtpause auf mindestens **45 Minuten** ($0{,}75\text{ h}$). Die Pausen dürfen in Abschnitte von jeweils mindestens 15 Minuten aufgeteilt werden.
* **Österreich (§ 11 Arbeitszeitgesetz – AZG):** Beträgt die Gesamtdauer der Tagesarbeitszeit **mehr als 6 Stunden**, ist die Arbeitszeit durch eine Ruhepause von mindestens **30 Minuten** ($0{,}50\text{ h}$) zu unterbrechen.
* **Schweiz (Art. 15 Arbeitsgesetz – ArG):** Vorgeschrieben sind Pausen von mindestens **15 Minuten** bei mehr als $5{,}5\text{ Stunden}$, mindestens **30 Minuten** bei mehr als $7\text{ Stunden}$ und mindestens **60 Minuten** ($1{,}00\text{ h}$) bei mehr als $9\text{ Stunden}$ täglicher Arbeitszeit.

## Praxisbeispiele: Schichtabrechnung Schritt für Schritt

### Beispiel 1: Tagesschicht mit ungeraden Stempelzeiten und Lohnberechnung
Eine Fachkraft beginnt den Arbeitstag um **07:42 Uhr** und stempelt um **16:30 Uhr** aus. Dazwischen wurde eine Mittagspause von **36 Minuten** eingelegt. Der vereinbarte Bruttostundenlohn beträgt **$24{,}50\text{ €/h}$**.

1. **Brutto-Anwesenheitszeit:** Von `07:42 Uhr` bis `16:30 Uhr` sind es $8\text{ Stunden}$ und $48\text{ Minuten}$ ($528\text{ min}$).
2. **Abzug der Ruhepause:** $528\text{ min} - 36\text{ min} = 492\text{ min} = 8\text{ Stunden und } 12\text{ Minuten (`08:12 h`)}$.
3. **Konvertierung in Dezimalstunden:**
   $$H_{\text{dez}} = 8 + \frac{12}{60} = 8{,}20\text{ Industriestunden}$$
4. **Berechnung des Bruttotageslohns:**
   $$L_{\text{brutto}} = 8{,}20\text{ h} \cdot 24{,}50\text{ €/h} = 200{,}90\text{ €}$$
   *(Zum Vergleich: Wer fälschlicherweise `8,12 × 24,50 €` rechnet, erhält nur $198{,}94\text{ €}$ – ein Fehlbetrag von $1{,}96\text{ €}$ pro Arbeitstag bzw. über $43\text{ €}$ im Monat.)*

### Beispiel 2: Nachtschicht über die Mitternachtsgrenze
Ein Schichtarbeiter beginnt seine Nachtschicht am Dienstag um **21:45 Uhr** und stempelt am Mittwochmorgen um **06:15 Uhr** aus. Während der Schicht legt er **45 Minuten** Pause ein.

1. **Zeit vor Mitternacht:** Von `21:45 Uhr` bis `24:00 Uhr` = $2\text{ h } 15\text{ min}$ ($135\text{ min}$)
2. **Zeit nach Mitternacht:** Von `00:00 Uhr` bis `06:15 Uhr` = $6\text{ h } 15\text{ min}$ ($375\text{ min}$)
3. **Nettoarbeitszeit in Industriezeit:**
   $$\text{Netto} = (135\text{ min} + 375\text{ min}) - 45\text{ min} = 465\text{ min} = 7\text{ h } 45\text{ min} = 7{,}75\text{ Industriestunden}$$

## Häufige Fehler bei Stundenzetteln vermeiden

* **Addition von Uhrzeiten im Taschenrechner:** Wer `7,40 + 7,40` (für zweimal 7 Stunden und 40 Minuten) im Taschenrechner addiert, erhält `14,80` statt der korrekten 15 Stunden und 20 Minuten ($15{,}33\text{ h}$). Rechnen Sie Einzelwerte vor der Addition immer zuerst in Minuten oder Dezimalstunden um.
* **Automatischer Pausenabzug an der 6-Stunden-Schwelle:** Viele Zeiterfassungssysteme ziehen ab `06:01 Stunden` Anwesenheit automatisch 30 Minuten gesetzliche Pflichtpause ab. Wer nach 6 Stunden und 10 Minuten ohne Pause ausstempelt, bekommt dann nur 5 Stunden und 40 Minuten gutgeschrieben.
* **Periodische Dezimalwerte nicht kürzen:** Hinterlegen Sie 20 Minuten ($\frac{20}{60} = 0{,}3333\dots\text{ h}$) in Tabellenkalkulationen stets als exakten Bruch `=Minuten/60`, um monatliche Rundungsdifferenzen zu verhindern.
