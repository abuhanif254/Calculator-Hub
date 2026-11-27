'use client';

import React, { useState, useMemo } from 'react';
import { RotateCcw, TrendingUp, Calculator } from 'lucide-react';
import type { CalculatorDef } from '@/lib/types';

interface HighRpmCalculatorViewProps {
  calcDef?: CalculatorDef;
  locale?: string;
}

type Loc = 'en' | 'es' | 'fr' | 'de';

interface FieldSpec {
  id: string;
  type: 'number' | 'select';
  defaultVal: number | string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  options?: { value: string; labels: Record<Loc, string> }[];
  labels: Record<Loc, string>;
}

interface MetricCard {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}

interface HighRpmResult {
  metrics: MetricCard[];
  rows?: { col1: string; col2: string; col3?: string }[];
  tableHeaders?: string[];
}

const RESET_LABEL: Record<Loc, string> = {
  en: 'Reset Defaults',
  es: 'Restablecer',
  fr: 'Réinitialiser',
  de: 'Zurücksetzen',
};

function fmtCurrency(val: number, loc: Loc): string {
  const curr = loc === 'en' ? 'USD' : 'EUR';
  const localeTag = loc === 'en' ? 'en-US' : loc === 'de' ? 'de-DE' : loc === 'fr' ? 'fr-FR' : 'es-ES';
  return new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency: curr,
    maximumFractionDigits: Math.abs(val) < 100 ? 2 : 0,
  }).format(Number.isFinite(val) ? val : 0);
}

function fmtNum(val: number, loc: Loc, digits = 2): string {
  const localeTag = loc === 'en' ? 'en-US' : loc === 'de' ? 'de-DE' : loc === 'fr' ? 'fr-FR' : 'es-ES';
  return new Intl.NumberFormat(localeTag, { maximumFractionDigits: digits }).format(Number.isFinite(val) ? val : 0);
}

