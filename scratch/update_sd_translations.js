const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de'];
const basePath = path.join(process.cwd(), 'messages');

const translations = {
  en: {
    title: "Standard Deviation Calculator",
    rawData: "Raw Data",
    frequency: "Frequency",
    grouped: "Grouped",
    freqTable: "Frequency Table",
    groupedData: "Grouped Data",
    freqFormat: "Format: Value, Frequency\\n15, 3\\n18, 2",
    groupedFormat: "Format: Range, Frequency\\n0-10, 5\\n10-20, 20",
    stdError: "Std Error",
    coefOfVar: "Coef of Var."
  },
  es: {
    title: "Calculadora de Desviación Estándar",
    rawData: "Datos Brutos",
    frequency: "Frecuencia",
    grouped: "Agrupados",
    freqTable: "Tabla de Frecuencias",
    groupedData: "Datos Agrupados",
    freqFormat: "Formato: Valor, Frecuencia\\n15, 3\\n18, 2",
    groupedFormat: "Formato: Rango, Frecuencia\\n0-10, 5\\n10-20, 20",
    stdError: "Error Estándar",
    coefOfVar: "Coef de Var."
  },
  fr: {
    title: "Calculatrice d'Écart-Type",
    rawData: "Données Brutes",
    frequency: "Fréquence",
    grouped: "Groupés",
    freqTable: "Tableau de Fréquences",
    groupedData: "Données Groupées",
    freqFormat: "Format : Valeur, Fréquence\\n15, 3\\n18, 2",
    groupedFormat: "Format : Plage, Fréquence\\n0-10, 5\\n10-20, 20",
    stdError: "Erreur Standard",
    coefOfVar: "Coef de Var."
  },
  de: {
    title: "Standardabweichungs-Rechner",
    rawData: "Rohdaten",
    frequency: "Frequenz",
    grouped: "Gruppiert",
    freqTable: "Häufigkeitstabelle",
    groupedData: "Gruppierte Daten",
    freqFormat: "Format: Wert, Häufigkeit\\n15, 3\\n18, 2",
    groupedFormat: "Format: Bereich, Häufigkeit\\n0-10, 5\\n10-20, 20",
    stdError: "Standardfehler",
    coefOfVar: "Var.-Koeff."
  }
};

for (const loc of locales) {
  const file = path.join(basePath, `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (data.StandardDeviationCalculator) {
    data.StandardDeviationCalculator = {
      ...data.StandardDeviationCalculator,
      ...translations[loc]
    };
  }
  
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\\n');
  console.log(`Updated ${loc}.json`);
}
