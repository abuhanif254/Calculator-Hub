---
metaTitle: "Formateador, Linter y Validador YAML Online | YAML a JSON"
metaDescription: "Valida, formatea, minifica, analiza y convierte YAML multidocumento de Kubernetes, Docker Compose y GitHub Actions a JSON en tu navegador."
metaKeywords: "formateador yaml, embellecedor yaml, validador yaml online, linter yaml, yaml a json, formatear yaml kubernetes, docker compose yaml, analizar sintaxis yaml, minificador yaml, diff yaml"
title: "Formateador y Embellecedor de YAML"
shortDescription: "Formatea, embellece, minifica, valida y convierte documentos YAML al instante desde tu navegador. Compatible con manifiestos multidocumento de Kubernetes, Docker Compose, GitHub Actions, linting estático, diff y conversión a JSON."
faqs:
  - question: "¿El formateador YAML admite manifiestos multidocumento de Kubernetes separados por ---?"
    answer: "Sí. La validación ejecuta loadAll() de js-yaml sobre todo el flujo, y el formateo separa cada documento en los límites ---, los analiza y reindenta de forma independiente a 2, 4 u 8 espacios, y los vuelve a unir con delimitadores limpios. Al convertir a JSON, múltiples documentos se agrupan automáticamente en un arreglo JSON."
  - question: "¿Por qué falla la validación de mi archivo YAML si visualmente la sangría parece alineada?"
    answer: "La causa oculta más frecuente es un carácter de tabulación ASCII (0x09). La especificación YAML prohíbe de forma estricta las tabulaciones para la sangría estructural, incluso cuando tu editor muestra una tabulación con el ancho de dos espacios. El linter integrado señala cada tabulación como error con su línea exacta."
  - question: "¿Por qué desaparecen los comentarios # al pulsar Formatear o Minificar?"
    answer: "El formateo canónico deserializa el archivo YAML en estructuras de datos JavaScript mediante js-yaml y vuelve a emitir texto limpio. Como los comentarios son tokens no semánticos fuera del grafo de datos, la serialización de ida y vuelta los descarta. Usa la pestaña Diff para auditar los cambios antes de reemplazar configuraciones muy comentadas."
  - question: "¿Cómo evita el linter de claves duplicadas fallos silenciosos en Kubernetes y Helm?"
    answer: "Si una misma clave aparece dos veces al mismo nivel de sangría —por ejemplo, dos bloques env: o resources: en un Deployment extenso—, muchos analizadores sobrescriben silenciosamente el primer bloque con el segundo. La regla de claves duplicadas te alerta mostrando tanto la línea original como la repetida."
  - question: "¿Se envían a algún servidor las credenciales o variables de entorno de mis archivos YAML?"
    answer: "Nunca. Toda la validación sintáctica, el análisis estático, las métricas estructurales, la comparación Diff y la conversión a JSON se ejecutan exclusivamente dentro de tu navegador con js-yaml y Monaco Editor, sin tráfico hacia servidores externos."
features:
  - "Validación conforme a YAML 1.2 con js-yaml e informes precisos de errores por línea y columna"
  - "Soporte nativo para flujos multidocumento (---) en manifiestos de Kubernetes, plantillas Helm y especificaciones OpenAPI"
  - "Formateo en bloque configurable a 2, 4 u 8 espacios junto con minificación en estilo de flujo (flowLevel: 0)"
  - "Linter estático personalizable que detecta tabulaciones, desvíos de sangría, espacios finales y claves duplicadas"
  - "Analizador estructural con recuento de claves, profundidad máxima de anidamiento, documentos, comentarios y anclas o alias"
  - "Conversión en vivo de YAML a JSON, comparador Diff línea a línea y cinco plantillas DevOps listas para probar"
useCases:
  - "Validar y normalizar manifiestos multidocumento de Kubernetes (Deployment, Service e Ingress) antes de ejecutar kubectl apply"
  - "Depurar matrices de flujos de trabajo de GitHub Actions, mapeos de puertos de Docker Compose y playbooks de Ansible"
  - "Localizar tabulaciones accidentales, sangrías desfasadas por un espacio y claves duplicadas silenciosas con el linter estático"
  - "Transformar especificaciones OpenAPI 3.0 o archivos CI/CD en YAML a JSON estricto para validadores de esquemas y clientes de API"
  - "Comprimir configuraciones YAML extensas a notación compacta en estilo de flujo para flags CLI o variables de entorno"
  - "Revisar cada modificación de formato en la vista Diff integrada antes de confirmar cambios en repositorios de infraestructura como código"
