---
metaTitle: "Generador de Sitemap XML Gratis | Protocolo 0.9 y SEO"
metaDescription: "Crea sitemaps XML 0.9, índices de sitemaps y extensiones de imagen, vídeo o noticias con validación SEO en tiempo real y exportación ZIP."
metaKeywords: "generador sitemap xml, crear sitemap, sitemap google, creador de sitemaps, sitemap xml seo, hreflang sitemap, indice de sitemaps, protocolo sitemaps 0.9"
title: "Generador de Sitemap XML Gratis"
shortDescription: "Construye archivos sitemap.xml y sitemap-index.xml conformes al protocolo Sitemaps 0.9 con soporte para extensiones de imágenes, vídeo y noticias, validación SEO en vivo y exportación ZIP particionada."
faqs:
  - question: "¿Cuáles son los límites máximos de tamaño y URLs permitidos en un Sitemap XML?"
    answer: "Según el protocolo oficial Sitemaps 0.9 adoptado por Google y Bing, un único archivo sitemap.xml puede incluir como máximo 50.000 URLs y pesar hasta 50 MB sin comprimir. Si tu sitio supera cualquiera de esos límites, debes dividir las rutas en varios sitemaps secundarios enlazados desde un archivo sitemap-index.xml."
  - question: "¿Cómo interpreta Google actualmente las etiquetas lastmod, changefreq y priority?"
    answer: "Google utiliza la etiqueta <lastmod> en formato ISO 8601 como señal fiable de recrawl siempre que refleje cambios sustanciales y verificables en la página. Por el contrario, Googlebot ignora oficialmente los valores de <changefreq> y <priority>, aunque siguen siendo válidos dentro del esquema XML para compatibilidad con otros rastreadores."
  - question: "¿Por qué no debo incluir páginas noindex, redirecciones 301 o parámetros de consulta en mi sitemap?"
    answer: "El sitemap comunica al buscador tus URLs canónicas e indexables. Mezclar redirecciones (301/302), errores 404, páginas bloqueadas por robots.txt o URLs con parámetros de seguimiento desperdicia presupuesto de rastreo y genera señales contradictorias en Google Search Console."
  - question: "¿Qué extensiones XML y espacios de nombres admite este generador?"
    answer: "Además del esquema núcleo Sitemaps 0.9 (<urlset> y <sitemapindex>), la herramienta inyecta automáticamente los espacios de nombres oficiales de Google para imágenes (xmlns:image), vídeo (xmlns:video) y Google News (xmlns:news) únicamente cuando las entradas los requieren, manteniendo el archivo limpio y válido."
  - question: "¿Cómo publico el sitemap generado para que los motores de búsqueda lo descubran rápido?"
    answer: "Sube sitemap.xml al directorio raíz de tu dominio HTTPS, añade la directiva absoluta 'Sitemap: https://tudominio.com/sitemap.xml' al final de tu archivo robots.txt y regístralo en la sección Sitemaps de Google Search Console y Bing Webmaster Tools."
features:
  - "Modos completos de Sitemap Estándar (<urlset>) e Índice de Sitemaps (<sitemapindex>) conformes al protocolo Sitemaps 0.9 en UTF-8"
  - "Plantillas preconfiguradas para Next.js App Router, tiendas E-Commerce, blogs editoriales y sitios SaaS, además de importación masiva línea por línea"
  - "Soporte nativo de extensiones XML de Google para Imágenes (image:image), Vídeos (video:video) y Noticias (news:news) con declaración automática de namespaces"
  - "Auditoría SEO en tiempo real que verifica protocolo HTTPS, raíz canónica '/', URLs duplicadas, parámetros de consulta y umbrales de 50.000 enlaces o 50 MB"
  - "Salida conmutable entre XML indentado legible y minificado compacto, más descarga ZIP con partición automática en bloques de 45.000 URLs"
  - "Generación 100% local en el navegador con persistencia automática en localStorage y copia instantánea al portapapeles"
useCases:
  - "Construir el sitemap inicial de un sitio nuevo o una aplicación Next.js para acelerar el descubrimiento de rutas sin enlaces externos"
  - "Generar un archivo sitemap-index.xml maestro que organice por separado entradas de blog, fichas de producto y páginas institucionales"
  - "Enriquecer fichas de comercio electrónico o portafolios fotográficos con nodos image:image para potenciar la indexación en Google Imágenes"
  - "Declarar metadatos obligatorios de video:video (miniatura, título, descripción y reproductor) en páginas con contenido audiovisual embebido"
  - "Preparar sitemaps dedicados de Google News con fecha de publicación exacta en formato W3C Datetime para medios digitales"
  - "Empaquetar catálogos masivos en archivos ZIP particionados automáticamente por debajo del límite de 50.000 URLs por fichero"
