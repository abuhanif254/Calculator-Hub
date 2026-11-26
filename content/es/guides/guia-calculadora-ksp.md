---
title: "Calculadora de Ksp: Constante del Producto de Solubilidad"
description: "Guía técnica sobre la constante del producto de solubilidad (Ksp): relación con la solubilidad molar, cociente iónico Qsp, efecto del ion común, ejemplo resuelto y tabla de sales."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ksp-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué no puede compararse directamente el Ksp de dos sales con estequiometría distinta?"
    answer: "Porque el exponente al que se eleva la solubilidad molar (s) cambia con el número total de iones liberados. Una sal 1:1 sigue Ksp = s², mientras que una sal 1:2 sigue Ksp = 4s³. Por ello, una sal con Ksp ligeramente menor puede presentar una solubilidad molar mayor si genera tres o más iones por unidad fórmula; siempre debe compararse s y no Ksp en bruto."
  - question: "¿Qué diferencia existe entre Ksp y la solubilidad molar (s)?"
    answer: "El Ksp es una constante termodinámica adimensional (dependiente solo de la temperatura) que define el equilibrio entre el sólido y sus iones disueltos. La solubilidad molar (s), expresada en mol/L, indica cuántos moles de la sal se disuelven por litro de disolución saturada y puede disminuir drásticamente si hay un ion común presente, sin que cambie el Ksp."
  - question: "¿Cómo afecta el pH al producto de solubilidad de una sal?"
    answer: "Aunque el valor de Ksp no varía con el pH, la solubilidad efectiva sí lo hace cuando alguno de los iones tiene carácter ácido o básico. En hidróxidos metálicos como Fe(OH)₃ o en sales de aniones básicos como CaCO₃ y CaF₂, un pH ácido consume OH⁻ o protona el anión, reduciendo su concentración libre y desplazando el equilibrio hacia mayor disolución."
  - question: "¿Qué ocurre cuando el cociente iónico Qsp supera al valor de Ksp?"
    answer: "La disolución se encuentra sobresaturada con respecto a esa sal. Termodinámicamente el sistema es inestable y tenderá a formar un precipitado sólido, consumiendo iones disueltos hasta que Qsp descienda y vuelva a igualarse exactamente con el valor de Ksp correspondiente a esa temperatura."
  - question: "¿Por qué la concentración del sólido puro no aparece en la fórmula de Ksp?"
    answer: "Mientras exista una fase sólida pura en contacto con la disolución, su densidad y su actividad termodinámica permanecen constantes (actividad igual a 1), independientemente de que haya 1 gramo o 100 gramos de precipitado en el fondo del recipiente. Por ello, su contribución queda absorbida dentro de la propia constante Ksp."
---

Cuando una sal iónica poco soluble entra en contacto con agua pura, una pequeña fracción se disocia en iones hidratados hasta saturar la disolución. En ese punto, la velocidad de disolución del sólido iguala exactamente la de recristalización sobre el sólido remanente.

La **constante del producto de solubilidad (`Ksp`)** cuantifica ese límite termodinámico a una temperatura dada (por ejemplo, `1.77 × 10⁻¹⁰` para `AgCl`). La [Calculadora de Ksp](/es/calculadoras/calculadora-de-ksp) resuelve las relaciones algebraicas entre `Ksp`, la solubilidad molar (`s`) y el cociente iónico (`Qsp`).

## Principios estequiométricos y formulación del Ksp

Considere un electrolito sólido poco soluble de fórmula general que se disocia en disolución acuosa:

```text
MₐX_b(s) ⇌ a M^(b+)(ac) + b X^(a−)(ac)
```

Al omitir el sólido puro por tener actividad unitaria, la expresión de equilibrio queda determinada únicamente por el producto de las concentraciones molares de los iones en equilibrio, elevadas a sus coeficientes estequiométricos:

```text
Ksp = [M^(b+)]^a × [X^(a−)]^b
```

Donde `[M^(b+)]` y `[X^(a−)]` se expresan en `mol/L` (`M`). Si la sal se disuelve en agua pura sin interferencias externas y `s` representa su **solubilidad molar** (`mol/L`), las concentraciones iónicas serán `[M^(b+)] = a × s` y `[X^(a−)] = b × s`. Sustituyendo en la ecuación anterior resulta la relación general:

```text
Ksp = (a^a × b^b) × s^(a + b)
```

### Ecuaciones según el tipo estequiométrico

- **Sales `1:1` (ej. `AgCl`, `BaSO₄`):** `[M⁺] = s`, `[X⁻] = s`, por lo que `Ksp = s^2` y `s = Ksp^(1/2)`.
- **Sales `1:2` o `2:1` (ej. `PbI₂`, `Ag₂CrO₄`):** un ion tiene concentración `s` y el otro `2s`, de modo que `Ksp = s × (2s)^2 = 4 × s^3` y `s = (Ksp / 4)^(1/3)`.
- **Sales `1:3` o `3:1` (ej. `Fe(OH)₃`):** `Ksp = s × (3s)^3 = 27 × s^4`.
- **Sales `2:3` o `3:2` (ej. `Ca₃(PO₄)₂`):** `Ksp = (3s)^3 × (2s)^2 = 108 × s^5`.

### Cociente iónico (Qsp) y criterio de precipitación

