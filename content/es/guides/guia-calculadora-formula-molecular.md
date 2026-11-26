---
title: "Fórmula Molecular: Encontrando el Compuesto Real"
description: "Guía técnica para calcular la fórmula molecular a partir de la fórmula empírica y la masa molar experimental: cálculo del factor entero n, espectrometría de masas e isomería."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molecular-formula-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la fórmula empírica no basta por sí sola para identificar una molécula?"
    answer: "Porque múltiples compuestos reales con masas molares completamente distintas pueden compartir exactamente la misma proporción mínima de átomos. Por ejemplo, el formaldehído (CH₂O, 30.03 g/mol), el ácido acético (C₂H₄O₂, 60.05 g/mol) y la glucosa (C₆H₁₂O₆, 180.16 g/mol) presentan idéntica fórmula empírica (CH₂O), pero solo el factor multiplicador entero revela de qué compuesto se trata."
  - question: "¿Cómo se obtiene en el laboratorio la masa molar real necesaria para este cálculo?"
    answer: "El método moderno de referencia es la espectrometría de masas de alta resolución (HRMS), que determina la relación masa/carga del ion molecular [M]⁺ o protonado [M+H]⁺ con precisión de partes por millón. En gases volátiles y solutos simples también se emplean la densidad de vapor (ecuación de gases ideales) o propiedades coligativas como el descenso crioscópico."
  - question: "¿Qué ocurre si al dividir la masa molar real entre la masa empírica no se obtiene un entero exacto?"
    answer: "Debido a la incertidumbre experimental de la medición de masa molar y al uso de pesos atómicos promedio, el cociente n suele arrojar valores como 5.96 o 6.03. Siempre que la desviación sea pequeña (inferior al 2 %–3 %), debe redondearse al entero positivo más próximo (n = 6). Una desviación mayor sugiere contaminación de la muestra o una fórmula empírica incorrecta."
  - question: "¿Conocer la fórmula molecular permite distinguir entre isómeros?"
    answer: "No. La fórmula molecular indica únicamente cuántos átomos de cada elemento integran la molécula, pero no revela su ordenamiento espacial ni sus grupos funcionales. Tanto el ácido acético (CH₃COOH) como el formiato de metilo (HCOOCH₃) tienen fórmula molecular C₂H₄O₂; para diferenciarlos se requieren técnicas espectroscópicas como RMN o infrarrojo."
  - question: "¿Cuál es la diferencia entre masa molar promedio y masa monoisotópica al usar espectrometría de masas?"
    answer: "La masa molar promedio (como C = 12.011 g/mol) pondera la abundancia natural de todos los isótopos estables de un elemento y es la utilizada en estequiometría clásica. La masa monoisotópica suma exclusivamente la masa exacta del isótopo más abundante de cada átomo (¹²C = 12.0000 Da, ¹H = 1.007825 Da, ¹⁶O = 15.994915 Da), criterio imprescindible en espectrometría de masas de alta resolución."
---

La **fórmula molecular** indica el número real y exacto de átomos de cada elemento presentes en una molécula discreta. Mientras la fórmula empírica muestra únicamente la razón estequiométrica mínima, la fórmula molecular describe la unidad estructural auténtica de cualquier sustancia covalente.

Toda fórmula molecular equivale a un múltiplo entero positivo (`n ≥ 1`) de su fórmula empírica, por lo que su determinación exige medir de manera independiente la **masa molar real** del compuesto. Para obtener el factor multiplicador y la fórmula definitiva al instante, utilice nuestra [Calculadora de Fórmula Molecular](/es/calculadoras/calculadora-de-formula-molecular).

## Relación Matemática y Parámetros Necesarios

Ambas fórmulas se vinculan mediante un número entero positivo `n`:

```text
Fórmula Molecular = (Fórmula Empírica)_n
```

Primero se calcula la **masa molar empírica** (`M_empírica`) sumando los aportes atómicos de la unidad mínima, y después se divide la masa molar experimental (`M_real`, en `g/mol` o `Da`) entre dicho valor:

```text
M_empírica = Σ (subíndice_empírico_i × M_atómica_i)
n = M_real / M_empírica
Subíndice_molecular_i = n × Subíndice_empírico_i
```

Cuando `n = 1`, ambas fórmulas coinciden (`H₂O`, `CH₄`, `CO₂`). Para `n ≥ 2`, la molécula agrupa múltiples unidades empíricas en una sola estructura covalente.

En el laboratorio, `M_real` se obtiene por tres vías principales:
* **Espectrometría de masas (HRMS):** mide la relación masa/carga del ion molecular intacto con error inferior a partes por millón.
* **Densidad de vapor:** en gases ideales volátiles, `M = (d × R × T) / P` relaciona la densidad `d` (`g/L`) con presión y temperatura.
* **Propiedades coligativas:** el descenso crioscópico (`ΔT_c = K_c × m_molal`) o la osmometría (`Π = M_molar × R × T`) permiten estimar masas molares de solutos y macromoléculas.

## Ejemplo Resuelto: De `CH₂O` a Glucosa y Ácido Acético

Suponga que dos muestras distintas comparten la fórmula empírica **`CH₂O`**. Un espectrómetro de masas mide `M_real_A = 180.16 g/mol` para la Muestra A y `M_real_B = 60.05 g/mol` para la Muestra B.

