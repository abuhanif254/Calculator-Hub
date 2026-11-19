---
title: "Dividenden-Reinvestitionsrechner (DRIP)"
metaTitle: "Dividenden-Reinvestitionsrechner (DRIP): Schneeballeffekt"
description: "Berechnen Sie den Zinseszinseffekt automatisch wiederangelegter Dividenden (DRIP), die Entwicklung Ihrer Anteile und Ihre persönliche Einstandsrendite."
metaDescription: "Simulieren Sie Vermögensaufbau und passives Einkommen durch Dividenden-Reinvestition (DRIP). Mit Anteilszuwachs, Yield on Cost und Steuervergleich."
metaKeywords: "dividenden reinvestitionsrechner, drip rechner, dividenden wiederanlage berechnen, yield on cost rechner, dividenden schneeballeffekt, passives einkommen aktien"
faqs:
  - question: "Was ist der Unterschied zwischen DRIP bei Einzelaktien und einem thesaurierenden ETF?"
    answer: "Bei einem DRIP (Dividend Reinvestment Plan) schüttet das Unternehmen oder der ETF zunächst Dividenden aus, die anschließend automatisch in neue Anteile oder Bruchstücke reinvestiert werden. Ein thesaurierender ETF legt die Erträge hingegen bereits auf Fondsebene intern wieder an, ohne dass eine Auszahlung auf Ihr Verrechnungskonto erfolgt."
  - question: "Muss ich auf automatisch reinvestierte Dividenden trotzdem Steuern zahlen?"
    answer: "Ja. Im deutschsprachigen Raum gelten ausgeschüttete Dividenden steuerlich als zugeflossen, selbst wenn Ihr Broker sie sofort wieder anlegt. In Deutschland greift oberhalb des Sparer-Pauschbetrags die Abgeltungsteuer (26,375 % inkl. Soli), in Österreich 27,5 % KESt und in der Schweiz die reguläre Einkommensteuer. Nur der Nettobetrag kauft neue Anteile."
  - question: "Was sagt die Kennzahl „Yield on Cost“ (persönliche Einstandsrendite) aus?"
    answer: "Die Kennzahl Yield on Cost setzt Ihre aktuelle Jahresdividende ins Verhältnis zu Ihrem ursprünglichen Kaufpreis statt zum heutigen Börsenkurs. Steigen Dividenden und Stückzahl durch DRIP über 15 Jahre stetig an, kann Ihre jährliche Ausschüttung bezogen auf das ursprünglich eingesetzte Kapital leicht 10 % oder mehr erreichen."
  - question: "Ist eine hohe Start-Dividendenrendite oder starkes Dividendenwachstum langfristig besser?"
    answer: "In den ersten fünf bis sieben Jahren liefert eine höhere Anfangsrendite (etwa 5 % bis 6 %) mehr Cashflow. Über Horizonte von 15 bis 25 Jahren schlagen solide Qualitätsunternehmen mit moderater Startrendite (2,5 % bis 3,5 %) und verlässlichem Dividendenwachstum von 6 % bis 8 % p. a. jedoch fast immer die Hochdividendenwerte."
  - question: "Wie funktionieren Bruchstücke (Fractional Shares) bei der automatischen Wiederanlage?"
    answer: "Reicht eine ausgeschüttete Dividende nicht für den Kauf einer ganzen Aktie aus, bucht ein DRIP-fähiger Broker entsprechende Nachkomma-Anteile (z. B. 0,42 Aktien) in Ihr Depot ein. Diese Bruchstücke nehmen bereits ab dem nächsten Ausschüttungstermin anteilig an weiteren Dividenden und Kursgewinnen teil."
---

## Der Schneeballeffekt: Wie DRIP drei Wachstumsmotoren verbindet

Wer Dividenden nicht auf dem Girokonto konsumiert, sondern systematisch in neue Anteile desselben Wertpapiers zurückfließen lässt, nutzt das Prinzip des **DRIP (Dividend Reinvestment Plan – automatische Dividenden-Wiederanlage)**. Anders als beim klassischen Festgeld wirken dabei nicht nur ein, sondern gleich **drei kumulative Renditetreiber** zusammen:

1. **Wachsende Stückzahl**: Jede Ausschüttung kauft neue Aktien oder ETF-Bruchstücke, die künftig selbst wieder Dividenden erzeugen.
2. **Organisches Dividendenwachstum**: Etablierte Ausschütter steigern ihre Dividende je Aktie langfristig oft im Gleichschritt mit ihren Unternehmensgewinnen.
3. **Kursentwicklung**: Jeder zusätzlich erworbene Anteil profitiert von langfristigen Kurssteigerungen am Aktienmarkt.

In den ersten drei bis fünf Jahren wirkt dieser Effekt noch unscheinbar. Erst ab dem zweiten Jahrzehnt kippt die Kurve merklich nach oben, weil die zusätzlich gekauften Anteile einen immer größeren Teil des jährlichen Kapitalzuflusses stemmen.

## Das mathematische Modell hinter der Dividenden-Reinvestition

Da sowohl die Stückzahl als auch der Aktienkurs und die Dividende je Anteil von Periode zu Periode variieren, bildet ein präziser DRIP-Rechner das Wachstum iterativ je Ausschüttungsperiode `k` (jährlich oder quartalsweise) ab:

```
Bruttodividende_k = Anteile_(k−1) · DPS_k
Neue_Anteile_k    = [ Bruttodividende_k · (1 − s) ] / Kurs_k
Anteile_k         = Anteile_(k−1) + Neue_Anteile_k
Depotwert_k       = Anteile_k · Kurs_k
```

Hierbei bezeichnen:

- **`Anteile_(k−1)`**: Bestand an Wertpapieranteilen vor dem Ausschüttungsstichtag.
- **`DPS_k`**: Dividende pro Aktie (Dividend per Share) in Periode `k`, die jährlich um die Wachstumsrate `g_Div` steigt.
- **`Kurs_k`**: Aktien- oder Fondskurs zum Wiederanlagezeitpunkt (wächst mit `g_Kurs`).
- **`s`**: Persönlicher Steuersatz auf Dividenden (z. B. `0` innerhalb des Freibetrags bzw. `0,26375` in Deutschland nach Ausschöpfung des Sparer-Pauschbetrags ohne Kirchensteuer).

Eine zentrale Steuerungsgröße für Einkommensinvestoren ist zudem die **persönliche Einstandsrendite (Yield on Cost, YoC)**:

```
YoC_t = (Aktuelle_Jahresdividende_t / Ursprüngliches_Startkapital) · 100 %
```

## Rechenbeispiel: 25.000 € Dividendenportfolio über 15 Jahre

Ein Anleger investiert **25.000 €** in ein breit gestreutes Dividenden-Qualitätsportfolio (500 Anteile zu je **50,00 €**). Im ersten Jahr beträgt die Dividende **1,75 € je Anteil** (3,50 % anfängliche Dividendenrendite). Kurs und Dividende je Anteil wachsen im Modell jeweils um **5,0 % pro Jahr**; die Wiederanlage erfolgt einmal jährlich am Jahresende.

- **Ende Jahr 1**: Der Kurs steigt auf `50,00 € · 1,05 = 52,50 €`. Die Bruttodividende beträgt `500 × 1,75 € = 875,00 €`.
  - *Vor Steuern*: Für 875,00 € werden `875,00 / 52,50 = 16,67` neue Anteile gekauft. Der Bestand wächst auf **516,67 Anteile** mit einem Depotwert von **27.125,00 €**.
  - *Nach 26,375 % Abgeltungsteuer*: Nach Steuerabzug verbleiben **644,22 €** zur Wiederanlage (`12,27` neue Anteile). Das Depot erreicht **512,27 Anteile** bzw. **26.894,22 €**.
- **Ende Jahr 15**: Der Kurs hat sich auf rund **103,95 €** (`50 · 1,05^15`) mehr als verdoppelt, die Dividende je Anteil liegt bei **3,46 €**.
  - *Ohne DRIP* bleiben es exakt 500 Anteile im Depotwert von **51.973,20 €** (plus 18.881,25 € unverzinst angesammelte Bruttodividenden = 70.854,45 €).
  - *Mit DRIP (vor Steuern)* ist der Bestand auf **817,67 Anteile** angewachsen – der Depotwert erreicht **84.993,57 €**. Die jährliche Bruttodividende klettert auf **2.741,73 €**, was einer persönlichen Einstandsrendite (YoC) von **10,97 %** entspricht.
  - *Mit DRIP (nach 26,375 % Steuer auf jede Ausschüttung)* stehen **719,31 Anteile** bzw. **74.769,40 €** im Depot, die jährlich **2.432,61 € brutto** (1.791,01 € netto) ausschütten.

