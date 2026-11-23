---
metaTitle: "Estudio de Códigos QR con Logo, Colores y Exportación SVG"
metaDescription: "Cree códigos QR con logo, colores y corrección Reed-Solomon nivel H. Compatible con URL, WiFi y vCard, con exportación vectorial SVG, PNG y PDF."
metaKeywords: "generador de codigo qr con logo, estudio de codigos qr, crear codigo qr svg, codigo qr wifi, codigo qr vcard, correccion de errores reed-solomon, qr alta resolucion, qr personalizado gratis"
title: "Estudio de Generador de Códigos QR"
shortDescription: "Diseñe códigos QR técnicos y de marca con corrección de errores Reed-Solomon, logotipos integrados, gradientes y esquemas estructurados (URL, WiFi, vCard) listos para web o impresión en PNG, SVG y PDF."
faqs:
  - question: "¿Por qué necesito el nivel H de corrección de errores al insertar un logotipo?"
    answer: "El estándar ISO/IEC 18004 emplea códigos Reed-Solomon que añaden redundancia matemática a la matriz. El nivel H permite recuperar hasta un 30% de módulos dañados u ocultos; sin él, un logotipo central que tape el 15% o 20% del símbolo volvería ilegible el código para la mayoría de las cámaras."
  - question: "¿Cuál es la diferencia práctica entre exportar un código QR en SVG, PDF o PNG?"
    answer: "SVG y PDF almacenan los módulos como trazados vectoriales matemáticos que escalan desde una tarjeta de visita hasta una valla publicitaria sin pixelarse. PNG es un mapa de bits pensado para pantallas, correos electrónicos y redes sociales donde se requiere un ancho fijo en píxeles."
  - question: "¿Qué tamaño mínimo de zona de silencio debo respetar al imprimir un QR?"
    answer: "La especificación ISO exige una zona de silencio (Quiet Zone) libre de gráficos de al menos 4 módulos alrededor de los cuatro lados del código. Recortar ese margen impide que el escáner distinga los patrones de búsqueda frente al fondo del diseño."
  - question: "¿Puedo usar colores claros sobre fondos oscuros en mi código QR?"
    answer: "Es desaconsejable para producción masiva. Aunque las cámaras recientes leen códigos invertidos, muchos lectores industriales, terminales POS y teléfonos antiguos fallan si los módulos no son más oscuros que el fondo. Mantenga siempre módulos oscuros sobre fondo claro con un contraste mínimo de 4:1."
  - question: "¿Los datos de mis códigos WiFi o vCard se envían a un servidor externo?"
    answer: "No. Toda la codificación de la matriz, el cálculo polinómico de redundancia y el renderizado vectorial ocurren localmente en la memoria de su navegador, por lo que contraseñas WiFi y datos personales nunca abandonan su dispositivo."
features:
  - "Codificación conforme a ISO/IEC 18004 con selección manual o automática de corrección Reed-Solomon (niveles L, M, Q y H)."
  - "Generación de cargas estructuradas válidas para URLs, redes WiFi (WPA/WPA2/WPA3), tarjetas vCard 3.0, correos, SMS y coordenadas geográficas."
  - "Personalización granular de la geometría de módulos, patrones de búsqueda (ojos) y estilos de esquinas redondeadas o circulares."
  - "Motor de color sólido y gradientes lineales o radiales con preservación de contraste para lectura fiable en móviles."
  - "Incrustación inteligente de logotipos centrales con margen de exclusión que protege la integridad de los bloques de datos."
  - "Exportación sin marcas de agua en SVG vectorial limpio, PDF listo para imprenta y PNG de alta resolución."
