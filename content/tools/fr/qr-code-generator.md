---
metaTitle: "Générateur de QR Code Gratuit | SVG, PNG, Logo, WiFi"
metaDescription: "Créez des QR codes personnalisés en SVG vectoriel ou PNG HD avec logo, couleurs et correction Reed-Solomon pour URL, WiFi, vCard et SMS, 100 % hors ligne."
metaKeywords: "générateur qr code, créer qr code svg, qr code avec logo, qr code wifi, qr code vcard, correction erreur reed-solomon, norme iso 18004, zone silencieuse quiet zone, qr code haute résolution"
title: "Générateur de Codes QR & Design"
shortDescription: "Générez instantanément des QR codes personnalisés en vectoriel SVG ou PNG haute définition pour URL, WiFi, vCard, SMS et paiements, avec logo, couleurs et traitement 100 % local."
faqs:
  - question: "Pourquoi faut-il choisir le niveau de correction H lorsqu'on ajoute un logo au centre ?"
    answer: "Un logo masque physiquement une portion des modules de données au centre de la matrice. La correction d'erreurs Reed-Solomon au niveau H (30 % de redondance) permet au scanner de traiter ce logo comme une zone endommagée et de reconstruire mathématiquement l'intégralité du message sans erreur."
  - question: "Faut-il télécharger le QR code en SVG ou en PNG pour l'impression papier ?"
    answer: "Privilégiez toujours le format vectoriel SVG pour l'imprimerie (cartes de visite, flyers, affiches, packagings). Un SVG conserve des arêtes parfaitement nettes à n'importe quelle échelle et se convertit facilement en CMJN dans Illustrator ou InDesign, tandis qu'un PNG redimensionné introduit du flou d'anticrénelage."
  - question: "Mes mots de passe WiFi et mes fiches vCard sont-ils envoyés sur un serveur ?"
    answer: "Non. L'encodage de la matrice et le rendu graphique (Canvas/SVG) s'exécutent entièrement côté client dans votre navigateur. Vos identifiants WiFi, numéros de téléphone et adresses personnelles ne transitent jamais sur Internet."
  - question: "Pourquoi un QR code personnalisé avec des couleurs inversées refuse-t-il parfois de se scanner ?"
    answer: "La norme ISO/IEC 18004 suppose des modules sombres sur un fond clair afin de garantir un contraste de luminance élevé. Un code clair sur fond sombre (inversé), un faible contraste (jaune sur blanc) ou l'absence de zone silencieuse (marge de 4 modules) font échouer de nombreux lecteurs mobiles."
  - question: "Quelle est la taille minimale d'impression pour un QR code fiable ?"
    answer: "Appliquez la règle empirique d'un rapport 1:10 entre la largeur du code et la distance de lecture : au moins 2 cm x 2 cm sur une carte de visite scannée à 20 cm, et 10 cm x 10 cm sur une affiche consultée à 1 mètre, en réduisant au maximum la longueur de l'URL encodée."
features:
  - "Génération 100 % côté client sans serveur pour garantir la confidentialité des réseaux WiFi et vCards."
  - "Prise en charge complète des payloads normalisés : URL, WiFi (WPA/WPA2/WPA3), vCard 3.0, SMS, e-mail, géolocalisation et crypto."
  - "Réglage fin des 4 niveaux de correction d'erreurs Reed-Solomon (L, M, Q, H) avec aperçu temps réel."
  - "Personnalisation graphique avancée : formes de modules, coins arrondis, couleurs unies ou dégradés et insertion de logo."
  - "Exportation vectorielle SVG sans perte pour l'imprimerie et export PNG haute résolution pour le Web et les écrans."
  - "Respect automatique de la Zone Silencieuse (Quiet Zone) de 4 modules pour assurer une lecture instantanée sur iOS et Android."