## Vergleichstabelle: Wiederanlage gegen Ausschüttung über 20 Jahre

Die Übersicht zeigt die Entwicklung des 25.000-€-Startportfolios (5 % Kurs- und 5 % Dividendenwachstum, 3,5 % Startrendite) im Zeitverlauf:

| Jahr | Depot ohne DRIP | Gesamt ohne DRIP (inkl. Cash) | DRIP vor Steuer | DRIP nach 26,375 % Steuer | Dividende DRIP (brutto) | Yield on Cost |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | 26.250 € | 27.125 € | 27.125 € | 26.894 € | 875 € | 3,50 % |
| **5** | 31.907 € | 36.742 € | 37.591 € | 36.019 € | 1.213 € | 4,85 % |
| **10** | 40.722 € | 51.728 € | 56.525 € | 51.895 € | 1.823 € | 7,29 % |
| **15** | 51.973 € | 70.854 € | 84.994 € | 74.769 € | 2.742 € | 10,97 % |
| **20** | 66.332 € | 95.265 € | 127.801 € | 107.725 € | 4.123 € | 16,49 % |

Nach 20 Jahren übertrifft das reine DRIP-Depot selbst nach vollem jährlichem Steuerabzug den Gesamtwert der unverzinsten Ausschüttungsstrategie vor Steuern um über **12.400 €** – und erwirtschaftet ein massiv höheres laufendes Einkommen.

## Praxisfallen bei DRIP-Strategien im deutschsprachigen Raum

### Ausschüttungsfrequenz und Hochdividenden-Falle bewerten

Während deutsche DAX-Konzerne typischerweise nur einmal jährlich nach der Hauptversammlung im Frühjahr ausschütten, zahlen die meisten US-Aktien und internationalen Dividenden-ETFs **quartalsweise**. Eine vierteljährliche Wiederanlage beschleunigt den Zinseszinseffekt leicht und reduziert das Timing-Risiko einzelner Kaufkurse, weil die Reinvestition auf vier Zeitpunkte pro Jahr verteilt wird. Lassen Sie sich bei der Titelauswahl jedoch nicht von optisch extremen Renditen blenden: Dividendenrenditen von 8 % bis 10 % signalisieren oft schrumpfende Gewinne oder einen vorangegangenen Kurseinbruch. Prüfen Sie zwingend die **Ausschüttungsquote (Payout Ratio)** auf Basis des freien Cashflows: Schüttet ein Konzern dauerhaft über 85 % seiner freien Mittel aus, droht bei der nächsten Konjunkturdelle eine Dividendenkürzung – und damit ein doppelter Rückschlag aus sinkender Ausschüttung und Kursverlust.

### Steuerbremse, Quellensteuer und Übergang zur Entnahmephase

Anders als in US-Steuersparplänen löst jede Dividendenzahlung in Deutschland, Österreich und der Schweiz sofort eine Steuerpflicht aus. Bei ausländischen Einzeltiteln kommt die **Quellensteuer** hinzu: US-Dividenden werden bei deutschen Depotbanken meist problemlos mit 15 % angerechnet, während Frankreich, Italien oder die Schweiz 25 % bis 35 % einbehalten und teils aufwendige Erstattungsanträge verlangen. Achten Sie außerdem auf die Transaktionskosten: Wer 50 € Dividende manuell für 5 € Ordergebühr reinvestiert, verliert sofort 10 % seiner Ausschüttung. Nutzen Sie daher kostenfreie automatische Wiederanlagen Ihres Brokers, gebührenfreie Sparpläne zur Bündelung der Ausschüttungen oder – bei breiten Indizes – direkt einen thesaurierenden Dividenden- oder Welt-ETF. Sobald Ihr Depot nach der Aufbauphase das gewünschte Zusatzeinkommen erreicht, schalten Sie die Wiederanlage einfach ab: Der über Jahre gewachsene Anteilsbestand liefert ab diesem Zeitpunkt regelmäßige Ausschüttungen direkt auf Ihr Girokonto, ohne dass Sie Unternehmensanteile verkaufen müssen.
