---
title: "Gesundes Gewicht Rechner: Idealgewicht & Körperzusammensetzung"
metaTitle: "Gesundes Gewicht Rechner | Idealgewicht & BMI-Berechnung"
description: "Berechnen Sie Ihren gesunden Gewichtskorridor nach WHO-BMI sowie klinischen Idealgewichtsformeln (Devine, Robinson, Miller, Hamwi) inklusive Körperbau-Faktor über den Handgelenksumfang."
metaDescription: "Berechnen Sie Ihr gesundes Gewicht nach WHO-BMI, Devine-, Robinson-, Miller- und Hamwi-Formel inklusive Körperbau-Anpassung per Handgelenk."
metaKeywords: "gesundes gewicht rechner, idealgewicht berechnen, normalgewicht rechner, devine formel, robinson formel, miller formel, who bmi bereich, koerperbau handgelenk"
faqs:
  - question: "Was ist der Unterschied zwischen Normalgewicht und klinischem Idealgewicht?"
    answer: "Das Normalgewicht bezeichnet einen breiten, statistisch günstigen Gewichtskorridor auf Basis der Weltgesundheitsorganisation (BMI 18,5 bis 24,9 kg/m²). Das klinische Idealgewicht ist hingegen ein rechnerischer Einzelwert aus medizinischen Formeln wie Devine, Robinson, Miller oder Hamwi, die ursprünglich für Medikamentendosierungen und Ernährungsmedizin entwickelt wurden."
  - question: "Warum berücksichtigt der Rechner den Körperbau über den Handgelenksumfang?"
    answer: "Zwei gleich große Menschen können eine deutlich unterschiedliche Knochenbreite und Skelettmasse besitzen. Über das Verhältnis von Körpergröße zu Handgelenksumfang lässt sich der Körperbau in schmal, mittel oder kräftig einteilen. Eine Anpassung um minus 10 % bei schmalem oder plus 10 % bei kräftigem Knochenbau verhindert unrealistische Gewichtsvorgaben."
  - question: "Warum greift der BMI bei Kraftsportlern und älteren Menschen oft zu kurz?"
    answer: "Der BMI unterscheidet nicht zwischen fettfreier Muskelmasse und Körperfett. Gut trainierte Sportler überschreiten häufig einen BMI von 25 kg/m² bei sehr niedrigem Körperfettanteil. Umgekehrt zeigen Daten der Deutschen Gesellschaft für Ernährung (DGE), dass ab etwa 65 Jahren leicht höhere BMI-Werte zwischen 24 und 29 kg/m² als schützende Reserve bei Erkrankungen günstig sein können."
  - question: "Welche Rolle spielt der Taillenumfang neben dem Körpergewicht?"
    answer: "Entscheidend für das kardiometabolische Risiko ist besonders das stoffwechselaktive Bauchfett (viszerales Fett). Laut WHO und Deutscher Adipositas-Gesellschaft steigt das Risiko für Typ-2-Diabetes und Herz-Kreislauf-Erkrankungen bei Frauen ab 80 cm (stark erhöht ab 88 cm) und bei Männern ab 94 cm (stark erhöht ab 102 cm) Taillenumfang – selbst bei normalem BMI."
  - question: "Gelten die klinischen Idealgewichtsformeln auch für Kinder und Jugendliche?"
    answer: "Nein. Die starren WHO-BMI-Grenzen sowie die Formeln nach Devine, Robinson, Miller und Hamwi sind ausschließlich für ausgewachsene Erwachsene validiert. Bei Kindern und Jugendlichen zwischen 2 und 18 Jahren verwenden Kinderärzte im DACH-Raum alters- und geschlechtsspezifische BMI-Perzentilkurven (Kromeyer-Hauschild-Referenzwerte)."
---

Ein gesundes Körpergewicht ist kein enges kosmetisches Schönheitsideal, sondern ein individueller medizinischer Zielkorridor, in dem Herz-Kreislauf-System, Stoffwechsel und Bewegungsapparat statistisch am geringsten belastet sind. Weil reine Einzelwerte die biologische Vielfalt von Geschlecht, Skelettbau und Muskelanteil nicht abbilden können, kombiniert unser **Gesundes Gewicht Rechner** den international anerkannten **WHO-BMI-Korridor** mit vier klinischen Idealgewichtsformeln (**Devine, Robinson, Miller und Hamwi**) sowie einer optionalen Anpassung an Ihren **Körperbau** über den Handgelenksumfang.

