---
title: "Verdünnungsreihen: Präzise Konzentrationen herstellen"
description: "Lernen Sie den Verdünnungsfaktor, wie man serielle Verdünnungen im Labor durchführt, und nutzen Sie unseren allgemeinen Verdünnungs-Rechner."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "dilution-calculator"
relatedType: "calculator"
faqs:
  - question: "Was ist der Unterschied zwischen einer 1:10-Verdünnung und einem 1+9-Mischungsverhältnis?"
    answer: "Eine 1:10-Verdünnung bezeichnet nach Laborstandard 1 Teil Stammlösung in 10 Teilen Gesamtvolumen (also 1 Teil Stammlösung plus 9 Teile Lösungsmittel). Die Schreibweise 1+9 gibt dagegen explizit die beiden einzeln zu mischenden Teilvolumina an, was ebenfalls einen Verdünnungsfaktor von 10 ergibt. Eine Verwechslung mit 1 Teil plus 10 Teilen führt zu einem Faktor von 11 und einem systematischen Konzentrationsfehler von rund 9,1 %."
  - question: "Wann sollte eine serielle Verdünnungsreihe statt einer einstufigen Verdünnung gewählt werden?"
    answer: "Eine serielle Verdünnungsreihe ist immer dann erforderlich, wenn der gewünschte Gesamtverdünnungsfaktor sehr groß ist (typischerweise ab 1:1.000 oder höher), weil sich extrem kleine Volumina wie 0,5 µL in ein großes Zielvolumen kaum präzise pipettieren lassen. Außerdem wird sie eingesetzt, wenn für Kalibrierkurven, minimale Hemmkonzentrationen (MHK) oder Koloniezählungen abgestufte Konzentrationsstufen benötigt werden."
  - question: "Warum darf man beim Verdünnen konzentrierter Säuren oder Alkohole Volumina nicht einfach addieren?"
    answer: "Bei stark konzentrierten wässrigen Säuren, Laugen oder Ethanol-Wasser-Mischungen tritt eine Volumenkontraktion auf: Das Gesamtvolumen der Mischung ist kleiner als die Summe der Einzelvolumina. Für maßanalytische Präzision legt man daher einen Teil des Lösungsmittels im Messkolben vor, gibt das abgemessene Volumen der Stammlösung hinzu, temperiert auf 20 °C und füllt erst danach exakt bis zur Ringmarke auf."
  - question: "Wie berechne ich die ursprüngliche Keimzahl (KBE/mL) aus einer seriellen Verdünnung?"
    answer: "Zählen Sie eine auswertbare Agarplatte mit idealerweise 30 bis 300 Kolonien und teilen Sie die Kolonienzahl durch das Produkt aus ausplattiertem Volumen (in mL) und der gewählten Verdünnungsstufe. Wurden beispielsweise 0,1 mL der Stufe 10⁻⁴ ausplattiert und 142 Kolonien gezählt, beträgt die Ausgangskonzentration 142 / (0,1 × 10⁻⁴) = 1,42 × 10⁷ KBE/mL."
  - question: "Wie stark akkumulieren sich Pipettierfehler über mehrere Stufen einer Verdünnungsreihe?"
    answer: "Bei einer mehrstufigen Reihe pflanzen sich sowohl systematische als auch zufällige Pipettierfehler multiplikativ fort. Bei fünf Stufen mit jeweils ±1,5 % Volumenabweichung kann der Gesamtfehler der Endkonzentration deutlich über ±5 % anwachsen. Abhilfe schaffen nach ISO 8655 kalibrierte Pipetten, ein konsequenter Spitzenwechsel nach jedem Transferschritt und das Vorbenetzen der Pipettenspitze."
---

Eine Verdünnung senkt die Konzentration eines gelösten Stoffes oder einer Partikelsuspension durch Zugabe von Lösungsmittel, während die absolute Stoffmenge bzw. Teilchenzahl in dem entnommenen Aliquot konstant bleibt. Ob Molarität (mol/L), Massenkonzentration (mg/L), Volumenprozent (%) oder Zellzahl (KBE/mL) – die zentrale Erhaltungsgleichung lautet stets `c₁ × V₁ = c₂ × V₂`. Für extrem geringe Zielkonzentrationen, etwa in der Mikrobiologie, Molekularbiologie oder Spurenanalytik, werden mehrere identische Verdünnungsschritte zu einer seriellen Verdünnungsreihe gekoppelt.

