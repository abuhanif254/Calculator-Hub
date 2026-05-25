# Calculateur de Demi-Vie (Désintégration Radioactive)

Notre calculateur de demi-vie en ligne permet de mesurer avec précision le taux de désintégration radioactive d'un isotope instable. C'est un outil d'apprentissage idéal pour les étudiants en physique, en chimie et en médecine nucléaire.

Ce calculateur prend en charge cinq modes de calcul :
1. **Quantité restante ($N_t$) :** La masse ou l'activité radioactive restante après un temps donné.
2. **Quantité initiale ($N_0$) :** La quantité d'origine de l'isotope au début du processus de désintégration.
3. **Demi-vie ($t_{1/2}$) :** La durée nécessaire pour que la moitié des noyaux radioactifs d'un échantillon se désintègrent.
4. **Temps écoulé ($t$) :** Le temps total pendant lequel l'échantillon s'est désintégré.
5. **Constante de désintégration (λ) :** La probabilité de désintégration par unité de temps.

---

### La Formule de Désintégration Radioactive

L'équation fondamentale de la demi-vie est écrite sous la forme :

$$N(t) = N_0 \cdot \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}$$

Où :
*   **$N(t)$** est la quantité d'isotope restante.
*   **$N_0$** est la quantité d'origine.
*   **$t$** est le temps de désintégration écoulé.
*   **$t_{1/2}$** est la demi-vie de l'isotope.

Elle peut également s'écrire à l'aide de la constante de désintégration ($\lambda$) :
$$N(t) = N_0 \cdot e^{-\lambda t}$$
La constante de désintégration et la demi-vie sont liées par la formule suivante :
$$\lambda = \frac{\ln(2)}{t_{1/2}} \approx \frac{0.69315}{t_{1/2}}$$

---

### Applications Réelles
*   **Datation au Carbone 14 :** Permet de dater des objets archéologiques organiques contenant du carbone (jusqu'à 50 000 ans d'âge).
*   **Médecine Nucléaire :** Choix d'isotopes à demi-vie courte (comme le Technétium-99m, d'une demi-vie de 6 heures) pour l'imagerie médicale afin de limiter l'exposition du patient aux rayonnements.
*   **Gestion des Déchets Radioactifs :** Calcul du taux de décroissance de la radioactivité des déchets issus des centrales nucléaires pour définir des zones de stockage sécurisées.
