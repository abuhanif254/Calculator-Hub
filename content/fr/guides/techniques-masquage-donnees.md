---
title: "Techniques de Masquage de Données : Hachage, Tokénisation et Caviardage"
description: "Comparatif d'ingénierie des méthodes de masquage de données : caviardage, hachage salé HMAC-SHA256, tokénisation par coffre, chiffrement préservant le format (FPE FF1) et généralisation k-anonymat."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "database-anonymizer"
relatedType: "tool"
faqs:
  - question: "Quelle est la différence entre le hachage salé (HMAC-SHA256) et la tokénisation ?"
    answer: "Le hachage salé HMAC-SHA256 est une transformation mathématique irréversible à sens unique qui produit toujours le même condensat pour une même entrée et une même clé secrète. La tokénisation remplace la donnée sensible par un jeton aléatoire ou cryptographique tout en conservant le lien vers la valeur d'origine dans un coffre sécurisé (vault) ou via une fonction réversible : elle est donc adaptée aux systèmes devant restaurer la donnée réelle."
  - question: "Quand faut-il privilégier le chiffrement préservant le format (FPE) par rapport à la substitution synthétique ?"
    answer: "Le chiffrement préservant le format (norme NIST SP 800-38G AES-FF1) s'impose lorsque des systèmes patrimoniaux, des index ou des expressions régulières exigent exactement la même longueur et le même alphabet (par exemple 16 chiffres pour un numéro de carte ou 10 chiffres pour un téléphone), tout en devant éventuellement déchiffrer la valeur ultérieurement avec la clé."
  - question: "Pourquoi un hachage SHA-256 sans sel est-il vulnérable pour des numéros de téléphone ou des adresses e-mail ?"
    answer: "L'espace des valeurs possibles pour un numéro de téléphone français (environ 10⁸ combinaisons utiles) ou une adresse e-mail courante est trop faible pour résister à une attaque par force brute ou par dictionnaire. Sans clé secrète (sel ou HMAC), un attaquant peut précalculer toutes les empreintes SHA-256 en quelques secondes sur un GPU grand public et inverser le hachage."
  - question: "Comment préserver l'intégrité référentielle des clés étrangères lors du masquage d'une base relationnelle ?"
    answer: "Il existe deux approches fiables : soit conserver intactes les clés primaires et étrangères lorsqu'elles sont de purs identifiants techniques (UUID ou entiers auto-incrémentés sans signification personnelle), soit appliquer une fonction de masquage déterministe identique (HMAC-SHA256 avec la même clé) à la clé primaire parente et à toutes les colonnes clés étrangères qui la référencent."
  - question: "Le caviardage partiel (par exemple les 4 derniers chiffres d'une carte bancaire) suffit-il pour anonymiser un jeu de données analytique ?"
    answer: "Pour la norme de sécurité bancaire PCI-DSS, l'affichage des 6 premiers et 4 derniers chiffres (ou uniquement les 4 derniers) est autorisé à des fins de support ou de facturation. En revanche, pour une anonymisation statistique au sens du RGPD, un caviardage partiel combiné à d'autres attributs (montant exact, date, code postal) peut rester ré-identifiant et doit être complété par une agrégation ou une suppression."
---

Le **masquage de données (*Data Masking*)** regroupe les transformations permettant d'altérer ou de remplacer des données sensibles tout en conservant un schéma exploitable pour les tests, l'analytique ou la formation. On distingue le **masquage statique (SDM)**, appliqué sur une copie avant sa livraison hors production, et le **masquage dynamique (DDM)**, qui filtre les colonnes à la volée selon le rôle de l'utilisateur lors d'une requête `SELECT`.

Le choix d'une technique dépend des contraintes du schéma : respect du format, index `UNIQUE`, intégrité référentielle (`FOREIGN KEY`) et besoin éventuel de réversibilité. Pour appliquer ces transformations sur des dumps SQL ou CSV sans transfert vers un serveur distant, notre [Outil d'Anonymisation de Base de Données](/fr/outils/database-anonymizer) exécute le masquage localement dans la mémoire vive de votre navigateur.

## Analyse technique des cinq grandes familles de masquage

### 1. Caviardage complet ou partiel (*Redaction*)

Le caviardage substitue une chaîne fixe aux caractères sensibles (`[MASQUÉ]`, `****-****-****-4242`). Irréversible, il supprime la valeur analytique du champ mais constitue le standard pour les journaux applicatifs, les tickets de support et les écrans conformes à PCI-DSS.

### 2. Hachage cryptographique à clé secrète (`HMAC-SHA256`)

Un condensat déterministe remplace l'identifiant par une empreinte hexadécimale fixe :

```text
Empreinte déterministe : H = HMAC_SHA256(clé_secrète_256bits, valeur_normalisée)
```

Deux entrées identiques générant exactement la même empreinte sous une même clé, les jointures SQL (`JOIN`) et agrégats (`COUNT(DISTINCT ...)`) restent exacts. Utilisez impérativement un **HMAC** à clé secrète plutôt qu'un `SHA-256` nu : l'espace limité des `10⁸` numéros de téléphone français se casse par force brute en quelques secondes sur GPU.

