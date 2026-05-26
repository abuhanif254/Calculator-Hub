import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'de'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/search': '/search',
    '/sitemap': {
      en: '/sitemap',
      es: '/mapa-del-sitio',
      fr: '/plan-du-site',
      de: '/sitemap'
    },
    '/about-us': {
      en: '/about-us',
      es: '/sobre-nosotros',
      fr: '/a-propos',
      de: '/uber-uns'
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      es: '/politica-de-privacidad',
      fr: '/politique-de-confidentialite',
      de: '/datenschutzrichtlinie'
    },
    '/terms-of-use': {
      en: '/terms-of-use',
      es: '/terminos-de-uso',
      fr: '/conditions-d-utilisation',
      de: '/nutzungsbedingungen'
    },
    // We can also let the catch-all dynamic parameter fall through, but
    // let's explicitly map the calculators we actively support to their specific translated slugs
    '/calculators/age-calculator': {
      en: '/calculators/age-calculator',
      es: '/calculadoras/calculadora-de-edad',
      fr: '/calculatrices/calculatrice-age',
      de: '/rechner/alter-rechner'
    },
    '/calculators/mortgage-calculator': {
      en: '/calculators/mortgage-calculator',
      es: '/calculadoras/calculadora-de-hipotecas',
      fr: '/calculatrices/calculatrice-hypothecaire',
      de: '/rechner/hypothekenrechner'
    },
    '/calculators/canadian-mortgage-calculator': {
      en: '/calculators/canadian-mortgage-calculator',
      es: '/calculadoras/calculadora-de-hipotecas-canadiense',
      fr: '/calculatrices/calculatrice-hypothecaire-canadienne',
      de: '/rechner/kanadischer-hypothekenrechner'
    },
    '/calculators/loan-calculator': {
      en: '/calculators/loan-calculator',
      es: '/calculadoras/calculadora-de-prestamos',
      fr: '/calculatrices/calculatrice-de-pret',
      de: '/rechner/kreditrechner'
    },
    '/calculators/bmi-calculator': {
      en: '/calculators/bmi-calculator',
      es: '/calculadoras/calculadora-de-imc',
      fr: '/calculatrices/calculatrice-imc',
      de: '/rechner/bmi-rechner'
    },
    '/calculators/subnet-calculator': {
      en: '/calculators/subnet-calculator',
      es: '/calculadoras/calculadora-de-subredes',
      fr: '/calculatrices/calculateur-de-sous-reseau',
      de: '/rechner/subnetz-rechner'
    },
    '/calculators/password-generator': {
      en: '/calculators/password-generator',
      es: '/calculadoras/generador-de-contrasenas',
      fr: '/calculatrices/generateur-de-mots-de-passe',
      de: '/rechner/passwort-generator'
    },
    '/calculators/conversion-calculator': {
      en: '/calculators/conversion-calculator',
      es: '/calculadoras/calculadora-de-conversiones',
      fr: '/calculatrices/convertisseur-d-unites',
      de: '/rechner/einheitenumrechner'
    },
    '/calculators/currency-calculator': {
      en: '/calculators/currency-calculator',
      es: '/calculadoras/calculadora-de-divisas',
      fr: '/calculatrices/convertisseur-de-devises',
      de: '/rechner/waehrungsrechner'
    },
    '/calculators/rent-calculator': {
      en: '/calculators/rent-calculator',
      es: '/calculadoras/calculadora-de-alquiler',
      fr: '/calculatrices/calculateur-de-loyer',
      de: '/rechner/mietrechner'
    },
    '/calculators/social-security-calculator': {
      en: '/calculators/social-security-calculator',
      es: '/calculadoras/calculadora-de-seguro-social',
      fr: '/calculatrices/calculateur-de-securite-sociale',
      de: '/rechner/rentenrechner'
    },
    '/calculators/credit-cards-payoff': {
      en: '/calculators/credit-cards-payoff',
      es: '/calculadoras/pago-tarjetas-de-credito',
      fr: '/calculatrices/remboursement-cartes-de-credit',
      de: '/rechner/kreditkarten-abbezahlen'
    },
    '/calculators/half-life-calculator': {
      en: '/calculators/half-life-calculator',
      es: '/calculadoras/calculadora-de-vida-media',
      fr: '/calculatrices/calculateur-de-demi-vie',
      de: '/rechner/halbwertszeit-rechner'
    },
    '/calculators/volume-calculator': {
      en: '/calculators/volume-calculator',
      es: '/calculadoras/calculadora-de-volumen',
      fr: '/calculatrices/calculateur-de-volume',
      de: '/rechner/volumenrechner'
    },
    '/calculators/percent-error-calculator': {
      en: '/calculators/percent-error-calculator',
      es: '/calculadoras/calculadora-de-error-porcentual',
      fr: '/calculatrices/calculateur-d-erreur-pourcentage',
      de: '/rechner/prozentualer-fehler-rechner'
    },
    '/calculators/height-calculator': {
      en: '/calculators/height-calculator',
      es: '/calculadoras/calculadora-de-altura',
      fr: '/calculatrices/calculateur-de-taille',
      de: '/rechner/groessenrechner'
    },
    '/calculators/ip-subnet-calculator': {
      en: '/calculators/ip-subnet-calculator',
      es: '/calculadoras/calculadora-de-subred-ip',
      fr: '/calculatrices/calculateur-de-sous-reseau-ip',
      de: '/rechner/ip-subnetz-rechner'
    },
    '/calculators/macro-calculator': {
      en: '/calculators/macro-calculator',
      es: '/calculadoras/calculadora-de-macros',
      fr: '/calculatrices/calculateur-de-macros',
      de: '/rechner/makro-rechner'
    },
    '/calculators/carbohydrate-calculator': {
      en: '/calculators/carbohydrate-calculator',
      es: '/calculadoras/calculadora-de-carbohidratos',
      fr: '/calculatrices/calculateur-de-glucides',
      de: '/rechner/kohlenhydrat-rechner'
    },
    '/calculators/savings-calculator': {
      en: '/calculators/savings-calculator',
      es: '/calculadoras/calculadora-de-ahorros',
      fr: '/calculatrices/calculatrice-epargne',
      de: '/rechner/spar-rechner'
    },
    '/calculators/cd-calculator': {
      en: '/calculators/cd-calculator',
      es: '/calculadoras/calculadora-de-cd',
      fr: '/calculatrices/calculateur-de-compte-de-depot',
      de: '/rechner/festgeldrechner'
    },
    // Category landing pages (pillar pages for topical authority)
    '/calculators/category/[category]': {
      en: '/calculators/category/[category]',
      es: '/calculadoras/categoria/[category]',
      fr: '/calculatrices/categorie/[category]',
      de: '/rechner/kategorie/[category]'
    },
    // Anything dynamically hit that isn't mapped explicitly gets a generic translation of "calculators":
    '/calculators/[slug]': {
      en: '/calculators/[slug]',
      es: '/calculadoras/[slug]',
      fr: '/calculatrices/[slug]',
      de: '/rechner/[slug]'
    },
    '/community': '/community',
    '/community/new': '/community/new',
    '/community/[slug]': '/community/[slug]',
    '/tools/[slug]': {
      en: '/tools/[slug]',
      es: '/herramientas/[slug]',
      fr: '/outils/[slug]',
      de: '/werkzeuge/[slug]'
    },
    '/dashboard': {
      en: '/dashboard',
      es: '/panel',
      fr: '/tableau-de-bord',
      de: '/dashboard'
    },
    '/collections/[slug]': {
      en: '/collections/[slug]',
      es: '/colecciones/[slug]',
      fr: '/collections/[slug]',
      de: '/sammlungen/[slug]'
    },
    '/embed/calculators/[slug]': '/embed/calculators/[slug]',
    '/embed/tools/[slug]': '/embed/tools/[slug]',
    '/compare/[slug]': {
      en: '/compare/[slug]',
      es: '/comparar/[slug]',
      fr: '/comparer/[slug]',
      de: '/vergleichen/[slug]'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);

