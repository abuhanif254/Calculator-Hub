---
title: "BMI-Rechner"
metaTitle: "BMI-Rechner: Body-Mass-Index, Idealgewicht & Körperfett"
description: "Ermitteln Sie Ihren Body-Mass-Index (BMI), den gesunden Gewichtsbereich, den Ponderal-Index und den geschätzten Körperfettanteil in metrischen oder US-Einheiten."
metaDescription: "Berechnen Sie Ihren BMI nach WHO-Standard inklusive gesundem Gewichtsbereich, Ponderal-Index, Körperfett-Schätzung und metrischer/US-Umrechnung."
metaKeywords: "bmi rechner, body mass index berechnen, who bmi tabelle, normalgewicht berechnen, ponderal index, körperfettanteil deurenberg, bmi frau mann"
faqs:
  - question: "Ab welchem BMI spricht die WHO bei Erwachsenen von Normalgewicht oder Übergewicht?"
    answer: "Nach der Klassifikation der Weltgesundheitsorganisation (WHO) gilt für Erwachsene ein BMI zwischen 18,5 und 24,9 kg/m² als Normalgewicht. Werte unter 18,5 kg/m² werden als Untergewicht eingestuft, Werte von 25,0 bis 29,9 kg/m² als Präadipositas (Übergewicht) und Werte ab 30,0 kg/m² als Adipositas der Grade I bis III."
  - question: "Warum fragt der BMI-Rechner zusätzlich nach Alter und Geschlecht?"
    answer: "Für die eigentliche Quetelet-Formel des BMI sind ausschließlich Körpergewicht und Körpergröße maßgeblich. Alter und Geschlecht nutzt unser Rechner zusätzlich, um mithilfe der wissenschaftlich etablierten Deurenberg-Formel den prozentualen Körperfettanteil abzuschätzen – denn Frauen weisen biologisch bedingt bei gleichem BMI im Schnitt rund 10 bis 11 Prozentpunkte mehr Körperfett auf als Männer."
  - question: "Was sagt der Ponderal-Index im Vergleich zum klassischen BMI aus?"
    answer: "Während der BMI das Gewicht durch das Quadrat der Körpergröße teilt, verwendet der Ponderal-Index (auch Rohrer-Index) die dritte Potenz der Körpergröße in Metern. Da das Körpervolumen dreidimensional wächst, korrigiert der Ponderal-Index systematische Verzerrungen des BMI bei besonders großen Menschen über 1,90 m und sehr kleinen Personen unter 1,55 m."
  - question: "Ist der BMI für Kraftsportler, Schwangere oder Kinder aussagekräftig?"
    answer: "Nein, in diesen Gruppen stößt der klassische Erwachsenen-BMI an Grenzen. Weil Muskelgewebe eine höhere Dichte als Fettgewebe besitzt, werden sehr muskulöse Sportler oft fälschlich als übergewichtig eingestuft. Bei Kindern und Jugendlichen unter 18 Jahren müssen statt fester Schwellenwerte alters- und geschlechtsspezifische Perzentilkurven (etwa nach Kromeyer-Hauschild im DACH-Raum) herangezogen werden."
  - question: "Wie rechnet der Rechner zwischen metrischen und angloamerikanischen Einheiten um?"
    answer: "Sämtliche Berechnungen erfolgen intern verlustfrei im metrischen SI-System (Kilogramm und Meter). Geben Sie Ihr Gewicht in Pfund (lbs) und Ihre Größe in Fuß und Zoll (ft/in) ein, rechnet der Rechner exakt über 1 lb = 0,453592 kg und 1 Zoll = 2,54 cm um, bevor BMI, Normalgewichtsbereich und Zusatzkennzahlen bestimmt werden."
---

## Körpergewicht wissenschaftlich fundiert einordnen

