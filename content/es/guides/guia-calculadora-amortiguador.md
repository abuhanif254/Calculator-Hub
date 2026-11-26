---
title: "Calculadora de Amortiguadores: Manteniendo la Estabilidad del pH"
description: "Guía técnica sobre soluciones amortiguadoras (tampones químicos): cálculo de proporciones ácido-base, capacidad amortiguadora de Van Slyke, preparación en laboratorio y tabla de sistemas."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "buffer-calculator"
faqs:
  - question: "¿Qué diferencia existe entre el pH de un amortiguador y su capacidad amortiguadora?"
    answer: "El pH depende únicamente del pKa del sistema y de la proporción relativa [A⁻] / [HA], mientras que la capacidad amortiguadora mide la cantidad absoluta de ácido o base fuerte que la disolución puede neutralizar antes de sufrir un cambio significativo de pH. Dos tampones pueden tener idéntico pH pero capacidades muy distintas si difieren en su concentración molar total."
  - question: "¿Por qué se recomienda elegir un ácido débil cuyo pKa esté a menos de una unidad del pH objetivo?"
    answer: "Porque la capacidad amortiguadora alcanza su máximo exacto cuando pH = pKa ([A⁻] = [HA]) y decae drásticamente al alejarse más de ±1 unidad. A una distancia superior a una unidad de pH, uno de los dos componentes representa menos del 9 % del total y se agota rápidamente ante pequeñas adiciones externas."
  - question: "¿Cómo se prepara un amortiguador si solo se dispone del ácido débil y de una base fuerte como NaOH?"
    answer: "Se parte de una disolución del ácido débil y se añade una cantidad calculada de NaOH para convertir exactamente la fracción requerida de HA en su base conjugada A⁻ mediante neutralización parcial. El volumen añadido de base fuerte aporta los moles exactos de A⁻ y reduce en igual proporción los moles remanentes de HA."
  - question: "¿Qué papel desempeña la capacidad amortiguadora de Van Slyke (β)?"
    answer: "El índice β cuantifica formalmente los moles por litro de ácido o base fuerte necesarios para variar el pH de un tampón en exactamente una unidad. Resulta esencial en diseño farmacéutico y bioprocesos para asegurar que el metabolismo celular o la hidrólisis de excipientes no desvíen el pH fuera de especificación."
  - question: "¿Por qué la dilución excesiva debilita un tampón aunque su pH teórico no cambie?"
    answer: "Al diluir un tampón diez veces, el cociente [A⁻] / [HA] permanece prácticamente invariable y el pH se conserva, pero la reserva molar disponible por litro se reduce a la décima parte. En consecuencia, una contaminación mínima de dióxido de carbono atmosférico o residuos en el vidrio alterará con facilidad el pH."
---

Una **solución amortiguadora** (o *tampón químico*) es una disolución acuosa que resiste cambios bruscos de pH ante la adición moderada de ácidos o bases fuertes. Se formula combinando un ácido débil (`HA`), que neutraliza los iones hidróxido entrantes, y su base conjugada (`A⁻`), encargada de capturar los protones adicionales.

Preparar un tampón preciso exige calcular tanto la razón molar entre ambas especies como las masas exactas requeridas para alcanzar la concentración total deseada. Nuestra [Calculadora de Amortiguadores](/es/calculadoras/calculadora-de-tampon-quimico) obtiene estas proporciones al instante. En esta guía se detallan las ecuaciones de diseño, la capacidad de Van Slyke, un ejemplo completo de preparación de tampón fosfato y los errores habituales en el laboratorio.

## Ecuaciones de diseño y capacidad amortiguadora

El diseño cuantitativo de un tampón combina el ajuste del **pH objetivo** con la selección de una **concentración total (`C_T`)** suficiente para absorber la carga química del experimento.

### 1. Proporción y concentraciones individuales

Al despejar el cociente base/ácido de la ecuación de Henderson-Hasselbalch y aplicar el balance de masa `C_T = [HA] + [A⁻]`, se obtienen las molaridades exactas de cada componente:

```text
R = [A⁻] / [HA] = 10^(pH_objetivo − pKa)
[HA] = C_T / (1 + R)
[A⁻] = C_T − [HA] = (C_T × R) / (1 + R)
```

### 2. Capacidad amortiguadora de Van Slyke (β)

La resistencia real del tampón frente a perturbaciones se cuantifica mediante el índice `β` (`mol·L⁻¹·pH⁻¹`), definido como los moles por litro de base o ácido fuerte necesarios para variar el pH en una unidad:

```text
β = 2.303 × C_T × (Ka × [H⁺]) / (Ka + [H⁺])²
```

Donde:

- **`C_T`:** concentración analítica total (`[HA] + [A⁻]`, en `mol/L`).
- **`Ka`:** constante de disociación ácida (`10^(−pKa)`).
- **`[H⁺]`:** concentración de protones al pH objetivo (`10^(−pH)`).
- **`2.303`:** factor de conversión `ln(10)`.

El cociente alcanza su máximo de `0.25` cuando `[H⁺] = Ka` (`pH = pKa`), estableciendo el techo teórico `β_máx = 0.576 × C_T`.

## Ejemplo resuelto: preparación de 500 mL de tampón fosfato pH 7.40

