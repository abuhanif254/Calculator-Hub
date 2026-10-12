// ═══════════════════════════════════════════════════════
// CATEGORY DEFINITIONS
// ═══════════════════════════════════════════════════════
// Central registry of calculator categories with metadata
// for SEO pillar pages, navigation, and sitemap generation.
// ═══════════════════════════════════════════════════════

export interface CategoryTranslation {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  pillarContent: string;
}

export interface CategoryDef {
  id: string;           // URL slug (used in /calculators/[category])
  title: string;        // Display name
  dbCategory: string[]; // Matches the `category` field in CalculatorDef
  description: string;  // Short description for nav/cards
  icon: string;         // Lucide icon name
  seoTitle: string;     // Page <title>
  seoDescription: string; // Meta description
  pillarContent: string;  // Long-form SEO content (markdown)
  translations?: Record<string, CategoryTranslation>;
}

const categoryTranslations: Record<string, Record<string, CategoryTranslation>> = {
  financial: {
    es: {
      title: 'Calculadoras Financieras',
      description: 'Herramientas gratuitas de hipotecas, préstamos, inversiones, jubilación, impuestos y presupuesto.',
      seoTitle: 'Calculadoras Financieras Gratis — Hipotecas, Préstamos e Inversiones',
      seoDescription: 'Explora más de 80 calculadoras financieras gratuitas para hipotecas, préstamos, interés compuesto, jubilación, impuestos y amortización en tu navegador.',
      pillarContent: `## Calculadoras Financieras Gratuitas

Gestionar tus finanzas personales y empresariales comienza con datos precisos. Nuestra colección de **más de 80 calculadoras financieras** abarca desde el cálculo de cuotas hipotecarias mensuales hasta proyecciones de ahorro para la jubilación y análisis de rentabilidad.

### Hipotecas y Vivienda
Tanto si compras tu primera vivienda como si buscas refinanciar, nuestras calculadoras hipotecarias te permiten analizar cuotas mensuales, tablas de amortización completas y el impacto de pagos extraordinarios. Utiliza la **Calculadora de Capacidad de Endeudamiento** para determinar tu presupuesto ideal según tus ingresos y relación deuda-ingreso (DTI).

### Préstamos y Deudas
Evalúa préstamos automotrices, estudiantiles, personales y comerciales con cronogramas detallados de capital e intereses. Nuestras calculadoras de **Liquidación de Deudas** y **Consolidación de Deudas** te ayudan a diseñar una estrategia matemática para salir de deudas más rápido.

### Inversiones y Jubilación
Planifica tu futuro financiero con proyecciones de interés compuesto, análisis de TIR (IRR), rendimiento promedio, modelos 401(k) y comparativas Roth IRA.

### Impuestos e Ingresos
Calcula impuestos sobre la renta, IVA, impuestos sobre ventas y salario neto después de deducciones. Todos los cálculos se ejecutan **100% localmente en tu navegador** para garantizar tu privacidad financiera.`
    },
    fr: {
      title: 'Calculatrices Financières',
      description: 'Outils gratuits pour prêts hypothécaires, crédits, investissements, retraite, impôts et budget.',
      seoTitle: 'Calculatrices Financières Gratuites — Prêts, Hypothèques et Investissements',
      seoDescription: 'Découvrez plus de 80 calculatrices financières gratuites pour prêts immobiliers, crédits, intérêts composés, retraite, fiscalité et amortissement.',
      pillarContent: `## Calculatrices Financières Gratuites

Une gestion financière efficace repose sur des calculs précis. Notre collection de **plus de 80 calculatrices financières** couvre tous les aspects des finances personnelles et professionnelles — du calcul des mensualités hypothécaires aux projections d'épargne retraite.

### Prêts Immobiliers et Logement
Que vous soyez primo-accédant ou que vous souhaitiez renégocier votre crédit, nos simulateurs hypothécaires détaillent vos mensualités, tableaux d'amortissement et capacité d'emprunt selon votre taux d'endettement (DTI).

### Crédits et Remboursement de Dettes
Analysez vos prêts auto, prêts étudiants et crédits personnels avec des échéanciers complets. Nos outils de **Remboursement des Dettes** et de **Consolidation de Crédits** vous aident à réduire le coût total des intérêts.

### Investissements et Retraite
Planifiez votre avenir grâce aux simulations d'intérêts composés, au calcul du TRI (IRR), au rendement moyen et aux plans d'épargne retraite.

### Fiscalité et Revenus
Estimez votre impôt sur le revenu, la TVA, les taxes de vente et votre salaire net après cotisations. Tous les calculs s'exécutent **localement dans votre navigateur** sans aucun envoi de données.`
    },
    de: {
      title: 'Finanzrechner',
      description: 'Kostenlose Rechner für Hypotheken, Kredite, Investitionen, Altersvorsorge, Steuern und Budget.',
      seoTitle: 'Kostenlose Finanzrechner — Hypotheken, Kredite, Zinsen & Altersvorsorge',
      seoDescription: 'Über 80 kostenlose Finanzrechner für Baufinanzierung, Kredite, Zinseszins, Altersvorsorge, Steuern und Tilgungspläne direkt im Browser.',
      pillarContent: `## Kostenlose Finanzrechner

Eine fundierte Finanzplanung beginnt mit präzisen Berechnungen. Unsere Sammlung von **über 80 Finanzrechnern** deckt alle Bereiche der privaten und geschäftlichen Finanzen ab — von der monatlichen Hypothekenrate bis zur Rentenprognose.

### Immobilien & Baufinanzierung
Berechnen Sie Monatsraten, vollständige Tilgungspläne, Sondertilgungen und Ihre maximale Kaufkraft auf Basis Ihres Einkommens und Verschuldungsgrads.

### Kredite & Schuldenabbau
Vergleichen Sie Autokredite, Studienkredite und Ratenkredite mit detaillierter Zins- und Tilgungsaufstellung. Unsere Rechner zur **Schuldentilgung** und **Umschuldung** zeigen Ihnen den schnellsten Weg zur Schuldenfreiheit.

### Investitionen & Altersvorsorge
Planen Sie langfristig mit Zinseszinsrechnern, internem Zinsfuß (IRR), Durchschnittsrendite und Rentenlücken-Analysen.

### Steuern & Gehalt
Berechnen Sie Einkommensteuer, Mehrwertsteuer (MwSt.), Umsatzsteuer und Ihr Nettogehalt. Alle Berechnungen erfolgen **100 % lokal in Ihrem Browser** — Ihre Finanzdaten verlassen niemals Ihr Gerät.`
    }
  },
  health: {
    es: {
      title: 'Calculadoras de Salud y Fitness',
      description: 'Herramientas de IMC, calorías, grasa corporal, embarazo y seguimiento deportivo.',
      seoTitle: 'Calculadoras de Salud y Fitness Gratis — IMC, Calorías y Grasa Corporal',
      seoDescription: 'Calculadoras gratuitas de salud y condición física: IMC (BMI), calorías diarias, porcentaje de grasa corporal, TMB (BMR), fecha de parto y ovulación.',
      pillarContent: `## Calculadoras de Salud y Condición Física

Toma el control de tu bienestar con nuestra suite de **calculadoras de salud basadas en fórmulas clínicas validadas**. Desde el análisis de composición corporal hasta la planificación del embarazo, cada herramienta se ejecuta de forma privada en tu navegador.

### Composición Corporal y Metabolismo
Utiliza la **Calculadora de IMC** para una evaluación rápida y profundiza con la **Calculadora de Grasa Corporal**, **Peso Ideal** y **Masa Corporal Magra**. Nuestra **Calculadora de TMB (BMR)** estima tu tasa metabólica basal como base para cualquier plan nutricional.

### Nutrición y Rendimiento Deportivo
La **Calculadora de Calorías** determina tu ingesta energética diaria según tus objetivos de pérdida de peso, mantenimiento o ganancia muscular, complementada con la **Calculadora de Ritmo (Pace)** para corredores.

### Embarazo y Fertilidad
Planifica cada etapa con nuestras calculadoras de **Ovulación**, **Embarazo**, **Concepción** y **Fecha Probable de Parto**. Consulta siempre a un profesional médico para decisiones clínicas.`
    },
    fr: {
      title: 'Calculatrices Santé et Fitness',
      description: 'Outils gratuits d’IMC, calories, masse grasse, grossesse et suivi sportif.',
      seoTitle: 'Calculatrices Santé et Fitness Gratuites — IMC, Calories et Masse Grasse',
      seoDescription: 'Calculatrices gratuites de santé et de remise en forme : IMC, besoins caloriques journaliers, pourcentage de graisse corporelle, métabolisme de base (BMR) et grossesse.',
      pillarContent: `## Calculatrices Santé et Remise en Forme

Prenez soin de votre santé grâce à notre suite de **calculatrices biométriques basées sur des formules cliniques validées**. De l'analyse de la composition corporelle au suivi de grossesse, chaque outil fonctionne localement dans votre navigateur.

### Composition Corporelle et Métabolisme
Utilisez le **Calculateur d'IMC** pour une première évaluation, puis affinez votre bilan avec le **Calculateur de Masse Grasse** et de **Poids Idéal**. Notre **Calculateur de Métabolisme de Base (BMR)** détermine vos besoins énergétiques au repos.

### Nutrition et Performance Sportive
Le **Calculateur de Calories** estime vos apports quotidiens selon vos objectifs, tandis que le **Calculateur d'Allure (Pace)** vous accompagne dans la préparation de vos courses.

### Grossesse et Fertilité
Suivez les étapes clés avec nos calculateurs d'**Ovulation**, de **Grossesse** et de **Date d'Accouchement**. Consultez toujours un professionnel de santé pour un avis médical personnalisé.`
    },
    de: {
      title: 'Gesundheits- & Fitnessrechner',
      description: 'Kostenlose Rechner für BMI, Kalorienbedarf, Körperfett, Schwangerschaft und Sport.',
      seoTitle: 'Gesundheits- & Fitnessrechner — BMI, Kalorien & Körperfett berechnen',
      seoDescription: 'Kostenlose Gesundheits- und Fitnessrechner: BMI-Rechner, täglicher Kalorienbedarf, Körperfettanteil, Grundumsatz (BMR), Geburtstermin und Eisprungrechner.',
      pillarContent: `## Gesundheits- und Fitnessrechner

Unterstützen Sie Ihre Gesundheitsziele mit unseren **präzisen Gesundheitsrechnern auf Basis klinisch validierter Formeln**. Von der Körperanalyse bis zur Schwangerschaftsplanung läuft jedes Tool vollkommen privat in Ihrem Browser.

### Körperzusammensetzung & Stoffwechsel
Nutzen Sie den **BMI-Rechner** für eine schnelle Einschätzung und analysieren Sie Ihre Werte detailliert mit dem **Körperfettrechner** und **Idealgewicht-Rechner**. Der **Grundumsatzrechner (BMR)** berechnet Ihren täglichen Ruheenergiebedarf.

### Ernährung & Ausdauersport
Der **Kalorienrechner** ermittelt Ihren täglichen Energiebedarf zum Abnehmen, Halten oder Muskelaufbau, ergänzt durch den **Pace-Rechner** für Läufer.

### Schwangerschaft & Familienplanung
Berechnen Sie wichtige Termine mit unserem **Eisprungrechner**, **Schwangerschaftsrechner** und **Geburtsterminrechner**. Bitte ziehen Sie bei medizinischen Fragen stets eine Ärztin oder einen Arzt hinzu.`
    }
  },
  math: {
    es: {
      title: 'Calculadoras de Matemáticas y Ciencias',
      description: 'Herramientas científicas, gráficas, de estadística, fracciones, álgebra y geometría.',
      seoTitle: 'Calculadoras de Matemáticas Gratis — Científica, Gráfica y Estadística',
      seoDescription: 'Calculadoras matemáticas gratuitas en línea: calculadora científica, gráfica, desviación estándar, valor P, fracciones, porcentajes y geometría.',
      pillarContent: `## Calculadoras de Matemáticas y Estadística

Desde aritmética elemental hasta análisis estadístico avanzado, nuestras calculadoras matemáticas ofrecen **herramientas interactivas de alta precisión** para estudiantes, docentes, ingenieros e investigadores.

### Cálculo Avanzado y Graficación
La **Calculadora Científica** incluye funciones trigonométricas, logarítmicas y exponenciales. La **Calculadora Gráfica** permite trazar funciones en tiempo real con zoom interactivo.

### Estadística y Probabilidad
Analiza conjuntos de datos con la **Calculadora de Estadística**, calcula la **Desviación Estándar**, ejecuta pruebas de hipótesis de **Valor P**, intervalos de confianza y tamaño de muestra.

### Álgebra y Geometría
Resuelve fracciones, porcentajes, ecuaciones cuadráticas, triángulos, volúmenes y notación científica con explicaciones paso a paso.`
    },
    fr: {
      title: 'Calculatrices Mathématiques et Scientifiques',
      description: 'Outils scientifiques, graphiques, statistiques, fractions, algèbre et géométrie.',
      seoTitle: 'Calculatrices Mathématiques Gratuites — Scientifique, Graphique et Statistique',
      seoDescription: 'Calculatrices mathématiques gratuites en ligne : calculatrice scientifique, graphique, écart-type, valeur p, fractions, pourcentages et géométrie.',
      pillarContent: `## Calculatrices Mathématiques et Statistiques

De l'arithmétique de base à l'analyse statistique avancée, nos calculatrices mathématiques fournissent des **outils interactifs de haute précision** pour les étudiants, enseignants, ingénieurs et chercheurs.

### Calcul Avancé et Représentation Graphique
La **Calculatrice Scientifique** propose les fonctions trigonométriques, logarithmiques et exponentielles, tandis que la **Calculatrice Graphique** trace vos équations en temps réel.

### Statistiques et Probabilités
Analysez vos séries de données avec la **Calculatrice Statistique**, calculez l'**Écart-Type**, la **Valeur P (p-value)**, la taille d'échantillon et les probabilités.

### Algèbre et Géométrie
Résolvez les fractions, pourcentages, triangles, aires, volumes et notations scientifiques avec des formules détaillées étape par étape.`
    },
    de: {
      title: 'Mathe- & Wissenschaftsrechner',
      description: 'Wissenschaftliche Rechner, Grafikrechner, Statistik, Brüche, Algebra und Geometrie.',
      seoTitle: 'Kostenlose Mathe-Rechner — Wissenschaftlicher Rechner, Grafik & Statistik',
      seoDescription: 'Kostenlose Online-Mathematikrechner: Wissenschaftlicher Taschenrechner, Grafikrechner, Standardabweichung, P-Wert, Bruchrechner, Prozentrechner und Geometrie.',
      pillarContent: `## Mathematik- und Statistikrechner

Von den Grundrechenarten bis zur komplexen Datenanalyse bieten unsere Mathematikrechner **präzise, interaktive Werkzeuge** für Schüler, Studierende, Ingenieure und Wissenschaftler.

### Wissenschaftliches Rechnen & Funktionsplotter
Der **Wissenschaftliche Taschenrechner** unterstützt trigonometrische, logarithmische und exponentielle Funktionen. Mit dem **Grafikrechner** stellen Sie Funktionen interaktiv in Echtzeit dar.

### Statistik & Wahrscheinlichkeitsrechnung
Werten Sie Datensätze mit dem **Statistikrechner** aus, berechnen Sie **Standardabweichung**, **P-Werte**, Konfidenzintervalle und Stichprobengrößen.

### Algebra & Geometrie
Lösen Sie Brüche, Prozentrechnungen, Dreiecke, Flächen, Volumina und wissenschaftliche Notationen mit übersichtlichen Rechenschritten.`
    }
  },
  other: {
    es: {
      title: 'Calculadoras de Utilidades y Uso Diario',
      description: 'Herramientas de fechas, tiempo, edad, promedio académico (GPA), redes y conversión de unidades.',
      seoTitle: 'Calculadoras de Utilidades Gratis — Edad, Fechas, GPA y Conversiones',
      seoDescription: 'Calculadoras de utilidad gratuitas: calculadora de edad exacta, diferencia entre fechas, promedio GPA, subredes IPv4 y conversor de unidades.',
      pillarContent: `## Calculadoras de Utilidades Cotidianas

Simplifica los cálculos diarios con nuestra colección de herramientas prácticas de **fechas y horas**, **educación**, **redes informáticas** y **conversión de unidades**.

### Fechas y Tiempo
Calcula tu edad cronológica exacta con la **Calculadora de Edad**, obtén los días laborables o naturales entre dos fechas, suma o resta horas y convierte zonas horarias.

### Educación y Calificaciones
La **Calculadora de GPA** admite escalas ponderadas y no ponderadas, mientras que la **Calculadora de Calificaciones** te indica qué nota necesitas en tu examen final.

### Redes y Conversión de Unidades
Calcula máscaras CIDR e intervalos de host con la **Calculadora de Subredes IP**, y convierte cientos de unidades de longitud, peso, volumen y temperatura al instante.`
    },
    fr: {
      title: 'Calculatrices Utilitaires et Quotidiennes',
      description: 'Outils de dates, heures, âge, moyenne scolaire (GPA), réseau et conversion d’unités.',
      seoTitle: 'Calculatrices Utilitaires Gratuites — Âge, Dates, GPA et Conversions',
      seoDescription: 'Calculatrices utilitaires gratuites en ligne : calculateur d’âge exact, durée entre deux dates, moyenne GPA, sous-réseaux IP et convertisseur d’unités.',
      pillarContent: `## Calculatrices Utilitaires au Quotidien

Simplifiez vos calculs de tous les jours grâce à nos outils dédiés à la **gestion du temps et des dates**, à l'**éducation**, aux **réseaux informatiques** et aux **conversions d'unités**.

### Dates et Heures
Calculez votre âge exact avec le **Calculateur d'Âge**, déterminez l'écart entre deux dates, additionnez des heures de travail et convertissez les fuseaux horaires.

### Éducation et Notes
Le **Calculateur de GPA** et le **Calculateur de Notes** vous aident à suivre votre moyenne générale et à planifier vos objectifs d'examens.

### Réseaux et Conversions
Dimensionnez vos plages d'adresses IPv4/CIDR avec le **Calculateur de Sous-Réseaux** et convertissez instantanément longueurs, masses, volumes et températures.`
    },
    de: {
      title: 'Alltags- & Nützliche Rechner',
      description: 'Rechner für Datum, Uhrzeit, Alter, Notendurchschnitt (GPA), Netzwerke und Einheiten.',
      seoTitle: 'Kostenlose Alltagsrechner — Altersrechner, Datumsrechner, GPA & Einheiten',
      seoDescription: 'Kostenlose Alltags- und Hilfsrechner: exakter Altersrechner, Datumsrechner, Zeitrechner, Notendurchschnitt (GPA), Subnetzrechner und Einheitenumrechner.',
      pillarContent: `## Nützliche Alltags- und Hilfsrechner

Erledigen Sie alltägliche Berechnungen schnell und zuverlässig. Unsere Hilfsrechner decken **Datum und Uhrzeit**, **Schule & Studium**, **Netzwerktechnik** sowie **Einheitenumrechnungen** ab.

### Datum & Uhrzeit
Berechnen Sie Ihr exaktes Lebensalter mit dem **Altersrechner**, ermitteln Sie die Tage zwischen zwei Daten, rechnen Sie Arbeitszeiten zusammen und vergleichen Sie Zeitzonen.

### Bildung & Noten
Mit dem **GPA-Rechner** und **Notenrechner** behalten Sie Ihren Notendurchschnitt im Blick und prüfen, welche Punktzahl Sie in der Abschlussprüfung benötigen.

### Netzwerk & Einheitenumrechnung
Berechnen Sie IPv4-CIDR-Subnetze mit dem **Subnetzrechner** und rechnen Sie Längen, Gewichte, Volumina und Temperaturen präzise um.`
    }
  },
  weather: {
    es: {
      title: 'Calculadoras Meteorológicas y del Clima',
      description: 'Calcula sensación térmica por viento, índice de calor, punto de rocío y probabilidad de día de nieve.',
      seoTitle: 'Calculadoras Meteorológicas Gratis — Sensación Térmica, Índice de Calor y Nieve',
      seoDescription: 'Calculadoras meteorológicas gratuitas en línea: calcula la sensación térmica por viento (wind chill), índice de calor, punto de rocío y probabilidad de nieve.',
      pillarContent: `## Calculadoras Meteorológicas y Climáticas

Comprende los fenómenos atmosféricos y planifica tus actividades al aire libre. Nuestra colección de **calculadoras meteorológicas** ofrece estimaciones precisas basadas en ecuaciones de la NOAA y del Servicio Meteorológico Nacional.

### Frío Invernal y Nieve
La **Calculadora de Sensación Térmica (Wind Chill)** estima cómo percibe el cuerpo humano la combinación de bajas temperaturas y velocidad del viento, mientras que la **Calculadora de Día de Nieve** evalúa la probabilidad de cierre escolar.

### Calor Estival y Humedad
Calcula el estrés térmico con la **Calculadora de Índice de Calor** y el **Punto de Rocío** para prevenir golpes de calor durante el verano.`
    },
    fr: {
      title: 'Calculatrices Météo et Climat',
      description: 'Calculez le refroidissement éolien, l’indice de chaleur, le point de rosée et les probabilités de neige.',
      seoTitle: 'Calculatrices Météo Gratuites — Refroidissement Éolien et Indice de Chaleur',
      seoDescription: 'Calculatrices météorologiques gratuites : calculez le refroidissement éolien (wind chill), l’indice de chaleur (humidex), le point de rosée et les jours de neige.',
      pillarContent: `## Calculatrices Météorologiques et Climatiques

Anticipez les conditions atmosphériques grâce à notre suite de **calculatrices météorologiques de précision** basées sur les formules standards de la météorologie physique.

### Risques Hivernaux et Refroidissement Éolien
Le **Calculateur de Refroidissement Éolien** détermine la température ressentie face au vent, tandis que le **Calculateur de Jour de Neige** estime la probabilité d'intempéries hivernales.

### Chaleur Estivale et Humidité
Évaluez l'inconfort thermique avec le **Calculateur d'Indice de Chaleur** et le **Point de Rosée** afin d'adapter vos activités par fortes chaleurs.`
    },
    de: {
      title: 'Wetter- & Klimarechner',
      description: 'Berechnen Sie Windchill, Hitzeindex, Taupunkt und Schneefall-Wahrscheinlichkeiten.',
      seoTitle: 'Kostenlose Wetterrechner — Windchill, Hitzeindex & Taupunkt berechnen',
      seoDescription: 'Kostenlose Online-Wetterrechner: Berechnen Sie Windchill-Temperatur, Hitzeindex, Taupunkt, Luftfeuchtigkeit und Schneetag-Wahrscheinlichkeiten präzise.',
      pillarContent: `## Wetter- und Klimarechner

Verstehen Sie meteorologische Messgrößen und planen Sie sicher bei jedem Wetter. Unsere **Wetterrechner** nutzen standardisierte meteorologische Formeln zur Berechnung von Gefühlter Temperatur und Luftfeuchtigkeitsindizes.

### Winterkälte & Windchill
Der **Windchill-Rechner** ermittelt die gefühlte Temperatur bei Kälte und Wind, während der **Schneetag-Rechner** Wahrscheinlichkeiten für witterungsbedingte Schulausfälle einschätzt.

### Sommerhitze & Luftfeuchtigkeit
Berechnen Sie die Wärmebelastung mit dem **Hitzeindex-Rechner** sowie den **Taupunkt** direkt und datenschutzfreundlich im Browser.`
    }
  },
  physics: {
    es: {
      title: 'Calculadoras de Física',
      description: 'Calcula movimiento parabólico, velocidad, aceleración, fuerza, energía y leyes físicas.',
      seoTitle: 'Calculadoras de Física Gratis — Cinemática, Movimiento Parabólico y Fuerza',
      seoDescription: 'Calculadoras de física gratuitas en línea: resuelve problemas de cinemática, movimiento de proyectiles, dinámica, leyes de Newton, energía y termodinámica.',
      pillarContent: `## Calculadoras de Física e Ingeniería

Estudia el movimiento, la energía y las fuerzas fundamentales del universo. Nuestras **calculadoras de física** ayudan a estudiantes, profesores e ingenieros a resolver ecuaciones complejas con desglose paso a paso.

### Cinemática y Movimiento de Proyectiles
Resuelve trayectorias en 2D con la **Calculadora de Movimiento Parabólico**, velocidad media, aceleración constante y caída libre.

### Dinámica, Fuerza y Energía
Calcula fuerza neta, masa, aceleración, par motor (torque), energía cinética, energía potencial y potencia mecánica al instante en tu navegador.`
    },
    fr: {
      title: 'Calculatrices de Physique',
      description: 'Calculez le mouvement de projectile, la vitesse, l’accélération, les forces et l’énergie.',
      seoTitle: 'Calculatrices de Physique Gratuites — Cinématique, Projectile et Forces',
      seoDescription: 'Calculatrices de physique gratuites en ligne : résolvez vos exercices de cinématique, mouvement parabolique, dynamique, énergie et thermodynamique.',
      pillarContent: `## Calculatrices de Physique et Sciences de l'Ingénieur

Explorez les lois du mouvement, de l'énergie et des forces. Nos **calculatrices de physique** accompagnent les étudiants, enseignants et ingénieurs avec des résolutions détaillées.

### Cinématique et Balistique
Calculez la portée, la hauteur maximale et le temps de vol avec le **Calculateur de Mouvement de Projectile**, ainsi que la vitesse et l'accélération uniforme.

### Dynamique et Énergie
Appliquez les lois de Newton pour déterminer la force résultante, le couple, l'énergie cinétique, l'énergie potentielle et la puissance mécanique.`
    },
    de: {
      title: 'Physikrechner',
      description: 'Berechnen Sie Wurfparabeln, Geschwindigkeit, Beschleunigung, Kräfte, Energie und Mechanik.',
      seoTitle: 'Kostenlose Physikrechner — Kinematik, Wurfbewegung, Kraft & Energie',
      seoDescription: 'Kostenlose Online-Physikrechner: Lösen Sie Aufgaben zu Kinematik, Wurfparabel, Dynamik, Newtonschen Gesetzen, Arbeit, Energie und Thermodynamik.',
      pillarContent: `## Physik- und Mechanikrechner

Untersuchen Sie Bewegung, Kräfte und Energie mit höchster Genauigkeit. Unsere **Physikrechner** unterstützen Schüler, Studierende, Lehrkräfte und Ingenieure mit klaren Formeln und Sofortlösungen.

### Kinematik & Wurfbewegung
Berechnen Sie Flugbahn, Wurfweite, maximale Höhe und Flugzeit mit dem **Wurfparabel-Rechner** sowie Geschwindigkeit und Beschleunigung.

### Dynamik, Kraft & Energie
Lösen Sie Gleichungen nach den Newtonschen Gesetzen für Kraft, Masse, Drehmoment, kinetische und potenzielle Energie direkt im Browser.`
    }
  },
  chemistry: {
    es: {
      title: 'Calculadoras de Química',
      description: 'Resuelve molaridad, masa molar, estequiometría, leyes de los gases, pH y disoluciones.',
      seoTitle: 'Calculadoras de Química Gratis — Molaridad, Leyes de Gases y Estequiometría',
      seoDescription: 'Calculadoras de química gratuitas en línea: resuelve molaridad, masa molecular, estequiometría, ley de gases ideales, pH, diluciones y termoquímica.',
      pillarContent: `## Calculadoras de Química y Laboratorio

Domina los cálculos químicos y la preparación de disoluciones con nuestra colección de **calculadoras de química de precisión**, diseñadas para estudiantes, investigadores y técnicos de laboratorio.

### Química de Disoluciones y Molaridad
Calcula concentración molar, molalidad, diluciones ($C_1 V_1 = C_2 V_2$) y porcentaje en masa para el trabajo diario de laboratorio.

### Estequiometría y Leyes de los Gases
Determina masas molares, reactivo limitante, rendimiento teórico y resuelve la **Ley de los Gases Ideales** ($PV = nRT$) con conversión automática de unidades.`
    },
    fr: {
      title: 'Calculatrices de Chimie',
      description: 'Résolvez la molarité, la masse molaire, la stœchiométrie, les lois des gaz parfaits et le pH.',
      seoTitle: 'Calculatrices de Chimie Gratuites — Molarité, Gaz Parfaits et Stœchiométrie',
      seoDescription: 'Calculatrices de chimie gratuites en ligne : calculez la molarité, la masse moléculaire, la stœchiométrie, la loi des gaz parfaits, le pH et les dilutions.',
      pillarContent: `## Calculatrices de Chimie et de Laboratoire

Maîtrisez vos calculs chimiques et la préparation de solutions grâce à notre suite de **calculatrices de chimie de précision** destinées aux étudiants, chercheurs et techniciens de laboratoire.

### Solutions et Molarité
Calculez la concentration molaire, la molalité, les volumes de dilution ($C_1 V_1 = C_2 V_2$) et les fractions massiques instantanément.

### Stœchiométrie et Thermodynamique des Gaz
Déterminez les masses molaires, les réactifs limitants, le rendement théorique et résolvez l'équation des **Gaz Parfaits** ($PV = nRT$).`
    },
    de: {
      title: 'Chemierechner',
      description: 'Berechnen Sie Molarität, Molmasse, Stöchiometrie, Gasgesetze, pH-Wert und Verdünnungen.',
      seoTitle: 'Kostenlose Chemierechner — Molarität, Ideales Gasgesetz & Stöchiometrie',
      seoDescription: 'Kostenlose Online-Chemierechner: Berechnen Sie Stoffmengenkonzentration (Molarität), Molmasse, Stöchiometrie, Ideales Gasgesetz, pH-Wert und Verdünnungen.',
      pillarContent: `## Chemie- und Laborrechner

Meistern Sie chemische Berechnungen und die Herstellung von Laborlösungen mit unseren **präzisen Chemierechnern** für Studium, Forschung und Laborpraxis.

### Lösungschemie & Konzentration
Berechnen Sie Molarität, Molalität, Verdünnungen ($C_1 V_1 = C_2 V_2$) und Massenprozente für die exakte Vorbereitung von Lösungen.

### Stöchiometrie & Gasgesetze
Bestimmen Sie molare Massen, Grenzreagenzien, theoretische Ausbeuten und lösen Sie das **Ideale Gasgesetz** ($PV = nRT$) mit automatischer Einheitenumrechnung.`
    }
  }
};

