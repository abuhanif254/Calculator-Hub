---
title: "Calculadora de Calor de Reacción: Termodinámica"
description: "Aprenda a calcular el calor estándar de reacción a partir de las entalpías de formación, y use nuestra calculadora gratuita."
category: "Math & Science"
relatedCalculator: "heat-of-reaction-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Por qué la entalpía estándar de formación de un elemento puro es cero?"
    answer: "Por convención termodinámica, se asigna un valor exacto de ΔH°_f = 0 kJ/mol a cada elemento químico en su forma alotrópica y estado físico más estable a 298,15 K y 1 bar (por ejemplo, O₂(g), N₂(g) o carbono grafito). Esto fija un punto cero de referencia universal sin alterar las diferencias de entalpía entre compuestos."
  - question: "¿Todos los alótropos de un elemento tienen ΔH°_f igual a cero?"
    answer: "No. Únicamente el alótropo más estable en condiciones estándar tiene ΔH°_f = 0 kJ/mol. Por ejemplo, el carbono grafito tiene ΔH°_f = 0 kJ/mol, pero el carbono diamante presenta +1,895 kJ/mol; del mismo modo, O₂(g) vale 0 kJ/mol mientras que el ozono O₃(g) vale +142,7 kJ/mol."
  - question: "¿Qué diferencia existe entre el estado estándar de la IUPAC y las tablas antiguas?"
    answer: "Desde 1982, la IUPAC define la presión estándar en exactamente 1 bar (100 kPa) y mantiene la temperatura de referencia habitual en 298,15 K (25 °C) con solutos a 1 mol/L. Textos anteriores utilizaban 1 atmósfera (101,325 kPa); aunque la diferencia de entalpía en gases ideales entre 1 bar y 1 atm es mínima, conviene verificar la base de la tabla."
  - question: "¿Cómo se calcula el calor de reacción si la temperatura no es 25 °C?"
    answer: "Cuando la reacción opera a una temperatura T₂ distinta de 298,15 K, el calor de reacción se ajusta mediante la ley de Kirchhoff: ΔH°(T₂) = ΔH°(T₁) + ∫ ΔC_p dT. Si la diferencia de capacidades caloríficas (ΔC_p) es casi constante en ese rango, se aproxima como ΔH°(T₁) + ΔC_p × (T₂ − T₁)."
  - question: "¿Por qué cambia tanto el calor de combustión si el agua sale líquida o gaseosa?"
    answer: "Condensar un mol de vapor de agua a líquido a 298,15 K libera 44,01 kJ adicionales. Por ello, cuando los productos incluyen H₂O(l) se obtiene el poder calorífico superior (mayor calor liberado), mientras que cuando el agua permanece como vapor H₂O(g) se obtiene el poder calorífico inferior."
---

El calor estándar de reacción (`ΔH°_reacción`) representa la energía térmica absorbida o liberada cuando los reactivos puros en sus estados estándar se transforman por completo en productos en su estado estándar conforme a la ecuación química balanceada. Su cálculo mediante entalpías estándar de formación (`ΔH°_f`) se fundamenta en la ley de Hess y responde a la expresión termodinámica: `ΔH°_reacción = Σ(n_p × ΔH°_f,productos) − Σ(n_r × ΔH°_f,reactivos)`.

Debido a que la entalpía es una función de estado, esta metodología permite determinar el balance energético de miles de procesos químicos sin medir cada reacción en laboratorio. Para automatizar la ponderación estequiométrica y evitar errores de signo, emplee nuestra [Calculadora de Calor de Reacción](/es/calculadoras/calculadora-de-calor-de-reaccion).

## Estado estándar, ley de Hess y formulación exacta

Para unificar datos experimentales, la IUPAC define el **estado estándar** (indicado con el superíndice `°`) a una presión de `1 bar` (`100 kPa`; textos antiguos empleaban `1 atm = 101,325 kPa`), concentración de `1 mol/L` para solutos y sustancias puras en su fase estable a la temperatura de referencia, habitualmente `298,15 K` (`25,00 °C`).

La **entalpía estándar de formación (`ΔH°_f`)** se define como el cambio entálpico asociado a sintetizar `1 mol` de un compuesto a partir de sus elementos constituyentes en su forma alotrópica y fase de referencia más estable a `298,15 K` y `1 bar`. Apoyándose en la **ley de Hess** —según la cual la variación entálpica global de una transformación química es idéntica ya ocurra en una sola etapa o en una secuencia de reacciones intermedias—, el cálculo estándar y sus correcciones térmicas o volumétricas se formulan como:

```text
ΔH°_reacción = Σ(n_p × ΔH°_f,productos) − Σ(n_r × ΔH°_f,reactivos)
ΔH°(T₂) ≈ ΔH°(T₁) + ΔC_p × (T₂ − T₁)
ΔH°_reacción = ΔU°_reacción + Δn_gas × R × T
```

