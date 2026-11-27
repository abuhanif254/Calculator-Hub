---
metaTitle: "Calculateur Chmod Linux : Permissions Unix Octal & Sécurité"
metaDescription: "Calculez vos permissions Unix rwx en octal et symbolique instantanément. Comprenez SSH 600, web 644/755 et évitez les risques critiques du chmod 777."
metaKeywords: "calculateur chmod, permissions linux, notation octale unix, rwx bitmask, chmod 644, chmod 755, chmod 600 ssh, sécurité chmod 777, umask posix"
title: "Calculateur de permissions Chmod Linux"
shortDescription: "Convertissez visuellement les droits Unix lecture, écriture et exécution entre notation octale (000–777) et notation symbolique (rwxr-xr-x). Idéal pour sécuriser vos serveurs Linux, clés SSH et déploiements web."
faqs:
  - question: "Comment fonctionne le calcul des permissions chmod en notation octale ?"
    answer: "Chaque groupe d'utilisateurs (propriétaire, groupe, autres) est représenté par un chiffre de 0 à 7. Ce chiffre correspond à la somme des bits de permission : 4 pour la lecture (r), 2 pour l'écriture (w) et 1 pour l'exécution (x). Par exemple, 755 signifie 4+2+1 (7) pour le propriétaire et 4+0+1 (5) pour le groupe et les autres."
  - question: "Pourquoi le client SSH refuse-t-il une clé privée si les droits ne sont pas à 600 ?"
    answer: "Par mesure de sécurité stricte imposée par OpenSSH, une clé privée (comme id_rsa ou id_ed25519) ne doit être lisible que par son propriétaire. Si le groupe ou les autres utilisateurs disposent d'un droit de lecture (par exemple 644), OpenSSH rejette la clé avec l'erreur 'UNPROTECTED PRIVATE KEY FILE' afin d'empêcher tout vol d'identifiant sur un système multi-utilisateurs."
  - question: "Quelle est la différence entre chmod 644 et chmod 755 sur un serveur web ?"
    answer: "Le mode 644 (rw-r--r--) s'applique aux fichiers statiques et scripts interprétés (HTML, CSS, images, PHP) : le propriétaire peut modifier le fichier tandis que le serveur web et les autres utilisateurs peuvent uniquement le lire. Le mode 755 (rwxr-xr-x) est indispensable pour les répertoires (le bit d'exécution permet de traverser le dossier) ainsi que pour les binaires ou scripts CGI exécutables."
  - question: "Pourquoi l'utilisation de chmod 777 est-elle dangereuse en production ?"
    answer: "La commande chmod 777 accorde les droits complets de lecture, d'écriture et d'exécution à absolument tous les utilisateurs et processus du système. Sur un serveur exposé sur Internet, une faille mineure dans un service tiers permet alors à un attaquant de modifier vos scripts, d'injecter des portes dérobées ou d'exfiltrer des fichiers de configuration sensibles."
  - question: "Mes commandes ou configurations serveur sont-elles envoyées à un serveur distant ?"
    answer: "Non. Ce calculateur s'exécute intégralement dans votre navigateur via JavaScript local. Aucun masque de permission, nom de fichier ou commande générée n'est transmis sur le réseau ni enregistré dans une base de données distante."
features:
  - "Conversion bidirectionnelle instantanée entre matrice interactive rwx, code octal à 3 ou 4 chiffres et chaîne symbolique POSIX"
  - "Prise en charge des bits spéciaux SetUID (4), SetGID (2) et Sticky Bit (1) pour les environnements multi-utilisateurs avancés"
  - "Génération prête à copier de la commande shell chmod avec option récursive (-R) et drapeaux sécurisés"
  - "Modèles rapides intégrés pour les cas courants : clé SSH (600), fichier web (644), répertoire ou script (755)"
  - "Exécution 100 % côté client sans aucune collecte de données ni dépendance réseau après chargement"
