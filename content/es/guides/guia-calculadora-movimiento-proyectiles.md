---
title: "Movimiento de Proyectiles: La Física de las Trayectorias"
description: "Domine la física del movimiento de proyectiles. Aprenda sobre ángulos de lanzamiento, gravedad y use nuestra Calculadora de Movimiento de Proyectiles."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "projectile-motion-calculator"
faqs:
  - question: "¿Por qué dos proyectiles lanzados desde la misma altura —uno horizontalmente y otro dejado caer— tocan el suelo al mismo tiempo?"
    answer: "Porque el movimiento horizontal y el movimiento vertical son cinemáticamente independientes. La componente horizontal de la velocidad no genera aceleración ni fuerza vertical, de modo que ambos cuerpos experimentan exactamente la misma aceleración gravitatoria (9.8 m/s²) y recorren la misma caída vertical en idéntico intervalo de tiempo, despreciando la resistencia del aire."
  - question: "¿Qué ángulo de lanzamiento maximiza el alcance horizontal y cómo cambia si se parte desde una altura elevada?"
    answer: "Cuando el lanzamiento y el aterrizaje ocurren al mismo nivel (h₀ = 0 m) en ausencia de aire, el alcance máximo se obtiene a 45°. Sin embargo, al disparar desde una altura inicial positiva (h₀ > 0 m), el ángulo óptimo desciende por debajo de 45°, porque una mayor componente horizontal aprovecha el tiempo adicional de caída."
  - question: "¿Qué parejas de ángulos de lanzamiento producen exactamente el mismo alcance horizontal?"
    answer: "En terreno plano y sin rozamiento aerodinámico, dos ángulos complementarios —aquellos cuya suma es 90°, como 30° y 60°, o 15° y 75°— logran exactamente la misma distancia horizontal para una misma rapidez inicial. El ángulo menor describe una trayectoria más tensa y breve; el mayor alcanza más altitud y permanece más tiempo en vuelo."
  - question: "¿Cómo afecta la resistencia del aire a una trayectoria real frente al modelo parabólico ideal?"
    answer: "El arrastre aerodinámico se opone continuamente al vector velocidad y reduce tanto la componente horizontal como la vertical. La trayectoria deja de ser una parábola simétrica: el descenso resulta más pronunciado que el ascenso, la altura máxima disminuye, el alcance real es inferior al teórico y el ángulo óptimo suele situarse entre 35° y 42°."
  - question: "¿Qué ocurre con la velocidad y la aceleración en el punto más alto de la trayectoria?"
    answer: "En el ápice, la componente vertical de la velocidad se anula instantáneamente (vy = 0 m/s), pero la velocidad total no es cero salvo en un tiro vertical de 90°, pues persiste la velocidad horizontal constante (vx = v₀ × cos(θ)). Además, la aceleración gravitatoria nunca desaparece en la cima: sigue apuntando hacia abajo a 9.8 m/s²."
---

Si se dispara un proyectil horizontalmente y en el mismo instante se deja caer otro desde idéntica altura en el vacío, ambos tocan el suelo exactamente al mismo tiempo. Este resultado define el **movimiento de proyectiles**: toda trayectoria bidimensional bajo gravedad uniforme combina un desplazamiento horizontal a velocidad constante con una caída libre vertical uniformemente acelerada.

Para obtener al instante el alcance horizontal, la altura máxima, el tiempo de vuelo y las componentes de velocidad sin despejes manuales, utilice nuestra [Calculadora de Movimiento de Proyectiles](/es/calculadoras/calculadora-de-movimiento-de-proyectiles). Esta guía explica la independencia de ejes, las ecuaciones cinemáticas, un caso numérico resuelto, una tabla comparativa por ángulo y los límites del modelo ideal.

## Principio de independencia de los ejes y ecuaciones cinemáticas

El modelo clásico del tiro parabólico descompone el movimiento en dos ejes ortogonales independientes respecto al tiempo `t`. En el eje horizontal (`x`), sin rozamiento del aire, no actúa ninguna fuerza neta: la aceleración es nula (`ax = 0 m/s²`) y la velocidad horizontal permanece invariable. En el eje vertical (`y`), la gravedad impone una aceleración constante hacia abajo (`ay = −g`), tomando como referencia terrestre `g = 9.8 m/s²` (`9.80665 m/s²` en metrología estándar).

### Descomposición vectorial de la velocidad inicial

Antes de evaluar cualquier magnitud, proyecte la rapidez inicial `v₀` (en `m/s`) y el ángulo de elevación `θ` (en grados respecto a la horizontal) sobre ambos ejes:

```text
v₀x = v₀ × cos(θ)
v₀y = v₀ × sin(θ)
```

Aquí `v₀x` representa la velocidad horizontal constante (`m/s`) y `v₀y` la componente vertical inicial (`m/s`). En un disparo horizontal puro (`θ = 0°`), se cumple `v₀x = v₀` y `v₀y = 0 m/s`.

### Ecuaciones de posición, altura máxima, tiempo de vuelo y alcance

