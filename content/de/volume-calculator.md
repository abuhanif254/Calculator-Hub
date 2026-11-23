---
title: "Volumenrechner"
metaTitle: "Volumenrechner | Rauminhalt von 3D-Körpern exakt berechnen"
description: "Berechnen Sie das exakte Volumen und Fassungsvermögen von Zylinder, Kugel, Quader, Würfel, Kegel, Pyramide und Rohren in Kubikmetern und Litern."
metaDescription: "Kostenloser Volumenrechner für 3D-Körper: Berechnen Sie Rauminhalt und Fassungsvermögen in m³, cm³ und Litern für Zylinder, Kugel, Quader, Kegel & Würfel."
metaKeywords: "volumenrechner, volumen berechnen, rauminhalt formel, zylinder volumen in liter, kugel volumen berechnen, quader kubikmeter berechnen, kegel volumen"
faqs:
  - question: "Wie rechnet man Kubikmeter (m³) und Kubikzentimeter (cm³) in Liter um?"
    answer: "Im metrischen SI-System entspricht ein Liter (L) exakt einem Kubikdezimeter (1 dm³), also einem Würfel mit 10 cm Kantenlänge. Daraus folgt: 1 Kubikmeter (m³) umfasst genau 1.000 Liter, während 1.000 Kubikzentimeter (cm³) genau 1 Liter ergeben (1 cm³ = 1 Milliliter)."
  - question: "Warum hat die Formel für Kegel und Pyramide immer den Faktor ein Drittel (1/3)?"
    answer: "Nach dem Satz von Cavalieri und der Integralrechnung nimmt die Querschnittsfläche eines spitz zulaufenden Körpers von der Grundfläche bis zur Spitze quadratisch mit der Höhe ab. Das Integral von 0 bis h über den Querschnittsverlauf liefert für jeden geraden oder schiefen Spitzkörper exakt ein Drittel des Volumens eines Prismas oder Zylinders mit identischer Grundfläche und Höhe."
  - question: "Was passiert mit dem Volumen einer Kugel oder eines Zylinders, wenn sich der Radius verdoppelt?"
    answer: "Beim Zylinder geht der Radius im Quadrat in die Formel ein (V = π · r² · h): Eine Verdopplung des Radius bei gleicher Höhe vervierfacht das Volumen. Bei der Kugel steht der Radius in der dritten Potenz (V = 4/3 · π · r³): Eine Verdopplung des Radius führt hier zu einer Verachtfachung des Rauminhalts."
  - question: "Worin liegt der Unterschied zwischen dem Außenvolumen und dem Fassungsvermögen (Kapazität)?"
    answer: "Das geometrische Außenvolumen gibt an, wie viel Raum ein Körper inklusive seiner Außenwände verdrängt. Das Fassungsvermögen (Netto-Innenvolumen) bezeichnet hingegen die Flüssigkeits- oder Schüttgutmenge, die ein Hohlkörper aufnehmen kann. Für die Kapazitätsberechnung müssen Sie die Wandstärke w vorab vom Außenradius (r_innen = r_außen − w) und gegebenenfalls von der Gesamthöhe abziehen."
  - question: "Wie rechnet man US-Gallonen oder Kubikfuß aus internationalen Datenblättern in Liter und Kubikmeter um?"
    answer: "Eine US-Flüssiggallone (US Liquid Gallon) entspricht exakt 3,78541 Litern, während eine britische Imperial Gallon 4,54609 Liter fasst. Ein angloamerikanischer Kubikfuß (Cubic Foot, ft³) entspricht 28,3168 Litern beziehungsweise 0,0283168 Kubikmetern, und ein Kubikzoll (Cubic Inch, in³) beträgt 16,387 Kubikzentimeter."
---

Das **Volumen** (in der Geometrie und Technik auch als **Rauminhalt** bezeichnet) gibt an, wie viel dreidimensionalen Raum ein Körper einnimmt. Im Internationalen Einheitensystem (SI) ist die Basiseinheit der **Kubikmeter ($\text{m}^3$)**, ergänzt durch das in Haustechnik, Alltag und Chemie gebräuchliche Hohlmaß **Liter ($\text{L}$ bzw. $\text{dm}^3$)**. Ob Sie den Transportbetonbedarf für ein Fundament kalkulieren, das Speichervolumen einer Regenwasserzisterne auslegen, das Frachtvolumen in der Logistik bestimmen oder den Erdaushub für ein Schwimmbecken planen: Eine präzise Volumenberechnung schützt vor teuren Materialfehlbestellungen.

Unser Volumenrechner deckt die wichtigsten Körper der räumlichen Geometrie (Stereometrie) ab und rechnet Ihre Eingaben direkt in die gewünschte Zieleinheit um.

