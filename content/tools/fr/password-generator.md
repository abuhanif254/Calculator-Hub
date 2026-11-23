---
metaTitle: "Générateur de Mots de Passe Forts | Entropie & Diceware"
metaDescription: "Créez des mots de passe cryptographiques via Web Crypto CSPRNG et des phrases secrètes Diceware. Calcul d'entropie en bits, 100 % côté client."
metaKeywords: "générateur mot de passe sécurisé, web crypto csprng, calcul entropie bits, phrase secrète diceware eff, mot de passe fort anssi nist, mot de passe wifi, générateur local gratuit"
title: "Générateur de Mots de Passe Avancé"
shortDescription: "Générez des mots de passe cryptographiques et des phrases secrètes Diceware à haute entropie grâce à la Web Crypto API, exécutée à 100 % dans votre navigateur."
faqs:
  - question: "Pourquoi Math.random() est-il dangereux pour générer un mot de passe ?"
    answer: "Math.random() repose sur un générateur pseudo-aléatoire rapide (comme xorshift128+ dans V8) conçu pour l'animation ou les jeux, pas pour la cryptographie. Son état interne peut être reconstruit après quelques observations. Notre outil utilise exclusivement window.crypto.getRandomValues(), adossé au CSPRNG du système d'exploitation."
  - question: "Qu'est-ce que le biais modulo et comment l'évitez-vous ?"
    answer: "Convertir un octet aléatoire (0 à 255) par un simple reste modulo sur un alphabet de 62 ou 94 caractères rend les premiers symboles légèrement plus probables que les derniers. L'échantillonnage par rejet (rejection sampling) écarte les valeurs dépassant le plus grand multiple exact de la taille de l'alphabet, garantissant une distribution uniforme parfaite."
  - question: "Vaut-il mieux un mot de passe aléatoire de 16 caractères ou une phrase secrète Diceware ?"
    answer: "Les deux atteignent une excellente sécurité, mais pour des usages distincts. Un mot de passe aléatoire de 16 à 24 caractères (stocké dans un gestionnaire comme Bitwarden ou KeePassXC) convient aux comptes web. Une phrase secrète Diceware de 6 mots EFF (~77,5 bits) est idéale pour un mot de passe maître ou le chiffrement de disque devant être saisi de mémoire."
  - question: "Combien de bits d'entropie sont recommandés par l'ANSSI et le NIST ?"
    answer: "Pour résister aux attaques hors ligne sur des bases de hachages modernes, visez au moins 80 bits d'entropie pour les comptes standards et 100 à 128 bits pour un mot de passe maître, un coffre-fort ou une clé d'API. L'ANSSI et le NIST SP 800-63B privilégient toujours la longueur à des règles de complexité arbitraires."
  - question: "Mes mots de passe générés sont-ils enregistrés sur un serveur ou transmis en réseau ?"
    answer: "Non. L'intégralité de la génération, du calcul d'entropie et de l'affichage QR code Wi-Fi s'effectue localement dans la mémoire de votre navigateur. L'historique temporaire reste strictement local et peut être purgé en un clic."
features:
  - "Génération cryptographiquement sûre via Web Crypto API (crypto.getRandomValues) sans biais modulo"
  - "Longueur ajustable jusqu'à 128 caractères avec contrôle granulaire des classes (majuscules, minuscules, chiffres, symboles)"
  - "Mode phrase secrète Diceware haute entropie fondé sur des tirages uniformes indépendants"
  - "Filtre d'exclusion des caractères visuellement ambigus (0, O, 1, l, I) pour clés Wi-Fi et saisies mobiles"
  - "Calcul mathématique en temps réel de l'entropie de Shannon en bits et estimation de résistance hors ligne"
  - "Exécution 100 % côté client sans serveur, avec partage local en QR code et copie presse-papiers sécurisée"
