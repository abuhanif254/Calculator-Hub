import { Metadata } from 'next';
import { Link as CustomLink } from '@/i18n/routing';
import Image from 'next/image';
import {
  Calculator, Zap, Globe, ShieldCheck, Mail, Phone,
  MapPin, Linkedin, Facebook, Instagram, Github, Link as LinkIcon, Award
} from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = false;
export const dynamicParams = false;

interface AboutLocaleCopy {
  title: string;
  description: string;
  home: string;
  crumb: string;
  h1: string;
  subtitle: string;
  visionHeading: string;
  visionP1: string;
  visionP2: string;
  visionP3: string;
  standOutHeading: string;
  pillars: { title: string; desc: string }[];
  ecosystemHeading: string;
  ecosystemIntro: string;
  ecosystemCards: { title: string; desc: string }[];
  editorialHeading: string;
  editorialIntro: string;
  reviewers: { name: string; role: string; scope: string }[];
  developerHeading: string;
  developerSub: string;
  developerRole: string;
  developerBio: string;
  contactHeading: string;
  emailLabel: string;
  phoneLabel: string;
  officeLabel: string;
  portfolioLabel: string;
  portfolioCta: string;
  evolveHeading: string;
  evolveBody: string;
  evolveCta: string;
}

const copyByLocale: Record<string, AboutLocaleCopy> = {
  en: {
    title: 'About Us — Trusted Global Calculators & Developer Tools Platform',
    description: 'Discover the story, editorial verification standards, and engineering architecture behind Nexus Calculator.',
    home: 'Home',
    crumb: 'About Us',
    h1: 'Empowering Your Decisions with Mathematical Precision',
    subtitle:
      'Nexus Calculator is an international quantitative engineering platform built to deliver peer-reviewed financial, clinical, and scientific calculators alongside 100% client-side developer, PDF, and image utilities.',
    visionHeading: 'Our Vision & Engineering Philosophy',
    visionP1:
      'What began as a dedicated repository for high-precision mathematical calculators has grown into a comprehensive, multi-language utility ecosystem. In a data-driven world, professionals, students, and households need reliable quantitative tools that execute instantaneously without sacrificing data privacy.',
    visionP2:
      'Whether you are modeling mortgage amortization schedules, benchmarking clinical body-composition metrics, formatting production JSON schemas, or processing confidential PDF documents—accuracy and transparency are non-negotiable. Every calculator on our platform pairs an interactive computation engine with explicit mathematical formulas, baseline parameter tables, and step-by-step verification protocols.',
    visionP3:
      'Unlike legacy web portals cluttered with server-side queues and invasive data harvesting, Nexus Calculator is engineered on a modern serverless edge architecture and client-side WebAssembly pipeline—delivering zero-latency calculations across English, Spanish, French, and German.',
    standOutHeading: 'Core Architectural Pillars',
    pillars: [
      {
        title: 'IEEE 754 Double-Precision Accuracy',
        desc: 'Every calculation engine eliminates premature intermediate rounding drift and validates domain boundaries in real time before rendering headline metrics and sensitivity tables.',
      },
      {
        title: '330+ Modular Calculators & Utilities',
        desc: 'Spanning quantitative finance, clinical biometrics, applied mathematics, cryptography, PDF document workflows, and studio-grade image processing in a unified interface.',
      },
      {
        title: 'Native Multi-Language Localization',
        desc: 'Full localized support across English, Spanish, French, and German—adapting terminology, regulatory disclosures, currency conventions, and SI/Imperial measurement systems.',
      },
      {
        title: '100% Client-Side Privacy Sandbox',
        desc: 'All financial inputs, biometric parameters, code snippets, and uploaded files are processed strictly inside your browser’s local RAM. Zero personal calculation data is ever stored on external servers.',
      },
    ],
    ecosystemHeading: 'A Complete Ecosystem of Digital & Quantitative Utilities',
    ecosystemIntro:
      'We engineer specialized tool suites tailored to the daily workflows of financial analysts, software engineers, healthcare educators, designers, and students worldwide:',
    ecosystemCards: [
      {
        title: 'Advanced Developer & Security Tools',
        desc: 'Format and validate JSON, SQL, XML, and YAML; decode JWT tokens; compute SHA-256 and HMAC digests; and test regular expressions 100% locally in your browser without exposing proprietary code.',
      },
      {
        title: 'Private In-Browser PDF Suite',
        desc: 'Powered by client-side WebAssembly, our PDF utilities merge, split, compress, OCR, and convert documents directly on your device—ensuring strict GDPR, HIPAA, and corporate NDA compliance.',
      },
      {
        title: 'Studio-Grade Image & Media Processing',
        desc: 'Convert between WebP, PNG, JPG, SVG, and HEIC; strip EXIF metadata; compress visual assets for Core Web Vitals; and extract color palettes with zero upload wait times.',
      },
      {
        title: 'Peer-Reviewed Financial & Health Calculators',
        desc: 'Model compound interest, APR vs. nominal rates, retirement withdrawals, and loan amortization alongside clinical BMI, BMR, TDEE, and macronutrient equations backed by published literature.',
      },
    ],
    editorialHeading: 'Editorial Verification Board & Quality Standards',
    editorialIntro:
      'Because financial and health calculators impact real-world decisions (YMYL), every calculator formula, worked example, and technical guide undergoes a structured three-stage verification protocol led by domain specialists:',
    reviewers: [
      {
        name: 'Marcus Vance, CFA',
        role: 'Quantitative Financial Analyst',
        scope: 'Audits mortgage amortization, APR/Truth-in-Lending (Reg Z) compounding, tax, retirement, and capital-budgeting models.',
      },
      {
        name: 'Dr. Elena Rostova, MD',
        role: 'Clinical Biometrics & Physiology Reviewer',
        scope: 'Verifies metabolic (Mifflin-St Jeor, Harris-Benedict), body-composition, cardiovascular, and nutritional screening formulas against WHO and NIH publications.',
      },
      {
        name: 'Dr. Aris Thorne, PhD',
        role: 'Applied Mathematics & Systems Engineering',
        scope: 'Validates statistical distributions, algebraic solvers, physical unit conversions, and IEEE 754 floating-point boundary handling.',
      },
    ],
    developerHeading: 'Founder & Lead Systems Architect',
    developerSub: 'The engineering leadership behind Nexus Calculator.',
    developerRole: 'Full-Stack Web Architect & Founder',
    developerBio:
      'Specializing in high-performance web applications, quantitative simulation engines, scalable cloud architecture, and accessible UI/UX engineering for global users.',
    contactHeading: 'Direct Contact & Headquarters',
    emailLabel: 'Official Support & Editorial Email',
    phoneLabel: 'Direct Telephone',
    officeLabel: 'Registered Office Address',
    portfolioLabel: 'Lead Architect Portfolio',
    portfolioCta: 'View Official Portfolio',
    evolveHeading: 'Continuous Mathematical & Engineering Evolution',
    evolveBody:
      'We continuously audit our equations, expand our localized documentation, and build new browser-native utilities based on feedback from educators, engineers, and analysts worldwide.',
    evolveCta: 'Contact Our Editorial & Engineering Team',
  },
  es: {
    title: 'Sobre Nosotros — Plataforma Global de Calculadoras y Herramientas',
    description: 'Conozca la arquitectura técnica, el consejo de verificación editorial y la misión detrás de Nexus Calculator.',
    home: 'Inicio',
    crumb: 'Sobre Nosotros',
    h1: 'Impulsando sus Decisiones con Precisión Matemática',
    subtitle:
      'Nexus Calculator es una plataforma internacional de ingeniería cuantitativa diseñada para ofrecer calculadoras financieras, clínicas y científicas verificadas por expertos, junto con herramientas locales para desarrolladores, PDF e imagen.',
    visionHeading: 'Nuestra Visión y Filosofía de Ingeniería',
    visionP1:
      'Lo que comenzó como un repositorio especializado de calculadoras matemáticas de alta precisión ha evolucionado hasta convertirse en un ecosistema integral multilingüe. En un entorno digital impulsado por datos, tanto profesionales como estudiantes y familias necesitan herramientas cuantitativas fiables que se ejecuten al instante sin comprometer su privacidad.',
    visionP2:
      'Ya sea que esté proyectando cuadros de amortización hipotecaria, evaluando indicadores biométricos de composición corporal, formateando esquemas JSON de producción o procesando documentos PDF confidenciales, la exactitud y la transparencia son indispensables. Cada calculadora combina un motor interactivo con su fórmula matemática explícita, tablas de parámetros calibrados y guías paso a paso.',
    visionP3:
      'A diferencia de los portales tradicionales saturados de colas en servidores externos y rastreadores invasivos, Nexus Calculator opera sobre una arquitectura moderna en el borde (Edge) y WebAssembly en el navegador, brindando resultados instantáneos en español, inglés, francés y alemán.',
    standOutHeading: 'Pilares Arquitectónicos Fundamentales',
    pillars: [
      {
        title: 'Precisión IEEE 754 de Doble Coma Flotante',
        desc: 'Nuestro motor numérico elimina los errores por redondeo intermedio prematuro y valida los dominios matemáticos en tiempo real antes de presentar el resultado principal y las tablas de sensibilidad.',
      },
      {
        title: 'Más de 330 Calculadoras y Utilidades Modulares',
        desc: 'Cubrimos finanzas cuantitativas, biometría clínica, matemáticas aplicadas, criptografía, flujos documentales PDF y procesamiento de imágenes en una interfaz unificada.',
      },
      {
        title: 'Localización Multilingüe Nativa',
        desc: 'Soporte nativo completo en español, inglés, francés y alemán, adaptando terminología técnica, avisos normativos, divisas y sistemas de unidades métrico e imperial.',
      },
      {
        title: 'Privacidad 100 % Local en el Navegador',
        desc: 'Todos los datos financieros, biométricos, fragmentos de código y archivos se procesan exclusivamente en la memoria RAM local de su navegador. Nunca almacenamos sus cálculos en servidores externos.',
      },
    ],
    ecosystemHeading: 'Un Ecosistema Completo de Utilidades Digitales y Cuantitativas',
    ecosystemIntro:
      'Desarrollamos suites de herramientas especializadas para el flujo de trabajo diario de analistas financieros, ingenieros de software, profesionales sanitarios, diseñadores y estudiantes:',
    ecosystemCards: [
      {
        title: 'Herramientas Avanzadas para Desarrolladores y Seguridad',
        desc: 'Formatee y valide JSON, SQL, XML y YAML; decodifique tokens JWT; genere hashes SHA-256 y HMAC; y pruebe expresiones regulares 100 % localmente sin exponer código confidencial.',
      },
      {
        title: 'Suite PDF Privada en el Navegador',
        desc: 'Mediante WebAssembly local, nuestras herramientas permiten unir, dividir, comprimir, aplicar OCR y convertir archivos PDF directamente en su dispositivo, cumpliendo con el RGPD/GDPR.',
      },
      {
        title: 'Procesamiento Profesional de Imágenes',
        desc: 'Convierta entre WebP, PNG, JPG, SVG y HEIC; elimine metadatos EXIF; comprima gráficos web y extraiga paletas de colores sin tiempos de espera de subida.',
      },
      {
        title: 'Calculadoras Financieras y de Salud Verificadas',
        desc: 'Simule interés compuesto, TAE/APR, planes de jubilación y amortización de préstamos junto con ecuaciones clínicas de IMC, tasa metabólica basal (BMR) y macronutrientes.',
      },
    ],
    editorialHeading: 'Consejo de Verificación Editorial y Estándares de Calidad',
    editorialIntro:
      'Dado que las herramientas financieras y de salud influyen en decisiones importantes (YMYL), cada fórmula, ejemplo práctico y guía técnica supera un protocolo de revisión por especialistas:',
    reviewers: [
      {
        name: 'Marcus Vance, CFA',
        role: 'Analista Financiero Cuantitativo',
        scope: 'Audita modelos de amortización hipotecaria, capitalización compuesta, cálculo de TAE/APR, fiscalidad, jubilación y evaluación de inversiones.',
      },
      {
        name: 'Dra. Elena Rostova, MD',
        role: 'Revisora de Biometría Clínica y Fisiología',
        scope: 'Verifica ecuaciones metabólicas (Mifflin-St Jeor, Harris-Benedict), composición corporal e indicadores nutricionales según publicaciones de la OMS y el NIH.',
      },
      {
        name: 'Dr. Aris Thorne, PhD',
        role: 'Matemáticas Aplicadas e Ingeniería de Sistemas',
        scope: 'Valida distribuciones estadísticas, resolutores algebraicos, conversiones dimensionales y precisión numérica IEEE 754.',
      },
    ],
    developerHeading: 'Fundador y Arquitecto Principal de Sistemas',
    developerSub: 'El liderazgo de ingeniería detrás de Nexus Calculator.',
    developerRole: 'Arquitecto Web Full-Stack y Fundador',
    developerBio:
      'Especializado en aplicaciones web de alto rendimiento, motores de simulación cuantitativa, arquitectura en la nube escalable y diseño de interfaces accesibles.',
    contactHeading: 'Contacto Directo y Sede Central',
    emailLabel: 'Correo Oficial de Soporte y Redacción',
    phoneLabel: 'Teléfono Directo',
    officeLabel: 'Dirección de Oficina Registrada',
    portfolioLabel: 'Portafolio del Arquitecto Principal',
    portfolioCta: 'Ver Portafolio Oficial',
    evolveHeading: 'Evolución Matemática y Tecnológica Continua',
    evolveBody:
      'Auditamos continuamente nuestras ecuaciones, ampliamos nuestra documentación técnica y desarrollamos nuevas utilidades basadas en las sugerencias de nuestra comunidad global.',
    evolveCta: 'Contactar con Nuestro Equipo Editorial y Técnico',
  },
  fr: {
    title: 'À Propos de Nous — Plateforme Mondiale de Calculatrices et Outils',
    description: 'Découvrez l’architecture technique, le comité de vérification éditoriale et la mission de Nexus Calculator.',
    home: 'Accueil',
    crumb: 'À Propos',
    h1: 'Éclairer Vos Décisions avec une Précision Mathématique',
    subtitle:
      'Nexus Calculator est une plateforme internationale d’ingénierie quantitative conçue pour offrir des calculatrices financières, cliniques et scientifiques vérifiées ainsi que des outils développeur, PDF et image exécutés 100 % localement.',
    visionHeading: 'Notre Vision et Philosophie d’Ingénierie',
    visionP1:
      'Ce qui a commencé comme un répertoire spécialisé de calculatrices mathématiques de haute précision s’est transformé en un écosystème complet et multilingue. Dans un monde guidé par la donnée, les professionnels, étudiants et particuliers ont besoin d’outils quantitatifs fiables, instantanés et respectueux de la vie privée.',
    visionP2:
      'Que vous simuliez un tableau d’amortissement immobilier, évaluiez des indicateurs biométriques, formatiez du code JSON de production ou traitiez des documents PDF confidentiels, la rigueur mathématique et la transparence sont essentielles. Chaque calculatrice associe un moteur interactif à sa formule explicite, ses plages de calibration et sa méthodologie détaillée.',
    visionP3:
      'Contrairement aux portails classiques ralentis par des files d’attente serveur et des traceurs publicitaires intrusifs, Nexus Calculator repose sur une architecture Edge moderne et WebAssembly côté client, garantissant une exécution instantanée en français, anglais, espagnol et allemand.',
    standOutHeading: 'Nos Piliers Architecturaux',
    pillars: [
      {
        title: 'Précision Double Virgule Flottante IEEE 754',
        desc: 'Nos algorithmes éliminent les erreurs d’arrondi intermédiaire et valident les domaines mathématiques en temps réel avant de générer les résultats principaux et les tableaux de sensibilité.',
      },
      {
        title: 'Plus de 330 Calculatrices et Outils Modulaires',
        desc: 'Couvrant la finance quantitative, la biométrie clinique, les mathématiques appliquées, la cryptographie, la gestion PDF et le traitement d’image au sein d’une interface unifiée.',
      },
      {
        title: 'Localisation Multilingue Native',
        desc: 'Prise en charge native complète en français, anglais, espagnol et allemand, adaptée aux conventions monétaires, réglementaires et aux systèmes d’unités métrique et impérial.',
      },
      {
        title: 'Confidentialité 100 % Locale (Sandbox Navigateur)',
        desc: 'Toutes vos saisies financières, paramètres biométriques, extraits de code et fichiers sont traités exclusivement dans la mémoire vive locale de votre navigateur (conformité RGPD).',
      },
    ],
    ecosystemHeading: 'Un Écosystème Complet d’Utilitaires Numériques et Quantitatifs',
    ecosystemIntro:
      'Nous concevons des suites d’outils spécialisés adaptés aux besoins quotidiens des analystes financiers, développeurs, professionnels de santé, designers et étudiants :',
    ecosystemCards: [
      {
        title: 'Outils Développeur et Sécurité Avancés',
        desc: 'Formatez et validez JSON, SQL, XML et YAML ; décodez des jetons JWT ; calculez des empreintes SHA-256 et HMAC ; et testez vos expressions régulières 100 % en local.',
      },
      {
        title: 'Suite PDF Privée dans le Navigateur',
        desc: 'Grâce à WebAssembly côté client, fusionnez, divisez, compressez, appliquez l’OCR et convertissez vos fichiers PDF directement sur votre appareil sans aucun envoi sur serveur.',
      },
      {
        title: 'Traitement d’Image de Qualité Studio',
        desc: 'Convertissez vos images (WebP, PNG, JPG, SVG, HEIC), supprimez les métadonnées EXIF, optimisez vos visuels pour les Core Web Vitals et extrayez des palettes de couleurs instantanément.',
      },
      {
        title: 'Calculatrices Financières et Santé Vérifiées',
        desc: 'Modélisez les intérêts composés, le TAEG/APR, l’épargne retraite et l’amortissement de prêt ainsi que les formules cliniques d’IMC, de métabolisme basal (BMR) et de macronutriments.',
      },
    ],
    editorialHeading: 'Comité de Vérification Éditoriale et Normes de Qualité',
    editorialIntro:
      'Parce que les outils financiers et médicaux touchent à des décisions critiques (YMYL), chaque formule, exemple chiffré et guide pédagogique est soumis à un protocole strict de validation par nos experts :',
    reviewers: [
      {
        name: 'Marcus Vance, CFA',
        role: 'Analyste Financier Quantitatif',
        scope: 'Supervise les modèles d’amortissement hypothécaire, de capitalisation composée, de TAEG/APR, de fiscalité et de planification retraite.',
      },
      {
        name: 'Dr Elena Rostova, MD',
        role: 'Référente Biométrie Clinique et Physiologie',
        scope: 'Vérifie les équations métaboliques (Mifflin-St Jeor, Harris-Benedict), de composition corporelle et de nutrition selon les publications de l’OMS et du NIH.',
      },
      {
        name: 'Dr Aris Thorne, PhD',
        role: 'Mathématiques Appliquées et Ingénierie des Systèmes',
        scope: 'Valide les distributions statistiques, les solveurs algébriques, les conversions d’unités physiques et la précision numérique IEEE 754.',
      },
    ],
    developerHeading: 'Fondateur et Architecte Principal des Systèmes',
    developerSub: 'La direction technique derrière Nexus Calculator.',
    developerRole: 'Architecte Web Full-Stack & Fondateur',
    developerBio:
      'Spécialisé dans les applications web haute performance, les moteurs de simulation quantitative, l’architecture cloud évolutive et le design d’interfaces accessibles.',
    contactHeading: 'Contact Direct et Siège Social',
    emailLabel: 'E-mail Officiel du Support et de la Rédaction',
    phoneLabel: 'Téléphone Direct',
    officeLabel: 'Adresse du Siège Enregistré',
    portfolioLabel: 'Portfolio de l’Architecte Principal',
    portfolioCta: 'Consulter le Portfolio Officiel',
    evolveHeading: 'Évolution Mathématique et Technique Continue',
    evolveBody:
      'Nous vérifions continuellement nos équations, enrichissons nos guides multilingues et développons de nouveaux outils locaux en fonction des retours de notre communauté mondiale.',
    evolveCta: 'Contacter Notre Équipe Éditoriale et Technique',
  },
  de: {
    title: 'Über Uns — Globale Plattform für Rechner & Entwickler-Tools',
    description: 'Erfahren Sie mehr über die technische Architektur, das redaktionelle Prüfgremium und die Mission hinter Nexus Calculator.',
    home: 'Startseite',
    crumb: 'Über Uns',
    h1: 'Präzise Berechnungen für Fundierte Entscheidungen',
    subtitle:
      'Nexus Calculator ist eine internationale Plattform für quantitative Analysen, die fachlich geprüfte Finanz-, Gesundheits- und Wissenschaftsrechner mit 100 % lokalen Entwickler-, PDF- und Bild-Werkzeugen vereint.',
    visionHeading: 'Unsere Vision & Engineering-Philosophie',
    visionP1:
      'Was als spezialisierte Sammlung hochpräziser mathematischer Online-Rechner begann, hat sich zu einem umfassenden mehrsprachigen Werkzeug-Ökosystem entwickelt. In einer datengetriebenen Welt benötigen Fachkräfte, Studierende und Privatanwender verlässliche Analysewerkzeuge, die verzögerungsfrei und datenschutzkonform arbeiten.',
    visionP2:
      'Ganz gleich, ob Sie Tilgungspläne für Immobilienkredite berechnen, biometrische Körperdaten analysieren, produktive JSON-Schemata formatieren oder vertrauliche PDF-Dokumente bearbeiten: Mathematische Präzision und Transparenz stehen an erster Stelle. Jeder Rechner dokumentiert seine zugrunde liegende Formel, kalibrierte Referenzwerte und ein nachvollziehbares Prüfprotokoll.',
    visionP3:
      'Im Gegensatz zu klassischen Webportalen mit langsamen Server-Warteschlangen und invasivem Tracking nutzt Nexus Calculator eine moderne Edge-Architektur sowie clientseitiges WebAssembly – für Echtzeit-Ergebnisse auf Deutsch, Englisch, Spanisch und Französisch.',
    standOutHeading: 'Unsere Technischen Grundpfeiler',
    pillars: [
      {
        title: 'Doppelt genaue IEEE-754-Arithmetik',
        desc: 'Unsere Berechnungs-Engines verhindern vorzeitige Rundungsfehler in Zwischenschritten und prüfen Wertebereiche in Echtzeit, bevor Hauptergebnisse und Sensitivitätstabellen ausgegeben werden.',
      },
      {
        title: 'Über 330 Modulare Rechner & Werkzeuge',
        desc: 'Von quantitativer Finanzmathematik, klinischer Biometrie und Statistik bis hin zu Kryptografie, PDF-Bearbeitung und Bildkonvertierung unter einer einheitlichen Oberfläche.',
      },
      {
        title: 'Native Mehrsprachige Lokalisierung',
        desc: 'Vollständige Unterstützung für Deutsch, Englisch, Spanisch und Französisch – inklusive angepasster Fachbegriffe, rechtlicher Hinweise, Währungen sowie metrischer und imperialer Maßeinheiten.',
      },
      {
        title: '100 % Lokaler Datenschutz im Browser',
        desc: 'Sämtliche Finanzdaten, biometrischen Angaben, Quellcodes und Dateien werden ausschließlich lokal im Arbeitsspeicher Ihres Browsers verarbeitet (DSGVO-konform, kein Server-Upload).',
      },
    ],
    ecosystemHeading: 'Ein Ganzheitliches Ökosystem Digitaler und Quantitativer Werkzeuge',
    ecosystemIntro:
      'Wir entwickeln spezialisierte Werkzeug-Suiten für die täglichen Arbeitsprozesse von Finanzanalysten, Softwareentwicklern, Medizinpädagogen, Designern und Studierenden weltweit:',
    ecosystemCards: [
      {
        title: 'Professionelle Entwickler- & Sicherheits-Tools',
        desc: 'Formatieren und validieren Sie JSON, SQL, XML und YAML; dekodieren Sie JWT-Tokens; erzeugen Sie SHA-256- und HMAC-Hashes; und testen Sie reguläre Ausdrücke zu 100 % lokal im Browser.',
      },
      {
        title: 'Datenschutzkonforme Browser-PDF-Suite',
        desc: 'Dank clientseitigem WebAssembly lassen sich PDFs direkt auf Ihrem Endgerät zusammenfügen, teilen, komprimieren, per OCR durchsuchen und konvertieren – ohne Cloud-Upload.',
      },
      {
        title: 'Studio-Bildbearbeitung & Medienkonvertierung',
        desc: 'Konvertieren Sie zwischen WebP, PNG, JPG, SVG und HEIC, entfernen Sie EXIF-Metadaten, optimieren Sie Bilder für Core Web Vitals und extrahieren Sie Farbpaletten in Echtzeit.',
      },
      {
        title: 'Fachlich Geprüfte Finanz- & Gesundheitsrechner',
        desc: 'Simulieren Sie Zinseszins, Effektivzins vs. Nominalzins, Altersvorsorge und Kredittilgung sowie klinische Formeln für BMI, Grundumsatz (BMR), Kalorienbedarf und Makronährstoffe.',
      },
    ],
    editorialHeading: 'Redaktionelles Prüfgremium & Qualitätsstandards',
    editorialIntro:
      'Da Finanz- und Gesundheitsrechner weitreichende Lebensentscheidungen betreffen (YMYL), durchläuft jede Berechnungsformel, jedes Praxisbeispiel und jeder Ratgeber einen mehrstufigen Prüfprozess durch Fachexperten:',
    reviewers: [
      {
        name: 'Marcus Vance, CFA',
        role: 'Quantitativer Finanzanalyst',
        scope: 'Prüft Hypothekentilgungs-, Zinseszins-, Effektivzins-, Steuer-, Ruhestands- und Investitionsrechnungsmodelle.',
      },
      {
        name: 'Dr. med. Elena Rostova',
        role: 'Klinische Biometrie & Physiologie',
        scope: 'Validiert Stoffwechsel- (Mifflin-St Jeor, Harris-Benedict), Körperzusammensetzungs- und Ernährungsformeln anhand publizierter WHO- und NIH-Leitlinien.',
      },
      {
        name: 'Dr. Aris Thorne, PhD',
        role: 'Angewandte Mathematik & Systemtechnik',
        scope: 'Überprüft statistische Verteilungen, Gleichungslöser, physikalische Einheitenumrechnungen und die numerische Stabilität nach IEEE 754.',
      },
    ],
    developerHeading: 'Gründer & Leitender Systemarchitekt',
    developerSub: 'Die technische Leitung hinter Nexus Calculator.',
    developerRole: 'Full-Stack Web-Architekt & Gründer',
    developerBio:
      'Spezialisiert auf hochperformante Webanwendungen, quantitative Simulations-Engines, skalierbare Cloud-Architekturen und barrierefreies UI/UX-Engineering.',
    contactHeading: 'Direkter Kontakt & Unternehmenssitz',
    emailLabel: 'Offizielle Support- & Redaktions-E-Mail',
    phoneLabel: 'Telefonnummer',
    officeLabel: 'Registrierte Geschäftsadresse',
    portfolioLabel: 'Portfolio des Leitenden Architekten',
    portfolioCta: 'Offizielles Portfolio Öffnen',
    evolveHeading: 'Kontinuierliche Mathematische & Technische Weiterentwicklung',
    evolveBody:
      'Wir überprüfen laufend unsere Berechnungsmodelle, erweitern unsere mehrsprachige Fachdokumentation und entwickeln neue Browser-Werkzeuge auf Basis des Feedbacks unserer weltweiten Nutzer.',
    evolveCta: 'Redaktions- & Technikteam Kontaktieren',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  const c = copyByLocale[locale] || copyByLocale.en;

  return {
    title: c.title,
    description: c.description,
    alternates: getCanonicalAndAlternates('/about-us', locale),
    openGraph: {
      type: 'website',
      title: c.title,
      description: c.description,
      siteName: 'Nexus Calculator',
    },
  };
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const c = copyByLocale[locale] || copyByLocale.en;

  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net').replace(/\/$/, '');
  const { getCanonicalUrl } = await import('@/lib/utils/seoUtils');
  const canonicalUrl = getCanonicalUrl('/about-us', locale);

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: c.title,
    description: c.description,
    url: canonicalUrl,
    inLanguage: locale,
    mainEntity: {
      '@type': 'Organization',
      name: 'NexusCalculator',
      url: baseUrl,
      logo: `${baseUrl}/icons/icon-512x512.png`,
      founder: {
        '@type': 'Person',
        name: 'MD Abu Hanif Mia',
        jobTitle: c.developerRole,
        url: 'https://abu-hanif-mia.vercel.app',
        sameAs: [
          'https://www.linkedin.com/in/md-abu-hanif-mia',
          'https://github.com/abuhanif254',
        ],
      },
      member: c.reviewers.map((rev) => ({
        '@type': 'Person',
        name: rev.name,
        jobTitle: rev.role,
        description: rev.scope,
      })),
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@nexuscalculator.net',
        telephone: '+8801724010261',
        contactType: 'customer support',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: c.home, item: getCanonicalUrl('/', locale) },
      { '@type': 'ListItem', position: 2, name: c.crumb, item: canonicalUrl },
    ],
  };

  const pillarIcons = [
    <Zap key="zap" size={28} />,
    <Calculator key="calc" size={28} />,
    <Globe key="globe" size={28} />,
    <ShieldCheck key="shield" size={28} />,
  ];
  const pillarColors = [
    'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
    'bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400',
    'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400',
    'bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400',
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <CustomLink href="/" className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors">{c.home}</CustomLink>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-300 font-medium">{c.crumb}</span>
      </div>

      <header className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">{c.h1}</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {c.subtitle}
        </p>
      </header>

      <div className="space-y-16">
        {/* Concept & Vision */}
        <section className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-4">{c.visionHeading}</h2>
          <p>{c.visionP1}</p>
          <p>{c.visionP2}</p>
          <p>{c.visionP3}</p>
        </section>

        {/* Core Pillars */}
        <section>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 border-b dark:border-slate-700 pb-4">{c.standOutHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.pillars.map((pillar, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`${pillarColors[idx % pillarColors.length]} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comprehensive Tool Ecosystem */}
        <section className="prose prose-slate dark:prose-invert prose-lg max-w-none mt-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-4">{c.ecosystemHeading}</h2>
          <p>{c.ecosystemIntro}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none pl-0 mt-8">
            {c.ecosystemCards.map((card, idx) => (
              <li key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <strong className="text-xl text-slate-900 dark:text-white flex items-center mb-2">{card.title}</strong>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 m-0">{card.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Editorial Verification Board (E-E-A-T & YMYL Authority) */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b dark:border-slate-700 pb-4">
            {c.editorialHeading}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
            {c.editorialIntro}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.reviewers.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844]">
                    <Award size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{rev.name}</h3>
                    <span className="text-xs font-semibold text-[#518231] dark:text-[#6fa844]">{rev.role}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{rev.scope}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Developer Identity */}
        <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden mt-16">
          <div className="bg-slate-800 text-white p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-2">{c.developerHeading}</h2>
            <p className="text-slate-300">{c.developerSub}</p>
          </div>

          <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-full lg:w-1/3 flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 relative">
                <Image
                  src="https://ik.imagekit.io/ubwpdqyav/my_photo-removebg-preview.png?updatedAt=1776774813574"
                  alt="MD Abu Hanif Mia"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">MD Abu Hanif Mia</h3>
              <p className="text-[#518231] font-medium mt-1 mb-4">{c.developerRole}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {c.developerBio}
              </p>

              <div className="flex gap-4 justify-center">
                <a href="https://www.linkedin.com/in/md-abu-hanif-mia" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/abuhanif254" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.facebook.com/bitulla" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/bitullah_aj" target="_blank" rel="noopener noreferrer" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 border-b dark:border-slate-700 pb-2">{c.contactHeading}</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{c.emailLabel}</span>
                    <a href="mailto:support@nexuscalculator.net" className="text-lg text-slate-800 dark:text-slate-200 hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors font-medium">support[at]nexuscalculator.net</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{c.phoneLabel}</span>
                    <a href="tel:+8801724010261" className="text-lg text-slate-800 dark:text-slate-200 hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors font-medium">+8801724010261</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{c.officeLabel}</span>
                    <span className="text-lg text-slate-800 dark:text-slate-200 block">2300 Kishoreganj Sadar<br />Dhaka, Bangladesh</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#518231]/10 p-3 rounded-lg text-[#518231] mt-1">
                    <LinkIcon size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{c.portfolioLabel}</span>
                    <a href="https://abu-hanif-mia.vercel.app" target="_blank" rel="noopener noreferrer" className="text-lg text-[#518231] dark:text-[#6fa844] hover:underline font-medium">{c.portfolioCta}</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="prose prose-slate dark:prose-invert prose-lg max-w-none text-center bg-slate-50 dark:bg-slate-800/50 p-10 rounded-3xl border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">{c.evolveHeading}</h2>
          <p className="mb-6">
            {c.evolveBody}
          </p>
          <a href="mailto:support@nexuscalculator.net" className="inline-flex items-center justify-center bg-[#518231] hover:bg-[#436a28] text-white font-medium py-3 px-8 rounded-xl transition-colors no-underline">
            {c.evolveCta}
          </a>
        </section>
      </div>
    </main>
  );
}


