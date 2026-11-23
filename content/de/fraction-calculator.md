---
title: "Bruchrechner"
metaTitle: "Bruchrechner: Brüche addieren, kürzen & exakt umwandeln"
description: "Addieren, subtrahieren, multiplizieren und dividieren Sie echte, unechte und gemischte Brüche fehlerfrei – inklusive automatischer Vollkürzung und exakter Dezimalumrechnung."
metaDescription: "Brüche und gemischte Zahlen sicher addieren, subtrahieren, multiplizieren und dividieren – mit Formeln, Euklid-Kürzung und Rechenbeispielen."
metaKeywords: "bruchrechner, brüche addieren, brüche subtrahieren, brüche multiplizieren, brüche dividieren, brüche kürzen, gemischte zahlen, hauptnenner"
faqs:
  - question: "Welche Formeln gelten für das Addieren, Subtrahieren, Multiplizieren und Dividieren von Brüchen?"
    answer: "Für Addition und Subtraktion werden beide Brüche auf einen gemeinsamen Nenner gebracht: a/b ± c/d = (a × d ± c × b) ÷ (b × d). Bei der Multiplikation werden Zähler mit Zähler und Nenner mit Nenner multipliziert: (a × c) ÷ (b × d). Bei der Division multipliziert man den ersten Bruch mit dem Kehrwert des zweiten: (a/b) ÷ (c/d) = (a × d) ÷ (b × c)."
  - question: "Wie finde ich den kleinsten gemeinsamen Nenner (Hauptnenner) mit dem kgV?"
    answer: "Der kleinste gemeinsame Nenner zweier Brüche ist das kleinste gemeinsame Vielfache (kgV) ihrer Nenner. Sie bestimmen es über die Primfaktorzerlegung oder direkt über die Formel kgV(b, d) = |b × d| ÷ ggT(b, d). Für die Nenner 4 und 6 ergibt sich beispielsweise kgV(4, 6) = 24 ÷ 2 = 12."
  - question: "Wie kürzt der Bruchrechner jedes Ergebnis vollständig?"
    answer: "Nach der Rechenoperation ermittelt der Rechner mittels des Euklidischen Algorithmus den größten gemeinsamen Teiler (ggT) von Zähler und Nenner und dividiert beide durch diesen Wert. Dadurch entsteht garantiert der vollständig gekürzte Grundbruch, bei dem Zähler und Nenner teilerfremd sind (ggT = 1)."
  - question: "Wann ergibt ein Bruch eine abbrechende und wann eine periodische Dezimalzahl?"
    answer: "Enthält die Primfaktorzerlegung des Nenners eines vollständig gekürzten Bruchs ausschließlich die Faktoren 2 und 5 (zum Beispiel 4, 8, 10, 16 oder 25), bricht die Dezimalzahl ab (etwa 3/8 = 0,375). Kommt ein anderer Primfaktor wie 3, 7 oder 11 vor, entsteht eine unendliche periodische Dezimalzahl (etwa 1/3 = 0,333… oder 1/6 = 0,1666…)."
  - question: "Wie rechnet man mit negativen gemischten Zahlen ohne Vorzeichenfehler?"
    answer: "Das Minuszeichen vor einer gemischten Zahl bezieht sich immer auf die gesamte Zahl – also sowohl auf den ganzzahligen Teil als auch auf den Bruchteil. So entspricht −2 1/4 exakt −(2 + 1/4) = −9/4 = −2,25 und niemals −2 + 1/4 = −1,75."
---

## Bruchrechnung sicher beherrschen: Von der Schule bis zur Werkstatt

Obwohl Taschenrechner und Tabellenkalkulationen im Alltag meist Dezimalzahlen ausgeben, bleibt die exakte Bruchrechnung in Schule, Studium, Naturwissenschaften, Handwerk und Küche unverzichtbar. Der Grund ist mathematisch eindeutig: Viele alltägliche Verhältnisse wie ein Drittel (`1/3`) oder ein Sechstel (`1/6`) lassen sich im Dezimalsystem nur als unendliche periodische Zahlen darstellen. Wer frühzeitig auf zwei Nachkommastellen rundet, schleppt Ungenauigkeiten durch alle Folgeschritte. Als Bruch bleibt der exakte Wert hingegen ohne jeden Informationsverlust erhalten.

