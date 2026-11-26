---
title: "Résistance Électrique : Contrôler le Flux"
description: "Comprenez la résistance électrique, la conductivité des matériaux, le calcul des associations série et parallèle, et utilisez notre Calculatrice de Résistance."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "resistance-calculator"
relatedType: "calculator"
faqs:
  - question: "Comment lire la valeur d'une résistance à anneaux de couleur ?"
    answer: "Sur une résistance standard à 4 anneaux, les deux premiers anneaux donnent les deux chiffres significatifs (noir=0, marron=1, rouge=2, orange=3, jaune=4, vert=5, bleu=6, violet=7, gris=8, blanc=9), le troisième donne le multiplicateur en puissance de dix, et le quatrième (souvent or ±5 % ou marron ±1 %) indique la tolérance. Par exemple, Jaune-Violet-Rouge-Or correspond à 47 × 100 = 4 700 Ω (4,7 kΩ) à ±5 %. Les modèles de précision à 5 anneaux ajoutent un troisième chiffre significatif."
  - question: "Quelle est la différence entre résistance en série et résistance en parallèle ?"
    answer: "En série, les résistances se traversent l'une après l'autre et leurs valeurs s'additionnent : R_eq = R₁ + R₂ + ... + Rₙ, donc la résistance totale augmente. En parallèle, le courant dispose de plusieurs chemins simultanés : l'inverse de la résistance totale égale la somme des inverses (1 / R_eq = 1 / R₁ + 1 / R₂), si bien que la résistance équivalente est toujours inférieure à la plus petite des résistances du montage."
  - question: "Pourquoi la résistance d'un composant varie-t-elle avec la température ?"
    answer: "Dans les conducteurs métalliques (cuivre, tungstène, platine), l'élévation de température augmente l'agitation thermique des atomes, ce qui freine le déplacement des électrons : la résistance augmente (coefficient de température positif, CTP). À l'inverse, dans certains semi-conducteurs et thermistances CTN, la chaleur libère davantage de porteurs de charge, faisant baisser la résistance."
  - question: "Comment mesurer la résistance d'un composant avec un ohmmètre ?"
    answer: "Il faut impérativement couper toute alimentation électrique et déconnecter au moins une patte du composant hors du circuit avant de mesurer. L'ohmmètre injecte un faible courant connu pour calculer R = U / I : mesurer sur un circuit sous tension fausse la lecture et risque de griller le multimètre, tandis que mesurer en circuit laisse les autres composants en parallèle biaiser le résultat."
  - question: "Que signifient les séries normalisées E12, E24 et E96 des fabricants de résistances ?"
    answer: "Pour éviter de fabriquer une infinité de valeurs, l'industrie utilise des séries logarithmiques normalisées par décade (CEI 60063). La série E12 propose 12 valeurs par décade (adaptée aux résistances ±10 % ou ±5 %), la série E24 en offre 24 (±5 % ou ±1 %), et la série E96 propose 96 valeurs très serrées pour les circuits de précision à ±1 %."
---

La **résistance électrique** (notée `R`) mesure l'opposition d'un matériau ou d'un composant au passage du courant, exprimée en **ohms (Ω)**. Elle permet de limiter l'intensité pour protéger les semi-conducteurs, de diviser une tension, de polariser des transistors ou de convertir l'énergie électrique en chaleur maîtrisée.

Notre [Calculatrice de Résistance](/fr/calculatrices/calculateur-de-resistance) calcule instantanément la valeur ohmique nécessaire à partir de la tension (`U`) et du courant (`I`), ou via la puissance (`P`). Choisir la bonne valeur, la bonne puissance nominale et la bonne technologie assure la stabilité et la longévité de vos montages.

## Lois physiques, géométrie et associations de résistances

À l'échelle atomique, les électrons libres entrent en collision avec le réseau cristallin du conducteur, dissipant une partie de leur énergie sous forme thermique. Cette opposition dépend de la résistivité intrinsèque `ρ`, de la longueur et de la section du matériau.

Voici les équations fondamentales de la résistance électrique :

```text
Loi d'Ohm (tension et courant)       : R = U / I
Puissance et tension / courant       : R = U² / P   |   R = P / I²
Loi de Pouillet (fil homogène)       : R = ρ × L / S
Dérive thermique                     : R(T) = R₀ × [1 + α × (T − T₀)]
Association en série                 : R_eq = R₁ + R₂ + ... + Rₙ
Association en parallèle (2 dipôles) : R_eq = (R₁ × R₂) / (R₁ + R₂)
```

Dans ces formules, `R` est en ohms (`Ω`, avec `1 kΩ = 1 000 Ω` et `1 MΩ = 10⁶ Ω`), `ρ` est la résistivité en `Ω·m` (inverse de la conductivité `σ`), `L` la longueur en mètres (`m`), `S` la section en `m²` et `α` le coefficient de température en `K⁻¹`.

