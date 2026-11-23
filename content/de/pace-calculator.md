---
title: "Pace-Rechner (Lauf-Rechner)"
metaTitle: "Pace-Rechner | Laufgeschwindigkeit, Zielzeit & Distanz"
description: "Berechnen Sie Ihre Lauf-Pace in Minuten pro Kilometer und Meile, prognostizieren Sie Zielzeiten für 5 km, 10 km, Halbmarathon und Marathon oder ermitteln Sie Trainingsdistanzen."
metaDescription: "Kostenloser Pace-Rechner für Läufer: Berechnen Sie Lauf-Pace (min/km & km/h), Zielzeiten für 5 km, 10 km, Halbmarathon und Marathon sowie Splits."
metaKeywords: "pace rechner, laufgeschwindigkeit berechnen, laufzeit berechnen, marathon pace, halbmarathon zielzeit, min pro km in kmh, negative split"
faqs:
  - question: "Was ist der Unterschied zwischen Pace (min/km) und Geschwindigkeit (km/h)?"
    answer: "Die Geschwindigkeit gibt an, wie viele Kilometer Sie in einer Stunde zurücklegen (km/h). Die Pace ist ihr Kehrwert und zeigt, wie viele Minuten und Sekunden Sie für genau einen Kilometer benötigen (min/km). Im Laufsport ist die Pace praktischer, weil Kilometerschilder auf der Strecke einen sofortigen Soll-Ist-Abgleich ohne Kopfrechnen erlauben."
  - question: "Wie rechne ich min/km zuverlässig in km/h und min/Meile um?"
    answer: "Wandeln Sie Ihre Pace zuerst vollständig in Sekunden pro Kilometer um. Teilen Sie anschließend 3.600 durch diesen Sekundenwert, um die Geschwindigkeit in km/h zu erhalten (bei 5:00 min/km = 300 s/km also 3.600 / 300 = 12,00 km/h). Für die englische Meile multiplizieren Sie die Sekunden pro Kilometer einfach mit dem Faktor 1,60934."
  - question: "Warum stimmt meine GPS-Uhr im Stadtmarathon selten mit den offiziellen Kilometermarken überein?"
    answer: "Offizielle Strecken nach DLV-, ÖLV- oder World-Athletics-Standard werden über die kürzestmögliche Ideallinie (Tangenten) vermessen. Durch Ausweichmanöver im Läuferfeld, weite Kurven und Reflexionen an Hochhäusern misst eine GPS-Uhr im Halbmarathon und Marathon meist 0,8 % bis 1,8 % mehr Distanz – auf 42,195 km schnell 400 bis 700 Meter extra."
  - question: "Was bedeutet ein Negative Split bei der Wettkampfplanung?"
    answer: "Bei einem Negative Split laufen Sie die zweite Streckenhälfte geringfügig schneller als die erste. Da der Körper in den ersten Kilometern weniger Laktat anhäuft und seine Glykogenspeicher schont, ist diese Strategie physiologisch deutlich effizienter als ein zu euphorischer Start, der ab Kilometer 30 im Marathon häufig zum Leistungseinbruch führt."
  - question: "Welche exakte Distanz haben offizieller Halbmarathon und Marathon?"
    answer: "Ein normgerechter Marathon misst exakt 42,195 km (26,219 Meilen) und ein Halbmarathon genau die Hälfte, also 21,0975 km (13,109 Meilen). Wer im Kopf grob mit 21,0 km oder 42,0 km rechnet, unterschätzt die Zielzeit bei einer 5:00-min/km-Pace bereits um fast eine halbe beziehungsweise eine volle Minute."
---

Im Ausdauersport entscheidet gleichmäßiges Tempo über persönliche Bestzeiten – oder über den gefürchteten Einbruch auf den letzten Kilometern. Während Autos und Fahrräder meist in **Kilometern pro Stunde (km/h)** gemessen werden, rechnen Läuferinnen und Läufer fast ausschließlich in **Pace**, also in **Minuten und Sekunden pro Kilometer (`min/km`)**. Weil Zeit im 60er-System (Sexagesimalsystem) statt im Dezimalsystem verläuft, führt schnelles Überschlagen im Kopf rasch zu Fehlern: `4,50 min/km` entsprechen eben nicht `4:50 min/km`, sondern `4:30 min/km`.

