---
title: "Balanceo de Ecuaciones Químicas: Ley de Conservación"
description: "Guía técnica sobre el balanceo de ecuaciones químicas: ley de conservación de la masa, diferencia entre subíndices y coeficientes, método algebraico matricial, ejemplo paso a paso y casos complejos."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "balancing-chemical-equations-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué nunca se deben modificar los subíndices al balancear una ecuación química?"
    answer: "Los subíndices definen la proporción fija de átomos dentro de cada molécula o unidad fórmula y determinan la identidad química de la sustancia. Cambiar H₂O por H₂O₂ transforma agua potable en peróxido de hidrógeno, alterando por completo la reacción real; únicamente pueden ajustarse los coeficientes estequiométricos delante de cada fórmula."
  - question: "¿Cómo balancea automáticamente una calculadora las ecuaciones químicas difíciles?"
    answer: "Una calculadora moderna traduce cada elemento químico en una ecuación lineal de conservación de átomos y resuelve el sistema homogéneo resultante (A · x = 0) mediante eliminación gaussiana o cálculo del espacio nulo matricial, escalando finalmente la solución al menor conjunto de números enteros positivos coprimos."
  - question: "¿Es correcto dejar fracciones como 13/2 en los coeficientes estequiométricos?"
    answer: "Aunque en termoquímica estándar a veces se escriben coeficientes fraccionarios para referir la entalpía a exactamente 1 mol de combustible, la ecuación estequiométrica convencional exige números enteros mínimos. Para eliminar un denominador 2, simplemente multiplique todos los coeficientes de la ecuación completa por 2."
  - question: "¿Qué debe balancearse además de los átomos en una ecuación iónica o redox?"
    answer: "En reacciones en disolución acuosa con iones o transferencia de electrones, además de igualar cada elemento químico debe conservarse la carga eléctrica neta entre reactivos y productos. Una ecuación con los mismos átomos pero distinta carga total en ambos lados está físicamente desbalanceada."
  - question: "¿Qué significa que una ecuación no tenga solución entera única o admita múltiples combinaciones?"
    answer: "Ocurre cuando la expresión contiene dos o más reacciones independientes simultáneas (por ejemplo, descomposición paralela de un mismo reactivo por dos rutas) o cuando falta una especie química esencial en los reactivos o productos. En ese caso el sistema matricial posee nulidad mayor que 1 y requiere especificar la estequiometría de cada proceso por separado."
---

El **balanceo de ecuaciones químicas** consiste en hallar los coeficientes estequiométricos enteros mínimos que igualan la cantidad de átomos de cada elemento entre reactivos y productos, cumpliendo la **Ley de Conservación de la Masa** formulada por Antoine Lavoisier en 1789. En toda reacción química ordinaria los núcleos atómicos no se crean ni se destruyen: únicamente se reorganizan los enlaces para formar nuevas especies con idéntica masa total.

Una ecuación equilibrada es indispensable antes de calcular reactivo limitante, rendimiento teórico o balances energéticos. Nuestra [Calculadora de Balanceo de Ecuaciones Químicas](/es/calculadoras/calculadora-de-balanceo-de-ecuaciones-quimicas) resuelve reacciones orgánicas, iónicas y redox mediante álgebra lineal; en esta guía explicamos sus reglas estructurales, el método matricial y un ejemplo verificado átomo por átomo.

## Reglas fundamentales: subíndices frente a coeficientes

Cada fórmula química distingue dos clases de números con funciones opuestas:

* **Subíndices (inmutables):** los números pequeños a la derecha de un símbolo fijan la composición atómica intrínseca de la especie (`H₂SO₄` contiene `2` hidrógenos, `1` azufre y `4` oxígenos). Cambiar un subíndice altera la identidad química de la sustancia.
* **Coeficientes estequiométricos (ajustables):** los números antepuestos a la fórmula multiplican cada átomo de la molécula y de sus paréntesis (`3 Ca(NO₃)₂` aporta `3` Ca, `6` N y `18` O).
* **Conservación de carga neta:** en ecuaciones iónicas o redox, la suma algebraica de cargas en reactivos debe igualar la de productos.

## Método por tanteo frente a resolución algebraica matricial

Para reacciones simples conviene el tanteo ordenado: ajustar primero metales y no metales distintos de `H` y `O`, mantener intactos los grupos poliatómicos no reactivos (`SO₄²⁻`, `NO₃⁻`, `PO₄³⁻`) como unidades completas y equilibrar hidrógeno y oxígeno al final. Cuando un mismo elemento aparece en tres o más especies o intervienen múltiples estados de oxidación, el **método algebraico matricial** resulta infalible: asigna incógnitas (`a, b, c, d...`) a cada sustancia, construye una ecuación de balance por elemento y resuelve el sistema lineal homogéneo `A · x = 0` mediante eliminación gaussiana hasta obtener los menores enteros positivos coprimos.