useCases:
  - "Vérifier et corriger les permissions d'une paire de clés SSH avant une connexion distante ou un déploiement CI/CD"
  - "Définir les droits exacts d'un répertoire applicatif Nginx, Apache ou Node.js lors d'une mise en production"
  - "Auditer rapidement des scripts de Dockerfile contenant des instructions RUN chmod afin d'éliminer les droits excessifs"
  - "Calculer l'effet d'un masque umask (022 ou 027) sur la création de nouveaux fichiers et répertoires sous Linux"
  - "Former les développeurs juniors et équipes DevOps à la lecture des masques binaires et symboliques ls -l"
howToSteps:
  - "Cochez les cases Lecture (r), Écriture (w) et Exécution (x) pour chaque catégorie : Propriétaire, Groupe et Autres."
  - "Ajustez éventuellement les bits spéciaux (SetUID, SetGID, Sticky Bit) si vous configurez des répertoires partagés ou binaires système."
  - "Saisissez directement un code octal (ex. 640) ou symbolique (ex. rw-r-----) pour inspecter instantanément sa décomposition bit par bit."
  - "Copiez la commande chmod générée et exécutez-la dans votre terminal ou intégrez-la dans votre script de déploiement."
---

La gestion rigoureuse des permissions du système de fichiers constitue l'une des premières lignes de défense de toute infrastructure Linux, BSD ou macOS. Notre calculateur `chmod` vous permet de traduire sans erreur vos matrices de droits entre les formats binaire, octal et symbolique, tout en visualisant immédiatement l'impact réel sur le propriétaire, le groupe et les autres utilisateurs du système. Que vous prépariez un `Dockerfile`, configuriez un serveur Nginx ou dépanniez une erreur d'accès SSH, cet outil élimine les approximations et les erreurs de calcul mental.

Sur le plan de la confidentialité, l'ensemble des calculs s'effectue à 100 % côté client, directement dans la mémoire de votre navigateur. Aucune donnée, aucun chemin de fichier ni aucune commande générée n'est envoyé vers un serveur externe : vous pouvez manipuler vos configurations d'infrastructure et politiques de sécurité internes en toute confiance, même hors ligne.

## Architecture POSIX et masques binaires octaux rwx

Sous les systèmes conformes à la norme POSIX (IEEE Std 1003.1), chaque nœud d'index (*inode*) stocke ses permissions d'accès sous la forme d'un champ de bits compact appelé *mode*. Les 9 bits de poids faible gouvernent le contrôle d'accès discrétionnaire (DAC) réparti en trois triades distinctes : le propriétaire (*User* ou `u`), le groupe (*Group* ou `g`) et les autres utilisateurs (*Others* ou `o`).

À l'intérieur de chaque triade, trois drapeaux binaires indépendants déterminent les opérations autorisées :

- **Bit 2 (poids `4`, symbole `r`)** : autorise la lecture du contenu d'un fichier ou le listage des entrées d'un répertoire via l'appel système `readdir()`.
- **Bit 1 (poids `2`, symbole `w`)** : autorise la modification ou la troncature d'un fichier, ainsi que la création, le renommage ou la suppression de fichiers dans un répertoire.
- **Bit 0 (poids `1`, symbole `x`)** : autorise l'exécution d'un fichier binaire ou d'un script par le noyau, et permet la traversée (*search*) d'un répertoire avec `cd` ou l'accès à ses inodes enfants.

La notation octale repose sur le regroupement naturel de ces trois bits en un seul chiffre compris entre `0` (`000` en binaire) et `7` (`111` en binaire). En additionnant les puissances de 2 actives (`4 + 2 + 1`), on obtient une représentation concise à trois chiffres. Par exemple, le motif binaire `111 101 101` correspond à `755` en octal et à `rwxr-xr-x` en notation symbolique. Un quatrième chiffre de tête facultatif encode les bits spéciaux : SetUID (`4`), SetGID (`2`) et Sticky Bit (`1`), formant un masque complet sur 12 bits (par exemple `1777` pour `/tmp`).

## Guide pratique : configuration d'un serveur web et SSH

Lors du déploiement d'une application web ou de la sécurisation d'un accès distant, les besoins diffèrent radicalement entre les secrets cryptographiques, les fichiers statiques et les répertoires applicatifs. Voici un scénario complet illustrant les bonnes pratiques sur un serveur Ubuntu ou Debian.

