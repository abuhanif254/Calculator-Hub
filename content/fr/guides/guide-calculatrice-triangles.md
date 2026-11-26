---
title: "Guide de la Calculatrice de Triangles : Côtés, Angles et Surface"
description: "Référence mathématique complète sur le triangle : théorème de Pythagore, loi d'Al-Kashi, loi des sinus, formule de Héron, rayons inscrit et circonscrit, et exemple exact."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "triangle-calculator"
faqs:
  - question: "Comment calculer la surface d'un triangle si l'on ne connaît que ses trois côtés ?"
    answer: "Utilisez la formule de Héron : calculez d'abord le demi-périmètre s = (a + b + c) / 2, puis appliquez S = √[s(s − a)(s − b)(s − c)]. Cette méthode évite de devoir mesurer une hauteur perpendiculaire ou de résoudre un angle intermédiaire."
  - question: "Pourquoi la formule d'Al-Kashi est-elle plus sûre que la loi des sinus pour calculer un angle ?"
    answer: "La fonction arccos associée à la loi des cosinus distingue sans ambiguïté un angle aigu (cosinus positif) d'un angle obtus (cosinus négatif) sur tout l'intervalle ]0° ; 180°[. À l'inverse, arcsin retourne toujours un angle aigu et masque les angles supérieurs à 90°."
  - question: "Comment déduire les rayons des cercles inscrit et circonscrit à partir de la surface ?"
    answer: "Une fois la surface S et le demi-périmètre s connus, le rayon du cercle inscrit vaut exactement r = S / s, et le rayon du cercle circonscrit vaut R = (a × b × c) / (4 × S). Ces deux grandeurs contrôlent respectivement le plus grand disque contenu dans le triangle et le cercle passant par ses trois sommets."
  - question: "Qu'est-ce qu'un triangle héronien ?"
    answer: "Un triangle héronien est un triangle dont les longueurs des trois côtés et la surface sont simultanément des nombres entiers (ou rationnels). Le triangle de côtés 13, 14 et 15 unités en est un exemple célèbre : son demi-périmètre vaut 21 et sa surface vaut exactement 84."
  - question: "Les formules planes restent-elles valides pour de grandes parcelles géographiques ?"
    answer: "Elles restent extrêmement précises pour les relevés locaux et chantiers inférieurs à quelques kilomètres. À grande échelle (navigation aérienne, géodésie sur des dizaines ou centaines de kilomètres), la courbure terrestre impose la trigonométrie sphérique, où la somme des angles dépasse 180°."
---

Le **triangle** est le polygone fondamental de la géométrie euclidienne : indéformable par construction, toute surface polygonale ou maillage tridimensionnel se décompose en triangles pour en calculer les longueurs, les angles et l'aire. Dans le plan euclidien, la somme des trois angles intérieurs vaut exactement `180°` (`π rad`), et chaque côté reste strictement inférieur à la somme des deux autres.

Une calculatrice de triangles rassemble l'ensemble des relations métriques qui relient côtés, angles et surface : théorème de Pythagore pour les angles droits, rapports trigonométriques classiques, théorème d'Al-Kashi (loi des cosinus), loi des sinus et formule de Héron pour l'aire.

## Fondements géométriques : côtés, angles et surface

On classe les triangles selon leurs **angles** — acutangle (trois angles `< 90°`), rectangle (un angle `= 90°`) ou obtusangle (un angle `> 90°`) — et selon leurs **côtés** — équilatéral (`a = b = c`), isocèle (deux côtés égaux) ou scalène (trois côtés de longueurs distinctes).

### Relations entre côtés et angles

```text
Pythagore (angle C = 90°) : a² + b² = c²
Rapports SOH-CAH-TOA      : sin(θ) = Opposé/Hypoténuse, cos(θ) = Adjacent/Hypoténuse, tan(θ) = Opposé/Adjacent
Loi des cosinus (Al-Kashi): c² = a² + b² − 2ab × cos(C)
Loi des sinus             : a / sin(A) = b / sin(B) = c / sin(C) = 2R
```

L'inversion de la loi des cosinus, `cos(C) = (a² + b² − c²) / (2ab)`, détermine n'importe quel angle à partir des trois longueurs de côtés tout en indiquant sans ambiguïté si cet angle est obtus (`cos(C) < 0`) ou aigu (`cos(C) > 0`).

### Formules d'aire et cercles remarquables

Avec le demi-périmètre `s = (a + b + c) / 2`, quatre formules caractérisent la surface `S` et les cercles géométriques associés :

