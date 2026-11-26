---
title: "Paneles Solares: Dimensionando su Sistema"
description: "Aprenda a dimensionar una instalación fotovoltaica con precisión a partir de su consumo diario en Wh o kWh, las Horas Solares Pico (HSP), el rendimiento global (PR) y el voltaje de los módulos."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "solar-panel-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué un panel de 400 W no produce 4,000 Wh en un día con 10 horas de luz?"
    answer: "Porque la potencia nominal (Wp) se mide en laboratorio bajo condiciones estándar (1,000 W/m² de irradiancia y 25 °C de temperatura de celda). En exteriores, la intensidad solar cambia desde el amanecer hasta el atardecer; las Horas Solares Pico (HSP) condensan esa energía diaria en horas equivalentes a plena irradiancia de 1,000 W/m², normalmente entre 3.5 y 5.5 HSP al día."
  - question: "¿Qué factor de pérdidas globales (Performance Ratio) conviene aplicar al dimensionar?"
    answer: "En instalaciones bien diseñadas suele emplearse un rendimiento global (PR) de 0.75 a 0.82 (es decir, entre un 18 % y un 25 % de pérdidas totales). Este factor agrupa el calentamiento de las celdas sobre los 25 °C, la suciedad superficial, las caídas en el cableado, la eficiencia del controlador MPPT y las pérdidas del inversor o batería."
  - question: "¿Cómo cambia el dimensionamiento entre un sistema aislado (off-grid) y uno conectado a red?"
    answer: "En autoconsumo conectado a red suele dimensionarse usando las HSP promedio anuales porque la red eléctrica cubre los déficit invernales. En un sistema aislado con baterías debe diseñarse utilizando las HSP del mes más desfavorable (usualmente diciembre en el hemisferio norte o junio en el sur) o prever apoyo con generador."
  - question: "¿Por qué es necesario revisar el voltaje de circuito abierto (Voc) del panel en climas fríos?"
    answer: "Aunque la potencia de un panel baja con el calor, su voltaje aumenta cuando la temperatura ambiente desciende. Si la cadena de paneles en serie alcanza un Voc en la mañana más fría del año superior al límite de entrada del controlador MPPT (por ejemplo, 150 V o 450 V), el regulador sufrirá daños irreversibles por sobretensión."
  - question: "¿Es mejor un controlador de carga MPPT o uno PWM para aprovechar los paneles?"
    answer: "El controlador MPPT (seguimiento del punto de máxima potencia) extrae entre un 15 % y un 30 % más de energía que un PWM, ya que transforma el exceso de voltaje del panel en corriente útil para la batería y permite utilizar módulos residenciales de alta tensión (36 V–45 V) sobre bancos de 12 V o 24 V."
---

Dimensionar un sistema fotovoltaico consiste en equilibrar la demanda energética diaria de sus equipos con la irradiancia solar real disponible en su emplazamiento. Multiplicar la potencia nominal del panel por las horas totales de claridad solar sobrestima la generación entre un `40 %` y un `60 %`, provocando descargas prematuras en las baterías o ahorros muy inferiores a lo previsto.

La ingeniería fotovoltaica evita ese error traduciendo la radiación diaria en **Horas Solares Pico (`HSP`)** y aplicando un factor realista de rendimiento global (**Performance Ratio, `PR`**). Con nuestra [Calculadora de Paneles Solares](/es/calculadoras/calculadora-de-paneles-solares) obtendrá la potencia pico necesaria y el número exacto de módulos para cubrir su consumo diario.

## Metodología fotovoltaica y pérdidas del sistema

La potencia de catálogo de un panel se expresa en **vatios pico (`Wp`)** bajo Condiciones Estándar de Prueba (`STC`: irradiancia de `1,000 W/m²`, celda a `25 °C` y masa de aire `AM 1.5`). Una **Hora Solar Pico (`1 HSP`)** equivale a recibir `1,000 Wh/m²` (`1 kWh/m²`) de energía acumulada en el día; así, un día de `4.5 HSP` aporta la misma energía total que `4.5 horas` constantes de sol al `100 %`.

```text
E_diaria (Wh/día) = Σ (Potencia_equipo_i × Horas_uso_i)
P_campo (Wp) = E_diaria (Wh/día) / [ HSP × PR ]
N_paneles = redondear_hacia_arriba( P_campo / P_panel )
```

