"use client";

import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { useSettings } from '../context/SettingsContext';
import { enUS, de, enGB, ja, enIN, enCA, enAU, es, fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

const getSupportedDateLocale = (localeStr: string) => {
  switch (localeStr) {
    case 'de-DE': return de;
    case 'en-GB': return enGB;
    case 'ja-JP': return ja;
    case 'en-IN': return enIN;
    case 'en-CA': return enCA;
    case 'en-AU': return enAU;
    // adding es/fr for our routing locales if needed
    case 'es': return es;
    case 'fr': return fr;
    default: return enUS;
  }
};

interface Props {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  label: string;
}

export const LocalizedDatePicker: React.FC<Props> = ({ selectedDate, onSelect, label }) => {
  const { locale } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format explicitly locally utilizing Intl API
  const formattedDate = selectedDate 
    ? new Intl.DateTimeFormat(locale as string, { dateStyle: 'full' }).format(selectedDate)
    : 'Select date...';

  return (
    <div className="relative mb-6" ref={wrapperRef}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-start hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <span className={selectedDate ? 'text-slate-900 font-medium' : 'text-slate-400'}>
          {formattedDate}
        </span>
        <CalendarIcon className="h-5 w-5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full start-0 mt-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 overflow-hidden">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(d) => {
              if(d) {
                 onSelect(d);
                 setIsOpen(false);
              }
            }}
            defaultMonth={selectedDate}
            locale={getSupportedDateLocale(locale as string)}
            className="w-full"
            classNames={{
              day: "h-9 w-9 p-0 font-normal text-slate-700 hover:bg-slate-100 rounded-full aria-selected:bg-blue-600 aria-selected:text-white transition-colors cursor-pointer",
              nav: "flex items-center gap-1",
              caption_label: "text-sm font-bold text-slate-800",
              head_cell: "text-slate-400 font-medium text-xs uppercase tracking-wider pb-2",
              root: "p-0"
            }}
          />
        </div>
      )}
    </div>
  );
};
