---
metaTitle: "Codificador y Decodificador Base64 | RFC 4648 y Base64url"
metaDescription: "Codifica y decodifica texto UTF-8, JSON, imágenes y archivos binarios en Base64 RFC 4648 o Base64url seguro para URL con Data URI en tu navegador."
metaKeywords: "codificar base64, decodificar base64, codificador base64 online, base64url, rfc 4648 base64, base64 utf-8, imagen a base64 data uri, base64 seguro para url, jwt base64url, unicode base64"
title: "Codificador y Decodificador Base64"
shortDescription: "Codifica y decodifica texto UTF-8, JSON, imágenes y archivos binarios en Base64 estándar (RFC 4648) o Base64url seguro para URL. Genera Data URIs al instante con métricas de expansión de bytes, 100% en tu navegador."
faqs:
  - question: "¿Por qué la codificación Base64 aumenta el tamaño de los datos alrededor de un 33,3 %?"
    answer: "Base64 agrupa cada 3 bytes de entrada (24 bits) y los transforma en 4 caracteres US-ASCII de 6 bits cada uno. Representar 3 octetos binarios mediante 4 bytes de texto impone una relación fija 4:3 (33,33 % adicional), más 1 o 2 caracteres de relleno '=' cuando la longitud en bytes no es múltiplo de 3."
  - question: "¿Qué cambia al pasar de Base64 estándar (RFC 4648 sección 4) a Base64url seguro para URL (sección 5)?"
    answer: "Base64 estándar asigna '+' al sexteto 62 y '/' al sexteto 63, caracteres que entran en conflicto con espacios en consultas URL y delimitadores de rutas. Base64url sustituye '+' por '-', reemplaza '/' por '_' y omite el relleno final '=' para que los tokens viajen sin alteraciones en URLs, nombres de archivo y segmentos JWT."
  - question: "¿Por qué falla la función nativa btoa() de JavaScript con tildes, eñes o emojis y cómo lo evita esta herramienta?"
    answer: "window.btoa() solo acepta puntos de código Latin-1 (U+0000 a U+00FF) y lanza una excepción InvalidCharacterError ante caracteres multibyte Unicode o emojis. Este codificador convierte primero el texto a bytes UTF-8 reales mediante TextEncoder y valida la decodificación con TextDecoder en modo estricto."
  - question: "¿Es Base64 una forma de cifrado segura para ocultar contraseñas o claves de API?"
    answer: "No. Base64 es un esquema de codificación público y totalmente reversible sin clave secreta. Cualquier persona puede decodificar una cadena Base64 en milisegundos; nunca asumas que los objetos Secret de Kubernetes o encabezados HTTP Basic Auth están cifrados si no cuentan con TLS en tránsito y cifrado real en reposo."
  - question: "¿Cuándo conviene incrustar una imagen como Data URI RFC 2397 en lugar de servir un archivo externo?"
    answer: "Los Data URIs (data:image/png;base64,...) funcionan bien para íconos pequeños o SVG críticos por debajo de unos 4 KB donde interesa evitar una petición HTTP extra. Las fotografías y fuentes más pesadas deben servirse externamente para aprovechar la caché independiente del navegador sin inflar el CSS o HTML un 33 %."
features:
  - "Codificación y decodificación bidireccional en Base64 estándar (RFC 4648 §4) y Base64url seguro para URL sin relleno (§5) con intercambio rápido"
  - "Serialización estricta de bytes UTF-8 con TextEncoder y decodificación fatal con TextDecoder, evitando errores de btoa() con tildes, ñ, CJK y emojis"
  - "Carga por arrastrar y soltar de imágenes y archivos binarios con generación automática de Data URIs RFC 2397, detección MIME y vista previa"
  - "Detección inteligente al pegar desde el portapapeles que identifica cadenas Base64 válidas y activa directamente el modo Decodificar"
  - "Métricas en tiempo real de caracteres, líneas y variación exacta de bytes UTF-8 para cuantificar la sobrecarga 4:3"
  - "Editor Monaco con soporte de tema claro y oscuro, guardado local de borradores, descarga directa y ejecución 100 % del lado del cliente"
