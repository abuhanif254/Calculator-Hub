---
title: "Löslichkeitsrechner: Die Chemie des Auflösens"
metaTitle: "Molare Löslichkeit berechnen: Formel, Ksp & Temperatur"
description: "Erfahren Sie, wie die Temperatur die Löslichkeit beeinflusst, wie man die molare Löslichkeit berechnet, und nutzen Sie unseren Löslichkeitsrechner."
metaDescription: "Berechnen Sie die molare Löslichkeit und das Löslichkeitsprodukt (Ksp). Verstehen Sie den Einfluss von Temperatur, Druck und gleichionigem Zusatz."
category: "Math & Science"
relatedCalculator: "solubility-calculator"
faqs:
  - question: "Was ist der Unterschied zwischen molarer Löslichkeit und dem Löslichkeitsprodukt Ksp?"
    answer: "Die molare Löslichkeit gibt an, wie viele Mol eines Stoffes sich maximal in einem Liter Lösung bis zur Sättigung auflösen (in mol/L). Das Löslichkeitsprodukt Ksp ist dagegen die thermodynamische Gleichgewichtskonstante der gelösten Ionen, multipliziert mit ihren jeweiligen stöchiometrischen Potenzen."
  - question: "Warum lösen sich die meisten Feststoffe in warmem Wasser besser, Gase jedoch schlechter?"
    answer: "Beim Auflösen der meisten kristallinen Feststoffe wird Energie benötigt, um das Kristallgitter aufzubrechen (endothermer Vorgang), weshalb Wärmezufuhr das Gleichgewicht zugunsten der Lösung verschiebt. Bei Gasen erhöht Wärme die kinetische Energie der Teilchen, sodass sie leichter aus der Flüssigkeit entweichen."
  - question: "Wie wirkt sich der gleichionige Zusatz auf die Löslichkeit eines schwerlöslichen Salzes aus?"
    answer: "Fügt man einer gesättigten Lösung ein leichtlösliches Salz hinzu, das eine gemeinsame Ionensorte enthält, verschiebt sich das chemische Gleichgewicht nach dem Prinzip von Le Chatelier in Richtung des Bodenkörpers. Die molare Löslichkeit des schwerlöslichen Salzes sinkt dadurch drastisch."
  - question: "Wann fällt aus einer Lösung ein Niederschlag aus?"
    answer: "Ein Niederschlag bildet sich genau dann, wenn das Ionenprodukt Q der aktuell in der Lösung vorhandenen Ionenkonzentrationen den Wert des temperaturabhängigen Löslichkeitsprodukts Ksp überschreitet (Q > Ksp). Ist Q kleiner als Ksp, bleibt die Lösung ungesättigt."
  - question: "Welche Rolle spielt der pH-Wert bei der Löslichkeit von Salzen?"
    answer: "Enthält ein schwerlösliches Salz das Anion einer schwachen Säure (wie Carbonat, Phosphat oder Hydroxid), reagiert dieses Anion in saurer Lösung mit Wasserstoffionen. Durch die Entfernung der freien Anionen aus dem Gleichgewicht löst sich bei sinkendem pH-Wert deutlich mehr Feststoff auf."
---

In der analytischen und physikalischen Chemie beschreibt die **Löslichkeit** die maximale Menge eines Reinstoffes (des **Gelösten**), die sich bei einer definierten Temperatur in einem bestimmten Volumen einer Flüssigkeit (dem **Lösungsmittel**) homogen auflösen kann, bis ein dynamisches Sättigungsgleichgewicht erreicht ist. Ob Kristallzüchtung, Arzneimittelformulierung oder Wasseraufbereitung: Die exakte Kenntnis der Sättigungskonzentration entscheidet darüber, ob eine Substanz vollständig in Lösung geht oder als fester Bodenkörper ausfällt. Mit unserem [Löslichkeitsrechner](/de/rechner/loeslichkeitsrechner) bestimmen Sie die molare Konzentration, die benötigte Stoffmasse oder das Gleichgewicht schnell und präzise.

## Chemische Grundlagen und Mathematische Formeln

In der Laborpraxis wird die Löslichkeit auf zwei eng miteinander verknüpfte Arten quantifiziert: einerseits als **molare Löslichkeit ($S$)** über die Einwaage und das Volumen, andererseits bei schwerlöslichen Elektrolyten über das **thermodynamische Löslichkeitsprodukt ($K_{sp}$)**.

### 1. Berechnung aus Masse, molarer Masse und Volumen
Löst sich eine bekannte Maximalmasse eines Stoffes in einem gegebenen Flüssigkeitsvolumen bis zur Sättigungsgrenze auf, gilt für die Stoffmenge $n$ und die daraus resultierende molare Löslichkeit $S$:

$$n = \frac{m}{M} \qquad \text{und} \qquad S = \frac{n}{V} = \frac{m}{M \times V}$$

### 2. Berechnung aus dem Löslichkeitsprodukt ($K_{sp}$)
Für ein schwerlösliches Salz der allgemeinen Zusammensetzung $A_x B_y$, das in wässriger Lösung nach der Reaktionsgleichung

$$A_x B_{y\text{ (fest)}} \rightleftharpoons x\, A^{y+}_{\text{ (aq)}} + y\, B^{x-}_{\text{ (aq)}}$$

dissoziiert, lautet das Massenwirkungsgesetz für das Löslichkeitsprodukt:

$$K_{sp} = [A^{y+}]^x \times [B^{x-}]^y = (x \cdot S)^x \times (y \cdot S)^y = x^x \cdot y^y \cdot S^{(x+y)}$$

Löst man diese Beziehung nach der molaren Löslichkeit $S$ in reinem Wasser auf, erhält man die allgemeine Wurzelgleichung:

$$S = \sqrt[x+y]{\frac{K_{sp}}{x^x \cdot y^y}}$$

### Definition der Variablen
* **$S$ (Molare Löslichkeit) :** Die Stoffmengenkonzentration des gelösten Stoffes in einer gesättigten Lösung, angegeben in Mol pro Liter ($\text{mol/L}$ bzw. $\text{M}$).
* **$m$ (Masse des gelösten Stoffes) :** Die maximal aufgelöste Feststoffmasse in Gramm ($\text{g}$).
* **$M$ (Molare Masse) :** Die Summe der Atommassen der chemischen Formel in Gramm pro Mol ($\text{g/mol}$).
* **$V$ (Volumen der Lösung) :** Das Gesamtvolumen der Flüssigkeit in Litern ($\text{L}$).
* **$K_{sp}$ (Löslichkeitsprodukt) :** Die dimensionslose (bzw. auf Standardkonzentrationen bezogene) Gleichgewichtskonstante bei einer bestimmten Temperatur (meist $25\text{ °C}$).
* **$x, y$ (Stöchiometrische Koeffizienten) :** Die Anzahl der Kationen und Anionen pro Formeleinheit des Salzes.

## Zwei Schritt-für-Schritt-Rechenbeispiele

### Beispiel 1: Molare Löslichkeit einer gesättigten Kochsalzlösung aus der Masse
Bei $20\text{ °C}$ lösen sich maximal $179,25\text{ g}$ Natriumchlorid ($\text{NaCl}$) in $500\text{ mL}$ Wasser auf. Die molare Masse von $\text{NaCl}$ beträgt $58,44\text{ g/mol}$. Wie hoch ist die molare Konzentration?

1. **Umrechnung des Volumens in Liter :**
   $$V = \frac{500\text{ mL}}{1\,000} = 0,500\text{ L}$$
2. **Berechnung der gelösten Stoffmenge ($n$) :**
   $$n = \frac{179,25\text{ g}}{58,44\text{ g/mol}} = 3,06725\text{ mol}$$
3. **Bestimmung der molaren Löslichkeit ($S$) :**
   $$S = \frac{3,06725\text{ mol}}{0,500\text{ L}} = \mathbf{6,13\text{ mol/L}}$$

### Beispiel 2: Molare Löslichkeit von Calciumfluorid ($\text{CaF}_2$) aus dem $K_{sp}$-Wert
Flussspat ($\text{CaF}_2$, molare Masse $78,07\text{ g/mol}$) besitzt bei $25\text{ °C}$ ein Löslichkeitsprodukt von $K_{sp} = 3,9 \times 10^{-11}$. Gesucht ist die molare Löslichkeit in $\text{mol/L}$ sowie die Massenkonzentration in $\text{mg/L}$.

1. **Aufstellen der Dissoziationsgleichung :**
   $$\text{CaF}_{2\text{ (fest)}} \rightleftharpoons \text{Ca}^{2+}_{\text{ (aq)}} + 2\,\text{F}^-_{\text{ (aq)}}$$
   Hier gilt $x = 1$ (ein Calcium-Ion) und $y = 2$ (zwei Fluorid-Ionen).
2. **Einsetzen in die Gleichgewichtsbeziehung :**
   Da pro gelöster Formeleinheit $[\text{Ca}^{2+}] = S$ und $[\text{F}^-] = 2S$ entstehen, folgt:
   $$K_{sp} = (S)^1 \times (2S)^2 = 4\,S^3$$
3. **Auflösen nach der molaren Löslichkeit $S$ :**
   $$S = \sqrt[3]{\frac{3,9 \times 10^{-11}}{4}} = \sqrt[3]{9,75 \times 10^{-12}} \approx \mathbf{2,136 \times 10^{-4}\text{ mol/L}}$$