useCases:
  - "Création d'un mot de passe maître mémorisable de 6 ou 7 mots Diceware pour Bitwarden, 1Password ou KeePassXC"
  - "Génération de secrets uniques de 20 à 32 caractères pour comptes bancaires, messageries et consoles cloud"
  - "Définition de clés Wi-Fi WPA2/WPA3-SAE lisibles sans caractères ambigus pour bureaux et domiciles"
  - "Production de jetons d'API, secrets de webhooks HMAC et mots de passe de bases de données PostgreSQL/Redis"
  - "Mise en conformité avec les politiques de sécurité ANSSI et NIST SP 800-63B au sein d'une équipe IT"
  - "Renouvellement rapide d'identifiants compromis après une alerte de fuite de données (credential stuffing)"
howToSteps:
  - "Sélectionnez le mode adapté à votre besoin : mot de passe aléatoire complet ou phrase secrète Diceware."
  - "Réglez la longueur souhaitée (au moins 16 caractères aléatoires ou 6 mots pour un mot de passe maître)."
  - "Activez les jeux de caractères compatibles avec le service cible et cochez l'exclusion des caractères ambigus si nécessaire."
  - "Vérifiez l'indicateur d'entropie en bits afin d'atteindre au minimum 80 bits (ou 100+ bits pour les accès critiques)."
  - "Copiez le secret directement dans votre gestionnaire de mots de passe ou affichez le QR code local pour mobile."
  - "Effacez l'historique de session une fois le mot de passe enregistré dans votre coffre-fort."
---

La sécurité d'un identifiant ne dépend ni de substitutions prévisibles (`P@ssw0rd2026!`) ni de l'imagination humaine — notoirement biaisée et facilement modélisée par les dictionnaires modernes — mais d'une seule grandeur mathématique : l'**entropie**. Notre **Générateur de Mots de Passe Avancé** combine l'interface cryptographique native de votre navigateur (**Web Crypto API**), l'échantillonnage sans biais et les phrases secrètes **Diceware** pour produire des secrets mathématiquement imprévisibles, sans qu'aucun caractère ne transite par un serveur.

## Cryptographie côté client : CSPRNG et élimination du biais modulo

Les navigateurs modernes exposent `window.crypto.getRandomValues()`, qui puise directement dans le générateur cryptographique du système d'exploitation (**CSPRNG** : `getrandom()` sous Linux, `BCryptGenRandom` sous Windows, `SecRandomCopyBytes` sous macOS). À l'opposé, `Math.random()` emploie un PRNG non cryptographique (`xorshift128+` dans V8) totalement inadapté à la génération de secrets.

Toutefois, appeler un CSPRNG ne suffit pas si l'on projette naïvement un entier aléatoire de 8 bits (0 à 255) sur un alphabet de $N$ caractères via `octet % N`. Comme 256 n'est divisible ni par 62 (alphanumérique) ni par 94 (ASCII imprimable), les premiers caractères de l'alphabet sortiraient plus souvent : c'est le **biais modulo**. Pour garantir une loi strictement uniforme, une implémentation rigoureuse applique l'**échantillonnage par rejet** (*rejection sampling*) :

```javascript
function genererMotDePasseUniforme(longueur, alphabet) {
  const n = alphabet.length;
  const borneMax = Math.floor(256 / n) * n; // Élimine le biais modulo
  const resultat = [];
  const tampon = new Uint8Array(longueur * 2);

  while (resultat.length < longueur) {
    window.crypto.getRandomValues(tampon);
    for (let i = 0; i < tampon.length && resultat.length < longueur; i++) {
      if (tampon[i] < borneMax) {
        resultat.push(alphabet[tampon[i] % n]);
      }
    }
  }
  return resultat.join("");
}
```

## Calcul de l'entropie en bits et méthode Diceware

Pour un mot de passe de longueur $L$ dont chaque caractère est tiré indépendamment et uniformément dans un alphabet de taille $N$, l'entropie de Shannon vaut :

$$H = L \times \log_2(N)$$

Pour une **phrase secrète Diceware** tirée dans la liste longue de l'EFF ($W = 7\,776 = 6^5$ mots sans ambiguïté), chaque mot apporte exactement $\log_2(7\,776) \approx 12{,}925\text{ bits}$.

