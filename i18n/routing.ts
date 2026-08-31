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
    '/calculators/probability-calculator': {
      en: '/calculators/probability-calculator',
      es: '/calculadoras/calculadora-de-probabilidad',
      fr: '/calculatrices/calculatrice-de-probabilite',
      de: '/rechner/wahrscheinlichkeitsrechner'
    },
    '/calculators/z-score-calculator': {
      en: '/calculators/z-score-calculator',
      es: '/calculadoras/calculadora-de-valor-z',
      fr: '/calculatrices/calculatrice-score-z',
      de: '/rechner/z-score-rechner'
    },
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
    '/calculators/electrical-power-calculator': {
      en: '/calculators/electrical-power-calculator',
      es: '/calculadoras/calculadora-de-potencia-electrica',
      fr: '/calculatrices/calculateur-de-puissance-electrique',
      de: '/rechner/elektrische-leistung-rechner'
    },
    '/calculators/electrical-energy-calculator': {
      en: '/calculators/electrical-energy-calculator',
      es: '/calculadoras/calculadora-de-energia-electrica',
      fr: '/calculatrices/calculateur-d-energie-electrique',
      de: '/rechner/elektrische-energie-rechner'
    },
    '/calculators/voltage-drop-calculator': {
      en: '/calculators/voltage-drop-calculator',
      es: '/calculadoras/calculadora-de-caida-de-voltaje',
      fr: '/calculatrices/calculateur-de-chute-de-tension',
      de: '/rechner/spannungsabfall-rechner'
    },
    '/calculators/wire-resistance-calculator': {
      en: '/calculators/wire-resistance-calculator',
      es: '/calculadoras/calculadora-de-resistencia-de-cable',
      fr: '/calculatrices/calculateur-de-resistance-de-fil',
      de: '/rechner/drahtwiderstand-rechner'
    },
    '/calculators/electricity-cost-calculator': {
      en: '/calculators/electricity-cost-calculator',
      es: '/calculadoras/calculadora-de-costo-de-electricidad',
      fr: '/calculatrices/calculateur-de-cout-d-electricite',
      de: '/rechner/stromkosten-rechner'
    },
    '/calculators/led-resistor-calculator': {
      en: '/calculators/led-resistor-calculator',
      es: '/calculadoras/calculadora-de-resistencia-led',
      fr: '/calculatrices/calculateur-de-resistance-led',
      de: '/rechner/led-widerstand-rechner'
    },
    '/calculators/power-supply-calculator': {
      en: '/calculators/power-supply-calculator',
      es: '/calculadoras/calculadora-de-fuente-de-alimentacion',
      fr: '/calculatrices/calculateur-d-alimentation-electrique',
      de: '/rechner/netzteil-rechner'
    },
    '/calculators/power-factor-calculator': {
      en: '/calculators/power-factor-calculator',
      es: '/calculadoras/calculadora-de-factor-de-potencia',
      fr: '/calculatrices/calculateur-de-facteur-de-puissance',
      de: '/rechner/leistungsfaktor-rechner'
    },
    '/calculators/battery-runtime-calculator': {
      en: '/calculators/battery-runtime-calculator',
      es: '/calculadoras/calculadora-de-autonomia-de-bateria',
      fr: '/calculatrices/calculateur-d-autonomie-de-batterie',
      de: '/rechner/batterielaufzeit-rechner'
    },
    '/calculators/ups-calculator': {
      en: '/calculators/ups-calculator',
      es: '/calculadoras/calculadora-de-ups',
      fr: '/calculatrices/calculateur-d-onduleur',
      de: '/rechner/usv-rechner'
    },
    '/calculators/inverter-calculator': {
      en: '/calculators/inverter-calculator',
      es: '/calculadoras/calculadora-de-inversor',
      fr: '/calculatrices/calculateur-d-onduleur-solaire',
      de: '/rechner/wechselrichter-rechner'
    },
    '/calculators/solar-panel-calculator': {
      en: '/calculators/solar-panel-calculator',
      es: '/calculadoras/calculadora-de-paneles-solares',
      fr: '/calculatrices/calculateur-de-panneau-solaire',
      de: '/rechner/solarpanel-rechner'
    },
    '/calculators/molarity-calculator': {
      en: '/calculators/molarity-calculator',
      es: '/calculadoras/calculadora-de-molaridad',
      fr: '/calculatrices/calculateur-de-molarite',
      de: '/rechner/molaritaets-rechner'
    },
    '/calculators/molality-calculator': {
      en: '/calculators/molality-calculator',
      es: '/calculadoras/calculadora-de-molalidad',
      fr: '/calculatrices/calculateur-de-molalite',
      de: '/rechner/molalitaets-rechner'
    },
    '/calculators/mole-calculator': {
      en: '/calculators/mole-calculator',
      es: '/calculadoras/calculadora-de-moles',
      fr: '/calculatrices/calculateur-de-moles',
      de: '/rechner/mol-rechner'
    },
    '/calculators/molar-mass-calculator': {
      en: '/calculators/molar-mass-calculator',
      es: '/calculadoras/calculadora-de-masa-molar',
      fr: '/calculatrices/calculateur-de-masse-molaire',
      de: '/rechner/molare-masse-rechner'
    },
    '/calculators/percent-composition-calculator': {
      en: '/calculators/percent-composition-calculator',
      es: '/calculadoras/calculadora-de-composicion-porcentual',
      fr: '/calculatrices/calculateur-de-composition-centesimale',
      de: '/rechner/prozentuale-zusammensetzung-rechner'
    },
    '/calculators/molarity-dilution-calculator': {
      en: '/calculators/molarity-dilution-calculator',
      es: '/calculadoras/calculadora-de-dilucion-de-molaridad',
      fr: '/calculatrices/calculateur-de-dilution-de-molarite',
      de: '/rechner/molaritaets-verduennungsrechner'
    },
    '/calculators/dilution-calculator': {
      en: '/calculators/dilution-calculator',
      es: '/calculadoras/calculadora-de-dilucion',
      fr: '/calculatrices/calculateur-de-dilution',
      de: '/rechner/verduennungsrechner'
    },
    '/calculators/stoichiometry-calculator': {
      en: '/calculators/stoichiometry-calculator',
      es: '/calculadoras/calculadora-de-estequiometria',
      fr: '/calculatrices/calculateur-de-stoechiometrie',
      de: '/rechner/stoechiometrie-rechner'
    },
    '/calculators/empirical-formula-calculator': {
      en: '/calculators/empirical-formula-calculator',
      es: '/calculadoras/calculadora-de-formula-empirica',
      fr: '/calculatrices/calculateur-de-formule-brute',
      de: '/rechner/empirische-formel-rechner'
    },
    '/calculators/molecular-formula-calculator': {
      en: '/calculators/molecular-formula-calculator',
      es: '/calculadoras/calculadora-de-formula-molecular',
      fr: '/calculatrices/calculateur-de-formule-moleculaire',
      de: '/rechner/molekuelformel-rechner'
    },
    '/calculators/balancing-chemical-equations-calculator': {
      en: '/calculators/balancing-chemical-equations-calculator',
      es: '/calculadoras/calculadora-de-balanceo-de-ecuaciones-quimicas',
      fr: '/calculatrices/calculateur-d-equilibrage-d-equations-chimiques',
      de: '/rechner/chemische-gleichungen-balancieren-rechner'
    },
    '/calculators/ph-calculator': {
      en: '/calculators/ph-calculator',
      es: '/calculadoras/calculadora-de-ph',
      fr: '/calculatrices/calculateur-de-ph',
      de: '/rechner/ph-wert-rechner'
    },
    '/calculators/poh-calculator': {
      en: '/calculators/poh-calculator',
      es: '/calculadoras/calculadora-de-poh',
      fr: '/calculatrices/calculateur-de-poh',
      de: '/rechner/poh-wert-rechner'
    },
    '/calculators/pka-calculator': {
      en: '/calculators/pka-calculator',
      es: '/calculadoras/calculadora-de-pka',
      fr: '/calculatrices/calculateur-de-pka',
      de: '/rechner/pka-wert-rechner'
    },
    '/calculators/henderson-hasselbalch-equation-calculator': {
      en: '/calculators/henderson-hasselbalch-equation-calculator',
      es: '/calculadoras/calculadora-de-ecuacion-de-henderson-hasselbalch',
      fr: '/calculatrices/calculateur-d-equation-de-henderson-hasselbalch',
      de: '/rechner/henderson-hasselbalch-gleichung-rechner'
    },
    '/calculators/buffer-calculator': {
      en: '/calculators/buffer-calculator',
      es: '/calculadoras/calculadora-de-tampon-quimico',
      fr: '/calculatrices/calculateur-de-tampon',
      de: '/rechner/puffer-rechner'
    },
    '/calculators/acid-base-calculator': {
      en: '/calculators/acid-base-calculator',
      es: '/calculadoras/calculadora-de-acido-base',
      fr: '/calculatrices/calculateur-acide-base',
      de: '/rechner/saeure-base-rechner'
    },
    '/calculators/ka-calculator': {
      en: '/calculators/ka-calculator',
      es: '/calculadoras/calculadora-de-ka',
      fr: '/calculatrices/calculateur-de-ka',
      de: '/rechner/ka-wert-rechner'
    },
    '/calculators/kb-calculator': {
      en: '/calculators/kb-calculator',
      es: '/calculadoras/calculadora-de-kb',
      fr: '/calculatrices/calculateur-de-kb',
      de: '/rechner/kb-wert-rechner'
    },
    '/calculators/equilibrium-constant-calculator': {
      en: '/calculators/equilibrium-constant-calculator',
      es: '/calculadoras/calculadora-de-constante-de-equilibrio',
      fr: '/calculatrices/calculateur-de-constante-d-equilibre',
      de: '/rechner/gleichgewichtskonstante-rechner'
    },
    '/calculators/ksp-calculator': {
      en: '/calculators/ksp-calculator',
      es: '/calculadoras/calculadora-de-ksp',
      fr: '/calculatrices/calculateur-de-ksp',
      de: '/rechner/ksp-rechner'
    },
    '/calculators/solubility-calculator': {
      en: '/calculators/solubility-calculator',
      es: '/calculadoras/calculadora-de-solubilidad',
      fr: '/calculatrices/calculateur-de-solubilite',
      de: '/rechner/loeslichkeitsrechner'
    },
    '/calculators/nernst-equation-calculator': {
      en: '/calculators/nernst-equation-calculator',
      es: '/calculadoras/calculadora-de-ecuacion-de-nernst',
      fr: '/calculatrices/calculateur-d-equation-de-nernst',
      de: '/rechner/nernst-gleichung-rechner'
    },
    '/calculators/electrochemical-cell-calculator': {
      en: '/calculators/electrochemical-cell-calculator',
      es: '/calculadoras/calculadora-de-celda-electroquimica',
      fr: '/calculatrices/calculateur-de-pile-electrochimique',
      de: '/rechner/elektrochemische-zelle-rechner'
    },
    '/calculators/cell-potential-calculator': {
      en: '/calculators/cell-potential-calculator',
      es: '/calculadoras/calculadora-de-potencial-de-celda',
      fr: '/calculatrices/calculateur-de-potentiel-de-pile',
      de: '/rechner/zellpotenzial-rechner'
    },
    '/calculators/faradays-law-calculator': {
      en: '/calculators/faradays-law-calculator',
      es: '/calculadoras/calculadora-de-ley-de-faraday',
      fr: '/calculatrices/calculateur-de-loi-de-faraday',
      de: '/rechner/faradaysches-gesetz-rechner'
    },
    '/calculators/electrolysis-calculator': {
      en: '/calculators/electrolysis-calculator',
      es: '/calculadoras/calculadora-de-electrolisis',
      fr: '/calculatrices/calculateur-d-electrolyse',
      de: '/rechner/elektrolyse-rechner'
    },
    '/calculators/gibbs-free-energy-calculator': {
      en: '/calculators/gibbs-free-energy-calculator',
      es: '/calculadoras/calculadora-de-energia-libre-de-gibbs',
      fr: '/calculatrices/calculateur-d-energie-libre-de-gibbs',
      de: '/rechner/gibbs-energie-rechner'
    },
    '/calculators/enthalpy-calculator': {
      en: '/calculators/enthalpy-calculator',
      es: '/calculadoras/calculadora-de-entalpia',
      fr: '/calculatrices/calculateur-d-enthalpie',
      de: '/rechner/enthalpie-rechner'
    },
    '/calculators/heat-of-reaction-calculator': {
      en: '/calculators/heat-of-reaction-calculator',
      es: '/calculadoras/calculadora-de-calor-de-reaccion',
      fr: '/calculatrices/calculateur-de-chaleur-de-reaction',
      de: '/rechner/reaktionswaerme-rechner'
    },
    '/calculators/hess-law-calculator': {
      en: '/calculators/hess-law-calculator',
      es: '/calculadoras/calculadora-de-ley-de-hess',
      fr: '/calculatrices/calculateur-de-loi-de-hess',
      de: '/rechner/hess-gesetz-rechner'
    },
    '/calculators/calorimetry-calculator': {
      en: '/calculators/calorimetry-calculator',
      es: '/calculadoras/calculadora-de-calorimetria',
      fr: '/calculatrices/calculateur-de-calorimetrie',
      de: '/rechner/kalorimetrie-rechner'
    },
    '/calculators/specific-heat-calculator': {
      en: '/calculators/specific-heat-calculator',
      es: '/calculadoras/calculadora-de-calor-especifico',
      fr: '/calculatrices/calculateur-de-chaleur-massique',
      de: '/rechner/spezifische-waerme-rechner'
    },
    '/calculators/ideal-gas-law-calculator': {
      en: '/calculators/ideal-gas-law-calculator',
      es: '/calculadoras/calculadora-de-ley-de-gases-ideales',
      fr: '/calculatrices/calculateur-de-loi-des-gaz-parfaits',
      de: '/rechner/ideales-gas-gesetz-rechner'
    },
    '/calculators/combined-gas-law-calculator': {
      en: '/calculators/combined-gas-law-calculator',
      es: '/calculadoras/calculadora-de-ley-combinada-de-gases',
      fr: '/calculatrices/calculateur-de-loi-combinee-des-gaz',
      de: '/rechner/kombiniertes-gas-gesetz-rechner'
    },
    '/calculators/boyles-law-calculator': {
      en: '/calculators/boyles-law-calculator',
      es: '/calculadoras/calculadora-de-ley-de-boyle',
      fr: '/calculatrices/calculateur-de-loi-de-boyle',
      de: '/rechner/boyle-mariotte-gesetz-rechner'
    },
    '/calculators/charles-law-calculator': {
      en: '/calculators/charles-law-calculator',
      es: '/calculadoras/calculadora-de-ley-de-charles',
      fr: '/calculatrices/calculateur-de-loi-de-charles',
      de: '/rechner/charles-gesetz-rechner'
    },
          '/calculators/t-test-calculator': {
        en: '/calculators/t-test-calculator',
        es: '/calculadoras/calculadora-prueba-t',
        fr: '/calculatrices/calculatrice-test-t',
        de: '/rechner/t-test-rechner'
      },
      '/calculators/confidence-interval-calculator': {
        en: '/calculators/confidence-interval-calculator',
        es: '/calculadoras/calculadora-de-intervalo-de-confianza',
        fr: '/calculatrices/calculateur-d-intervalle-de-confiance',
        de: '/rechner/konfidenzintervall-rechner'
      },
      '/calculators/variance-calculator': {
        en: '/calculators/variance-calculator',
        es: '/calculadoras/calculadora-de-varianza',
        fr: '/calculatrices/calculatrice-de-variance',
        de: '/rechner/varianz-rechner'
      },
      '/calculators/mean-calculator': {
        en: '/calculators/mean-calculator',
        es: '/calculadoras/calculadora-de-media',
        fr: '/calculatrices/calculatrice-de-moyenne',
        de: '/rechner/mittelwertrechner'
      },
      '/calculators/median-calculator': {
        en: '/calculators/median-calculator',
        es: '/calculadoras/calculadora-de-mediana',
        fr: '/calculatrices/calculatrice-de-mediane',
        de: '/rechner/median-rechner'
      },
      '/calculators/mode-calculator': {
        en: '/calculators/mode-calculator',
        es: '/calculadoras/calculadora-de-moda',
        fr: '/calculatrices/calculatrice-de-mode',
        de: '/rechner/modus-rechner'
      },
      '/calculators/irr-calculator': {
        en: '/calculators/irr-calculator',
        es: '/calculadoras/calculadora-tir',
        fr: '/calculatrices/calculatrice-tri',
        de: '/rechner/irr-rechner'
      },
      '/calculators/lease-calculator': {
        en: '/calculators/lease-calculator',
        es: '/calculadoras/calculadora-de-arrendamiento',
        fr: '/calculatrices/calculatrice-de-location',
        de: '/rechner/leasingrechner'
      },
      '/calculators/real-estate-calculator': {
        en: '/calculators/real-estate-calculator',
        es: '/calculadoras/calculadora-bienes-raices',
        fr: '/calculatrices/calculatrice-immobilier',
        de: '/rechner/immobilienrechner'
      },
      '/calculators/margin-calculator': {
        en: '/calculators/margin-calculator',
        es: '/calculadoras/calculadora-de-margen',
        fr: '/calculatrices/calculatrice-de-marge',
        de: '/rechner/margenrechner'
      },
      '/calculators/cash-back-vs-low-interest-calculator': {
        en: '/calculators/cash-back-vs-low-interest-calculator',
        es: '/calculadoras/calculadora-reembolso-vs-bajo-interes',
        fr: '/calculatrices/calculatrice-remise-en-argent-ou-taux-bas',
        de: '/rechner/cashback-oder-niedriger-zinssatz-rechner'
      },
      '/calculators/roth-ira-calculator': {
        en: '/calculators/roth-ira-calculator',
        es: '/calculadoras/calculadora-roth-ira',
        fr: '/calculatrices/calculatrice-roth-ira',
        de: '/rechner/roth-ira-rechner'
      },
      '/calculators/retirement-calculator': {
        en: '/calculators/retirement-calculator',
        es: '/calculadoras/calculadora-de-jubilacion',
        fr: '/calculatrices/calculatrice-de-retraite',
        de: '/rechner/rentenrechner'
      },
      '/calculators/amortization-calculator': {
        en: '/calculators/amortization-calculator',
        es: '/calculadoras/calculadora-de-amortizacion',
        fr: '/calculatrices/calculatrice-amortissement',
        de: '/rechner/tilgungsrechner'
      },
      '/calculators/investment-calculator': {
        en: '/calculators/investment-calculator',
        es: '/calculadoras/calculadora-de-inversiones',
        fr: '/calculatrices/calculatrice-investissement',
        de: '/rechner/investmentanlage-rechner'
      },
      '/calculators/inflation-calculator': {
        en: '/calculators/inflation-calculator',
        es: '/calculadoras/calculadora-de-inflacion',
        fr: '/calculatrices/calculatrice-inflation',
        de: '/rechner/inflationsrechner'
      },
      '/calculators/finance-calculator': {
        en: '/calculators/finance-calculator',
        es: '/calculadoras/calculadora-financiera',
        fr: '/calculatrices/calculatrice-financiere',
        de: '/rechner/finanzrechner'
      },
      '/calculators/estate-tax-calculator': {
        en: '/calculators/estate-tax-calculator',
        es: '/calculadoras/calculadora-de-impuestos-sucesorios',
        fr: '/calculatrices/calculateur-droits-de-succession',
        de: '/rechner/erbschaftssteuerrechner'
      },
      '/calculators/income-tax-calculator': {
        en: '/calculators/income-tax-calculator',
        es: '/calculadoras/calculadora-de-impuestos',
        fr: '/calculatrices/calculatrice-impot-revenu',
        de: '/rechner/einkommensteuer-rechner'
      },
      '/calculators/compound-interest-calculator': {
        en: '/calculators/compound-interest-calculator',
        es: '/calculadoras/calculadora-interes-compuesto',
        fr: '/calculatrices/calculatrice-interets-composes',
        de: '/rechner/zinseszinsrechner'
      },
      '/calculators/salary-calculator': {
        en: '/calculators/salary-calculator',
        es: '/calculadoras/calculadora-de-salario',
        fr: '/calculatrices/calculatrice-de-salaire',
        de: '/rechner/gehaltsrechner'
      },
      '/calculators/interest-rate-calculator': {
        en: '/calculators/interest-rate-calculator',
        es: '/calculadoras/calculadora-tasa-de-interes',
        fr: '/calculatrices/calculatrice-taux-interet',
        de: '/rechner/zinssatzrechner'
      },
      '/calculators/sales-tax-calculator': {
        en: '/calculators/sales-tax-calculator',
        es: '/calculadoras/calculadora-impuesto-ventas',
        fr: '/calculatrices/calculatrice-taxe-de-vente',
        de: '/rechner/umsatzsteuerrechner'
      },
      '/calculators/graphing-calculator': {
        en: '/calculators/graphing-calculator',
        es: '/calculadoras/calculadora-grafica',
        fr: '/calculatrices/calculatrice-graphique',
        de: '/rechner/grafikrechner'
      },
      '/calculators/scientific-calculator': {
        en: '/calculators/scientific-calculator',
        es: '/calculadoras/calculadora-cientifica',
        fr: '/calculatrices/calculatrice-scientifique',
        de: '/rechner/wissenschaftlicher-taschenrechner'
      },
      '/calculators/percentage-calculator': {
        en: '/calculators/percentage-calculator',
        es: '/calculadoras/calculadora-de-porcentajes',
        fr: '/calculatrices/calculatrice-de-pourcentage',
        de: '/rechner/prozentrechner'
      },
      '/calculators/triangle-calculator': {
        en: '/calculators/triangle-calculator',
        es: '/calculadoras/calculadora-de-triangulos',
        fr: '/calculatrices/calculatrice-de-triangle',
        de: '/rechner/dreiecksrechner'
      },
      '/calculators/standard-deviation-calculator': {
        en: '/calculators/standard-deviation-calculator',
        es: '/calculadoras/calculadora-de-desviacion-estandar',
        fr: '/calculatrices/calculatrice-decart-type',
        de: '/rechner/standardabweichungs-rechner'
      },
      '/calculators/calorie-calculator': {
        en: '/calculators/calorie-calculator',
        es: '/calculadoras/calculadora-de-calorias',
        fr: '/calculatrices/calculateur-de-calories',
        de: '/rechner/kalorienrechner'
      },
      '/calculators/body-fat-calculator': {
        en: '/calculators/body-fat-calculator',
        es: '/calculadoras/calculadora-de-grasa-corporal',
        fr: '/calculatrices/calculatrice-indice-masse-grasse',
        de: '/rechner/koerperfettanteil-rechner'
      },
      '/calculators/bmr-calculator': {
        en: '/calculators/bmr-calculator',
        es: '/calculadoras/calculadora-de-tmb',
        fr: '/calculatrices/calculateur-de-metabolisme-de-base',
        de: '/rechner/grundumsatzrechner'
      },
      '/calculators/ideal-weight-calculator': {
        en: '/calculators/ideal-weight-calculator',
        es: '/calculadoras/calculadora-de-peso-ideal',
        fr: '/calculatrices/calculateur-de-poids-ideal',
        de: '/rechner/idealgewicht-rechner'
      },
      '/calculators/pace-calculator': {
        en: '/calculators/pace-calculator',
        es: '/calculadoras/calculadora-de-ritmo',
        fr: '/calculatrices/calculateur-allure',
        de: '/rechner/pace-rechner'
      },
      '/calculators/ovulation-calculator': {
        en: '/calculators/ovulation-calculator',
        es: '/calculadoras/calculadora-de-ovulacion',
        fr: '/calculatrices/calculateur-d-ovulation',
        de: '/rechner/eisprungrechner'
      },
      '/calculators/pregnancy-calculator': {
        en: '/calculators/pregnancy-calculator',
        es: '/calculadoras/calculadora-de-embarazo',
        fr: '/calculatrices/calculateur-de-grossesse',
        de: '/rechner/schwangerschaftsrechner'
      },
      '/calculators/pregnancy-conception-calculator': {
        en: '/calculators/pregnancy-conception-calculator',
        es: '/calculadoras/calculadora-de-concepcion',
        fr: '/calculatrices/calculateur-de-date-de-conception',
        de: '/rechner/empfaengnisrechner'
      },
      '/calculators/due-date-calculator': {
        en: '/calculators/due-date-calculator',
        es: '/calculadoras/calculadora-de-fecha-de-parto',
        fr: '/calculatrices/calculateur-de-date-d-accouchement',
        de: '/rechner/geburtsterminrechner'
      },
      '/calculators/date-calculator': {
        en: '/calculators/date-calculator',
        es: '/calculadoras/calculadora-de-fechas',
        fr: '/calculatrices/calculateur-de-date',
        de: '/rechner/datumsrechner'
      },
      '/calculators/time-calculator': {
        en: '/calculators/time-calculator',
        es: '/calculadoras/calculadora-de-tiempo',
        fr: '/calculatrices/calculateur-de-temps',
        de: '/rechner/zeitrechner'
      },
      '/calculators/hours-calculator': {
        en: '/calculators/hours-calculator',
        es: '/calculadoras/calculadora-de-horas',
        fr: '/calculatrices/calculateur-d-heures',
        de: '/rechner/stundenrechner'
      },
      '/calculators/gpa-calculator': {
        en: '/calculators/gpa-calculator',
        es: '/calculadoras/calculadora-de-gpa',
        fr: '/calculatrices/calculateur-de-gpa',
        de: '/rechner/gpa-rechner'
      },
      '/calculators/grade-calculator': {
        en: '/calculators/grade-calculator',
        es: '/calculadoras/calculadora-de-calificaciones',
        fr: '/calculatrices/calculateur-de-notes',
        de: '/rechner/notenrechner'
      },
      '/calculators/concrete-calculator': {
        en: '/calculators/concrete-calculator',
        es: '/calculadoras/calculadora-de-concreto',
        fr: '/calculatrices/calculateur-de-beton',
        de: '/rechner/betonrechner'
      },
      '/calculators/scientific-notation-calculator': {
        en: '/calculators/scientific-notation-calculator',
        es: '/calculadoras/calculadora-de-notacion-cientifica',
        fr: '/calculatrices/calculatrice-de-notation-scientifique',
        de: '/rechner/wissenschaftliche-schreibweise-rechner'
      },
      '/calculators/statistics-calculator': {
        en: '/calculators/statistics-calculator',
        es: '/calculadoras/calculadora-estadistica',
        fr: '/calculatrices/calculatrice-statistique',
        de: '/rechner/statistik-rechner'
      },
      '/calculators/fraction-calculator': {
        en: '/calculators/fraction-calculator',
        es: '/calculadoras/calculadora-de-fracciones',
        fr: '/calculatrices/calculatrice-de-fractions',
        de: '/rechner/bruchrechner'
      },
      '/calculators/auto-loan-calculator': {
        en: '/calculators/auto-loan-calculator',
        es: '/calculadoras/calculadora-prestamo-auto',
        fr: '/calculatrices/calculatrice-pret-auto',
        de: '/rechner/autokreditrechner'
      },
      '/calculators/payment-calculator': {
        en: '/calculators/payment-calculator',
        es: '/calculadoras/calculadora-de-pagos',
        fr: '/calculatrices/calculatrice-de-paiement',
        de: '/rechner/zahlungsrechner'
      },
      '/calculators/interest-calculator': {
        en: '/calculators/interest-calculator',
        es: '/calculadoras/calculadora-de-interes',
        fr: '/calculatrices/calculatrice-interets',
        de: '/rechner/zinsrechner'
      },
      '/calculators/student-loan-calculator': {
        en: '/calculators/student-loan-calculator',
        es: '/calculadoras/calculadora-prestamos-estudiantiles',
        fr: '/calculatrices/calculatrice-pret-etudiant',
        de: '/rechner/studienkredit-rechner'
      },
      '/calculators/depreciation-calculator': {
        en: '/calculators/depreciation-calculator',
        es: '/calculadoras/calculadora-depreciacion',
        fr: '/calculatrices/calculateur-amortissement',
        de: '/rechner/abschreibungsrechner'
      },
      '/calculators/business-loan-calculator': {
        en: '/calculators/business-loan-calculator',
        es: '/calculadoras/calculadora-prestamos-comerciales',
        fr: '/calculatrices/calculateur-pret-professionnel',
        de: '/rechner/firmenkredit-rechner'
      },
      '/calculators/personal-loan-calculator': {
        en: '/calculators/personal-loan-calculator',
        es: '/calculadoras/calculadora-prestamos-personales',
        fr: '/calculatrices/calculateur-pret-personnel',
        de: '/rechner/privatkredit-rechner'
      },
      '/calculators/budget-calculator': {
        en: '/calculators/budget-calculator',
        es: '/calculadoras/calculadora-presupuesto',
        fr: '/calculatrices/calculateur-budget',
        de: '/rechner/budgetrechner'
      },
      '/calculators/apr-calculator': {
        en: '/calculators/apr-calculator',
        es: '/calculadoras/calculadora-tae',
        fr: '/calculatrices/calculateur-taeg',
        de: '/rechner/effektivzins-rechner'
      },
      '/calculators/heloc-calculator': {
        en: '/calculators/heloc-calculator',
        es: '/calculadoras/calculadora-heloc',
        fr: '/calculatrices/calculateur-heloc',
        de: '/rechner/heloc-rechner'
      },
      '/calculators/present-value-calculator': {
        en: '/calculators/present-value-calculator',
        es: '/calculadoras/calculadora-valor-presente',
        fr: '/calculatrices/calculateur-valeur-actuelle',
        de: '/rechner/barwertrechner'
      },
      '/calculators/percent-off-calculator': {
        en: '/calculators/percent-off-calculator',
        es: '/calculadoras/calculadora-descuento',
        fr: '/calculatrices/calculateur-pourcentage-reduction',
        de: '/rechner/prozentsatz-rabatt-rechner'
      },
      '/calculators/401k-calculator': {
        en: '/calculators/401k-calculator',
        es: '/calculadoras/calculadora-401k',
        fr: '/calculatrices/calculateur-401k',
        de: '/rechner/401k-rechner'
      },
      '/calculators/marriage-tax-calculator': {
        en: '/calculators/marriage-tax-calculator',
        es: '/calculadoras/calculadora-impuesto-matrimonio',
        fr: '/calculatrices/calculateur-impot-mariage',
        de: '/rechner/heiratsstrafe-rechner'
      },
      '/calculators/annuity-calculator': {
        en: '/calculators/annuity-calculator',
        es: '/calculadoras/calculadora-anualidad',
        fr: '/calculatrices/calculateur-rente',
        de: '/rechner/rentenrechner'
      },
      '/calculators/annuity-payout-calculator': {
        en: '/calculators/annuity-payout-calculator',
        es: '/calculadoras/calculadora-de-pagos-de-anualidades',
        fr: '/calculatrices/calculateur-de-versement-de-rente',
        de: '/rechner/rentenauszahlungsrechner'
      },
      '/calculators/simple-interest-calculator': {
        en: '/calculators/simple-interest-calculator',
        es: '/calculadoras/calculadora-de-interes-simple',
        fr: '/calculatrices/calculateur-d-interet-simple',
        de: '/rechner/einfacher-zinsrechner'
      },
      '/calculators/debt-consolidation-calculator': {
        en: '/calculators/debt-consolidation-calculator',
        es: '/calculadoras/calculadora-de-consolidacion-de-deuda',
        fr: '/calculatrices/calculateur-de-consolidation-de-dettes',
        de: '/rechner/schuldenkonsolidierungsrechner'
      },
      '/calculators/debt-payoff-calculator': {
        en: '/calculators/debt-payoff-calculator',
        es: '/calculadoras/calculadora-pago-deudas',
        fr: '/calculatrices/calculateur-remboursement-dette',
        de: '/rechner/schulden-tilgungs-rechner'
      },
      '/calculators/college-cost-calculator': {
        en: '/calculators/college-cost-calculator',
        es: '/calculadoras/calculadora-costo-universidad',
        fr: '/calculatrices/calculateur-cout-etudes',
        de: '/rechner/studienkostenrechner'
      },
      '/calculators/mutual-fund-calculator': {
        en: '/calculators/mutual-fund-calculator',
        es: '/calculadoras/calculadora-fondos-mutuos',
        fr: '/calculatrices/calculateur-fonds-communs',
        de: '/rechner/investmentfonds-rechner'
      },
      '/calculators/vat-calculator': {
        en: '/calculators/vat-calculator',
        es: '/calculadoras/calculadora-iva',
        fr: '/calculatrices/calculateur-tva',
        de: '/rechner/mehrwertsteuer-rechner'
      },
      '/calculators/rmd-calculator': {
        en: '/calculators/rmd-calculator',
        es: '/calculadoras/calculadora-rmd',
        fr: '/calculatrices/calculateur-rmd',
        de: '/rechner/rmd-rechner'
      },
      '/calculators/bond-calculator': {
        en: '/calculators/bond-calculator',
        es: '/calculadoras/calculadora-de-bonos',
        fr: '/calculatrices/calculateur-d-obligations',
        de: '/rechner/anleihenrechner'
      },
      '/calculators/p-value-calculator': {
        en: '/calculators/p-value-calculator',
        es: '/calculadoras/calculadora-de-valor-p',
        fr: '/calculatrices/calculateur-de-valeur-p',
        de: '/rechner/p-wert-rechner'
      },
      '/calculators/average-return-calculator': {
        en: '/calculators/average-return-calculator',
        es: '/calculadoras/calculadora-rendimiento-promedio',
        fr: '/calculatrices/calculateur-rendement-moyen',
        de: '/rechner/durchschnittliche-rendite-rechner'
      },
      '/calculators/debt-to-income-ratio-calculator': {
        en: '/calculators/debt-to-income-ratio-calculator',
        es: '/calculadoras/calculadora-ratio-deuda-ingreso',
        fr: '/calculatrices/calculateur-ratio-endettement',
        de: '/rechner/schulden-einkommens-verhaeltnis-rechner'
      },
      '/calculators/boat-loan-calculator': {
        en: '/calculators/boat-loan-calculator',
        es: '/calculadoras/calculadora-prestamo-barco',
        fr: '/calculatrices/calculateur-pret-bateau',
        de: '/rechner/bootskredit-rechner'
      },
      '/calculators/rental-property-calculator': {
        en: '/calculators/rental-property-calculator',
        es: '/calculadoras/calculadora-propiedad-alquiler',
        fr: '/calculatrices/calculateur-propriete-locative',
        de: '/rechner/mietobjekt-rechner'
      },
      '/calculators/fha-loan-calculator': {
        en: '/calculators/fha-loan-calculator',
        es: '/calculadoras/calculadora-prestamo-fha',
        fr: '/calculatrices/calculateur-pret-fha',
        de: '/rechner/fha-kredit-rechner'
      },
      '/calculators/down-payment-calculator': {
        en: '/calculators/down-payment-calculator',
        es: '/calculadoras/calculadora-pago-inicial',
        fr: '/calculatrices/calculateur-apport-initial',
        de: '/rechner/anzahlung-rechner'
      },
      '/calculators/future-value-calculator': {
        en: '/calculators/future-value-calculator',
        es: '/calculadoras/calculadora-valor-futuro',
        fr: '/calculatrices/calculateur-valeur-future',
        de: '/rechner/zukunftswert-rechner'
      },
      '/calculators/mortgage-amortization-calculator': {
        en: '/calculators/mortgage-amortization-calculator',
        es: '/calculadoras/calculadora-amortizacion-hipoteca',
        fr: '/calculatrices/calculateur-amortissement-hypothecaire',
        de: '/rechner/hypothekentilgung-rechner'
      },
      '/calculators/house-affordability-calculator': {
        en: '/calculators/house-affordability-calculator',
        es: '/calculadoras/calculadora-asequibilidad-vivienda',
        fr: '/calculatrices/calculateur-abordabilite-maison',
        de: '/rechner/haus-erschwinglichkeits-rechner'
      },
      '/calculators/binary-calculator': {
        en: '/calculators/binary-calculator',
        es: '/calculadoras/calculadora-binaria',
        fr: '/calculatrices/calculatrice-binaire',
        de: '/rechner/binarrechner'
      },
      '/calculators/healthy-weight-calculator': {
        en: '/calculators/healthy-weight-calculator',
        es: '/calculadoras/calculadora-de-peso-saludable',
        fr: '/calculatrices/calculateur-de-poids-sante',
        de: '/rechner/gesundes-gewicht-rechner'
      },
      '/calculators/va-mortgage-calculator': {
        en: '/calculators/va-mortgage-calculator',
        es: '/calculadoras/calculadora-de-hipotecas-va',
        fr: '/calculatrices/calculateur-de-pret-hypothecaire-va',
        de: '/rechner/va-hypothekenrechner'
      },
      '/calculators/rent-vs-buy-calculator': {
        en: '/calculators/rent-vs-buy-calculator',
        es: '/calculadoras/calculadora-alquilar-vs-comprar',
        fr: '/calculatrices/calculateur-louer-vs-acheter',
        de: '/rechner/mieten-vs-kaufen-rechner'
      },
      '/calculators/commission-calculator': {
        en: '/calculators/commission-calculator',
        es: '/calculadoras/calculadora-de-comisiones',
        fr: '/calculatrices/calculateur-de-commission',
        de: '/rechner/provisionsrechner'
      },
      '/calculators/mortgage-payoff-calculator': {
        en: '/calculators/mortgage-payoff-calculator',
        es: '/calculadoras/calculadora-pago-hipoteca',
        fr: '/calculatrices/calculateur-remboursement-hypothecaire',
        de: '/rechner/hypotheken-tilgungsrechner'
      },
      '/calculators/advanced-sleep-cycle-calculator': {
        en: '/calculators/advanced-sleep-cycle-calculator',
        es: '/calculadoras/calculadora-avanzada-ciclo-de-sueno',
        fr: '/calculatrices/calculatrice-avancee-cycle-de-sommeil',
        de: '/rechner/erweiterter-schlafzyklus-rechner'
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
    },

    // ── Data Privacy Platform ────────────────────────────────────────────────
    '/database-privacy': '/database-privacy',
    '/database-privacy/login': '/database-privacy/login',
    '/database-privacy/signup': '/database-privacy/signup',
    '/database-privacy/dashboard': '/database-privacy/dashboard',
    '/database-privacy/scanner': '/database-privacy/scanner',
    '/database-privacy/scanner/findings': '/database-privacy/scanner/findings',
    '/database-privacy/masking/rules': '/database-privacy/masking/rules',
    '/database-privacy/masking/templates': '/database-privacy/masking/templates',
    '/database-privacy/masking/marketplace': '/database-privacy/masking/marketplace',
    '/database-privacy/masking/preview': '/database-privacy/masking/preview',
    '/database-privacy/anonymize': '/database-privacy/anonymize',
    '/database-privacy/connections': '/database-privacy/connections',
    '/database-privacy/explorer': '/database-privacy/explorer',
    '/database-privacy/projects': '/database-privacy/projects',
    '/database-privacy/organizations': '/database-privacy/organizations',
    '/database-privacy/jobs': '/database-privacy/jobs',
    '/database-privacy/jobs/history': '/database-privacy/jobs/history',
    '/database-privacy/jobs/scheduler': '/database-privacy/jobs/scheduler',
    '/database-privacy/compliance': '/database-privacy/compliance',
    '/database-privacy/reports': '/database-privacy/reports',
    '/database-privacy/audit': '/database-privacy/audit',
    '/database-privacy/import': '/database-privacy/import',
    '/database-privacy/export': '/database-privacy/export',
    '/database-privacy/api-keys': '/database-privacy/api-keys',
    '/database-privacy/secrets': '/database-privacy/secrets',
    '/database-privacy/webhooks': '/database-privacy/webhooks',
    '/database-privacy/users': '/database-privacy/users',
    '/database-privacy/users/roles': '/database-privacy/users/roles',
    '/database-privacy/monitoring': '/database-privacy/monitoring',
    '/database-privacy/monitoring/workers': '/database-privacy/monitoring/workers',
    '/database-privacy/monitoring/queue': '/database-privacy/monitoring/queue',
    '/database-privacy/settings': '/database-privacy/settings'
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
    return { pathname: hrefStr as any };
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
  
  return { pathname: hrefStr as any };
}
