# Halbwertszeit-Rechner (Radioaktiver Zerfall)

Unser Online-Halbwertszeit-Rechner ermöglicht die präzise Berechnung des radioaktiven Zerfalls. Dieses Werkzeug ist ideal für Schüler, Studenten und Forscher in den Bereichen Physik, Chemie und Nuklearmedizin geeignet.

Sie können eine der fünf Variablen des exponentiellen Zerfalls berechnen:
1. **Verbleibende Menge ($N_t$):** Die Menge an radioaktivem Material, die nach einer bestimmten Zeit übrig bleibt.
2. **Anfangsmenge ($N_0$):** Die ursprüngliche Menge der Substanz vor Beginn des Zerfallsprozesses.
3. **Halbwertszeit ($t_{1/2}$):** Die Zeitspanne, in der sich die Menge der radioaktiven Atomkerne halbiert.
4. **Vergangene Zeit ($t$):** Die Dauer des Zerfalls.
5. **Zerfallskonstante (λ):** Die Zerfallswahrscheinlichkeit pro Zeiteinheit.

---

### Die Zerfallsformel

Die Halbwertszeit wird mit der folgenden mathematischen Formel berechnet:

$$N(t) = N_0 \cdot \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}$$

Dabei gilt:
*   **$N(t)$** ist die verbleibende Menge.
*   **$N_0$** ist die ursprüngliche Menge.
*   **$t$** ist die verstrichene Zeit.
*   **$t_{1/2}$** ist die Halbwertszeit der Substanz.

Mit der Zerfallskonstante ($\lambda$) lautet die Formel:
$$N(t) = N_0 \cdot e^{-\lambda t}$$
wobei die Zerfallskonstante wie folgt mit der Halbwertszeit verknüpft ist:
$$\lambda = \frac{\ln(2)}{t_{1/2}} \approx \frac{0.69315}{t_{1/2}}$$

---

### Praktische Anwendungen
*   **Radiokohlenstoffdatierung (C-14):** Zur Altersbestimmung organischer Materialien in der Archäologie (Halbwertszeit von 5.730 Jahren).
*   **Nuklearmedizin:** Einsatz von Isotopen mit kurzen Halbwertszeiten (wie Technetium-99m mit einer Halbwertszeit von 6 Stunden) für Diagnostik und Scans, um die Strahlenbelastung für Patienten zu minimieren.
*   **Nukleare Entsorgung:** Modellierung der Abklingzeit von Kernabfällen über Jahrtausende hinweg.
