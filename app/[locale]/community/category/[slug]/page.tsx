import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft, MessageSquarePlus } from 'lucide-react';
import { queryPostsRest } from '@/lib/firebase-rest';
import { COMMUNITY_CATEGORIES, getCategoryMeta } from '@/lib/categories';
import CommunityFeed, { Post } from '../../CommunityFeed';

export const revalidate = 86400; // Revalidate every 24 hours to conserve Vercel ISR limits
export const dynamicParams = false;

// Generate static params for all known categories
export async function generateStaticParams() {
  return COMMUNITY_CATEGORIES.map(c => ({ slug: c.slug }));
}

interface CategoryEnrichment {
  label: string;
  subtitle: string;
  overview: string[];
  keyTopics: string[];
  featuredTools: { title: string; href: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const LOCALIZED_CATEGORY_LABELS: Record<string, Record<string, string>> = {
  en: {
    'image-tools': 'Image Tools',
    'pdf-tools': 'PDF Tools',
    finance: 'Finance',
    'web-dev': 'Web Dev',
    calculators: 'Calculators',
    general: 'General',
    'feature-request': 'Feature Request',
    'bug-report': 'Bug Report',
  },
  es: {
    'image-tools': 'Herramientas de Imagen',
    'pdf-tools': 'Herramientas PDF',
    finance: 'Finanzas',
    'web-dev': 'Desarrollo Web',
    calculators: 'Calculadoras',
    general: 'General',
    'feature-request': 'Solicitud de Funciones',
    'bug-report': 'Reporte de Errores',
  },
  fr: {
    'image-tools': 'Outils Image',
    'pdf-tools': 'Outils PDF',
    finance: 'Finance',
    'web-dev': 'Développement Web',
    calculators: 'Calculatrices',
    general: 'Général',
    'feature-request': 'Idées & Suggestions',
    'bug-report': 'Signalement de Bugs',
  },
  de: {
    'image-tools': 'Bild-Werkzeuge',
    'pdf-tools': 'PDF-Werkzeuge',
    finance: 'Finanzen',
    'web-dev': 'Webentwicklung',
    calculators: 'Rechner',
    general: 'Allgemein',
    'feature-request': 'Funktionswünsche',
    'bug-report': 'Fehlermeldungen',
  },
};

const UI_STRINGS: Record<
  string,
  {
    metaTitle: (emoji: string, label: string) => string;
    metaDesc: (subtitle: string, label: string) => string;
    allChannels: string;
    hubTitle: (label: string) => string;
    discussionsCount: (n: number) => string;
    newDiscussion: string;
    emptyTitle: (label: string) => string;
    emptyDesc: (label: string) => string;
    startDiscussion: string;
    aboutChannel: (label: string) => string;
    coreTopics: string;
    faqHeading: (label: string) => string;
    featuredUtilities: (label: string) => string;
  }
> = {
  en: {
    metaTitle: (emoji, label) => `${emoji} ${label} Discussions & Resource Hub — Community | NexusCalculator`,
    metaDesc: (subtitle, label) => `${subtitle} Browse ${label} community discussions, technical guides, and curated browser tools on NexusCalculator.`,
    allChannels: 'All Channels',
    hubTitle: (label) => `${label} Community & Resource Hub`,
    discussionsCount: (n) => `${n} discussion${n !== 1 ? 's' : ''}`,
    newDiscussion: 'New Discussion',
    emptyTitle: (label) => `Start the First ${label} Discussion`,
    emptyDesc: (label) => `Have a technical question, workflow tip, or formula scenario related to ${label}? Share it with the NexusCalculator engineering and analyst community.`,
    startDiscussion: 'Start a Discussion',
    aboutChannel: (label) => `About the ${label} Channel`,
    coreTopics: 'Core Discussion Topics & Engineering Themes',
    faqHeading: (label) => `Frequently Asked Questions — ${label}`,
    featuredUtilities: (label) => `Featured ${label} Utilities`,
  },
  es: {
    metaTitle: (emoji, label) => `${emoji} Comunidad y Recursos de ${label} | NexusCalculator`,
    metaDesc: (subtitle, label) => `${subtitle} Explore debates técnicos de ${label}, guías prácticas y herramientas locales en el navegador en NexusCalculator.`,
    allChannels: 'Todos los Canales',
    hubTitle: (label) => `Comunidad y Centro de Recursos de ${label}`,
    discussionsCount: (n) => `${n} debate${n !== 1 ? 's' : ''}`,
    newDiscussion: 'Nuevo Debate',
    emptyTitle: (label) => `Inicie el Primer Debate sobre ${label}`,
    emptyDesc: (label) => `¿Tiene alguna consulta técnica, flujo de trabajo o caso práctico relacionado con ${label}? Compártalo con la comunidad de ingeniería y análisis de NexusCalculator.`,
    startDiscussion: 'Iniciar un Debate',
    aboutChannel: (label) => `Sobre el Canal de ${label}`,
    coreTopics: 'Temas Principales de Debate e Ingeniería',
    faqHeading: (label) => `Preguntas Frecuentes — ${label}`,
    featuredUtilities: (label) => `Herramientas Destacadas de ${label}`,
  },
  fr: {
    metaTitle: (emoji, label) => `${emoji} Communauté & Ressources ${label} | NexusCalculator`,
    metaDesc: (subtitle, label) => `${subtitle} Consultez les discussions techniques ${label}, les guides pratiques et les outils locaux sur NexusCalculator.`,
    allChannels: 'Tous les Canaux',
    hubTitle: (label) => `Communauté & Centre de Ressources ${label}`,
    discussionsCount: (n) => `${n} discussion${n !== 1 ? 's' : ''}`,
    newDiscussion: 'Nouvelle Discussion',
    emptyTitle: (label) => `Lancez la Première Discussion ${label}`,
    emptyDesc: (label) => `Vous avez une question technique, une astuce d’optimisation ou un cas concret lié à ${label} ? Partagez-le avec la communauté d’ingénieurs et d’analystes de NexusCalculator.`,
    startDiscussion: 'Démarrer une Discussion',
    aboutChannel: (label) => `À Propos du Canal ${label}`,
    coreTopics: 'Thématiques Techniques & Sujets d’Ingénierie',
    faqHeading: (label) => `Questions Fréquentes — ${label}`,
    featuredUtilities: (label) => `Outils & Calculatrices ${label} Recommandés`,
  },
  de: {
    metaTitle: (emoji, label) => `${emoji} ${label} Community & Ressourcen-Hub | NexusCalculator`,
    metaDesc: (subtitle, label) => `${subtitle} Entdecken Sie Fachdiskussionen zu ${label}, technische Ratgeber und lokale Browser-Werkzeuge auf NexusCalculator.`,
    allChannels: 'Alle Kanäle',
    hubTitle: (label) => `${label} Community & Ressourcen-Hub`,
    discussionsCount: (n) => `${n} Diskussion${n !== 1 ? 'en' : ''}`,
    newDiscussion: 'Neue Diskussion',
    emptyTitle: (label) => `Starten Sie die erste Diskussion zu ${label}`,
    emptyDesc: (label) => `Haben Sie eine Fachfrage, einen Workflow-Tipp oder ein Berechnungsszenario rund um ${label}? Teilen Sie Ihr Anliegen mit der NexusCalculator-Community.`,
    startDiscussion: 'Diskussion starten',
    aboutChannel: (label) => `Über den Kanal ${label}`,
    coreTopics: 'Zentrale Diskussionsthemen & Schwerpunkte',
    faqHeading: (label) => `Häufig gestellte Fragen — ${label}`,
    featuredUtilities: (label) => `Empfohlene Werkzeuge für ${label}`,
  },
};

function getLocalizedEnrichment(slug: string, locale: string): CategoryEnrichment {
  const label = LOCALIZED_CATEGORY_LABELS[locale]?.[slug] || LOCALIZED_CATEGORY_LABELS.en[slug] || slug;

  if (locale === 'fr') {
    const frMap: Record<string, Omit<CategoryEnrichment, 'label'>> = {
      'image-tools': {
        subtitle: 'Échangez sur la compression d’images côté client, la conversion WebP/AVIF, la confidentialité des métadonnées EXIF et le rendu HTML5 Canvas.',
        overview: [
          'Le canal Outils Image réunit les développeurs front-end, designers numériques, photographes et ingénieurs SEO qui optimisent leurs ressources visuelles pour les Core Web Vitals (LCP et CLS) et les flux de travail respectueux de la vie privée.',
          'Tous les utilitaires d’image NexusCalculator traitent les graphiques matriciels et vectoriels à 100 % localement dans votre navigateur via l’API HTML5 Canvas, les codecs WebAssembly et OffscreenCanvas — vos photographies haute résolution et maquettes confidentielles ne quittent jamais votre appareil.',
        ],
        keyTopics: [
          'Taux de compression avec ou sans perte entre les formats WebP, AVIF, PNG et JPEG',
          'Suppression des métadonnées EXIF sensibles (coordonnées GPS, numéro de série de l’appareil) avant publication',
          'Redimensionnement par lots, recadrage au ratio d’aspect exact et mise à l’échelle DPI pour l’impression et le web',
          'Conversion d’images matricielles en Data URI Base64 et tracés vectoriels SVG',
        ],
        featuredTools: [
          { title: 'Compresseur d’Images', href: '/tools/compress-image', desc: 'Réduisez le poids des fichiers JPEG, PNG et WebP jusqu’à 80 % localement dans votre navigateur.' },
          { title: 'Redimensionner une Image', href: '/tools/resize-image', desc: 'Ajustez les dimensions en pixels avec verrouillage du ratio et interpolation haute qualité.' },
          { title: 'Convertir en WebP', href: '/tools/convert-to-webp', desc: 'Transformez vos images PNG et JPG au format WebP de nouvelle génération.' },
          { title: 'Lecteur de Métadonnées EXIF', href: '/tools/image-metadata-viewer', desc: 'Inspectez et auditez les données d’appareil photo, d’objectif et de géolocalisation.' },
        ],
        faqs: [
          {
            q: 'Mes images sont-elles envoyées sur un serveur lors de l’utilisation des outils NexusCalculator ?',
            a: 'Non. Chaque outil d’image s’exécute intégralement dans votre navigateur grâce aux API natives Canvas et WebAssembly. Vos fichiers restent 100 % privés sur votre poste.',
          },
          {
            q: 'Quel format d’image offre le meilleur compromis entre qualité visuelle et performance SEO ?',
            a: 'Les formats WebP et AVIF réduisent la taille des fichiers de 25 % à 50 % par rapport aux formats JPEG et PNG équivalents tout en gérant la transparence.',
          },
        ],
      },
      'pdf-tools': {
        subtitle: 'Partagez vos méthodes pour fusionner, diviser, compresser, chiffrer et convertir des documents PDF localement dans le navigateur.',
        overview: [
          'Le canal Outils PDF est dédié à l’ingénierie documentaire, à la manipulation sécurisée de fichiers PDF côté client, à la reconnaissance optique de caractères (OCR) et à l’archivage numérique.',
          'Parce que les relevés bancaires, contrats juridiques et dossiers médicaux contiennent des données personnelles sensibles (PII), notre communauté privilégie le traitement PDF sans téléversement serveur propulsé par pdf-lib et PDF.js.',
        ],
        keyTopics: [
          'Fusion, découpage et réorganisation de liasses PDF multi-pages sans transfert vers le cloud',
          'Compression de fichiers PDF volumineux pour les pièces jointes d’e-mail et portails administratifs',
          'Protection par mot de passe AES, filigranes et numérotation des pages confidentielles',
          'Conversion bidirectionnelle entre PDF, Word, Excel, PowerPoint et images haute définition',
        ],
        featuredTools: [
          { title: 'PDF vers Excel', href: '/tools/pdf-to-excel', desc: 'Extrayez les tableaux de vos documents PDF vers des feuilles de calcul structurées.' },
          { title: 'OCR PDF', href: '/tools/pdf-ocr', desc: 'Reconnaissez et extrayez le texte des documents PDF numérisés localement.' },
          { title: 'HTML vers PDF', href: '/tools/html-to-pdf', desc: 'Convertissez vos pages web et modèles HTML en documents PDF prêts à imprimer.' },
          { title: 'Outils PDF Complets', href: '/pdf', desc: 'Accédez à la suite complète de fusion, découpage et compression PDF.' },
        ],
        faqs: [
          {
            q: 'Puis-je traiter des documents PDF juridiques ou financiers confidentiels en toute sécurité ?',
            a: 'Oui. Toutes les opérations PDF s’exécutent directement dans la mémoire vive de votre navigateur sans transmettre vos documents vers un serveur externe.',
          },
          {
            q: 'Comment réduire la taille d’un PDF scanné sans perdre la lisibilité du texte ?',
            a: 'Sous-échantillonnez les images intégrées à 150–200 DPI et compressez les flux matriciels tout en conservant les polices vectorielles intactes.',
          },
        ],
      },
      finance: {
        subtitle: 'Collaborez sur les tableaux d’amortissement hypothécaire, les projections d’intérêts composés, la fiscalité et la finance d’entreprise.',
        overview: [
          'Le canal Finance rassemble analystes financiers, acquéreurs immobiliers, comptables et épargnants autour de la modélisation quantitative et de la gestion patrimoniale.',
          'Les membres comparent des scénarios concrets de prêts à taux fixe ou variable, des stratégies de remboursement de dettes (avalanche vs boule de neige) et des calculs de rentabilité locative.',
        ],
        keyTopics: [
          'Tableaux d’amortissement immobilier, remboursements anticipés et seuil de rentabilité d’un rachat de crédit',
          'Intérêts composés, TCAC (CAGR), TRI (IRR), VAN (NPV) et planification de l’épargne retraite corrigée de l’inflation',
          'Comparaison TAEG (APR) vs rendement annuel effectif (APY) sur les crédits et placements',
          'Calculs de salaire brut/net, TVA, marges commerciales et rentabilité d’investissement',
        ],
        featuredTools: [
          { title: 'Calculatrice Hypothécaire', href: '/calculators/mortgage-calculator', desc: 'Simulez vos mensualités, taxes foncières, assurance et tableau d’amortissement complet.' },
          { title: 'Calculatrice d’Intérêts Composés', href: '/calculators/compound-interest-calculator', desc: 'Projetez la croissance de votre capital avec versements réguliers.' },
          { title: 'Calculatrice de Prêt', href: '/calculators/loan-calculator', desc: 'Calculez les échéances mensuelles, le coût total du crédit et la durée de remboursement.' },
          { title: 'Calculatrice de TRI (IRR)', href: '/calculators/irr-calculator', desc: 'Évaluez le taux de rentabilité interne et la valeur actuelle nette de vos flux.' },
        ],
        faqs: [
          {
            q: 'Quelle est la différence entre le taux nominal et le TAEG (APR) ?',
            a: 'Le taux nominal ne reflète que le coût de base du capital emprunté, tandis que le TAEG intègre les frais de dossier, l’assurance obligatoire et les frais annexes.',
          },
          {
            q: 'Comment les remboursements anticipés réduisent-ils la durée d’un prêt immobilier ?',
            a: 'Chaque versement supplémentaire réduit directement le capital restant dû, ce qui diminue les intérêts calculés sur toutes les échéances suivantes.',
          },
        ],
      },
      'web-dev': {
        subtitle: 'Discutez de performance web, débogage d’API REST, cryptographie, expressions régulières, architecture réseau CIDR et outils développeur.',
        overview: [
          'Le canal Développement Web est un espace technique destiné aux ingénieurs full-stack, architectes DevOps et spécialistes en cybersécurité.',
          'Les sujets couvrent le formatage JSON/YAML/SQL, l’inspection de jetons JWT, le hachage cryptographique (SHA-256, HMAC, bcrypt), le calcul de sous-réseaux IPv4/IPv6 et l’anonymisation de bases de données.',
        ],
        keyTopics: [
          'Formatage, validation et comparaison de charges utiles JSON, XML, YAML, SQL et code JS/CSS minifié',
          'Débogage de jetons d’authentification JWT, encodage Base64/URL et en-têtes de sécurité HTTP',
          'Dimensionnement de sous-réseaux CIDR IPv4/IPv6, segmentation VLAN et propagation DNS',
          'Détection de données personnelles (PII), masquage RGPD/HIPAA et génération d’identifiants UUID v4/v7',
        ],
        featuredTools: [
          { title: 'Formateur & Validateur JSON', href: '/tools/json-formatter', desc: 'Embellissez, minifiez et validez vos charges utiles JSON avec détection précise des erreurs.' },
          { title: 'Décodeur JWT', href: '/tools/jwt-decoder', desc: 'Inspectez localement les en-têtes, revendications (claims) et dates d’expiration JWT.' },
          { title: 'Calculatrice de Sous-Réseau', href: '/calculators/subnet-calculator', desc: 'Calculez les plages CIDR, adresses de diffusion et hôtes utilisables.' },
          { title: 'Générateur d’UUID', href: '/tools/uuid-generator', desc: 'Générez en masse des identifiants UUID cryptographiquement aléatoires.' },
        ],
        faqs: [
          {
            q: 'Est-il sûr de coller des jetons JWT ou des charges JSON de production dans les outils NexusCalculator ?',
            a: 'Oui. Tous nos outils de formatage, de décodage et de hachage s’exécutent à 100 % côté client dans votre navigateur, sans aucune transmission réseau.',
          },
          {
            q: 'Pourquoi privilégier UUID v7 plutôt qu’UUID v4 pour les clés primaires de base de données ?',
            a: 'UUID v7 intègre un préfixe horodaté Unix en millisecondes, offrant un tri séquentiel naturel qui réduit fortement la fragmentation des index B-tree dans PostgreSQL et MySQL.',
          },
        ],
      },
    };
    const fallbackFr: Omit<CategoryEnrichment, 'label'> = {
      subtitle: `Discussions techniques, formules vérifiées et échanges communautaires autour de la thématique ${label}.`,
      overview: [
        `Bienvenue dans le canal ${label} de la communauté NexusCalculator. Cet espace réunit ingénieurs, analystes financiers, étudiants et développeurs pour partager des cas pratiques et vérifier des modèles mathématiques.`,
        'Toutes les calculatrices et utilitaires associés à ce canal fonctionnent directement dans votre navigateur pour garantir rapidité, précision et confidentialité totale.',
      ],
      keyTopics: [
        'Vérification étape par étape des formules mathématiques, financières et scientifiques',
        'Bonnes pratiques de confidentialité locale dans le navigateur et flux de travail sans serveur',
        'Comparaison de scénarios réels, conventions d’arrondi et unités de mesure internationales',
        'Suggestions d’améliorations, nouveaux outils et retours d’expérience de la communauté',
      ],
      featuredTools: [
        { title: 'Annuaire des Calculatrices', href: '/calculators', desc: 'Parcourez plus de 300 calculatrices financières, médicales et scientifiques.' },
        { title: 'Outils Développeur & Web', href: '/tools', desc: 'Découvrez plus de 130 utilitaires exécutés localement dans votre navigateur.' },
        { title: 'Guides Techniques', href: '/guides', desc: 'Consultez nos tutoriels détaillés et démonstrations de formules.' },
        { title: 'Anonymiseur de Base de Données', href: '/tools/database-anonymizer', desc: 'Analysez et masquez les données personnelles (PII) conformément au RGPD.' },
      ],
      faqs: [
        {
          q: `Faut-il créer un compte pour utiliser les outils du canal ${label} ?`,
          a: 'Aucun compte n’est requis pour utiliser nos calculatrices et outils. Un compte gratuit n’est utile que si vous souhaitez publier ou voter dans le forum.',
        },
        {
          q: 'Comment les formules de NexusCalculator sont-elles validées ?',
          a: 'Chaque modèle est vérifié par rapport aux constantes NIST, à la littérature académique de référence et aux normes de précision flottante IEEE 754.',
        },
      ],
    };
    return { label, ...(frMap[slug] || fallbackFr) };
  }

  if (locale === 'es') {
    const esMap: Record<string, Omit<CategoryEnrichment, 'label'>> = {
      'image-tools': {
        subtitle: 'Debata sobre compresión de imágenes en el navegador, conversión WebP/AVIF, privacidad de metadatos EXIF y renderizado HTML5 Canvas.',
        overview: [
          'El canal de Herramientas de Imagen reúne a desarrolladores frontend, diseñadores digitales, fotógrafos y especialistas en SEO que optimizan recursos visuales para Core Web Vitals (LCP y CLS) y flujos de trabajo privados.',
          'Todas las utilidades de imagen de NexusCalculator procesan gráficos rasterizados y vectoriales al 100 % localmente en su navegador mediante la API HTML5 Canvas y WebAssembly; sus fotografías y diseños nunca salen de su dispositivo.',
        ],
        keyTopics: [
          'Ratios de compresión con y sin pérdida entre los formatos WebP, AVIF, PNG y JPEG',
          'Eliminación de metadatos EXIF sensibles (GPS y datos de cámara) antes de publicar fotografías',
          'Redimensionado por lotes, recorte de relación de aspecto y ajuste de DPI para impresión y diseño web',
          'Conversión de gráficos a cadenas Data URI en Base64 y trazados vectoriales SVG',
        ],
        featuredTools: [
          { title: 'Compresor de Imágenes', href: '/tools/compress-image', desc: 'Reduzca el tamaño de archivos JPEG, PNG y WebP hasta un 80 % localmente.' },
          { title: 'Redimensionar Imagen', href: '/tools/resize-image', desc: 'Escale dimensiones en píxeles manteniendo la proporción exacta.' },
          { title: 'Convertir a WebP', href: '/tools/convert-to-webp', desc: 'Transforme imágenes PNG y JPG al formato WebP de última generación.' },
          { title: 'Visor de Metadatos EXIF', href: '/tools/image-metadata-viewer', desc: 'Inspeccione metadatos de cámara, lente y geolocalización ocultos en fotos.' },
        ],
        faqs: [
          {
            q: '¿Se suben mis imágenes a algún servidor al usar las herramientas de NexusCalculator?',
            a: 'No. Cada herramienta de imagen se ejecuta íntegramente dentro de su navegador mediante APIs locales de Canvas y WebAssembly.',
          },
          {
            q: '¿Qué formato de imagen ofrece el mejor equilibrio entre calidad y velocidad SEO?',
            a: 'WebP y AVIF logran archivos entre un 25 % y un 50 % más ligeros que JPEG y PNG equivalentes manteniendo transparencia.',
          },
        ],
      },
    };
    const fallbackEs: Omit<CategoryEnrichment, 'label'> = {
      subtitle: `Debates técnicos, fórmulas verificadas y recursos prácticos sobre ${label} en la comunidad de NexusCalculator.`,
      overview: [
        `Bienvenido al canal de ${label} de NexusCalculator. Este espacio conecta a ingenieros, analistas financieros, estudiantes y desarrolladores para resolver escenarios reales y contrastar modelos matemáticos.`,
        'Todas las calculadoras y herramientas vinculadas a este canal se ejecutan al 100 % del lado del cliente en su navegador para garantizar máxima velocidad y privacidad.',
      ],
      keyTopics: [
        'Verificación paso a paso de ecuaciones matemáticas, financieras y científicas',
        'Flujos de trabajo privados en el navegador sin subida de archivos a servidores externos',
        'Comparativa de casos reales, criterios de redondeo y conversión de unidades internacionales',
        'Propuestas de mejora, nuevas calculadoras y resolución colaborativa de dudas',
      ],
      featuredTools: [
        { title: 'Directorio de Calculadoras', href: '/calculators', desc: 'Explore más de 300 calculadoras financieras, de salud, matemáticas y científicas.' },
        { title: 'Herramientas para Desarrolladores', href: '/tools', desc: 'Utilidades de código, texto, PDF e imagen ejecutadas localmente en su navegador.' },
        { title: 'Guías Técnicas', href: '/guides', desc: 'Tutoriales detallados y demostraciones de fórmulas paso a paso.' },
        { title: 'Anonimizador de Bases de Datos', href: '/tools/database-anonymizer', desc: 'Detección de PII y enmascaramiento de bases de datos compatible con RGPD.' },
      ],
      faqs: [
        {
          q: `¿Necesito registrarme para usar las herramientas del canal ${label}?`,
          a: 'No se requiere cuenta para utilizar ninguna calculadora ni herramienta. Solo necesita iniciar sesión si desea publicar en el foro.',
        },
        {
          q: '¿Cómo se verifican las fórmulas en NexusCalculator?',
          a: 'Cada calculadora se valida frente a constantes del NIST, bibliografía académica revisada por pares y estándares de precisión IEEE 754.',
        },
      ],
    };
    return { label, ...(esMap[slug] || fallbackEs) };
  }

  if (locale === 'de') {
    const deMap: Record<string, Omit<CategoryEnrichment, 'label'>> = {
      'image-tools': {
        subtitle: 'Diskutieren Sie über lokale Bildkomprimierung im Browser, WebP/AVIF-Konvertierung, EXIF-Datenschutz und HTML5-Canvas-Pipelines.',
        overview: [
          'Der Kanal Bild-Werkzeuge vernetzt Frontend-Entwickler, Grafikdesigner, Fotografen und SEO-Ingenieure, die visuelle Assets für Core Web Vitals (LCP & CLS) und datenschutzfreundliche Workflows optimieren.',
          'Sämtliche Bild-Werkzeuge auf NexusCalculator verarbeiten Raster- und Vektorgrafiken zu 100 % lokal in Ihrem Browser über die HTML5-Canvas-API und WebAssembly — Ihre hochauflösenden Fotos und Entwürfe verlassen niemals Ihr Gerät.',
        ],
        keyTopics: [
          'Verlustbehaftete vs. verlustfreie Komprimierungsraten bei WebP, AVIF, PNG und JPEG',
          'Entfernen sensibler GPS- und Kamera-EXIF-Metadaten vor der Online-Veröffentlichung',
          'Stapel-Skalierung, Seitenverhältnis-Zuschnitt und DPI-Anpassung für Druck und Webdesign',
          'Konvertierung von Rastergrafiken in Base64-Data-URIs und SVG-Vektorpfade',
        ],
        featuredTools: [
          { title: 'Bildkomprimierung', href: '/tools/compress-image', desc: 'Reduzieren Sie JPEG-, PNG- und WebP-Dateigrößen lokal im Browser um bis zu 80 %.' },
          { title: 'Bildgröße ändern', href: '/tools/resize-image', desc: 'Skalieren Sie Pixelabmessungen mit exakter Seitenverhältnis-Sperre.' },
          { title: 'In WebP konvertieren', href: '/tools/convert-to-webp', desc: 'Wandeln Sie PNG- und JPG-Dateien in das moderne WebP-Format um.' },
          { title: 'EXIF-Metadaten-Viewer', href: '/tools/image-metadata-viewer', desc: 'Prüfen Sie eingebettete Kamera-, Objektiv- und Standortdaten in Fotos.' },
        ],
        faqs: [
          {
            q: 'Werden meine Bilder bei der Nutzung der NexusCalculator-Tools auf einen Server hochgeladen?',
            a: 'Nein. Jedes Bild-Werkzeug arbeitet vollständig lokal in Ihrem Webbrowser über native Canvas- und WebAssembly-Schnittstellen.',
          },
          {
            q: 'Welches Bildformat bietet das beste Verhältnis aus Qualität und Dateigröße für SEO?',
            a: 'WebP und AVIF ermöglichen 25 % bis 50 % kleinere Dateien als vergleichbare JPEG- und PNG-Grafiken bei voller Transparenzunterstützung.',
          },
        ],
      },
    };
    const fallbackDe: Omit<CategoryEnrichment, 'label'> = {
      subtitle: `Fachdiskussionen, geprüfte Berechnungsformeln und Praxis-Ressourcen rund um ${label} in der NexusCalculator-Community.`,
      overview: [
        `Willkommen im Kanal ${label} der NexusCalculator-Community. Hier tauschen sich Ingenieure, Finanzanalysten, Studierende und Entwickler über reale Berechnungsszenarien und mathematische Modelle aus.`,
        'Alle mit diesem Kanal verknüpften Rechner und Werkzeuge laufen zu 100 % lokal in Ihrem Browser und garantieren höchste Geschwindigkeit sowie Datenschutz.',
      ],
      keyTopics: [
        'Schrittweise Herleitung und Überprüfung mathematischer, finanzieller und wissenschaftlicher Formeln',
        'Datenschutzfreundliche Client-Side-Workflows ohne Datei-Uploads auf externe Server',
        'Vergleich realer Praxisszenarien, Rundungsregeln und internationaler Maßeinheiten',
        'Funktionsvorschläge, neue Rechner-Modelle und gegenseitige Fachhilfe',
      ],
      featuredTools: [
        { title: 'Rechner-Verzeichnis', href: '/calculators', desc: 'Über 300 interaktive Finanz-, Gesundheits-, Mathematik- und Wissenschaftsrechner.' },
        { title: 'Entwickler- & Web-Tools', href: '/tools', desc: 'Über 130 lokale Browser-Werkzeuge für Code, Text, PDF und Bilder.' },
        { title: 'Praxis-Ratgeber', href: '/guides', desc: 'Ausführliche Schritt-für-Schritt-Anleitungen und Formelherleitungen.' },
        { title: 'Datenbank-Anonymisierer', href: '/tools/database-anonymizer', desc: 'DSGVO-konformes PII-Scanning und Datenmaskierung lokal im Browser.' },
      ],
      faqs: [
        {
          q: `Benötige ich ein Benutzerkonto für die Werkzeuge im Kanal ${label}?`,
          a: 'Für die Nutzung unserer Rechner und Werkzeuge ist kein Konto erforderlich. Eine kostenlose Anmeldung wird nur für eigene Forenbeiträge benötigt.',
        },
        {
          q: 'Wie werden die Formeln auf NexusCalculator geprüft?',
          a: 'Alle Berechnungsmodelle werden anhand von NIST-Konstanten, wissenschaftlicher Fachliteratur und IEEE-754-Gleitkommastandards validiert.',
        },
      ],
    };
    return { label, ...(deMap[slug] || fallbackDe) };
  }

  return {
    label,
    ...(CATEGORY_ENRICHMENT_EN[slug] || CATEGORY_ENRICHMENT_EN.general),
  };
}

const CATEGORY_ENRICHMENT_EN: Record<
  string,
  Omit<CategoryEnrichment, 'label'>
> = {
  'image-tools': {
    subtitle: 'Discuss client-side image compression, WebP/AVIF conversion, EXIF metadata privacy, and Canvas rendering pipelines.',
    overview: [
      'The Image Tools channel brings together frontend developers, digital designers, photographers, and SEO engineers optimizing visual assets for Core Web Vitals (LCP and CLS) and privacy-first workflows.',
      'All NexusCalculator image utilities process raster and vector graphics 100% locally in your browser via the HTML5 Canvas API, WebAssembly codecs, and OffscreenCanvas workers—meaning high-resolution photographs and proprietary design assets never leave your device.'
    ],
    keyTopics: [
      'Lossy vs. lossless compression ratios across WebP, AVIF, PNG, and JPEG formats',
      'Stripping sensitive GPS and camera EXIF metadata before publishing images online',
      'Batch resizing, aspect-ratio cropping, and DPI scaling for print and responsive web layouts',
      'Converting raster graphics to Base64 data URIs and SVG vector paths'
    ],
    featuredTools: [
      { title: 'Image Compressor', href: '/tools/compress-image', desc: 'Reduce JPEG, PNG, and WebP file sizes by up to 80% locally in your browser.' },
      { title: 'Resize Image', href: '/tools/resize-image', desc: 'Scale pixel dimensions with exact aspect-ratio locking and custom interpolation.' },
      { title: 'Convert to WebP', href: '/tools/convert-to-webp', desc: 'Transform legacy PNG and JPG assets into next-gen WebP format for faster page loads.' },
      { title: 'EXIF Data Viewer', href: '/tools/image-metadata-viewer', desc: 'Inspect and audit embedded camera, lens, and geolocation metadata in photos.' },
    ],
    faqs: [
      {
        q: 'Are images uploaded to a server when using NexusCalculator image tools?',
        a: 'No. Every image tool executes entirely inside your browser using native Canvas and WebAssembly APIs. Your files remain 100% private on your local machine.'
      },
      {
        q: 'Which image format offers the best balance of quality and file size for web SEO?',
        a: 'WebP and AVIF deliver 25% to 50% smaller file sizes compared to equivalent-quality JPEG and PNG files while supporting transparency and animation.'
      }
    ]
  },
  'pdf-tools': {
    subtitle: 'Share workflows for merging, splitting, compressing, encrypting, and converting PDF documents locally in the browser.',
    overview: [
      'The PDF Tools channel is dedicated to document engineering, secure client-side PDF manipulation, OCR text extraction, and automated report generation.',
      'Because financial statements, legal contracts, and medical records contain sensitive personally identifiable information (PII), our community focuses on zero-upload browser-based PDF processing powered by pdf-lib and PDF.js.'
    ],
    keyTopics: [
      'Merging, splitting, and reordering multi-page PDF packets without server uploads',
      'Reducing PDF file sizes for email attachments and government portal submissions',
      'Applying AES password protection, watermarks, and page numbering to confidential documents',
      'Converting between PDF, Word, Excel, PowerPoint, and high-resolution image formats'
    ],
    featuredTools: [
      { title: 'PDF to Excel', href: '/tools/pdf-to-excel', desc: 'Extract structured tables from PDF documents into editable spreadsheets.' },
      { title: 'PDF OCR', href: '/tools/pdf-ocr', desc: 'Extract searchable text from scanned PDF documents locally in your browser.' },
      { title: 'HTML to PDF', href: '/tools/html-to-pdf', desc: 'Render HTML templates and web pages into print-ready PDF documents.' },
      { title: 'All PDF Tools', href: '/pdf', desc: 'Access our full browser-based PDF merging, splitting, and compression suite.' },
    ],
    faqs: [
      {
        q: 'Can I process confidential legal or financial PDFs safely?',
        a: 'Yes. Client-side PDF operations run directly in your browser memory without transmitting your document contents to external cloud storage.'
      },
      {
        q: 'How do I reduce a scanned PDF size without losing text legibility?',
        a: 'Downsample embedded raster scans to 150–200 DPI and apply JPEG/JBIG2 stream compression while keeping vector fonts intact.'
      }
    ]
  },
  finance: {
    subtitle: 'Collaborate on mortgage amortization models, compound interest projections, tax optimization, and corporate finance formulas.',
    overview: [
      'The Finance channel connects financial analysts, homebuyers, accountants, and FIRE (Financial Independence, Retire Early) planners to discuss quantitative modeling and personal finance decisions.',
      'Members share real-world scenarios comparing fixed vs. adjustable-rate mortgages, debt avalanche vs. snowball payoff strategies, discounted cash flow (DCF) valuations, and tax-advantaged retirement accounts.'
    ],
    keyTopics: [
      'Mortgage amortization schedules, extra principal pre-payments, and refinancing break-even analysis',
      'Compound interest, CAGR, IRR, NPV, and inflation-adjusted retirement portfolio modeling',
      'APR vs. APY comparisons across personal loans, auto financing, and credit cards',
      'Salary gross-to-net tax calculations, VAT/sales tax, and freelance margin planning'
    ],
    featuredTools: [
      { title: 'Mortgage Calculator', href: '/calculators/mortgage-calculator', desc: 'Model monthly P&I payments, property taxes, PMI, and full amortization schedules.' },
      { title: 'Compound Interest Calculator', href: '/calculators/compound-interest-calculator', desc: 'Project long-term investment growth with recurring contributions and compounding frequencies.' },
      { title: 'Loan Calculator', href: '/calculators/loan-calculator', desc: 'Compute monthly loan installments, total interest cost, and payoff timelines.' },
      { title: 'IRR Calculator', href: '/calculators/irr-calculator', desc: 'Evaluate Internal Rate of Return and Net Present Value across irregular cash flows.' },
    ],
    faqs: [
      {
        q: 'What is the difference between nominal interest rate and APR?',
        a: 'The nominal interest rate reflects only the base cost of borrowing principal, whereas APR (Annual Percentage Rate) incorporates origination fees, points, and mandatory closing costs.'
      },
      {
        q: 'How do extra principal payments reduce mortgage duration?',
        a: 'Every dollar paid above your scheduled monthly payment directly reduces the principal balance, which lowers the interest accrued in all subsequent compounding periods.'
      }
    ]
  },
  'web-dev': {
    subtitle: 'Discuss web performance, REST API debugging, cryptography, regular expressions, DNS/subnet architecture, and developer utilities.',
    overview: [
      'The Web Dev channel is a technical hub for full-stack software engineers, DevOps architects, and cybersecurity practitioners building modern web applications.',
      'Topics span JSON/YAML schema formatting, JWT token inspection, cryptographic hashing (SHA-256, HMAC, bcrypt), CIDR subnetting, HTTP security headers, and Core Web Vitals optimization.'
    ],
    keyTopics: [
      'Formatting, validating, and diffing JSON, XML, YAML, SQL, and minified JavaScript/CSS payloads',
      'Debugging JWT authentication tokens, Base64/URL encoding, and CORS/HTTP response headers',
      'Designing IPv4/IPv6 CIDR subnet masks, VLAN segmentation, and DNS record propagation',
      'Database PII scanning, GDPR/HIPAA data masking, and UUID v4/v7 primary key generation'
    ],
    featuredTools: [
      { title: 'JSON Formatter & Validator', href: '/tools/json-formatter', desc: 'Beautify, minify, and validate complex JSON payloads with syntax error pinpointing.' },
      { title: 'JWT Decoder', href: '/tools/jwt-decoder', desc: 'Inspect JSON Web Token headers, payload claims, and expiration timestamps locally.' },
      { title: 'Subnet Calculator', href: '/calculators/subnet-calculator', desc: 'Calculate CIDR network ranges, broadcast addresses, and usable host counts.' },
      { title: 'UUID Generator', href: '/tools/uuid-generator', desc: 'Generate RFC 4122 cryptographically random UUIDs in bulk.' },
    ],
    faqs: [
      {
        q: 'Is it safe to paste production JWTs or JSON payloads into NexusCalculator developer tools?',
        a: 'Yes. All formatting, decoding, and hashing tools run 100% client-side in your browser with zero network transmission.'
      },
      {
        q: 'Why choose UUID v7 over UUID v4 for database primary keys?',
        a: 'UUID v7 embeds a millisecond Unix timestamp prefix, providing k-sortable sequential locality that dramatically reduces B-tree index fragmentation in PostgreSQL and MySQL.'
      }
    ]
  },
  calculators: {
    subtitle: 'Explore mathematical formulas, scientific equations, statistical hypothesis testing, physics kinematics, and health metrics.',
    overview: [
      'The Calculators channel covers the mathematical and scientific foundations behind our 300+ interactive calculators across mathematics, statistics, physics, chemistry, health, and construction.',
      'Educators, students, and engineers use this space to verify step-by-step derivations, discuss unit conversion standards, and compare empirical formulas.'
    ],
    keyTopics: [
      'Statistical analysis: standard deviation, Z-scores, p-values, confidence intervals, and probability distributions',
      'Physics and chemistry: ideal gas law, molarity, stoichiometry, projectile motion, and Ohm’s law',
      'Health and physiology: BMI, BMR (Mifflin-St Jeor vs. Harris-Benedict), body fat percentage, and macro targets',
      'Everyday utilities: exact age calculation, business day intervals, GPA weighting, and concrete volume estimation'
    ],
    featuredTools: [
      { title: 'Scientific Calculator', href: '/calculators/scientific-calculator', desc: 'Evaluate trigonometric, logarithmic, exponential, and factorial expressions.' },
      { title: 'Statistics Calculator', href: '/calculators/statistics-calculator', desc: 'Compute mean, median, mode, variance, and standard deviation from raw datasets.' },
      { title: 'BMI Calculator', href: '/calculators/bmi-calculator', desc: 'Calculate Body Mass Index with metric and imperial unit support.' },
      { title: 'Date Calculator', href: '/calculators/date-calculator', desc: 'Find exact calendar duration in years, months, weeks, and business days.' },
    ],
    faqs: [
      {
        q: 'How are formulas verified across NexusCalculator scientific and engineering tools?',
        a: 'Every calculator is benchmarked against NIST constants, peer-reviewed academic textbooks, and IEEE floating-point precision standards.'
      },
      {
        q: 'Can I embed NexusCalculator widgets on my own educational or business website?',
        a: 'Yes. Most calculators include an embed option that generates a responsive iframe snippet for blogs, classrooms, and documentation portals.'
      }
    ]
  },
  general: {
    subtitle: 'General community announcements, productivity workflows, cross-disciplinary Q&A, and platform tips.',
    overview: [
      'Welcome to the General discussion channel—the central town square for the NexusCalculator community. Whether you are combining multiple calculators into a workflow, sharing a spreadsheet tip, or introducing yourself, this is the place to connect.',
      'Our community brings together engineers, students, financial planners, researchers, and everyday problem solvers across four languages (English, Spanish, French, and German).'
    ],
    keyTopics: [
      'Combining financial, statistical, and document utilities into end-to-end workflows',
      'Best practices for browser-local data privacy and offline PWA usage',
      'Cross-language terminology and international unit/currency conventions',
      'Community announcements, newly launched calculators, and seasonal guides'
    ],
    featuredTools: [
      { title: 'All Calculators Directory', href: '/calculators', desc: 'Browse 300+ interactive calculators across finance, health, math, and science.' },
      { title: 'Developer & Web Tools', href: '/tools', desc: 'Explore 100+ browser-based utilities for coding, text, PDF, and image processing.' },
      { title: 'In-Depth Guides', href: '/guides', desc: 'Read comprehensive step-by-step tutorials and formula derivations.' },
      { title: 'Database Dump Anonymizer', href: '/tools/database-anonymizer', desc: 'Discover enterprise-grade PII scanning and database anonymization.' },
    ],
    faqs: [
      {
        q: 'Do I need an account to use NexusCalculator tools and calculators?',
        a: 'No account is required to use any calculator, PDF utility, or image tool. Creating a free account is only needed if you want to post in the community forum.'
      },
      {
        q: 'In which languages is NexusCalculator available?',
        a: 'NexusCalculator is fully localized in English (EN), Spanish (ES), French (FR), and German (DE).'
      }
    ]
  },
  'feature-request': {
    subtitle: 'Propose new calculators, suggest formula enhancements, and vote on upcoming developer and document utilities.',
    overview: [
      'The Feature Request channel shapes the product roadmap of NexusCalculator. Many of our most popular regional finance calculators, engineering unit converters, and batch PDF tools started as community proposals right here.',
      'When submitting a request, share the target use case, standard mathematical formula or industry specification, expected input parameters, and desired output charts.'
    ],
    keyTopics: [
      'New calculator proposals for specialized engineering, medical, tax, or regional financial models',
      'UI/UX improvements such as CSV/PDF export tables, interactive charts, and dark-mode contrast',
      'Additional file format support in our browser-based image and document converters',
      'Localization enhancements for regional tax laws, currencies, and measurement units'
    ],
    featuredTools: [
      { title: 'All Calculators Hub', href: '/calculators', desc: 'Check our existing library of 300+ calculators before submitting a new request.' },
      { title: 'All Tools Hub', href: '/tools', desc: 'Explore current developer, PDF, and image tools.' },
      { title: 'Curated Collections', href: '/collections/best-mortgage-calculators', desc: 'See how related calculators are grouped into specialized toolkits.' },
      { title: 'Side-by-Side Comparisons', href: '/compare/apr-vs-apy', desc: 'Explore interactive financial and technical comparison guides.' },
    ],
    faqs: [
      {
        q: 'What details help get a feature request prioritized fastest?',
        a: 'Include the exact mathematical equation or authoritative reference (e.g., IRS publication, engineering standard), sample inputs, and expected outputs.'
      },
      {
        q: 'How are community feature requests evaluated?',
        a: 'Our engineering team reviews requests weekly based on community upvotes, mathematical verifiability, and ability to run 100% client-side.'
      }
    ]
  },
  'bug-report': {
    subtitle: 'Report calculation edge cases, rounding discrepancies, browser compatibility issues, or translation corrections.',
    overview: [
      'Accuracy and reliability are our highest engineering priorities. The Bug Report channel allows users and domain experts to flag floating-point edge cases, mobile layout glitches, or locale formatting issues.',
      'When reporting an issue, please include the calculator or tool URL, the exact input values entered, the expected result versus the observed output, and your browser/OS version.'
    ],
    keyTopics: [
      'Floating-point precision, significant figures, and rounding mode edge cases',
      'Browser compatibility across Chrome, Firefox, Safari, Edge, and mobile WebViews',
      'Regional number formatting (decimal commas vs. points) and translation refinements',
      'Accessibility (ARIA labels, keyboard navigation, and screen-reader announcements)'
    ],
    featuredTools: [
      { title: 'Scientific Calculator', href: '/calculators/scientific-calculator', desc: 'High-precision expression evaluator for cross-checking mathematical results.' },
      { title: 'Percentage Calculator', href: '/calculators/percentage-calculator', desc: 'Verify percentage changes, differences, and ratios.' },
      { title: 'Conversion Calculator', href: '/calculators/conversion-calculator', desc: 'Cross-check SI and imperial unit conversion factors.' },
      { title: 'Contact Engineering Team', href: '/contact-us', desc: 'Reach out directly for security disclosures or urgent platform support.' },
    ],
    faqs: [
      {
        q: 'Why can a monthly loan payment differ by a few cents from my bank statement?',
        a: 'Different lenders apply either actual/365, actual/360, or 30/360 day-count conventions and may round intermediate interest at each billing cycle.'
      },
      {
        q: 'How quickly are verified calculation bugs patched?',
        a: 'Verified formula or rounding discrepancies are prioritized immediately and typically deployed to production within 24 to 48 hours.'
      }
    ]
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getCategoryMeta(slug);
  if (!meta) return { title: 'Not Found' };
  const { getCanonicalAndAlternates, optimizeSerpTitle } = await import('@/lib/utils/seoUtils');
  const enrichment = getLocalizedEnrichment(slug, locale);
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return {
    title: optimizeSerpTitle(ui.metaTitle(meta.emoji, enrichment.label), locale, 'page'),
    description: ui.metaDesc(enrichment.subtitle, enrichment.label),
    robots: {
      index: true,
      follow: true,
    },
    alternates: getCanonicalAndAlternates('/community/category/[slug]', locale, slug),
  };
}

async function fetchCategoryPosts(category: string): Promise<Post[]> {
  const restPosts = await queryPostsRest({ category, limitCount: 40 });
  return restPosts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    content: p.content,
    authorId: p.authorId,
    authorName: p.authorName,
    authorRole: p.authorRole,
    authorBadges: p.authorBadges,
    createdAt: p.createdAt,
    upvotes: p.upvotes,
    replyCount: p.replyCount,
    tags: p.tags,
    category: p.category,
    isPinned: p.isPinned || false,
    isLocked: p.isLocked || false,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const meta = getCategoryMeta(slug);
  if (!meta) notFound();

  const posts = await fetchCategoryPosts(slug);
  const enrichment = getLocalizedEnrichment(slug, locale);
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back + Header */}
        <div className="mb-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={15} /> {ui.allChannels}
          </Link>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${meta.color}`}>
                {meta.emoji}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{ui.hubTitle(enrichment.label)}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-2xl">
                  {enrichment.subtitle} ({ui.discussionsCount(posts.length)})
                </p>
              </div>
            </div>

            <Link
              href="/community/new"
              rel="nofollow"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageSquarePlus size={16} />
              {ui.newDiscussion}
            </Link>
          </div>
        </div>

        {/* All channels quick-nav strip */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COMMUNITY_CATEGORIES.map(cat => {
            const catLabel = LOCALIZED_CATEGORY_LABELS[locale]?.[cat.slug] || cat.label;
            return (
              <Link
                key={cat.slug}
                href={`/community/category/${cat.slug}` as any}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  cat.slug === slug
                    ? `${cat.color} ring-2 ring-offset-1 ring-current`
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.emoji} {catLabel}
              </Link>
            );
          })}
        </div>

        {/* Feed */}
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center mb-10">
            <div className="text-5xl mb-4">{meta.emoji}</div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{ui.emptyTitle(enrichment.label)}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              {ui.emptyDesc(enrichment.label)}
            </p>
            <Link
              href="/community/new"
              rel="nofollow"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-semibold transition-colors"
            >
              <MessageSquarePlus size={18} /> {ui.startDiscussion}
            </Link>
          </div>
        ) : (
          <div className="mb-10">
            <CommunityFeed initialPosts={posts} />
          </div>
        )}

        {/* Channel Technical Overview & Featured Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {ui.aboutChannel(enrichment.label)}
              </h2>
              <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {enrichment.overview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-6 mb-3">
                {ui.coreTopics}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {enrichment.keyTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {ui.faqHeading(enrichment.label)}
              </h2>
              <div className="space-y-4">
                {enrichment.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-4 last:pb-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                {ui.featuredUtilities(enrichment.label)}
              </h2>
              <div className="space-y-3">
                {enrichment.featuredTools.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.href as any}
                    className="block p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] transition-colors group"
                  >
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {tool.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
