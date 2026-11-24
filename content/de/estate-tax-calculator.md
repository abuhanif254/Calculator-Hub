---
title: "Erbschaftssteuerrechner"
metaTitle: "Erbschaftssteuerrechner: Freibeträge & Steuer berechnen"
description: "Ermitteln Sie Ihre voraussichtliche Erbschaftssteuer unter Berücksichtigung von Bruttonachlass, abzugsfähigen Nachlassverbindlichkeiten, Freibeträgen und Steuerklassen."
metaDescription: "Kostenloser Erbschaftssteuerrechner: Berechnen Sie Steuerlast, Freibeträge, Nachlassabzüge und Nettoerbe für Deutschland, Österreich und Schweiz."
metaKeywords: "erbschaftssteuerrechner, erbschaftssteuer berechnen, freibetrag erbschaft, steuerklasse erbschaftssteuer, nachlassplanung, reinnachlass, schenkungssteuer"
faqs:
  - question: "Wie hoch sind die persönlichen Freibeträge bei der Erbschaftssteuer in Deutschland?"
    answer: "Nach Paragraf 16 des deutschen Erbschaftsteuergesetzes (ErbStG) richtet sich der persönliche Freibetrag nach dem Verwandtschaftsgrad zum Erblasser: Ehepartner und eingetragene Lebenspartner erhalten 500.000 €, Kinder und Stiefkinder 400.000 €, Enkel 200.000 € (oder 400.000 €, wenn das eigene Elternteil bereits verstorben ist), Eltern und Großeltern im Erbfall 100.000 € sowie Geschwister, Neffen, Nichten und unverheiratete Lebenspartner lediglich 20.000 €."
  - question: "Welche Kosten und Schulden darf ich vom Bruttonachlass abziehen?"
    answer: "Vom Verkehrswert des gesamten Vermögens werden alle nachgewiesenen Nachlassverbindlichkeiten abgezogen, insbesondere offene Darlehen, Immobilienhypotheken, Steuerschulden des Erblassers sowie Pflichtteilsansprüche. Zusätzlich mindern Bestattungs-, Grabpflege- und Nachlassabwicklungskosten die Bemessungsgrundlage; in Deutschland gewährt das Finanzamt hierfür ohne Einzelnachweis eine Erbfallkostenpauschale von 10.300 € oder auf Nachweis die höheren tatsächlichen Aufwendungen."
  - question: "Gibt es in Österreich und der Schweiz ebenfalls eine Erbschaftssteuer?"
    answer: "Österreich hat die klassische Erbschafts- und Schenkungssteuer zum 1. August 2008 abgeschafft; bei vererbten Immobilien fällt dort jedoch weiterhin Grunderwerbsteuer nach einem begünstigten Stufentarif im Familienverband an. In der Schweiz gibt es keine Bundeserbschaftssteuer, sondern kantonale Regelungen: Ehegatten sind schweizweit befreit und direkte Nachkommen in fast allen Kantonen steuerfrei, während entfernte Verwandte oder Lebenspartner je nach Kanton spürbar besteuert werden."
  - question: "Wie funktioniert die 10-Jahres-Frist bei lebzeitigen Schenkungen?"
    answer: "Persönliche Freibeträge nach dem deutschen Erbschaft- und Schenkungsteuergesetz erneuern sich alle zehn Jahre vollständig. Alle Erwerbe von derselben Person innerhalb eines Zehnjahreszeitraums werden nach Paragraf 14 ErbStG zusammengerechnet. Wer Vermögen frühzeitig in Tranchen überträgt, kann denselben Freibetrag im Abstand von zehn Jahren mehrfach steuerfrei ausschöpfen."
  - question: "Wann ist das selbstgenutzte Familienheim von der Erbschaftssteuer befreit?"
    answer: "In Deutschland bleibt das vom Erblasser selbst bewohnte Familienheim für den überlebenden Ehepartner unabhängig von der Wohnfläche steuerfrei, sofern dieser die Immobilie mindestens zehn Jahre lang selbst bewohnt. Für Kinder gilt dieselbe zehnjährige Selbstnutzungspflicht, allerdings ist die Steuerbefreiung auf maximal 200 Quadratmeter Wohnfläche begrenzt; der darüberliegende Anteil fließt anteilig in den steuerpflichtigen Nachlass ein."
---

Ein präziser **Erbschaftssteuerrechner** hilft Erblassern, Erben und Testamentsvollstreckern dabei, die tatsächliche Steuerbelastung eines Nachlasses realistisch einzuschätzen und frühzeitig Liquiditätsengpässe zu vermeiden. Während die Erbschaftssteuer in Österreich bereits 2008 abgeschafft wurde (bei Immobilien jedoch die Grunderwerbsteuer greift) und in der Schweiz kantonal geregelt ist, unterliegt jeder Erwerb von Todes wegen in Deutschland der progressiven Erbanfallsteuer nach dem **Erbschaftsteuer- und Schenkungsteuergesetz (ErbStG)**.

