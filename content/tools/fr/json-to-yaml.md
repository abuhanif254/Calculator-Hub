---
metaTitle: "Convertisseur JSON vers YAML en ligne — YAML 1.2 & DevOps"
metaDescription: "Convertissez vos objets JSON en YAML 1.2 propre directement dans votre navigateur. Protection contre le piège Norway, manifests Kubernetes, Docker et OpenAPI."
metaKeywords: "json vers yaml, convertisseur json yaml, yaml 1.2, norway problem yaml, kubernetes manifest yaml, docker compose, github actions, openapi"
title: "Convertisseur JSON vers YAML"
shortDescription: "Convertissez instantanément vos structures JSON en YAML 1.2 propre et déterministe pour vos manifestes Kubernetes, Docker Compose, GitHub Actions et schémas OpenAPI."
faqs:
  - question: "Est-il sûr de convertir des secrets ou configurations Kubernetes dans cet outil ?"
    answer: "Oui. La conversion JSON vers YAML s'exécute à 100 % côté client dans votre navigateur. Aucune donnée de configuration, clé API ou variable d'environnement n'est envoyée sur Internet."
  - question: "Qu'est-ce que le « Norway problem » en YAML et comment l'outil l'évite-t-il ?"
    answer: "En YAML 1.1, des chaînes non entourées de guillemets comme NO (code pays de la Norvège), yes ou off étaient implicitement converties en booléen false. Notre sérialiseur suit YAML 1.2 et place des guillemets de sécurité sur ces valeurs ambiguës pour garantir la rétrocompatibilité."
  - question: "Pourquoi le mot-clé on de GitHub Actions pose-t-il parfois problème ?"
    answer: "Dans les anciens analyseurs YAML 1.1, la clé on était interprétée comme le booléen true plutôt que comme la chaîne 'on'. En mettant systématiquement cette clé entre guillemets ou en ciblant YAML 1.2, les workflows GitHub Actions restent valides."
  - question: "YAML 1.2 est-il entièrement compatible avec JSON ?"
    answer: "Oui. Depuis la révision YAML 1.2, tout document JSON valide est techniquement un document YAML 1.2 valide. La conversion inverse reste donc fiable tant que vous évitez les ancres complexes ou les types non standard."
  - question: "Comment sont gérées les chaînes JSON contenant plusieurs lignes ?"
    answer: "Les chaînes comportant des retours à la ligne (\\n) peuvent être formatées en bloc littéral YAML grâce au symbole pipe (|), ce qui rend les scripts shell intégrés ou les certificats beaucoup plus lisibles."
features:
  - "Sérialisation conforme à YAML 1.2 avec protection active contre les ambiguïtés YAML 1.1"
  - "Formatage lisible par blocs littéraux (|) pour les scripts et textes multi-lignes"
  - "Indentation configurable (2 ou 4 espaces) adaptée aux standards Kubernetes et Ansible"
  - "Gestion stricte des chaînes numériques, codes pays et mots-clés réservés"
  - "Exécution 100 % locale dans le navigateur sans aucune transmission réseau"
useCases:
  - "Transformer une réponse d'API Kubernetes JSON en manifeste YAML prêt pour kubectl apply"
  - "Convertir une spécification OpenAPI 3.1 JSON en fichier YAML lisible par votre équipe"
  - "Générer des fichiers Docker Compose ou Helm values.yaml à partir de configurations JSON"
  - "Rédiger ou déboguer des workflows GitHub Actions ou GitLab CI issus de générateurs JSON"
  - "Assainir des configurations CloudFormation ou Terraform CDK vers un format YAML homogène"
howToSteps:
  - "Collez votre document JSON valide (objet ou tableau) dans le panneau de gauche."
  - "Sélectionnez la largeur d'indentation souhaitée (2 espaces par défaut pour Kubernetes et OpenAPI)."
  - "Laissez le moteur appliquer automatiquement les guillemets sur les scalaires sensibles."
  - "Copiez le résultat YAML généré ou téléchargez le fichier pour votre dépôt Git."
---

Dans l'écosystème DevOps moderne, JSON demeure le format d'échange privilégié des API et des outils programmatiques, tandis que YAML s'est imposé pour l'écriture et la relecture humaine des manifestes Kubernetes, fichiers Docker Compose, pipelines GitHub Actions et contrats OpenAPI. Notre convertisseur JSON vers YAML réalise cette transformation intégralement côté client dans votre navigateur, sans aucun envoi vers un serveur externe. Vos manifestes d'infrastructure, variables d'environnement et schémas internes restent strictement confidentiels.

Bien que la spécification YAML 1.2 ait été conçue comme un sur-ensemble strict de JSON, passer d'un format à l'autre sans précaution expose les équipes à des régressions silencieuses liées aux différences historiques entre YAML 1.1 et YAML 1.2.

## Spécification YAML 1.2 contre YAML 1.1 et le « Norway problem »

Le principal piège de YAML provient de l'héritage de la version 1.1, toujours utilisée par de nombreux parseurs historiques en Python (`PyYAML`), Go ou Ruby. En YAML 1.1, l'inférence implicite des types considérait plus d'une vingtaine de mots anglais sans guillemets comme des booléens : `y`, `yes`, `n`, `no`, `on`, `off`, `true`, `false`.

C'est ce mécanisme qui a donné naissance au célèbre **« Norway problem »** : dans une liste de codes pays ISO (`FR`, `DE`, `NO`, `ES`), la valeur `NO` pour la Norvège était silencieusement évaluée comme le booléen `false` par un analyseur YAML 1.1 ! Le même problème frappe la clé racine `on:` des workflows GitHub Actions ou les numéros de version comme `"3.10"` qui, sans guillemets, deviennent le flottant `3.1`.

