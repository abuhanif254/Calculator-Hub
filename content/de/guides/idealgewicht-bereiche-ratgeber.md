---
title: "Idealgewicht-Bereiche nach Größe und Körperbau"
description: "Erkunden Sie die wichtigsten Formeln für das Idealgewicht (Hamwi, Devine, Robinson, Miller) und erfahren Sie, wie Sie unseren Idealgewicht-Rechner nutzen."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ideal-weight-calculator"
faqs:
  - question: "Welche der vier Idealgewicht-Formeln (Hamwi, Devine, Robinson, Miller) ist am genauesten?"
    answer: "Keine einzelne Formel ist für alle Körpertypen überlegen. Devine ist klinisch am weitesten verbreitet, Hamwi schätzt bei größeren Männern etwas höher und Robinson sowie Miller basieren auf neueren Versicherungsdaten. Der Durchschnitt aller vier Formeln liefert für gesunde Erwachsene die ausgewogenste Orientierung."
  - question: "Warum wird die Devine-Formel trotz ihres Alters weiterhin in Krankenhäusern verwendet?"
    answer: "Die Devine-Formel von 1974 ist historisch tief in der klinischen Pharmakologie und Intensivmedizin verankert. Dosierungsprotokolle für bestimmte Antibiotika, Zytostatika sowie lungenprotektive Beatmungsvolumina (6 bis 8 ml/kg IBW) wurden direkt auf Basis der Devine-Werte validiert."
  - question: "Wie ermittle ich meinen Körperbau (schmal, mittel, breit) möglichst objektiv?"
    answer: "Teilen Sie Ihre Körpergröße in Zentimetern durch Ihren Handgelenkumfang an der schmalsten Stelle. Bei Männern deutet ein Verhältnis über 10,4 auf einen schmalen und unter 9,6 auf einen breiten Körperbau hin; bei Frauen liegen die Schwellenwerte bei über 11,0 (schmal) bzw. unter 10,1 (breit)."
  - question: "Warum ist das rechnerische Idealgewicht für Kraftsportler und ältere Menschen eingeschränkt?"
    answer: "Alle IBW-Formeln nutzen ausschließlich Körpergröße und Geschlecht und erfassen keine Körperzusammensetzung. Kraftsportler überschreiten das IBW oft durch funktionale Muskelmasse bei niedrigem Körperfett, während ab 65 Jahren ein etwas höheres Gewicht innerhalb des BMI-Bereichs von 24 bis 29 kg/m² mit besserer Krankheitsreserve einhergeht."
  - question: "Worin liegt der Unterschied zwischen Idealgewicht und dem gesunden WHO-BMI-Korridor?"
    answer: "Die IBW-Formeln geben einen engen Zielwert mit geringer Streuung an, während der WHO-BMI-Normalbereich (18,5 bis 24,9 kg/m²) eine breite Spanne von meist 15 bis 20 kg definiert. Beide Konzepte lassen sich sinnvoll kombinieren, indem das körperbaukorrigierte IBW als Zentrum innerhalb des breiteren BMI-Korridors dient."
---

Das **Idealgewicht** (engl. *Ideal Body Weight*, **IBW**) ist eine historisch aus der klinischen Pharmakologie und Versicherungsmedizin abgeleitete Gewichtsschätzung auf Basis von Körpergröße und biologischem Geschlecht. Im Gegensatz zu ästhetischen Wunschvorstellungen dient das IBW primär zur sicheren Dosierung wasserlöslicher Medikamente, zur Einstellung von Beatmungsvolumina in der Intensivmedizin sowie als orientierender Referenzpunkt für einen statistisch günstigen Gesundheitsbereich.

Bei erwachsenen Menschen konvergieren die vier etablierten Formeln nach **Hamwi (1964)**, **Devine (1974)**, **Robinson (1983)** und **Miller (1983)** typischerweise innerhalb von **3 bis 7 kg** rund um einen gemeinsamen Mittelwert. Berücksichtigt man zusätzlich den individuellen Skelett- und **Körperbau** (schmal, mittel, breit) über eine Anpassung von **±10 %**, erhält man einen deutlich realistischeren Zielkorridor als durch einen einzelnen Punktwert.

