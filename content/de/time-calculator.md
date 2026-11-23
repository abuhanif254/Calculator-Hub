---
title: "Zeitrechner"
metaTitle: "Zeitrechner: Stunden, Minuten & Zeitspannen berechnen"
description: "Berechnen Sie exakte Zeitdifferenzen zwischen zwei Uhrzeiten (auch über Mitternacht) oder addieren und subtrahieren Sie Tage, Stunden, Minuten und Sekunden."
metaDescription: "Addieren, subtrahieren und vergleichen Sie Stunden, Minuten und Sekunden inklusive Mitternachtssprung und Umrechnung in Dezimalstunden für Arbeitszeiten."
metaKeywords: "zeitrechner, stundenrechner, zeitdifferenz berechnen, zeiten addieren, dezimalstunden umrechnen, arbeitszeit berechnen, uhrzeit rechner, minuten in stunden"
faqs:
  - question: "Warum führt das Addieren von Stunden und Minuten im Kopf so häufig zu Rechenfehlern?"
    answer: "Unser Alltag rechnet im Dezimalsystem zur Basis 10, Uhren folgen dagegen dem Sexagesimalsystem zur Basis 60 (60 Sekunden je Minute, 60 Minuten je Stunde) und dem 24-Stunden-Tag. Dadurch entstehen beim Addieren oder Subtrahieren ungewöhnliche Überträge bei 60 statt bei 100 – etwa ergeben 45 Minuten plus 35 Minuten nicht 0,80 Stunden, sondern 1 Stunde und 20 Minuten."
  - question: "Wie rechne ich Stunden und Minuten korrekt in Dezimalstunden für die Lohnabrechnung um?"
    answer: "Teilen Sie die Minuten durch 60 und addieren Sie das Ergebnis zu den vollen Stunden (Dezimalstunden = Stunden + Minuten / 60). So entsprechen 7 Stunden und 45 Minuten exakt 7,75 Dezimalstunden – nicht 7,45 Stunden. Bei einem Stundenlohn von 32 € führt die Verwechslung von 7:45 mit 7,45 zu einem Abrechnungsfehler von 9,60 € pro Schicht."
  - question: "Wie berechnet der Zeitrechner Nachtschichten über Mitternacht hinaus?"
    answer: "Liegt die Endzeit zahlenmäßig vor der Startzeit (zum Beispiel Beginn um 21:45 Uhr, Ende um 06:15 Uhr), erkennt der Rechner automatisch den Tageswechsel über Mitternacht. Er addiert 24 Stunden zur Endzeit beziehungsweise summiert die verbleibende Zeit bis 24:00 Uhr und die Zeit nach 00:00 Uhr zu exakt 8 Stunden und 30 Minuten."
  - question: "Welche gesetzlichen Ruhepausen müssen im DACH-Raum von der Arbeitszeit abgezogen werden?"
    answer: "In Deutschland schreibt § 4 ArbZG bei mehr als 6 bis 9 Stunden mindestens 30 Minuten und ab über 9 Stunden mindestens 45 Minuten Pause vor. In Österreich gelten nach § 11 AZG ebenfalls 30 Minuten ab 6 Stunden. Die Schweiz staffelt nach Art. 15 ArG in 15 Minuten (> 5,5 h), 30 Minuten (> 7 h) und 60 Minuten (> 9 h). Pausen zählen regulär nicht als bezahlte Arbeitszeit."
  - question: "Was muss ich bei der Zeitumstellung (MEZ/MESZ) oder internationalen Flügen beachten?"
    answer: "Reine Uhrzeit-Differenzen setzen konstante 24-Stunden-Tage voraus. In der Nacht der Sommerzeit-Umstellung Ende März entfällt jedoch die Stunde von 02:00 auf 03:00 Uhr (eine Schicht von 22:00 bis 06:00 Uhr dauert real nur 7 Stunden), Ende Oktober dauert sie 9 Stunden. Bei Flügen über Zeitzonen sollten Start- und Landezeit vor dem Subtrahieren stets in UTC umgerechnet werden."
---

