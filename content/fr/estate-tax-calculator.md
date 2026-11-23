---
title: "Calculateur de Droits de Succession"
metaTitle: "Calculateur de Droits de Succession : Abattements et Taux"
description: "Estimez vos droits de succession, votre actif net imposable et la part nette transmise aux héritiers après déduction des dettes, legs exonérés et abattements légaux."
metaDescription: "Calculez vos droits de succession selon l'actif brut, les dettes, les abattements et les barèmes en ligne directe. Simulez la part nette transmise."
metaKeywords: "calculateur droits de succession, calcul frais de succession, abattement succession 100 000 euros, barème droits de succession, actif net successoral, simulation héritage"
faqs:
  - question: "Quelle est la différence entre l'actif successoral brut, l'actif net et la part nette taxable ?"
    answer: "L'actif brut regroupe la valeur vénale de tous les biens du défunt au jour du décès (immobilier, comptes bancaires, titres, mobilier). L'actif net successoral s'obtient en retranchant le passif déductible (dettes certaines, emprunts restants, impôts dus, frais funéraires plafonnés) et les legs exonérés aux fondations reconnues d'utilité publique. Enfin, la part nette taxable correspond à la quote-part d'actif net revenant à un héritier après déduction de son abattement légal personnel."
  - question: "Comment fonctionne le doublement de l'abattement pour un couple marié ?"
    answer: "Lorsqu'un couple marié transmet un patrimoine commun à un enfant, chaque parent dispose de son propre abattement (100 000 € par parent et par enfant en France, soit 200 000 € au total pour les deux décès successifs). Dans les régimes d'imposition globale de la masse successorale, comme l'impôt fédéral américain ou certains barèmes forfaitaires, le mécanisme de report conjugal permet également de doubler le seuil d'exonération au bénéfice du conjoint survivant."
  - question: "L'assurance-vie entre-t-elle dans le calcul classique des droits de succession ?"
    answer: "En France, les capitaux d'assurance-vie versés avant les 70 ans de l'assuré échappent à l'actif successoral civil et relèvent d'une fiscalité spécifique (article 990 I du CGI) : chaque bénéficiaire désigné profite d'un abattement dédié de 152 500 €, puis d'un prélèvement de 20 % jusqu'à 700 000 € et de 31,25 % au-delà. Pour les primes versées après 70 ans (article 757 B), un abattement global de 30 500 € s'applique aux primes, tandis que les intérêts générés restent exonérés."
  - question: "Pourquoi les concubins non mariés ni pacsés subissent-ils une fiscalité successorale aussi lourde ?"
    answer: "En France, le conjoint survivant marié et le partenaire de PACS (à condition de rédiger un testament pour ce dernier) bénéficient d'une exonération totale de droits de succession. À l'inverse, deux concubins en union libre sont considérés fiscalement comme des tiers étrangers : après un abattement minime de 1 594 €, toute transmission par testament est taxée au taux forfaitaire de 60 % dès le premier euro excédentaire."
  - question: "Existe-t-il des droits de succession en Belgique, en Suisse et au Canada (Québec) ?"
    answer: "Les règles varient fortement dans l'espace francophone. En Belgique, les droits de succession relèvent des Régions (Wallonie, Bruxelles-Capitale, Flandre) avec des barèmes progressifs de 3 % à 30 % en ligne directe et une exemption du logement familial pour le conjoint. En Suisse, l'impôt est cantonal et la quasi-totalité des cantons exonèrent totalement le conjoint et les descendants directs. Au Canada (y compris au Québec), il n'existe pas de droits de succession : le décès déclenche une disposition présumée des biens entraînant un impôt sur le gain en capital dans la déclaration finale du défunt, sauf roulement libre d'impôt au conjoint."
---

La transmission d'un patrimoine au décès obéit à une mécanique fiscale précise qui détermine la fraction réellement conservée par les héritiers après liquidation des dettes et application des abattements légaux. Qu'il s'agisse d'anticiper une succession en France, de comparer les régimes de Belgique ou de Suisse, ou de tester un seuil d'exonération forfaitaire avec report conjugal, estimer les **droits de succession** évite de devoir vendre un bien dans l'urgence pour régler l'impôt dans le délai légal de six mois.

## Formules de calcul de l'actif net et des droits de succession

L'évaluation fiscale d'une succession suit trois étapes séquentielles qui convertissent la valeur marchande des biens en impôt exigible.

### 1. Actif net successoral et base taxable

On somme d'abord la valeur vénale de tous les biens au jour du décès ($A_{\text{brut}}$ : immobilier, liquidités, titres, parts sociales), puis on déduit le passif ($D$ : dettes certaines, emprunts restants, impôts dus, frais funéraires admis et legs exonérés à une fondation d'utilité publique) :

$$A_{\text{net}} = \max\!\left(0,\; A_{\text{brut}} - D\right)$$

On retranche ensuite l'abattement ou seuil d'exonération effectif ($E_{\text{eff}}$). Dans le modèle de report conjugal ou de transmission par les deux parents, l'abattement unitaire $E$ est doublé ($E_{\text{eff}} = 2E$) :

$$B = \max\!\left(0,\; A_{\text{net}} - E_{\text{eff}}\right)$$

### 2. Droits de succession ($T$) et part nette transmise ($N$)

Selon que le régime applique un taux marginal unique $\tau$ au-delà d'une franchise ou un barème progressif à tranches $\tau_k$ (France, Belgique), les droits s'écrivent :

