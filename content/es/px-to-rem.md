---
title: "Conversor de PX a REM en CSS: Fórmula, Accesibilidad y Tabla"
description: "Convierta píxeles (px) a unidades rem en CSS según el tamaño de fuente raíz (16 px por defecto). Guía W3C, accesibilidad web, ejemplos y tabla de referencia."
faqs:
  - question: "¿Cuánto equivale 1 rem en píxeles por defecto?"
    answer: "En todos los navegadores modernos, el tamaño de fuente raíz predeterminado es de 16 píxeles, por lo que 1 rem equivale exactamente a 16 px mientras no se modifique la regla del elemento html."
  - question: "¿Cuál es la diferencia entre rem y em en CSS?"
    answer: "La unidad rem se calcula siempre respecto al tamaño de fuente del elemento raíz (html), manteniendo un valor constante en toda la página. En cambio, em depende del tamaño de fuente del elemento padre inmediato, lo que provoca aumentos o reducciones acumulativas al anidar contenedores."
  - question: "¿Por qué es mejor usar rem en lugar de px para la tipografía?"
    answer: "Las unidades rem respetan las preferencias de tamaño de texto configuradas por el usuario en su navegador. Si define las fuentes en píxeles fijos, muchos navegadores ignoran el ajuste base del usuario y dificultan la lectura para personas con baja visión."
  - question: "¿Sigue siendo recomendable usar font-size: 62.5% en el elemento html?"
    answer: "Aunque configurar 62.5 % hace que 1 rem equivalga a 10 px y facilita el cálculo mental, puede romper estilos de bibliotecas externas que asumen 1 rem = 16 px. Hoy se prefiere conservar la base de 16 px o utilizar funciones CSS como calc() y clamp()."
  - question: "¿Deben convertirse también los bordes y las consultas de medios a rem?"
    answer: "Los bordes finos de 1 px suelen mantenerse en píxeles para garantizar nitidez visual, mientras que las consultas de medios (media queries) en rem o em ofrecen un comportamiento más coherente cuando el usuario amplía únicamente el tamaño del texto."
---

Para convertir píxeles (`px`) a unidades `rem` en hojas de estilo CSS, divida el valor en píxeles entre el tamaño de fuente del elemento raíz (`html`), cuya constante predeterminada es `16 px`: `rem = px ÷ 16`. Con esta base, una tipografía de `24 px` equivale exactamente a `1,5 rem` y un texto auxiliar de `14 px` corresponde a `0,875 rem`.

El uso de `rem` sustituye medidas rígidas por una escala proporcional vinculada a la configuración del navegador del visitante. Cuando alguien amplía su fuente predeterminada de `16 px` a `20 px`, toda la interfaz definida en `rem` se adapta uniformemente sin requerir ajustes adicionales.

## Fórmula exacta y especificación del W3C

La unidad `rem` integra el módulo oficial **CSS Values and Units** del Consorcio World Wide Web (**W3C**). El píxel CSS (`1 px`) representa una unidad angular de referencia (`1/96` de pulgada), mientras que `rem` actúa como multiplicador relativo al tamaño calculado de `:root` o `html`.

Las fórmulas exactas de conversión son:

- **De píxeles a rem:** `rem = px ÷ Tamaño de fuente raíz (px)`
- **De rem a píxeles:** `px = rem × Tamaño de fuente raíz (px)`

Con el ajuste estándar de los navegadores modernos (`16 px`), se cumple `1 rem = 16 px`. Si se declara `html { font-size: 18px; }`, entonces `1 rem` pasará a equivaler a `18 px`.

## Ejemplos prácticos paso a paso

Los siguientes escenarios muestran cómo calcular medidas tipográficas y de maquetación en proyectos reales:

### 1. Escala tipográfica con la base estándar de 16 px

Un sistema de diseño especifica en Figma un subtítulo de `24 px`, un párrafo principal de `18 px` y una etiqueta auxiliar de `14 px`. Manteniendo el tamaño raíz predeterminado de `16 px`:

1. Subtítulo: `24 ÷ 16 = 1,5 rem`.
2. Párrafo principal: `18 ÷ 16 = 1,125 rem`.
3. Etiqueta auxiliar: `14 ÷ 16 = 0,875 rem`.

