---
metaTitle: "Generador de Open Graph | Vista Previa Social y OG Tags"
metaDescription: "Cree y valide etiquetas Open Graph con vista previa en Facebook, LinkedIn, Slack, Discord y WhatsApp, más análisis local de tamaño y peso."
metaKeywords: "generador open graph, etiquetas og, vista previa open graph, simulador facebook, vista previa linkedin, tarjeta whatsapp og image, embed discord slack, tamaño imagen open graph, protocolo ogp"
title: "Generador de Open Graph"
shortDescription: "Diseñe, valide y previsualice metadatos Open Graph (OGP) para Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram e iMessage con inspección local de dimensiones, relación de aspecto y peso en KB."
faqs:
  - question: "¿Por qué las etiquetas Open Graph exigen el atributo property en lugar del atributo name?"
    answer: "El Protocolo Open Graph se fundamenta en RDFa (Resource Description Framework in Attributes), que define predicados semánticos mediante property='og:*' en lugar del atributo estándar name de HTML. Rastreadores estrictos como facebookexternalhit o LinkedInBot pueden descartar completamente las etiquetas escritas con name='og:title'."
  - question: "¿Por qué WhatsApp no muestra mi miniatura Open Graph cuando Facebook y LinkedIn la renderizan bien?"
    answer: "WhatsApp descarga la vista previa desde el dispositivo del remitente aplicando un techo estricto de peso cercano a 300 KB y recorta la miniatura en formato cuadrado 1:1. Si su imagen og:image supera los 300 KB, atraviesa demasiadas redirecciones o utiliza formato SVG, WhatsApp omite la imagen por completo."
  - question: "¿Qué sucede con mis archivos cuando arrastro una imagen local al previsualizador?"
    answer: "El navegador lee el archivo localmente mediante la API FileReader para medir dimensiones exactas en píxeles, relación de aspecto y peso en kilobytes sin subirlo a ningún servidor. Al exportar el código HTML, las URI data: se sustituyen automáticamente por una URL HTTPS de marcador de posición para recordar el enlace definitivo en producción."
  - question: "¿Por qué conviene declarar explícitamente og:image:width y og:image:height en el HTML?"
    answer: "Cuando una URL nueva se comparte por primera vez, el rastreador de Facebook lee el HTML de forma síncrona mientras descarga y decodifica la imagen de manera asíncrona. Declarar las dimensiones exactas permite reservar la geometría de la tarjeta en ese primer envío en lugar de mostrar una vista previa sin imagen hasta un segundo rastreo."
  - question: "¿Cómo obligo a Facebook, LinkedIn o Telegram a refrescar una tarjeta Open Graph almacenada en caché?"
    answer: "Las plataformas sociales almacenan en caché los metadatos indexados por og:url durante días. Tras actualizar su HTML, fuerce un nuevo rastreo con Meta Sharing Debugger, LinkedIn Post Inspector o @WebpageBot en Telegram, y versione además la URL de la imagen (por ejemplo, og-v2.jpg o ?v=2) para invalidar la caché de activos binarios."
features:
  - "Siete simuladores en tiempo real que reproducen tarjetas de Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram y Apple iMessage."
  - "Inspector local de imágenes por arrastrar y soltar mediante FileReader con validación de resolución, proporción 1.91:1 y umbral de 300 KB de WhatsApp."
  - "Constructores semánticos para seis tipos de objeto OGP: website, article, product, profile, video y music."
  - "Auditor automático de completitud sobre 100 puntos que señala URLs relativas, recorte de titulares (40-60 caracteres), descripciones extensas y ausencia de og:image:alt."
  - "Siete plantillas iniciales orientadas a SaaS, artículos editoriales, comercio electrónico, portafolios, empresas, noticias y utilidades técnicas."
  - "Importación y exportación de configuraciones en JSON, descarga directa del archivo HTML e historial de sesiones en localStorage 100% en cliente."
useCases:
  - "Comprobar que logotipos y titulares sobreviven tanto al recorte panorámico 1.91:1 de Facebook y LinkedIn como al recorte cuadrado 1:1 de WhatsApp."
  - "Construir etiquetas comerciales product:price:amount, currency, availability y retailer_item_id para fichas de tiendas online y catálogos sociales."
  - "Añadir fechas ISO 8601 (article:published_time), autoría (article:author), sección y etiquetas repetibles article:tag a plantillas editoriales y blogs."
  - "Validar creatividades de lanzamientos bajo embargo directamente en el navegador sin exponer recursos confidenciales a servicios externos."
  - "Unificar tarjetas enriquecidas en Slack y Discord al compartir documentación de APIs, notas de versión y enlaces de repositorios técnicos."
  - "Exportar configuraciones JSON estandarizadas de Open Graph para sistemas de diseño multimarca y entregas entre equipos de diseño e ingeniería."
