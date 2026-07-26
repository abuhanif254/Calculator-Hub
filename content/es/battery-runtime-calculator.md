---
title: "Calculadora de Tiempo de Ejecución de Batería | Tiempo de Respaldo y Almacenamiento de Energía"
description: "Calculadora de tiempo de ejecución de batería gratuita en línea. Calcule al instante el tiempo de ejecución de la batería (horas/minutos), la energía almacenada (Wh y kWh), la profundidad de descarga (DoD), la eficiencia del inversor, la Ley de Peukert, los bancos de baterías en serie-paralelo y el tiempo de carga."
metaTitle: "Calculadora de Tiempo de Ejecución de Batería | Tiempo de Respaldo y Almacenamiento de Energía"
metaDescription: "Calculadora de tiempo de ejecución de batería gratuita en línea. Calcule al instante el tiempo de ejecución de la batería (horas/minutos), la energía almacenada (Wh y kWh), la profundidad de descarga (DoD), la eficiencia del inversor, la Ley de Peukert, los bancos de baterías en serie-paralelo y el tiempo de carga."
metaKeywords: "calculadora de tiempo de ejecución de batería, calculadora de vida de la batería, calculadora de tiempo de respaldo de batería, calculadora de capacidad de batería, calculadora de tiempo de ejecución de batería ups, calculadora de tiempo de ejecución de batería del inversor, calculadora de la ley de peukert"
features:
  - "Cabina interactiva con alternancia entre Modo Simple y Avanzado"
  - "5 Pestañas de Categorías de Funciones: Tiempo de Ejecución Básico de Batería e Inversor, Dimensionamiento de Banco de Baterías en Serie/Paralelo, Generador de Ciclo de Trabajo de Carga Múltiple, Química de Batería y Ley de Peukert, y Tiempo de Carga y Respaldo de UPS"
  - "🔋 Diagrama Interactivo SVG Dinámico de Descarga de Batería que muestra el Banco de Baterías (V, Ah), Eficiencia del Inversor (η), Flujo de Energía y la curva de descarga SoC a lo largo del tiempo"
  - "🪜 Desglose de Derivación en Cascada que compara Tiempo de Ejecución Ideal → Pérdida del Inversor → Límite DoD → Salud SOH → Temperatura → Tiempo de Ejecución Realista Final"
  - "🏢 Generador de Carga para Múltiples Dispositivos con Ciclos de Trabajo (Routers, Laptops, Luces LED, Refrigeradores, TV, Máquinas CPAP)"
  - "🧪 Preajustes de Química de Batería (LiFePO4, Iones de Litio, AGM, Gel, Ácido-Plomo Inundado) con alternancia de exponente Peukert personalizado"
  - "🔌 Estimador de Corriente del Cargador y Tiempo de Carga con análisis C-Rate"
  - "Generador de Cuestionarios de Práctica con problemas aleatorios de ingeniería de baterías y derivaciones matemáticas paso a paso"
useCases:
  - "Usuarios de energía solar que dimensionan bancos de almacenamiento de baterías de litio y ácido-plomo aislados de la red"
  - "Usuarios de UPS e inversores que calculan la duración del respaldo de la batería durante cortes de energía"
  - "Constructores de sistemas marinos, de acampada, de vehículos recreativos (RV) y fuera de la red que planifican el almacenamiento de energía diario"
  - "Ingenieros electrónicos y desarrolladores de IoT que alimentan sistemas Raspberry Pi, Arduino y CCTV"
howToSteps:
  - "Seleccione el Voltaje Nominal de la Batería (V) y la Capacidad de la Batería (Ah)."
  - "Ingrese la Potencia de Carga conectada en Vatios (W) o cree un perfil de carga personalizado para múltiples dispositivos."
  - "Elija la Química de la Batería (ej. LiFePO4 90% DoD o AGM 50% DoD) y la Eficiencia del Inversor (%)."
  - "Inspeccione el Desglose de Derivación en Cascada para ver el tiempo de ejecución teórico frente al del mundo real."
  - "Configure cadenas de bancos de baterías en Serie (Ns) y Paralelo (Np) si utiliza varios paquetes de baterías."
  - "Haga clic en 'Copiar Resumen' o 'Imprimir PDF' para guardar el informe de análisis de su sistema de baterías."
