---
title: "Cómo Funciona la Calculadora de Vida Media (Decaimiento Radiactivo)"
description: "Una guía completa sobre la vida media radiactiva: la fórmula de desintegración exponencial, cómo encontrar la cantidad restante, y ejemplos."
category: "Math & Science"
readingTime: 6
lastUpdated: "2026-06-11"
relatedCalculator: "half-life-calculator"
---

## ¿Qué es la Vida Media?

La **vida media** (símbolo: t½) es el tiempo necesario para que exactamente la mitad de una cantidad de una sustancia radiactiva experimente una desintegración nuclear. Es una propiedad característica de cada isótopo radiactivo, constante e independiente de la temperatura, la presión o el estado químico.

Después de una vida media, queda el 50%. Después de dos vidas medias, queda el 25%. Después de tres, el 12.5%, y así sucesivamente. Esto es una **desintegración exponencial**.

## Las Fórmulas

### Fórmula Principal de Desintegración Exponencial
$$
N(t) = N_0 \times \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}
$$
Donde:
- **N(t)** = cantidad restante en el tiempo *t*
- **N₀** = cantidad inicial
- **t** = tiempo transcurrido
- **t½** = vida media del isótopo

### Forma Alternativa (Constante de Desintegración)
La constante de desintegración **λ (lambda)** representa la probabilidad por unidad de tiempo de que un átomo se desintegre.
$$
\lambda = \frac{\ln(2)}{t_{1/2}} \approx \frac{0.6931}{t_{1/2}}
$$
$$
N(t) = N_0 \times e^{-\lambda t}
$$

## Guía Paso a Paso

### Paso 1 — Identifique el Isótopo y su Vida Media
Busque la vida media de su isótopo. Asegúrese de que las unidades de tiempo sean consistentes.

### Paso 2 — Determine lo que Sabe
Identifique qué tres de las cuatro variables (N₀, N(t), t, t½) tiene.

### Paso 3 — Seleccione el Modo
En la Calculadora de Vida Media, seleccione lo que desea encontrar.

### Paso 4 — Ingrese sus Valores
La calculadora acepta cualquier unidad de tiempo (segundos, horas, años).

## Tabla de Referencia — Isótopos Comunes

| Isótopo | Símbolo | Vida Media | Uso Principal |
|---|---|---|---|
| Carbono-14 | ¹⁴C | 5,730 años | Datación arqueológica (radiocarbono) |
| Uranio-238 | ²³⁸U | 4.47 mil millones | Datación geológica |
| Yodo-131 | ¹³¹I | 8.02 días | Tratamiento del cáncer de tiroides |
| Tecnecio-99m | ⁹⁹ᵐTc | 6.0 horas | Imagenología médica (SPECT) |

## Preguntas Frecuentes

**P: ¿Cambia la vida media con la temperatura o el entorno químico?**
R: No. La desintegración nuclear es una propiedad del núcleo y no se ve afectada por los enlaces químicos, la temperatura o la presión.

**P: ¿Por qué se usa la "vida media" en lugar del "tiempo de desintegración total"?**
R: Porque las sustancias radiactivas nunca llegan a cero, la desintegración es asintótica. La vida media es una constante predecible.
