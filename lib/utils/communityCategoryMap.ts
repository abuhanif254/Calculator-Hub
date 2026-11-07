import { CategorySlug } from '@/lib/categories';

/**
 * Maps calculator category names to canonical community category slugs
 */
export function mapCalculatorCategoryToCommunity(calcCategory?: string): CategorySlug {
  if (!calcCategory) return 'calculators';
  const cat = calcCategory.toLowerCase();

  if (
    cat.includes('financ') ||
    cat.includes('invest') ||
    cat.includes('money') ||
    cat.includes('loan') ||
    cat.includes('mortgage') ||
    cat.includes('tax') ||
    cat.includes('debt') ||
    cat.includes('retirement') ||
    cat.includes('interest')
  ) {
    return 'finance';
  }

  if (cat.includes('pdf')) {
    return 'pdf-tools';
  }

  if (cat.includes('image') || cat.includes('photo') || cat.includes('picture')) {
    return 'image-tools';
  }

  if (
    cat.includes('dev') ||
    cat.includes('code') ||
    cat.includes('web') ||
    cat.includes('programming') ||
    cat.includes('tech')
  ) {
    return 'web-dev';
  }

  // Math, Science, Health & Fitness, Everyday, Conversion, Engineering default to calculators
  return 'calculators';
}

/**
 * Contextual question starters tailored by category, calculator slug, and locale.
 * These give users instant inspiration to ask questions, kickstarting UGC.
 */
export interface ContextualPrompt {
  title: string;
  placeholderBody: string;
}