| Configuration de secret | Taille du pool ($N$ ou $W$) | Longueur | Entropie exacte | Résistance hors ligne & usage conseillé |
| :--- | :---: | :---: | :---: | :--- |
| **PIN numérique** | 10 chiffres | 6 chiffres | 19,9 bits | Faible hors ligne ; uniquement avec blocage matériel |
| **Alphanumérique sans ambigus** | 57 caractères | 14 car. | 81,7 bits | Bon compromis pour clés Wi-Fi WPA2/WPA3 saisies à la main |
| **ASCII imprimable complet** | 94 caractères | 16 car. | 104,9 bits | Excellent standard pour comptes web et cloud |
| **ASCII imprimable étendu** | 94 caractères | 24 car. | 157,3 bits | Clés API, secrets inter-services et coffres-forts critiques |
| **Diceware EFF (5 mots)** | 7 776 mots | 5 mots | 64,6 bits | Acceptable avec MFA actif et KDF lent |
| **Diceware EFF (6 mots)** | 7 776 mots | 6 mots | 77,5 bits | Très bon mot de passe maître mémorisable (Bitwarden, FileVault) |
| **Diceware EFF (7 mots)** | 7 776 mots | 7 mots | 90,5 bits | Sécurité long terme pour chiffrement de disque ou clés PGP |

### Attaques hors ligne, fonctions KDF et recommandations ANSSI / NIST

La résistance réelle d'un mot de passe lors d'une fuite de base de données dépend autant de son entropie que de la fonction de dérivation de clé (**KDF**) choisie par le service. Un hachage rapide non salé (MD5 ou SHA-256 brut) se teste à plus de $10^{11}$ candidats par seconde sur un cluster de GPU modernes : un secret de 55 bits tombe en quelques heures. À l'inverse, une KDF gourmande en mémoire comme **Argon2id** (64 Mio de RAM par essai) ou **scrypt** plafonne autour de $10^3$ à $10^4$ tentatives par seconde par GPU, protégeant durablement les secrets dès 75 à 80 bits. Pour les protocoles où le coût de dérivation reste fixe — par exemple une clé **Wi-Fi WPA2-PSK** (PBKDF2-HMAC-SHA1 à 4 096 itérations) ou un jeton d'API vérifié directement — viser **100 à 128 bits** offre une marge de sécurité pérenne.

Conformément aux guides **ANSSI** et **NIST SP 800-63B** :

1. **Privilégiez la longueur à la complexité forcée** : un mot de passe aléatoire de 20 lettres minuscules (94 bits) surpasse largement un mot de passe humain de 10 caractères mêlant symboles prévisibles.
2. **Ne réutilisez jamais un identifiant** : l'unicité par service neutralise les attaques par *credential stuffing* et les bases de fuites vérifiables par *k-anonymat* (préfixe de hachage SHA-1).
3. **Évitez les rotations calendaires arbitraires** : changer un mot de passe fort tous les 90 jours sans compromission avérée pousse à des variantes incrémentales plus faibles.

## Dépannage et outils cryptographiques associés

Si un portail bancaire ou un équipement réseau ancien rejette certains symboles (`"`, `\`, `;`, `<`), désactivez les caractères spéciaux problématiques et compensez en augmentant la longueur de 3 à 4 caractères afin de conserver une entropie équivalente. Sur mobile ou pour un accès Wi-Fi invité, l'option d'exclusion des caractères ambigus (`0/O`, `1/l/I`) évite les erreurs de saisie, et notre [Générateur de QR Codes Studio](/fr/outils/qr-code-studio) permet d'imprimer directement une carte Wi-Fi scannable.

Pour compléter vos workflows de sécurité en local, explorez également le [Générateur de Mots de Passe Forts](/fr/outils/strong-password-generator), le [Générateur de Chaînes Aléatoires](/fr/outils/random-string-generator), le [Générateur d'UUID](/fr/outils/uuid-generator), le [Générateur de Hachages](/fr/outils/hash-generator), le [Générateur SHA-256](/fr/outils/sha256-generator) et le [Générateur HMAC](/fr/outils/hmac-generator).