4. **Umrechnung in Milligramm pro Liter :**
   $$\rho = 2,136 \times 10^{-4}\text{ mol/L} \times 78,07\text{ g/mol} = 0,01668\text{ g/L} = \mathbf{16,68\text{ mg/L}}$$

## Referenz- und Vergleichstabelle chemischer Verbindungen bei $25\text{ °C}$

Die folgende Übersicht zeigt typische Referenzwerte für leicht-, mäßig- und schwerlösliche anorganische Verbindungen in reinem Wasser bei Standardbedingungen ($25\text{ °C}$):

| Verbindung (Chemische Formel) | Salztyp ($x:y$) | Molare Masse ($\text{g/mol}$) | Löslichkeitsprodukt ($K_{sp}$) | Molare Löslichkeit $S$ ($\text{mol/L}$) | Massenlöslichkeit ($\text{g/L}$) | Klassifizierung |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Natriumchlorid ($\text{NaCl}$)** | $1:1$ | $58,44$ | Nicht anwendbar (hoch) | $6,14\text{ mol/L}$ | $359,0\text{ g/L}$ | Sehr leicht löslich |
| **Calciumsulfat ($\text{CaSO}_4$)** | $1:1$ | $136,14$ | $4,93 \times 10^{-5}$ | $7,02 \times 10^{-3}\text{ mol/L}$ | $0,956\text{ g/L}$ | Mäßig löslich |
| **Calciumfluorid ($\text{CaF}_2$)** | $1:2$ | $78,07$ | $3,90 \times 10^{-11}$ | $2,14 \times 10^{-4}\text{ mol/L}$ | $0,0167\text{ g/L}$ | Schwer löslich |
| **Silberchlorid ($\text{AgCl}$)** | $1:1$ | $143,32$ | $1,77 \times 10^{-10}$ | $1,33 \times 10^{-5}\text{ mol/L}$ | $0,0019\text{ g/L}$ | Schwer löslich |
| **Bariumsulfat ($\text{BaSO}_4$)** | $1:1$ | $233,39$ | $1,08 \times 10^{-10}$ | $1,04 \times 10^{-5}\text{ mol/L}$ | $0,0024\text{ g/L}$ | Praktisch unlöslich |
| **Eisen(III)-hydroxid ($\text{Fe(OH)}_3$)** | $1:3$ | $106,87$ | $2,79 \times 10^{-39}$ | $9,82 \times 10^{-11}\text{ mol/L}$ | $1,05 \times 10^{-8}\text{ g/L}$ | Extrem unlöslich |

## Einflussfaktoren: Temperatur, Druck und Gleichioniger Zusatz

Das Auflösungsverhalten einer Substanz ist keine starre Konstante, sondern reagiert empfindlich auf äußere thermodynamische Bedingungen:

* **Temperaturabhängigkeit bei Feststoffen :** Für die überwiegende Mehrheit ionischer und molekularer Feststoffe (z. B. Kaliumnitrat $\text{KNO}_3$ oder Saccharose) ist die Lösungsenthalpie positiv ($\Delta H_{\text{Lös}} > 0$). Eine Temperaturerhöhung führt hier zu einem steilen Anstieg der Sättigungskonzentration. Ausnahmen mit exothermer Lösungsenthalpie wie Calciumsulfat oder Cer(III)-sulfat zeigen hingegen eine retrograde Löslichkeit und fallen beim Erhitzen aus.
* **Temperatur und Druck bei Gasen (Henry-Gesetz) :** Gase wie Kohlenstoffdioxid ($\text{CO}_2$) oder Sauerstoff ($\text{O}_2$) lösen sich stets exotherm in Flüssigkeiten. Steigt die Wassertemperatur, entweicht das Gas. Gleichzeitig ist die Gaskonzentration $c$ direkt proportional zum Partialdruck $p$ des Gases über der Flüssigkeit ($c = k_H \cdot p$, wobei $k_H$ die Henry-Konstante darstellt).
* **Gleichioniger Effekt in Elektrolytlösungen :** Versucht man, Silberchlorid ($\text{AgCl}$) statt in reinem Wasser in einer $0,10\text{ M}$ Natriumchloridlösung aufzulösen, ist die Chlorid-Konzentration durch das vollständig dissoziierte $\text{NaCl}$ bereits auf $[\text{Cl}^-] \approx 0,10\text{ mol/L}$ festgelegt. Aus $K_{sp} = [\text{Ag}^+] \cdot [\text{Cl}^-]$ folgt sofort $[\text{Ag}^+] = \frac{1,77 \times 10^{-10}}{0,10} = 1,77 \times 10^{-9}\text{ mol/L}$ — die Löslichkeit sinkt durch das gemeinsame Chlorid-Ion fast um das Zehntausendfache.
