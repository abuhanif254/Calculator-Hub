---
title: "Sparrechner"
metaTitle: "Sparrechner | Zinseszins, Sparplan & Kaufkraft berechnen"
description: "Berechnen Sie den Vermögensaufbau aus Startkapital, regelmäßigen Sparraten und Zinseszins inklusive Inflationsbereinigung und Sparziel-Planer."
metaDescription: "Kostenloser Sparrechner: Berechnen Sie Endkapital, Zinseszins, reale Kaufkraft nach Inflation und Ihre optimale monatliche Sparrate für jedes Sparziel."
metaKeywords: "sparrechner, sparplan berechnen, zinseszinsrechner, sparziele planen, inflationsbereinigte kaufkraft, sparrate berechnen, vermögensaufbau, effektivzins"
faqs:
  - question: "Was ist der Unterschied zwischen nachschüssiger und vorschüssiger Einzahlung im Sparrechner?"
    answer: "Bei einer nachschüssigen Einzahlung fließt Ihre Sparrate jeweils am Ende eines Monats auf das Konto und wird erst ab der folgenden Periode verzinst. Bei einer vorschüssigen Einzahlung zu Monatsbeginn arbeitet jeder einzelne Beitrag einen vollen Monat länger mit Zinseszins, was bei 15 Jahren Laufzeit und 250 € Monatsrate bereits mehrere Hundert Euro Mehrertrag ausmacht."
  - question: "Wie wirkt sich die Zinsperiode auf Effektivzins und Endkapital aus?"
    answer: "Je häufiger Zinsen gutgeschrieben und direkt dem Kapital zugeschlagen werden, desto stärker greift der unterjährige Zinseszinseffekt. Ein Nominalzins von 4,80 % p. a. ergibt bei jährlicher Gutschrift genau 4,80 % Effektivzins, bei monatlicher Gutschrift rund 4,91 % und bei täglicher Verzinsung rund 4,92 % Effektivzins."
  - question: "Was sagt der inflationsbereinigte Endbetrag über mein Sparziel aus?"
    answer: "Der inflationsbereinigte Wert zeigt die reale Kaufkraft Ihres künftigen Kontostands umgerechnet in heutige Euro. Da steigende Verbraucherpreise den Geldwert über Jahrzehnte schmälern, verhindert diese Kennzahl eine Überschätzung des künftigen Lebensstandards und macht sichtbar, ob Ihr Zinssatz die Teuerungsrate tatsächlich übertrifft."
  - question: "Wie ermittle ich im Sparziel-Planer die nötige monatliche Sparrate oder Anspardauer?"
    answer: "Im Modus Sparziel-Planer geben Sie Ihr angestrebtes Zielkapital, das vorhandene Startguthaben und den erwarteten Zinssatz ein. Je nach Auswahl löst der Rechner entweder die Rentenendwertformel nach der erforderlichen Sparrate für einen festen Zeitraum auf oder simuliert monatlich, nach wie vielen Jahren und Monaten Ihr Ziel bei fester Sparrate erreicht ist."
  - question: "Berücksichtigt der Sparrechner die Abgeltungssteuer beziehungsweise KESt?"
    answer: "Der Rechner weist Bruttoerträge vor Steuern aus, damit Vergleiche über Deutschland, Österreich und die Schweiz hinweg einheitlich bleiben. In der Praxis fallen oberhalb von Freibeträgen wie dem deutschen Sparer-Pauschbetrag von 1.000 € pro Person Kapitalertragsteuern an, weshalb für eine konservative Nettoplanung ein entsprechend niedrigerer Nettozinssatz eingegeben werden sollte."
---

## Wie systematischer Vermögensaufbau mit dem Sparrechner gelingt

Langfristige Rücklagen entstehen selten durch einzelne Glückstreffer, sondern durch das Zusammenspiel aus Zeit, Disziplin und dem **Zinseszinseffekt**. Ob Sie einen liquiden Notgroschen aufbauen, Eigenkapital für den Immobilienkauf in Deutschland, Österreich oder der Schweiz ansparen oder privat vorsorgen: Erst die genaue Berechnung von **Startkapital**, **Sparraten**, **Zinsperiode** und **Inflation** zeigt, welches Endvermögen realistisch erreichbar ist.

