---
title: "Umsatzsteuer- / Mehrwertsteuerrechner"
metaTitle: "Mehrwertsteuerrechner: Brutto, Netto & MwSt. berechnen"
description: "Berechnen Sie die Umsatzsteuer oder Mehrwertsteuer präzise für Deutschland, Österreich und die Schweiz – vom Nettopreis zum Bruttopreis oder rückwärts."
metaDescription: "Fügen Sie einfach die Mehrwertsteuer zu einem Preis hinzu oder rechnen Sie rückwärts (Brutto-zu-Netto), um Netto- und Steuerbetrag zu extrahieren."
metaKeywords: "Mehrwertsteuerrechner, umsatzsteuerrechner, brutto netto rechner, mwst rechner, steuer berechnen, 19 prozent mwst berechnen, 7 prozent mwst, ust rechner"
faqs:
  - question: "Was ist der Unterschied zwischen Umsatzsteuer, Mehrwertsteuer und Vorsteuer?"
    answer: "Steuerrechtlich bezeichnet die Umsatzsteuer (USt) im deutschen und österreichischen Gesetz die Steuer auf Lieferungen und Leistungen. Im Alltag und auf Kassenbons wird sie meist Mehrwertsteuer (MwSt.) genannt; in der Schweiz ist Mehrwertsteuer (MWST) auch der offizielle Gesetzesbegriff. Als Vorsteuer bezeichnet man dieselbe Steuer aus Sicht eines vorsteuerabzugsberechtigten Unternehmens, wenn es Waren oder Dienstleistungen einkauft und sich die gezahlte Umsatzsteuer vom Finanzamt erstatten lässt."
  - question: "Warum darf man bei der Rückwärtsrechnung von Brutto auf Netto nicht einfach 19 % vom Bruttopreis abziehen?"
    answer: "Weil der Bruttopreis nicht 100 %, sondern 119 % des ursprünglichen Nettowerts darstellt (bei 19 % Regelsteuersatz). Zieht man pauschal 19 % vom Bruttopreis ab, berechnet man die Steuer fälschlicherweise auf eine bereits versteuerte Basis. Bei 100,00 € Brutto ergäbe ein Abzug von 19 % genau 81,00 € statt des korrekten Nettopreises von 84,03 € (100,00 € geteilt durch 1,19)."
  - question: "Welche Mehrwertsteuersätze gelten aktuell in Deutschland, Österreich und der Schweiz?"
    answer: "In Deutschland gilt ein Regelsteuersatz von 19 % sowie ein ermäßigter Satz von 7 % (etwa für Grundnahrungsmittel, Bücher und den öffentlichen Nahverkehr). Österreich erhebt 20 % Normalsteuersatz sowie ermäßigte Sätze von 10 % und 13 %. In der Schweiz gelten seit dem 1. Januar 2024 ein Normalsatz von 8,1 %, ein reduzierter Satz von 2,6 % für Güter des täglichen Bedarfs und ein Sondersatz von 3,8 % für Beherbergungsleistungen."
  - question: "Müssen Kleinunternehmer Umsatzsteuer auf ihren Rechnungen ausweisen?"
    answer: "Nein. Wer in Deutschland die Kleinunternehmerregelung nach § 19 UStG nutzt (oder die entsprechenden Umsatzgrenzen in Österreich und der Schweiz einhält), weist auf Ausgangsrechnungen keine Umsatzsteuer aus. Bei solchen Rechnungen entsprechen sich Rechnungssumme und Zahlbetrag ohne Steueraufschlag, allerdings entfällt im Gegenzug auch das Recht auf Vorsteuerabzug bei betrieblichen Einkäufen."
  - question: "Wie unterscheidet sich die europäische Mehrwertsteuer von der US-amerikanischen Sales Tax?"
    answer: "In Europa wird die Mehrwertsteuer über alle Wertschöpfungsstufen hinweg erhoben (Allphasen-Netto-Umsatzsteuer mit Vorsteuerabzug) und gegenüber Privatkunden gemäß Preisangabenverordnung stets im ausgeschriebenen Endpreis (Bruttopreis) inkludiert. Die US-amerikanische Sales Tax hingegen ist eine reine Einzelhandelssteuer auf Bundesstaaten- und Kommunalebene: Preise im Regal sind dort Nettopreise, und der jeweilige Steuersatz wird erst an der Kasse aufgeschlagen."