En estas ecuaciones, `n_p` y `n_r` son los coeficientes estequiométricos adimensionales de productos y reactivos en la ecuación balanceada, `ΔC_p = Σ(n_p × C_p,productos) − Σ(n_r × C_p,reactivos)` es la diferencia de capacidades caloríficas molares a presión constante (`J/(mol·K)`), `ΔU°` es la variación de energía interna de la reacción (`kJ/mol`), `Δn_gas` representa la variación neta de moles de gases ideales (`n_gas,productos − n_gas,reactivos`) y `R = 8,3145 J/(mol·K)`.

## Ejemplo numérico paso a paso: combustión completa del propano

Calculemos el calor estándar de combustión de `1 mol` de propano gaseoso a `298,15 K` según la ecuación balanceada `C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(l)`. Las entalpías estándar de formación tabuladas son: `C₃H₈(g) = −103,85 kJ/mol`, `O₂(g) = 0,00 kJ/mol`, `CO₂(g) = −393,51 kJ/mol` y `H₂O(l) = −285,83 kJ/mol`.

1. **Comprobación estequiométrica:** Ambos miembros de la ecuación conservan exactamente `3` átomos de carbono, `8` de hidrógeno y `10` de oxígeno (`3 × 2 + 4 × 1 = 10`).
2. **Suma ponderada de productos:** Se multiplica cada entalpía de formación por su coeficiente estequiométrico: `3 × (−393,51) + 4 × (−285,83) = −1180,53 − 1143,32 = −2323,85 kJ/mol`.
3. **Suma ponderada de reactivos:** Como `O₂(g)` corresponde al estado elemental de referencia, su contribución es cero: `1 × (−103,85) + 5 × (0,00) = −103,85 kJ/mol`.
4. **Cálculo de `ΔH°_reacción` (poder calorífico superior):** Restando reactivos a productos y cuidando el doble signo negativo: `ΔH°_reacción = −2323,85 − (−103,85) = −2220,00 kJ/mol` (`−50,35 MJ/kg` de propano).
5. **Ajuste a agua vapor y relación con `ΔU°`:** Si los `4 mol` de agua salieran en fase gaseosa (`H₂O(g) = −241,82 kJ/mol`), el calor liberado disminuiría en `4 × 44,01 = 176,04 kJ/mol`, obteniéndose el poder calorífico inferior (`−2043,96 kJ/mol`). Además, para la reacción con agua líquida, `Δn_gas = 3 − (1 + 5) = −3 mol`, por lo que `Δn_gas × R × T = −3 × 8,3145 × 298,15 = −7436,9 J ≈ −7,44 kJ/mol`, dando `ΔU° = −2220,00 − (−7,44) = −2212,56 kJ/mol`.

## Entalpías estándar de formación y estados de referencia clave

Elegir el alótropo o el estado físico equivocado introduce errores sistemáticos considerables. La tabla siguiente reúne valores críticos a `298,15 K` y `1 bar`.

| Especie química | `ΔH°_f` (`kJ/mol`) | Referencia | Impacto termodinámico |
| :--- | :--- | :--- | :--- |
| `O₂(g)` | `0,00` | Sí | Aporte nulo en reacciones de oxidación |
| `O₃(g)` (ozono) | `+142,7` | No (alótropo) | Compuesto endotérmico muy reactivo |
| `C(s, grafito)` | `0,00` | Sí | Base estándar del carbono |
| `C(s, diamante)` | `+1,895` | No (alótropo) | Libera `1,895 kJ/mol` extra al oxidarse |
| `H₂O(l)` | `−285,83` | Compuesto | Define el poder calorífico superior |
| `H₂O(g)` | `−241,82` | Compuesto | Define el poder calorífico inferior |
| `CO₂(g)` | `−393,51` | Compuesto | Producto estable de oxidación completa |

## Aplicaciones en ingeniería, errores habituales y límites de validez

En seguridad de procesos químicos, `ΔH°_reacción` permite prevenir reacciones desbocadas o fuera de control estimando el incremento adiabático de temperatura en reactores discontinuos ante un fallo del sistema de refrigeración. En generación energética, turbinas y calderas de condensación, distinguir entre `H₂O(l)` y `H₂O(g)` separa con precisión el poder calorífico superior del inferior y evita errores de dimensionamiento térmico. En propulsión aeroespacial, maximizar el calor liberado por kilogramo de mezcla propelente determina directamente la temperatura de cámara y el impulso específico teórico.

El fallo operativo más frecuente consiste en utilizar ecuaciones sin balancear u olvidar multiplicar `ΔH°_f` por los coeficientes estequiométricos correspondientes. También es común asignar valor cero a elementos en fases no estándar a `25 °C`, como el bromo gaseoso (`Br₂(g) = +30,91 kJ/mol`) o el yodo gaseoso (`I₂(g) = +62,44 kJ/mol`), cuando sus estados de referencia estables son `Br₂(l)` e `I₂(s)`.

Finalmente, recuerde que `ΔH°_reacción` aplica exclusivamente a `298,15 K` y `1 bar` para sustancias puras. A temperaturas industriales elevadas debe aplicarse la corrección de Kirchhoff integrando `ΔC_p`, además de incorporar los calores latentes si ocurren cambios de fase y las entalpías integrales de mezcla en disoluciones concentradas.