Se desean preparar `500 mL` (`0.500 L`) de tampón fosfato `0.100 M` (`C_T = 0.100 mol/L`) a `pH 7.40` y `25 °C` usando `NaH₂PO₄·H₂O` (masa molar `137.99 g/mol`) y `Na₂HPO₄` anhidro (`141.96 g/mol`), sabiendo que `pKa₂ = 7.20`.

### Paso 1: calcular la proporción molar R

```text
R = [HPO₄²⁻] / [H₂PO₄⁻] = 10^(7.40 − 7.20) = 10^(0.20) = 1.5849
```

### Paso 2: determinar las concentraciones individuales

```text
[H₂PO₄⁻] = 0.100 / (1 + 1.5849) = 0.03869 M (38.69 mM)
[HPO₄²⁻] = 0.100 − 0.03869 = 0.06131 M (61.31 mM)
```

### Paso 3: calcular las masas para 0.500 L

1. **Sal ácida (`NaH₂PO₄·H₂O`):** `0.03869 mol/L × 0.500 L = 0.019345 mol × 137.99 g/mol = 2.67 g`.
2. **Sal básica (`Na₂HPO₄`):** `0.06131 mol/L × 0.500 L = 0.030655 mol × 141.96 g/mol = 4.35 g`.

### Paso 4: verificar la capacidad amortiguadora (β)

Con `Ka = 6.310 × 10⁻⁸` y `[H⁺] = 3.981 × 10⁻⁸`:

```text
β = 2.303 × 0.100 × (6.310 × 10⁻⁸ × 3.981 × 10⁻⁸) / (1.0291 × 10⁻⁷)² = 0.0546 mol/(L·pH)
```

El tampón neutraliza `54.6 mmol/L` por unidad de pH desplazada, muy próximo al óptimo teórico (`57.6 mmol/L` a `pH 7.20`). En la práctica, si este medio recibiera una contaminación equivalente a `10 mmol/L` de protones metabólicos, el cambio de pH estimado sería inferior a `0.19` unidades, manteniendo intacta la actividad de la mayoría de las enzimas fisiológicas.

Para preparar el medio en mesa de laboratorio, disuelva ambos reactivos en unos `400 mL` de agua ultrapura con agitación magnética continua hasta homogeneizar por completo, verifique la lectura con un pH-metro calibrado mediante estándares trazables de `pH 4.01` y `pH 7.00` a `25 °C`, realice un ajuste fino gota a gota si existiera deriva por hidratación de las sales y finalmente enrase a `500 mL` en matraz aforado. Cualquier dilución posterior reducirá proporcionalmente la capacidad amortiguadora disponible aunque el pH permanezca prácticamente estable.

## Tabla de referencia: eficacia según la desviación respecto al pKa

Para un amortiguador `0.100 M` con `pKa = 7.00`, la capacidad `β` decae rápidamente fuera del intervalo `pKa ± 1`:

| Desviación (`pH − pKa`) | pH objetivo | Razón `[A⁻]/[HA]` | Ácido (`%`) | Base (`%`) | Capacidad `β` (`mM/pH`) | Desempeño |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `−1.50` | `5.50` | `0.0316` | `96.9 %` | `3.1 %` | `6.8` | Débil ante ácidos |
| `−1.00` | `6.00` | `0.100` | `90.9 %` | `9.1 %` | `19.0` | Límite inferior útil |
| `−0.50` | `6.50` | `0.316` | `76.0 %` | `24.0 %` | `42.0` | Estabilidad alta |
| `0.00` | `7.00` | `1.000` | `50.0 %` | `50.0 %` | `57.6` | Máxima capacidad |
| `+0.50` | `7.50` | `3.162` | `24.0 %` | `76.0 %` | `42.0` | Estabilidad alta |
| `+1.00` | `8.00` | `10.00` | `9.1 %` | `90.9 %` | `19.0` | Límite superior útil |
| `+1.50` | `8.50` | `31.62` | `3.1 %` | `96.9 %` | `6.8` | Débil ante bases |

## Usos prácticos, errores frecuentes y criterios experimentales

### Aplicaciones principales

- **Biorreactores y cultivos celulares:** estabilizan medios nutritivos frente a metabolitos ácidos como lactato y `CO₂`, preservando el crecimiento celular y la viabilidad enzimática.
- **Formulaciones farmacéuticas:** evitan la hidrólisis de fármacos y previenen irritación en soluciones oftálmicas o inyectables.
- **Electroforesis y purificación:** conservan la estructura nativa y la carga neta de proteínas y ácidos nucleicos.

### Errores críticos y advertencias técnicas

1. **Alterar `C_T` al ajustar el pH:** corregir un tampón fosfato añadiendo `H₃PO₄` aumenta la concentración total; use bases o ácidos fuertes sin el ion común (`NaOH` o `HCl`) o ajuste por pesada estequiométrica.
2. **Enrasar antes de medir el pH:** disuelva los reactivos en el `80 %` del agua prevista, verifique el pH con el potenciómetro calibrado y complete el volumen final después.
3. **Exponer tampones alcalinos al aire:** a `pH > 8.0`, el `CO₂` atmosférico se disuelve formando ácido carbónico y reduce gradualmente el pH.
4. **Incompatibilidades iónicas:** el fosfato precipita con `Ca²⁺` y `Mg²⁺`; utilice tampones zwitteriónicos de Good (HEPES o MOPS) cuando existan cationes divalentes esenciales.
