---
metaTitle: "Codificador y Decodificador de URL | RFC 3986 y UTF-8"
metaDescription: "Codifica y decodifica URLs con encodeURIComponent o encodeURI según RFC 3986, edita parámetros de consulta y convierte UTF-8 en tu navegador."
metaKeywords: "codificador url, decodificador url, percent encoding, encodeURIComponent, encodeURI, rfc 3986, codificar parametros url, url utf8, inspector query string"
title: "Codificador y Decodificador de URL"
shortDescription: "Aplica percent-encoding conforme a RFC 3986 en URLs completas, parámetros de consulta individuales y texto UTF-8 multibyte con modos encodeURI, encodeURIComponent e inspector visual de cadenas de consulta."
faqs:
  - question: "¿Cuándo debo elegir encodeURIComponent en lugar de encodeURI?"
    answer: "Usa encodeURIComponent al codificar el valor de un parámetro de consulta, un campo de formulario o un segmento dinámico de ruta para que delimitadores como '&', '=', '/' y '?' se escapen como datos. Reserva encodeURI únicamente para sanear espacios o caracteres Unicode en una URL completa ya ensamblada cuya estructura debe mantenerse intacta."
  - question: "¿Por qué encodeURIComponent en JavaScript deja sin codificar los caracteres !, ', (, ) y *?"
    answer: "ECMAScript heredó las reglas de caracteres sin escapar del antiguo RFC 2396 en lugar de la sección 2.3 del RFC 3986. Las APIs que exigen percent-encoding estricto según RFC 3986 —como AWS Signature Version 4 y OAuth 1.0a— requieren una sustitución adicional para convertir esos cinco subdelimitadores en %21, %27, %28, %29 y %2A."
  - question: "¿Por qué los espacios aparecen como %20 en rutas URL y como + en cadenas de consulta de formularios?"
    answer: "El estándar RFC 3986 codifica siempre el espacio ASCII (0x20) como %20 en cualquier componente URI. El uso de '+' pertenece exclusivamente al formato application/x-www-form-urlencoded utilizado por formularios HTML GET/POST y por URLSearchParams, y nunca debe aplicarse a segmentos de ruta."
  - question: "¿Cómo se codifican las tildes, la letra ñ y los emojis en una URL moderna?"
    answer: "Cada punto de código Unicode se serializa primero a su secuencia de bytes UTF-8 (entre 2 y 4 octetos) y después cada byte se representa como '%' seguido de dos dígitos hexadecimales en mayúsculas. Así, 'ñ' (U+00F1) se convierte en %C3%B1 y un emoji de 4 bytes genera 12 caracteres ASCII."
  - question: "¿Debe aplicarse percent-encoding a un dominio internacionalizado con acentos o letra ñ?"
    answer: "No. Los nombres de dominio utilizan IDNA2008 y Punycode (codificación compatible con ASCII precedida por el prefijo 'xn--') para la resolución DNS. El percent-encoding se aplica únicamente a la ruta, la cadena de consulta y el fragmento posteriores al host."
features:
  - "Modos intercambiables de codificación por componente (encodeURIComponent) y por URL completa (encodeURI)"
  - "Flujo bidireccional de codificación y decodificación en tiempo real con intercambio de paneles y detección automática de cadenas codificadas"
  - "Inspector interactivo de parámetros de consulta para añadir, editar o eliminar pares clave-valor conservando intacto el fragmento #hash"
  - "Procesamiento multilínea por lotes con expansión completa de caracteres UTF-8 multibyte, tildes, ñ y emojis"
  - "Contador en vivo de delimitadores reservados según RFC 3986 y métricas comparativas de longitud en bytes y caracteres"
  - "Ejecución 100% local en el navegador con copia al portapapeles y descarga en texto plano sin exponer tokens ni claves de API"
