---
metaTitle: "Éditeur Markdown en Ligne | Prévisualisation GFM & PDF"
metaDescription: "Rédigez et prévisualisez du GitHub Flavored Markdown en temps réel dans un éditeur Monaco : coloration, sommaire et export HTML, PDF ou .md local."
metaKeywords: "éditeur markdown, prévisualisation markdown, markdown en ligne, github flavored markdown, gfm, markdown vers html, exporter markdown pdf, commonmark"
title: "Éditeur et Prévisualisation Markdown"
shortDescription: "Rédigez et prévisualisez du GitHub Flavored Markdown en temps réel dans un éditeur Monaco à écran scindé, avec coloration syntaxique, sommaire interactif, statistiques en direct et export HTML, PDF ou .md côté client."
faqs:
  - question: "Quelle spécification Markdown le moteur de prévisualisation applique-t-il ?"
    answer: "Le rendu s'appuie sur la norme CommonMark 0.31 étendue au GitHub Flavored Markdown (GFM) via remark-gfm. Il prend en charge les tableaux à barres verticales, les cases à cocher de listes de tâches, le texte barré, les liens automatiques et la coloration syntaxique des blocs de code via Highlight.js."
  - question: "L'éditeur accepte-t-il le HTML brut intégré dans un document Markdown ?"
    answer: "Oui. La chaîne de transformation inclut rehype-raw afin de restituer nativement les balises HTML en ligne comme <details>, <kbd>, <figure> ou des balises <img> stylées. Comme ce HTML brut est monté dans le DOM d'aperçu, évitez d'y coller des scripts issus de sources non fiables."
  - question: "Comment fonctionne la récupération automatique des brouillons si je ferme l'onglet ?"
    answer: "Chaque frappe déclenche une temporisation (debounce) de 800 millisecondes avant d'enregistrer le tampon localement dans le localStorage de votre navigateur. Au rechargement, votre texte est restauré automatiquement sans jamais transiter par un serveur distant."
  - question: "Quelle différence existe-t-il entre copier le HTML rendu et télécharger un fichier .html ?"
    answer: "Copier le HTML rendu place uniquement le fragment interne du panneau d'aperçu dans le presse-papiers, prêt à être injecté dans un CMS ou un gabarit d'e-mail. Le téléchargement .html encapsule ce fragment dans un document HTML5 UTF-8 autonome doté de styles typographiques et de tableaux embarqués."
  - question: "Comment l'export PDF multipage gère-t-il les longs documents Markdown ?"
    answer: "L'exportation s'exécute entièrement dans le navigateur : html2canvas rastérise l'aperçu mis en forme à une densité de pixel 2x, puis jsPDF découpe le rendu en pages A4 portrait paginées, préservant l'alignement des tableaux et la coloration des blocs de code."
features:
  - "Moteur Monaco Editor avec barre d'outils contextuelle, colorisation des paires de délimiteurs, numéros de ligne, retour à la ligne et taille de police réglable de 10 px à 24 px"
  - "Rendu GitHub Flavored Markdown (GFM) complet : tableaux à barres verticales, listes de tâches, texte barré, liens automatiques et balises HTML en ligne"
  - "Coloration syntaxique automatique des blocs de code clôturés (Highlight.js) avec bouton de copie en un clic sur chaque bloc"
  - "Sommaire interactif généré automatiquement depuis les titres H1 à H6 avec navigation fluide par ancres"
  - "Barre de télémétrie en direct mesurant le nombre de mots, de caractères, de lignes, de titres et le temps de lecture estimé à 200 mots par minute"
  - "Glisser-déposer de fichiers locaux (.md, .markdown, .txt) et exportation instantanée en .md brut, .html autonome ou .pdf A4 paginé"
useCases:
  - "Rédiger et relire un fichier README.md, un CHANGELOG ou un modèle de Pull Request GitHub et GitLab avant tout commit Git"
  - "Composer des spécifications techniques (RFC), des comptes rendus d'architecture (ADR) et des guides d'API illustrés de code coloré"
  - "Convertir un brouillon Markdown en HTML sémantique propre pour un générateur de site statique, un CMS headless ou une infolettre"
  - "Exporter des comptes rendus de réunion, notes de version ou dossiers techniques en PDF A4 directement partageables"
  - "Auditer l'arborescence éditoriale et l'équilibre des sections d'un long manuel grâce au sommaire latéral interactif"
  - "Inspecter un fichier .md reçu d'un collaborateur sans installer d'éditeur de bureau ni d'extension IDE dédiée"