howToSteps:
  - "Introduce la URL base canónica de tu sitio con protocolo HTTPS (por ejemplo, https://tudominio.com) y selecciona el modo Sitemap Estándar o Índice de Sitemaps."
  - "Carga una plantilla inicial (Next.js, E-Commerce, Blog o SaaS), pega un listado masivo en la importación por lotes o añade URLs individuales."
  - "Configura para cada ruta su fecha <lastmod> real y, cuando corresponda, adjunta metadatos de Imagen, Vídeo o Noticias desde el editor de entradas."
  - "Revisa el panel de validación en vivo para corregir advertencias de duplicados, parámetros '?' o falta de HTTPS antes de exportar."
  - "Elige el formato indentado o minificado, inspecciona la vista previa XML y descarga sitemap.xml, sitemap-index.xml o el paquete ZIP particionado."
  - "Sube el archivo a la raíz de tu servidor, decláralo en robots.txt y envíalo desde Google Search Console."
---

Los rastreadores modernos como Googlebot y Bingbot descubren la mayoría de la web siguiendo hipervínculos internos, pero en sitios recién lanzados, arquitecturas JavaScript complejas o catálogos con miles de páginas profundas, depender únicamente del enlazado interno retrasa la indexación y deja URLs huérfanas sin rastrear. Un **Sitemap XML** conforme al **Protocolo Sitemaps 0.9** proporciona a los buscadores un inventario declarativo, verificable y libre de ambigüedades de tus rutas canónicas. Este **Generador de Sitemap XML Gratis** ensambla sitemaps estándar, índices maestros y extensiones multimedia directamente en tu navegador, aplicando comprobaciones automáticas de cumplimiento SEO antes de pasar el archivo a producción.

## Arquitectura del Protocolo Sitemaps 0.9 y límites técnicos de rastreo

El estándar `sitemaps.org` exige que todo mapa del sitio se entregue codificado en **UTF-8**, sirva un tipo MIME XML válido (`application/xml` o `text/xml`) y utilice el elemento raíz `<urlset>` para listar páginas o `<sitemapindex>` para referenciar archivos secundarios. Además, impone reglas estrictas de sintaxis y cuotas por fichero:

- **Escape obligatorio de entidades XML**: Todas las URLs dentro de `<loc>` deben emplear rutas absolutas con esquema (`https://`) y escapar los cinco caracteres reservados del XML: `&` como `&amp;`, `'` como `&apos;`, `"` como `&quot;`, `<` como `&lt;` y `>` como `&gt;`. Un único ampersand sin escapar invalida el árbol XML completo y dispara errores de lectura en Google Search Console.
- **Límites duros y compresión gzip**: Un sitemap individual no puede exceder **50.000 URLs** ni **50 MB (52.428.800 bytes)** sin comprimir (aunque puede servirse comprimido como `.xml.gz`, el límite se evalúa sobre el tamaño descomprimido). Al exportar en ZIP desde esta herramienta, cualquier lista que supere el umbral de seguridad de **45.000 URLs** se divide automáticamente en bloques `sitemap-part-1.xml`, `sitemap-part-2.xml` y sucesivos junto a su índice maestro.
- **Comportamiento real de `<lastmod>`, `<changefreq>` y `<priority>`**: La etiqueta `<lastmod>` en formato **W3C Datetime (ISO 8601)** —ya sea fecha `YYYY-MM-DD` o marca completa con zona horaria `YYYY-MM-DDThh:mm:ss+00:00`— es la señal más valiosa para priorizar el nuevo rastreo, siempre que solo cambie ante modificaciones sustanciales del contenido principal y nunca de forma artificial en cada compilación. En contraste, Google ignora hoy `<changefreq>` y `<priority>`, aunque mantenerlos conformes al esquema conserva compatibilidad con otros motores y rastreadores corporativos.

## Espacios de nombres XML y extensiones especializadas

El protocolo base se amplía declarando espacios de nombres (`xmlns:*`) en la etiqueta `<urlset>`. La tabla siguiente resume las especificaciones soportadas por Google y los requisitos técnicos de cada extensión.

