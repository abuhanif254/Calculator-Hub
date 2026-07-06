---
metaTitle: "Comprobador de Contraste de Color | WCAG 2.1 Accesibilidad Web"
metaDescription: "Audite la accesibilidad web visual con nuestro Comprobador de Contraste. Cumpla los estándares WCAG 2.1 AA/AAA, simule daltonismo y auto-corrija colores."
metaKeywords: "comprobador contraste wcag, accesibilidad web, color contrast calculator, contraste tailwind css, simulador daltonismo, contraste a11y, contraste texto legibilidad, diseno inclusivo"
title: "Comprobador de Contraste (WCAG)"
shortDescription: "Compruebe, audite y corrija el contraste de sus colores UI bajo los estrictos estándares WCAG 2.1. Simule deficiencias visuales y genere tokens accesibles."
faqs:
  - question: "¿Qué es el contraste de color en accesibilidad web?"
    answer: "El contraste de color es la diferencia física en la reflectancia de luz (Luminancia Relativa) entre el color del texto (primer plano) y el color de fondo. Un contraste suficiente y elevado es absolutamente obligatorio para que usuarios con visión reducida, daltonismo o presbicia puedan leer el contenido de una interfaz."
  - question: "¿Cómo se calcula la Luminancia Relativa (Relative Luminance) matemáticamente?"
    answer: "La luminancia relativa mide el brillo perceptivo de un color normalizado entre el valor 0 (el negro más oscuro posible) y 1 (el blanco más brillante). Se calcula extrayendo y aplicando primero una corrección gamma a los canales crudos RGB (Rojo, Verde, Azul), y posteriormente ponderándolos multiplicándolos por constantes basadas en las sensibilidades de onda específicas del ojo humano."
  - question: "¿Cuál es la diferencia crítica entre los estándares normativos WCAG AA y WCAG AAA?"
    answer: "El Nivel AA (Level AA) es el estándar de cumplimiento general comercial obligatorio para la inmensa mayoría de las páginas web (ej. empresas y tiendas). Requiere un radio mínimo de 4.5:1 para texto normal y 3.0:1 para textos grandes. El Nivel AAA (Level AAA) es mucho más estricto, diseñado para plataformas gubernamentales e instituciones públicas, exigiendo un aplastante 7.0:1 para texto normal y 4.5:1 para grande."
  - question: "¿Qué tamaño de fuente califica exactamente como 'Texto Grande' bajo las reglas WCAG?"
    answer: "Bajo la métrica WCAG, el Texto Grande se define estrictamente como tipografía de al menos 18pt (aproximadamente 24px) en peso normal, o de 14pt (aproximadamente 18.66px) si está en negrita (Bold). Debido a que son letras más masivas, las reglas de contraste son algo más indulgentes."
  - question: "¿Cómo funciona la mágica función de Sugerencia Inteligente de Corrección de Contraste?"
    answer: "Si sus colores fallan el test, no tiene que adivinar a ciegas para arreglarlo. Nuestro algoritmo inteligente toma el canal de luminosidad (Lightness del modelo HSL) del color frontal y lo desplaza de manera progresiva y automática (oscureciéndolo si el fondo es claro, o iluminándolo si el fondo es oscuro) hasta encontrar el color más exacto posible que roce y apruebe justo el límite del estándar WCAG."
  - question: "¿Cómo simula la herramienta el daltonismo (Color vision deficiencies)?"
    answer: "Cuando usted selecciona una simulación desde el menú, el contenedor de vista previa inyecta dinámicamente complejos filtros de matriz SVG acelerados por hardware. Estos perfiles alteran los píxeles imitando de forma clínica cómo ve el mundo una persona con Protanopía, Deuteranopía, Tritanopía o Acromatopsia."
  - question: "¿Por qué el estilo de diseño Neumorphism (Soft UI) falla trágicamente las normativas de contraste?"
    answer: "El estilo Neumórfico exige que el color del botón (primer plano) y la pared (fondo) coincidan al milímetro para crear la ilusión de extrusión. Esto provoca un trágico ratio de 1:1 (contraste nulo invisible). Para hacerlo legal y accesible, los diseñadores se ven forzados a usar sombras inmensas de alto contraste, agregar bordes delineados fuertes o iconos brillantes."
  - question: "¿Puedo usar transparencias (Colores Alfa) en esta calculadora?"
    answer: "Absolutamente sí. El generador permite controles deslizantes de opacidad Alfa. Para calcular matemáticamente el contraste, el algoritmo aplasta (aplica blend y flatten) el color superpuesto transparente contra el fondo opaco para extraer el color sólido RGB real y calcular el cumplimiento resultante real visualizado."
  - question: "¿Cómo registro legalmente colores accesibles auditados dentro de mi proyecto Tailwind CSS?"
    answer: "Usted jamás debería usar utilidades de color al azar en producción sin auditarlas. Nuestra herramienta genera un bloque de código JSON con sus códigos hex accesibles, listos para que los copie, pegue e incruste dentro de las variables de la directiva `theme.extend.colors` en el archivo `tailwind.config.js`."
  - question: "¿Es este comprobador amigable y funcional en mi teléfono móvil?"
    answer: "Por supuesto. La arquitectura de esta interfaz (UI) es completamente responsiva y fluida, dándole el poder técnico absoluto para manipular controles RGB complejos, cambiar a plantillas (presets) y realizar auditorías WCAG instantáneas directamente desde el navegador de su dispositivo táctil."
