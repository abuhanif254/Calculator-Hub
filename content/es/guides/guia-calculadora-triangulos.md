---
title: "Guía de la Calculadora de Triángulos: Lados, Ángulos y Área"
description: "Una referencia completa para resolver cualquier triángulo (rectángulo, agudo u obtuso) utilizando leyes trigonométricas y el teorema de Pitágoras."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "triangle-calculator"
---

## ¿Qué es un Triángulo?

Un triángulo es un polígono con tres lados y tres ángulos. La suma de todos los ángulos interiores es siempre exactamente **180°**. 

Los triángulos se clasifican de dos formas:
- **Por ángulos:** Agudo (todos los ángulos < 90°), Rectángulo (un ángulo = 90°), Obtuso (un ángulo > 90°)
- **Por lados:** Equilátero (todos los lados iguales), Isósceles (dos lados iguales), Escaleno (todos los lados diferentes)

## El Teorema de Pitágoras (Triángulos Rectángulos)

Para cualquier triángulo rectángulo con catetos **a** y **b** e hipotenusa **c**:
$$
a^2 + b^2 = c^2
$$

### Razones Trigonométricas (SOH-CAH-TOA)
$$
\sin\theta = \frac{O}{H}, \quad \cos\theta = \frac{A}{H}, \quad \tan\theta = \frac{O}{A}
$$

## Ley de los Senos

Se aplica a **cualquier** triángulo y relaciona los lados con sus ángulos opuestos:
$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$
**Mejor utilizado cuando:** Conoce dos ángulos y un lado (AAL o ALA), o dos lados y un ángulo opuesto a uno de ellos (LLA).

## Ley de los Cosenos

Generaliza el teorema de Pitágoras a todos los triángulos:
$$
c^2 = a^2 + b^2 - 2ab \cdot \cos C
$$
**Mejor utilizado cuando:** Conoce los tres lados (LLL) o dos lados y el ángulo incluido (LAL).

## Fórmula de Herón para el Área

Cuando conoce las tres longitudes de los lados (LLL), la fórmula de Herón da el área:
$$
s = \frac{a + b + c}{2}
$$
$$
A = \sqrt{s(s-a)(s-b)(s-c)}
$$

## Tabla de Decisión: ¿Qué Método Usar?

| Información Dada | Configuración | Método a Utilizar |
|---|---|---|
| Tres lados | LLL | Ley de los Cosenos → Herón para el área |
| Dos lados + ángulo | LAL | Ley de los Cosenos → Ley de los Senos |
| Dos ángulos + lado | AAL o ALA | Ley de los Senos |
| Dos lados + ángulo | LLA | Ley de los Senos (caso ambiguo) |
| Todos los ángulos | AAA | (infinitas soluciones, determina forma pero no tamaño) |

## Preguntas Frecuentes

**P: ¿Qué es el caso ambiguo (LLA)?**
R: Al conocer dos lados y un ángulo no incluido, la Ley de los Senos puede producir 0, 1 o 2 triángulos válidos.

**P: ¿Puedo usar la Ley de los Cosenos para triángulos rectángulos?**
R: Sí. Cuando C = 90°, cos(90°) = 0, y la fórmula se reduce al teorema de Pitágoras.