function getFields(slug: string, loc: Loc): FieldSpec[] {
  const curr = loc === 'en' ? '$' : '€';
  switch (slug) {
    case 'roi-calculator':
      return [
        { id: 'initial', type: 'number', defaultVal: 10000, min: 1, step: 100, suffix: curr, labels: { en: 'Initial Investment', es: 'Inversión Inicial', fr: 'Investissement Initial', de: 'Anfangsinvestition' } },
        { id: 'finalVal', type: 'number', defaultVal: 14500, min: 0, step: 100, suffix: curr, labels: { en: 'Final Value / Return', es: 'Valor Final Retornado', fr: 'Valeur Finale', de: 'Endwert / Rückfluss' } },
        { id: 'years', type: 'number', defaultVal: 3, min: 0.1, step: 0.5, suffix: 'yr', labels: { en: 'Holding Period (Years)', es: 'Plazo (Años)', fr: 'Durée (Années)', de: 'Haltedauer (Jahre)' } },
      ];
    case 'cagr-calculator':
      return [
        { id: 'startVal', type: 'number', defaultVal: 25000, min: 1, step: 500, suffix: curr, labels: { en: 'Beginning Value', es: 'Valor Inicial', fr: 'Valeur de Départ', de: 'Startwert' } },
        { id: 'endVal', type: 'number', defaultVal: 65000, min: 1, step: 500, suffix: curr, labels: { en: 'Ending Value', es: 'Valor Final', fr: 'Valeur Finale', de: 'Endwert' } },
        { id: 'years', type: 'number', defaultVal: 10, min: 0.5, step: 1, suffix: 'yr', labels: { en: 'Number of Years', es: 'Número de Años', fr: 'Nombre d’Années', de: 'Laufzeit (Jahre)' } },
      ];
    case 'net-worth-calculator':
      return [
        { id: 'cash', type: 'number', defaultVal: 25000, min: 0, step: 500, suffix: curr, labels: { en: 'Cash & Savings', es: 'Efectivo y Ahorros', fr: 'Liquidités & Épargne', de: 'Bargeld & Tagesgeld' } },
        { id: 'investments', type: 'number', defaultVal: 120000, min: 0, step: 1000, suffix: curr, labels: { en: 'Investments & Retirement', es: 'Inversiones y Jubilación', fr: 'Placements & Retraite', de: 'Depot & Altersvorsorge' } },
        { id: 'realEstate', type: 'number', defaultVal: 380000, min: 0, step: 5000, suffix: curr, labels: { en: 'Real Estate & Property', es: 'Inmuebles y Propiedades', fr: 'Immobilier', de: 'Immobilienwert' } },
        { id: 'otherAssets', type: 'number', defaultVal: 22000, min: 0, step: 500, suffix: curr, labels: { en: 'Vehicles & Other Assets', es: 'Vehículos y Otros Activos', fr: 'Véhicules & Autres Actifs', de: 'Fahrzeuge & Sonstiges' } },
        { id: 'mortgage', type: 'number', defaultVal: 260000, min: 0, step: 5000, suffix: curr, labels: { en: 'Mortgage Balance', es: 'Saldo Hipotecario', fr: 'Capital Restant Immobilier', de: 'Restschuld Baufinanzierung' } },
        { id: 'otherDebt', type: 'number', defaultVal: 18000, min: 0, step: 500, suffix: curr, labels: { en: 'Loans & Credit Card Debt', es: 'Préstamos y Tarjetas', fr: 'Crédits & Cartes', de: 'Ratenkredite & Schulden' } },
      ];
    case 'break-even-calculator':
      return [
        { id: 'fixedCosts', type: 'number', defaultVal: 12000, min: 0, step: 500, suffix: curr, labels: { en: 'Fixed Costs (Monthly/Total)', es: 'Costos Fijos', fr: 'Coûts Fixes', de: 'Fixkosten' } },
        { id: 'unitPrice', type: 'number', defaultVal: 60, min: 0.01, step: 1, suffix: curr, labels: { en: 'Selling Price per Unit', es: 'Precio de Venta Unitario', fr: 'Prix de Vente Unitaire', de: 'Verkaufspreis pro Stück' } },
        { id: 'variableCost', type: 'number', defaultVal: 24, min: 0, step: 1, suffix: curr, labels: { en: 'Variable Cost per Unit', es: 'Costo Variable Unitario', fr: 'Coût Variable Unitaire', de: 'Variable Kosten pro Stück' } },
        { id: 'targetProfit', type: 'number', defaultVal: 5000, min: 0, step: 500, suffix: curr, labels: { en: 'Optional Target Profit', es: 'Beneficio Objetivo (Opcional)', fr: 'Bénéfice Cible (Optionnel)', de: 'Zielgewinn (Optional)' } },
      ];
    case 'mortgage-refinance-calculator':
      return [
        { id: 'balance', type: 'number', defaultVal: 320000, min: 1000, step: 5000, suffix: curr, labels: { en: 'Remaining Loan Balance', es: 'Saldo Pendiente del Préstamo', fr: 'Capital Restant Dû', de: 'Aktuelle Restschuld' } },
        { id: 'oldRate', type: 'number', defaultVal: 7.1, min: 0.1, max: 20, step: 0.1, suffix: '%', labels: { en: 'Current Interest Rate (%)', es: 'Tasa Actual (%)', fr: 'Taux Actuel (%)', de: 'Aktueller Sollzins (%)' } },
        { id: 'oldYears', type: 'number', defaultVal: 25, min: 1, max: 40, step: 1, suffix: 'yr', labels: { en: 'Remaining Term (Years)', es: 'Plazo Restante (Años)', fr: 'Durée Restante (Ans)', de: 'Restlaufzeit (Jahre)' } },
        { id: 'newRate', type: 'number', defaultVal: 5.75, min: 0.1, max: 20, step: 0.1, suffix: '%', labels: { en: 'New Refinance Rate (%)', es: 'Nueva Tasa (%)', fr: 'Nouveau Taux (%)', de: 'Neuer Zinssatz (%)' } },
        { id: 'newYears', type: 'number', defaultVal: 25, min: 1, max: 40, step: 1, suffix: 'yr', labels: { en: 'New Loan Term (Years)', es: 'Nuevo Plazo (Años)', fr: 'Nouvelle Durée (Ans)', de: 'Neue Laufzeit (Jahre)' } },
        { id: 'closingCosts', type: 'number', defaultVal: 4500, min: 0, step: 250, suffix: curr, labels: { en: 'Refinance Closing Costs', es: 'Costos de Cierre', fr: 'Frais de Rachat / IRA', de: 'Umschuldungskosten / Notar' } },
      ];
    case 'cap-rate-calculator':
      return [
        { id: 'price', type: 'number', defaultVal: 350000, min: 1000, step: 5000, suffix: curr, labels: { en: 'Property Purchase Price', es: 'Precio de Compra', fr: 'Prix d’Acquisition', de: 'Immobilien-Kaufpreis' } },
        { id: 'monthlyRent', type: 'number', defaultVal: 2600, min: 0, step: 50, suffix: curr, labels: { en: 'Monthly Gross Rent', es: 'Alquiler Mensual Bruto', fr: 'Loyer Mensuel Brut', de: 'Monatliche Kaltmiete' } },
        { id: 'vacancy', type: 'number', defaultVal: 5, min: 0, max: 50, step: 1, suffix: '%', labels: { en: 'Vacancy Allowance (%)', es: 'Tasa de Vacancia (%)', fr: 'Vacance Locative (%)', de: 'Mietausfallwagnis (%)' } },
        { id: 'annualOpex', type: 'number', defaultVal: 8200, min: 0, step: 200, suffix: curr, labels: { en: 'Annual Operating Expenses', es: 'Gastos Operativos Anuales', fr: 'Charges Annuelles Propriétaire', de: 'Jährliche Bewirtschaftungskosten' } },
      ];
    case 'take-home-pay-calculator':
      return [
        { id: 'grossAnnual', type: 'number', defaultVal: loc === 'en' ? 85000 : 55000, min: 1000, step: 1000, suffix: curr, labels: { en: 'Annual Gross Salary', es: 'Salario Bruto Anual', fr: 'Salaire Brut Annuel', de: 'Bruttojahresgehalt' } },
        {
          id: 'regime',
          type: 'select',
          defaultVal: loc === 'de' ? 'de_sk1' : loc === 'fr' ? 'fr_cadre' : loc === 'es' ? 'es_irpf' : 'us_single',
          labels: { en: 'Tax System / Bracket Model', es: 'Régimen Fiscal', fr: 'Statut / Régime Fiscal', de: 'Steuerklasse / Modell' },
          options: [
            { value: 'us_single', labels: { en: 'US Federal (Single)', es: 'EE. UU. Federal (Soltero)', fr: 'États-Unis (Célibataire)', de: 'USA Federal (Single)' } },
            { value: 'us_married', labels: { en: 'US Federal (Married Joint)', es: 'EE. UU. (Casado Conjunto)', fr: 'États-Unis (Marié)', de: 'USA Federal (Verheiratet)' } },
            { value: 'de_sk1', labels: { en: 'Germany (Steuerklasse I / IV)', es: 'Alemania (Clase I / IV)', fr: 'Allemagne (Classe I / IV)', de: 'Deutschland (Steuerklasse I / IV)' } },
            { value: 'de_sk3', labels: { en: 'Germany (Steuerklasse III)', es: 'Alemania (Clase III)', fr: 'Allemagne (Classe III)', de: 'Deutschland (Steuerklasse III)' } },
            { value: 'fr_noncadre', labels: { en: 'France (Salarié Non-Cadre)', es: 'Francia (No Ejecutivo)', fr: 'France (Salarié Non-Cadre)', de: 'Frankreich (Angestellter)' } },
            { value: 'fr_cadre', labels: { en: 'France (Salarié Cadre)', es: 'Francia (Ejecutivo Cadre)', fr: 'France (Salarié Cadre)', de: 'Frankreich (Führungskraft Cadre)' } },
            { value: 'es_irpf', labels: { en: 'Spain (IRPF + Seg. Social)', es: 'España (IRPF + Seg. Social)', fr: 'Espagne (IRPF + Sécu)', de: 'Spanien (IRPF + Sozialabg.)' } },
          ],
        },
        { id: 'pensionPct', type: 'number', defaultVal: 5, min: 0, max: 35, step: 0.5, suffix: '%', labels: { en: 'Pre-Tax Retirement / bAV (%)', es: 'Aporte Jubilación / Plan (%)', fr: 'Épargne Retraite / PER (%)', de: 'Betriebl. Altersvorsorge (%)' } },
        { id: 'stateOrExtraPct', type: 'number', defaultVal: loc === 'en' ? 4 : 0, min: 0, max: 15, step: 0.5, suffix: '%', labels: { en: 'State / Church / Local Tax (%)', es: 'Impuesto Autonómico Extra (%)', fr: 'Prélèvement Complémentaire (%)', de: 'Kirchensteuer / Zusatz (%)' } },
      ];
    case 'overtime-pay-calculator':
      return [
        { id: 'hourlyRate', type: 'number', defaultVal: 28, min: 1, step: 0.5, suffix: curr, labels: { en: 'Regular Hourly Wage', es: 'Tarifa por Hora Regular', fr: 'Taux Horaire Brut', de: 'Regulärer Stundenlohn' } },
        { id: 'regHours', type: 'number', defaultVal: 40, min: 0, max: 80, step: 1, suffix: 'h', labels: { en: 'Regular Hours / Week', es: 'Horas Regulares / Semana', fr: 'Heures Normales / Semaine', de: 'Reguläre Stunden / Woche' } },
        { id: 'otHours', type: 'number', defaultVal: 8, min: 0, max: 60, step: 0.5, suffix: 'h', labels: { en: 'Overtime Hours / Week', es: 'Horas Extras / Semana', fr: 'Heures Supplémentaires / Sem.', de: 'Überstunden / Woche' } },
        { id: 'multiplier', type: 'number', defaultVal: 1.5, min: 1, max: 3, step: 0.25, suffix: '×', labels: { en: 'Overtime Multiplier (e.g. 1.5×)', es: 'Multiplicador (ej. 1,5×)', fr: 'Majoration (ex. 1,25× / 1,5×)', de: 'Überstundenzuschlag (z.B. 1,25× / 1,5×)' } },
      ];
    case 'rule-of-72-calculator':
      return [
        { id: 'rate', type: 'number', defaultVal: 8, min: 0.1, max: 50, step: 0.25, suffix: '%', labels: { en: 'Annual Rate of Return (%)', es: 'Tasa de Retorno Anual (%)', fr: 'Rendement Annuel (%)', de: 'Jährliche Rendite (%)' } },
        { id: 'principal', type: 'number', defaultVal: 10000, min: 1, step: 500, suffix: curr, labels: { en: 'Starting Investment', es: 'Inversión Inicial', fr: 'Capital Initial', de: 'Startkapital' } },
      ];
    case 'tdee-calculator':
      return [
        {
          id: 'sex',
          type: 'select',
          defaultVal: 'male',
          labels: { en: 'Biological Sex', es: 'Sexo Biológico', fr: 'Sexe Biologique', de: 'Biologisches Geschlecht' },
          options: [
            { value: 'male', labels: { en: 'Male', es: 'Masculino', fr: 'Homme', de: 'Männlich' } },
            { value: 'female', labels: { en: 'Female', es: 'Femenino', fr: 'Femme', de: 'Weiblich' } },
          ],
        },
        { id: 'age', type: 'number', defaultVal: 30, min: 14, max: 95, step: 1, suffix: 'yr', labels: { en: 'Age (Years)', es: 'Edad (Años)', fr: 'Âge (Ans)', de: 'Alter (Jahre)' } },
        { id: 'weightKg', type: 'number', defaultVal: 75, min: 30, max: 250, step: 0.5, suffix: 'kg', labels: { en: 'Body Weight (kg)', es: 'Peso Corporal (kg)', fr: 'Poids Corporel (kg)', de: 'Körpergewicht (kg)' } },
        { id: 'heightCm', type: 'number', defaultVal: 175, min: 120, max: 230, step: 1, suffix: 'cm', labels: { en: 'Height (cm)', es: 'Estatura (cm)', fr: 'Taille (cm)', de: 'Körpergröße (cm)' } },
        {
          id: 'activity',
          type: 'select',
          defaultVal: '1.55',
          labels: { en: 'Activity Level', es: 'Nivel de Actividad', fr: 'Niveau d’Activité', de: 'Aktivitätsniveau (PAL)' },
          options: [
            { value: '1.2', labels: { en: 'Sedentary (Desk Job, ×1.2)', es: 'Sedentario (×1,2)', fr: 'Sédentaire (×1,2)', de: 'Sitzend / Büro (×1,2)' } },
            { value: '1.375', labels: { en: 'Lightly Active (1–3 d/wk, ×1.375)', es: 'Ligera (1–3 d/sem, ×1,375)', fr: 'Légère (1–3 j/sem, ×1,375)', de: 'Leicht aktiv (×1,375)' } },
            { value: '1.55', labels: { en: 'Moderately Active (3–5 d/wk, ×1.55)', es: 'Moderada (3–5 d/sem, ×1,55)', fr: 'Modérée (3–5 j/sem, ×1,55)', de: 'Moderat aktiv (×1,55)' } },
            { value: '1.725', labels: { en: 'Very Active (6–7 d/wk, ×1.725)', es: 'Muy Activo (6–7 d/sem, ×1,725)', fr: 'Très Actif (6–7 j/sem, ×1,725)', de: 'Sehr aktiv (×1,725)' } },
            { value: '1.9', labels: { en: 'Athlete / Physical Job (×1.9)', es: 'Atleta / Trabajo Físico (×1,9)', fr: 'Athlète / Métier Physique (×1,9)', de: 'Leistungssport / Schwerarbeit (×1,9)' } },
          ],
        },
      ];
    case 'one-rep-max-calculator':
      return [
        { id: 'weight', type: 'number', defaultVal: loc === 'en' ? 185 : 85, min: 1, step: 2.5, suffix: loc === 'en' ? 'lb' : 'kg', labels: { en: 'Weight Lifted', es: 'Peso Levantado', fr: 'Charge Soulevée', de: 'Gehobenes Gewicht' } },
        { id: 'reps', type: 'number', defaultVal: 5, min: 1, max: 15, step: 1, suffix: 'reps', labels: { en: 'Repetitions Performed (1–15)', es: 'Repeticiones Realizadas (1–15)', fr: 'Répétitions Effectuées (1–15)', de: 'Wiederholungen (1–15)' } },
      ];
    case 'water-intake-calculator':
    default:
      return [
        { id: 'weightKg', type: 'number', defaultVal: 72, min: 25, max: 220, step: 1, suffix: 'kg', labels: { en: 'Body Weight (kg)', es: 'Peso Corporal (kg)', fr: 'Poids Corporel (kg)', de: 'Körpergewicht (kg)' } },
        { id: 'exerciseMin', type: 'number', defaultVal: 45, min: 0, max: 300, step: 5, suffix: 'min', labels: { en: 'Daily Exercise (Minutes)', es: 'Ejercicio Diario (Minutos)', fr: 'Sport Quotidien (Minutes)', de: 'Täglicher Sport (Minuten)' } },
        {
          id: 'climate',
          type: 'select',
          defaultVal: 'temperate',
          labels: { en: 'Climate / Sweat Conditions', es: 'Clima / Sudoración', fr: 'Climat / Chaleur', de: 'Klima / Umgebung' },
          options: [
            { value: 'temperate', labels: { en: 'Temperate / Indoor', es: 'Templado / Interior', fr: 'Tempéré / Intérieur', de: 'Gemäßigt / Innenraum' } },
            { value: 'hot', labels: { en: 'Hot / Humid (+0.5 L)', es: 'Caluroso / Húmedo (+0,5 L)', fr: 'Chaud / Humide (+0,5 L)', de: 'Heiß / Feucht (+0,5 L)' } },
          ],
        },
      ];
  }
}

