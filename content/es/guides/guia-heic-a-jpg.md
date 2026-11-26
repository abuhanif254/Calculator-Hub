---
title: "HEIC vs JPG: Por qué los iPhones usan HEIC y cómo convertirlos"
description: "Comprenda la diferencia entre los formatos HEIC y JPG, por qué Apple cambió a HEIC y cómo convertir sus fotos para obtener la máxima compatibilidad."
category: "Design & Media"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "heic-to-jpg"
relatedType: "tool"
faqs:
  - question: "¿Cuál es la diferencia entre HEIF y HEIC en los dispositivos de Apple?"
    answer: "HEIF (High Efficiency Image File Format) es el estándar internacional del contenedor definido por el grupo MPEG bajo la norma ISO/IEC 23008-12. HEIC es la implementación específica que utiliza el códec de vídeo HEVC (H.265) para comprimir las imágenes dentro de ese contenedor, y es la extensión de archivo adoptada por defecto por Apple desde iOS 11 y macOS High Sierra."
  - question: "¿Se pierden los metadatos EXIF y la ubicación GPS al convertir de HEIC a JPG?"
    answer: "No necesariamente, aunque depende del conversor utilizado. Un conversor bien diseñado transfiere las etiquetas EXIF esenciales —como fecha de captura, modelo de cámara, exposición y distancia focal— hacia el archivo JPG resultante, permitiendo al mismo tiempo conservar o eliminar las coordenadas GPS según sus necesidades de privacidad antes de publicar las fotos."
  - question: "¿Por qué una fotografía HEIC puede verse con colores apagados tras convertirla mal a JPG?"
    answer: "Los teléfonos modernos capturan imágenes en el espacio cromático amplio Display P3 con profundidad de 10 bits, mientras que muchos programas y navegadores antiguos asumen que todo archivo JPG está en el espacio estándar sRGB de 8 bits. Si la conversión descarta el perfil ICC sin mapear adecuadamente las coordenadas de color de Display P3 hacia sRGB, los rojos y verdes saturados pierden intensidad."
  - question: "¿Qué nivel de calidad JPEG conviene usar al convertir archivos HEIC?"
    answer: "Un ajuste entre 88 % y 92 % ofrece el equilibrio óptimo: resulta visualmente indistinguible del original en pantallas y copias impresas, mantiene un peso contenido y evita la saturación de tamaño que produce el 100 % (donde el archivo JPG puede llegar a ser tres o cuatro veces más pesado que el HEIC de origen sin ganancia perceptual real)."
  - question: "¿Cómo puedo evitar que mi iPhone genere archivos HEIC si necesito compatibilidad inmediata con Windows o portales web?"
    answer: "Puede cambiar la configuración en Ajustes > Cámara > Formatos y seleccionar 'El más compatible' en lugar de 'Alta eficiencia'. Sin embargo, esto duplicará aproximadamente el espacio ocupado en el teléfono y desactivará ciertos modos de grabación de alta tasa de cuadros, por lo que suele ser preferible capturar en HEIC y convertir bajo demanda solo los lotes necesarios."
---

Desde el lanzamiento de iOS 11 en 2017, los teléfonos iPhone guardan las fotografías de forma predeterminada con extensión `.heic` en lugar de `.jpg`. Esta transición responde a una ventaja objetiva en eficiencia de almacenamiento y rango tonal: al utilizar el códec HEVC (H.265) dentro de un contenedor moderno, **HEIC reduce el peso de archivo entre un 45 % y un 55 % frente a JPG conservando una fidelidad visual equivalente**, además de admitir profundidad de color de `10 bits` y múltiples fotogramas en un único archivo.

No obstante, JPG continúa siendo el estándar universal exigido por portales gubernamentales, plataformas de comercio electrónico, equipos Windows sin extensiones de códec instaladas y quioscos de impresión comercial. Mediante nuestro [Convertidor de HEIC a JPG](/es/herramientas/heic-to-jpg), puede transformar lotes completos directamente en su navegador sin transferir fotografías personales a servidores externos.

## Arquitectura Técnica: Compresión HEVC frente a DCT (JPEG)

Aunque ambos formatos emplean compresión con pérdida, pertenecen a generaciones tecnológicas separadas por más de dos décadas de investigación en codificación visual y procesamiento de señales.

El estándar **JPEG** (ISO/IEC 10918-1, publicado en 1992) segmenta cada fotografía en bloques rígidos de `8 × 8` píxeles, aplica la Transformada Discreta del Coseno (DCT) y cuantifica las frecuencias espaciales altas. Opera nativamente con `8 bits` por canal (`2^8 = 256` niveles por primario, es decir, `16.77 millones` de colores), carece de canal alfa de transparencia y tiende a generar artefactos en bloque o bandas visibles en degradados suaves cuando se reduce la tasa de bits.

En contraste, **HEIC** implementa el contenedor **HEIF** (ISO/IEC 23008-12) combinado con codificación intra-cuadro **HEVC / H.265**. En lugar de bloques uniformes, subdivide la imagen dinámicamente en unidades de árbol de codificación (*CTU*) que abarcan desde `4 × 4` hasta `64 × 64` píxeles mediante hasta `35` modos de predicción direccional dentro del propio fotograma. Soporta `10 bits` por canal (`2^10 = 1,024` niveles por color primario, superando los `1,070 millones` de colores), mapas de profundidad para modo retrato, transparencia y secuencias completas (*Live Photos*). La tasa de ahorro relativo entre ambos formatos se calcula mediante la fórmula `Ahorro (%) = [1 − (Tamaño_HEIC / Tamaño_JPG)] × 100`.

