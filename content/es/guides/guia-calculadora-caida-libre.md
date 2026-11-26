---
title: "La Física de la Caída Libre: Gravedad en el Vacío"
description: "Domine la cinemática de los objetos en caída. Aprenda sobre la gravedad constante de 9.8 m/s², la resistencia del aire y use nuestra Calculadora de Caída Libre."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "free-fall-calculator"
faqs:
  - question: "¿Por qué todos los objetos caen con la misma aceleración en el vacío sin importar su masa?"
    answer: "Aunque la Tierra atrae con mayor fuerza gravitatoria a un cuerpo más pesado (F = m × g), ese cuerpo presenta mayor inercia y opone proporcionalmente más resistencia a acelerar (a = F / m). Al dividir la fuerza entre la masa, m se cancela y todos los objetos aceleran a idéntico ritmo g."
  - question: "¿Qué es la velocidad terminal y cuándo deja de acelerar un objeto que cae en la atmósfera?"
    answer: "La velocidad terminal es la rapidez máxima constante que alcanza un objeto al caer en un fluido como el aire. Ocurre cuando la fuerza de arrastre aerodinámico ascendente iguala al peso descendente; en ese equilibrio la fuerza neta es nula y cesa la aceleración."
  - question: "¿Por qué la distancia de caída aumenta con el cuadrado del tiempo y no de forma lineal?"
    answer: "Porque la velocidad crece linealmente con el tiempo (v = g × t). Como la distancia recorrida equivale a la velocidad media multiplicada por el tiempo (d = 0.5 × v × t), al sustituir v surge el término cuadrático d = 0.5 × g × t². Duplicar el tiempo cuadruplica la distancia."
  - question: "¿Cómo varía la aceleración gravitatoria g según la latitud, la altitud o el planeta?"
    answer: "En la superficie terrestre g oscila entre 9.78 m/s² en el ecuador —por el achatamiento polar y la rotación— y 9.83 m/s² en los polos, además de disminuir con la altitud. En otros astros depende de su masa y radio: en la Luna vale 1.62 m/s² y en Marte 3.72 m/s²."
  - question: "¿Cómo cambian las ecuaciones si el objeto se lanza hacia abajo con una velocidad inicial distinta de cero?"
    answer: "Al existir una velocidad inicial descendente v₀, se añade un término lineal: v(t) = v₀ + g × t y d(t) = v₀ × t + 0.5 × g × t². La relación sin tiempo pasa a ser v² = v₀² + 2 × g × d, y calcular el tiempo exige resolver una ecuación cuadrática."
---

Si se dejan caer simultáneamente una pluma y una bola de boliche en una habitación normal, la bola llega mucho antes por el frenado que ejerce el aire sobre la pluma. En cambio, dentro de una cámara de vacío o en la Luna, ambos cuerpos tocan el suelo exactamente al mismo tiempo porque en **caída libre** pura la aceleración gravitatoria es idéntica para cualquier masa.

Para obtener al instante el tiempo de caída, la distancia recorrida o la velocidad exacta de impacto desde el reposo o con impulso inicial, utilice nuestra [Calculadora de Caída Libre](/es/calculadoras/calculadora-de-caida-libre). Esta guía detalla las ecuaciones cinemáticas, un ejemplo numérico segundo a segundo, una tabla comparativa planetaria y el efecto del rozamiento atmosférico.

## Cinemática de la caída libre y ecuaciones fundamentales

En física, la caída libre designa el movimiento rectilíneo vertical de un cuerpo sujeto exclusivamente a la gravedad, sin sustentación, flotabilidad ni resistencia del aire.

### Aceleración gravitatoria constante y principio de equivalencia

Combinando la segunda ley de Newton (`a = F / m`) con la fuerza peso (`F = m × g`), la masa del cuerpo se cancela y resulta una aceleración uniforme `a = g`, independiente de la densidad o el material. El valor normalizado internacional en la Tierra es `g = 9.80665 m/s²` (`9.81 m/s²` en práctica técnica).

Cada segundo en caída libre ideal terrestre, la velocidad descendente aumenta en `9.81 m/s` (`35.3 km/h`): `9.81 m/s` tras `1 s`, `19.62 m/s` a los `2 s` y `29.43 m/s` a los `3 s`.

### Fórmulas para caída desde el reposo y con velocidad inicial

Cuando el cuerpo parte del reposo (`v₀ = 0 m/s`), las ecuaciones que relacionan velocidad (`v`), distancia caída (`d`), tiempo (`t`) y gravedad (`g`) son:

```text
v(t) = g × t
d(t) = 0.5 × g × t²
t = √(2 × d / g)
v = √(2 × g × d)
```

Si el objeto se lanza hacia abajo con rapidez inicial `v₀` (`m/s`), se agregan los términos lineales iniciales:

```text
v(t) = v₀ + g × t
d(t) = v₀ × t + 0.5 × g × t²
v² = v₀² + 2 × g × d
```

En la atmósfera, el arrastre cuadrático limita la aceleración hasta alcanzar la velocidad terminal: `v_term = √[(2 × m × g) / (ρ × A × Cd)]`, donde `ρ` es la densidad del aire, `A` el área frontal y `Cd` el coeficiente de arrastre.

## Ejemplo numérico resuelto paso a paso

Considere una esfera metálica compacta que se suelta desde el reposo (`v₀ = 0 m/s`) desde una torre de ensayos de `d = 125 m` de altura, con `g = 9.81 m/s²`.

1. **Calcular el tiempo total de caída:**
   - `t = √(2 × 125 / 9.81) = √(250 / 9.81) = √25.4842 = 5.05 s`.
2. **Calcular la rapidez de impacto:**
   - Mediante el tiempo: `v = 9.81 × 5.0482 = 49.52 m/s` (`178.28 km/h`).
   - Verificación directa: `v = √(2 × 9.81 × 125) = √2,452.5 = 49.52 m/s`.
3. **Observar la progresión cuadrática segundo a segundo:**
   - `t = 1 s`: `d = 4.91 m`, `v = 9.81 m/s`.
   - `t = 2 s`: `d = 19.62 m`, `v = 19.62 m/s`.
   - `t = 3 s`: `d = 44.15 m`, `v = 29.43 m/s`.
   - `t = 4 s`: `d = 78.48 m`, `v = 39.24 m/s`.
   - `t = 5 s`: `d = 122.63 m`, `v = 49.05 m/s`.

Durante el primer segundo la esfera avanza solo `4.91 m`, pero entre el cuarto y el quinto segundo recorre `44.15 m`, nueve veces más distancia en el mismo intervalo.

## Comparativa de caída libre según el entorno gravitatorio

La tabla siguiente compara el tiempo de descenso y la rapidez final desde `d = 100 m` en el vacío bajo distintos campos gravitatorios:

| Entorno gravitatorio | Gravedad `g` | Tiempo `t` (100 m) | Rapidez `v` (m/s) | Rapidez (km/h) |
|---|---|---|---|---|
| Luna | 1.62 m/s² | 11.11 s | 18.00 m/s | 64.8 km/h |
| Marte | 3.72 m/s² | 7.33 s | 27.28 m/s | 98.2 km/h |
| Tierra (ecuador) | 9.78 m/s² | 4.52 s | 44.23 m/s | 159.2 km/h |
| Tierra (estándar) | 9.81 m/s² | 4.52 s | 44.29 m/s | 159.5 km/h |
| Tierra (polos) | 9.83 m/s² | 4.51 s | 44.34 m/s | 159.6 km/h |
| Júpiter (nubes) | 24.79 m/s² | 2.84 s | 70.41 m/s | 253.5 km/h |

En la Luna la caída de `100 m` dura casi `2.5` veces más que en la Tierra (`11.11 s` frente a `4.52 s`), mientras que en Júpiter el impacto ocurre en `2.84 s` a `253.5 km/h`.

## Aplicaciones técnicas, errores frecuentes y resistencia aerodinámica

Estas ecuaciones rigen el diseño de torres de microgravedad al vacío (como la torre ZARM de Bremen, con `4.74 s` de caída libre), ensayos de impacto en embalajes y equipos de protección, calibración de acelerómetros y perímetros de seguridad en obra vertical.

Conviene evitar cuatro errores habituales:
- **Olvidar elevar `t` al cuadrado en `d = 0.5 × g × t²`:** omitir el exponente subestima severamente caídas largas.
- **Confundir altura restante con distancia caída:** `0.5 × g × t²` calcula el tramo descendido desde la suelta, no la elevación remanente.
- **Incluir la masa en ecuaciones del vacío:** sin rozamiento, `m` no altera `t` ni `v`.
- **Ignorar la velocidad terminal en la atmósfera:** un paracaidista estabilizado alcanza unos `53 m/s` (`~190 km/h`) tras `12` a `15` segundos y `450 m` de caída; más allá de ese punto, `v = g × t` sobreestima la velocidad real.