export function getContextualQuestionPrompts(
  calcSlug: string,
  calcTitle: string,
  calcCategory?: string,
  locale: string = 'en'
): ContextualPrompt[] {
  const slug = calcSlug.toLowerCase();
  const cat = (calcCategory || '').toLowerCase();

  if (locale === 'es') {
    if (slug.includes('mortgage') || slug.includes('hipotec')) {
      return [
        {
          title: `¿Qué porcentaje de pago inicial es recomendable en el mercado inmobiliario actual?`,
          placeholderBody: `Estoy utilizando ${calcTitle} para estimar mi cuota mensual. Dudo entre aportar un 10 % o un 20 % de entrada. ¿Cómo comparan el coste del seguro hipotecario frente a mantener liquidez?`,
        },
        {
          title: `¿Conviene amortizar capital anticipadamente en cuota o en plazo con ${calcTitle}?`,
          placeholderBody: `Viendo la tabla de amortización en ${calcTitle}, realizar pagos extra al principio reduce mucho los intereses totales. ¿Qué estrategia les ha funcionado mejor?`,
        },
        {
          title: `Hipoteca a 15 años frente a 30 años: ¿cuál tiene más sentido financiero hoy?`,
          placeholderBody: `Al comparar ambos plazos en ${calcTitle} se observa un gran ahorro en intereses a 15 años, pero una cuota mensual mayor. ¿Cómo toman esta decisión?`,
        },
      ];
    }
    if (cat.includes('financ') || cat.includes('invest') || cat.includes('money') || cat.includes('loan')) {
      return [
        {
          title: `¿Qué comisiones, impuestos o gastos adicionales debo considerar junto a ${calcTitle}?`,
          placeholderBody: `He introducido mis cifras base en ${calcTitle}. ¿Qué costes secundarios o ajustes fiscales suelen pasarse por alto en escenarios reales?`,
        },
        {
          title: `¿Cómo influyen las tasas de interés actuales en la estrategia óptima para ${calcTitle}?`,
          placeholderBody: `Ejecutando simulaciones con ${calcTitle} bajo las condiciones actuales del mercado, ¿cómo están ajustando otros usuarios sus objetivos?`,
        },
        {
          title: `¿Alguien puede revisar mis parámetros y validar este escenario en ${calcTitle}?`,
          placeholderBody: `Este es el escenario financiero que estoy evaluando con ${calcTitle}. ¿Existe algún caso límite o alternativa que deba tener en cuenta?`,
        },
      ];
    }
    if (cat.includes('health') || cat.includes('fitness')) {
      return [
        {
          title: `¿Qué precisión tiene ${calcTitle} en personas con alta masa muscular o entrenamiento intenso?`,
          placeholderBody: `Acabo de calcular mis resultados con ${calcTitle}. ¿Qué mediciones complementarias recomiendan para ajustar el objetivo?`,
        },
        {
          title: `¿Con qué frecuencia conviene recalcular los valores en ${calcTitle}?`,
          placeholderBody: `A medida que cambian el peso y la composición corporal, ¿cada cuántas semanas actualizan sus datos en ${calcTitle}?`,
        },
        {
          title: `¿Qué hábitos ayudan a mantener la constancia con los objetivos de ${calcTitle}?`,
          placeholderBody: `Ahora que tengo mis valores de referencia con ${calcTitle}, ¿qué estrategias de seguimiento les han dado mejores resultados?`,
        },
      ];
    }
    return [
      {
        title: `¿Cuál es la mejor forma de interpretar los resultados de ${calcTitle} para tomar decisiones?`,
        placeholderBody: `Acabo de calcular mis datos en ${calcTitle}. ¿Qué rangos de referencia o umbrales prácticos suelen utilizar en este caso?`,
      },
      {
        title: `¿Alguien ha probado un caso límite con la fórmula matemática de ${calcTitle}?`,
        placeholderBody: `Al evaluar valores extremos en ${calcTitle}, ¿cómo se comporta la ecuación subyacente y qué precauciones prácticas recomiendan?`,
      },
      {
        title: `¿Qué variables del mundo real conviene considerar junto al resultado de ${calcTitle}?`,
        placeholderBody: `${calcTitle} ofrece una estimación matemática exacta. ¿Qué factores prácticos pueden generar pequeñas variaciones en la aplicación real?`,
      },
    ];
  }

  if (locale === 'fr') {
    if (slug.includes('mortgage') || slug.includes('hypothe')) {
      return [
        {
          title: `Quel pourcentage d’apport personnel est optimal sur le marché immobilier actuel ?`,
          placeholderBody: `J’utilise ${calcTitle} pour simuler mes mensualités. J’hésite entre 10 % et 20 % d’apport. Comment arbitrez-vous entre le coût du crédit et la préservation de votre épargne ?`,
        },
        {
          title: `Remboursement anticipé : vaut-il mieux réduire la durée ou la mensualité avec ${calcTitle} ?`,
          placeholderBody: `En analysant l’échéancier sur ${calcTitle}, les versements anticipés réduisent fortement le coût total des intérêts. Quelle stratégie privilégiez-vous ?`,
        },
        {
          title: `Prêt sur 15 ans vs 25 ans : quel choix est le plus pertinent financièrement ?`,
          placeholderBody: `La comparaison des durées dans ${calcTitle} montre une économie d’intérêts majeure sur 15 ans mais une mensualité plus élevée. Comment décidez-vous ?`,
        },
      ];
    }
    if (cat.includes('financ') || cat.includes('invest') || cat.includes('money') || cat.includes('loan')) {
      return [
        {
          title: `Quels frais annexes, taxes ou assurances faut-il intégrer au calcul de ${calcTitle} ?`,
          placeholderBody: `J’ai renseigné mes données de base dans ${calcTitle}. Quels coûts secondaires ou paramètres fiscaux sont souvent oubliés en pratique ?`,
        },
        {
          title: `Comment les taux d’intérêt actuels influencent-ils la stratégie optimale sur ${calcTitle} ?`,
          placeholderBody: `En simulant plusieurs hypothèses avec ${calcTitle} dans le contexte économique actuel, comment ajustez-vous vos objectifs ?`,
        },
        {
          title: `Quelqu’un peut-il vérifier mes hypothèses et valider ce scénario sur ${calcTitle} ?`,
          placeholderBody: `Voici le scénario que j’évalue avec ${calcTitle}. Voyez-vous des cas particuliers ou des optimisations à prendre en compte ?`,
        },
      ];
    }
    if (cat.includes('health') || cat.includes('fitness')) {
      return [
        {
          title: `Comment interpréter ${calcTitle} pour un profil sportif à forte masse musculaire ?`,
          placeholderBody: `Je viens d’obtenir mes résultats sur ${calcTitle}. Quels indicateurs complémentaires utilisez-vous pour affiner le suivi ?`,
        },
        {
          title: `À quelle fréquence faut-il recalculer ses paramètres dans ${calcTitle} ?`,
          placeholderBody: `Au fil de l’évolution du poids et du métabolisme, à quel rythme mettez-vous à jour vos données dans ${calcTitle} ?`,
        },
        {
          title: `Quelles méthodes de suivi associez-vous aux résultats de ${calcTitle} ?`,
          placeholderBody: `Maintenant que j’ai mes valeurs de référence grâce à ${calcTitle}, quelles habitudes vous aident à rester régulier ?`,
        },
      ];
    }
    return [
      {
        title: `Quelle est la meilleure façon d’interpréter les résultats de ${calcTitle} ?`,
        placeholderBody: `Je viens d’effectuer une simulation avec ${calcTitle}. Quels seuils ou repères pratiques utilisez-vous pour prendre une décision ?`,
      },
      {
        title: `Quelqu’un a-t-il testé un cas limite avec la formule de ${calcTitle} ?`,
        placeholderBody: `Lorsqu’on saisit des valeurs extrêmes dans ${calcTitle}, quelles sont les subtilités mathématiques à connaître ?`,
      },
      {
        title: `Quels facteurs concrets faut-il prendre en compte en complément de ${calcTitle} ?`,
        placeholderBody: `${calcTitle} fournit une estimation mathématique précise. Quels paramètres de terrain peuvent créer un léger écart en situation réelle ?`,
      },
    ];
  }

  if (locale === 'de') {
    if (slug.includes('mortgage') || slug.includes('hypothek')) {
      return [
        {
          title: `Wie viel Eigenkapital ist im aktuellen Immobilienmarkt sinnvoll?`,
          placeholderBody: `Ich berechne meine Monatsrate mit dem ${calcTitle}. Lohnt es sich, 20 % Eigenkapital einzubringen oder lieber Liquidität als Rücklage zu behalten?`,
        },
        {
          title: `Sondertilgung: Laufzeit verkürzen oder Monatsrate senken mit dem ${calcTitle}?`,
          placeholderBody: `Laut Tilgungsplan im ${calcTitle} sparen jährliche Sondertilgungen enorm viele Zinsen. Welche Strategie hat sich bei euch bewährt?`,
        },
        {
          title: `15 Jahre vs. 30 Jahre Zinsbindung: Was ist aktuell wirtschaftlicher?`,
          placeholderBody: `Der Vergleich im ${calcTitle} zeigt deutliche Zinsersparnisse bei kürzerer Laufzeit, aber eine höhere monatliche Belastung. Wie entscheidet ihr?`,
        },
      ];
    }
    if (cat.includes('financ') || cat.includes('invest') || cat.includes('money') || cat.includes('loan')) {
      return [
        {
          title: `Welche Nebenkosten, Steuern oder Gebühren sollte man beim ${calcTitle} zusätzlich beachten?`,
          placeholderBody: `Ich habe meine Ausgangswerte in den ${calcTitle} eingegeben. Welche versteckten Kosten oder steuerlichen Details werden in der Praxis oft übersehen?`,
        },
        {
          title: `Wie wirken sich die aktuellen Zinssätze auf die optimale Strategie beim ${calcTitle} aus?`,
          placeholderBody: `Ich simuliere verschiedene Szenarien mit dem ${calcTitle}. Wie passt ihr eure Zielwerte an das aktuelle Marktumfeld an?`,
        },
        {
          title: `Kann jemand meine Annahmen prüfen und dieses Szenario im ${calcTitle} einschätzen?`,
          placeholderBody: `Hier ist mein Rechenbeispiel mit dem ${calcTitle}. Gibt es Sonderfälle oder Alternativen, die ich berücksichtigen sollte?`,
        },
      ];
    }
    if (cat.includes('health') || cat.includes('fitness')) {
      return [
        {
          title: `Wie genau ist der ${calcTitle} bei Sportlern mit hohem Muskelanteil?`,
          placeholderBody: `Ich habe meine Werte mit dem ${calcTitle} berechnet. Welche ergänzenden Messmethoden nutzt ihr zur Einordnung?`,
        },
        {
          title: `Wie oft sollte man die Eingabewerte im ${calcTitle} neu berechnen?`,
          placeholderBody: `In welchen Abständen aktualisiert ihr eure Werte im ${calcTitle}, um Stoffwechselanpassungen zu berücksichtigen?`,
        },
        {
          title: `Welche Routinen helfen euch, die Zielwerte aus dem ${calcTitle} im Alltag umzusetzen?`,
          placeholderBody: `Nachdem ich meine Basiswerte mit dem ${calcTitle} ermittelt habe: Welche Tracking-Methoden funktionieren für euch am besten?`,
        },
      ];
    }
    return [
      {
        title: `Wie interpretiert man die Ergebnisse des ${calcTitle} am besten für die Praxis?`,
        placeholderBody: `Ich habe meine Daten im ${calcTitle} berechnet. Welche Richtwerte oder Schwellenwerte zieht ihr für Entscheidungen heran?`,
      },
      {
        title: `Hat jemand Grenzwerte oder Sonderfälle mit der Formel des ${calcTitle} getestet?`,
        placeholderBody: `Wie verhält sich die zugrunde liegende Formel im ${calcTitle} bei extremen Eingabewerten in der Praxis?`,
      },
      {
        title: `Welche realen Einflussfaktoren sollten neben dem ${calcTitle} berücksichtigt werden?`,
        placeholderBody: `Der ${calcTitle} liefert eine präzise mathematische Berechnung. Welche praktischen Faktoren können im Alltag zu leichten Abweichungen führen?`,
      },
    ];
  }

  // 1. Specific high-traffic calculator starters (English)
  if (slug.includes('mortgage')) {
    return [
      {
        title: `What is a realistic down payment percentage in today's housing market?`,
        placeholderBody: `I am using the ${calcTitle} to calculate my monthly payment. I am debating between putting 5%, 10%, or 20% down. How does PMI compare against keeping extra cash in high-yield savings?`,
      },
      {
        title: `Should I buy mortgage discount points or keep the higher interest rate?`,
        placeholderBody: `Looking at my numbers on the ${calcTitle}, buying 1 discount point costs upfront but lowers my monthly interest. Has anyone done the break-even math on this recently?`,
      },
      {
        title: `15-Year Fixed vs. 30-Year Fixed: Which makes more financial sense right now?`,
        placeholderBody: `Comparing the two loan terms with this calculator shows huge total interest savings on the 15-year, but the monthly payment is significantly higher. How do you decide?`,
      },
    ];
  }

  if (slug.includes('bmi') || slug.includes('calorie') || slug.includes('body-fat')) {
    return [
      {
        title: `How accurate is this calculation for athletic builds with high muscle mass?`,
        placeholderBody: `I just calculated my results with the ${calcTitle}. Because of heavy strength training, my number seems high. What additional measurements should I look at?`,
      },
      {
        title: `What is a sustainable calorie deficit or surplus to target from here?`,
        placeholderBody: `Based on my maintenance calculation on the ${calcTitle}, what weekly rate of change has been most sustainable for your energy and fitness goals?`,
      },
      {
        title: `How frequently should I recalculate to account for metabolic adaptation?`,
        placeholderBody: `As my weight and body composition change, how often should I update the inputs on this ${calcTitle} to maintain progress?`,
      },
    ];
  }

  if (slug.includes('auto-loan') || slug.includes('car-loan') || slug.includes('car-lease')) {
    return [
      {
        title: `Is a 60-month or 72-month auto loan better if I plan to pay extra each month?`,
        placeholderBody: `Using the ${calcTitle}, I see the difference in total interest paid across loan terms. Does anyone have experience with early payoff penalties or interest amortization?`,
      },
      {
        title: `Buying vs. Leasing: How do you interpret the total cost of ownership here?`,
        placeholderBody: `When evaluating depreciation and residual values with this ${calcTitle}, what factors are people using to choose between purchasing and leasing?`,
      },
      {
        title: `What is considered a competitive interest rate for new vs. used auto loans?`,
        placeholderBody: `I am plugging my credit profile into the ${calcTitle}. What rates are lenders currently approving for tier 1 vs tier 2 borrowers?`,
      },
    ];
  }

  if (slug.includes('compound-interest') || slug.includes('investment') || slug.includes('401k') || slug.includes('roth-ira')) {
    return [
      {
        title: `What annual rate of return is safe to project for long-term index funds?`,
        placeholderBody: `I am running scenarios on the ${calcTitle} with 7%, 8%, and 10% expected return. Should I adjust these numbers for historical inflation (real vs nominal)?`,
      },
      {
        title: `Lump Sum vs. Dollar Cost Averaging (DCA): What does the math favor?`,
        placeholderBody: `I am simulating periodic contributions with the ${calcTitle}. For windfalls or bonus allocations, what strategy has worked best for your portfolio?`,
      },
      {
        title: `Roth vs. Traditional: At what tax bracket does the advantage switch?`,
        placeholderBody: `Analyzing my retirement projections with the ${calcTitle}. When does paying taxes today beat tax deferral upon withdrawal?`,
      },
    ];
  }

  // 2. Category-level defaults (English)
  if (cat.includes('financ') || cat.includes('invest') || cat.includes('money') || cat.includes('loan')) {
    return [
      {
        title: `What hidden fees, taxes, or adjustments should I factor into this calculation?`,
        placeholderBody: `I have entered my baseline figures into the ${calcTitle}. What secondary expenses or nuances frequently get overlooked in real-world scenarios?`,
      },
      {
        title: `How do current economic interest rates impact the optimal strategy here?`,
        placeholderBody: `Running calculations with the ${calcTitle} under current rate conditions. How are other community members adjusting their targets?`,
      },
      {
        title: `Can someone review these numbers and sanity check my scenario?`,
        placeholderBody: `Here is the scenario I am evaluating with the ${calcTitle}. Are there any edge cases or alternative approaches I should consider?`,
      },
    ];
  }

  if (cat.includes('health') || cat.includes('fitness')) {
    return [
      {
        title: `How do individual factors (age, lifestyle, genetics) influence this metric?`,
        placeholderBody: `The ${calcTitle} gives a great mathematical baseline. How do you tailor the practical application to individual daily routines?`,
      },
      {
        title: `What are the best complementary tracking methods alongside this calculator?`,
        placeholderBody: `To track progress over time using the ${calcTitle}, what apps, metrics, or physical measurements provide the best correlation?`,
      },
      {
        title: `Tips for staying consistent with the targets calculated here?`,
        placeholderBody: `Now that I have my baseline numbers from the ${calcTitle}, what habits or tracking strategies worked best for you to maintain them?`,
      },
    ];
  }

  // 3. Universal fallback (English)
  return [
    {
      title: `What is the best way to interpret these calculation results for decision making?`,
      placeholderBody: `I just ran my numbers through the ${calcTitle}. What are the primary benchmarks or thresholds people look for when making decisions from this?`,
    },
    {
      title: `Has anyone tested an edge-case scenario with this calculation formula?`,
      placeholderBody: `When evaluating extreme or boundary values in the ${calcTitle}, how does the underlying formula behave and are there practical caveats?`,
    },
    {
      title: `What real-world variables should be considered alongside this output?`,
      placeholderBody: `The ${calcTitle} calculates a precise mathematical estimate. What practical factors in everyday application could cause slight variance?`,
    },
  ];
}