## Grundlegende Volumenformeln der wichtigsten geometrischen Körper

Alle dreidimensionalen Grundkörper basieren auf dem Produkt aus einer Grundfläche $A_G$ und einer senkrecht dazu stehenden Höhe $h$ (sowie einem körperabhängigen Formfaktor). Für eine korrekte Berechnung müssen sämtliche Längenmaße vor dem Einsetzen in derselben Längeneinheit (z. B. durchgängig in Metern $\text{m}$ oder Zentimetern $\text{cm}$) vorliegen.

### 1. Quader und Würfel (Prismatische Rechteckkörper)

Beim **Quader** stehen alle sechs Begrenzungsflächen im rechten Winkel ($90^\circ$) zueinander. Sein Rauminhalt ergibt sich aus dem Produkt von Länge $l$, Breite $b$ und Höhe $h$:

$$V_{\text{Quader}} = l \cdot b \cdot h$$

Der **Würfel (Hexaeder)** ist der Spezialfall des Quaders, bei dem alle zwölf Kanten die identische Länge $a$ aufweisen:

$$V_{\text{Würfel}} = a^3$$

### 2. Kreiszylinder und Hohlzylinder (Rohrleitung)

Ein gerader **Kreiszylinder** besitzt eine kreisförmige Grundfläche $A_G = \pi \cdot r^2$, die entlang der Höhe $h$ verschoben wird. Ist statt des Radius $r$ der Durchmesser $d = 2r$ bekannt, gilt:

$$V_{\text{Zylinder}} = \pi \cdot r^2 \cdot h = \frac{\pi}{4} \cdot d^2 \cdot h$$

Für Rohre, Schachtringe oder dickwandige Tanks mit dem Außenradius $R$ und dem Innenradius $r$ gilt die Formel des **Hohlzylinders**:

$$V_{\text{Hohlzylinder}} = \pi \cdot h \cdot \left(R^2 - r^2\right)$$

### 3. Kugel und Kugelkappe (Kugelsegment)

Die **Vollkugel** ist durch den Radius $r$ vom Kugelmittelpunkt zur Oberfläche vollständig bestimmt:

$$V_{\text{Kugel}} = \frac{4}{3} \cdot \pi \cdot r^3 = \frac{1}{6} \cdot \pi \cdot d^3$$

Wird eine Kugel durch eine Ebene abgeschnitten (etwa bei einem teilweise gefüllten Kugeltank oder einer Kuppel mit der Segmenthöhe $h$), berechnet sich das Volumen der **Kugelkappe**:

$$V_{\text{Kappe}} = \frac{\pi \cdot h^2}{3} \cdot \left(3r - h\right)$$

### 4. Spitzkörper (Kegel und Pyramide) sowie Kegelstumpf

Für jeden Körper, der von einer Grundfläche $A_G$ geradlinig zu einer Spitze zuläuft, gilt der Formfaktor $\frac{1}{3}$. Daraus folgen die Gleichungen für den **Kreiskegel** und die **Pyramide**:

$$V_{\text{Kegel}} = \frac{1}{3} \cdot \pi \cdot r^2 \cdot h \quad \text{und} \quad V_{\text{Pyramide}} = \frac{1}{3} \cdot A_G \cdot h$$

Wird einem Kegel die Spitze parallel zur Grundfläche abgeschnitten (unterer Radius $r_1$, oberer Radius $r_2$, Höhe $h$), entsteht ein **Kegelstumpf**:

$$V_{\text{Kegelstumpf}} = \frac{1}{3} \cdot \pi \cdot h \cdot \left(r_1^2 + r_1 \cdot r_2 + r_2^2\right)$$

## Praxisbeispiele: Schritt-für-Schritt-Berechnung für Bau und Technik

### Beispiel 1: Fassungsvermögen einer zylindrischen Regenwasserzisterne

Eine unterirdische Betonzisterne besitzt einen Innendurchmesser von $d = 2{,}20\text{ m}$ und eine nutzbare Füllhöhe von $h = 2{,}50\text{ m}$. Wie viele Liter Regenwasser fasst der Speicher?

1.  **Radius bestimmen:** $r = \frac{2{,}20\text{ m}}{2} = 1{,}10\text{ m}$
2.  **Volumen in Kubikmetern berechnen:**
    $$V = \pi \cdot (1{,}10\text{ m})^2 \cdot 2{,}50\text{ m} = 3{,}14159265 \cdot 1{,}21\text{ m}^2 \cdot 2{,}50\text{ m} = 9{,}5033\text{ m}^3$$
