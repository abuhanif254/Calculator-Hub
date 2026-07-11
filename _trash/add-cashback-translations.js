const fs = require('fs');

const enTranslation = {
  "CashBackLowInterest": {
    "vehiclePrice": "Vehicle/Purchase Price",
    "cashBackAmount": "Cash Back Offer",
    "lowInterestRate": "Low Interest Rate (%)",
    "standardInterestRate": "Standard Interest Rate (%)",
    "loanTerm": "Loan Term (Months)",
    "downPayment": "Down Payment",
    "tradeIn": "Trade-In Value",
    "calculate": "Compare Options",
    "resultsTitle": "Comparison Results",
    "takeCashBack": "Take the Cash Back",
    "takeLowInterest": "Take the Low Interest",
    "monthlyPayment": "Monthly Payment",
    "totalInterest": "Total Interest Paid",
    "totalCost": "Total Cost of Loan",
    "cashBackOption": "Cash Back Option",
    "lowInterestOption": "Low Interest Option",
    "savings": "You save {amount} by choosing {option}!",
    "principal": "Principal Amount"
  }
};

const esTranslation = {
  "CashBackLowInterest": {
    "vehiclePrice": "Precio del Vehículo/Compra",
    "cashBackAmount": "Oferta de Reembolso",
    "lowInterestRate": "Tasa de Interés Baja (%)",
    "standardInterestRate": "Tasa de Interés Estándar (%)",
    "loanTerm": "Plazo del Préstamo (Meses)",
    "downPayment": "Pago Inicial",
    "tradeIn": "Valor de Intercambio",
    "calculate": "Comparar Opciones",
    "resultsTitle": "Resultados de la Comparación",
    "takeCashBack": "Tomar el Reembolso",
    "takeLowInterest": "Tomar el Interés Bajo",
    "monthlyPayment": "Pago Mensual",
    "totalInterest": "Interés Total Pagado",
    "totalCost": "Costo Total del Préstamo",
    "cashBackOption": "Opción de Reembolso",
    "lowInterestOption": "Opción de Interés Bajo",
    "savings": "¡Ahorras {amount} al elegir {option}!",
    "principal": "Monto Principal"
  }
};

const deTranslation = {
  "CashBackLowInterest": {
    "vehiclePrice": "Fahrzeug-/Kaufpreis",
    "cashBackAmount": "Cashback-Angebot",
    "lowInterestRate": "Niedriger Zinssatz (%)",
    "standardInterestRate": "Standardzinssatz (%)",
    "loanTerm": "Kreditlaufzeit (Monate)",
    "downPayment": "Anzahlung",
    "tradeIn": "Inzahlungnahme",
    "calculate": "Optionen Vergleichen",
    "resultsTitle": "Vergleichsergebnisse",
    "takeCashBack": "Cashback Nehmen",
    "takeLowInterest": "Niedrigen Zins Nehmen",
    "monthlyPayment": "Monatliche Zahlung",
    "totalInterest": "Gezahlte Gesamtzinsen",
    "totalCost": "Gesamtkosten des Kredits",
    "cashBackOption": "Cashback-Option",
    "lowInterestOption": "Niedrigzins-Option",
    "savings": "Sie sparen {amount}, indem Sie {option} wählen!",
    "principal": "Darlehensbetrag"
  }
};

const frTranslation = {
  "CashBackLowInterest": {
    "vehiclePrice": "Prix du Véhicule/Achat",
    "cashBackAmount": "Offre de Remise en Argent",
    "lowInterestRate": "Taux d'Intérêt Bas (%)",
    "standardInterestRate": "Taux d'Intérêt Standard (%)",
    "loanTerm": "Durée du Prêt (Mois)",
    "downPayment": "Acompte",
    "tradeIn": "Valeur d'Échange",
    "calculate": "Comparer les Options",
    "resultsTitle": "Résultats de la Comparaison",
    "takeCashBack": "Prendre la Remise en Argent",
    "takeLowInterest": "Prendre le Taux Bas",
    "monthlyPayment": "Paiement Mensuel",
    "totalInterest": "Intérêts Totaux Payés",
    "totalCost": "Coût Total du Prêt",
    "cashBackOption": "Option de Remise en Argent",
    "lowInterestOption": "Option de Taux Bas",
    "savings": "Vous économisez {amount} en choisissant {option}!",
    "principal": "Montant Principal"
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
    data["CashBackLowInterest"] = trans["CashBackLowInterest"];
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  }
}