## Mathematische Grundlagen: WHO-BMI, klinische Formeln und Körperbau-Faktor

Ausgangspunkt der Berechnung ist der Body-Mass-Index (**BMI**), der das Körpergewicht **m** in Kilogramm (`kg`) ins Verhältnis zum Quadrat der Körpergröße **h** in Metern (`m`) setzt. Um die genetische Skelettbreite einzubeziehen, multipliziert der Rechner die Zielbereiche zusätzlich mit einem Körperbau-Faktor **f_bau** (`0,90` bei schmalem, `1,00` bei mittlerem und `1,10` bei kräftigem Knochenbau):

```text
BMI (kg/m²):        BMI = m / h²
WHO-Korridor (kg):  m_min = 18,5 × h² × f_bau | m_max = 24,9 × h² × f_bau | m_opt = 21,7 × h² × f_bau
Körperbau-Index:    r = Körpergröße (cm) / Handgelenksumfang (cm)
```

Für die Klassifikation des Körperbaus über den Handgelenksumfang (gemessen unmittelbar oberhalb des Handgelenksknöchels an der dominanten Hand) gelten geschlechtsspezifische Schwellenwerte: Bei **Männern** steht `r > 10,4` für schmalen, `9,6 bis 10,4` für mittleren und `r < 9,6` für kräftigen Körperbau; bei **Frauen** liegen die Grenzen bei `r > 11,0` (schmal), `10,1 bis 11,0` (mittel) und `r < 10,1` (kräftig).

Ergänzend ermittelt der Rechner das klinische Idealgewicht aus vier etablierten medizinischen Regressionsgleichungen. Da diese ursprünglich im angloamerikanischen Klinikalltag entwickelt wurden, nutzen sie den Größenüberhang **Δh** in Zoll über einer Grundgröße von 5 Fuß (`60 Zoll = 152,4 cm`):

```text
Größenüberhang:  Δh = (Körpergröße in cm − 152,4) / 2,54
Devine (1974):   Männer: 50,0 + 2,30 × Δh | Frauen: 45,5 + 2,30 × Δh
Robinson (1983): Männer: 52,0 + 1,90 × Δh | Frauen: 49,0 + 1,70 × Δh
Miller (1983):   Männer: 56,2 + 1,41 × Δh | Frauen: 53,1 + 1,36 × Δh
Hamwi (1964):    Männer: 48,0 + 2,70 × Δh | Frauen: 45,5 + 2,20 × Δh
```

Alle vier Ergebnisse werden ebenfalls mit **f_bau** skaliert und zu einem ausgewogenen klinischen Durchschnitt zusammengeführt.

## Schritt-für-Schritt-Rechenbeispiel: Frau, 168 cm Körpergröße

Betrachten wir eine **34-jährige Frau** mit **168 cm** Körpergröße (`1,68 m`), einem aktuellen Körpergewicht von **64,0 kg** und einem Handgelenksumfang von **16,0 cm**.

**1. Körperbau und aktuellen BMI bestimmen:**
- Größen-Handgelenks-Verhältnis: `r = 168 / 16,0 = 10,50`. Da dieser Wert zwischen `10,1` und `11,0` liegt, ergibt sich ein **mittlerer Körperbau** (`f_bau = 1,00`).
- Aktueller BMI: `64,0 / 1,68² = 64,0 / 2,8224 = 22,68 kg/m²` – klar innerhalb des WHO-Normalgewichts.

**2. Gesunden WHO-Gewichtskorridor berechnen:**
- Untergrenze (BMI 18,5): `18,5 × 2,8224 = 52,2 kg`
- Obergrenze (BMI 24,9): `24,9 × 2,8224 = 70,3 kg`
- Rechnerischer Mittelpunkt (BMI 21,7): `21,7 × 2,8224 = 61,2 kg`

**3. Klinische Idealgewichtsformeln anwenden:**
Der Größenüberhang über 152,4 cm beträgt `Δh = (168 − 152,4) / 2,54 = 6,14 Zoll`.
- **Devine:** `45,5 + 2,30 × 6,14 = 59,6 kg`
- **Robinson:** `49,0 + 1,70 × 6,14 = 59,4 kg`
- **Miller:** `53,1 + 1,36 × 6,14 = 61,5 kg`
- **Hamwi:** `45,5 + 2,20 × 6,14 = 59,0 kg`
- **Klinischer Mittelwert:** `(59,6 + 59,4 + 61,5 + 59,0) / 4 = 59,9 kg`.