## Ejemplo Práctico Paso a Paso: Conversión de un Lote de 500 Fotografías

Suponga que un equipo comercial o un usuario particular necesita subir `500 fotografías` capturadas en un iPhone de `12 megapíxeles` (`4,032 × 3,024 px`) hacia un sistema documental corporativo o portal público que únicamente admite archivos `.jpg` con un límite máximo de `5 MB` por imagen.

### Paso 1: Cálculo del almacenamiento de origen en HEIC

Tomando un peso medio realista de `1.80 MB` por fotografía nativa en formato HEIC, el volumen total ocupado en el dispositivo de origen asciende a `500 × 1.80 = 900 MB` (`0.90 GB`).

### Paso 2: Selección de parámetros óptimos de exportación

Para asegurar compatibilidad cromática en navegadores estándar y respetar holgadamente el límite de `5 MB` por archivo sin reducir la resolución original de `4,032 × 3,024 px`, se configura la exportación a calidad **90 %** con conversión explícita del espacio amplio `Display P3` hacia el perfil universal **sRGB**. Con esta configuración, cada archivo JPG generado pesa en promedio `3.75 MB`.

### Paso 3: Verificación de volumen final y ahorro comparativo

Al multiplicar el nuevo peso promedio por el lote completo de `500` imágenes, el almacenamiento total convertido pasa a `500 × 3.75 = 1,875 MB` (`1.875 GB`). Esto supone un incremento neto de `975 MB` (`+108.3 %` respecto al paquete original), lo que confirma un ahorro de espacio del `52.0 %` en HEIC frente a JPG, dado que `[1 − (1.80 / 3.75)] × 100 = (1 − 0.48) × 100 = 52.0 %`. Al mismo tiempo, cada fotografía de `3.75 MB` se mantiene un `25 %` por debajo del tope de `5 MB` impuesto por el portal, permitiendo la carga íntegra sin recorte ni degradación de píxeles.

Asimismo, en las *Live Photos* de iOS, el contenedor HEIC guarda la fotografía principal de alta resolución mientras el vídeo breve reside en un `.mov` aparte, por lo que exportar a JPG preserva intacto el fotograma de `12 megapíxeles`.

## Comparativa Técnica de Formatos de Imagen

|Criterio Técnico|HEIC (HEVC / H.265)|JPG / JPEG (DCT)|PNG (Deflate)|WebP (VP8 / VP8L)|AVIF (AV1)|
|:---|:---|:---|:---|:---|:---|
|Profundidad de color|`8` o `10 bits`|`8 bits`|`8` o `16 bits`|`8 bits`|`8`, `10` o `12 bits`|
|Peso (igual calidad)|`~48 %` de JPG|`100 %` (base)|`300 % – 600 %`|`~65 % – 75 %`|`~40 % – 50 %`|
|Canal alfa (transparencia)|Sí|No|Sí|Sí|Sí|
|Compatibilidad universal|Media (Apple nativa)|Prácticamente `100 %`|Prácticamente `100 %`|Alta en web moderna|Creciente|
|Múltiples fotogramas / HDR|Sí (Live Photos)|No|No estándar|Animación básica|Sí|
|Artefactos a baja tasa|Suaves|Bloques `8 × 8`|Sin pérdida|Suavizado progresivo|Alta retención|

## Casos de Uso, Errores Frecuentes y Privacidad

Convertir HEIC a JPG resulta indispensable en trámites ante portales administrativos y solicitudes de visado, plataformas inmobiliarias o de compraventa de vehículos, flujos editoriales en sistemas Windows sin extensiones instaladas y laboratorios fotográficos convencionales que solo leen JPEG estándar.

Evite cuatro errores habituales que deterioran la calidad o comprometen sus datos personales:

- **Renombrar `.heic` a `.jpg` manualmente:** modificar la extensión del archivo no decodifica el flujo binario HEVC; la mayoría de los navegadores y visores devolverán un error de archivo dañado o ilegible.
- **Exportar al `100 %` de calidad por defecto:** desactiva gran parte de la cuantización JPEG y puede elevar una imagen de `1.8 MB` a más de `7 MB` sin aportar mejoras perceptibles frente al `90 %`.
- **Omitir la conversión de `Display P3` a `sRGB`:** descartar el perfil ICC provoca tonos rojos y naranjas apagados al abrir las copias en visores Windows o navegadores sin gestión de color.
- **Subir documentos o fotos familiares a conversores en la nube:** los archivos HEIC de un teléfono incrustan coordenadas GPS exactas, fecha, hora y modelo de dispositivo dentro de sus metadatos EXIF.

Al realizar la conversión localmente con nuestro [Convertidor de HEIC a JPG](/es/herramientas/heic-to-jpg), puede procesar lotes completos directamente en la memoria de su navegador, manteniendo sus fotografías bajo control exclusivo sin transferencias hacia servidores de terceros.