useCases:
  - "Generar encabezados HTTP Basic Authentication (Authorization: Basic base64(usuario:contraseña)) con credenciales UTF-8 sin saltos de línea ocultos"
  - "Construir segmentos Base64url sin relleno para encabezados y payloads de JSON Web Tokens (JWT), retos PKCE de OAuth 2.0 y parámetros de consulta"
  - "Incrustar íconos PNG, WebP o SVG diminutos como Data URIs RFC 2397 dentro de hojas de estilo CSS o plantillas HTML autocontenidas"
  - "Codificar certificados TLS en PEM, credenciales JSON de cuentas de servicio y bloques de configuración para manifiestos Secret de Kubernetes"
  - "Transportar firmas binarias, búferes PDF o textos cifrados con seguridad dentro de campos de cadena en APIs REST JSON y GraphQL"
  - "Ejecutar verificaciones de ida y vuelta (round-trip) sobre cargas de webhooks y tokens de registro alternando entre Codificar y Decodificar en un clic"
howToSteps:
  - "Selecciona Codificar o Decodificar en la barra superior, o pulsa Pegar para que la herramienta detecte una cadena Base64 existente y cambie de modo automáticamente."
  - "Introduce texto UTF-8, JSON o credenciales en el editor Monaco de la izquierda, o arrastra una imagen o archivo binario a la zona de carga."
  - "Activa el interruptor Seguro para URL siempre que la cadena vaya a insertarse en un parámetro de consulta, ruta web, nombre de archivo o token JWT."
  - "Revisa los contadores en vivo de caracteres y bytes UTF-8 para verificar la expansión exacta, y previsualiza el Data URI generado si subiste una imagen."
  - "Haz clic en Copiar o Descargar para exportar el resultado, o pulsa Intercambiar para devolver la salida al panel de entrada y comprobar la reversibilidad."
---

**Base64** es un esquema de codificación binario a texto definido en **RFC 4648** que traduce octetos arbitrarios de 8 bits a un alfabeto seguro de 64 caracteres imprimibles US-ASCII. Cada vez que datos binarios —imágenes, resúmenes criptográficos, certificados TLS o texto UTF-8 multibyte— deben atravesar capas textuales como cadenas JSON, elementos XML, cabeceras HTTP, manifiestos YAML o mensajes MIME sobre SMTP, Base64 garantiza que los bytes de control (`0x00–0x1F`) y los octetos altos (`0x80–0xFF`) lleguen intactos sin corrupción de caracteres. Al ejecutarse completamente en tu navegador, contraseñas, tokens y claves privadas nunca salen de la memoria local.

## Mecánica de bits: bloques de 24 bits y relleno módulo 3

La memoria almacena bytes de 8 bits (256 valores posibles), mientras Base64 codifica 6 bits por carácter (64 símbolos: `A–Z` para `0–25`, `a–z` para `26–51`, `0–9` para `52–61`, más dos caracteres según la variante para `62` y `63`). Como el mínimo común múltiplo de 8 y 6 es **24**, el algoritmo lee **bloques contiguos de 3 bytes (24 bits)** y los divide en **cuatro sextetos de 6 bits**.

La cadena ASCII de 3 bytes `"Man"` muestra una alineación exacta sin relleno:

| Etapa | Desglose binario / decimal | Resultado |
| :--- | :--- | :--- |
| **1. Entrada** | `M`, `a`, `n` | `77`, `97`, `110` (`0x4D 0x61 0x6E`) |
| **2. Octetos (8 bits)** | `01001101` `01100001` `01101110` | 24 bits contiguos |
| **3. Sextetos (6 bits)** | `010011` `010110` `000101` `101110` | 4 grupos de 6 bits |
| **4. Índices (0–63)** | `19`, `22`, `5`, `46` | Posiciones en tabla |
| **5. Alfabeto RFC 4648** | `T`, `W`, `F`, `u` | Salida: `TWFu` |

Si la longitud `n` en bytes no es divisible por 3, el bloque final se completa con bits cero a la derecha y se agrega relleno `=` en Base64 estándar para mantener múltiplos de 4:

- **`n mod 3 == 0`**: Bloque completo de 24 bits; genera 4 caracteres y **sin** relleno.
- **`n mod 3 == 1`**: 1 byte final recibe 4 bits cero (2 sextetos) más **`==`**.
- **`n mod 3 == 2`**: 2 bytes finales reciben 2 bits cero (3 sextetos) más **`=`**.

Según RFC 4648 §3.5 (codificación canónica), los bits de ajuste finales deben permanecer en cero para evitar que dos cadenas distintas decodifiquen a los mismos bytes, una verificación crítica en firmas y tokens. Con `n` bytes, la salida estándar ocupa `4 * ceil(n / 3)` bytes y Base64url sin relleno `ceil(4 * n / 3)` bytes: una **expansión fija del 33,33 %** antes de aplicar compresión gzip o Brotli.