**Vergleich bei kräftigem Körperbau:** Hätte dieselbe Frau bei gleicher Körpergröße einen Handgelenksumfang von **17,2 cm** (`r = 9,77 < 10,1`, also `f_bau = 1,10`), verschöbe sich ihr gesunder WHO-Korridor auf **57,4–77,3 kg** und der klinische Zielwert auf **65,9 kg**. Mit 64,0 kg läge sie in beiden Konstellationen mitten im optimalen Gesundheitsbereich.

## Referenztabelle: Gewichtskorridore und Taillen-Richtwerte nach Körpergröße

Die Tabelle zeigt für einen mittleren Körperbau (`f_bau = 1,00`) den WHO-Normalgewichtsbereich, den klinischen Mittelwert aus allen vier Formeln sowie den maximalen empfohlenen Taillenumfang nach dem **Taille-zu-Größe-Verhältnis** (`WHtR < 0,5`, also Taillenumfang kleiner als die halbe Körpergröße):

| Körpergröße | WHO-Normalgewicht (BMI 18,5–24,9) | Idealgewicht Frauen (Mittel) | Idealgewicht Männer (Mittel) | Ziel-Taillenumfang (WHtR < 0,5) |
| :--- | :--- | :--- | :--- | :--- |
| **160 cm** | 47,4–63,7 kg | 53,9 kg | 57,8 kg | < 80,0 cm |
| **170 cm** | 53,5–72,0 kg | 61,4 kg | 65,9 kg | < 85,0 cm |
| **175 cm** | 56,7–76,3 kg | 65,1 kg | 70,0 kg | < 87,5 cm |
| **180 cm** | 59,9–80,7 kg | 68,8 kg | 74,1 kg | < 90,0 cm |
| **190 cm** | 66,8–89,9 kg | 76,3 kg | 82,3 kg | < 95,0 cm |

## Messung in der Praxis: Wie Sie verlässliche Verlaufswerte erfassen

Das Körpergewicht schwankt im Tagesverlauf durch Wasserhaushalt, Salzzufuhr, Glykogenspeicher und hormonelle Einflüsse problemlos um **1,0 bis 2,0 kg**. Für eine seriöse Einordnung sollten Sie sich stets morgens nüchtern nach dem Toilettengang wiegen und den gleitenden **Sieben-Tage-Durchschnitt** bewerten statt einzelner Ausreißertage. Den ergänzenden Taillenumfang messen Sie mit einem flexiblen Maßband in der Mitte zwischen unterstem Rippenbogen und oberem Beckenkamm nach normalem Ausatmen, ohne den Bauch einzuziehen.

## Grenzen der Formeln und medizinische Praxistipps

- **Körperzusammensetzung statt Waagenzahl allein bewerten:** Die deutsche S3-Leitlinie zur Prävention und Therapie der Adipositas betont, dass der BMI stets gemeinsam mit dem **Taillenumfang** oder dem **Taille-zu-Größe-Verhältnis** beurteilt werden sollte. Viszerales Bauchfett ist hormonell hochaktiv und deutlich risikoreicher als Unterhautfett an Hüften oder Oberschenkeln.
- **Randbereiche bei Körpergröße beachten:** Die linearen US-Formeln (insbesondere Devine und Hamwi) unterschätzen bei Frauen unter 155 cm häufig das gesunde Gewicht und steigen über 190 cm vergleichsweise steil an. Orientieren Sie sich in Randbereichen vorrangig am WHO-Korridor in Verbindung mit Körperbau und Körperfettmessung.
- **Altersabhängige Gewichtstoleranz einbeziehen:** Im höheren Erwachsenenalter wächst das Risiko eines schleichenden Muskelabbaus (*Sarkopenie*). Ein moderater BMI zwischen 24 und 27 kg/m² bei gleichzeitig stabiler Muskelkraft und gesunden Blutwerten ist ab 65 Jahren häufig günstiger als ein strenges Abnehmen in Richtung 20 kg/m².
- **Nachhaltige Veränderungsraten wählen:** Für eine langfristige Gewichtsreduktion ohne Abbau wertvoller Muskulatur empfehlen Ernährungsmediziner ein moderates Defizit entsprechend **0,3 bis 0,5 kg pro Woche** (rund 300 bis 500 kcal täglich), kombiniert mit ausreichender Eiweißzufuhr und regelmäßigem Krafttraining.