Unser **Bruchrechner** verarbeitet echte Brüche (Zähler kleiner als Nenner), unechte Brüche (Zähler größer oder gleich Nenner) sowie **gemischte Zahlen** aus Ganzzahl, Zähler und Nenner. Im Hintergrund wandelt das Werkzeug gemischte Eingaben automatisch in unechte Brüche um, führt Addition, Subtraktion, Multiplikation oder Division exakt durch, kürzt das Resultat vollständig über den Euklidischen Algorithmus und zeigt sowohl die gemischte Schreibweise als auch den Dezimalwert übersichtlich an.

## Rechengesetze und Formeln der vier Grundrechenarten

Jeder gemeine Bruch besitzt die Form `a/b`, wobei der **Zähler** `a` eine ganze Zahl ist und der **Nenner** `b` eine ganze Zahl ungleich null darstellt. Gemischte Zahlen `g a/b` werden vor jeder Rechenoperation zunächst in unechte Brüche überführt:

```text
Gemischte Zahl → unechter Bruch:
  positiv:  g a/b = (g*b + a) / b
  negativ: -g a/b = -(|g|*b + a) / b
```

Für zwei rationale Brüche `a/b` und `c/d` (mit Nennern ungleich null) gelten die vier verbindlichen Rechengesetze der Bruchrechnung:

```text
Addition:       a/b + c/d = (a*d + c*b) / (b*d)
Subtraktion:    a/b - c/d = (a*d - c*b) / (b*d)
Multiplikation: a/b * c/d = (a*c) / (b*d)
Division:       a/b : c/d = (a/b) * (d/c) = (a*d) / (b*c)   (mit c ≠ 0)
```

Beim **Erweitern** multipliziert man Zähler und Nenner mit derselben Zahl ungleich null, ohne den Wert des Bruchs zu verändern. Für **Addition und Subtraktion** per Hand empfiehlt sich als kleinster gemeinsamer Nenner (Hauptnenner) das kleinste gemeinsame Vielfache `kgV(b, d)`, das sich über den größten gemeinsamen Teiler `ggT` bestimmen lässt:

```text
kgV(b, d) = |b*d| / ggT(b, d)
```

Zum **vollständigen Kürzen** dividiert man abschließend Zähler und Nenner des Ergebnisses durch ihren gemeinsamen `ggT`, den man systematisch mittels wiederholter Division mit Rest (Euklidischer Algorithmus) findet.

## Schritt-für-Schritt-Rechenbeispiele mit gemischten Zahlen

### Beispiel 1: Addition zweier gemischter Zahlen (`2 3/4 + 1 5/6`)

Stellen Sie sich vor, Sie addieren zwei Werkstücklängen oder Zutatenmengen in einem Backrezept: `2 3/4` und `1 5/6`.

1. **In unechte Brüche umwandeln:** Aus `2 3/4` wird `(2×4 + 3)/4 = 11/4`, und aus `1 5/6` entsteht `(1×6 + 5)/6 = 11/6`.
2. **Hauptnenner bestimmen:** Die Primfaktorzerlegung liefert `4 = 2×2` und `6 = 2×3`. Der größte gemeinsame Teiler ist `2`, somit beträgt der kleinste gemeinsame Nenner `kgV(4, 6) = 24/2 = 12`.
3. **Auf den Hauptnenner 12 erweitern:** Sie erweitern `11/4` mit `3` zu `33/12` und `11/6` mit `2` zu `22/12`.
4. **Zähler addieren:** Bei gleichem Nenner werden ausschließlich die Zähler summiert: `(33 + 22)/12 = 55/12`.
5. **Kürzen und als gemischte Zahl schreiben:** Da `55` (`5×11`) und `12` (`2×2×3`) keinen gemeinsamen Primfaktor teilen, ist `55/12` bereits vollständig gekürzt. Die Division mit Rest liefert `55 : 12 = 4 Rest 7`, also **`4 7/12`** oder gerundet **`4,5833`**.

### Beispiel 2: Division mit Kehrwertregel (`3 1/2 : 1 3/4`)

