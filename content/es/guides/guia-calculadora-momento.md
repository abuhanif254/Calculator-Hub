---
title: "Entendiendo el Momento: La Física de las Colisiones"
description: "Domine la ley de conservación del momento. Aprenda la diferencia entre colisiones elásticas e inelásticas, y use nuestra Calculadora de Momento."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "momentum-calculator"
faqs:
  - question: "¿Cuál es la diferencia física entre momento lineal e impulso mecánico?"
    answer: "El momento lineal (p = m × v) describe la cantidad de movimiento que posee un cuerpo en un instante, mientras que el impulso mecánico (J = F_media × Δt) mide el efecto de una fuerza neta aplicada durante un intervalo de tiempo. Según el teorema del impulso, el impulso neto iguala exactamente la variación del momento lineal (J = Δp)."
  - question: "¿Por qué el momento se conserva en las colisiones inelásticas aunque se pierda energía cinética?"
    answer: "Durante un choque sin fuerzas externas netas, las fuerzas internas entre ambos cuerpos son iguales y opuestas según la tercera ley de Newton y actúan idéntico tiempo, por lo que sus impulsos se cancelan y el momento total se mantiene intacto. La energía cinética macroscópica disminuye porque parte se convierte en deformación plástica, calor y sonido."
  - question: "¿Cómo se distingue una colisión elástica de una perfectamente inelástica mediante el coeficiente de restitución?"
    answer: "El coeficiente de restitución (e) relaciona la velocidad relativa de separación con la de acercamiento. Un valor e = 1 corresponde a una colisión perfectamente elástica (conserva energía cinética); 0 < e < 1 indica un choque parcialmente inelástico; y e = 0 define un choque perfectamente inelástico donde los cuerpos quedan acoplados."
  - question: "¿Un objeto de baja masa puede tener mayor momento lineal que otro mucho más pesado?"
    answer: "Sí. Como el momento es el producto de masa por velocidad, un cuerpo ligero muy rápido puede superar el momento de un cuerpo masivo y lento. Por ejemplo, una pelota de tenis de 0.058 kg a 55 m/s tiene un momento de 3.19 kg·m/s, superior al de un bloque de 3 kg desplazándose a 1 m/s (3.00 kg·m/s)."
  - question: "¿Cuándo deja de ser válida la fórmula clásica p = m × v y es necesario aplicar la relatividad?"
    answer: "La ecuación newtoniana mantiene excelente precisión en ingeniería y física cotidiana. Cuando la rapidez supera aproximadamente el 10 % de la velocidad de la luz en el vacío (unos 30,000 km/s), los efectos relativistas se vuelven significativos y debe emplearse el momento relativista p = γ × m × v, con γ = 1 / √(1 − v² / c²)."
---

Cuando un mosquito impacta contra un parabrisas a 10 km/h apenas produce efecto, mientras que una bola de boliche de 7 kg a la misma velocidad rompe el cristal de inmediato. Aunque la rapidez es idéntica, la bola concentra una cantidad de movimiento —denominada en física **momento lineal**— millones de veces superior, lo que determina la fuerza transferida en el impacto.

Para despejar al instante cualquiera de las tres variables fundamentales de la dinámica lineal (`p`, `m` o `v`) con unidades coherentes, utilice nuestra [Calculadora de Momento](/es/calculadoras/calculadora-de-momento). Esta guía abarca la ecuación del momento, el teorema del impulso, las colisiones elásticas e inelásticas, un caso vehicular paso a paso, una tabla comparativa y los límites clásicos.

## Ecuación del momento lineal, teorema del impulso y conservación

En mecánica clásica, el momento lineal (`p`) es una magnitud vectorial con igual dirección y sentido que la velocidad del cuerpo, y mide la dificultad para detenerlo o desviar su trayectoria.

### Definición vectorial y unidades del Sistema Internacional

La relación fundamental vincula la masa inercial con la velocidad instantánea:

```text
p = m × v
```

- **`p` (momento lineal):** se expresa en kilogramos metro por segundo (`kg·m/s`), equivalente al newton segundo (`N·s`).
- **`m` (masa):** se mide en kilogramos (`kg`).
- **`v` (velocidad):** se mide en metros por segundo (`m/s`), incluyendo signo positivo o negativo según el sentido elegido.

### Impulso mecánico y conservación en sistemas aislados

Cambiar el momento de un objeto exige aplicar una fuerza neta durante un lapso `Δt`. El teorema del impulso establece:

```text
J = F_media × Δt = Δp = m × (vf − vi)
```

Donde `J` es el impulso (`N·s`), `F_media` la fuerza media de contacto (`N`), y `vi` y `vf` las velocidades inicial y final. En un sistema aislado —sin fuerzas externas netas—, la **conservación del momento lineal** garantiza que el momento total antes y después del choque sea idéntico:

```text
m₁ × v₁ᵢ + m₂ × v₂ᵢ = m₁ × v₁f + m₂ × v₂f
```

Las colisiones se clasifican según la energía cinética (`Ec = 0.5 × m × v²`) y el coeficiente de restitución `e`:
- **Colisión elástica (`e = 1`):** conserva tanto el momento lineal como la energía cinética total (típica de partículas atómicas o bolas rígidas).
- **Colisión inelástica (`0 < e < 1`):** conserva el momento lineal, pero disipa energía cinética en calor y deformación.
- **Colisión perfectamente inelástica (`e = 0`):** ambos cuerpos quedan unidos y comparten velocidad final `vf = (m₁ × v₁ᵢ + m₂ × v₂ᵢ) / (m₁ + m₂)`.

## Ejemplo numérico resuelto: colisión inelástica y fuerza de impacto

Suponga un ensayo frontal donde un automóvil de `m₁ = 1,400 kg` avanza hacia el este a `v₁ᵢ = 20 m/s` (`72 km/h`) e impacta contra un vehículo detenido de `m₂ = 2,100 kg` (`v₂ᵢ = 0 m/s`). En un choque perfectamente inelástico (`e = 0`) con duración de contacto `Δt = 0.12 s`:

1. **Calcular el momento inicial total:**
   - `p_total_i = (1,400 × 20) + (2,100 × 0) = 28,000 kg·m/s`.
2. **Obtener la velocidad final conjunta:**
   - La masa acoplada total es `1,400 + 2,100 = 3,500 kg`.
   - `vf = 28,000 / 3,500 = 8.0 m/s` (`28.8 km/h`) hacia el este.
3. **Evaluar la energía cinética disipada:**
   - Inicial: `Ec_i = 0.5 × 1,400 × 20² = 280,000 J` (`280 kJ`).
   - Final: `Ec_f = 0.5 × 3,500 × 8.0² = 112,000 J` (`112 kJ`).
   - Energía transformada en deformación y calor: `ΔEc = 280,000 − 112,000 = 168,000 J` (`60 %` de `Ec_i`).
4. **Estimar el impulso y la fuerza media sobre el vehículo detenido:**
   - Impulso recibido: `Δp₂ = 2,100 × (8.0 − 0) = 16,800 N·s`.
   - Fuerza media del choque: `F_media = 16,800 / 0.12 = 140,000 N` (`140 kN`).

## Comparativa de momento lineal entre sistemas físicos

La tabla siguiente contrasta masa, velocidad, momento lineal y energía cinética en seis sistemas reales:

| Sistema físico | Masa `m` | Velocidad `v` | Momento `p` | Energía cinética `Ec` |
|---|---|---|---|---|
| Mosquito en vuelo | 0.0000025 kg | 2.8 m/s | 0.000007 kg·m/s | 0.0000098 J |
| Pelota de tenis (saque) | 0.058 kg | 55.0 m/s | 3.19 kg·m/s | 87.73 J |
| Proyectil de rifle | 0.010 kg | 850.0 m/s | 8.50 kg·m/s | 3,612.50 J |
| Bola de boliche | 7.0 kg | 8.0 m/s | 56.00 kg·m/s | 224.00 J |
| Automóvil urbano | 1,200 kg | 13.89 m/s | 16,668 kg·m/s | 115,759 J |
| Tren de mercancías | 4,000,000 kg | 2.0 m/s | 8,000,000 kg·m/s | 8,000,000 J |

Comparar la bola de boliche y el proyectil de rifle ilustra la diferencia entre ambas magnitudes: la bola posee `6.59` veces más momento lineal, pero el proyectil transporta `16.1` veces más energía cinética al depender cuadráticamente de la velocidad (`v²`).

## Aplicaciones en ingeniería, errores habituales y límites relativistas

El teorema del impulso fundamenta la seguridad pasiva automotriz. Las zonas de deformación programada y las bolsas de aire no alteran el `Δp` necesario para frenar al pasajero, sino que extienden el tiempo de impacto `Δt`, reduciendo drásticamente la fuerza máxima `F_media`. También rige la propulsión espacial de cohetes y la reconstrucción pericial de colisiones viales.

Conviene evitar tres fallos frecuentes en el cálculo:
- **Omitir el signo vectorial:** si dos cuerpos chocan en sentidos opuestos, uno debe llevar velocidad negativa.
- **Mezclar unidades:** convierta siempre `km/h` a `m/s` y gramos a `kg` antes de operar.
- **Suponer conservación de energía cinética en todo choque:** solo se cumple si `e = 1`, mientras que `p` se conserva en todo sistema aislado.

Finalmente, cuando la velocidad supera el `10 %` de la velocidad de la luz (`c ≈ 299,792,458 m/s`), la fórmula clásica subestima el momento y debe sustituirse por la expresión relativista `p = m × v / √(1 − v² / c²)`.
