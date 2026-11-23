---
metaTitle: "Formateur et Validateur YAML en Ligne | JSON & Kubernetes"
metaDescription: "Formatez, validez, minifiez et convertissez vos fichiers YAML 1.2 en JSON côté client. Idéal pour Kubernetes, Docker Compose et GitHub Actions."
metaKeywords: "formateur yaml, validateur yaml en ligne, embellisseur yaml, yaml vers json, json vers yaml, yaml 1.2, manifeste kubernetes yaml, linting yaml gratuit"
title: "Formateur et Embellisseur YAML"
shortDescription: "Formatez, validez, minifiez et convertissez instantanément vos fichiers YAML 1.2 en JSON côté client, avec prise en charge multi-documents Kubernetes et détection d'erreurs."
faqs:
  - question: "Pourquoi les tabulations provoquent-elles une erreur de syntaxe dans un fichier YAML ?"
    answer: "La spécification YAML interdit strictement le caractère de tabulation (U+0009) pour l'indentation afin de garantir une interprétation identique quel que soit l'éditeur. Seuls les espaces (conventionnellement 2 ou 4 espaces par niveau) sont autorisés pour structurer la hiérarchie."
  - question: "Qu'est-ce que le problème de la Norvège en YAML 1.1 par rapport à YAML 1.2 ?"
    answer: "En YAML 1.1, des chaînes non citées comme NO (code pays Norvège), yes, on ou off étaient automatiquement converties en booléens (false ou true). Le schéma Core de YAML 1.2 restreint les booléens à true/false et fait de YAML un surensemble strict de JSON."
  - question: "Le formateur gère-t-il les manifestes Kubernetes multi-documents séparés par --- ?"
    answer: "Oui. Le flux multi-documents délimité par les marqueurs de début (---) et de fin (...) est analysé document par document afin de formater et valider ensemble Deployments, Services, Ingresses et ConfigMaps sans fusionner leurs clés."
  - question: "Quelle est la différence entre les blocs scalaires |, |- et > en YAML ?"
    answer: "Le symbole | (littéral) conserve tous les retours à la ligne, idéal pour les scripts shell ou certificats PEM. Le symbole > (replié) fusionne les retours simples en espaces pour les paragraphes longs. Le suffixe - (chomping strip) supprime le saut de ligne final."
  - question: "Mes manifestes Kubernetes, secrets ou workflows CI/CD sont-ils transmis à un serveur ?"
    answer: "Non. L'analyse lexicale, la validation syntaxique, le diff côte à côte et la conversion YAML vers JSON s'exécutent intégralement en JavaScript dans votre navigateur, garantissant une confidentialité totale."
features:
  - "Validation YAML 1.2 en temps réel avec localisation précise des erreurs par ligne et par colonne"
  - "Embellissement déterministe avec indentation réglable (2, 4 ou 8 espaces) et normalisation des listes"
  - "Prise en charge native des flux multi-documents (--- / ...), ancres (&), alias (*) et clés de fusion"
  - "Conversion bidirectionnelle YAML ↔ JSON avec préservation des types scalaires et structures imbriquées"
  - "Linting ciblé détectant tabulations interdites, clés dupliquées silencieuses et espaces de fin de ligne"
  - "Exécution 100 % côté client avec comparaison visuelle (diff) adaptée aux fichiers DevOps sensibles"
useCases:
  - "Validation et reformatage de manifestes Kubernetes (Deployments, Helm values.yaml, Kustomize) avant kubectl apply"
  - "Débogage de fichiers docker-compose.yml présentant des erreurs d'alignement sur les ports, volumes ou variables"
  - "Nettoyage de workflows GitHub Actions ou GitLab CI/CD intégrant des scripts Bash multilignes"
  - "Vérification de playbooks Ansible et d'inventaires d'infrastructure avant exécution en production"
  - "Conversion de spécifications OpenAPI / Swagger entre YAML lisible et JSON consommable par des outils d'API"
  - "Audit de clés en double ou de types implicites (numéros de version, codes postaux) dans des configurations applicatives"
howToSteps:
  - "Collez votre document YAML brut dans l'éditeur ou importez un fichier local (.yaml, .yml)."
  - "Consultez immédiatement le badge de validation et corrigez les éventuelles erreurs signalées ligne par ligne."
  - "Choisissez la largeur d'indentation adaptée à votre dépôt (2 espaces pour Kubernetes/GitHub Actions, 4 pour Python/Ansible)."
  - "Cliquez sur Formater pour réaligner proprement la structure ou sur Minifier pour compacter le document."
  - "Inspectez les modifications dans l'onglet Diff pour vérifier qu'aucune sémantique n'a été altérée."
  - "Basculez vers l'onglet YAML → JSON si vous devez convertir la configuration pour une API, puis copiez ou téléchargez le résultat."
---

