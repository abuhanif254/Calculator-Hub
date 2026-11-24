---
title: "Anzahlungsrechner: Eigenkapital für Immobilien & Auto"
metaTitle: "Anzahlungsrechner | Eigenkapital für Haus & Auto berechnen"
description: "Berechnen Sie die optimale Anzahlung für Immobilien oder Fahrzeuge, vergleichen Sie Kreditraten nach Beleihungsauslauf und ermitteln Sie mit der Zahlungsziel-Funktion das nötige Eigenkapital für Ihre Wunschrate."
metaDescription: "Berechnen Sie, wie viel Anzahlung (Eigenkapital) Sie für ein Haus oder Auto benötigen. Sehen Sie, wie sich die Anzahlung auf Ihren Kredit auswirkt."
metaKeywords: "anzahlungsrechner, eigenkapital berechnen, eigenkapital hauskauf, anzahlung auto, beleihungsauslauf, baufinanzierung eigenkapital, kaufnebenkosten"
faqs:
  - question: "Wie viel Eigenkapital verlangen Banken beim Hauskauf in Deutschland, Österreich und der Schweiz?"
    answer: "In Deutschland empfehlen Baufinanzierer mindestens die vollständigen Kaufnebenkosten (ca. 9 % bis 12 % des Kaufpreises) plus 10 % bis 20 % des reinen Kaufpreises als Eigenkapital. In Österreich orientieren sich Banken weiterhin an einer Eigenmittelquote von mindestens 20 % des gesamten Finanzierungsbedarfs inklusive Nebenkosten. In der Schweiz gilt gesetzlich eine feste Untergrenze von 20 % des Belehnungswertes, wovon mindestens 10 % als hartes Eigenkapital stammen müssen und nicht aus der Pensionskasse bezogen werden dürfen."
  - question: "Zählen Grunderwerbsteuer, Notar und Makler in die Anzahlung hinein?"
    answer: "Nein – und genau hier liegt eine der häufigsten Fehlkalkulationen. Kaufnebenkosten erhöhen den Marktwert der Immobilie nicht und werden von Banken bei der Ermittlung des Beleihungsauslaufs nicht als Sicherheitswert anerkannt. Wer 80.000 € Erspartes besitzt, aber 40.000 € für Kaufnebenkosten benötigt, bringt rechnerisch nur 40.000 € echte Anzahlung auf den Kaufpreis ein."
  - question: "Wie funktioniert die Zahlungsziel-Funktion im Anzahlungsrechner?"
    answer: "Wenn Sie genau wissen, welche maximale Monatsrate dauerhaft in Ihr Haushaltsbudget passt, geben Sie diese Wunschrate direkt in das Feld für das Zahlungsziel ein. Der Rechner kehrt dann die Annuitätenformel um, ermittelt die maximal tragbare Darlehenssumme für den gewählten Zinssatz und die Laufzeit und zieht diesen Betrag vom Kaufpreis ab – das Ergebnis ist Ihre exakt benötigte Anzahlung."
  - question: "Welche Anzahlung ist bei einem Autokauf sinnvoll?"
    answer: "Für Neuwagen und junge Gebrauchtwagen gelten 20 % Anzahlung als bewährte Faustregel. Da Fahrzeuge bereits im ersten Jahr häufig 20 % bis 25 % an Marktwert verlieren, schützt eine solide Anzahlung davor, dass die offene Restschuld über dem aktuellen Wiederverkaufswert liegt – eine riskante Lücke bei Diebstahl, Totalschaden oder vorzeitigem Fahrzeugwechsel."
  - question: "Sollte ich mein gesamtes Erspartes für eine möglichst hohe Anzahlung einsetzen?"
    answer: "Nein. Auch wenn mehr Eigenkapital den Beleihungsauslauf senkt und Zinsen spart, sollten Sie niemals vollständig illiquide in eine Finanzierung starten. Halten Sie zwingend einen separaten Notgroschen von drei bis sechs Nettomonatsgehältern sowie eine sofort verfügbare Rücklage für Umzug, Einrichtung oder unvorhergesehene Reparaturen zurück."
---

## Warum die Höhe Ihrer Anzahlung doppelt auf die Kreditkosten wirkt

Ob Eigentumswohnung, Einfamilienhaus oder Fahrzeug: Die anfängliche **Anzahlung** – im Immobilienbereich das auf den reinen Kaufpreis angerechnete **Eigenkapital** – prägt die Gesamtkosten jeder Finanzierung gleich doppelt.

