---
metaTitle: "Comprimir PDF Gratis | Reducir Peso de Archivos PDF Online"
metaDescription: "Reduzca el tamaño de archivos PDF optimizando imágenes, fuentes y flujos FlateDecode. Procesamiento híbrido seguro sin marcas de agua ni límites."
metaKeywords: "comprimir pdf gratis, reducir tamaño pdf, bajar peso pdf sin perder calidad, optimizar pdf online, comprimir pdf para correo, compresor pdf seguro, reducir megas pdf"
title: "Comprimir PDF"
shortDescription: "Reduzca drásticamente el peso de sus documentos PDF manteniendo la nitidez del texto vectorial mediante submuestreo inteligente de imágenes, depuración de objetos y flujos FlateDecode."
faqs:
  - question: "¿Por qué un PDF de pocas páginas puede superar fácilmente los 30 o 50 MB?"
    answer: "Los programas de maquetación y los escáneres suelen incrustar imágenes sin submuestrear a 300 o 600 DPI, tablas completas de fuentes tipográficas sin recortar, perfiles ICC redundantes e historiales de edición privados de aplicaciones como Adobe Illustrator o Word."
  - question: "¿El texto de mi PDF perderá nitidez o dejará de poder seleccionarse?"
    answer: "No en PDFs nativos digitales. El compresor optimiza los flujos de contenido con compresión sin pérdidas (FlateDecode) y concentra la reducción con pérdida exclusivamente en los objetos de imagen rasterizada, preservando intactos los vectores, el texto seleccionable, los marcadores y los enlaces."
  - question: "¿Qué ocurre si comprimo un documento PDF firmado digitalmente?"
    answer: "Cualquier modificación estructural de los bytes del PDF invalida el sello criptográfico de una firma digital PAdES/PKCS#7 existente. Comprima siempre el documento antes de aplicar la firma electrónica certificada."
  - question: "¿Cómo garantiza privacidad el sistema de procesamiento híbrido?"
    answer: "Los archivos ligeros y medianos se comprimen íntegramente en la memoria RAM del navegador sin transferirse a internet. Para documentos muy voluminosos que requieren procesamiento del lado del servidor, la optimización ocurre en memoria volátil cifrada en tránsito y el archivo se descarta de forma inmediata tras la descarga."
  - question: "¿Qué perfil de compresión debo elegir para correo electrónico frente a imprenta?"
    answer: "Para adjuntos de correo, currículums y lectura en pantalla, el perfil Recomendado (150 DPI y calidad JPEG equilibrada) logra ahorros del 60% al 85% sin degradación perceptible. Para archivos que irán a imprenta comercial, use compresión Baja/Sin pérdidas para conservar los 300 DPI y perfiles de color originales."
features:
  - "Compresión estructural sin pérdidas mediante flujos FlateDecode, deduplicación de XObjects y limpieza de tablas de referencias cruzadas."
  - "Submuestreo bicúbico configurable de imágenes incrustadas (300 DPI, 150 DPI o 96 DPI) con recodificación JPEG selectiva."
  - "Subconjunto automático de tipografías (font subsetting) y consolidación de fuentes duplicadas en documentos fusionados."
  - "Eliminación de metadatos XMP superfluos, miniaturas incrustadas, comentarios ocultos y datos privados de software de edición."
  - "Arquitectura híbrida que combina procesamiento local en navegador para privacidad máxima y soporte para archivos pesados en lote."
  - "Preservación íntegra de hipervínculos, índices interactivos, capas de texto OCR y trazados vectoriales sin marcas de agua."
useCases:
  - "Ajustar propuestas comerciales, facturas y anexos por debajo del límite de 20–25 MB de Gmail, Outlook y servidores corporativos."
  - "Reducir portafolios de diseño, arquitectura y currículums para cumplir restricciones estrictas de 2 a 5 MB en portales de empleo."
  - "Optimizar documentos escaneados para sedes electrónicas, trámites fiscales, expedientes judiciales y plataformas universitarias."
  - "Aligerar manuales técnicos, catálogos y fichas de producto publicados en sitios web para acelerar su descarga móvil y mejorar el SEO."
  - "Compactar archivos históricos y expedientes administrativos en lote antes de archivarlos en almacenamiento en la nube."
  - "Depurar PDFs inflados tras combinar múltiples entregas procedentes de distintos equipos y herramientas ofimáticas."
