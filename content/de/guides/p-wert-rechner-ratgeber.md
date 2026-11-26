---
title: "P-Wert: Sind Ihre Daten statistisch signifikant?"
description: "Verstehen Sie die exakte Definition des P-Werts, den Unterschied zwischen ein- und zweiseitigem Test sowie typische Fehlinterpretationen und nutzen Sie unseren P-Wert Rechner."
category: "Math & Science"
relatedCalculator: "p-value-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Bedeutet ein P-Wert von 0,03, dass die Nullhypothese nur zu 3 Prozent wahr ist?"
    answer: "Nein, das ist einer der häufigsten Denkfehler in der Statistik. Der P-Wert ist eine bedingte Wahrscheinlichkeit unter Annahme einer wahren Nullhypothese: Er gibt an, wie wahrscheinlich die beobachteten oder noch extremere Daten wären, falls es tatsächlich keinen Effekt gibt – nicht aber die Wahrscheinlichkeit, dass die Nullhypothese zutrifft."
  - question: "Wann wähle ich einen einseitigen und wann einen zweiseitigen Hypothesentest?"
    answer: "Ein zweiseitiger Test prüft Abweichungen in beide Richtungen (größer oder kleiner als der Referenzwert) und bildet in der Wissenschaft den Standard. Ein einseitiger Test ist nur zulässig, wenn die Wirkungsrichtung vor der Datenerhebung eindeutig festgelegt wurde und eine Abweichung in die Gegenrichtung inhaltlich ausgeschlossen oder irrelevant ist."
  - question: "Warum garantiert p < 0,05 noch keine praktische oder klinische Relevanz?"
    answer: "Bei sehr großen Stichproben (etwa n > 10.000) werden selbst winzige, im Alltag völlig bedeutungslose Unterschiede statistisch signifikant, weil der Standardfehler mit 1/√n schrumpft. Deshalb müssen neben dem P-Wert immer die Effektstärke (z. B. Cohens d) und das 95-%-Konfidenzintervall bewertet werden."
  - question: "Was ist der Unterschied zwischen z-Wert und t-Wert bei der P-Wert-Berechnung?"
    answer: "Der z-Test basiert auf der Standardnormalverteilung und setzt voraus, dass die Standardabweichung der Grundgesamtheit bekannt ist oder eine große Stichprobe vorliegt. Der t-Test nutzt die Student-t-Verteilung mit df = n − 1 Freiheitsgraden, weil die Standardabweichung aus der Stichprobe geschätzt werden muss – bei kleinem n führt das zu breiteren Verteilungsrändern und größeren P-Werten."
  - question: "Wie beeinflusst multiples Testen die Aussagekraft des P-Werts?"
    answer: "Führt man 20 unabhängige Hypothesentests auf dem Niveau α = 0,05 durch, tritt rein zufällig mit einer Wahrscheinlichkeit von 1 − 0,95²⁰ ≈ 64,2 % mindestens ein falsch-positives Ergebnis auf. Um diese Alpha-Fehler-Kumulierung zu kontrollieren, muss das Signifikanzniveau etwa per Bonferroni-Korrektur (α_korr = α / k) angepasst werden."
---

Der **P-Wert** (englisch *p-value* für *probability value*) ist die zentrale Prüfkennzahl der schließenden Statistik zur Bewertung von Hypothesentests. Er beziffert die Wahrscheinlichkeit, bei Gültigkeit der Nullhypothese `H₀` ein Stichprobenergebnis zu beobachten, das mindestens so extrem ausfällt wie die tatsächlich gemessenen Daten. Je kleiner der P-Wert ausfällt, desto schlechter lassen sich die Messwerte durch bloßen Stichprobenzufall erklären.