howToSteps:
  - "Pega tu manifiesto YAML en Monaco Editor, sube un archivo .yml o .yaml local, o abre el menú Ejemplos para cargar plantillas de Kubernetes, Docker Compose o GitHub Actions."
  - "Verifica la barra de validación instantánea; cualquier fallo de sintaxis resalta la línea y columna exactas informadas por js-yaml."
  - "Selecciona 2, 4 u 8 espacios junto al botón Formatear (sincronizado automáticamente con la regla del linter) y pulsa Formatear, o elige Minificar para comprimir en estilo de flujo."
  - "Revisa la configuración del linter y la pestaña Análisis para detectar tabulaciones, desvíos de sangría, espacios sobrantes, claves repetidas, profundidad y uso de anclas."
  - "Cambia a la pestaña Diff para comparar línea a línea tu YAML original frente al resultado formateado."
  - "Abre la pestaña JSON para copiar o descargar la versión convertida, o guarda directamente tu archivo YAML limpio."
---

YAML sostiene gran parte de la infraestructura cloud moderna —manifiestos de Kubernetes, pilas Docker Compose, flujos de GitHub Actions, playbooks de Ansible y contratos OpenAPI— porque su jerarquía por sangría elimina el ruido visual de llaves, corchetes y comillas obligatorias. Esa legibilidad conlleva un costo operativo alto: un espacio de más, una tabulación oculta, dos puntos sin comillas o una clave repetida pueden romper un despliegue en producción. El **Formateador y Embellecedor de YAML** ejecuta **js-yaml** y **Monaco Editor** completamente en tu navegador, combinando validación multidocumento, linting estático, métricas estructurales, vista Diff y conversión a JSON sin exponer secretos de clúster ni variables privadas a ningún servidor externo.

## Sangría en bloque, colecciones en flujo y documentos múltiples

Formalmente, YAML 1.2 es un **superconjunto estricto de JSON**. Todo objeto o arreglo JSON válido es YAML legal en **estilo de flujo** (`{replicas: 3, ports: [80, 443]}`), mientras que los archivos de configuración habituales emplean **estilo de bloque** basado exclusivamente en espacios ASCII (`0x20`). Al pulsar **Minificar**, cada documento se serializa con `flowLevel: 0`, compactando mapas y secuencias en una sola línea útil para banderas CLI o almacenamiento compacto. Al pulsar **Formatear**, se reconstruye la jerarquía con sangría uniforme de **2**, **4** u **8 espacios** y `lineWidth: -1`, evitando que etiquetas largas de imágenes de contenedor, URLs o comandos de shell se fracturen en saltos inesperados.

En Kubernetes es frecuente agrupar `ConfigMap`, `Deployment` y `Service` dentro de un único archivo delimitado por marcadores `---`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  LOG_LEVEL: "info"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: api
          image: ghcr.io/org/api:2.4.1