useCases:
  - "Partager un accès WiFi invité dans un bureau, un hôtel ou un restaurant sans dicter une clé WPA complexe."
  - "Imprimer une carte de visite papier intégrant une fiche vCard 3.0 enregistrable en un geste dans le carnet d'adresses."
  - "Créer des supports marketing (affiches, emballages, menus) portant un QR code vectoriel SVG avec le logo de la marque."
  - "Générer des liens de paiement, factures ou adresses de portefeuille sans risque d'erreur de saisie manuelle."
  - "Produire en lot des étiquettes d'inventaire, billets d'événements ou badges d'accès lisibles même légèrement rayés."
  - "Rediriger les visiteurs d'un salon professionnel vers une page de liens centralisée ou un formulaire de contact mobile."
howToSteps:
  - "Sélectionnez le type de contenu souhaité (URL, WiFi, vCard, e-mail, SMS ou coordonnées GPS) et saisissez vos champs."
  - "Réglez le niveau de correction d'erreurs Reed-Solomon : choisissez M par défaut, ou impérativement H si vous ajoutez un logo."
  - "Personnalisez la palette de couleurs en maintenant un fort contraste (motif foncé sur fond clair) et ajustez le style des modules."
  - "Importez votre logo central en veillant à ce qu'il ne couvre pas plus de 20 à 25 % de la surface totale du code."
  - "Testez la lecture en temps réel directement avec l'appareil photo de votre smartphone avant l'export final."
  - "Téléchargez le fichier en SVG vectoriel pour vos supports imprimés ou en PNG haute résolution pour le numérique."
---

Inventé par Denso Wave en 1994 et normalisé par le standard international **ISO/IEC 18004**, le **QR Code** (*Quick Response Code*) est un code-barres matriciel bidimensionnel capable d'encoder des données binaires et textuelles sur les deux axes, puis de les décoder en quelques millisecondes sous n'importe quel angle. Concevoir un QR code esthétique — coloré, doté d'un logo ou imprimé sur un packaging — exige toutefois de respecter son architecture mathématique afin de ne jamais compromettre sa lisibilité sur les capteurs photo iOS et Android.

## Anatomie de la norme ISO/IEC 18004 et modes d'encodage

Un QR code se compose d'une grille carrée de petits carrés élémentaires appelés **modules**. Sa dimension dépend de sa **Version** (de la Version 1 en `21 × 21` modules jusqu'à la Version 40 en `177 × 177` modules), calculée par la formule : `taille = 21 + 4 × (Version - 1)`. Plus les données encodées sont longues ou la redondance élevée, plus la version augmente et plus les modules deviennent fins et exigeants à imprimer.

L'encodeur choisit automatiquement le mode le plus compact parmi quatre jeux de caractères : **Numérique** (3,33 bits/chiffre, jusqu'à 7 089 chiffres), **Alphanumérique** (5,5 bits/caractère majuscule, jusqu'à 4 296 caractères), **Octet / UTF-8** (8 bits/octet, jusqu'à 2 953 octets) et **Kanji** (13 bits). Raccourcir une URL — ou l'assainir avec notre [Encodeur d'URL](/fr/outils/url-encoder) — abaisse immédiatement la version de la matrice et améliore la portée de lecture.

Chaque matrice intègre des zones structurelles immuables :

- **Motifs de repérage (*Finder Patterns*)** : les trois grands carrés 7×7 placés aux coins supérieur gauche, supérieur droit et inférieur gauche permettent au lecteur de localiser le code et de corriger sa rotation sur 360°.
- **Motifs de synchronisation (*Timing Patterns*)** et **d'alignement (*Alignment Patterns*)** : lignes alternées et repères internes (à partir de la Version 2) qui compensent la distorsion optique sur les surfaces courbes.
- **Masquage de données (*Data Masking*)** : l'encodeur teste 8 masques XOR prédéfinis et retient celui qui minimise les pénalités (grandes plages monochromes, faux motifs de repérage), équilibrant la densité visuelle.
- **Zone silencieuse (*Quiet Zone*)** : marge vierge obligatoire d'au moins **4 modules** tout autour du code ; sans elle, l'algorithme ne distingue plus les frontières de la matrice du graphisme environnant.

## Correction d'erreurs Reed-Solomon et intégration de logo

La robustesse d'un QR code provient des codes correcteurs **Reed-Solomon** calculés sur le corps fini `GF(256)`. Avant le tracé final, les octets de données sont divisés en blocs auxquels s'ajoutent des mots de code de parité capables de détecter et corriger des effacements localisés (rayure, pliure, tache ou logo central).

