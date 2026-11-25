---
metaTitle: "Comprobador de Tipos MIME | Content-Type y Magic Bytes"
metaDescription: "Inspecciona tipos MIME (Content-Type), extensiones, cabeceras HTTP y magic bytes en tiempo real. Detecta spoofing y bloquea MIME sniffing."
metaKeywords: "comprobador tipos mime, analizador content-type, magic bytes, mime sniffing, x-content-type-options nosniff, validar subida archivos, media type rfc 9110, tipos mime http"
title: "Comprobador de Tipos MIME"
shortDescription: "Detecta, inspecciona y valida tipos MIME (Content-Type) mediante extensiones, encabezados HTTP y firmas binarias (magic bytes). Audita políticas nosniff y previene la suplantación de archivos."
faqs:
  - question: "¿Por qué text/javascript reemplazó a application/javascript como tipo MIME oficial?"
    answer: "RFC 9239 actualizó el registro IANA en 2022 y declaró obsoletos application/javascript y application/ecmascript para alinear el estándar de red con la especificación HTML. Hoy text/javascript es el único media type recomendado para scripts clásicos y módulos ES (.mjs)."
  - question: "¿Qué diferencia existe entre validar la extensión, el encabezado Content-Type y los magic bytes?"
    answer: "La extensión es solo un sufijo local fácil de renombrar y el encabezado Content-Type en una subida proviene del cliente y puede manipularse. Los magic bytes son secuencias hexadecimales fijas dentro del propio binario (como 89 50 4E 47 en PNG) que confirman la estructura real del archivo."
  - question: "¿Cómo evita X-Content-Type-Options: nosniff los ataques XSS en navegadores modernos?"
    answer: "Sin la directiva nosniff, algunos navegadores aplican heurísticas de MIME sniffing y pueden interpretar como HTML o JavaScript ejecutable un archivo subido como text/plain o imagen. Con nosniff, el navegador acata estrictamente el Content-Type declarado y bloquea scripts u hojas de estilo con tipos incompatibles."
  - question: "¿Por qué los archivos .docx, .xlsx, .epub y .jar comparten los mismos magic bytes que un ZIP?"
    answer: "Todos ellos son formatos contenedores basados en el estándar ZIP, por lo que sus primeros cuatro bytes siempre son 50 4B 03 04 (PK). Para distinguir con exactitud su tipo MIME real hay que inspeccionar entradas internas del archivo, como [Content_Types].xml en Office o el archivo mimetype en EPUB."
  - question: "¿Cuándo debe incluirse el parámetro charset=UTF-8 en la cabecera Content-Type?"
    answer: "Es fundamental en tipos textuales como text/html, text/css o text/csv para evitar mojibake e inyecciones por cambio de codificación. En cambio, no debe añadirse a recursos binarios (image/png, application/pdf), y en application/json RFC 8259 ya define UTF-8 por defecto sin parámetro charset obligatorio."
features:
  - "Búsqueda bidireccional instantánea entre extensiones de archivo y tipos MIME oficiales registrados en IANA"
  - "Inspección local de firmas binarias (magic bytes) en memoria del navegador para detectar archivos renombrados"
  - "Auditoría de cabeceras Content-Type en URLs remotas verificando charset, sintaxis y X-Content-Type-Options"
  - "Alertas de seguridad sobre formatos con ejecución activa de código como image/svg+xml o text/html"
  - "Identificación de contenedores compuestos (ZIP, RIFF, ISO BMFF) frente a formatos de carga directa"
  - "Catálogo técnico actualizado con tipos modernos como WebAssembly (.wasm), AVIF, WebP, WOFF2 y módulos ES"
useCases:
  - "Resolución de bloqueos estrictos de navegador al cargar módulos ES (.mjs), hojas CSS o binarios WebAssembly (.wasm)"
  - "Endurecimiento de endpoints de subida de archivos frente a suplantación de extensiones y archivos políglotas"
  - "Configuración precisa de mapeos types y cabeceras nosniff en Nginx, Apache, Cloudflare R2 y Amazon S3"
  - "Auditoría de APIs REST para validar cabeceras application/json, application/problem+json y multipart/form-data"
  - "Aislamiento seguro de adjuntos subidos por usuarios mediante Content-Disposition: attachment y sandboxing"
  - "Diagnóstico de fallos de renderizado en buscadores cuando CSS o fuentes tipográficas se sirven como text/plain"