| Extensión / Esquema | Espacio de nombres (`xmlns`) | Etiquetas obligatorias | Restricción técnica crítica | Uso ideal |
| :--- | :--- | :--- | :--- | :--- |
| **Núcleo Sitemaps 0.9** | `http://www.sitemaps.org/schemas/sitemap/0.9` | `<url>`, `<loc>` | Máx. 50.000 URLs / 50 MB sin comprimir | Todo sitio web corporativo, blog o SaaS |
| **Google Imágenes 1.1** | `http://www.google.com/schemas/sitemap-image/1.1` | `<image:image>`, `<image:loc>` | Hasta 1.000 imágenes por nodo `<url>` | E-commerce, bancos fotográficos, SPA |
| **Google Vídeo 1.1** | `http://www.google.com/schemas/sitemap-video/1.1` | `<video:thumbnail_loc>`, `<video:title>`, `<video:description>` | Incluir `<video:content_loc>` o `<video:player_loc>` | Cursos, medios audiovisuales, demostraciones |
| **Google News 0.9** | `http://www.google.com/schemas/sitemap-news/0.9` | `<news:publication>`, `<news:publication_date>`, `<news:title>` | Solo artículos publicados en las últimas 48 h (máx. 1.000 URLs) | Periódicos digitales y portales de actualidad |
| **Internacional `hreflang`** | `http://www.w3.org/1999/xhtml` | `<xhtml:link rel="alternate" hreflang="..." href="..."/>` | Enlaces bidireccionales recíprocos e inclusión autorreferencial | Sitios multilingües o multirregión (`es-ES`, `es-MX`) |

## Ejemplos de sintaxis XML válida: extensiones e índice maestro

El bloque siguiente combina una URL canónica con su extensión de imagen y anotaciones `hreflang` recíprocas para versiones regionales en español e inglés:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://ejemplo.com/es/catalogo/camara-pro</loc>
    <lastmod>2026-10-18</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="https://ejemplo.com/es/catalogo/camara-pro" />
    <xhtml:link rel="alternate" hreflang="en" href="https://ejemplo.com/en/catalog/pro-camera" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://ejemplo.com/en/catalog/pro-camera" />
    <image:image>
      <image:loc>https://ejemplo.com/media/camara-pro-frontal.webp</image:loc>
      <image:title>Cámara Pro 4K vista frontal</image:title>
    </image:image>
  </url>
</urlset>
```

Cuando la arquitectura crece o se segmenta por tipo de contenido (artículos, categorías, productos), un índice de sitemaps facilita aislar errores de indexación por carpeta en Google Search Console:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://ejemplo.com/sitemap-posts.xml</loc>
    <lastmod>2026-10-18</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://ejemplo.com/sitemap-products.xml</loc>
    <lastmod>2026-10-17</lastmod>
  </sitemap>
</sitemapindex>
```

Si editas manualmente etiquetas personalizadas o integras nodos `xhtml:link`, valida siempre la sintaxis bien formada del documento con el [Formateador XML](/es/herramientas/xml-formatter) antes de subirlo.

## Higiene de crawl budget, despliegue en robots.txt y diagnóstico de errores

Un sitemap limpio mejora la eficiencia del rastreo mucho más que un fichero masivo lleno de URLs ruidosas. Aplica estas verificaciones en cada despliegue:

1. **Solo URLs canónicas con estado HTTP `200 OK`**: Excluye páginas con directiva `noindex`, filtros con parámetros duplicados y redirecciones `301`/`302`. Audita tus rutas críticas con el [Comprobador de Redirecciones](/es/herramientas/redirect-checker) y alinea las etiquetas canónicas usando el [Generador de Meta Tags](/es/herramientas/meta-tag-generator).
2. **Coherencia estricta de protocolo y subdominio**: Un archivo alojado en `https://www.ejemplo.com/sitemap.xml` solo puede declarar URLs bajo ese mismo esquema y host (salvo validación cruzada de dominios en Search Console). Jamás mezcles `http://` con `https://` ni versiones con y sin `www`.
3. **Declaración en `robots.txt` y diagnóstico en Search Console**: Incluye la directiva absoluta `Sitemap: https://ejemplo.com/sitemap.xml` al final de `/robots.txt` —puedes generarlo con el [Generador de robots.txt](/es/herramientas/robots-txt-generator)—. Si Search Console reporta «No se ha podido obtener» (*Couldn't fetch*), comprueba que ningún cortafuegos WAF bloquee el agente Googlebot, que el archivo devuelva cabecera `Content-Type: application/xml; charset=utf-8` sin BOM corrupto y que no haya espacios o caracteres HTML antes de la declaración `<?xml`.