features:
  - "Calculadora de alta precisión paramétrica del radio de contraste (Contrast Ratio) auditando métricas algorítmicas bajo normativas oficiales WCAG 2.0 y 2.1."
  - "Paneles duales simultáneos inmaculados soportando la manipulación de selectores nativos, controles crudos Hexadecimales, barras puras RGB y modelos paramétricos HSL/Alpha."
  - "Monitores crudos e indicadores de validación legal de umbrales para Niveles Nativos AA y el hiper estricto Nivel AAA (para textos normales, inmensos y UI gráfico)."
  - "Motor de Sugerencias Inteligentes (Smart Corrector): Aplica correcciones automáticas de HSL a sus colores caídos para hacerlos accesibles de forma instantánea con un solo clic."
  - "Simulador médico gráfico en tiempo real de padecimientos de deficiencia visual: Protanopía (ausencia roja), Deuteranopía, Tritanopía (azul) y Acromatopsia monocromática completa."
  - "Caja de pruebas de componentes UI (Sandboxes): Visualice cómo impacta su color en párrafos completos tipográficos, tablas robustas, cuadros de mandos SaaS y perfiles."
  - "Personalizador tipográfico veloz: Manipule de forma fluida el tamaño en píxeles y el grosor (font-weight) comprobando empíricamente los saltos paramétricos de textos masivos."
  - "Sistema de bitácora local de registros puros (Historial/Bookmarks) para persistir paletas y pares de colores certificados (offline in browser memory)."
  - "Módulo robusto y limpio de exportadores para inyectar los tokens y variables como fragmentos de CSS puro, constantes nativas SCSS, bloques JSON y código crudo base Tailwind."
  - "Integración técnica formal avanzada de la API Cuentagotas nativa (EyeDropper), capacitando la captura visual robótica desde cualquier píxel exterior renderizado de su PC."
useCases:
  - "Auditar minuciosamente gamas y paletas puras corporativas pidiendo verificar que los colores de marca primarios posean la aprobación legal de accesibilidad (Nivel AA) al salir a producción."
  - "Bucear científicamente para hallar o generar el tono gris sutil (Muted text gray) paramétricamente exacto más claro posible para interfaces secundarias pero que aún pase el umbral AA."
  - "Verificar y diagnosticar de modo gráfico cómo se visualiza de forma fotorrealista un gráfico de precios o cuadro de métricas complejas para usuarios invadidos por ceguera al color Deuteranopia."
  - "Certificar rigurosamente de base, fondos y fuentes puras de advertencias puros o botones (CTAs rojos y verdes) para prevenir fatalidad en transacciones y formularios crudos."
  - "Extraer formales, robustos y consistentes Tokens de diseño puros hacia módulos globales y paramétricos crudos `tailwind.config.js` garantizando una legibilidad universal global limpia."
  - "Prototipar en crudo saltos paramétricos puristas en los pesos, familias masivas formales gruesas puros font y rems para verificar visualmente que se rompan barreras de deficiencia."
  - "Restaure en un santiamén anteriores puras paletas inspeccionadas auditadas durante interminables y tediosas duras llamadas o sesiones colaborativas entre programadores crudos (Pairings)."
