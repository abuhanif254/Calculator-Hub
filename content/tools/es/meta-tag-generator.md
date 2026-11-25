---
metaTitle: "Generador de Meta Etiquetas SEO, Open Graph y JSON-LD"
metaDescription: "Genere meta etiquetas HTML para SEO, Open Graph, Twitter Cards, hreflang, PWA y esquemas JSON-LD con simulador de Google y redes en tiempo real."
metaKeywords: "generador de meta etiquetas, meta tags seo, simulador serp google, generador open graph, twitter cards html, esquemas json-ld, etiquetas hreflang, meta robots noindex, etiquetas pwa, seo técnico"
title: "Generador de Meta Etiquetas"
shortDescription: "Genere etiquetas HTML conformes a los estándares SEO, metadatos Open Graph y Twitter Cards, clústeres hreflang, cabeceras PWA y datos estructurados JSON-LD con simulación en vivo de resultados en Google y redes sociales."
faqs:
  - question: "¿Por qué Google recorta a veces un título de 58 caracteres y en cambio muestra completo otro de 62?"
    answer: "Google mide el ancho disponible del titular en píxeles renderizados —aproximadamente entre 580 y 600 px en escritorio— y no por un conteo fijo de caracteres. Letras mayúsculas anchas como W, M o G ocupan casi el doble de espacio horizontal que glifos estrechos como i, l o t, por lo que el margen de 50 a 60 caracteres actúa como referencia segura y no como un límite rígido."
  - question: "¿Conviene incluir a la vez una etiqueta rel='canonical' hacia otra URL y una directiva meta robots noindex?"
    answer: "No. Combinar una URL canónica apuntando a otro documento con la directiva noindex envía señales contradictorias a los motores de búsqueda. Utilice únicamente rel='canonical' cuando desee consolidar páginas duplicadas transfiriendo autoridad, y reserve noindex para páginas que deban desaparecer del índice."
  - question: "¿Qué tipos de datos estructurados JSON-LD genera esta herramienta junto a las meta etiquetas HTML?"
    answer: "El módulo de datos estructurados crea bloques independientes script type='application/ld+json' conformes a Schema.org para cinco entidades clave: WebSite (con SearchAction para cuadro de búsqueda), Organization (con logotipo y perfiles sameAs), NewsArticle, FAQPage y BreadcrumbList."
  - question: "¿Siguen influyendo las meta keywords en el posicionamiento orgánico de Google o Bing?"
    answer: "No. Tanto Google como Bing ignoran la etiqueta meta keywords como señal de clasificación desde hace años debido al abuso histórico de palabras clave. Solo algunos buscadores internos corporativos o gestores de contenido antiguos la leen; rellenarla en exceso únicamente añade peso innecesario al documento HTML."
  - question: "¿Dónde se almacenan mis borradores de metadatos, URLs de pruebas y códigos de verificación?"
    answer: "Toda la edición, el cálculo de la puntuación SEO, las vistas previas y el historial de sesiones se ejecutan íntegramente en su navegador utilizando JavaScript y localStorage. Los títulos de lanzamientos confidenciales y dominios de preproducción nunca se envían a ningún servidor externo."
features:
  - "Espacio de trabajo en cuatro paneles: SEO básico, metadatos sociales (Open Graph y Twitter Cards), cinco constructores JSON-LD y directivas avanzadas (robots, PWA y hreflang)."
  - "Simulador SERP en vivo que renderiza fragmentos de búsqueda de Google junto con tarjetas responsivas de Facebook y X mientras escribe."
  - "Evaluador automático de calidad SEO sobre 100 puntos que valida rangos de título (50-60 caracteres), descripción (120-160 caracteres), URL canónica, imágenes sociales y esquemas."
  - "Sincronización en un clic hacia redes sociales que copia título, descripción, URL canónica e imagen principal a Open Graph, Twitter Cards y NewsArticle."
  - "Constructor de etiquetas multilingües hreflang conformes a BCP 47 más códigos de verificación para Google, Bing (msvalidate.01), Yandex y Alexa."
  - "Plantillas preconfiguradas para blogs, aplicaciones SaaS, tiendas e-commerce y portafolios con persistencia local y descarga directa de bloques HTML y JSON-LD."
