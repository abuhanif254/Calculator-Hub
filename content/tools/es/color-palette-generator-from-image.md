---
metaTitle: "Generador de Paleta de Colores desde Imagen | Tailwind"
metaDescription: "Extrae paletas de colores y kits de marca desde cualquier imagen con cuantización local, auditoría WCAG y exportación directa a Tailwind CSS."
metaKeywords: "generador paleta colores, extraer paleta de imagen, colores de imagen, esquema de color web, paleta ui, extraer colores foto, generador temas color, tailwind css, contraste wcag"
title: "Generador de Paleta de Colores desde Imagen"
shortDescription: "Extrae colores dominantes, proporciones cromáticas y un kit de marca completo desde cualquier foto o diseño con procesamiento 100% local, control de contraste WCAG y exportación a Tailwind CSS y variables CSS."
faqs:
  - question: "¿Qué algoritmo extrae los colores dominantes de una fotografía?"
    answer: "La herramienta muestrea los píxeles de la imagen en un lienzo HTML5 local y ejecuta cuantización cromática mediante corte mediano modificado (MMCQ) junto con evaluación perceptual en el espacio HSL, clasificando hasta 64 clústeres iniciales en seis muestras semánticas ordenadas por población real de píxeles."
  - question: "¿Por qué la cuantización en RGB puro suele producir paletas apagadas o imprecisas?"
    answer: "El espacio RGB no es perceptualmente uniforme: dos tonos con la misma distancia euclidiana en RGB pueden parecer casi idénticos o muy distintos al ojo humano. Evaluar saturación y luminancia en espacios como HSL o CIELAB evita que los tonos grises del fondo absorban los colores de acento."
  - question: "¿Cómo calcula la herramienta si la paleta cumple con la accesibilidad WCAG 2.1?"
    answer: "Cada par de fondo y texto se linealiza desde sRGB para obtener su luminancia relativa y calcular la relación de contraste oficial. Cuando el contraste entre el fondo dominante y el texto propuesto cae por debajo de 4,5:1 (nivel AA), la vista previa muestra una alerta inmediata."
  - question: "¿Se suben mis diseños confidenciales o moodboards a algún servidor?"
    answer: "No. La decodificación de la imagen, el muestreo de píxeles en Canvas, el cálculo de clústeres, la verificación de contraste y la generación del código CSS y Tailwind ocurren por completo en la memoria RAM de tu navegador."
  - question: "¿Qué diferencia hay entre el gráfico de distribución y el kit de marca generado?"
    answer: "El gráfico circular y la barra de espectro muestran el peso porcentual exacto de cada muestra extraída sobre el total de píxeles analizados, mientras que el kit de marca asigna roles funcionales de interfaz (fondo, texto, primario, secundario y acento) según saturación y luminancia."
features:
  - "Cuantización cromática client-side mediante corte mediano modificado (MMCQ) con hasta 64 clústeres de muestreo sobre HTML5 Canvas"
  - "Extracción de seis perfiles cromáticos semánticos (Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant y LightMuted) con peso porcentual"
  - "Gráfico circular SVG proporcional y barra de espectro para auditar la dominancia visual real de cada tono"
  - "Síntesis automática de un kit de marca de cinco roles (background, text, primary, secondary y accent) con detección de tema claro u oscuro"
  - "Maqueta interactiva de interfaz en vivo con alerta integrada cuando el contraste fondo-texto incumple el umbral WCAG 2.1 AA (4,5:1)"
  - "Exportación con un clic a objetos de configuración de tailwind.config.js y propiedades personalizadas :root en CSS nativo"
