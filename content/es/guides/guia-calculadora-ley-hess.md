---
title: "Calculadora de la Ley de Hess: Sumando Entalpía"
description: "Comprenda la Ley de Hess, la entalpía como función de estado y el cálculo de entalpías de reacción mediante ecuaciones termoquímicas intermedias."
category: "Math & Science"
relatedCalculator: "hess-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Por qué la Ley de Hess permite sumar entalpías de reacciones distintas?"
    answer: "La entalpía (ΔH) es una función de estado termodinámica, lo que significa que su variación depende únicamente del estado inicial (reactivos) y del estado final (productos), con independencia del camino o mecanismo intermedio. Si una secuencia de reacciones químicas suma exactamente la ecuación global objetivo, la suma algebraica de sus entalpías equivale a la entalpía neta del proceso."
  - question: "¿Qué ocurre con el signo de ΔH cuando se invierte una ecuación termoquímica?"
    answer: "Al invertir una reacción química (intercambiar reactivos y productos), el signo de ΔH se invierte por completo. Una reacción exotérmica que libera calor (ΔH negativo) se convierte en un proceso endotérmico que absorbe exactamente la misma cantidad de energía térmica (ΔH positivo) en sentido inverso."
  - question: "¿Cómo afectan los coeficientes estequiométricos al valor de la entalpía?"
    answer: "La entalpía es una propiedad extensiva directamente proporcional a la cantidad de sustancia que reacciona. Si multiplica o divide todos los coeficientes estequiométricos de una ecuación por un factor k, debe multiplicar o dividir su valor de ΔH por ese mismo factor k."
  - question: "¿Por qué es imprescindible verificar el estado físico de cada especie química?"
    answer: "Las sustancias poseen entalpías distintas según se encuentren en estado sólido (s), líquido (l), gaseoso (g) o en disolución acuosa (ac). Por ejemplo, la vaporización de un mol de agua líquida a agua gaseosa absorbe 44,0 kJ a 25 °C; por ello, solo puede cancelar especies idénticas si coinciden tanto su fórmula como su estado de agregación."
  - question: "¿Cuál es la diferencia entre usar ecuaciones intermedias y usar entalpías estándar de formación?"
    answer: "Ambos métodos son aplicaciones directas de la Ley de Hess. El método de ecuaciones intermedias combina reacciones experimentales conocidas mediante álgebra lineal, mientras que el método de entalpías de formación utiliza una ruta teórica común desde los elementos en su estado de referencia estándar (donde ΔH°_f = 0) para calcular ΔH°_reacción = Σ n·ΔH°_f(productos) − Σ m·ΔH°_f(reactivos)."
---

La **Ley de Hess**, formulada por Germain Henri Hess en 1840, establece que la variación total de entalpía (`ΔH`) de una reacción química es idéntica tanto si el proceso ocurre en una sola etapa como si transcurre mediante varias etapas intermedias. Este principio deriva del Primer Principio de la Termodinámica y del carácter de la entalpía como función de estado: el balance térmico neto depende exclusivamente de los reactivos iniciales y los productos finales.

Cuando una reacción resulta demasiado lenta, peligrosa o genera subproductos que impiden medir su calor en un calorímetro, la Ley de Hess permite calcular su entalpía sumando algebraicamente ecuaciones termoquímicas conocidas. Puede automatizar este cálculo con nuestra [Calculadora de la Ley de Hess](/es/calculadoras/calculadora-de-ley-de-hess).

## Principios termodinámicos y reglas operativas

La entalpía (`H`) mide el contenido térmico a presión constante (`ΔH = q_p`). Un valor negativo (`ΔH < 0`) indica un proceso exotérmico que libera calor; uno positivo (`ΔH > 0`), un proceso endotérmico que absorbe energía. Las mediciones estándar a `298,15 K` (`25 °C`) y `1 bar` se denotan como `ΔH°`.

Existen dos formulaciones matemáticas equivalentes según los datos disponibles:

```text
Suma de etapas intermedias:
ΔH_total = ΔH₁ + ΔH₂ + ΔH₃ + ... + ΔHₙ

Método de entalpías estándar de formación (298,15 K):
ΔH°_reacción = Σ [n × ΔH°_f(productos)] − Σ [m × ΔH°_f(reactivos)]
```

Aquí `n` y `m` son los coeficientes estequiométricos ajustados y `ΔH°_f` es la entalpía estándar de formación de un mol de compuesto desde sus elementos de referencia. Al manipular ecuaciones intermedias, aplique tres reglas invariables:

