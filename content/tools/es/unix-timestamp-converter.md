---
metaTitle: "Conversor de Timestamp Unix y Época | Segundos, MS e ISO"
metaDescription: "Convierta timestamps Unix de 10 y 13 dígitos a ISO 8601 y hora local. Depure claims JWT exp/iat y prevenga el desbordamiento del Año 2038 en su navegador."
metaKeywords: "conversor unix timestamp, epoca unix 1970, segundos a fecha, milisegundos epoch, iso 8601 rfc 3339, jwt exp iat, problema año 2038, int32 overflow"
title: "Conversor de Timestamp Unix y Época (Epoch)"
shortDescription: "Transforme marcas de tiempo Unix en segundos (10 dígitos) o milisegundos (13 dígitos) a formato ISO 8601 y zonas horarias locales, con inspección de claims JWT en su navegador."
faqs:
  - question: "¿Cómo distinguir rápidamente si un timestamp Unix está en segundos o en milisegundos?"
    answer: "En fechas contemporáneas, un timestamp en segundos tiene 10 dígitos (alrededor de 1.700.000.000), mientras que en milisegundos posee 13 dígitos (alrededor de 1.700.000.000.000). Los valores de 16 y 19 dígitos corresponden a microsegundos y nanosegundos respectivamente."
  - question: "¿Los tokens JWT contienen los campos exp e iat en segundos o en milisegundos?"
    answer: "Según la especificación RFC 7519 (NumericDate), los claims estándar exp, iat y nbf de un JWT se expresan estrictamente en segundos enteros desde la época Unix de 1970. Pasar milisegundos de JavaScript sin dividir entre 1000 provoca expiraciones en el año 56.000."
  - question: "¿Qué es el problema del Año 2038 (Y2038)?"
    answer: "Los sistemas heredados que almacenan el tiempo Unix en un entero con signo de 32 bits (int32) alcanzan su límite máximo de 2.147.483.647 segundos el 19 de enero de 2038 a las 03:14:07 UTC. El siguiente segundo desborda hacia números negativos, retrocediendo al 13 de diciembre de 1901."
  - question: "¿Por qué la época Unix no contabiliza los segundos intercalares (leap seconds)?"
    answer: "Por definición POSIX, cada día Unix dura exactamente 86.400 segundos. Cuando el servicio internacional de rotación terrestre añade un segundo intercalar al tiempo UTC, los servidores NTP repiten un segundo o aplican técnicas de difuminado (leap smearing) para mantener la monotonicidad."
  - question: "¿Se transmiten mis timestamps o payloads de tokens a servidores externos al convertirlos?"
    answer: "No. Toda conversión entre marcas numéricas, ISO 8601 y zonas horarias se realiza localmente en su navegador mediante las API nativas Date, Intl.DateTimeFormat y BigInt, sin tráfico de red hacia terceros."
features:
  - "Detección automática de precisión entre segundos (10 dígitos), milisegundos (13), microsegundos y nanosegundos"
  - "Conversión bidireccional instantánea entre época Unix, ISO 8601 / RFC 3339 y hora local"
  - "Inspección rápida de caducidad y desfase temporal para claims NumericDate (iat, nbf, exp) de JWT"
  - "Soporte aritmético de 64 bits mediante BigInt para fechas posteriores al umbral del Año 2038"
  - "Ejecución 100 % en el navegador sin envío de marcas de tiempo ni metadatos de depuración"
useCases:
  - "Depurar fechas de emisión y expiración de tokens de autenticación JWT en API REST y OAuth 2.0"
  - "Interpretar columnas numéricas de auditoría y eventos almacenadas en PostgreSQL, MySQL o Redis"
  - "Correlacionar trazas distribuidas en nanosegundos de OpenTelemetry o Go con logs en ISO 8601"
  - "Verificar cálculos de TTL (Time To Live) para cachés en memoria y firmas temporales de URLs S3"
  - "Validar migraciones de esquemas de 32 bits a 64 bits ante el límite del 19 de enero de 2038"