useCases:
  - "Definir tokens de color iniciales para un sistema de diseño a partir de fotografías de producto, empaques o moodboards aprobados"
  - "Generar configuraciones listas para copiar en tailwind.config.js y globals.css al maquetar landing pages temáticas"
  - "Evaluar si una fotografía principal de cabecera exige un tema de interfaz claro u oscuro antes de definir componentes UI"
  - "Auditar rápidamente la relación de contraste WCAG entre el fondo dominante de una imagen editorial y la tipografía superpuesta"
  - "Extraer tonos de acento saturados para botones CTA y estados activos sin perder coherencia con los neutros de la fotografía"
  - "Procesar activos visuales bajo acuerdos de confidencialidad (NDA) sin exponer archivos de marca a servicios externos en la nube"
howToSteps:
  - "Arrastra una imagen JPG, PNG o WebP a la zona de carga o haz clic para seleccionarla desde tu dispositivo; el archivo nunca sale del navegador."
  - "Espera unos milisegundos mientras el motor muestrea los píxeles en Canvas y calcula las seis muestras cromáticas dominantes."
  - "Revisa el gráfico circular de distribución y la barra de espectro para comprobar qué porcentaje visual ocupa cada clúster en la composición."
  - "Inspecciona el kit de marca generado y haz clic en cualquier tarjeta (background, text, primary, secondary o accent) para copiar su código HEX."
  - "Comprueba la maqueta interactiva de interfaz y verifica si aparece alguna advertencia de contraste bajo antes de aplicar la paleta en producción."
  - "Copia el bloque listo para usar de tailwind.config.js o las variables CSS de globals.css directamente en tu repositorio."
---

Traducir una fotografía o un moodboard en un sistema cromático coherente para web exige mucho más que tomar muestras aisladas con un cuentagotas. Una imagen digital de 24 bits puede contener millones de valores RGB distintos por degradados, ruido del sensor y suavizado de bordes. Este **Generador de Paleta de Colores desde Imagen** reduce esa complejidad directamente en tu navegador mediante cuantización cromática, calcula el peso visual de cada tono dominante, sintetiza un kit de marca para interfaz y exporta tokens listos para código sin subir archivos a ningún servidor.

## Cuantización cromática y espacios de color: MMCQ, K-Means y CIELAB

Al cargar un archivo JPG, PNG o WebP, el navegador lo decodifica en un HTML5 Canvas invisible y extrae la matriz RGBA mediante `getImageData()`. Para obtener muestras fieles a la percepción visual en lugar de promedios grises, los extractores profesionales combinan dos enfoques de cuantización vectorial:

- **Corte Mediano Modificado (MMCQ)**: Algoritmo empleado por motores como `node-vibrant`. Cuantiza el histograma 3D a 5 bits por canal, localiza la caja de mayor rango o producto volumen-población y la subdivide por la mediana hasta obtener 64 cubos representativos. Resulta rápido, determinista y rescata acentos minoritarios de alta saturación.
- **Agrupamiento K-Means en CIELAB**: Reasigna píxeles iterativamente a *k* centroides minimizando la distancia perceptual `ΔE` en CIELAB (`L*` luminosidad, `a*` eje verde-rojo, `b*` eje azul-amarillo). Frente a la distancia euclidiana en RGB, `ΔE` respeta la sensibilidad del ojo humano y evita fusionar verdes diferenciables antes que azules casi idénticos.

Cada clúster resultante se clasifica en el espacio **HSL** según población, saturación y luminancia para asignar seis perfiles semánticos. Si solo necesitas leer un píxel puntual de una captura o logotipo, usa el [Selector de Color desde Imagen](/es/herramientas/color-picker-from-image).

## Perfil semántico de muestras y mapeo hacia el kit de marca

Para impedir que un fondo neutro amplio monopolice la paleta, el analizador separa las seis muestras objetivo y las traduce automáticamente a los cinco roles de un kit de marca web.

