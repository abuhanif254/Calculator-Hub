---
metaTitle: "Comprobador de Redirecciones URL | Rastrea 301, 302 y SEO"
metaDescription: "Rastrea cadenas de redirección 301, 302, 307 y 308 al instante. Detecta bucles, errores canónicos, tiempos por salto y cabeceras HTTP completas."
metaKeywords: "comprobador de redirecciones, rastrear redireccion url, verificar 301 y 302, cadena de redireccion, bucles de redireccion, redireccion 307 308, canonical mismatch, cabeceras http, seo tecnico"
title: "Comprobador de Redirecciones URL"
shortDescription: "Rastrea salto a salto cualquier URL para inspeccionar códigos 301, 302, 307 y 308, medir latencias, detectar bucles infinitos, validar etiquetas canónicas y auditar cabeceras HTTP."
faqs:
  - question: "¿Qué diferencia técnica existe entre una redirección 301 y una 308 (o entre 302 y 307)?"
    answer: "Según RFC 9110, los códigos 301 y 308 indican un traslado permanente y consolidan señales SEO en la URL de destino, mientras que 302 y 307 señalan desvíos temporales. La diferencia clave reside en el método HTTP: los clientes históricos pueden convertir una petición POST en GET al seguir un 301 o 302, mientras que 307 y 308 obligan a conservar exactamente el método y el cuerpo originales."
  - question: "¿Por qué la herramienta marca una discrepancia canónica (Canonical Mismatch) al final del rastreo?"
    answer: "En el último salto con estado 200 OK, el analizador extrae tanto la cabecera HTTP Link con rel=canonical como la etiqueta HTML link canonical del documento. Si esa URL canónica declarada no coincide con la URL final resuelta, los buscadores reciben señales contradictorias que pueden fragmentar la indexación y diluir la autoridad."
  - question: "¿El comprobador detecta redirecciones Meta Refresh y JavaScript además de los códigos 3xx?"
    answer: "Sí. Cuando una respuesta devuelve 200 OK con contenido text/html, el motor inspecciona el bloque inicial del HTML para localizar etiquetas meta http-equiv=refresh y patrones de desvío mediante window.location o location.replace. Aun así, las redirecciones 301 y 308 en servidor siguen siendo muy superiores en velocidad y rastreo SEO."
  - question: "¿Por qué conviene probar la misma URL con distintos User-Agent como Googlebot o Safari móvil?"
    answer: "Muchos servidores, CDN y firewalls aplican reglas de enrutamiento condicional según el dispositivo o el rastreador, por ejemplo enviando teléfonos a subdominios móviles o bloqueando bots con bucles inesperados. Cambiar entre Chrome de escritorio, Safari iPhone, Googlebot, Bingbot o un User-Agent personalizado revela divergencias ocultas."
  - question: "¿Por qué se bloquean las comprobaciones hacia localhost o direcciones IP privadas RFC 1918?"
    answer: "Como los navegadores no permiten inspeccionar respuestas intermedias entre orígenes debido a CORS, el rastreo se ejecuta desde nuestro servidor con modo de redirección manual. Antes de conectar con cada salto, el backend resuelve el DNS y bloquea rangos loopback, privados RFC 1918, CGNAT y enlace local para impedir ataques SSRF."
features:
  - "Rastreo manual salto a salto de hasta 10 redirecciones con medición precisa de la latencia en milisegundos"
  - "Detección de códigos HTTP 3xx (301, 302, 303, 307, 308), etiquetas Meta Refresh HTML y desvíos JavaScript"
  - "Identificación automática de bucles circulares, cadenas excesivamente largas y degradaciones de HTTPS a HTTP"
  - "Validación de coherencia canónica extrayendo tanto la cabecera HTTP Link rel=canonical como la etiqueta HTML"
  - "Selector de User-Agent con perfiles de Chrome escritorio, Safari iPhone, Googlebot, Bingbot y cadena personalizada"
  - "Inspección filtrable de cabeceras HTTP crudas, cookies Set-Cookie por salto, defensa anti-SSRF y exportación JSON"
