---
metaTitle: "Probador de Regex en Vivo y Depurador ECMAScript (ReDoS)"
metaDescription: "Pruebe expresiones regulares ECMAScript en tiempo real con grupos de captura, lookaheads, banderas g/i/m/s/u y análisis anti-ReDoS 100 % en su navegador."
metaKeywords: "probador regex, depurador expresiones regulares, regex ecmascript, grupos de captura, lookahead, banderas regex, backtracking catastrofico, prevencion redos"
title: "Probador de Regex y Depurador en Tiempo Real"
shortDescription: "Valide, inspeccione y depure expresiones regulares compatibles con ECMAScript con resaltado de grupos de captura, banderas y detección de riesgo ReDoS directamente en su navegador."
faqs:
  - question: "¿Qué diferencia existe entre un grupo de captura estándar y un grupo sin captura?"
    answer: "Un grupo estándar entre paréntesis (...) guarda la subcadena coincidente en memoria para recuperarla mediante índices o referencias inversas. Un grupo sin captura (?:...) solo agrupa cuantificadores o alternancias sin asignar memoria ni contaminar el arreglo de resultados."
  - question: "¿Por qué es recomendable activar la bandera u en aplicaciones modernas?"
    answer: "La bandera u (Unicode) habilita el procesamiento por puntos de código completos en lugar de unidades UTF-16 de 16 bits. Sin ella, emojis, símbolos extendidos y escapes de propiedades Unicode como \\p{L} fallan o se dividen en pares subrogados inválidos."
  - question: "¿Qué es el backtracking catastrófico o vulnerabilidad ReDoS?"
    answer: "Es una degradación exponencial del rendimiento que ocurre cuando un motor NFA evalúa cuantificadores anidados o ambiguos sobre una cadena que no coincide al final. Esto puede bloquear por completo el hilo principal de Node.js o del navegador durante segundos o minutos."
  - question: "¿Los registros de servidor o datos personales que pego en el probador salen de mi equipo?"
    answer: "No. El motor de evaluación RegExp corre íntegramente en el entorno JavaScript local de su navegador. Ningún patrón ni cadena de prueba se envía a través de la red ni se registra en servidores externos."
  - question: "¿Cuándo conviene usar lookaheads o lookbehinds en lugar de grupos normales?"
    answer: "Las aserciones lookaround (?=...), (?!...), (?<=...) y (?<!...) comprueban contexto previo o posterior sin consumir caracteres de la coincidencia principal. Resultan ideales para validar contraseñas o extraer valores delimitados sin incluir los delimitadores en el resultado."
features:
  - "Evaluación instantánea con el motor nativo RegExp compatible con la especificación ECMAScript"
  - "Resaltado visual diferenciado para coincidencias globales, grupos numerados y grupos con nombre"
  - "Selector interactivo de banderas g, i, m, s, u con explicación inmediata de su efecto"
  - "Detección temprana de patrones propensos a backtracking catastrófico (ReDoS) y medición de tiempo"
  - "Privacidad absoluta mediante ejecución local en el navegador sin telemetría ni envío de textos"
useCases:
  - "Extraer campos estructurados de trazas de logs Nginx, CloudWatch o Kubernetes mediante grupos con nombre"
  - "Diseñar reglas de validación de formularios y sanitización de entradas en JavaScript y TypeScript"
  - "Auditar expresiones regulares heredadas para detectar cuellos de botella ReDoS antes de publicar"
  - "Verificar compatibilidad de caracteres internacionales y acentos en español usando escapes Unicode"
  - "Depurar comportamientos inesperados de anclas ^ y $ en cadenas multilínea"
howToSteps:
  - "Escriba su expresión regular en el campo de patrón sin necesidad de escapar las barras externas."
  - "Active las banderas necesarias (g, i, m, s, u) según el tipo de búsqueda y codificación requerida."
  - "Pegue las líneas de texto, logs o casos límite (positivos y negativos) en el panel de pruebas."
  - "Inspeccione los grupos capturados y los tiempos de evaluación para refinar el patrón antes de copiarlo."