Unser **Sparrechner** bildet sowohl einfache Sparpläne als auch komplexe Ansparpfade ab. Neben Anfangseinlage, flexiblem Einzahlungsrhythmus (wöchentlich, zweiwöchentlich, monatlich, vierteljährlich oder jährlich) und **vorschüssiger** oder **nachschüssiger** Zahlungsweise unterstützt das Werkzeug eine jährliche **Sparratendynamik**, punktuelle **Sonderzahlungen** sowie Zinsänderungen ab einem gewählten Laufzeitjahr. Über den **Sparziel-Planer** und den **Szenariovergleich** bestimmen Sie zudem die nötige Monatsrate für ein Wunschkapital oder vergleichen zwei Strategien unmittelbar miteinander.

## Mathematische Grundlagen: Zinseszins, Sparplan und reale Kaufkraft

Die Berechnung kombiniert die Aufzinsung des Startkapitals mit der Rentenendwertformel für wiederkehrende Beiträge. Weicht die Zinsperiode von der monatlichen Einzahlung ab, wandelt der Rechner den Nominalzins $r$ bei $m$ jährlichen Zinsgutschriften zunächst in den **Effektivzins** $i_{\text{eff}}$ und den äquivalenten Monatszins $i_{\text{m}}$ um:

$$i_{\text{eff}} = \left(1 + \frac{r}{m}\right)^{m} - 1, \qquad i_{\text{m}} = (1 + i_{\text{eff}})^{1/12} - 1$$

Bei nachschüssiger monatlicher Einzahlung (Monatsende) über $N = 12 \cdot t$ Monate gilt für das nominelle Endkapital $K_N$:

$$K_N = K_0 \cdot (1 + i_{\text{m}})^N + R \cdot \frac{(1 + i_{\text{m}})^N - 1}{i_{\text{m}}}$$

Bei **vorschüssiger** Einzahlung zu Monatsbeginn wird der Sparratenterm zusätzlich mit $(1 + i_{\text{m}})$ multipliziert, da jede Rate eine volle Periode früher verzinst wird.

* **$K_0$ (Startkapital in EUR €):** Einmalige Anfangseinlage zu Laufzeitbeginn.
* **$R$ (monatliche Sparrate in EUR €):** Wiederkehrender Beitrag pro Monat.
* **$r$ (Nominalzins p. a.):** Jährlicher nominaler Zinssatz als Dezimalzahl (z. B. $0{,}048$ für $4{,}8\text{ \%}$).
* **$m$ (Zinsperiode pro Jahr):** Gutschriften pro Jahr ($1$ jährlich, $4$ vierteljährlich, $12$ monatlich, $365$ täglich).
* **$t$ (Spardauer in Jahren):** Gesamtlaufzeit ($N = 12 \cdot t$ Monate).

### Inflationsbereinigung und Rückwärtsrechnung für Sparziele

Um den Kaufkraftverlust bei einer jährlichen Inflationsrate $\pi$ abzubilden, diskontiert der Rechner das Endkapital auf heutige Kaufkraft zurück; im **Sparziel-Planer** löst er zudem nach der erforderlichen monatlichen Sparrate $R$ für ein Zielkapital $K_{\text{Ziel}}$ auf:

$$K_{\text{real}} = \frac{K_N}{(1 + \pi)^t}, \qquad R = \frac{\left(K_{\text{Ziel}} - K_0 \cdot (1 + i_{\text{m}})^N\right) \cdot i_{\text{m}}}{(1 + i_{\text{m}})^N - 1}$$

## Referenztabelle: Wirkung von Zinssatz und Zinsperiode über 15 Jahre

Die Tabelle zeigt für **5.000 € Startkapital**, **250 € Monatsrate** (nachschüssig), **15 Jahre Laufzeit** (**50.000 €** eigene Einzahlungen) und **2,0 % Inflation**, wie Zinssatz und Zinsgutschrift das Ergebnis verändern:

| Nominalzins p. a. | Zinsperiode ($m$) | Effektivzins | Endkapital (nominal) | Zinsertrag (brutto) | Reale Kaufkraft |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2,0 %** | Monatlich ($12$) | 2,018 % | 59.175,87 € | 9.175,87 € | 43.968,55 € |
| **3,5 %** | Monatlich ($12$) | 3,557 % | 67.517,35 € | 17.517,35 € | 50.166,38 € |
| **4,8 %** | Jährlich ($1$) | 4,800 % | 75.262,37 € | 25.262,37 € | 55.921,05 € |
| **4,8 %** | Monatlich ($12$) | 4,907 % | 75.975,22 € | 25.975,22 € | 56.450,71 € |
| **4,8 %** | Täglich ($365$) | 4,917 % | 76.040,31 € | 26.040,31 € | 56.499,07 € |
| **6,0 %** | Monatlich ($12$) | 6,168 % | 84.975,15 € | 34.975,15 € | 63.137,79 € |
| **7,0 %** | Monatlich ($12$) | 7,229 % | 93.485,31 € | 43.485,31 € | 69.460,96 € |

