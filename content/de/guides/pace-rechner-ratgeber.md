---
title: "Lauftempo berechnen: Die Mathematik hinter Ihrem Marathon"
description: "Berechnen Sie Ihre Lauf-Pace exakt in Minuten pro Kilometer, rechnen Sie Geschwindigkeiten in km/h oder min/mi um und vermeiden Sie typische Fehler bei Marathon-Durchgangszeiten."
category: "Health"
relatedCalculator: "pace-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Was ist der Unterschied zwischen Pace (min/km) und Geschwindigkeit (km/h)?"
    answer: "Die Geschwindigkeit gibt die zurückgelegte Distanz pro Stunde in km/h an, während die Pace den Kehrwert bildet und die benötigte Zeit pro Kilometer in Minuten und Sekunden (min/km) misst. Im Ausdauersport wird die Pace bevorzugt, weil sich Zwischenzeiten an Kilometerschildern direkt im Kopf addieren lassen."
  - question: "Warum sind 5:30 min/km nicht gleichbedeutend mit 5,30 Minuten pro Kilometer?"
    answer: "Zeitangaben folgen dem Sexagesimalsystem (Basis 60), nicht dem Dezimalsystem (Basis 10). Da 30 Sekunden einer halben Minute entsprechen, entspricht eine Pace von 5:30 min/km rechnerisch genau 5,50 Dezimalminuten oder 330 Sekunden pro Kilometer."
  - question: "Wie viele Kilometer hat ein offizieller Halbmarathon und ein Marathon?"
    answer: "Ein offiziell vermessener Halbmarathon misst genau 21,0975 Kilometer (oft gerundet 21,1 km), ein Marathon exakt 42,195 Kilometer. Schon kleine Rundungsfehler bei der Streckenlänge summieren sich auf Marathondistanz zu mehr als einer Minute Zeitunterschied."
  - question: "Warum zeigt meine GPS-Uhr beim Stadtmarathon oft eine schnellere Pace als die offizielle Bruttozeit?"
    answer: "GPS-Uhren zeichnen durch Überholmanöver, Kurvenabweichungen außerhalb der Ideallinie und Signalreflexionen in Häuserschluchten häufig 42,5 bis 42,8 Kilometer statt der offiziell vermessenen 42,195 Kilometer auf. Maßgeblich für die Zielzeit ist deshalb allein die Pace bezogen auf die offiziellen Kilometermarken."
  - question: "Kann ich meine 10-km-Pace direkt auf einen Marathon hochrechnen?"
    answer: "Nein, eine rein lineare Hochrechnung ist physiologisch unrealistisch. Durch zunehmende muskuläre Ermüdung, Glykogenabbau und kardiovaskuläre Drift steigt die Pace auf längeren Distanzen nach der Riegel-Formel meist um den Faktor (Distanz_2 / Distanz_1)^1,06 an."
---

Die Lauf-Pace beschreibt die benötigte Zeit pro zurückgelegter Streckeneinheit und wird im deutschsprachigen Raum standardmäßig in **Minuten pro Kilometer (`min/km`)** angegeben. Während ein Tachometer beim Radfahren die Geschwindigkeit in `km/h` anzeigt, arbeitet der Laufsport mit diesem Kehrwert, weil Sie Durchgangszeiten an jeder Kilometermarke ohne Umrechnung kontrollieren können.

Mit unserem [Pace-Rechner](/de/rechner/pace-rechner) berechnen Sie fehlende Größen wie Zielzeit, Durchschnittstempo oder Laufdistanz fehlerfrei und wandeln metrische Einheiten direkt in Meilen-Paces (`min/mi`) oder Stundenkilometer um. Im Hintergrund löst das Werkzeug automatisch die häufigste Fehlerquelle beim Kopfrechnen: die Umrechnung zwischen 60er-Zeitsystem und Dezimalzahlen.

## Die mathematischen Grundformeln