Commencez par sécuriser votre paire de clés SSH côté client et côté serveur. Le répertoire `.ssh` doit bloquer tout accès aux autres utilisateurs, tandis que la clé privée ne doit jamais être lisible en dehors de son propriétaire :

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 600 ~/.ssh/authorized_keys
```

Passons maintenant à la préparation d'une arborescence applicative sous `/var/www/mon-app`, servie par Nginx sous l'utilisateur `www-data`. Plutôt que d'appliquer un `chmod -R` aveugle qui rendrait vos fichiers CSS ou images inutilement exécutables, utilisez `find` pour cibler séparément les répertoires (`755`) et les fichiers (`644`) :

```bash
sudo chown -R deploy:www-data /var/www/mon-app
find /var/www/mon-app -type d -exec chmod 755 {} +
find /var/www/mon-app -type f -exec chmod 644 {} +
chmod 640 /var/www/mon-app/.env
```

Dans cet exemple, `.env` en mode `640` (`rw-r-----`) permet à l'utilisateur `deploy` de mettre à jour les variables, au groupe `www-data` de les lire, tout en interdisant strictement l'accès aux autres comptes locaux du serveur.

## Tableau de référence des permissions Unix courantes

Le tableau ci-dessous synthétise les masques octaux les plus utilisés en administration système et développement, accompagnés de leur représentation symbolique et de leur contexte d'application recommandé :

| Mode | Symbolique | Binaire | Usage recommandé |
| :--- | :--- | :--- | :--- |
| `600` | `-rw-------` | `110 000 000` | Clés privées SSH, certificats TLS |
| `640` | `-rw-r-----` | `110 100 000` | Fichiers `.env`, secrets applicatifs |
| `644` | `-rw-r--r--` | `110 100 100` | Fichiers statiques HTML, CSS, JS, images |
| `700` | `drwx------` | `111 000 000` | Dossier `~/.ssh`, répertoires privés |
| `750` | `drwxr-x---` | `111 101 000` | Dossiers web partagés avec un groupe |
| `755` | `drwxr-xr-x` | `111 101 101` | Dossiers publics, binaires exécutables |
| `1777` | `drwxrwxrwt` | `111 111 111` | Dossier `/tmp` avec Sticky Bit actif |

## Pièges en production : risques du chmod 777 et umask

Face à une erreur `Permission denied` urgente en production, certains réflexes conduisent à exécuter `chmod -R 777`. Cette pratique crée une vulnérabilité critique : sur un système partagé ou compromis via un service secondaire (un worker Redis, un conteneur mal isolé ou une faille PHP), n'importe quel processus non privilégié obtient le droit d'écraser vos binaires, d'altérer vos scripts de démarrage ou d'injecter du code arbitraire exécuté ensuite avec les privilèges du propriétaire. Par ailleurs, certains démons comme OpenSSH, `cron` ou `Postfix` refusent purement et simplement de fonctionner s'ils détectent des permissions trop permissives sur leurs fichiers de configuration.

Un autre piège fréquent concerne l'oubli du bit d'exécution (`x`) sur les répertoires. Attribuer `644` à un dossier bloque l'accès à tous les fichiers qu'il contient pour le groupe et les autres utilisateurs, même si ces fichiers possèdent eux-mêmes les droits `644` ou `755`. Inversement, l'exécution récursive de `chmod -R 755` sur un dépôt Git marque tous les fichiers texte comme exécutables, polluant inutilement votre historique de commits avec des changements de mode (`100644` vers `100755`).

Enfin, gardez un œil sur le masque `umask` actif dans vos conteneurs et sessions shell. Le `umask` soustrait des bits aux permissions par défaut (`666` pour les fichiers, `777` pour les répertoires). Un `umask 022` produit respectivement `644` et `755`, tandis qu'un `umask 027` plus restrictif génère `640` et `750`, offrant une posture de sécurité par défaut nettement supérieure pour vos journaux applicatifs et artefacts de compilation.