Kaum eine Alltagsrechnung sorgt in Lohnbuchhaltung, Schichtplanung, Logistik und Medienproduktion so zuverlässig für vermeidbare Fehler wie das Rechnen mit Uhrzeiten und Zeitspannen. Während Währungen, Gewichte und Längen strikt dem **Dezimalsystem (Basis 10)** folgen, beruht unsere Zeitmessung auf dem babylonischen **Sexagesimalsystem (Basis 60)** und dem 24-Stunden-Tag. Der **Zeitrechner** übernimmt diese Basis-60-Umrechnungen sekundengenau – sowohl für das Addieren und Subtrahieren beliebig langer Zeitdauern als auch für Zeitdifferenzen zwischen zwei Uhrzeiten inklusive Mitternachtssprung und Umrechnung in **Dezimalstunden**.

## Die Mathematik des Sexagesimalsystems: Modulo-Arithmetik und Dezimalstunden

Um Übertragsfehler beim manuellen Addieren oder „Borgen“ beim Subtrahieren vollständig auszuschließen, führt jede verlässliche Zeitberechnung alle Komponenten zunächst auf die kleinste gemeinsame Einheit – **Sekunden** – zurück, rechnet dort exakt ganzzahlig weiter und zerlegt das Ergebnis anschließend per Ganzzahldivision (`⌊...⌋`) und Restwertbildung (**Modulo**, `mod`):

```text
Gesamtsekunden:       S_ges = d × 86.400 + h × 3.600 + m × 60 + s
Tage:                 d = ⌊S_ges / 86.400⌋
Stunden (Rest):       h = ⌊(S_ges mod 86.400) / 3.600⌋
Minuten (Rest):       m = ⌊(S_ges mod 3.600) / 60⌋
Sekunden (Rest):      s = S_ges mod 60
Differenz über 24 h:  Δt = (24 h − t_Start) + t_Ende   (falls t_Ende < t_Start)
Dezimalstunden:       h_dez = h + m / 60 + s / 3.600
```

Dabei stehen **d** für Tage, **h** für Stunden, **m** für Minuten und **s** für Sekunden (die SI-Basiseinheit der Zeit). Im DACH-Raum gilt nach **ISO 8601** und **DIN 5008** die eindeutige **24-Stunden-Schreibweise** (`00:00` bis `23:59`). Begegnen Ihnen in internationalen Flugplänen oder Projekttools angloamerikanische 12-Stunden-Angaben (**AM/PM**), überführen Sie diese vorab ins 24-Stunden-Format: `12:00 AM` entspricht Mitternacht (`00:00 Uhr`), `12:00 PM` der Mittagsstunde (`12:00 Uhr`), und für alle Nachmittagszeiten von `1:00 PM` bis `11:59 PM` werden 12 Stunden addiert.

## Durchgerechnete Praxisbeispiele: Nachtschicht und Zeitsummen

### Beispiel 1: Nachtschicht über Mitternacht mit Pausenabzug und Lohnrechnung
Ein Techniker tritt seine Nachtschicht um **21:45 Uhr** an und stempelt am Folgetag um **06:15 Uhr** aus. Vereinbart sind **45 Minuten** unbezahlte Pause sowie ein Bruttostundenlohn von **32,00 €**.

1. **Zeit bis Mitternacht bestimmen:** `24:00 − 21:45 = 2 h 15 min`.
2. **Zeit nach Mitternacht addieren:** `2 h 15 min + 6 h 15 min = 8 h 30 min` Bruttoanwesenheit.
3. **Ruhepause abziehen:** Bei `8 h 30 min − 0 h 45 min` reichen die 30 Minuten nicht aus; daher wird 1 volle Stunde als 60 Minuten in die Minutenspalte übertragen (`7 h 90 min − 45 min`). Das ergibt exakt **7 h 45 min** Nettoarbeitszeit.
4. **In Dezimalstunden und Euro umrechnen:** `7 + 45 / 60 = 7,75 h`. Multipliziert mit **32,00 €/h** beträgt der Schichtlohn exakt **248,00 €**. Wer die Uhrzeit `7:45` irrtümlich als Dezimalzahl `7,45` in die Abrechnung übernimmt, berechnet nur **238,40 €** – ein Verlust von **9,60 €** in einer einzigen Schicht.

### Beispiel 2: Sekundengenaue Addition von drei Projektblöcken
Für die Gesamtlaufzeit eines Podcasts oder dreier Einsatztage sollen **7 h 45 min 20 s**, **8 h 35 min 50 s** und **6 h 50 min 15 s** addiert werden:

1. **Sekunden addieren:** `20 + 50 + 15 = 85 s` → **1 min Übertrag**, **25 s Rest**.
2. **Minuten addieren (inkl. Übertrag):** `45 + 35 + 50 + 1 = 131 min` → **2 h Übertrag**, **11 min Rest**.
3. **Stunden addieren (inkl. Übertrag):** `7 + 8 + 6 + 2 = 23 h`.
4. **Gesamtergebnis:** Exakt **23 h 11 min 25 s** (entspricht **83.485 Sekunden** oder gerundet **23,19 Dezimalstunden**).

## Umrechnungstabelle: Echtzeitminuten in Dezimalstunden und Industrieminuten

In vielen Zeiterfassungssystemen, Handwerksbetrieben und Steuerkanzleien im DACH-Raum werden Zeiten in **Dezimalstunden** oder **Industrieminuten** (`1 Stunde = 100 Industrieminuten`) erfasst. Diese Referenztabelle erleichtert die schnelle Plausibilitätsprüfung:

| Echtzeitminuten | Bruch einer Stunde | Dezimalstunden (exakt / 4 NK) | Gerundet (2 NK) | Industrieminuten (IM) |
| :--- | :--- | :--- | :--- | :--- |
| **5 Minuten** | 1 / 12 | 0,0833 h | 0,08 h | 8,33 IM |
| **6 Minuten** | 1 / 10 | 0,1000 h | 0,10 h | 10,00 IM |
| **10 Minuten** | 1 / 6 | 0,1667 h | 0,17 h | 16,67 IM |
| **15 Minuten** | 1 / 4 | 0,2500 h | 0,25 h | 25,00 IM |
| **20 Minuten** | 1 / 3 | 0,3333 h | 0,33 h | 33,33 IM |
| **30 Minuten** | 1 / 2 | 0,5000 h | 0,50 h | 50,00 IM |
| **40 Minuten** | 2 / 3 | 0,6667 h | 0,67 h | 66,67 IM |
| **45 Minuten** | 3 / 4 | 0,7500 h | 0,75 h | 75,00 IM |
| **50 Minuten** | 5 / 6 | 0,8333 h | 0,83 h | 83,33 IM |

Besonders praktisch für Berater, Werkstätten und Rechtsanwälte ist der **6-Minuten-Takt** (`0,10 h`), weil er sich ohne periodische Rundungsverluste exakt in Zehntelstunden darstellen lässt. Bei periodischen Werten wie 10, 20 oder 40 Minuten summieren sich dagegen bei monatsweiser Abrechnung kleine Rundungsdifferenzen, weshalb Sie erst die gesamte **Monatssumme** in Echtzeit aufaddieren und erst ganz am Ende runden sollten.

## Typische Stolperfallen bei Arbeitszeit, Zeitzonen und Planung

- **Doppelpunkt niemals mit Dezimalkomma verwechseln:** `8:30` bedeutet achteinhalb Stunden (`8,50 h`), während `8,30 h` nur 8 Stunden und 18 Minuten entspricht. Prüfen Sie bei Zeiterfassungsexporten in Excel oder Lohnprogrammen immer sofort, ob die Spalte im Uhrzeitformat (`[hh]:mm`) oder als Dezimalzahl gespeichert ist.
- **24-Stunden-Grenze in Tabellenkalkulationen beachten:** Excel und ähnliche Programme blenden bei Standard-Uhrzeitformaten (`hh:mm`) Summen oberhalb von 24 Stunden stillschweigend aus – aus `26 Stunden 15 Minuten` wird dann fälschlich `02:15`. Ein dedizierter Zeitrechner oder das benutzerdefinierte Format `[hh]:mm` verhindert diesen folgenschweren Abrechnungsfehler.
- **Zeitumstellung und internationale Zeitzonen gesondert prüfen:** Bei Flügen zwischen verschiedenen Zeitzonen (z. B. Frankfurt MEZ `UTC+1` nach New York EST `UTC−5`) täuscht die einfache Differenz der Ortszeiten über die reale Flugdauer hinweg. Rechnen Sie Abflug- und Ankunftszeit stets auf **UTC** um, bevor Sie die Differenz bilden.
- **Verbindliche Pausenkorridore einhalten:** Im DACH-Arbeitsrecht dürfen gesetzliche Mindestpausen nicht ans Schichtende gelegt und nicht durchgängig durchgearbeitet werden. Ziehen Sie verpflichtende Ruhepausen unmittelbar bei der Dienstplangestaltung ab, um Verstöße gegen Höchstarbeitszeiten und Ruhezeiten (in der Regel 11 Stunden zwischen zwei Schichten) zuverlässig zu vermeiden.
