---
title: "Mieten oder Kaufen Rechner: Immobilien-Vergleich"
metaTitle: "Mieten oder Kaufen Rechner: Immobilie & Miete vergleichen"
description: "Vergleichen Sie den langfristigen Vermögensaufbau bei Immobilienkauf und Mietwohnen inklusive Kaufnebenkosten, Finanzierungszinsen, Instandhaltung, Wertsteigerung und Opportunitätskosten des Eigenkapitals."
metaDescription: "Lohnt sich Kaufen oder Mieten mit ETF-Anlage? Berechnen Sie Kaufnebenkosten, Zinsen, Mietsteigerung, Instandhaltung und Vermögensbilanz im DACH-Raum."
metaKeywords: "mieten oder kaufen rechner, immobilie kaufen vs mieten, kaufnebenkosten rechner, eigenheim oder miete, opportunitätskosten immobilie, kaufpreisfaktor, mietrendite"
faqs:
  - question: "Wie hoch sind die Kaufnebenkosten beim Immobilienkauf in Deutschland, Österreich und der Schweiz?"
    answer: "In Deutschland summieren sich Grunderwerbsteuer (3,5 % bis 6,5 % je Bundesland), Notar- und Grundbuchgebühren (rund 1,5 % bis 2,0 %) sowie der hälftige Makleranteil (bis 3,57 % inkl. MwSt.) meist auf 8,5 % bis 12 % des Kaufpreises. In Österreich fallen regulär 3,5 % Grunderwerbsteuer, 1,1 % Grundbuch-Eintragungsgebühr (mit befristeten Befreiungen für Eigenbedarf unter Wertgrenzen), Vertragserrichtung (ca. 1,5 % bis 3 %) und Maklerprovision an. In der Schweiz liegen Handänderungssteuer und Notarkosten kantonal deutlich niedriger, oft zwischen 1 % und 4 %."
  - question: "Was bedeuten Opportunitätskosten beim Vergleich zwischen Mieten und Kaufen?"
    answer: "Opportunitätskosten beziffern die entgangene Rendite jenes Kapitals, das beim Immobilienkauf unmittelbar für Kaufnebenkosten, Eigenkapitalanteil und höhere laufende Monatskosten gebunden wird. Ein Mieter kann genau dieselben Beträge alternativ am Kapitalmarkt anlegen – etwa in breit gestreuten Aktien-ETFs mit historisch rund 6 % bis 7 % Jahresrendite vor Steuern – und profitiert über Jahrzehnte vom Zinseszinseffekt."
  - question: "Welche jährliche Instandhaltungsrücklage sollte für Wohneigentum angesetzt werden?"
    answer: "Für realistische Langfristvergleiche im DACH-Raum gelten 1,0 % bis 1,5 % des Kaufpreises beziehungsweise des reinen Gebäudewerts pro Jahr als solide Kalkulationsgröße, alternativ rund 12 € bis 20 € pro Quadratmeter Wohnfläche jährlich. Bei älteren Bestandsimmobilien oder anstehenden energetischen Sanierungen nach dem Gebäudeenergiegesetz (GEG) liegen die tatsächlichen Rücklagen häufig noch höher."
  - question: "Was sagt der Kaufpreisfaktor über die Attraktivität eines Immobilienkaufs aus?"
    answer: "Der Kaufpreisfaktor (Vervielfältiger) teilt den reinen Kaufpreis durch die Jahresnettokaltmiete einer gleichwertigen Wohnung. Werte unter 20 gelten finanzmathematisch meist als kauffreundlich, Werte zwischen 20 und 24 als Übergangsbereich. Ab einem Faktor von 25 bis 30 überwiegt bei disziplinierter Geldanlage häufig der Mietpfad, sofern keine überdurchschnittliche Immobilienwertsteigerung eintritt."
  - question: "Welche steuerlichen Unterschiede gelten im DACH-Raum zwischen Eigenheim und Kapitalanlage?"
    answer: "In Deutschland unterliegen ETF-Erträge nach dem Sparer-Pauschbetrag (1.000 €) und 30 % Teilfreistellung bei Aktienfonds effektiv rund 18,46 % Abgeltungsteuer inklusive Solidaritätszuschlag, während der Verkaufsgewinn einer selbstgenutzten Immobilie nach § 23 EStG steuerfrei bleibt. In Österreich gilt für Wertpapiere die 27,5-%-Kapitalertragsteuer, beim Eigenheim greift nach zwei Jahren durchgehender Nutzung die Hauptwohnsitzbefreiung. In der Schweiz sind private Aktienkursgewinne steuerfrei, während Eigentümer den Eigenmietwert, Schuldzinsabzüge und kantonale Grundstückgewinnsteuern beachten müssen."
