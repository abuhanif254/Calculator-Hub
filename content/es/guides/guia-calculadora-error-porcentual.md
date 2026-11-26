---
title: "Cómo Calcular el Error Porcentual: Fórmula, Pasos y Ejemplos"
description: "Aprenda a calcular el error absoluto, relativo y porcentual en laboratorio e ingeniería, interpretar su signo y evitar fallos de redondeo y referencia."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "percent-error-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Cuál es la diferencia entre error porcentual y diferencia porcentual?"
    answer: "El error porcentual compara una medición experimental contra un valor teórico o certificado conocido, dividiendo por ese valor verdadero. La diferencia porcentual se aplica cuando se comparan dos lecturas experimentales independientes sin conocer cuál es la exacta, utilizando el promedio de ambas como denominador."
  - question: "¿Por qué la fórmula estándar utiliza barras de valor absoluto?"
    answer: "Las barras de valor absoluto | | garantizan que el error porcentual sea siempre positivo o cero, centrándose exclusivamente en la magnitud de la desviación respecto al valor real. Cuando en calibración interesa saber si el instrumento sobreestima o subestima sistemáticamente, se omiten las barras para evaluar el sesgo con signo."
  - question: "¿Qué se considera un error porcentual aceptable en ciencia e ingeniería?"
    answer: "No existe un umbral único. En química analítica cuantitativa suele exigirse menos del 0,5 % al 1 %, en prácticas docentes de física se admite hasta el 5 %, mientras que en metrología industrial CNC las tolerancias caen por debajo del 0,1 % y en muestreo ambiental de campo pueden aceptarse márgenes del 5 % al 15 %."
  - question: "¿Cómo se calcula el error porcentual si el valor teórico es exactamente cero?"
    answer: "La fórmula clásica queda matemáticamente indefinida porque implica dividir por cero. En mediciones sobre muestras blanco o temperaturas de 0 °C, debe reportarse el error absoluto en sus unidades físicas, trabajar en escala absoluta (kelvin) o expresar la desviación respecto al fondo de escala del instrumento."
  - question: "¿Un error porcentual bajo garantiza que el experimento tenga alta precisión?"
    answer: "Un error porcentual bajo demuestra alta exactitud para esa medición concreta, es decir, cercanía al valor de referencia. Sin embargo, la precisión evalúa la repetibilidad y dispersión entre múltiples réplicas; un resultado aislado puede acercarse al valor real por azar mientras presenta una desviación estándar elevada."
---

El error porcentual cuantifica la discrepancia relativa entre un valor medido experimentalmente y el valor teórico o de referencia aceptado, expresada sobre una base de 100. Constituye el indicador estándar en física, química analítica e ingeniería para validar la exactitud de un instrumento, evaluar un procedimiento experimental y detectar fallos sistemáticos de calibración.

Su cálculo exige dividir el error absoluto (la distancia sin signo entre la medición y el valor real) entre el valor teórico, multiplicando después por 100 %. Para procesar series de lecturas repetidas sin errores aritméticos, puede utilizar nuestra [Calculadora de Error Porcentual](/es/calculadoras/calculadora-de-error-porcentual).

## Definiciones y fórmulas fundamentales

En metrología y estadística experimental se distinguen cuatro métricas según si interesa únicamente la magnitud de la desviación o también su sentido:

- **Valor Experimental (``V_exp``):** Magnitud obtenida mediante observación directa, ensayo de laboratorio o estimación numérica.
- **Valor Teórico o Aceptado (``V_teo``):** Valor de referencia certificado, constante física estándar o predicción analítica exacta (con ``V_teo ≠ 0``).

A partir de ambos parámetros se definen las ecuaciones operativas:

- **Error absoluto:** Mide la diferencia en las mismas unidades físicas que la variable estudiada.
  ``E_abs = |V_exp − V_teo|``
- **Error relativo:** Expresa la desviación como una fracción adimensional del valor de referencia.
  ``E_rel = |V_exp − V_teo| / |V_teo|``
- **Error porcentual:** Convierte el error relativo en porcentaje mediante barras de valor absoluto ``| |``, produciendo un resultado no negativo.
  ``Error (%) = (|V_exp − V_teo| / |V_teo|) × 100 %``
- **Error porcentual con signo (sesgo relativo):** Prescinde del valor absoluto para señalar si la medición sobreestima (positivo) o subestima (negativo) el valor real.
  ``Sesgo (%) = [(V_exp − V_teo) / V_teo] × 100 %``