Erstens reduziert jeder angezahlte Euro den benötigten Nettodarlehensbetrag und verhindert, dass über Jahre oder Jahrzehnte hinweg Zinsen auf diesen Teil des Kaufpreises anfallen. Zweitens senkt höheres Eigenkapital den **Beleihungsauslauf**, also das Verhältnis von Kreditsumme zu Objektwert. Weil das Ausfallrisiko der Bank dadurch merklich abnimmt, gewähren Kreditinstitute spürbare Zinsabschläge. Unser **Anzahlungsrechner** berechnet Monatsrate, Gesamtzinsen und Gesamtaufwand unmittelbar – und ermittelt über die **Zahlungsziel-Funktion** sogar rückwärts, wie viel Eigenkapital für eine feste monatliche Wunschrate nötig ist.

## Finanzmathematische Formeln für Anzahlung und Zahlungsziel

Zunächst teilt sich der Kaufpreis `P` in die Anzahlung `E` (oder den prozentualen Anteil `p`) und das verbleibende Nettodarlehen `K`:

```text
E = P × (p / 100)
K = P − E
Beleihungsauslauf (%) = (K / P) × 100
```

Für ein Annuitätendarlehen mit dem Jahreszinssatz `r` (als Dezimalzahl), der Laufzeit `t` in Jahren, dem Monatszins `i = r / 12` und insgesamt `n = 12 × t` Zahlungsmonaten lautet die gleichbleibende monatliche Kreditrate `R`:

```text
R = K × [i × (1 + i)^n] / [(1 + i)^n − 1]
```

Die gesamten Zinskosten betragen `Z_ges = (R × n) − K`, der gesamte Mittelabfluss inklusive Anzahlung `G_ges = E + (R × n)`.

### Umkehrformel der Zahlungsziel-Funktion

Geben Sie eine gewünschte maximale Monatsrate `R_Ziel` vor, ermittelt der Rechner über die Barwertformel zunächst das höchstmögliche Darlehen `K_max` und daraus die benötigte Anzahlung `E_erf`:

```text
K_max = R_Ziel × [(1 + i)^n − 1] / [i × (1 + i)^n]
E_erf = max(0; P − K_max)
```

Übersteigt `K_max` bereits den Kaufpreis `P`, reicht die gewählte Wunschrate rechnerisch sogar ohne Anzahlung aus (`E_erf = 0 €`).

## Schritt-für-Schritt-Rechenbeispiel: Immobilienkauf zu 420.000 €

Ein Haushalt erwirbt eine Immobilie für **`P = 420.000 €`** bei einem gebundenen Sollzins von **`r = 3,80 % p. a.`** und **`t = 25 Jahren`** Laufzeit (`n = 300 Monate`). Der Monatszins beträgt **`i = 0,038 / 12 ≈ 0,00316667`**.

### Teil A: Standardberechnung mit 20 % Anzahlung

1. **Anzahlung und Kreditbetrag:** `E = 420.000 € × 0,20 = 84.000 €`, Nettodarlehen `K = 336.000 €` (**80 % Beleihungsauslauf**).
2. **Aufzinsungsfaktor über 300 Monate:** `(1 + 0,00316667)^300 ≈ 2,581831`.
3. **Annuitätenfaktor:** `(0,00316667 × 2,581831) / (2,581831 − 1) ≈ 0,00516857`.
4. **Monatliche Kreditrate:** `R = 336.000 € × 0,00516857 = 1.736,64 €`.
5. **Gesamtzinsen:** Über 300 Monate fließen `520.991,41 €` an die Bank; nach Abzug von `336.000 €` Tilgung fallen **184.991,41 €** reine Zinsen an (Gesamtabfluss inklusive Anzahlung: **604.991,41 €**).

### Teil B: Rückwärtsrechnung per Zahlungsziel-Funktion

Darf die Monatsrate aus Budgetgründen maximal **`R_Ziel = 1.500 €`** betragen, liefert die Barwertformel bei unveränderten Konditionen (`3,80 %`, 25 Jahre):

1. **Maximal tragbares Darlehen:** `K_max = 1.500 € / 0,00516857 = 290.215,92 €`.
2. **Erforderliche Anzahlung:** `E_erf = 420.000 € − 290.215,92 € = 129.784,08 €` – exakt **30,90 %** des Kaufpreises.

## Vergleichstabelle: Wirkung der Beleihungsauslauf-Schwellen