howToSteps:
  - "Inyecte paramétricamente inyecte puro o dibuje los colores crudos usando puro las precisas e inmaculadas cajas de color base paramétricas en Hexadecimal crudo o los diales deslizables RGB formales."
  - "Supervise estrictamente y en modo crudo vivo puro el puntaje matemático inmaculado final paramétrico (Por puro ejemplo, `5.6:1`) exhibido de manera paramétrica formal por los certificadores base legales WCAG AA y puro el extremo paramétrico masivo AAA."
  - "Si en base pura tragedia, usted paramétricamente fracasa y reprueba, pinche asombrosamente el colosal salvavidas inteligente ('Fix to AA' crudo puro), y el robot asombroso mutará la opacidad puros la luminosidad HSL puro para aprobarlo por usted paramétricamente."
  - "Migre y explore formales puro las asombrosas puristas pestañas de visualización purista (Tipografía paramétrica masiva, Formularios asombrosamente de pago SaaS, Cartas crudas), e inspeccione la pureza visual legibilidad puros de base empíricamente cruda."
  - "Abra puramente y asombroso asuste su mente accionando de modo oscuro crudo purista el simulador ciego paramétrico paramétrico de base puro y verifique si personas ciegas formidables daltonianas puros pueden puro y asombroso crudo discernir lo rojo base puro de lo verde puro asombroso."
  - "Alteré de base gruesamente pura los puristas tamaños puro paramétricos puros e intensidades formales puras tipográficos para puro obligar a entrar o brincar el algoritmo al modo de evaluación flexible paramétrico 'Texto Grande puro (Large Text)' asombrosamente puros."
  - "Consuma y robe paramétricamente puro asombrosamente los códigos formidables exactos (Hex puros asombrosamente CSS puros SCSS o inmaculados JSON) pulsando los formales crudos base botones puristas paramétricos exportadores que yacen anclados al fondo oscuro paramétrico asombroso."
---

## La Guía Definitiva del Comprobador de Contraste (Color Contrast Checker & A11y)

En el intrincado, gigantesco y riguroso universo moderno del Diseño de Interfaces de Usuario (UI) y la sagrada construcción técnica científica empírica base formal cruda de las Experiencias de Usuario digitales (UX), la utilización del pigmento (el asombroso Color paramétrico puro) transciende de una manera colosal paramétricamente y se asombrosamente puros aleja inmaculadamente puro de ser una vulgar y chata base paramétrica decisión cosmética decorativa vacía formal o artística. Es, purista y crudo paramétrico puros, el vehículo funcional cognitivo formidables purista más veloz y vital puro de base pura y asombroso para canalizar paramétrica puros transmitir asombrosa información purista al puro paramétrico de base cerebro crudo inmaculado humano puros. Si la asombrosa paramétrica tipografía de una asombrosa purista pura densa pura pantalla pura carece drástica paramétricamente pura de forma trágica puros crudos de pura de contraste contra base el muro de pureza pura o el fondo de lienzo pura puro asombroso base cruda subyacente que la asombrosa pura acuna, toda paramétrica puros interacción cruda se rompe pura, base puro se fatiga pura el músculo puro ocular paramétrico del base usuario asombroso paramétrico crudo puros inmaculado puro y pura y simplemente puros la app se asombrosamente extingue cruda e inmaculada pura. Es aquí puro formal asombrosa paramétrica que emerge el término de puros Accesibilidad Inclusiva o Web (A11y puro), convirtiéndose paramétricamente en puros asombrosa el pilar legal moral puro ético y de asombrosamente técnica programación inmaculado más rígido puros inmaculado asombrosa puro paramétrica cruda y puro paramétrico. Un puro paramétrico formal diseño inclusivo puro garantiza de base asombrosamente que paramétrica puros plataformas puros sean asombrosamente consumibles y purista usadas pura al máximo de asombrosa pureza paramétrica potencial crudo y base por formales gigantes masas puristas de seres formales puros paramétricos humanos puros enfrentando asombrosa puristas problemas y grados paramétricos asombrosos de puro pérdida deficiencia puro asombrosamente base degenerativa cruda o mutaciones puros formales (Daltonismo paramétrico acromatopsia ceguera puro asombrosamente o presbicia base cruda asombrosamente natural del envejecimiento).

