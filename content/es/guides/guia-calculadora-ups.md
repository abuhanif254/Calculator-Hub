---
title: "Calculadora de UPS: Dimensionando su Batería de Respaldo"
description: "Guía técnica para dimensionar un sistema UPS o SAI: diferencia entre vatios (W) y voltio-amperios (VA), factor de potencia, margen de seguridad del 20 % y cálculo de autonomía."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ups-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Cuál es la diferencia práctica entre Vatios (W) y Voltio-Amperios (VA) en un UPS?"
    answer: "Los vatios (W) representan la potencia real que realiza trabajo útil en sus equipos, mientras que los voltio-amperios (VA) representan la potencia aparente total que circula por el circuito. Debido al factor de potencia (FP), la cifra en VA siempre es igual o mayor que la cifra en vatios (W = VA × FP), y su equipo no debe superar ninguno de los dos límites."
  - question: "¿Por qué se recomienda dejar un margen de seguridad del 20 % al dimensionar un UPS?"
    answer: "Operar un UPS cerca del 100 % de su capacidad máxima reduce drásticamente el tiempo de respaldo, acelera el envejecimiento térmico del inversor y de las baterías, y deja sin margen los picos transitorios de encendido. Un margen mínimo del 20 % protege la electrónica y absorbe futuras ampliaciones de periféricos."
  - question: "¿Puedo conectar una impresora láser o un calefactor a las tomas de batería de un UPS?"
    answer: "No. Las impresoras láser y los equipos resistivos generan picos de corriente de arranque que superan entre tres y cinco veces su consumo nominal, disparando de inmediato la protección por sobrecarga del UPS y dañando la batería. Conecte esos aparatos únicamente a tomas con protección contra sobretensiones sin respaldo de batería, o directamente a la pared."
  - question: "¿Mi PC con fuente de alimentación PFC activa necesita un UPS de onda senoidal pura?"
    answer: "En la gran mayoría de los casos sí es muy recomendable. Las fuentes con corrección activa del factor de potencia (PFC activo) pueden interpretar el hueco de tensión de una onda senoidal simulada (escalonada) durante la conmutación como un fallo eléctrico y apagarse abruptamente. Un UPS de onda senoidal pura garantiza compatibilidad total."
  - question: "¿Cada cuánto tiempo se deben reemplazar las baterías internas de un UPS?"
    answer: "Las baterías selladas de plomo-ácido reguladas por válvula (VRLA/AGM) utilizadas en la mayoría de los UPS domésticos y de oficina tienen una vida útil promedio de 3 a 5 años a temperatura ambiente (20–25 °C). El calor excesivo o los cortes eléctricos frecuentes reducen este ciclo; los modelos con baterías LiFePO₄ pueden alcanzar entre 8 y 10 años."
---

Un corte eléctrico de medio segundo o una subtensión momentánea basta para corromper archivos abiertos, dañar bases de datos o apagar un servidor doméstico. Un **Sistema de Alimentación Ininterrumpida (UPS o SAI)** interpone una batería y un inversor entre la red eléctrica y sus equipos críticos para sostener el suministro sin interrupciones y permitir un apagado ordenado.

Dimensionar correctamente la unidad con nuestra [Calculadora de UPS](/es/calculadoras/calculadora-de-ups) evita tanto los apagones por sobrecarga como el gasto excesivo. Esta guía detalla las ecuaciones entre vatios (`W`) y voltio-amperios (`VA`), un caso práctico resuelto, una tabla comparativa de topologías y las precauciones eléctricas fundamentales.

## Relaciones eléctricas fundamentales: W, VA, factor de potencia y autonomía

Todo UPS indica dos topes simultáneos en su placa (por ejemplo, `1000 VA / 600 W`). Exceder cualquiera de ambos activa la alarma de sobrecarga o corta la alimentación.

### 1. Potencia real (`W`) frente a potencia aparente (`VA`)

Las cargas electrónicas presentan un desfase o distorsión armónica medido por el **Factor de Potencia (`FP`)**, entre `0` y `1`:

```text
VA = W / FP
W  = VA × FP
```

- **`W` (Vatios):** potencia activa consumida por ordenadores, pantallas, routers y almacenamiento.
- **`VA` (Voltio-Amperios):** potencia aparente total exigida al inversor del UPS.
- **`FP` (Factor de Potencia):** las fuentes modernas de PC con corrección activa (`PFC activo`) alcanzan `0.90–0.99`; adaptadores simples rondan `0.60–0.75`. Muchos UPS domésticos tienen un `FP` nominal de `0.60` (`1000 VA × 0.60 = 600 W`), mientras que los empresariales alcanzan `0.80–1.00`.