howToSteps:
  - "Introduce una extensión (como .wasm, .webp o .mjs) o un tipo MIME completo en el buscador para ver su definición IANA."
  - "Arrastra un archivo al panel de inspección local para leer sus magic bytes iniciales sin subirlo a servidores externos."
  - "Compara la extensión declarada con la firma binaria real para detectar manipulaciones o archivos corruptos."
  - "Introduce una URL en el inspector HTTP si deseas auditar la cabecera Content-Type y la política X-Content-Type-Options."
  - "Revisa las alertas de seguridad para identificar tipos activos peligrosos (como SVG sin aislamiento) o desajustes de charset."
  - "Aplica los bloques de configuración recomendados en tu servidor web o proxy y repite la comprobación."
---

Un **tipo MIME** (*Media Type*), estandarizado en RFC 6838 y transportado en HTTP mediante la cabecera `Content-Type` (RFC 9110 §8.3), indica al cliente cómo interpretar los bytes de un recurso sin depender de la extensión local del archivo. Cuando un servidor declara un tipo incorrecto, los navegadores modernos rechazan módulos JavaScript, impiden la compilación en flujo de WebAssembly o degradan el renderizado CSS; y cuando una API confía ciegamente en el nombre del archivo subido, abre la puerta a ataques de ejecución de código. Este comprobador valida extensiones frente al registro IANA, audita cabeceras HTTP e inspecciona *magic bytes* localmente en tu navegador.

## Anatomía formal de `Content-Type` y registro IANA

La sintaxis normativa de un *Media Type* combina un tipo discreto o compuesto, un subtipo y parámetros opcionales separados por punto y coma:

```http
Content-Type: text/html; charset=utf-8
Content-Type: application/problem+json
Content-Type: multipart/form-data; boundary=----FormBoundary7MA4YWxkTrZu0gW
```

El registro IANA clasifica los subtipos en árboles semánticos claros: el árbol estándar (sin prefijo, como `application/pdf`), el árbol de fabricante (`vnd.`, por ejemplo `application/vnd.openxmlformats-officedocument.wordprocessingml.document`), el árbol personal (`prs.`) y el prefijo histórico `x-`, desaconsejado por RFC 6648 para registros nuevos. Además, RFC 6838 define **sufijos de sintaxis estructurada** como `+json`, `+xml` o `+zip` (`image/svg+xml`, `application/ld+json`), que permiten inferir el formato base aunque el cliente desconozca el subtipo completo.

Durante la negociación de contenido (RFC 9110 §12.5.1), el cliente anuncia sus formatos preferidos en `Accept` (por ejemplo, `image/avif,image/webp,*/*`) y el servidor responde con el `Content-Type` seleccionado junto a `Vary: Accept`. Cuando el formato es desconocido, el valor de respaldo estándar es `application/octet-stream`, que fuerza descarga binaria pero invalida recursos ejecutables: **RFC 9239** consagró `text/javascript` como tipo canónico para `.js` y `.mjs` (dejando obsoleto `application/javascript`), y `WebAssembly.instantiateStreaming()` exige estrictamente `application/wasm`.

## Firmas binarias (*Magic Bytes*) y formatos contenedores

Ni la extensión ni la propiedad `File.type` enviada por el cliente demuestran la naturaleza real de un archivo: renombrar un script HTML como `factura.png` basta para burlar comprobaciones superficiales. La validación fiable lee los primeros bytes del flujo binario —los ***magic bytes***— y, en contenedores compuestos, verifica marcas en desplazamientos adicionales.

Por ejemplo, un archivo WebP inicia con `RIFF` en el byte 0 y declara `WEBP` en el byte 8; de manera similar, MP4, AVIF y HEIC utilizan cajas ISO BMFF con la firma `ftyp` a partir del byte 4 seguida de su perfil (`avif`, `heic`, `isom`). Por su parte, `.docx`, `.xlsx`, `.epub` y `.jar` comparten la firma ZIP `50 4B 03 04`, por lo que identificar su tipo real exige inspeccionar descriptores internos del archivo.

## Tabla técnica de tipos MIME, magic bytes y requisitos HTTP

