---
title: "Valor P: ¿Son Sus Datos Estadísticamente Significativos?"
description: "Guía técnica sobre el valor p y las pruebas de hipótesis: hipótesis nula, estadísticos Z y t, pruebas de una y dos colas, errores de tipo I y II y análisis de significancia."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "p-value-calculator"
faqs:
  - question: "¿El valor p mide la probabilidad de que la hipótesis nula sea verdadera?"
    answer: "No. Esa es la confusión estadística más extendida. El valor p es una probabilidad condicional calculada suponiendo de antemano que la hipótesis nula (H₀) es cierta: indica qué tan probable sería observar un resultado igual o más extremo que el obtenido en la muestra bajo esa suposición, nunca la probabilidad de verdad de H₀ ni de H₁."
  - question: "¿Cuándo debe utilizarse una prueba de dos colas en lugar de una de una sola cola?"
    answer: "La prueba de dos colas (bilateral) es el estándar científico por defecto cuando interesa detectar desviaciones en cualquier dirección, tanto aumentos como disminuciones respecto al valor de referencia. Una prueba de una cola (unilateral) solo es legítima si se define antes de recoger los datos y si un efecto en la dirección opuesta carece de relevancia práctica o es físicamente imposible."
  - question: "¿Qué diferencia práctica hay entre usar el estadístico Z y el estadístico t de Student?"
    answer: "El estadístico Z se emplea cuando se conoce la desviación estándar poblacional (σ) o cuando el tamaño muestral es suficientemente grande en pruebas de proporciones. El estadístico t de Student se utiliza cuando σ es desconocida y debe estimarse a partir de la desviación estándar muestral (s), incorporando colas más anchas según los grados de libertad (gl = n − 1)."
  - question: "¿Por qué un valor p muy pequeño no garantiza importancia clínica o práctica?"
    answer: "Porque el valor p depende directamente del tamaño de la muestra (n). Con miles de observaciones, una diferencia minúscula e irrelevante en la práctica (por ejemplo, una reducción de 0.2 mmHg en presión arterial) puede arrojar p < 0.001. Por ello, la significancia estadística debe acompañarse siempre del tamaño del efecto y su intervalo de confianza."
  - question: "¿Qué ocurre con la tasa de falsos positivos si se realizan múltiples pruebas con α = 0.05?"
    answer: "Si se ejecutan k pruebas independientes bajo hipótesis nulas verdaderas usando α = 0.05 en cada una, la probabilidad acumulada de obtener al menos un falso positivo asciende a 1 − (1 − 0.05)^k. Con 20 comparaciones simultáneas, esa probabilidad alcanza el 64.15 %, lo que exige ajustes como la corrección de Bonferroni (α / k) o el control de la tasa de falsos descubrimientos."
---

El **valor p** es la probabilidad de observar un estadístico de prueba igual o más extremo que el calculado en una muestra, asumiendo que la hipótesis nula (`H₀`) es verdadera. Actúa como un indicador de compatibilidad entre los datos y el modelo nulo: cuanto menor es el valor p, más incompatible resulta la muestra con la ausencia de efecto.

Para decidir formalmente en una prueba de hipótesis, el valor p se compara con un nivel de significancia `α` fijado antes del estudio (normalmente `0.05` o `0.01`). Si `p ≤ α`, se rechaza `H₀` por significancia estadística; si `p > α`, no existe evidencia suficiente para descartarla. Calcule probabilidades exactas para puntuaciones Z, t, chi-cuadrado o F en nuestra [Calculadora de Valor P](/es/calculadoras/calculadora-de-valor-p).

## Marco teórico: hipótesis nula, estadísticos y colas de prueba

Toda prueba estadística contrasta dos proposiciones excluyentes sobre un parámetro poblacional:

- **Hipótesis nula (`H₀`):** Postula ausencia de diferencia o efecto (`μ = μ₀`).
- **Hipótesis alternativa (`H₁`):** Postula un efecto real, bilateral (`μ ≠ μ₀`) o unilateral (`μ > μ₀` o `μ < μ₀`).

Para expresar la distancia entre la media muestral `x̄` y `μ₀` en unidades de error estándar se calcula un estadístico de prueba. Con desviación poblacional `σ` conocida se emplea el **estadístico Z**; cuando `σ` se estima mediante la desviación muestral `s`, se utiliza el **estadístico t** con `gl = n − 1` grados de libertad:

```text
Z = (x̄ − μ₀) / (σ / √n)
t = (x̄ − μ₀) / (s / √n)
```

