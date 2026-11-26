---
title: "Calculadora de pOH: El Inverso del pH"
description: "Guía técnica sobre la escala de pOH: cálculo a partir de [OH⁻], relación inversa pH + pOH = pKw, efecto de la temperatura, ejemplos resueltos y uso en disoluciones alcalinas."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "poh-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué un valor de pOH bajo indica una disolución fuertemente básica?"
    answer: "Porque el pOH aplica el logaritmo decimal negativo a la concentración de iones hidróxido: pOH = −log₁₀([OH⁻]). Cuando la concentración de [OH⁻] aumenta hasta 0.1 M, el logaritmo resulta −1 y su negativo es pOH 1.0. Así, cuanto menor es el pOH, mayor es la alcalinidad del medio."
  - question: "¿La relación pH + pOH = 14 se cumple a cualquier temperatura?"
    answer: "No. La suma exacta es pH + pOH = pKw, que solo equivale a 14.00 a 25 °C (298.15 K). Como la autoionización del agua absorbe calor, a 0 °C pKw sube a 14.94 y a 50 °C baja a 13.26, desplazando tanto el punto neutro como la suma de pH y pOH."
  - question: "¿Cómo se calcula el pOH de bases fuertes con dos grupos hidróxido como Ca(OH)₂ o Ba(OH)₂?"
    answer: "Debe multiplicarse la molaridad inicial por el factor estequiométrico de disociación. Si Ba(OH)₂ 0.015 M se disocia por completo, cada mol libera dos moles de OH⁻, generando [OH⁻] = 0.030 M. Omitir este factor subestima la alcalinidad en 0.301 unidades logarítmicas."
  - question: "¿Cuál es el pOH del agua pura a 37 °C, la temperatura corporal humana?"
    answer: "A 37 °C, la constante iónica del agua Kw asciende aproximadamente a 2.40 × 10⁻¹⁴, por lo que pKw = 13.62. En agua pura neutra se cumple [H⁺] = [OH⁻], lo que sitúa tanto el pH como el pOH de neutralidad en 6.81 en lugar de 7.00."
  - question: "¿Cuándo es necesario usar la ecuación exacta del agua para hallar el pOH de una base?"
    answer: "Cuando la concentración analítica de una base fuerte es inferior a 10⁻⁶ M (por ejemplo, NaOH 1.0 × 10⁻⁷ M). Sin considerar la autoionización del agua se obtendría pOH 7.00, cuando el balance de cargas real arroja [OH⁻] = 1.618 × 10⁻⁷ M, es decir, pOH = 6.79 y pH = 7.21."
---

El **pOH** (*potencial de hidróxido*) mide directamente la alcalinidad de una disolución acuosa a partir de la concentración molar de iones hidróxido (`[OH⁻]`). Funciona como el complemento inverso del pH: a `25 °C`, valores de `pOH < 7.00` corresponden a disoluciones básicas y valores de `pOH > 7.00` identifican medios ácidos.

Con nuestra [Calculadora de pOH](/es/calculadoras/calculadora-de-poh) puede convertir al instante `[OH⁻]`, `[H⁺]` o `pH` en su `pOH` exacto. Esta guía detalla las ecuaciones termodinámicas del agua, el cálculo paso a paso para bases dipróticas y débiles, una tabla comparativa de referencia y las precauciones térmicas y analíticas clave.

## Ecuaciones fundamentales y relación con el producto iónico del agua

El `pOH` se define como el logaritmo decimal negativo de la concentración molar de iones hidróxido (`mol/L` o `M`):

```text
pOH = −log₁₀([OH⁻])
[OH⁻] = 10^(−pOH)
```

En cualquier disolución acuosa en equilibrio se cumple la constante de autoionización del agua (`2 H₂O ⇌ H₃O⁺ + OH⁻`):

```text
Kw = [H⁺] × [OH⁻]
pKw = −log₁₀(Kw) = pH + pOH
```

A `25 °C` (`298.15 K`), `Kw = 1.00 × 10⁻¹⁴` y `pKw = 14.00`, estableciendo la relación estándar:

```text
pH + pOH = 14.00   (a 25 °C)
```

- **Medio básico:** `[OH⁻] > 1.00 × 10⁻⁷ M` (`pOH < 7.00` y `pH > 7.00`).
- **Medio neutro (`25 °C`):** `[OH⁻] = [H⁺] = 1.00 × 10⁻⁷ M` (`pOH = pH = 7.00`).
- **Medio ácido:** `[OH⁻] < 1.00 × 10⁻⁷ M` (`pOH > 7.00` y `pH < 7.00`).

### Bases fuertes monopróticas, dipróticas y bases débiles

Según la naturaleza química de la base de concentración nominal `C_b`:

1. **Bases fuertes monopróticas** (`NaOH`, `KOH`, `LiOH`): se disocian al `100 %`, con `[OH⁻] = C_b`.
2. **Bases alcalinotérreas solubles** (`Ba(OH)₂`, `Sr(OH)₂`, `Ca(OH)₂` diluido): aportan dos iones por mol, cumpliéndose `[OH⁻] = 2 × C_b`.
3. **Bases débiles** (`NH₃`, aminas): responden a su constante `Kb = ([BH⁺] × [OH⁻]) / [B]`. Si `C_b / Kb ≥ 400`, aplica:

```text
[OH⁻] ≈ √(Kb × C_b)
```

## Ejemplo práctico paso a paso: base diprótica y base débil

A continuación se resuelven dos casos típicos a `25 °C`.

### Escenario A: Hidróxido de bario (`Ba(OH)₂`) `0.015 M`

1. **Aplicar estequiometría:** cada mol de `Ba(OH)₂` libera `2` moles de `OH⁻`.
2. **Calcular `[OH⁻]`, `pOH` y `pH`:**

```text
[OH⁻] = 2 × 0.015 M = 0.030 M
pOH = −log₁₀(0.030) = −(0.47712 − 2) = 1.523 ≈ 1.52
pH = 14.00 − 1.52 = 12.48
```

### Escenario B: Amoníaco acuoso (`NH₃`) `0.20 M` (`Kb = 1.8 × 10⁻⁵`)

1. **Verificar criterio:** `C_b / Kb = 0.20 / (1.8 × 10⁻⁵) = 11,111 ≥ 400` (válido).
2. **Calcular `[OH⁻]`, `pOH` y grado de ionización:**

```text
[OH⁻] = √(1.8 × 10⁻⁵ × 0.20) = √(3.6 × 10⁻⁶) = 1.8974 × 10⁻³ M
pOH = −log₁₀(1.8974 × 10⁻³) = 2.722 ≈ 2.72
pH = 14.00 − 2.72 = 11.28
Ionización (%) = (1.8974 × 10⁻³ / 0.20) × 100 = 0.95 %
```

## Tabla comparativa de escala pOH, pH y concentraciones (`25 °C`)

| Disolución de referencia | `[OH⁻]` (M) | pOH | pH | `[H⁺]` (M) | Régimen |
| :--- | :---: | :---: | :---: | :---: | :--- |
| Sosa cáustica (`NaOH 1.0 M`) | `1.00` | `0.00` | `14.00` | `1.00 × 10⁻¹⁴` | Base fuerte concentrada |
| Limpiador amoniacal | `1.00 × 10⁻²` | `2.00` | `12.00` | `1.00 × 10⁻¹²` | Alcalino intenso |
| Leche de magnesia saturada | `3.16 × 10⁻⁴` | `3.50` | `10.50` | `3.16 × 10⁻¹¹` | Base poco soluble |
| Bicarbonato sódico (`0.10 M`) | `2.00 × 10⁻⁶` | `5.70` | `8.30` | `5.01 × 10⁻⁹` | Base débil tamponada |
| Agua pura (`25 °C`) | `1.00 × 10⁻⁷` | `7.00` | `7.00` | `1.00 × 10⁻⁷` | Neutralidad exacta |
| Agua de lluvia (`CO₂`) | `3.98 × 10⁻⁹` | `8.40` | `5.60` | `2.51 × 10⁻⁶` | Ligeramente ácido |
| Ácido clorhídrico (`0.10 M`) | `1.00 × 10⁻¹³` | `13.00` | `1.00` | `1.00 × 10⁻¹` | Ácido fuerte |

## Aplicaciones industriales, errores frecuentes y variaciones térmicas

El seguimiento directo de `[OH⁻]` y del `pOH` resulta indispensable cuando el ion hidróxido dirige el proceso químico:

- **Limpieza CIP alimentaria y farmacéutica:** disoluciones de `NaOH` al `1–2 %` (`pOH ≈ 0.3–0.6`) saponifican lípidos y desnaturalizan biopelículas proteicas sin dañar sellos poliméricos compatibles ni juntas sanitarias de acero inoxidable.
- **Tratamiento de aguas y precipitación metálica:** ajustar `[OH⁻]` con dosificación automática permite precipitar selectivamente hidróxidos de metales pesados (`Fe(OH)₃`, `Cu(OH)₂`, `Ni(OH)₂`) en efluentes industriales y controlar incrustaciones carbonatadas en calderas de vapor.
- **Síntesis y saponificación:** las cinéticas de hidrólisis alcalina de ésteres, amidas y triglicéridos dependen directamente de la concentración de `[OH⁻]` disponible en el medio de reacción.

### Errores frecuentes y advertencias térmicas

1. **Asumir `pH + pOH = 14.00` fuera de `25 °C`:** a `50 °C`, `pKw = 13.26` (neutralidad en `6.63`), y a `100 °C`, `pKw = 12.26` (neutralidad en `6.13`). A `100 °C`, un agua con `pH 6.80` es alcalina (`pOH = 5.46`).
2. **Invertir la escala:** confundir un `pOH` alto (`pOH = 11`) con basicidad alta, cuando en realidad corresponde a un medio ácido (`pH = 3`).
3. **Ignorar el límite de solubilidad de `Ca(OH)₂`:** su bajo producto de solubilidad (`Kps ≈ 5.5 × 10⁻⁶`) impide preparar disoluciones homogéneas mucho mayores de `0.02 M`.
4. **Error sódico en electrodos de vidrio:** por debajo de `pOH 1.5` (`pH > 12.5`) en presencia de `Na⁺`, los sensores convencionales subestiman el pH real y sobreestiman el `pOH`.