| Formato / Extensión | Tipo MIME IANA | Magic Bytes (Hex / ASCII) | Requisito técnico o riesgo crítico |
| :--- | :--- | :--- | :--- |
| **PNG (`.png`)** | `image/png` | `89 50 4E 47 0D 0A 1A 0A` (`\x89PNG`) | Binario puro; omitir `charset`; validar cabecera `IHDR` |
| **JPEG (`.jpg`)** | `image/jpeg` | `FF D8 FF` (`E0`/`E1`/`DB`) | Puede alojar metadatos EXIF o bloques de comentario manipulados |
| **WebP (`.webp`)** | `image/webp` | `52 49 46 46` (`RIFF`) + `WEBP` en offset 8 | Comprobar tanto offset 0 como firma en desplazamiento 8 |
| **PDF (`.pdf`)** | `application/pdf` | `25 50 44 46 2D` (`%PDF-`) | Admite acciones JavaScript internas; aislar subidas de usuarios |
| **WebAssembly (`.wasm`)** | `application/wasm` | `00 61 73 6D 01 00 00 00` (`\0asm`) | `instantiateStreaming()` falla si llega como `octet-stream` |
| **WOFF2 (`.woff2`)** | `font/woff2` | `77 4F 46 32` (`wOF2`) | Declarar `font/*` moderno y cabeceras CORS en orígenes cruzados |
| **ZIP / OOXML (`.zip`, `.docx`)** | `application/zip` / `vnd.openxmlformats...` | `50 4B 03 04` (`PK\x03\x04`) | Contenedor compartido; validar entradas internas del archivo |
| **JavaScript (`.js`, `.mjs`)** | `text/javascript` | Texto UTF-8 (sin firma fija) | RFC 9239; módulos ES se bloquean si llegan como `text/plain` |
| **SVG (`.svg`)** | `image/svg+xml` | Texto XML (`<svg` o `<?xml`) | **Alto riesgo XSS**: ejecuta `<script>` si se abre directamente |

## Seguridad HTTP: MIME Sniffing y cargas de archivos

### Defensa frente a MIME Sniffing y archivos políglotas

Bajo el estándar WHATWG MIME Sniffing, un navegador que recibe un recurso sin protección puede ignorar un `Content-Type` ambiguo e inferir HTML ejecutable a partir de los bytes iniciales. Un archivo políglota —cabecera de imagen válida más carga `<script>`— convierte esa tolerancia en XSS almacenado. Añadir siempre `X-Content-Type-Options: nosniff` obliga al navegador a respetar literalmente el tipo declarado y bloquea scripts u hojas CSS mal tipados.

### Aislamiento de formatos activos como SVG y PDF

Al recibir archivos de terceros, aplica defensa en profundidad:

- **Aísla `image/svg+xml`, `application/pdf` y HTML:** sírvelos desde un subdominio sin cookies de sesión, fuerza `Content-Disposition: attachment` o aplica `Content-Security-Policy: default-src 'none'; sandbox`. Para limpiar gráficos vectoriales propios, utiliza el [Optimizador de SVG](/es/herramientas/svg-optimizer).
- **Re-codifica imágenes rasterizadas:** volver a decodificar y guardar JPEG/PNG/WebP en servidor elimina cargas políglotas ocultas y depura bloques EXIF que puedes inspeccionar antes en el [Visor de Metadatos de Imagen](/es/herramientas/image-metadata-viewer).

## Configuración en Nginx y verificación desde terminal

```nginx
http {
    include       mime.types;
    default_type  application/octet-stream;
    types {
        text/javascript  js mjs;
        application/wasm wasm;
        image/avif       avif;
        font/woff2       woff2;
    }
    add_header X-Content-Type-Options "nosniff" always;
}
```

En servidores Apache, genera reglas equivalentes de `AddType` y `Header always set` con el [Generador de .htaccess](/es/herramientas/htaccess-generator). Desde la línea de comandos puedes verificar tanto el servidor remoto como los bytes locales:

```bash
curl -sI https://ejemplo.com/app.mjs | grep -iE '^(content-type|x-content-type-options):'
xxd -l 16 subida.png && file --mime-type -b subida.png
```

Para auditar a la vez `Content-Type`, HSTS, CSP y políticas CORS de cualquier URL pública, complementa la inspección con el [Comprobador de Cabeceras HTTP](/es/herramientas/http-header-checker).