### Zeitbasis 60 korrekt umrechnen

Der klassische Rechenfehler entsteht beim Multiplizieren von Minuten und Sekunden als Dezimalzahl. Eine Pace von `4:45 min/km` beträgt nicht `4,45 Minuten`, sondern `4 + (45 / 60) = 4,75 Dezimalminuten`. Um Rundungsfehler vollständig auszuschließen, wandelt man jede Zeitangabe zunächst konsequent in **Gesamtsekunden (`t_s`)** um:

```text
1. Gesamtzeit in Sekunden:
   t_s = (Stunden × 3.600) + (Minuten × 60) + Sekunden

2. Pace in Sekunden pro Kilometer:
   Pace_s = t_s / Strecke_km
   Minutenanteil (MM)  = abrunden(Pace_s / 60)
   Sekundenanteil (SS) = runden(Pace_s mod 60)

3. Zielzeit aus Pace und Strecke:
   t_s = Pace_s × Strecke_km

4. Umrechnung in Geschwindigkeit (km/h) und Meilen-Pace (min/mi):
   v (km/h)   = 3.600 / Pace_s
   Pace_mi_s  = Pace_s × 1,609344   (da 1 Meile = 1,609344 km)
```

Beachten Sie bei der Rückumwandlung in `MM:SS`, dass bei exakt `60` gerundeten Restsekunden der Minutenwert um `1` erhöht und die Sekundenzahl auf `00` gesetzt werden muss.

### Distanz-Hochrechnung nach Riegel

Da die Ausdauerleistung über längere Wettkampfdistanzen nicht linear verläuft, nutzt die Sportwissenschaft für realistische Zielzeit-Prognosen zwischen zwei Streckenlängen die empirische Formel nach Peter Riegel (`1977`):

```text
T2 = T1 × (D2 / D1)^1,06
```

Dabei bezeichnen `T1` und `D1` Ihre bekannte Bestzeit und Distanz (beispielsweise 10 km in `47:30 min`), während `D2` die angestrebte Zielstrecke (etwa `21,0975 km` oder `42,195 km`) darstellt. Der Ermüdungsexponent `1,06` bildet ab, dass sich Ihre durchschnittliche Pace auf der doppelten Distanz typischerweise um rund 4 bis 5 Prozent verlangsamt.

## Schritt-für-Schritt-Rechenbeispiele

### Beispiel 1: Pace für einen 10-km-Wettkampf berechnen

Sie absolvieren einen offiziell vermessenen 10-km-Lauf in **47 Minuten und 30 Sekunden (`0:47:30`)**.

1. **In Sekunden umrechnen:** `(47 × 60) + 30 = 2.820 + 30 = 2.850 Sekunden`.
2. **Durch Distanz teilen:** `2.850 s / 10 km = 285 Sekunden pro Kilometer`.
3. **In `MM:SS` zurückwandeln:** `285 / 60 = 4 Minuten` (`4 × 60 = 240 s`) mit einem Rest von `285 − 240 = 45 Sekunden`. Ihre Durchschnittspace beträgt exakt **4:45 min/km**.
4. **In km/h umrechnen:** `3.600 / 285 = 12,63 km/h`.

### Beispiel 2: Zielzeit für einen Marathon vorhersagen

Sie planen einen Marathon über exakt **`42,195 km`** mit einer gleichmäßigen Ziel-Pace von **`5:20 min/km`**.

1. **Pace in Sekunden:** `(5 × 60) + 20 = 320 s/km`.
2. **Gesamtsekunden ermitteln:** `320 s/km × 42,195 km = 13.502,4 Sekunden` (gerundet `13.502 s`).
3. **In `HH:MM:SS` umformen:**
   * Stunden: `13.502 / 3.600 = 3 Stunden` (`3 × 3.600 = 10.800 s`, Rest `2.702 s`).
   * Minuten: `2.702 / 60 = 45 Minuten` (`45 × 60 = 2.700 s`, Rest `2 s`).
