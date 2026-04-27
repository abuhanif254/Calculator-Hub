import React from "react";
import { CalculatorField } from "../../lib/types";
import { useSettings } from "../context/SettingsContext";

interface InputGroupProps {
  field: CalculatorField;
  value: string | number;
  onChange: (id: string, value: string | number) => void;
}

export const InputGroup: React.FC<InputGroupProps> = ({ field, value, onChange }) => {
  const { currency, locale } = useSettings();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let val: string | number = e.target.value;
    if (field.type !== "select" && field.type !== "years") {
        if (val !== "") {
            val = Number(val);
        }
    }
    onChange(field.id, val);
  };

  // Extract just the currency symbol for the input field placeholder
  const getCurrencySymbol = () => {
    try {
      const parts = new Intl.NumberFormat(locale, { style: 'currency', currency }).formatToParts(0);
      return parts.find((p) => p.type === 'currency')?.value || '$';
    } catch {
      return '$';
    }
  };

  const currencySymbol = getCurrencySymbol();

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label htmlFor={field.id} className="text-sm font-medium text-slate-700">
        {field.label}
      </label>
      
      {field.type === "select" || field.type === "years" ? (
        <select
          id={field.id}
          value={value}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {(field.type === "currency") && (
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">{currencySymbol}</span>
          )}
          <input
            type="number"
            id={field.id}
            value={value}
            onChange={handleChange}
            min={field.min}
            max={field.max}
            step={field.step}
            className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              field.type === "currency" ? "ps-8" : ""
            } ${field.type === "percent" ? "pe-8" : ""}`}
          />
          {field.type === "percent" && (
            <span className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">%</span>
          )}
        </div>
      )}
      {field.helpText && (
        <p className="text-xs text-slate-500">{field.helpText}</p>
      )}
    </div>
  );
};