howToSteps:
  - "Saisissez votre texte dans le volet Monaco à gauche, collez un document existant ou déposez directement un fichier .md, .markdown ou .txt."
  - "Utilisez la barre d'outils pour entourer votre sélection (gras, italique, code en ligne, lien, citation) ou insérer des listes, tâches et tableaux GFM à la position exacte du curseur."
  - "Basculez librement entre l'affichage scindé, l'éditeur seul ou l'aperçu seul, puis ajustez le retour à la ligne automatique et la taille de police."
  - "Activez l'icône de sommaire pour inspecter la hiérarchie des titres H1 à H6 et sauter instantanément vers une section précise."
  - "Contrôlez le volume du document, le nombre de titres et la durée de lecture estimée dans la barre de statistiques en direct."
  - "Copiez le Markdown brut ou le fragment HTML rendu en un clic, ou exportez le résultat en fichier .md, page .html autonome ou document .pdf A4."
---

Le balisage en texte brut domine la documentation logicielle : lisible dans un terminal, léger dans Git et affranchi de tout format propriétaire. Pourtant, rédiger à l'aveugle des listes imbriquées, des tableaux GFM ou des blocs de code clôturés provoque souvent des décalages qui n'apparaissent qu'après un `git push`. Notre **Éditeur et Prévisualisation Markdown** associe Monaco Editor à un moteur **GitHub Flavored Markdown (GFM)** temps réel directement dans votre navigateur, afin de contrôler typographie, coloration syntaxique et sommaire tout en exportant vos livrables HTML ou PDF sans quitter votre poste.

## Pipeline AST de compilation Markdown vers HTML

Au lieu de recourir à des expressions régulières fragiles, le panneau d'aperçu compile votre document via un arbre syntaxique abstrait (*AST*) fondé sur l'écosystème *unified* :

1. **Analyse Markdown (`mdast`)** : la source est découpée selon **CommonMark 0.31**, étendu par `remark-gfm` pour reconnaître tableaux, texte barré, cases à cocher et liens automatiques.
2. **Transformation HTML (`hast`)** : l'arbre Markdown devient une arborescence HTML. Le greffon `rehype-raw` réanalyse les balises embarquées (`<kbd>`, `<details>`, `<figure>`, `<img>`) en nœuds DOM natifs plutôt qu'en texte échappé.
3. **Coloration syntaxique (`rehype-highlight`)** : chaque bloc clôturé doté d'un identifiant (`typescript`, `python`, `bash`, `sql`, `yaml`) est tokenisé par **Highlight.js** en balises `<span>` sémantiques avant le montage React.

À gauche, **Monaco Editor** — le moteur tampon de Visual Studio Code — exécute chaque bouton de la barre d'outils via `executeEdits` sur la sélection active : le texte surligné est encadré proprement au curseur au lieu d'être collé en fin de fichier. Chaque frappe subit un délai (*debounce*) de 800 ms avant sauvegarde dans `localStorage`, garantissant la persistance locale après rechargement.

## CommonMark 0.31 face aux extensions GFM

Les écarts de rendu naissent souvent d'extensions supposées universelles. Ce tableau distingue CommonMark standard du sur-ensemble GFM interprété par notre prévisualiseur.