4. **Ergebnis:** Ihre Zielzeit liegt bei **3:45:02 Stunden** (Durchgangszeit beim Halbmarathon nach `21,0975 km`: **1:52:31 Stunden**). In englischen Einheiten entspricht dies `320 × 1,609344 = 515 s/mi`, also **8:35 min/mi**.

## Pace-Referenztabelle für typische Wettkampfdistanzen

Die folgende Übersicht zeigt exakte Durchgangs- und Zielzeiten (auf ganze Sekunden gerundet) für gängige Trainings- und Marathontempi:

| Pace (`min/km`) | Tempo (`km/h`) | Pace (`min/mi`) | 10-km-Zeit | Halbmarathon (`21,0975 km`) | Marathon (`42,195 km`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `4:00 min/km` | `15,00 km/h` | `6:26 min/mi` | `0:40:00` | `1:24:23` | `2:48:47` |
| `4:30 min/km` | `13,33 km/h` | `7:15 min/mi` | `0:45:00` | `1:34:56` | `3:09:53` |
| `5:00 min/km` | `12,00 km/h` | `8:03 min/mi` | `0:50:00` | `1:45:29` | `3:30:59` |
| `5:30 min/km` | `10,91 km/h` | `8:51 min/mi` | `0:55:00` | `1:56:02` | `3:52:04` |
| `6:00 min/km` | `10,00 km/h` | `9:39 min/mi` | `1:00:00` | `2:06:35` | `4:13:10` |
| `6:30 min/km` | `9,23 km/h` | `10:28 min/mi` | `1:05:00` | `2:17:08` | `4:34:16` |

## Praxis-Fallstricke und Rennstrategie

Wer seine Wettkampfplanung allein auf die angezeigte Durchschnittspace stützt, unterschätzt oft vier typische Praxisfaktoren:

* **GPS-Mehrstrecke durch Ideallinien-Abweichung:** Bei großen Stadtmarathons laufen Teilnehmende durch Überholmanöver und weite Außenkurven im Schnitt 300 bis 600 Meter weiter als die blau markierte Ideallinie. Wer für eine Zielzeit unter 3:30 Stunden exakt `4:58 min/km` auf der GPS-Uhr anvisiert, sollte einen Puffer von rund 2 bis 4 Sekunden pro Kilometer einplanen oder manuell an den offiziellen Kilometerschildern abstoppen.
* **Nichtlineare Leistungsabnahme über längere Distanzen:** Nach der empirischen Riegel-Formel (`T2 = T1 × (D2 / D1)^1,06`) verdoppelt sich die Marathonzeit gegenüber dem Halbmarathon nicht einfach, sondern wächst überproportional an — meist um zusätzliche 10 bis 20 Minuten, abhängig von Trainingsumfang und Kohlenhydratversorgung.
* **Höhenmeter, Hitze und Gegenwind:** Auf welligen Strecken oder bei Lufttemperaturen oberhalb von 18 °C steigt die Herzfrequenz bei gleicher Pace deutlich an (kardiovaskuläre Drift). Leistungsdiagnostiker rechnen deshalb häufig mit der steigungsbereinigten Pace (GAP) oder steuern Marathons im ersten Drittel konservativ nach Herzfrequenzbereichen.
* **Negative Splits als Erfolgsrezept:** Die meisten persönlichen Bestzeiten und Weltrekorde werden mit einem leicht negativen Split gelaufen — die zweite Rennhälfte ist also geringfügig schneller als die erste. Ein um 3 bis 5 Sekunden pro Kilometer zu schneller Start auf den ersten zehn Kilometern führt ab Kilometer 32 häufig zu massiven Tempoeinbrüchen.

Nutzen Sie die Berechnungen für unterschiedliche Tempo-Szenarien in Ihrem Training, um Ihre realistische Ziel-Pace vor dem Starttag präzise abzusichern.