/**
 * Resolves flat string URLs into next-intl compatible objects for dynamic routes.
 * Prevents the "Cannot destructure property 'pathname' of 'e'" error when passing
 * strings to dynamic catch-all paths.
 */
export function resolveIntlHref(hrefStr: string): any {
  // If hrefStr is missing (e.g. corrupted localStorage data missing the href property),
  // fallback to root to prevent next-intl's Link from crashing during destructuring.
  if (!hrefStr || typeof hrefStr !== 'string') return '/';
  
  // If the exact path is explicitly statically mapped in routing.pathnames,
  // we MUST return the string directly. Using the dynamic object catch-all
  // for a statically mapped path causes next-intl to crash.
  if (hrefStr in routing.pathnames) {
    return hrefStr;
  }
  
  if (hrefStr.startsWith('/calculators/category/')) {
    return { pathname: '/calculators/category/[category]', params: { category: hrefStr.replace('/calculators/category/', '') } };
  }
  if (hrefStr.startsWith('/calculators/')) {
    // Check if it's explicitly statically mapped first?
    // It's safer to just use the dynamic pattern since they resolve identically.
    return { pathname: '/calculators/[slug]', params: { slug: hrefStr.replace('/calculators/', '') } };
  }
  if (hrefStr.startsWith('/tools/')) {
    return { pathname: '/tools/[slug]', params: { slug: hrefStr.replace('/tools/', '') } };
  }
  if (hrefStr.startsWith('/collections/')) {
    return { pathname: '/collections/[slug]', params: { slug: hrefStr.replace('/collections/', '') } };
  }
  if (hrefStr.startsWith('/compare/')) {
    return { pathname: '/compare/[slug]', params: { slug: hrefStr.replace('/compare/', '') } };
  }
  
  return hrefStr;
}