howToSteps:
  - "Arrastre uno o varios archivos PDF al área de carga o selecciónelos desde su equipo."
  - "Elija el perfil de compresión según el destino: Baja para imprenta, Recomendada (150 DPI) para correo y lectura, o Alta para límites estrictos."
  - "Inspeccione la vista previa comparativa y revise el ahorro proyectado en megabytes y porcentaje."
  - "Active las opciones de limpieza de metadatos si desea retirar historiales de edición y propiedades internas antes de compartir."
  - "Ejecute la compresión y verifique que gráficos, tablas y escaneos mantengan la legibilidad requerida."
  - "Descargue el PDF optimizado de forma individual o el paquete comprimido en lote."
---

El formato **PDF (ISO 32000-1 / ISO 32000-2)** fue diseñado como un contenedor autónomo capaz de reproducir tipografías, vectores e imágenes con idéntica precisión en cualquier dispositivo. Esa portabilidad tiene un coste frecuente: documentos de pocas páginas superan con facilidad los 30 o 50 MB debido a fotografías sobredimensionadas, flujos sin comprimir o datos internos de edición. Optimizar correctamente un PDF no consiste en degradar todo el archivo por igual, sino en depurar su árbol interno de objetos conservando intacta la claridad tipográfica.

## Anatomía interna de un PDF y causas del sobrepeso

Un archivo PDF se estructura como un grafo de **objetos indirectos** indexados mediante una tabla de referencias cruzadas (`xref`) o flujos comprimidos (**Object Streams / `ObjStm`**, introducidos en PDF 1.5). En la práctica, más del 80 % del peso innecesario proviene de cuatro elementos:

1. **Image XObjects sobredimensionados:** insertar fotos de 4000 × 3000 píxeles en recuadros de 5 cm genera densidades superiores a 1500 DPI, desperdiciando megabytes incluso en impresión profesional.
2. **Filtros de compresión inadecuados:** muchos escáneres guardan páginas de texto en blanco y negro como mapas RGB sin comprimir o en LZW heredado, en vez de emplear **JBIG2Decode** o **CCITTFaxDecode (Grupo 4)** para páginas bitonales y **DCTDecode** (JPEG) para fotografía.
3. **Fuentes completas y recursos duplicados:** al unir documentos de distinto origen, una misma fuente TrueType u OpenType suele incrustarse varias veces con miles de glifos no utilizados en lugar de aplicar **subconjuntos de fuentes (*font subsetting*)** y deduplicación de XObjects.
4. **Residuos estructurales y metadatos privados:** suites como Illustrator o InDesign suelen incrustar datos privados editables (`PieceInfo`), historiales de guardados incrementales, miniaturas de página y bloques **XMP** extensos.

## Comparativa de perfiles de compresión y filtros internos

Un compresor riguroso separa la limpieza **sin pérdidas** (estructura, vectores y flujos de texto) de la recodificación **con pérdida controlada** aplicada solo a mapas de bits:

| Nivel de compresión | Resolución objetivo | Filtros aplicados | Ahorro típico | Destino ideal |
| :--- | :--- | :--- | :--- | :--- |
| **Estructural (Sin pérdidas)** | Original intacta | `FlateDecode` en flujos y `ObjStm`, limpieza XMP y deduplicación | 10 % – 35 % | Imprenta comercial, planos CAD, archivado maestro |
| **Baja (Alta fidelidad)** | Hasta 300 DPI | `DCTDecode` (~90 %), submuestreo bicúbico suave, *font subsetting* | 30 % – 55 % | Impresión de oficina y catálogos profesionales |
| **Recomendada (Equilibrada)** | 150 DPI | `DCTDecode` (~75 %), submuestreo 4:2:0, `FlateDecode` máximo | 55 % – 80 % | Correo electrónico, informes, CVs y lectura digital |
| **Alta / Extrema** | 72 – 96 DPI | `DCTDecode` (~50–60 %), `CCITTFax` / `JBIG2` en escaneos | 75 % – 92 % | Portales públicos y cargas con límite de 1–2 MB |