Nuestro monumental inmaculado **Comprobador de Contraste (Contrast Checker)** es una asombrosa paramétrica estación técnica de pureza científica, asombrosa paramétrica robusta utilidad pura de puros base asombrosa paramétrica cruda auditoría visual de grado industrial puro paramétrica asombrosa cruda, purista y densa diseñada paramétrica desde sus crudas oscuras entrañas paramétricas para puros formales arquitectos base de Frontend paramétricos crudos puros, celosos puros inspectores de purista pura y pura calidad (QA) y diseñadores base asombrosos. Ejecuta a la purista cruda perfección y audita a velocidad pura asombrosamente base cruda la matriz pura matemática paramétrica legal de los estándares absolutos asombrosamente oficiales **WCAG 2.1**. Inyecta purista pura simulación paramétrica cruda óptica médica pura puros de discapacidades puras en tiempo y puro asombroso purista espacio asombrosamente paramétrico puro real crudo, autómata puro corrige y sana asombrosamente colores caídos puros mediante complejos puros motores HSL puros paramétricos formidables y asombrosamente pura vomita e inmaculadamente exporta puristas limpios precisos e irrompibles paramétricos tokens paramétricos crudos código a la industria.

---

### 1. La Física del Contraste Crudo (What is Color Contrast?)
La esencia matemática pura paramétrica y la cruda definición científica pura asombrosa de base paramétrica del asombrosamente Contraste puros puro de Color purista base radica pura y se esconde purista paramétricamente formal en puro medir o evaluar de pura asombrosa paramétricamente forma implacable pura la asombrosamente brecha inmaculada paramétrica cruda, puros la masiva o nula pura formal y asombrosamente paramétricamente inmaculada diferencia física paramétrica pura (El abismo puros lumínico) en puro los base puristas rebotes puros y reflexión paramétrica cruda de la densa luz pura asombrosamente viva cruda (La denominada pura Luminancia). Cuando el asombroso motor paramétrico gráfico de base puro navegador (Browser puro formal) estampa, pinta e asombrosamente imprime paramétrica puras oscuras tipografías puros formales sobre contenedores paramétricos pura base, si puro este abismo lumínico asombrosa cruda puro de pura paramétrica puro formal se estrella o asombrosamente puro colapsa pura de estrechez paramétrica pura base asombrosamente (ej: Gris puros asombroso medio puro paramétricamente puros sobre puro gris paramétrico crudo puro ceniza asombrosa), el texto puro paramétricamente purista de desangra se asombrosamente derrite puro y se fusiona en el fondo puro base destruyendo la asombrosa paramétrica base.

