---
title: "Calculadora de Altura"
metaTitle: "Calculadora de Altura | Convierte cm a pies y pulgadas"
description: "Convierte tu estatura entre centímetros, metros, pies y pulgadas al instante, calcula la talla diana genética infantil y consulta tablas de equivalencia."
metaDescription: "Calculadora de altura gratuita: convierte cm a pies y pulgadas al instante, predice la estatura adulta infantil y consulta tablas de crecimiento."
metaKeywords: "calculadora de altura, de pies a cm, conversor de altura, comparacion de altura, predictor de altura infantil, talla diana genetica"
faqs:
  - question: "¿Cómo convierto mi estatura de centímetros a pies y pulgadas sin cometer errores con los decimales?"
    answer: "Primero divide tu estatura en centímetros entre 2,54 para obtener el total de pulgadas. Luego divide ese valor entre 12: la parte entera corresponde a los pies, y para obtener las pulgadas restantes debes multiplicar únicamente la fracción decimal por 12 (o restar los pies multiplicados por 12 al total de pulgadas). Nunca interpretes el decimal de los pies directamente como pulgadas, ya que el sistema imperial es duodecimal (base 12) y no decimal."
  - question: "¿Por qué existe una diferencia de 13 centímetros entre niños y niñas en la fórmula de talla diana?"
    answer: "El ajuste de 13 centímetros (aproximadamente 5 pulgadas) en la ecuación de Tanner compensa el dimorfismo sexual promedio en la estatura humana adulta. Los varones suelen experimentar un inicio puberal unos dos años más tardío que las mujeres, lo que les otorga mayor tiempo de crecimiento prepuberal y un pico de velocidad de crecimiento ligeramente superior antes del cierre de los cartílagos epifisarios."
  - question: "¿A qué hora del día es más preciso medir la estatura corporal?"
    answer: "La medición antropométrica clínica debe realizarse preferiblemente por la mañana, durante la primera hora tras levantarse. A lo largo del día, la gravedad comprime el núcleo pulposo gelatinoso de los discos intervertebrales de la columna, provocando una pérdida transitoria de entre 1,0 y 2,0 centímetros que se recupera tras el descanso nocturno en posición horizontal."
  - question: "¿Qué margen de variación tiene la predicción de altura infantil basada en la estatura de los padres?"
    answer: "La talla diana genética ofrece el percentil central esperado para el niño, pero en pediatría se aplica un intervalo fisiológico de más o menos 8,5 centímetros (equivalente a dos desviaciones estándar) para los varones y más o menos 7,5 a 8,5 centímetros para las mujeres. Factores como la edad ósea, la nutrición, el descanso nocturno y la genética poligénica determinan en qué punto de ese rango se ubicará la talla definitiva."
  - question: "¿A cuántos centímetros equivalen exactamente 5 pies y 9 pulgadas?"
    answer: "Una estatura de 5 pies y 9 pulgadas equivale exactamente a 175,26 centímetros (o 1,75 metros). Se obtiene al convertir los 5 pies en 60 pulgadas (5 por 12), sumar las 9 pulgadas adicionales para un total de 69 pulgadas y multiplicar dicho valor por el factor internacional exacto de 2,54 centímetros por pulgada."
---

La medición precisa de la estatura humana y su conversión entre el Sistema Internacional de Unidades (metros y centímetros) y el sistema anglosajón (pies y pulgadas) son fundamentales en evaluaciones clínicas, ergonomía deportiva, trámites migratorios y seguimiento pediátrico. Mientras que la medicina global y los países hispanohablantes registran la talla corporal en centímetros o metros, la documentación oficial en Estados Unidos, Canadá o el Reino Unido la expresa en pies y pulgadas.

Esta guía detalla las ecuaciones exactas de conversión antropométrica, el método clínico de estimación de la talla adulta en niños y adolescentes, ejemplos resueltos paso a paso y los protocolos para evitar errores posturales.

## Fórmulas de Conversión Antropométrica y Predicción de Talla Diana

Toda conversión entre unidades métricas e imperiales de longitud se fundamenta en el acuerdo internacional de 1959, que define la pulgada exacta como $25,4\text{ milímetros}$ ($2,54\text{ cm}$) y el pie como $12\text{ pulgadas}$ ($30,48\text{ cm}$).

### 1. Conversión entre Centímetros, Pies y Pulgadas

Para transformar una estatura expresada en pies ($ft$) y pulgadas ($in$) a centímetros ($H_{\text{cm}}$), se reduce primero la medida completa a pulgadas totales ($P_{\text{total}}$):

$$P_{\text{total}} = (12 \times ft) + in, \qquad H_{\text{cm}} = P_{\text{total}} \times 2,54$$

En sentido inverso, para convertir centímetros ($H_{\text{cm}}$) al formato compuesto de pies y pulgadas:

$$P_{\text{total}} = \frac{H_{\text{cm}}}{2,54}, \qquad ft = \lfloor \frac{P_{\text{total}}}{12} \rfloor, \qquad in = P_{\text{total}} - (12 \times ft)$$

Donde:
* $H_{\text{cm}}$: estatura corporal expresada en centímetros ($\text{cm}$).
* $P_{\text{total}}$: longitud total acumulada en pulgadas ($\text{in}$).
* $ft$: número entero de pies obtenidos mediante la función piso $\lfloor \cdot \rfloor$.
* $in$: pulgadas remanentes tras descontar los pies completos.

### 2. Ecuación de Tanner para la Talla Diana Genética

En endocrinología pediátrica, el potencial genético de crecimiento de un niño o niña se proyecta mediante la fórmula de Tanner, que ajusta la media de la estatura de ambos progenitores según el dimorfismo sexual promedio ($13\text{ cm}$):