Unterschreitet der P-Wert das vorab festgelegte Signifikanzniveau `α` (typischerweise `0,05` beziehungsweise `5 %`), gilt das Resultat als statistisch signifikant und `H₀` wird verworfen. Um aus Teststatistiken (`z`-Wert, `t`-Wert oder Chi-Quadrat-Wert) unmittelbar exakte Wahrscheinlichkeiten zu berechnen, nutzen Sie unseren [P-Wert Rechner](/de/rechner/p-wert-rechner).

## Statistische Methodik: Hypothesen, Teststatistik und Signifikanz

### Nullhypothese, Alternativhypothese und Fehlertypen

Jeder klassische Signifikanztest beginnt vor der Datenauswertung mit zwei sich ausschließenden Hypothesen:

- **Nullhypothese (`H₀`):** Sie formuliert den Zustand ohne Effekt oder Unterschied (etwa `μ = μ₀`).
- **Alternativhypothese (`H₁`):** Sie beschreibt die vermutete Abweichung – entweder ungerichtet (`μ ≠ μ₀` für einen zweiseitigen Test) oder gerichtet (`μ > μ₀` beziehungsweise `μ < μ₀` für einen einseitigen Test).

Bei der Testentscheidung drohen zwei Fehlertypen: Der **Fehler 1. Art (`α`-Fehler)** entsteht, wenn eine wahre Nullhypothese fälschlich verworfen wird; seine Obergrenze definiert das Niveau `α`. Der **Fehler 2. Art (`β`-Fehler)** tritt auf, wenn ein realer Effekt unentdeckt bleibt. Die Gegenwahrscheinlichkeit `1 − β` heißt Teststärke (Power) und sollte in der Studienplanung mindestens `0,80` (`80 %`) erreichen.

### Teststatistiken: z-Test vs. t-Test

Um Rohdaten auf eine Referenzverteilung abzubilden, wird eine Prüfgröße bestimmt. Bei bekanntem Populations-Streuungsmaß `σ` gilt der `z`-Test; muss die Standardabweichung `s` aus der Stichprobe geschätzt werden, greift der Einstichproben-`t`-Test mit `df = n − 1` Freiheitsgraden:

```text
z = (x̄ − μ₀) / (σ / √n)
t = (x̄ − μ₀) / (s / √n)    mit df = n − 1
```

Dabei stehen `x̄` für den Stichprobenmittelwert, `μ₀` für den Nullhypothesenwert, `n` für den Stichprobenumfang und `s/√n` für den Standardfehler (`SE`). Der zweiseitige P-Wert summiert beide Randflächen:

```text
p_zweiseitig = 2 × P(T ≥ |t_beobachtet| | H₀)
p_einseitig  = P(T ≥ t_beobachtet | H₀)
```

Wegen der schwereren Ränder der `t`-Verteilung liefert ein `t`-Wert bei kleinem `n` stets einen größeren, konservativeren P-Wert als derselbe Zahlenwert in der Standardnormalverteilung. Ab rund `n > 100` nähern sich beide Kurven eng an.

## Schritt-für-Schritt-Rechenbeispiel: Bewertung einer Ernährungsstudie

Ein Forschungsteam prüft, ob ein 12-wöchiges Ernährungsprogramm das Körpergewicht von `n = 25` Teilnehmenden verändert. Vor Studienbeginn werden die zweiseitigen Hypothesen `H₀: μ = 0 kg` und `H₁: μ ≠ 0 kg` bei `α = 0,05` festgelegt. Gemessen werden eine mittlere Gewichtsänderung von `x̄ = −1,6 kg` und eine Stichprobenstandardabweichung von `s = 3,2 kg`.

