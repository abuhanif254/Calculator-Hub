---
title: "Calculateur Louer vs. Acheter"
metaTitle: "Calculateur Louer ou Acheter : Rentabilité Immobilière"
description: "Comparez le coût réel à long terme de la location face à l'achat immobilier en intégrant les frais de notaire, la taxe foncière et le rendement de votre apport."
metaDescription: "Vaut-il mieux louer ou acheter sa résidence principale ? Calculez votre seuil de rentabilité avec frais de notaire, crédit immobilier et épargne placée."
metaKeywords: "calculateur louer ou acheter, louer vs acheter immobilier, seuil de rentabilité achat immobilier, frais de notaire amortissement, coût d'opportunité apport"
faqs:
  - question: "Combien d'années faut-il conserver un bien pour amortir l'achat par rapport à la location ?"
    answer: "En France dans l'immobilier ancien (où les droits de mutation ou frais de notaire représentent 7,5 % à 8 % du prix, auxquels s'ajoutent les frais de garantie bancaire), la durée minimale de détention pour que l'achat devienne plus rentable que la location se situe généralement entre 6 et 9 ans. Dans une grande métropole où les prix au mètre carré sont très élevés par rapport aux loyers (Paris, Lyon, Genève), ce seuil peut dépasser 12 à 15 ans."
  - question: "Pourquoi est-il trompeur de comparer uniquement son loyer à une mensualité de crédit ?"
    answer: "Le loyer constitue un coût maximal pour le locataire, tandis que la mensualité de crédit n'est que le point de départ pour le propriétaire. L'acheteur supporte en plus des coûts à fonds perdus que le locataire ne paie jamais : les droits de mutation à l'achat, les intérêts d'emprunt, l'assurance emprunteur, la taxe foncière, la quote-part propriétaire des charges de copropriété, les ravalements ou travaux de toiture et le manque à gagner sur l'apport personnel immobilisé."
  - question: "Qu'appelle-t-on le coût d'opportunité de l'apport personnel ?"
    answer: "Lorsque vous mobilisez 50 000 € d'épargne pour financer votre apport personnel et les frais de notaire, ce capital cesse de produire des intérêts ou des dividendes sur vos placements financiers (PEA, assurance-vie, obligations). Si le locataire conserve ces 50 000 € placés à 5 % net par an, son capital croît de 31 445 € en dix ans grâce aux intérêts composés : c'est ce gain renoncé par l'acheteur que mesure le coût d'opportunité."
  - question: "Quel est l'impact de l'achat dans le neuf (VEFA) sur le seuil de rentabilité ?"
    answer: "L'acquisition d'un logement neuf bénéficie de frais de notaire réduits (2 % à 3 % en France contre 7,5 % à 8 % dans l'ancien) et de performances énergétiques (DPE A ou B) limitant les travaux pendant dix ans. Toutefois, le prix au mètre carré du neuf intègre une surcote initiale de 15 % à 25 % par rapport à l'ancien : il faut donc vérifier que le prix de revente futur ne subira pas une décote lors de son passage sur le marché de seconde main."
  - question: "Comment la hausse des taux d'intérêt immobiliers déplace-t-elle l'arbitrage louer ou acheter ?"
    answer: "Chaque hausse de 1 point du taux d'intérêt nominal (par exemple de 2,5 % à 3,5 % sur 20 ans) augmente massivement la part des intérêts payés à la banque durant les premières années du tableau d'amortissement. Tant que les prix de vente immobiliers ne baissent pas proportionnellement pour compenser cette hausse des taux, la durée nécessaire pour rentabiliser l'achat s'allonge de 2 à 4 ans."
---