3.  **Umrechnung in Liter ($1\text{ m}^3 = 1.000\text{ L}$):**
    $$V_{\text{Liter}} = 9{,}5033\text{ m}^3 \cdot 1.000\text{ L/m}^3 = 9.503{,}3\text{ Liter}$$

### Beispiel 2: Betonbedarf und Kosten für eine Bodenplatte (Quader)

Für eine Doppelgarage wird eine Bodenplatte mit $l = 6{,}50\text{ m}$ Länge, $b = 5{,}80\text{ m}$ Breite und $h = 22\text{ cm}$ ($0{,}22\text{ m}$) Stärke gegossen. Der Preis für Transportbeton (C25/30) beträgt `145,00 €` pro Kubikmeter.

1.  **Quadervolumen berechnen:**
    $$V = 6{,}50\text{ m} \cdot 5{,}80\text{ m} \cdot 0{,}22\text{ m} = 8{,}294\text{ m}^3$$
2.  **Betonkosten kalkulieren:**
    $$\text{Materialkosten} = 8{,}294\text{ m}^3 \cdot 145{,}00\text{ €/m}^3 = 1.202{,}63\text{ €}$$

## Referenztabelle: Geometrische Körper und Volumeneinheiten

Die Übersicht zeigt die wichtigsten Formeln sowie die im DACH-Raum und international üblichen Umrechnungsfaktoren:

| Körper / Einheit | Formel bzw. Äquivalent | Skalierung / Faktor | Typische Anwendung |
| :--- | :--- | :--- | :--- |
| **Quader** | $V = l \cdot b \cdot h$ | Linear in jeder Achse | Bodenplatten, Räume, Container |
| **Zylinder** | $V = \pi \cdot r^2 \cdot h$ | $2 \times r \Rightarrow 4 \times V$ | Zisternen, Rohre, Silos, Motoren |
| **Kugel** | $V = \frac{4}{3} \cdot \pi \cdot r^3$ | $2 \times r \Rightarrow 8 \times V$ | Drucktanks, Kugellager, Tropfen |
| **Kegel & Pyramide** | $V = \frac{1}{3} \cdot A_G \cdot h$ | $\frac{1}{3}$ des Prismas | Schüttgutkegel, Trichter, Dächer |
| **1 Kubikmeter ($\text{m}^3$)** | $1.000\text{ dm}^3 = 10^6\text{ cm}^3$ | Exakt **1.000 Liter** | Beton, Erdaushub, Wasserzähler |
| **1 Liter ($\text{L}$ / $\text{dm}^3$)** | $1.000\text{ cm}^3 = 1.000\text{ mL}$ | $0{,}001\text{ m}^3$ | Getränke, Kraftstoffe, Behälter |
| **1 US-Gallone (`gal`)** | $231\text{ in}^3$ (Kubikzoll) | **3,78541 Liter** | US-Tanksysteme, Aquaristik |
| **1 Kubikfuß (`ft³`)** | $1.728\text{ in}^3$ | **28,3168 Liter** | Internationale Fracht, Kältetechnik |

## Häufige Fehlerquellen bei der Volumenberechnung in der Praxis

*   **Verwechslung von Durchmesser und Radius:** In technischen Zeichnungen und auf Rohren (DN-Nennweiten) ist meist der Durchmesser $d$ angegeben, während geometrische Formeln den Radius $r = d/2$ verlangen. Wer den Durchmesser in $V = \pi \cdot r^2 \cdot h$ einsetzt, erhält ein um den **Faktor 4** zu hohes Zylindervolumen; bei der Kugel ist das Ergebnis sogar um den **Faktor 8** zu groß.
*   **Umrechnungsfaktor 1.000 bei kubischen Einheiten:** Während bei Längeneinheiten der Umrechnungsfaktor zwischen Nachbareinheiten $10$ beträgt ($1\text{ m} = 10\text{ dm} = 100\text{ cm}$), potenziert sich dieser Faktor im dreidimensionalen Raum auf $10^3 = 1.000$. Ein Kubikmeter umfasst daher **$1.000.000\text{ cm}^3$**.
*   **Auflockerungsfaktor bei Erdaushub und Brennholz:** Berechnen Sie das geometrische Volumen einer Baugrube (z. B. $50\text{ m}^3$ gewachsener Boden), nimmt das ausgehobene Erdreich durch Auflockerung beim Baggern **15 % bis 30 % mehr Transportvolumen** ein. Ebenso unterscheidet die Forstwirtschaft zwischen reinem Holz ohne Zwischenräume (**Festmeter**, $\text{fm}$), geschichtetem Holzstapel (**Raummeter/Ster**, $\text{rm} \approx 0{,}7\text{ fm}$) und lose geschüttetem Holz (**Schüttraummeter**, $\text{srm} \approx 0{,}45\text{ fm}$).