1. **Regla de inversión:** Al invertir una ecuación (intercambiar reactivos y productos), cambie el signo de `ΔH`.
2. **Regla de proporcionalidad:** Como la entalpía es extensiva, si multiplica o divide todos los coeficientes por `k`, multiplique o divida `ΔH` por ese mismo factor `k`.
3. **Cancelación por estado físico:** Dos términos opuestos solo se cancelan si coinciden exactamente en fórmula, coeficiente y estado de agregación: `(s)`, `(l)`, `(g)` o `(ac)`.

## Ejemplo práctico paso a paso: formación del monóxido de carbono

Medir directamente la oxidación parcial del carbono a monóxido de carbono (`CO`) es inviable porque siempre se produce dióxido de carbono (`CO₂`) simultáneamente. Suponga que busca `ΔH°` para la ecuación objetivo:

```text
C(s, grafito) + 1/2 O₂(g) → CO(g)    ΔH°_objetivo = ?
```

Dispone de dos reacciones de combustión completa medidas a `298,15 K`:

- **Reacción 1:** `C(s, grafito) + O₂(g) → CO₂(g)` | `ΔH°₁ = −393,5 kJ/mol`
- **Reacción 2:** `CO(g) + 1/2 O₂(g) → CO₂(g)` | `ΔH°₂ = −283,0 kJ/mol`

Resuelva siguiendo cuatro pasos:

1. **Fijar el carbono sólido:** La Reacción 1 ya presenta `1 mol` de `C(s, grafito)` en los reactivos; se mantiene intacta (`ΔH°₁ = −393,5 kJ`).
2. **Situar el monóxido de carbono en productos:** Invierta la Reacción 2 y cambie el signo de su entalpía:
   `CO₂(g) → CO(g) + 1/2 O₂(g)` | `ΔH°₂' = +283,0 kJ`.
3. **Sumar y cancelar especies repetidas:**
   `C(s, grafito) + O₂(g) + CO₂(g) → CO₂(g) + CO(g) + 1/2 O₂(g)`.
   Cancele `CO₂(g)` en ambos lados y reste `1/2 O₂(g)` a `1 O₂(g)`, obteniendo `C(s, grafito) + 1/2 O₂(g) → CO(g)`.
4. **Sumar las entalpías ajustadas:**
   `ΔH°_objetivo = −393,5 kJ + 283,0 kJ = −110,5 kJ/mol`.

La síntesis de un mol de `CO(g)` a partir de sus elementos libera `110,5 kJ`.

## Valores de referencia de entalpías estándar de formación (298,15 K)

Para aplicar la ruta de entalpías de formación, las tablas de referencia (NIST e IUPAC) recogen los valores estándar por mol de sustancia.

| Especie química | Estado físico | ΔH°_f (kJ/mol) | Uso habitual en cálculos |
| :--- | :--- | :--- | :--- |
| `C(grafito)` / `O₂` / `H₂` | Estado estándar | `0,0` | Referencia cero para elementos puros |
| `CO(g)` | Gas | `−110,5` | Gas de síntesis y combustión incompleta |
| `CO₂(g)` | Gas | `−393,5` | Combustión completa de carbono |
| `H₂O(l)` | Líquido | `−285,8` | Balances calorimétricos a temperatura ambiente |
| `H₂O(g)` | Gas | `−241,8` | Turbinas y combustión a alta temperatura |
| `CH₄(g)` | Gas | `−74,8` | Reformado con vapor y gas natural |
| `NH₃(g)` | Gas | `−45,9` | Síntesis de amoníaco (Haber-Bosch) |

## Aplicaciones, errores frecuentes y límites de precisión

La Ley de Hess sustenta los **ciclos de Born-Haber** para calcular energías reticulares de sólidos iónicos, permite hallar entalpías de transiciones lentas (como diamante a grafito, `ΔH° = −1,9 kJ/mol`) y guía balances energéticos en reactores químicos industriales.

Evite cuatro errores críticos al realizar sus cálculos:

- **Ignorar el estado físico:** Cancelar `H₂O(l)` frente a `H₂O(g)` introduce un error de `44,0 kJ/mol` a `25 °C` (entalpía de vaporización del agua).
- **Mezclar unidades:** Combinar valores en `kJ` con otros en `J` distorsiona el resultado por un factor de mil.
- **Aplicar datos de `298,15 K` a otras temperaturas:** Para reactores a alta temperatura debe corregirse `ΔH` mediante la ley de Kirchhoff integrando `ΔC_p`.
- **Propagación de errores y confusión con `ΔU`:** Al sumar muchas etapas experimentales, las incertidumbres se acumulan (`σ_total = √(Σ σᵢ²)`). Asimismo, no confunda entalpía (`ΔH`, presión constante) con energía interna (`ΔU`, volumen constante), relacionadas por `ΔH = ΔU + Δn_gas × R × T`.
