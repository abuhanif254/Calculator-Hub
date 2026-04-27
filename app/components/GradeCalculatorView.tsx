"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Award, PenTool, Target, PlusCircle, Trash2, ArrowRightCircle } from "lucide-react";

interface GradeCalculatorViewProps {
  calcDef: CalculatorDef;
}

type Mode = "class" | "final";

interface AssignmentRow {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

export function GradeCalculatorView({ calcDef }: GradeCalculatorViewProps) {
  const t = useTranslations("GradeCalculator");

  const [mode, setMode] = useState<Mode>("class");

  // Mode 1: Class Grade
  const [assignments, setAssignments] = useState<AssignmentRow[]>([
    { id: "1", name: "Homework 1", grade: "90", weight: "15" },
    { id: "2", name: "Quiz 1", grade: "85", weight: "25" },
    { id: "3", name: "Midterm", grade: "80", weight: "30" }
  ]);

  // Mode 2: Final Calculator
  const [currentGrade, setCurrentGrade] = useState("");
  const [targetGrade, setTargetGrade] = useState("");
  const [finalWeight, setFinalWeight] = useState("");

  const [errorObj, setErrorObj] = useState("");
  
  const [classGradeRes, setClassGradeRes] = useState<{
    calcGrade: number;
    letterGrade: string;
    totalWeight: number;
  } | null>(null);

  const [finalGradeRes, setFinalGradeRes] = useState<{
    neededScore: number;
  } | null>(null);

  const addAssignment = () => {
    setAssignments([...assignments, { id: Date.now().toString(), name: "", grade: "", weight: "" }]);
  };

  const removeAssignment = (id: string) => {
    if (assignments.length <= 1) return;
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: string, field: keyof AssignmentRow, value: string) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const getLetterGrade = (grade: number) => {
    if (grade >= 97) return "A+";
    if (grade >= 93) return "A";
    if (grade >= 90) return "A-";
    if (grade >= 87) return "B+";
    if (grade >= 83) return "B";
    if (grade >= 80) return "B-";
    if (grade >= 77) return "C+";
    if (grade >= 73) return "C";
    if (grade >= 70) return "C-";
    if (grade >= 67) return "D+";
    if (grade >= 65) return "D";
    return "F";
  };

  const calculateClassGrade = () => {
    setErrorObj("");
    setClassGradeRes(null);

    let totalWeight = 0;
    let totalScore = 0;

    for (const a of assignments) {
       const g = parseFloat(a.grade);
       const w = parseFloat(a.weight);
       
       if (isNaN(g) || isNaN(w) || w <= 0) {
          setErrorObj(t("errorAssignments"));
          return;
       }

       totalWeight += w;
       totalScore += (g * w);
    }

    if (totalWeight === 0) {
       setErrorObj(t("errorZeroWeight"));
       return;
    }

    const currentCalc = totalScore / totalWeight;

    setClassGradeRes({
       calcGrade: currentCalc,
       letterGrade: getLetterGrade(currentCalc),
       totalWeight
    });
  };

  const calculateFinalNeeded = () => {
    setErrorObj("");
    setFinalGradeRes(null);

    const curr = parseFloat(currentGrade);
    const target = parseFloat(targetGrade);
    const fw = parseFloat(finalWeight);

    if (isNaN(curr) || isNaN(target) || isNaN(fw) || fw <= 0 || fw >= 100) {
       setErrorObj(t("errorFinalInputs"));
       return;
    }

    const fwDec = fw / 100;
    const needed = (target - curr * (1 - fwDec)) / fwDec;

    setFinalGradeRes({ neededScore: needed });
  };

  const calculate = () => {
     if (mode === "class") calculateClassGrade();
     else calculateFinalNeeded();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
          <Award size={24} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
         
         {/* Mode Selector */}
         <div className="bg-slate-100 p-1.5 rounded-2xl w-full max-w-2xl flex relative mb-8">
            <button 
               onClick={() => { setMode("class"); setErrorObj(""); setClassGradeRes(null); setFinalGradeRes(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "class" ? "bg-white text-emerald-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <PenTool size={16} /> {t("modeClass")}
            </button>
            <button 
               onClick={() => { setMode("final"); setErrorObj(""); setClassGradeRes(null); setFinalGradeRes(null); }}
               className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${mode === "final" ? "bg-white text-emerald-600 shadow-md" : "text-slate-500 hover:text-slate-700"}`}
            >
               <Target size={16} /> {t("modeFinal")}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 w-full max-w-5xl">
            
            {/* Input Form */}
            <div className="space-y-6">
              
              {mode === "class" && (
                <div className="space-y-3">
                   <div className="hidden md:grid grid-cols-[40%_25%_25%_auto] gap-3 px-2 mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("assignmentName")}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("grade")} (%)</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("weight")} (%)</span>
                      <span></span>
                   </div>
                   
                   {assignments.map((assignment) => (
                     <div key={assignment.id} className="grid grid-cols-2 md:grid-cols-[40%_25%_25%_auto] gap-3 items-center bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border md:border-0 border-slate-200">
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-xs font-bold text-slate-400 mb-1 block md:hidden">{t("assignmentName")}</label>
                          <input 
                             type="text" 
                             placeholder="e.g. Exam 1"
                             value={assignment.name} 
                             onChange={(e) => updateAssignment(assignment.id, "name", e.target.value)}
                             className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 mb-1 block md:hidden">{t("grade")} (%)</label>
                          <input 
                             type="number" 
                             min="0"
                             placeholder="e.g. 95"
                             value={assignment.grade} 
                             onChange={(e) => updateAssignment(assignment.id, "grade", e.target.value)}
                             className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-700 text-center"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 mb-1 block md:hidden">{t("weight")} (%)</label>
                          <input 
                             type="number" 
                             min="0"
                             placeholder="e.g. 20"
                             value={assignment.weight} 
                             onChange={(e) => updateAssignment(assignment.id, "weight", e.target.value)}
                             className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-700 text-center"
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1 flex justify-end md:justify-center">
                           <button onClick={() => removeAssignment(assignment.id)} disabled={assignments.length <= 1} className="p-2 text-rose-400 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-rose-50">
                              <Trash2 size={18} strokeWidth={2.5} />
                           </button>
                        </div>
                     </div>
                   ))}
                   
                   <button onClick={addAssignment} className="w-full mt-4 py-3 border-2 border-dashed border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-xl text-emerald-600 font-bold flex items-center justify-center gap-2 transition-all">
                      <PlusCircle size={18} /> {t("addAssignment")}
                   </button>
                </div>
              )}

              {mode === "final" && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("currentGrade")}</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 85.5"
                      value={currentGrade} 
                      onChange={(e) => setCurrentGrade(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("targetGrade")}</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 90"
                      value={targetGrade} 
                      onChange={(e) => setTargetGrade(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700">{t("finalWeight")}</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 20"
                      value={finalWeight} 
                      onChange={(e) => setFinalWeight(e.target.value)} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-700" 
                    />
                  </div>
                </div>
              )}

              {errorObj && <div className="text-sm text-red-500 font-semibold p-3 border border-red-200 bg-red-50 rounded-xl">{errorObj}</div>}

              <button onClick={calculate} className="w-full py-4 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2">
                 {mode === "class" ? t("calcClass") : t("calcFinal")} <ArrowRightCircle size={18} />
              </button>
            </div>

            {/* RESULTS UI */}
            <div className="flex flex-col bg-slate-50 rounded-2xl border border-slate-200 h-full p-6 min-h-[300px]">
               {(!classGradeRes && !finalGradeRes) ? (
                 <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-slate-500 text-center">
                   <Target size={80} className="mb-4" strokeWidth={1} />
                   <p className="font-medium mt-2">{t("waiting")}</p>
                 </div>
               ) : (
                 <div className="flex flex-col h-full space-y-4 animate-in fade-in zoom-in duration-300">
                    
                    {/* RESULTS MODE 1: CLASS */}
                    {classGradeRes && (
                      <div className="flex flex-col gap-4 h-full">
                         <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-md flex-1 relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none"></div>
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 inline-block z-10">{t("currentClassGrade")}</span>
                           
                           <span className="text-5xl font-black text-emerald-600 tracking-tighter z-10">{classGradeRes.calcGrade.toFixed(2)}%</span>
                           <span className="text-2xl font-black text-slate-800 tracking-tighter mt-2 z-10">{classGradeRes.letterGrade}</span>
                         </div>
                         <div className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t("accWeight")}</span>
                            <span className="text-lg font-black text-slate-800">{classGradeRes.totalWeight.toFixed(2)}%</span>
                         </div>
                      </div>
                    )}

                    {/* RESULTS MODE 2: FINAL */}
                    {finalGradeRes && (
                      <div className="bg-white border-2 border-emerald-200 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-md flex-1 relative overflow-hidden">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full opacity-50 pointer-events-none"></div>
                         
                         <span className="relative z-10 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">
                           {t("neededToTarget")}
                         </span>
                         
                         <span className="relative z-10 text-6xl font-black text-slate-800 tracking-tight leading-tight mb-2">
                           {finalGradeRes.neededScore.toFixed(2)}%
                         </span>

                         {finalGradeRes.neededScore > 100 && (
                           <div className="mt-4 p-3 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200 relative z-10">
                              {t("unreachable")}
                           </div>
                         )}
                         {finalGradeRes.neededScore <= 0 && (
                           <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 relative z-10">
                              {t("guaranteed")}
                           </div>
                         )}
                      </div>
                    )}
                 </div>
               )}
            </div>

         </div>
      </div>
    </div>
  );
}