---

## Grundlagen der Umsatzsteuer- und Mehrwertsteuerberechnung im DACH-Raum

Ob bei der Erstellung einer rechtskonformen Ausgangsrechnung, der Prüfung von Lieferantenbelegen für die Buchhaltung oder beim Einkauf im Einzelhandel: Die präzise Umrechnung zwischen **Nettobetrag**, **Umsatzsteuer (Mehrwertsteuer)** und **Bruttobetrag** gehört zu den wichtigsten kaufmännischen Kalkulationen. Während im Geschäftsverkehr zwischen Unternehmen (B2B) fast ausschließlich mit Nettopreisen kalkuliert wird, da die Umsatzsteuer über den Vorsteuerabzug einen durchlaufenden Posten darstellt, verlangt die Preisangabenverordnung gegenüber privaten Endverbrauchern (B2C) die Ausweisung des vollständigen Bruttopreises inklusive sämtlicher Steuern.

Unser **Umsatzsteuer- und Mehrwertsteuerrechner** beherrscht beide Berechnungsrichtungen: das Aufschlagen der Steuer auf einen Nettopreis (**Netto zu Brutto**) sowie das Herausrechnen der enthaltenen Steuer aus einem Endpreis (**Brutto zu Netto**). Darüber hinaus eignet sich das Werkzeug für internationale Kalkulationen – etwa für die US-amerikanische *Sales Tax*, bei der lokale Steuersätze erst beim Bezahlvorgang auf den ausgeschriebenen Nettowarenwert addiert werden.

## Mathematische Formeln für Brutto, Netto und Steuerbetrag

Für die kaufmännisch exakte Berechnung definiert man den prozentualen Steuersatz als $p$ (beispielsweise $19$ für $19\text{ \%}$). Daraus ergibt sich der Dezimalfaktor des Steuersatzes als $s = \frac{p}{100}$ (also $0{,}19$) sowie der Brutto-Multiplikator als $1 + s$ (also $1{,}19$).

### 1. Vorwärtskalkulation: Mehrwertsteuer aufschlagen (Netto zu Brutto)

Ist der **Nettobetrag** ($N$) bekannt – was den Basiswert von $100\text{ \%}$ darstellt –, werden der **Steuerbetrag** ($USt$) und der **Bruttobetrag** ($B$) mit folgenden Gleichungen ermittelt:

$$USt = N \times \frac{p}{100}$$

$$B = N + USt = N \times \left(1 + \frac{p}{100}\right)$$

* **$N$ (Nettobetrag):** Waren- oder Dienstleistungswert ohne Umsatzsteuer in Euro ($\text{€}$) oder Schweizer Franken ($\text{CHF}$).
* **$p$ (Steuersatz):** Geltender Umsatzsteuersatz in Prozent ($\text{\%}$), z. B. $19\text{ \%}$, $7\text{ \%}$, $20\text{ \%}$ oder $8{,}1\text{ \%}$.
* **$USt$ (Umsatzsteuerbetrag):** Absoluter Steueranteil in Währungseinheiten ($\text{€}$ / $\text{CHF}$), auf zwei Nachkommastellen kaufmännisch gerundet.
* **$B$ (Bruttobetrag):** Zu zahlender Gesamtpreis inklusive Umsatzsteuer ($100\text{ \%} + p\text{ \%}$).

### 2. Rückwärtskalkulation: Mehrwertsteuer herausrechnen (Brutto zu Netto)

Liegt ein **Bruttobetrag** ($B$) etwa auf einem Kassenbon, einer Bewirtungsquittung oder einem Hotelbeleg vor, repräsentiert dieser Betrag bereits $100\text{ \%} + p\text{ \%}$ des Grundwertes. Um den ursprünglichen **Nettobetrag** ($N$) zu isolieren, muss durch den Faktor $\left(1 + \frac{p}{100}\right)$ dividiert werden:

$$N = \frac{B}{1 + \frac{p}{100}}$$

$$USt = B - N = B \times \frac{p}{100 + p}$$

## Übersicht der Mehrwertsteuersätze in Deutschland, Österreich und der Schweiz

Im deutschsprachigen Wirtschaftsraum (DACH) unterscheiden sich sowohl die Höhe der Steuersätze als auch die Zuordnung einzelner Warengruppen erheblich. Die folgende Referenztabelle zeigt die aktuellen gesetzlichen Vorgaben samt den zugehörigen Umrechnungsfaktoren für die tägliche Rechnungskontrolle:

| Land | Steuerkategorie | Steuersatz ($p$) | Multiplikator ($1+s$) | Typische Anwendungsbereiche | $1.000{,}00$ Netto ergibt Brutto | Aus $1.000{,}00$ Brutto enthaltene Steuer |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Deutschland** | Regelsteuersatz | $19{,}0\text{ \%}$ | $1{,}190$ | Dienstleistungen, Elektronik, Kleidung, Fahrzeuge, Gastronomie | $1.190{,}00\text{ €}$ | $159{,}66\text{ €}$ (Netto: $840{,}34\text{ €}$) |
| **Deutschland** | Ermäßigter Satz | $7{,}0\text{ \%}$ | $1{,}070$ | Grundnahrungsmittel, Bücher, Zeitungen, Hotellerie, ÖPNV | $1.070{,}00\text{ €}$ | $65{,}42\text{ €}$ (Netto: $934{,}58\text{ €}$) |
| **Österreich** | Normalsteuersatz | $20{,}0\text{ \%}$ | $1{,}200$ | Gewerbliche Lieferungen, Konsumgüter, Beratungsleistungen | $1.200{,}00\text{ €}$ | $166{,}67\text{ €}$ (Netto: $833{,}33\text{ €}$) |
| **Österreich** | Ermäßigter Satz I | $10{,}0\text{ \%}$ | $1{,}100$ | Lebensmittel, Bücher, Medikamente, Wohnungsvermietung, Hotellerie | $1.100{,}00\text{ €}$ | $90{,}91\text{ €}$ (Netto: $909{,}09\text{ €}$) |
| **Österreich** | Ermäßigter Satz II | $13{,}0\text{ \%}$ | $1{,}130$ | Schnittblumen, Kunstgegenstände, Kultur, Inlandflüge | $1.130{,}00\text{ €}$ | $115{,}04\text{ €}$ (Netto: $884{,}96\text{ €}$) |
| **Schweiz** | Normalsatz | $8{,}1\text{ \%}$ | $1{,}081$ | Alle steuerbaren Güter und Dienstleistungen (seit 01.01.2024) | $1.081{,}00\text{ CHF}$ | $74{,}93\text{ CHF}$ (Netto: $925{,}07\text{ CHF}$) |
| **Schweiz** | Reduzierter Satz | $2{,}6\text{ \%}$ | $1{,}026$ | Nahrungsmittel, Leitungswasser, Medikamente, Bücher | $1.026{,}00\text{ CHF}$ | $25{,}34\text{ CHF}$ (Netto: $974{,}66\text{ CHF}$) |
| **Schweiz** | Sondersatz Logis | $3{,}8\text{ \%}$ | $1{,}038$ | Beherbergungsleistungen inklusive Frühstück im Hotelgewerbe | $1.038{,}00\text{ CHF}$ | $36{,}61\text{ CHF}$ (Netto: $963{,}39\text{ CHF}$) |

## Schritt-für-Schritt-Rechenbeispiele aus der Praxis

### Beispiel 1: Angebotserstellung vom Nettopreis zum Bruttopreis (Deutschland, $19\text{ \%}$)

Eine IT-Agentur in München kalkuliert für die Entwicklung einer Unternehmenswebsite ein Netto-Honorar von $2.450{,}00\text{ €}$. Da es sich um eine reguläre Dienstleistung handelt, greift der deutsche Regelsteuersatz von $19\text{ \%}$.