- **`E_diaria`:** consumo energético diario en `Wh/día` (o `kWh × 1,000`).
- **`HSP`:** Horas Solares Pico locales (bases PVGIS o NASA POWER). En instalaciones aisladas se toma el mes más crítico de invierno; en conexión a red, el promedio anual.
- **`PR` (Rendimiento global, típicamente `0.75` a `0.82`):** descuenta tres grupos de pérdidas:
  - **Temperatura (`6 % – 12 %`):** las celdas pierden `0.32 %–0.45 %/°C` por encima de `25 °C` (en verano operan a `50–65 °C`).
  - **Suciedad, sombras y desajuste (`3 % – 6 %`):** polvo superficial y tolerancias entre módulos.
  - **Electrónica y cableado (`8 % – 12 %`):** pérdidas en cables `CC`, controlador MPPT (`95 %–98 %`), inversor (`90 %–96 %`) y eficiencia de carga de batería (`92 %–96 %` en `LiFePO₄`, `80 %–85 %` en plomo-ácido).

## Ejemplo práctico paso a paso: vivienda de 6.4 kWh/día

Considere una vivienda con un consumo diario de **`6,400 Wh/día` (`6.4 kWh/día`)**, ubicada en un sitio con **`4.5 HSP`** en el mes de diseño, rendimiento global **`PR = 0.78`** (`22 %` de pérdidas) y paneles monocristalinos de **`455 Wp`** (`Voc = 41.5 V` a `25 °C`).

1. **Potencia pico mínima requerida (`P_campo`):**
   ```text
   P_campo = 6,400 Wh/día / (4.5 HSP × 0.78) = 6,400 / 3.51 = 1,823.36 Wp
   ```
2. **Cantidad de paneles de `455 Wp`:**
   ```text
   N_paneles = 1,823.36 / 455 = 4.007 → Se seleccionan 5 paneles (2,275 Wp)
   ```
3. **Generación diaria real estimada:**
   ```text
   E_generada = 2,275 Wp × 4.5 HSP × 0.78 = 7,985 Wh/día (7.99 kWh/día)
   ```
   Ese margen adicional del `+24.8 %` cubre días nublados y acelera la recarga del banco de baterías.
4. **Verificación de tensión en frío:**
   Cinco paneles en serie suman `207.5 V` a `25 °C`, que suben aproximadamente un `+10 %` a `0 °C` (`228.3 V`). Por ello superan el límite de un regulador MPPT de `150 V`, requiriendo un modelo de `250 V` o `450 V`, o bien una configuración par (`4` o `6` paneles en `2S2P` / `2S3P`).

## Escenarios comparativos de irradiancia (`PR = 0.78`)

La tabla muestra la generación de `1 kWp` y los paneles de `450 Wp` necesarios para cubrir **`5.0 kWh/día` (`5,000 Wh/día`)**:

| `HSP` diarias | Clima representativo | Producción por `1 kWp` / día | Producción por `1 kWp` / mes | Potencia para `5 kWh/día` | Paneles de `450 Wp` |
| --- | --- | --- | --- | --- | --- |
| `3.0 HSP` | Invierno nublado / latitud alta | `2,340 Wh/día` | `70.2 kWh/mes` | `2,137 Wp` | `5` (`2,250 Wp`) |
| `3.5 HSP` | Clima templado moderado | `2,730 Wh/día` | `81.9 kWh/mes` | `1,832 Wp` | `5` (`2,250 Wp`) |
| `4.0 HSP` | Promedio Europa central / México norte | `3,120 Wh/día` | `93.6 kWh/mes` | `1,603 Wp` | `4` (`1,800 Wp`) |
| `4.5 HSP` | Zonas mediterráneas o meseta | `3,510 Wh/día` | `105.3 kWh/mes` | `1,425 Wp` | `4` (`1,800 Wp`) |
| `5.0 HSP` | Regiones soleadas subtropicales | `3,900 Wh/día` | `117.0 kWh/mes` | `1,282 Wp` | `3` (`1,350 Wp`) |
| `6.0 HSP` | Zonas áridas o verano intenso | `4,680 Wh/día` | `140.4 kWh/mes` | `1,068 Wp` | `3` (`1,350 Wp`) |

## Casos de uso, errores frecuentes y normativa

Al proyectar la instalación física deben cuidarse cuatro aspectos críticos:

- **Orientación e inclinación:** oriente los módulos al sur geográfico en el hemisferio norte (al norte en el hemisferio sur), con inclinación próxima a la latitud local (o `+15°` para priorizar invierno en sistemas aislados).
- **Sombras parciales:** sombrear apenas el `10 %` de un módulo puede desplomar la corriente de toda la serie si faltan diodos de derivación activos u optimizadores.
- **MPPT frente a PWM:** paneles de `60–72` celdas (`34–40 V`) sobre baterías de `12 V` pierden más del `50 %` de potencia con reguladores PWM; requieren obligatoriamente MPPT.
- **Protecciones `CC`:** conforme a la norma IEC 60364-7-712 y el NEC Artículo 690, incluya seccionador de corte en carga `CC`, fusibles de rama cuando existan tres o más cadenas en paralelo, descargadores contra sobretensiones (`SPD`) y puesta a tierra de estructuras.