El efecto sobre el diccionario interno de un objeto de imagen evidencia por qué el submuestreo transforma el peso del archivo:

```text
% Antes: página escaneada RGB a 300 DPI (2480 x 3508 px, ~4,8 MB)
12 0 obj
<< /Type /XObject /Subtype /Image /Width 2480 /Height 3508
   /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length 4915200 >>

% Después (Recomendada): submuestreo a 150 DPI + DCTDecode (~210 KB)
12 0 obj
<< /Type /XObject /Subtype /Image /Width 1240 /Height 1754
   /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length 214800 >>
```

Reducir la resolución lineal a la mitad divide entre cuatro el número total de píxeles ($0{,}5^2 = 0{,}25$); sumado a `DCTDecode` y submuestreo cromático 4:2:0, cada página escaneada cae más de un 95 % conservando gráficos y tablas legibles.

## Linearización web, estándares PDF/A y privacidad híbrida

Además de reducir el peso total en bytes, los documentos publicados en sitios web se benefician de la **linearización (*Fast Web View*)**, que reorganiza los objetos de la primera página al inicio del archivo para que el navegador los renderice mediante peticiones `HTTP Range` sin esperar a descargar las páginas restantes. En entornos regulados que exigen cumplimiento **PDF/A-1b o PDF/A-2b** para conservación a largo plazo, conviene restringirse a optimizaciones estructurales sin eliminar el perfil `OutputIntent` ni los subconjuntos de fuentes obligatorios.

La arquitectura híbrida equilibra confidencialidad y rendimiento: los contratos, facturas y expedientes habituales se comprimen en la memoria RAM del navegador sin abandonar el equipo, mientras que archivos masivos con cientos de páginas se optimizan en memoria volátil cifrada sin persistencia en disco.

En flujos documentales completos conviene respetar el orden de operaciones:

- Combine anexos primero con [Unir PDF](/es/herramientas/merge-pdf) y comprima después para unificar fuentes e imágenes repetidas entre documentos.
- Si solo debe enviar un bloque concreto, extraiga esas páginas con [Dividir PDF](/es/herramientas/split-pdf) antes de optimizar.
- Verifique que propiedades sensibles (autor, software o rutas locales) se hayan depurado mediante el [Visor de Metadatos PDF](/es/herramientas/pdf-metadata-viewer).
- Para documentos escaneados con texto como imagen, ejecute [OCR para PDF](/es/herramientas/pdf-ocr) para mantener la búsqueda de texto o use [Aplanar PDF](/es/herramientas/flatten-pdf) para fijar formularios y anotaciones.

## Resolución de incidencias frecuentes

- **Ahorro inferior al 5 %:** ocurre cuando el PDF ya contiene solo texto vectorial comprimido con `FlateDecode` o imágenes recomprimidas previamente. Aplicar compresión extrema sobre un JPEG degradado rara vez reduce peso y añade artefactos.
- **Letras borrosas en documentos escaneados a 96 DPI:** un escaneo no tiene texto vectorial sino píxeles. Mantenga al menos **150 DPI** o pase el escaneo a escala de grises antes de bajar la resolución.
- **Firma electrónica invalidada:** las firmas PAdES protegen el rango exacto de bytes (`/ByteRange`). Comprima siempre antes de firmar.
- **Variaciones cromáticas en catálogos CMYK:** para imprenta offset en `DeviceCMYK` con perfiles ICC calibrados, evite perfiles web que conviertan el color a `DeviceRGB`.
