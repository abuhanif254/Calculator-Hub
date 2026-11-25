// ═══════════════════════════════════════════════════════════════════════
// lib/data/formulas/physicsChemFormulas.ts
// 28 verified, 4-language (EN / ES / FR / DE) Physics, Electrical
// Engineering, and Chemistry mathematical models.
// ═══════════════════════════════════════════════════════════════════════

import type { CalculatorFormulaDef } from './types';

export const physicsChemFormulas: CalculatorFormulaDef[] = [
  // 1. Velocity
  {
    slugs: ['velocity-calculator'],
    name: 'Average & Uniformly Accelerated Velocity Formulas',
    formula: 'v = Δd / Δt  |  v = v₀ + a·t',
    latex: 'v = \\frac{\\Delta d}{\\Delta t}, \\quad v = v_0 + a t',
    variables: [
      { symbol: 'v', name: 'Velocity', description: 'Speed with direction in meters per second (m/s)' },
      { symbol: 'Δd', name: 'Displacement', description: 'Net change in position (m)' },
      { symbol: 'Δt', name: 'Time Interval', description: 'Elapsed duration (s)' },
      { symbol: 'a', name: 'Acceleration', description: 'Constant rate of velocity change (m/s²)' },
    ],
    stepByStep: '1. Divide net displacement Δd by elapsed time Δt for average velocity. 2. Under constant acceleration, add (a × t) to initial velocity v₀.',
    faq: {
      question: 'What is the formula for calculating velocity?',
      answer: 'Average velocity is v = Δd / Δt. For uniformly accelerated motion, final velocity is v = v₀ + at.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Velocidad Media y Aceleración Uniforme',
        variables: [
          { symbol: 'v', name: 'Velocidad', description: 'Rapidez direccional en metros por segundo (m/s)' },
          { symbol: 'Δd', name: 'Desplazamiento', description: 'Cambio neto de posición (m)' },
          { symbol: 'Δt', name: 'Intervalo de Tiempo', description: 'Duración transcurrida (s)' },
          { symbol: 'a', name: 'Aceleración', description: 'Tasa constante de cambio de velocidad (m/s²)' },
        ],
        stepByStep: '1. Divida el desplazamiento Δd entre el tiempo Δt para velocidad media. 2. Con aceleración constante, sume (a × t) a la velocidad inicial v₀.',
      },
      fr: {
        name: 'Formules de Vitesse Moyenne et Mouvement Accéléré',
        variables: [
          { symbol: 'v', name: 'Vitesse', description: 'Vitesse en mètres par seconde (m/s)' },
          { symbol: 'Δd', name: 'Déplacement', description: 'Variation de position (m)' },
          { symbol: 'Δt', name: 'Durée', description: 'Temps écoulé (s)' },
          { symbol: 'a', name: 'Accélération', description: 'Variation de vitesse par seconde (m/s²)' },
        ],
        stepByStep: '1. Divisez le déplacement Δd par la durée Δt pour la vitesse moyenne. 2. À accélération constante, ajoutez (a × t) à la vitesse initiale v₀.',
      },
      de: {
        name: 'Geschwindigkeitsformeln (Gleichförmig & Beschleunigt)',
        variables: [
          { symbol: 'v', name: 'Geschwindigkeit', description: 'Geschwindigkeit in Metern pro Sekunde (m/s)' },
          { symbol: 'Δd', name: 'Wegstrecke', description: 'Positionsänderung in Metern (m)' },
          { symbol: 'Δt', name: 'Zeitspanne', description: 'Verstrichene Zeit in Sekunden (s)' },
          { symbol: 'a', name: 'Beschleunigung', description: 'Konstante Beschleunigung in m/s²' },
        ],
        stepByStep: '1. Wegstrecke Δd durch Zeit Δt teilen für die Durchschnittsgeschwindigkeit. 2. Bei konstanter Beschleunigung v₀ + a·t berechnen.',
      },
    },
  },

  // 2. Acceleration
  {
    slugs: ['acceleration-calculator'],
    name: 'Acceleration Kinematics Formula',
    formula: 'a = (v_f - v_i) / t  |  a = F / m',
    latex: 'a = \\frac{v_f - v_i}{t} = \\frac{F}{m}',
    variables: [
      { symbol: 'a', name: 'Acceleration', description: 'Rate of velocity change in m/s²' },
      { symbol: 'v_f', name: 'Final Velocity', description: 'Ending velocity (m/s)' },
      { symbol: 'v_i', name: 'Initial Velocity', description: 'Starting velocity (m/s)' },
      { symbol: 't', name: 'Elapsed Time', description: 'Duration of velocity change (s)' },
    ],
    stepByStep: '1. Subtract initial velocity v_i from final velocity v_f. 2. Divide Δv by elapsed time t (or divide net force F by mass m).',
    faq: {
      question: 'What is the formula for acceleration?',
      answer: 'Acceleration equals change in velocity divided by elapsed time: a = (v_f - v_i) / t, or from Newton’s Second Law, a = F / m.',
    },
    translations: {
      es: {
        name: 'Fórmula Cinemática de la Aceleración',
        variables: [
          { symbol: 'a', name: 'Aceleración', description: 'Cambio de velocidad por segundo (m/s²)' },
          { symbol: 'v_f', name: 'Velocidad Final', description: 'Velocidad al final del intervalo (m/s)' },
          { symbol: 'v_i', name: 'Velocidad Inicial', description: 'Velocidad de partida (m/s)' },
          { symbol: 't', name: 'Tiempo', description: 'Duración del cambio (s)' },
        ],
        stepByStep: '1. Reste la velocidad inicial v_i a la velocidad final v_f. 2. Divida la diferencia entre el tiempo t (o divida fuerza F entre masa m).',
      },
      fr: {
        name: 'Formule Cinématique de l’Accélération',
        variables: [
          { symbol: 'a', name: 'Accélération', description: 'Taux de variation de la vitesse (m/s²)' },
          { symbol: 'v_f', name: 'Vitesse Finale', description: 'Vitesse en fin de parcours (m/s)' },
          { symbol: 'v_i', name: 'Vitesse Initiale', description: 'Vitesse de départ (m/s)' },
          { symbol: 't', name: 'Temps Écoulé', description: 'Durée en secondes (s)' },
        ],
        stepByStep: '1. Soustrayez la vitesse initiale v_i de la vitesse finale v_f. 2. Divisez par la durée t (ou divisez la force nette F par la masse m).',
      },
      de: {
        name: 'Beschleunigungsformel (Kinematik & Dynamik)',
        variables: [
          { symbol: 'a', name: 'Beschleunigung', description: 'Geschwindigkeitsänderung pro Sekunde (m/s²)' },
          { symbol: 'v_f', name: 'Endgeschwindigkeit', description: 'Geschwindigkeit am Ende (m/s)' },
          { symbol: 'v_i', name: 'Anfangsgeschwindigkeit', description: 'Startgeschwindigkeit (m/s)' },
          { symbol: 't', name: 'Zeitspanne', description: 'Dauer in Sekunden (s)' },
        ],
        stepByStep: '1. Anfangsgeschwindigkeit v_i von Endgeschwindigkeit v_f subtrahieren. 2. Durch Zeit t teilen (oder Nettokraft F durch Masse m).',
      },
    },
  },

  // 3. Newton's Second Law (Force)
  {
    slugs: ['force-calculator'],
    name: 'Newton’s Second Law of Motion Formula',
    formula: 'F = m × a',
    latex: 'F = m \\cdot a',
    variables: [
      { symbol: 'F', name: 'Net Force', description: 'Force in Newtons (1 N = 1 kg·m/s²)' },
      { symbol: 'm', name: 'Mass', description: 'Object inertial mass in kilograms (kg)' },
      { symbol: 'a', name: 'Acceleration', description: 'Linear acceleration in m/s²' },
    ],
    stepByStep: '1. Express mass in kilograms and acceleration in m/s². 2. Multiply m × a to compute net force in Newtons.',
    faq: {
      question: 'What is Newton’s Second Law formula for force?',
      answer: 'Newton’s Second Law states F = m × a, where F is net force in Newtons (N), m is mass in kilograms (kg), and a is acceleration in m/s².',
    },
    translations: {
      es: {
        name: 'Segunda Ley de Newton (Fórmula de la Fuerza)',
        variables: [
          { symbol: 'F', name: 'Fuerza Neta', description: 'Fuerza resultante en Newtons (N = kg·m/s²)' },
          { symbol: 'm', name: 'Masa', description: 'Masa del cuerpo en kilogramos (kg)' },
          { symbol: 'a', name: 'Aceleración', description: 'Aceleración lineal en m/s²' },
        ],
        stepByStep: '1. Convierta la masa a kg y la aceleración a m/s². 2. Multiplique m × a para obtener la fuerza en Newtons.',
      },
      fr: {
        name: 'Deuxième Loi de Newton (Formule de la Force)',
        variables: [
          { symbol: 'F', name: 'Force Nette', description: 'Force résultante en Newtons (N = kg·m/s²)' },
          { symbol: 'm', name: 'Masse', description: 'Masse du solide en kilogrammes (kg)' },
          { symbol: 'a', name: 'Accélération', description: 'Accélération en m/s²' },
        ],
        stepByStep: '1. Exprimez la masse en kg et l’accélération en m/s². 2. Multipliez m × a pour obtenir la force en Newtons.',
      },
      de: {
        name: 'Zweites Newtonsches Gesetz (Kraftformel)',
        variables: [
          { symbol: 'F', name: 'Resultierende Kraft', description: 'Kraft in Newton (1 N = 1 kg·m/s²)' },
          { symbol: 'm', name: 'Masse', description: 'Masse des Körpers in Kilogramm (kg)' },
          { symbol: 'a', name: 'Beschleunigung', description: 'Beschleunigung in m/s²' },
        ],
        stepByStep: '1. Masse in kg und Beschleunigung in m/s² einsetzen. 2. Produkt m × a ergibt die Kraft in Newton.',
      },
    },
  },

  // 4. Kinetic Energy
  {
    slugs: ['kinetic-energy-calculator'],
    name: 'Translational Kinetic Energy Formula',
    formula: 'KE = ½ m v²',
    latex: 'KE = \\frac{1}{2} m v^2',
    variables: [
      { symbol: 'KE', name: 'Kinetic Energy', description: 'Energy of motion in Joules (J)' },
      { symbol: 'm', name: 'Mass', description: 'Object mass in kilograms (kg)' },
      { symbol: 'v', name: 'Velocity', description: 'Speed in meters per second (m/s)' },
    ],
    stepByStep: '1. Square the speed v². 2. Multiply by mass m in kg. 3. Divide by 2 to get Joules (doubling speed quadruples kinetic energy).',
    faq: {
      question: 'What is the kinetic energy formula?',
      answer: 'Translational kinetic energy is KE = ½ m v², measured in Joules (J) when mass is in kilograms and velocity is in m/s.',
    },
    translations: {
      es: {
        name: 'Fórmula de la Energía Cinética',
        variables: [
          { symbol: 'KE', name: 'Energía Cinética', description: 'Energía del movimiento en Julios (J)' },
          { symbol: 'm', name: 'Masa', description: 'Masa del objeto en kilogramos (kg)' },
          { symbol: 'v', name: 'Velocidad', description: 'Rapidez en metros por segundo (m/s)' },
        ],
        stepByStep: '1. Eleve la velocidad al cuadrado (v²). 2. Multiplique por la masa m. 3. Divida entre 2 para obtener Julios.',
      },
      fr: {
        name: 'Formule de l’Énergie Cinétique',
        variables: [
          { symbol: 'KE', name: 'Énergie Cinétique', description: 'Énergie liée au mouvement en Joules (J)' },
          { symbol: 'm', name: 'Masse', description: 'Masse du mobile en kilogrammes (kg)' },
          { symbol: 'v', name: 'Vitesse', description: 'Vitesse en mètres par seconde (m/s)' },
        ],
        stepByStep: '1. Élevez la vitesse au carré (v²). 2. Multipliez par la masse m. 3. Divisez par 2 pour obtenir des Joules.',
      },
      de: {
        name: 'Formel für die Kinetische Energie (Bewegungsenergie)',
        variables: [
          { symbol: 'KE', name: 'Kinetische Energie', description: 'Bewegungsenergie in Joule (J)' },
          { symbol: 'm', name: 'Masse', description: 'Masse in Kilogramm (kg)' },
          { symbol: 'v', name: 'Geschwindigkeit', description: 'Geschwindigkeit in Metern pro Sekunde (m/s)' },
        ],
        stepByStep: '1. Geschwindigkeit quadrieren (v²). 2. Mit Masse m multiplizieren. 3. Durch 2 teilen ergibt Joule.',
      },
    },
  },

  // 5. Potential Energy
  {
    slugs: ['potential-energy-calculator'],
    name: 'Gravitational Potential Energy Formula',
    formula: 'PE = m × g × h',
    latex: 'PE = m g h',
    variables: [
      { symbol: 'PE', name: 'Potential Energy', description: 'Stored gravitational energy in Joules (J)' },
      { symbol: 'm', name: 'Mass', description: 'Object mass in kilograms (kg)' },
      { symbol: 'g', name: 'Gravity', description: 'Standard Earth gravity (9.80665 m/s²)' },
      { symbol: 'h', name: 'Height', description: 'Elevation above reference datum in meters (m)' },
    ],
    stepByStep: '1. Multiply mass in kg by standard gravity g (9.80665 m/s²). 2. Multiply by vertical height h in meters.',
    faq: {
      question: 'How do you calculate gravitational potential energy?',
      answer: 'Gravitational potential energy is PE = m × g × h, where m is mass (kg), g = 9.80665 m/s², and h is height (m).',
    },
    translations: {
      es: {
        name: 'Fórmula de la Energía Potencial Gravitatoria',
        variables: [
          { symbol: 'PE', name: 'Energía Potencial', description: 'Energía almacenada por altura en Julios (J)' },
          { symbol: 'm', name: 'Masa', description: 'Masa en kilogramos (kg)' },
          { symbol: 'g', name: 'Gravedad', description: 'Aceleración gravitatoria estándar (9,80665 m/s²)' },
          { symbol: 'h', name: 'Altura', description: 'Elevación vertical en metros (m)' },
        ],
        stepByStep: '1. Multiplique la masa en kg por la gravedad g (9,81 m/s²). 2. Multiplique por la altura h en metros.',
      },
      fr: {
        name: 'Formule de l’Énergie Potentielle de Pesanteur',
        variables: [
          { symbol: 'PE', name: 'Énergie Potentielle', description: 'Énergie emmagasinée en Joules (J)' },
          { symbol: 'm', name: 'Masse', description: 'Masse en kilogrammes (kg)' },
          { symbol: 'g', name: 'Pesanteur', description: 'Intensité standard de pesanteur (9,80665 m/s²)' },
          { symbol: 'h', name: 'Hauteur', description: 'Altitude relative en mètres (m)' },
        ],
        stepByStep: '1. Multipliez la masse m par g (9,81 m/s²). 2. Multipliez par l’altitude h en mètres.',
      },
      de: {
        name: 'Formel für die Potenzielle Energie (Lageenergie)',
        variables: [
          { symbol: 'PE', name: 'Potenzielle Energie', description: 'Gespeicherte Lageenergie in Joule (J)' },
          { symbol: 'm', name: 'Masse', description: 'Masse in Kilogramm (kg)' },
          { symbol: 'g', name: 'Erdbeschleunigung', description: 'Normfallbeschleunigung (9,80665 m/s²)' },
          { symbol: 'h', name: 'Höhe', description: 'Höhendifferenz in Metern (m)' },
        ],
        stepByStep: '1. Masse m mit Erdbeschleunigung g (9,81 m/s²) multiplizieren. 2. Mit Höhe h in Metern multiplizieren.',
      },
    },
  },

  // 6. Linear Momentum
  {
    slugs: ['momentum-calculator'],
    name: 'Linear Momentum & Impulse Formula',
    formula: 'p = m × v  |  J = Δp = F × Δt',
    latex: 'p = m v, \\quad J = \\Delta p = F \\Delta t',
    variables: [
      { symbol: 'p', name: 'Linear Momentum', description: 'Vector momentum in kg·m/s' },
      { symbol: 'm', name: 'Mass', description: 'Object mass in kg' },
      { symbol: 'v', name: 'Velocity', description: 'Velocity in m/s' },
    ],
    stepByStep: '1. Multiply mass m (kg) by velocity v (m/s). 2. In isolated collisions, total momentum Σ(m·v) before equals total momentum after.',
    faq: {
      question: 'What is the formula for linear momentum?',
      answer: 'Linear momentum is p = m × v (kg·m/s), and impulse equals change in momentum J = F × Δt = Δp.',
    },
    translations: {
      es: {
        name: 'Fórmula de Cantidad de Movimiento (Momento Lineal) e Impulso',
        variables: [
          { symbol: 'p', name: 'Momento Lineal', description: 'Cantidad de movimiento en kg·m/s' },
          { symbol: 'm', name: 'Masa', description: 'Masa del cuerpo en kg' },
          { symbol: 'v', name: 'Velocidad', description: 'Velocidad en m/s' },
        ],
        stepByStep: '1. Multiplique masa m (kg) por velocidad v (m/s). 2. En colisiones aisladas, el momento total se conserva.',
      },
      fr: {
        name: 'Formule de la Quantité de Mouvement et Impulsion',
        variables: [
          { symbol: 'p', name: 'Quantité de Mouvement', description: 'Impulsion vectorielle en kg·m/s' },
          { symbol: 'm', name: 'Masse', description: 'Masse en kg' },
          { symbol: 'v', name: 'Vitesse', description: 'Vitesse en m/s' },
        ],
        stepByStep: '1. Multipliez la masse m (kg) par la vitesse v (m/s). 2. Dans un système isolé, la quantité de mouvement totale se conserve.',
      },
      de: {
        name: 'Impuls- & Kraftstoß-Formel (Mechanik)',
        variables: [
          { symbol: 'p', name: 'Impuls', description: 'Bewegungsgröße in kg·m/s' },
          { symbol: 'm', name: 'Masse', description: 'Masse in kg' },
          { symbol: 'v', name: 'Geschwindigkeit', description: 'Geschwindigkeit in m/s' },
        ],
        stepByStep: '1. Masse m (kg) mit Geschwindigkeit v (m/s) multiplizieren. 2. In abgeschlossenen Systemen bleibt der Gesamtimpuls erhalten.',
      },
    },
  },

  // 7. Projectile Motion
  {
    slugs: ['projectile-motion-calculator'],
    name: '2D Ballistic Projectile Motion Formulas',
    formula: 'Range R = (v₀² sin 2θ) / g  |  Max Height H = (v₀² sin² θ) / (2g)  |  Flight t = (2v₀ sin θ) / g',
    latex: 'R = \\frac{v_0^2 \\sin(2\\theta)}{g}, \\quad H = \\frac{v_0^2 \\sin^2(\\theta)}{2g}',
    variables: [
      { symbol: 'v₀', name: 'Launch Speed', description: 'Initial release velocity (m/s)' },
      { symbol: 'θ', name: 'Launch Angle', description: 'Elevation angle above horizontal (degrees)' },
      { symbol: 'g', name: 'Gravity', description: 'Gravitational acceleration (9.80665 m/s²)' },
    ],
    stepByStep: '1. Split initial speed into v_x = v₀ cos θ and v_y = v₀ sin θ. 2. Compute flight time t = 2v_y / g. 3. Horizontal range R = v_x × t (maximized at θ = 45°).',
    faq: {
      question: 'Which launch angle maximizes projectile range on flat ground?',
      answer: 'Ignoring air resistance, horizontal range R = (v₀² sin 2θ) / g is maximized at θ = 45° where sin(90°) = 1.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Tiro Parabólico (Movimiento de Proyectiles 2D)',
        variables: [
          { symbol: 'v₀', name: 'Velocidad Inicial', description: 'Velocidad de lanzamiento (m/s)' },
          { symbol: 'θ', name: 'Ángulo de Lanzamiento', description: 'Ángulo respecto a la horizontal (grados)' },
          { symbol: 'g', name: 'Gravedad', description: 'Aceleración gravitatoria (9,81 m/s²)' },
        ],
        stepByStep: '1. Descomponga en v_x = v₀ cos θ y v_y = v₀ sen θ. 2. Calcule tiempo de vuelo t = 2v_y / g. 3. El alcance R = v_x × t es máximo a 45°.',
      },
      fr: {
        name: 'Formules de Trajectoire Balistique (Mouvement de Projectile)',
        variables: [
          { symbol: 'v₀', name: 'Vitesse Initiale', description: 'Vitesse de lancement (m/s)' },
          { symbol: 'θ', name: 'Angle de Tir', description: 'Angle par rapport à l’horizontale (degrés)' },
          { symbol: 'g', name: 'Pesanteur', description: 'Accélération de la pesanteur (9,81 m/s²)' },
        ],
        stepByStep: '1. Projetez v_x = v₀ cos θ et v_y = v₀ sin θ. 2. Temps de vol t = 2v_y / g. 3. Portée horizontale R = v_x × t (maximale à 45°).',
      },
      de: {
        name: 'Formeln für den Schiefen Wurf (Wurfparabel)',
        variables: [
          { symbol: 'v₀', name: 'Abwurfgeschwindigkeit', description: 'Startgeschwindigkeit in m/s' },
          { symbol: 'θ', name: 'Abwurfwinkel', description: 'Winkel zur Horizontalen (Grad)' },
          { symbol: 'g', name: 'Erdbeschleunigung', description: 'Normfallbeschleunigung (9,81 m/s²)' },
        ],
        stepByStep: '1. In v_x = v₀ cos θ und v_y = v₀ sin θ zerlegen. 2. Flugdauer t = 2v_y / g. 3. Wurfweite R = v_x × t erreicht ihr Maximum bei 45°.',
      },
    },
  },

  // 8. Free Fall
  {
    slugs: ['free-fall-calculator'],
    name: 'Free Fall Distance, Time & Impact Velocity Formulas',
    formula: 'h = ½ g t²  |  v = g × t = √(2 g h)  |  t = √(2 h / g)',
    latex: 'h = \\frac{1}{2} g t^2, \\quad v = \\sqrt{2 g h}, \\quad t = \\sqrt{\\frac{2h}{g}}',
    variables: [
      { symbol: 'h', name: 'Fall Height', description: 'Vertical drop distance in meters (m)' },
      { symbol: 't', name: 'Fall Time', description: 'Elapsed fall duration in seconds (s)' },
      { symbol: 'v', name: 'Impact Velocity', description: 'Velocity right before ground impact (m/s, vacuum)' },
      { symbol: 'g', name: 'Gravity', description: '9.80665 m/s² on Earth' },
    ],
    stepByStep: '1. Given height h, compute fall time t = √(2h / g). 2. Multiply g × t (or √(2gh)) to find impact velocity in vacuum.',
    faq: {
      question: 'How fast does an object hit the ground in free fall?',
      answer: 'Ignoring air drag, impact velocity is v = √(2gh) and fall time is t = √(2h/g). From 10 meters, an object falls in 1.43 seconds and hits at 14.0 m/s (50.4 km/h).',
    },
    translations: {
      es: {
        name: 'Fórmulas de Caída Libre (Distancia, Tiempo y Velocidad)',
        variables: [
          { symbol: 'h', name: 'Altura de Caída', description: 'Distancia vertical recorrida (m)' },
          { symbol: 't', name: 'Tiempo de Caída', description: 'Duración del descenso (s)' },
          { symbol: 'v', name: 'Velocidad de Impacto', description: 'Rapidez al llegar al suelo sin rozamiento (m/s)' },
          { symbol: 'g', name: 'Gravedad', description: '9,80665 m/s² en la Tierra' },
        ],
        stepByStep: '1. Con la altura h, calcule el tiempo t = √(2h / g). 2. Calcule la velocidad de impacto v = g × t = √(2gh).',
      },
      fr: {
        name: 'Formules de Chute Libre (Hauteur, Temps et Vitesse)',
        variables: [
          { symbol: 'h', name: 'Hauteur de Chute', description: 'Distance verticale parcourue (m)' },
          { symbol: 't', name: 'Temps de Chute', description: 'Durée de la chute (s)' },
          { symbol: 'v', name: 'Vitesse d’Impact', description: 'Vitesse finale hors résistance de l’air (m/s)' },
          { symbol: 'g', name: 'Pesanteur', description: '9,80665 m/s² sur Terre' },
        ],
        stepByStep: '1. À partir de h, calculez la durée t = √(2h / g). 2. Calculez la vitesse d’impact v = √(2gh).',
      },
      de: {
        name: 'Freier-Fall-Formeln (Fallhöhe, Fallzeit & Aufprallgeschwindigkeit)',
        variables: [
          { symbol: 'h', name: 'Fallhöhe', description: 'Zurückgelegte Fallstrecke in Metern (m)' },
          { symbol: 't', name: 'Fallzeit', description: 'Dauer des Falls in Sekunden (s)' },
          { symbol: 'v', name: 'Aufprallgeschwindigkeit', description: 'Endgeschwindigkeit ohne Luftwiderstand (m/s)' },
          { symbol: 'g', name: 'Erdbeschleunigung', description: '9,80665 m/s² auf der Erde' },
        ],
        stepByStep: '1. Aus der Fallhöhe h die Zeit t = √(2h / g) bestimmen. 2. Aufprallgeschwindigkeit mit v = √(2gh) berechnen.',
      },
    },
  },

  // 9. Work & Mechanical Power
  {
    slugs: ['work-calculator', 'power-calculator'],
    name: 'Mechanical Work & Power Formulas',
    formula: 'W = F × d × cos(θ)  |  P = W / t = F × v',
    latex: 'W = F \\cdot d \\cos(\\theta), \\quad P = \\frac{W}{t} = F \\cdot v',
    variables: [
      { symbol: 'W', name: 'Mechanical Work', description: 'Energy transferred by force in Joules (J)' },
      { symbol: 'P', name: 'Power', description: 'Rate of doing work in Watts (1 W = 1 J/s; 1 hp = 745.7 W)' },
      { symbol: 'F', name: 'Applied Force', description: 'Constant force magnitude in Newtons (N)' },
      { symbol: 'd', name: 'Displacement', description: 'Distance moved in meters (m)' },
    ],
    stepByStep: '1. Multiply force F by displacement d and cos(θ) to get Work W in Joules. 2. Divide Work W by elapsed time t in seconds for Power P in Watts.',
    faq: {
      question: 'How are mechanical work and power related?',
      answer: 'Work equals F × d × cos(θ) in Joules, and Power is the rate of work per second: P = W / t in Watts (1 mechanical horsepower = 745.7 W).',
    },
    translations: {
      es: {
        name: 'Fórmulas de Trabajo Mecánico y Potencia',
        variables: [
          { symbol: 'W', name: 'Trabajo Mecánico', description: 'Energía transferida en Julios (J)' },
          { symbol: 'P', name: 'Potencia', description: 'Trabajo por unidad de tiempo en Vatios (W)' },
          { symbol: 'F', name: 'Fuerza Aplicada', description: 'Fuerza en Newtons (N)' },
          { symbol: 'd', name: 'Desplazamiento', description: 'Distancia recorrida en metros (m)' },
        ],
        stepByStep: '1. Multiplique F × d × cos(θ) para obtener el Trabajo W en Julios. 2. Divida W entre el tiempo t en segundos para la Potencia P en Vatios.',
      },
      fr: {
        name: 'Formules de Travail Mécanique et Puissance',
        variables: [
          { symbol: 'W', name: 'Travail Mécanique', description: 'Énergie transférée en Joules (J)' },
          { symbol: 'P', name: 'Puissance', description: 'Débit de travail en Watts (1 W = 1 J/s)' },
          { symbol: 'F', name: 'Force Appliquée', description: 'Force en Newtons (N)' },
          { symbol: 'd', name: 'Déplacement', description: 'Distance parcourue en mètres (m)' },
        ],
        stepByStep: '1. Calculez le travail W = F × d × cos(θ) en Joules. 2. Divisez W par le temps t en secondes pour obtenir la puissance P en Watts.',
      },
      de: {
        name: 'Mechanische Arbeit- & Leistungsformel',
        variables: [
          { symbol: 'W', name: 'Mechanische Arbeit', description: 'Verrichtete Arbeit in Joule (J = N·m)' },
          { symbol: 'P', name: 'Leistung', description: 'Arbeit pro Zeit in Watt (1 W = 1 J/s, 1 PS = 735,5 W)' },
          { symbol: 'F', name: 'Kraft', description: 'Wirkende Kraft in Newton (N)' },
          { symbol: 'd', name: 'Wegstrecke', description: 'Zurückgelegter Weg in Metern (m)' },
        ],
        stepByStep: '1. Kraft F mit Weg d und cos(θ) multiplizieren ergibt Arbeit W (Joule). 2. Arbeit W durch Zeit t teilen ergibt Leistung P (Watt).',
      },
    },
  },

  // 10. Density & Weight
  {
    slugs: ['density-calculator', 'weight-calculator'],
    name: 'Mass Density & Gravitational Weight Formulas',
    formula: 'ρ = m / V  |  W = m × g',
    latex: '\\rho = \\frac{m}{V}, \\quad W = m \\cdot g',
    variables: [
      { symbol: 'ρ', name: 'Density', description: 'Mass per unit volume (kg/m³ or g/cm³; water = 1.00 g/cm³)' },
      { symbol: 'm', name: 'Mass', description: 'Quantity of matter in kg or g' },
      { symbol: 'V', name: 'Volume', description: 'Occupied 3D space in m³ or cm³' },
      { symbol: 'W', name: 'Weight Force', description: 'Gravitational pull in Newtons (m × g)' },
    ],
    stepByStep: '1. Divide object mass m by its volume V for density ρ. 2. Multiply mass in kg by local gravity g (9.80665 m/s² on Earth) for weight force in Newtons.',
    faq: {
      question: 'What is the difference between mass, density, and weight?',
      answer: 'Mass (kg) is intrinsic matter, Density is mass per unit volume (ρ = m/V), and Weight is the gravitational force acting on mass (W = m × g in Newtons).',
    },
    translations: {
      es: {
        name: 'Fórmulas de Densidad de Masa y Peso Gravitatorio',
        variables: [
          { symbol: 'ρ', name: 'Densidad', description: 'Masa por unidad de volumen (kg/m³ o g/cm³)' },
          { symbol: 'm', name: 'Masa', description: 'Cantidad de materia en kg o g' },
          { symbol: 'V', name: 'Volumen', description: 'Espacio ocupado en m³ o cm³' },
          { symbol: 'W', name: 'Peso (Fuerza)', description: 'Fuerza gravitatoria en Newtons (m × g)' },
        ],
        stepByStep: '1. Divida la masa m por el volumen V para la densidad ρ. 2. Multiplique la masa en kg por la gravedad g para obtener el peso en Newtons.',
      },
      fr: {
        name: 'Formules de Masse Volumique (Densité) et Poids',
        variables: [
          { symbol: 'ρ', name: 'Masse Volumique', description: 'Masse par unité de volume (kg/m³ ou g/cm³)' },
          { symbol: 'm', name: 'Masse', description: 'Quantité de matière en kg ou g' },
          { symbol: 'V', name: 'Volume', description: 'Volume occupé en m³ ou cm³' },
          { symbol: 'W', name: 'Poids', description: 'Force de pesanteur en Newtons (m × g)' },
        ],
        stepByStep: '1. Divisez la masse m par le volume V pour obtenir ρ. 2. Multipliez la masse en kg par g (9,81 m/s²) pour le poids en Newtons.',
      },
      de: {
        name: 'Dichte- & Gewichtskraft-Formel',
        variables: [
          { symbol: 'ρ', name: 'Dichte', description: 'Masse pro Volumen (kg/m³ oder g/cm³; Wasser = 1,0 g/cm³)' },
          { symbol: 'm', name: 'Masse', description: 'Stoffmenge in kg oder g' },
          { symbol: 'V', name: 'Volumen', description: 'Rauminhalt in m³ oder cm³' },
          { symbol: 'W', name: 'Gewichtskraft', description: 'Erdanziehungskraft in Newton (m × g)' },
        ],
        stepByStep: '1. Masse m durch Volumen V teilen ergibt Dichte ρ. 2. Masse in kg mit Ortsfaktor g (9,81 m/s²) multiplizieren für die Gewichtskraft in Newton.',
      },
    },
  },

  // 11. Ohm's Law
  {
    slugs: ['ohms-law-calculator', 'voltage-calculator', 'current-calculator', 'resistance-calculator'],
    name: 'Ohm’s Law Formula',
    formula: 'V = I × R  |  I = V / R  |  R = V / I',
    latex: 'V = I \\cdot R, \\quad I = \\frac{V}{R}, \\quad R = \\frac{V}{I}',
    variables: [
      { symbol: 'V', name: 'Voltage', description: 'Electrical potential difference in Volts (V)' },
      { symbol: 'I', name: 'Current', description: 'Electric current flow in Amperes (A)' },
      { symbol: 'R', name: 'Resistance', description: 'Opposition to current flow in Ohms (Ω)' },
    ],
    stepByStep: '1. Multiply current I by resistance R to find voltage V. 2. Divide V by R to find current I. 3. Divide V by I to find resistance R.',
    faq: {
      question: 'What is Ohm’s Law and its mathematical formula?',
      answer: 'Ohm’s Law relates voltage, current, and resistance via V = I × R (and equivalently I = V / R, R = V / I).',
    },
    translations: {
      es: {
        name: 'Ley de Ohm (Voltaje, Corriente y Resistencia)',
        variables: [
          { symbol: 'V', name: 'Voltaje (Tensión)', description: 'Diferencia de potencial eléctrico en Voltios (V)' },
          { symbol: 'I', name: 'Corriente (Intensidad)', description: 'Flujo de corriente eléctrica en Amperios (A)' },
          { symbol: 'R', name: 'Resistencia', description: 'Oposición al paso de corriente en Ohmios (Ω)' },
        ],
        stepByStep: '1. Para Voltaje: multiplique I × R. 2. Para Corriente: divida V / R. 3. Para Resistencia: divida V / I.',
      },
      fr: {
        name: 'Loi d’Ohm (Tension, Courant et Résistance)',
        variables: [
          { symbol: 'V', name: 'Tension (U / V)', description: 'Différence de potentiel électrique en Volts (V)' },
          { symbol: 'I', name: 'Intensité du Courant', description: 'Courant électrique en Ampères (A)' },
          { symbol: 'R', name: 'Résistance', description: 'Résistance électrique en Ohms (Ω)' },
        ],
        stepByStep: '1. Tension : V = I × R. 2. Courant : I = V / R. 3. Résistance : R = V / I.',
      },
      de: {
        name: 'Ohmsches Gesetz (Spannung, Stromstärke & Widerstand)',
        variables: [
          { symbol: 'V', name: 'Elektrische Spannung (U / V)', description: 'Potenzialdifferenz in Volt (V)' },
          { symbol: 'I', name: 'Stromstärke', description: 'Elektrischer Strom in Ampere (A)' },
          { symbol: 'R', name: 'Widerstand', description: 'Elektrischer Widerstand in Ohm (Ω)' },
        ],
        stepByStep: '1. Spannung: V = I × R. 2. Stromstärke: I = V / R. 3. Widerstand: R = V / I.',
      },
    },
  },

  // 12. Electrical Power
  {
    slugs: ['electrical-power-calculator', 'power-supply-calculator'],
    name: 'Electrical Power Formula (Joule’s Law)',
    formula: 'P = V × I = I² × R = V² / R',
    latex: 'P = V I = I^2 R = \\frac{V^2}{R}',
    variables: [
      { symbol: 'P', name: 'Electric Power', description: 'Instantaneous power in Watts (W)' },
      { symbol: 'V', name: 'Voltage', description: 'Supply voltage in Volts (V)' },
      { symbol: 'I', name: 'Current', description: 'Load current in Amperes (A)' },
      { symbol: 'R', name: 'Resistance', description: 'Circuit resistance in Ohms (Ω)' },
    ],
    stepByStep: '1. Multiply voltage V by current I for DC power in Watts. 2. Alternatively square current × R, or square voltage / R. For PSU sizing, add 20%–25% headroom.',
    faq: {
      question: 'What is the electrical power formula in Watts?',
      answer: 'DC electrical power is P = V × I (also P = I²R and P = V²/R). For single-phase AC loads, real power is P = V × I × PF.',
    },
    translations: {
      es: {
        name: 'Fórmula de Potencia Eléctrica (Ley de Joule)',
        variables: [
          { symbol: 'P', name: 'Potencia Eléctrica', description: 'Potencia consumida en Vatios (W)' },
          { symbol: 'V', name: 'Voltaje', description: 'Tensión en Voltios (V)' },
          { symbol: 'I', name: 'Corriente', description: 'Intensidad en Amperios (A)' },
          { symbol: 'R', name: 'Resistencia', description: 'Resistencia en Ohmios (Ω)' },
        ],
        stepByStep: '1. Multiplique voltaje V por corriente I. 2. Alternativamente use I² × R o V² / R. En fuentes de alimentación añada 20–25% de margen.',
      },
      fr: {
        name: 'Formule de Puissance Électrique (Loi de Joule)',
        variables: [
          { symbol: 'P', name: 'Puissance Électrique', description: 'Puissance en Watts (W)' },
          { symbol: 'V', name: 'Tension', description: 'Tension d’alimentation en Volts (V)' },
          { symbol: 'I', name: 'Intensité', description: 'Courant de charge en Ampères (A)' },
          { symbol: 'R', name: 'Résistance', description: 'Résistance en Ohms (Ω)' },
        ],
        stepByStep: '1. Multipliez la tension V par l’intensité I. 2. Utilisez aussi I² × R ou V² / R. Ajoutez 20–25 % de marge pour une alimentation.',
      },
      de: {
        name: 'Elektrische Leistungsformel (Watt-Formel)',
        variables: [
          { symbol: 'P', name: 'Elektrische Leistung', description: 'Leistungsaufnahme in Watt (W)' },
          { symbol: 'V', name: 'Spannung', description: 'Betriebsspannung in Volt (V)' },
          { symbol: 'I', name: 'Stromstärke', description: 'Laststrom in Ampere (A)' },
          { symbol: 'R', name: 'Widerstand', description: 'Lastwiderstand in Ohm (Ω)' },
        ],
        stepByStep: '1. Spannung V mit Stromstärke I multiplizieren. 2. Alternativ I² × R oder V² / R berechnen. Bei Netzteilen 20–25 % Reserve einplanen.',
      },
    },
  },

  // 13. Electrical Energy & Utility Cost
  {
    slugs: ['electrical-energy-calculator', 'electricity-cost-calculator'],
    name: 'Electrical Energy (kWh) & Electricity Cost Formula',
    formula: 'Energy (kWh) = (Watts × Hours) / 1,000  |  Cost = kWh × Rate per kWh',
    latex: 'E_{\\text{kWh}} = \\frac{P_{\\text{W}} \\times t_{\\text{h}}}{1000}, \\quad \\text{Cost} = E_{\\text{kWh}} \\times C_{\\text{kWh}}',
    variables: [
      { symbol: 'P_W', name: 'Appliance Power', description: 'Rated wattage draw in Watts (W)' },
      { symbol: 't_h', name: 'Operating Hours', description: 'Total hours run per day, month, or year' },
      { symbol: 'C_kWh', name: 'Utility Electricity Rate', description: 'Tariff price per kilowatt-hour (e.g. $0.16 or €0.35/kWh)' },
    ],
    stepByStep: '1. Multiply appliance wattage by operating hours and divide by 1,000 to get kWh. 2. Multiply kWh by your utility’s per-kWh electricity tariff.',
    faq: {
      question: 'How do you calculate electricity cost in kWh?',
      answer: 'Convert appliance watts to kilowatts (W / 1,000), multiply by hours operated to get kWh, then multiply by your electric utility rate per kWh.',
    },
    translations: {
      es: {
        name: 'Fórmula de Energía Eléctrica (kWh) y Coste de Electricidad',
        variables: [
          { symbol: 'P_W', name: 'Potencia del Aparato', description: 'Consumo eléctrico en Vatios (W)' },
          { symbol: 't_h', name: 'Horas de Uso', description: 'Tiempo total de funcionamiento en horas' },
          { symbol: 'C_kWh', name: 'Tarifa Eléctrica', description: 'Precio por kilovatio-hora (€/kWh)' },
        ],
        stepByStep: '1. Multiplique vatios por horas de uso y divida entre 1.000 para obtener kWh. 2. Multiplique los kWh por el precio de su tarifa eléctrica.',
      },
      fr: {
        name: 'Formule de Consommation Électrique (kWh) et Coût',
        variables: [
          { symbol: 'P_W', name: 'Puissance de l’Appareil', description: 'Puissance appelée en Watts (W)' },
          { symbol: 't_h', name: 'Durée d’Utilisation', description: 'Heures de fonctionnement cumulées' },
          { symbol: 'C_kWh', name: 'Tarif du kWh', description: 'Prix du kilowattheure (€/kWh)' },
        ],
        stepByStep: '1. Multipliez les Watts par les heures et divisez par 1 000 pour les kWh. 2. Multipliez par le tarif du kWh de votre fournisseur.',
      },
      de: {
        name: 'Stromverbrauch- (kWh) & Stromkosten-Formel',
        variables: [
          { symbol: 'P_W', name: 'Geräteleistung', description: 'Leistungsaufnahme in Watt (W)' },
          { symbol: 't_h', name: 'Betriebsstunden', description: 'Laufzeit in Stunden' },
          { symbol: 'C_kWh', name: 'Strompreis pro kWh', description: 'Arbeitspreis des Stromtarifs (z. B. 0,35 €/kWh)' },
        ],
        stepByStep: '1. Watt mit Betriebsstunden multiplizieren und durch 1.000 teilen ergibt kWh. 2. kWh mit Ihrem Strompreis pro kWh multiplizieren.',
      },
    },
  },

  // 14. Voltage Drop & Wire Resistance
  {
    slugs: ['voltage-drop-calculator', 'wire-resistance-calculator'],
    name: 'Conductor Resistance & Voltage Drop Formula',
    formula: 'R = ρ × L / A  |  V_drop (DC / 1φ AC) = 2 × I × R_wire = (2 × ρ × L × I) / A',
    latex: 'R = \\rho\\frac{L}{A}, \\quad V_{\\text{drop}} = \\frac{2 \\rho L I}{A}',
    variables: [
      { symbol: 'ρ', name: 'Conductor Resistivity', description: 'Copper ≈ 0.0172 Ω·mm²/m; Aluminum ≈ 0.0282 Ω·mm²/m at 20°C' },
      { symbol: 'L', name: 'One-Way Cable Length', description: 'Distance from source to load (factor 2 accounts for return wire)' },
      { symbol: 'A', name: 'Cross-Sectional Area', description: 'Wire gauge cross-section in mm² (or circular mils)' },
      { symbol: 'I', name: 'Load Current', description: 'Circuit current in Amperes (A)' },
    ],
    stepByStep: '1. Compute single-conductor resistance R = ρL / A. 2. Multiply by 2 × I for DC/single-phase circuits (or √3 × I for balanced 3-phase). 3. Keep V_drop under 3% of supply voltage per NEC/DIN standards.',
    faq: {
      question: 'What is the maximum recommended voltage drop for branch circuits?',
      answer: 'NEC and European DIN/IEC standards recommend keeping voltage drop below 3% on branch circuits (and 5% combined feeder + branch) to prevent overheating and equipment undervoltage.',
    },
    translations: {
      es: {
        name: 'Fórmula de Resistencia de Cable y Caída de Tensión',
        variables: [
          { symbol: 'ρ', name: 'Resistividad del Conductor', description: 'Cobre ≈ 0,0172 Ω·mm²/m; Aluminio ≈ 0,0282 Ω·mm²/m' },
          { symbol: 'L', name: 'Longitud del Tramo', description: 'Distancia de ida en metros (el factor 2 incluye ida y vuelta)' },
          { symbol: 'A', name: 'Sección del Cable', description: 'Área transversal del conductor en mm²' },
          { symbol: 'I', name: 'Corriente de Carga', description: 'Intensidad circulante en Amperios (A)' },
        ],
        stepByStep: '1. Calcule la resistencia del hilo R = ρL / A. 2. Multiplique por 2 × I en monofásico/CC (o √3 × I en trifásico). 3. Mantenga la caída por debajo del 3%.',
      },
      fr: {
        name: 'Formule de Résistance de Câble et Chute de Tension',
        variables: [
          { symbol: 'ρ', name: 'Résistivité du Conducteur', description: 'Cuivre ≈ 0,0172 Ω·mm²/m ; Aluminium ≈ 0,0282 Ω·mm²/m' },
          { symbol: 'L', name: 'Longueur Simple', description: 'Longueur du câble en mètres (×2 pour aller-retour)' },
          { symbol: 'A', name: 'Section du Conducteur', description: 'Section normalisée en mm²' },
          { symbol: 'I', name: 'Courant de Charge', description: 'Intensité en Ampères (A)' },
        ],
        stepByStep: '1. Calculez R = ρL / A. 2. Multipliez par 2 × I en monophasé/CC (√3 × I en triphasé). 3. Respectez une chute inférieure à 3 % (norme NF C 15-100).',
      },
      de: {
        name: 'Leitungswiderstand- & Spannungsfall-Formel (DIN VDE)',
        variables: [
          { symbol: 'ρ', name: 'Spezifischer Widerstand', description: 'Kupfer ≈ 0,0172 Ω·mm²/m; Aluminium ≈ 0,0282 Ω·mm²/m' },
          { symbol: 'L', name: 'Einfache Leitungslänge', description: 'Kabellänge in Metern (Faktor 2 für Hin- und Rückleiter)' },
          { symbol: 'A', name: 'Leiterquerschnitt', description: 'Aderquerschnitt in mm²' },
          { symbol: 'I', name: 'Betriebsstrom', description: 'Laststrom in Ampere (A)' },
        ],
        stepByStep: '1. Leiterwiderstand R = ρL / A bestimmen. 2. Mit 2 × I (Wechsel-/Gleichstrom) bzw. √3 × I (Drehstrom) multiplizieren. 3. Maximal 3 % Spannungsfall nach DIN VDE einhalten.',
      },
    },
  },

  // 15. LED Series Resistor
  {
    slugs: ['led-resistor-calculator'],
    name: 'LED Current-Limiting Series Resistor Formula',
    formula: 'R = (V_s - n × V_f) / I_f  |  P_R = (V_s - n × V_f) × I_f',
    latex: 'R = \\frac{V_s - n V_f}{I_f}, \\quad P_R = I_f^2 R',
    variables: [
      { symbol: 'V_s', name: 'Supply Voltage', description: 'DC source voltage (e.g. 3.3V, 5V, 12V, 24V)' },
      { symbol: 'V_f', name: 'LED Forward Voltage', description: 'Typical voltage drop per LED (Red ~2.0V, Blue/White ~3.2V)' },
      { symbol: 'I_f', name: 'LED Forward Current', description: 'Target current in Amperes (standard 5mm LED = 0.020 A)' },
      { symbol: 'n', name: 'LEDs in Series', description: 'Number of identical LEDs wired in series' },
    ],
    stepByStep: '1. Subtract total LED forward voltage (n × V_f) from supply V_s. 2. Divide by target current I_f in Amps. 3. Round up to the next standard E24 resistor value and verify wattage rating ≥ 2× P_R.',
    faq: {
      question: 'How do you size a resistor for an LED?',
      answer: 'Use R = (V_s - V_f) / I_f. For example, a 2.0V / 20mA red LED on a 5V rail requires (5 - 2) / 0.02 = 150 Ω.',
    },
    translations: {
      es: {
        name: 'Fórmula de Resistencia Limitadora para LED',
        variables: [
          { symbol: 'V_s', name: 'Voltaje de Fuente', description: 'Tensión de alimentación CC (3,3V, 5V, 12V, 24V)' },
          { symbol: 'V_f', name: 'Voltaje Directo del LED', description: 'Caída típica por LED (Rojo ~2,0V, Azul/Blanco ~3,2V)' },
          { symbol: 'I_f', name: 'Corriente del LED', description: 'Intensidad nominal en Amperios (típico 0,020 A)' },
          { symbol: 'n', name: 'LEDs en Serie', description: 'Cantidad de LEDs conectados en serie' },
        ],
        stepByStep: '1. Reste n × V_f al voltaje de fuente V_s. 2. Divida entre la corriente I_f en Amperios. 3. Elija el valor comercial E24 superior y verifique potencia ≥ 2× P_R.',
      },
      fr: {
        name: 'Formule de Résistance de Limitation pour LED',
        variables: [
          { symbol: 'V_s', name: 'Tension d’Alimentation', description: 'Source continue (3,3 V, 5 V, 12 V, 24 V)' },
          { symbol: 'V_f', name: 'Tension Directe LED', description: 'Chute directe typique (Rouge ~2,0 V, Bleu/Blanc ~3,2 V)' },
          { symbol: 'I_f', name: 'Courant LED', description: 'Courant nominal en Ampères (souvent 0,020 A)' },
          { symbol: 'n', name: 'LEDs en Série', description: 'Nombre de LEDs montées en série' },
        ],
        stepByStep: '1. Soustrayez n × V_f de la tension source V_s. 2. Divisez par I_f en Ampères. 3. Arrondissez à la valeur normalisée E24 supérieure.',
      },
      de: {
        name: 'LED-Vorwiderstand-Formel',
        variables: [
          { symbol: 'V_s', name: 'Versorgungsspannung', description: 'Gleichspannungsquelle (3,3 V, 5 V, 12 V, 24 V)' },
          { symbol: 'V_f', name: 'LED-Durchlassspannung', description: 'Typische Flussspannung (Rot ~2,0 V, Blau/Weiß ~3,2 V)' },
          { symbol: 'I_f', name: 'LED-Betriebsstrom', description: 'Durchlassstrom in Ampere (Standard-LED: 0,020 A)' },
          { symbol: 'n', name: 'LEDs in Reihe', description: 'Anzahl der in Reihe geschalteten LEDs' },
        ],
        stepByStep: '1. Summe n × V_f von der Quellspannung V_s abziehen. 2. Durch Betriebsstrom I_f in Ampere teilen. 3. Nächsthöheren E24-Normwert wählen und Belastbarkeit prüfen.',
      },
    },
  },

  // 16. Power Factor
  {
    slugs: ['power-factor-calculator'],
    name: 'AC Power Triangle & Power Factor Formula',
    formula: 'PF = cos(φ) = P / S  |  S² = P² + Q²',
    latex: '\\text{PF} = \\cos(\\varphi) = \\frac{P\\text{ (kW)}}{S\\text{ (kVA)}}, \\quad S = \\sqrt{P^2 + Q^2}',
    variables: [
      { symbol: 'PF', name: 'Power Factor', description: 'Ratio of real working power to apparent power (0 to 1)' },
      { symbol: 'P', name: 'Real Power (kW)', description: 'Active power performing useful mechanical/thermal work' },
      { symbol: 'S', name: 'Apparent Power (kVA)', description: 'Product of RMS voltage and current (V × I)' },
      { symbol: 'Q', name: 'Reactive Power (kVAR)', description: 'Inductive/capacitive oscillating power' },
    ],
    stepByStep: '1. Divide active power P (kW) by apparent power S (kVA) for PF. 2. Compute reactive power Q = √(S² - P²). 3. Size correction capacitors to raise PF above 0.95.',
    faq: {
      question: 'How do you convert kVA to kW using power factor?',
      answer: 'Real Power (kW) = Apparent Power (kVA) × Power Factor (PF). For example, 100 kVA at PF = 0.85 delivers 85 kW of active power.',
    },
    translations: {
      es: {
        name: 'Fórmula del Factor de Potencia y Triángulo de Potencias CA',
        variables: [
          { symbol: 'PF', name: 'Factor de Potencia (cos φ)', description: 'Relación entre potencia activa y aparente (0 a 1)' },
          { symbol: 'P', name: 'Potencia Activa (kW)', description: 'Potencia que realiza trabajo útil' },
          { symbol: 'S', name: 'Potencia Aparente (kVA)', description: 'Producto de tensión y corriente eficaces' },
          { symbol: 'Q', name: 'Potencia Reactiva (kVAR)', description: 'Potencia inductiva/capacitiva no aprovechada' },
        ],
        stepByStep: '1. Divida P (kW) entre S (kVA) para el factor de potencia. 2. Calcule Q = √(S² - P²). 3. Dimensione condensadores para corregir cos φ ≥ 0,95.',
      },
      fr: {
        name: 'Formule du Facteur de Puissance (cos φ) et Triangle des Puissances',
        variables: [
          { symbol: 'PF', name: 'Facteur de Puissance', description: 'Rapport puissance active sur puissance apparente (0 à 1)' },
          { symbol: 'P', name: 'Puissance Active (kW)', description: 'Puissance fournissant un travail utile' },
          { symbol: 'S', name: 'Puissance Apparente (kVA)', description: 'Produit U × I en courant alternatif' },
          { symbol: 'Q', name: 'Puissance Réactive (kVAR)', description: 'Puissance magnétisante inductive/capacitive' },
        ],
        stepByStep: '1. Divisez P (kW) par S (kVA) pour obtenir cos φ. 2. Calculez Q = √(S² - P²). 3. Corrigez le cos φ au-delà de 0,95 par batterie de condensateurs.',
      },
      de: {
        name: 'Leistungsfaktor- (cos φ) & Wechselstrom-Leistungsdreieck',
        variables: [
          { symbol: 'PF', name: 'Leistungsfaktor (cos φ)', description: 'Verhältnis von Wirkleistung zu Scheinleistung (0 bis 1)' },
          { symbol: 'P', name: 'Wirkleistung (kW)', description: 'Tatsächlich nutzbare elektrische Leistung' },
          { symbol: 'S', name: 'Scheinleistung (kVA)', description: 'Produkt aus Effektivspannung und Effektivstrom' },
          { symbol: 'Q', name: 'Blindleistung (kvar)', description: 'Induktive bzw. kapazitive Pendelleistung' },
        ],
        stepByStep: '1. Wirkleistung P (kW) durch Scheinleistung S (kVA) teilen. 2. Blindleistung Q = √(S² - P²) ermitteln. 3. Mit Kompensationskondensatoren cos φ > 0,95 anstreben.',
      },
    },
  },

  // 17. Battery Runtime, UPS & Inverter
  {
    slugs: ['battery-runtime-calculator', 'ups-calculator', 'inverter-calculator'],
    name: 'Battery Backup Runtime & Inverter Efficiency Formula',
    formula: 'Runtime (h) = (V × Ah × DoD × η) / Load_W',
    latex: 't_{\\text{hours}} = \\frac{V \\cdot \\text{Ah} \\cdot \\text{DoD} \\cdot \\eta}{P_{\\text{load}}}',
    variables: [
      { symbol: 'V × Ah', name: 'Stored Energy (Wh)', description: 'Nominal battery voltage multiplied by Ampere-hour capacity' },
      { symbol: 'DoD', name: 'Depth of Discharge', description: 'Usable battery fraction (~0.50 Lead-Acid, ~0.85–0.90 LiFePO₄)' },
      { symbol: 'η', name: 'Inverter Efficiency', description: 'DC-to-AC conversion efficiency (typically 0.85–0.92)' },
      { symbol: 'P_load', name: 'AC Load (Watts)', description: 'Continuous power draw of connected equipment' },
    ],
    stepByStep: '1. Multiply battery voltage by Ah capacity to obtain Watt-hours (Wh). 2. Multiply by usable Depth of Discharge and inverter efficiency η. 3. Divide by continuous load wattage.',
    faq: {
      question: 'How long will a 12V 100Ah battery run a 300W load?',
      answer: 'A 12V 100Ah battery stores 1,200 Wh. With LiFePO₄ (85% DoD) and 90% inverter efficiency, usable energy is 918 Wh, powering a 300W load for ~3.06 hours.',
    },
    translations: {
      es: {
        name: 'Fórmula de Autonomía de Batería, SAI (UPS) e Inversor',
        variables: [
          { symbol: 'V × Ah', name: 'Energía Almacenada (Wh)', description: 'Voltaje nominal por capacidad en Amperios-hora' },
          { symbol: 'DoD', name: 'Profundidad de Descarga', description: 'Fracción utilizable (~0,50 Plomo-Ácido, ~0,85 LiFePO₄)' },
          { symbol: 'η', name: 'Eficiencia del Inversor', description: 'Rendimiento de conversión CC a CA (0,85–0,92)' },
          { symbol: 'P_load', name: 'Carga Conectada (W)', description: 'Consumo continuo del equipo en Vatios' },
        ],
        stepByStep: '1. Multiplique voltios por Ah para obtener Wh. 2. Aplique la profundidad de descarga DoD y eficiencia η. 3. Divida entre la potencia de carga en Vatios.',
      },
      fr: {
        name: 'Formule d’Autonomie Batterie, Onduleur (UPS) et Convertisseur',
        variables: [
          { symbol: 'V × Ah', name: 'Énergie Stockée (Wh)', description: 'Tension nominale multipliée par la capacité en Ah' },
          { symbol: 'DoD', name: 'Profondeur de Décharge', description: 'Capacité utile (~0,50 Plomb, ~0,85–0,90 LiFePO₄)' },
          { symbol: 'η', name: 'Rendement Onduleur', description: 'Efficacité de conversion CC/CA (0,85 à 0,92)' },
          { symbol: 'P_load', name: 'Puissance de Charge (W)', description: 'Consommation continue des appareils en Watts' },
        ],
        stepByStep: '1. Multipliez V × Ah pour les Wh totaux. 2. Multipliez par DoD et le rendement η. 3. Divisez par la puissance consommée en Watts.',
      },
      de: {
        name: 'Batterie-Laufzeit-, USV- & Wechselrichter-Formel',
        variables: [
          { symbol: 'V × Ah', name: 'Speicherkapazität (Wh)', description: 'Nennspannung multipliziert mit Kapazität in Ah' },
          { symbol: 'DoD', name: 'Entladetiefe (DoD)', description: 'Nutzbarer Anteil (~0,50 Blei-Säure, ~0,85–0,90 LiFePO₄)' },
          { symbol: 'η', name: 'Wechselrichter-Wirkungsgrad', description: 'Umwandlungseffizienz DC zu AC (ca. 0,85–0,92)' },
          { symbol: 'P_load', name: 'Verbraucherlast (W)', description: 'Dauerleistung der angeschlossenen Geräte in Watt' },
        ],
        stepByStep: '1. Spannung V × Ah ergibt Wattstunden (Wh). 2. Mit Entladetiefe DoD und Wirkungsgrad η multiplizieren. 3. Durch die Last in Watt teilen.',
      },
    },
  },

  // 18. Solar PV Array Sizing
  {
    slugs: ['solar-panel-calculator'],
    name: 'Solar Photovoltaic (PV) Array Sizing Formula',
    formula: 'Required kW = Daily kWh / (Peak Sun Hours × System Derate Factor)',
    latex: 'P_{\\text{PV (kW)}} = \\frac{E_{\\text{daily (kWh)}}}{\\text{PSH} \\times \\eta_{\\text{sys}}}',
    variables: [
      { symbol: 'E_daily', name: 'Daily Energy Need', description: 'Average electricity consumption per day (kWh/day)' },
      { symbol: 'PSH', name: 'Peak Sun Hours', description: 'Location-specific daily solar insolation (kWh/m²/day, ~3–6 h)' },
      { symbol: 'η_sys', name: 'System Efficiency Factor', description: 'Derate accounting for inverter, wiring, dust, and heat losses (~0.80)' },
    ],
    stepByStep: '1. Divide monthly electric bill kWh by 30 for daily kWh. 2. Divide daily kWh by (Peak Sun Hours × 0.80 derate). 3. Divide required watts by single panel rating (e.g. 400W) for panel count.',
    faq: {
      question: 'How do you calculate how many solar panels you need?',
      answer: 'Divide daily kWh usage by (Peak Sun Hours × 0.80 system efficiency) to find required array kW, then divide total watts by individual panel wattage (e.g., 400W–450W).',
    },
    translations: {
      es: {
        name: 'Fórmula de Dimensionamiento de Paneles Solares Fotovoltaicos',
        variables: [
          { symbol: 'E_daily', name: 'Consumo Diario (kWh)', description: 'Demanda energética media diaria en kWh' },
          { symbol: 'PSH', name: 'Horas Sol Pico (HSP)', description: 'Irradiación solar equivalente diaria de la ubicación' },
          { symbol: 'η_sys', name: 'Rendimiento Global (PR)', description: 'Factor de pérdidas por inversor, temperatura y cableado (~0,80)' },
        ],
        stepByStep: '1. Calcule su consumo diario en kWh. 2. Divida por (HSP × 0,80) para obtener los kWp necesarios. 3. Divida entre la potencia unitaria de cada placa (ej. 450 Wp).',
      },
      fr: {
        name: 'Formule de Dimensionnement Photovoltaïque (Panneaux Solaires)',
        variables: [
          { symbol: 'E_daily', name: 'Consommation Journalière', description: 'Besoin énergétique moyen par jour (kWh/jour)' },
          { symbol: 'PSH', name: 'Heures d’Ensoleillement Pic', description: 'Irradiation solaire quotidienne locale (kWh/m²/jour)' },
          { symbol: 'η_sys', name: 'Ratio de Performance', description: 'Pertes onduleur, câbles et température (~0,80)' },
        ],
        stepByStep: '1. Déterminez vos besoins quotidiens en kWh. 2. Divisez par (PSH × 0,80) pour obtenir la puissance crête (kWc). 3. Divisez par la puissance d’un panneau (ex. 400 Wc).',
      },
      de: {
        name: 'Photovoltaik- (PV-) Anlagen-Dimensionierungsformel',
        variables: [
          { symbol: 'E_daily', name: 'Täglicher Strombedarf', description: 'Durchschnittlicher Tagesverbrauch in kWh' },
          { symbol: 'PSH', name: 'Volllast-Sonnenstunden', description: 'Standortabhängige tägliche Einstrahlung (kWh/m²/Tag)' },
          { symbol: 'η_sys', name: 'Performance Ratio (PR)', description: 'Systemwirkungsgrad inkl. Wechselrichter & Wärme (~0,80)' },
        ],
        stepByStep: '1. Tagesbedarf in kWh ermitteln. 2. Durch (Volllaststunden × 0,80) teilen ergibt die benötigte Anlagenleistung in kWp. 3. Durch Modulleistung (z. B. 430 Wp) teilen für die Modulanzahl.',
      },
    },
  },

  // 19. Molarity
  {
    slugs: ['molarity-calculator'],
    name: 'Molarity (Molar Concentration) Formula',
    formula: 'M = n / V = mass / (Molar Mass × V)',
    latex: 'M = \\frac{n}{V} = \\frac{m}{M_w \\cdot V}',
    variables: [
      { symbol: 'M', name: 'Molarity', description: 'Molar concentration in mol/L (M)' },
      { symbol: 'n', name: 'Moles of Solute', description: 'Solute amount in moles (m / M_w)' },
      { symbol: 'V', name: 'Solution Volume', description: 'Total volume of solution in liters (L)' },
    ],
    stepByStep: '1. Divide solute mass in grams by its molar mass (g/mol) to obtain moles n. 2. Convert solution volume to liters. 3. Divide n by V.',
    faq: {
      question: 'What is the molarity formula?',
      answer: 'Molarity M = n / V, where n is moles of solute (grams / molar mass) and V is total solution volume in liters (L).',
    },
    translations: {
      es: {
        name: 'Fórmula de Molaridad (Concentración Molar)',
        variables: [
          { symbol: 'M', name: 'Molaridad', description: 'Concentración molar en mol/L (M)' },
          { symbol: 'n', name: 'Moles de Soluto', description: 'Cantidad de soluto en moles (masa / masa molar)' },
          { symbol: 'V', name: 'Volumen de Disolución', description: 'Volumen total en litros (L)' },
        ],
        stepByStep: '1. Convierta gramos de soluto a moles dividiendo por su masa molar. 2. Exprese el volumen total en litros. 3. Divida moles entre litros.',
      },
      fr: {
        name: 'Formule de Molarité (Concentration Molaire)',
        variables: [
          { symbol: 'M', name: 'Molarité (C)', description: 'Concentration molaire en mol/L (M)' },
          { symbol: 'n', name: 'Quantité de Matière', description: 'Moles de soluté (masse / masse molaire)' },
          { symbol: 'V', name: 'Volume de Solution', description: 'Volume total de la solution en litres (L)' },
        ],
        stepByStep: '1. Calculez les moles de soluté n = m / M_w. 2. Convertissez le volume en litres. 3. Divisez n par V.',
      },
      de: {
        name: 'Molaritäts-Formel (Stoffmengenkonzentration)',
        variables: [
          { symbol: 'M', name: 'Molarität (c)', description: 'Stoffmengenkonzentration in mol/L (M)' },
          { symbol: 'n', name: 'Stoffmenge', description: 'Gelöste Molzahl (Masse / molare Masse)' },
          { symbol: 'V', name: 'Lösungsvolumen', description: 'Gesamtvolumen der Lösung in Litern (L)' },
        ],
        stepByStep: '1. Masse des gelösten Stoffs durch molare Masse teilen (n). 2. Lösungsvolumen in Liter umrechnen. 3. n durch V teilen.',
      },
    },
  },

  // 20. Molality
  {
    slugs: ['molality-calculator'],
    name: 'Molality Formula (Temperature-Independent Concentration)',
    formula: 'm = n_solute / kg_solvent',
    latex: 'm = \\frac{n_{\\text{solute}}}{m_{\\text{solvent (kg)}}}',
    variables: [
      { symbol: 'm', name: 'Molality', description: 'Concentration in mol/kg (molal)' },
      { symbol: 'n', name: 'Moles of Solute', description: 'Amount of dissolved solute in moles' },
      { symbol: 'kg', name: 'Solvent Mass', description: 'Mass of pure solvent in kilograms (excluding solute)' },
    ],
    stepByStep: '1. Calculate moles of solute n. 2. Convert pure solvent mass to kilograms. 3. Divide solute moles by solvent kg.',
    faq: {
      question: 'How does molality differ from molarity?',
      answer: 'Molality divides moles of solute by kilograms of pure solvent (m = n/kg), making it independent of temperature-induced thermal volume expansion unlike molarity.',
    },
    translations: {
      es: {
        name: 'Fórmula de Molalidad (Concentración en mol/kg)',
        variables: [
          { symbol: 'm', name: 'Molalidad', description: 'Concentración en mol/kg (independiente de temperatura)' },
          { symbol: 'n', name: 'Moles de Soluto', description: 'Moles de sustancia disuelta' },
          { symbol: 'kg', name: 'Masa de Disolvente', description: 'Kilogramos de disolvente puro' },
        ],
        stepByStep: '1. Calcule los moles de soluto n. 2. Exprese la masa de disolvente puro en kg. 3. Divida n entre los kg de disolvente.',
      },
      fr: {
        name: 'Formule de Molalité (mol/kg de Solvant)',
        variables: [
          { symbol: 'm', name: 'Molalité', description: 'Concentration en mol/kg indépendante de la température' },
          { symbol: 'n', name: 'Moles de Soluté', description: 'Quantité de soluté en moles' },
          { symbol: 'kg', name: 'Masse de Solvant', description: 'Masse du solvant pur en kilogrammes' },
        ],
        stepByStep: '1. Calculez les moles de soluté n. 2. Convertissez la masse de solvant pur en kg. 3. Divisez n par la masse en kg.',
      },
      de: {
        name: 'Molalitäts-Formel (Temperaturunabhängige Konzentration)',
        variables: [
          { symbol: 'm', name: 'Molalität (b)', description: 'Konzentration in mol/kg Lösungsmittel' },
          { symbol: 'n', name: 'Stoffmenge Solut', description: 'Molzahl des gelösten Stoffs' },
          { symbol: 'kg', name: 'Lösungsmittelmasse', description: 'Masse des reinen Lösungsmittels in Kilogramm' },
        ],
        stepByStep: '1. Stoffmenge n des gelösten Stoffs bestimmen. 2. Masse des reinen Lösungsmittels in kg angeben. 3. n durch kg Lösungsmittel teilen.',
      },
    },
  },

  // 21. Dilution
  {
    slugs: ['dilution-calculator', 'molarity-dilution-calculator'],
    name: 'Solution Dilution Conservation Formula',
    formula: 'M₁ × V₁ = M₂ × V₂',
    latex: 'M_1 V_1 = M_2 V_2',
    variables: [
      { symbol: 'M₁', name: 'Stock Concentration', description: 'Initial concentrated solution molarity' },
      { symbol: 'V₁', name: 'Stock Volume', description: 'Volume of stock aliquot to pipette' },
      { symbol: 'M₂', name: 'Target Concentration', description: 'Desired diluted molarity' },
      { symbol: 'V₂', name: 'Final Volume', description: 'Total final diluted volume (V₁ + added solvent)' },
    ],
    stepByStep: '1. Enter any three known quantities in consistent units. 2. Solve for required stock aliquot V₁ = (M₂ × V₂) / M₁, then top up with solvent to V₂.',
    faq: {
      question: 'What is the solution dilution formula?',
      answer: 'Because total moles of solute remain conserved when adding solvent, M₁V₁ = M₂V₂ (equivalently C₁V₁ = C₂V₂).',
    },
    translations: {
      es: {
        name: 'Fórmula de Dilución de Disoluciones',
        variables: [
          { symbol: 'M₁', name: 'Concentración Inicial', description: 'Molaridad de la solución madre' },
          { symbol: 'V₁', name: 'Volumen Inicial', description: 'Alícuota a tomar de la solución concentrada' },
          { symbol: 'M₂', name: 'Concentración Final', description: 'Molaridad diluida deseada' },
          { symbol: 'V₂', name: 'Volumen Final', description: 'Volumen total final de la disolución' },
        ],
        stepByStep: '1. Ingrese tres variables conocidas con unidades consistentes. 2. Despeje V₁ = (M₂ × V₂) / M₁ y enrase con disolvente hasta V₂.',
      },
      fr: {
        name: 'Formule de Dilution des Solutions',
        variables: [
          { symbol: 'M₁', name: 'Concentration Mère', description: 'Molarité de la solution concentrée initiale' },
          { symbol: 'V₁', name: 'Volume à Prélever', description: 'Volume de solution mère nécessaire' },
          { symbol: 'M₂', name: 'Concentration Fille', description: 'Concentration diluée souhaitée' },
          { symbol: 'V₂', name: 'Volume Final', description: 'Volume total après dilution' },
        ],
        stepByStep: '1. Indiquez trois grandeurs connues. 2. Calculez V₁ = (M₂ × V₂) / M₁ puis complétez au solvant jusqu’au trait de jauge V₂.',
      },
      de: {
        name: 'Verdünnungsformel (Mischungsrechnung Chemie)',
        variables: [
          { symbol: 'M₁', name: 'Ausgangskonzentration', description: 'Molarität der Stammlösung' },
          { symbol: 'V₁', name: 'Stammvolumen', description: 'Abzupipettierendes Volumen der Stammlösung' },
          { symbol: 'M₂', name: 'Zielkonzentration', description: 'Gewünschte Endkonzentration' },
          { symbol: 'V₂', name: 'Endvolumen', description: 'Gesamtvolumen der verdünnten Lösung' },
        ],
        stepByStep: '1. Drei bekannte Größen in einheitlichen Einheiten einsetzen. 2. V₁ = (M₂ × V₂) / M₁ berechnen und mit Lösungsmittel auf V₂ auffüllen.',
      },
    },
  },

  // 22. Moles, Molar Mass, Percent Composition & Stoichiometry
  {
    slugs: [
      'mole-calculator', 'molar-mass-calculator', 'percent-composition-calculator',
      'stoichiometry-calculator', 'empirical-formula-calculator',
      'molecular-formula-calculator', 'balancing-chemical-equations-calculator',
    ],
    name: 'Molar Mass, Avogadro’s Number & Stoichiometry Formulas',
    formula: 'n = m / M_w  |  N = n × N_A (6.02214 × 10²³)  |  %Element = (m_elem / M_w) × 100',
    latex: 'n = \\frac{m}{M_w}, \\quad N = n \\cdot N_A, \\quad \\%E = \\frac{n_E \\cdot A_E}{M_w} \\times 100\\%',
    variables: [
      { symbol: 'n', name: 'Amount of Substance', description: 'Quantity in moles (mol)' },
      { symbol: 'M_w', name: 'Molar Mass', description: 'Sum of standard IUPAC atomic weights in g/mol' },
      { symbol: 'N_A', name: 'Avogadro Constant', description: 'Exact 6.02214076 × 10²³ elementary entities per mole' },
    ],
    stepByStep: '1. Sum atomic masses of all atoms in the formula for molar mass M_w. 2. Divide sample grams by M_w for moles n. 3. Apply balanced stoichiometric mole ratios to find limiting reactant and theoretical yield.',
    faq: {
      question: 'How do you convert grams to moles and molecules?',
      answer: 'Divide mass in grams by molar mass (g/mol) to get moles: n = m / M_w. Multiply moles by Avogadro’s number (6.02214 × 10²³) for exact molecule count.',
    },
    translations: {
      es: {
        name: 'Fórmulas de Moles, Masa Molar, Estequiometría y Composición',
        variables: [
          { symbol: 'n', name: 'Cantidad de Sustancia', description: 'Moles de compuesto (mol)' },
          { symbol: 'M_w', name: 'Masa Molar', description: 'Suma de masas atómicas IUPAC en g/mol' },
          { symbol: 'N_A', name: 'Número de Avogadro', description: '6,02214076 × 10²³ partículas por mol' },
        ],
        stepByStep: '1. Sume masas atómicas para hallar M_w. 2. Divida gramos entre M_w para obtener moles n. 3. Use razones molares balanceadas para el reactivo limitante.',
      },
      fr: {
        name: 'Formules de Moles, Masse Molaire et Stœchiométrie',
        variables: [
          { symbol: 'n', name: 'Quantité de Matière', description: 'Quantité en moles (mol)' },
          { symbol: 'M_w', name: 'Masse Molaire', description: 'Somme des masses atomiques IUPAC en g/mol' },
          { symbol: 'N_A', name: 'Constante d’Avogadro', description: '6,02214076 × 10²³ entités par mole' },
        ],
        stepByStep: '1. Additionnez les masses atomiques pour M_w. 2. Calculez n = m / M_w. 3. Appliquez les coefficients stœchiométriques équilibrés pour le rendement théorique.',
      },
      de: {
        name: 'Stoffmenge-, Molare-Masse- & Stöchiometrie-Formeln',
        variables: [
          { symbol: 'n', name: 'Stoffmenge', description: 'Menge in Mol (mol)' },
          { symbol: 'M_w', name: 'Molare Masse', description: 'Summe der IUPAC-Atommassen in g/mol' },
          { symbol: 'N_A', name: 'Avogadro-Konstante', description: 'Exakt 6,02214076 × 10²³ Teilchen pro Mol' },
        ],
        stepByStep: '1. Atommassen zur molaren Masse M_w summieren. 2. Masse durch M_w teilen ergibt Mol n. 3. Stöchiometrische Verhältnisse für Limitierungsreagenz und Ausbeute nutzen.',
      },
    },
  },

  // 23. pH & pOH
  {
    slugs: ['ph-calculator', 'poh-calculator', 'acid-base-calculator'],
    name: 'pH, pOH & Water Autoionization Formulas',
    formula: 'pH = -log₁₀[H⁺]  |  pOH = -log₁₀[OH⁻]  |  pH + pOH = 14 (at 25°C)',
    latex: '\\text{pH} = -\\log_{10}[\\text{H}^+], \\quad \\text{pOH} = -\\log_{10}[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = 14',
    variables: [
      { symbol: 'pH', name: 'pH Value', description: 'Logarithmic acidity index (<7 acidic, 7 neutral, >7 basic)' },
      { symbol: '[H⁺]', name: 'Hydronium Molarity', description: 'Hydrogen ion concentration in mol/L' },
      { symbol: '[OH⁻]', name: 'Hydroxide Molarity', description: 'Hydroxide ion concentration in mol/L (K_w = 10⁻¹⁴)' },
    ],
    stepByStep: '1. Take base-10 log of [H⁺] and negate for pH. 2. Subtract pH from 14 at 25°C to obtain pOH. 3. Inverse: [H⁺] = 10^(-pH).',
    faq: {
      question: 'What is the formula for pH and pOH?',
      answer: 'pH = -log₁₀[H⁺] and pOH = -log₁₀[OH⁻]. At 25°C, aqueous solutions satisfy pH + pOH = 14 and [H⁺][OH⁻] = 1.0 × 10⁻¹⁴.',
    },
    translations: {
      es: {
        name: 'Fórmulas de pH, pOH y Autoionización del Agua',
        variables: [
          { symbol: 'pH', name: 'Escala de pH', description: 'Medida logarítmica de acidez (<7 ácido, 7 neutro, >7 básico)' },
          { symbol: '[H⁺]', name: 'Concentración de Hidronio', description: 'Concentración molar de iones H⁺ (mol/L)' },
          { symbol: '[OH⁻]', name: 'Concentración de Hidróxido', description: 'Concentración molar de iones OH⁻ (mol/L)' },
        ],
        stepByStep: '1. Calcule -log₁₀[H⁺] para el pH. 2. Reste el pH de 14 a 25 °C para el pOH. 3. Inversa: [H⁺] = 10^(-pH).',
      },
      fr: {
        name: 'Formules du pH, du pOH et Produit Ionique de l’Eau',
        variables: [
          { symbol: 'pH', name: 'Valeur du pH', description: 'Échelle logarithmique d’acidité (<7 acide, 7 neutre, >7 basique)' },
          { symbol: '[H⁺]', name: 'Concentration en H₃O⁺', description: 'Concentration molaire en ions hydronium (mol/L)' },
          { symbol: '[OH⁻]', name: 'Concentration en OH⁻', description: 'Concentration molaire en ions hydroxyde (mol/L)' },
        ],
        stepByStep: '1. Calculez pH = -log₁₀[H⁺]. 2. Soustrayez le pH de 14 à 25 °C pour le pOH. 3. Réciproque : [H⁺] = 10^(-pH).',
      },
      de: {
        name: 'pH-, pOH-Wert & Ionenprodukt des Wassers',
        variables: [
          { symbol: 'pH', name: 'pH-Wert', description: 'Logarithmisches Maß der Säurestärke (<7 sauer, 7 neutral, >7 basisch)' },
          { symbol: '[H⁺]', name: 'Oxonium-Konzentration', description: 'Stoffmengenkonzentration der H₃O⁺-Ionen (mol/L)' },
          { symbol: '[OH⁻]', name: 'Hydroxid-Konzentration', description: 'Konzentration der OH⁻-Ionen (mol/L)' },
        ],
        stepByStep: '1. Negativen dekadischen Logarithmus von [H⁺] bilden (pH). 2. Bei 25 °C gilt pOH = 14 - pH. 3. Umkehrung: [H⁺] = 10^(-pH).',
      },
    },
  },

  // 24. Henderson-Hasselbalch, pKa, Ka & Kb
  {
    slugs: [
      'henderson-hasselbalch-equation-calculator', 'buffer-calculator',
      'pka-calculator', 'ka-calculator', 'kb-calculator',
    ],
    name: 'Henderson-Hasselbalch Buffer & Acid Dissociation (pKa) Formulas',
    formula: 'pH = pKₐ + log₁₀([A⁻] / [HA])  |  pKₐ = -log₁₀(Kₐ)  |  Kₐ × K_b = K_w',
    latex: '\\text{pH} = \\text{p}K_a + \\log_{10}\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right), \\quad \\text{p}K_a = -\\log_{10}(K_a)',
    variables: [
      { symbol: 'pKₐ', name: 'Acid Dissociation Index', description: 'Negative log of acid dissociation constant Kₐ' },
      { symbol: '[A⁻]', name: 'Conjugate Base', description: 'Molar concentration of deprotonated conjugate base' },
      { symbol: '[HA]', name: 'Weak Acid', description: 'Molar concentration of undissociated weak acid' },
    ],
    stepByStep: '1. Compute pKₐ = -log₁₀(Kₐ). 2. Take the base-10 log of the conjugate base-to-acid ratio [A⁻]/[HA]. 3. Add to pKₐ to predict buffer pH (optimal buffering within pKₐ ± 1).',
    faq: {
      question: 'When is a chemical buffer at its maximum buffering capacity?',
      answer: 'Buffer capacity peaks when [A⁻] = [HA], so log₁₀(1) = 0 and solution pH equals the weak acid’s pKₐ.',
    },
    translations: {
      es: {
        name: 'Ecuación de Henderson-Hasselbalch y Disociación Ácida (pKa)',
        variables: [
          { symbol: 'pKₐ', name: 'Índice pKa', description: 'Logaritmo negativo de la constante ácida Kₐ' },
          { symbol: '[A⁻]', name: 'Base Conjugada', description: 'Concentración molar de la base conjugada' },
          { symbol: '[HA]', name: 'Ácido Débil', description: 'Concentración molar del ácido débil sin disociar' },
        ],
        stepByStep: '1. Calcule pKₐ = -log₁₀(Kₐ). 2. Obtenga log₁₀([A⁻]/[HA]). 3. Súmelo a pKₐ para el pH de la solución tampón.',
      },
      fr: {
        name: 'Équation de Henderson-Hasselbalch et Constantes pKa / Ka',
        variables: [
          { symbol: 'pKₐ', name: 'Constante pKa', description: 'Cologarithme de la constante d’acidité Kₐ' },
          { symbol: '[A⁻]', name: 'Base Conjuguée', description: 'Concentration molaire de la base conjuguée' },
          { symbol: '[HA]', name: 'Acide Faible', description: 'Concentration molaire de l’acide faible' },
        ],
        stepByStep: '1. Calculez pKₐ = -log₁₀(Kₐ). 2. Ajoutez log₁₀([A⁻]/[HA]). 3. Le pouvoir tampon est maximal lorsque pH = pKₐ.',
      },
      de: {
        name: 'Henderson-Hasselbalch-Puffergleichung & pKs-Wert',
        variables: [
          { symbol: 'pKₐ', name: 'Säureexponent (pKs / pKa)', description: 'Negativer Logarithmus der Säurekonstante Kₐ' },
          { symbol: '[A⁻]', name: 'Korrespondierende Base', description: 'Konzentration der deprotonierten Base' },
          { symbol: '[HA]', name: 'Schwache Säure', description: 'Konzentration der schwachen Säure' },
        ],
        stepByStep: '1. pKₐ = -log₁₀(Kₐ) berechnen. 2. Logarithmus des Basen-Säure-Verhältnisses [A⁻]/[HA] addieren. 3. Maximale Pufferwirkung bei pH = pKₐ.',
      },
    },
  },

  // 25. Chemical Equilibrium & Ksp
  {
    slugs: ['equilibrium-constant-calculator', 'ksp-calculator', 'solubility-calculator'],
    name: 'Law of Mass Action (Kc) & Solubility Product (Ksp) Formulas',
    formula: 'K_c = ([C]^c [D]^d) / ([A]^a [B]^b)  |  K_sp = [M^(m+)]^x [X^(n-)]^y',
    latex: 'K_c = \\frac{[\\text{C}]^c [\\text{D}]^d}{[\\text{A}]^a [\\text{B}]^b}, \\quad K_{sp} = [\\text{M}^{m+}]^x [\\text{X}^{n-}]^y',
    variables: [
      { symbol: 'K_c', name: 'Equilibrium Constant', description: 'Ratio of product activities to reactant activities at equilibrium' },
      { symbol: 'K_sp', name: 'Solubility Product', description: 'Equilibrium constant for sparingly soluble ionic solids' },
      { symbol: 'a,b,c,d', name: 'Stoichiometric Exponents', description: 'Balanced chemical equation coefficients' },
    ],
    stepByStep: '1. Raise each aqueous/gaseous product concentration to its stoichiometric exponent. 2. Divide by reactant concentrations raised to their exponents (omit pure solids/liquids).',
    faq: {
      question: 'What does K_c > 1 vs K_c < 1 indicate at chemical equilibrium?',
      answer: 'K_c >> 1 indicates products strongly dominate at equilibrium, while K_c << 1 indicates reactants dominate and very little conversion occurs.',
    },
    translations: {
      es: {
        name: 'Ley de Acción de Masas (Kc) y Producto de Solubilidad (Kps)',
        variables: [
          { symbol: 'K_c', name: 'Constante de Equilibrio', description: 'Relación entre productos y reactivos en equilibrio' },
          { symbol: 'K_sp', name: 'Producto de Solubilidad', description: 'Constante de equilibrio de sales poco solubles' },
          { symbol: 'a,b,c,d', name: 'Coeficientes Estequiométricos', description: 'Exponentes de la ecuación química balanceada' },
        ],
        stepByStep: '1. Eleve cada producto a su coeficiente estequiométrico. 2. Divida por los reactivos elevados a sus coeficientes (omitiendo sólidos y líquidos puros).',
      },
      fr: {
        name: 'Loi d’Action de Masse (Kc) et Produit de Solubilité (Ks)',
        variables: [
          { symbol: 'K_c', name: 'Constante d’Équilibre', description: 'Quotient de réaction à l’état d’équilibre' },
          { symbol: 'K_sp', name: 'Produit de Solubilité', description: 'Constante de dissolution d’un solide ionique peu soluble' },
          { symbol: 'a,b,c,d', name: 'Coefficients Stœchiométriques', description: 'Exposants issus de l’équation équilibrée' },
        ],
        stepByStep: '1. Élevez les concentrations des produits à leurs coefficients. 2. Divisez par celles des réactifs (les solides purs valent 1).',
      },
      de: {
        name: 'Massenwirkungsgesetz (Kc) & Löslichkeitsprodukt (KL / Ksp)',
        variables: [
          { symbol: 'K_c', name: 'Gleichgewichtskonstante', description: 'Verhältnis von Produkt- zu Eduktkonzentrationen im Gleichgewicht' },
          { symbol: 'K_sp', name: 'Löslichkeitsprodukt', description: 'Gleichgewichtskonstante schwerlöslicher Salze' },
          { symbol: 'a,b,c,d', name: 'Stöchiometriefaktoren', description: 'Exponenten der ausgeglichenen Reaktionsgleichung' },
        ],
        stepByStep: '1. Produktkonzentrationen mit ihren Koeffizienten potenzieren. 2. Durch potenzierte Eduktkonzentrationen teilen (reine Feststoffe entfallen).',
      },
    },
  },

  // 26. Nernst & Faraday Electrochemistry
  {
    slugs: [
      'nernst-equation-calculator', 'electrochemical-cell-calculator',
      'cell-potential-calculator', 'faradays-law-calculator', 'electrolysis-calculator',
    ],
    name: 'Nernst Equation & Faraday’s Law of Electrolysis',
    formula: 'E = E° - (RT / nF) ln(Q)  |  m = (I × t × M_w) / (n × F)',
    latex: 'E = E^\\circ - \\frac{RT}{nF}\\ln Q, \\quad m = \\frac{I \\cdot t \\cdot M_w}{n F}',
    variables: [
      { symbol: 'E°', name: 'Standard Cell Potential', description: 'E°_cathode - E°_anode at 298.15 K and 1 M (Volts)' },
      { symbol: 'F', name: 'Faraday Constant', description: '96,485.33 C/mol (electric charge per mole of electrons)' },
      { symbol: 'n', name: 'Electrons Transferred', description: 'Moles of electrons exchanged in balanced redox reaction' },
      { symbol: 'Q', name: 'Reaction Quotient', description: 'Non-standard activity ratio of products to reactants' },
    ],
    stepByStep: '1. Compute E° = E°_cathode - E°_anode. 2. At 25°C, subtract (0.05916 / n) × log₁₀(Q) for actual cell voltage E. 3. For electrolysis mass, divide charge (I × t) by nF and multiply by molar mass.',
    faq: {
      question: 'What is the Nernst equation at 25°C?',
      answer: 'At 298.15 K (25°C), the Nernst equation simplifies to E = E° - (0.05916 / n) × log₁₀(Q), predicting galvanic cell voltage under non-standard concentrations.',
    },
    translations: {
      es: {
        name: 'Ecuación de Nernst y Ley de Faraday de la Electrólisis',
        variables: [
          { symbol: 'E°', name: 'Potencial Estándar', description: 'E°_cátodo - E°_ánodo en condiciones estándar (V)' },
          { symbol: 'F', name: 'Constante de Faraday', description: '96.485,33 C/mol (carga por mol de electrones)' },
          { symbol: 'n', name: 'Electrones Transferidos', description: 'Moles de electrones en la reacción redox' },
          { symbol: 'Q', name: 'Cociente de Reacción', description: 'Relación de concentraciones fuera de estándar' },
        ],
        stepByStep: '1. Calcule E° = E°_cátodo - E°_ánodo. 2. A 25 °C reste (0,05916 / n) × log₁₀(Q). 3. Para electrólisis, m = (I × t × M_w) / (n × F).',
      },
      fr: {
        name: 'Équation de Nernst et Loi de Faraday (Électrolyse)',
        variables: [
          { symbol: 'E°', name: 'Potentiel Standard', description: 'E°_cathode - E°_anode à 25 °C (Volts)' },
          { symbol: 'F', name: 'Constante de Faraday', description: '96 485,33 C/mol' },
          { symbol: 'n', name: 'Électrons Échangés', description: 'Nombre de moles d’électrons transférés' },
          { symbol: 'Q', name: 'Quotient de Réaction', description: 'Rapport d’activités produits/réactifs' },
        ],
        stepByStep: '1. Calculez E° = E°_cathode - E°_anode. 2. À 25 °C, appliquez E = E° - (0,05916 / n) log₁₀(Q). 3. En électrolyse : m = (I × t × M_w) / (n × F).',
      },
      de: {
        name: 'Nernst-Gleichung & Faradaysches Elektrolysegesetz',
        variables: [
          { symbol: 'E°', name: 'Standardzellspannung', description: 'E°_Kathode - E°_Anode unter Standardbedingungen (V)' },
          { symbol: 'F', name: 'Faraday-Konstante', description: '96.485,33 C/mol (Ladung pro Mol Elektronen)' },
          { symbol: 'n', name: 'Übertragene Elektronen', description: 'Anzahl der ausgetauschten Elektronen in der Redoxreaktion' },
          { symbol: 'Q', name: 'Reaktionsquotient', description: 'Aktuelles Aktivitätsverhältnis Produkte zu Edukten' },
        ],
        stepByStep: '1. E° = E°_Kathode - E°_Anode ermitteln. 2. Bei 25 °C gilt E = E° - (0,05916 / n) × log₁₀(Q). 3. Abgeschiedene Masse: m = (I × t × M_w) / (n × F).',
      },
    },
  },

  // 27. Gibbs Free Energy, Enthalpy & Calorimetry
  {
    slugs: [
      'gibbs-free-energy-calculator', 'enthalpy-calculator', 'heat-of-reaction-calculator',
      'hess-law-calculator', 'calorimetry-calculator', 'specific-heat-calculator',
    ],
    name: 'Gibbs Free Energy, Hess’s Law & Calorimetry Formulas',
    formula: 'ΔG = ΔH - TΔS  |  q = m × c × ΔT',
    latex: '\\Delta G = \\Delta H - T\\Delta S, \\quad q = m c \\Delta T',
    variables: [
      { symbol: 'ΔG', name: 'Gibbs Free Energy', description: 'Spontaneity indicator (<0 exergonic/spontaneous, >0 non-spontaneous)' },
      { symbol: 'ΔH, ΔS', name: 'Enthalpy & Entropy Change', description: 'Reaction heat change (kJ/mol) and disorder change (J/mol·K)' },
      { symbol: 'q', name: 'Thermal Energy (Heat)', description: 'Heat absorbed or released in Joules (J)' },
      { symbol: 'c', name: 'Specific Heat Capacity', description: 'Energy to raise 1 g by 1°C (water = 4.184 J/g·°C)' },
    ],
    stepByStep: '1. Convert ΔS to kJ/mol·K (÷ 1,000) and T to Kelvin before computing ΔG = ΔH - TΔS. 2. For calorimetry, multiply sample mass m by specific heat c and temperature change ΔT.',
    faq: {
      question: 'When is a chemical reaction spontaneous according to Gibbs free energy?',
      answer: 'A reaction at constant temperature and pressure is thermodynamically spontaneous whenever ΔG = ΔH - TΔS < 0.',
    },
    translations: {
      es: {
        name: 'Energía Libre de Gibbs, Ley de Hess y Calorimetría',
        variables: [
          { symbol: 'ΔG', name: 'Energía Libre de Gibbs', description: 'Espontaneidad de la reacción (<0 espontánea)' },
          { symbol: 'ΔH, ΔS', name: 'Entalpía y Entropía', description: 'Cambio térmico (kJ/mol) y de entropía (J/mol·K)' },
          { symbol: 'q', name: 'Calor Transferido', description: 'Energía térmica en Julios (J)' },
          { symbol: 'c', name: 'Calor Específico', description: 'Capacidad calorífica (agua = 4,184 J/g·°C)' },
        ],
        stepByStep: '1. Convierta ΔS a kJ/mol·K y T a Kelvin antes de calcular ΔG = ΔH - TΔS. 2. En calorimetría, multiplique m × c × ΔT.',
      },
      fr: {
        name: 'Enthalpie Libre de Gibbs, Loi de Hess et Calorimétrie',
        variables: [
          { symbol: 'ΔG', name: 'Enthalpie Libre (Gibbs)', description: 'Critère de spontanéité (<0 réaction spontanée)' },
          { symbol: 'ΔH, ΔS', name: 'Enthalpie et Entropie', description: 'Variations d’enthalpie (kJ/mol) et d’entropie (J/mol·K)' },
          { symbol: 'q', name: 'Quantité de Chaleur', description: 'Énergie thermique échangée en Joules (J)' },
          { symbol: 'c', name: 'Capacité Thermique Massique', description: 'Chaleur spécifique (eau = 4,184 J/g·K)' },
        ],
        stepByStep: '1. Convertissez ΔS en kJ/mol·K et T en Kelvin pour ΔG = ΔH - TΔS. 2. En calorimétrie, calculez q = m × c × ΔT.',
      },
      de: {
        name: 'Gibbs-Helmholtz-Gleichung (Freie Enthalpie) & Kalorimetrie',
        variables: [
          { symbol: 'ΔG', name: 'Freie Reaktionsenthalpie', description: 'Maß für Freiwilligkeit (<0 exergon/spontan)' },
          { symbol: 'ΔH, ΔS', name: 'Enthalpie & Entropie', description: 'Reaktionswärme (kJ/mol) und Entropieänderung (J/mol·K)' },
          { symbol: 'q', name: 'Wärmemenge', description: 'Übertragene Wärmeenergie in Joule (J)' },
          { symbol: 'c', name: 'Spezifische Wärmekapazität', description: 'Wärmespeicherfähigkeit (Wasser = 4,184 J/g·K)' },
        ],
        stepByStep: '1. ΔS in kJ/mol·K und T in Kelvin umrechnen, dann ΔG = ΔH - TΔS berechnen. 2. Für Kalorimetrie q = m × c × ΔT anwenden.',
      },
    },
  },

  // 28. Ideal, Combined, Boyle's & Charles's Gas Laws
  {
    slugs: [
      'ideal-gas-law-calculator', 'combined-gas-law-calculator',
      'boyles-law-calculator', 'charles-law-calculator',
    ],
    name: 'Ideal, Combined, Boyle’s & Charles’s Gas Law Formulas',
    formula: 'PV = nRT  |  (P₁V₁) / T₁ = (P₂V₂) / T₂',
    latex: 'P V = n R T, \\quad \\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}',
    variables: [
      { symbol: 'P', name: 'Gas Pressure', description: 'Absolute pressure in atm, bar, or Pascals (Pa)' },
      { symbol: 'V', name: 'Gas Volume', description: 'Container volume in liters (L) or m³' },
      { symbol: 'n', name: 'Moles of Gas', description: 'Amount of gas molecules in moles' },
      { symbol: 'R', name: 'Ideal Gas Constant', description: '0.082057 L·atm/(mol·K) or 8.31446 J/(mol·K)' },
      { symbol: 'T', name: 'Absolute Temperature', description: 'Temperature strictly in Kelvin (K = °C + 273.15)' },
    ],
    stepByStep: '1. Always convert Celsius/Fahrenheit to absolute Kelvin (K = °C + 273.15). 2. Match gas constant R to your pressure/volume units. 3. Solve PV = nRT (or P₁V₁/T₁ = P₂V₂/T₂ for state transitions).',
    faq: {
      question: 'Why must temperature be converted to Kelvin in gas law calculations?',
      answer: 'Gas pressure and volume scale proportionally with absolute thermodynamic temperature starting at absolute zero (0 K = -273.15°C); using Celsius causes division-by-zero and sign errors.',
    },
    translations: {
      es: {
        name: 'Leyes de los Gases (Ideal, Combinada, Boyle y Charles)',
        variables: [
          { symbol: 'P', name: 'Presión Absoluta', description: 'Presión del gas en atm, bar o Pascales (Pa)' },
          { symbol: 'V', name: 'Volumen', description: 'Volumen ocupado en litros (L) o m³' },
          { symbol: 'n', name: 'Moles de Gas', description: 'Cantidad de sustancia en moles' },
          { symbol: 'R', name: 'Constante de Gases Ideales', description: '0,08206 L·atm/(mol·K) u 8,314 J/(mol·K)' },
          { symbol: 'T', name: 'Temperatura Absoluta', description: 'Temperatura obligatoria en Kelvin (K = °C + 273,15)' },
        ],
        stepByStep: '1. Convierta siempre la temperatura a Kelvin (K = °C + 273,15). 2. Alinee unidades con la constante R. 3. Despeje la incógnita en PV = nRT o P₁V₁/T₁ = P₂V₂/T₂.',
      },
      fr: {
        name: 'Lois des Gaz Parfaits (Idéal, Combinée, Boyle-Mariotte, Charles)',
        variables: [
          { symbol: 'P', name: 'Pression Absolue', description: 'Pression en atm, bar ou Pascals (Pa)' },
          { symbol: 'V', name: 'Volume', description: 'Volume du gaz en litres (L) ou m³' },
          { symbol: 'n', name: 'Quantité de Gaz', description: 'Nombre de moles de gaz' },
          { symbol: 'R', name: 'Constante des Gaz Parfaits', description: '8,31446 J/(mol·K) ou 0,08206 L·atm/(mol·K)' },
          { symbol: 'T', name: 'Température Absolue', description: 'Impérativement en Kelvin (K = °C + 273,15)' },
        ],
        stepByStep: '1. Convertissez la température en Kelvin (K = °C + 273,15). 2. Accordez les unités avec la constante R. 3. Résolvez PV = nRT ou P₁V₁/T₁ = P₂V₂/T₂.',
      },
      de: {
        name: 'Ideales Gasgesetz, Boyle-Mariotte & Gesetz von Gay-Lussac/Charles',
        variables: [
          { symbol: 'P', name: 'Absolutdruck', description: 'Gasdruck in bar, atm oder Pascal (Pa)' },
          { symbol: 'V', name: 'Gasvolumen', description: 'Volumen in Litern (L) oder m³' },
          { symbol: 'n', name: 'Stoffmenge', description: 'Gasmenge in Mol' },
          { symbol: 'R', name: 'Universelle Gaskonstante', description: '8,31446 J/(mol·K) oder 0,08206 L·atm/(mol·K)' },
          { symbol: 'T', name: 'Absolute Temperatur', description: 'Zwingend in Kelvin (K = °C + 273,15)' },
        ],
        stepByStep: '1. Temperatur stets in Kelvin umrechnen (K = °C + 273,15). 2. Einheiten passend zu R wählen. 3. Nach gesuchter Größe in PV = nRT oder P₁V₁/T₁ = P₂V₂/T₂ auflösen.',
      },
    },
  },
];