---

Die Wahl zwischen Mietwohnung und selbstgenutztem Wohneigentum gehört zu den folgenreichsten Vermögensentscheidungen im Leben. Wer nur Kreditrate und Kaltmiete vergleicht, übersieht zentrale Kostentreiber: verlorene Kaufnebenkosten, laufende Instandhaltung, langfristige Mietsteigerungen sowie die **Opportunitätskosten des Eigenkapitals**. Unser **Mieten oder Kaufen Rechner** stellt beide Pfade über Ihren gewählten Zeithorizont methodisch sauber gegenüber und vergleicht das erzielte Nettovermögen bei identischer monatlicher Gesamtbelastung.

## Die Vermögensbilanz-Formel: Kaufpfad gegen Mietpfad

Ein fairer Vergleich erfordert **Zahlungsstrom-Symmetrie**: Beide Haushalte starten mit demselben Eigenkapital `E_0` und wenden monatlich denselben Gesamtbetrag fürs Wohnen und Sparen auf. Zahlt der Käufer mehr als die Kaltmiete, legt der Mieter die Differenz laufend im Depot an; übersteigt später die gestiegene Miete die Käuferkosten, investiert umgekehrt der Käufer seinen Überschuss zum selben Nettozinssatz `r_netto`.

```text
Kaufnebenkosten:        NK = P × k_nk
Nettodarlehensbetrag:   K = P + NK − E_0
Monatliche Kreditrate:  R = K × [i × (1 + i)^n] / [(1 + i)^n − 1]
Restschuld nach m Mon.: RS_m = K × [(1 + i)^n − (1 + i)^m] / [(1 + i)^n − 1]
Immobilienwert (Jahr t): W_t = P × (1 + g_w)^t
Nettovermögen Käufer:   V_Kauf(t) = W_t × (1 − v) − RS_m + D_Kauf(t)

Monatliche Sparrate:    Δ_k = (R + I_k + B_k) − M_k
Nettovermögen Mieter:   V_Miete(t) = E_0 × (1 + r_netto)^t + Σ Δ_k × (1 + r_m)^(m − k)
```

Dabei stehen **P** für den Kaufpreis in Euro (`€`), **k_nk** für den Nebenkostensatz (Grunderwerbsteuer, Notar, Grundbuch, Makler), **E_0** für das Startkapital, **i** für den Monatszins (`Sollzins p. a. / 12`), **n** für die Laufzeit in Monaten, **g_w** für die jährliche Wertsteigerung, **v** für eventuelle Verkaufskosten, **I_k** für die monatliche Instandhaltung, **B_k** für nicht umlagefähige Eigentümerkosten und **M_k** für die Nettokaltmiete im Monat `k`. Der effektive Monatsrenditefaktor des Depots lautet `r_m = (1 + r_netto)^(1/12) − 1`.

Für internationale Vergleichsobjekte lassen sich Angaben direkt auf metrische DACH-Größen umrechnen: `1 Quadratmeter (m²)` entspricht `10,764 Quadratfuß`; in der Schweiz gelten Beträge analog in Schweizer Franken (`CHF`), wobei die deutlich niedrigeren Handänderungskosten den Kaufpfad spürbar entlasten.

## Durchgerechnetes Rechenbeispiel: 450.000 € Immobilie über 15 Jahre

Verglichen wird eine Großstadt-Wohnung zum Kaufpreis von **450.000,00 €** mit einer gleichwertigen Mietwohnung für **1.500,00 € Kaltmiete** monatlich (Kaufpreisfaktor **25,0**). Beide Haushalte besitzen **135.000,00 €** Eigenkapital und bilanzieren nach **15 Jahren** (`m = 180 Monate`, ohne Verkaufsabschlag).

