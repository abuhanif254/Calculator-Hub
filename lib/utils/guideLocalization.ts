import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Guide } from '@/lib/data/guides';

const localizedGuideCache = new Map<string, Guide>();

const PRIVACY_GUIDE_TRANSLATIONS: Record<string, Record<string, { title: string; description: string }>> = {
  'what-is-pii-scanning': {
    es: {
      title: '¿Qué es el Escaneo de PII? Guía Completa para Detectar Datos Sensibles',
      description: 'Aprenda cómo funciona el escaneo de información de identificación personal (PII), qué datos sensibles almacenan las bases de datos y cómo prevenir filtraciones e incumplimientos normativos.',
    },
    fr: {
      title: 'Qu’est-ce que le Scan PII ? Guide Complet de Détection des Données Sensibles',
      description: 'Découvrez comment fonctionne l’analyse des données à caractère personnel (PII), quels identifiants sensibles contiennent vos bases de données et comment prévenir les fuites de données.',
    },
    de: {
      title: 'Was ist PII-Scanning? Kompletter Leitfaden zur Erkennung sensibler Daten',
      description: 'Erfahren Sie, wie das Scannen personenbezogener Daten (PII) funktioniert, welche sensiblen Identifikatoren Datenbanken enthalten und wie Sie Datenschutzverletzungen verhindern.',
    },
  },
  'gdpr-database-compliance': {
    es: {
      title: 'Cumplimiento del RGPD en Bases de Datos: Guía Técnica para Desarrolladores',
      description: 'Guía técnica práctica de los Artículos 25 y 32 del RGPD: minimización de datos, cifrado, seudonimización y registros de auditoría en bases de datos.',
    },
    fr: {
      title: 'Conformité RGPD des Bases de Données : Guide Technique pour Développeurs',
      description: 'Guide technique pratique des articles 25 et 32 du RGPD : minimisation des données, chiffrement, pseudonymisation et journaux d’audit pour les bases de données.',
    },
    de: {
      title: 'DSGVO-Datenbankkonformität: Technischer Leitfaden für Entwickler',
      description: 'Praxisleitfaden zu Artikel 25 und 32 DSGVO — Datenminimierung, Verschlüsselung, Pseudonymisierung und Audit-Logging für relationale und NoSQL-Datenbanken.',
    },
  },
  'data-masking-techniques': {
    es: {
      title: 'Técnicas de Enmascaramiento de Datos: Hashing, Tokenización y Redacción',
      description: 'Compare las técnicas más efectivas de enmascaramiento de datos — hashing criptográfico, tokenización, redacción, seudonimización y cifrado con preservación de formato.',
    },
    fr: {
      title: 'Techniques de Masquage de Données : Hachage, Tokénisation et Caviardage',
      description: 'Comparez les techniques de masquage de données les plus efficaces : hachage, tokénisation, caviardage, pseudonymisation et chiffrement préservant le format.',
    },
    de: {
      title: 'Datenmaskierungstechniken: Hashing, Tokenisierung & Schwärzung im Vergleich',
      description: 'Vergleichen Sie die wirksamsten Methoden zur Datenmaskierung — kryptografisches Hashing, Tokenisierung, Redaktion, Pseudonymisierung und formatbewahrende Verschlüsselung.',
    },
  },
  'hipaa-data-de-identification': {
    es: {
      title: 'Desidentificación de Datos HIPAA: Safe Harbor vs. Determinación de Expertos',
      description: 'Comprenda los requisitos de desidentificación HIPAA bajo 45 CFR §164.514 comparando el método Safe Harbor (18 identificadores clínicos) y la Determinación Estadística.',
    },
    fr: {
      title: 'Dé-identification des Données HIPAA : Safe Harbor vs Détermination d’Expert',
      description: 'Comprenez les exigences de dé-identification HIPAA selon 45 CFR §164.514 en comparant la méthode Safe Harbor (suppression des 18 identifiants) et l’évaluation statistique.',
    },
    de: {
      title: 'HIPAA-Datenanonymisierung: Safe-Harbor-Methode vs. Expertenbewertung',
      description: 'Verstehen Sie die HIPAA-Anforderungen nach 45 CFR §164.514 zur De-Identifizierung medizinischer Daten im Vergleich zwischen Safe Harbor (18 Identifikatoren) und Expertenverfahren.',
    },
  },
  'pci-dss-pan-masking': {
    es: {
      title: 'Enmascaramiento de PAN en PCI DSS: Protección de Datos de Tarjetas en Bases de Datos',
      description: 'Guía técnica del Requisito 3 de PCI DSS v4.0: cómo enmascarar, truncar y tokenizar números de cuenta principal (PAN) para proteger los datos del titular de la tarjeta.',
    },
    fr: {
      title: 'Masquage PAN PCI DSS : Protection des Données de Cartes Bancaires en Base',
      description: 'Guide technique de l’exigence 3 de la norme PCI DSS v4.0 : comment masquer, tronquer et tokéniser les numéros de compte primaire (PAN) pour sécuriser les données bancaires.',
    },
    de: {
      title: 'PCI DSS PAN-Maskierung: Schutz von Karteninhaberdaten in Datenbanken',
      description: 'Technischer Leitfaden zu PCI DSS v4.0 Anforderung 3 — wie Sie Primary Account Numbers (PAN) maskieren, kürzen und tokenisieren, um Karteninhaberdaten rechtskonform zu schützen.',
    },
  },
};

export function getLocalizedGuide(guide: Guide, locale: string): Guide {
  if (locale === 'en') return guide;

  const cacheKey = `${locale}:${guide.slug}`;
  if (localizedGuideCache.has(cacheKey)) {
    return localizedGuideCache.get(cacheKey)!;
  }

  const currentSlug = guide.slugs?.[locale as keyof typeof guide.slugs] || guide.slug;
  const filePath = path.join(process.cwd(), 'content', locale, 'guides', `${currentSlug}.md`);
  const fallbackMeta = PRIVACY_GUIDE_TRANSLATIONS[guide.slug]?.[locale];

  let result: Guide = {
    ...guide,
    slug: currentSlug,
    title: fallbackMeta?.title || guide.title,
    description: fallbackMeta?.description || guide.description,
  };

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);

    result = {
      ...guide,
      slug: currentSlug,
      title: data.title || fallbackMeta?.title || guide.title,
      description: data.description || fallbackMeta?.description || guide.description,
    };
  }

  localizedGuideCache.set(cacheKey, result);
  return result;
}
