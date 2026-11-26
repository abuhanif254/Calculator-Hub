---
title: "Energía Eléctrica: Entendiendo su Factura de Luz"
description: "Guía práctica sobre energía eléctrica: diferencia entre vatios (W) y kilovatios-hora (kWh), cálculo paso a paso de su factura mensual, conversión de mAh a Wh y optimización de tarifas."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electrical-energy-calculator"
faqs:
  - question: "¿Por qué la compañía eléctrica cobra por kilovatios-hora (kWh) y no por vatios (W)?"
    answer: "El vatio mide la velocidad instantánea a la que un aparato consume electricidad en un segundo concreto, mientras que el kilovatio-hora mide la cantidad total de energía acumulada a lo largo del tiempo. Un foco de 100 W encendido durante 10 horas consume la misma energía (1 kWh) que un calefactor de 2,000 W funcionando durante 30 minutos."
  - question: "¿Cuántos julios equivale exactamente un kilovatio-hora (kWh)?"
    answer: "Dado que 1 kilovatio equivale a 1,000 vatios (1,000 J/s) y 1 hora tiene 3,600 segundos, multiplicar ambos valores da exactamente 3,600,000 julios (3.6 megajulios). Esta es la razón por la que las facturas utilizan el kWh: expresar un consumo mensual típico de 300 kWh como 1,080,000,000 julios resultaría poco práctico."
  - question: "¿La capacidad en mAh de una batería mide energía eléctrica?"
    answer: "No directamente. Los miliamperios-hora (mAh) miden carga eléctrica (corriente multiplicada por tiempo), no energía. Para conocer la energía real almacenada en vatios-hora (Wh) hay que multiplicar por la tensión nominal de la celda: E(Wh) = [mAh × V] / 1,000. Por ejemplo, 5,000 mAh a 3.7 V equivalen a 18.5 Wh, mientras que 5,000 mAh a 12 V almacenan 60 Wh."
  - question: "¿Por qué un refrigerador de 150 W no consume 150 W × 24 horas todos los días?"
    answer: "Porque el compresor funciona mediante ciclos gobernados por un termostato: arranca para extraer calor y se detiene al alcanzar la temperatura objetivo. Según la temperatura ambiente y el número de aperturas de puerta, el compresor suele estar activo entre el 30 % y el 45 % del día, por lo que su consumo real ronda los 1.1 a 1.6 kWh diarios."
  - question: "¿Qué son los consumos fantasma y cuánto pueden pesar en la factura eléctrica?"
    answer: "El consumo en espera (standby) corresponde a la energía que siguen absorbiendo televisores, consolas, decodificadores, microondas con reloj digital y cargadores enchufados sin carga. Aunque cada dispositivo apenas consuma entre 1 W y 12 W, la suma de varios equipos activos las 24 horas durante un mes puede representar entre el 5 % y el 10 % del consumo energético del hogar."
---

La compañía distribuidora de electricidad no factura la **potencia** instantánea de sus electrodomésticos, sino la **energía eléctrica** acumulada a lo largo del tiempo. Mientras la potencia en vatios (`W`) indica a qué ritmo demanda energía un equipo en un instante dado, la energía en **kilovatios-hora** (`kWh`) o **julios** (`J`) mide el volumen total consumido durante las horas de funcionamiento.

Distinguir ambas magnitudes permite auditar con precisión cuánto cuesta mantener encendido cada aparato del hogar o la oficina, detectar consumos ocultos y evaluar el ahorro real de sustituir equipos antiguos por modelos eficientes. Con nuestra [Calculadora de Energía Eléctrica](/es/calculadoras/calculadora-de-energia-electrica) puede convertir instantáneamente vatios y horas de uso en julios y kilovatios-hora.

## Fórmulas fundamentales de energía y facturación

La energía eléctrica consumida (`E`) es el producto de la potencia activa (`P`) por el intervalo de tiempo (`t`) durante el cual la carga permanece operando:

```text
Energía en el Sistema Internacional (Julios):
E(J) = P(W) × t(s)

Energía en unidades de facturación (kWh):
E(kWh) = [P(W) × t(h)] / 1,000

Equivalencia exacta:
1 kWh = 1,000 W × 3,600 s = 3,600,000 J = 3.6 MJ

Costo de energía eléctrica:
Costo = E(kWh) × Tarifa(€/kWh o USD/kWh)
```

Donde:

- **`P(W)`:** potencia activa media consumida por el equipo en vatios (`W`). Si el dato figura en kilovatios (`kW`), no se divide entre `1,000`.
- **`t(h)`:** tiempo efectivo de funcionamiento en horas (`h`); para cargas intermitentes equivale a las horas totales multiplicadas por su factor de trabajo (*duty cycle*).
- **`Tarifa`:** precio unitario de la energía activa en la franja horaria correspondiente.

### Conversión real de capacidad de baterías (`mAh` a `Wh`)

En baterías portátiles (*power banks*) y teléfonos móviles suele indicarse la capacidad en miliamperios-hora (`mAh`), que representa carga eléctrica y no energía. Para comparar baterías con tensiones nominales distintas es imprescindible convertir a vatios-hora (`Wh`):

