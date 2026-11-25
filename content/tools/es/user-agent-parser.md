---
metaTitle: "Analizador de User Agent Online | Navegador, OS y Bots"
metaDescription: "Decodifica cadenas User-Agent (UA) al instante. Identifica navegador, motor Blink/WebKit/Gecko, OS, arquitectura, bots SEO/IA y Client Hints."
metaKeywords: "analizador user agent, ua parser, decodificar user agent, detector de navegador, user-agent client hints, sec-ch-ua, motor blink webkit gecko, detectar bots googlebot gptbot"
title: "Analizador de User Agent (UA Parser)"
shortDescription: "Decodifica y analiza cualquier cadena User-Agent (UA) en tiempo real. Identifica navegador, versión, motor de renderizado, sistema operativo, tipo de dispositivo, bots SEO/IA y patrones de reducción de entropía."
faqs:
  - question: "¿Por qué casi todos los navegadores modernos incluyen Mozilla/5.0 y Safari/537.36 en su User-Agent?"
    answer: "Se debe a décadas de retrocompatibilidad heredadas de los primeros servidores web. Durante los años noventa, muchos sitios solo entregaban funciones avanzadas a Netscape (Mozilla) o posteriormente a motores compatibles con Gecko y Safari. Para evitar recibir versiones degradadas, Chrome, Edge y otros clientes conservaron esos tokens históricos dentro de su cabecera."
  - question: "¿Qué es la reducción de User-Agent (User-Agent Reduction) y cómo afecta al análisis?"
    answer: "Es una iniciativa de privacidad impulsada por Chromium para frenar el fingerprinting pasivo. Congela varios segmentos de la cadena: las versiones menores pasan a .0.0.0, Windows 11 sigue reportando Windows NT 10.0, macOS se congela en 10_15_7 y en Android el modelo de teléfono se reemplaza por la letra K. Para obtener el detalle real, el servidor debe negociar cabeceras Sec-CH-UA Client Hints."
  - question: "¿Cómo se identifica en el User-Agent si un navegador en iOS usa Chrome, Firefox o Safari?"
    answer: "En iOS, navegadores alternativos insertan tokens específicos dentro de una base WebKit: Chrome añade CriOS/, Firefox incluye FxiOS/ y Edge emplea EdgiOS/. Safari nativo, en cambio, combina el token Version/ junto a Mobile/ y Safari/ sin esos prefijos de terceros."
  - question: "¿Basta con revisar la cadena User-Agent para confirmar que una petición proviene de Googlebot o GPTBot?"
    answer: "No. El encabezado User-Agent es texto controlado por el cliente y cualquiera puede falsificarlo con curl o un scraper. Para validar un rastreador legítimo en producción debes comprobar su dirección IP contra los rangos JSON publicados oficialmente o realizar una búsqueda DNS inversa seguida de una resolución DNS directa."
  - question: "¿Cuándo conviene usar el User-Agent en el servidor frente a la detección de capacidades en el cliente?"
    answer: "Nunca uses detección de User-Agent para decidir compatibilidad CSS o JavaScript: para eso existen @supports, consultas de medios y comprobaciones de API en ejecución. Reserva el análisis del UA y Client Hints para analítica, control de bots, selección de instaladores por sistema operativo y telemetría de incidencias."
features:
  - "Detección automática de la cadena User-Agent de tu navegador activo con desglose inmediato de tokens"
  - "Extracción precisa de familia de navegador, versión, motor de renderizado (Blink, WebKit, Gecko) y arquitectura CPU"
  - "Clasificación de dispositivo en escritorio, móvil, tablet, Smart TV, consola y entornos headless"
  - "Identificación diferenciada de rastreadores SEO (Googlebot, Bingbot), bots de IA (GPTBot, ClaudeBot) y clientes CLI"
  - "Detección de cadenas congeladas por User-Agent Reduction con guía equivalente en cabeceras Sec-CH-UA"
  - "Modo comparativo lado a lado para contrastar dos encabezados y depurar reglas de WAF, CDN o proxies"
useCases:
  - "Auditoría de archivos de registro (access logs) para separar tráfico de Googlebot Smartphone, Bingbot y rastreadores de IA"
  - "Ajuste de reglas WAF y anti-scraping para localizar firmas de navegadores obsoletos, clientes automatizados o cadenas malformadas"
  - "Depuración frontend de fallos específicos de motor al comparar WebKit en iOS (CriOS/FxiOS), Blink y Gecko"
  - "Migración de sistemas de telemetría y analítica desde parsers regex tradicionales hacia User-Agent Client Hints"
  - "Entrega inteligente de binarios e instaladores (.dmg, .msi, .AppImage) según sistema operativo y arquitectura de CPU"
  - "Verificación de cachés en CDN y reglas de pre-renderizado dinámico sin fragmentar la caché con Vary: User-Agent"