## Ejemplo resuelto paso a paso: combustión completa del butano

Equilibramos la combustión completa del butano (`C₄H₁₀`) con oxígeno (`O₂`) hacia dióxido de carbono (`CO₂`) y agua (`H₂O`):

```text
a C₄H₁₀ + b O₂ → c CO₂ + d H₂O
```

### Paso 1: Planteamiento del sistema por elemento

```text
Carbono (C):   4a = c
Hidrógeno (H): 10a = 2d  →  d = 5a
Oxígeno (O):   2b = 2c + d
```

### Paso 2: Sustitución y obtención de enteros mínimos

Sustituyendo `c = 4a` y `d = 5a` en el balance de oxígeno:

```text
2b = 2(4a) + 5a = 13a  →  b = (13 / 2) × a
```

Al asignar `a = 2` para eliminar el denominador `2`, resulta `a = 2`, `b = 13`, `c = 8`, `d = 10`:

```text
2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O
```

### Paso 3: Verificación atómica y de masa molar

* **Reactivos:** `8 C`, `20 H`, `26 O` (`13 × 2`).
* **Productos:** `8 C`, `20 H`, `26 O` (`8 × 2 + 10 × 1`).
* **Masa molar (`C = 12.011`, `H = 1.008`, `O = 15.999 g/mol`):**
  * Reactivos: `(2 × 58.124) + (13 × 31.998) = 116.248 + 415.974 = 532.222 g`.
  * Productos: `(8 × 44.009) + (10 × 18.015) = 352.072 + 180.150 = 532.222 g`.

## Tabla comparativa de reacciones químicas balanceadas

La tabla muestra seis reacciones representativas de distintos mecanismos químicos:

| Tipo de reacción | Ecuación sin balancear | Ecuación balanceada | Suma de coeficientes | Clave estequiométrica |
| :--- | :--- | :--- | :--- | :--- |
| Síntesis (Haber-Bosch) | `N₂ + H₂ → NH₃` | `N₂ + 3 H₂ → 2 NH₃` | `6` (`1+3+2`) | Mínimo común múltiplo en `H` |
| Combustión de alcano | `C₄H₁₀ + O₂ → CO₂ + H₂O` | `2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O` | `33` (`2+13+8+10`) | Duplicado por `O₂` impar (`13/2`) |
| Neutralización ácido-base | `H₃PO₄ + Ca(OH)₂ → Ca₃(PO₄)₂ + H₂O` | `2 H₃PO₄ + 3 Ca(OH)₂ → Ca₃(PO₄)₂ + 6 H₂O` | `12` (`2+3+1+6`) | Grupos `PO₄³⁻` y `Ca` |
| Desplazamiento (termita) | `Fe₂O₃ + Al → Al₂O₃ + Fe` | `Fe₂O₃ + 2 Al → Al₂O₃ + 2 Fe` | `6` (`1+2+1+2`) | Intercambio de `6` electrones |
| Precipitación doble | `AgNO₃ + MgCl₂ → AgCl + Mg(NO₃)₂` | `2 AgNO₃ + MgCl₂ → 2 AgCl + Mg(NO₃)₂` | `6` (`2+1+2+1`) | Paridad de `NO₃⁻` y `Cl⁻` |
| Fotosíntesis global | `CO₂ + H₂O → C₆H₁₂O₆ + O₂` | `6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂` | `19` (`6+6+1+6`) | Ajuste secuencial `C → H → O` |

## Errores frecuentes y criterios de rigor estequiométrico

* **Romper moléculas diatómicas elementales:** hidrógeno, nitrógeno, oxígeno y halógenos existen como `H₂`, `N₂`, `O₂`, `F₂`, `Cl₂`, `Br₂` e `I₂`. Escribir `O` atómico libre invalida la reacción real.
* **Confundir mayúsculas y minúsculas:** en notación química `Co` designa cobalto, mientras `CO` representa monóxido de carbono; un error tipográfico altera por completo la matriz estequiométrica.
* **No simplificar coeficientes múltiplos:** expresiones como `4 H₂ + 2 O₂ → 4 H₂O` conservan la masa pero incumplen la convención IUPAC de enteros mínimos (`2 H₂ + O₂ → 2 H₂O`).
* **Omitir especies en reacciones redox acuosas:** procesos con permanganato (`MnO₄⁻`) requieren incorporar `H⁺` y `H₂O` en medio ácido (o `OH⁻` en medio básico) para equilibrar oxígeno, hidrógeno y carga eléctrica.
