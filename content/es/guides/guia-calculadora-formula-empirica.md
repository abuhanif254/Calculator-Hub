---
title: "Fórmula Empírica: La Proporción Más Simple"
description: "Guía técnica para determinar la fórmula empírica a partir de composición porcentual o análisis de combustión: conversión a moles, normalización, multiplicadores fraccionarios y tolerancias experimentales."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "empirical-formula-calculator"
relatedType: "calculator"
faqs:
  - question: "¿En qué casos la fórmula empírica coincide exactamente con la fórmula molecular?"
    answer: "Coinciden cuando los subíndices de la fórmula molecular ya son primos entre sí y no admiten un divisor común mayor que 1. Ocurre en compuestos como el agua (H₂O), el amoníaco (NH₃), el dióxido de carbono (CO₂) o la sacarosa (C₁₂H₂₂O₁₁), donde la proporción mínima entera representa también la molécula real."
  - question: "¿Por qué los compuestos iónicos solo poseen fórmula empírica?"
    answer: "Los sólidos iónicos como el cloruro de sodio (NaCl) o el óxido de aluminio (Al₂O₃) no forman moléculas individuales aisladas, sino redes cristalinas tridimensionales continuas. Por ello, su fórmula química expresa únicamente la unidad fórmula, es decir, la proporción entera más simple entre cationes y aniones que garantiza la neutralidad eléctrica."
  - question: "¿Qué debe hacerse si tras dividir entre el menor número de moles se obtiene un valor como 1.33 o 1.50?"
    answer: "No debe redondearse hacia el entero más cercano, ya que esa diferencia excede el margen de error analítico. Un decimal cercano a 0.33 o 0.67 indica tercios y exige multiplicar todos los subíndices por 3; un decimal cercano a 0.50 indica mitades y obliga a multiplicar todos los valores por 2."
  - question: "¿Cómo se determina el porcentaje de oxígeno cuando un análisis elemental solo reporta carbono, hidrógeno y nitrógeno?"
    answer: "En los analizadores elementales CHN estándar, el oxígeno suele obtenerse por diferencia sustrayendo de 100 % la suma de los porcentajes medidos de carbono, hidrógeno, nitrógeno y cualquier otro heteroátomo cuantificado (como azufre o halógenos). Este método presupone que la muestra se encuentra completamente seca y libre de cenizas inorgánicas."
  - question: "¿Cuántas cifras decimales conviene conservar en los cálculos intermedios antes de redondear?"
    answer: "Se recomienda mantener al menos tres o cuatro cifras significativas en los moles calculados y en los cocientes normalizados. Redondear demasiado pronto —por ejemplo, truncar 1.33 mol a 1.3 mol— distorsiona la identificación de fracciones exactas como 4/3 o 5/4 y puede conducir a una fórmula empírica errónea."
---

La **fórmula empírica** expresa la proporción entera más simple entre los átomos de los distintos elementos que forman un compuesto. A diferencia de la fórmula molecular —que detalla el número exacto de átomos en una molécula discreta—, la fórmula empírica refleja únicamente la razón estequiométrica mínima obtenida directamente de datos experimentales de composición en masa.

Constituye la primera etapa analítica al caracterizar una sustancia tras un análisis elemental o de combustión, y es la única fórmula aplicable a redes cristalinas iónicas o covalentes extendidas como `NaCl` o `SiO₂`. Para automatizar la conversión a moles y el escalado a enteros, utilice nuestra [Calculadora de Fórmula Empírica](/es/calculadoras/calculadora-de-formula-empirica).

## Metodología de Cálculo desde Composición Centesimal

El cálculo a partir de porcentajes másicos sigue un procedimiento sistemático de cuatro pasos con los pesos atómicos estándar de la IUPAC:

1. **Base de cálculo (`100.0 g`):** Si dispone de porcentajes en masa, asuma una muestra de `100.0 g` para convertir directamente cada porcentaje en gramos (`m_i = %_i`). Si cuenta con masas gravimétricas directas, úselas sin transformar.
2. **Conversión a moles:** Divida la masa de cada elemento entre su masa atómica estándar (`M_i`):

```text
n_i = m_i / M_i
```

3. **Normalización respecto al mínimo:** Identifique el menor número de moles (`n_mín`) y divida todas las cantidades molares entre dicho mínimo:

```text
r_i = n_i / n_mín
```

4. **Escalado a enteros:** Si los cocientes `r_i` distan menos de `±0.05` de un entero, redondee directamente. Si aparece una fracción definida (`0.25`, `0.33`, `0.50`, `0.67`, `0.75`), multiplique **todos** los cocientes por el mínimo entero `f` que elimine la parte decimal.

En un **análisis de combustión** de compuestos `C_xH_yO_z`, calcule primero la masa de carbono e hidrógeno a partir del `CO₂` y `H₂O` recogidos, y obtenga el oxígeno por diferencia:

```text
m_C = m(CO₂) × (12.011 / 44.009)
m_H = m(H₂O) × (2.016 / 18.015)
m_O = m_muestra − (m_C + m_H)
```

