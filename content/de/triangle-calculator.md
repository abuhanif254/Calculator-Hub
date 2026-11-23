---
title: "Dreiecksrechner"
description: "Lösen Sie jedes Dreieck sofort: Berechnen Sie fehlende Seiten, Innenwinkel, Flächeninhalt, Höhen und Umfang nach SSS, SWS, WSW oder mit Grundseite und Höhe."
metaTitle: "Dreiecksrechner | Winkel, Seiten & Fläche berechnen"
metaDescription: "Kostenloser Dreiecksrechner: Berechnen Sie Seitenlängen, Winkel, Fläche, Umfang und Höhen jedes Dreiecks präzise über Kosinussatz, Sinussatz und Heron."
metaKeywords: "dreiecksrechner, dreieck berechnen, dreiecksfläche berechnen, winkel im dreieck, kosinussatz, sinussatz, satz des heron, SSS, SWS, WSW, geometrie rechner"
faqs:
  - question: "Wann ist ein Dreieck aus drei gegebenen Seitenlängen überhaupt konstruierbar?"
    answer: "Ein Dreieck existiert genau dann, wenn die strenge Dreiecksungleichung für alle drei Seitenkombinationen erfüllt ist: Die Summe zweier Seitenlängen muss stets echt größer sein als die dritte Seite (a + b > c, a + c > b und b + c > a). Ist die Summe zweier Seiten exakt gleich der längsten Seite, entartet das Dreieck zu einer flächenlosen Strecke mit dem Flächeninhalt null."
  - question: "Warum sollte man bei drei bekannten Seiten (SSS) zuerst den Kosinussatz statt des Sinussatzes nutzen?"
    answer: "Der Kosinussatz unterscheidet im Intervall von 0° bis 180° eindeutig zwischen spitzen und stumpfen Winkeln, da der Kosinus ab 90° negativ wird. Der Arkussinus beim Sinussatz liefert hingegen nur Werte bis 90°, sodass ein stumpfer Winkel (z. B. 125°) fälschlicherweise als sein spitzer Supplementwinkel (55°) ausgegeben werden kann."
  - question: "Wann tritt beim Kongruenzsatz SSW der zweideutige Fall mit zwei gültigen Dreiecken auf?"
    answer: "Sind zwei Seiten und der Winkel gegeben, der der kürzeren der beiden Seiten gegenüberliegt (ssW), schneidet der freie Schenkel den Kreisbogen um die bekannte Seite unter Umständen zweimal. Solange die kürzere Seite länger als die zugehörige Höhe, aber kürzer als die zweite bekannte Seite ist, existieren zwei mathematisch völlig korrekte Dreiecke – ein spitzwinkliges und ein stumpfwinkliges."
  - question: "Wie berechnet man den Inkreisradius und den Umkreisradius eines allgemeinen Dreiecks?"
    answer: "Der Inkreisradius r ergibt sich aus dem Quotienten des Flächeninhalts A und des halben Umfangs s über die Formel r = A / s. Der Umkreisradius R folgt direkt aus dem erweiterten Sinussatz über R = a / (2 · sin(α)) oder alternativ aus allen drei Seiten über R = (a · b · c) / (4 · A)."
  - question: "Wie rechnet man Winkel zwischen Gradmaß, Bogenmaß und dem in der Vermessung üblichen Gon um?"
    answer: "Ein Vollkreis entspricht 360° im Gradmaß (DEG), 2π rad im Bogenmaß (RAD) und 400 gon (Neugrad) in der Geodäsie. Zur Umrechnung gilt: Winkel im Bogenmaß = Winkel in Grad · (π / 180°) sowie Winkel in Gon = Winkel in Grad · (10 / 9). Ein rechter Winkel von 90° entspricht somit π/2 rad bzw. exakt 100 gon."
---

## Dreiecksberechnung in Geometrie, Bauwesen und Vermessung

Das Dreieck ist das fundamentalste Polygon der ebenen Geometrie (Planimetrie) und die einzige starre Grundfigur der Baustatik: Sobald die Längen seiner drei Seiten festgelegt sind, lassen sich seine Innenwinkel ohne Verformung der Seiten nicht mehr verändern. Deshalb basieren Fachwerkkonstruktionen, Dachstühle im Zimmererhandwerk, Kranausleger, Brückenträger sowie die Triangulation in der Landesvermessung und Satellitennavigation unmittelbar auf der Trigonometrie des allgemeinen und rechtwinkligen Dreiecks.

In der deutschsprachigen Mathematik (DACH-Standard nach DIN 1302) werden die drei Eckpunkte gegen den Uhrzeigersinn mit den Großbuchstaben $A$, $B$ und $C$ bezeichnet. Jedem Eckpunkt liegt die gleichnamige Seite in Kleinbuchstaben ($a$, $b$, $c$ in $\text{m}$, $\text{cm}$ oder $\text{mm}$) gegenüber, während die eingeschlossenen Innenwinkel mit den griechischen Buchstaben $\alpha$ (bei $A$), $\beta$ (bei $B$) und $\gamma$ (bei $C$) in Grad ($^\circ$) oder Radiant ($\text{rad}$) benannt werden. Sobald mindestens drei unabhängige Bestimmungsstücke bekannt sind – darunter mindestens eine Seitenlänge –, lässt sich das gesamte Dreieck einschließlich Flächeninhalt, Umfang, Höhen sowie Inkreis- und Umkreisradius vollständig auflösen.

