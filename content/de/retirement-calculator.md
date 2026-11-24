---
title: "Rentenrechner"
metaTitle: "Rentenrechner: Altersvorsorge & Zinseszins berechnen"
description: "Berechnen Sie Ihr voraussichtliches Rentenkapital anhand von Startkapital, monatlicher Sparrate, Anlagehorizont und erwarteter Jahresrendite inklusive Inflationsblick."
metaDescription: "Kostenloser Rentenrechner: Berechnen Sie Altersvorsorge, Zinseszins, Eigenleistung und Kaufkraft für Ihren Ruhestand präzise nach Anlagehorizont."
metaKeywords: "rentenrechner, altersvorsorge berechnen, sparplan rechner, zinseszins altersvorsorge, rentenlücke berechnen, kapitalaufbau ruhestand, entnahmeplan"
faqs:
  - question: "Wie viel Prozent des Nettoeinkommens sollte ich für die private Altersvorsorge zurücklegen?"
    answer: "Als bewährter Richtwert im deutschsprachigen Raum gelten 10 % bis 15 % des monatlichen Nettoeinkommens, sofern Sie im Alter zwischen 25 und 35 Jahren mit dem Vermögensaufbau beginnen. Wer erst nach dem 40. Lebensjahr startet oder eine besonders große Rentenlücke schließen möchte, benötigt wegen der kürzeren Zinseszinsphase häufig eine Sparquote von 20 % oder mehr."
  - question: "Welche realistische Jahresrendite sollte ich im Rentenrechner ansetzen?"
    answer: "Für breit gestreute globale Aktienfonds lag die historische nominale Durchschnittsrendite über lange Zeiträume bei etwa 6 % bis 8 % pro Jahr vor Steuern und Inflation. Für eine konservative Ruhestandsplanung empfiehlt es sich, mit 5 % bis 6 % nominaler Rendite oder direkt mit einer realen Rendite von 3,5 % bis 4,5 % nach Abzug von rund 2 % Inflation zu rechnen."
  - question: "Wie berücksichtige ich die Inflation bei der Berechnung meines Endkapitals?"
    answer: "Der Rentenrechner weist zunächst das nominale Endkapital in zukünftigen Euro aus. Um die tatsächliche Kaufkraft in heutigen Euro zu ermitteln, teilen Sie das Endkapital durch den Inflationsfaktor (1 + Inflationsrate) hoch Ansparjahre oder geben im Renditefeld direkt die inflationsbereinigte Realrendite nach der Fisher-Gleichung ein."
  - question: "Wie hoch ist die typische Rentenlücke in Deutschland, Österreich und der Schweiz?"
    answer: "In Deutschland liegt das gesetzliche Rentenniveau vor Steuern bei rund 48 % des Durchschnittseinkommens, sodass bei angestrebten 75 % bis 80 % des letzten Nettoeinkommens häufig eine Versorgungslücke von 25 % bis 35 % entsteht. In Österreich deckt das Pensionskonto oft einen größeren Anteil ab, während in der Schweiz die erste und zweite Säule (AHV und Pensionskasse) gemeinsam rund 60 % des letzten Lohnes absichern und die Säule 3a sowie freies Kapital die Differenz schließen."
  - question: "Welche Rolle spielen Steuern und Produktkosten beim langfristigen Kapitalaufbau?"
    answer: "Laufende Fonds- und Versicherungskosten schmälern Ihre jährliche Rendite direkt und wirken über Jahrzehnte wie ein umgekehrter Zinseszins. In Deutschland unterliegen Kapitalerträge zudem der Abgeltungsteuer von 26,375 % (inklusive Solidaritätszuschlag, zuzüglich eventueller Kirchensteuer) oberhalb des Sparer-Pauschbetrags von 1.000 € pro Person, wobei für Aktienfonds eine steuerfreie Teilfreistellung von 30 % gilt."
---

Ein verlässlicher **Rentenrechner** bildet die quantitative Grundlage für jede fundierte Ruhestandsplanung im DACH-Raum. Ob Sie die gesetzliche Rentenversicherung in Deutschland durch ein privates Wertpapierdepot ergänzen, das österreichische Pensionskonto um Rücklagen erweitern oder neben AHV und Pensionskasse in der Schweiz über die Säule 3a vorsorgen: Erst das Zusammenspiel aus Startkapital, laufender Sparrate, Anlagehorizont und Zinseszinseffekt zeigt belastbar, welches Vermögen bis zum Ruhestand entsteht.

