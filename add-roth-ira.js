const fs = require('fs');

const enTranslation = {
  "RothIraCalculator": {
    "currentAge": "Current Age",
    "expectedRetirementAge": "Expected Retirement Age",
    "currentBalance": "Current Roth IRA Balance",
    "annualContribution": "Annual Contribution",
    "expectedReturn": "Expected Annual Rate of Return (%)",
    "calculateButton": "Calculate",
    "resultsTitle": "Retirement Projection",
    "endBalance": "Total Balance at Retirement",
    "totalContributions": "Total Contributions",
    "totalInterest": "Total Earned Growth",
    "contributions": "Contributions",
    "interest": "Growth"
  }
};

const esTranslation = {
  "RothIraCalculator": {
    "currentAge": "Edad Actual",
    "expectedRetirementAge": "Edad de Jubilación Esperada",
    "currentBalance": "Saldo Actual de Roth IRA",
    "annualContribution": "Contribución Anual",
    "expectedReturn": "Tasa de Rendimiento Anual Esperada (%)",
    "calculateButton": "Calcular",
    "resultsTitle": "Proyección de Jubilación",
    "endBalance": "Saldo Total en Jubilación",
    "totalContributions": "Contribuciones Totales",
    "totalInterest": "Crecimiento Total Ganado",
    "contributions": "Contribuciones",
    "interest": "Crecimiento"
  }
};

const deTranslation = {
  "RothIraCalculator": {
    "currentAge": "Aktuelles Alter",
    "expectedRetirementAge": "Erwartetes Renteneintrittsalter",
    "currentBalance": "Aktueller Roth IRA Saldo",
    "annualContribution": "Jährlicher Beitrag",
    "expectedReturn": "Erwartete Jährliche Rendite (%)",
    "calculateButton": "Berechnen",
    "resultsTitle": "Rentenprojektion",
    "endBalance": "Gesamtsaldo bei Renteneintritt",
    "totalContributions": "Gesamte Beiträge",
    "totalInterest": "Gesamtes Erzieltes Wachstum",
    "contributions": "Beiträge",
    "interest": "Wachstum"
  }
};

const frTranslation = {
  "RothIraCalculator": {
    "currentAge": "Âge Actuel",
    "expectedRetirementAge": "Âge de Retraite Prévu",
    "currentBalance": "Solde Actuel Roth IRA",
    "annualContribution": "Contribution Annuelle",
    "expectedReturn": "Taux de Rendement Annuel Prévu (%)",
    "calculateButton": "Calculer",
    "resultsTitle": "Projection de Retraite",
    "endBalance": "Solde Total à la Retraite",
    "totalContributions": "Contributions Totales",
    "totalInterest": "Croissance Totale Gagnée",
    "contributions": "Contributions",
    "interest": "Croissance"
  }
};

const locales = {
  'en.json': enTranslation,
  'es.json': esTranslation,
  'de.json': deTranslation,
  'fr.json': frTranslation
};

for (const [file, trans] of Object.entries(locales)) {
  const path = `./messages/${file}`;
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data["RothIraCalculator"] = trans["RothIraCalculator"];
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  }
}