## Die vier klassischen IBW-Formeln und ihre metrische Umrechnung

Alle vier Standardformeln teilen eine lineare Struktur: Sie legen ein Basisgewicht bei exakt **5 Fuß (60 Zoll = 152,4 cm)** fest und addieren für jeden zusätzlichen Zoll (**2,54 cm**) einen geschlechtsspezifischen Gewichtszuschlag. Für metrische Angaben wird zunächst der Größenzuwachs `ΔH` oberhalb von `152,4 cm` berechnet:

```text
Metrische Hilfsgröße: ΔH = (Körpergröße_cm − 152,4) / 2,54   [Zoll über 152,4 cm]

Hamwi (1964):    Männer = 48,0 + 2,70 × ΔH   | Frauen = 45,5 + 2,20 × ΔH   [kg]
Devine (1974):   Männer = 50,0 + 2,30 × ΔH   | Frauen = 45,5 + 2,30 × ΔH   [kg]
Robinson (1983): Männer = 52,0 + 1,90 × ΔH   | Frauen = 49,0 + 1,70 × ΔH   [kg]
Miller (1983):   Männer = 56,2 + 1,41 × ΔH   | Frauen = 53,1 + 1,36 × ΔH   [kg]
```

Zusätzlich dient der von der Weltgesundheitsorganisation (WHO) definierte **Normalgewichtsbereich beim Body-Mass-Index (18,5 bis 24,9 kg/m²)** als breiter medizinischer Vergleichsrahmen:

```text
Gesunder BMI-Bereich (kg) = [18,5 × (Körpergröße_m)²  bis  24,9 × (Körpergröße_m)²]
```

### Körperbau bestimmen und Idealgewicht um ±10 % anpassen

Da ein schmaler oder kräftiger Knochenbau bei gleicher Körpergröße mehrere Kilogramm Differenz ausmacht, wird der Konsens-Mittelwert je nach Rahmentyp um **−10 %** (schmal) oder **+10 %** (breit) korrigiert. Eine bewährte anthropometrische Methode nutzt das Verhältnis aus Körpergröße und **Handgelenkumfang** (`r = Größe_cm / Handgelenkumfang_cm`):

- **Schmaler Körperbau (−10 %):** Männer `r > 10,4` | Frauen `r > 11,0` (Daumen und Mittelfinger überlappen beim Umfassen deutlich).
- **Mittlerer Körperbau (±0 %):** Männer `r = 9,6 bis 10,4` | Frauen `r = 10,1 bis 11,0` (Fingerspitzen berühren sich gerade).
- **Breiter Körperbau (+10 %):** Männer `r < 9,6` | Frauen `r < 10,1` (Lücke zwischen den Fingerspitzen).

## Schritt-für-Schritt-Rechenbeispiel für einen Erwachsenen

Berechnen wir das Idealgewicht für einen **178,0 cm** großen Mann mit einem Handgelenkumfang von **17,5 cm**:

1. **Körperbau bestimmen:**
   `r = 178,0 cm / 17,5 cm = 10,17`. Dieser Wert liegt im Bereich `9,6 bis 10,4`, es liegt also ein **mittlerer Körperbau** (`±0 %`) vor.
2. **Größenzuwachs `ΔH` berechnen:**
   `ΔH = (178,0 − 152,4) / 2,54 = 25,6 / 2,54 = 10,08 Zoll`.
3. **Alle vier IBW-Formeln anwenden:**
   - Hamwi: `48,0 + 2,70 × 10,08 = 75,2 kg`
   - Devine: `50,0 + 2,30 × 10,08 = 73,2 kg`
   - Robinson: `52,0 + 1,90 × 10,08 = 71,2 kg`
   - Miller: `56,2 + 1,41 × 10,08 = 70,4 kg`
4. **Konsens-Mittelwert und Korrekturspanne ermitteln:**
   `(75,2 + 73,2 + 71,2 + 70,4) / 4 = 72,5 kg`.
   Bei einem schmalen Körperbau läge der Zielwert bei `72,5 × 0,90 = 65,3 kg`, bei einem breiten Körperbau bei `72,5 × 1,10 = 79,8 kg`.
