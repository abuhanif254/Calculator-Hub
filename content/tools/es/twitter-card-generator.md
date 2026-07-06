---
metaTitle: "Generador de Twitter Card | Vista Previa de X y Etiquetas HTML"
metaDescription: "Genere etiquetas meta de Twitter Cards válidas (X). Cree tarjetas de Resumen, Aplicación y Reproductor con renderizado en tiempo real y exportación HTML."
metaKeywords: "generador twitter card, etiquetas meta twitter, generador de tarjeta x, generador vista previa, herramienta seo twitter, validador twitter card, generador summary card"
title: "Generador de Twitter Card"
shortDescription: "Genere etiquetas meta válidas para Twitter (X) con vista previa en tiempo real. Cree tarjetas de Resumen, App y Reproductor con exportación HTML."
faqs:
  - question: "¿Cuál es la diferencia entre Summary Card y Summary Large Image Card en X?"
    answer: "Una 'Summary Card' muestra una miniatura cuadrada pequeña a la izquierda junto al texto (mínimo 144x144 px). Una 'Summary Large Image Card' muestra un banner ancho en la parte superior (recomendado 1200x628 px). La imagen grande es ideal para contenido visual como noticias y artículos de blogs."
  - question: "¿Necesito las etiquetas de Twitter Card y Open Graph en mis páginas?"
    answer: "No necesariamente. La plataforma X recurre a las etiquetas Open Graph si faltan las específicas de Twitter. Si usa las mismas etiquetas para ambas plataformas, solo necesita 'twitter:card' y el resto en Open Graph. Sin embargo, para optimización específica, debe usar ambas."
  - question: "¿Cuál es el tamaño de imagen recomendado para las Twitter Cards?"
    answer: "Para 'Summary Cards', mínimo 144x144 píxeles (proporción 1:1). Para 'Summary Large Image', 1200x628 píxeles (proporción 1.91:1). Deben pesar menos de 5 MB, usar HTTPS y formato JPEG, PNG, GIF o WebP. Los SVG no son compatibles."
  - question: "¿Por qué no aparece mi Twitter Card al compartir un enlace en X?"
    answer: "Causas comunes: 1) Falta la etiqueta 'twitter:card'. 2) URL de imagen relativa en lugar de absoluta (HTTPS). 3) Bloqueo del rastreador Twitterbot en robots.txt. 4) Servir imágenes a través de HTTP. 5) La memoria caché de X muestra datos obsoletos (use el Validador)."
  - question: "¿Cómo borro la memoria caché de vista previa de la tarjeta en X?"
    answer: "X almacena en caché los metadatos de las tarjetas durante 7 días. Para forzar una actualización, visite la herramienta Card Validator (cards-dev.x.com/validator), ingrese su URL y haga clic en 'Preview card' (Vista previa). Esto obliga a Twitterbot a volver a rastrear su página."
features:
  - "Constructor interactivo que soporta 4 tipos de tarjeta: Summary, Summary Large Image, App, Player."
  - "Vista previa realista que refleja cómo se verán las tarjetas en X (Twitter)."
  - "Detección de reserva automática de Open Graph."
  - "Analizador de dimensión de imagen y zona segura de recorte."
  - "Advertencias de truncamiento de caracteres en tiempo real (70 para título, 200 para descripción)."
  - "Constructor de App Card con paneles iOS y Android."
  - "Ejecución 100% del lado del cliente, protegiendo su privacidad."
useCases:
  - "Generar código de Twitter Card para maximizar las tasas de clics en X."
  - "Construir etiquetas de App Card para campañas de instalación de aplicaciones móviles."
  - "Previsualizar cómo se renderizarán las tarjetas de imagen grande."
  - "Crear código de Player Card para incrustar videos (para podcasters y streamers)."
howToSteps:
  - "Seleccione el tipo de tarjeta: Summary, Summary Large Image, App o Player."
  - "Ingrese el título (máx. 70 caracteres) y la descripción (máx. 200 caracteres)."
  - "Proporcione la URL HTTPS absoluta de su imagen o arrastre y suelte una imagen."
  - "Agregue los handles de Twitter (@usuario) para atribuir el sitio y el autor."
  - "Revise el panel de vista previa en vivo para verificar el diseño."
  - "Haga clic en 'Copiar HTML' o 'Descargar' y pegue el código generado en la sección <head> de su web."
