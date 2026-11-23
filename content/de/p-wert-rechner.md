---
title: "P-Wert-Rechner"
metaTitle: "P-Wert-Rechner: Z-Test, t-Test, Chi-Quadrat & F-Test"
description: "Berechnen Sie den exakten p-Wert für Z-Tests, t-Tests, Chi-Quadrat-Tests und F-Tests zur objektiven Prüfung der statistischen Signifikanz Ihrer Hypothesen."
metaDescription: "Berechnen Sie mit unserem P-Wert-Rechner exakte p-Werte für Z-Test, t-Test, Chi-Quadrat- und F-Test und prüfen Sie Ihre Daten auf Signifikanz."
metaKeywords: "p-wert rechner, p wert berechnen, statistische signifikanz, t-test p-wert, z-test rechner, chi-quadrat p-wert, f-test signifikanzniveau, nullhypothese"
faqs:
  - question: "Was genau sagt ein p-Wert von 0,03 in einer wissenschaftlichen Studie aus?"
    answer: "Ein p-Wert von 0,03 (also 3,0 %) bedeutet: Unter der Annahme, dass die Nullhypothese (kein echter Effekt) in Wirklichkeit wahr ist, beträgt die Wahrscheinlichkeit lediglich 3,0 %, rein zufällig durch Stichprobenschwankungen eine Teststatistik zu beobachten, die mindestens so extrem ist wie das vorliegende Messergebnis. Liegt das vorab gewählte Signifikanzniveau bei Alpha = 0,05, gilt das Ergebnis als statistisch signifikant und die Nullhypothese wird verworfen."
  - question: "Wann verwende ich einen einseitigen und wann einen zweiseitigen Hypothesentest?"
    answer: "Der zweiseitige Test ist der wissenschaftliche Standard und prüft ungerichtet auf Abweichungen in beide Richtungen (ob ein Mittelwert größer oder kleiner als der Referenzwert ist). Ein einseitiger Test halbiert bei symmetrischen Verteilungen den p-Wert in der geprüften Richtung, darf jedoch nur dann eingesetzt werden, wenn die Wirkrichtung bereits vor der Datenerhebung theoretisch zwingend festgelegt wurde und eine Abweichung in die Gegenrichtung sachlich irrelevant oder ausgeschlossen ist."
  - question: "Gibt der p-Wert die Wahrscheinlichkeit an, dass die Nullhypothese wahr ist?"
    answer: "Nein, das ist der häufigste Fehlschluss in der Statistik. Der p-Wert ist eine bedingte Wahrscheinlichkeit der Daten unter Voraussetzung der Nullhypothese P(Daten | H0), nicht die Wahrscheinlichkeit der Hypothese unter Voraussetzung der Daten P(H0 | Daten). Um die Wahrscheinlichkeit einer Hypothese zu berechnen, wäre ein bayesianischer Ansatz mit bekannter A-priori-Wahrscheinlichkeit erforderlich."
  - question: "Welche Rolle spielen die Freiheitsgrade (df) beim t-Test, Chi-Quadrat-Test und F-Test?"
    answer: "Freiheitsgrade (Degrees of Freedom, df) bestimmen die exakte Form der jeweiligen Wahrscheinlichkeitsverteilung. Beim Einstichproben-t-Test gilt df = n - 1: Je kleiner die Stichprobe n ist, desto breiter sind die Ränder der t-Verteilung und desto größer fällt der p-Wert bei gleichem t-Wert aus. Erst bei sehr großen Stichproben (ab etwa df > 120) nähert sich die t-Verteilung der Standardnormalverteilung (Z-Verteilung) an."
  - question: "Warum sind Chi-Quadrat-Tests und F-Tests im Rechner standardmäßig rechtsseitig ausgelegt?"
    answer: "Da sowohl die Chi-Quadrat-Statistik (Summe quadrierter standardisierter Abweichungen) als auch die F-Statistik (Quotient zweier Varianzen) ausschließlich positive Werte größer oder gleich 0 annehmen können, spiegeln große Abweichungen von der Nullhypothese sich stets in hohen positiven Prüfwerten am rechten Rand der Verteilung wider."
---

## Was ist der p-Wert und wie funktioniert die Signifikanzprüfung?

In der empirischen Forschung, der medizinischen Biometrie, der industriellen Qualitätskontrolle sowie bei datengetriebenen A/B-Tests bildet der **p-Wert** (*Überschreitungswahrscheinlichkeit* oder *Signifikanzwert*) das zentrale Entscheidungskriterium der schließenden Statistik. Er quantifiziert auf einer Skala von $0$ bis $1$, wie gut eine beobachtete Stichprobe mit einer vorab formulierten **Nullhypothese ($H_0$)** vereinbar ist – wobei die Nullhypothese in der Regel besagt, dass kein Unterschied, kein Zusammenhang oder kein Behandlungseffekt vorliegt.

