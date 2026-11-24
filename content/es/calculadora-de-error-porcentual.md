---
title: "Calculadora de Error Porcentual"
metaTitle: "Calculadora de Error Porcentual | Fórmula y Exactitud"
description: "Calcula el error porcentual, el error absoluto, el error relativo y la diferencia porcentual entre mediciones experimentales y valores teóricos de referencia."
metaDescription: "Calcula el error porcentual, error absoluto, error relativo y diferencia porcentual. Fórmulas científicas paso a paso, ejemplos y tabla guía."
metaKeywords: "calculadora de error porcentual, fórmula de error porcentual, error absoluto, error relativo, diferencia porcentual, exactitud y precisión, análisis de errores laboratorio"
faqs:
  - question: "¿Qué diferencia existe entre el error porcentual y la diferencia porcentual?"
    answer: "El error porcentual evalúa la exactitud de una medición experimental frente a un valor teórico o patrón certificado, usando ese valor teórico en el denominador. La diferencia porcentual compara dos valores experimentales cuando ninguno se considera la referencia exacta, dividiendo la discrepancia entre el promedio de ambos valores."
  - question: "¿Cuándo conviene conservar el signo del error porcentual en lugar de aplicar valor absoluto?"
    answer: "En física docente suele emplearse el valor absoluto para reportar la magnitud total de la inexactitud como un número positivo. Sin embargo, en calibración industrial, química analítica y control de calidad conviene conservar el signo, porque un error negativo persistente revela subestimación sistemática y uno positivo evidencia sobreestimación."
  - question: "¿Por qué no puede calcularse el error porcentual cuando el valor teórico es exactamente cero?"
    answer: "Como la fórmula divide entre el valor absoluto del valor teórico, sustituir cero produce una división matemática indefinida. Ante magnitudes centradas en cero, como 0 °C en escala Celsius, debe reportarse el error absoluto o convertir la medición a una escala absoluta del sistema métrico SI como Kelvin (273,15 K)."
  - question: "¿Qué porcentaje de error se considera aceptable en un laboratorio científico frente a la industria?"
    answer: "El umbral aceptable depende de la disciplina y la resolución instrumental. En prácticas académicas de física o química suele aceptarse hasta un 5 % de error porcentual; en química analítica cuantitativa se exige menos del 1 % al 2 %, mientras que en metrología de calibración o mecanizado aeroespacial una desviación superior al 0,1 % ya resulta inaceptable."
  - question: "¿En qué se distinguen exactamente la exactitud y la precisión en un experimento?"
    answer: "La exactitud indica cuán cerca está el resultado medido del valor verdadero o teórico aceptado, y se cuantifica directamente mediante el error porcentual. La precisión refleja cuán repetibles y agrupadas entre sí resultan varias mediciones consecutivas, incluso si todas están desplazadas respecto al valor real por un fallo de calibración."
---

En investigación científica, prácticas de laboratorio, metrología industrial y control de calidad, ninguna medición empírica coincide con precisión infinita con su valor teórico de referencia. La resolución instrumental, las condiciones ambientales y el procedimiento experimental introducen desviaciones inevitables que conviene cuantificar antes de validar resultados.

El **error porcentual** es el indicador adimensional de referencia para expresar la **exactitud** de una lectura frente a una constante física, un patrón del **sistema métrico SI** o una tolerancia de ingeniería. Nuestra **Calculadora de Error Porcentual** determina a la vez el error absoluto, el error relativo, el error porcentual (en magnitud y con signo direccional) y la diferencia porcentual.

## Ecuaciones Fundamentales del Análisis de Errores

El análisis cuantitativo parte de la desviación en unidades físicas originales y la normaliza respecto a la escala de referencia.

### 1. Error Absoluto, Relativo y Porcentual

Dada una medición experimental ($V_{\text{exp}}$) y un valor teórico aceptado ($V_{\text{teo}} \neq 0$):

$$E_{\text{abs}} = |V_{\text{exp}} - V_{\text{teo}}|, \qquad E_{\text{rel}} = \frac{|V_{\text{exp}} - V_{\text{teo}}|}{|V_{\text{teo}}|}, \qquad E_{\%} = \frac{|V_{\text{exp}} - V_{\text{teo}}|}{|V_{\text{teo}}|} \times 100\,\%$$

### 2. Error con Signo y Diferencia Porcentual

Para identificar si un sensor sobrestima o subestima de manera sistemática se conserva el signo en el numerador. Si comparas dos mediciones experimentales ($V_1$ y $V_2$) sin conocer un valor verdadero, se emplea la diferencia porcentual:

$$E_{\%}^{\text{signo}} = \frac{V_{\text{exp}} - V_{\text{teo}}}{|V_{\text{teo}}|} \times 100\,\%, \qquad D_{\%} = \frac{|V_1 - V_2|}{\frac{|V_1 + V_2|}{2}} \times 100\,\%$$

Definición de variables:

* **$V_{\text{exp}}$:** valor experimental u observado obtenido en el ensayo o en producción.
* **$V_{\text{teo}}$:** valor teórico, constante física normalizada o patrón certificado ($V_{\text{teo}} \neq 0$).
* **$E_{\text{abs}}$:** error absoluto en las mismas unidades físicas que la magnitud medida (`g`, `m/s²`, `g/cm³`).
* **$E_{\text{rel}}$:** cociente adimensional que relativiza la desviación frente al tamaño del patrón.
* **$E_{\%}$ y $E_{\%}^{\text{signo}}$:** error porcentual sin signo (magnitud) y con signo (sentido del sesgo).
* **$V_1$ y $V_2$:** dos lecturas independientes contrastadas entre sí mediante su promedio.

## Ejemplos Prácticos Resueltos Paso a Paso

### Ejemplo 1: Densidad del Aluminio por Desplazamiento de Agua

A 20 °C, la densidad teórica del aluminio puro es **2,70 g/cm³** (`2.700 kg/m³` en el sistema métrico SI). En laboratorio se pesa una probeta de **52,65 g** que desplaza **20,00 cm³** de agua, arrojando una densidad experimental de **2,6325 g/cm³** (`52,65 / 20,00`).

1. **Error absoluto:** $|2{,}6325 - 2{,}70| = \mathbf{0{,}0675\text{ g/cm}^3}$.
2. **Error relativo:** $0{,}0675 / 2{,}70 = \mathbf{0{,}0250}$.
3. **Error porcentual sin signo:** $0{,}0250 \times 100\,\% = \mathbf{2{,}50\,\%}$.
4. **Error con signo:** $(2{,}6325 - 2{,}70) / 2{,}70 \times 100\,\% = \mathbf{-2{,}50\,\%}$.

El signo negativo ofrece una pista inmediata: una densidad medida por debajo de la teórica suele indicar pequeñas burbujas de aire adheridas al metal que aumentan el volumen aparente desplazado.

### Ejemplo 2: Gravedad Local con Péndulo Simple

Si un péndulo arroja **9,58 m/s²** frente a la gravedad normalizada SI (**9,80665 m/s²**), el error absoluto vale **0,22665 m/s²**, el error relativo alcanza **0,023112** (`0,22665 / 9,80665`) y el error porcentual resulta **2,31 %** (`-2,31 %` con signo), un desempeño sólido para cronometraje manual.

## Tabla Comparativa de Métricas de Error

Con una lectura medida de **48,4 g** frente a una pesa patrón de **50,0 g** (o dos sensores que registran 48,4 g y 50,0 g), cada métrica produce:

| Métrica | Fórmula | Unidades | Denominador | Resultado | Aplicación Ideal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Error absoluto** | $\|V_{\text{exp}} - V_{\text{teo}}\|$ | Iguales a la medida | Ninguno | 1,6 g | Tolerancias físicas fijas |
| **Error relativo** | $E_{\text{abs}} / \|V_{\text{teo}}\|$ | Adimensional | Valor teórico | 0,0320 | Propagación de incertidumbre |
| **Error porcentual** | $E_{\text{rel}} \times 100\,\%$ | Porcentaje (%) | Valor teórico | 3,20 % | Exactitud frente a patrón |
| **Error con signo** | $(V_{\text{exp}} - V_{\text{teo}}) / \|V_{\text{teo}}\| \times 100\,\%$ | Porcentaje (%) | Valor teórico | -3,20 % | Diagnóstico de sesgos |
| **Diferencia porcentual** | $\|V_1 - V_2\| / (\|V_1 + V_2\| / 2) \times 100\,\%$ | Porcentaje (%) | Media de ambos | 3,25 % | Comparar dos sensores |

Como referencia orientativa, en prácticas educativas suele admitirse un error porcentual inferior al **5 %**, en química analítica cuantitativa por debajo del **1 % al 2 %**, y en calibración metrológica o mecanizado aeroespacial se exige bajar del **0,1 %**.

## Exactitud, Precisión y Origen del Error

La **exactitud** mide la cercanía al valor verdadero y se cuantifica con el **error porcentual**; la **precisión** mide la repetibilidad entre réplicas mediante la desviación estándar.

* **Errores sistemáticos:** desplazan las mediciones siempre hacia el mismo lado por descalibración de cero, fugas térmicas o impurezas químicas. Promediar repeticiones no los corrige; exigen recalibrar el equipo o revisar el método.
* **Errores aleatorios:** generan dispersiones impredecibles por vibraciones, corrientes de aire o paralaje en escalas analógicas. Se atenúan repitiendo el ensayo y promediando las lecturas.

## Errores Habituales en el Cálculo del Error Porcentual

* **Dividir por el valor experimental en vez del teórico:** invertir el denominador distorsiona la escala porcentual y vuelve inconsistentes las comparaciones entre pruebas.
* **Calcular porcentajes con un valor teórico igual a cero:** en escalas relativas como 0 °C la división queda indefinida; convierte la temperatura a escala absoluta Kelvin (`273,15 K`) o reporta únicamente el error absoluto.
* **Confundir error porcentual con diferencia porcentual:** si contrastas dos instrumentos sin un estándar certificado, utiliza la diferencia porcentual para no elegir arbitrariamente cuál va en el denominador.
* **Informar decimales injustificados:** expresar un error porcentual con seis decimales a partir de instrumentos de dos cifras significativas proyecta una precisión inexistente.
