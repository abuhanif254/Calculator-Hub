---
metaTitle: "Editor y Vista Previa de Markdown GFM | HTML y PDF Gratis"
metaDescription: "Escribe y previsualiza GitHub Flavored Markdown en tiempo real con Monaco Editor. Exporta a HTML, PDF o .md con privacidad total en tu navegador."
metaKeywords: "vista previa markdown, editor markdown online, markdown a html, github flavored markdown, visor markdown, editor gfm, exportar markdown a html, exportar markdown a pdf, convertidor markdown, monaco editor markdown"
title: "Editor y Vista Previa de Markdown"
shortDescription: "Escribe y previsualiza GitHub Flavored Markdown en tiempo real dentro de un editor Monaco en pantalla dividida. Incluye resaltado de sintaxis, tabla de contenidos interactiva, métricas en vivo y exportación local a HTML, PDF o .md."
faqs:
  - question: "¿Qué especificación de Markdown implementa la vista previa en tiempo real?"
    answer: "El renderizador analiza CommonMark extendido con GitHub Flavored Markdown (GFM) mediante remark-gfm. Esto garantiza compatibilidad nativa con tablas delimitadas por barras verticales, listas de tareas interactivas, texto tachado, enlaces automáticos y bloques de código resaltados con Highlight.js."
  - question: "¿Admite el editor etiquetas HTML en línea dentro de un documento Markdown?"
    answer: "Sí. El pipeline de vista previa integra rehype-raw para que etiquetas HTML incrustadas como <details>, <kbd>, insignias personalizadas o elementos <img> con alineación se rendericen como nodos DOM reales. Al procesarse HTML directo en el visor, evita pegar scripts de fuentes no confiables."
  - question: "¿Cómo funciona la recuperación automática de borradores si cierro la pestaña?"
    answer: "Cada modificación aplica un retardo inteligente (debounce) de 800 milisegundos antes de guardarse localmente en el almacenamiento localStorage del navegador. Al recargar la página tu documento se restaura al instante sin sincronizarse jamás con servidores externos."
  - question: "¿Cuál es la diferencia entre copiar el HTML renderizado y descargar el archivo .html?"
    answer: "Copiar el HTML renderizado guarda en el portapapeles únicamente el fragmento interno del contenedor de vista previa, ideal para pegar en un CMS o boletín. Descargar .html envuelve ese fragmento en un documento HTML5 UTF-8 autónomo con estilos tipográficos y de tablas integrados."
  - question: "¿Cómo se generan los archivos PDF multipágina a partir de documentos Markdown extensos?"
    answer: "La exportación a PDF se ejecuta completamente en tu navegador: el panel renderizado se rasteriza a resolución 2x con html2canvas y después jsPDF divide el lienzo en páginas A4 verticales paginadas con márgenes limpios."
features:
  - "Motor Monaco Editor con inserción contextual en el cursor, coloreado de corchetes, números de línea, ajuste automático y fuente escalable de 10 px a 24 px"
  - "Renderizado completo de GitHub Flavored Markdown (GFM) con tablas, listas de tareas, tachado, enlaces automáticos y paso directo de HTML en línea"
  - "Resaltado automático de sintaxis en bloques de código delimitados con botón de copia rápida por cada bloque"
  - "Tabla de contenidos interactiva generada dinámicamente a partir de encabezados H1 a H6 con desplazamiento suave por anclas"
  - "Barra de estadísticas en vivo con conteo de palabras, caracteres, líneas, encabezados y tiempo estimado de lectura a 200 palabras por minuto"
  - "Arrastre de archivos locales .md, .markdown y .txt con exportación inmediata a .md, .html autónomo y .pdf A4 paginado"
useCases:
  - "Redactar y verificar archivos README.md, registros CHANGELOG y plantillas de pull requests antes de hacer commit en Git"
  - "Documentar propuestas RFC, registros de decisiones de arquitectura (ADR) y guías de API con bloques de código resaltados"
  - "Convertir borradores Markdown en fragmentos HTML semánticos listos para generadores de sitios estáticos, CMS headless o correos técnicos"
  - "Exportar minutas de reuniones, notas de versión y especificaciones de proyecto directamente a documentos PDF A4 listos para distribuir"
  - "Auditar la jerarquía de encabezados y la fluidez de manuales técnicos extensos mediante la tabla de contenidos interactiva"
  - "Inspeccionar archivos Markdown recibidos de otros equipos sin instalar aplicaciones de escritorio ni complementos en el IDE"