useCases:
  - "Empaques de productos y manuales técnicos impresos en gran volumen mediante vectores SVG sin pérdida de nitidez."
  - "Tarjetas de presentación corporativas con vCard incrustada para guardar nombre, cargo, teléfono y correo en un escaneo."
  - "Accesos WiFi para oficinas, hoteles y cafeterías usando la cadena estándar WIFI sin dictar contraseñas complejas."
  - "Cartelería en vía pública y eventos donde el nivel de corrección H compensa reflejos, suciedad o desgaste físico."
  - "Menús digitales, etiquetas de inventario y hojas de ruta logísticas escaneadas en condiciones de iluminación variable."
  - "Campañas de marketing multicanal con enlaces etiquetados con parámetros UTM y logotipo corporativo que refuerza la confianza del usuario."
howToSteps:
  - "Seleccione el formato de carga útil adecuado (URL, WiFi, vCard, Texto o Correo) e introduzca los campos requeridos."
  - "Ajuste el nivel de corrección de errores Reed-Solomon; elija Q o H si planea añadir un logotipo o imprimir en superficies curvas."
  - "Defina la paleta de colores y los gradientes asegurando un alto contraste entre los módulos oscuros y el fondo claro."
  - "Personalice la forma de los módulos de datos y de los tres patrones de búsqueda según la identidad visual de su marca."
  - "Suba el logotipo en formato SVG o PNG transparente y compruebe que ocupe menos del 20% del área útil del símbolo."
  - "Pruebe el escaneo desde al menos dos teléfonos distintos antes de descargar el archivo definitivo en SVG, PDF o PNG."
---

Un código QR profesional es mucho más que un elemento decorativo: es una matriz binaria regida por la norma **ISO/IEC 18004** cuya fiabilidad óptica depende de la densidad de datos, la redundancia algebraica y el contraste fotométrico. Cuando un diseñador incrusta un logotipo sin elevar la corrección de errores, codifica una URL innecesariamente extensa o recorta el margen perimetral, el código puede lucir bien en pantalla y fallar al imprimirse. Este estudio permite personalizar la estética respetando las restricciones reales de decodificación.

## Arquitectura interna del estándar ISO/IEC 18004

Un símbolo QR distribuye la información en una cuadrícula de celdas llamadas **módulos**. El estándar define 40 versiones: desde la **Versión 1** (21 × 21 módulos) hasta la **Versión 40** (177 × 177), sumando 4 módulos por lado en cada salto. Antes de insertar los bits de datos, el codificador reserva regiones estructurales fijas:

- **Patrones de búsqueda (*Finder Patterns*):** tres marcas concéntricas de 7 × 7 módulos con separador blanco de 1 módulo que fijan orientación, escala y perspectiva en 360 grados.
- **Patrones de temporización y alineación:** líneas alternantes que definen la rejilla de muestreo y marcas adicionales (desde la Versión 2) para compensar curvaturas sobre botellas o envases.
- **Zona de silencio (*Quiet Zone*):** un marco despejado obligatorio de **4 módulos** alrededor de todo el símbolo para que el lector separe la matriz del entorno gráfico.
- **Enmascaramiento XOR:** el codificador evalúa 8 máscaras predefinidas y elige la que reduce bloques monocromos y falsos patrones de búsqueda.

El modo de codificación condiciona la densidad final: el modo **Numérico** agrupa 3 dígitos en 10 bits, el **Alfanumérico** codifica 2 caracteres en 11 bits y el modo **Byte** consume 8 bits por octeto en UTF-8. Acortar URLs reduce la versión del símbolo, agranda cada módulo físico y acelera la lectura.

## Corrección de errores Reed-Solomon y cálculo seguro de logotipos

La tolerancia a daños y la incrustación de marcas descansan sobre códigos **Reed-Solomon** en el cuerpo de Galois $\text{GF}(2^8)$, que añaden palabras de paridad capaces de reconstruir módulos perdidos u ocultos.

| Nivel ECC | Recuperación máxima | Densidad de paridad | Área segura para logo | Escenario recomendado |
| :--- | :--- | :--- | :--- | :--- |
| **Nivel L** | ~7 % | Mínima | No recomendado (0 %) | Pantallas limpias y textos extensos |
| **Nivel M** | ~15 % | Moderada | Hasta 8–10 % | Documentos digitales y folletos interiores |
| **Nivel Q** | ~25 % | Media-alta | Hasta 15 % | Empaques comerciales con logotipo discreto |
| **Nivel H** | ~30 % | Máxima | Hasta 18–20 % | Cartelería exterior, desgaste físico y logos centrales |