### Paso 1: Calcular la Masa Molar Empírica de `CH₂O`

Con masas atómicas estándar (`C = 12.011`, `H = 1.008`, `O = 15.999 g/mol`):

```text
M_empírica(CH₂O) = 12.011 + (2 × 1.008) + 15.999 = 30.026 g/mol
```

### Paso 2: Determinar el Factor Entero `n`

```text
n_A = 180.16 / 30.026 = 6.000 → n = 6
n_B = 60.05  / 30.026 = 2.000 → n = 2
```

*(Si una técnica menos exacta como la densidad de vapor arroja `178 g/mol` para la Muestra A, `178 / 30.026 = 5.93` se redondea al entero `n = 6`, cuya masa teórica es `180.156 g/mol`)*.

### Paso 3: Multiplicar los Subíndices Empíricos

* **Muestra A (`n = 6`):** `C_(1×6) H_(2×6) O_(1×6)` → **`C₆H₁₂O₆`** (hexosa, como la glucosa o la fructosa).
* **Muestra B (`n = 2`):** `C_(1×2) H_(2×2) O_(1×2)` → **`C₂H₄O₂`** (ácido acético o formiato de metilo).

### Verificación Alternativa Mediante Densidad de Vapor

Cuando no se dispone de un espectrómetro de masas para un líquido volátil cuya fórmula empírica es `CH₂O`, puede estimarse `M_real` midiendo su densidad en fase vapor. Si el vapor presenta una densidad `d = 1.96 g/L` a `100 °C` (`373.15 K`) y `1.00 atm`, la ley de los gases ideales arroja:

```text
M_real = (d × R × T) / P = (1.96 × 0.082057 × 373.15) / 1.00 = 60.01 g/mol
```

Al dividir `60.01 / 30.026 = 1.999`, se confirma sin ambigüedad `n = 2` y la fórmula molecular `C₂H₄O₂`.

## Comparativa de Compuestos con Igual Fórmula Empírica

Una misma proporción elemental genera familias químicas con propiedades físicas y reactividad completamente distintas según el valor de `n`.

| Fórmula Empírica | Masa Empírica (`g/mol`) | Factor (`n`) | Masa Molar Real (`g/mol`) | Fórmula Molecular | Compuesto Representativo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CH₂O` | `30.026` | `1` | `30.03` | `CH₂O` | Formaldehído (metanal) |
| `CH₂O` | `30.026` | `2` | `60.05` | `C₂H₄O₂` | Ácido acético |
| `CH₂O` | `30.026` | `3` | `90.08` | `C₃H₆O₃` | Ácido láctico |
| `CH₂O` | `30.026` | `6` | `180.16` | `C₆H₁₂O₆` | Glucosa |
| `CH` | `13.019` | `2` | `26.04` | `C₂H₂` | Acetileno (etino) |
| `CH` | `13.019` | `6` | `78.11` | `C₆H₆` | Benceno |
| `NO₂` | `46.005` | `2` | `92.01` | `N₂O₄` | Tetraóxido de dinitrógeno |

## Aplicaciones, Limitaciones Estructurales e Isomería

La confirmación de la fórmula molecular es indispensable en descubrimiento de fármacos, metabolómica, toxicología forense y control de calidad petroquímico. En espectrometría HRMS, medir la masa exacta de un compuesto desconocido con una tolerancia de `±5 ppm` (partes por millón) permite filtrar las combinaciones posibles de `C`, `H`, `N`, `O`, `S` y halógenos hasta proponer una fórmula molecular inequívoca antes de iniciar la elucidación estructural completa. En ciencia de polímeros, permite además distinguir oligómeros de bajo peso molecular frente a cadenas macromoleculares formadas por la repetición de una misma unidad monomérica.

Conviene considerar tres límites técnicos fundamentales para evitar interpretaciones erróneas:

1. **Isomería constitucional y estereoisomería:** La fórmula molecular no revela la conectividad entre átomos ni su geometría tridimensional. Una misma fórmula como `C₂H₄O₂` corresponde tanto al ácido acético (`CH₃COOH`, ácido carboxílico polar) como al formiato de metilo (`HCOOCH₃`, éster volátil), mientras `C₆H₁₂O₆` agrupa decenas de isómeros como la D-glucosa, la D-fructosa y la D-galactosa. Distinguir isómeros exige espectroscopía de resonancia magnética nuclear (RMN), infrarrojo (FTIR) o difracción de rayos X.
2. **Sólidos no moleculares:** Las redes iónicas (`NaCl`, `CaCO₃`), los metales y los sólidos covalentes reticulares (`SiO₂`, diamante) carecen de moléculas discretas independientes; por lo tanto, no poseen masa molecular definida ni fórmula molecular, y se representan exclusivamente mediante su fórmula empírica.
3. **Masa promedio frente a masa monoisotópica:** En moléculas pequeñas (`< 300 Da`), los pesos atómicos promedio de la IUPAC bastan para hallar `n`. Sin embargo, en biomoléculas mayores (`> 500 Da`) o compuestos halogenados (`³⁵Cl`/`³⁷Cl`, `⁷⁹Br`/`⁸¹Br`), la distribución isotópica desplaza el pico espectral más intenso respecto al peso promedio; en HRMS debe compararse siempre el ion molecular observado contra la masa monoisotópica calculada.