howToSteps:
  - "Elija una plantilla inicial (SaaS, Blog, Tienda, Portafolio, Empresa, Noticias o Herramienta) o introduzca sus datos desde cero en la pestaña principal."
  - "Redacte un og:title de 40 a 60 caracteres y una og:description de 60 a 90 caracteres junto con una og:url absoluta en HTTPS y el código og:locale (por ejemplo, es_ES o es_MX)."
  - "Abra la pestaña de imagen para pegar una URL HTTPS alojada o arrastrar un archivo PNG, JPEG o WebP local y verificar sus píxeles, proporción y peso en KB."
  - "Complete el texto alternativo og:image:alt para accesibilidad y compruebe que la imagen cumple el formato 1.91:1 y se mantiene por debajo de 300 KB."
  - "Si seleccionó og:type como article, product, profile, video o music, rellene las propiedades específicas del espacio de nombres correspondiente."
  - "Alterne entre las siete vistas previas sociales, resuelva las alertas del panel de puntuación y copie o descargue el bloque HTML para su cabecera."
---

Cuando alguien comparte un enlace en Slack, LinkedIn, Facebook, Discord, Telegram o WhatsApp, un rastreador automatizado (*unfurler*) lanza una petición HTTP `GET` ligera, lee el `<head>` estático sin ejecutar JavaScript en cliente y construye una tarjeta visual a partir del **Protocolo Open Graph (OGP)**. Como cada plataforma aplica recortes, límites de peso y ventanas de truncado distintos, improvisar estos metadatos deriva en titulares cortados o miniaturas ausentes. Este **Generador de Open Graph** permite diseñar, validar y simular tarjetas multiplataforma localmente, inspeccionando incluso imágenes locales mediante `FileReader` sin subir activos confidenciales a servidores externos.

## Comportamiento de los rastreadores sociales frente a Open Graph

Creado por Facebook en 2010 sobre **RDFa**, el estándar OGP exige cuatro propiedades base —`og:title`, `og:type`, `og:image` y `og:url`— declaradas con `property="og:*"`. A partir de ellas, las plataformas difieren notablemente en descarga, recorte y caché:

| Plataforma y bot | Tamaño y relación óptimos | Recorte y tarjeta | Peso y caché | Truncado práctico |
| :--- | :--- | :--- | :--- | :--- |
| **Facebook** (`facebookexternalhit`) | 1200 × 630 px (`1.91:1`); mín. 600 × 315 px | Banner ancho; pasa a cuadrado bajo 600 px | Hasta 8 MB; caché hasta re-rastreo | Título ~60; desc. ~65–90 car. |
| **LinkedIn** (`LinkedInBot`) | 1200 × 627 px (`1.91:1`); mín. 200 px ancho | Tarjeta panorámica; omite bajo 200 px | Hasta 5 MB; caché ~7 días (Post Inspector) | Título ~70; sin desc. en feed |
| **Discord** (`Discordbot`) | 1200 × 630 px (`1.91:1`) | Tarjeta oscura con borde (`theme-color`); grande con `summary_large_image` | Lee `og:site_name`, título y descripción | Título ~256; desc. ~350 car. |
| **Slack** (`Slackbot-LinkExpanding`) | 1200 × 630 px (`1.91:1`) | Tarjeta compacta lateral con autor opcional | Caché agresiva por URL de imagen | Título ~70; desc. ~150 car. |
| **WhatsApp** (`WhatsApp`) | 1200 × 630 px con zona `1:1` central | Miniatura cuadrada móvil o vista ancha | **Techo ~300 KB**; oculta si pesa más | Título ~60; desc. ~80–100 car. |
| **Telegram** (`TelegramBot`) | 1200 × 630 px (`1.91:1`) | Burbuja enriquecida / Instant View | Purga bajo demanda vía `@WebpageBot` | Título ~65; desc. ~140 car. |
| **Apple iMessage** (`LPLinkMetadata`) | 1200 × 630 px (`1.91:1`) | Burbuja redondeada con título e imagen | Descarga en emisor; caché por chat | Título ~50–60; sin descripción |

## Geometría, zona segura y preasignación en caché fría

