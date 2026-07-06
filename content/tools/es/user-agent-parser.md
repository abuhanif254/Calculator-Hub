---
metaTitle: "Analizador de User Agent | Detector de Navegador, OS y Dispositivo"
metaDescription: "Analice cadenas de User Agent (UA). Identifique versiones de navegador (Chrome, Safari), sistemas operativos (OS), dispositivos (Móvil) y bots de motores de búsqueda."
metaKeywords: "analizador user agent, ua parser, detector navegador, decode user agent, dispositivo movil, bot crawler, os detector, user agent string, que es mi user agent"
title: "Analizador de User Agent (UA Parser)"
shortDescription: "Decodifique cualquier cadena de User Agent. Identifique navegadores, sistemas operativos, motores de renderizado (Blink, WebKit), dispositivos y rastreadores web en tiempo real."
faqs:
  - question: "¿Qué es un User Agent?"
    answer: "Un 'User Agent' (UA) es una cadena de texto enviada por su navegador dentro de los encabezados HTTP de cada solicitud. Identifica su tipo de navegador, versión, sistema operativo y motor de renderizado, ayudando a los servidores a entregar contenido optimizado."
  - question: "¿Qué contiene una cadena de User Agent estándar?"
    answer: "Una cadena estándar contiene la plataforma base (ej. Mozilla/5.0), detalles del sistema operativo (ej. Windows NT 10.0), motor del navegador (ej. AppleWebKit/537.36) y la versión activa (ej. Chrome/120.0.0.0)."
  - question: "¿Se pueden falsificar (Spoof) los User Agents?"
    answer: "Sí. La mayoría de los navegadores modernos permiten modificar su User Agent desde las herramientas para desarrolladores. También puede hacerlo usando clientes de línea de comandos como curl o wget."
  - question: "¿Qué es un motor de renderizado?"
    answer: "Un motor de renderizado (como Blink, WebKit o Gecko) es el software central de un navegador que analiza HTML, CSS y JS para calcular las coordenadas y pintar el diseño visual de una página."
  - question: "¿Cuál es la diferencia entre Blink y WebKit?"
    answer: "WebKit es el motor de Apple que impulsa a Safari. Blink es una bifurcación (fork) de WebKit desarrollada por Google que impulsa a Chrome, Edge y Opera, estando optimizada para arquitecturas de múltiples procesos."
  - question: "¿Qué es el Googlebot?"
    answer: "Googlebot es el rastreador o 'araña' (crawler) web de Google. Utiliza una cadena de User Agent específica que contiene la palabra 'Googlebot' para que los administradores de servidores puedan identificar su actividad en los registros."
features:
  - "Detecte y decodifique instantáneamente la cadena de User Agent de su navegador."
  - "Identifique el nombre del navegador, versión, sistema operativo y arquitectura."
  - "Determine la categoría del dispositivo (Escritorio, Móvil, Tablet, Smart TV, Consola o Bot)."
  - "Diferencie bots de motores de búsqueda (Googlebot/Bingbot) de scrapers de IA (GPTBot)."
  - "Evalúe alertas de seguridad para navegadores obsoletos y motores descontinuados."
  - "Compare dos cadenas de User Agent lado a lado con resaltado visual."
useCases:
  - "Desarrolladores web probando consultas de medios (Media Queries) para diseño responsivo."
  - "Consultores SEO auditando archivos de registro para ver el comportamiento del rastreo de Googlebot."
  - "Equipos de ciberseguridad analizando registros del servidor en busca de bots sospechosos."
  - "Soporte TI inspeccionando la versión del cliente para resolver errores de compatibilidad."
howToSteps:
  - "Inspeccione la cadena detectada automáticamente de su navegador."
  - "También puede pegar cualquier encabezado personalizado en el cuadro de texto."
  - "Haga clic en 'Analizar User Agent' para ver el desglose."
  - "Revise las tarjetas que muestran OS, Versión, Dispositivo y Motor de renderizado."
  - "Utilice la pestaña 'Comparar User Agents' para analizar diferencias entre dos cadenas."