### 2. Maquetación con base decimal al 62,5 % (10 px)

En algunos proyectos heredados se aplica `html { font-size: 62.5%; }` (`16 px × 0,625 = 10 px`) para simplificar divisiones mentales. Si necesita trasladar un título de `40 px` y un relleno interno de `32 px`:

1. Título: `40 ÷ 10 = 4 rem`.
2. Relleno: `32 ÷ 10 = 3,2 rem`.
3. Recuerde añadir `body { font-size: 1.6rem; }` para devolver el texto normal a `16 px` efectivos y evitar que el contenido quede ilegible.

### 3. Comprobación de accesibilidad con ampliación de navegador

Suponga que una persona con baja visión configura su navegador con un tamaño de fuente base de `20 px` (un incremento del `25 %` respecto al estándar). Compare el resultado de definir un párrafo en `1,125 rem` frente a `18 px`:

1. Con `1,125 rem`: el navegador calcula `1,125 × 20 px = 22,5 px`, escalando la lectura de forma proporcional.
2. Con `18 px` fijos: el tamaño permanece bloqueado en `18 px`, ignorando la preferencia del usuario y dificultando el cumplimiento de las pautas de accesibilidad **WCAG 2.1** (criterio 1.4.4 sobre ampliación de texto hasta el `200 %`).

## Tabla de referencia rápida de PX a REM (base 16 px)

La tabla recoge los valores más utilizados en tipografía web, espaciados y componentes de interfaz tomando como referencia el tamaño raíz estándar de `16 px`:

| Píxeles (px) | Equivalente en REM (base 16 px) | Equivalente en REM (base 10 px) | Uso recomendado en interfaz |
| :--- | :--- | :--- | :--- |
| 10 px | 0,625 rem | 1 rem | Microtextos o insignias breves (uso limitado) |
| 12 px | 0,75 rem | 1,2 rem | Notas al pie, fechas y metadatos secundarios |
| 14 px | 0,875 rem | 1,4 rem | Etiquetas de formularios y celdas de datos |
| 16 px | 1 rem | 1,6 rem | Tamaño base predeterminado y texto general |
| 18 px | 1,125 rem | 1,8 rem | Párrafos editoriales de lectura prolongada |
| 20 px | 1,25 rem | 2 rem | Entradillas destacadas y subtítulos `h4` |
| 24 px | 1,5 rem | 2,4 rem | Encabezados `h3` y márgenes de tarjetas |
| 32 px | 2 rem | 3,2 rem | Títulos de sección `h2` y separación de bloques |
| 40 px | 2,5 rem | 4 rem | Titulares `h1` en pantallas móviles o tabletas |
| 48 px | 3 rem | 4,8 rem | Titulares principales de portada en escritorio |

## Casos de uso en desarrollo frontend y errores comunes

El empleo sistemático de `rem` resulta indispensable en sistemas de diseño, bibliotecas de componentes y maquetación adaptable. Al combinarlo con variables CSS (`--espacio-m: 1.5rem;`) y funciones como `clamp(1rem, 2.5vw, 1.5rem)`, se consigue una tipografía fluida que respeta las preferencias del usuario.

El error más grave en la configuración del proyecto consiste en asignar un valor absoluto en píxeles al selector raíz (`html { font-size: 16px; }`). Aunque parezca inofensivo por coincidir con el valor predeterminado, sobrescribe cualquier ajuste que el visitante haya realizado en su navegador o sistema operativo, anulando por completo la ventaja de accesibilidad de `rem`. Si desea mantener el control del diseño sin bloquear la accesibilidad, deje `font-size` sin definir en `html` o utilice porcentajes (`100 %`).

Otro fallo frecuente es confundir `rem` con `em` en componentes anidados. Si una lista `<ul>` define `font-size: 0.875em` y contiene otro subnivel `<ul>` con la misma regla, el texto se encoge en cascada (`0,875 × 0,875 = 0,7656` del original). Usar `rem` para tamaños de fuente y espaciados globales elimina esa multiplicación indeseada, reservando `em` únicamente para rellenos internos de botones o iconos que deban crecer junto al texto propio de ese componente.