## Mathematische Formeln und Hauptsätze der Trigonometrie

Für die exakte Auflösung beliebiger Dreiecke (spitzwinklig, rechtwinklig oder stumpfwinklig) greifen vier zentrale Gesetzmäßigkeiten ineinander, die weit über den Satz des Pythagoras ($a^2+b^2=c^2$, nur gültig für $\gamma=90^\circ$) hinausgehen.

### 1. Innenwinkelsummensatz
In der euklidischen Ebene beträgt die Summe der drei Innenwinkel in jedem Dreieck exakt $180^\circ$ (bzw. $\pi\text{ rad}$):

$$\alpha + \beta + \gamma = 180^\circ$$

Zudem gilt stets die Seite-Winkel-Beziehung: Der längsten Seite liegt immer der größte Innenwinkel gegenüber; ein stumpfer Winkel ($>90^\circ$) kann daher ausschließlich der längsten Dreiecksseite gegenüberliegen.

### 2. Der Kosinussatz (Verallgemeinerter Satz des Pythagoras)
Der Kosinussatz verknüpft alle drei Seitenlängen mit dem Kosinus eines Innenwinkels und eignet sich sowohl zur Berechnung einer fehlenden dritten Seite bei bekanntem Zwischenwinkel (SWS) als auch zur Bestimmung aller Winkel aus drei Seiten (SSS):

$$c^2 = a^2 + b^2 - 2ab\cos(\gamma) \implies \gamma = \arccos\left(\frac{a^2 + b^2 - c^2}{2ab}\right)$$

Analoge Gleichungen gelten durch zyklische Vertauschung für $\alpha$ und $\beta$. Für $\gamma=90^\circ$ wird $\cos(90^\circ)=0$, wodurch der klassische Satz des Pythagoras entsteht.

### 3. Der erweiterte Sinussatz
In jedem Dreieck stehen die Seitenlängen im selben Verhältnis zueinander wie die Sinuswerte ihrer gegenüberliegenden Winkel. Dieses Verhältnis entspricht exakt dem Durchmesser $2R$ des Umkreises:

$$\frac{a}{\sin(\alpha)} = \frac{b}{\sin(\beta)} = \frac{c}{\sin(\gamma)} = 2R$$

### 4. Flächeninhalt, Höhen und Satz des Heron
Je nach gegebenen Ausgangswerten lässt sich der Flächeninhalt $A$ (in $\text{m}^2$ oder $\text{cm}^2$) auf drei gleichwertigen Wegen bestimmen:

* **Grundseiten-Höhen-Formel:** $A = \frac{1}{2}\cdot g\cdot h_g = \frac{1}{2}\cdot c\cdot h_c$
* **Trigonometrische Flächenformel (SWS):** $A = \frac{1}{2}\cdot a\cdot b\cdot \sin(\gamma)$
* **Satz des Heron (SSS):** Mit dem Umfang $U=a+b+c$ und dem Halbumfang $s=\frac{a+b+c}{2}$ gilt:

$$A = \sqrt{s(s - a)(s - b)(s - c)}$$

Aus dem Flächeninhalt $A$ folgen unmittelbar die drei Dreieckshöhen $h_a=\frac{2A}{a}$, $h_b=\frac{2A}{b}$ und $h_c=\frac{2A}{c}$ sowie der Inkreisradius $r=\frac{A}{s}$.

## Übersicht der Kongruenzsätze und Berechnungsmodi

Die folgende Referenzmatrix zeigt, welche Eingabekombinationen ein Dreieck festlegen und welche Lösungsstrategie zum Einsatz kommt:

| Modus | Gegebene Größen | Existenzbedingung | Primärer Lösungsweg | Eindeutigkeit |
| :--- | :--- | :--- | :--- | :--- |
| **SSS** | Drei Seiten $a,b,c$ | Dreiecksungleichung: $a+b>c$, $a+c>b$, $b+c>a$ | Kosinussatz für Winkel; Satz des Heron für Fläche | Eindeutig (1 Dreieck) |
| **SWS** | Zwei Seiten $a,b$ und Zwischenwinkel $\gamma$ | $a>0$, $b>0$ und $0^\circ<\gamma<180^\circ$ | Kosinussatz für Seite $c$, danach Kosinussatz für Winkel | Eindeutig (1 Dreieck) |
| **WSW / SWW** | Eine Seite $c$ sowie zwei Winkel $\alpha,\beta$ | Winkelsumme $\alpha+\beta<180^\circ$ | Dritter Winkel über $180^\circ-(\alpha+\beta)$, Seiten über Sinussatz | Eindeutig (1 Dreieck) |
| **SsW** | Zwei Seiten $a>b$ und Gegenwinkel $\alpha$ | $0^\circ<\alpha<180^\circ$ und $a>b$ | Sinussatz für $\beta$, danach $\gamma=180^\circ-(\alpha+\beta)$ | Eindeutig (1 Dreieck) |
| **ssW** | Zwei Seiten $a<b$ und spitzer Gegenwinkel $\alpha$ | $b\sin(\alpha)\le a<b$ | Sinussatz liefert $\beta_1$ und Supplementwinkel $\beta_2=180^\circ-\beta_1$ | Zweideutig (0, 1 oder 2) |
| **Basis & Höhe** | Grundseite $g$ und senkrechte Höhe $h_g$ | $g>0$ und $h_g>0$ | Direkte Flächenformel $A=\frac{1}{2}\cdot g\cdot h_g$ | Fläche eindeutig |