function pmt(principal: number, annualRatePct: number, years: number): number {
  const n = Math.max(1, years * 12);
  const r = annualRatePct / 100 / 12;
  if (r <= 0) return principal / n;
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

function estimatePayroll(gross: number, regime: string, pensionPct: number, extraPct: number) {
  const pension = gross * (pensionPct / 100);
  const taxable = Math.max(0, gross - pension);

  let incomeTax = 0;
  let socialSec = 0;

  if (regime === 'de_sk1' || regime === 'de_sk3') {
    const basicAllowance = regime === 'de_sk3' ? 24192 : 12096;
    const base = Math.max(0, taxable - basicAllowance);
    const effRate = Math.min(0.42, 0.14 + (base / (regime === 'de_sk3' ? 280000 : 140000)) * 0.28);
    incomeTax = base * effRate;
    // German employee social security (~20.5% up to contribution ceilings ~€96k pension / ~€66k health)
    const pensionCap = Math.min(gross, 96600);
    const healthCap = Math.min(gross, 66150);
    socialSec = pensionCap * 0.106 + healthCap * 0.104;
  } else if (regime === 'fr_cadre' || regime === 'fr_noncadre') {
    const socialRate = regime === 'fr_cadre' ? 0.245 : 0.22;
    socialSec = gross * socialRate;
    const netImposable = Math.max(0, gross - socialSec - pension) * 0.9;
    if (netImposable > 11497) incomeTax += Math.min(netImposable - 11497, 29315 - 11497) * 0.11;
    if (netImposable > 29315) incomeTax += Math.min(netImposable - 29315, 83823 - 29315) * 0.30;
    if (netImposable > 83823) incomeTax += Math.min(netImposable - 83823, 180294 - 83823) * 0.41;
    if (netImposable > 180294) incomeTax += (netImposable - 180294) * 0.45;
  } else if (regime === 'es_irpf') {
    socialSec = Math.min(gross, 58914) * 0.0647;
    const base = Math.max(0, taxable - socialSec - 5550);
    if (base > 0) incomeTax += Math.min(base, 12450) * 0.19;
    if (base > 12450) incomeTax += Math.min(base - 12450, 20200 - 12450) * 0.24;
    if (base > 20200) incomeTax += Math.min(base - 20200, 35200 - 20200) * 0.30;
    if (base > 35200) incomeTax += Math.min(base - 35200, 60000 - 35200) * 0.37;
    if (base > 60000) incomeTax += (base - 60000) * 0.45;
  } else {
    // US Federal 2026 estimated progressive brackets + FICA (7.65% up to $176.1k + 1.45% above)
    const stdDed = regime === 'us_married' ? 30000 : 15000;
    const mult = regime === 'us_married' ? 2 : 1;
    const t = Math.max(0, taxable - stdDed);
    const b1 = 11925 * mult, b2 = 48475 * mult, b3 = 103350 * mult, b4 = 197300 * mult;
    if (t > 0) incomeTax += Math.min(t, b1) * 0.10;
    if (t > b1) incomeTax += Math.min(t - b1, b2 - b1) * 0.12;
    if (t > b2) incomeTax += Math.min(t - b2, b3 - b2) * 0.22;
    if (t > b3) incomeTax += Math.min(t - b3, b4 - b3) * 0.24;
    if (t > b4) incomeTax += (t - b4) * 0.32;
    socialSec = Math.min(gross, 176100) * 0.062 + gross * 0.0145;
  }

  const extraTax = taxable * (extraPct / 100);
  const totalDeductions = incomeTax + socialSec + extraTax + pension;
  const netAnnual = Math.max(0, gross - totalDeductions);
  return { netAnnual, incomeTax: incomeTax + extraTax, socialSec, pension, effRate: (totalDeductions / Math.max(1, gross)) * 100 };
}

function compute(slug: string, v: Record<string, number | string>, loc: Loc): HighRpmResult {
  const num = (k: string) => Number(v[k]) || 0;
  const str = (k: string) => String(v[k] || '');

  switch (slug) {
    case 'roi-calculator': {
      const init = Math.max(0.01, num('initial'));
      const fin = num('finalVal');
      const yrs = Math.max(0.1, num('years'));
      const gain = fin - init;
      const roi = (gain / init) * 100;
      const annRoi = fin > 0 ? (Math.pow(fin / init, 1 / yrs) - 1) * 100 : -100;
      return {
        metrics: [
          { label: { en: 'Total ROI', es: 'ROI Total', fr: 'ROI Total', de: 'Gesamt-ROI' }[loc], value: `${fmtNum(roi, loc, 2)}%`, highlight: true },
          { label: { en: 'Net Profit / Gain', es: 'Ganancia Neta', fr: 'Gain Net', de: 'Nettogewinn' }[loc], value: fmtCurrency(gain, loc) },
          { label: { en: 'Annualized ROI (CAGR)', es: 'ROI Anualizado', fr: 'ROI Annualisé', de: 'Jährlicher ROI (p. a.)' }[loc], value: `${fmtNum(annRoi, loc, 2)}%` },
        ],
      };
    }
    case 'cagr-calculator': {
      const s = Math.max(0.01, num('startVal'));
      const e = Math.max(0.01, num('endVal'));
      const y = Math.max(0.1, num('years'));
      const cagr = (Math.pow(e / s, 1 / y) - 1) * 100;
      const totalPct = ((e - s) / s) * 100;
      return {
        metrics: [
          { label: { en: 'CAGR (Annual Growth)', es: 'CAGR Anual', fr: 'TCAC / CAGR Annuel', de: 'CAGR (p. a.)' }[loc], value: `${fmtNum(cagr, loc, 2)}%`, highlight: true },
          { label: { en: 'Total Cumulative Growth', es: 'Crecimiento Total', fr: 'Croissance Totale', de: 'Gesamtwachstum' }[loc], value: `${fmtNum(totalPct, loc, 1)}%` },
          { label: { en: 'Absolute Gain', es: 'Ganancia Absoluta', fr: 'Plus-Value Absolue', de: 'Absoluter Zuwachs' }[loc], value: fmtCurrency(e - s, loc) },
        ],
      };
    }
    case 'net-worth-calculator': {
      const assets = num('cash') + num('investments') + num('realEstate') + num('otherAssets');
      const debts = num('mortgage') + num('otherDebt');
      const nw = assets - debts;
      const dta = assets > 0 ? (debts / assets) * 100 : 0;
      return {
        metrics: [
          { label: { en: 'Total Net Worth', es: 'Patrimonio Neto', fr: 'Patrimoine Net', de: 'Nettovermögen' }[loc], value: fmtCurrency(nw, loc), highlight: true },
          { label: { en: 'Total Assets', es: 'Activos Totales', fr: 'Total Actifs', de: 'Gesamtvermögen' }[loc], value: fmtCurrency(assets, loc) },
          { label: { en: 'Total Liabilities', es: 'Pasivos / Deudas', fr: 'Total Dettes', de: 'Verbindlichkeiten' }[loc], value: fmtCurrency(debts, loc) },
          { label: { en: 'Debt-to-Asset Ratio', es: 'Ratio Deuda/Activo', fr: 'Taux d’Endettement', de: 'Verschuldungsgrad' }[loc], value: `${fmtNum(dta, loc, 1)}%` },
        ],
      };
    }
    case 'break-even-calculator': {
      const fixed = num('fixedCosts');
      const price = num('unitPrice');
      const vCost = num('variableCost');
      const target = num('targetProfit');
      const margin = Math.max(0.01, price - vCost);
      const beUnits = Math.ceil(fixed / margin);
      const beRev = beUnits * price;
      const targetUnits = Math.ceil((fixed + target) / margin);
      return {
        metrics: [
          { label: { en: 'Break-Even Units', es: 'Unidades Punto Equilibrio', fr: 'Unités Seuil Rentabilité', de: 'Break-Even-Menge' }[loc], value: fmtNum(beUnits, loc, 0), highlight: true },
          { label: { en: 'Break-Even Revenue', es: 'Ingresos Equilibrio', fr: 'Chiffre d’Affaires Seuil', de: 'Break-Even-Umsatz' }[loc], value: fmtCurrency(beRev, loc) },
          { label: { en: 'Unit Contribution Margin', es: 'Margen de Contribución', fr: 'Marge sur Coût Variable', de: 'Stückdeckungsbeitrag' }[loc], value: `${fmtCurrency(margin, loc)} (${fmtNum((margin / Math.max(0.01, price)) * 100, loc, 1)}%)` },
          { label: { en: 'Units for Target Profit', es: 'Unidades para Meta', fr: 'Unités Objectif Profit', de: 'Menge für Zielgewinn' }[loc], value: fmtNum(targetUnits, loc, 0) },
        ],
      };
    }
    case 'mortgage-refinance-calculator': {
      const bal = num('balance');
      const oldPmt = pmt(bal, num('oldRate'), num('oldYears'));
      const newPmt = pmt(bal, num('newRate'), num('newYears'));
      const monthlySave = oldPmt - newPmt;
      const closing = num('closingCosts');
      const beMonths = monthlySave > 0 ? Math.ceil(closing / monthlySave) : 0;
      const oldTotalInt = oldPmt * num('oldYears') * 12 - bal;
      const newTotalInt = newPmt * num('newYears') * 12 - bal;
      const netLifetimeSave = oldTotalInt - newTotalInt - closing;
      return {
        metrics: [
          { label: { en: 'Monthly Savings', es: 'Ahorro Mensual', fr: 'Économie Mensuelle', de: 'Monatliche Ersparnis' }[loc], value: fmtCurrency(monthlySave, loc), highlight: true },
          { label: { en: 'New Monthly Payment', es: 'Nueva Cuota Mensual', fr: 'Nouvelle Mensualité', de: 'Neue Monatsrate' }[loc], value: `${fmtCurrency(newPmt, loc)} (vs ${fmtCurrency(oldPmt, loc)})` },
          { label: { en: 'Break-Even Point', es: 'Mes de Equilibrio', fr: 'Seuil d’Amortissement', de: 'Amortisationsdauer' }[loc], value: monthlySave > 0 ? `${beMonths} mo` : '—' },
          { label: { en: 'Net Lifetime Savings', es: 'Ahorro Neto Total', fr: 'Gain Net sur la Durée', de: 'Netto-Gesamtersparnis' }[loc], value: fmtCurrency(netLifetimeSave, loc) },
        ],
      };
    }
    case 'cap-rate-calculator': {
      const price = Math.max(1, num('price'));
      const grossRent = num('monthlyRent') * 12;
      const effGross = grossRent * (1 - num('vacancy') / 100);
      const noi = effGross - num('annualOpex');
      const capRate = (noi / price) * 100;
      const grm = grossRent > 0 ? price / grossRent : 0;
      return {
        metrics: [
          { label: { en: 'Capitalization Rate (Cap Rate)', es: 'Tasa de Capitalización (Cap Rate)', fr: 'Taux de Capitalisation', de: 'Netto-Mietrendite (Cap Rate)' }[loc], value: `${fmtNum(capRate, loc, 2)}%`, highlight: true },
          { label: { en: 'Annual NOI', es: 'Ingreso Operativo Neto (NOI)', fr: 'Revenu Net d’Exploitation', de: 'Jährlicher Reinertrag (NOI)' }[loc], value: fmtCurrency(noi, loc) },
          { label: { en: 'Effective Gross Rent', es: 'Renta Bruta Efectiva', fr: 'Loyers Bruts Effectifs', de: 'Effektive Jahresmiete' }[loc], value: fmtCurrency(effGross, loc) },
          { label: { en: 'Gross Rent Multiplier', es: 'Multiplicador de Renta', fr: 'Ratio Prix / Loyers', de: 'Kaufpreisfaktor' }[loc], value: `${fmtNum(grm, loc, 1)}×` },
        ],
      };
    }
    case 'take-home-pay-calculator': {
      const res = estimatePayroll(num('grossAnnual'), str('regime'), num('pensionPct'), num('stateOrExtraPct'));
      return {
        metrics: [
          { label: { en: 'Monthly Take-Home Pay', es: 'Salario Neto Mensual', fr: 'Salaire Net Mensuel', de: 'Nettolohn pro Monat' }[loc], value: fmtCurrency(res.netAnnual / 12, loc), highlight: true },
          { label: { en: 'Annual Net Take-Home', es: 'Salario Neto Anual', fr: 'Salaire Net Annuel', de: 'Nettojahresgehalt' }[loc], value: fmtCurrency(res.netAnnual, loc) },
          { label: { en: 'Estimated Income Tax', es: 'Impuesto Renta / IRPF', fr: 'Impôt sur le Revenu', de: 'Lohn- / Einkommensteuer' }[loc], value: fmtCurrency(res.incomeTax, loc) },
          { label: { en: 'Social Security & Deductions', es: 'Seguridad Social y Aportes', fr: 'Cotisations Sociales', de: 'Sozialabgaben & Vorsorge' }[loc], value: `${fmtCurrency(res.socialSec + res.pension, loc)} (${fmtNum(res.effRate, loc, 1)}% total)` },
        ],
      };
    }
    case 'overtime-pay-calculator': {
      const rate = num('hourlyRate');
      const regPay = rate * num('regHours');
      const otRate = rate * num('multiplier');
      const otPay = otRate * num('otHours');
      const weeklyTotal = regPay + otPay;
      const totalHours = Math.max(0.1, num('regHours') + num('otHours'));
      return {
        metrics: [
          { label: { en: 'Total Weekly Gross Pay', es: 'Pago Semanal Total', fr: 'Salaire Hebdomadaire Total', de: 'Wöchentlicher Bruttolohn' }[loc], value: fmtCurrency(weeklyTotal, loc), highlight: true },
          { label: { en: 'Overtime Pay Portion', es: 'Pago por Horas Extras', fr: 'Part Heures Supplémentaires', de: 'Überstundenvergütung' }[loc], value: `${fmtCurrency(otPay, loc)} (${fmtCurrency(otRate, loc)}/h)` },
          { label: { en: 'Regular Pay Portion', es: 'Pago Regular', fr: 'Salaire de Base', de: 'Regulärer Lohnanteil' }[loc], value: fmtCurrency(regPay, loc) },
          { label: { en: 'Blended Hourly Rate', es: 'Tarifa Promedio Efectiva', fr: 'Taux Horaire Moyen', de: 'Effektiver Stundenlohn' }[loc], value: `${fmtCurrency(weeklyTotal / totalHours, loc)}/h` },
        ],
      };
    }
    case 'rule-of-72-calculator': {
      const r = Math.max(0.1, num('rate'));
      const p = num('principal');
      const rule72 = 72 / r;
      const exactDouble = Math.log(2) / Math.log(1 + r / 100);
      const val20 = p * Math.pow(1 + r / 100, 20);
      return {
        metrics: [
          { label: { en: 'Rule of 72 Doubling Time', es: 'Duplicación (Regla del 72)', fr: 'Doublement (Règle des 72)', de: 'Verdopplungszeit (72er-Regel)' }[loc], value: `${fmtNum(rule72, loc, 2)} yr`, highlight: true },
          { label: { en: 'Exact Logarithmic Doubling', es: 'Tiempo Exacto (ln 2)', fr: 'Temps Exact (ln 2)', de: 'Exakte Verdopplungszeit' }[loc], value: `${fmtNum(exactDouble, loc, 2)} yr` },
          { label: { en: 'Projected Value (20 Years)', es: 'Valor Proyectado (20 Años)', fr: 'Capital Projeté (20 Ans)', de: 'Kapital nach 20 Jahren' }[loc], value: fmtCurrency(val20, loc) },
        ],
      };
    }
    case 'tdee-calculator': {
      const w = num('weightKg');
      const h = num('heightCm');
      const age = num('age');
      const act = parseFloat(str('activity')) || 1.55;
      const bmr = 10 * w + 6.25 * h - 5 * age + (str('sex') === 'male' ? 5 : -161);
      const tdee = bmr * act;
      return {
        metrics: [
          { label: { en: 'Maintenance TDEE', es: 'TDEE de Mantenimiento', fr: 'TDEE de Maintien', de: 'Gesamtumsatz (TDEE)' }[loc], value: `${fmtNum(tdee, loc, 0)} kcal`, highlight: true },
          { label: { en: 'Basal Metabolic Rate (BMR)', es: 'Tasa Metabólica Basal (BMR)', fr: 'Métabolisme de Base (BMR)', de: 'Grundumsatz (BMR)' }[loc], value: `${fmtNum(bmr, loc, 0)} kcal` },
          { label: { en: 'Fat Loss Target (−500 kcal)', es: 'Déficit Grasa (−500 kcal)', fr: 'Perte de Gras (−500 kcal)', de: 'Abnehmen (−500 kcal)' }[loc], value: `${fmtNum(Math.max(1200, tdee - 500), loc, 0)} kcal` },
          { label: { en: 'Lean Bulk Target (+250 kcal)', es: 'Superávit Magro (+250 kcal)', fr: 'Prise de Masse (+250 kcal)', de: 'Muskelaufbau (+250 kcal)' }[loc], value: `${fmtNum(tdee + 250, loc, 0)} kcal` },
        ],
      };
    }
    case 'one-rep-max-calculator': {
      const w = num('weight');
      const r = Math.max(1, num('reps'));
      const unit = loc === 'en' ? 'lb' : 'kg';
      const epley = r === 1 ? w : w * (1 + r / 30);
      const brzycki = r === 1 ? w : w * (36 / Math.max(1, 37 - r));
      const avg = (epley + brzycki) / 2;
      return {
        metrics: [
          { label: { en: 'Estimated 1RM (Average)', es: '1RM Estimado (Promedio)', fr: '1RM Estimé (Moyenne)', de: 'Geschätztes 1RM (Schnitt)' }[loc], value: `${fmtNum(avg, loc, 1)} ${unit}`, highlight: true },
          { label: { en: 'Epley Formula 1RM', es: 'Fórmula Epley', fr: 'Formule d’Epley', de: 'Epley-Formel 1RM' }[loc], value: `${fmtNum(epley, loc, 1)} ${unit}` },
          { label: { en: 'Brzycki Formula 1RM', es: 'Fórmula Brzycki', fr: 'Formule de Brzycki', de: 'Brzycki-Formel 1RM' }[loc], value: `${fmtNum(brzycki, loc, 1)} ${unit}` },
          { label: { en: 'Hypertrophy Working Load (75%)', es: 'Carga Hipertrofia (75 %)', fr: 'Charge Hypertrophie (75 %)', de: 'Hypertrophie-Last (75 %)' }[loc], value: `${fmtNum(avg * 0.75, loc, 1)} ${unit}` },
        ],
        tableHeaders: [
          { en: '% of 1RM', es: '% de 1RM', fr: '% du 1RM', de: '% vom 1RM' }[loc],
          { en: 'Load', es: 'Carga', fr: 'Charge', de: 'Gewicht' }[loc],
          { en: 'Est. Reps', es: 'Reps Est.', fr: 'Rép. Est.', de: 'Ca. Wdh.' }[loc],
        ],
        rows: [
          { col1: '95%', col2: `${fmtNum(avg * 0.95, loc, 1)} ${unit}`, col3: '2' },
          { col1: '90%', col2: `${fmtNum(avg * 0.9, loc, 1)} ${unit}`, col3: '4' },
          { col1: '85%', col2: `${fmtNum(avg * 0.85, loc, 1)} ${unit}`, col3: '6' },
          { col1: '80%', col2: `${fmtNum(avg * 0.8, loc, 1)} ${unit}`, col3: '8' },
          { col1: '75%', col2: `${fmtNum(avg * 0.75, loc, 1)} ${unit}`, col3: '10' },
          { col1: '70%', col2: `${fmtNum(avg * 0.7, loc, 1)} ${unit}`, col3: '12' },
        ],
      };
    }
    case 'water-intake-calculator':
    default: {
      const w = num('weightKg');
      const ex = num('exerciseMin');
      const baseL = w * 0.035;
      const exL = (ex / 30) * 0.35;
      const hotL = str('climate') === 'hot' ? 0.5 : 0;
      const totalL = baseL + exL + hotL;
      const flOz = totalL * 33.814;
      const glasses = totalL / 0.25;
      return {
        metrics: [
          { label: { en: 'Daily Water Target (Liters)', es: 'Agua Diaria Recomendada', fr: 'Besoin Quotidien en Eau', de: 'Täglicher Wasserbedarf' }[loc], value: `${fmtNum(totalL, loc, 2)} L`, highlight: true },
          { label: { en: 'Fluid Ounces (US fl oz)', es: 'Onzas Líquidas (fl oz)', fr: 'Onces Liquides (fl oz)', de: 'Milliliter (mL)' }[loc], value: loc === 'de' ? `${fmtNum(totalL * 1000, loc, 0)} mL` : `${fmtNum(flOz, loc, 0)} fl oz` },
          { label: { en: '250 mL Glasses / Day', es: 'Vasos de 250 mL / Día', fr: 'Verres de 250 mL / Jour', de: '250-mL-Gläser / Tag' }[loc], value: fmtNum(glasses, loc, 1) },
        ],
      };
    }
  }
}

export function HighRpmCalculatorView({ calcDef, locale = 'en' }: HighRpmCalculatorViewProps) {
  const loc = (locale === 'es' || locale === 'fr' || locale === 'de' ? locale : 'en') as Loc;
  const slug = calcDef?.slug || 'roi-calculator';
  const fields = useMemo(() => getFields(slug, loc), [slug, loc]);

  const initialValues = useMemo(() => {
    const init: Record<string, number | string> = {};
    for (const f of fields) init[f.id] = f.defaultVal;
    return init;
  }, [fields]);

  const [values, setValues] = useState<Record<string, number | string>>(initialValues);

  const result = useMemo(() => compute(slug, values, loc), [slug, values, loc]);

  const handleReset = () => setValues(initialValues);

  return (
    <div id="calculator-export-target" className="w-full space-y-6">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6">
        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.id} className="space-y-1.5">
              <label htmlFor={`hrpm-${f.id}`} className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                {f.labels[loc]}
              </label>
              {f.type === 'select' && f.options ? (
                <select
                  id={`hrpm-${f.id}`}
                  value={String(values[f.id] ?? f.defaultVal)}
                  onChange={(e) => setValues((prev) => ({ ...prev, [f.id]: e.target.value }))}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:border-[#518231] focus:outline-none"
                >
                  {f.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.labels[loc]}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  <input
                    id={`hrpm-${f.id}`}
                    type="number"
                    min={f.min}
                    max={f.max}
                    step={f.step ?? 'any'}
                    value={values[f.id] ?? f.defaultVal}
                    onChange={(e) => setValues((prev) => ({ ...prev, [f.id]: e.target.value }))}
                    className="w-full pl-3.5 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-base font-bold text-slate-900 dark:text-white focus:border-[#518231] focus:outline-none"
                  />
                  {f.suffix && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      {f.suffix}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{RESET_LABEL[loc]}</span>
          </button>
        </div>

        {/* KPI Result Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          {result.metrics.map((m, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 border ${
                m.highlight
                  ? 'bg-emerald-50/80 dark:bg-[#518231]/15 border-[#518231]/40 sm:col-span-2'
                  : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {m.highlight ? <TrendingUp className="w-3.5 h-3.5 text-[#518231]" /> : <Calculator className="w-3.5 h-3.5 text-slate-400" />}
                <span>{m.label}</span>
              </div>
              <div
                className={`font-extrabold tracking-tight ${
                  m.highlight
                    ? 'text-3xl text-[#365b1f] dark:text-[#86d254]'
                    : 'text-xl text-slate-900 dark:text-white'
                }`}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Optional Breakdown Table (e.g. 1RM Training Load Percentages) */}
        {result.rows && result.tableHeaders && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  {result.tableHeaders.map((h) => (
                    <th key={h} className="px-4 py-2.5 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.rows.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-2 font-bold text-slate-800 dark:text-slate-200">{r.col1}</td>
                    <td className="px-4 py-2 font-semibold text-[#518231] dark:text-[#7ac14d]">{r.col2}</td>
                    {r.col3 && <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{r.col3}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
