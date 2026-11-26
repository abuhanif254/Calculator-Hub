---
title: "Calculadora de pKa: Midiendo la Fuerza de un Ácido"
description: "Guía técnica sobre constantes de disociación ácida (Ka) y pKa: relación con pKb, ecuación de Henderson-Hasselbalch, ejemplos resueltos, tabla de referencia y diseño de tampones."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "pka-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Qué indica un valor de pKa negativo en un ácido?"
    answer: "Un pKa negativo indica que Ka es mayor que 1, es decir, que en equilibrio el equilibrio de disociación está desplazado casi por completo hacia los productos. Ácidos como el HCl (pKa ≈ −6.3) o el H₂SO₄ en su primer protón (pKa₁ ≈ −3.0) ceden su protón al agua de manera prácticamente cuantitativa."
  - question: "¿Cuál es la diferencia fundamental entre pH y pKa?"
    answer: "El pKa es una constante termodinámica intrínseca de cada molécula ácida a una temperatura y disolvente dados; no cambia aunque diluya la muestra. El pH, en cambio, mide la acidez actual de la disolución y varía con la concentración del ácido y con la presencia de bases o sales añadidas."
  - question: "¿Qué ocurre exactamente cuando el pH de una disolución iguala al pKa del ácido?"
    answer: "Según la ecuación de Henderson-Hasselbalch, cuando pH = pKa el término log₁₀([A⁻]/[HA]) vale cero, lo que significa que [A⁻] = [HA]. En ese punto exacto, el 50 % del ácido se encuentra en su forma neutra protonada y el otro 50 % en su forma de base conjugada ionizada, alcanzando máxima capacidad tamponadora."
  - question: "¿Cómo se relaciona el pKa de un ácido con el pKb de su base conjugada?"
    answer: "Para todo par conjugado ácido-base en agua se cumple Ka × Kb = Kw. Aplicando logaritmos negativos, pKa + pKb = pKw (14.00 a 25 °C). Cuanto más fuerte es un ácido (menor pKa), más débil es su base conjugada (mayor pKb), y viceversa."
  - question: "¿Por qué los ácidos polipróticos presentan varios valores de pKa?"
    answer: "Porque pierden sus protones ionizables de forma secuencial. Cada desprotonación deja una especie con carga más negativa que retiene electrostáticamente con mayor fuerza al protón siguiente. Por ello siempre se cumple pKa₁ < pKa₂ < pKa₃, como ocurre en el ácido fosfórico (2.15, 7.20 y 12.35)."
---

La constante de disociación ácida (`Ka`) y su expresión logarítmica **`pKa`** cuantifican la tendencia intrínseca de un compuesto a donar un protón (`H⁺`) en disolución. A diferencia del `pH` —que depende de la dilución—, el `pKa` constituye una constante termodinámica propia de cada especie química a temperatura fija, permitiendo comparar directamente la fuerza de ácidos orgánicos, inorgánicos y biomoléculas.

Con nuestra [Calculadora de pKa](/es/calculadoras/calculadora-de-pka) puede convertir `Ka` en `pKa` (y viceversa), además de hallar `Kb` y `pKb` de su base conjugada. Esta guía desarrolla el equilibrio ácido-base, la ecuación de Henderson-Hasselbalch, un ejercicio completo para preparar un tampón, una tabla de referencia y sus aplicaciones en farmacología y cromatografía.

## Equilibrio de disociación ácida y definición de pKa

Para un ácido monoprótico `HA` en agua, la transferencia protónica establece un equilibrio dinámico:

```text
HA(ac) + H₂O(l) ⇌ H₃O⁺(ac) + A⁻(ac)
```

Omitiendo la concentración constante del agua líquida (`55.5 M`), las ecuaciones de equilibrio son:

```text
Ka = ([H₃O⁺] × [A⁻]) / [HA]
pKa = −log₁₀(Ka)
Ka = 10^(−pKa)
```

- **`[HA]`:** concentración molar de la forma ácida protonada (`M`).
- **`[A⁻]`:** concentración molar de la base conjugada desprotonada (`M`).
- **`pKa`:** escala logarítmica invertida; un `pKa` **más bajo** indica un ácido **más fuerte**.

Para todo par conjugado `HA / A⁻` en agua a `25 °C` (`Kw = 1.00 × 10⁻¹⁴`), se cumple:

```text
Ka × Kb = Kw
pKa + pKb = 14.00   (a 25 °C)
```

### Ecuación de Henderson-Hasselbalch y punto de semiequivalencia

Al tomar logaritmos en la expresión de `Ka` se obtiene la ecuación de Henderson-Hasselbalch:

```text
pH = pKa + log₁₀([A⁻] / [HA])
```

Esta relación gobierna la especiación y el diseño de disoluciones tampón:

- A **`pH = pKa`**, se cumple `[A⁻] = [HA]` (`50 %` ionizado y máxima capacidad amortiguadora).
- A **`pH = pKa − 1`**, predomina la forma neutra `HA` en proporción `10 : 1` (`90.9 %`).
- A **`pH = pKa + 1`**, predomina la base conjugada `A⁻` en proporción `10 : 1` (`90.9 %`).