---

## ¿Qué es un User Agent?

Un **User Agent (Agente de Usuario)** es una cadena de texto que un navegador web o aplicación cliente transmite a un servidor web dentro del encabezado HTTP. Actúa como una autodeclaración digital, detallando la versión del software, sistema operativo y el dispositivo del cliente.

Cada vez que visita una página, su navegador envía esta cadena. El servidor la lee para determinar cómo dar formato y entregar el contenido. Esto asegura, por ejemplo, que a un smartphone se le sirva una versión móvil, mientras que a una PC se le envíe el diseño completo.

---

## El legado de la compatibilidad en los navegadores

Si examina un User Agent moderno, notará que comienza con la palabra `Mozilla/5.0`, incluso si usa Google Chrome o Apple Safari. Esto es producto de las primeras \"guerras de navegadores\" en los años 90.

En aquel entonces, *Netscape Navigator* (cuyo nombre en clave era *Mozilla*) soportaba funciones avanzadas como 'frames'. Los servidores solo enviaban páginas avanzadas si detectaban a Netscape. Para evitar recibir páginas simples, los navegadores rivales comenzaron a agregar `Mozilla/` al inicio de sus cadenas para declarar que eran \"compatibles con Mozilla\". 

Hoy en día, un User Agent moderno (como Chrome) incluye nombres de casi todos sus predecesores por motivos de retrocompatibilidad:
* **Ejemplo Chrome PC:** `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`

---

## Motores de Renderizado Explicados

Un **motor de renderizado** es el componente central de un navegador responsable de pintar el HTML y el CSS en la pantalla:

1. **Blink:** Desarrollado por Google. Impulsa a Chrome, Microsoft Edge, Opera y Vivaldi.
2. **WebKit:** Creado por Apple para Safari. En iOS (iPhone), Apple obliga a todos los navegadores (incluso Chrome) a utilizar el motor WebKit por debajo.
3. **Gecko:** Desarrollado por Mozilla, impulsa Firefox.

---

## User Agents Móviles vs. Escritorio

* **Agentes de Escritorio:** Señalan al servidor que la pantalla es lo suficientemente grande para diseños de varias columnas. Incluyen referencias como `Windows` o `Macintosh`.
* **Agentes Móviles:** Contienen siempre una etiqueta `Mobile` junto a identificadores como `Android` o `iPhone`. Esto indica al servidor que debe enviar botones grandes optimizados para uso táctil.

---

## Detección de Bots y Rastreadores de IA

No todas las solicitudes en la web provienen de humanos. Scripts y arañas web (Crawlers) visitan su sitio a diario:

1. **Rastreadores SEO:** Agentes autorizados que indexan contenido, como **Googlebot** o **Bingbot**. Suelen respetar el archivo `robots.txt`.
2. **Scrapers de Inteligencia Artificial:** Herramientas que recopilan enormes cantidades de datos públicos para entrenar modelos de lenguaje (LLM). Ejemplos: **GPTBot** (de OpenAI) o **ClaudeBot** (de Anthropic).

---

## User Agent Spoofing y Privacidad

El **Spoofing (Suplantación)** de User Agent es la práctica de modificar esta cadena para engañar al servidor. Se utiliza mucho en web scraping (para eludir cortafuegos anti-bots) o por desarrolladores para simular dispositivos móviles en PC.

**Riesgo de Privacidad (Fingerprinting):** Debido a que la cadena UA contiene combinaciones únicas de sistema operativo y versiones, los rastreadores pueden usarla (junto a la resolución de su pantalla) para identificar su dispositivo sin usar cookies. Por ello, la industria está transicionando hacia **User-Agent Client Hints**, que envían una cadena genérica por defecto para proteger la privacidad del usuario.