- **Base et hauteur orthogonale :** `S = (b × h_b) / 2`, où `h_b` désigne la hauteur abaissée sur le côté `b`.
- **Formule trigonométrique (angle compris) :** `S = (a × b × sin(C)) / 2`.
- **Formule de Héron (trois côtés connus) :** `S = √[s(s − a)(s − b)(s − c)]`.
- **Rayons inscrit (`r`) et circonscrit (`R`) :** `r = S / s` pour le plus grand disque intérieur, et `R = (a × b × c) / (4S)` pour le cercle passant par les trois sommets.

## Exemple chiffré complet : le triangle `13 – 14 – 15`

Considérons une parcelle triangulaire dont les côtés mesurent exactement `a = 13 m`, `b = 14 m` et `c = 15 m`. Déterminons sa surface, sa hauteur principale, ses trois angles et ses rayons inscrit et circonscrit.

### Étape 1 : Demi-périmètre, surface et hauteur

1. Périmètre et demi-périmètre : `P = 13 + 14 + 15 = 42 m`, donc `s = 42 / 2 = 21 m`.
2. Surface par la formule de Héron : `S = √[21 × (21 − 13) × (21 − 14) × (21 − 15)] = √[21 × 8 × 7 × 6] = √7 056 = 84 m²`.
3. Hauteur relative à la base `b = 14 m` : `h_b = (2 × 84) / 14 = 12 m`. Cette hauteur découpe d'ailleurs le triangle en deux triangles rectangles pythagoriciens exacts (`5-12-13` et `9-12-15`).

### Étape 2 : Angles intérieurs par Al-Kashi

Appliquons la loi des cosinus à chacun des trois sommets :

- `cos(A) = (14² + 15² − 13²) / (2 × 14 × 15) = 252 / 420 = 0,60` → `A = arccos(0,60) ≈ 53,13°`.
- `cos(B) = (13² + 15² − 14²) / (2 × 13 × 15) = 198 / 390 ≈ 0,507692` → `B ≈ 59,49°`.
- `cos(C) = (13² + 14² − 15²) / (2 × 13 × 14) = 140 / 364 = 5 / 13` → `C ≈ 67,38°`.

La somme vérifie `53,13° + 59,49° + 67,38° = 180,00°` ; tous les cosinus étant positifs, le triangle est acutangle.

### Étape 3 : Rayons inscrit et circonscrit

- **Rayon du cercle inscrit :** `r = S / s = 84 / 21 = 4,00 m`.
- **Rayon du cercle circonscrit :** `R = (13 × 14 × 15) / (4 × 84) = 2 730 / 336 = 8,125 m`.

## Tableau comparatif des méthodes de calcul de surface

| Méthode | Formule d'aire (`S`) | Données requises | Stabilité numérique | Domaine d'emploi |
|---|---|---|---|---|
| **Base × Hauteur** | `(b × h) / 2` | 1 côté et sa hauteur | Maximale | Plans d'architecture cotés |
| **Trigonométrique** | `(a × b × sin(C)) / 2` | 2 côtés + angle compris | Très élevée | Relevés au tachéomètre |
| **Formule de Héron** | `√[s(s−a)(s−b)(s−c)]` | 3 côtés (`a, b, c`) | Sensible si triangle aplati | Chaînage cadastral |
| **Triangle rectangle** | `(a × b) / 2` | Les 2 cathètes | Exacte | Équerres, charpentes, pentes |
| **Triangle équilatéral** | `(√3 / 4) × a²` | 1 côté (`a`) | Exacte (`≈ 0,43301 a²`) | Treillis et sections régulières |
| **Coordonnées (Shoelace)** | `|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)| / 2` | 3 sommets `(xᵢ, yᵢ)` | Très élevée | SIG, CAO, infographie 2D |

## Précautions numériques et limites d'application

### Instabilité des triangles très aplatis

Lorsque deux côtés ont une somme presque égale au troisième (par exemple `a = 100,000 m`, `b = 50,001 m`, `c = 50,000 m`), le facteur `(s − a)` dans la formule classique de Héron subit une perte sévère de chiffres significatifs par soustraction de nombres quasi égaux. Pour contourner ce phénomène d'annulation catastrophique, l'algorithme de Kahan trie les côtés (`a ≥ b ≥ c`) et utilise une factorisation numériquement stable : `S = 0,25 × √[(a + (b + c)) × (c − (a − b)) × (c + (a − b)) × (a + (b − c))]`.

### Limites du modèle plan euclidien

Les formules ci-dessus s'appliquent avec une exactitude rigoureuse aux chantiers de construction, pièces mécaniques et parcelles locales. Sur de grandes distances géodésiques (au-delà d'une dizaine de kilomètres), la courbure terrestre introduit un excès sphérique qui porte la somme des angles au-delà de `180°` et impose l'emploi de la trigonométrie sphérique ou ellipsoïdale.

Testez ces calculs instantanément avec notre [calculatrice de triangles](/fr/calculatrices/calculatrice-de-triangle).