Unser **P-Wert-Rechner** bestimmt die exakte Überschreitungswahrscheinlichkeit aus Ihrer berechneten Teststatistik für die vier wichtigsten Prüfverteilungen: die **Standardnormalverteilung ($Z$-Test)**, die **Student-$t$-Verteilung ($t$-Test)**, die **Chi-Quadrat-Verteilung ($\chi^2$-Test)** sowie die **Fisher-$F$-Verteilung ($F$-Test / Varianzanalyse)**. Durch den direkten Abgleich mit dem gewählten Signifikanzniveau $\alpha$ (standardmäßig $\alpha = 0{,}05$) erkennen Sie sofort, ob ein Befund statistisch signifikant ist oder durch zufällige Stichprobenstreuung erklärt werden kann.

## Mathematische Formeln zur Berechnung des p-Werts

Mathematisch entspricht der p-Wert dem Flächenintegral unter der Wahrscheinlichkeitsdichtefunktion $f(x)$ der jeweiligen Prüfverteilung vom beobachteten Testwert bis zum Rand (einseitig) bzw. an beiden Rändern (zweiseitig). Bezeichnet $F(x)$ die zugehörige kumulative Verteilungsfunktion (CDF) und $T_{\text{obs}}$ den aus der Stichprobe berechneten Prüfwert, gelten folgende Gleichungen:

### 1. Symmetrische Verteilungen: $Z$-Test und Student-$t$-Test

Für die Standardnormalverteilung mit $\Phi(z) = \int_{-\infty}^{z} \frac{1}{\sqrt{2\pi}} e^{-u^2/2} \, du$ beziehungsweise die $t$-Verteilung $F_{t, df}(t)$ mit $df$ Freiheitsgraden berechnet sich der p-Wert je nach Testrichtung wie folgt:

* **Linksseitiger Test ($H_1: \mu < \mu_0$):** $p = F(T_{\text{obs}})$
* **Rechtsseitiger Test ($H_1: \mu > \mu_0$):** $p = 1 - F(T_{\text{obs}})$
* **Zweiseitiger Test ($H_1: \mu \neq \mu_0$):** $p = 2 \times \left(1 - F(|T_{\text{obs}}|)\right)$

Die zugrunde liegende Prüfgröße $t$ für einen Einstichproben-$t$-Test lautet dabei:

$$t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}} \quad \text{mit} \quad df = n - 1$$

* **$\bar{x}$ (Stichprobenmittelwert):** Gemessener Durchschnittswert der Stichprobe in der jeweiligen Messeinheit.
* **$\mu_0$ (Referenzwert der Nullhypothese):** Angenommener wahrer Mittelwert der Grundgesamtheit unter $H_0$.
* **$s$ (Stichprobenstandardabweichung):** Streuungsmaß der Messwerte in der Stichprobe.
* **$n$ (Stichprobenumfang) & $df$ (Freiheitsgrade):** Anzahl der unabhängigen Beobachtungen ($df = n - 1$ beim Einstichproben-$t$-Test; $df = n_1 + n_2 - 2$ beim unabhängigen Zweistichproben-$t$-Test).

### 2. Rechtsschiefe Verteilungen: $\chi^2$-Test und $F$-Test

Beim **Chi-Quadrat-Test** ($\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}$ mit $df$ Freiheitsgraden) und beim **$F$-Test** der Varianzanalyse ($F = \frac{s_1^2}{s_2^2}$ mit Zählerfreiheitsgraden $df_1$ und Nennerfreiheitsgraden $df_2$) liegen große Abweichungen von $H_0$ im oberen, rechten Verteilungsbereich:

$$p_{\chi^2} = 1 - F_{\chi^2, df}(\chi^2_{\text{obs}}) \qquad \text{und} \qquad p_{F} = 1 - F_{F, df_1, df_2}(F_{\text{obs}})$$

## Referenztabelle: Kritische Schwellenwerte und Signifikanzniveaus

Die nachfolgende Übersicht stellt die gängigen Signifikanzniveaus ($\alpha$), deren wissenschaftliche Interpretation sowie die zugehörigen kritischen Prüfwerte für den $Z$-Test, den $t$-Test (bei $df = 20$) und den $\chi^2$-Test (bei $df = 1$) gegenüber:

| Signifikanzniveau ($\alpha$ / $p$-Schwelle) | Irrtumswahrscheinlichkeit (%) | Wissenschaftliche Einstufung | Kritischer $Z$-Wert (zweiseitig) | Kritischer $Z$-Wert (einseitig) | Kritischer $t$-Wert ($df = 20$, zweiseitig) | Kritischer $\chi^2$-Wert ($df = 1$) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **$p \ge 0{,}10$** | $\ge 10{,}0\text{ \%}$ | Nicht signifikant ($H_0$ beibehalten) | $< 1{,}645$ | $< 1{,}282$ | $< 1{,}725$ | $< 2{,}706$ |
| **$p < 0{,}10$** | $< 10{,}0\text{ \%}$ | Schwacher Trend / marginal signifikant | $1{,}645$ | $1{,}282$ | $1{,}725$ | $2{,}706$ |
| **$p < 0{,}05$** | $< 5{,}0\text{ \%}$ | **Statistisch signifikant** (Standard $\alpha$) | $1{,}960$ | $1{,}645$ | $2{,}086$ | $3{,}841$ |
| **$p < 0{,}01$** | $< 1{,}0\text{ \%}$ | **Sehr signifikant** (starke Evidenz) | $2{,}576$ | $2{,}326$ | $2{,}845$ | $6{,}635$ |
| **$p < 0{,}001$** | $< 0{,}1\text{ \%}$ | **Hochsignifikant** (sehr starke Evidenz) | $3{,}291$ | $3{,}090$ | $3{,}850$ | $10{,}828$ |