Al mezclar dos disoluciones que aportan los iones constituyentes, se calcula el **producto iónico instantáneo (`Qsp`)** con la misma fórmula que `Ksp`, empleando las concentraciones iniciales tras la mezcla:

- **`Qsp < Ksp`:** disolución insaturada; no precipita sólido y puede disolverse más sal.
- **`Qsp = Ksp`:** equilibrio de saturación exacto.
- **`Qsp > Ksp`:** disolución sobresaturada; se produce precipitación hasta reducir los iones a `Qsp = Ksp`.

## Ejemplo numérico resuelto paso a paso

Determine la solubilidad molar (`s`) y la solubilidad en gramos por litro (`g/L`) del yoduro de plomo(II), `PbI₂` (masa molar `461.01 g/mol`), en agua pura a `25 °C`, sabiendo que su `Ksp = 8.5 × 10⁻⁹`. Después, evalúe cuánto cambia esa solubilidad en una disolución `0.10 M` de `NaI`.

**Paso 1: Escribir la ecuación de disociación y expresar las concentraciones en función de `s`.**

```text
PbI₂(s) ⇌ Pb²⁺(ac) + 2 I⁻(ac)
[Pb²⁺] = s        [I⁻] = 2s
```

**Paso 2: Sustituir en la expresión de `Ksp` y despejar `s`.**

```text
Ksp = [Pb²⁺] × [I⁻]^2 = s × (2s)^2 = 4s^3
8.5 × 10⁻⁹ = 4s^3
s^3 = (8.5 × 10⁻⁹) / 4 = 2.125 × 10⁻⁹
s = (2.125 × 10⁻⁹)^(1/3) ≈ 1.29 × 10⁻³ mol/L
```

**Paso 3: Convertir la solubilidad molar a solubilidad másica (`g/L`).**

```text
S_masa = 1.286 × 10⁻³ mol/L × 461.01 g/mol ≈ 0.593 g/L
```

**Paso 4: Evaluar el efecto del ion común en `NaI 0.10 M`.**

El `NaI` se disocia completamente aportando `[I⁻]_inicial = 0.10 M`. En presencia de este ion común, la contribución `2s` proveniente del `PbI₂` es despreciable frente a `0.10 M`, por lo que `[I⁻] ≈ 0.10 M`:

```text
8.5 × 10⁻⁹ = s' × (0.10)^2
s' = (8.5 × 10⁻⁹) / 0.010 = 8.5 × 10⁻⁷ mol/L
```

La adición de un ion común reduce la solubilidad del `PbI₂` más de `1,500` veces sin alterar en absoluto su `Ksp`.

## Tabla de referencia de sales poco solubles a 25 °C

| Compuesto | Estequiometría | Expresión algebraica | Ksp (25 °C) | Solubilidad molar (mol/L) |
| :--- | :--- | :--- | :--- | :--- |
| `AgCl` | `1:1` | `s^2` | `1.77 × 10⁻¹⁰` | `1.33 × 10⁻⁵` |
| `BaSO₄` | `1:1` | `s^2` | `1.08 × 10⁻¹⁰` | `1.04 × 10⁻⁵` |
| `CaF₂` | `1:2` | `4s^3` | `3.45 × 10⁻¹¹` | `2.05 × 10⁻⁴` |
| `Ag₂CrO₄` | `2:1` | `4s^3` | `1.12 × 10⁻¹²` | `6.54 × 10⁻⁵` |
| `Fe(OH)₃` | `1:3` | `27s^4` | `2.79 × 10⁻³⁹` | `1.01 × 10⁻¹⁰` |
| `Ca₃(PO₄)₂` | `3:2` | `108s^5` | `2.07 × 10⁻³³` | `1.14 × 10⁻⁷` |

Observe en la tabla cómo `Ag₂CrO₄` tiene un `Ksp` menor que `AgCl` (`1.12 × 10⁻¹²` frente a `1.77 × 10⁻¹⁰`), pero su solubilidad molar (`6.54 × 10⁻⁵ M`) es casi cinco veces superior debido al exponente cúbico.

## Aplicaciones prácticas, efecto del pH y errores habituales

El equilibrio de producto de solubilidad resulta esencial en el tratamiento de aguas para precipitar metales pesados, en el control de incrustaciones de `CaCO₃` y `CaSO₄` en calderas y membranas, en química analítica (precipitación fraccionada) y en medicina, donde explica la formación de cálculos renales (`CaC₂O₄`).

Entre los fallos de cálculo más comunes destacan:

1. **Omitir paréntesis en los exponentes:** escribir `2s^2` en lugar de `(2s)^2 = 4s^2` subestima `Ksp` por un factor de `2` (o de `9` en sales `1:3`).
2. **Comparar `Ksp` entre estequiometrías distintas:** solo es válido comparar `Ksp` directamente si ambas sales comparten idéntica relación catión-anión.
3. **Ignorar pH y complejación:** aniones básicos (`CO₃²⁻`, `F⁻`, `OH⁻`) se protonan en medio ácido y cationes forman complejos con ligandos como `NH₃`, elevando la solubilidad real.
4. **Despreciar la fuerza iónica:** en medios salinos concentrados, los coeficientes de actividad (`γ < 1`) incrementan ligeramente la solubilidad efectiva.