---

Las expresiones regulares constituyen una herramienta indispensable para el análisis léxico, la validación de entradas y la extracción de telemetría, pero un cuantificador mal planteado o una bandera omitida puede introducir fallos silenciosos o bloquear un servidor entero. Este depurador evalúa patrones compatibles con el estándar **ECMAScript (ECMA-262)** en tiempo real, desglosando grupos de captura, aserciones *lookaround* y métricas de ejecución.

Toda la compilación y evaluación se ejecuta **100 % del lado del cliente** dentro del motor JavaScript de su propio navegador. Al no existir transmisiones hacia servidores remotos ni almacenamiento intermedio, puede depurar libremente registros de producción con direcciones IP, identificadores internos o muestras de datos confidenciales con garantía total de privacidad.

## Motor ECMAScript: grupos de captura, lookarounds y banderas

El motor `RegExp` definido en ECMAScript implementa un **autómata finito no determinista (NFA)** con retroceso (*backtracking*). Esta arquitectura habilita construcciones expresivas imposibles en autómatas deterministas puros, tales como referencias inversas y aserciones de ancho cero, aunque delega en el desarrollador la responsabilidad de controlar el espacio de búsqueda.

Entre las capacidades clave que conviene dominar en JavaScript y TypeScript moderno destacan:

- **Grupos de captura y nombramiento**: Mientras `(expr)` almacena la subcadena por índice posicional, `(?<nombre>expr)` asigna un identificador semántico accesible desde `match.groups.nombre`. Si solo requiere agrupar una alternancia sin capturar memoria, utilice `(?:expr)`.
- **Aserciones *lookahead* y *lookbehind***: Permiten exigir o prohibir contexto adyacente sin consumir caracteres del resultado. Un *lookahead* positivo `(?=...)` verifica lo que sigue; un *lookbehind* negativo `(?<!...)` asegura que cierto prefijo no anteceda a la coincidencia.
- **Control mediante banderas (*flags*)**: Modifican la semántica global del patrón sin alterar su sintaxis interna:
  - `g` (*global*): Busca todas las ocurrencias en lugar de detenerse en la primera, manteniendo estado en la propiedad `lastIndex`.
  - `i` (*ignoreCase*): Ignora diferencias entre mayúsculas y minúsculas según las reglas Unicode activas.
  - `m` (*multiline*): Cambia el alcance de `^` y `$` para que coincidan con el inicio y fin de cada línea (`\n`), no solo del texto completo.
  - `s` (*dotAll*): Permite que el comodín `.` coincida también con saltos de línea (`\n`, `\r`, `\u2028`, `\u2029`).
  - `u` (*unicode*): Trata la cadena como secuencia de puntos de código Unicode reales, habilitando emojis, pares subrogados y categorías como `\p{Script=Latin}`.

## Flujo práctico: extracción estructurada de logs de servidor

Suponga que necesita extraer el método HTTP, la ruta, el código de estado y la latencia en milisegundos de registros de un *API Gateway*, excluyendo peticiones internas de *healthcheck* mediante un *lookahead* negativo:

```text
[2026-11-27T09:14:22Z] INFO method=POST path=/v2/orders/checkout status=201 latency=42ms
[2026-11-27T09:14:25Z] INFO method=GET path=/healthz status=200 latency=1ms
[2026-11-27T09:14:29Z] WARN method=DELETE path=/v2/tokens/revoked status=403 latency=18ms
```

Para capturar cada métrica en propiedades legibles y descartar `/healthz` sin multiplicar la lógica en código de aplicación, construimos el siguiente patrón ECMAScript con banderas `gmu`:

```javascript
const logRegex =
  /^\[(?<timestamp>[^\]]+)\]\s+(?<level>\w+)\s+method=(?<method>GET|POST|PUT|DELETE)\s+path=(?!\/healthz\b)(?<path>\S+)\s+status=(?<status>\d{3})\s+latency=(?<latency>\d+)ms$/gmu;

for (const match of rawLogs.matchAll(logRegex)) {
  console.log(match.groups);
}
```

