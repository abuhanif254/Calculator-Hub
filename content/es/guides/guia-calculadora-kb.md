---
title: "Calculadora de Kb: Constante de Disociación Básica"
description: "Guía técnica sobre la constante de disociación básica (Kb) y el pKb: equilibrio de bases débiles, relación Ka × Kb = Kw, ejemplo resuelto paso a paso y tabla comparativa."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "kb-calculator"
faqs:
  - question: "¿Por qué la fórmula de Kb incluye la base y su ácido conjugado tras reaccionar con el agua?"
    answer: "Según la teoría de Brønsted-Lowry, las bases débiles como el amoníaco o las aminas orgánicas no liberan iones OH⁻ directamente de su estructura, sino que aceptan un protón de una molécula de agua. Al hacerlo generan su ácido conjugado (BH⁺) y dejan libre un ion hidróxido (OH⁻), estableciendo un equilibrio cuantificado por Kb."
  - question: "¿Cómo se convierte el Kb de una base débil en el Ka de su ácido conjugado?"
    answer: "Para cualquier par ácido-base conjugado en disolución acuosa, el producto de sus constantes es igual al producto iónico del agua (Ka × Kb = Kw). A 25 °C (Kw = 1.00 × 10⁻¹⁴), basta dividir 1.00 × 10⁻¹⁴ entre Kb para obtener Ka, o restar pKb de 14.00 para hallar pKa."
  - question: "¿Por qué la relación pKa + pKb = 14.00 no es exacta a 37 °C?"
    answer: "La constante del agua Kw es endotérmica y aumenta con la temperatura: a 25 °C vale 1.00 × 10⁻¹⁴ (pKw = 14.00), pero a la temperatura corporal de 37 °C asciende a 2.42 × 10⁻¹⁴ (pKw = 13.62). Por tanto, a 37 °C debe cumplirse pKa + pKb = 13.62 y el pH neutro del agua pura es 6.81."
  - question: "¿Qué indica un valor de pKb bajo frente a un valor de pKb alto?"
    answer: "Dado que pKb = −log₁₀(Kb), un pKb pequeño corresponde a una constante Kb grande y a una base más fuerte dentro del grupo de las bases débiles. Por ejemplo, la dietilamina (pKb = 3.02) capta protones con mucha mayor facilidad que la anilina (pKb = 9.13)."
  - question: "¿Cuándo falla la aproximación simplificada [OH⁻] = √(Kb × C₀)?"
    answer: "Falla cuando el grado de protonación de la base supera el 5 % de su concentración inicial C₀ (habitualmente en bases moderadamente fuertes o disoluciones muy diluidas). En ese escenario es obligatorio resolver la ecuación cuadrática completa [OH⁻]² + Kb × [OH⁻] − Kb × C₀ = 0."
---

La **constante de disociación básica (`Kb`)** mide la capacidad de una base débil para captar protones del agua y producir iones hidróxido (`OH⁻`) en equilibrio. Cuanto mayor es `Kb` —y menor su cologaritmo `pKb`—, más alcalina resulta la disolución a igualdad de concentración molar.

A diferencia de las bases fuertes como el `NaOH`, que se disocian completamente, las bases débiles como el amoníaco, las aminas y los alcaloides farmacéuticos solo se protonan de forma parcial. Nuestra [Calculadora de Kb](/es/calculadoras/calculadora-de-kb) obtiene `Kb`, `pKb` y la constante conjugada `Ka` a partir del pH o de concentraciones de equilibrio. Esta guía explica su formulación, el vínculo con `Kw`, un caso numérico resuelto y una tabla de referencia.

## Ecuación de equilibrio, pKb y relación con Ka y Kw

Según el modelo de Brønsted-Lowry, una base débil (`B`) reacciona reversiblemente con el agua generando su ácido conjugado (`BH⁺`) y `OH⁻`:

```text
B(ac) + H₂O(l) ⇌ BH⁺(ac) + OH⁻(ac)
Kb = ([BH⁺] × [OH⁻]) / [B]
pKb = −log₁₀(Kb)
```

Donde cada variable representa:

- **`[BH⁺]`:** molaridad en equilibrio del ácido conjugado protonado (`mol/L`). En disoluciones puras de base débil monoprótica, `[BH⁺] ≈ [OH⁻]`.
- **`[OH⁻]`:** molaridad en equilibrio de iones hidróxido (`10^(−pOH)`, en `mol/L`).
- **`[B]`:** molaridad en equilibrio de la base libre (`C₀ − [OH⁻]`, en `mol/L`).

### Relación con Ka y el producto iónico del agua (Kw)

Para cualquier par ácido-base conjugado en medio acuoso, sus constantes están vinculadas por el equilibrio de autoionización del agua:

```text
Ka × Kb = Kw = [H⁺] × [OH⁻]
pKa + pKb = pKw
```

A `25 °C` (`298.15 K`), `Kw = 1.00 × 10⁻¹⁴` y `pKw = 14.00`, lo que permite relacionar `pH = 14.00 − pOH` y convertir `pKa` tabulados en `pKb`. Asimismo, el porcentaje de protonación y la solución cuadrática exacta son:

```text
% protonación = ([OH⁻] / C₀) × 100
[OH⁻] = [ −Kb + √(Kb² + 4 × Kb × C₀) ] / 2
```

## Ejemplo resuelto: constante Kb de la metilamina desde el pH

Una disolución acuosa `0.150 M` de metilamina (`CH₃NH₂`) a `25 °C` registra un pH de `11.89`. Calcule `Kb`, `pKb`, el porcentaje de protonación y el `Ka` del ácido conjugado (`CH₃NH₃⁺`).