howToSteps:
  - "Revisa la cadena User-Agent de tu propio navegador, detectada automáticamente al abrir la herramienta."
  - "Pega cualquier encabezado personalizado desde los logs de Nginx, Cloudflare, DevTools o un cliente HTTP para inspeccionarlo."
  - "Ejecuta el análisis para separar los tokens de producto, el navegador real, el motor de renderizado y el sistema operativo."
  - "Verifica la categoría de dispositivo y la clasificación de bots para distinguir usuarios reales de rastreadores automatizados."
  - "Comprueba si existen segmentos congelados (.0.0.0 o Android 10; K) que requieran negociar cabeceras Sec-CH-UA en el servidor."
  - "Activa la pestaña de comparación cuando necesites contrastar dos cadenas lado a lado antes de actualizar filtros de red."
---

La cabecera HTTP `User-Agent`, definida en RFC 9110 §10.1.5, permite que cualquier cliente —desde un navegador móvil hasta un rastreador web o una utilidad CLI— declare su identidad técnica al solicitar un recurso. Aunque a simple vista parece una cadena contradictoria llena de nombres heredados, responde a una gramática estructurada que revela navegador, motor de renderizado, plataforma y tipo de agente. Este analizador decodifica cada segmento en tiempo real en tu navegador, separa tráfico humano de bots SEO o de IA y señala cadenas congeladas por privacidad.

## Anatomía formal de una cadena User-Agent (RFC 9110)

La gramática ABNF de RFC 9110 describe la cabecera como una secuencia de pares `producto/versión` intercalados con comentarios opcionales entre paréntesis (`product *( RWS ( product / comment ) )`). Observa una cadena real emitida por Microsoft Edge en Windows:

```http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0
```

Un analizador fiable evalúa cinco capas en orden estricto de precedencia:

1. **Prefijo heredado (`Mozilla/5.0`):** token de retrocompatibilidad presente en casi todos los navegadores gráficos; carece de valor discriminatorio aislado.
2. **Comentario de plataforma (`Windows NT 10.0; Win64; x64`):** indica núcleo del sistema operativo y arquitectura. Tanto Windows 10 como Windows 11 declaran `Windows NT 10.0`.
3. **Firma de motor (`AppleWebKit/537.36 (KHTML, like Gecko)`):** refleja el linaje histórico con WebKit. Cuando coexiste con `Chrome/` en escritorio o Android, el motor real es **Blink**.
4. **Tokens base (`Chrome/131.0.0.0 Safari/537.36`):** los navegadores basados en Chromium conservan ambos identificadores para evitar bloqueos en sitios antiguos.
5. **Identificador específico y WebViews (`Edg/131.0.0.0`):** determina el producto final. El parser debe comprobar `Edg/`, `OPR/`, `SamsungBrowser/`, `CriOS/`, `FxiOS/` y marcadores de navegadores integrados (`wv` en Android WebView, `FBAN` o `Instagram`) antes de clasificar el cliente como Chrome o Safari, ya que muchos WebViews restringen ventanas emergentes OAuth y almacenamiento de cookies.

## Referencia de navegadores, motores y rastreadores

| Cliente / Agente | Patrón característico en User-Agent | Motor / Entorno | Matiz técnico de análisis |
| :--- | :--- | :--- | :--- |
| **Chrome (Escritorio)** | `Chrome/131.0.0.0 Safari/537.36` | Blink + V8 | Sin tokens derivados (`Edg/`, `OPR/`); versión menor congelada |
| **Edge (Chromium)** | `Chrome/131.0.0.0 ... Edg/131.0.0.0` | Blink + V8 | Usa `Edg/` en escritorio, `EdgA/` en Android y `EdgiOS/` en iOS |
| **Firefox** | `Gecko/20100101 Firefox/133.0` | Gecko + SpiderMonkey | Mantiene fecha fija `20100101` en escritorio; omite `AppleWebKit` |
| **Safari (iOS)** | `iPhone ... Version/18.1 Mobile/15E148 Safari/604.1` | WebKit | Combina `Version/` y `Mobile/` sin prefijos de terceros |
| **Chrome en iOS** | `iPhone ... CriOS/131.0 ... Mobile/15E148 Safari/604.1` | WebKit (iOS) | Sustituye `Chrome/` por `CriOS/` para reflejar el motor WebKit |
| **Googlebot Móvil** | `Android 6.0.1; Nexus 5X ... Googlebot/2.1` | Chromium headless | Emula smartphone al indexar; exige verificación DNS o IP |
| **GPTBot / ClaudeBot** | `Mozilla/5.0 ... GPTBot/1.2` | Rastreador HTTP IA | Atiende directivas específicas por agente en `robots.txt` |
| **cURL / Clientes API** | `curl/8.7.1` o `python-requests/2.32.3` | CLI / SDK HTTP | Cadena mínima sin comentario de plataforma ni motor gráfico |

