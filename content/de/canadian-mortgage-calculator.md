---
title: "Kanadischer Hypothekenrechner"
metaTitle: "Kanadischer Hypothekenrechner: Halbjährliche Verzinsung"
description: "Berechnen Sie Ihre kanadische Immobilienfinanzierung nach der gesetzlich vorgeschriebenen halbjährlichen Zinseszinsformel inklusive CMHC-Prämie und Tilgungsplan."
metaDescription: "Kostenloser Kanadischer Hypothekenrechner: Berechnen Sie Monatsraten mit halbjährlicher Verzinsung, Eigenkapital-Stufen und CMHC-Versicherung präzise."
metaKeywords: "kanadischer hypothekenrechner, immobilienfinanzierung kanada, halbjährliche verzinsung, cmhc versicherung, hypothek kanada berechnen, annuität kanada"
faqs:
  - question: "Warum werden Festhypotheken in Kanada gesetzlich halbjährlich und nicht monatlich verzinst?"
    answer: "Gemäß Section 6 des kanadischen Zinsgesetzes (Canada Interest Act) sind Kreditinstitute verpflichtet, den Zinssatz von Festhypotheken auf Basis einer jährlichen oder halbjährlichen Zinseszinsverrechnung (Semi-Annual Compounding) auszuweisen. Da der Zinseszins dadurch nur zweimal statt zwölfmal pro Jahr dem Kapital zugeschlagen wird, fällt der effektive Monatszins bei gleichem Nominalzins etwas niedriger aus als bei einem deutschen oder US-amerikanischen Annuitätendarlehen."
  - question: "Wie hoch ist das gesetzlich vorgeschriebene Mindesteigenkapital beim Immobilienkauf in Kanada?"
    answer: "Das Mindesteigenkapital (Minimum Down Payment) ist in Kanada gestaffelt: Bis zu einem Kaufpreis von 500.000 CA$ (bzw. dem Euro-Äquivalent) genügen mindestens 5 % Eigenkapital. Liegt der Kaufpreis zwischen 500.000 CA$ und 1.499.999 CA$, sind 5 % auf die ersten 500.000 CA$ und 10 % auf den darüberliegenden Teilbetrag erforderlich. Ab einem Kaufpreis von 1.500.000 CA$ oder bei vermieteten Anlageobjekten sind mindestens 20 % Eigenkapital Pflicht."
  - question: "Wann ist eine CMHC-Hypothekenausfallversicherung erforderlich und wie wird sie gezahlt?"
    answer: "Sobald ein Käufer weniger als 20 % Eigenkapital einbringt (sogenannte High-Ratio Mortgage mit einem Beleihungsauslauf über 80 %), schreibt das kanadische Bankengesetz eine Hypothekenausfallversicherung über die staatliche CMHC (Canada Mortgage and Housing Corporation) oder private Versicherer wie Sagen und Canada Guaranty vor. Die Prämie beträgt je nach Eigenkapitalquote zwischen 2,80 % und 4,00 % der Darlehenssumme und wird in der Regel direkt auf den Kreditbetrag aufgeschlagen."
  - question: "Was ist der Unterschied zwischen Zinsbindungsfrist (Mortgage Term) und Gesamttilgung (Amortization Period)?"
    answer: "Die Gesamttilgungsdauer (Amortization Period) gibt an, nach wie vielen Jahren das Darlehen vollständig abbezahlt ist – in Kanada typischerweise 25 Jahre (bei mindestens 20 % Eigenkapital oder für Erstkäufer von Neubauten bis zu 30 Jahre). Die Zinsbindungsfrist (Term) bezeichnet hingegen die Vertragsdauer mit festem Zinssatz, die in Kanada meist nur 3 oder 5 Jahre beträgt. Nach Ablauf dieses Terms wird der Restbetrag zu aktuellen Marktkonditionen neu verhandelt."
  - question: "Wie funktioniert der kanadische Hypotheken-Stresstest der Finanzaufsicht OSFI?"
    answer: "Um Kreditnehmer vor steigenden Zinsen bei der Anschlussfinanzierung zu schützen, verlangt die Aufsichtsbehörde OSFI (Richtlinie B-20) einen Stresstest: Käufer müssen nachweisen, dass sie sich die Rate auch zum sogenannten Qualifying Rate leisten können. Dieser Prüfzins entspricht dem höheren Wert aus dem vereinbarten Vertragszins plus 2,00 Prozentpunkten oder dem offiziellen Mindestprüfzins von 5,25 %."