Al ejecutar `matchAll()`, la primera y tercera línea devuelven objetos estructurados con `timestamp`, `level`, `method`, `path`, `status` y `latency`, mientras que la segunda línea queda descartada por `(?!\/healthz\b)` sin necesidad de condicionales posteriores. Observe el uso de clases negadas `[^\]]+` y límites explícitos `\S+` en lugar de `.*`, lo que evita retrocesos innecesarios a lo largo de la línea.

## Referencia rápida de sintaxis y banderas ECMAScript

La siguiente tabla recopila las construcciones más utilizadas al depurar expresiones regulares en entornos web y Node.js:

| Construcción / Bandera | Nombre técnico | Comportamiento en ECMA-262 | Ejemplo práctico |
| :--- | :--- | :--- | :--- |
| `g` | Global | Itera todas las coincidencias y actualiza `lastIndex` | `/\d+/g` |
| `i` | Insensible a mayúsculas | Equipara `A-Z` y caracteres con tilde si se combina con `u` | `/error/iu` |
| `m` | Multilínea | Ancla `^` y `$` al inicio y final de cada línea | `/^WARN:/gm` |
| `s` | DotAll | El punto `.` incluye saltos de línea `\n` y `\r` | `/BEGIN.*?END/s` |
| `u` | Unicode estricto | Activa puntos de código completos y escapes `\p{...}` | `/\p{L}+/gu` |
| `(?<id>...)` / `(?:...)` | Grupo con nombre / No captura | Nombra la captura en `.groups` o agrupa sin asignar índice | `/(?<year>\d{4})-(?:\d{2})/` |
| `(?=...)` / `(?<!...)` | Lookahead + / Lookbehind - | Evalúa contexto futuro o previo sin consumir caracteres | `/(?<!-)\b\d+(?=px)/` |

## Prevención de ReDoS, estado global y trampas en producción

El riesgo de seguridad más crítico al desplegar expresiones regulares en servicios backend es la **denegación de servicio por expresión regular (ReDoS)**, provocada por *backtracking* catastrófico. Cuando un patrón combina cuantificadores anidados —como `^([a-zA-Z0-9]+)+$`— o alternancias con solapamiento como `(a|aa)+`, un atacante puede enviar una cadena de 30 caracteres que falle en el último carácter (por ejemplo, `aaaaaaaaaaaaaaaaaaaaaaaaaaaa!`). El motor NFA probará hasta `2^30` combinaciones antes de devolver `false`, congelando el bucle de eventos de Node.js por completo.

Para blindar sus expresiones regulares en producción, aplique estas prácticas defensivas:

- **Elimine cuantificadores anidados y comodines ambiciosos**: Reemplace construcciones `(.+)+` o `(.*)*` por clases de caracteres mutuamente excluyentes, cuantificadores acotados como `{1,128}` y coincidencias perezosas (`+?`) únicamente cuando exista un delimitador de cierre inequívoco.
- **Limpie el estado de la bandera `g`**: Si declara una constante `const re = /token/g;` y la reutiliza con `re.test(input)`, cada coincidencia exitosa avanza `re.lastIndex`. La siguiente llamada con una cadena distinta podría fallar de forma intermitente si comienza después del inicio. Para validaciones booleanas simples, omita la bandera `g` o reinicie `re.lastIndex = 0`.
- **Valide con longitud máxima previa**: Antes de pasar un texto aportado por un usuario a cualquier motor NFA, verifique `input.length <= MAX_LEN`. Cuando necesite aceptar expresiones regulares definidas por el propio usuario final, sustituya el motor nativo por bibliotecas de tiempo lineal garantizado como `re2`.
- **Active siempre `u` frente a texto multilingüe**: Omitir la bandera Unicode hace que rangos o clases negadas dividan caracteres de cuatro bytes, generando corrupción silenciosa de cadenas o fallos al validar nombres propios con diacríticos o símbolos modernos.
