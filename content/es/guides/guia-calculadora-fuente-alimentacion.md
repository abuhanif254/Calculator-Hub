---
title: "Fuente de Alimentación: ¿Cuántos Vatios Necesita?"
description: "Guía técnica para dimensionar la fuente de alimentación (PSU) de su PC: cálculo de carga total, raíl de +12 V, picos transitorios ATX 3.0/3.1, eficiencia 80 PLUS y margen de seguridad."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "power-supply-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué no debo comprar una fuente con exactamente los mismos vatios que consume mi PC?"
    answer: "Operar una fuente al 95 % o 100 % de su capacidad máxima de forma sostenida eleva la temperatura interna, acelera el desgaste de los condensadores electrolíticos, dispara el ruido del ventilador y deja sin margen ante picos transitorios de la GPU. Se recomienda un margen de seguridad del 25 % al 35 % para trabajar en la zona óptima del 50 % al 80 % de carga."
  - question: "¿Qué diferencia existe entre el TDP del procesador o gráfica y su consumo máximo real?"
    answer: "El TDP (Potencia de Diseño Térmico) indica la capacidad de disipación térmica promedio que necesita el sistema de refrigeración, no el límite eléctrico instantáneo. Procesadores modernos bajo carga turbo (PL2 o PPT) y tarjetas gráficas durante picos transitorios de milisegundos pueden demandar entre un 50 % y un 100 % más de vatios que su TDP base."
  - question: "¿Por qué es crítico revisar la potencia disponible en el raíl de +12 V?"
    answer: "En los ordenadores actuales, tanto la CPU como la tarjeta gráfica se alimentan casi íntegramente del raíl de +12 V. Algunas fuentes económicas anuncian 600 W totales sumando capacidad obsoleta en los raíles de +3.3 V y +5 V, pero solo entregan 400 W en +12 V; una PSU moderna de calidad entrega prácticamente el 100 % de su potencia nominal en +12 V."
  - question: "¿Una fuente de 850 W consume 850 W de la pared todo el tiempo?"
    answer: "No. Una fuente solo extrae de la red eléctrica la potencia que demandan los componentes en ese instante, dividida por su eficiencia de conversión. Si un equipo consume 120 W en reposo, una PSU de 850 W con 88 % de eficiencia tomará unos 136 W de la pared, igual que una fuente más pequeña con eficiencia similar."
  - question: "¿Qué ventajas aporta una fuente certificada ATX 3.0 o ATX 3.1 frente a modelos anteriores?"
    answer: "El estándar ATX 3.0 y su revisión ATX 3.1 exigen que la fuente soporte excursiones transitorias de potencia de hasta el 200 % de su capacidad nominal durante 100 microsegundos, e incorporan conectividad nativa PCIe 5.0/5.1 (12V-2x6) para tarjetas gráficas modernas, evitando disparos falsos de protección (OCP/OPP) o el uso de adaptadores múltiples."
---

Dimensionar correctamente la **fuente de alimentación (PSU)** de un ordenador exige ir más allá de sumar el TDP nominal de la caja del procesador y la gráfica. Una PSU justa provoca apagados bruscos bajo carga gráfica intensa, inestabilidad de voltajes o disparos prematuros de protección; en cambio, una fuente bien dimensionada opera silenciosa, fresca y en su punto óptimo de eficiencia durante años.

Nuestra [Calculadora de Fuente de Alimentación](/es/calculadoras/calculadora-de-fuente-de-alimentacion) suma el consumo pico de cada subsistema y añade un margen técnico para sugerir el vataje idóneo. A continuación se exponen las ecuaciones de dimensionamiento, la distribución por raíles, un ejemplo completo paso a paso, una tabla de perfiles de hardware y los riesgos eléctricos críticos.

## Metodología de cálculo, margen de seguridad y eficiencia 80 PLUS

Para estimar la capacidad recomendada en arquitectura ATX moderna debe sumarse el pico simultáneo de corriente continua (`P_sistema`) y multiplicarlo por el factor de holgura:

```text
P_sistema = P_CPU_pico + P_GPU_pico + P_placa_RAM + P_almacenamiento + P_refrigeración
P_PSU_recomendada = P_sistema × (1 + Margen)
P_pared (AC) = P_sistema / η
```