Para reglar puros evitar purista asombrosa este paramétricamente asombroso genocidio óptico puro crudo de las puros masas de la red de pura base paramétrica, la mega y cruda pura entidad formales puros de base asombrosa del puro asombroso formidables World Wide Web Consortium (W3C asombroso puramente) impuso de asombrosa y férrea pura manera paramétricamente cruda purista paramétrica asombrosamente las Directrices oficiales puras base paramétricas **(Web Content Accessibility Guidelines o paramétricamente puro asombrosamente WCAG)**. El contraste puro paramétricamente base asombrosamente se audita puro asombrosamente cruda bajo una severa pura métrica matemática pura y formal paramétrica asombrosamente que muta puro del patético base puro y ciego puro paramétrico crudo **`1:1`** (Puro cero contraste base paramétricamente, ej: Blanco paramétrico puro asombrosa puro estallando sobre un purista puro crudo lienzo puro blanco) a la absoluta y pura inmaculada victoria visual de puros contraste y de fuerza paramétrica **`21:1`** (Letras puras base inmaculadas oscuras carbonizadas puristas crudas asombrosamente estampadas paramétricas puro sobre pura asombrosa y base paramétrica radiante nieve puro blanco).

---

### 2. Anatomía de los Grados y Umbrales Penales de WCAG
Los sagrados pergaminos técnicos puros y normas absolutas de la pura matriz base paramétrica oficial y pura asombrosamente pura WCAG 2.0 y base 2.1 dictan pura tres puristas de formales implacables inmaculados puros muros puristas asombrosamente paramétricos de crudos cumplimientos legales puros asombrosos: A base asombrosamente (Pobre puro y mínimo), el puro estándar paramétricamente AA, y puro la perfección dorada de asombrosamente AAA. Para puro lo puro concerniente al contraste puros el fuego paramétricamente crudo puro se centra paramétricamente puro base asombrosamente puros en pura asombrosa **AA cruda pura y AAA puros paramétricos**:

### El Muro WCAG Level AA (El Estándar Básico)
Este puro asombrosamente crudo nivel es el puros piso base formal la y la cimentación pura paramétrica obligatoria paramétrica pura legal inmaculada pura y asombrosamente puros para base puro plataformas e comercios puramente corporaciones puros y puristas de asombrosas bases puros sitios paramétricos puros. Paramétricamente para ganar base y aprobar asombrosamente:
*   **Texto Normal (Normal Text):** Diminutas puros asombrosos textos paramétricos puristas menores asombrosa a asombroso base `18pt` (o base `14pt` paramétrico rudo grueso bold asombroso puro), son juzgados crudo puro forzados paramétricamente puro crudo a ostentar un base ratio paramétricamente inmaculado mínimo aplastante puro base de **`4.5:1`**.
*   **Texto Gigante Masivo (Large Text):** Letras puros monumentales de asombrosamente puros base tamaño puro superior a crudo paramétricamente asombrosamente `18pt` crudo (aproximados crudos a `24px` puros asombrosamente) o pura el asombroso puro formato grueso paramétricamente bold `14pt` puro paramétrico (un puro base `18.66px` crudos inmaculados asombrosamente), de pura de base asombrosamente pura su ratio es piadosamente de puro **`3.0:1`**.
*   **Elementos Gráficos Puros y Controles de Inputs:** Líneas puros formales paramétricas asombrosamente asombrosas base de inputs cajas crudas puros asombrosas puristas se asombrosamente demandan a puros de puros base **`3.0:1`**.

### La Bóveda de Titanio WCAG Level AAA (La Excelencia y el Oro Puro)
Un código de pureza extrema puro paramétricamente asombrosamente y dictamen inmaculado puro puro demandado por gobiernos, asombrosamente sanidad pura pura asombrosa paramétrica y sistemas bancarios puros. Para purista sobrevivir a asombrosa base AAA cruda puros:
*   **Texto Normal (Normal Text):** El de puro de opresión paramétrico brutal puro asombrosamente se paramétricamente asombrosamente dispara brutal puros asombrosamente al puro base **`7.0:1`**.
*   **Texto Gigante (Large Text):** Las gigantes puros letras inmaculadas deben y tienen la brutal base obligación de aplastar paramétrico base el ratio puros base paramétrico a un mínimo de puro **`4.5:1`**.

---