Der **Body-Mass-Index (BMI)** – auf Deutsch auch Körpermasseindex genannt – gehört weltweit zu den am häufigsten eingesetzten Orientierungsgrößen in der Ernährungsmedizin, Prävention und Epidemiologie. Die Kennzahl wurde bereits im 19. Jahrhundert vom belgischen Mathematiker und Statistiker Adolphe Quetelet entwickelt und setzt das Körpergewicht ins Verhältnis zum Quadrat der Körpergröße. So lässt sich mit wenigen Angaben abschätzen, ob das aktuelle Gewicht im statistisch gesundheitsförderlichen Bereich liegt oder ob ein erhöhtes Risiko für Herz-Kreislauf-Erkrankungen, Typ-2-Diabetes oder Gelenkbelastungen bestehen kann.

Unser **BMI-Rechner** geht deutlich über eine einzelne Zahl hinaus: Auf Basis von Körpergröße, Gewicht, Alter und Geschlecht berechnet das Werkzeug neben dem exakten **BMI-Wert** und der zugehörigen **WHO-Gewichtskategorie** auch Ihren persönlichen **Normalgewichtsbereich**, den volumenkorrigierten **Ponderal-Index** sowie eine **Schätzung des Körperfettanteils** nach Deurenberg. Zudem unterstützt die Anwendung sowohl das im DACH-Raum übliche metrische System (`kg`, `cm`) als auch US-Einheiten (`lbs`, `ft/in`).

## Die zugrunde liegenden Formeln im Detail

Alle Berechnungen basieren auf den internationalen SI-Einheiten Kilogramm (`kg`) und Meter (`m`). Eine in Zentimetern (`cm`) gemessene Körpergröße wird vorab durch 100 geteilt.

```text
1. Body-Mass-Index (Quetelet-Formel):
   BMI = m / h^2        [Einheit: kg/m^2]

2. Gesunder Gewichtsbereich (WHO-Korridor 18,5 bis 24,9 kg/m^2):
   m_min = 18,5 * h^2
   m_max = 24,9 * h^2

3. Ponderal-Index (Rohrer-Index):
   PI  = m / h^3        [Einheit: kg/m^3]

4. Geschätzter Körperfettanteil nach Deurenberg (Erwachsene ab 15 Jahren):
   KFA (%) = 1,20 * BMI + 0,23 * Alter - 10,8 * G - 5,4
   (für Kinder und Jugendliche unter 15 Jahren:
   KFA (%) = 1,51 * BMI - 0,70 * Alter - 3,6 * G + 1,4)

Umrechnung angloamerikanischer Eingaben:
   m (kg) = Gewicht (lbs) / 2,20462
   h (cm) = (Fuß * 12 + Zoll) * 2,54
```

**Bedeutung der Variablen:**
- **`m`** steht für die Körpermasse in Kilogramm (`kg`).
- **`h`** bezeichnet die Körpergröße in Metern (`m`).
- **`BMI`** ergibt den Body-Mass-Index in `kg/m²`.
- **`PI`** ist der Ponderal-Index in `kg/m³` (typischer Normbereich bei Erwachsenen: etwa `11` bis `14 kg/m³`).
- **`Alter`** gibt das Lebensalter in Jahren an.
- **`G`** ist der binäre Geschlechtsfaktor (`1` für Männer, `0` für Frauen).

## Schritt-für-Schritt-Rechenbeispiel

Betrachten wir einen **38-jährigen Mann** mit einer Körpergröße von **178 cm** (`1,78 m`) und einem Körpergewicht von **82,5 kg**:

1. **Quadrat der Körpergröße bestimmen:** `h² = 1,78 m × 1,78 m = 3,1684 m²`.
2. **BMI berechnen:** `BMI = 82,5 kg / 3,1684 m² = 26,04 kg/m²`, gerundet **`26,0 kg/m²`**. Nach WHO-Klassifikation liegt damit ein leichtes Übergewicht (Präadipositas) vor.
3. **Persönlichen Normalgewichtsbereich ermitteln:**
   - Untere Grenze (`BMI 18,5`): `18,5 × 3,1684 = 58,6 kg`
   - Obere Grenze (`BMI 24,9`): `24,9 × 3,1684 = 78,9 kg` (die rechnerische Schwelle von `25,0` entspricht `79,2 kg`).
   Der Beispielwert liegt somit `3,3 kg` oberhalb der Normalgewichtsgrenze.