### 3. Tokénisation par coffre ou sans coffre

La tokénisation remplace la valeur réelle par un jeton aléatoire. En mode **à coffre (*vaulted*)**, une table isolée stocke la correspondance `jeton ↔ donnée`, autorisant une réversibilité contrôlée (paiements récurrents, facturation). Les architectures sans coffre utilisent des primitives cryptographiques pour éviter la latence d'une base centrale.

### 4. Chiffrement préservant le format (*FPE — AES-FF1*)

Normalisé par le **NIST SP 800-38G**, le mode **AES-FF1** chiffre une donnée en conservant exactement sa longueur et son alphabet (`16` chiffres restent `16` chiffres). L'ancien mode `FF3-1` ayant été déprécié par le NIST pour faiblesse cryptographique, seul `AES-FF1` avec un *tweak* adapté doit être déployé sur des schémas patrimoniaux rigides.

### 5. Substitution synthétique et généralisation (*k-anonymat*)

La **substitution synthétique** génère noms, adresses et e-mails fictifs mais syntaxiquement valides pour tester les formulaires applicatifs. La **généralisation** réduit la granularité des quasi-identifiants (tranches d'âge ou décalage temporel constant `± Δ jours` par individu) afin que chaque profil apparaisse au moins `k` fois (**k-anonymat**).

## Cas pratique pas à pas : masquer un schéma multi-tables sans casser les jointures

Considérons une base relationnelle de `10 000` clients répartie sur trois tables liées par clés étrangères : `utilisateurs` (`id_user`, `email`, `date_naissance`), `commandes` (`id_commande`, `id_user`, `date_commande`, `montant_ttc`) et `paiements` (`id_paiement`, `id_commande`, `carte_pan`). L'objectif est de produire un export SQL exploitable en pré-production sans aucune fuite de données réelles.

1. **Clés techniques (`id_user`, `id_commande`) :** s'agissant d'identifiants UUID v4 purement aléatoires sans aucune signification personnelle, ils sont conservés intacts. Toutes les jointures `commandes.id_user → utilisateurs.id_user` et `paiements.id_commande → commandes.id_commande` demeurent valides à `100 %`.
2. **Contrainte d'unicité (`utilisateurs.email`) :** on applique une substitution synthétique déterministe indexée par un condensat `HMAC-SHA256` tronqué (`client_<hex_12>@exemple.invalid`). Sur `10 000` lignes, la probabilité de collision reste inférieure à `10⁻¹⁰` et la syntaxe SMTP demeure valide pour tester les files d'envoi d'e-mails en bac à sable.
3. **Quasi-identifiants temporels :** `date_naissance` est généralisée par tranche quinquennale (`1985–1989`) afin d'obtenir un `k`-anonymat minimal de `k ≥ 5` par département, tandis que `date_commande` subit un décalage fixe propre à chaque utilisateur (`+14 jours` pour le client A), préservant les délais logistiques.
4. **Carte bancaire (`paiements.carte_pan`) :** caviardage partiel strict conforme PCI-DSS (`****-****-****-4242`) ne conservant que les `4` derniers chiffres pour valider l'affichage des reçus de paiement.

## Tableau comparatif des techniques de masquage

| Technique | Réversibilité | Format conservé | Jointures SQL | Statut RGPD typique | Cas d'usage idéal |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Caviardage partiel** | Irréversible | Partiel | Non | Anonymisation (si isolé) | Logs, support client, écrans PCI-DSS |
| **Hachage (`HMAC-SHA256`)** | Irréversible (clé détruite) | Non (hex) | Oui | Pseudonymisation | Dédoublonnage analytique, clés de jointure |
| **Tokénisation (coffre)** | Réversible | Configurable | Oui | Pseudonymisation | Paiements, séparation PII/métier |
| **FPE (`AES-FF1`)** | Réversible (avec clé) | Strict (`1:1`) | Oui | Pseudonymisation | Systèmes patrimoniaux à schémas figés |
| **Substitution synthétique** | Irréversible | Syntaxique | Oui (si déterministe) | Anonymisation | Recette logicielle, QA, démos |
| **Généralisation (`k`-anonymat)** | Irréversible | Agrégé | Sur agrégats | Anonymisation (si validée) | Statistiques publiques, recherche, IA |

## Erreurs critiques et compromis utilité-confidentialité

Masquer de façon non déterministe une colonne indexée ou liée par une contrainte de clé étrangère provoque immédiatement des échecs lors de l'import SQL ou des orphelins relationnels. À l'inverse, réutiliser une substitution déterministe reposant sur une clé statique figée dans le code source entre plusieurs environnements permet des attaques par corrélation croisée.

En `k`-anonymat, vérifiez systématiquement la **`l`-diversité** : si les `5` dossiers d'une même classe d'équivalence partagent exactement le même attribut sensible (même pathologie ou même salaire atypique), la confidentialité statistique est rompue. Enfin, pour garantir une anonymisation juridiquement irréversible au sens du RGPD, détruisez toujours les clés secrètes HMAC et les tables de correspondance temporaires dès la fin de la génération du jeu de données.