## Finanzmathematik des langfristigen Vermögensaufbaus

Während der Ansparphase wächst Ihr Vorsorgevermögen aus zwei Quellen: dem vorhandenen **Startkapital** und den **monatlichen Einzahlungen**. Unser Rentenrechner verwendet eine monatliche Zinseszinsverrechnung bei nachschüssiger Sparrate. Jeder erwirtschaftete Ertrag verbleibt im Kapitalstock und erwirtschaftet in allen folgenden Monaten weitere Erträge.

### Maßgebliche Gleichung für das nominale Endkapital

Mit dem aktuellen Alter $A_0$ und dem geplanten Renteneintrittsalter $A_R$ ergibt sich die Ansparzeit $J = A_R - A_0$ Jahre beziehungsweise $n = 12 \cdot J$ Monate. Aus der erwarteten nominalen Jahresrendite $i_{\text{nom}}$ (als Dezimalzahl) folgt der Monatszinssatz $r = \frac{i_{\text{nom}}}{12}$ und die exakte Endwertformel:

$$K_n = K_0 \cdot (1 + r)^n + R \cdot \frac{(1 + r)^n - 1}{r}$$

* **$K_n$ (Prognostiziertes Endkapital in €):** Das nach $n$ Monaten erreichte nominale Vorsorgevermögen.
* **$K_0$ (Startkapital in €):** Bereits vorhandene Ersparnisse zu Beginn der Ansparphase.
* **$R$ (Monatliche Sparrate in €):** Konstanter Betrag, der jeweils am Monatsende eingezahlt wird.
* **$r$ (Monatszinssatz) und $n$ (Monate):** Periodischer Zinssatz ($r = i_{\text{nom}} / 12$) über $n = 12 \cdot (A_R - A_0)$ Verzinsungsperioden.

Die gesamten Eigenleistungen betragen $E_{\text{ges}} = K_0 + n \cdot R$, der reine **Zinseszinsgewinn** liegt bei $Z_{\text{ges}} = K_n - E_{\text{ges}}$. Zur Bewertung der künftigen Kaufkraft in heutigen Euro bei jährlicher Inflation $\pi$ gelten die Abzinsung und die **Fisher-Gleichung** für die Realrendite:

$$K_{\text{real}} = \frac{K_n}{(1 + \pi)^J} \qquad \text{und} \qquad i_{\text{real}} = \frac{1 + i_{\text{nom}}}{1 + \pi} - 1$$

## Schritt-für-Schritt-Rechenbeispiel: 35 Jahre Kapitalaufbau

Eine 32-jährige Angestellte aus München ($A_0 = 32$) plant den Renteneintritt mit $A_R = 67$ Jahren ($J = 35\text{ Jahre}$, $n = 420\text{ Monate}$). Sie investiert $K_0 = 15.000{,}00\text{ €}$ Startkapital und spart monatlich $R = 400{,}00\text{ €}$ bei konservativ geschätzten $i_{\text{nom}} = 6{,}00\text{ \% p. a.}$ Nominalrendite sowie $\pi = 2{,}00\text{ \% p. a.}$ Inflation.

1. **Monatszins und Aufzinsungsfaktor berechnen:**
   $$r = \frac{0{,}06}{12} = 0{,}005 \text{ (0,50 \% pro Monat)} \implies (1 + r)^{420} = (1{,}005)^{420} \approx 8{,}123551$$
2. **Endwert des Startkapitals ($K_0$) ermitteln:**
   $$K_{0,\text{End}} = 15.000{,}00\text{ €} \cdot 8{,}123551 = 121.853{,}27\text{ €}$$
3. **Endwert der monatlichen Sparraten ($R$) bestimmen:**
   $$K_{R,\text{End}} = 400{,}00\text{ €} \cdot \frac{8{,}123551 - 1}{0{,}005} = 400{,}00\text{ €} \cdot 1.424{,}710296 = 569.884{,}12\text{ €}$$
4. **Endkapital, Eigenleistung und Zinsgewinn summieren:**
   * **Nominales Endkapital ($K_{420}$):** $121.853{,}27\text{ €} + 569.884{,}12\text{ €} = \mathbf{691.737{,}39\text{ €}}$
   * **Gesamteinzahlungen ($E_{\text{ges}}$):** $15.000{,}00\text{ €} + 420 \cdot 400{,}00\text{ €} = \mathbf{183.000{,}00\text{ €}}$
   * **Zinseszinsgewinn ($Z_{\text{ges}}$):** $691.737{,}39\text{ €} - 183.000{,}00\text{ €} = \mathbf{508.737{,}39\text{ €}}$ (**73,5 %** des Kapitals)