useCases:
  - "Redactar y ajustar la longitud visual de títulos y metadescripciones para páginas de aterrizaje antes de lanzar campañas de captación orgánica."
  - "Generar cabeceras HTML unificadas junto a esquemas JSON-LD de NewsArticle y BreadcrumbList para medios editoriales y documentación técnica."
  - "Configurar anotaciones recíprocas hreflang entre rutas regionalizadas (es-ES, es-MX, en-US) y respaldo x-default en sitios internacionales."
  - "Incorporar enlaces de manifiesto PWA, color de tema de barra móvil y banners nativos de instalación para iOS y Android en aplicaciones web progresivas."
  - "Definir directivas granulares de rastreo como noindex, nosnippet, noarchive o max-image-preview:large para entornos privados, muros de pago y Google Discover."
  - "Estandarizar configuraciones de metadatos reutilizables entre proyectos de clientes manteniendo estrictamente en local el contenido aún no publicado."
howToSteps:
  - "Seleccione una plantilla inicial (Blog, SaaS, E-Commerce o Portafolio) o parta de un lienzo vacío en la pestaña de SEO básico."
  - "Introduzca título, metadescripción, URL canónica, idioma, viewport y color de tema supervisando los contadores y la vista previa en Google."
  - "Pase a la pestaña de redes sociales —o pulse Sincronizar con Redes— para rellenar Open Graph y Twitter Cards e inspeccionar las tarjetas de Facebook y X."
  - "Abra la pestaña de datos estructurados para activar y completar los bloques JSON-LD de WebSite, Organization, NewsArticle, FAQPage o BreadcrumbList."
  - "Defina las directivas robots, claves de verificación de buscadores, etiquetas PWA y variantes regionales hreflang en la pestaña de opciones avanzadas."
  - "Compruebe el panel de diagnóstico SEO sobre 100 puntos y copie o descargue el código HTML y JSON-LD para pegarlo dentro del elemento head."
---

Cada vez que un rastreador web, un bot social o un navegador móvil solicita un documento HTML, procesa primero el elemento `<head>` antes de evaluar la maquetación visual o ejecutar scripts en cliente. Esas declaraciones invisibles definen cómo construye Google su fragmento de búsqueda (*snippet*), qué URL consolida autoridad frente a duplicados con parámetros, cómo se muestran las tarjetas en redes sociales y qué entidades optan a resultados enriquecidos. Este **Generador de Meta Etiquetas** unifica en un espacio local etiquetas SEO básicas, Open Graph, Twitter Cards, directivas `robots`, clústeres `hreflang`, cabeceras PWA y bloques JSON-LD, conservando sus borradores y códigos de verificación estrictamente en el `localStorage` del navegador.

## Anatomía y estándares de una cabecera HTML moderna

Una cabecera técnica articula especificaciones independientes de W3C, WHATWG, IETF y Schema.org. Respetar su sintaxis evita descartes silenciosos por atributos mal formados.

| Elemento / Directiva | Estándar rector | Límites óptimos y sintaxis | Consumidor principal |
| :--- | :--- | :--- | :--- |
| `<title>` | HTML Living Standard | 50–60 car. (~580–600 px escritorio) | Google, Bing, pestañas del navegador |
| `<meta name="description">` | HTML Living Standard | 120–160 car. (~920 px escritorio, ~680 px móvil) | Fragmento orgánico (CTR) |
| `<link rel="canonical">` | RFC 6596 | Una URI absoluta `https://` sin fragmentos `#` | Googlebot y Bingbot (consolidación) |
| `<meta name="robots">` | Robots Meta Spec | Tokens por coma (`index, follow, max-image-preview:large`) | Control de indexación por página |
| `<link rel="alternate" hreflang>` | RFC 5646 (BCP 47) | ISO 639-1 + ISO 3166-1 opcional + `x-default` | Google y Yandex (SEO internacional) |
| `<meta name="viewport">` | CSS Device Adaptation | `width=device-width, initial-scale=1.0` | Navegadores móviles y diseño responsivo |
| `<script type="application/ld+json">` | W3C JSON-LD 1.1 | JSON UTF-8 válido con `@context` Schema.org | Gráfico semántico y *rich results* |

Los rangos de caracteres en `<title>` y `description` aproximan el ancho real en píxeles de una tipografía proporcional: siglas en mayúsculas provocan cortes prematuros con puntos suspensivos frente a texto en minúsculas de idéntica longitud. Además, la herramienta escapa automáticamente las comillas dobles internas en atributos `content` como `&quot;`, evitando que el atributo HTML se cierre antes de tiempo y rompa las etiquetas siguientes.

## Directivas `robots` y clústeres internacionales `hreflang`