$$\text{Talla Diana (Varones)} = \frac{H_{\text{padre}} + H_{\text{madre}} + 13}{2}, \qquad \text{Talla Diana (Mujeres)} = \frac{H_{\text{padre}} + H_{\text{madre}} - 13}{2}$$

Donde:
* $H_{\text{padre}}$ y $H_{\text{madre}}$: estaturas adultas verificadas del padre y de la madre en centímetros ($\text{cm}$).
* $13$: constante empírica en centímetros que refleja la diferencia media de estatura adulta entre ambos sexos.
* **Intervalo de confianza clínico**: el rango genético esperado abarca $\pm 8,5\text{ cm}$ respecto al valor central calculado (percentiles 3 a 97 del canal familiar). En mayores de 4 años, este cálculo se complementa con el **método de Khamis-Roche**, que pondera la talla actual del menor, su masa corporal y la estatura parental media sin requerir radiografía de edad ósea.

## Ejemplos Prácticos Paso a Paso

### Ejemplo 1: Conversión de 182 cm a Pies y Pulgadas

Un deportista mide $182\text{ cm}$ y necesita registrar su estatura en formato de pies y pulgadas:

1. **Pulgadas totales**: $P_{\text{total}} = 182 / 2,54 = 71,6535\text{ pulgadas}$.
2. **Pies completos**: $ft = \lfloor 71,6535 / 12 \rfloor = \lfloor 5,9711 \rfloor = 5\text{ pies}$.
3. **Pulgadas restantes**: $in = 71,6535 - (12 \times 5) = 71,6535 - 60 = 11,6535\text{ pulgadas}$.
4. **Resultado práctico**: equivale a **$5\text{ pies y } 11,65\text{ pulgadas}$** ($5'\,11,5''$, muy cerca de los $6'\,0''$ o $182,88\text{ cm}$).

### Ejemplo 2: Estimación de la Talla Adulta Infantil

Un padre que mide $179\text{ cm}$ y una madre que mide $163\text{ cm}$ desean estimar el canal genético de estatura para su hijo varón y su hija:

1. **Suma parental**: $179\text{ cm} + 163\text{ cm} = 342\text{ cm}$.
2. **Hijo varón**: $\text{Talla Diana} = (342 + 13) / 2 = 177,5\text{ cm}$. Con el margen de $\pm 8,5\text{ cm}$, su potencial adulto se sitúa entre **$169,0\text{ cm}$ y $186,0\text{ cm}$**.
3. **Hija**: $\text{Talla Diana} = (342 - 13) / 2 = 164,5\text{ cm}$. Con el intervalo de $\pm 8,5\text{ cm}$, su rango adulto esperado abarca desde **$156,0\text{ cm}$ hasta $173,0\text{ cm}$**.

## Tabla de Referencia Rápida: Equivalencias de Estatura

La siguiente tabla muestra la correspondencia exacta entre el sistema imperial y el métrico junto con referencias demográficas en España y América Latina:

| Pies y Pulgadas | Pulgadas | Centímetros | Metros | Referencia Antropométrica |
| :--- | :--- | :--- | :--- | :--- |
| $5'\,0''$ | $60\text{ in}$ | $152,40\text{ cm}$ | $1,52\text{ m}$ | Talla baja femenina / percentil 10 regional |
| $5'\,3''$ | $63\text{ in}$ | $160,02\text{ cm}$ | $1,60\text{ m}$ | Media global femenina aproximada |
| $5'\,4''$ | $64\text{ in}$ | $162,56\text{ cm}$ | $1,63\text{ m}$ | Promedio femenino en España y Cono Sur |
| $5'\,7''$ | $67\text{ in}$ | $170,18\text{ cm}$ | $1,70\text{ m}$ | Promedio masculino en México, Colombia y Perú |
| $5'\,9''$ | $69\text{ in}$ | $175,26\text{ cm}$ | $1,75\text{ m}$ | Promedio masculino en España, Argentina y Uruguay |
| $5'\,11''$ | $71\text{ in}$ | $180,34\text{ cm}$ | $1,80\text{ m}$ | Umbral métrico de $1,80\text{ m}$ |
| $6'\,0''$ | $72\text{ in}$ | $182,88\text{ cm}$ | $1,83\text{ m}$ | Estándar anglosajón de seis pies exactos |
| $6'\,2''$ | $74\text{ in}$ | $187,96\text{ cm}$ | $1,88\text{ m}$ | Percentil $>95$ masculino hispanohablante |

## Factores Biológicos y Errores Frecuentes en la Medición

* **La trampa de los pies decimales frente a las pulgadas**: un error frecuente consiste en dividir centímetros entre $30,48$ y leer los decimales como pulgadas. Por ejemplo, $175\text{ cm} / 30,48 = 5,74\text{ pies}$. Quien interpreta esto como «$5\text{ pies y } 7\text{ pulgadas}$» pierde casi dos pulgadas ($5\text{ cm}$), pues $0,74 \times 12 = 8,88\text{ pulgadas}$ ($5'\,9''$).
* **Alineación en el plano de Frankfort**: para que la medición con estadiómetro sea reproducible, el sujeto debe permanecer descalzo con talones, glúteos, escápulas y occipucio en contacto vertical, orientando la cabeza de modo que el borde inferior de la órbita ocular quede al mismo nivel horizontal que el conducto auditivo externo.
* **Compresión intervertebral diurna**: los discos vertebrales pierden hidratación bajo la gravedad durante la jornada, generando una reducción real de $1,2\text{ a } 2,0\text{ cm}$ entre la mañana y la noche.
* **Edad ósea frente a edad cronológica**: un adolescente cuya talla actual parece alejarse de la talla diana parental puede presentar simplemente una maduración constitucional tardía, verificable mediante radiografía de carpo izquierdo antes del cierre epifisario.