El intervalo eficaz de un tampón abarca **`pKa ± 1`**.

## Ejemplo práctico paso a paso: del valor de `Ka` al diseño de un tampón

Considere el ácido láctico (`CH₃CH(OH)COOH`), cuya constante experimental a `25 °C` es `Ka = 1.38 × 10⁻⁴`.

### Parte 1: Obtener `pKa` y las constantes del ion lactato conjugado

```text
pKa = −log₁₀(1.38 × 10⁻⁴) = −(0.13988 − 4) = 3.860 ≈ 3.86
pKb = 14.00 − 3.86 = 10.14
Kb = 10^(−10.14) = 7.24 × 10⁻¹¹
```

### Parte 2: Diseñar un tampón de `pH = 4.16` y evaluar su estado en sangre (`pH = 7.40`)

1. **Razón molar necesaria para `pH = 4.16`:**

```text
4.16 = 3.86 + log₁₀([Lactato⁻] / [Ácido láctico])
log₁₀([Lactato⁻] / [Ácido láctico]) = 0.30
[Lactato⁻] / [Ácido láctico] = 10^(0.30) ≈ 2.00
```

Mezclar `2` moles de lactato sódico por cada `1` mol de ácido láctico fija el pH en `4.16`.

2. **Ionización a `pH = 7.40` (sangre arterial):**

```text
log₁₀([Lactato⁻] / [Ácido láctico]) = 7.40 − 3.86 = 3.54
[Lactato⁻] / [Ácido láctico] = 10^(3.54) ≈ 3,467 : 1
```

A `pH` fisiológico, más del `99.97 %` circula como ion lactato desprotonado.

## Tabla de referencia de valores de `Ka` y `pKa` (`25 °C`)

| Especie ácida | Fórmula | `Ka` (`25 °C`) | `pKa` | Base conjugada | Fuerza en agua |
| :--- | :--- | :---: | :---: | :--- | :--- |
| Ácido clorhídrico | `HCl` | `~2.0 × 10⁶` | `−6.30` | `Cl⁻` | Muy fuerte (total) |
| Ácido sulfúrico (`pKa₁`) | `H₂SO₄` | `~1.0 × 10³` | `−3.00` | `HSO₄⁻` | Fuerte (1.ᵉʳ protón) |
| Ácido fosfórico (`pKa₁`) | `H₃PO₄` | `7.11 × 10⁻³` | `2.15` | `H₂PO₄⁻` | Moderadamente fuerte |
| Ácido fórmico | `HCOOH` | `1.80 × 10⁻⁴` | `3.74` | `HCOO⁻` | Débil |
| Ácido acético | `CH₃COOH` | `1.75 × 10⁻⁵` | `4.76` | `CH₃COO⁻` | Débil estándar |
| Dihidrógenofosfato (`pKa₂`) | `H₂PO₄⁻` | `6.32 × 10⁻⁸` | `7.20` | `HPO₄²⁻` | Tampón fisiológico |
| Ion amonio | `NH₄⁺` | `5.62 × 10⁻¹⁰` | `9.25` | `NH₃` | Muy débil |

## Aplicaciones en farmacología, bioquímica y errores frecuentes

El `pKa` determina el comportamiento molecular en química médica y analítica:

- **Farmacocinética (ADME):** los fármacos atraviesan membranas lipídicas por difusión pasiva principalmente en su forma neutra no ionizada. Los ácidos débiles (`pKa ≈ 3.5–4.5`) predominan en estado neutro en el estómago (`pH 1.5–2.0`), mientras que las bases débiles (`pKa ≈ 8–9`) aumentan su fracción no ionizada y se absorben mejor en el intestino delgado (`pH 6.8–7.4`).
- **Cromatografía líquida (HPLC):** ajustar el pH de la fase móvil al menos `1.5–2.0` unidades por encima o por debajo del `pKa` del analito garantiza una única especie predominante y evita el desdoblamiento o ensanchamiento asimétrico de picos cromatográficos.
- **Proteómica y punto isoeléctrico (`pI`):** las cadenas laterales ionizables de los aminoácidos (carboxilos, aminas y el anillo imidazol de la histidina con `pKa ≈ 6.0`) regulan la carga neta, la solubilidad y la catálisis enzimática.

### Errores frecuentes y advertencias metodológicas

1. **Trasladar `pKa` acuosos a disolventes orgánicos:** la menor constante dieléctrica de disolventes como DMSO o acetonitrilo eleva drásticamente el `pKa` (el ácido acético pasa de `4.76` en agua a `12.6` en DMSO).
2. **Olvidar el efecto nivelador del agua:** ningún ácido con `pKa < −1.74` muestra diferencias de acidez en agua diluida porque todos transfieren su protón al `H₃O⁺` por completo.
3. **Aplicar Henderson-Hasselbalch a ácidos fuertes o concentraciones `< 10⁻⁵ M`:** en esos regímenes falla la simplificación de equilibrio.
4. **Confundir el `pKa` de `BH⁺` con `pKb`:** en aminas suele tabularse el `pKa` de su ácido conjugado; verifique siempre la especie referenciada.