Unser **Pace-Rechner** löst die drei Grundgrößen des Laufens – **Pace**, **Gesamtzeit** und **Distanz** – fehlerfrei in jede Richtung auf. Er rechnet automatisch zwischen Kilometern, Metern und internationalen Meilen um und enthält die normierten Wettkampfdistanzen für **5 km**, **10 km**, **Halbmarathon (21,0975 km)** und **Marathon (42,195 km)**.

## Die exakten Pace-Formeln im 60er-System

Um Rundungs- und Umrechnungsfehler zwischen Stunden, Minuten und Sekunden vollständig auszuschließen, überführt der Rechner jede Zeitangabe zunächst in absolute Sekunden **T**, führt dort alle Rechenschritte aus und formatiert das Resultat wieder sauber in `hh:mm:ss` bzw. `mm:ss`:

```text
Gesamtzeit (Sekunden):  T = 3.600 × h + 60 × m + s
Pace (s/km):            p_km = T / d
Zielzeit (s):           T = d × p_km  |  Distanz (km): d = T / p_km
Umrechnungen:           v (km/h) = 3.600 / p_km  |  p_mi (s/Meile) = p_km × 1,60934
```

Hierbei bezeichnet **T** die gesamte Laufzeit in Sekunden (`s`), **d** die zurückgelegte Strecke in Kilometern (`km`), **p_km** die Pace in Sekunden pro Kilometer (`s/km`) und **v** die Durchschnittsgeschwindigkeit in `km/h`. Da `1 internationale Meile = 1,60934 km` entspricht, lässt sich jede metrische Kilometer-Pace direkt in amerikanische oder britische Trainingspläne übertragen.

## Schritt-für-Schritt-Rechenbeispiel: Halbmarathon unter 1:45:00 Stunden

Angenommen, Ihr Wettkampfziel für den nächsten Frühjahrslauf ist ein **Halbmarathon (`21,0975 km`)** in exakt **1 Stunde und 45 Minuten (`1:45:00`)**. Welche Kilometer-Pace müssen Sie anschlagen – und was bewirkt die reale GPS-Abweichung auf Ihrer Laufuhr?

**1. Zielzeit vollständig in Sekunden umrechnen:**
`T = 1 × 3.600 + 45 × 60 + 0 = 6.300 Sekunden`.

**2. Erforderliche Durchschnitts-Pace berechnen:**
`p_km = 6.300 s / 21,0975 km = 298,61 s/km`.
Umgerechnet in Minuten und Sekunden entspricht das `4 × 60 + 58,61 s`, also exakt **`4:59 min/km`** (präzise `4:58,6 min/km`).

**3. Geschwindigkeit und Meilen-Pace ableiten:**
- Durchschnittsgeschwindigkeit: `v = 3.600 / 298,61 = 12,06 km/h` (entscheidend für das Laufbandtraining).
- Internationale Meilen-Pace: `p_mi = 298,61 × 1,60934 = 480,57 s/Meile = 8:01 min/Meile`.

**4. Realitätscheck mit GPS-Mehrdistanz:**
Bei einem gut besuchten Stadt-Halbmarathon (etwa in Berlin, Wien oder Zürich) laufen Sie durch Überholmanöver und weite Kurven realistisch rund **1,2 % weiter** als die vermessene Ideallinie – Ihre Uhr zeigt im Ziel etwa **21,35 km** an. Halten Sie stur eine angezeigte Pace von `4:59 min/km` (`299 s/km`), ergibt sich eine reale Zielzeit von `21,35 × 299 s = 6.384 s = 1:46:24`. Sie würden Ihr 1:45-Stunden-Ziel um 1 Minute und 24 Sekunden verfehlen. Um die GPS-Mehrdistanz auszugleichen, sollte die Laufuhr auf `6.300 / 21,35 = 295,08 s/km`, also **`4:55 min/km`**, zielen – oder Sie kontrollieren Ihre Zwischenzeiten direkt an den offiziellen Kilometerschildern.

## Referenztabelle: Pace, Geschwindigkeit und Wettkampf-Zielzeiten

Die folgende Tabelle zeigt die exakten rechnerischen Zielzeiten bei konstantem Tempo für die wichtigsten Straßenlauf-Distanzen nach DLV-, ÖLV- und Swiss-Athletics-Norm:

| Pace (min/km) | Tempo (km/h) | Pace (min/Meile) | 5 km | 10 km | Halbmarathon (21,1 km) | Marathon (42,195 km) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **4:00** | 15,00 km/h | 6:26 | 20:00 | 40:00 | 1:24:23 | 2:48:47 |
| **4:30** | 13,33 km/h | 7:15 | 22:30 | 45:00 | 1:34:56 | 3:09:53 |
| **5:00** | 12,00 km/h | 8:03 | 25:00 | 50:00 | 1:45:29 | 3:30:59 |
| **5:30** | 10,91 km/h | 8:51 | 27:30 | 55:00 | 1:56:02 | 3:52:04 |
| **6:00** | 10,00 km/h | 9:39 | 30:00 | 1:00:00 | 2:06:35 | 4:13:10 |
| **6:30** | 9,23 km/h | 10:28 | 32:30 | 1:05:00 | 2:17:08 | 4:34:16 |

## Renntaktik: Gleichmäßiges Tempo und Negative Split richtig einsetzen

Viele Hobbyläufer versuchen, auf der ersten Streckenhälfte ein „Zeitpolster“ herauszulaufen, um spätere Müdigkeit abzufangen. Sportphysiologisch geht diese Rechnung fast immer schief: Wer bereits auf den ersten fünf Kilometern 10 bis 15 Sekunden pro Kilometer über seiner aeroben Schwelle startet, verbrennt überproportional schnell Muskelglykogen und übersäuert frühzeitig. Im letzten Viertel verliert man pro zu schnell gelaufener Sekunde häufig das Doppelte bis Dreifache. Deutlich erfolgreicher ist ein kontrollierter **Negative Split**: Laufen Sie das erste Viertel zwei bis drei Sekunden pro Kilometer ruhiger als die berechnete Ziel-Pace, stabilisieren Sie das exakte Zieltempo im Mittelteil und ziehen Sie erst im Schlussabschnitt kontrolliert an.

## Praxistipps für Training und Wettkampf-Pacing

- **80/20-Trainingsverteilung einhalten:** Rund 80 % Ihrer Wochenkilometer sollten im lockeren Grundlagenbereich (**GA1**) stattfinden – typischerweise **45 bis 75 Sekunden pro Kilometer langsamer** als Ihre 10-km-Wettkampf-Pace. Nur etwa 20 % gehören in Tempodauerläufe an der anaeroben Schwelle oder gezielte Intervalle. Zu schnelle Dauerläufe erzeugen schleichende Überlastung ohne zusätzlichen Leistungsgewinn.
- **Manuelle Runden statt automatischer Rundenmessung nutzen:** Drücken Sie bei großen Stadtmarathons alle 5 Kilometer manuell die Rundentaste an den offiziellen Streckenschildern und vergleichen Sie die Zwischenzeit mit einem kleinen **Pace-Armband**. So bleiben Sie unabhängig von GPS-Aussetzern in Häuserschluchten und Unterführungen.
- **Laufband-Geschwindigkeit realistisch kalibrieren:** Auf dem Laufband entfällt der Fahrtwind. Stellen Sie ab etwa 12 km/h eine leichte Steigung von **1,0 %** ein, damit die eingestellte km/h-Geschwindigkeit physiologisch näherungsweise derselben Straßen-Pace entspricht.
- **Höhenmeter und Hitze einkalkulieren:** Auf profilierten Kursen oder bei Temperaturen über 20 °C ist eine starre Kilometer-Pace kontraproduktiv. Steuern Sie bergauf stärker nach Herzfrequenz oder subjektiver Anstrengung und nutzen Sie flache Passagen für Ihren Rhythmus.
- **Trainings-Pace regelmäßig an aktuelle Wettkämpfe anpassen:** Übernehmen Sie niemals Wunschzeiten als Grundlage für das tägliche Training, sondern leiten Sie Grundlagen-, Schwellen- und Intervalltempo aus einem aktuellen 5-km- oder 10-km-Testlauf ab. Schon wenige Sekunden Differenz pro Kilometer entscheiden darüber, ob ein Trainingsreiz zielgerichtet wirkt oder langfristig ins Übertraining führt.