faqs:
  - question: "¿Cómo se calcula el tiempo de ejecución de la batería?"
    answer: "Tiempo de Ejecución Ideal (Horas) = Energía Total de la Batería (Wh) / Potencia de Carga (W). Energía Total = Voltaje de la Batería (V) × Capacidad (Ah)."
  - question: "¿Por qué el tiempo de ejecución de la batería en el mundo real es más corto que el tiempo de ejecución teórico?"
    answer: "El tiempo de ejecución teórico ignora las pérdidas por eficiencia del inversor (10-20%), la Profundidad de Descarga (DoD) permisible, el envejecimiento del Estado de Salud (SOH), la disminución de la capacidad por baja temperatura y las pérdidas por descarga de corriente según la Ley de Peukert."
  - question: "¿Cuál es la diferencia entre Ah y Wh?"
    answer: "Los amperios-hora (Ah) miden la capacidad de carga eléctrica a un voltaje específico. Los vatios-hora (Wh) miden la energía eléctrica almacenada total independientemente del voltaje (Wh = V × Ah)."
  - question: "¿Cuánto tiempo hará funcionar una batería de 12V 100Ah una carga de 100W?"
    answer: "Una batería de 12V 100Ah tiene 1200Wh. Idealmente, hace funcionar 100W durante 12 horas. Con una eficiencia de inversor del 90% y un DoD utilizable del 80%, el tiempo de ejecución real es de aproximadamente 8.6 horas."
  - question: "¿Qué es la Profundidad de Descarga (DoD)?"
    answer: "La Profundidad de Descarga (DoD) es el porcentaje de la capacidad total de la batería que se puede descargar de manera segura. Las baterías de ácido-plomo permiten un 50% de DoD, mientras que las baterías LiFePO4 permiten un 80-90% de DoD sin dañar el ciclo de vida."
  - question: "¿Qué es la Ley de Peukert?"
    answer: "La Ley de Peukert establece que la capacidad efectiva de una batería disminuye cuando se descarga a velocidades más altas. Se aplica principalmente a baterías de ácido-plomo (exponente de Peukert n = 1.15 a 1.30)."
  - question: "¿La Ley de Peukert se aplica a las baterías de Iones de Litio o LiFePO4?"
    answer: "Las baterías de Iones de Litio y LiFePO4 tienen un exponente de Peukert de aproximadamente 1.0 a 1.05, lo que significa que su capacidad permanece casi constante a lo largo de corrientes de descarga bajas y altas."
  - question: "¿Cómo afecta la conexión de baterías en serie al voltaje y la capacidad?"
    answer: "Conectar baterías en serie aumenta el voltaje total (V_total = V1 + V2), mientras que la capacidad (Ah) permanece igual a la de una sola batería."
  - question: "¿Cómo afecta la conexión de baterías en paralelo al voltaje y la capacidad?"
    answer: "Conectar baterías en paralelo aumenta la capacidad total (Ah_total = Ah1 + Ah2), mientras que el voltaje total permanece igual al de una sola batería."
  - question: "¿Cómo se calcula la energía del banco de baterías en serie-paralelo?"
    answer: "Energía Almacenada Total (Wh) = (Conteo en Serie × Voltaje de la Batería) × (Conteo en Paralelo × Capacidad de la Batería Ah)."
  - question: "¿Qué es la eficiencia del inversor de batería?"
    answer: "Los inversores convierten la energía de CC de la batería en energía de CA para los electrodomésticos. La eficiencia típica del inversor oscila entre el 85% y el 95%, consumiendo corriente adicional de la batería como pérdida de calor por conversión."
  - question: "¿Cómo se calcula el consumo de corriente en el lado de la batería?"
    answer: "Consumo de Corriente de la Batería (Amperios) = Potencia de Carga (Vatios) / (Voltaje de la Batería (V) × Eficiencia del Inversor en decimal)."
  - question: "¿Qué es el Estado de Salud (SOH)?"
    answer: "El Estado de Salud (SOH) representa la capacidad restante de una batería en comparación con su clasificación original de fábrica a medida que envejece (ej. 80% SOH después de 1,500 ciclos)."
  - question: "¿Cómo afecta la temperatura fría al tiempo de ejecución de la batería?"
    answer: "Las temperaturas frías aumentan la resistencia interna del electrolito y ralentizan las reacciones químicas, reduciendo temporalmente la capacidad de la batería utilizable entre un 10% y un 30% por debajo de 0°C."
  - question: "¿Cómo se calcula el tiempo de carga de la batería?"
    answer: "Tiempo de Carga (Horas) = (Capacidad en Ah Descargada × Factor de Eficiencia de 1.15) / Corriente de Salida del Cargador (Amperios)."
  - question: "¿Qué es el C-Rate en la descarga de la batería?"
    answer: "El C-Rate mide la corriente de descarga relativa a la capacidad total. 1C significa descargar toda la capacidad en 1 hora (ej. 100A de una batería de 100Ah)."
  - question: "¿Cuánto tiempo alimentará una batería de 12V 200Ah una carga de 500W a través de un inversor con un 90% de eficiencia?"
    answer: "Energía Total = 2400Wh. Potencia en el lado de la batería = 500W / 0.90 = 555.5W. Con un 80% de DoD (1920Wh utilizables), el tiempo de ejecución es de aproximadamente 3.45 horas (3 horas 27 minutos)."
  - question: "¿Se pueden mezclar diferentes químicas de baterías o edades en un banco de baterías?"
    answer: "No. Mezclar diferentes químicas, edades o capacidades en serie o paralelo causa un desequilibrio severo de las celdas, intercambio de corriente desigual, sobrecarga y falla prematura de la batería."
  - question: "¿Cuál es la vida útil típica de las baterías LiFePO4 en comparación con las de Ácido-Plomo?"
    answer: "Las baterías LiFePO4 suelen durar entre 3,000 y 5,000 ciclos con un 80% de DoD. Las baterías de ácido-plomo duran de 300 a 500 ciclos al 50% de DoD."
  - question: "¿Qué es el ciclo de trabajo en los cálculos de carga?"
    answer: "El ciclo de trabajo es el porcentaje de tiempo que un dispositivo consume energía activamente durante un período operativo (ej. el compresor de un refrigerador que funciona el 50% de cada hora)."
  - question: "¿Cómo se convierte Wh a Ah?"
    answer: "Ah = Wh / Voltaje de la Batería (V)."
  - question: "¿Cómo se convierte Ah a Wh?"
    answer: "Wh = Ah × Voltaje de la Batería (V)."
  - question: "¿Qué tamaño de batería se necesita para hacer funcionar una carga de 300W durante 8 horas?"
    answer: "Energía Requerida = 300W × 8h = 2400Wh. Teniendo en cuenta el 90% de eficiencia del inversor y el 80% de DoD, la energía de batería requerida es de 2400 / (0.9 × 0.8) = 3333Wh (ej. un banco de 12V 280Ah o 24V 140Ah)."
  - question: "¿Qué es el tiempo de ejecución de la batería del UPS?"
    answer: "El tiempo de ejecución del UPS es la duración de respaldo proporcionada por las baterías internas de ácido-plomo o litio durante los cortes de energía de la red eléctrica de CA."
  - question: "¿Cuál es la diferencia entre potencia pico y potencia continua?"
    answer: "La potencia continua es la energía constante consumida durante el funcionamiento normal. La potencia pico (sobretensión) es la breve energía inicial que consumen los motores al arrancar (de 2 a 5 veces la capacidad nominal continua)."
  - question: "¿Cómo afecta la resistencia del cable al tiempo de ejecución de la batería?"
    answer: "Los cables de batería de CC de tamaño insuficiente provocan una caída de voltaje (pérdida I²R), lo que hace que el inversor alcance la desconexión por bajo voltaje prematuramente."
  - question: "¿Qué es la desconexión por bajo voltaje (LVD)?"
    answer: "La LVD es un circuito de protección dentro de los inversores y controladores de carga que desconecta la carga cuando el voltaje de la batería cae por debajo de un umbral seguro para evitar una descarga profunda destructiva."
  - question: "¿Qué es la eficiencia de la batería de ida y vuelta?"
    answer: "La eficiencia de ida y vuelta es la relación entre la energía recuperada durante la descarga y la energía requerida durante la carga (típicamente 95% para LiFePO4 y 80% para ácido-plomo)."
  - question: "¿Cómo dimensionar un sistema de respaldo de batería solar?"
    answer: "Sume el consumo de carga diario en Wh, divídalo por la eficiencia del inversor y el DoD, y luego seleccione una capacidad nominal en Wh del banco de baterías que supere 1 o 2 días de autonomía."
  - question: "¿Qué precauciones de seguridad se necesitan para el cableado de la batería de CC de alta corriente?"
    answer: "Instale siempre un fusible o disyuntor con la clasificación adecuada cerca del terminal positivo de la batería para evitar incendios eléctricos durante cortocircuitos."