howToSteps:
  - "Pegue un número de época Unix (10, 13, 16 o 19 dígitos) o una cadena ISO 8601 en el conversor."
  - "Verifique la unidad de tiempo detectada automáticamente o ajústela manualmente si trata fechas históricas."
  - "Analice la salida equivalente en UTC, hora local del navegador y tiempo relativo transcurrido."
  - "Copie el formato requerido (segundos para JWT, milisegundos para JavaScript o ISO 8601 para APIs)."
---

El tiempo en sistemas distribuidos rara vez se intercambia como texto legible para humanos; las bases de datos, los encabezados de autenticación y las colas de mensajería confían en marcas numéricas referenciadas a la **época Unix (`1970-01-01T00:00:00Z`)**. Este conversor traduce de forma bidireccional marcas de 10 dígitos (segundos), 13 dígitos (milisegundos) y resoluciones de hasta nanosegundos a cadenas estándar **ISO 8601 / RFC 3339** y zonas horarias locales.

Para proteger sus datos de depuración y auditoría, la herramienta opera **100 % en el navegador del usuario** aprovechando `BigInt` y la interfaz nativa `Intl.DateTimeFormat`. Ningún timestamp, registro de base de datos ni carga útil de token abandona su equipo durante la conversión.

## Fundamentos técnicos: época Unix, segundos frente a milisegundos e ISO 8601

El **tiempo Unix** (definido en la especificación POSIX como `time_t`) mide el número de segundos transcurridos desde las `00:00:00 UTC` del 1 de enero de 1970, asumiendo días uniformes de exactamente `86.400` segundos e ignorando los segundos intercalares oficiales de UTC. Esta representación escalar ofrece ventajas decisivas en ingeniería: ocupa apenas 4 u 8 bytes, carece de ambigüedades por zonas horarias o cambios de verano (*DST*) y permite ordenar cronológicamente eventos mediante comparaciones numéricas simples.

La confusión más habitual al integrar ecosistemas heterogéneos surge de la unidad de resolución elegida por cada lenguaje:

- **10 dígitos (segundos)**: Valor estándar en POSIX C, Python (`time.time()`), PHP (`time()`), Go (`time.Now().Unix()`) y tokens JWT. En el periodo actual (2023–2033), oscila entre `1.672.531.200` y `2.000.000.000`.
- **13 dígitos (milisegundos)**: Utilizado de forma nativa por JavaScript (`Date.now()`), Java (`System.currentTimeMillis()`) y formatos JSON de telemetría web. Presenta valores cercanos a `1.795.000.000.000`.
- **16 y 19 dígitos (microsegundos y nanosegundos)**: Habituales en columnas `TIMESTAMP` de alta precisión, trazas de OpenTelemetry y Go (`UnixNano()`).

Cuando se requiere legibilidad directa en contratos HTTP y registros estructurados, la industria estandariza la serialización textual mediante **ISO 8601** y su perfil estricto para Internet **RFC 3339** (por ejemplo, `2026-11-27T04:10:08.000Z`), donde la letra `Z` (*Zulu*) indica desplazamiento cero respecto a UTC.

## Guía práctica: depuración de claims JWT (iat, nbf, exp) y APIs

Un escenario cotidiano de depuración consiste en verificar por qué un servicio rechaza un *JSON Web Token* (JWT) recién emitido. De acuerdo con el estándar **RFC 7519**, los claims temporales `iat` (*Issued At*), `nbf` (*Not Before*) y `exp` (*Expiration Time*) deben codificarse como `NumericDate`, definido explícitamente en **segundos**, nunca en milisegundos.

Observe la diferencia al construir el payload desde Node.js o TypeScript:

```javascript
// Incorrecto: Date.now() devuelve 13 dígitos (milisegundos)
const badExp = Date.now() + 3600 * 1000; // 1795752608000 -> Año 58875

// Correcto: dividir entre 1000 y truncar a entero de 10 dígitos (segundos)
const nowSeconds = Math.floor(Date.now() / 1000);
const jwtPayload = {
  sub: "usr_94821",
  iat: nowSeconds,
  nbf: nowSeconds,
  exp: nowSeconds + 3600, // Expira exactamente en 1 hora
};
```