Bei **2,0 % Zins** und **2,0 % Inflation** sinkt die reale Kaufkraft mit 43.968,55 € unter die nominell eingezahlten 50.000 €. Zudem fällt der Sprung von jährlicher auf monatliche Verzinsung (+712,85 € bei 4,8 %) gut zehnmal größer aus als der Schritt von monatlicher auf tägliche Verzinsung (+65,09 €).

## Schritt-für-Schritt-Rechenbeispiel: 15-jähriger Sparplan

Gegeben sind **$K_0 = 5.000\text{ €}$**, monatliche Sparrate **$R = 250\text{ €}$** (nachschüssig), Laufzeit **$t = 15\text{ Jahre}$** ($N = 180$), Nominalzins **$r = 4{,}8\text{ \% p. a.}$** bei monatlicher Verzinsung ($m = 12$) und Inflation **$\pi = 2{,}0\text{ \%}$**:

1. **Monats- und Effektivzins:** $i_{\text{m}} = 0{,}048 / 12 = 0{,}004$ ($0{,}4\text{ \%}$ pro Monat) und $i_{\text{eff}} = (1{,}004)^{12} - 1 \approx 4{,}907\text{ \%}$.
2. **Aufzinsungsfaktor über 180 Monate:** $(1{,}004)^{180} \approx 2{,}051485$.
3. **Endwert des Startkapitals:** $5.000 \times 2{,}051485 = 10.257{,}42\text{ €}$.
4. **Endwert der Sparraten:**
   $$K_{\text{Raten}} = 250 \times \frac{2{,}051485 - 1}{0{,}004} = 250 \times 262{,}8712 = 65.717{,}80\text{ €}$$
5. **Nominelles Endkapital und Zinsertrag:**
   $$K_{180} = 10.257{,}42 + 65.717{,}80 = 75.975{,}22\text{ €}$$
   Abzüglich eigener Einzahlungen ($50.000{,}00\text{ €}$) stammen **25.975,22 €** (rund 34,2 %) aus Zinseszinsen. Vorschüssige Zahlung zu Monatsbeginn erhöht das Ergebnis auf **76.238,10 €** (+262,87 €).
6. **Reale Kaufkraft nach 15 Jahren:**
   $$K_{\text{real}} = \frac{75.975{,}22}{(1{,}02)^{15}} = \frac{75.975{,}22}{1{,}345868} = 56.450{,}71\text{ €}$$
   Für ein nominales Ziel von **100.000 €** berechnet der Sparziel-Planer analog eine erforderliche Monatsrate von **341,39 €**.

## Typische Fallstricke und steuerliche Realität im DACH-Raum

* **Kapitalertragsteuern ausblenden:** In Deutschland greift oberhalb des Sparer-Pauschbetrags von 1.000 € (2.000 € bei Zusammenveranlagung) die Abgeltungssteuer von 26,375 % inkl. Solidaritätszuschlag (zzgl. eventueller Kirchensteuer). In Österreich gelten 25 % KESt auf Bankzinsen bzw. 27,5 % auf Wertpapiererträge, in der Schweiz die Einkommensteuer (mit 35 % rückforderbarer Verrechnungssteuer). Kalkulieren Sie für Nettoziele stets mit einem gekürzten Zinssatz.
* **Kaufkraftillusion bei Niedrigzinsen:** Ein nominal wachsendes Konto schützt nicht vor realem Vermögensverlust, sobald die Inflation den Nachsteuerzins übersteigt.
* **Liquiditätsreserve und Langfristkapital vermischen:** Drei bis sechs Netto-Monatsausgaben gehören täglich verfügbar aufs Tagesgeldkonto; für Zeiträume ab zehn Jahren bietet reines Kontosparen meist zu wenig Realrendite.
* **Sparrate nie anpassen:** Bleibt die Rate trotz Gehaltssteigerungen starr, sinkt die reale Sparleistung Jahr für Jahr. Eine jährliche Dynamisierung von 2 bis 3 % erhält Ihre Kaufkraft-Sparquote dauerhaft.