**YAML (YAML Ain't Markup Language)** s'est imposé comme le standard de configuration de l'écosystème Cloud Native : manifestes Kubernetes, charts Helm, fichiers Docker Compose, pipelines GitHub Actions, GitLab CI, spécifications OpenAPI et playbooks Ansible reposent tous sur sa syntaxe épurée. Mais cette lisibilité repose sur une hiérarchie pilotée par l'indentation où un espace égaré, une tabulation invisible ou une coercition implicite peut faire échouer un déploiement critique. Notre **Formateur et Embellisseur YAML** analyse, valide, normalise et convertit vos documents en JSON directement dans le navigateur, sans aucun envoi serveur.

## Internes de YAML 1.2 : arbre de représentation, ancres et pièges de typage

Lorsqu'un parseur traite un document YAML, il exécute un pipeline en quatre étapes : analyse lexicale (*scanning*), construction d'événements, assemblage d'un **graphe de représentation** (nœuds scalaires, séquences et mappages) puis résolution des types selon un schéma. Contrairement à **YAML 1.1**, la norme **YAML 1.2** adopte un *Core Schema* qui fait de YAML un **surensemble strict de JSON** : tout document JSON valide est un document YAML 1.2 valide.

Ce passage à YAML 1.2 corrige plusieurs pièges historiques encore présents dans d'anciens parseurs (comme PyYAML 1.1 ou certains moteurs CI) :

- **Le problème de la Norvège** : en YAML 1.1, une liste de codes ISO pays `[FR, BE, CH, NO]` évaluait `NO` en booléen `false` ! Il en allait de même pour `yes`, `on` et `off`.
- **Coercition des versions et numéros** : sans guillemets, `python: 3.10` devient le flottant `3.1`, un droit Unix octal comme `0755` change d'interprétation entre YAML 1.1 et YAML 1.2 (`0o755`), et un mappage de ports `22:22` pouvait jadis être lu en base 60 (sexagésimal = `1342`). Entourer systématiquement de guillemets les versions, ports et chaînes numériques élimine toute ambiguïté.
- **Clés dupliquées silencieuses** : si un mappage définit deux fois la clé `env:` à 80 lignes d'intervalle, la seconde écrase silencieusement la première dans la plupart des moteurs. Le linter signale ces collisions avant déploiement.

### Comparaison des indicateurs de blocs scalaires multilignes

Les scripts shell dans GitHub Actions ou les fichiers embarqués dans un ConfigMap Kubernetes dépendent directement du choix entre style littéral (`|`), style replié (`>`) et mode de *chomping* (gestion des sauts de ligne finaux) :

| Indicateur | Style de ligne | Sauts de ligne internes | Saut de ligne final | Usage DevOps privilégié |
| :--- | :--- | :--- | :--- | :--- |
| **`\|`** | Littéral (*clip*) | Préservés tels quels | Exactement 1 `\n` conservé | Scripts Bash multi-commandes, fichiers `.conf` |
| **`\|-`** | Littéral (*strip*) | Préservés tels quels | Tous les `\n` finaux supprimés | Clés privées, certificats, valeurs de secrets exactes |
| **`\|+`** | Littéral (*keep*) | Préservés tels quels | Tous les `\n` finaux préservés | Modèles textuels nécessitant un espacement exact |
| **`>`** | Replié (*clip*) | Remplacés par des espaces | Exactement 1 `\n` conservé | Longues descriptions OpenAPI ou commandes sur une ligne |
| **`>-`** | Replié (*strip*) | Remplacés par des espaces | Tous les `\n` finaux supprimés | Arguments CLI longs passés à un conteneur sans `\n` |

## Exemple concret : multi-documents Kubernetes et conversion YAML ↔ JSON

YAML autorise les **ancres (`&nom`)**, les **alias (`*nom`)** et la clé de fusion (`<<: *nom`) pour factoriser des blocs répétitifs, ainsi que les flux multi-documents séparés par `---`. Voici un manifeste Kubernetes propre illustrant ces mécanismes :

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-facturation
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: app
          image: "ghcr.io/org/facturation:3.10"
          ports:
            - containerPort: 8080
          env:
            - name: COUNTRY_CODE
              value: "NO"
          command:
            - "/bin/sh"
            - "-c"
            - |-
              set -euo pipefail
              ./migrate up && ./server --port 8080
---
apiVersion: v1
kind: Service
metadata:
  name: api-facturation-svc
spec:
  selector:
    app: api-facturation
  ports:
    - port: 80
      targetPort: 8080
```

### Limites structurelles de la conversion YAML vers JSON

Bien que YAML 1.2 englobe JSON, la conversion inverse **YAML → JSON** implique quatre contraintes structurelles à garder en tête : JSON ne prend pas en charge les commentaires (`#`), exige des clés d'objet strictement textuelles, ne connaît pas les balises de typage explicites (`!!binary`, `!!timestamp`) et ne représente pas les graphes d'ancres/alias sans déréférencer chaque alias en copie complète. Un flux multi-documents séparé par `---` est quant à lui sérialisé en tableau JSON ou traité document par document.

## Dépannage et bonnes pratiques de sécurité

Face à une erreur de parsing en CI/CD ou dans un cluster, quatre réflexes permettent un diagnostic immédiat :

1. **Éradiquer les tabulations invisibles et dérives Helm** : la spécification interdit `\t` en début de ligne ; le formateur localise la colonne fautive et normalise sur 2 espaces. Dans les gabarits Helm, vérifiez que `nindent` correspond toujours à la profondeur exacte du bloc parent.
2. **Protéger contre l'expansion exponentielle d'alias (*Billion Laughs*)** : limitez l'imbrication d'ancres dans des fichiers provenant de sources tierces afin d'éviter la saturation mémoire du parseur lors de la déréférenciation.
3. **Échapper les deux-points suivis d'un espace (`: `)** : une valeur telle que `message: Erreur: jeton expiré` échoue car le second `: ` est lu comme un mappage imbriqué ; encadrez la chaîne entre guillemets.
4. **Enchaîner vos outils de sérialisation localement** : après conversion en JSON, inspectez ou minifiez le résultat dans notre [Formateur JSON](/fr/outils/json-formatter), comparez deux versions d'un manifeste de production avec le [Comparateur de Différences](/fr/outils/diff-checker), encodez vos secrets Kubernetes via [Encodeur Base64](/fr/outils/base64-encode), ou vérifiez vos fichiers connexes dans le [Formateur XML](/fr/outils/xml-formatter) et la [Visionneuse CSV](/fr/outils/csv-viewer).
