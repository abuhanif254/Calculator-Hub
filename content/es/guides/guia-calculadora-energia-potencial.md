---
title: "Energía Potencial: Energía Almacenada Lista para Liberarse"
description: "Aprenda cómo funciona la energía potencial gravitatoria, cómo se convierte en energía cinética y use nuestra Calculadora de Energía Potencial."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "potential-energy-calculator"
faqs:
  - question: "¿La energía potencial gravitatoria puede ser negativa?"
    answer: "Sí. El valor numérico depende del plano de referencia elegido como h = 0 m. Si se toma la calle como cero, un objeto en un sótano o pozo tiene altura negativa y, por tanto, energía potencial negativa. Físicamente solo importan las diferencias de energía (ΔEp) entre dos niveles."
  - question: "¿Por qué el nivel de referencia h = 0 puede elegirse libremente sin alterar los resultados físicos?"
    answer: "Porque el trabajo mecánico y el cambio de velocidad dependen exclusivamente del desnivel (Δh = h₂ − h₁) y no de la cota absoluta. Ya sea que mida desde una mesa, el suelo o el nivel del mar, la variación ΔEp = m × g × Δh permanece exactamente igual."
  - question: "¿Cuál es la diferencia entre energía potencial gravitatoria y energía potencial elástica?"
    answer: "La energía potencial gravitatoria (Ep = m × g × h) procede de la altura de una masa en un campo gravitatorio, mientras que la elástica (Ep_e = 0.5 × k × x²) se almacena al deformar un resorte o material elástico según su constante k (N/m) y su desplazamiento x (m)."
  - question: "¿Cuándo deja de ser precisa la fórmula simplificada Ep = m × g × h?"
    answer: "Cerca de la superficie terrestre ofrece excelente precisión (error menor al 0.3 % por debajo de 10 km de altitud). Sin embargo, en órbitas espaciales o distancias comparables al radio terrestre (6,371 km), g varía con la distancia y debe aplicarse la ecuación universal Ug = −(G × M × m) / r."
  - question: "¿Cómo se transforma la energía potencial en energía cinética y térmica en un sistema real?"
    answer: "En una caída sin fricción, toda la energía potencial liberada se convierte en energía cinética (Ec = 0.5 × m × v²). En presencia de rozamiento mecánico o resistencia aerodinámica, una fracción de ΔEp se disipa irreversiblemente en calor y sonido."
---

Un vagón de montaña rusa detenido en la cima más alta tiene rapidez casi nula, pero concentra toda la capacidad mecánica necesaria para completar el circuito a gran velocidad. Esta energía almacenada por la posición dentro de un campo de fuerzas conservativo se denomina **energía potencial**, y en el ámbito gravitatorio representa el trabajo previo invertido para elevar una masa contra la gravedad.

Para calcular al instante la energía gravitatoria almacenada, la altura equivalente o la masa en distintos entornos planetarios, utilice nuestra [Calculadora de Energía Potencial](/es/calculadoras/calculadora-de-energia-potencial). Esta guía presenta las ecuaciones exactas, la conservación mecánica, un cálculo resuelto con pérdidas por fricción, una tabla comparativa y los límites del modelo uniforme.

## Fundamentos de la energía potencial gravitatoria y conservación mecánica

Las fuerzas conservativas —como la gravedad y la fuerza elástica ideal— producen un trabajo independiente de la trayectoria seguida, determinado únicamente por las posiciones inicial y final. Ello permite asignar un valor de energía potencial a cada altura.

### La ecuación Ep = m × g × h y sus parámetros

Cerca de la superficie terrestre, donde el campo gravitatorio es prácticamente uniforme, la energía potencial gravitatoria (`Ep`) se calcula mediante:

```text
Ep = m × g × h
```

- **`Ep` (energía potencial):** se mide en julios (`J`), equivalentes a `kg·m²/s²` o `N·m`.
- **`m` (masa):** se expresa en kilogramos (`kg`); no debe confundirse con el peso en newtons (`N`).
- **`g` (aceleración gravitatoria):** el estándar terrestre es `9.80665 m/s²` (habitualmente `9.81 m/s²` o `9.8 m/s²`).
- **`h` (altura relativa):** distancia vertical en metros (`m`) medida desde el nivel de referencia (`h = 0`).

### Trabajo mecánico, nivel de referencia y conversión en energía cinética

Cuando un cuerpo de masa `m` desciende desde una altura `h₁` hasta `h₂` sin rozamiento, su energía mecánica total (`Em`) —suma de energía potencial y energía cinética (`Ec`)— se conserva constante:

```text
Em = Ep + Ec = constante
Ec = 0.5 × m × v²
ΔEp = m × g × (h₁ − h₂) = 0.5 × m × (v₂² − v₁²)
v = √(2 × g × Δh)
```

Esta relación demuestra que, partiendo del reposo en ausencia de fricción, la rapidez tras descender un desnivel `Δh` depende solo de `g` y de `Δh`, sin importar la masa ni el perfil de la rampa. Para deformaciones elásticas se emplea `Ep_elástica = 0.5 × k × x²`, y a escala orbital rige `Ug = −(G × M × m) / r`.

## Ejemplo numérico resuelto: descenso con y sin rozamiento

Considere un vagón de montaña rusa de masa `m = 650 kg` que parte del reposo (`v₁ = 0 m/s`) en una cima a `h₁ = 45 m` y desciende hasta un valle a `h₂ = 5 m`, con `g = 9.81 m/s²`.

1. **Calcular las energías potenciales inicial y final:**
   - En la cima (`45 m`): `Ep₁ = 650 × 9.81 × 45 = 286,942.5 J` (`286.94 kJ`).
   - En el valle (`5 m`): `Ep₂ = 650 × 9.81 × 5 = 31,882.5 J` (`31.88 kJ`).
2. **Determinar la energía potencial liberada:**
   - `ΔEp = 286,942.5 − 31,882.5 = 255,060 J` (`255.06 kJ`), idéntico a calcular `650 × 9.81 × (45 − 5)`.
3. **Calcular la rapidez ideal sin rozamiento:**
   - Al transformarse íntegramente en energía cinética (`Ec₂ = 255,060 J`):
   - `v₂ = √(2 × 255,060 / 650) = √(2 × 9.81 × 40) = √784.8 = 28.01 m/s` (`100.85 km/h`).
4. **Ajustar ante una pérdida real por fricción del 12 %:**
   - Energía cinética efectiva: `Ec_real = 0.88 × 255,060 = 224,452.8 J`.
   - Velocidad real en el valle: `v_real = √(2 × 224,452.8 / 650) = √690.62 = 26.28 m/s` (`94.61 km/h`).

## Comparativa de energía potencial en distintos escenarios físicos

La tabla siguiente compara la energía almacenada y la velocidad teórica de impacto al caer hasta `h = 0 m`:

| Escenario físico | Masa `m` | Altura `h` | Gravedad `g` | Energía `Ep` | Rapidez ideal en `h = 0` |
|---|---|---|---|---|---|
| Libro en estantería | 1.5 kg | 2.0 m | 9.81 m/s² | 29.43 J | 6.26 m/s |
| Martillo pilón | 500 kg | 8.0 m | 9.81 m/s² | 39,240 J | 12.53 m/s |
| Vagón de montaña rusa | 650 kg | 45.0 m | 9.81 m/s² | 286,942.5 J | 29.71 m/s |
| Escalador en pared | 75 kg | 300 m | 9.81 m/s² | 220,725 J | 76.72 m/s |
| Agua en presa (1 m³) | 1,000 kg | 120 m | 9.81 m/s² | 1,177,200 J | 48.52 m/s |
| Carga equivalente lunar | 75 kg | 300 m | 1.62 m/s² | 36,450 J | 31.18 m/s |

Cabe destacar que `1 m³` de agua (`1,000 kg`) a `120 m` de altura acumula `1.18 MJ` (`0.327 kWh`) de energía bruta, lo que explica los grandes caudales exigidos por las centrales hidroeléctricas de generación comercial.

## Aplicaciones en ingeniería, errores comunes y validez del modelo

El almacenamiento gravitatorio sustenta las **centrales hidroeléctricas de bombeo** —mayor reserva energética estacionaria de las redes eléctricas—, el cálculo de seguridad en grúas de construcción, las baterías gravitacionales de bloques y los péndulos amortiguadores que estabilizan rascacielos ante sismos.

Conviene prevenir cuatro errores frecuentes al operar con energía potencial:
- **Ingresar el peso en lugar de la masa:** si un objeto pesa `98.1 N`, su masa es `10 kg`; introducir `98.1` como `m` duplica el factor `g`.
- **Confundir longitud inclinada con altura vertical:** en una rampa de longitud `L` e inclinación `α`, la altura es `h = L × sin(α)`.
- **Ignorar pérdidas disipativas:** en sistemas mecánicos reales la velocidad final siempre es inferior a `√(2 × g × Δh)` debido al rozamiento.
- **Asumir `g` constante a grandes altitudes:** a `400 km` de altura orbital, `g` cae cerca de `8.69 m/s²`, invalidando la fórmula plana `m × g × h`.
