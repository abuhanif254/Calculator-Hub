---
title: "Guía de la Calculadora de Triángulos: Lados, Ángulos y Área"
description: "Referencia geométrica completa para clasificar triángulos, calcular su área mediante Herón o trigonometría, hallar radios inscrito y circunscrito y resolver el caso ambiguo LLA."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "triangle-calculator"
faqs:
  - question: "¿Qué es exactamente el caso ambiguo LLA y por qué genera dos triángulos distintos?"
    answer: "Ocurre cuando se conocen dos lados (a y b) y el ángulo agudo A opuesto al lado menor (a < b). Al proyectar el lado a desde el extremo del lado b hacia la base, si la longitud a supera la altura perpendicular h = b × sin(A) pero sigue siendo menor que b, el arco de radio a corta la recta base en dos puntos posibles: uno genera un triángulo con ángulo B agudo y otro con ángulo B obtuso suplementario."
  - question: "¿Cuándo conviene usar la fórmula de Herón en lugar de la fórmula clásica de base por altura?"
    answer: "La fórmula de Herón es ideal cuando se conocen únicamente las longitudes de los tres lados (configuración LLL) y no se dispone de la altura perpendicular ni de ningún ángulo. Evita tener que calcular un ángulo intermedio mediante la ley de los cosenos antes de obtener el área, manteniendo el cálculo en operaciones puramente algebraicas."
  - question: "¿Cómo se determinan el radio inscrito (inradio) y el radio circunscrito (circunradio) de un triángulo?"
    answer: "Una vez obtenidos los tres lados y el área, el radio de la circunferencia inscrita (tangente a los tres lados) es r = Área / s, donde s es el semiperímetro. El radio de la circunferencia circunscrita (que pasa por los tres vértices) se calcula como R = (a × b × c) / (4 × Área)."
  - question: "¿Por qué tres ángulos conocidos (AAA) no permiten calcular la longitud de los lados?"
    answer: "Tres ángulos cuya suma sea 180° fijan de manera única la forma geométrica del triángulo, pero no su escala. Cualquier ampliación o reducción proporcional conserva idénticos los tres ángulos, por lo que existen infinitos triángulos semejantes y resulta imprescindible conocer al menos un lado para fijar las dimensiones absolutas."
  - question: "¿Puede un triángulo ser a la vez rectángulo y equilátero, o isósceles y obtusángulo?"
    answer: "Un triángulo rectángulo nunca puede ser equilátero porque todo triángulo equilátero tiene tres ángulos iguales de 60°, mientras que el rectángulo exige un ángulo de 90°. En cambio, sí existen triángulos isósceles obtusángulos (por ejemplo, ángulos de 120°, 30° y 30°) e isósceles rectángulos (90°, 45° y 45°)."
---

Todo triángulo plano queda definido por tres lados (`a`, `b`, `c`) y tres ángulos interiores (`A`, `B`, `C`) sujetos a restricciones estrictas: la suma angular equivale a `180°`, cada lado es menor que la suma de los otros dos (`a + b > c`) y a cada lado mayor le corresponde un ángulo opuesto mayor.

Esta referencia complementa la [Calculadora de Triángulos](/es/calculadoras/calculadora-de-triangulos) reuniendo la clasificación geométrica, las tres fórmulas de área, el cálculo de radios inscrito y circunscrito, una matriz de decisión según datos conocidos y la resolución completa del **caso ambiguo (`LLA`)**, principal fuente de errores en geometría aplicada.

## Clasificación geométrica y propiedades métricas

Los triángulos se clasifican simultáneamente por lados y por ángulos:

- **Por sus lados:** **equilátero** (tres lados iguales y ángulos de `60°`), **isósceles** (al menos dos lados y dos ángulos iguales) y **escaleno** (tres lados y tres ángulos distintos).
- **Por sus ángulos:** **acutángulo** (todos los ángulos `< 90°`), **rectángulo** (un ángulo de `90°`) y **obtusángulo** (un ángulo `> 90°`).

### Fórmulas del área, inradio y circunradio

Según los parámetros disponibles, el área se calcula mediante tres expresiones equivalentes:

```text
Base y altura:     Área = (b × h) / 2
Trigonométrica:    Área = (1 / 2) × a × b × sin(C)
Fórmula de Herón:  s = (a + b + c) / 2
                   Área = √[s × (s − a) × (s − b) × (s − c)]
```

Con los tres lados, el semiperímetro `s` y el `Área`, se obtienen las alturas (`h_a = 2 × Área / a`), el **radio inscrito** (`r`) de la circunferencia tangente interior y el **radio circunscrito** (`R`) que pasa por los tres vértices:

```text
r = Área / s
R = (a × b × c) / (4 × Área)
```

