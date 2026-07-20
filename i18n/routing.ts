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
    '/contact-us': {
      en: '/contact-us',
      es: '/contactenos',
      fr: '/nous-contacter',
      de: '/kontaktiere-uns'
    },
    '/disclaimer': {
      en: '/disclaimer',
      es: '/descargo-de-responsabilidad',
      fr: '/clause-de-non-responsabilite',
      de: '/haftungsausschluss'
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
    '/guides': {
      en: '/guides',
      es: '/guias',
      fr: '/guides',
      de: '/anleitungen'
    },
    '/guides/[slug]': {
      en: '/guides/[slug]',
      es: '/guias/[slug]',
      fr: '/guides/[slug]',
      de: '/anleitungen/[slug]'
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
    '/calculators/snow-day-calculator': {
      en: '/calculators/snow-day-calculator',
      es: '/calculadoras/calculadora-de-dia-de-nieve',
      fr: '/calculatrices/calculateur-jour-de-neige',
      de: '/rechner/schneefreier-tag-rechner'
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
    '/calculators/tip-calculator': {
      en: '/calculators/tip-calculator',
      es: '/calculadoras/calculadora-de-propinas',
      fr: '/calculatrices/calculateur-de-pourboire',
      de: '/rechner/trinkgeldrechner'
    },
    '/calculators/zakat-calculator': {
      en: '/calculators/zakat-calculator',
      es: '/calculadoras/calculadora-de-zakat',
      fr: '/calculatrices/calculateur-de-zakat',
      de: '/rechner/zakat-rechner'
    },
    '/calculators/projectile-motion-calculator': {
      en: '/calculators/projectile-motion-calculator',
      es: '/calculadoras/calculadora-de-movimiento-de-proyectiles',
      fr: '/calculatrices/calculateur-de-mouvement-de-projectile',
      de: '/rechner/projektilbewegung-rechner'
    },
    '/calculators/velocity-calculator': {
      en: '/calculators/velocity-calculator',
      es: '/calculadoras/calculadora-de-velocidad',
      fr: '/calculatrices/calculateur-de-vitesse',
      de: '/rechner/geschwindigkeitsrechner'
    },
    '/calculators/acceleration-calculator': {
      en: '/calculators/acceleration-calculator',
      es: '/calculadoras/calculadora-de-aceleracion',
      fr: '/calculatrices/calculateur-d-acceleration',
      de: '/rechner/beschleunigungsrechner'
    },
    '/calculators/force-calculator': {
      en: '/calculators/force-calculator',
      es: '/calculadoras/calculadora-de-fuerza',
      fr: '/calculatrices/calculateur-de-force',
      de: '/rechner/kraftrechner'
    },
    '/calculators/momentum-calculator': {
      en: '/calculators/momentum-calculator',
      es: '/calculadoras/calculadora-de-momento',
      fr: '/calculatrices/calculateur-de-quantite-de-mouvement',
      de: '/rechner/impulsrechner'
    },
    '/calculators/kinetic-energy-calculator': {
      en: '/calculators/kinetic-energy-calculator',
      es: '/calculadoras/calculadora-de-energia-cinetica',
      fr: '/calculatrices/calculateur-d-energie-cinetique',
      de: '/rechner/kinetische-energie-rechner'
    },
    '/calculators/potential-energy-calculator': {
      en: '/calculators/potential-energy-calculator',
      es: '/calculadoras/calculadora-de-energia-potencial',
      fr: '/calculatrices/calculateur-d-energie-potentielle',
      de: '/rechner/potenzielle-energie-rechner'
    },
    '/calculators/free-fall-calculator': {
      en: '/calculators/free-fall-calculator',
      es: '/calculadoras/calculadora-de-caida-libre',
      fr: '/calculatrices/calculateur-de-chute-libre',
      de: '/rechner/freier-fall-rechner'
    },
    '/calculators/work-calculator': {
      en: '/calculators/work-calculator',
      es: '/calculadoras/calculadora-de-trabajo',
      fr: '/calculatrices/calculateur-de-travail',
      de: '/rechner/arbeit-rechner'
    },
    '/calculators/power-calculator': {
      en: '/calculators/power-calculator',
      es: '/calculadoras/calculadora-de-potencia',
      fr: '/calculatrices/calculateur-de-puissance',
      de: '/rechner/leistung-rechner'
    },
    '/calculators/density-calculator': {
      en: '/calculators/density-calculator',
      es: '/calculadoras/calculadora-de-densidad',
      fr: '/calculatrices/calculateur-de-masse-volumique',
      de: '/rechner/dichte-rechner'
    },
    '/calculators/weight-calculator': {
      en: '/calculators/weight-calculator',
      es: '/calculadoras/calculadora-de-peso',
      fr: '/calculatrices/calculateur-de-poids',
      de: '/rechner/gewicht-rechner'
    },
    '/calculators/ohms-law-calculator': {
      en: '/calculators/ohms-law-calculator',
      es: '/calculadoras/calculadora-ley-de-ohm',
      fr: '/calculatrices/calculateur-loi-d-ohm',
      de: '/rechner/ohmsches-gesetz-rechner'
    },
    '/calculators/voltage-calculator': {
      en: '/calculators/voltage-calculator',
      es: '/calculadoras/calculadora-de-voltaje',
      fr: '/calculatrices/calculateur-de-tension',
      de: '/rechner/spannung-rechner'
    },
    '/calculators/current-calculator': {
      en: '/calculators/current-calculator',
      es: '/calculadoras/calculadora-de-corriente',
      fr: '/calculatrices/calculateur-de-courant',
      de: '/rechner/strom-rechner'
    },
    '/calculators/resistance-calculator': {
      en: '/calculators/resistance-calculator',
      es: '/calculadoras/calculadora-de-resistencia',
      fr: '/calculatrices/calculateur-de-resistance',
      de: '/rechner/widerstand-rechner'
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
    '/community': {
      en: '/community',
      es: '/comunidad',
      fr: '/communaute',
      de: '/gemeinschaft'
    },
    '/community/new': {
      en: '/community/new',
      es: '/comunidad/nuevo',
      fr: '/communaute/nouveau',
      de: '/gemeinschaft/neu'
    },
    '/community/[slug]': {
      en: '/community/[slug]',
      es: '/comunidad/[slug]',
      fr: '/communaute/[slug]',
      de: '/gemeinschaft/[slug]'
    },
    '/community/[slug]/edit': {
      en: '/community/[slug]/edit',
      es: '/comunidad/[slug]/editar',
      fr: '/communaute/[slug]/modifier',
      de: '/gemeinschaft/[slug]/bearbeiten'
    },
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
    },
    '/login': {
      en: '/login',
      es: '/iniciar-sesion',
      fr: '/connexion',
      de: '/anmelden'
    },
    '/signup': {
      en: '/signup',
      es: '/registrarse',
      fr: '/inscription',
      de: '/registrieren'
    },
    '/admin/community': {
      en: '/admin/community',
      es: '/admin/comunidad',
      fr: '/admin/communaute',
      de: '/admin/gemeinschaft'
    },
    '/community/messages': {
      en: '/community/messages',
      es: '/comunidad/mensajes',
      fr: '/communaute/messages',
      de: '/gemeinschaft/nachrichten'
    },
    '/community/messages/[chatId]': {
      en: '/community/messages/[chatId]',
      es: '/comunidad/mensajes/[chatId]',
      fr: '/communaute/messages/[chatId]',
      de: '/gemeinschaft/nachrichten/[chatId]'
    },
    '/community/user/[userId]': {
      en: '/community/user/[userId]',
      es: '/comunidad/usuario/[userId]',
      fr: '/communaute/utilisateur/[userId]',
      de: '/gemeinschaft/benutzer/[userId]'
    },

    '/community/hall-of-fame': {
      en: '/community/hall-of-fame',
      es: '/comunidad/salon-de-la-fama',
      fr: '/communaute/temple-de-la-renommee',
      de: '/gemeinschaft/ruhmeshalle'
    },
    '/community/leaderboard': {
      en: '/community/leaderboard',
      es: '/comunidad/tabla-de-posiciones',
      fr: '/communaute/classement',
      de: '/gemeinschaft/bestenliste'
    },
    '/community/settings': {
      en: '/community/settings',
      es: '/comunidad/configuracion',
      fr: '/communaute/parametres',
      de: '/gemeinschaft/einstellungen'
    },
    '/community/category/[slug]': {
      en: '/community/category/[slug]',
      es: '/comunidad/categoria/[slug]',
      fr: '/communaute/categorie/[slug]',
      de: '/gemeinschaft/kategorie/[slug]'
    },
    '/pdf': {
      en: '/pdf',
      es: '/pdf',
      fr: '/pdf',
      de: '/pdf'
    },
    '/image': {
      en: '/image',
      es: '/imagen',
      fr: '/image',
      de: '/bild'
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
  if (hrefStr.startsWith('/community/')) {
    const parts = hrefStr.replace('/community/', '').split('/');
    if (parts.length === 1 && !['new', 'messages', 'admin'].includes(parts[0])) {
      return { pathname: '/community/[slug]', params: { slug: parts[0] } };
    } else if (parts.length === 2 && parts[1] === 'edit') {
      return { pathname: '/community/[slug]/edit', params: { slug: parts[0] } };
    } else if (parts.length === 2 && parts[0] === 'messages') {
      return { pathname: '/community/messages/[chatId]', params: { chatId: parts[1] } };
    } else if (parts.length === 2 && parts[0] === 'user') {
      return { pathname: '/community/user/[userId]', params: { userId: parts[1] } };
    } else if (parts.length === 2 && parts[0] === 'category') {
      return { pathname: '/community/category/[slug]', params: { slug: parts[1] } };
    }
  }
  
  return hrefStr;
}
