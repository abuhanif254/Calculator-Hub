---
metaTitle: "Generador de Twitter Card | Vista Previa de X y Meta Tags"
metaDescription: "Cree etiquetas meta de Twitter Cards válidas para X (Summary, Imagen Grande, App y Player) con vista previa móvil/escritorio y validación local."
metaKeywords: "generador twitter card, etiquetas meta twitter, tarjetas de x, vista previa twitter, validador twitter card, summary large image, app card x, player card, open graph twitter"
title: "Generador de Twitter Card"
shortDescription: "Genere etiquetas meta conformes al estándar de X (Twitter) para tarjetas Summary, Summary Large Image, App y Player con vista previa en escritorio y móvil, sincronización Open Graph y puntuación de calidad en tiempo real."
faqs:
  - question: "¿Siguen utilizándose las etiquetas twitter:* tras el cambio de marca de Twitter a X?"
    answer: "Sí. Por retrocompatibilidad con millones de sitios web, X mantiene intacto el espacio de nombres twitter:* y el agente de rastreo Twitterbot. Escribir etiquetas como x:card o x:title no es válido y el analizador de la plataforma las ignorará por completo."
  - question: "Si mi página ya incluye etiquetas Open Graph, ¿qué etiqueta de Twitter Card sigue siendo obligatoria?"
    answer: "Debe declarar al menos <meta name='twitter:card' content='summary_large_image' /> (o summary, app o player). X recurre automáticamente a og:title, og:description y og:image cuando faltan sus equivalentes de Twitter, pero twitter:card no tiene respaldo en Open Graph."
  - question: "¿Por qué las Twitter Cards utilizan el atributo name en lugar de property?"
    answer: "A diferencia de Open Graph, que se apoya en el atributo property de RDFa, la especificación de Twitter Cards define todas sus directivas bajo el atributo estándar HTML name (por ejemplo, name='twitter:title'). Aunque Twitterbot a veces tolera property, los validadores estrictos esperan name."
  - question: "¿Qué requisitos técnicos debe cumplir una Player Card para funcionar en X?"
    answer: "Requiere un punto final embebible estrictamente bajo HTTPS (twitter:player), dimensiones explícitas en píxeles (twitter:player:width y twitter:player:height), una imagen de respaldo y cabeceras de marco permisivas que no envíen X-Frame-Options: DENY. Además, el reproductor debe ser adaptable y no reproducir audio automáticamente."
  - question: "¿Cómo fuerzo la actualización de una tarjeta de X almacenada en caché?"
    answer: "X almacena los metadatos de cada URL durante aproximadamente siete días. Tras corregir el HTML, añada un parámetro de versión a la URL de la imagen (por ejemplo, portada-v2.jpg o ?v=2) para invalidar la caché de activos binarios y compruebe el enlace en el compositor de X."
features:
  - "Generador completo compatible con los cuatro formatos oficiales de X: Summary, Summary Large Image, App Card (iPhone, iPad y Google Play) y Player Card."
  - "Simulador en tiempo real para cronología de escritorio y móvil que reproduce el recorte de caracteres y la relación de aspecto de la imagen."
  - "Analizador de calidad sobre 100 puntos que valida límites de título (70 car.) y descripción (200 car.), URLs HTTPS absolutas, handles con @ y campos obligatorios por formato."
  - "Interruptor de sincronización con Open Graph que emite etiquetas emparejadas property='og:*' para garantizar cobertura coherente en Facebook, LinkedIn y Slack."
  - "Cinco plantillas sectoriales (artículo de blog, ficha de producto, landing SaaS, portafolio y noticia) con escapado automático de comillas HTML."
  - "Copia individual por etiqueta, exportación completa en texto plano o JSON e historial local de hasta 30 sesiones en localStorage sin envío de datos a servidores."
useCases:
  - "Validar portadas de 1200x628 px y titulares concisos para tarjetas Summary Large Image antes de publicar artículos técnicos o lanzamientos."
  - "Configurar App Cards con identificadores numéricos del App Store de Apple y paquetes de Google Play para impulsar instalaciones móviles directas desde X."
  - "Incrustar pódcasts, vídeos o demostraciones interactivas directamente dentro del feed de X mediante iframes HTTPS de Player Card."
  - "Auditar la atribución editorial de cuenta corporativa (twitter:site) y autoría individual (twitter:creator) en redacciones y blogs de ingeniería."
  - "Eliminar la duplicación de trabajo sincronizando campos de Twitter Card y Open Graph desde un único editor en campañas de lanzamiento."
  - "Compartir plantillas JSON reutilizables entre equipos de marketing, diseño y desarrollo frontend sin subir activos confidenciales a servicios externos."