export const categories: CategoryDef[] = [
  {
    id: 'financial',
    title: 'Financial Calculators',
    dbCategory: ['Financial'],
    description: 'Mortgage, loan, investment, retirement, tax, and budgeting tools.',
    icon: 'DollarSign',
    seoTitle: 'Financial Calculators — Free Mortgage, Loan & Investment Tools',
    seoDescription: 'Explore 80+ free financial calculators for mortgages, loans, investments, retirement planning, taxes, and budgeting. Make smarter financial decisions with Nexus Calculator.',
    pillarContent: `## Financial Calculators

Managing your finances effectively starts with the right tools. Our collection of **80+ financial calculators** covers every aspect of personal and business finance — from computing monthly mortgage payments to projecting retirement savings.

### Mortgage & Housing
Whether you're a first-time homebuyer or refinancing, our mortgage calculators help you understand your monthly payments, amortization schedules, and how much house you can afford. Use the **House Affordability Calculator** to determine your budget based on income and DTI ratios.

### Loans & Debt
Evaluate auto loans, student loans, personal loans, and business loans with precise payment schedules. Our **Debt Payoff Calculator** and **Debt Consolidation Calculator** help you build a strategy to become debt-free faster.

### Investments & Retirement
Plan for the future with compound interest projections, IRR analysis, 401(k) modeling, and Roth IRA comparisons. The **Retirement Calculator** provides a comprehensive projection of your financial readiness.

### Taxes & Income
Calculate federal income tax, sales tax, VAT, marriage tax implications, and estate taxes. Our **Salary Calculator** helps you understand your take-home pay after all deductions.

All calculations run **entirely in your browser** — your financial data is never stored or transmitted to any server.`,
    translations: categoryTranslations.financial,
  },
  {
    id: 'health',
    title: 'Health & Fitness Calculators',
    dbCategory: ['Health', 'Health & Fitness', 'Sports'],
    description: 'BMI, calorie, body fat, pregnancy, and fitness tracking tools.',
    icon: 'Heart',
    seoTitle: 'Health & Fitness Calculators — BMI, Calorie & Body Fat Tools',
    seoDescription: 'Free health and fitness calculators including BMI, calorie counter, body fat percentage, BMR, pregnancy due date, and ovulation calculators.',
    pillarContent: `## Health & Fitness Calculators

Take control of your health journey with our suite of **medical-grade calculators** designed for accuracy and privacy. From body composition analysis to pregnancy planning, every tool runs locally in your browser.

### Body Composition
Use the **BMI Calculator** for a quick assessment, then dive deeper with **Body Fat Calculator** and **Ideal Weight Calculator** for a comprehensive body composition analysis. Our **BMR Calculator** reveals your basal metabolic rate — the foundation for any nutrition plan.

### Nutrition & Fitness
The **Calorie Calculator** helps you determine daily intake targets based on your goals. Whether you're cutting, bulking, or maintaining, pair it with the **Pace Calculator** for exercise planning.

### Pregnancy & Fertility
Plan your pregnancy journey with our **Ovulation Calculator**, **Pregnancy Calculator**, and **Due Date Calculator**. The **Pregnancy Conception Calculator** helps pinpoint key dates for family planning.

All health calculations use clinically validated formulas. However, always consult a healthcare professional for medical decisions.`,
    translations: categoryTranslations.health,
  },
  {
    id: 'math',
    title: 'Math & Science Calculators',
    dbCategory: ['Math'],
    description: 'Scientific, graphing, statistics, fractions, and geometry tools.',
    icon: 'Sigma',
    seoTitle: 'Math Calculators — Scientific, Graphing & Statistics Tools',
    seoDescription: 'Free online math calculators including scientific calculator, graphing calculator, statistics tools, fraction calculator, and geometry calculators.',
    pillarContent: `## Math & Science Calculators

From basic arithmetic to advanced statistical analysis, our math calculators provide **precise, interactive tools** for students, engineers, and researchers.

### Advanced Computation
The **Scientific Calculator** offers trigonometric, logarithmic, and exponential functions. For visual learners, the **Graphing Calculator** plots equations in real-time with interactive zoom and pan.

### Statistics & Probability
Analyze datasets with the **Statistics Calculator**, compute **Standard Deviation**, run **P-Value** hypothesis tests, and generate random numbers for simulations.

### Algebra & Geometry
Solve fractions, compute percentages, analyze triangles, and work with scientific notation. Every calculator shows step-by-step breakdowns where applicable.

All tools support **keyboard shortcuts** for rapid input and are optimized for both desktop and mobile use.`,
    translations: categoryTranslations.math,
  },
  {
    id: 'other',
    title: 'Utility Calculators',
    dbCategory: ['Other'],
    description: 'Date, time, age, GPA, networking, conversion, and more.',
    icon: 'Wrench',
    seoTitle: 'Utility Calculators — Date, Time, GPA & Conversion Tools',
    seoDescription: 'Free utility calculators including age calculator, date calculator, GPA calculator, subnet calculator, and unit converter.',
    pillarContent: `## Utility Calculators

Everyday calculations made simple. Our utility tools cover **date and time**, **education**, **networking**, and **unit conversions**.

### Date & Time
Calculate your exact age with the **Age Calculator**, find the difference between dates, convert time zones, and track work hours with precision.

### Education
The **GPA Calculator** supports weighted and unweighted scales for high school and college. The **Grade Calculator** helps you determine what you need on your final exam.

### Networking & Security
The **Subnet Calculator** handles IPv4 CIDR notation for network engineers.

### Conversions
Convert between units of measurement, currencies, and number systems. Our **Conversion Calculator** supports hundreds of unit pairs across length, weight, volume, and temperature.`,
    translations: categoryTranslations.other,
  },
  {
    id: 'weather',
    title: 'Weather Calculators',
    dbCategory: ['Weather', 'Weather Calculators'],
    description: 'Calculate wind chill, heat index, snow day probability, and other weather factors.',
    icon: 'CloudSnow',
    seoTitle: 'Weather Calculators — Wind Chill, Heat Index & Snow Day Tools',
    seoDescription: 'Free online weather calculators. Calculate snow day probabilities, wind chill index, heat index, and relative humidity with precision.',
    pillarContent: `## Weather Calculators
 
Plan for the elements and understand the atmosphere. Our suite of **weather and climate calculators** provides precise tools for estimating environmental indices, temperature conversions, precipitation rates, and safety forecasts.

### Winter Hazards & Predictions
The **Snow Day Calculator** estimates school closure probabilities based on a combination of regional threshold parameters, temperature, icing, road conditions, and school levels. Use the **Wind Chill Calculator** to compute human-perceived temperature under windy conditions.

### Summer Heat & Humidity
Estimate heat stress and human discomfort with the **Heat Index Calculator**. Track humidity levels, dew points, and evaporation indexes to prepare for hot weather.

### General Meteorology
Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly, or perform rainfall and liquid-to-solid snow conversions using meteorologically sound parameters.

All computations are processed locally in your browser to maintain your geographic privacy.`,
    translations: categoryTranslations.weather,
  },
  {
    id: 'physics',
    title: 'Physics Calculators',
    dbCategory: ['Physics', 'Physics Calculators'],
    description: 'Calculate projectile motion, velocity, acceleration, forces, and other physical properties.',
    icon: 'Zap',
    seoTitle: 'Physics Calculators — Projectile Motion, Velocity & Force Tools',
    seoDescription: 'Free online physics calculators. Solve kinematics, projectile motion, dynamics, energy, and thermodynamics problems with step-by-step solutions.',
    pillarContent: `## Physics Calculators
    
Study the motion, energy, and forces of the universe. Our physics calculators help students, teachers, and professionals solve complex equations easily.

### Kinematics & Projectiles
Solve 2D projectile motion, uniform acceleration, velocity, and time equations with interactive kinematic calculators.

### Dynamics & Force
Calculate net force, mass, acceleration, friction coefficients, and torque based on Newton's laws of motion.

### Energy & Thermodynamics
Estimate kinetic energy, potential energy, work, power, thermal expansion, and heat transfer across multiple units.

All calculations run entirely in your web browser with no server latency or tracking.`,
    translations: categoryTranslations.physics,
  },
  {
    id: 'chemistry',
    title: 'Chemistry Calculators',
    dbCategory: ['Chemistry', 'Chemistry Calculators'],
    description: 'Solve molarity, molecular weight, stoichiometry, gas laws, pH, and chemical solution math.',
    icon: 'FlaskConical',
    seoTitle: 'Chemistry Calculators — Free Molarity, Gas Laws & Stoichiometry Tools',
    seoDescription: 'Free online chemistry calculators. Solve molarity, molecular weight, stoichiometry, ideal gas law, pH, buffer solutions, and thermochemistry problems with step-by-step solutions.',
    pillarContent: `## Chemistry Calculators

Master chemical calculations and laboratory solutions with our suite of **precision chemistry calculators**. Designed for students, researchers, and lab technicians, all tools run instantaneously in your web browser.

### Solution Chemistry & Molarity
Calculate solution concentration, molarity, molality, dilution volumes ($C_1 V_1 = C_2 V_2$), and mass percentages for precision laboratory preparation.

### Stoichiometry & Chemical Formulas
Compute molar masses, empirical formulas, percent composition, limiting reactants, and theoretical reaction yield.

### Gas Laws & Thermodynamics
Solve Ideal Gas Law ($PV = nRT$), Boyle's Law, Charles's Law, and enthalpy changes ($\\Delta H$) with automatic unit conversions.

All calculations process locally in your browser to deliver instant calculations and complete privacy.`,
    translations: categoryTranslations.chemistry,
  }
];

export function getCategoryById(id: string): CategoryDef | undefined {
  return categories.find(c => c.id === id);
}

export function getLocalizedCategory(id: string, locale: string): CategoryDef | undefined {
  const cat = getCategoryById(id);
  if (!cat) return undefined;
  const t = cat.translations?.[locale];
  if (!t) return cat;
  return {
    ...cat,
    title: t.title,
    description: t.description,
    seoTitle: t.seoTitle,
    seoDescription: t.seoDescription,
    pillarContent: t.pillarContent,
  };
}

export function getCategoryForCalculator(calcCategory: string): CategoryDef | undefined {
  return categories.find(c => c.dbCategory.includes(calcCategory));
}