### 2. Margen de seguridad del `20 %`

Para absorber picos de encendido y degradación gradual de la batería, multiplique la carga medida por `1.20`:

```text
W_mínimo_UPS  = W_carga_total × 1.20
VA_mínimo_UPS = VA_carga_total × 1.20
```

### 3. Estimación de autonomía en minutos

La duración de respaldo depende de la capacidad energética (`Wh = V × Ah × N_baterías`), la eficiencia del inversor (`η ≈ 0.85`) y la descarga útil (`DoD ≈ 0.80`):

```text
Autonomía (min) ≈ [(V × Ah × N × η × DoD) / W_carga_total] × 60
```

## Ejemplo práctico resuelto: estación de trabajo y red doméstica

Suponga una estación profesional medida con vatímetro bajo carga real:

1. **Sumar potencia real (`W`) y aparente (`VA`):**
   - PC de escritorio bajo carga: `320 W` (`FP = 0.95` → `320 / 0.95 = 336.8 VA`)
   - Dos monitores de 27 pulgadas (`2 × 40 W`): `80 W` (`FP = 0.85` → `80 / 0.85 = 94.1 VA`)
   - Router, módem óptico y NAS: `50 W` (`FP = 0.70` → `50 / 0.70 = 71.4 VA`)
   ```text
   Carga real total     = 320 + 80 + 50 = 450 W
   Carga aparente total = 336.8 + 94.1 + 71.4 = 502.3 VA
   ```
2. **Aplicar margen de seguridad del `20 %` (`× 1.20`):**
   ```text
   W_mínimo_UPS  = 450 W × 1.20 = 540 W
   VA_mínimo_UPS = 502.3 VA × 1.20 = 602.8 VA
   ```
   Si el UPS tiene un `FP` nominal de `0.60`, exigir `540 W` requiere `540 / 0.60 = 900 VA`. Un modelo comercial de **`1000 VA / 600 W`** satisface ambos límites (`600 W ≥ 540 W` y `1000 VA ≥ 603 VA`).
3. **Estimar autonomía:** con dos baterías de `12 V / 9 Ah` (`216 Wh` nominales):
   ```text
   Energía utilizable ≈ 216 Wh × 0.85 × 0.80 = 146.9 Wh
   Autonomía teórica  ≈ (146.9 / 450) × 60 ≈ 19.6 minutos
   ```
   Por el efecto Peukert en descargas rápidas de plomo-ácido, la autonomía real será de **`12` a `15 minutos`**, suficiente para guardar datos y ejecutar un apagado automático por USB.

## Comparativa de topologías y gamas de UPS

| Topología | Rango típico | Conmutación | Onda en batería | `FP` del UPS | Uso recomendado |
|---|---|---|---|---|---|
| Standby / Offline | `400–850 VA` | `6–12 ms` | Cuadrada escalonada | `0.50–0.60` | Routers y periféricos simples |
| Line-Interactive (simulada) | `650–1500 VA` | `4–8 ms` | Senoidal aproximada | `0.60` | PCs básicos sin `PFC activo` |
| Line-Interactive (senoidal pura) | `1000–2200 VA` | `4–8 ms` | Senoidal pura | `0.70–0.90` | Estaciones `PFC activo`, NAS y PyME |
| Online Doble Conversión | `1000–3000+ VA` | `0 ms` | Senoidal pura | `0.90–1.00` | Racks críticos y red inestable |
| UPS con batería `LiFePO₄` | `600–1500 VA` | `4–8 ms` | Senoidal o simulada | `0.60–0.80` | Larga vida (`8–10 años`) y menor peso |

## Errores frecuentes y advertencias de seguridad eléctrica

Al seleccionar e instalar su unidad con la [Calculadora de UPS](/es/calculadoras/calculadora-de-ups), observe cuatro precauciones esenciales:

- **No sume la etiqueta máxima de la fuente:** una fuente de `850 W` rara vez demanda más de `200–400 W` reales en uso cotidiano o juegos. Mida el consumo pico real con un vatímetro de enchufe para evitar sobredimensionar.
- **Incompatibilidad con fuentes `PFC activo`:** si su equipo usa una fuente certificada `80 PLUS` moderna, elija un UPS de **onda senoidal pura** para evitar reinicios durante la transición a batería.
- **Cargas prohibidas en batería:** nunca conecte impresoras láser, calefactores, microondas ni regletas supresoras en cascada a las tomas respaldadas por batería.
- **Temperatura y mantenimiento:** mantenga libre la ventilación; superar `25 °C` reduce a la mitad la vida química de las celdas VRLA. Ejecute pruebas de autonomía semestrales y recicle las baterías agotadas conforme a la normativa local.