L'adage populaire selon lequel « payer un loyer revient à jeter de l'argent par les fenêtres » résiste rarement à une modélisation financière rigoureuse. Si le locataire verse un loyer à fonds perdus chaque mois, le propriétaire occupant supporte lui aussi d'importants **coûts irrécupérables** : frais d'acquisition (« frais de notaire » ou droits de mutation), intérêts bancaires, assurance emprunteur, taxe foncière, charges de copropriété non récupérables, travaux d'entretien et coût d'opportunité du capital immobilisé en apport. Arbitrer entre louer et acheter consiste à calculer au bout de combien d'années la capitalisation immobilière dépasse le patrimoine financier que le locataire aurait constitué en plaçant son apport et son économie mensuelle de trésorerie.

## La méthode des coûts irrécupérables : comparer achat et location à armes égales

Pour éviter de confondre **décaissement de trésorerie** et **appauvrissement réel**, l'analyse patrimoniale sépare chaque flux mensuel en deux composantes : l'épargne forcée (le remboursement du capital du prêt) et les charges définitivement consommées.

- **Ce que perd le locataire** : le **loyer hors charges récupérables**, révisé annuellement selon l'Indice de Référence des Loyers (IRL en France), l'indice santé en Belgique ou les grilles du Tribunal administratif du logement (TAL) au Québec.
- **Ce que perd le propriétaire occupant** :
  1. **Les frais de transaction** : droits d'enregistrement et émoluments notariés ($7,5\text{ \%}$ à $8\text{ \%}$ dans l'ancien en France, jusqu'à $12,5\text{ \%}$ en Belgique hors abattement, ou taxe de bienvenue au Québec), frais de dossier et garantie bancaire.
  2. **Le coût du financement** : intérêts du crédit immobilier et cotisations d'assurance emprunteur (TAEG), prépondérants durant le premier tiers du prêt.
  3. **La fiscalité locale et l'entretien structurel** : taxe foncière, charges de copropriété propriétaire (syndic, fonds de travaux, ravalement, toiture) et entretien courant ($1\text{ \%}$ de la valeur du bien par an).
  4. **Le coût d'opportunité financier** : revenus nets qu'auraient générés l'apport initial et les frais d'achat s'ils étaient restés investis sur des placements financiers.

## Modèle mathématique de la valeur nette patrimoniale à l'horizon $T$

Le calculateur projette en parallèle la valeur liquidative nette des deux stratégies au terme de chaque année $T$ :

### 1. Patrimoine net de l'acheteur à l'année $T$ ($W_{\text{Achat}}(T)$)
Il correspond à la valeur du bien revalorisé au taux annuel $g$, nette des frais de revente ($f_{\text{vente}}$) et diminuée du capital restant dû à la banque ($\text{CRD}_T$) :

$$W_{\text{Achat}}(T) = V_0(1 + g)^T(1 - f_{\text{vente}}) - \text{CRD}_T$$

Où le capital restant dû après $k = 12T$ mensualités sur un emprunt initial $L_0$ au taux mensuel $i$ sur $n$ mois vaut :

$$\text{CRD}_T = L_0 \times \frac{(1 + i)^n - (1 + i)^k}{(1 + i)^n - 1}$$

### 2. Patrimoine financier net du locataire à l'année $T$ ($W_{\text{Location}}(T)$)
Le locataire conserve son apport initial ($A_0$, incluant les frais de notaire économisés) placé au taux annuel net $r$, et investit chaque mois l'écart d'effort d'épargne ($\Delta E_t = \text{Décaissement Achat}_t - \text{Loyer}_t$) :

$$W_{\text{Location}}(T) = A_0(1 + r)^T + \sum_{t=1}^{12T} \Delta E_t \left(1 + \frac{r}{12}\right)^{12T - t}$$

Le **seuil de rentabilité** est atteint à l'année $T^*$ où le patrimoine immobilier net dépasse le portefeuille financier du locataire : $W_{\text{Achat}}(T^*) \ge W_{\text{Location}}(T^*)$.

## Simulation chiffrée : appartement de 300 000 € face à un loyer de 1 100 €/mois

Comparons un ménage hésitant entre louer un trois-pièces pour **1 100 €/mois** ou acheter un bien équivalent dans l'ancien à **300 000 €** :