## Schritt-für-Schritt-Rechenbeispiel aus der Qualitätsprüfung

Ein Pharmaunternehmen prüft in der Qualitätskontrolle, ob eine Abfüllanlage exakt die vorgeschriebene Wirkstoffmenge von $\mu_0 = 500{,}0\text{ mg}$ pro Tablette einhält. Dazu wird eine Zufallsstichprobe von $n = 25$ Tabletten entnommen. Die Messung ergibt einen Mittelwert von $\bar{x} = 503{,}3\text{ mg}$ bei einer empirischen Standardabweichung von $s = 6{,}0\text{ mg}$. Geprüft wird zweiseitig auf einem Signifikanzniveau von $\alpha = 0{,}05$.

1. **Hypothesen formulieren:** Nullhypothese $H_0: \mu = 500{,}0\text{ mg}$ gegen Alternativhypothese $H_1: \mu \neq 500{,}0\text{ mg}$.
2. **Standardfehler und $t$-Teststatistik berechnen:**
   $$SE = \frac{s}{\sqrt{n}} = \frac{6{,}0\text{ mg}}{\sqrt{25}} = 1{,}2\text{ mg} \implies t = \frac{503{,}3\text{ mg} - 500{,}0\text{ mg}}{1{,}2\text{ mg}} = 2{,}75$$
3. **Freiheitsgrade bestimmen:** $df = n - 1 = 25 - 1 = 24$.
4. **p-Wert über die $t$-Verteilung ($df = 24$, zweiseitig) ermitteln:**
   Für $|t| = 2{,}75$ und $df = 24$ liefert die kumulative $t$-Verteilung $F_{t, 24}(2{,}75) = 0{,}99442$.
   * Einseitiger (rechtsseitiger) p-Wert: $p_{\text{einseitig}} = 1 - 0{,}99442 = 0{,}00558$ ($0{,}56\text{ \%}$).
   * Zweiseitiger p-Wert: $p_{\text{zweiseitig}} = 2 \times 0{,}00558 = 0{,}01116 \approx 0{,}0112$ ($1{,}12\text{ \%}$).
5. **Entscheidung treffen:** Da $p = 0{,}0112 < \alpha = 0{,}05$ ist, wird die Nullhypothese verworfen. Die Abweichung von $+3{,}3\text{ mg}$ ist statistisch signifikant; die Abfüllanlage muss neu kalibriert werden.

## Praxistipps und häufige Fehler bei der Interpretation von p-Werten

* **Statistische Signifikanz ist nicht gleich praktische Relevanz:** Bei extrem großen Stichproben (z. B. $n = 250.000$ Nutzer in einem Online-Experiment) führt selbst ein winziger, wirtschaftlich völlig bedeutungsloser Unterschied von $0{,}02\text{ \%}$ fast zwangsläufig zu einem hochsignifikanten p-Wert ($p < 0{,}001$). Berichten Sie neben dem p-Wert daher stets ein stichprobenunabhängiges Maß für die **Effektstärke** (wie Cohens $d$, Pearson-$r$ oder das Konfidenzintervall).
* **Ein nicht signifikanter p-Wert beweist nicht die Nullhypothese:** Ein Ergebnis von $p = 0{,}28$ bedeutet lediglich, dass die vorliegenden Daten keine ausreichende Evidenz gegen $H_0$ liefern (*Abwesenheit von Evidenz ist keine Evidenz für Abwesenheit*). Oft war schlicht der Stichprobenumfang $n$ zu klein (geringe Teststärke bzw. Power $1 - \beta$), um einen vorhandenen Effekt nachzuweisen.
* **Alpha-Fehler-Inflation bei Mehrfachtests vermeiden:** Wer an demselben Datensatz $20$ unabhängige Hypothesentests mit $\alpha = 0{,}05$ durchführt, erhält rein zufällig im Schnitt einen falsch-positiven Befund (Fehler 1. Art), selbst wenn in Wahrheit nirgendwo ein Effekt existiert. Wenden Sie bei multiplen Vergleichen zwingend eine Alpha-Adjustierung wie die **Bonferroni-Korrektur** ($\alpha_{\text{korr}} = \frac{\alpha}{m}$ bei $m$ Tests) oder die Benjamini-Hochberg-Methode an.
* **Kein Wechsel auf einseitiges Testen nach Sichtung der Daten:** Erreicht ein zweiseitiger Test knapp keine Signifikanz (etwa $p_{\text{zweiseitig}} = 0{,}072$), ist es methodisch unzulässig, nachträglich auf einen einseitigen Test umzuschalten, nur um den p-Wert auf $0{,}036$ unter die $0{,}05$-Schwelle zu drücken (*p-Hacking*).
