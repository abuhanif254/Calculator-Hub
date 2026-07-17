const fs = require('fs');
const path = require('path');

const newTranslations = {
  en: {
    powerNap: "Power Nap",
    sleepStageBreakdown: "Sleep Stage Breakdown",
    lightSleep: "Light Sleep",
    deepSleep: "Deep Sleep",
    remSleep: "REM Sleep",
    awake: "Awake",
    napShort: "Power Nap (20m)",
    napLong: "Full Cycle Nap (90m)",
    napShortDesc: "Increases alertness and motor performance without sleep inertia.",
    napLongDesc: "Improves creativity and emotional memory. Completes a full cycle.",
    stageDesc: "Based on standard adult architecture for {duration} hours of sleep:",
    napDescTitle: "Recommended Power Naps if you sleep now:"
  },
  es: {
    powerNap: "Siesta Corta",
    sleepStageBreakdown: "Desglose de Fases de Sueño",
    lightSleep: "Sueño Ligero",
    deepSleep: "Sueño Profundo",
    remSleep: "Sueño REM",
    awake: "Despierto",
    napShort: "Siesta Rápida (20m)",
    napLong: "Siesta Completa (90m)",
    napShortDesc: "Aumenta la alerta sin inercia del sueño.",
    napLongDesc: "Mejora la creatividad. Completa un ciclo entero.",
    stageDesc: "Basado en la arquitectura adulta estándar para {duration} horas de sueño:",
    napDescTitle: "Siestas recomendadas si duermes ahora:"
  },
  de: {
    powerNap: "Power-Nap",
    sleepStageBreakdown: "Schlafphasen-Aufschlüsselung",
    lightSleep: "Leichtschlaf",
    deepSleep: "Tiefschlaf",
    remSleep: "REM-Schlaf",
    awake: "Wach",
    napShort: "Power-Nap (20m)",
    napLong: "Vollzyklus-Nap (90m)",
    napShortDesc: "Erhöht die Aufmerksamkeit ohne Schlafträgheit.",
    napLongDesc: "Verbessert die Kreativität. Schließt einen ganzen Zyklus ab.",
    stageDesc: "Basierend auf der Standardarchitektur für Erwachsene bei {duration} Stunden Schlaf:",
    napDescTitle: "Empfohlene Nickerchen, wenn Sie jetzt schlafen:"
  },
  fr: {
    powerNap: "Sieste",
    sleepStageBreakdown: "Répartition des Stades de Sommeil",
    lightSleep: "Sommeil Léger",
    deepSleep: "Sommeil Profond",
    remSleep: "Sommeil Paradoxal (REM)",
    awake: "Éveillé",
    napShort: "Sieste Courte (20m)",
    napLong: "Sieste Complète (90m)",
    napShortDesc: "Augmente la vigilance sans inertie du sommeil.",
    napLongDesc: "Améliore la créativité. Complète un cycle entier.",
    stageDesc: "Basé sur l'architecture standard pour {duration} heures de sommeil :",
    napDescTitle: "Siestes recommandées si vous dormez maintenant :"
  }
};

Object.keys(newTranslations).forEach(lang => {
  const filePath = path.join(__dirname, 'messages', `${lang}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    // Merge new translations into existing SleepCalculator object
    data.SleepCalculator = {
      ...data.SleepCalculator,
      ...newTranslations[lang]
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${lang}.json`);
  }
});
