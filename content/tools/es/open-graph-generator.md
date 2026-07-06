---
metaTitle: "Generador de Open Graph | Vista Previa de Facebook, Twitter y LinkedIn"
metaDescription: "Cree, previsualice y genere etiquetas de metadatos Open Graph (OG) para Facebook, LinkedIn, Slack y Discord. Simule tarjetas en tiempo real."
metaKeywords: "generador open graph, etiquetas og, vista previa open graph, vista previa facebook, simulador de publicaciones linkedin, tamaño de imagen og, simulador twitter"
title: "Generador de Open Graph"
shortDescription: "Diseñe, previsualice y genere etiquetas de metadatos Open Graph (OG) para redes sociales. Previsualice tarjetas de uso compartido en tiempo real."
faqs:
  - question: "¿Cuál es la diferencia entre las etiquetas meta HTML estándar y las etiquetas Open Graph?"
    answer: "Las etiquetas meta HTML estándar (como 'title' y 'description') están diseñadas específicamente para motores de búsqueda (como Google y Bing). Las etiquetas Open Graph (con el prefijo 'og:') están diseñadas para plataformas sociales (como Facebook y LinkedIn) para mostrar fragmentos enriquecidos (tarjetas) cuando se comparten enlaces."
  - question: "¿Cuál es la dimensión ideal para una imagen Open Graph?"
    answer: "La dimensión recomendada para una imagen de pantalla panorámica es de 1200 x 630 píxeles. Esto coincide con la relación de aspecto estándar de 1.91:1. Si desea asegurarse de que su imagen se muestre correctamente en aplicaciones como WhatsApp (que recorta las vistas previas en un cuadrado), mantenga el contenido clave en un cuadrado seguro de 630 x 630."
  - question: "¿Por qué la imagen de vista previa no aparece en WhatsApp?"
    answer: "Esto generalmente es causado por dos problemas: 1) La URL de la imagen es relativa (ej., '/images/og.png') en lugar de absoluta ('https://.../og.png'). 2) El tamaño del archivo de imagen supera los 300 KB. WhatsApp ignora las imágenes que superan este límite."
  - question: "¿Cómo borro la vista previa en caché en Facebook o LinkedIn?"
    answer: "Si actualiza sus etiquetas, la vista previa no cambiará de inmediato. Debe visitar Facebook Sharing Debugger o LinkedIn Post Inspector y hacer clic en 'Scrape Again' (Extraer de nuevo) o 'Inspect' para forzar a sus servidores a borrar el caché."
  - question: "¿Google usa etiquetas Open Graph para clasificar páginas web?"
    answer: "No, Google no utiliza etiquetas Open Graph como señal de clasificación directa. Sin embargo, implementarlas aumenta los clics, el tráfico y las acciones sociales, lo que indirectamente ayuda a su SEO."
features:
  - "Constructor interactivo para propiedades estándar y especializadas (Artículo, Producto, Perfil)."
  - "Carga de imágenes (drag & drop) con análisis automático de relación de aspecto y tamaño."
  - "Vistas previas realistas para Facebook, LinkedIn, Discord, Slack, WhatsApp, y Twitter."
  - "Medidor de completitud de Open Graph con advertencias automáticas."
  - "Plantillas preconstruidas (SaaS, Blog, E-commerce, Portafolio)."
  - "Persistencia en el historial local para guardar su progreso."
  - "Ejecución 100% del lado del cliente, garantizando privacidad."
useCases:
  - "Optimizar las vistas previas de enlaces compartidos en Facebook para aumentar el CTR (clics)."
  - "Crear tarjetas ricas en productos de comercio electrónico que muestren precios y niveles de stock."
  - "Formatear artículos de blog técnicos con fechas de publicación, etiquetas y perfiles de autor."
  - "Validar resoluciones y relaciones de aspecto de imágenes antes de subirlas a producción."
howToSteps:
  - "Seleccione una plantilla desde la barra de configuración o comience desde cero."
  - "Ingrese el Título de la página, Descripción y URL Canónica."
  - "Cargue una imagen de vista previa o inserte una URL directa."
  - "En 'Tipo de objeto OG', seleccione el tipo de esquema (ej. Artículo o Producto) para revelar campos personalizados."
  - "Revise el panel de advertencias (como límites de caracteres o imágenes sin URL absoluta)."
  - "Alterne entre las pestañas sociales (Facebook, LinkedIn, etc.) para verificar el diseño."
  - "Haga clic en 'Copiar HTML' o 'Descargar' y pegue el código en el <head> de su sitio web."