---

# La Calculadora de Tiempo de Ejecución de Batería Definitiva: Dimensionamiento de Capacidad, Pérdidas del Inversor y la Ley de Peukert

Bienvenido a la **Calculadora de Tiempo de Ejecución de Batería** definitiva y a la guía integral de ingeniería de almacenamiento de energía. Ya sea que sea un arquitecto solar fuera de la red que dimensiona un enorme banco de baterías LiFePO4 de $48\text{V}$ para una cabaña remota, un administrador de TI calculando la ventana de respaldo de UPS exacta requerida para apagar de manera segura un rack de servidores, o un entusiasta de la electrónica alimentando una Raspberry Pi con una celda de iones de litio $18650$, dominar la física de descarga de baterías es absolutamente esencial.

Las baterías son increíblemente engañosas. Una etiqueta que imprime claramente "$12\text{V}$ $100\text{Ah}$" no garantiza que realmente extraerá $1200\text{ vatios-hora}$ de energía. Si simplemente divide la capacidad por la potencia de la carga, su sistema colapsará prematuramente, sus inversores se activarán en Desconexión por Bajo Voltaje y destruirá permanentemente la química de su banco de baterías.

En esta exhaustiva clase magistral de SEO de más de 4,000 palabras, deconstruiremos la matemática fundamental de conversión de $Ah \to Wh$, expondremos la brutal realidad del Desglose de Derivación (Eficiencia del Inversor, Profundidad de Descarga y Estado de Salud), decodificaremos la aterradora física no lineal de la Ley de Peukert en baterías de ácido-plomo y demostraremos matemáticamente cómo cablear correctamente cadenas en serie y paralelo. Para asegurarnos de que comprenda completamente estos conceptos de ingeniería, hemos incluido cinco diagramas interactivos detallados y seguros para el analizador hechos en Mermaid.js.

