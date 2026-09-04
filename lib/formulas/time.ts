import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, addYears, addMonths } from 'date-fns';

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  nextBirthdayDays: number;
}

export const calculateAge = (birthDate: Date, targetDate: Date = new Date()): AgeResult => {
  // Ensure we don't have negative age mathematically unless intended,
  // but if target date is before birth date, we'll return zeroes for simplicity in this calculator.
  if (targetDate < birthDate) {
    return { years: 0, months: 0, days: 0, totalMonths: 0, totalWeeks: 0, totalDays: 0, nextBirthdayDays: 0 };
  }

  let years = differenceInYears(targetDate, birthDate);
  let dateAfterYears = addYears(birthDate, years);
  if (dateAfterYears > targetDate) {
    years--;
    dateAfterYears = addYears(birthDate, years);
  }
  
  let months = differenceInMonths(targetDate, dateAfterYears);
  let dateAfterMonths = addMonths(dateAfterYears, months);
  if (dateAfterMonths > targetDate) {
    months--;
    dateAfterMonths = addMonths(dateAfterYears, months);
  }
  if (months >= 12) {
    years += Math.floor(months / 12);
    months = months % 12;
  }

  const days = differenceInDays(targetDate, dateAfterMonths);

  const totalMonths = differenceInMonths(targetDate, birthDate);
  const totalWeeks = differenceInWeeks(targetDate, birthDate);
  const totalDays = differenceInDays(targetDate, birthDate);

  // Calculate next birthday
  let nextBday = new Date(birthDate);
  nextBday.setFullYear(targetDate.getFullYear());
  if (nextBday < targetDate) {
    nextBday.setFullYear(targetDate.getFullYear() + 1);
  }
  const nextBirthdayDays = differenceInDays(nextBday, targetDate);

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    nextBirthdayDays
  };
};