4. **Ponderal-Index berechnen:** `PI = 82,5 kg / (1,78 m)³ = 82,5 / 5,6398 = 14,63 kg/m³`.
5. **Körperfettanteil nach Deurenberg abschätzen:**
   `KFA = 1,20 × 26,04 + 0,23 × 38 − 10,8 × 1 − 5,4 = 31,25 + 8,74 − 10,8 − 5,4 = 23,8 %`.

Zum Vergleich bei US-Eingaben: Eine Person mit `180 lbs` und `5 ft 10 in` (`70 Zoll`) wird intern exakt auf `81,65 kg` und `177,80 cm` umgerechnet, woraus sich ein BMI von `25,8 kg/m²` ergibt.

## WHO-Referenztabelle für Erwachsene (mit Beispielgewicht bei 1,75 m)

Die folgende Tabelle fasst die internationale WHO-Einteilung zusammen, wie sie auch die Deutsche Adipositas-Gesellschaft (DAG), die Österreichische Adipositas Gesellschaft (ÖAG) und das Schweizer Bundesamt für Lebensmittelsicherheit (BLV) verwenden:

| WHO-Kategorie | BMI-Bereich (`kg/m²`) | Beispielgewicht bei 1,75 m | Risiko für Begleiterkrankungen |
| :--- | :--- | :--- | :--- |
| **Starkes Untergewicht** | unter 16,0 | unter 49,0 kg | Deutlich erhöht (Mangelernährung) |
| **Mäßiges Untergewicht** | 16,0 – 16,9 | 49,0 – 52,0 kg | Erhöht |
| **Leichtes Untergewicht** | 17,0 – 18,4 | 52,1 – 56,6 kg | Leicht erhöht |
| **Normalgewicht** | 18,5 – 24,9 | 56,7 – 76,5 kg | Durchschnittlich (gering) |
| **Übergewicht (Präadipositas)** | 25,0 – 29,9 | 76,6 – 91,8 kg | Leicht erhöht |
| **Adipositas Grad I** | 30,0 – 34,9 | 91,9 – 107,1 kg | Erhöht |
| **Adipositas Grad II** | 35,0 – 39,9 | 107,2 – 122,4 kg | Hoch |
| **Adipositas Grad III** | ab 40,0 | ab 122,5 kg | Sehr hoch |

## Grenzen des BMI und Praxistipps für eine realistische Bewertung

- **Fettverteilung unbedingt mit dem Taillenumfang prüfen:** Der BMI unterscheidet weder zwischen Muskel- und Fettmasse noch zwischen subkutanem und stoffwechselaktivem Bauchfett (Viszeralfett). Laut medizinischen Leitlinien im DACH-Raum steigt das kardiometabolische Risiko unabhängig vom BMI deutlich an, wenn der Taillenumfang bei Frauen über `88 cm` oder bei Männern über `102 cm` liegt (erhöhtes Risiko bereits ab `80 cm` beziehungsweise `94 cm`). Noch präziser ist das **Taille-zu-Größe-Verhältnis (WHtR)**, das bei Erwachsenen unter `0,50` liegen sollte.
- **Körperzusammensetzung bei Sportlern und älteren Menschen beachten:** Muskulöse Athleten erreichen leicht einen BMI über `26 kg/m²` bei niedrigem Körperfettanteil. Umgekehrt kann im höheren Lebensalter (ab etwa 65 Jahren) ein leicht höherer BMI zwischen `24` und `27 kg/m²` als schützende Energiereserve bei akuten Erkrankungen günstig sein, solange keine Stoffwechselerkrankungen vorliegen.
- **Standardisierte Messbedingungen einhalten:** Wiegen Sie sich morgens nüchtern nach dem Toilettengang ohne Kleidung und messen Sie Ihre Körpergröße barfuß an einer geraden Wand. Schon `2 cm` Messungenauigkeit bei der Größe verschieben den BMI um etwa `0,6` bis `0,8` Punkte.
- **Keine medizinische Diagnose ersetzen:** Der BMI dient als zuverlässige erste Orientierung für Erwachsene, ersetzt jedoch bei gesundheitlichen Beschwerden, starken Gewichtsschwankungen oder in der Schwangerschaft keine ärztliche Untersuchung.