| Niveau ECC | Récupération maximale | Redondance relative | Capacité max V40 (Alphanum. / Octets) | Usage recommandé |
| :--- | :--- | :--- | :--- | :--- |
| **L** (*Low*) | Jusqu'à **7 %** | Minimale | 4 296 car. / 2 953 octets | Écrans numériques propres, URL très longues sans logo |
| **M** (*Medium*) | Jusqu'à **15 %** | Équilibrée | 3 391 car. / 2 331 octets | Standard polyvalent pour documents bureautiques et flyers |
| **Q** (*Quartile*) | Jusqu'à **25 %** | Élevée | 2 420 car. / 1 663 octets | Affiches extérieures, étiquettes logistiques et menus |
| **H** (*High*) | Jusqu'à **30 %** | Maximale | 1 852 car. / 1 273 octets | **Indispensable avec un logo central** ou milieux industriels |

Intégrer un logo revient mathématiquement à introduire un dommage contrôlé au centre du code. Même au niveau **H**, limitez l'emprise du logo (marge blanche incluse) à **20–25 %** de la surface afin de conserver une marge de sécurité pour les reflets d'éclairage et l'usure du papier.

### QR code statique contre QR code dynamique

Un **QR code statique**, tel que ceux produits localement par cet outil, encode directement la donnée finale (URL, identifiants WiFi, fiche vCard) dans la matrice : il ne dépend d'aucun serveur intermédiaire, n'expire jamais et ne nécessite aucun abonnement. Un **QR code dynamique** encode quant à lui une URL courte de redirection gérée par un serveur, ce qui réduit la densité de la matrice et permet de modifier la destination après impression, au prix d'une dépendance à l'hébergeur tiers.

## Syntaxes des payloads standardisés (WiFi, vCard, SMS)

Les lecteurs natifs iOS et Android reconnaissent des schémas textuels précis dès lors que les caractères spéciaux (`;`, `:`, `\`, `,`) sont correctement échappés :

```text
# Connexion automatique à un réseau WiFi WPA2/WPA3 (schéma ZXing)
WIFI:T:WPA;S:Bureau_Invite;P:MotDePasse\;2026!;H:false;;

# Carte de visite numérique vCard 3.0
BEGIN:VCARD
VERSION:3.0
N:Dupont;Claire;;;
FN:Claire Dupont
ORG:Studio Horizon
TEL;TYPE=CELL:+33612345678
EMAIL:claire@studio-horizon.fr
URL:https://studio-horizon.fr
END:VCARD

# Envoi de SMS pré-rempli et lien géographique
SMSTO:+33612345678:Bonjour, je souhaite recevoir la brochure.
geo:48.8566,2.3522
```

Parce que ce générateur exécute l'encodage à 100 % côté client, vos clés WiFi internes ou numéros privés ne quittent jamais votre poste. Si vous souhaitez renvoyer vers plusieurs profils sociaux depuis un seul QR code léger, combinez-le avec notre [Générateur de Page Bio-Link](/fr/outils/bio-link-page-generator).

## Exigences d'impression vectorielle et contraste optique

Deux règles conditionnent la fiabilité sur support physique :

1. **Contraste de luminance strict** : les algorithmes de binarisation des smartphones attendent des modules sombres sur fond clair. Vérifiez un ratio de contraste élevé (idéalement supérieur à 7:1) à l'aide de notre [Vérificateur de Contraste](/fr/outils/contrast-checker) et évitez les dégradés trop pâles sur les motifs de repérage.
2. **SVG pour l'impression, PNG pour le numérique** : exportez vos fichiers imprimés en **SVG** (que vous pouvez alléger avec notre [Optimiseur SVG](/fr/outils/svg-optimizer)) afin d'obtenir un tracé vectoriel net à 300 DPI ou sur bâche grand format, en respectant une taille minimale de `distance de scan / 10` (minimum `2 × 2 cm` sur carte de visite). Réservez le **PNG** haute définition aux pages web et présentations écran.
