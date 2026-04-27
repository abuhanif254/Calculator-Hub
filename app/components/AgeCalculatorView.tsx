"use client";

import React, { useState } from "react";
import { CalculatorDef } from "../../lib/types";
import { LocalizedDatePicker } from "./LocalizedDatePicker";
import { calculateAge } from "../../lib/formulas/time";
import { useSettings } from "../context/SettingsContext";
import { useTranslations } from "next-intl";

interface Props {
  calcDef: CalculatorDef;
}

export const AgeCalculatorView: React.FC<Props> = ({ calcDef }) => {
  const t = useTranslations("AgeCalculator");
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date(1990, 0, 1));
  const [targetDate, setTargetDate] = useState<Date | undefined>(new Date());
  const { locale } = useSettings();

  const result = (birthDate && targetDate) ? calculateAge(birthDate, targetDate) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-12">
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6">{t("selectDates")}</h2>
          
          <LocalizedDatePicker 
            label={t("dateOfBirth")}
            selectedDate={birthDate}
            onSelect={setBirthDate}
          />

          <div className="my-6 border-b border-slate-100"></div>

          <LocalizedDatePicker 
            label={t("targetDate")}
            selectedDate={targetDate}
            onSelect={setTargetDate}
          />
          
        </div>

        {/* Global Architecture Readout */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-3 text-center">{t("localizedFormatEngine")}</h3>
          <p className="text-sm text-slate-300 leading-relaxed text-center">
            {t("engineDescription1")}<strong className="text-white bg-slate-800 px-1 py-0.5 rounded">{locale}</strong>{t("engineDescription2")}
          </p>
        </div>
      </div>
      
      <div className="lg:col-span-7 lg:sticky lg:top-8 h-full min-h-[500px]">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-8 flex flex-col h-full">
          <div className="bg-slate-900 p-6 sm:p-8 text-white relative overflow-hidden">
            <h3 className="text-lg font-medium text-slate-400 mb-1">{t("calculationResults")}</h3>
            {result ? (
              <div className="mt-4">
                 <div className="text-5xl font-extrabold tracking-tight text-white mb-2">
                   {result.years} <span className="text-2xl font-medium text-slate-400">{t("years")}</span>
                 </div>
                 <div className="text-2xl font-bold tracking-tight text-white/90">
                   {result.months} <span className="text-lg font-medium text-slate-400">{t("months")}</span>, {result.days} <span className="text-lg font-medium text-slate-400">{t("days")}</span>
                 </div>
              </div>
            ) : (
              <div className="text-4xl font-extrabold tracking-tight mt-2 text-slate-500">
                {t("awaitingInputs")}
              </div>
            )}
          </div>
          
          <div className="p-6 sm:p-8 flex-1 bg-slate-50">
             {result && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t("totalMonths")}</p>
                    <p className="text-2xl font-bold text-slate-800">{new Intl.NumberFormat(locale as string).format(result.totalMonths)}</p>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t("totalWeeks")}</p>
                    <p className="text-2xl font-bold text-slate-800">{new Intl.NumberFormat(locale as string).format(result.totalWeeks)}</p>
                 </div>
                 <div className="bg-white p-5 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t("totalDays")}</p>
                    <p className="text-2xl font-bold text-slate-800">{new Intl.NumberFormat(locale as string).format(result.totalDays)}</p>
                 </div>
                 <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">{t("daysToNextBirthday")}</p>
                    <p className="text-2xl font-bold text-blue-700">{new Intl.NumberFormat(locale as string).format(result.nextBirthdayDays)}</p>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