---

Ein spezialisierter **Kanadischer Hypothekenrechner** ist für Auswanderer, internationale Immobilieninvestoren und Käufer aus Deutschland, Österreich und der Schweiz unverzichtbar, da sich die Finanzmathematik kanadischer Banken grundlegend von europäischen und US-amerikanischen Annuitätendarlehen unterscheidet. Wer eine kanadische Immobilie mit einem herkömmlichen deutschen Baufinanzierungsrechner kalkuliert, erhält systematisch abweichende Monatsraten und Restschulden, weil das kanadische Recht eine **halbjährliche Zinseszinsverrechnung** vorschreibt.

## Besonderheiten der kanadischen Immobilienfinanzierung im Vergleich zum DACH-Raum

Während Immobilienkredite in Deutschland, Österreich und der Schweiz (wie auch in den USA) standardmäßig auf einer **monatlichen Zinsverrechnung** basieren, bei der der nominale Jahreszins einfach durch $12$ geteilt wird, regelt Section 6 des kanadischen Zinsgesetzes (*Canada Interest Act*) eine zwingende Besonderheit: Bei allen Festhypotheken (*Fixed-Rate Mortgages*) erfolgt die Zinseszinskapitalisierung **halbjährlich im Nachhinein** (*compounded semi-annually, not in advance*).

Da der Zinseszins dem Darlehenskapital rechnerisch nur zweimal statt zwölfmal pro Jahr belastet wird, ist der effektive Monatszins in Kanada bei identischem Nominalzinssatz geringer als im DACH-Raum. Darüber hinaus gliedert sich eine kanadische Hypothek in kurze Zinsbindungsintervalle (*Terms* von meist 3 bis 5 Jahren) innerhalb einer Gesamttilgungsdauer (*Amortization Period*) von 25 bis 30 Jahren, ergänzt durch flexible Zahlungsintervalle wie zweiwöchentliche (*Bi-Weekly*) oder beschleunigte zweiwöchentliche Raten (*Accelerated Bi-Weekly*).

## Mathematische Formeln für die halbjährliche Zinseszinsberechnung

Gegeben sei ein nominaler Jahreszinssatz $i_{\text{nom}}$ (als Dezimalzahl, z. B. $0{,}048$ für $4{,}80\text{ %}$). Durch die halbjährliche Kapitalisierung ($2$ Zinsperioden pro Jahr) berechnet sich zunächst der **effektive Jahreszinssatz** $i_{\text{eff}}$:

$$i_{\text{eff}} = \left(1 + \frac{i_{\text{nom}}}{2}\right)^2 - 1$$

Um daraus den exakten periodischen Zinssatz $r_z$ für eine beliebige Zahlungsfrequenz mit $z$ Raten pro Jahr zu bestimmen ($z = 12$ für monatliche Zahlung, $z = 26$ für zweiwöchentliche Zahlung, $z = 52$ für wöchentliche Zahlung), wird die Äquivalenzbedingung $(1 + r_z)^z = (1 + i_{\text{nom}}/2)^2$ nach $r_z$ aufgelöst:

$$r_z = \left(1 + \frac{i_{\text{nom}}}{2}\right)^{\frac{2}{z}} - 1$$

Für die klassische **monatliche Ratenzahlung ($z = 12$)** lautet die kanadische Monatszinsformel somit:

$$r_{\text{Monat}} = \left(1 + \frac{i_{\text{nom}}}{2}\right)^{\frac{2}{12}} - 1 = \left(1 + \frac{i_{\text{nom}}}{2}\right)^{\frac{1}{6}} - 1$$

Mit diesem effektiven Periodenzins $r_z$, der Gesamtdarlehenssumme $K$ (Nettokreditbetrag zuzüglich einer eventuell mitfinanzierten CMHC-Versicherungsprämie) und der Gesamtzahl aller Raten $n = z \cdot J$ über $J$ Tilgungsjahre ergibt sich die konstante Rate $R$ über die Annuitätenformel:

$$R = K \cdot \frac{r_z \cdot (1 + r_z)^n}{(1 + r_z)^n - 1}$$

*Hinweis zu beschleunigten Raten (Accelerated Bi-Weekly):* Während bei der regulären zweiwöchentlichen Zahlung die Jahresleistung ($12 \cdot R_{\text{Monat}}$) auf 26 Raten verteilt wird ($R_{\text{Bi-Weekly}} = R_{\text{Monat}} \cdot 12 / 26$), zahlt der Kreditnehmer bei der beschleunigten Variante alle 14 Tage exakt die **Hälfte einer Monatsrate** ($R_{\text{Accel}} = R_{\text{Monat}} / 2$). Durch 26 Zahlungen pro Jahr fließt so jedes Jahr eine vollständige 13. Monatsrate direkt in die Tilgung.

## Schritt-für-Schritt-Rechenbeispiel: Vergleich Kanada vs. DACH-Annuität

Ein Investor aus Frankfurt erwirbt eine Eigentumswohnung in Kanada. Zur direkten Vergleichbarkeit mit einem europäischen Portfolio werden die Beträge in Euro (**€**) angegeben (bei einem Wechselkurs von $1{,}00\text{ €} = 1{,}50\text{ CA\$}$ entspricht dies einem Kaufpreis von $600.000,00\text{ CA\$}$):
* **Kaufpreis der Immobilie:** $400.000{,}00\text{ €}$ ($600.000{,}00\text{ CA\$}$)
* **Eigenkapital (20,00 %):** $80.000{,}00\text{ €}$ (ab 20 % Quote entfällt die CMHC-Versicherungspflicht)
* **Nettodarlehensbetrag ($K$):** $320.000{,}00\text{ €}$ ($480.000{,}00\text{ CA\$}$)
* **Nominaler Jahreszins ($i_{\text{nom}}$) & Laufzeit ($J$):** $4{,}80\text{ % p. a.}$ über $25\text{ Jahre}$ ($n = 300\text{ Monatsraten}$)

### 1. Berechnung des effektiven Jahres- und Monatszinses nach kanadischem Recht
Der Halbjahreszins beträgt $i_{\text{nom}} / 2 = 0{,}048 / 2 = 0{,}024$ ($2{,}40\text{ %}$). Daraus folgen:

$$i_{\text{eff}} = (1 + 0{,}024)^2 - 1 = 4{,}8576\text{ % p. a.} \quad \text{sowie} \quad r_{\text{Monat}} = (1{,}024)^{\frac{1}{6}} - 1 \approx 0{,}00396058 \text{ (0,396058 %)}$$

Zum Vergleich: Bei deutscher monatlicher Verzinsung betrüge der Monatszins $4{,}80\text{ %} / 12 = 0{,}400000\text{ %}$ und der Effektivzins $4{,}9070\text{ % p. a.}$

### 2. Berechnung der monatlichen Annuitätenrate ($n = 300$)
Mit dem Aufzinsungsfaktor $(1 + r_{\text{Monat}})^{300} = (1{,}024)^{50} \approx 3{,}273391$ ergibt sich die Monatsrate:

$$R_{\text{Kanada}} = 320.000{,}00\text{ €} \cdot \frac{0{,}00396058 \cdot 3{,}273391}{3{,}273391 - 1} = 1.824{,}87\text{ € pro Monat}$$