Una portada social fiable en cualquier feed y chat móvil depende de cuatro reglas técnicas:

1. **Lienzo `1.91:1` con zona segura `1:1`:** exporte a `1200 × 630` px y centre logotipos y texto dentro de un cuadrado interior de `630 × 630` px para evitar cortes en WhatsApp y miniaturas estrechas.
2. **Peso inferior a 300 KB:** los PNG fotográficos superan con facilidad los 800 KB y desaparecen en WhatsApp. Ajuste dimensiones con [Redimensionar Imagen](/es/herramientas/resize-image) y optimice en JPEG progresivo o WebP con [Comprimir Imagen](/es/herramientas/compress-image).
3. **Preasignación en caché fría:** en el primer compartido de una URL nueva, el bot analiza el HTML antes de decodificar la imagen asíncronamente. Declarar `og:image:width`, `og:image:height`, `og:image:type` y `og:image:alt` asegura que la tarjeta completa aparezca desde el primer envío.
4. **Sin SVG ni URIs `data:` en producción:** ningún bot principal rasteriza SVG ni lee imágenes Base64 incrustadas. Al arrastrar un borrador local, `FileReader` lo previsualiza en su equipo mientras el HTML exportado inserta una URL `https://` de marcador de posición.

## Espacios de nombres especializados y comprobación en consola

Más allá de `og:type="website"`, los tipos verticales enriquecen fichas comerciales y editoriales con metadatos estructurados:

```html
<!-- Metadatos Open Graph + espacio de nombres Product -->
<meta property="og:type" content="product" />
<meta property="og:title" content="Teclado Mecánico Ergonómico Zenith Pro" />
<meta property="og:description" content="Chasis de aluminio CNC con montaje gasket e interruptores intercambiables en caliente." />
<meta property="og:url" content="https://tienda.ejemplo.com/productos/zenith-pro" />
<meta property="og:image" content="https://tienda.ejemplo.com/og/zenith-pro-v2.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Vista cenital del teclado ergonómico de aluminio Zenith Pro" />
<meta property="og:site_name" content="ErgoKeys" />
<meta property="og:locale" content="es_ES" />

<meta property="product:price:amount" content="189.99" />
<meta property="product:price:currency" content="EUR" />
<meta property="product:availability" content="instock" />
<meta property="product:condition" content="new" />
<meta property="product:retailer_item_id" content="EK-ZENITH-PRO" />
```

En `og:type="article"`, utilice marcas temporales ISO 8601 UTC (`article:published_time`, `article:modified_time`), enlaces de perfil en `article:author`, sección temática y líneas repetibles `article:tag` —una etiqueta `<meta>` independiente por tema, nunca separadas por comas. Para audiencias internacionales, declare `og:locale` en formato `idioma_TERRITORIO` (como `es_ES` o `es_MX`) acompañado de etiquetas `og:locale:alternate` y asegure siempre rutas `https://` absolutas con certificado TLS válido, ya que los rastreadores modernos rechazan redirecciones mixtas de `http://` o certificados autofirmados.

Antes de publicar una campaña, compruebe desde consola qué recibe exactamente un bot social sin JavaScript:

```bash
curl -sL -A "facebookexternalhit/1.1" https://tienda.ejemplo.com/productos/zenith-pro \
  | grep -iE 'property="og:|property="product:'
```

## Depuración de caché, WAF y fallos de despliegue

Incluso etiquetas sintácticamente perfectas fallan en producción por cuatro incidencias habituales:

- **Confusión `property` frente a `name`:** Open Graph exige `property="og:..."`, mientras X utiliza `name="twitter:..."`. Combine ambos protocolos con el [Generador de Twitter Cards](/es/herramientas/twitter-card-generator) y gestione el resto del `<head>` desde el [Generador de Meta Etiquetas](/es/herramientas/meta-tag-generator).
- **WAF bloqueando bots sociales:** cortafuegos que retan agentes no interactivos devuelven `403` a `LinkedInBot` o `Slackbot-LinkExpanding`; inspeccione las respuestas reales con el [Verificador de Cabeceras HTTP](/es/herramientas/http-header-checker).
- **Imágenes sobrescritas sin versionado:** los activos binarios se cachean aparte del HTML; cambie siempre la ruta (`/og/portada-v2.jpg`) antes de purgar la URL.
- **Inyección solo en cliente (SPA):** renderice siempre `og:*` en servidor (SSR) o en el borde (*edge*), nunca tras la hidratación en navegador.