Im Arbeitsalltag entscheidet die saubere Unterscheidung zwischen Verdünnungsfaktor, Mischungsverhältnis und Endvolumen über die Reproduzierbarkeit von Messreihen. Bereits geringfügige Definitionsfehler zwischen Gesamtvolumen und Lösungsmittelanteil verschieben ganze Kalibrierkurven systematisch. Mit unserem [Verdünnungs-Rechner](/de/rechner/verduennungsrechner) bestimmen Sie sowohl einzelne Mischungsansätze als auch mehrstufige Konzentrationsreihen ohne Rundungs- oder Übertragungsfehler.

## Mathematische Grundlagen und Parameterdefinitionen

Das physikalische Grundprinzip jeder Verdünnung ist die Massenerhaltung bzw. Stoffmengenerhaltung vor und nach der Lösungsmittelzugabe. Daraus leiten sich drei unmittelbar verknüpfte Kenngrößen ab:

```text
Grundgleichung:       c₁ × V₁ = c₂ × V₂
Benötigte Stammprobe: V₁ = (c₂ × V₂) / c₁
Lösungsmittelvolumen: V_L = V₂ − V₁
Verdünnungsfaktor:    DF = c₁ / c₂ = V₂ / V₁
Serielle Endstufe:    c_k = c₀ / (DF₁ × DF₂ × ... × DF_k)
```

Dabei stehen die Variablen für folgende exakt definierte Größen:

- **Ausgangskonzentration (`c₁` oder `c₀`):** Konzentration der unverdünnten Stammlösung oder Ausgangssuspension. Beide Konzentrationsangaben `c₁` und `c₂` müssen in derselben Einheit vorliegen (z. B. `mg/mL`, `mmol/L`, `%` oder `KBE/mL`).
- **Entnahmevolumen (`V₁`):** Das abpipettierte Volumen der Stammlösung, das in das Zielgefäß überführt wird.
- **Zielkonzentration (`c₂`):** Die gewünschte Arbeitskonzentration nach dem Mischen.
- **Endvolumen (`V₂`):** Das gesamte Volumen der fertigen Verdünnung (`V₁ + V_L`), nicht allein das vorgelegte Lösungsmittel.
- **Verdünnungsfaktor (`DF`):** Dimensionslose Zahl größer als 1, die angibt, um welchen Faktor die Konzentration abnimmt. Bei einer Verdünnung auf ein Zehntel beträgt `DF = 10` (häufig als Verdünnungsstufe `10⁻¹` notiert).

### Verdünnungsreihe vs. einstufiger Ansatz

Bei einer einstufigen Verdünnung wird `V₁` direkt auf `V₂` aufgefüllt. Erfordert eine Analyse jedoch einen Verdünnungsfaktor von `10.000` (`10⁻⁴`), müsste für `10 mL` Endvolumen rechnerisch `1 µL` Stammlösung vorgelegt werden – ein Bereich, in dem Adhäsion, Verdunstung und Pipettentoleranzen die Genauigkeit stark beeinträchtigen. Eine serielle Verdünnungsreihe zerlegt diesen großen Sprung in vier gut beherrschbare `1:10`-Schritte (`100 µL` in `900 µL`), wodurch jedes Einzelvolumen im optimalen Arbeitsbereich der Mikropipette liegt.

## Schritt-für-Schritt-Rechenbeispiele aus der Laborpraxis

### Beispiel 1: Einstufige Arbeitslösung ansetzen

Aus einer `2,0 mol/L` Salzsäure-Stammlösung sollen `250 mL` einer `0,20 mol/L` Arbeitslösung hergestellt werden.

1. **Verdünnungsfaktor prüfen:** `DF = 2,0 mol/L / 0,20 mol/L = 10`.
2. **Stammlösungsvolumen berechnen:** `V₁ = (0,20 mol/L × 250 mL) / 2,0 mol/L = 25,0 mL`.
3. **Lösungsmittel bestimmen:** `V_L = 250 mL − 25,0 mL = 225,0 mL` Reinstwasser.
4. **Praktische Ausführung:** Etwa `150 mL` Reinstwasser im `250 mL`-Messkolben vorlegen, exakt `25,0 mL` HCl mit einer Vollpipette zugeben, durchmischen, auf `20 °C` temperieren und mit Reinstwasser bis zur Eichmarke auffüllen.

### Beispiel 2: Logarithmische Verdünnungsreihe für Protein- oder Keimanalysen

Ausgehend von einer Stammlösung mit `100,0 mg/mL` Bovinem Serumalbumin (BSA) wird eine vierstufige `1:10`-Reihe angesetzt. In alle vier Gefäße werden je `900 µL` PBS-Puffer vorgelegt:

1. **Stufe 1 (`10⁻¹`, `DF = 10`):** `100 µL` Stammlösung in `900 µL` Puffer pipettieren und mischen → `10,0 mg/mL`.
2. **Stufe 2 (`10⁻²`, `DF = 100`):** Mit neuer Spitze `100 µL` aus Stufe 1 in `900 µL` Puffer überführen → `1,00 mg/mL`.
3. **Stufe 3 (`10⁻³`, `DF = 1.000`):** Mit neuer Spitze `100 µL` aus Stufe 2 in `900 µL` Puffer transferieren → `0,10 mg/mL`.
4. **Stufe 4 (`10⁻⁴`, `DF = 10.000`):** Erneut `100 µL` aus Stufe 3 in `900 µL` Puffer übertragen → `0,010 mg/mL` (`10 µg/mL`).

In den Stufen 1 bis 3 verbleiben nach dem Übertrag jeweils `900 µL` Restvolumen, während Stufe 4 volle `1.000 µL` bereitstellt.

## Vergleich gängiger Verdünnungsstrategien und Faktoren

Die folgende Übersicht zeigt typische Verdünnungsmuster bei einem konstanten Zielansatz von `1.000 µL` (`1,0 mL`) pro Gefäß und einer Ausgangskonzentration von `100 mg/L`:

| Verdünnungsschema | Übertrag `V₁` | Lösungsmittel `V_L` | Verdünnungsfaktor (`DF`) | Konzentration Stufe 1 | Konzentration Stufe 3 | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1:2` (seriell, 2-fach) | `500 µL` | `500 µL` | `2` | `50,0 mg/L` | `12,5 mg/L` | ELISA-Titer, MHK-Tests (Antibiogramm) |
| `1:4` (seriell, 4-fach) | `250 µL` | `750 µL` | `4` | `25,0 mg/L` | `1,56 mg/L` | Zellkultur-Wirkstoffreihen, IC50-Kurven |
| `1:5` (seriell, 5-fach) | `200 µL` | `800 µL` | `5` | `20,0 mg/L` | `0,80 mg/L` | qPCR-Standardkurven, Proteinkalibrierung |
| `1:10` (dekadisch) | `100 µL` | `900 µL` | `10` | `10,0 mg/L` | `0,10 mg/L` | Mikrobiologie (KBE), Wasseranalytik |
| `1:20` (einstufig) | `50 µL` | `950 µL` | `20` | `5,0 mg/L` | `0,0125 mg/L` | Photometrische Routineproben |
| `1:100` (zweifach = `10⁻⁴`) | `10 µL` | `990 µL` | `100` | `1,0 mg/L` | `0,0001 mg/L` | Hochkonzentrierte Umwelt- und Abwasserproben |

## Anwendungsfelder, Fehlerquellen und Laborstandards

Verdünnungsrechnungen bilden das Rückgrat quantitativer Laborarbeit in der klinischen Diagnostik, Lebensmittelüberwachung, Pharmakologie und Umweltchemie. Bei der Qualitätssicherung nach ISO/IEC 17025 oder dem Europäischen Arzneibuch (Ph. Eur.) müssen alle Verdünnungsschritte lückenlos dokumentiert werden, weil jeder Transferschritt die erweiterte Messunsicherheit direkt beeinflusst.

### Typische Fehlerquellen in der Praxis

- **Verwechslung von Gesamtvolumen und Zugabevolumen:** Wer bei einer `1:10`-Verdünnung `100 µL` Probe zu `1.000 µL` Puffer gibt, erzeugt ein Endvolumen von `1.100 µL` und somit einen Faktor von `11` statt `10`.
- **Verschleppung (Carry-over) ohne Spitzenwechsel:** Wird dieselbe Pipettenspitze über mehrere Stufen verwendet, haften Spuren der höher konzentrierten Ausgangslösung an der Außen- und Innenwand. Bei Faktoren ab `1:100` verfälscht dies die Endkonzentration massiv.
- **Unzureichende Durchmischung:** Viskose Lösungen wie Glycerin oder Serum sinken auf den Gefäßboden; vor der Entnahme des nächsten Aliquots muss gründlich gevortext werden.
- **Volumenkontraktion und Temperaturdrift:** Bei organischen Lösungsmitteln oder hochmolaren Elektrolyten ist das Mischvolumen nicht streng additiv; für analytische Standards sind geeichte Messkolben der Klasse A bei `20 °C` zu verwenden.
- **Sicherheitshinweis bei starken Säuren und Basen:** Exotherme Mischungsenthalpien führen zu starker Erwärmung und Siedeverzug. Legen Sie stets Wasser vor und geben Sie konzentrierte Säure langsam unter Rühren und Kühlung hinzu.