## Berechnungslogik und maßgebliche Gleichungen

Unser Erbschaftssteuerrechner strukturiert die Nachlassbewertung modular nach dem klaren Prinzip vom Bruttovermögen zur Nettoerbschaft. Durch frei einstellbare Freibeträge, den optionalen Familienstand (Einzelperson oder verheiratete Paare mit verdoppelbarem Gesamtfreibetrag) sowie den individuellen Steuersatz lassen sich sowohl deutsche Steuerklassen als auch schweizerische Kantonalmodelle oder grenzüberschreitende Nachlässe abbilden.

### Mathematisches Modell der Nachlassbesteuerung

Der gesamte **Bruttonachlass** $V_{\text{brutto}}$ ergibt sich als Summe aller zum Todestag bewerteten Vermögenswerte $V_k$ (Immobilien zum Verkehrswert, Bankguthaben, Wertpapierdepots, Betriebsvermögen und Sachwerte):

$$V_{\text{brutto}} = \sum_{k=1}^{m} V_k$$

Von diesem Bruttowert werden die gesamten **Abzüge und Nachlassverbindlichkeiten** $D$ — bestehend aus offenen Schulden $S$, Bestattungs- und Abwicklungskosten $B$ sowie steuerbefreiten gemeinnützigen Zuwendungen $G$ — subtrahiert, um den **Reinnachlass** $V_{\text{netto}}$ zu erhalten:

$$V_{\text{netto}} = \max\left(0, \; V_{\text{brutto}} - (S + B + G)\right)$$

Nach Abzug des wirksamen **Freibetrags** $F_{\text{eff}}$ verbleibt der **steuerpflichtige Erwerb** $B_{\text{steuer}}$, aus dem mit dem anzuwendenden Steuersatz $s$ die **Erbschaftssteuer** $T$ und die verbleibende **Nettoerbschaft** $V_{\text{Erben}}$ berechnet werden:

$$B_{\text{steuer}} = \max\left(0, \; V_{\text{netto}} - F_{\text{eff}}\right), \qquad T = B_{\text{steuer}} \cdot s, \qquad V_{\text{Erben}} = V_{\text{netto}} - T$$

* **$V_{\text{brutto}}$ und $D$ (in €):** Marktgerechter Gesamtwert der Nachlassaktiva abzüglich Schulden, Hypotheken, Erbfallkosten (in Deutschland mindestens $10.300{,}00\text{ €}$ Pauschale nach § 10 Abs. 5 Nr. 3 ErbStG) und gemeinnütziger Vermächtnisse.
* **$F_{\text{eff}}$ (Effektiver Freibetrag in €):** Persönlicher Freibetrag pro Erben (oder kombinierter Freibetrag bei gemeinsamer Planung beider Elternteile bzw. Ehegatten).
* **$s$ (Steuersatz als Dezimalzahl):** Der maßgebliche Prozentsatz der jeweiligen Steuerklasse und Wertstufe nach § 19 ErbStG (bzw. dem anwendbaren kantonalen oder internationalen Tarif).

## Schritt-für-Schritt-Rechenbeispiel nach deutschem ErbStG

Ein erwachsenes Kind (Steuerklasse I, persönlicher Freibetrag $F_{\text{eff}} = 400.000{,}00\text{ €}$) wird Alleinerbe eines Elternteils in Deutschland. Der Nachlass umfasst eine vermietete Eigentumswohnung, Bankguthaben und ein Wertpapierdepot.

1. **Bruttonachlass ($V_{\text{brutto}}$) summieren:**
   * Eigentumswohnung (Verkehrswert nach Bewertungsgesetz): $620.000{,}00\text{ €}$
   * Bankguthaben und Tagesgeldkonto: $95.000{,}00\text{ €}$
   * Wertpapierdepot (Kurswert am Todestag): $145.000{,}00\text{ €}$
   * **Gesamter Bruttonachlass:** $620.000{,}00\text{ €} + 95.000{,}00\text{ €} + 145.000{,}00\text{ €} = \mathbf{860.000{,}00\text{ €}}$
2. **Abzugsfähige Verbindlichkeiten und Vermächtnisse ($D$) bestimmen:**
   * Restschuld Immobilienhypothek: $80.000{,}00\text{ €}$
   * Nachgewiesene Bestattungs- und Nachlasskosten (höher als die $10.300{,}00\text{-€}$-Pauschale): $12.000{,}00\text{ €}$
   * Steuerfreies Vermächtnis an eine gemeinnützige Stiftung (§ 13 Abs. 1 Nr. 16 ErbStG): $18.000{,}00\text{ €}$
   * **Gesamtabzüge:** $80.000{,}00\text{ €} + 12.000{,}00\text{ €} + 18.000{,}00\text{ €} = \mathbf{110.000{,}00\text{ €}}$