```

Los analizadores orientados a un solo documento fallan al alcanzar el segundo separador `---` con el error `expected a single document in the stream`. Esta herramienta valida todo el flujo con `yaml.loadAll()`, formatea cada segmento de forma independiente y vuelve a unirlos con delimitadores limpios antes de cualquier prueba local con `kubectl apply --dry-run=client`.

## El problema de Noruega y la coerción implícita de escalares

Los escalares sin comillas causan los incidentes más sutiles en YAML. Aunque YAML 1.2 Core restringe los booleanos exclusivamente a `true` y `false`, herramientas heredadas —versiones antiguas de PyYAML, Ruby Psych y ciertos analizadores de CI— siguen aplicando tipado implícito de **YAML 1.1**. Así surgió el **Problema de Noruega**: el código de país `NO` se evalúa silenciosamente como booleano `false`, y un mapeo de puertos Docker `22:22` sin comillas se convierte en el entero sexagesimal base 60 `1342`.

| Valor sin comillas | YAML 1.1 / heredado | YAML 1.2 Core (`js-yaml`) | Forma segura | Impacto real en DevOps |
| :--- | :--- | :--- | :--- | :--- |
| `country: NO` | Booleano `false` | Cadena `"NO"` | `country: "NO"` | Rompe listas ISO-3166 en Ansible y PyYAML |
| `on: [push]` | Clave `true` | Cadena `"on"` | `"on": [push]` | Disparador `on:` en GitHub Actions mal analizado |
| `ports: [22:22]` | Entero `1342` (base 60) | Cadena `"22:22"` | `- "22:22"` | Corrompe puertos Docker menores de 60 |
| `version: 1.10` | Flotante `1.1` | Número `1.1` | `version: "1.10"` | Pierde ceros en versiones semánticas (`"1.10"` → `1.1`) |
| `mode: 0644` | Octal `420` | Octal `420` | `mode: "0644"` | Altera permisos Unix en Helm y Cloud-Init |
| `msg: err: timeout` | Error de sintaxis | Error de sintaxis | `msg: "err: timeout"` | `: ` sin comillas se interpreta como mapa anidado |
| `ruta: ~` | `null` | `null` | `ruta: "~"` | `~` o `null` sin comillas resuelven como nulo |

Entrecomillar explícitamente versiones, puertos, permisos octales, códigos de país y cadenas con `: ` o `#` elimina ambigüedades entre analizadores distintos.

## Linting estático, anclas y análisis estructural

Superar `yaml.loadAll()` confirma sintaxis analizable, pero no configuraciones libres de errores lógicos. El linter integrado inspecciona el texto fuente antes de construir el AST para detectar defectos silenciosos.

### Reglas activas y reutilización con anclas y alias

Desde la configuración del linter puedes supervisar cuatro comprobaciones sincronizadas automáticamente con tu ancho de sangría (`2`, `4` u `8` espacios):

1. **Tabulaciones (`error`):** Marca cualquier `\t`. YAML prohíbe tabulaciones en sangría estructural; mezclar espacios y tabulaciones provoca errores de columna difíciles de diagnosticar entre editores.
2. **Desvío de sangría (`advertencia`):** Señala líneas cuyos espacios iniciales no son múltiplo exacto del ancho configurado (como 3 o 5 espacios en un manifiesto de 2).
3. **Claves duplicadas (`advertencia`):** Rastrea cada par `indent:key` para advertir cuando `environment:` o `labels:` aparece repetido antes de que el segundo bloque sobrescriba silenciosamente al primero.
4. **Espacios finales (`advertencia`):** Detecta espacios al cierre de línea que contaminan diffs en Git o alteran bloques multilínea literales (`|`) y plegados (`>`).

En paralelo, la pestaña **Análisis** informa el total de claves, profundidad máxima de anidamiento, número de documentos, presencia de comentarios y uso de **anclas (`&`) y alias (`*`)**. En Docker Compose, por ejemplo, definir campos de extensión como `x-logging: &default-logging` y reutilizarlos mediante `<<: *default-logging` evita duplicar políticas de registros entre microservicios, mientras `js-yaml` verifica que cada referencia sea válida al compilar el árbol de datos.

## Comentarios, Diff e interoperabilidad DevOps

Al formatear con `js-yaml` (`noRefs: false` preserva referencias resolubles), la deserialización en memoria descarta los comentarios `#` porque no forman parte del grafo semántico de datos. Inspecciona siempre la pestaña **Diff** integrada —o contrasta ambas versiones en el [Comparador de Diferencias](/es/herramientas/diff-checker)— antes de sobrescribir archivos productivos documentados.

Abre **Ejemplos** para cargar cinco plantillas realistas (**Kubernetes Deployment**, **Docker Compose**, **GitHub Actions**, **Simple Config** y **Nested API Config**) y validar reglas en segundos. Cuando necesites transformar manifiestos en payloads de API o esquemas, la pestaña **JSON** envuelve flujos multidocumento en un arreglo JSON listo para refinar en el [Formateador de JSON](/es/herramientas/json-formatter) o contrastar con sistemas heredados en el [Formateador de XML](/es/herramientas/xml-formatter). Y para generar valores `data:` sin saltos de línea en objetos `Secret` de Kubernetes, combina tu flujo con el [Codificador y Decodificador Base64](/es/herramientas/base64-encode).