1. **Gegebene Größen:** Nettobetrag $N = 2.450{,}00\text{ €}$, Steuersatz $p = 19\text{ \%}$.
2. **Berechnung der Umsatzsteuer:**
   $$USt = 2.450{,}00\text{ €} \times \frac{19}{100} = 2.450{,}00\text{ €} \times 0{,}19 = 465{,}50\text{ €}$$
3. **Berechnung des Rechnungsbetrags (Brutto):**
   $$B = 2.450{,}00\text{ €} + 465{,}50\text{ €} = 2.915{,}50\text{ €}$$

Auf der Rechnung weist die Agentur $2.450{,}00\text{ €}$ Netto, $465{,}50\text{ €}$ Umsatzsteuer und $2.915{,}50\text{ €}$ Gesamtsumme aus.

### Beispiel 2: Steuerextraktion aus einem Bruttobeleg (Rückwärtsrechnung)

Ein Außendienstmitarbeiter reicht eine Hotelrechnung für eine reine Übernachtung in Frankfurt über $374{,}50\text{ €}$ (Brutto) für die Reisekostenabrechnung ein. Auf Hotelübernachtungen ohne Nebenleistungen wie Frühstück oder Parkplatz entfällt in Deutschland der ermäßigte Steuersatz von $7\text{ \%}$.

1. **Gegebene Größen:** Bruttobetrag $B = 374{,}50\text{ €}$, Steuersatz $p = 7\text{ \%}$ (Divisor $= 1{,}07$).
2. **Ermittlung des Nettobetrags:**
   $$N = \frac{374{,}50\text{ €}}{1{,}07} = 350{,}00\text{ €}$$
3. **Ermittlung der abziehbaren Vorsteuer:**
   $$USt = 374{,}50\text{ €} - 350{,}00\text{ €} = 24{,}50\text{ €}$$

Die Buchhaltung verbucht $350{,}00\text{ €}$ als betrieblichen Reisekostenaufwand und macht $24{,}50\text{ €}$ als Vorsteuer geltend.

## Praxistipps und häufige Fehlerquellen bei der Steuerberechnung

* **Der klassische Denkfehler beim Prozentabzug von Brutto:** Der häufigste Fehler in der Praxis besteht darin, bei der Rückwärtsrechnung von $1.000{,}00\text{ €}$ Brutto einfach $19\text{ \%}$ ($190{,}00\text{ €}$) abzuziehen und $810{,}00\text{ €}$ als Nettopreis anzunehmen. Prüft man dieses Ergebnis durch Aufschlagen von $19\text{ \%}$ auf $810{,}00\text{ €}$, erhält man jedoch nur $963{,}90\text{ €}$ statt $1.000{,}00\text{ €}$. Bei $19\text{ \%}$ Umsatzsteuer macht der Steueranteil am Bruttopreis exakt $\frac{19}{119} \approx 15{,}9664\text{ \%}$ aus.
* **Gemischte Steuersätze auf Kombi-Rechnungen:** Ein klassischer Stolperstein ist die Hotelrechnung mit Frühstück in Deutschland. Während die Übernachtung mit $7\text{ \%}$ besteuert wird, unterliegen Frühstück, Minibar und Hotelparkplatz dem Regelsteuersatz von $19\text{ \%}$. Solche Rechnungen müssen stets positionsweise nach Steuersätzen getrennt erfasst werden.
* **Cent-Differenzen durch Zeilen- vs. Summenrundung:** In Warenwirtschaftssystemen tritt häufig eine Differenz von $0{,}01\text{ €}$ bis $0{,}02\text{ €}$ auf, je nachdem, ob die Umsatzsteuer pro Rechnungsposition auf volle Cent gerundet und dann addiert wird (Zeilenmethode im B2C-Handel) oder ob erst alle Nettopositionen summiert und die Steuer einmalig auf die Gesamtsumme berechnet wird (Summenmethode nach § 14 UStG im B2B-Bereich).