- **Finanzierung & laufende Kaufkosten:** Bei **10,0 %** Nebenkosten (`45.000,00 €`) bleiben **90.000,00 €** Anzahlung (20 %) und ein Darlehen von **K = 360.000,00 €**. Bei **3,60 % Sollzins** (`i = 0,003`) über 30 Jahre (`n = 360`, Zinsfaktor `2,939923`) beträgt die Annuität **`R = 1.636,72 €`**. Zuzüglich **1,0 %** Instandhaltung (`375,00 €/Monat` im 1. Jahr, jährlich um **2,0 %** steigend) startet die Käuferbelastung bei **2.011,72 €/Monat**.
- **Nettovermögen des Käufers nach 15 Jahren:** Bei **2,0 %** Wertsteigerung wächst der Marktwert auf `450.000 € × 1,02^15 = 605.640,75 €`. Die Restschuld liegt nach 180 Monaten bei **`227.384,76 €`**. Das **Nettovermögen beträgt 378.256 €** (`378.255,99 €`), nach kumulierten `161.995 €` Zinsen und `77.820 €` Instandhaltung.
- **Nettovermögen des Mieters nach 15 Jahren:** Die Kaltmiete von **1.500,00 €** steigt um **2,0 %** jährlich (Summe: `311.282 €`). Das Startkapital von **135.000,00 €** und die monatliche Kostendifferenz (im 1. Jahr **511,72 €/Monat**) fließen in einen globalen Aktien-ETF mit **5,5 % Netto-Jahresrendite** nach Steuern (`r_m = 0,4472 %/Monat`). Das Startkapital wächst auf **301.384 €**, der monatliche Sparplan auf **100.594 €** – zusammen **401.978 €**.

In diesem Großstadt-Szenario führt der **Mieter nach 15 Jahren um 23.722 €**, weil Kaufnebenkosten und hoher Kaufpreisfaktor die Immobilienwertsteigerung übersteigen. Müsste der Käufer die Immobilie am Ende mit 3 % Maklerkosten veräußern (`18.169 €`), vergrößerte sich der Mietvorteil sogar auf über 41.000 €.

## Sensitivitätsvergleich: Wann kippt das Ergebnis zugunsten des Kaufs?

Die Tabelle variiert jeweils einen zentralen Parameter gegenüber dem 450.000-€-Basisszenario über **15 Jahre**:

| Marktszenario (Kaufpreis 450.000 €) | Start-Kaltmiete | Nettovermögen Kauf | Nettovermögen Miete | Vorteil Kauf | Gewinnschwelle Kauf |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Günstiger Standort (Faktor 20,0)** | 1.875 € | 403.742 € | 310.626 € | +93.116 € | Jahr 7 |
| **Ausgeglichener Markt (Faktor 22,1)** | 1.700 € | 381.385 € | 342.794 € | +38.591 € | Jahr 9 |
| **Basisszenario Großstadt (Faktor 25,0)** | 1.500 € | 378.256 € | 401.978 € | −23.722 € | > 30 Jahre |
| **Teure Metropole (Faktor 30,0)** | 1.250 € | 378.256 € | 479.871 € | −101.615 € | > 30 Jahre |
| **Starke Wertsteigerung (3,5 % p. a.)** | 1.500 € | 526.522 € | 401.978 € | +124.544 € | Jahr 5 |
| **Konservative Geldanlage (3,5 % netto)** | 1.500 € | 378.256 € | 309.934 € | +68.322 € | Jahr 8 |

Die Kernregel ist eindeutig: Legt der Mieter sein Kapital nur konservativ zu **3,5 %** an, gewinnt das Eigenheim klar. Erst bei langfristiger, renditeorientierter Aktienanlage schlägt der Mietpfad hoch bewertete Metropolenmärkte dauerhaft.

## Praxistipps und häufige Denkfehler beim Immobilienvergleich

- **Unproduktive Kosten beider Seiten vergleichen:** Auch Käufer zahlen verlorenes Geld – nämlich Kaufnebenkosten, Darlehenszinsen, Instandhaltung und entgangene Kapitalerträge. Erst die vollständige Gegenüberstellung beider Gesamtsummen zeigt den echten Gewinner.
- **Haltedauer realistisch prüfen:** Kaufnebenkosten von 9 % bis 12 % in Deutschland und Österreich wirken als hohe Einstiegshürde. Unterhalb von **acht bis zehn Jahren** Haltedauer rechnet sich ein Kauf selten.
- **Anschlusszins-Risiko einkalkulieren:** Endet die Zinsbindung nach zehn Jahren bei hoher Restschuld, gefährdet ein Zinsanstieg das Haushaltsbudget. Testen Sie stets einen um zwei Prozentpunkte höheren Anschlusszins – in der Schweiz analog den Vergleich zwischen Festhypothek und SARON-Hypothek.
- **Spardisziplin ehrlich bewerten:** Der Mietpfad gewinnt nur, wenn monatliche Überschüsse konsequent investiert statt verkonsumiert werden. Der feste Tilgungszwang eines Kredits wirkt in der Praxis oft als wirksamer Vermögensschutz.
- **Klumpenrisiko und Sanierungspflichten bedenken:** Ein Eigenheim bindet meist den Großteil des Vermögens in einem Einzelobjekt. Prüfen Sie vorab Energieausweis, Heizungsalter, Dachzustand und absehbare Sonderumlagen in der Eigentümergemeinschaft.