---

## Introducción a las Twitter Cards y la plataforma X

Cuando los usuarios comparten enlaces en Twitter (ahora **X**), la plataforma expande automáticamente esos enlaces en tarjetas ricas en contenido visual. Estas expansiones, conocidas como **Twitter Cards** (Tarjetas de Twitter), transforman tweets ordinarios en publicaciones multimedia que aumentan drásticamente el compromiso y el porcentaje de clics (CTR).

Las Twitter Cards funcionan con un conjunto de etiquetas `<meta>` especializadas dentro de la sección `<head>` de una página web. Cuando el rastreador de X (llamado **Twitterbot**) visita una URL, lee estas etiquetas para construir la vista previa. Sin ellas, los enlaces aparecen solo como texto sin contexto, reduciendo la participación del usuario en un 40%.

---

## Tipos de Tarjetas de Twitter (X)

X admite cuatro tipos distintos de tarjetas:

### 1. Summary Card (Tarjeta de Resumen)
Es el tipo de tarjeta más utilizado. Muestra una miniatura cuadrada pequeña a la izquierda, con el título, descripción y dominio a la derecha. 

### 2. Summary Large Image Card (Resumen con Imagen Grande)
Similar a la tarjeta de resumen, pero presenta una imagen grande de ancho completo en la parte superior. Ideal para contenido visual, fotografía y artículos de noticias. **Recibe la mayor cantidad de clics en la línea de tiempo.**

### 3. App Card (Tarjeta de Aplicación)
Diseñada específicamente para la promoción de aplicaciones móviles. Muestra el ícono de la aplicación, nombre, calificación, precio y un botón de instalación directa (iOS o Android).

### 4. Player Card (Tarjeta de Reproductor)
Permite la incrustación de video o audio directamente dentro del tweet. Requiere una URL de reproductor compatible con iframe y segura (HTTPS).

---

## Las Etiquetas de Twitter Clave

Para configurar una integración válida, debe incluir al menos estas etiquetas en su encabezado HTML:

```html
<meta name=\"twitter:card\" content=\"summary_large_image\" />
<meta name=\"twitter:site\" content=\"@nexuscalculator\" />
<meta name=\"twitter:title\" content=\"El Título\" />
<meta name=\"twitter:description\" content=\"La descripción\" />
<meta name=\"twitter:image\" content=\"https://ejemplo.com/imagen.jpg\" />
```

* `twitter:card`: Es obligatoria y no tiene etiqueta de respaldo en Open Graph. (Valores: `summary`, `summary_large_image`, `app`, `player`).
* `twitter:title`: El título (menos de 70 caracteres para evitar truncamientos).
* `twitter:description`: Resumen corto (menos de 200 caracteres).
* `twitter:image`: URL absoluta de la imagen.

---

## Comparación: Twitter Cards vs. Open Graph

Muchos desarrolladores se preguntan si necesitan ambas etiquetas. X está diseñado para recurrir a las etiquetas Open Graph (OG) cuando faltan las específicas de Twitter. Por ejemplo, si falta `twitter:title`, X usará `og:title`.

La única etiqueta que **no tiene respaldo** es `twitter:card`. Sin ella, X utiliza de forma predeterminada el tipo de tarjeta `summary` (pequeña).

---

## Errores Comunes de los Desarrolladores

1. **Olvidar la etiqueta `twitter:card`**: X se predeterminará a una tarjeta de resumen básica si omite esta etiqueta.
2. **Uso de URL de imágenes relativas**: El rastreador necesita rutas absolutas completas (`https://ejemplo.com/img.jpg`).
3. **Imágenes en HTTP**: X requiere que todos los recursos de imagen se sirvan mediante **HTTPS**.
4. **Bloquear a Twitterbot**: Si su `robots.txt` no permite el rastreo a *Twitterbot*, la tarjeta no se renderizará.
5. **No usar el Validador**: Para asegurarse de que el caché está vacío y las imágenes funcionan, siempre pruebe en el *Card Validator*.

Utilizando nuestro **Generador de Twitter Card**, puede analizar su imagen, probar la vista previa y asegurarse de que los enlaces de su sitio destaquen en la línea de tiempo de X de inmediato.