useCases:
  - "Escapar consultas de búsqueda de usuarios, direcciones de correo y filtros complejos antes de enviarlos a APIs REST"
  - "Construir parámetros redirect_uri anidados en flujos OAuth 2.0 y OpenID Connect sin romper los delimitadores externos"
  - "Crear y auditar visualmente enlaces de campañas de marketing con múltiples parámetros UTM sin errores de sintaxis"
  - "Codificar segmentos dinámicos de ruta que contienen barras, espacios o almohadillas en enrutadores Express, FastAPI o Go"
  - "Preparar enlaces mailto: con asuntos en español y cuerpos multilínea correctamente escapados para clientes de correo"
  - "Convertir nombres de archivo con acentos o espacios en destinos ASCII deterministas para scripts cURL y pipelines CI/CD"
howToSteps:
  - "Verifica que el modo Codificar esté activo en la barra superior, o cambia a Decodificar si deseas inspeccionar una URL ya escapada."
  - "Elige el modo Componente (encodeURIComponent) para valores de parámetros y segmentos de ruta, o URL Completa (encodeURI) para enlaces ya ensamblados."
  - "Escribe o pega tu texto sin procesar, cadena Unicode o enlace en el panel de entrada; cada línea se procesa de forma independiente."
  - "Si la URL incluye parámetros tras el signo '?', utiliza el Inspector de Consultas inferior para modificar, añadir o eliminar claves visualmente."
  - "Comprueba los contadores de caracteres reservados en el panel de salida y copia el resultado o descárgalo como archivo de texto."
---

Cada petición HTTP transmite su destino sobre una gramática **US-ASCII** definida por el **RFC 3986** y el estándar **WHATWG URL**. Como los delimitadores estructurales (`?`, `&`, `/`, `#`, `=`) comparten cadena con los datos del usuario, insertar texto sin escapar hace que enrutadores y proxies dividan parámetros en lugares erróneos o recorten todo lo posterior a `#`. Esta herramienta aplica *percent-encoding* conforme al estándar y permite editar cadenas de consulta visualmente en tu navegador, manteniendo claves de API y callbacks OAuth fuera de cualquier servidor externo.

## Taxonomía de caracteres en RFC 3986: reservados y no reservados

El RFC 3986 divide los caracteres de un URI en dos grupos que dictan cuándo un octeto debe reescribirse como `%HH` (signo de porcentaje seguido de dos dígitos hexadecimales):

- **No reservados** (`ALPHA / DIGIT / "-" / "." / "_" / "~"`): Son 66 caracteres sin rol sintáctico que nunca deben codificarse; normalizar `%7E` a `~` produce un URI equivalente.
- **Reservados**: Abarcan **delimitadores generales** (`gen-delims`: `: / ? # [ ] @`), que separan `esquema://autoridad/ruta?consulta#fragmento`, y **subdelimitadores** (`sub-delims`: `! $ & ' ( ) * + , ; =`), usados dentro de cada componente.

Cualquier carácter fuera del conjunto no reservado —espacios (`0x20`), caracteres de control (`0x00–0x1F`), comillas, `%` literal (`%25`) y todo punto Unicode no ASCII— debe codificarse cuando representa datos. La regla de oro es escapar **antes de concatenar**: en `https://api.ejemplo.com/buscar?q=I&D&pagina=2`, ningún analizador puede saber si el primer `&` pertenece al término `I&D` o inicia un parámetro `D`. Del mismo modo, en consultas `application/x-www-form-urlencoded`, enviar un signo `+` sin escapar en términos como `C++` o teléfonos internacionales `+34` hace que el servidor lo interprete como espacio salvo que se codifique como `%2B`.

## Comparativa: encodeURI, encodeURIComponent, RFC 3986 estricto y URLSearchParams

Elegir la función equivocada causa fallos silenciosos en clientes HTTP y firmas criptográficas. La tabla siguiente resume las diferencias exactas entre los cuatro mecanismos estándar.

| Mecanismo | Conserva `:/?#[]@` | Conserva `!$'()*+,;=` | Espacio | Caso de uso recomendado |
| :--- | :---: | :---: | :---: | :--- |
| **`encodeURI()`** | Sí (`;` `,` `/` `?` `:` `@` `&` `=` `+` `$` `#`) | Sí (todos) | `%20` | Sanear espacios y UTF-8 en una URL completa |
| **`encodeURIComponent()`** | No (escapa todos) | Solo `! ' ( ) *` | `%20` | Valores de parámetros, `redirect_uri`, segmentos de ruta |
| **RFC 3986 estricto** | No | No (escapa `! ' ( ) *`) | `%20` | Firmas AWS SigV4 y cadenas base OAuth 1.0a |
| **`URLSearchParams`** | No | Solo `*` | `+` | Formularios y consultas `application/x-www-form-urlencoded` |