5. **Reale Kaufkraft und monatliche Zusatzrente ableiten:**
   Bei $2{,}00\text{ \%}$ Inflation steigt das Preisniveau über 35 Jahre um $(1{,}02)^{35} \approx 1{,}999890$ — die Kaufkraft halbiert sich beinahe. Das reale Endkapital beträgt daher:
   $$K_{\text{real}} = \frac{691.737{,}39\text{ €}}{1{,}999890} = \mathbf{345.887{,}80\text{ €}}$$
   Bei einer nachhaltigen jährlichen Entnahmerate von $3{,}5\text{ \%}$ entspricht dies einer monatlichen Zusatzrente von **$1.008{,}84\text{ €}$** in heutiger Kaufkraft vor Steuern (nominal **$2.017{,}57\text{ €}$**).

## Vergleichstabelle: Einfluss des Einstiegsalters auf das Rentenkapital

Der folgende Vergleich zeigt den Faktor Zeit bei identischen Eingaben ($K_0 = 15.000{,}00\text{ €}$, $R = 400{,}00\text{ €}$, $i_{\text{nom}} = 6{,}00\text{ \% p. a.}$, Rentenalter $67$, $\pi = 2{,}00\text{ \%}$):

| Einstiegsalter | Ansparzeit | Eigenleistung | Zinsgewinn | Nominales Endkapital | Zinsanteil | Reale Kaufkraft | Reale Monatsrente (3,5 %) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **25 Jahre** | 42 Jahre | 216.600,00 € | 876.726,10 € | **1.093.326,10 €** | 80,2 % | 475.929,36 € | **1.388,13 €** |
| **32 Jahre** | 35 Jahre | 183.000,00 € | 508.737,39 € | **691.737,39 €** | 73,5 % | 345.887,80 € | **1.008,84 €** |
| **40 Jahre** | 27 Jahre | 144.600,00 € | 253.509,77 € | **398.109,77 €** | 63,7 % | 233.237,40 € | **680,28 €** |
| **50 Jahre** | 17 Jahre | 96.600,00 € | 86.184,78 € | **182.784,78 €** | 47,2 % | 130.538,04 € | **380,74 €** |

Ein sieben Jahre früherer Start mit 25 statt 32 Jahren verlangt nur $33.600{,}00\text{ €}$ mehr Einzahlung, erhöht das nominale Endkapital jedoch um über **$401.588{,}00\text{ €}$**.

## Häufige Planungsfehler bei der Altersvorsorge vermeiden

* **Kaufkraftillusion durch rein nominale Zahlen:** Knapp $700.000{,}00\text{ €}$ klingen üppig, besitzen nach 35 Jahren bei $2{,}0\text{ \%}$ Inflation jedoch nur die Kaufkraft heutiger $346.000{,}00\text{ €}$. Prüfen Sie Ihre Planung daher stets zusätzlich mit der realen Rendite nach Fisher-Gleichung (im Beispiel $3{,}92\text{ \%}$ statt $6{,}00\text{ \%}$).
* **Steuerlast und Produktkosten unterschätzen:** Eine jährliche Gesamtkostenquote von $1{,}5\text{ \%}$ statt $0{,}2\text{ \%}$ zehrt über 35 Jahre mehr als ein Viertel des Endvermögens auf. Planen Sie in Deutschland zusätzlich Abgeltungsteuer, jährliche Vorabpauschale und die $30\text{-\%}$-Teilfreistellung für Aktienfonds ein.
* **Renditereihenfolgerisiko beim Renteneintritt:** Ein Kurseinbruch unmittelbar vor oder zu Beginn der Entnahmephase gefährdet die Kapitaldauer, da Anteile zu Tiefstkursen verkauft werden müssen. Bilden Sie fünf bis sieben Jahre vor Ruhestandsbeginn schrittweise eine Liquiditätsreserve für drei bis fünf Jahresausgaben.
* **Langlebigkeitsrisiko ausblenden:** Die durchschnittliche statistische Lebenserwartung genügt nicht, da rund die Hälfte eines Jahrgangs älter wird. Rechnen Sie für die Entnahmephase mindestens bis zum 90. Lebensjahr und simulieren Sie im Rentenrechner vorsorglich auch ein Szenario mit ein bis zwei Prozentpunkten geringerer Rendite.
