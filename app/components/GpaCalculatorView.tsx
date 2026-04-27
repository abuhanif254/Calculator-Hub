"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { GraduationCap, BookOpen, PlusCircle, Trash2, Calculator, ArrowRightCircle } from "lucide-react";

interface GpaCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Grade = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "F";
type CourseType = "Regular" | "Honors" | "AP";

interface CourseRow {
  id: string;
  name: string;
  grade: Grade;
  credits: string;
  type: CourseType;
}

const GRADE_POINTS: Record<Grade, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, 
  "F": 0.0
};

const WEIGHT_BONUS: Record<CourseType, number> = {
  "Regular": 0,
  "Honors": 0.5,
  "AP": 1.0
};

export function GpaCalculatorView({ calcDef }: GpaCalculatorViewProps) {
  const t = useTranslations("GpaCalculator");

  const [courses, setCourses] = useState<CourseRow[]>([
    { id: "1", name: "", grade: "A", credits: "3", type: "Regular" },
    { id: "2", name: "", grade: "B+", credits: "3", type: "Regular" },
    { id: "3", name: "", grade: "A-", credits: "3", type: "Honors" },
    { id: "4", name: "", grade: "B", credits: "4", type: "AP" }
  ]);

  const [errorObj, setErrorObj] = useState("");
  const [results, setResults] = useState<{
    unweightedGpa: number;
    weightedGpa: number;
    totalCredits: number;
  } | null>(null);

  const addCourse = () => {
     setCourses([...courses, { id: Date.now().toString(), name: "", grade: "A", credits: "3", type: "Regular" }]);
  };

  const removeCourse = (id: string) => {
     if (courses.length <= 1) return;
     setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseRow, value: string) => {
     setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGpa = () => {
     setErrorObj("");
     setResults(null);

     let totalCredits = 0;
     let totalUnweightedPoints = 0;
     let totalWeightedPoints = 0;

     for (let i = 0; i < courses.length; i++) {
        const c = courses[i];
        const credits = parseFloat(c.credits);
        
        if (isNaN(credits) || credits < 0) {
           setErrorObj(t("errorCredits"));
           return;
        }

        const basePoints = GRADE_POINTS[c.grade];
        const extraWeight = WEIGHT_BONUS[c.type];

        totalCredits += credits;
        totalUnweightedPoints += (basePoints * credits);
        totalWeightedPoints += ((basePoints + extraWeight) * credits);
     }

     if (totalCredits === 0) {
        setErrorObj(t("errorZero"));
        return;
     }

     setResults({
        unweightedGpa: totalUnweightedPoints / totalCredits,
        weightedGpa: totalWeightedPoints / totalCredits,
        totalCredits
     });
  };

  const gradeOptions: Grade[] = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
  const typeOptions: CourseType[] = ["Regular", "Honors", "AP"];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center shadow-inner">
          <GraduationCap size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-10">
         
         <div className="flex-1 space-y-6">
            
            <div className="space-y-3">
               <div className="hidden md:grid grid-cols-[30%_20%_20%_20%_auto] gap-3 px-2 mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("courseName")}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("creditsLabel")}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("gradeLabel")}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("typeLabel")}</span>
                  <span></span>
               </div>
               
               {courses.map((course) => (
                 <div key={course.id} className="grid grid-cols-2 md:grid-cols-[30%_20%_20%_20%_auto] gap-3 items-center bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border md:border-0 border-slate-200">
                    
                    <div className="col-span-2 md:col-span-1">
                      <input 
                         type="text" 
                         placeholder={t("coursePlaceholder")} 
                         value={course.name} 
                         onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                         className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 text-sm font-semibold text-slate-700"
                      />
                    </div>
                    
                    <div>
                      <input 
                         type="number" 
                         min="0"
                         step="0.5"
                         value={course.credits} 
                         onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                         className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 text-sm font-semibold text-slate-700 text-center"
                      />
                    </div>
                    
                    <div>
                      <select
                         value={course.grade}
                         onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                         className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 text-sm font-bold text-slate-800 text-center cursor-pointer appearance-none"
                      >
                         {gradeOptions.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>

                    <div>
                      <select
                         value={course.type}
                         onChange={(e) => updateCourse(course.id, "type", e.target.value)}
                         className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 text-xs font-bold text-slate-600 text-center cursor-pointer appearance-none"
                      >
                         {typeOptions.map(tOption => <option key={tOption} value={tOption}>{tOption}</option>)}
                      </select>
                    </div>

                    <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center">
                       <button onClick={() => removeCourse(course.id)} disabled={courses.length <= 1} className="p-2 text-rose-400 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-rose-50">
                          <Trash2 size={18} strokeWidth={2.5} />
                       </button>
                    </div>
                 </div>
               ))}
               
               <button onClick={addCourse} className="w-full mt-4 py-3 border-2 border-dashed border-fuchsia-200 hover:border-fuchsia-400 hover:bg-fuchsia-50 rounded-xl text-fuchsia-600 font-bold flex items-center justify-center gap-2 transition-all">
                  <PlusCircle size={18} /> {t("addCourse")}
               </button>

            </div>

            {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

            <button onClick={calculateGpa} className="w-full py-4 mt-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-lg shadow-fuchsia-600/30 transition-all flex items-center justify-center gap-2">
               {t("calculateGpa")} <ArrowRightCircle size={18} />
            </button>
         </div>

         {/* Results */}
         <div className="md:w-[350px] flex flex-col bg-slate-50 rounded-2xl border border-slate-200 p-6 min-h-[350px]">
            {!results ? (
              <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                <BookOpen size={80} className="mb-4" strokeWidth={1} />
                <p className="font-medium mt-2 max-w-[200px]">{t("waiting")}</p>
              </div>
            ) : (
              <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in duration-300">
                 
                 <div className="bg-white border-2 border-fuchsia-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-50 rounded-bl-full pointer-events-none"></div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 inline-block z-10">{t("unweightedGpa")}</span>
                   
                   <span className="text-6xl font-black text-fuchsia-600 tracking-tighter z-10">{results.unweightedGpa.toFixed(2)}</span>
                 </div>

                 <div className="grid gap-3 grid-cols-1">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t("weightedGpa")}</span>
                       <span className="text-xl font-black text-slate-800">{results.weightedGpa.toFixed(2)}</span>
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t("totalCreditsRes")}</span>
                       <span className="text-xl font-black text-slate-800">{results.totalCredits}</span>
                    </div>
                 </div>

              </div>
            )}
         </div>
      </div>
    </div>
  );
}