La forma de `H₁` define las colas de la distribución incluidas en el valor p. En una prueba **bilateral (dos colas)** se suman ambos extremos: `p = 2 × P(Z ≥ |z_obs|)`. En una **unilateral derecha** solo se evalúa `p = P(Z ≥ z_obs)`, y en una **unilateral izquierda** se integra `p = P(Z ≤ z_obs)`.

Al decidir con base en `α`, se equilibran dos riesgos: el **error de tipo I (`α`)**, que rechaza una `H₀` cierta (falso positivo), y el **error de tipo II (`β`)**, que falla en rechazar una `H₀` falsa (falso negativo), siendo `1 − β` la potencia estadística.

## Cálculo paso a paso en un ensayo clínico controlado

Suponga un protocolo clínico que evalúa si un tratamiento altera la reducción media de presión arterial sistólica frente a un valor basal `μ₀ = 5.0 mmHg`, con desviación poblacional conocida `σ = 6.0 mmHg`. En una muestra de `n = 36` pacientes se observa una reducción media `x̄ = 7.4 mmHg`.

1. **Error estándar (`EE`):** Se divide `σ` entre la raíz del tamaño muestral: `EE = 6.0 / √36 = 6.0 / 6 = 1.0 mmHg`.
2. **Estadístico Z:** Se calcula la desviación estandarizada respecto a `H₀`: `Z = (7.4 − 5.0) / 1.0 = 2.40`.
3. **Valor p bilateral (`H₁: μ ≠ 5.0`):** En la distribución normal estándar, `P(Z ≥ 2.40) ≈ 0.0082`. Al ser una prueba de dos colas, se duplica el área: `p = 2 × 0.0082 = 0.0164` (`1.64 %`).
4. **Decisión según `α`:** Con `α = 0.05`, dado que `0.0164 < 0.05`, se rechaza `H₀`. Con un criterio estricto `α = 0.01`, `0.0164 > 0.01` impediría rechazar `H₀`. Esto demuestra por qué `α` y la direccionalidad deben preespecificarse antes de observar los datos.

## Escala de interpretación del valor p y puntos críticos de referencia

Más allá de la regla binaria `p ≤ α`, esta escala resume la fuerza de evidencia frente a `H₀`:

| Rango de valor p | `|Z|` crítico (dos colas) | Decisión (`α = 0.05`) | Evidencia contra `H₀` | Contexto de aplicación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `p > 0.10` | `< 1.645` | No rechazar `H₀` | Compatible con el azar | Resultados coherentes con `H₀` |
| `0.05 ≤ p ≤ 0.10` | `1.645` a `1.960` | No rechazar `H₀` | Marginal o débil | Estudios piloto exploratorios |
| `0.01 ≤ p < 0.05` | `1.960` a `2.576` | Rechazar `H₀` | Moderada | Estándar clínico y ciencias sociales |
| `0.001 ≤ p < 0.01` | `2.576` a `3.291` | Rechazar `H₀` | Sólida | Ensayos confirmatorios e industria |
| `p < 0.001` | `> 3.291` | Rechazar `H₀` | Muy fuerte | Bioestadística de alta exigencia |
| `p < 5 × 10⁻⁸` | `> 5.451` | Rechazar `H₀` | Extrema | Genómica y estudios GWAS |

## Errores de interpretación, sesgos analíticos y rigor metodológico

La Asociación Estadística Estadounidense (ASA) enfatiza que el umbral `p < 0.05` nunca sustituye al criterio científico ni al diseño experimental riguroso. Para evitar conclusiones espurias, vigile cuatro riesgos metodológicos críticos:

- **Confundir significancia estadística con relevancia práctica:** Con muestras muy numerosas, diferencias mínimas e irrelevantes desde el punto de vista clínico o económico arrojan `p < 0.001`. Informe siempre la magnitud del efecto (como la `d` de Cohen) y el intervalo de confianza del 95 %.
- **Manipulación del valor p (*p-hacking*):** Recoger observaciones adicionales hasta cruzar `0.05`, excluir valores atípicos *a posteriori* o cambiar de una prueba bilateral a una unilateral tras inspeccionar el signo de `Z` destruye la validez de la tasa nominal `α`.
- **Equiparar `p > 0.05` con prueba de nulidad:** Un valor p elevado en una muestra pequeña suele reflejar baja potencia estadística (`1 − β` insuficiente para detectar efectos reales), no equivalencia exacta entre grupos.
- **Ignorar comparaciones múltiples:** Evaluar decenas de variables simultáneamente sin corregir el nivel de significancia (por ejemplo, mediante la corrección de Bonferroni `α_adj = α / k` o el control de falsos descubrimientos) multiplica la tasa global de falsos positivos.