```text
E(Wh) = [Capacidad(mAh) × V_nominal(V)] / 1,000
```

Por ejemplo, una batería de teléfono de `4,500 mAh` con celda de ion-litio de `3.85 V` almacena `(4,500 × 3.85) / 1,000 = 17.325 Wh` (`0.0173 kWh`).

## Ejemplo práctico paso a paso: auditoría de factura mensual

Suponga que desea verificar el costo eléctrico mensual (ciclo de `30 días`) de tres cargas representativas en una vivienda sujeta a una tarifa plana de `0.18 €/kWh`:

1. **Aire acondicionado *inverter* (`P = 1,100 W` promedio durante `6 h/día`):**
   Horas totales al mes: `6 h/día × 30 días = 180 h`.
   Energía: `E₁ = (1,100 W × 180 h) / 1,000 = 198.0 kWh`.
   Costo: `198.0 kWh × 0.18 €/kWh = 35.64 €`.
2. **Refrigerador doméstico (`P = 140 W` promedio equivalente en `24 h/día`):**
   Horas totales al mes: `24 h/día × 30 días = 720 h`.
   Energía: `E₂ = (140 W × 720 h) / 1,000 = 100.8 kWh`.
   Costo: `100.8 kWh × 0.18 €/kWh = 18.144 €` (`≈ 18.14 €`).
3. **Ordenador de escritorio y monitor (`350 W` activos `4 h/día` + `12 W` en reposo `20 h/día`):**
   Consumo activo: `(350 W × 120 h) / 1,000 = 42.0 kWh`.
   Consumo en reposo: `(12 W × 600 h) / 1,000 = 7.2 kWh`.
   Energía total del equipo: `E₃ = 42.0 + 7.2 = 49.2 kWh`.
   Costo: `49.2 kWh × 0.18 €/kWh = 8.856 €` (`≈ 8.86 €`).
4. **Total de energía y coste variable combinado:**
   `E_total = 198.0 + 100.8 + 49.2 = 348.0 kWh` (`1,252.8 MJ`).
   `Costo_variable = 348.0 kWh × 0.18 €/kWh = 62.64 €`.
   A este importe variable la factura real sumará el término fijo de potencia contratada, el alquiler de equipos de medida y los impuestos eléctricos aplicables en cada país.

## Benchmark de consumo mensual por electrodoméstico

La tabla siguiente estima el consumo mensual (`30 días`) y su equivalente energético en megajulios bajo una tarifa de referencia de `0.18 €/kWh`:

| Aparato doméstico | Potencia media activa | Uso efectivo diario | Energía mensual (`30 días`) | Equivalente en MJ | Costo mensual (`0.18 €/kWh`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Bombilla LED (`10 W`) | `10 W` | `5.0 h/día` | `1.50 kWh` | `5.4 MJ` | `0.27 €` |
| Router Wi-Fi doméstico | `12 W` | `24.0 h/día` | `8.64 kWh` | `31.1 MJ` | `1.56 €` |
| Ordenador portátil (ofimática) | `45 W` | `8.0 h/día` | `10.80 kWh` | `38.9 MJ` | `1.94 €` |
| Televisor LED de 55 pulgadas | `110 W` | `4.0 h/día` | `13.20 kWh` | `47.5 MJ` | `2.38 €` |
| Lavadora (ciclo agua caliente) | `1,800 W` (ciclo equivalente `1 h`) | `0.5 h/día` | `27.00 kWh` | `97.2 MJ` | `4.86 €` |
| Termo eléctrico de agua (`80 L`) | `1,500 W` (termostato activo) | `3.0 h/día` | `135.00 kWh` | `486.0 MJ` | `24.30 €` |

## Errores de estimación y matices de facturación

- **Multiplicar la potencia máxima de placa por 24 horas:** planchas, hornos, refrigeradores y termos eléctricos regulan la temperatura mediante termostato. Tomar la potencia pico nominal de la etiqueta como consumo continuo duplica o triplica artificialmente la estimación frente a la medición con un vatímetro de enchufe.
- **Desconocer las tarifas por tramos horarios o escalones:** muchas compañías aplican precios distintos en horas punta, llano y valle, o tarifas progresivas por bloques donde superar ciertos `kWh` mensuales encarece los kilovatios-hora excedentes.
- **Omitir pérdidas de conversión en baterías y cargadores:** cargar una batería de `100 Wh` no consume `100 Wh` de la red eléctrica. Entre la eficiencia del cargador (`85–92 %`) y el calor generado en la química de carga, el consumo real en el contador suele rondar los `115` a `125 Wh`.
- **Ignorar la diferencia entre cargos fijos y variables:** apagar luces reduce los `kWh` consumidos, pero no modifica el cargo fijo por potencia contratada (expresado en `kW` disponibles), cuyo ajuste requiere revisar si el interruptor general admite bajar un escalón sin provocar cortes por simultaneidad.