useCases:
  - "Auditoría de migraciones de dominio y cambios de arquitectura URL para garantizar saltos directos 301 sin pérdida orgánica"
  - "Resolución de fallos ERR_TOO_MANY_REDIRECTS originados por reglas enfrentadas entre Nginx, Apache (.htaccess) y proxies SSL"
  - "Compactación de cadenas encadenadas (HTTP, subdominio www y barra final) en un único salto rápido para mejorar el TTFB"
  - "Verificación de etiquetas canónicas en tiendas online y landings con parámetros UTM que desvían hacia URLs limpias"
  - "Análisis de acortadores de enlaces, URLs de afiliados y campañas publicitarias para auditar saltos intermedios y cookies"
  - "Comprobación de paridad de redirecciones entre navegadores reales y rastreadores como Googlebot o Bingbot"
howToSteps:
  - "Introduce la URL de origen que deseas auditar (el esquema https:// se añade automáticamente si lo omites)."
  - "Elige un perfil de User-Agent en el selector o define una cadena personalizada para simular clientes concretos."
  - "Ejecuta el análisis para que el backend siga manualmente cada salto y registre el estado, la latencia y las cabeceras."
  - "Revisa las alertas de diagnóstico para localizar bucles infinitos, códigos temporales 302/307, saltos sin cifrar o errores canónicos."
  - "Despliega cada tarjeta de salto para examinar la cabecera Location, las cookies Set-Cookie y filtrar cabeceras HTTP crudas."
  - "Copia la URL final o descarga la traza completa en formato JSON para adjuntarla a informes SEO o incidencias técnicas."
---

Al migrar un dominio, imponer HTTPS, normalizar `www` o retirar rutas antiguas, el comportamiento exacto de tus redirecciones HTTP determina tanto la latencia percibida como la indexación orgánica. Un salto mal configurado suma cientos de milisegundos al TTFB, genera bucles infinitos o impide transferir autoridad de enlace. Como las políticas CORS y el seguimiento automático de `fetch` impiden inspeccionar respuestas `3xx` de terceros desde el navegador, esta herramienta ejecuta un rastreo manual salto a salto en servidor con validación anti-SSRF, mide cada latencia, captura cabeceras y cookies `Set-Cookie`, y audita la etiqueta canónica final.

## Semántica de los códigos HTTP 3xx según RFC 9110

El protocolo HTTP define códigos `3xx` acompañados de una cabecera `Location`, cuyo valor puede ser una URI absoluta o una referencia relativa resuelta respecto a la URL del salto actual conforme a RFC 3986. Escoger el estado adecuado controla el almacenamiento en caché del navegador, si una petición `POST` conserva su verbo y su cuerpo, y cómo los motores de búsqueda consolidan las señales SEO.

| Código / Mecanismo | Nombre (RFC 9110) | Conservación del método | Cacheable por defecto | Impacto SEO y uso recomendado |
| :--- | :--- | :--- | :--- | :--- |
| `301` | Moved Permanently | Permite cambiar `POST` a `GET` | Sí (sin caducidad explícita) | Migraciones definitivas; consolida señales en el destino. |
| `302` | Found | Permite cambiar `POST` a `GET` | Solo con caché explícita | Desvíos temporales (pruebas A/B, campañas); retiene la URL origen. |
| `303` | See Other | Cambia siempre a `GET` | No | Patrón Post/Redirect/Get tras enviar formularios web. |
| `307` | Temporary Redirect | Estricta (`POST`/`PUT`) | Solo con caché explícita | Desvío temporal en APIs; también usado por HSTS interno. |
| `308` | Permanent Redirect | Estricta (`POST`/`PUT`) | Sí | Migración permanente de endpoints REST y webhooks. |
| `Meta Refresh` / JS | Cliente (`200 OK`) | Nueva petición `GET` | Según caché del HTML | Exige descargar y analizar el DOM; penaliza latencia y rastreo. |

Un matiz frecuente al depurar en navegadores locales es el **307 Internal Redirect** provocado por HSTS (`Strict-Transport-Security`), que reescribe HTTP a HTTPS localmente antes de abrir conexión. Al ejecutarse desde un cliente limpio en servidor, este comprobador expone la respuesta real emitida por tu infraestructura sin caché HSTS previa.

## Cadenas, bucles infinitos y conflictos canónicos

Inspeccionar la secuencia completa descubre tres patrones de fallo que pasan desapercibidos al navegar manualmente.

### Cadenas largas y presupuesto de rastreo

Separar las reglas de esquema, host y barra final suele producir cadenas costosas y redundantes:

```text
Salto 1: http://ejemplo.com/guia       -> 301 (84 ms)  -> https://ejemplo.com/guia
Salto 2: https://ejemplo.com/guia      -> 301 (96 ms)  -> https://www.ejemplo.com/guia
Salto 3: https://www.ejemplo.com/guia  -> 301 (78 ms)  -> https://www.ejemplo.com/guia/
Salto 4: https://www.ejemplo.com/guia/ -> 200 (112 ms) -> Recurso final
```

Cada salto extra añade viajes de ida y vuelta y posibles negociaciones TCP/TLS cuando cambia el dominio. Además, Googlebot limita los saltos por sesión de rastreo: a partir de 3 saltos aparece fricción medible y por encima de 5 puede abandonar la URL. Debes colapsar la normalización en una única respuesta `301` hacia la forma definitiva, preservando correctamente la cadena de consulta (*query string*) cuando corresponda.

### Bucles circulares y conflictos SSL en proxies inversos

Un ciclo (`A -> B -> A`) bloquea el acceso con `ERR_TOO_MANY_REDIRECTS`. La causa habitual es el modo SSL *Flexible* en CDN: el proxy solicita al origen por HTTP en el puerto 80, el origen responde `301` hacia HTTPS y el proxy repite la llamada HTTP indefinidamente. El analizador registra cada URL visitada y detiene el rastreo en cuanto detecta un nodo repetido, indicando el salto conflictivo.

### Discrepancias canónicas y redirecciones en cliente

Terminar en `200 OK` no basta si la página contradice su propia dirección. La herramienta inspecciona primero la cabecera HTTP `Link: <URL>; rel="canonical"` (clave para PDFs y recursos no HTML) y después la etiqueta `<link rel="canonical">` del documento; si difieren de la URL final resuelta, emite una alerta de *Canonical Mismatch*. Además, cuando un `200 OK` esconde `<meta http-equiv="refresh">` o asignaciones `window.location`, continúa el seguimiento para revelar cadenas mixtas servidor-cliente.

## Configuración en Nginx, Apache y verificación CLI

Centralizar esquema y host en una sola directiva elimina saltos intermedios y bucles accidentales:

```nginx
# Nginx: consolidación en un solo salto 301 hacia HTTPS + www
server {
    listen 80;
    listen 443 ssl;
    server_name ejemplo.com;
    return 301 https://www.ejemplo.com$request_uri;
}
```

En servidores Apache, evita encadenar reglas separadas aplicando dos condiciones `RewriteCond` unidas con `[OR]` y una sola regla `RewriteRule` con `[R=301,L]`; puedes construir la sintaxis exacta sin errores con nuestro [Generador de .htaccess](/es/herramientas/htaccess-generator). Desde la terminal, también puedes auditar cabeceras y cookies intermedias simulando un rastreador con `curl`:

```bash
curl -sSIL -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  "http://ejemplo.com/guia" | grep -iE "^(HTTP/|location:|link:|set-cookie:)"
```

## Degradaciones TLS, User-Agent y defensa anti-SSRF

Toda redirección de `https://` hacia `http://` expone cookies sin el atributo `Secure` y parámetros sensibles en texto claro; por ello el diagnóstico señala cualquier degradación TLS o destino final sin cifrar, además de listar cada cabecera `Set-Cookie` inyectada en saltos intermedios (muy habitual en enlaces de afiliados y seguimiento).

Probar distintos perfiles de `User-Agent` destapa asimismo enrutamientos móviles heredados o *cloaking*; si necesitas desglosar cadenas complejas antes de simularlas, utiliza el [Analizador de User-Agent](/es/herramientas/user-agent-parser). Para auditar `HSTS`, `CSP` y compresión del destino final, continúa en el [Comprobador de Cabeceras HTTP](/es/herramientas/http-header-checker), y si algún salto falla por resolución de dominio, revisa la zona en la [Búsqueda de Registros DNS](/es/herramientas/dns-lookup). Finalmente, el backend valida la resolución DNS de **cada salto individual** antes de conectar, bloqueando rangos loopback (`127.0.0.0/8`, `::1`), redes privadas RFC 1918, CGNAT (`100.64.0.0/10`) y direcciones de enlace local para impedir ataques SSRF mediante redirecciones encadenadas.