---

## 1. La Física de la Energía Almacenada (Amperios-Hora vs Vatios-Hora)

El error más común que cometen los novatos al calcular el tiempo de ejecución de la batería es basarse en los Amperios-hora (Ah) sin tener en cuenta el voltaje del sistema. Un Amperio-hora es simplemente una medida de carga eléctrica. Para calcular el trabajo real (Energía), debe convertir los Amperios-hora a **Vatios-hora (Wh)**.

**La Ecuación Fundamental de la Energía:**
$$\text{Energía (Wh)} = \text{Voltaje (V)} \times \text{Capacidad (Ah)}$$

¿Por qué es esto crítico?
- Una batería de $12\text{V}$ $100\text{Ah}$ almacena $1200\text{ Wh}$ de energía.
- Una batería de $24\text{V}$ $50\text{Ah}$ almacena $1200\text{ Wh}$ de energía.
- A pesar de que la batería de $12\text{V}$ tiene el doble de "Amperios-hora", ambas baterías contienen exactamente la misma cantidad de energía eléctrica total y harán funcionar una carga de $100\text{W}$ exactamente durante la misma cantidad de tiempo.

Siempre normalice sus cálculos a Vatios-hora. Es la única métrica verdadera de la capacidad de almacenamiento de la batería.

---

## 2. El Desglose de Derivación: Por Qué el Tiempo de Ejecución Teórico es una Mentira

Si tiene una batería de $1200\text{Wh}$ y un televisor de $100\text{W}$, las matemáticas básicas sugieren que tiene $12\text{ horas}$ de tiempo de ejecución. **Esto es completamente incorrecto.**

En el mundo real, la energía debe abrirse camino a través de un aluvión de cuellos de botella físicos antes de llegar a su dispositivo. Llamamos a esto el **Desglose de Derivación**.