Desde una altura inicial `h₀` (en metros) sobre el plano de impacto, las ecuaciones horarias y los parámetros de trayectoria quedan definidos así:

```text
x(t) = v₀x × t
y(t) = h₀ + v₀y × t − 0.5 × g × t²
t_subida = v₀y / g
h_máx = h₀ + v₀y² / (2 × g)
t_vuelo = [v₀y + √(v₀y² + 2 × g × h₀)] / g
R = v₀x × t_vuelo
```

En estas expresiones, `t_subida` es el tiempo hasta el vértice (`s`), `h_máx` la altura máxima sobre el suelo (`m`), `t_vuelo` la duración total hasta `y = 0` (`s`) y `R` el alcance horizontal (`m`). Cuando `h₀ = 0 m`, el alcance se simplifica a `R = (v₀² × sin(2 × θ)) / g`, cuyo máximo ocurre cuando `sin(2 × θ) = 1`, es decir, a `θ = 45°`.

## Ejemplo numérico resuelto paso a paso

Considere un lanzamiento desde una plataforma elevada a `h₀ = 20 m`, con rapidez inicial `v₀ = 40 m/s`, ángulo `θ = 30°` y `g = 9.8 m/s²`.

1. **Descomponer la velocidad inicial:**
   - Horizontal: `v₀x = 40 × cos(30°) = 40 × 0.8660 = 34.64 m/s`.
   - Vertical: `v₀y = 40 × sin(30°) = 40 × 0.5000 = 20.00 m/s`.
2. **Calcular el tiempo de subida y la altura máxima:**
   - Tiempo hasta el ápice: `t_subida = 20.00 / 9.8 = 2.04 s`.
   - Altura máxima: `h_máx = 20 + 20.00² / (2 × 9.8) = 20 + 400 / 19.6 = 40.41 m`.
3. **Determinar el tiempo total de vuelo:**
   - `t_vuelo = [20.00 + √(20.00² + 2 × 9.8 × 20)] / 9.8 = (20.00 + √792) / 9.8`.
   - Como `√792 = 28.14 m/s`, resulta `t_vuelo = 48.14 / 9.8 = 4.91 s`.
4. **Obtener el alcance y la rapidez de impacto:**
   - Alcance horizontal: `R = 34.641 × 4.9125 = 170.17 m`.
   - Velocidad vertical final: `vy_final = 20.00 − (9.8 × 4.9125) = −28.14 m/s`.
   - Rapidez de impacto: `v_impacto = √(34.641² + (−28.142)²) = 44.63 m/s`.

## Comparativa de trayectorias según el ángulo de lanzamiento

La tabla siguiente muestra la variación cinemática de un proyectil lanzado desde el suelo (`h₀ = 0 m`) a `v₀ = 40 m/s` con `g = 9.8 m/s²`:

| Ángulo `θ` | `v₀x` (m/s) | `v₀y` (m/s) | Tiempo `t_vuelo` | Altura `h_máx` | Alcance `R` |
|---|---|---|---|---|---|
| 15° | 38.64 | 10.35 | 2.11 s | 5.47 m | 81.63 m |
| 30° | 34.64 | 20.00 | 4.08 s | 20.41 m | 141.39 m |
| 45° | 28.28 | 28.28 | 5.77 s | 40.82 m | 163.27 m |
| 60° | 20.00 | 34.64 | 7.07 s | 61.22 m | 141.39 m |
| 75° | 10.35 | 38.64 | 7.89 s | 76.16 m | 81.63 m |
| 90° | 0.00 | 40.00 | 8.16 s | 81.63 m | 0.00 m |

Se aprecia la simetría exacta del alcance entre ángulos complementarios (`15° / 75°` en `81.63 m` y `30° / 60°` en `141.39 m`), mientras que el tiempo de vuelo y la altitud crecen de forma continua hasta `90°`.

## Aplicaciones prácticas, errores frecuentes y límites del modelo

Las ecuaciones parabólicas se utilizan en ingeniería hidráulica (riego por aspersión, chorros industriales y aliviaderos), biomecánica deportiva (lanzamiento de jabalina, salto largo y ángulo óptimo de tiro) y seguridad laboral (delimitación de zonas de riesgo ante proyecciones de material en minería o demolición).

Al realizar estos cálculos conviene evitar cuatro errores habituales:
- **Confundir grados con radianes:** las funciones trigonométricas en hojas de cálculo esperan radianes; omitir la conversión genera resultados erróneos.
- **Usar la fórmula simplificada de alcance cuando `h₀ > 0`:** `v₀² × sin(2 × θ) / g` solo aplica si salida y llegada comparten cota.
- **Suponer aceleración nula en el ápice:** en la cima `vy = 0 m/s`, pero `g = 9.8 m/s²` sigue actuando hacia abajo.
- **Omitir el signo negativo en disparos descendentes:** si `θ < 0°`, `v₀y` debe ser negativa.

Finalmente, este modelo ideal asume ausencia de aire y gravedad uniforme. En objetos ligeros o muy veloces, el arrastre cuadrático y el efecto Magnus deforman la parábola y exigen integración numérica aerodinámica.
