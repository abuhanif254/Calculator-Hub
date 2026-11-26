---
title: "Idealgewicht-Rechner: Finden Sie Ihr gesundes Gewicht"
description: "Ermitteln Sie Ihr gesundes Gewicht wissenschaftlich fundiert: WHO-BMI-Korridor, Devine- und Robinson-Formel, Taille-zu-Größe-Verhältnis (WHtR) und klinische Grenzen nach Alter und Körperbau."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "healthy-weight-calculator"
relatedType: "calculator"
faqs:
  - question: "Warum ist ein gesunder Gewichtsbereich sinnvoller als eine einzelne Idealgewichtszahl?"
    answer: "Knochenbau, Muskelanteil, Geschlecht und Flüssigkeitsstatus variieren von Mensch zu Mensch erheblich. Zwei Personen mit identischer Körpergröße von 175 cm können bei 64 kg und 75 kg gleichermaßen stoffwechselgesund sein. Ein medizinischer Zielkorridor wie der WHO-Normalgewichtsbereich bildet diese biologische Streubreite realistisch ab, während starre Einzelwerte oft unnötigen psychischen Druck erzeugen."
  - question: "Worin unterscheiden sich die Formeln nach Devine, Robinson und dem BMI?"
    answer: "Der Body-Mass-Index (BMI) definiert über das Verhältnis von Gewicht zu Körpergröße im Quadrat eine breite, epidemiologisch abgesicherte Normalgewichtsspanne (18,5 bis 24,9 kg/m²). Die Formeln nach Devine (1974) und Robinson (1983) berechnen hingegen einen einzelnen Richtwert oberhalb einer Basisgröße von 152,4 cm (60 Zoll). Devine wird bis heute vor allem in der klinischen Pharmakologie für Medikamentendosierungen genutzt, während der BMI-Korridor besser für persönliche Gesundheitsziele geeignet ist."
  - question: "Verschiebt sich der gesunde BMI-Bereich im höheren Lebensalter?"
    answer: "Ja. Während für Erwachsene zwischen 18 und 64 Jahren ein BMI von 18,5 bis 24,9 kg/m² als optimal gilt, zeigen große Bevölkerungsstudien und Empfehlungen der Deutschen Gesellschaft für Ernährung (DGE), dass ab etwa 65 Jahren ein leicht höherer Korridor von 22,0 bis 27,0 kg/m² mit der geringsten Sterblichkeit einhergeht. Eine moderate Energiereserve schützt ältere Menschen bei akuten Erkrankungen vor kritischem Muskel- und Substanzverlust."
  - question: "Was sagt das Taille-zu-Größe-Verhältnis (WHtR) zusätzlich zum Idealgewicht aus?"
    answer: "Der Waist-to-Height Ratio (WHtR = Taillenumfang in cm / Körpergröße in cm) bewertet gezielt das stoffwechselaktive Bauchfett (Viszeralfett). Als Faustregel gilt ein Wert unter 0,50 bei Erwachsenen unter 40 Jahren (bzw. unter 0,60 ab 50 Jahren) als günstig. Ein unauffälliger WHtR zeigt selbst dann ein geringes Herz-Kreislauf-Risiko an, wenn der BMI durch hohe Muskelmasse leicht über 25 liegt."
  - question: "Warum greifen traditionelle Idealgewichtsformeln bei Kraftsportlern zu kurz?"
    answer: "Skelettmuskulatur hat mit rund 1,06 g/cm³ eine deutlich höhere Dichte als Fettgewebe (ca. 0,90 g/cm³) und speichert zudem Wasser und Glykogen. Athletinnen und Athleten mit hoher Muskelmasse überschreiten sowohl den Devine-Wert als auch die BMI-Grenze von 25 kg/m², obwohl ihr Körperfettanteil im optimalen Bereich liegt. In solchen Fällen liefern Körperfettmessungen und Taillenumfang wesentlich präzisere Aussagen als reine Gewichtstabellen."
---

Auf die Frage nach dem „richtigen“ Körpergewicht nennt die Präventionsmedizin keine starre Einzelzahl, sondern einen wissenschaftlich begründeten Zielkorridor. Aktuelle Leitlinien orientieren sich an der Gewichtsspanne, in der statistisch das geringste Risiko für Herz-Kreislauf-Erkrankungen, Typ-2-Diabetes und Gelenkverschleiß besteht. Mit dem [Idealgewicht-Rechner](/de/rechner/idealgewicht-rechner) bestimmen Sie diesen Bereich anhand Ihrer Körpergröße, Ihres Geschlechts und Ihres Alters.