Pour deux résistances identiques de valeur `R` montées en parallèle, la résistance équivalente est divisée par deux (`R_eq = R / 2`), tandis que leur capacité de dissipation thermique double. Cette propriété permet d'ajuster précisément une valeur intermédiaire ou de répartir la chaleur sur un circuit imprimé sans recourir à un composant surdimensionné.

## Exemple détaillé : pont diviseur de tension 12 V vers 3,3 V

En électronique embarquée, un capteur sortant du `12,0 V` doit souvent être abaissé vers une entrée analogique limitée à `3,3 V`. On réalise un **pont diviseur** avec deux résistances en série (`R₁` côté `12 V` et `R₂` côté masse) parcourues par un courant de pont `I_pont = 1,0 mA` (`0,001 A`).

**Étape 1 — Résistance totale du pont :**
`R_tot = U_in / I_pont = 12,0 / 0,001 = 12 000 Ω` (`12 kΩ`)

**Étape 2 — Résistance basse `R₂` pour `3,3 V` :**
`R₂ = U_out / I_pont = 3,3 / 0,001 = 3 300 Ω` (`3,3 kΩ`), valeur exacte de la série E24.

**Étape 3 — Résistance haute `R₁` et choix normalisé sécurisé :**
`R₁ = 12 000 − 3 300 = 8 700 Ω`
Par sécurité, on retient `R₁ = 9,1 kΩ` (plutôt que `8,2 kΩ`, qui ferait dépasser `3,3 V` en sortie).

**Étape 4 — Vérification nominale et pire cas à ±1 % :**
- `R_tot_reel = 9 100 + 3 300 = 12 400 Ω`
- `U_out_nominal = 12,0 × (3 300 / 12 400) ≈ 3,194 V`
- Au pire cas à `±1 %` (`R₁ = 9 009 Ω`, `R₂ = 3 333 Ω`), `U_out ≈ 3,241 V`, restant sous `3,3 V`. La puissance dissipée dans `R₁` (`≈ 8,5 mW`) est couverte sans risque par une résistance CMS `0603` de `100 mW`.

## Matériaux conducteurs, résistifs et isolants : valeurs de référence

La résistivité des matériaux utilisés en électrotechnique s'étend sur plus de vingt ordres de grandeur.

| Matériau / Technologie | Résistivité `ρ` à 20 °C (`Ω·m`) | Coeff. `α` (`K⁻¹`) | Propriété clé | Applications principales |
| :--- | :---: | :---: | :--- | :--- |
| Argent (`Ag`) | `1,59 × 10⁻⁸` | `+0,0038` | Meilleur conducteur ambiant | Contacts RF et relais |
| Cuivre recuit (`Cu`) | `1,68 × 10⁻⁸` | `+0,0039` | Conducteur de référence | Câbles, PCB, bobinages |
| Aluminium (`Al`) | `2,65 × 10⁻⁸` | `+0,0043` | Léger (`61 %` du Cu) | Lignes aériennes HT |
| Nichrome (`Ni80Cr20`) | `1,10 × 10⁻⁶` | `+0,00017` | Stable à haute température | Corps de chauffe, résistances |
| Couche métallique (`NiCr`) | Ajustée | `±50 ppm/K` | Haute précision, faible bruit | Électronique analogique `±0,1–1 %` |
| Verre / PTFE (Téflon) | `10¹²` à `10¹⁶` | Négatif | Isolant diélectrique | Gaines haute tension, supports |

## Erreurs fréquentes et précautions d'ingénierie

Sélectionner une résistance impose de vérifier quatre critères au-delà de sa valeur en ohms :

- **Sous-estimer le déclassement thermique :** la puissance nominale (`0,25 W`, `0,5 W`) s'entend en air libre à température modérée. En boîtier fermé, maintenez la dissipation réelle sous `50 %` de la puissance catalogue.
- **Oublier la tension maximale de service :** une résistance CMS `0402` supporte rarement plus de `50 V` avant claquage diélectrique, même si `U² / R` est minime. Sur du `230 V` (`325 V` crête), utilisez des boîtiers `1206` ou plusieurs résistances en série.
- **Négliger l'impédance de charge :** sur un pont diviseur, si l'étage suivant absorbe du courant, sa résistance d'entrée en parallèle avec `R₂` abaisse la tension réelle de sortie.
- **Utiliser des résistances bobinées en haute fréquence :** leur enroulement introduit une inductance parasite qui déforme les signaux rapides ; privilégiez des modèles à couche métallique ou film épais anti-inductifs.

Vérifiez l'ensemble de votre circuit avec la [Calculatrice de la Loi d'Ohm](/fr/calculatrices/calculateur-loi-d-ohm) et la [Calculatrice de Courant](/fr/calculatrices/calculateur-de-courant).