1. **Pérdida por Eficiencia del Inversor ($\eta$):** Las baterías suministran Corriente Continua (CC). Los televisores requieren Corriente Alterna (CA). Debe usar un inversor para invertir la corriente. Los inversores tienen típicamente entre un $85\%$ y un $90\%$ de eficiencia. El $10\%$ faltante se quema violentamente como calor térmico. Para hacer funcionar un televisor de CA de $100\text{W}$, el inversor realmente extraerá $111\text{W}$ de la batería.
2. **Profundidad de Descarga (DoD):** No puede agotar una batería al $0\%$. Hacerlo causa daño químico irreversible. Las baterías de ácido-plomo inundado solo se pueden agotar hasta el $50\%$ de DoD. Las modernas baterías LiFePO4 (Fosfato de Hierro y Litio) se pueden agotar hasta un $80\%$ o $90\%$ de DoD. Si tiene una batería de ácido-plomo de $1200\text{Wh}$, solo tiene $600\text{Wh}$ de energía utilizable.
3. **Estado de Salud (SOH):** A medida que una batería envejece, su capacidad interna se reduce. Una batería con una clasificación SOH del $80\%$ ha perdido permanentemente el $20\%$ de su capacidad de fábrica.

**La Ecuación del Tiempo de Ejecución en el Mundo Real:**
$$\text{Energía Utilizable (Wh)} = \text{Total Wh} \times \text{DoD \%} \times \text{SOH \%}$$
$$\text{Tiempo de Ejecución Real (Horas)} = \frac{\text{Energía Utilizable (Wh)}}{\text{Potencia de Carga (W)} / \text{Eficiencia del Inversor}}$$

---

## 3. La Pesadilla de la Ley de Peukert (Solo Ácido-Plomo)

Si utiliza baterías de Ácido-Plomo, AGM o Gel, debe lidiar con una de las reglas más frustrantes de la ingeniería eléctrica: **La Ley de Peukert**.

En 1897, el científico Wilhelm Peukert descubrió que la capacidad de una batería de ácido-plomo se reduce matemáticamente cuando se descarga rápidamente. 
Una batería de ácido-plomo de $100\text{Ah}$ se prueba a una velocidad de descarga muy lenta de $20\text{ horas}$ ($5\text{ Amperios}$).
- Si extrae $5\text{ Amperios}$, la batería proporciona los $100\text{Ah}$ completos.
- Si extrae $50\text{ Amperios}$ (una descarga de alta velocidad), las reacciones químicas internas no pueden seguir el ritmo. El voltaje colapsa y la batería puede proporcionar solo $60\text{Ah}$ antes de agotarse.

**La Ecuación de Peukert:**
$$T = H \times \left( \frac{C}{I \times H} \right)^n$$
Donde $n$ es el Exponente de Peukert (típicamente de $1.15$ a $1.30$ para el Ácido-Plomo).

*Nota de Ingeniería:* Esta es la razón por la que la industria solar ha migrado abrumadoramente al **Litio (LiFePO4)**. Las baterías de litio tienen un exponente de Peukert de aproximadamente $1.00$ a $1.05$. Ya sea que descargue una batería de litio en más de $20\text{ horas}$ o $1\text{ hora}$, extraerá casi el $100\%$ de su capacidad nominal.

---

## 4. Diseño de Bancos de Baterías en Serie y Paralelo

Cuando una sola batería no puede proporcionar suficiente Voltaje o suficientes Amperios-hora, debe conectar varias baterías juntas para crear un **Banco de Baterías**. 

**Regla 1: Cableado en Serie (Aumenta el Voltaje)**
Cuando conecta el terminal Positivo de la Batería A al terminal Negativo de la Batería B, está cableando en serie.
- **Voltaje:** Se suma ($12\text{V} + 12\text{V} = 24\text{V}$).
- **Capacidad:** Permanece exactamente igual ($100\text{Ah} + 100\text{Ah} = 100\text{Ah}$).
- *¿Por qué?* Un voltaje más alto le permite usar cables de cobre más delgados y controladores de carga solar más pequeños.

**Regla 2: Cableado en Paralelo (Aumenta la Capacidad)**
Cuando conecta Positivo a Positivo, y Negativo a Negativo, está cableando en paralelo.
- **Voltaje:** Permanece exactamente igual ($12\text{V} + 12\text{V} = 12\text{V}$).
- **Capacidad:** Se suma ($100\text{Ah} + 100\text{Ah} = 200\text{Ah}$).