Verlässlicher wird das Ergebnis, wenn Sie mehrere Referenzmodelle parallel auswerten: Der **WHO-BMI-Korridor** bildet die epidemiologische Basis, die klinischen Formeln nach **Devine** und **Robinson** liefern Richtwerte für schlanke Staturen, und das **Taille-zu-Größe-Verhältnis (WHtR)** ergänzt die Kilogrammangabe um die entscheidende Aussage zur Fettverteilung.

## Berechnungsmethoden und medizinische Referenzformeln

Die Anthropometrie kombiniert den Body-Mass-Index (BMI) der Weltgesundheitsorganisation (WHO) mit linearen Standardformeln. Für den BMI gilt:

```text
BMI = Gewicht_kg / (Größe_m)²
Untergrenze (BMI 18,5) = 18,5 × (Größe_m)²
Obergrenze  (BMI 24,9) = 24,9 × (Größe_m)²
```

Ergänzend nutzen medizinische Kalkulatoren die **Devine-Formel** (1974 für Arzneistoffdosierungen entwickelt) sowie die **Robinson-Formel** (1983). Beide setzen `60 Zoll` (`152,4 cm`, mit `1 Zoll = 2,54 cm`) als Basisgröße an:

```text
Devine (Männer):   Idealgewicht_kg = 50,0 + 2,3 × ((Größe_cm / 2,54) − 60)
Devine (Frauen):   Idealgewicht_kg = 45,5 + 2,3 × ((Größe_cm / 2,54) − 60)
Robinson (Männer): Idealgewicht_kg = 52,0 + 1,9 × ((Größe_cm / 2,54) − 60)
Robinson (Frauen): Idealgewicht_kg = 49,0 + 1,7 × ((Größe_cm / 2,54) − 60)
```

Die ältere **Broca-Formel** (`Größe_cm − 100`, abzüglich `10 %` bei Männern bzw. `15 %` bei Frauen) verzerrt Ergebnisse bei sehr kleinen und sehr großen Personen und dient nur noch als grober Überschlag.

### Qualitätscheck: Taille-zu-Größe-Verhältnis (WHtR)

Weil eine Waage nicht zwischen Muskulatur und Bauchfett unterscheidet, ergänzt der **WHtR** die Gewichtsberechnung:

```text
WHtR = Taillenumfang_cm / Größe_cm
```

Messen Sie den Taillenumfang stehend nach dem Ausatmen auf halber Höhe zwischen unterstem Rippenbogen und Beckenkamm. Ein Wert unter `0,50` (ab `50 Jahren` bis `0,55`–`0,60`) deutet auf eine stoffwechselgünstige Fettverteilung hin – unabhängig von der Position innerhalb des BMI-Korridors. Werte ab `0,60` weisen hingegen auf vermehrtes viszerales Bauchfett hin, das proentzündliche Botenstoffe freisetzt und das Risiko für Bluthochdruck sowie Insulinresistenz erhöht.

### Altersabhängige Verschiebung des Zielkorridors

Epidemiologische Langzeitdaten zeigen, dass die optimale Gewichtsspanne nicht über das gesamte Erwachsenenleben statisch bleibt. Während zwischen `18` und `45 Jahren` der klassische Bereich von `BMI 18,5` bis `24,9 kg/m²` als Referenz dient, verschiebt sich der Bereich mit der geringsten Gesamtsterblichkeit ab dem `65. Lebensjahr` auf `BMI 22,0` bis `27,0 kg/m²`. Eine moderate Energiereserve im höheren Alter wirkt bei Infekten, Operationen oder Phasen verminderten Appetits als wichtiger Schutzfaktor gegen Muskelabbau und Gebrechlichkeit.

## Schritt-für-Schritt-Rechenbeispiel für einen Erwachsenen

Betrachten wir eine `38-jährige` Frau mit `168 cm` (`1,68 m`) Körpergröße und `76 cm` Taillenumfang.