Las meta etiquetas actúan después de la descarga HTTP, a diferencia del archivo `robots.txt` que gestiona el acceso de rastreo global (configurable con el [Generador de Robots.txt](/es/herramientas/robots-txt-generator) junto al mapa creado en el [Generador de Sitemap XML](/es/herramientas/sitemap-xml-generator)):

- **`index` / `noindex` y `follow` / `nofollow`:** indican si indexar la URL y seguir sus enlaces. Nunca bloquee en `robots.txt` una ruta con `noindex`, pues el rastreador no podría leer esa meta etiqueta.
- **`max-image-preview:large`:** habilita vistas previas de ancho completo en Google Discover y carruseles visuales, clave para el tráfico editorial móvil.
- **`nosnippet` y `noarchive`:** restringen extractos o copias en caché en contenido regulado o bajo suscripción.

En arquitecturas multilingües, los enlaces `hreflang` relacionan versiones equivalentes mediante códigos BCP 47 (`es`, `es-ES`, `es-MX`, `en`). Cada página debe incluir su propia **autorreferencia**, enlaces **recíprocos** hacia todas sus variantes hermanas y un respaldo `x-default` para usuarios sin idioma coincidente; omitir un enlace de retorno invalida el clúster entero.

## Datos estructurados JSON-LD y bloque de referencia

Los pares clave-valor de `<meta>` no describen relaciones anidadas como autoría, logotipo o migas de pan. Google recomienda incrustar **JSON-LD** en `<script type="application/ld+json">` para desacoplar la semántica del DOM visual:

```html
<!-- Cabecera SEO, directivas de rastreo y clúster hreflang -->
<title>Guía de Telemetría Cloud: Trazas con OpenTelemetry</title>
<meta name="description" content="Configure trazado distribuido, muestreo adaptativo y colectores OTLP con latencia mínima en clústeres Kubernetes." />
<link rel="canonical" href="https://docs.ejemplo.com/es/guias/opentelemetry" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="alternate" hreflang="es" href="https://docs.ejemplo.com/es/guias/opentelemetry" />
<link rel="alternate" hreflang="en" href="https://docs.ejemplo.com/en/guides/opentelemetry" />
<link rel="alternate" hreflang="x-default" href="https://docs.ejemplo.com/en/guides/opentelemetry" />

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Guías", "item": "https://docs.ejemplo.com/es/guias" },
    { "@type": "ListItem", "position": 2, "name": "OpenTelemetry", "item": "https://docs.ejemplo.com/es/guias/opentelemetry" }
  ]
}
</script>
```

El generador construye cinco esquemas (`WebSite`, `Organization`, `NewsArticle`, `FAQPage` y `BreadcrumbList`). Si fusiona manualmente varios objetos en un arreglo `@graph`, valide la sintaxis con el [Formateador JSON](/es/herramientas/json-formatter) antes de desplegar.

## Cabeceras PWA, sincronización social y auditoría previa

### Aplicaciones web progresivas, verificación y tarjetas sociales
Combinar `<link rel="manifest">`, `theme-color`, `apple-mobile-web-app-capable` y banners nativos (`apple-itunes-app`, `google-play-app`) integra su PWA con Android Chrome e iOS. Desde la pestaña avanzada también puede emitir etiquetas de verificación de propiedad para Google Search Console (`google-site-verification`), Bing Webmaster Tools (`msvalidate.01`) y Yandex (`yandex-verification`) sin subir archivos estáticos a la raíz del servidor. Con el botón de sincronización social puede replicar textos y URLs hacia Open Graph y Twitter Cards; para validar recortes por red social y límites de peso de imagen, complemente su flujo con el [Generador de Open Graph](/es/herramientas/open-graph-generator) y el [Generador de Twitter Cards](/es/herramientas/twitter-card-generator).

### Cuatro errores críticos en producción
1. **Inyección solo en cliente (CSR):** insertar `<title>`, `canonical` o JSON-LD en un `useEffect` deja un HTML vacío para bots sin ejecución JS; emita siempre el `<head>` vía SSR o SSG.
2. **Etiquetas duplicadas:** emitir dos `rel="canonical"` distintos desde plugins o layouts provoca que el buscador descarte ambos.
3. **Canónicas con redirección:** toda URL canónica debe responder `200 OK` directo, nunca una cadena `301` —compruebe el salto con el [Verificador de Redirecciones](/es/herramientas/redirect-checker).
4. **Choque con `X-Robots-Tag`:** una cabecera HTTP `X-Robots-Tag: noindex` en Nginx o CDN anula el `<meta name="robots" content="index">`; audítela con el [Verificador de Cabeceras HTTP](/es/herramientas/http-header-checker).