## Variantes de RFC 4648 y perfiles en protocolos

En producción conviven cuatro perfiles RFC con diferencias concretas en alfabeto, relleno y salto de línea:

| Variante | Estándar | Índice 62 | Índice 63 | Relleno (`=`) | Salto de línea | Usos principales |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Estándar** | RFC 4648 §4 | `+` | `/` | Obligatorio | Ninguno | Data URIs, Basic Auth, Kubernetes Secrets, JSON |
| **Base64url** | RFC 4648 §5 | `-` | `_` | Omitido | Ninguno | Segmentos JWT, OAuth 2.0 PKCE, consultas URL |
| **MIME** | RFC 2045 | `+` | `/` | Obligatorio | CRLF cada 76 | Adjuntos SMTP y `Content-Transfer-Encoding` |
| **PEM** | RFC 7468 | `+` | `/` | Obligatorio | LF cada 64 | Certificados X.509, claves PKCS#8 y SSH |

En **JSON Web Tokens (RFC 7519)**, los tres segmentos (`header.payload.signature`) exigen **Base64url sin relleno**: omitir los caracteres `=` impide que los navegadores o proxies los conviertan en `%3D` dentro de parámetros de consulta o cookies, manteniendo el punto `.` como único separador limpio. Por su parte, **HTTP Basic Authentication (RFC 7617)** exige codificar `usuario:contraseña` en UTF-8 con Base64 estándar para evitar fallos en contraseñas con acentos o símbolos internacionales. Al decodificar, esta herramienta convierte automáticamente `-` en `+` y `_` en `/`, descarta saltos MIME o PEM y restaura el relleno `=` omitido antes de validar UTF-8.

## Trampas clásicas: UTF-8 en `btoa()` y saltos de línea en CLI

Dos defectos recurrentes rompen integraciones de autenticación y canalizaciones automatizadas:

### Serialización segura de Unicode con `TextEncoder`

La función nativa `window.btoa()` trata cada unidad UTF-16 como un byte Latin-1 y lanza `InvalidCharacterError` ante caracteres superiores a `U+00FF` (`"español ☕"`, tildes compuestas o escritura CJK). Serializa primero a octetos UTF-8 reales con `TextEncoder` y procesa archivos locales directamente desde búferes `Uint8Array`:

```javascript
function toBase64Url(input) {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
```

### Saltos de línea accidentales con `echo` en Kubernetes y HTTP

Ejecutar `echo "admin:secret" | base64` inyecta un byte `\n` (`0x0A`) oculto al final, invalidando encabezados HTTP Basic Auth y campos `data:` en manifiestos `Secret` (revisables con el [Formateador y Embellecedor de YAML](/es/herramientas/yaml-formatter)). Usa siempre `printf` junto con `-w 0` en GNU coreutils para suprimir el corte a 76 columnas y emitir exactamente `YWRtaW46c2VjcmV0`:

```bash
printf '%s' 'admin:secret' | base64 -w 0
```

## Umbrales de Data URIs y límites de seguridad

Arrastrar una imagen en la zona de carga genera un **Data URI RFC 2397** (`data:image/png;base64,...`) listo para `<img src="...">` o CSS `url(...)`. Incrustar recursos ahorra una petición HTTP en íconos críticos menores a **4 KB**, pero penaliza activos mayores con un 33 % de sobrecarga, pérdida de caché independiente entre páginas y análisis CSSOM más lento. Para flujos dedicados de conversión gráfica o extracción inversa, utiliza [Imagen a Base64](/es/herramientas/image-to-base64) y [Base64 a Imagen](/es/herramientas/base64-to-image).

Recuerda siempre que **Base64 es codificación, nunca cifrado**. Cualquier cadena se revierte al instante en el [Decodificador Base64](/es/herramientas/base64-decode). Para inspeccionar reclamos firmados abre el [Decodificador JWT](/es/herramientas/jwt-decoder); para escapar caracteres especiales en URLs sin inflar la carga un 33 % recurre al [Codificador URL](/es/herramientas/url-encoder); y cuando necesites integridad criptográfica o resúmenes unidireccionales reales, combina tu flujo con el [Generador HMAC](/es/herramientas/hmac-generator) o el [Generador de Hash](/es/herramientas/hash-generator).