## Ejemplo Resuelto con Multiplicador Fraccionario

Considere el análisis elemental de un compuesto orgánico con la siguiente composición centesimal: **40.92 % de carbono (`C`)**, **4.58 % de hidrógeno (`H`)** y **54.50 % de oxígeno (`O`)**.

### Paso 1: Asumir 100.00 g de Muestra

```text
m_C = 40.92 g   |   m_H = 4.58 g   |   m_O = 54.50 g
```

*(Suma verificada: `40.92 + 4.58 + 54.50 = 100.00 g`)*.

### Paso 2: Convertir a Moles

Usando `C = 12.011 g/mol`, `H = 1.008 g/mol` y `O = 15.999 g/mol`:

```text
n_C = 40.92 / 12.011 = 3.4069 mol
n_H = 4.58  / 1.008  = 4.5437 mol
n_O = 54.50 / 15.999 = 3.4065 mol
```

### Paso 3: Dividir Entre el Menor Número de Moles

El mínimo es `n_O = 3.4065 mol`:

```text
C: 3.4069 / 3.4065 = 1.000
H: 4.5437 / 3.4065 = 1.334
O: 3.4065 / 3.4065 = 1.000
```

### Paso 4: Escalar al Entero Mínimo

El valor `1.334` equivale a `1 + 1/3`, por lo que no debe redondearse a `1`. Multiplique los tres cocientes por **`3`**:

```text
C: 1.000 × 3 = 3.00 → 3
H: 1.334 × 3 = 4.00 → 4
O: 1.000 × 3 = 3.00 → 3
```

La fórmula empírica resultante es **`C₃H₄O₃`** (correspondiente al ácido ascórbico, cuya fórmula molecular es `C₆H₈O₆`).

## Tabla de Multiplicadores Fraccionarios y Ejemplos Clásicos

Identificar las fracciones decimales habituales evita errores de redondeo en el Paso 3.

| Parte Decimal | Fracción Aproximada | Multiplicador (`f`) | Razón Normalizada | Fórmula Empírica | Compuesto Representativo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `.00` (`±0.03`) | Entero | `× 1` | `C₁H₂O₁` | `CH₂O` | Formaldehído / Glucosa |
| `.50` | `1/2` | `× 2` | `Fe₁O₁.₅₀` | `Fe₂O₃` | Óxido de hierro(III) |
| `.33` o `.67` | `1/3` o `2/3` | `× 3` | `C₁H₁.₃₃O₁` | `C₃H₄O₃` | Ácido ascórbico (`C₆H₈O₆`) |
| `.25` o `.75` | `1/4` o `3/4` | `× 4` | `C₁.₂₅H₁` | `C₅H₄` | Naftaleno (`C₁₀H₈`) |
| `.20`, `.40`, `.60`, `.80` | `1/5` a `4/5` | `× 5` | `C₁H₂.₄₀` | `C₅H₁₂` | Pentano (`C₅H₁₂`) |
| `.17` o `.83` | `1/6` o `5/6` | `× 6` | `C₁H₂O₁.₁₇` | `C₆H₁₂O₇` | Ácido glucónico (`C₆H₁₂O₇`) |

## Aplicaciones Analíticas, Errores Frecuentes y Límites Experimentales

En síntesis orgánica, el microanálisis elemental CHN/S certifica la pureza e identidad preliminar de nuevos compuestos; las revistas científicas arbitradas exigen habitualmente que los porcentajes medidos se sitúen dentro de una tolerancia de **±0.3 % a ±0.4 % absoluto** respecto al cálculo teórico derivado de la fórmula propuesta. En geología, mineralogía y metalurgia, técnicas como la fluorescencia de rayos X (FRX) o la espectroscopía de emisión óptica con plasma acoplado inductivamente (ICP-OES) generan composiciones porcentuales de óxidos y aleaciones que también se reducen a fórmulas empíricas.

El fallo operativo más frecuente es **redondear cifras intermedias en exceso** durante los Pasos 2 o 3, convirtiendo valores como `1.25` o `1.33` directamente en `1` y rompiendo la estequiometría real del compuesto. Igualmente crítico es olvidar el cálculo de **oxígeno por diferencia** (`100 % − %C − %H − %N`) o pasar por alto moléculas de humedad y disolventes retenidos en la red cristalina (hidratos o solvatos). Por ejemplo, el sulfato de cobre(II) pentahidratado (`CuSO₄·5H₂O`) incorpora cinco moléculas de agua que modifican sustancialmente el porcentaje de hidrógeno y oxígeno medido en el ensayo.

Finalmente, la fórmula empírica no determina por sí sola el tamaño molecular ni la conectividad entre átomos: el acetileno (`C₂H₂`, gas usado en soldadura) y el benceno (`C₆H₆`, disolvente aromático líquido) comparten exactamente la misma fórmula empírica (`CH`) pese a diferir en reactividad, toxicidad y masa molar. Para determinar la entidad química real se requiere complementar este cálculo con la masa molar experimental.