Nach deutschem Standard ($r = 0{,}004$) läge die Monatsrate desselben Kredits bei **$1.833{,}60\text{ €}$**. Durch die kanadische Halbjahresverzinsung spart der Kreditnehmer bei identischem Nominalzins **$8{,}73\text{ €}$ pro Monat** bzw. **$2.619{,}00\text{ €}$** über 25 Jahre.

## Referenztabelle: Eigenkapitalstufen und CMHC-Versicherungsprämien

Liegt das Eigenkapital unter $20{,}00\text{ %}$, wird eine obligatorische Ausfallversicherung (CMHC, Sagen oder Canada Guaranty) fällig, deren Prämie auf den Kreditbetrag aufgeschlagen wird:

| Beleihungsauslauf (LTV) | Eigenkapitalquote | Standard-Prämie | Aufschlag (30 J. Tilgung) | Prämie bei 320.000,00 € Kredit |
| :--- | :---: | :---: | :---: | :---: |
| **Bis 80,00 % LTV** | **Ab 20,00 %** | **0,00 %** | Entfällt | **0,00 € (Keine CMHC-Pflicht)** |
| **80,01 % – 85,00 % LTV** | 15,00 % – 19,99 % | **2,80 %** | + 0,20 % (3,00 %) | **8.960,00 €** (Kredit: 328.960,00 €) |
| **85,01 % – 90,00 % LTV** | 10,00 % – 14,99 % | **3,10 %** | + 0,20 % (3,30 %) | **9.920,00 €** (Kredit: 329.920,00 €) |
| **90,01 % – 95,00 % LTV** | 5,00 % – 9,99 % | **4,00 %** | + 0,20 % (4,20 %) | **12.800,00 €** (Kredit: 332.800,00 €) |

## Praxistipps und häufige Fallstricke bei kanadischen Hypotheken

* **Provinzsteuer auf die CMHC-Prämie bar einplanen:** Während die CMHC-Versicherungsprämie selbst über das Darlehen mitfinanziert werden darf, erheben **Ontario (8 % PST)**, **Québec (9 % QST)** und **Saskatchewan (6 % PST)** eine Versicherungssteuer auf diese Prämie. Diese Steuer muss beim Notartermin (*Closing Date*) zusätzlich in bar aus dem Eigenkapital beglichen werden.
* **Vorfälligkeitsentschädigung (Interest Rate Differential, IRD) prüfen:** Wer eine geschlossene 5-Jahres-Festhypothek (*Closed Fixed Mortgage*) bei einer kanadischen Großbank vorzeitig ablöst, zahlt den höheren Betrag aus drei Monatszinsen oder dem **Interest Rate Differential (IRD)**. Da Großbanken den IRD oft anhand hoher Listenpreise (*Posted Rates*) statt des Rabattzinses berechnen, fällt die Vorfälligkeitsstrafe oft sehr hoch aus.
* **Beschleunigte zweiwöchentliche Zahlung nutzen:** Durch die Umstellung von monatlicher Rate ($1.824{,}87\text{ €}$) auf *Accelerated Bi-Weekly* ($912{,}44\text{ €}$ alle 14 Tage) verkürzt sich die Gesamttilgungsdauer unseres $320.000{,}00\text{-€}$-Beispielkredits bei $4{,}80\text{ %}$ Zins von 25 Jahren auf rund **21 Jahre und 7 Monate**, was über **$34.200{,}00\text{ €}$ an Zinskosten** spart.
* **Stresstest-Quoten (GDS und TDS) beachten:** Kanadische Banken prüfen unter dem OSFI-Stresstestzins (Vertragszins $+ 2{,}00\text{ %}$, mindestens $5{,}25\text{ %}$) zwei Verschuldungsgrenzen: Die *Gross Debt Service Ratio (GDS)* für Wohnkosten darf maximal **39 %** des Bruttoeinkommens betragen, die *Total Debt Service Ratio (TDS)* inklusive aller sonstigen Kredite maximal **44 %**.