- **`P_CPU_pico` y `P_GPU_pico` (raíl `+12 V`):** concentran el `75 %`–`90 %` de la demanda total. Conviene usar el consumo real en turbo (`PL2` o `PPT`, `65–250 W+` en CPU) y la potencia total de placa (`TBP`, `120–450 W+` en GPU).
- **`P_placa_RAM`:** chipset, módulos DDR4/DDR5 y pérdidas del regulador VRM de la placa base (`45–80 W`).
- **`P_almacenamiento` y `P_refrigeración`:** cada SSD NVMe consume `5–8 W` en carga; cada disco HDD de `3.5"` demanda `8–12 W` (`20 W` al arrancar); ventiladores PWM, bombas líquidas AIO y puertos USB añaden `20–45 W`.
- **Margen de seguridad (`25 %` a `35 %`):** mantiene la carga continua en la franja óptima del `50 %` al `80 %` y absorbe picos transitorios de milisegundos.
- **Eficiencia `η` (80 PLUS):** relación entre potencia `DC` entregada y potencia `AC` tomada de la pared. Al `50 %` de carga (`115 V`), **Bronze** garantiza `85 %`, **Gold** `90 %`, **Platinum** `92 %` y **Titanium** `94 %` (`90 %` incluso al `10 %` de carga).

## Ejemplo práctico resuelto: equipo gaming y creación 1440p/4K

Considere una PC equipada con una CPU de gama media-alta (`P_CPU_pico = 170 W`), tarjeta gráfica de `285 W` TBP, placa base con dos módulos DDR5 (`55 W`), dos SSD NVMe (`16 W`), un HDD de `3.5"` (`10 W`) y refrigeración líquida con cuatro ventiladores y periféricos USB (`34 W`).

1. **Carga máxima simultánea (`P_sistema`):**
   `P_sistema = 170 + 285 + 55 + 26 + 34 = 570 W`
2. **Aplicación del margen del `30 %`:**
   `P_PSU_recomendada = 570 W × 1.30 = 741 W`
   Redondeando al escalón comercial superior se selecciona una PSU de **`750 W`** (u `850 W` pensando en futuras actualizaciones de GPU).
3. **Comprobación de carga y consumo eléctrico real:**
   - Bajo carga sintética máxima (`570 W`), la fuente de `750 W` opera al `76.0 %`.
   - En juego real (`~425 W` DC), trabaja al `56.7 %`, justo sobre el pico de eficiencia.
   - Con certificación **80 PLUS Gold** (`η ≈ 0.90` al `50 %`), extrae `425 / 0.90 = 472.2 W` de la pared (`47.2 W` disipados como calor). Una fuente sin certificar al `75 %` tomaría `566.7 W`, generando `141.7 W` de calor interno: tres veces más desperdicio térmico.

## Perfiles de hardware y vataje recomendado por categoría

La tabla resume seis configuraciones tipo con su pico estimado, el margen `+30 %`, la PSU comercial sugerida y el mínimo exigible en el raíl `+12 V`:

| Perfil del sistema | Pico típico | Con +30 % | PSU sugerida | Raíl +12 V mínimo | Certificación |
| --- | --- | --- | --- | --- | --- |
| Ofimática / Mini-PC (iGPU) | 110 W | 143 W | 300–400 W | 20 A (240 W) | 80 PLUS Bronze |
| Gaming 1080p entrada | 310 W | 403 W | 450–550 W | 35 A (420 W) | 80 PLUS Bronze / Gold |
| Gaming 1440p gama media | 450 W | 585 W | 650 W | 50 A (600 W) | 80 PLUS Gold |
| Gaming 4K gama alta | 610 W | 793 W | 850 W (ATX 3.1) | 68 A (816 W) | 80 PLUS Gold / Platinum |
| Workstation entusiasta | 820 W | 1,066 W | 1,000–1,200 W (ATX 3.1) | 83 A (996 W) | 80 PLUS Platinum |
| Dual-GPU / IA local | 1,120 W | 1,456 W | 1,500–1,600 W | 120 A (1,440 W) | 80 PLUS Titanium |

## Errores críticos de compatibilidad, seguridad y vida útil

Más allá del vataje anunciado, cuatro factores técnicos protegen la integridad del hardware:

- **No mezclar cables modulares entre fuentes:** el pinado (*pinout*) interno en la salida de la PSU no está estandarizado entre marcas ni entre series del mismo fabricante. Reutilizar cables modulares de otra fuente puede invertir `+12 V` y masa, destruyendo discos y placa base al instante.
- **Exigir regulación DC-DC y protecciones completas:** verifique la presencia de topología `DC-DC` independiente y protecciones `OCP`, `OVP`, `UVP`, `OPP`, `SCP` y `OTP`.
- **Considerar el envejecimiento térmico:** los condensadores electrolíticos pierden capacidad con los años bajo calor continuo; dimensionar con margen compensa esta degradación gradual.
- **Dimensionar el SAI / UPS según la potencia en pared (`P_pared`):** sume el consumo AC de la PSU más el monitor y elija modelos de **onda senoidal pura** para compatibilidad plena con fuentes `Active PFC`.