$$T_{\text{forfait}} = B \times \tau \qquad \text{ou} \qquad T_{\text{progressif}} = \sum_{k} \tau_k \cdot \Delta B_k$$

La part nette réellement reçue par les héritiers vaut alors :

$$N = A_{\text{net}} - T$$

## Exemple chiffré pas à pas : succession en ligne directe de 520 000 €

Considérons un parent veuf résidant en France qui transmet son patrimoine à son enfant unique :

- **Actif brut ($A_{\text{brut}}$)** : appartement évalué à $340\,000\text{ €}$, liquidités de $60\,000\text{ €}$ et portefeuille boursier de $120\,000\text{ €}$, soit **$520\,000\text{ €}$**.
- **Passif et déductions ($D$)** : emprunts et impôts dus de $33\,500\text{ €}$, frais funéraires fiscalement déductibles de $1\,500\text{ €}$ et legs exonéré de $25\,000\text{ €}$ à une fondation reconnue d'utilité publique, soit **$60\,000\text{ €}$**.

### Étape 1 : Calcul de la base taxable
- **Actif net successoral** : $A_{\text{net}} = 520\,000 - 60\,000 = \mathbf{460\,000\text{ €}}$.
- **Abattement légal (enfant)** : $E = \mathbf{100\,000\text{ €}}$.
- **Part nette taxable** : $B = 460\,000 - 100\,000 = \mathbf{360\,000\text{ €}}$.

### Étape 2 : Application du barème progressif français
La base de $360\,000\text{ €}$ est imposée par tranches successives en ligne directe :
1. De $0$ à $8\,072\text{ €}$ à $5\text{ \%}$ : **$403,60\text{ €}$**.
2. De $8\,072$ à $12\,109\text{ €}$ ($4\,037\text{ €}$) à $10\text{ \%}$ : **$403,70\text{ €}$**.
3. De $12\,109$ à $15\,932\text{ €}$ ($3\,823\text{ €}$) à $15\text{ \%}$ : **$573,45\text{ €}$**.
4. De $15\,932$ à $360\,000\text{ €}$ ($344\,068\text{ €}$) à $20\text{ \%}$ : **$68\,813,60\text{ €}$**.

- **Droits totaux** : $403,60 + 403,70 + 573,45 + 68\,813,60 = \mathbf{70\,194,35\text{ €}}$ (taux moyen effectif de $19,50\text{ \%}$ sur la base taxable et $15,26\text{ \%}$ sur l'actif net).
- **Part nette conservée par l'enfant** : $460\,000 - 70\,194,35 = \mathbf{389\,805,65\text{ €}}$.

**Effet du doublement d'abattement pour un couple** : si cet actif net de $460\,000\text{ €}$ provenait de deux parents mariés transmettant chacun $230\,000\text{ €}$ avec deux abattements de $100\,000\text{ €}$, chaque base taxable descendrait à $130\,000\text{ €}$ ($24\,194,35\text{ €}$ par parent), soit **$48\,388,70\text{ €}$** au total — une économie fiscale de **$21\,805,65\text{ €}$**.

## Barème de référence selon le lien de parenté (France)

| Lien de Parenté | Abattement Légal | Taux après Abattement | Particularités Clés |
| :--- | :--- | :--- | :--- |
| **Conjoint ou partenaire PACS** | Exonération totale | $0\text{ \%}$ | Testament indispensable pour le partenaire pacsé. |
| **Enfant (ligne directe)** | $100\,000\text{ €}$ | Progressif de $5\text{ \%}$ à $45\text{ \%}$ | Par parent et par enfant, renouvelable tous les 15 ans. |
| **Frère ou sœur** | $15\,932\text{ €}$ | $35\text{ \%}$ puis $45\text{ \%}$ dès $24\,430\text{ €}$ | Exonération sous conditions strictes d'âge et cohabitation. |
| **Neveu ou nièce** | $7\,967\text{ €}$ | Taux fixe de $55\text{ \%}$ | Sauf représentation d'un parent prédécédé. |
| **Tiers ou concubin** | $1\,594\text{ €}$ | Taux fixe de $60\text{ \%}$ | Fiscalité confiscatoire sans mariage, PACS ou assurance-vie. |
| **Héritier handicapé** | $+159\,325\text{ €}$ | Barème du lien de parenté | Abattement spécifique cumulable avec l'abattement principal. |

## Repères francophones et pièges courants à éviter

1. **Rappel fiscal des donations de moins de 15 ans** : en France, les donations antérieures réalisées au cours des quinze dernières années amputent déjà l'abattement de $100\,000\text{ €}$ et les tranches basses du barème.
2. **Abattement de 20 % sur la résidence principale** : il s'applique sur la valeur vénale du logement si celui-ci est occupé au jour du décès par le conjoint, le partenaire pacsé ou un enfant mineur ou protégé.
3. **Spécificités hors France** : en Belgique, les droits sont régionaux (plafonds de $27\text{ \%}$ à $30\text{ \%}$ en ligne directe) ; en Suisse, la fiscalité cantonale exonère presque toujours conjoints et descendants ; au Canada et au Québec, il n'y a pas de droits de succession mais un impôt sur le gain en capital issu de la disposition présumée au décès.
4. **Forfait mobilier et valeur vénale** : l'administration fiscale évalue l'immobilier au prix du marché au jour du décès et applique par défaut un forfait mobilier de $5\text{ \%}$ sans inventaire notarié.
5. **Démembrement anticipé** : donner la nue-propriété de son vivant (barème de l'article 669 du CGI) réduit la base taxable tout en conservant l'usufruit jusqu'au décès.