5. **Abgleich mit dem WHO-BMI-Normalbereich (`1,78² = 3,1684`):**
   Untergrenze: `18,5 × 3,1684 = 58,6 kg` | Obergrenze: `24,9 × 3,1684 = 78,9 kg`.
   Der IBW-Konsenswert von `72,5 kg` entspricht einem BMI von `22,9 kg/m²` und liegt damit exakt im statistisch günstigsten Zentrum des WHO-Normbereichs.

## Referenzwerte nach Körpergröße und Geschlecht im Überblick

Die folgende Tabelle stellt die Ergebnisse der einflussreichsten Formeln (Devine, Hamwi), den Durchschnitt aller vier Formeln, die Körperbau-Spanne (`±10 %`) und den WHO-BMI-Korridor gegenüber:

| Körpergröße | Geschlecht | Devine (kg) | Hamwi (kg) | 4-Formel-Mittel (kg) | Körperbau ±10 % (kg) | WHO-BMI 18,5–24,9 (kg) |
|---|---|---|---|---|---|---|
| **160 cm** | Frau | 52,4 | 52,1 | 53,9 | 48,5–59,3 | 47,4–63,7 |
| **168 cm** | Frau | 59,6 | 59,0 | 59,9 | 53,9–65,9 | 52,2–70,3 |
| **175 cm** | Frau | 66,0 | 65,1 | 65,1 | 58,6–71,6 | 56,7–76,3 |
| **172 cm** | Mann | 67,7 | 68,8 | 67,6 | 60,8–74,4 | 54,7–73,7 |
| **180 cm** | Mann | 75,0 | 77,3 | 74,1 | 66,7–81,5 | 59,9–80,7 |
| **188 cm** | Mann | 82,2 | 85,8 | 80,7 | 72,6–88,8 | 65,4–88,0 |

## Klinische Einsatzgebiete, typische Fehlinterpretationen und Grenzen

In der modernen Medizin wird insbesondere die **Devine-Formel** weiterhin intensiv eingesetzt — etwa zur Berechnung lungenprotektiver Atemzugvolumina (`6 bis 8 ml pro kg Idealgewicht`) auf Intensivstationen oder für Arzneistoffe, die sich kaum ins Fettgewebe verteilen (z. B. Aminoglykoside, Aciclovir, Theophyllin). Für persönliche Fitness- und Gesundheitsziele unterliegen reine IBW-Gleichungen jedoch klaren Grenzen:

- **Fehlende Körperzusammensetzung:** IBW-Formeln unterscheiden nicht zwischen Skelettmuskulatur und viszeralem Bauchfett. Kraftsportler können `10 bis 15 kg` über dem IBW liegen und dennoch einen gesunden Körperfettanteil aufweisen, während bewegungsarme Personen im „Idealgewicht“ bereits eine ungesunde Verfettung bei geringer Muskelmasse (Sarkopenie) entwickeln können.
- **Verzerrungen bei sehr kleiner oder sehr großer Statur:** Da die Basisgleichung empirisch auf Erwachsene mittlerer Größe zugeschnitten wurde, liefert Devine bei Frauen unter `152 cm` teils unplausibel niedrige Werte, während Hamwi bei Männern über `190 cm` vergleichsweise hoch ansteigt.
- **Altersabhängigkeit der Optimalbereiche:** Ab dem **65. Lebensjahr** verschiebt sich das mortalitätsgünstigste Gewicht in geriatrischen Leitlinien leicht nach oben (BMI ca. **24 bis 29 kg/m²**), da eine moderate Energiereserve bei akuten Erkrankungen schützend wirkt.

Kombinieren Sie das Idealgewicht daher idealerweise mit der **Waist-to-Height-Ratio** (`Taillenumfang / Körpergröße < 0,50`) sowie dem Taillenumfang (Risikoschwellen laut WHO/IDF: `< 94 cm` bei Männern, `< 80 cm` bei Frauen), um metabolische Gesundheitsrisiken zuverlässig zu bewerten.