### Paso 1: obtener `pOH` y `[OH⁻]`

A `25 °C` (`pKw = 14.00`):

```text
pOH = 14.00 − 11.89 = 2.11
[OH⁻] = 10^(−2.11) = 7.762 × 10⁻³ M = 0.007762 M
```

### Paso 2: establecer concentraciones de equilibrio

En `CH₃NH₂(ac) + H₂O(l) ⇌ CH₃NH₃⁺(ac) + OH⁻(ac)`, la contribución de `OH⁻` del agua (`1.0 × 10⁻⁷ M`) es despreciable:

- `[CH₃NH₃⁺] = [OH⁻] = 7.762 × 10⁻³ M`
- `[CH₃NH₂]_eq = 0.150 − 0.007762 = 0.1422 M`

### Paso 3: calcular `Kb` y `pKb`

```text
Kb = (7.762 × 10⁻³)² / 0.1422 = (6.025 × 10⁻⁵) / 0.1422 = 4.237 × 10⁻⁴ ≈ 4.24 × 10⁻⁴
pKb = −log₁₀(4.237 × 10⁻⁴) = 3.373 ≈ 3.37
```

### Paso 4: hallar `Ka`, `pKa` conjugado y porcentaje de protonación

```text
Ka(CH₃NH₃⁺) = (1.00 × 10⁻¹⁴) / (4.237 × 10⁻⁴) = 2.36 × 10⁻¹¹
pKa(CH₃NH₃⁺) = 14.00 − 3.37 = 10.63
% protonación = (0.007762 / 0.150) × 100 = 5.17 %
```

Como el porcentaje de protonación (`5.17 %`) supera el umbral del `5 %`, despreciar `−[OH⁻]` en el denominador habría arrojado `4.02 × 10⁻⁴`, un error por defecto del `5.2 %`. Este caso demuestra por qué conviene evitar atajos algebraicos cuando se trabaja con aminas alifáticas moderadamente básicas o cuando la concentración inicial desciende por debajo de `0.10 M`.

De igual modo, si se quisiera predecir el pH de una disolución acuosa de cloruro de metilamonio (`CH₃NH₃Cl`) de idéntica concentración molar (`0.150 M`) a la misma temperatura, bastaría utilizar el `Ka` conjugado obtenido (`2.36 × 10⁻¹¹`) en la ecuación de equilibrio ácido para comprobar su carácter levemente ácido. La relación inversa entre `Ka` y `Kb` asegura además que cuanto más fuerte sea la metilamina como base aceptora en disolución, más débil será el ion metilamonio como dador de protones en medio acuoso.

## Tabla comparativa de bases débiles habituales a 25 °C

Bases ordenadas de mayor a menor basicidad en disolución acuosa:

| Base débil | Fórmula | Ácido conjugado | `Kb` (25 °C) | `pKb` | `pKa` conjugado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Dietilamina | `(C₂H₅)₂NH` | `(C₂H₅)₂NH₂⁺` | `9.55 × 10⁻⁴` | `3.02` | `10.98` |
| Metilamina | `CH₃NH₂` | `CH₃NH₃⁺` | `4.27 × 10⁻⁴` | `3.37` | `10.63` |
| Amoníaco | `NH₃` | `NH₄⁺` | `1.78 × 10⁻⁵` | `4.75` | `9.25` |
| Hidracina (`Kb₁`) | `N₂H₄` | `N₂H₅⁺` | `1.26 × 10⁻⁶` | `5.90` | `8.10` |
| Hidroxilamina | `NH₂OH` | `NH₃OH⁺` | `8.71 × 10⁻⁹` | `8.06` | `5.94` |
| Piridina | `C₅H₅N` | `C₅H₅NH⁺` | `1.70 × 10⁻⁹` | `8.77` | `5.23` |
| Anilina | `C₆H₅NH₂` | `C₆H₅NH₃⁺` | `7.41 × 10⁻¹⁰` | `9.13` | `4.87` |

## Usos prácticos, errores frecuentes y advertencias experimentales

### Aplicaciones principales

- **Extracción líquido-líquido:** permite separar aminas orgánicas formando sales hidrosolubles en fase acuosa a pH ácido y recuperando luego la base libre al alcalinizar por encima de su `pKa` característico.
- **Acuicultura y aguas residuales:** controla el equilibrio entre amoníaco libre tóxico (`NH₃`) e ion amonio (`NH₄⁺`), que se desplaza rápidamente hacia el gas tóxico al subir tanto el pH como la temperatura ambiente.
- **Formulación farmacéutica:** determina la solubilidad y absorción celular de anestésicos locales y otros principios activos básicos.

### Errores frecuentes en el laboratorio

1. **Asumir `pKa + pKb = 14.00` fuera de 25 °C:** a `0 °C`, `pKw = 14.94`, y a `37 °C`, `pKw = 13.62`; utilice siempre el `Kw` de la temperatura de trabajo.
2. **Confundir `pKa` del ácido conjugado con `pKb`:** las tablas bioquímicas suelen publicar el `pKa` de `BH⁺`; conviértalo mediante `pKb = pKw − pKa`.
3. **Omitir volatilidad y carbonatación:** las aminas ligeras y el amoníaco se evaporan y absorben `CO₂` atmosférico si no se conservan herméticamente.
4. **Olvidar bases aniónicas de sales:** en sales como `CH₃COONa` o `KCN`, el ion básico es el anión conjugado, cuyo `Kb` se deduce de `Kw / Ka`.