En todo triángulo plano no degenerado se verifica la desigualdad de Euler `R ≥ 2 × r`, alcanzándose la igualdad exacta solo en el triángulo equilátero.

## Ejemplo resuelto paso a paso: el caso ambiguo (LLA)

Cuando se conocen dos lados `a` y `b` junto con el ángulo `A` opuesto a `a`, la existencia de soluciones depende de la altura crítica `h = b × sin(A)`. Considere `a = 14 cm`, `b = 18 cm` y `A = 35°`.

1. **Evaluar la altura crítica `h`:**
   ```text
   h = 18 × sin(35°) = 18 × 0.573576 ≈ 10.32 cm
   ```
   Como `h < a < b` (`10.32 < 14 < 18`), existen **dos triángulos válidos**.
2. **Calcular las dos ramas posibles para el ángulo `B`:**
   ```text
   sin(B) = (18 × sin(35°)) / 14 = 10.3244 / 14 ≈ 0.737455
   B₁ = arcsin(0.737455) ≈ 47.52°   (rama aguda)
   B₂ = 180° − 47.52°   ≈ 132.48°  (rama obtusa suplementaria)
   ```
3. **Resolver el primer triángulo (`B₁ = 47.52°`):**
   ```text
   C₁ = 180° − 35° − 47.52° = 97.48°
   c₁ = (14 × sin(97.48°)) / sin(35°) = (14 × 0.99148) / 0.573576 ≈ 24.20 cm
   Área₁ = 0.5 × 14 × 18 × sin(97.48°) ≈ 124.93 cm²
   ```
   Verificación por Herón: `s₁ = (14 + 18 + 24.2003) / 2 ≈ 28.100 cm`, dando igualmente `124.93 cm²`.
4. **Resolver el segundo triángulo (`B₂ = 132.48°`):**
   ```text
   C₂ = 180° − 35° − 132.48° = 12.52°
   c₂ = (14 × sin(12.52°)) / sin(35°) = (14 × 0.21678) / 0.573576 ≈ 5.29 cm
   Área₂ = 0.5 × 14 × 18 × sin(12.52°) ≈ 27.30 cm²
   ```

## Matriz de decisión para resolver cualquier triángulo

| Datos conocidos | Criterio de validez | Leyes aplicadas | Área recomendada | Soluciones posibles |
|---|---|---|---|---|
| Tres lados (`LLL`) | Cumplir `a + b > c` | Ley de los cosenos | Fórmula de Herón | 1 única (0 si incumple) |
| Dos lados y ángulo incluido (`LAL`) | `0° < C < 180°` | Cosenos y luego senos | `(1/2) × a × b × sin(C)` | 1 única |
| Dos ángulos y lado incluido (`ALA`) | `A + B < 180°` | Suma angular y senos | `(1/2) × a × b × sin(C)` | 1 única |
| Dos ángulos y lado opuesto (`AAL`) | `A + B < 180°` | Suma angular y senos | `(1/2) × a × b × sin(C)` | 1 única |
| Dos lados y ángulo opuesto (`LLA`, `A < 90°`) | Comparar `a` con `h` y `b` | Ley de los senos | `(1/2) × a × b × sin(C)` | 0 (`a < h`), 1 (`a = h` o `a ≥ b`), 2 (`h < a < b`) |
| Dos lados y ángulo opuesto (`LLA`, `A ≥ 90°`) | Comparar `a` con `b` | Ley de los senos | `(1/2) × a × b × sin(C)` | 1 si `a > b`; 0 si `a ≤ b` |
| Tres ángulos (`AAA`) | `A + B + C = 180°` | Solo proporciones | Indeterminada | Infinitos semejantes |

## Estabilidad numérica y errores frecuentes

En análisis estructural, carpintería metálica y diseño CAD, el cálculo de áreas y radios permite verificar holguras mecánicas y localizar centros notables (incentro y circuncentro). Conviene atender dos cautelas críticas:

- **Triángulos casi degenerados en Herón:** cuando `a + b` supera a `c` por una diferencia diminuta (por ejemplo `100`, `100` y `199.999`), el factor `s − c` se acerca a cero y la fórmula clásica de Herón pierde dígitos significativos por cancelación en coma flotante. Ordenando `a ≥ b ≥ c`, la variante de Kahan conserva la exactitud:
  ```text
  Área = (1 / 4) × √[(a + (b + c)) × (c − (a − b)) × (c + (a − b)) × (a + (b − c))]
  ```
- **Descartar soluciones obtusas o confundir alturas:** en `LLA`, si `h < a < b`, ambas soluciones (`B₁` y `180° − B₁`) son físicamente válidas salvo restricción externa del diseño. Asimismo, en triángulos obtusángulos las alturas trazadas desde vértices agudos caen fuera de la base, sobre su prolongación perpendicular.