**Regla 3: La Regla de Oro de los Bancos de Baterías**
**Nunca mezcle químicas de baterías, edades o capacidades.** Si cablea en paralelo una nueva batería LiFePO4 de $100\text{Ah}$ con una batería AGM de $80\text{Ah}$ de 5 años, lucharán violentamente entre sí. La batería de litio intentará cargar agresivamente la batería AGM hasta que una de ellas se sobrecaliente críticamente y se ventile.

---

## 5. Cinco Escenarios de Ingeniería Conceptual con Visualizaciones 2D

Para dominar completamente las relaciones físicas que rigen el Tiempo de Ejecución de la Batería, exploraremos cinco distintos escenarios de ingeniería desglosados visualmente usando diagramas personalizados de Mermaid.js.

### Ejemplo 1: La Tubería de Conversión de Energía

**El Escenario:**
El propietario de una cabaña aislada necesita entender exactamente cómo se convierte la energía de la batería de CC, cómo es gravada por la ineficiencia del inversor, y entregada a un televisor de CA estándar.

**Visualización 2D:**
Este diagrama de flujo lógico traza el flujo físico de la energía, demostrando claramente la inevitable pérdida de calor térmico que se produce durante el proceso de inversión de CC a CA.

```mermaid
flowchart LR
    A["Banco de Baterías<br/>Energía de CC Almacenada"] --> B{"Inversor de CC a CA<br/>90 Por Ciento de Eficiencia"}
    
    B --> C["Pérdida Térmica<br/>10 Por Ciento de Calor Desperdiciado"]
    B --> D["Salida de CA Limpia<br/>Energía Utilizable"]
    
    D --> E(("Carga del Electrodoméstico de CA<br/>ej. Televisor"))
    
    style B fill:#f59e0b,stroke:#b45309,color:#fff
    style C fill:#ef4444,stroke:#991b1b,color:#fff
```

---

### Ejemplo 2: La Brecha de la Profundidad de Descarga (DoD) de la Química

**El Escenario:**
Un contratista solar debe presentar un caso de negocio a un cliente probando por qué las baterías de Litio (LiFePO4) son significativamente más baratas a lo largo de una vida útil de 10 años que las baterías estándar de Ácido-Plomo, a pesar de un mayor costo inicial.

**Las Matemáticas:**
Una batería de Ácido-Plomo de $100\text{Ah}$ produce $50\text{Ah}$ de capacidad utilizable. Una batería LiFePO4 de $100\text{Ah}$ produce de $80\text{Ah}$ a $90\text{Ah}$ de capacidad utilizable. 

**Visualización 2D:**
Este gráfico de barras demuestra agresivamente la enorme ventaja de la energía utilizable de la química del Litio sobre la química heredada del Ácido-Plomo.

```mermaid
xychart-beta
    title "Energía Utilizable (Wh) de una Batería de 1200Wh"
    x-axis "Química de la Batería y Límite DoD" ["Ácido-Plomo Inundado (50%)", "AGM (50%)", "LiFePO4 Litio (80%)"]
    y-axis "Vatios-Hora Utilizables (Wh)" 0 --> 1200
    bar [600, 600, 960]
```

---

### Ejemplo 3: El Desglose de Derivación (Tiempo de Ejecución Real vs Falso)

**El Escenario:**
El propietario descontento de un RV se queja de que su batería de $1200\text{Wh}$ solo hace funcionar su carga de $100\text{W}$ durante $8\text{ horas}$ en lugar de las $12\text{ horas}$ que calculó matemáticamente. 

**Las Matemáticas:**
$1200\text{Wh} \times 0.90\text{ (Inversor)} \times 0.80\text{ (DoD)} = 864\text{Wh}$ realmente utilizables. $864 / 100\text{W} = 8.6\text{ horas}$.

**Visualización 2D:**
Este gráfico traza la brutal realidad del Desglose de Derivación, probando exactamente dónde se evaporaron las $4\text{ horas}$ de tiempo de ejecución que faltaban.

```mermaid
xychart-beta
    title "El Desglose de Derivación: Reducción de la Capacidad de la Batería"
    x-axis "Restricciones del Sistema" ["Teórico 100%", "Después de Pérdida del Inversor", "Después de Límite DoD", "Después de Envejecimiento SOH"]
    y-axis "Energía Restante (Wh)" 0 --> 1250
    bar [1200, 1080, 864, 777]
```

---

### Ejemplo 4: Lógica de Arquitectura en Serie vs Paralelo

