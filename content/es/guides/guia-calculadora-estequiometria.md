---
title: "Estequiometría: La Matemática de las Reacciones"
description: "Guía técnica de estequiometría química: ajuste de ecuaciones por conservación de masa, relaciones molares, identificación del reactivo limitante, rendimiento teórico y control de pureza."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "stoichiometry-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué nunca deben modificarse los subíndices químicos al balancear una ecuación?"
    answer: "Los subíndices indican la composición atómica fija de una sustancia y definen su identidad química. Cambiar H₂O por H₂O₂ para igualar átomos de oxígeno transforma el agua en peróxido de hidrógeno, una molécula por completo distinta. Para balancear una reacción solo está permitido ajustar los coeficientes estequiométricos colocados delante de cada fórmula."
  - question: "¿Cómo se identifica el reactivo limitante cuando se conocen las masas iniciales?"
    answer: "Primero deben convertirse todas las masas iniciales a moles dividiendo cada masa entre su masa molar (n = m / M). Después, se divide el número de moles disponibles de cada reactivo entre su coeficiente estequiométrico en la ecuación balanceada. El reactivo que arroje el cociente menor es el reactivo limitante y determinará la cantidad máxima de producto."
  - question: "¿Por qué el rendimiento real de una síntesis química suele ser inferior al 100 %?"
    answer: "En condiciones de laboratorio o planta industrial intervienen equilibrios termodinámicos reversibles que impiden la conversión completa, reacciones secundarias competitivas que generan subproductos no deseados y pérdidas mecánicas inevitables durante las etapas de filtración, cristalización, lavado o destilación."
  - question: "¿Cómo se incorpora el porcentaje de pureza de un reactivo comercial en el cálculo?"
    answer: "Antes de calcular los moles, la masa bruta pesada en balanza debe multiplicarse por la fracción de pureza (m_pura = m_muestra × %_pureza / 100). Las impurezas inertes aportan masa física en la pesada, pero no participan en la transformación estequiométrica ni generan producto."
  - question: "¿Qué diferencia existe entre el rendimiento porcentual y la economía atómica?"
    answer: "El rendimiento porcentual mide la eficiencia práctica de una síntesis comparando la masa aislada frente al máximo teórico dictado por el reactivo limitante. La economía atómica es un indicador de química verde que evalúa qué fracción de la masa total de todos los reactivos termina incorporada en el producto deseado según la ecuación ideal, incluso si el rendimiento fuese del 100 %."
---

La **estequiometría** cuantifica las proporciones exactas en que se consumen los reactivos y se generan los productos durante una reacción química. Basada en la ley de conservación de la masa de Lavoisier y en la ley de las proporciones definidas, permite calcular cuánto producto puede obtenerse a partir de masas, volúmenes o presiones iniciales conocidas.

Como las reacciones ocurren entre números discretos de moléculas y no directamente en gramos, todo balance exige convertir las magnitudes experimentales a moles mediante la masa molar o las leyes de los gases. Para validar ecuaciones ajustadas, hallar el reactivo limitante y obtener rendimientos teóricos al instante, utilice nuestra [Calculadora de Estequiometría](/es/calculadoras/calculadora-de-estequiometria).

## Fundamentos Estequiométricos y Ecuaciones Clave

En una ecuación química correctamente balanceada:

```text
a A + b B → c C + d D
```

los coeficientes `a`, `b`, `c` y `d` fijan las razones molares de transformación, estableciendo una equivalencia estricta durante el avance de la reacción:

```text
n_A_reaccionado / a = n_B_reaccionado / b = n_C_formado / c = n_D_formado / d
```

Para aplicar estas proporciones, convierta previamente cada entrada a moles (`n`) según su estado físico:

* **Sólidos y líquidos puros:** `n = m / M`, siendo `m` la masa pura (`g`) y `M` la masa molar (`g/mol`).
* **Disoluciones:** `n = C × V`, con `C` en molaridad (`mol/L`) y `V` en litros (`L`).
* **Gases ideales:** `n = (P × V) / (R × T)`, con `T` en kelvin (`K = °C + 273.15`) y `R = 0.082057 L·atm/(mol·K)`.

Al combinar dos o más reactivos, el primero en agotarse se denomina **reactivo limitante**. Se identifica calculando `n_disponible / coeficiente` para cada reactivo: el menor cociente define al limitante, mientras los demás quedan en exceso. La eficiencia práctica del experimento se expresa mediante el **rendimiento porcentual**:

```text
Rendimiento (%) = (m_real / m_teórica) × 100
```

Si un reactivo comercial contiene impurezas inertes, corrija primero la masa pesada mediante `m_pura = m_muestra × (Pureza % / 100)`.

## Ejemplo Resuelto: Síntesis de Amoníaco y Reactivo Limitante

Considere la síntesis industrial del amoníaco mediante el proceso Haber-Bosch:

```text
N₂(g) + 3 H₂(g) → 2 NH₃(g)
```

En un reactor se cargan `70.0 g` de `N₂` (`M = 28.014 g/mol`) y `18.0 g` de `H₂` (`M = 2.016 g/mol`). Tras la separación final se aíslan `68.0 g` de `NH₃` (`M = 17.031 g/mol`).

### Paso 1: Convertir las Masas a Moles

```text
n(N₂) = 70.0 g / 28.014 g/mol = 2.499 mol
n(H₂) = 18.0 g / 2.016 g/mol  = 8.929 mol
```

### Paso 2: Identificar el Reactivo Limitante

Divida los moles iniciales entre sus respectivos coeficientes (`1` para `N₂` y `3` para `H₂`):

```text
Cociente N₂ = 2.499 / 1 = 2.499
Cociente H₂ = 8.929 / 3 = 2.976
```

Dado que `2.499 < 2.976`, el nitrógeno (`N₂`) es el **reactivo limitante** y el hidrógeno (`H₂`) permanece en exceso.

### Paso 3: Calcular el Producto Teórico y el Exceso Restante

```text
n_teórico(NH₃) = 2.499 mol N₂ × (2 / 1) = 4.998 mol NH₃
m_teórica(NH₃) = 4.998 mol × 17.031 g/mol = 85.12 g NH₃
```

Verifique el consumo de `H₂` y la conservación de masa:

```text
m_consumida(H₂) = 2.499 mol × 3 × 2.016 g/mol = 15.11 g H₂
m_exceso(H₂)    = 18.0 g − 15.11 g = 2.89 g H₂
```

La masa consumida (`70.0 g + 15.11 g = 85.11 g`) coincide con la teórica de `NH₃` (`85.12 g`, con `0.01 g` de redondeo).

### Paso 4: Calcular el Rendimiento Porcentual

```text
Rendimiento (%) = (68.0 g / 85.12 g) × 100 = 79.9 %
```

## Tabla Comparativa de Cálculos Estequiométricos

El procedimiento de cálculo se adapta al estado de agregación y a las variables medidas en cada sistema.

| Tipo de Cálculo | Ecuación Central | Entradas Requeridas | Magnitud Resultante | Caso de Uso Típico | Error Habitual |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Relación masa-masa | `m_B = (m_A / M_A) × (b/a) × M_B` | Masa de reactivo y masas molares | Masa teórica (`g`) | Síntesis inorgánica y gravimetría | Multiplicar gramos sin pasar a moles |
| Reactivo limitante | `min(n_i / coef_i)` | Cantidades de ≥ 2 reactivos | Limitante y sobrante | Optimización de reactores | Elegir el de menor masa en gramos |
| Valoración volumétrica | `C_A × V_A / a = C_B × V_B / b` | Molaridad y volumen final | Concentración (`mol/L`) | Titulaciones ácido-base y redox | Mezclar `mL` y `mol` sin pasar a `L` |
| Estequiometría gaseosa | `n = (P × V) / (R × T)` | Presión, volumen y temperatura | Moles o volumen de gas | Combustión y bolsas de aire | Usar `°C` en vez de kelvin (`K`) |
| Corrección de pureza | `m_pura = m_bruta × (% / 100)` | Masa pesada y riqueza | Masa reactiva útil (`g`) | Minerales y reactivos técnicos | Omitir agua en sales hidratadas |
| Economía atómica | `(M_producto / Σ M_reactivos) × 100` | Ecuación balanceada completa | Eficiencia intrínseca (`%`) | Química verde farmacéutica | Confundirla con el rendimiento real |

## Aplicaciones Industriales, Errores Comunes y Precisión Analítica

La estequiometría sustenta el control de costos, la seguridad y la sostenibilidad química. En manufactura farmacéutica, dosificar con precisión los reactivos limitantes evita subproductos costosos y reduce disolventes residuales. En motores y calderas industriales, ajustar la relación aire-combustible al valor estequiométrico (`λ = 1`) maximiza la eficiencia térmica y restringe emisiones de `CO` y `NOₓ`. En control analítico, las valoraciones volumétricas y precipitaciones gravimétricas dependen de relaciones molares exactas.

Entre los errores críticos figuran operar con **ecuaciones sin balancear** o alterar los subíndices de una fórmula para igualar átomos. También es frecuente ignorar el **agua de hidratación** en reactivos sólidos: pesar `25.0 g` de `CuSO₄·5H₂O` (`249.68 g/mol`) aporta `0.100 mol` de sal, frente a los `0.157 mol` del sulfato anhidro (`159.61 g/mol`).

Finalmente, recuerde que la estequiometría establece el límite máximo por conservación de masa, pero no describe la **cinética** ni el equilibrio termodinámico. En reacciones reversibles, añadir un exceso de un reactivo económico desplaza el equilibrio hacia los productos según el principio de Le Chatelier sin alterar las proporciones molares de la ecuación.