| Muestra semántica | Saturación objetivo | Luminosidad objetivo | Rol en el kit de marca | Aplicación recomendada en UI |
| :--- | :---: | :---: | :--- | :--- |
| **`Vibrant`** | Alta (≥ 35%) | Media (~50%) | `accent` | Botones CTA, insignias, enlaces activos |
| **`DarkVibrant`** | Alta (≥ 35%) | Baja (~26%) | `primary` | Barras de navegación, cabeceras, estados hover |
| **`LightVibrant`** | Alta (≥ 35%) | Alta (~74%) | `accent` alternativo | Alertas suaves, etiquetas en modo oscuro |
| **`Muted`** | Baja (≤ 40%) | Media (~50%) | `secondary` | Botones secundarios, bordes, elementos de apoyo |
| **`DarkMuted`** | Baja (≤ 40%) | Baja (~26%) | `background` oscuro | Superficies de tema oscuro, tarjetas, pies |
| **`LightMuted`** | Baja (≤ 40%) | Alta (~74%) | `background` claro | Lienzos principales, fondos de sección |

El gráfico circular SVG y la barra de espectro permiten comprobar de un vistazo si la composición respeta la regla **60-30-10** (60% fondo neutro, 30% soporte secundario y 10% acento vibrante) antes de integrar los colores en tu producto.

## Luminancia relativa WCAG 2.1 y verificación automática de contraste

Una paleta estética fracasa en producción si compromete la legibilidad. Para elegir automáticamente el color de texto (`#0f172a` o `#f8fafc`), determinar si la imagen sugiere un tema claro u oscuro (umbral de luminancia `0,2`) y evaluar accesibilidad en la maqueta interactiva, el motor linealiza cada canal sRGB normalizado (`C_srgb = C / 255`): si `C_srgb ≤ 0,03928`, aplica `C_srgb / 12,92`; de lo contrario, `((C_srgb + 0,055) / 1,055)^2,4`.

Con esos valores calcula la **luminancia relativa** WCAG 2.1 (`L = 0,2126·R + 0,7152·G + 0,0722·B`) y la razón de contraste entre el tono claro (`L1`) y el oscuro (`L2`): `Contraste = (L1 + 0,05) / (L2 + 0,05)`. La norma exige **4,5:1** para texto normal (AA), **3:1** para texto grande o iconos y **7:1** para nivel AAA. Cuando la maqueta muestra una alerta de contraste bajo, ajusta la luminosidad exacta en el [Comprobador de Contraste WCAG](/es/herramientas/contrast-checker).

## Exportación a Tailwind CSS, variables CSS y escenarios de diagnóstico

El panel inferior genera dos fragmentos listos para copiar directamente en proyectos frontend sin transcripción manual:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        secondary: "#64748b",
        accent: "#e11d48",
        background: "#f1f5f9",
        text: "#0f172a",
      },
    },
  },
};
```

```css
/* globals.css */
:root {
  --color-primary: #1e3a5f;
  --color-secondary: #64748b;
  --color-accent: #e11d48;
  --color-background: #f1f5f9;
  --color-text: #0f172a;
}
```

Para expandir el tono `primary` en una escala completa de 11 niveles (`50` a `950`), lleva su código HEX al [Generador de Paleta Tailwind](/es/herramientas/tailwind-color-palette).

### Resolución de problemas frecuentes con activos reales

1. **Perfiles Display P3 o Adobe RGB**: Un Canvas 2D estándar trabaja en **sRGB** de 8 bits; fotografías de gama amplia pueden desaturarse levemente al convertirse a HEX sRGB.
2. **PNG con transparencia y halos**: Los píxeles con alfa cero se descartan para evitar negro `#000000` artificial, pero las sombras semitransparentes alrededor de iconos pueden introducir tonos `Muted` residuales; recorta el borde limpio antes de extraer.
3. **Privacidad y metadatos EXIF**: Aunque el análisis corre localmente en tu RAM sin enviar nada a servidores, si después vas a compartir la imagen con terceros, limpia su geolocalización y datos de cámara con el [Eliminador de Metadatos de Imagen](/es/herramientas/image-metadata-remover).