### Error porcentual frente a diferencia porcentual

No confunda el error porcentual con la **diferencia porcentual**. El primero exige conocer un valor de referencia verdadero que actúa como denominador. Cuando se comparan dos mediciones independientes ``A`` y ``B`` sin saber cuál es más exacta (por ejemplo, dos sensores midiendo una misma corriente), se divide por el promedio de ambas:

``Diferencia (%) = [|A − B| / ((A + B) / 2)] × 100 %``

## Ejemplo práctico resuelto en laboratorio

Considere una determinación gravimétrica de densidad para una probeta de aluminio puro a 20 °C. El valor teórico aceptado en tablas de referencia es ``V_teo = 2,70 g/cm³``.

Un técnico registra una masa de ``13,15 g`` en balanza analítica y mide un volumen desplazado de ``5,00 cm³`` en probeta graduada.

1. **Cálculo del valor experimental:**
   ``V_exp = 13,15 g / 5,00 cm³ = 2,63 g/cm³``
2. **Cálculo del error absoluto:**
   ``E_abs = |2,63 − 2,70| = |−0,07| = 0,07 g/cm³``
3. **Cálculo del error relativo:**
   ``E_rel = 0,07 / 2,70 ≈ 0,025926``
4. **Conversión a error porcentual:**
   ``Error (%) = 0,025926 × 100 % ≈ 2,59 %``
5. **Análisis direccional del sesgo:**
   Conservando el signo, ``(2,63 − 2,70) / 2,70 × 100 % = −2,59 %``. El signo negativo indica que el resultado experimental subestima el valor teórico, orientando la inspección hacia causas físicas compatibles, como burbujas de aire adheridas que aumentaron el volumen desplazado o impurezas ligeras.

## Umbrales de tolerancia e interpretación por disciplina

Un mismo porcentaje de desviación puede ser excelente en un campo e inaceptable en otro. La tabla siguiente resume los criterios habituales de aceptación:

| Área técnica o científica | Umbral típico aceptado | Interpretación de un error de 2,5 % | Causa habitual de desviación | Acción correctiva recomendada |
| --- | --- | --- | --- | --- |
| Metrología industrial (CNC) | < 0,05 % – 0,10 % | Fuera de tolerancia crítica | Desgaste de herramienta o dilatación térmica | Recalibrar ejes y compensar temperatura |
| Química analítica cuantitativa | < 0,50 % – 1,00 % | Excesivo para titulación estándar | Lectura de menisco o reactivo impuro | Estandarizar titulante y repetir alícuota |
| Laboratorio docente de física | < 5,00 % | Resultado satisfactorio y válido | Fricción residual o resolución del instrumento | Documentar fuentes de error sistemático |
| Monitoreo ambiental y campo | 5,00 % – 15,00 % | Alta precisión para muestreo abierto | Variabilidad espacial o interferencia matriz | Aumentar réplicas y usar blancos de campo |
| Predicción de demanda o costos | 5,00 % – 10,00 % | Desviación mínima y modelo sólido | Estacionalidad no modelada o choque externo | Ajustar ponderación histórica |
| Estimación preliminar de obra | 15,00 % – 25,00 % | Dentro de banda inicial esperada | Fluctuación de insumos o alcance abierto | Refinar ingeniería de detalle |

## Errores metodológicos frecuentes y limitaciones de la métrica

El error más grave al aplicar la fórmula consiste en dividir entre el valor experimental en lugar del valor teórico. Si ``V_teo = 100`` y ``V_exp = 50``, dividir entre ``V_teo`` arroja un ``50 %`` de error, mientras que dividir entre ``V_exp`` produciría un ``100 %`` incorrecto.

Asimismo, la ecuación falla cuando ``V_teo = 0``, como ocurre en muestras blanco o mediciones en grados Celsius en el punto de congelación del agua. Al quedar indefinida la división por cero, debe reportarse el error absoluto, utilizar escalas absolutas (kelvin) o calcular el error relativo al fondo de escala del instrumento.

Respecto a las cifras significativas, nunca redondee valores intermedios antes de multiplicar por 100 %. En el ejemplo del aluminio, truncar ``0,025926`` a ``0,026`` reportaría ``2,60 %`` en vez de ``2,59 %``. Por último, recuerde que el error porcentual evalúa **exactitud** (cercanía al valor verdadero), no **precisión** (repetibilidad entre lecturas).