1. **Standardfehler bestimmen:** Teilen Sie die Standardabweichung durch die Wurzel des Stichprobenumfangs: `SE = 3,2 kg / √25 = 3,2 kg / 5 = 0,64 kg`.
2. **Prüfgröße `t` und Freiheitsgrade berechnen:** Einsetzen in die `t`-Formel ergibt `t = (−1,6 − 0) / 0,64 = −2,50` bei `df = 25 − 1 = 24`.
3. **Zweiseitigen P-Wert ermitteln:** Für `|t| = 2,50` und `df = 24` beträgt die einseitige Randwahrscheinlichkeit der Student-`t`-Verteilung `0,0098`. Im zweiseitigen Test verdoppelt sich dieser Wert auf `p = 2 × 0,0098 = 0,0197` (`1,97 %`). Unter einer Normalverteilung (`z = −2,50`) läge er bei `0,0124` (`1,24 %`) – die `t`-Verteilung schützt also vor vorschneller Signifikanz.
4. **Entscheidung treffen:** Da `p = 0,0197 < α = 0,05` gilt, wird `H₀` verworfen. Die Effektstärke `d = |x̄| / s = 1,6 / 3,2 = 0,50` weist zudem auf einen moderaten Effekt hin.

## Vergleichstabelle: Einordnung von P-Werten und Schwellenwerten

| P-Wert-Bereich | Klassische Bewertung | Entscheidung (`α = 0,05`) | Typische Fachkonvention | Methodischer Hinweis |
| :--- | :--- | :--- | :--- | :--- |
| `p > 0,10` | Keine Evidenz gegen `H₀` | `H₀` beibehalten | Einheitlich über alle Disziplinen | Kein Beweis für `H₀` (Power prüfen) |
| `0,05 ≤ p ≤ 0,10` | Schwacher Hinweis | `H₀` beibehalten | Gelegentlich als „Trend“ diskutiert | Kein bestätigter Effekt |
| `0,01 ≤ p < 0,05` | Statistisch signifikant (`*`) | `H₀` verwerfen | Standard in Medizin und Sozialforschung | Empfindlich gegen Stichprobenwahl |
| `0,001 ≤ p < 0,01` | Sehr signifikant (`**`) | `H₀` verwerfen | Häufig für konfirmatorische Studien | Auch bei `α = 0,01` signifikant |
| `p < 0,001` | Hoch signifikant (`***`) | `H₀` verwerfen | Standard in Physik und Laboranalytik | Stets mit Konfidenzintervall berichten |
| `p < 5 × 10⁻⁸` | Genomweite Signifikanz | `H₀` verwerfen | Genetik / GWAS (ca. 1 Mio. Tests) | Kontrolliert extreme Testmultiplizität |

## Anwendungsbereiche, Fehlinterpretationen und wissenschaftliche Sorgfalt

P-Werte steuern Entscheidungen in klinischen Zulassungsstudien (etwa nach Vorgaben von EMA und BfArM), in industriellen A/B-Tests sowie in der industriellen Qualitätssicherung. Dennoch warnt die American Statistical Association (ASA) ausdrücklich vor einer rein mechanischen Anwendung der `0,05`-Grenze.

Vermeiden Sie in Auswertungen vor allem vier typische Fehlinterpretationen:

- **Signifikanz mit Relevanz verwechseln:** Ein P-Wert von `0,0001` belegt weder einen großen Effekt noch einen klinischen oder wirtschaftlichen Nutzen. Berichten Sie stets Effektstärken und `95-%-Konfidenzintervalle`.
- **P-Hacking durch selektives Testen:** Wer Untergruppen bildet oder Ausreißer entfernt, bis `p < 0,05` entsteht, entwertet die Fehlerkontrolle. Hypothesen müssen vorab fixiert sein.
- **Unkorrigiertes multiples Testen:** Werden zehn Endpunkte parallel geprüft, steigt die Wahrscheinlichkeit falsch-positiver Treffer stark an. Nutzen Sie Korrekturen wie Bonferroni (`α_korr = α / k`) oder Benjamini-Hochberg.
- **„Nicht signifikant“ als „kein Effekt“ deuten:** Ein hoher P-Wert bei kleiner Stichprobe spiegelt oft mangelnde Teststärke wider, beweist aber keine Gleichheit zweier Gruppen.