| Syntaxe | CommonMark 0.31 | GFM | HTML produit | Règle d'analyse |
| :--- | :--- | :--- | :--- | :--- |
| Titres ATX (`## Titre`) | Oui | Oui | `<h1>`–`<h6>` avec `id` | Espace requis après `#` (`##Titre` reste paragraphe) |
| Code clôturé (```` ```lang ````) | Oui | Oui | `<pre><code class="hljs">` | L'identifiant après les accents graves active Highlight.js |
| Tableaux (`\| A \| B \|`) | Non | Oui | `<table>`, `<thead>`, `<tbody>` | Au moins trois tirets par colonne sur la ligne séparatrice |
| Tâches (`- [x] Fait`) | Non | Oui | `<li><input type="checkbox">` | `x` minuscule ou espace entre crochets après la puce |
| Barré (`~~ancien~~`) | Non | Oui | `<del>` | Un ou deux tildes collés sans espace interne |
| Liens nus | `<...>` requis | Oui | `<a target="_blank">` | Reconnaît `https://` et `www.` sans chevrons |
| HTML brut en ligne | Oui | Oui | Nœud DOM natif | Ligne vide autour d'un bloc HTML pour reprendre Markdown |

## Indentation stricte, tableaux et exportations locales

Quelques conventions d'espacement assurent un rendu identique sur GitHub, GitLab, Docusaurus, Hugo et MkDocs. Pour imbriquer un bloc de code dans une liste numérotée sans rompre la séquence, alignez les accents graves sur la première lettre du texte (trois espaces après `1. `). Si vous devez afficher des triples accents graves dans un exemple Markdown, utilisez une clôture externe de quatre accents graves afin d'éviter toute fermeture prématurée du bloc. Dans une cellule GFM, échappez toute barre verticale littérale par `\|`, et pilotez l'alignement horizontal via les deux-points sur la ligne de séparation :

````markdown
1. Lancez la validation avant déploiement :

   ```bash
   npm run lint && npm run build
   ```

| Option | Centré | Comportement |
| :--- | :---: | ---: |
| `--strict` | Oui | Échoue dès le premier avertissement |
| `A \| B` | Échappé | Affiche une barre verticale littérale |
````

Pour les grandes matrices tabulaires ou l'importation directe de données issues d'un tableur, structurez visuellement vos colonnes dans notre [générateur de tableaux HTML](/fr/outils/html-table-generator) avant d'importer le balisage dans l'éditeur.

### Export `.md`, HTML5 autonome et PDF A4 paginé

Le menu d'exportation produit trois livrables prêts à diffuser sans jamais solliciter de serveur distant :

- **Fichier `.md` brut** : émet le tampon UTF-8 exact de Monaco via un `Blob` `text/markdown`, en préservant fidèlement vos sauts de ligne et votre frontmatter YAML éventuel.
- **Page `.html` autonome** : enveloppe le DOM compilé dans un squelette HTML5 complet muni d'une typographie système, d'images responsives, de tableaux bordés et de citations stylées. Pour inspecter l'imbrication des balises ou ajuster l'indentation avant une intégration CMS, passez le fichier exporté dans notre [formateur HTML](/fr/outils/html-formatter).
- **Document `.pdf` A4 paginé** : charge dynamiquement `html2canvas` en résolution `2x` puis découpe le canevas en pages A4 portrait via `jsPDF`, préservant l'alignement des tableaux et la coloration syntaxique des blocs de code contrairement aux dialogues d'impression navigateur souvent incohérents.

Sur les spécifications longues et manuels techniques, ouvrez le sommaire interactif (`H1`–`H6`) afin d'auditer la profondeur des titres et de naviguer instantanément par ancres dans l'aperçu. La barre supérieure recalcule à chaque frappe le nombre de mots, de caractères, de lignes, de titres et le temps de lecture moyen (base 200 mots/min), en complément de notre [compteur de mots](/fr/outils/word-counter). Avant toute *Pull Request* sur un dépôt existant, comparez votre `.md` exporté à la version précédente dans le [comparateur de texte](/fr/outils/diff-checker) pour isoler précisément chaque ligne modifiée.

## Pièges courants et assainissement HTML

Trois cas limites surprennent régulièrement les auteurs techniques :

- **Saut de ligne forcé contre retour souple** : un retour simple dans un paragraphe devient un espace sous CommonMark. Pour forcer `<br>`, préférez une barre oblique inverse finale (`\`), bien plus lisible en revue Git que deux espaces invisibles.
- **Tirets bas dans les symboles** : GFM ignore l'emphase intralittérale (`nom_variable_api`), mais certains moteurs plus anciens mettent `_variable_` en italique. Encadrer chaque identifiant d'accents graves (`` `nom_variable_api` ``) assure une portabilité totale.
- **Sécurité du HTML embarqué** : `rehype-raw` convient parfaitement à vos brouillons locaux sur votre poste. Si le HTML copié alimente ensuite une application Web multi-utilisateur recevant des contenus tiers, filtrez-le impérativement avec **DOMPurify** afin d'éliminer balises `<script>` et attributs `on*` exposant aux attaques XSS.