## Schritt-für-Schritt-Beispiele aus der Praxis

### Beispiel 1: Grundstücksvermessung mit drei bekannten Seiten (SSS)
Ein dreieckiges Baugrundstück besitzt die Seitenlängen $a=7,00\text{ m}$, $b=8,00\text{ m}$ und $c=9,00\text{ m}$. Gesucht sind Umfang, Fläche, alle Innenwinkel sowie Höhe und Radien.

1. **Prüfung der Dreiecksungleichung:** Die Summe der beiden kürzeren Seiten übersteigt die längste Seite ($7,00\text{ m}+8,00\text{ m}=15,00\text{ m}>9,00\text{ m}$). Das Dreieck ist konstruierbar.
2. **Umfang $U$, Halbumfang $s$ und Fläche $A$ nach Heron:** Aus $U=24,00\text{ m}$ folgt $s=12,00\text{ m}$ und damit $A=\sqrt{12\cdot 5\cdot 4\cdot 3}=\sqrt{720}\approx 26,83\text{ m}^2$.
3. **Innenwinkel über den Kosinussatz:**
   * $\cos(\alpha)=\frac{8^2+9^2-7^2}{2\cdot 8\cdot 9}=\frac{96}{144}\approx 0,6667 \implies \alpha\approx 48,19^\circ$
   * $\cos(\beta)=\frac{7^2+9^2-8^2}{2\cdot 7\cdot 9}=\frac{66}{126}\approx 0,5238 \implies \beta\approx 58,41^\circ$
   * $\gamma=180,00^\circ-(48,19^\circ+58,41^\circ)=73,40^\circ$
4. **Höhe und Radien:** Es folgen die Höhe $h_c=\frac{2\cdot 26,8328\text{ m}^2}{9,00\text{ m}}\approx 5,96\text{ m}$, der Inkreisradius $r=\frac{26,8328\text{ m}^2}{12,00\text{ m}}\approx 2,24\text{ m}$ und der Umkreisradius $R=\frac{9,00\text{ m}}{2\sin(73,40^\circ)}\approx 4,70\text{ m}$.

### Beispiel 2: Stumpfwinkliges Giebeldreieck im Holzbau (SWS)
Zwei asymmetrische Dachsparren der Längen $a=5,40\text{ m}$ und $b=6,20\text{ m}$ treffen im First unter einem stumpfen eingeschlossenen Winkel von $\gamma=105,00^\circ$ aufeinander. Da $\cos(105,00^\circ)\approx -0,258819$ negativ ist, liefert der Kosinussatz für die horizontale Spannweite $c=\sqrt{29,16+38,44-66,96\cdot (-0,258819)}=\sqrt{84,9305}\approx 9,22\text{ m}$. Die Giebelfläche beträgt $A=\frac{1}{2}\cdot 5,40\text{ m}\cdot 6,20\text{ m}\cdot \sin(105,00^\circ)\approx 16,17\text{ m}^2$, während für die spitzen Fußwinkel $\alpha\approx 34,47^\circ$ und $\beta=40,53^\circ$ folgen.

## Häufige Fehlerquellen und Praxistipps

* **Stumpfwinkel-Falle beim Sinussatz vermeiden:** Weil für jeden Winkel $\sin(\gamma)=\sin(180^\circ-\gamma)$ gilt (etwa $\sin(120^\circ)=\sin(60^\circ)\approx 0,866$), liefert die Taste $\arcsin$ auf dem Taschenrechner immer nur den spitzen Winkel. Berechnen Sie daher zuerst den größten Winkel (gegenüber der längsten Seite) mit dem Kosinussatz.
* **Lage der Höhen im stumpfwinkligen Dreieck:** Besitzt ein Dreieck einen Innenwinkel über $90^\circ$, liegen die Fußpunkte der beiden Höhen auf den kürzeren Seiten sowie der Höhenschnittpunkt (Orthozentrum) und der Umkreismittelpunkt *außerhalb* der Dreiecksfläche.
* **Einheitenkonsistenz sichern:** Alle Längenangaben müssen in derselben Einheit ($\text{cm}$, $\text{mm}$ oder $\text{m}$) eingegeben werden, da eine Mischung aus Metern und Zentimetern scheinbar die Dreiecksungleichung verletzt und den Flächeninhalt um den Faktor $10.000$ ($1\text{ m}^2=10.000\text{ cm}^2$) verfälscht.