La spécification **YAML 1.2** (Core Schema) corrige ces dérives en limitant les booléens strictement à `true` et `false` et en supprimant les entiers sexagésimaux (`12:30` n'est plus converti en minutes). Toutefois, comme vos manifestes peuvent être lus par des outils hétérogènes, notre convertisseur applique un **échappement défensif** : toute chaîne ressemblant à un mot-clé YAML 1.1 (`no`, `yes`, `on`, `off`), à un nombre, à une date ou à un identifiant ambigu est automatiquement protégée entre guillemets.

## Exemple pas à pas : du manifeste JSON au déploiement Kubernetes et CI/CD

Imaginons un fichier JSON généré par un script d'automatisation décrivant un workflow de déploiement avec des codes pays cibles, une version de runtime et un script multi-ligne :

```json
{
  "name": "Deploiement API Europe",
  "on": "push",
  "env": {
    "PYTHON_VERSION": "3.10",
    "DEFAULT_COUNTRY": "NO",
    "LOG_LEVEL": "off"
  },
  "run": "#!/bin/sh\necho \"Démarrage\"\nkubectl apply -f ./k8s\n"
}
```

Un sérialiseur prudent conforme à YAML 1.2 produit une sortie propre, lisible et immunisée contre les pièges des analyseurs legacy :

```yaml
name: Deploiement API Europe
"on": push
env:
  PYTHON_VERSION: "3.10"
  DEFAULT_COUNTRY: "NO"
  LOG_LEVEL: "off"
run: |
  #!/bin/sh
  echo "Démarrage"
  kubectl apply -f ./k8s
```

Remarquez comment `"3.10"`, `"NO"`, `"off"` et la clé `"on"` conservent des guillemets protecteurs, préservant leur type `string` même si le consommateur final repose sur un parseur YAML 1.1. Parallèlement, la propriété `run` bascule automatiquement en bloc scalaire littéral (`|`), rendant le script shell directement éditable sans caractères `\n` ni guillemets superflus.

## Tableau comparatif des règles de sérialisation YAML 1.1 vs 1.2

Ce tableau récapitule les différences critiques lors du passage de JSON vers YAML :

| Valeur source JSON | Interprétation YAML 1.1 (non quoté) | Interprétation YAML 1.2 (Core) | Stratégie de sortie recommandée |
| :--- | :--- | :--- | :--- |
| `"NO"` / `"no"` | Booléen `false` (Norway problem) | Chaîne `"NO"` | Forcer les guillemets (`"NO"`) |
| `"on"` / `"off"` | Booléen `true` / `false` | Chaîne `"on"` / `"off"` | Forcer les guillemets (`"on"`) |
| `"3.10"` | Flottant `3.1` si non quoté | Flottant `3.1` si non quoté | Conserver `"3.10"` entre guillemets |
| `"0123"` | Octal `83` en YAML 1.1 | Entier `123` ou chaîne | Citer explicitement `"0123"` |
| `"12:30"` | Entier sexagésimal `750` | Chaîne `"12:30"` | Citer pour compatibilité Ansible/legacy |
| `"ligne1\nligne2"` | Chaîne échappée ou bloc | Bloc littéral (pipe `\|`) | Utiliser le style bloc pour améliorer la lisibilité |
| `null` | `null`, `~` ou valeur vide | `null` | Écrire explicitement `null` |

## Pièges en production, sécurité et bonnes pratiques DevOps

La manipulation de fichiers YAML en production impose plusieurs règles d'hygiène logicielle pour éviter pannes de déploiement et failles de sécurité :

- **Troncature silencieuse des versions** : dans Docker Compose ou GitHub Actions, écrire `node-version: 20.0` ou `python-version: 3.10` sans guillemets transforme la valeur en nombre flottant `20` ou `3.1`, provoquant l'échec du téléchargement de l'image ou du runtime. Conservez toujours les guillemets autour des numéros de version sémantiques.
- **Tabulations interdites** : la grammaire YAML interdit strictement l'utilisation du caractère tabulation (`\t`) pour l'indentation structurelle. Utilisez invariablement 2 espaces (standard Kubernetes, Helm, OpenAPI) ou 4 espaces de façon homogène.
- **Sécurité des désérialiseurs côté serveur** : bien que la conversion JSON vers YAML dans le navigateur soit parfaitement sûre, les services backend qui rechargent ensuite ces fichiers YAML doivent proscrire les fonctions de chargement non sécurisées (comme `yaml.load()` sans `SafeLoader` en Python). Ces dernières autorisent parfois l'instanciation de classes arbitraires ou subissent des attaques par déni de service (« Billion Laughs » via l'expansion récursive d'ancres YAML `&` et `*`).
- **Clés dupliquées** : la norme JSON tolère techniquement les clés répétées dans certains analyseurs, mais YAML 1.2 les interdit. Assurez-vous toujours que votre JSON source ne contient pas de doublons avant d'exporter vos manifestes d'infrastructure.
- **Lisibilité des flux hybrides (flow vs block style)** : si YAML accepte la syntaxe en ligne héritée de JSON (`{ port: 8080, tls: true }`), l'usage idiomatique en DevOps privilégie le style bloc indenté pour faciliter les revues de code dans Git (`git diff`). Notre convertisseur privilégie donc systématiquement le style bloc structuré tout en conservant des listes compactes et prévisibles pour vos pipelines d'intégration continue.
