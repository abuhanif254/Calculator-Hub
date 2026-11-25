---
metaTitle: "Probador de Pantallas Responsivas | Simulador de Viewport"
metaDescription: "Pruebe su sitio web en viewports móviles, tabletas, portátiles y medidas personalizadas en tiempo real con zoom, rejilla y vista lado a lado."
metaKeywords: "probador responsive, probador de pantallas responsivas, simulador de viewport, probar diseño adaptable, breakpoints tailwind, puntos de ruptura css, prueba movil web, simulador multidispositivo"
title: "Probador de Pantallas Responsivas"
shortDescription: "Inspeccione cómo se adapta su sitio web en pantallas de móviles, tabletas, portátiles y resoluciones CSS personalizadas en tiempo real, con controles de zoom, guías de cuadrícula, rotación y comparación multidispositivo."
faqs:
  - question: "¿Por qué un teléfono con pantalla física de 1179x2556 px renderiza la web a 393x852 píxeles CSS?"
    answer: "Los smartphones de alta densidad aplican un Device Pixel Ratio (DPR) de 2x o 3x para mantener textos y controles legibles a escala física. Las media queries como @media (min-width: 768px) evalúan píxeles de referencia CSS (393 px), mientras la GPU rasteriza cada píxel CSS sobre una matriz física de 3x3."
  - question: "¿Por qué algunos sitios muestran una pantalla en blanco o 'Conexión rechazada' dentro del simulador?"
    answer: "Los servidores que envían X-Frame-Options: DENY, X-Frame-Options: SAMEORIGIN o Content-Security-Policy: frame-ancestors 'none' ordenan al navegador bloquear la incrustación en iframes externos para prevenir ataques de clickjacking. Puede probar sin restricciones sus propios servidores localhost, entornos de preproducción o dominios que permitan marcos."
  - question: "¿Qué sucede en móviles si una página omite la etiqueta meta viewport en su cabecera HTML?"
    answer: "Sin <meta name='viewport' content='width=device-width, initial-scale=1.0'>, los navegadores móviles simulan una ventana de escritorio virtual cercana a 980 px de ancho y reducen toda la página para encajarla en la pantalla. Como consecuencia, las reglas CSS móviles nunca se activan y el texto queda ilegible sin ampliar."
  - question: "¿Por qué height: 100vh se desborda en Safari y Chrome móviles cuando aparece la barra de direcciones?"
    answer: "La unidad clásica vh se calcula sobre la altura máxima posible con las barras del navegador ocultas, haciendo que botones inferiores o pies de portada queden cortados al cargar la página. Sustituir 100vh por unidades dinámicas (100dvh) o de viewport pequeño (100svh) mantiene la interfaz alineada con la zona visible."
  - question: "¿Puede un simulador basado en iframes sustituir por completo las pruebas en teléfonos físicos?"
    answer: "No. Un simulador en navegador detecta con gran rapidez desbordamientos horizontales, saltos de columnas, errores de breakpoints y fallos de reflujo WCAG a 320 px, pero no reproduce el motor WebKit de iOS, el redimensionado del teclado virtual, el desplazamiento con inercia ni la aceleración gráfica limitada de hardware real."
features:
  - "Cambio instantáneo entre perfiles de smartphones, tabletas, portátiles, monitores de escritorio y medidas CSS personalizadas de ancho por alto."
  - "Espacio de comparación multidispositivo lado a lado para observar simultáneamente cómo responde un mismo diseño en distintos breakpoints."
  - "Rotación entre orientación vertical y horizontal en un clic para detectar recortes en cabeceras fijas, modales y menús sobre alturas reducidas."
  - "Controles interactivos de zoom CSS y guías de cuadrícula superpuestas para auditar alineación, retículas y tipografía fluida desde monitores compactos."
  - "Referencia integrada de puntos de ruptura de Tailwind CSS y Bootstrap para verificar exactamente las fronteras en píxeles durante el redimensionado."
  - "Renderizado directo en el navegador del cliente sin servidor proxy intermedio, ideal para iterar rápidamente sobre entornos localhost y staging."