1. **Quadrat der Körpergröße:** `(1,68 m)² = 2,8224 m²`.
2. **WHO-Normalgewichtsbereich:**
   Untergrenze (`BMI 18,5`): `18,5 × 2,8224 = 52,21 kg` (**52,2 kg**)
   Obergrenze (`BMI 24,9`): `24,9 × 2,8224 = 70,28 kg` (**70,3 kg**)
   Korridormitte (`BMI 21,7`): `21,7 × 2,8224 = 61,25 kg` (**61,3 kg**)
3. **Devine- und Robinson-Formel:**
   Zoll-Umrechnung: `168 / 2,54 = 66,142 Zoll`, also `6,142 Zoll` über `60 Zoll`.
   Devine (Frau): `45,5 + (2,3 × 6,142) = 59,63 kg` (**59,6 kg**)
   Robinson (Frau): `49,0 + (1,7 × 6,142) = 59,44 kg` (**59,4 kg**)
4. **WHtR-Prüfung:** `76 / 168 = 0,452` – deutlich unter `0,50` und damit stoffwechselgesund.

Der Richtwert von rund `59,5 kg` liegt harmonisch im unteren bis mittleren Abschnitt des `18 kg` breiten WHO-Korridors (`52,2` bis `70,3 kg`).

## Vergleich der Idealgewicht-Modelle nach Körpergröße

Die Übersicht zeigt die Ergebnisse für sechs typische Körpergrößen und veranschaulicht die Breite des BMI-Korridors im Vergleich zu den Einzelwerten:

| Körpergröße | WHO-BMI (18,5–24,9) | Devine (Frau) | Devine (Mann) | Robinson (Frau) | Robinson (Mann) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `160 cm` | `47,4 – 63,7 kg` | `52,4 kg` | `56,9 kg` | `54,1 kg` | `57,7 kg` |
| `165 cm` | `50,4 – 67,8 kg` | `56,9 kg` | `61,4 kg` | `57,4 kg` | `61,4 kg` |
| `170 cm` | `53,5 – 72,0 kg` | `61,4 kg` | `65,9 kg` | `60,8 kg` | `65,2 kg` |
| `175 cm` | `56,7 – 76,3 kg` | `66,0 kg` | `70,5 kg` | `64,1 kg` | `68,9 kg` |
| `180 cm` | `59,9 – 80,7 kg` | `70,5 kg` | `75,0 kg` | `67,5 kg` | `72,6 kg` |
| `185 cm` | `63,3 – 85,2 kg` | `75,0 kg` | `79,5 kg` | `70,8 kg` | `76,4 kg` |

Während Devine und Robinson bei `165 cm` fast übereinstimmen, weichen sie bei `185 cm` um `3` bis `4 kg` voneinander ab.

## Anwendungsfälle, Messfehler und klinische Einordnung

Der berechnete Korridor eignet sich für die Gesundheitsvorsorge, realistische Diätziele und die langfristige Gewichtskontrolle. In der Klinik dient das Devine-Idealgewicht zudem als Berechnungsbasis für Beatmungsvolumina und die Dosierung bestimmter Medikamente.

Vermeiden Sie bei der Einordnung vier typische Fehlinterpretationen:
- **Hohe Muskelmasse:** Kraftsportler überschreiten häufig `BMI 25,0`, bleiben bei Körperfettanteil und WHtR jedoch im Optimalbereich.
- **Sarkopene Adipositas:** Bei geringer Muskelmasse kann ein normaler BMI (`21`) dennoch mit erhöhtem Viszeralfett einhergehen.
- **Alters- und Herkunftsunterschiede:** Ab `65 Jahren` gilt ein BMI von `22` bis `27 kg/m²` als vorteilhaft; für asiatische Bevölkerungsgruppen setzt die WHO Übergewicht bereits ab `BMI 23,0` an.
- **Wasserhaushalt:** Hormonzyklen, salzreiche Kost, Kreatin oder Ödeme verschieben das Gewicht kurzfristig um `1` bis `3 kg` ohne Fettveränderung.

### Medizinischer Hinweis

Für Kinder und Jugendliche unter `18 Jahren` sind Erwachsenen-Formeln ungeeignet; hier gelten alters- und geschlechtsspezifische Perzentilkurven. Bei ungewolltem Gewichtsverlust, Untergewicht (`BMI < 18,5`) oder Verdacht auf eine Essstörung sollte jedes Gewichtsziel ärztlich abgeklärt werden.
