"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, CheckCircle2, ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";
import { BlockMath } from "@/app/components/KatexMath";
import 'katex/dist/katex.min.css';

interface UserProgress {
  flashcardsReviewed: string[]; // array of IDs
  quizAnswers: Record<number, number>; // questionId -> selectedOptionIndex
}

const FLASHCARDS = [
  { id: "f1", term: "Probability", definition: "The measure of the likelihood that an event will occur.", formula: "P(A) = \\frac{\\text{Favorable}}{\\text{Total}}" },
  { id: "f2", term: "Complement", definition: "The probability that an event does NOT happen.", formula: "P(A') = 1 - P(A)" },
  { id: "f3", term: "Mutually Exclusive", definition: "Events that cannot happen at the same time.", formula: "P(A \\cap B) = 0" },
  { id: "f4", term: "Independent Events", definition: "The outcome of one event does not affect the other.", formula: "P(A \\cap B) = P(A) \\cdot P(B)" },
  { id: "f5", term: "Bayes' Theorem", definition: "Updates the probability for a hypothesis as more evidence or information becomes available.", formula: "P(A|B) = \\frac{P(B|A)P(A)}{P(B)}" }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "If you roll a fair 6-sided die, what is the probability of rolling a number greater than 4?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answerIndex: 1, // 5 and 6 -> 2/6 = 1/3
    explanation: "There are two favorable outcomes (5, 6) out of 6 possible outcomes. 2/6 simplifies to 1/3."
  },
  {
    id: 2,
    question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are mutually exclusive, what is P(A ∪ B)?",
    options: ["0.12", "0.7", "0.82", "0"],
    answerIndex: 1,
    explanation: "For mutually exclusive events, P(A ∪ B) = P(A) + P(B) = 0.3 + 0.4 = 0.7."
  },
  {
    id: 3,
    question: "A coin is tossed 3 times. What is the probability of getting exactly 3 heads?",
    options: ["1/8", "1/4", "3/8", "1/2"],
    answerIndex: 0,
    explanation: "The probability of getting heads on a single toss is 1/2. For 3 independent tosses, it's (1/2) * (1/2) * (1/2) = 1/8."
  }
];

export function ProbabilityLearningSuite() {
  const [subTab, setSubTab] = useState<"flashcards" | "quiz">("flashcards");
  const [progress, setProgress] = useState<UserProgress>({ flashcardsReviewed: [], quizAnswers: {} });
  
  // Flashcard state
  const [fcIndex, setFcIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("probability_learning_progress");
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("probability_learning_progress", JSON.stringify(progress));
  }, [progress]);

  const handleNextFc = () => {
    const currentId = FLASHCARDS[fcIndex].id;
    if (!progress.flashcardsReviewed.includes(currentId)) {
      setProgress(prev => ({ ...prev, flashcardsReviewed: [...prev.flashcardsReviewed, currentId] }));
    }
    setIsFlipped(false);
    setFcIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrevFc = () => {
    setIsFlipped(false);
    setFcIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const handleQuizAnswer = (qId: number, optIdx: number) => {
    setProgress(prev => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [qId]: optIdx }
    }));
  };

  const resetProgress = () => {
    if (confirm("Are you sure you want to reset all your learning progress?")) {
      setProgress({ flashcardsReviewed: [], quizAnswers: {} });
      setFcIndex(0);
      setIsFlipped(false);
    }
  };

  const quizScore = QUIZ_QUESTIONS.reduce((acc, q) => {
    if (progress.quizAnswers[q.id] === q.answerIndex) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Educational Suite</h3>
          <p className="text-slate-600">
            Master probability theory with interactive flashcards and quizzes. Your progress is saved locally.
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => { setSubTab("flashcards"); setIsFlipped(false); }}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${subTab === "flashcards" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Flashcards
          </button>
          <button 
            onClick={() => setSubTab("quiz")}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors ${subTab === "quiz" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Practice Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Progress Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-600" />
              Your Progress
            </h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                  <span>Flashcards</span>
                  <span>{progress.flashcardsReviewed.length} / {FLASHCARDS.length}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(progress.flashcardsReviewed.length / FLASHCARDS.length) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                  <span>Quiz Score</span>
                  <span>{quizScore} / {QUIZ_QUESTIONS.length}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(quizScore / QUIZ_QUESTIONS.length) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <button onClick={resetProgress} className="mt-6 flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
              <RefreshCw size={14} /> Reset Progress
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          
          {subTab === "flashcards" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-12 shadow-sm flex flex-col items-center">
              <div className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">
                Card {fcIndex + 1} of {FLASHCARDS.length}
              </div>
              
              <div 
                className={`w-full max-w-[400px] h-[250px] relative cursor-pointer perspective-1000 group`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={`w-full h-full absolute top-0 left-0 transition-all duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                  
                  {/* Front */}
                  <div className="w-full h-full absolute top-0 left-0 backface-hidden bg-blue-50 border-2 border-blue-100 rounded-2xl flex items-center justify-center p-8 text-center shadow-md">
                    <h2 className="text-3xl font-bold text-blue-900">{FLASHCARDS[fcIndex].term}</h2>
                  </div>

                  {/* Back */}
                  <div className="w-full h-full absolute top-0 left-0 backface-hidden bg-white border-2 border-blue-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center rotate-y-180 shadow-md">
                    <p className="text-lg text-slate-700 mb-4">{FLASHCARDS[fcIndex].definition}</p>
                    {FLASHCARDS[fcIndex].formula && (
                      <div className="text-blue-600">
                        <BlockMath math={FLASHCARDS[fcIndex].formula} />
                      </div>
                    )}
                  </div>

                </div>
              </div>

              <div className="text-slate-400 text-sm mt-6 mb-8 text-center">Click card to flip</div>
              
              <div className="flex gap-4">
                <button onClick={handlePrevFc} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNextFc} className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          )}

          {subTab === "quiz" && (
            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, i) => {
                const isAnswered = progress.quizAnswers[q.id] !== undefined;
                const isCorrect = progress.quizAnswers[q.id] === q.answerIndex;
                
                return (
                  <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h5 className="font-semibold text-slate-800 mb-4 text-lg">
                      <span className="text-slate-400 mr-2">{i + 1}.</span>
                      {q.question}
                    </h5>
                    
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = progress.quizAnswers[q.id] === optIdx;
                        let btnClass = "border-slate-200 bg-white hover:border-blue-400";
                        
                        if (isAnswered) {
                          if (optIdx === q.answerIndex) {
                            btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800"; // Correct answer always highlights green
                          } else if (isSelected) {
                            btnClass = "border-red-400 bg-red-50 text-red-800"; // Wrong selected
                          } else {
                            btnClass = "border-slate-200 bg-slate-50 opacity-50"; // Unselected wrong
                          }
                        } else if (isSelected) {
                          btnClass = "border-blue-500 bg-blue-50 text-blue-800";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleQuizAnswer(q.id, optIdx)}
                            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 size={16} className={isCorrect ? "text-emerald-600" : "text-red-600"} />
                          <span className={`font-semibold ${isCorrect ? "text-emerald-800" : "text-red-800"}`}>
                            {isCorrect ? "Correct!" : "Incorrect."}
                          </span>
                        </div>
                        <p className={`text-sm ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
        </div>
      </div>
      
      {/* Required for 3D flip effect */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
}