useCases:
  - "Auditar las transiciones de rejilla sm, md, lg, xl y 2xl de Tailwind CSS y el sistema de columnas de Bootstrap en anchos reales de móvil y tableta."
  - "Verificar el cumplimiento del criterio WCAG 2.1 SC 1.4.10 (Reflujo) a 320 px de ancho para erradicar barras de desplazamiento horizontal accidentales."
  - "Comparar vistas móvil, tableta y escritorio en paralelo durante revisiones de pull requests frontend y aprobaciones visuales de diseño UI/UX."
  - "Comprobar cambios de orientación vertical a horizontal en menús desplegables, avisos de privacidad y pasarelas de pago con posición fija."
  - "Evaluar imágenes responsivas (<picture>, srcset y sizes) junto con escalas tipográficas fluidas basadas en clamp() en resoluciones intermedias."
  - "Diagnosticar objetivos táctiles solapados, tablas desbordadas y tarjetas recortadas en servidores locales antes de la fase de QA en dispositivos físicos."
howToSteps:
  - "Escriba la URL pública, de preproducción o local (por ejemplo, http://localhost:3000) en la barra de direcciones del simulador y cárguela en el navegador."
  - "Elija un perfil predefinido de teléfono, tableta, portátil o monitor, o introduzca dimensiones personalizadas exactas en píxeles CSS."
  - "Pulse el botón de rotación para alternar entre formato vertical y horizontal y revisar cabeceras fijas, modales y menús de navegación."
  - "Active las guías de cuadrícula y ajuste el zoom de escala CSS cuando necesite inspeccionar lienzos panorámicos o 4K en una pantalla portátil."
  - "Cambie al modo de comparación lado a lado para detectar inconsistencias visuales entre móvil, tableta y escritorio de forma simultánea."
  - "Verifique la ausencia de desplazamiento horizontal a 320 px y compruebe los controles interactivos antes de validar el despliegue en hardware real."
---

Las regresiones de maquetación rara vez aparecen en un monitor de 1920 px; se esconden en anchos intermedios entre breakpoints nominales: teléfonos compactos de 320 px, móviles en horizontal de 640 px, tabletas en pantalla dividida de 820 px o portátiles de 1280 px. Este simulador carga su sitio en marcos `<iframe>` dimensionados directamente en su navegador —sin proxies intermedios— con zoom, rotación, guías de cuadrícula y vista comparativa para detectar desbordamientos CSS al instante.

## Píxeles CSS, Device Pixel Ratio y mecánica del viewport

Las *media queries* nunca miden píxeles físicos del panel, sino **píxeles de referencia CSS**, vinculados a la densidad real del hardware mediante `window.devicePixelRatio` (DPR):

$$\text{Ancho CSS} = \frac{\text{Ancho físico del panel}}{\text{Device Pixel Ratio}}$$

Un smartphone con panel OLED de `1179 × 2556` píxeles y DPR `3×` expone un viewport de `393 × 852` píxeles CSS. Sin la directiva `viewport` en `<head>`, el navegador móvil emula un lienzo de escritorio de ~980 px y reduce el texto a tamaño ilegible:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

No añada `user-scalable=no` ni `maximum-scale=1.0`: bloquear la ampliación incumple WCAG 2.1 SC 1.4.4 y Safari en iOS ignora igualmente esa restricción.

Conviene contemplar además dos comportamientos móviles frecuentes:

- **Layout Viewport frente a Visual Viewport:** al hacer zoom o abrir el teclado virtual, el *visual viewport* se reduce sin alterar el *layout viewport*, desplazando a veces barras inferiores con `position: fixed`.
- **Unidades dinámicas (`dvh`, `svh`, `lvh`):** cuando la barra de direcciones se oculta al desplazarse, `100vh` equivale a la altura máxima (`100lvh`) y recorta elementos iniciales. Usar `min-height: 100svh` en portadas o `100dvh` en modales evita botones ocultos bajo la interfaz del navegador.

## Referencia de breakpoints y umbrales de accesibilidad WCAG

Cada framework divide el espectro de anchos con fronteras distintas. Probar justo el píxel límite —y `1 px` por debajo— destapa rejillas rotas que pasan inadvertidas en perfiles estándar:

| Rango CSS | Tailwind CSS | Bootstrap 5 | Material 3 | Dispositivos típicos | Restricción clave UX / WCAG |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `320–575 px` | Base | `xs` (`<576`) | Compact (`<600`) | iPhone SE (`375`), Pixel (`412`) | WCAG 2.1 SC 1.4.10 exige cero scroll horizontal a `320 px`. |
| `576–639 px` | Base | `sm` (`>=576`) | Compact | Móviles en horizontal | Altura útil corta (`360–412 px`); recorta modales y cabeceras fijas. |
| `640–767 px` | `sm` (`>=640`) | `sm` | Medium (`>=600`) | Phablets, tabletas pequeñas | Objetivos táctiles WCAG 2.2 SC 2.5.8 (`>=24×24 px`; ideal `44–48 px`). |
| `768–1023 px` | `md` (`>=768`) | `md` (`>=768`), `lg` (`>=992`) | Expanded (`>=840`) | iPad Mini (`768`), iPad Air (`820`) | Transición natural de columna única a dos columnas. |
| `1024–1279 px` | `lg` (`>=1024`) | `lg`, `xl` (`>=1200`) | Expanded / Large | iPad Pro apaisado, portátiles | Mostrar barra completa; todo estado `:hover` exige soporte de teclado. |
| `1280–1535 px` | `xl` (`>=1280`) | `xl`, `xxl` (`>=1400`) | Large (`>=1200`) | Portátiles 13–15" (`1280–1440`) | Limitar lectura a `60–75ch` para mantener comodidad visual. |
| `>= 1536 px` | `2xl` (`>=1536`) | `xxl` (`>=1400`) | Extra-Large (`>=1600`) | Full HD (`1920`), ultraanchos | Aplicar `max-width` centrado para evitar columnas desproporcionadas. |

Complemente esta revisión verificando la legibilidad del texto con el [Comprobador de Contraste](/es/herramientas/contrast-checker) y ordenando sus hojas de estilo con el [Formateador CSS](/es/herramientas/css-beautifier).

## Consultas modernas: sintaxis de rangos y Container Queries

El CSS actual supera las reglas acopladas únicamente al ancho de ventana. **Media Queries Level 4** introduce comparadores matemáticos directos y **CSS Container Queries** adapta cada componente al espacio real de su contenedor padre:

```css
/* Contexto de contención en el contenedor padre */
.catalogo__celda {
  container-type: inline-size;
  container-name: tarjeta;
}

/* Reorganizar la tarjeta según el ancho de su celda */
@container tarjeta (inline-size >= 28rem) {
  .tarjeta {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1.25rem;
  }
}

/* Media Queries Level 4 + tipografía fluida */
@media (48rem <= width < 80rem) {
  .esqueleto {
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}

.titular {
  font-size: clamp(1.5rem, 1.1rem + 2vw, 2.75rem);
}
```

Fíjese en `minmax(0, 1fr)`: sin ese mínimo en `0`, un bloque `<pre>` o una URL sin espacios expande el tamaño intrínseco `min-content` de la pista y provoca scroll horizontal global. Para recortar gráficos decorativos que sobresalen del borde, use `overflow-x: clip` en lugar de `overflow-x: hidden`: `clip` no crea un contenedor de scroll y mantiene intactos los elementos `position: sticky` anidados.

Además del ancho de pantalla, conviene adaptar las interacciones según el tipo de puntero mediante `@media (hover: hover)` y `(pointer: coarse)`. Ocultar botones críticos detrás de estados `:hover` rompe la usabilidad en teléfonos y tabletas, mientras que ampliar el relleno táctil cuando `pointer: coarse` está activo reduce pulsaciones erróneas. Acompañe igualmente sus imágenes con `srcset` y `sizes` precisos para que los móviles con DPR `3×` descarguen recursos proporcionales a su ancho real sin malgastar datos móviles.

## Bloqueos en iframes y brechas frente a hardware real

Como este probador incrusta la URL en un `<iframe>` del navegador, cualquier servidor que envíe `X-Frame-Options: DENY`, `X-Frame-Options: SAMEORIGIN` o `Content-Security-Policy: frame-ancestors 'self'` bloqueará la vista previa externa como defensa legítima contra *clickjacking*. Inspeccione dichas políticas en el [Comprobador de Cabeceras HTTP](/es/herramientas/http-header-checker) o capture páginas de terceros con restricciones estrictas mediante la [Herramienta de Captura Web](/es/herramientas/website-screenshot-tool).

Recuerde también que el `<iframe>` conserva el motor y la cabecera `User-Agent` de su navegador de escritorio. Si el servidor entrega plantillas distintas según el dispositivo en lugar de usar diseño fluido CSS, analice sus cadenas de identificación en el [Analizador de User-Agent](/es/herramientas/user-agent-parser) y cierre siempre el ciclo QA en teléfonos reales con iOS WebKit y Android Chromium.