1. **Umwandeln in unechte Brüche:** Aus `3 1/2` wird `7/2` und aus `1 3/4` entsteht `7/4`.
2. **Kehrwert bilden und multiplizieren:** Sie drehen den zweiten Bruch um und rechnen `(7/2) × (4/7) = 28/14`.
3. **Vollständig kürzen:** Der gemeinsame Teiler beträgt `14`, sodass exakt **`2`** herauskommt. Wer vor dem Ausmultiplizieren über Kreuz kürzt (`7` gegen `7` sowie `4` gegen `2`), liest das Ergebnis `2` sofort ohne große Zwischenzahlen ab.

## Umrechnungstabelle: Häufige Brüche, Dezimalzahlen, Prozente und Zollmaße

Besonders bei Sanitär-, Heizungs- und Gewindemaßen im DACH-Raum (wie Zoll-Rohrgewinde nach ISO 228) sowie beim Skalieren von Rezepten hilft diese kompakte Referenztabelle (`1 Zoll = 25,4 mm`):

| Bruch | Dezimalzahl | Prozentwert | Typisches Maß im Alltag und Handwerk |
| :--- | :--- | :--- | :--- |
| **1/2** | 0,5000 | 50,00 % | 1/2 Zoll entspricht 12,700 mm; halbes Maß |
| **1/3** | 0,3333… | 33,33 % | Periodische Dezimalzahl; exakte Drittelung |
| **2/3** | 0,6667… | 66,67 % | Periodische Dezimalzahl; Zweidrittelmehrheit |
| **1/4** | 0,2500 | 25,00 % | 1/4 Zoll entspricht 6,350 mm; Viertelstunde |
| **3/4** | 0,7500 | 75,00 % | 3/4 Zoll entspricht 19,050 mm; Wasseranschluss |
| **1/5** | 0,2000 | 20,00 % | Fünftel; 200 g von einem Kilogramm |
| **1/8** | 0,1250 | 12,50 % | 1/8 Zoll entspricht 3,175 mm; Achtelliter (0,125 l) |
| **3/8** | 0,3750 | 37,50 % | 3/8 Zoll entspricht 9,525 mm; Eckventil-Anschluss |
| **1/16** | 0,0625 | 6,25 % | 1/16 Zoll entspricht 1,5875 mm; feine Werkzeugstufung |

## Typische Fehlerquellen und Praxistipps beim Bruchrechnen

- **Nenner niemals einfach mitaddieren:** Ein klassischer Denkfehler ist die Rechnung `1/2 + 1/3 = 2/5`. Da `2/5` (`0,4`) sogar kleiner wäre als `1/2` (`0,5`), zeigt schon eine kurze Plausibilitätsprüfung den Fehler. Erst auf dem gemeinsamen Nenner (`3/6 + 2/6 = 5/6`) dürfen die Zähler addiert werden.
- **Kein Kürzen aus Summen oder Differenzen:** Nur gemeinsame **Faktoren** eines Produkts dürfen gekürzt werden. Im Ausdruck `(4 + 3)/4` darf die `4` nicht gestrichen werden – das richtige Ergebnis lautet `7/4` (`1,75`), nicht `3`.
- **Über-Kreuz-Kürzen vor dem Multiplizieren:** Kürzen Sie beim Multiplizieren zweier Brüche konsequent zuerst diagonal (Zähler des ersten gegen Nenner des zweiten Bruchs und umgekehrt). Das hält die Zahlen handlich und senkt die Fehlerquote spürbar.
- **Division durch null und Nenner gleich null:** Ein Bruch mit Nenner null ist mathematisch nicht definiert. Ebenso ist das Dividieren durch null (ein zweiter Bruch mit Zähler null) unzulässig, da kein Kehrwert existiert.
- **Gemischte Zahlen vor Multiplikation und Division immer umwandeln:** Multiplizieren Sie niemals Ganzzahl mit Ganzzahl und Bruchteil mit Bruchteil getrennt – so ergibt `2 1/2 × 2 1/2` als `(5/2) × (5/2)` exakt `25/4` (`6,25`), und keinesfalls `4 1/4` (`4,25`).
