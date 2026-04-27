import { differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, addYears } from 'date-fns';

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

  const years = differenceInYears(targetDate, birthDate);
  const dateAfterYears = addYears(birthDate, years);
  
  const months = differenceInMonths(targetDate, dateAfterYears);
  const dateAfterMonths = new Date(dateAfterYears);
  dateAfterMonths.setMonth(dateAfterMonths.getMonth() + months);

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