Si al decodificar la sección central (Base64URL) de un JWT observa un valor de `exp` como `1795756208`, puede pegarlo directamente en el conversor para confirmar la hora exacta de expiración en UTC y comprobar si existe desfase horario (*clock skew*) entre el emisor de identidad y el servidor de recursos. De igual modo, en consultas SQL de diagnóstico sobre PostgreSQL es frecuente convertir sobre la marcha mediante `TO_TIMESTAMP(exp_seconds)` cuando la columna almacena enteros Unix de 10 dígitos.

## Tabla de referencia de escalas de tiempo y formatos estándar

La tabla siguiente sintetiza las resoluciones numéricas y estándares textuales equivalentes para la fecha de referencia `2026-11-27T04:10:08Z`:

| Escala / Formato | Dígitos / Estructura | Valor de ejemplo | Ecosistemas principales | Límite o precisión clave |
| :--- | :--- | :--- | :--- | :--- |
| Segundos (POSIX / JWT) | 10 dígitos (`int32`/`int64`) | `1795752608` | C, POSIX, Python, RFC 7519 JWT | `int32` desborda en 2038 |
| Milisegundos | 13 dígitos (`int64`/`float64`) | `1795752608000` | JavaScript `Date`, Java, Node.js | Seguro en JS hasta `±8,64e15` ms |
| Microsegundos | 16 dígitos (`int64`) | `1795752608000000` | PostgreSQL, SQLite, Apache Kafka | Excede 53 bits si crece en siglos |
| Nanosegundos | 19 dígitos (`int64`/`BigInt`) | `1795752608000000000` | Go `time`, Kubernetes, OpenTelemetry | Pierde precisión en `Number` JS |
| ISO 8601 / RFC 3339 (UTC) | `YYYY-MM-DDTHH:mm:ssZ` | `2026-11-27T04:10:08Z` | REST APIs, OpenAPI, JSON Schema | Requiere sufijo `Z` u offset `+00:00` |
| Límite Int32 (Y2038) | `2^31 - 1` segundos | `2147483647` | Sistemas embebidos, MySQL antiguo | `2038-01-19T03:14:07Z` |

## El problema del Año 2038 (Y2038), segundos intercalares y errores comunes

El riesgo arquitectónico más relevante vinculado a la época Unix es el **problema del Año 2038 (Y2038)**. Cualquier sistema que almacene marcas de tiempo en un entero con signo de 32 bits (`int32`) alcanzará su valor máximo positivo `2.147.483.647` el **19 de enero de 2038 a las 03:14:07 UTC**. Un segundo después, el bit de signo cambiará a `1` y el contador saltará a `-2.147.483.648`, interpretándose como `1901-12-13T20:45:52Z`. Este comportamiento afecta especialmente a tipos `TIMESTAMP` en versiones antiguas de MySQL (limitados precisamente a 2038), protocolos binarios antiguos y firmwares embebidos de 32 bits. La mitigación definitiva exige migrar columnas y estructuras a enteros de 64 bits (`BIGINT` o `int64_t`) o tipos `DATETIME(6)`.

Junto al umbral Y2038, evite estos errores habituales en el manejo de fechas:

- **Pérdida de precisión en JavaScript con nanosegundos**: El tipo `Number` de JavaScript utiliza coma flotante IEEE 754 de 64 bits, cuyo entero seguro máximo (`Number.MAX_SAFE_INTEGER`) es `9.007.199.254.740.991` (16 dígitos). Al recibir marcas de 19 dígitos en nanosegundos desde un servicio Go dentro de JSON, los últimos dígitos se redondean silenciosamente salvo que se procesen como cadenas de texto o con `BigInt`.
- **Desajuste de escala entre cliente y servidor**: Pasar un valor de 10 dígitos a `new Date(ts)` en JavaScript produce fechas de enero de 1970 (pocos días después de la época), porque el constructor espera milisegundos. Multiplique siempre por `1000` al recibir segundos de APIs externas.
- **Análisis ambiguo sin zona horaria**: En JavaScript, `new Date("2026-11-27")` se interpreta en UTC, mientras que `new Date("2026-11-27T04:10:08")` sin la `Z` final adopta la zona horaria local del dispositivo. Incluya siempre `Z` o el desplazamiento explícito (`+01:00`) al serializar fechas ISO 8601.