Hypothekenbanken im DACH-Raum staffeln ihre Bauzinsen an markanten Beleihungsgrenzen (**60 %**, **80 %**, **90 %** und **100 %**). Die Übersicht zeigt für **420.000 €** Kaufpreis über **25 Jahre**, wie Kreditsumme und Zinsstaffel zusammenwirken:

| Anzahlung | Betrag | Beleihung | Darlehen | Sollzins p. a.* | Monatsrate | Gesamtzinsen (25 J.) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0 %** (Vollfinanzierung) | 0 € | 100 % | 420.000 € | 4,40 % | 2.310,72 € | 273.216,36 € |
| **10 %** | 42.000 € | 90 % | 378.000 € | 4,10 % | 2.016,15 € | 226.846,12 € |
| **20 %** (Richtwert) | 84.000 € | 80 % | 336.000 € | 3,80 % | 1.736,64 € | 184.991,41 € |
| **30 %** | 126.000 € | 70 % | 294.000 € | 3,60 % | 1.487,65 € | 152.294,39 € |
| **40 %** | 168.000 € | 60 % | 252.000 € | 3,45 % | 1.254,82 € | 124.447,18 € |

*\*Illustrative DACH-Zinsstaffelung entlang üblicher Beleihungsgrenzen; reale Konditionen hängen von Bonität, Objektlage und Zinsbindung ab.*

Gegenüber einer Vollfinanzierung entlasten bereits **20 % Eigenkapital** das Monatsbudget um **574,08 €** und sparen **88.224,95 €** Zinsen. Bei **40 % Eigenkapital** (erstklassiger 60-%-Beleihungsauslauf) schrumpft die Zinslast sogar um **148.769,18 €**.

### Regionale Richtwerte in Deutschland, Österreich und der Schweiz

Während deutsche Banken bei stabiler Bonität vereinzelt noch 90-%- oder 100-%-Finanzierungen mit spürbarem Zinsaufschlag vergeben, verlangen österreichische Institute in der Praxis meist mindestens **20 % Eigenmittel** bezogen auf den Gesamtbedarf inklusive Nebenkosten. In der **Schweiz** schreiben die Richtlinien der Bankiervereinigung verbindlich mindestens **20 % Eigenkapital** vor, wovon wenigstens die Hälfte – also **10 % des Belehnungswertes** – als echtes, nicht aus der zweiten Säule (Pensionskasse) stammendes Eigenkapital eingebracht werden muss.

## Häufige Planungsfehler bei der Anzahlung vermeiden

* **Kaufnebenkosten nicht separat einplanen:** In Deutschland verschlingen Grunderwerbsteuer (3,5 % bis 6,5 % je Bundesland), Notar und Grundbuch (rund 2 %) sowie Käufer-Maklerprovision (bis 3,57 %) rasch **9 % bis 12 %** zusätzlich zum Kaufpreis – in Österreich häufig **8 % bis 10 %**. Diese Nebenkosten senken den Beleihungsauslauf nicht und müssen zwingend separat gedeckt werden.
* **Knapp über einer Beleihungsgrenze bleiben:** Liegt Ihr Beleihungsauslauf bei 81 % statt 80 % (oder 61 % statt 60 %), verteuert der Zinsaufschlag häufig das gesamte Darlehen. Wenige Tausend Euro zusätzliche Anzahlung erzielen hier oft eine außergewöhnlich hohe steuerfreie Rendite.
* **Liquiditätsreserve komplett auflösen:** Behalten Sie stets drei bis sechs Nettomonatsgehälter als Notgroschen sowie Rücklagen für Umzug, Küche oder unvorhergesehene Sanierungen zurück, um teure Nachfinanzierungen zu vermeiden.
* **Wertverlust beim Autokauf unterschätzen:** Ohne Anzahlung übersteigt die Restschuld eines Neuwagens in den ersten zwei Jahren rasch den Wiederverkaufswert. Mindestens **20 % Anzahlung** und höchstens 48 bis 60 Monate Laufzeit schützen zuverlässig vor negativem Eigenkapital.
* **Laufende Objektkosten ausblenden:** Die berechnete Kreditrate deckt ausschließlich Zins und Tilgung. Kalkulieren Sie bei Immobilien zusätzlich Hausgeld, Grundsteuer, Gebäudeversicherung und eine persönliche Instandhaltungsrücklage (mindestens 1,00 € bis 1,50 € je Quadratmeter Wohnfläche monatlich) ein.