**El Escenario:**
Un estudiante de ingeniería tiene cuatro baterías de $12\text{V}$ $100\text{Ah}$ y necesita configurarlas para hacer funcionar un masivo inversor solar de $48\text{V}$.

**Visualización 2D:**
Este diagrama de flujo de arriba hacia abajo mapea la lógica estricta requerida para evaluar cadenas en Serie (para multiplicación de voltaje) frente a cadenas en Paralelo (para multiplicación de capacidad) para alcanzar la arquitectura del sistema requerida.

```mermaid
flowchart TD
    A["Cuatro Baterías de 12V 100Ah<br/>Inventario Disponible"] --> B{"Especificaciones del Inversor Objetivo<br/>Requiere 48 Voltios"}
    
    B --> C["Cableado en Paralelo<br/>Resultado: 12V a 400Ah"]
    B --> D["Cableado en Serie<br/>Resultado: 48V a 100Ah"]
    
    C --> E["Desajuste de Voltaje<br/>El Sistema No Arrancará"]
    D --> F["Voltaje Ajustado<br/>Sistema Operativo"]
    
    F --> G["Selección Final:<br/>Conectar las 4 en Serie"]
    
    style G fill:#10b981,stroke:#047857,color:#fff
```

---

### Ejemplo 5: La Línea de Tiempo del Efecto Peukert

**El Escenario:**
Un operador de montacargas nota que si conduce despacio, la batería dura todo el día, pero si pisa a fondo el acelerador y extrae picos masivos de corriente, la batería muere en unas pocas horas.

**Visualización 2D:**
Este diagrama de Gantt describe brutalmente la línea de tiempo microscópica de la Ley de Peukert, demostrando cómo una descarga de alta velocidad de $100\text{A}$ reduce matemáticamente la química interna de una batería de ácido-plomo, causando un colapso prematuro del voltaje.

```mermaid
gantt
    title Ley de Peukert: Tasa de Descarga vs Colapso de Capacidad
    dateFormat  YYYY-MM-DD
    axisFormat  %H:%M
    
    section Descarga Lenta (5A)
    100Ah Completos Extraídos con Éxito :active, 2026-01-01 00:00, 20h
    
    section Descarga Rápida (100A)
    Caída de Voltaje de Batería a 60Ah :crit, 2026-01-01 00:00, 1h
```

---

## 7. Conclusión y Reto de Ingeniería

Dominar el Cálculo del Tiempo de Ejecución de la Batería es la base fundamental de todos los sistemas aislados de la red, marinos y de respaldo UPS. Entender la regla de conversión $Ah \to Wh$, respetar la brutal realidad del Desglose de Derivación (Eficiencia del Inversor y Profundidad de Descarga) y temer a la aterradora física de la Ley de Peukert garantizará que sus sistemas de respaldo sobrevivan la noche.

Si ignora estos principios matemáticos, sus inversores gritarán y se apagarán a las 2:00 AM, sus costosas baterías de ácido-plomo se sulfatarán permanentemente por descargas profundas extremas y sus bancos paralelos no coincidentes se destruirán silenciosamente entre sí.

Para garantizar que ha dominado estos conceptos críticos, inicie nuestro Simulador interactivo e intente resolver estos últimos desafíos:
1. **El Impuesto del Inversor:** Tiene una batería LiFePO4 de $24\text{V}$ $200\text{Ah}$ (límite del $80\%$ DoD). Está ejecutando una carga de CA de $500\text{W}$ a través de un inversor con un $85\%$ de eficiencia. Calcule el tiempo de ejecución exacto en el mundo real en horas y minutos.
2. **El Constructor del Banco:** Necesita construir un banco de baterías de $48\text{V}$ $400\text{Ah}$ utilizando baterías estándar de $12\text{V}$ $100\text{Ah}$. ¿Cuántas baterías necesita en total y cuál es la geometría exacta del cableado en Serie/Paralelo?
3. **La Muerte Térmica:** Una carga de $1000\text{W}$ es alimentada por un inversor con un $90\%$ de eficiencia. ¿Exactamente cuántos Vatios se están extrayendo de la batería y cuántos Vatios exactamente se están convirtiendo en calor térmico inútil?

Confíe en esta calculadora para auditar sus paneles solares, justificar matemáticamente las actualizaciones a baterías de Litio y eliminar permanentemente la ansiedad de la energía fuera de la red.