howToSteps:
  - "Escribe directamente en el panel izquierdo de Monaco Editor, pega tu texto Markdown o arrastra un archivo .md, .markdown o .txt al espacio de trabajo."
  - "Usa la barra de herramientas para envolver la selección en negrita, cursiva, código en línea, enlaces, citas, listas, tareas o plantillas de tablas GFM en la posición exacta del cursor."
  - "Alterna entre vista dividida, solo editor o solo vista previa, y ajusta el salto de línea o el tamaño de fuente para editar documentos largos con comodidad."
  - "Abre la tabla de contenidos con el icono de numeral para revisar la jerarquía H1–H6 y saltar de inmediato a cualquier sección."
  - "Supervisa la extensión del documento, la cantidad de encabezados y la duración estimada de lectura en la barra superior de métricas."
  - "Copia el código Markdown o el HTML compilado en un clic, o abre el menú Exportar para descargar un archivo .md, una página .html independiente o un documento .pdf A4."
---

El marcado en texto plano domina la documentación de software porque permanece legible en terminal, produce diferencias limpias en Git y sobrevive décadas a los cambios de plataformas. Sin embargo, redactar listas anidadas profundas, tablas anchas y bloques de código multilingüe a ciegas suele introducir errores de formato que solo aparecen tras subir un commit. El **Editor y Vista Previa de Markdown** une **Monaco Editor** con un renderizador instantáneo de **GitHub Flavored Markdown (GFM)** dentro del navegador, permitiéndote verificar tipografía, resaltado semántico y jerarquía, y exportar HTML o PDF sin enviar borradores confidenciales a servidores externos.

## Arquitectura del pipeline de renderizado

En lugar de sustituciones frágiles con expresiones regulares, la vista previa compila tu documento mediante un pipeline basado en Árboles de Sintaxis Abstracta (AST) del ecosistema *unified*:

1. **Análisis léxico y sintáctico (`mdast`):** Tokeniza el texto siguiendo **CommonMark 0.31**, mientras `remark-gfm` activa las reglas de GitHub para tablas, texto tachado, casillas de tareas y enlaces automáticos.
2. **Transformación a árbol HTML (`hast`):** Convierte el AST Markdown en nodos HTML. Al pasar por `rehype-raw`, etiquetas como `<kbd>`, `<details>` o `<figure>` se montan como elementos DOM nativos en vez de escaparse como texto literal.
3. **Resaltado de código (`rehype-highlight`):** Los bloques delimitados con identificador de lenguaje (`typescript`, `python`, `bash`, `yaml`, `sql`) se procesan con **Highlight.js** en clases `<span>` semánticas antes del montaje visual, incorporando además un botón de copia rápida por bloque.

El panel izquierdo ejecuta **Monaco Editor**, el mismo motor de Visual Studio Code, con alternancia rápida entre vista dividida, solo editor o solo vista previa, ajuste de línea y escalado tipográfico de 10 px a 24 px. Cada botón de la barra invoca `executeEdits` sobre la selección activa: envuelve el rango marcado o inserta un marcador preseleccionado en el cursor actual. Cada edición aplica un *debounce* de **800 milisegundos** antes de persistirse en `localStorage`, protegiendo borradores frente a recargas sin salir de tu dispositivo.

## CommonMark 0.31 frente a GitHub Flavored Markdown (GFM)

Muchos fallos de portabilidad nacen de asumir que todos los analizadores implementan idénticas extensiones. Esta matriz detalla cómo amplía GFM la base en la vista previa:

| Característica | CommonMark 0.31 | GFM | Elemento HTML | Regla clave de análisis |
| :--- | :--- | :--- | :--- | :--- |
| Encabezados ATX (`## Título`) | Sí | Sí | `<h1>`–`<h6>` con `id` | Exige espacio tras `#`; `##Título` queda como párrafo |
| Código delimitado (` ```lang `) | Sí | Sí | `<pre><code class="hljs">` | El identificador tras las comillas activa Highlight.js |
| Tablas (`\| A \| B \|`) | No | Sí | `<table>`, `<thead>`, `<tbody>` | Separador exige mínimo tres guiones por columna |
| Listas de tareas (`- [x]`) | No | Sí | `<li><input type="checkbox">` | Requiere `x` minúscula o espacio dentro de corchetes |
| Tachado (`~~texto~~`) | No | Sí | `<del>` | Tildes simples o dobles sin espacios internos |
| Enlaces automáticos | Exige `<...>` | Sí | `<a target="_blank">` | Detecta `https://` y `www.` sin paréntesis angulares |
| HTML en línea | Sí | Sí | Nodo DOM nativo | Bloques HTML requieren líneas en blanco alrededor |

## Sintaxis anidada, anclas y exportación de entregables

El espaciado define si una estructura compleja se renderiza igual en GitHub, wikis internos y generadores estáticos. Para anidar código dentro de una lista numerada, alinea las tres comillas invertidas con el inicio del ítem, y escapa cualquier barra vertical literal en celdas con `\|`:

````markdown
1. Ejecuta la compilación y el análisis estático:

   ```bash
   npm run build && npm run lint
   ```

| Opción | Comportamiento | Ejemplo |
| :--- | :---: | :--- |
| `--strict` | Falla ante advertencias | `lint --strict` |
| `A \| B` | Barra escapada en celda | `echo "ok"` |
````

Para tablas técnicas con muchas columnas, diseña columnas visualmente en nuestro [Generador de Tablas HTML](/es/herramientas/html-table-generator) y traslada el marcado limpio al editor. Cuando tus documentos incluyan encabezados frontmatter para sitios estáticos como Astro, Hugo o Next.js, valida antes esa cabecera con el [Formateador y Embellecedor de YAML](/es/herramientas/yaml-formatter) para evitar errores de compilación.

### HTML autónomo frente a PDF paginado

El menú **Exportar** ofrece tres rutas locales adaptadas a cada destino:

- **Fuente `.md`:** Emite el búfer UTF-8 exacto de Monaco mediante `Blob` (`text/markdown`), conservando saltos y sangrías originales.
- **Página `.html` autónoma:** Envuelve el DOM compilado en HTML5 con tipografía de sistema, imágenes adaptables, bordes de tabla y citas estilizadas. Para inspeccionar indentación o limpiar etiquetas, pásalo por el [Formateador de HTML](/es/herramientas/html-formatter).
- **Documento `.pdf` A4 paginado:** Carga `html2canvas` a densidad `2x` y segmenta el lienzo en hojas A4 verticales con `jsPDF`, preservando proporciones en tablas y bloques resaltados. Para páginas HTML externas dispones también de [HTML a PDF](/es/herramientas/html-to-pdf).

En guías extensas, abre la **Tabla de contenidos** para validar la jerarquía `H1`–`H6` y navegar por anclas en minúsculas con guiones —una convención replicable con el [Generador de Slugs](/es/herramientas/slug-generator). La barra superior actualiza palabras, caracteres, líneas, encabezados y tiempo de lectura (200 palabras por minuto), complementable con el [Contador de Palabras](/es/herramientas/word-counter). Antes de abrir un pull request, contrasta el `.md` exportado frente a la versión previa en el [Comparador de Diferencias](/es/herramientas/diff-checker).

## Casos límite habituales y sanitización de HTML

Tres comportamientos sutiles suelen generar problemas en producción:

- **Saltos forzados frente a ajustes suaves:** Un salto simple dentro de un párrafo se fusiona como espacio bajo CommonMark. Fuerza `<br>` con una barra invertida (`\`) o dos espacios finales.
- **Guiones bajos en identificadores:** GFM ignora énfasis dentro de `mi_variable_global`, pero analizadores antiguos ponen `_variable_` en cursiva. Envuelve siempre identificadores en comillas invertidas.
- **Seguridad con HTML incrustado:** `rehype-raw` resulta seguro para autoría local y repositorios confiables. Si publicas HTML derivado de Markdown externo en una app multiusuario, aplica siempre una lista blanca estricta como **DOMPurify** para eliminar `<script>` y atributos `on*`.