## Reducción de User-Agent y Client Hints (`Sec-CH-UA`)

Como una cadena detallada facilita el *browser fingerprinting* pasivo, los navegadores basados en Chromium aplican **User-Agent Reduction**: congelan la compilación menor en `.0.0.0`, fijan macOS en `Intel Mac OS X 10_15_7` incluso en Apple Silicon, mantienen `Windows NT 10.0` en Windows 11 y reemplazan el modelo exacto de Android por `Android 10; K`.

### Negociación de cabeceras de baja y alta entropía

El estándar **User-Agent Client Hints** opera exclusivamente en contextos seguros HTTPS dentro de navegadores Chromium (Safari y Firefox mantienen cadenas reducidas sin implementar `Sec-CH-UA`, por lo que tu backend debe conservar respaldo sobre `User-Agent`). Envía por defecto cabeceras de baja entropía (`Sec-CH-UA`, `Sec-CH-UA-Mobile`, `Sec-CH-UA-Platform`) y negocia atributos granulares mediante `Accept-CH`:

```http
Accept-CH: Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch, Sec-CH-UA-Model
Critical-CH: Sec-CH-UA-Platform-Version
Vary: Sec-CH-UA-Platform-Version, Sec-CH-UA-Arch
```

En la petición siguiente, un equipo Windows 11 ARM64 responderá con `Sec-CH-UA-Platform-Version: "15.0.0"`, `Sec-CH-UA-Arch: "arm"` y una marca sintética *GREASE* (`"Not_A Brand"`) diseñada para evitar parsers rígidos. Para verificar si tu servidor anuncia correctamente estas directivas, audítalo en el [Comprobador de Cabeceras HTTP](/es/herramientas/http-header-checker). En el cliente, la lectura estructurada evita expresiones regulares:

```javascript
if (navigator.userAgentData) {
  const hints = await navigator.userAgentData.getHighEntropyValues([
    'architecture', 'platformVersion', 'model', 'fullVersionList'
  ]);
  console.log(hints.platform, hints.platformVersion, hints.architecture);
}
```

## Verificación de bots, pruebas CLI y arquitectura

### Comprobación real de rastreadores mediante DNS

La cabecera `User-Agent` nunca sirve como prueba de identidad ni control de acceso porque cualquier script puede suplantarla fácilmente. Al depurar respuestas o validar un supuesto rastreador en logs, combina pruebas controladas con verificación DNS inversa y directa:

```bash
curl -sI -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://ejemplo.com/
dig -x 66.249.66.1 +short && dig +short crawl-66-249-66-1.googlebot.com
```

Para gobernar buscadores y rastreadores de modelos de lenguaje con precisión, acompaña esta verificación con reglas claras creadas en el [Generador de robots.txt](/es/herramientas/robots-txt-generator).

### Rendimiento en CDN y buenas prácticas de parsing

- **Evita `Vary: User-Agent` en cachés CDN:** existen cientos de miles de cadenas únicas y fragmentar la caché por el UA completo desploma la tasa de aciertos. Normaliza el tipo de dispositivo en el borde o usa `Vary: Sec-CH-UA-Mobile`.
- **Usa detección de capacidades en el frontend:** recurre a consultas CSS `@supports`, `matchMedia` y pruebas en el [Probador de Pantalla Responsiva](/es/herramientas/responsive-screen-tester) en vez de bifurcar código según el nombre del navegador.
- **Previene ataques ReDoS en parsers propios:** evita expresiones regulares con retroceso exponencial sobre cadenas `User-Agent` no confiables y trunca longitudes anómalas antes de analizarlas.