Conviene recordar que el 30 % del nivel H es el **presupuesto total** de recuperación. Si un logotipo central ya oculta el 28 % del área de datos, cualquier reflejo, arruga o desenfoque superará el límite matemático y romperá el escaneo. Reserve siempre al menos un 8–10 % libre para imperfecciones ópticas reales.

## Sintaxis de cargas útiles estructuradas (WiFi y vCard)

iOS y Android interpretan esquemas de texto plano específicos para ejecutar acciones nativas. Escapar correctamente los caracteres reservados evita fallos al conectar o importar contactos:

```text
WIFI:T:WPA;S:Oficina_Invitados;P:Clav3\;Segura\#2026;H:false;;
```

En cadenas WiFi, los símbolos `\`, `;`, `,` y `:` dentro del SSID (`S:`) o clave (`P:`) deben precederse de barra invertida; `T:` especifica `WPA`, `WEP` o `nopass` y `H:true` señala redes ocultas. Para contactos portables, **vCard 3.0** mantiene la compatibilidad más amplia entre agendas:

```text
BEGIN:VCARD
VERSION:3.0
N:Martínez;Laura;;;
FN:Laura Martínez
ORG:Estudio Norte S.L.
TEL;TYPE=WORK,VOICE:+34600123456
EMAIL;TYPE=PREF,INTERNET:laura@estudionorte.example
URL:https://estudionorte.example
END:VCARD
```

Si el código irá en una tarjeta pequeña (2 × 2 cm), omita notas o direcciones largas para mantener un mínimo físico cercano a **0,4 mm por módulo** en impresión comercial.

## Escala física, contraste cromático y exportación vectorial

Antes de enviar un arte final a imprenta, calcule las dimensiones según la regla empírica de distancia de lectura **10:1**: un código que será escaneado a 1 metro en un cartel de escaparate debe medir al menos **10 × 10 cm** (sin contar la zona de silencio), mientras que una etiqueta de mano leída a 20 cm funciona correctamente con **2 × 2 cm**. En producción offset CMYK sobre papel poroso, imprimir los módulos en negro puro (`C=0, M=0, Y=0, K=100%`) evita desalineaciones entre planchas de color que enturbian los bordes.

Al trabajar con colores corporativos o gradientes, verifique la luminancia entre el punto más claro del primer plano y el fondo mediante el [Comprobador de Contraste](/es/herramientas/contrast-checker), buscando una relación mínima de **4:1** (7:1 bajo iluminación deficiente). Evite gradientes que terminen en tonos pastel sobre blanco, porque la umbralización adaptativa de la cámara descarta esos módulos como fondo vacío.

Para diseño editorial o rotulación exporte en **SVG** o **PDF**, ya que los trazados vectoriales eliminan el suavizado borroso de los mapas de bits al escalar. Si integra el SVG directamente en código HTML, depure sus nodos y atributos con el [Optimizador de SVG](/es/herramientas/svg-optimizer). Para códigos sencillos sin personalización de marca dispone también del [Generador de Códigos QR](/es/herramientas/qr-code-generator).

### Diagnóstico rápido antes de imprimir

- **El teléfono enfoca pero no abre el enlace:** verifique que la URL incluya `https://` y no contenga espacios o caracteres sin codificar.
- **Lectura inestable sobre papel brillante:** reduzca el tamaño del logotipo al 15 %, suba a nivel H y evite fondos oscuros con módulos claros invertidos.
- **Módulos demasiado densos en soportes pequeños:** sustituya parámetros largos por una ruta corta en su dominio para rebajar la versión de la matriz.
- **Error al unirse a redes WiFi:** revise que los caracteres especiales de la contraseña estén escapados y que el cifrado coincida con WPA2/WPA3-Personal.