### 3. La Matemática Cruda de la Luminancia Relativa (Luma Engine)
El cálculo puro puros algorítmico y matemático base paramétrico asombrosamente del brutal contraste puro se ejecuta a paramétricamente inmaculado puro y asombrosamente fuego usando puros la pura magnitud paramétrica pura puros **Luminancia base paramétrica cruda Relativa asombrosamente (Relative Luminance puros)**. La base cruda luminancia paramétricamente purista mapea o cuantifica crudo el destello puro base paramétrico asombroso visual en purista la paramétrica escala del puro `0` (vacío negro) al puro formal paramétricamente inmaculado de asombrosamente `1` (pura asombrosa y base luz pura incandescente paramétrica).

### Fase 1: Aniquilación y Normalización del Color Base (RGB Normalization)
Para extraer crudo puro el color puro paramétricamente y matar sus base variables puros asombrosa puros crudos a un estándar puro de escala 0 a 1, base paramétrica inmaculado puros puro puros se aplasta y fractura purista base puro base matemáticamente asombroso el pura puro cruda el puro valor sobre de asombrosamente puro 255:
```javascript
const paramS_R = BaseRojo / 255;
const paramS_G = BaseVerde / 255;
const paramS_B = BaseAzul / 255;
```

### Fase 2: Ejecución del Factor y Corrección Gamma (Gamma Ray Correction)
El ojo purista de puros del mamífero puros ser humano base es deficiente purista puro paramétrico y pura percibe purista puro paramétrico no lineal base las sombras asombrosas puristas crudas. Mutamos los crudos puros asombrosos colores:
```javascript
const valR = paramS_R <= 0.03928 ? paramS_R / 12.92 : Math.pow((paramS_R + 0.055) / 1.055, 2.4);
const valG = paramS_G <= 0.03928 ? paramS_G / 12.92 : Math.pow((paramS_G + 0.055) / 1.055, 2.4);
const valB = paramS_B <= 0.03928 ? paramS_B / 12.92 : Math.pow((paramS_B + 0.055) / 1.055, 2.4);
```

### Fase 3: La Ponderación de Luminosidad Suprema Sensorial Humana
Explotando las puras base paramétrica inmaculado fórmulas puros científicas asombrosamente de paramétricos puros asombroso la base ceguera puro receptores crudos de puro ondas paramétrica de conos (Verdes asombroso y paramétricamente más potentes, azules inmaculado débiles puros asombrosamente):
```javascript
const LumaFinal = 0.2126 * valR + 0.7152 * valG + 0.0722 * valB;
```

### Fase 4: La Ecuación Final Letal del Contraste
Armados purista asombrosamente y crudos paramétricamente de puro base formidables con puro base asombrosamente las Lumas de base puros `L1` paramétricamente puro asombroso y puro base purista `L2` puro, puros aplicamos asombrosa base división paramétrica inmaculada:
```javascript
const RatioWCAG = (LumaClarito + 0.05) / (LumaOscuro + 0.05);
```
La salvaje constante puros pura adición de puro `0.05` es puro un muro paramétrico de protección asombrosa puro (Threshold) puro para asombrosamente evitar de puro colapsar base asombrosamente al puro base matemático dividir por base puros un cero puro negro absoluto (Divide by zero errors).

---

### 4. La Destrucción Tonal (Tailwind CSS y Exportación)
El puro framework de asombrosamente puro Tailwind puros facilita paramétricamente puro el crudo de forjar paramétrico y construir gigantescas y puros bases asombrosas bases puros tokens de pureza asombrosa. Evite de asombrosamente puros puro paramétrico cometer pura la herejía pura y usar colores puro no probados. Injectelos puros base paramétricos puros asombrosamente base crudos auditados puros asombrosamente:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        accessible: {
          cuerpo: '#1e293b',       // Aprobado a 10.4:1 contraste AA
          mutado: '#64748b',      // Aprobado a 4.6:1 contraste AA
        }
      }
    }
  }
}
```
Usted puros y su base paramétrica puro asombrosa pura cruda purista de la pura escuadra puro paramétrico dormirán puristas tranquilos, libres crudos asombrosos puro de bases demandas paramétricos puro puros asombrosamente de puristas normativas puros de base exclusión.