3. **Reinnachlass ($V_{\text{netto}}$) und steuerpflichtigen Erwerb ($B_{\text{steuer}}$) berechnen:**
   $$V_{\text{netto}} = 860.000{,}00\text{ €} - 110.000{,}00\text{ €} = \mathbf{750.000{,}00\text{ €}}$$
   $$B_{\text{steuer}} = 750.000{,}00\text{ €} - 400.000{,}00\text{ €} = \mathbf{350.000{,}00\text{ €}}$$
4. **Steuersatz zuordnen und Steuerschuld ($T$) ermitteln:**
   In Steuerklasse I gilt für einen steuerpflichtigen Erwerb zwischen $300.001\text{ €}$ und $600.000\text{ €}$ gemäß § 19 Abs. 1 ErbStG der Steuersatz **$s = 15\text{ \%}$** (der gesetzliche Härteausgleich nach § 19 Abs. 3 ErbStG greift hier nicht, da die Kappungsgrenze bei $33.000{,}00\text{ €} + 0{,}5 \cdot 50.000{,}00\text{ €} = 58.000{,}00\text{ €}$ liegt).
   $$T = 350.000{,}00\text{ €} \cdot 0{,}15 = \mathbf{52.500{,}00\text{ €}} \implies V_{\text{Erben}} = 750.000{,}00\text{ €} - 52.500{,}00\text{ €} = \mathbf{697.500{,}00\text{ €}}$$

Bezogen auf den Reinnachlass entspricht dies einer effektiven Steuerquote von exakt **$7{,}00\text{ \%}$**. Hätten beide Elternteile das Vermögen getrennt vererbt oder frühzeitig einen Freibetrag doppelt genutzt ($F_{\text{eff}} = 800.000{,}00\text{ €}$), wäre bei $750.000{,}00\text{ €}$ Reinnachlass eine Steuer von **$0{,}00\text{ €}$** angefallen.

## Referenztabelle: Deutsche Steuerklassen, Freibeträge und Steuersätze

Die folgende Übersicht zeigt die gesetzlichen Eckwerte nach §§ 15, 16 und 19 ErbStG für die Eingabe im Erbschaftssteuerrechner:

| Verwandtschaftsverhältnis | Steuerklasse | Persönlicher Freibetrag | Besonderer Versorgungsfreibetrag | Steuersatz (bis 75.000 €) | Steuersatz (bis 600.000 €) | Spitzensteuersatz (über 26 Mio. €) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Ehepartner / eingetragene Lebenspartner** | I | **500.000 €** | bis 256.000 € | 7 % | 15 % | 30 % |
| **Kinder, Stief- und Adoptivkinder** | I | **400.000 €** | 10.300 € – 52.000 €* | 7 % | 15 % | 30 % |
| **Enkel (Elternteil lebt)** | I | **200.000 €** | entfällt | 7 % | 15 % | 30 % |
| **Eltern und Großeltern (im Erbfall)** | I | **100.000 €** | entfällt | 7 % | 15 % | 30 % |
| **Geschwister, Neffen, Nichten, Schwiegerkinder** | II | **20.000 €** | entfällt | 15 % | 25 % | 43 % |
| **Unverheiratete Partner, Freunde, Sonstige** | III | **20.000 €** | entfällt | 30 % | 30 % | 50 % |

*\*Gestaffelt nach Alter des Kindes bis zum vollendeten 27. Lebensjahr (§ 17 Abs. 2 ErbStG).*

## Typische Fallstricke bei der Nachlass- und Erbschaftssteuerplanung

* **Steuerfalle Berliner Testament:** Setzen sich Ehepartner gegenseitig als Alleinerben ein, geht der Freibetrag der Kinder im ersten Erbfall verloren. Das gebündelte Vermögen trifft beim Tod des zweiten Elternteils dann ungeteilt auf nur noch einen Kinderfreibetrag von $400.000{,}00\text{ €}$, was die Gesamtsteuerlast drastisch erhöht.
* **Zusammenrechnung von Vorschenkungen innerhalb von zehn Jahren:** Schenkungen desselben Erblassers aus den letzten zehn Jahren werden dem Erwerb hinzugerechnet. Wer diese Vorschenkungen im Rechner vergisst, unterschätzt sowohl den verbleibenden Freibetrag als auch den maßgeblichen Progressionssatz.
* **Veraltete Immobilienwerte und Liquiditätsmangel:** Nach der Reform des Bewertungsgesetzes orientieren sich die steuerlichen Grundstückswerte eng am aktuellen Verkehrswert. Da die Erbschaftssteuer in Geld zu zahlen ist, droht bei immobilienlastigen Nachlässen ohne Barreserve ein erzwungener Teilverkauf, sofern keine Stundung nach § 28 ErbStG greift.
* **Keine Rechts- oder Steuerberatung:** Besonderheiten wie der steuerfreie Zugewinnausgleich (§ 5 ErbStG), Verschonungsabschläge für Betriebsvermögen (§§ 13a, 13b ErbStG) oder Doppelbesteuerungsabkommen erfordern im konkreten Erbfall stets die Prüfung durch eine Fachkanzlei für Steuerrecht oder ein Notariat.