- **Frais d'acquisition** : $7,80\text{ \%}$ de frais de notaire ($23\,400\text{ €}$) + $1\,600\text{ €}$ de frais bancaires = **$25\,000\text{ €}$** à fonds perdus (coût total de $325\,000\text{ €}$).
- **Financement** : apport personnel de **$55\,000\text{ €}$** et emprunt de **$270\,000\text{ €}$ sur 20 ans** ($240\text{ mois}$) au taux global de **$3,80\text{ \%}$**, soit une mensualité de **$1\,607,82\text{ €}$**.
- **Charges propriétaires** : taxe foncière ($125\text{ €/mois}$) + entretien et copropriété propriétaire ($250\text{ €/mois}$) = **$375,00\text{ €/mois}$**.
- **Effort mensuel total de l'acheteur** : $1\,607,82 + 375,00 = \mathbf{1\,982,82\text{ €/mois}}$, soit **$882,82\text{ €}$ de plus** que le loyer la première année.
- **Hypothèses** : revalorisation annuelle de l'immobilier et des loyers de **$2,00\text{ \%}$** ; rendement net de l'épargne du locataire de **$4,50\text{ \%}$** par an.

**Bilan patrimonial selon l'horizon de revente :**
- **Après 3 ans** : Le bien vaut $318\,362\text{ €}$ et le capital restant dû est de $241\,780\text{ €}$, laissant un capital net de **$76\,582\text{ €}$** à l'acheteur. Le locataire qui a placé ses $55\,000\text{ €}$ et épargné la différence mensuelle dispose de **$95\,140\text{ €}$** (achat perdant de **$18\,558\text{ €}$**).
- **Point de bascule à 7 ans et 8 mois** : L'amortissement du capital et la hausse du bien compensent les $25\,000\text{ €}$ de frais de notaire et les intérêts. Les deux patrimoines s'égalisent à **$142\,800\text{ €}$**.
- **Après 15 ans** : Le patrimoine net de l'acheteur atteint **$291\,400\text{ €}$** contre **$246\,900\text{ €}$** pour le locataire, soit un gain net de **$44\,500\text{ €}$** en faveur de l'achat.

## Durée minimale d'amortissement selon le marché immobilier

| Profil de Marché | Frais d'Acquisition | Ratio Prix / Loyer | Rendement Brut | Durée de Rentabilité |
| :--- | :--- | :--- | :--- | :--- |
| **Ville moyenne (France - Ancien)** | $7,5\text{ \%}$ à $8,0\text{ \%}$ | $15\text{ à }18\text{ ans}$ | $5,5\text{ \%}$ à $6,5\text{ \%}$ | **4,5 à 6,5 ans** |
| **Métropole tendue (Lyon, Bordeaux)** | $7,5\text{ \%}$ à $8,0\text{ \%}$ | $22\text{ à }26\text{ ans}$ | $3,8\text{ \%}$ à $4,5\text{ \%}$ | **7,5 à 10,5 ans** |
| **Hypercentre (Paris, Genève)** | $3,5\text{ \%}$ à $7,5\text{ \%}$ | $30\text{ à }35\text{ ans}$ | $2,8\text{ \%}$ à $3,3\text{ \%}$ | **12 à 16 ans** |
| **Québec / Canada (Résidentiel)** | $1,5\text{ \%}$ à $3,0\text{ \%}$ | $18\text{ à }23\text{ ans}$ | $4,3\text{ \%}$ à $5,5\text{ \%}$ | **3,5 à 5,5 ans** |

## Conseils pratiques pour trancher votre décision

- **Sécurisez votre horizon de détention à 6 ans** : Si une mobilité professionnelle ou familiale risque d'imposer une revente avant 6 ans, la location protège votre épargne contre l'érosion des frais de notaire.
- **Vérifiez votre discipline d'épargne** : La supériorité financière de la location à court terme suppose que le locataire place *effectivement* chaque mois l'écart de trésorerie ($882\text{ €}$ dans notre exemple). S'il le consomme, le crédit immobilier garde l'avantage décisif d'une épargne forcée.