howToSteps:
  - "Cargue una de las cinco plantillas iniciales o seleccione directamente el tipo de tarjeta (Summary, Summary Large Image, App o Player) en el editor."
  - "Introduzca el título (hasta 70 caracteres), la descripción (hasta 200 caracteres), la URL canónica y una URL HTTPS absoluta de imagen con texto alternativo."
  - "Indique los usuarios con prefijo @ en twitter:site y twitter:creator para vincular correctamente el medio publicador y el autor del contenido."
  - "Si diseña una App Card o Player Card, rellene los identificadores de tiendas iOS/Android o la URL HTTPS del reproductor junto con su ancho y alto en píxeles."
  - "Active la opción de sincronización con Open Graph si desea generar etiquetas og:* emparejadas y revise el resultado en escritorio y móvil desde la vista previa."
  - "Inspeccione el panel analizador hasta alcanzar una puntuación de 100/100 y copie cada etiqueta, el bloque HTML completo o la configuración exportada en JSON."
---

Cuando se comparte un enlace en X (antes Twitter), una URL desnuda pasa inadvertida y pierde jerarquía visual. Las **Twitter Cards** indican al rastreador `Twitterbot` cómo expandir ese enlace en una tarjeta enriquecida: miniatura cuadrada compacta, banner editorial de ancho completo, ficha de instalación móvil o reproductor HTML5 incrustado. Pese al cambio de marca, la especificación sigue dependiendo exclusivamente del espacio de nombres `twitter:*` bajo `<meta name="...">`. Este generador compila marcado válido, simula la cronología en escritorio y móvil y puntúa cada etiqueta en su navegador, sin enviar borradores ni configuraciones a servidores externos.

## Especificación técnica de los cuatro formatos de tarjeta en X

El valor de `twitter:card` determina el espacio asignado en el feed y los campos que exige `Twitterbot` antes de construir la vista previa:

| Tipo (`twitter:card`) | Geometría y límites de imagen | Etiquetas obligatorias | Comportamiento y caso óptimo |
| :--- | :--- | :--- | :--- |
| **`summary`** | Cuadrada `1:1`; mín. `144 × 144` px (ideal `400 × 400`), máx. 5 MB | `twitter:card`, `twitter:title` (o `og:title`) | Miniatura lateral junto al título y dominio; ideal para perfiles, documentación y portafolios. |
| **`summary_large_image`** | Panorámica `2:1` / `1.91:1`; mín. `300 × 157` px (ideal `1200 × 628`), máx. 5 MB | `twitter:card`, `twitter:title`, `twitter:image` (o OG) | Banner de ancho completo sobre el titular; mayor CTR para blogs, noticias y SaaS. |
| **`app`** | Obtenida automáticamente de App Store o Google Play | `twitter:card`, `twitter:app:id:iphone` y/o `googleplay` | Ficha móvil nativa con icono, calificación, precio y enlace directo de descarga. |
| **`player`** | Póster con la proporción del iframe; mín. `262 × 262` px | `twitter:card`, `twitter:title`, `twitter:player`, `width`, `height`, `image` | `<iframe>` aislado en HTTPS que reproduce vídeo, audio o medios interactivos en el hilo. |

Las imágenes deben entregarse en **JPEG, PNG, WebP o GIF estático** (en GIF animados solo se renderiza el primer fotograma). Los archivos **SVG no son compatibles** y anulan la miniatura. Como los clientes web y móviles de X aplican ligeros recortes en los bordes de `summary_large_image` y superponen la etiqueta de dominio en la esquina inferior izquierda, mantenga logotipos y titulares clave dentro del 80 % central del lienzo `1200 × 628` px. Si sus portadas superan las medidas óptimas o pesan varios megabytes, ajústelas con [Redimensionar Imagen](/es/herramientas/resize-image) y optimícelas con [Comprimir Imagen](/es/herramientas/compress-image) para evitar tiempos de espera del bot.

## Orden de resolución y respaldo con Open Graph

Es habitual duplicar innecesariamente cada metadato social o, al contrario, omitir `twitter:card` creyendo que Open Graph basta. En la práctica, `Twitterbot` sigue una precedencia determinista:

1. **Formato obligatorio:** busca primero `<meta name="twitter:card">`. Open Graph carece de equivalente para elegir el diseño en X, por lo que omitirlo degrada o bloquea la tarjeta.
2. **Búsqueda primaria `twitter:*`:** lee `name="twitter:title"`, `name="twitter:description"`, `name="twitter:image"` y `name="twitter:image:alt"`.
3. **Respaldo en Open Graph:** solo cuando falta un campo de Twitter, recurre a `property="og:title"`, `property="og:description"`, `property="og:image"` y `property="og:image:alt"`.

Esta arquitectura ofrece dos flujos limpios: activar la sincronización Open Graph integrada para emitir textos idénticos en X, LinkedIn, Facebook y Slack, o redactar titulares específicos de 55 caracteres para X combinados con el [Generador de Open Graph](/es/herramientas/open-graph-generator) y el [Generador de Meta Etiquetas](/es/herramientas/meta-tag-generator). Mantenga siempre la distinción sintáctica (`name` frente a `property`) y escape las comillas internas como `&quot;`.

## App Cards, Player Cards y verificación desde terminal

Las tarjetas de aplicación y reproductor requieren parámetros exactos de tienda o de incrustación segura para validarse en producción:

```html
<!-- App Card de X (iOS + Android) -->
<meta name="twitter:card" content="app" />
<meta name="twitter:site" content="@acmeapp" />
<meta name="twitter:description" content="Coordina despliegues y alertas desde iOS y Android." />
<meta name="twitter:app:name:iphone" content="Acme Workspace" />
<meta name="twitter:app:id:iphone" content="1498765432" />
<meta name="twitter:app:name:googleplay" content="Acme Workspace" />
<meta name="twitter:app:id:googleplay" content="com.acme.workspace" />

<!-- Player Card de X (iframe HTTPS) -->
<meta name="twitter:card" content="player" />
<meta name="twitter:title" content="Episodio 42: Migraciones PostgreSQL sin caída" />
<meta name="twitter:player" content="https://media.ejemplo.com/embed/ep-42" />
<meta name="twitter:player:width" content="640" />
<meta name="twitter:player:height" content="360" />
<meta name="twitter:image" content="https://media.ejemplo.com/posters/ep-42-1200x675.jpg" />
<meta name="twitter:image:alt" content="Portada del episodio 42 sobre PostgreSQL" />
```

En **Player Cards**, la URL de `twitter:player` exige HTTPS válido y nunca debe devolver `X-Frame-Options: DENY` ni `Content-Security-Policy: frame-ancestors 'self'`, pues X mostraría un marco vacío. Audite esas cabeceras con el [Comprobador de Cabeceras HTTP](/es/herramientas/http-header-checker).

Igualmente crítico es el renderizado inicial: en aplicaciones SPA que inyectan metadatos tras cargar JavaScript en el navegador, `Twitterbot` recibe únicamente un `<head>` genérico sin etiquetas `twitter:*`. Asegúrese de emitir el bloque desde el servidor (por ejemplo, con SSR en Next.js, Nuxt o Astro) y compruébelo desde consola emulando al rastreador:

```bash
curl -sL -A "Twitterbot/1.0" https://ejemplo.com/blog/migraciones-postgres \
  | grep -iE 'name="twitter:|property="og:'
```

## Diagnóstico de fallos de rastreo y caché

Si un enlace publicado aparece sin tarjeta o con una imagen desactualizada, revise estos cinco puntos:

- **Bloqueo en `robots.txt`:** `Twitterbot` obedece el protocolo de exclusión. Un `Disallow: /` amplio o bloquear `/_next/image` impide montar la vista previa; revise las reglas de `User-agent: Twitterbot` en el [Generador de Robots.txt](/es/herramientas/robots-txt-generator).
- **URLs relativas o HTTP:** `twitter:image` y `twitter:player` exigen rutas absolutas `https://` con certificado TLS válido.
- **Redirecciones encadenadas y latencia:** el bot aborta tras pocos saltos (habitualmente 5) o respuestas lentas; sirva las miniaturas desde un CDN con estado `200 OK`.
- **Handles sin `@` ni texto alternativo:** `twitter:site` y `twitter:creator` deben incluir `@`, y `twitter:image:alt` (hasta 420 caracteres) garantiza accesibilidad en lectores de pantalla.
- **Caché perimetral (~7 días):** tras corregir una portada, versione el archivo o añada `?v=3` antes de probar el enlace para forzar una descarga fresca.