Al firmar peticiones canónicas para AWS S3, CloudFront u OAuth 1.0a, dejar sin escapar `! ' ( ) *` rompe la verificación HMAC del servidor. Envuelve `encodeURIComponent()` con este reemplazo explícito para cumplir RFC 3986 byte a byte:

```javascript
function encodeRFC3986(valor) {
  return encodeURIComponent(valor).replace(
    /[!'()*]/g,
    (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

const callback = "https://app.ejemplo.com/auth?next=/facturacion&plan=pro(v2)";
const authUrl = `https://idp.ejemplo.com/authorize?redirect_uri=${encodeRFC3986(callback)}`;
```

## Serialización UTF-8 multibyte y dominios IDNA/Punycode

El percent-encoding moderno opera sobre **octetos UTF-8**, no sobre unidades UTF-16 ni ISO-8859-1. Cada carácter Unicode se serializa en 1 a 4 bytes antes de emitir sus tripletas `%HH`:

1. **1 byte ASCII (`U+0000–U+007F`)**: `?` (`0x3F`) → `%3F`; espacio (`0x20`) → `%20`.
2. **2 bytes latinos (`U+0080–U+07FF`)**: `ñ` (`U+00F1`, UTF-8 `C3 B1`) → `%C3%B1`; `á` → `%C3%A1`.
3. **3 bytes BMP (`U+0800–U+FFFF`)**: `€` (`U+20AC`, UTF-8 `E2 82 AC`) → `%E2%82%AC`.
4. **4 bytes suplementarios (`U+10000–U+10FFFF`)**: `👕` (`U+1F455`) → `%F0%9F%91%95`.

Los **nombres de dominio internacionalizados (IDN)** siguen otro estándar (**IDNA2008 / Punycode**): `españa.example` se resuelve en DNS como `xn--espaa-rta.example` y nunca debe codificarse con `%HH`. Para obtener rutas legibles y amigables para SEO en lugar de secuencias `%C3%B1`, normaliza tus títulos con el [Generador de Slugs SEO](/es/herramientas/slug-generator).

## Diagnóstico de errores frecuentes y flujos de ingeniería

### Doble codificación y límites de seguridad

La doble codificación transforma `%20` en `%2520` al volver a escapar `%` como `%25`. Ocurre con frecuencia al llamar manualmente a `encodeURIComponent()` y entregar esa cadena al objeto `params` de Axios o a `URLSearchParams`, que la codifican una segunda vez. Para inspeccionar redirecciones multicapa o destinos ofuscados, abre el [Decodificador de URL](/es/herramientas/url-decoder). Ten presente también que el percent-encoding **no cifra datos**: cualquier secreto incluido en una cadena de consulta queda expuesto en registros de servidor, cabeceras `Referer` e historial del navegador.

### Datos binarios en URLs frente a Base64url

Aplicar percent-encoding a octetos binarios triplica su tamaño (**+300%**). Si debes transportar tokens cifrados o estado comprimido dentro de una URL, codifica primero el bloque en Base64url (`-` y `_`, sin `=`) mediante el [Codificador Base64](/es/herramientas/base64-encode): el sobrecoste cae a ~33% y todos los caracteres resultantes pertenecen al conjunto no reservado de RFC 3986.

### Edición visual de consultas extensas y pruebas con cURL

Al pegar enlaces con diez o más parámetros UTM o de filtrado, el Inspector de Consultas decodifica cada par para editarlo con claridad y lo serializa de nuevo con `encodeURIComponent()` sin alterar la ruta ni el `#fragmento`. Desde terminal, evita escapar a mano y ejecuta `curl -G --data-urlencode "q=I&D + tarifas (2026)" https://api.ejemplo.com/buscar`; aunque `%2f` y `%2F` sean equivalentes, usa hexadecimales en mayúsculas para obtener claves de caché y firmas deterministas.
