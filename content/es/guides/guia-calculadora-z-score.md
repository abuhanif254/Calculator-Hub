---
title: "Cómo Calcular e Interpretar el Z-Score (Puntuación Z)"
description: "Guía completa sobre la puntuación Z (Z-score) en estadística: fórmula poblacional y muestral, cálculo de percentiles y valor p, ejemplo paso a paso y límites de aplicación."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "z-score-calculator"
faqs:
  - question: "¿Qué diferencia existe entre un Z-score poblacional y uno muestral?"
    answer: "El Z-score poblacional utiliza la media (μ) y la desviación estándar (σ) de toda la población, parámetros exactos que suelen conocerse en pruebas estandarizadas o control industrial consolidado. Cuando solo se dispone de una muestra con media x̄ y desviación estándar muestral s, el cociente (x − x̄) / s aproxima la puntuación Z únicamente si el tamaño muestral es grande (habitualmente n ≥ 30) o si la variable sigue una distribución normal; en muestras pequeñas con σ desconocida debe emplearse la distribución t de Student."
  - question: "¿Por qué un Z-score mayor que +2 o menor que −2 suele considerarse estadísticamente atípico?"
    answer: "En una distribución normal, el 95.45 % de todas las observaciones se sitúa dentro del intervalo comprendido entre Z = −2 y Z = +2. Por lo tanto, cualquier valor fuera de ese rango pertenece al 4.55 % más extremo de la distribución (aproximadamente 2.28 % en cada cola), criterio que suele usarse como umbral inicial de detección de valores atípicos o anomalías."
  - question: "¿Puede calcularse un Z-score en datos que no siguen una distribución normal?"
    answer: "Sí, la estandarización algebraica Z = (x − μ) / σ puede aplicarse a cualquier conjunto numérico con varianza finita para centrar su media en 0 y fijar su desviación estándar en 1. Sin embargo, convertir ese Z-score en probabilidades exactas o percentiles mediante la tabla normal estándar solo es válido cuando los datos subyacentes se distribuyen normalmente."
  - question: "¿Cómo se relacionan el Z-score y el valor p en una prueba de hipótesis?"
    answer: "En un contraste bilateral con estadístico Z, el valor p equivale a la probabilidad acumulada en ambas colas externas de la distribución normal estándar más allá de |Z|, es decir, p = 2 × [1 − Φ(|Z|)]. Por ejemplo, para |Z| = 1.96 el valor p bilateral es exactamente 0.05, que coincide con el umbral clásico de significación del 5 %."
  - question: "¿Qué significa obtener un Z-score exactamente igual a cero?"
    answer: "Un Z-score de 0 indica que la observación analizada coincide exactamente con la media aritmética del conjunto (x = μ). En una distribución normal simétrica, ese punto corresponde simultáneamente a la mediana, a la moda y al percentil 50, con la mitad de los datos por debajo y la mitad por encima."
---

La **puntuación Z** (conocida también como **Z-score** o *valor tipificado*) indica cuántas desviaciones estándar se separa una observación respecto a la media de su distribución. Al transformar cualquier medida a una escala adimensional centrada en cero, permite comparar de forma rigurosa resultados obtenidos con instrumentos, baremos o unidades distintas.

Cuando los datos siguen aproximadamente una distribución normal, la [Calculadora de Z-Score](/es/calculadoras/calculadora-de-valor-z) proyecta el valor tipificado sobre la curva normal estándar `N(0, 1)` para entregar tanto la probabilidad acumulada (`valor p`) como el percentil exacto. Esta guía detalla las ecuaciones de tipificación, un ejemplo comparativo resuelto paso a paso, una tabla de umbrales críticos y las condiciones metodológicas para evitar interpretaciones erróneas.

## Fórmula del Z-score, parámetros y cálculo inverso

Tipificar una observación consiste en restar la media para centrar la distribución en cero y dividir entre la desviación estándar para normalizar su dispersión:

```text
Población conocida:   Z = (x − μ) / σ
Muestra (n grande):   Z = (x − x̄) / s
Cálculo inverso:      x = μ + (Z × σ)
```

Significado de cada parámetro:

- **`x`:** dato individual o puntuación observada.
- **`μ` (mu) o `x̄`:** media poblacional (`μ`) o muestral (`x̄`), en las mismas unidades que `x`.
- **`σ` (sigma) o `s`:** desviación estándar poblacional (`σ`) o muestral con denominador `n − 1` (`s`), siempre mayor que cero.
- **`Z`:** distancia estandarizada adimensional. Valores positivos señalan `x > μ`; valores negativos indican `x < μ`; `Z = 0` equivale a la media.

Cuando se evalúa la media de una muestra de tamaño `n` frente a una media teórica `μ₀`, el denominador se sustituye por el error estándar `σ / √n`:

```text
Z_media = (x̄ − μ₀) / (σ / √n)
```

## Ejemplo práctico paso a paso: comparación entre escalas distintas

Suponga que se comparan las calificaciones de un aspirante en dos pruebas de selección distribuidas normalmente pero con baremos incompatibles:

- **Prueba A (Aptitud cuantitativa):** `μ_A = 500`, `σ_A = 80`, resultado obtenido `x_A = 620`.
- **Prueba B (Comprensión analítica):** `μ_B = 72`, `σ_B = 9`, resultado obtenido `x_B = 88`.

Para determinar en qué prueba tuvo mejor desempeño relativo se tipifican ambos puntajes:

1. **Calcular `Z_A` y su probabilidad en la Prueba A:**
   ```text
   Z_A = (620 − 500) / 80 = 120 / 80 = +1.50
   P(Z ≤ +1.50) = 0.9332  (Percentil 93.3; cola derecha: 6.68 %)
   ```
2. **Calcular `Z_B` y su probabilidad en la Prueba B:**
   ```text
   Z_B = (88 − 72) / 9 = 16 / 9 ≈ +1.7778  (redondeado a +1.78)
   P(Z ≤ +1.7778) ≈ 0.9623  (Percentil 96.2; tabla a 2 decimales Z = +1.78 → 0.9625)
   ```
3. **Conclusión:** aunque `620` es mayor en puntos brutos, `88` en la Prueba B (`Z = +1.78`) supera ampliamente el desempeño relativo en la Prueba A (`Z = +1.50`), ubicándose dentro del `3.8 %` superior frente al `6.7 %` superior.

## Valores de referencia de la distribución normal estándar

| Valor `Z` | Probabilidad izquierda `P(Z ≤ z)` | Probabilidad derecha `P(Z > z)` | Probabilidad bilateral | Interpretación estadística |
|---|---|---|---|---|
| `−3.00` | `0.0013` (`0.13 %`) | `0.9987` (`99.87 %`) | `0.0027` (`0.27 %`) | Extremo inferior (regla `99.7 %`) |
| `−2.00` | `0.0228` (`2.28 %`) | `0.9772` (`97.72 %`) | `0.0455` (`4.55 %`) | Umbral inferior de dato atípico |
| `−1.00` | `0.1587` (`15.87 %`) | `0.8413` (`84.13 %`) | `0.3173` (`31.73 %`) | Borde inferior del `68.27 %` central |
| `0.00` | `0.5000` (`50.00 %`) | `0.5000` (`50.00 %`) | `1.0000` (`100.00 %`) | Media, mediana y percentil `50` |
| `+1.00` | `0.8413` (`84.13 %`) | `0.1587` (`15.87 %`) | `0.3173` (`31.73 %`) | Borde superior del `68.27 %` central |
| `+1.96` | `0.9750` (`97.50 %`) | `0.0250` (`2.50 %`) | `0.0500` (`5.00 %`) | Límite crítico bilateral al `95 %` |
| `+2.58` | `0.9951` (`99.51 %`) | `0.0049` (`0.49 %`) | `0.0099` (`0.99 %`) | Límite crítico bilateral al `99 %` |
| `+3.00` | `0.9987` (`99.87 %`) | `0.0013` (`0.13 %`) | `0.0027` (`0.27 %`) | Límite superior Seis Sigma (`±3σ`) |

## Aplicaciones profesionales, errores comunes y cautelas

La puntuación Z resulta indispensable en tres grandes ámbitos aplicados:

- **Control estadístico de procesos (Seis Sigma):** las cartas de control industrial vigilan que las dimensiones fabricadas permanezcan dentro de `±3σ` respecto al valor nominal; superar ese umbral activa inspecciones por deriva de maquinaria o fallo de lote.
- **Pediatría y medicina clínica:** las tablas de crecimiento infantil de la Organización Mundial de la Salud (OMS) y la densitometría mineral ósea (DEXA) emplean puntuaciones Z ajustadas por edad y sexo para detectar déficit ponderal, osteopenia u osteoporosis respecto a la población sana de referencia.
- **Ciencia de datos y aprendizaje automático:** la estandarización (`StandardScaler`) centra y escala variables predictoras en unidades heterogéneas (como ingresos en euros frente a edad en años) para estabilizar algoritmos basados en distancias, regresiones regularizadas y redes neuronales.

Para evitar conclusiones sesgadas conviene vigilar tres límites metodológicos fundamentales:

1. **No asumir normalidad en distribuciones asimétricas:** en variables con sesgo marcado como salarios, precios inmobiliarios o tiempos de espera, un `Z = +2.0` no equivale al percentil `97.7`. En esos casos conviene aplicar transformaciones logarítmicas previas o emplear un escalado robusto basado en mediana y rango intercuartílico.
2. **Emplear la distribución `t` en muestras pequeñas:** si `σ` es desconocida y se estima con `s` sobre pocos registros (`n < 30`), la distribución normal subestima las colas extremas; debe usarse la distribución `t` de Student con `n − 1` grados de libertad.
3. **Distinguir significación estadística de relevancia práctica:** en muestras muy grandes, desviaciones mínimas respecto a `μ` producen valores `Z_media` elevados y valores `p` diminutos sin que la diferencia tenga impacto operativo o clínico real.