---

## Introducción al Protocolo Open Graph

En el ecosistema web moderno, el tráfico no solo se genera a través de los resultados de búsqueda. Una parte masiva es impulsada por usuarios que comparten enlaces en redes sociales y aplicaciones de chat (Facebook, LinkedIn, X, WhatsApp). Cuando se comparte un enlace, los usuarios rara vez ven una simple URL de texto. En cambio, ven una tarjeta de vista previa atractiva.

Esta rica interacción visual se rige por el **Protocolo Open Graph (OGP)**. Creado por Facebook en 2010, fue diseñado para facilitar que las páginas web se conviertan en objetos valiosos en un \"gráfico social\". Al colocar etiquetas `<meta>` estándar en el encabezado HTML, los desarrolladores controlan cómo se muestran sus sitios web.

---

## Por qué es Importante Open Graph

Las etiquetas Open Graph tienen un impacto masivo en el SEO y las tasas de conversión a través de:

1. **Optimización del Porcentaje de Clics (CTR)**: Una tarjeta bien formateada con una imagen de alta resolución tiene muchas más probabilidades de recibir clics que una URL simple.
2. **Control y Protección de Marca**: Al especificar `og:image` y `og:title`, evita que las plataformas sociales elijan una foto genérica.
3. **Prueba Social**: Las vistas previas ricas hacen que los enlaces compartidos parezcan legítimos y profesionales.

---

## Comportamientos de las Plataformas Sociales

Cada plataforma analiza las etiquetas de forma distinta:

### 1. Facebook: El Estándar
Es el analizador más estricto. Recomienda una relación de aspecto de **1.91:1** (idealmente **1200 x 630 píxeles**). Si la imagen es más pequeña de 600 x 315, se encogerá en un pequeño cuadrado a la izquierda, perdiendo visibilidad.

### 2. LinkedIn: Para B2B
Utiliza el formato panorámico. LinkedIn recorta los títulos a los **70 caracteres** y las descripciones a unos **150 caracteres**. El caché es bastante agresivo.

### 3. Slack y Discord: Comunidades
Slack muestra bordes grises y autores, mientras que Discord agrega barras de acento de colores que pueden configurarse vía metadatos HTML (`theme-color`).

### 4. WhatsApp
WhatsApp genera la vista previa localmente. Solo muestra un pequeño cuadrado (relación de aspecto 1:1). Además, si su imagen `og:image` pesa más de **300 KB**, WhatsApp no la mostrará en absoluto.

---

## Guía de las Etiquetas Open Graph Principales

Para configurar una integración válida, debe incluir cuatro propiedades necesarias en su encabezado HTML:

```html
<meta property=\"og:title\" content=\"El Título\" />
<meta property=\"og:type\" content=\"website\" />
<meta property=\"og:image\" content=\"https://ejemplo.com/imagen.jpg\" />
<meta property=\"og:url\" content=\"https://ejemplo.com/url-canonico\" />
```

* `og:title`: El titular (menos de 60 caracteres).
* `og:description`: Resumen corto (ideal 60-90 caracteres).
* `og:image`: La URL absoluta de la imagen.
* `og:type`: El tipo de objeto (ej. `website`, `article`, `product`).

---

## Tipos de Objetos Open Graph Especializados

Por defecto, se usa `website`. Pero existen otros:

### 1. El Objeto Artículo (`article`)
Para blogs y noticias. Añade metadatos temporales:
* `article:published_time`: Fecha de publicación ISO 8601.
* `article:author`: Enlaces al perfil del autor.

### 2. El Objeto Producto (`product`)
Para artículos de comercio electrónico. Las plataformas pueden mostrar los precios:
* `product:price:amount`: El precio numérico (ej., `49.99`).
* `product:price:currency`: Código de moneda (ej., `EUR`).
* `product:availability`: Estado del inventario (`instock`, `oos`).

---

## Mejores Prácticas para la Imagen Open Graph (OG Image)

* **Dimensiones**: Objetivo **1200 x 630 píxeles**.
* **Formato de Archivo**: Utilice PNG, JPEG o WebP. Los SVG no son compatibles.
* **Zona Segura**: Asegúrese de que el texto esté centrado en un cuadrado de **630 x 630** para evitar que WhatsApp lo recorte.
* **Tamaño del Archivo**: Por debajo de los 300 KB.

Utilizando nuestro **Generador de Open Graph**, puede probar la apariencia, la resolución y generar un código seguro, todo localmente desde su navegador.
