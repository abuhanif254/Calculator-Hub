---
title: "Guía Completa de Fracciones: Sumar, Restar, Multiplicar y Dividir"
description: "Domine las reglas de las fracciones, el mínimo común múltiplo, la simplificación por máximo común divisor y los números mixtos con ejemplos paso a paso."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "fraction-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué es obligatorio igualar los denominadores al sumar o restar fracciones, pero no al multiplicar?"
    answer: "El denominador define el tamaño de cada parte en que se divide la unidad. Sumar 1/2 y 1/3 directamente equivaldría a sumar unidades incompatibles; igualarlos al mínimo común múltiplo (sexto en este caso: 3/6 + 2/6) expresa ambas cantidades en la misma escala. En la multiplicación se calcula una fracción de otra fracción, operación de escalado que actúa directamente sobre numeradores y denominadores."
  - question: "¿Cómo se simplifica cualquier fracción hasta su forma irreducible?"
    answer: "Debe calcularse el máximo común divisor (mcd) del numerador y el denominador —por descomposición en factores primos o mediante el algoritmo de Euclides— y dividir ambos términos entre ese mismo número. Por ejemplo, en 36/48 el mcd es 12, lo que reduce la fracción directamente a 3/4 sin alterar su valor numérico."
  - question: "¿Cuál es la regla correcta para operar con números mixtos?"
    answer: "Conviene convertir primero todo número mixto E a/b a fracción impropia mediante la fórmula (E × b + a) / b. Esta conversión previa es obligatoria antes de multiplicar o dividir y evita errores de préstamo al restar fracciones cuando la parte fraccionaria del sustraendo supera a la del minuendo."
  - question: "¿Qué ocurre si el denominador de una fracción o el numerador de una fracción divisora es cero?"
    answer: "Una fracción con denominador cero (a/0) es matemáticamente indefinida porque no es posible dividir una cantidad entre cero partes. De forma análoga, al dividir (a/b) ÷ (c/d), si c = 0 la fracción divisora vale cero y el recíproco (d/c) no existe, por lo que la división tampoco está definida."
  - question: "¿Cuándo conviene trabajar con fracciones exactas en lugar de decimales redondeados?"
    answer: "Siempre que realice cálculos encadenados con denominadores que generan decimales periódicos (como 3, 6, 7 o 9). Redondear 1/3 a 0,33 o 1/6 a 0,17 introduce errores acumulados de truncamiento; mantener la notación fraccionaria conserva la exactitud total hasta el redondeo final de lectura o medición."
---

Una fracción expresa una cantidad racional mediante el cociente exacto entre dos números enteros: el numerador y el denominador. A diferencia de los decimales periódicos (como `0,333...`), la notación fraccionaria conserva la precisión matemática absoluta en cálculos encadenados de ingeniería, dosificación química, carpintería y análisis financiero.

Para operar correctamente con fracciones, la suma y la resta exigen igualar primero los denominadores mediante el mínimo común múltiplo (`mcm`), mientras que la multiplicación opera en línea recta y la división equivale a multiplicar por la fracción recíproca o inversa. Puede verificar resultados y simplificaciones al instante con nuestra [Calculadora de Fracciones](/es/calculadoras/calculadora-de-fracciones).

## Anatomía y clasificación de las fracciones

Toda fracción se escribe como ``a / b``, donde ``a`` es el **numerador** (partes tomadas) y ``b`` es el **denominador** (partes iguales en que se divide la unidad, con ``b ≠ 0``). La barra fraccionaria representa una división exacta pendiente de ejecutar.

Según la relación entre ambos términos, existen cuatro formatos clave:

- **Fracción propia:** El valor absoluto del numerador es menor que el del denominador (``|a| < |b|``), por lo que representa menos de una unidad, como ``3/8``.
- **Fracción impropia:** El numerador es igual o mayor que el denominador en valor absoluto (``|a| ≥ |b|``), representando una o más unidades enteras, como ``11/4``.
- **Número mixto:** Combina un entero ``E`` y una fracción propia ``a/b``. Antes de multiplicar o dividir debe convertirse en impropia mediante ``E + a/b = (E × b + a) / b``.
- **Fracción irreducible:** Aquella cuyo máximo común divisor entre numerador y denominador es 1 (``mcd(|a|, |b|) = 1``). Reducir toda respuesta a esta forma es norma en documentación técnica.

## Reglas formales para las cuatro operaciones básicas

### Suma y resta de fracciones

Cuando las fracciones comparten denominador (homogéneas), solo se operan los numeradores:

``a/c ± b/c = (a ± b) / c``

Si los denominadores difieren (heterogéneas), es obligatorio convertirlas en fracciones equivalentes con un denominador común. Aunque el producto ``b × d`` siempre sirve como denominador común, usar el mínimo común múltiplo ``M = mcm(b, d)`` evita cifras innecesariamente grandes:

``a/b ± c/d = [a × (M / b) ± c × (M / d)] / M``

### Multiplicación y división de fracciones

La multiplicación prescinde del denominador común; se multiplican numeradores entre sí y denominadores entre sí:

``(a / b) × (c / d) = (a × c) / (b × d)``

En cálculo manual conviene aplicar la **simplificación cruzada** previa: dividir un numerador y el denominador opuesto por un factor común mantiene el resultado exacto y reduce errores aritméticos.

La división consiste en multiplicar la primera fracción por el **recíproco** de la segunda, siempre que ``c ≠ 0``:

``(a / b) ÷ (c / d) = (a / b) × (d / c) = (a × d) / (b × c)``

## Ejemplo práctico paso a paso

Suponga que se mezclan ``2 1/4`` litros de disolución base con ``1 5/6`` litros de disolvente, y se desea saber cuántos envases de ``7/8`` de litro pueden llenarse.

1. **Conversión a fracciones impropias:**
   - Primer volumen: ``2 1/4 = (2 × 4 + 1) / 4 = 9/4`` litros.
   - Segundo volumen: ``1 5/6 = (1 × 6 + 5) / 6 = 11/6`` litros.
2. **Mínimo común múltiplo:** Los múltiplos de 4 son 4, 8, 12; los de 6 son 6, 12, 18. Por tanto, ``mcm(4, 6) = 12``.
3. **Equivalencia y suma:**
   - ``9/4 = 27/12`` y ``11/6 = 22/12``.
   - Volumen total: ``27/12 + 22/12 = 49/12`` litros (``4 1/12`` litros).
4. **División entre ``7/8`` L:**
   - ``(49/12) ÷ (7/8) = (49/12) × (8/7)``.
5. **Simplificación cruzada y resultado:**
   - Entre 49 y 7 el factor común es 7 (quedan ``7`` y ``1``); entre 8 y 12 el factor común es 4 (quedan ``2`` y ``3``).
   - Resultado: ``(7 × 2) / (3 × 1) = 14/3 = 4 2/3`` envases (4 completos y dos tercios del quinto).

## Matriz comparativa de operaciones y reglas de simplificación

La tabla siguiente resume requisitos, fórmulas y fallos habituales en la aritmética fraccionaria:

| Operación o proceso | Requisito previo | Expresión simbólica | Ejemplo verificado | Resultado irreducible | Error frecuente |
| --- | --- | --- | --- | --- | --- |
| Suma homogénea | Denominador idéntico | ``(a + b) / c`` | ``3/8 + 1/8`` | ``1/2`` | Sumar los denominadores (``4/16``) |
| Suma heterogénea | Calcular ``mcm(b, d)`` | ``[a(M/b) + c(M/d)] / M`` | ``2/3 + 1/4`` | ``11/12`` | Sumar en línea recta (``3/7``) |
| Resta con mixtos | Pasar a impropia | ``(E1·b + a)/b − c/d`` | ``3 1/5 − 4/5`` | ``12/5`` (``2 2/5``) | Restar enteros aparte sin reagrupar |
| Multiplicación | Convertir mixtos | ``(a × c) / (b × d)`` | ``(3/5) × (10/9)`` | ``2/3`` | Buscar común denominador innecesario |
| División | Divisor distinto de cero | ``(a × d) / (b × c)`` | ``(5/6) ÷ (15/4)`` | ``2/9`` | Invertir el dividendo en vez del divisor |
| Simplificación | Hallar ``mcd(|a|, |b|)`` | ``(a / mcd) / (b / mcd)`` | ``36/48`` (``mcd = 12``) | ``3/4`` | Dividir solo un término |

## Errores comunes y criterios de precisión

El fallo más habitual consiste en sumar o restar los denominadores directamente, confundiendo la regla aditiva con la multiplicativa. En la resta de mixtos como ``3 1/5 − 4/5``, operar enteros y fracciones por separado falla si no se reagrupa una unidad entera (convirtiendo ``3 1/5`` en ``2 6/5``); convertir siempre a fracción impropia elimina ese riesgo.

Igualmente crítica es la pérdida de exactitud por truncamiento decimal. Si un plano mecánico suma espesores de ``1/3`` cm, ``1/6`` cm y ``1/7`` cm, aproximar a dos decimales (``0,33 + 0,17 + 0,14 = 0,64``) introduce un sesgo respecto al valor exacto ``9/14 ≈ 0,64286`` cm. Conserve el formato fraccionario hasta el final, respete la jerarquía de operaciones en expresiones combinadas y verifique siempre que ningún denominador intermedio sea nulo.
